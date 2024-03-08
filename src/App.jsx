import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blueGrey[900],
    },
  },
  typography: {
    fontFamily: "Lato",
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
