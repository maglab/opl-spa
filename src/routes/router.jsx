import React from "react";
import { createBrowserRouter } from "react-router-dom";
import About from "../components/about";
import ContactUs from "../components/contactUs";
import Details from "../components/details";
import Hero from "../components/hero";
import Layout from "../components/layout";
import PrivacyPolicy from "../components/privacyPolicy";
import Problems from "../components/problems/problems";
import ScrollToTop from "../components/scrollToTop";
import Submit from "../components/submit/submit";
import SubmitGuidelines from "../components/submitGuidelines";
import Team from "../components/team";

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
        path: "/open-problems",
        element: <Problems />,
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
        path: "privacy-policy",
        element: <PrivacyPolicy />,
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
      },
    ],
  },
]);

export default router;
