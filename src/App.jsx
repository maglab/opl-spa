<<<<<<< HEAD
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import OpenProblems from "./pages/OpenProblems/OpenProblems";
import SubmitPage from "./pages/Submit/Submit";
import apiProblems from "./api/apiProblems";
import Details from "./pages/OpenProblemDetails/Details";
import AnnotationDetails from "./pages/AnnotationDetails/AnnotationDetails";
=======
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React from "react";
import { RouterProvider } from "react-router-dom";
>>>>>>> development
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
