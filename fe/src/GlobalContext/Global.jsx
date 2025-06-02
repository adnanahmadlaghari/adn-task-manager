import { io } from "socket.io-client";
import { instance } from "../Instance/Instanse";

const { createContext, useState, useContext, useEffect } = require("react");

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const socket = io("http://localhost:5000/", { autoConnect: false });
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  });
  const [Theme, setTheme] = useState("dark");
  const [UserData, setUserData] = useState({});
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [Messages, setMessages] = useState([]);

  const sendMessage = (receiever, msg) => {
    socket.emit("chat message", {
      userId: UserData._id,
      toUserId: receiever,
      text: msg,
    });
  };

  const handleGetUser = async () => {
    try {
      setIsLoading(false);
      const token = localStorage.getItem("accessToken");
      const response = await instance.get("/users/single", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.user);
      socket.connect(); // Manually connect
      socket.on("connect", () => {
        socket.emit("register", response.data.user._id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      handleGetUser();
      // Listen for incoming messages
      socket.on("chat message", (data) => {
        console.log("Received:", data);
        setMessages((prev) => [...prev, data]);
      });
      socket.on("online_users", (data) => {
        console.log("Received online users:", data);
        setOnlineUsers(data);
      });
    }
    // 🔌 Clean up listener on unmount
    return () => {
      socket.off("chat message");
      socket.disconnect();
    };
  }, []);

  // if (IsLoading || !UserData || !user) return <>Loading</>;

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        Theme,
        setTheme,
        UserData,
        setUserData,
        Messages,
        setMessages,
        sendMessage,
        OnlineUsers,
        socket,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalVar = () => useContext(GlobalContext);
