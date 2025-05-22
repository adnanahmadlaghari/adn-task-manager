import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./GlobalContext/Global";
import { ThemeProvider } from "./GlobalContext/Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <ThemeProvider>
    <App />
      </ThemeProvider>
    </GlobalProvider>
  </React.StrictMode>
);
