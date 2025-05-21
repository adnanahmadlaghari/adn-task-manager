import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./GlobalContext/Global";
import MuiTheme from "./application/providers/MuiTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <MuiTheme>
        <App />
      </MuiTheme>
    </GlobalProvider>
  </React.StrictMode>
);
