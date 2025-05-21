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
  const [IsLoading, setIsLoading] = useState(false);
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
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  // if (IsLoading || !UserData || !user) return <>Loading</>;

  return (
    <GlobalContext.Provider
      value={{ user, setUser, Theme, setTheme, UserData, setUserData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalVar = () => useContext(GlobalContext);
