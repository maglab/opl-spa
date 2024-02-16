import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4675ce",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: "#af0808",
    },
    info: {
      main: "#4675ce",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
  spacing: 8,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
