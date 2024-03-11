import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import apiAnnotations from "../api/apiAnnotations";
import Layout from "../components/layout";
import "../index.css";
// import AnnotationDetails from "../pages/AnnotationDetails/AnnotationDetails";
import Hero from "../components/hero";
import Submit from "../components/submit/submit";
import OpenProblemProvider from "../context/context";
import Login from "../pages/Login/Login";
import OpenProblems from "../pages/OpenProblems/openProblems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Hero />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/open-problems",
        element: (
          <OpenProblemProvider>
            <OpenProblems />
          </OpenProblemProvider>
        ),
      },
      { path: "open-problems/submit", element: <Submit /> },
    ],
  },
]);


export default router;
