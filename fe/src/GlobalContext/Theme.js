import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useGlobalVar } from "./Global";

export const ThemeProvider = ({ children }) => {
  const { theme } = useGlobalVar();

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

  return (
    <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
