import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import theme from "./theme/theme";

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
