import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import apiAnnotations from "../api/apiAnnotations";
import apiProblems from "../api/apiProblems";
import SharedLayout from "../components/sharedLayout";
import "../index.css";
// import AnnotationDetails from "../pages/AnnotationDetails/AnnotationDetails";
import Hero from "../pages/Home/Hero/Hero";
import Login from "../pages/Login/Login";
import Details from "../pages/OpenProblemDetails/Details";
import OpenProblems from "../pages/OpenProblems/OpenProblems";
// import RootLayout from "../pages/Root/RootLayout";
// import SubmitPage from "../pages/Submit/Submit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/open-problems",
        element: <OpenProblems />,
      },
      {
        path: "open-problems/:id",
        element: <Details />,
        loader: ({ params }) => apiProblems.getDetails({ id: params.id }),
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
