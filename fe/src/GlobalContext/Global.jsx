import { io } from "socket.io-client";
import { instance } from "../Instance/Instanse";

const { createContext, useState, useContext, useEffect } = require("react");

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  });
  const [Theme, setTheme] = useState("dark");
  const [UserData, setUserData] = useState({});
  const [Socket, setSocket] = useState();
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [Messages, setMessages] = useState([]);

  const sendMessage = (receiever, msg) => {
    if (!Socket.connected) {
      console.warn("Socket not connected. Message not sent.");
      return;
    }
    console.log({ from: UserData.username, text: msg });
    setMessages((prev) => [...prev, { from: UserData.username, text: msg }]);
    Socket.emit("chat message", {
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
      Socket.connect(); // Manually connect
      Socket.on("connect", () => {
        Socket.emit("register", response.data.user._id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const socket_connection = io("http://localhost:5000/", {
        autoConnect: false,
      });
      setSocket(socket_connection);
    }
  }, []);

  useEffect(() => {
    if (Socket) {
      handleGetUser();
      // Listen for incoming messages
      Socket.on("chat message", (data) => {
        console.log("Received:", data);
        setMessages((prev) => [...prev, data]);
      });
      Socket.on("online_users", (data) => {
        console.log("Received online users:", data);
        setOnlineUsers(data);
      });
    }
    return () => {
      if (Socket) {
        Socket.off("chat message");
        Socket.disconnect();
      }
    };
  }, [Socket]);

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
        Socket,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalVar = () => useContext(GlobalContext);
