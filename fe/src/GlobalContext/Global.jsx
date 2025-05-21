const { createContext, useState, useContext } = require("react");

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  });
  const [Theme, setTheme] = useState("dark");
  return (
    <GlobalContext.Provider value={{ user, setUser, Theme, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalVar = () => useContext(GlobalContext);
