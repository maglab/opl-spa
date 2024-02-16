import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: blue[800],
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
