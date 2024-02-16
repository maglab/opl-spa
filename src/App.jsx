import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#4675ce",
    },
    error: {
      main: "#af0808",
    },
    info: {
      main: "#0288d1",
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
