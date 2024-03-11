import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import apiAnnotations from "../api/apiAnnotations";
import Layout from "../components/layout";
// import AnnotationDetails from "../pages/AnnotationDetails/AnnotationDetails";
import About from "../components/about";
import ContactUs from "../components/contactUs";
import Hero from "../components/hero";
import ScrollToTop from "../components/scrollToTop";
import Submit from "../components/submit/submit";
import SubmitGuidelines from "../components/submitGuidelines";
import Team from "../components/team";
import Login from "../pages/Login/Login";
import OpenProblems from "../pages/OpenProblems/OpenProblems";

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
        path: "open-problems",
        element: <OpenProblems />,
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
    ],
  },
]);

// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <RootHome />,
//       children: [{ path: "", index: true, element: <Home /> }],
//     },
//     {
//       path: "/login",
//       element: <RootLayout />,
//       children: [{ index: true, element: <Login /> }],
//     },
//     {
//       path: "open-problems",
//       element: <RootLayout />,
//       children: [{ index: true, element: <OpenProblems /> }],
//     },
//     {
//       path: "open-problems/:id",
//       element: <RootLayout />, // Use RootLayout as the root element for the Details page
//       children: [
//         {
//           index: true,
//           element: <Details />,
//           loader: ({ params }) => apiProblems.getDetails({ id: params.id }),
//         },
//       ],
//     },
//     {
//       path: "submit",
//       element: <RootLayout />,
//       children: [
//         {
//           index: true,
//           element: <SubmitPage />,
//         },
//       ],
//     },
//     {
//       path: "annotation",
//       element: <RootLayout />,
//       children: [
//         {
//           path: ":category/:id",
//           element: <AnnotationDetails />,
//           loader: ({ params }) =>
//             apiAnnotations.getAnnotationDetails({
//               annotation: params.category,
//               annotationId: params.id,
//             }),
//         },
//       ],
//     },
//   ]);

export default router;
