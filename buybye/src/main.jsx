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
    type: "light",
    primary: {
      main: "#4d216d",
    },
    secondary: {
      main: "#ffd600",
      contrastText: "rgba(255,0,0,0)",
    },
    warning: {
      main: "#ffffff",
      contrastText: "#4d216d",
    },
    info: {
      main: "#4d216d",
    },
    success: {
      main: "#4a148c",
    },
    divider: "#4a148c",
  },
  props: {
    MuiAppBar: {
      color: "transparent",
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
