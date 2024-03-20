import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import apiAnnotations from "../api/apiAnnotations";
import Layout from "../components/layout";
// import AnnotationDetails from "../pages/AnnotationDetails/AnnotationDetails";
import apiProblems from "../api/apiProblems";
import About from "../components/about";
import ContactUs from "../components/contactUs";
import Details from "../components/details";
import Hero from "../components/hero";
import Login from "../components/login/login";
import ScrollToTop from "../components/scrollToTop";
import Submit from "../components/submit/submit";
import SubmitGuidelines from "../components/submitGuidelines";
import Team from "../components/team";
import OpenProblemProvider from "../context/context";
import OpenProblems from "../pages/OpenProblems/openProblems";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />
        <ScrollToTop />
      </>
    ),
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
      {
        path: "submit",
        element: <Submit />,
      },
      {
        path: "submit-guidelines",
        element: <SubmitGuidelines />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "open-problems/:id",
        element: <Details />,
        loader: async ({ params }) => apiProblems.getDetails(params),
      },
    ],
  },
]);

export default router;
