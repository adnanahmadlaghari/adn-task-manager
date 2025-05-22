const { createContext, useState, useContext, useEffect } = require("react");

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  });
        const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <GlobalContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalVar = () => useContext(GlobalContext);
