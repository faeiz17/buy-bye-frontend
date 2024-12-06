import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";

//Creating Theme For MUI
export const CustomTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff652f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffe400",
    },
    info: {
      main: "#b1c0cb",
    },
    divider: "#14a76c",
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#14a76c",
    },
    background: {
      default: "#272727",
      paper: "#1e1e1e",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={CustomTheme}>
    <CssBaseline />
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
);
