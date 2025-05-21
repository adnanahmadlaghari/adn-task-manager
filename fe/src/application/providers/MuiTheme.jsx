import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useGlobalVar } from "../../GlobalContext/Global";

const MuiTheme = ({ children }) => {
  const { Theme, setTheme } = useGlobalVar();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  useEffect(() => {
    const current_theme = localStorage.getItem("theme");
    if (current_theme) setTheme(current_theme);
  }, []);

  return (
    <ThemeProvider theme={Theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
