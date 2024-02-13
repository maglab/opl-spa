import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
// import About from './pages/About/About'
// import RootOpenProblems from "./pages/Root/OpenProblems";
import apiAnnotations from "./api/apiAnnotations";
import apiProblems from "./api/apiProblems";
import "./index.css";
import AnnotationDetails from "./pages/AnnotationDetails/AnnotationDetails";
import Login from "./pages/Login/Login";
import Details from "./pages/OpenProblemDetails/Details";
import OpenProblems from "./pages/OpenProblems/OpenProblems";
import RootHome from "./pages/Root/RootHome";
import RootLayout from "./pages/Root/RootLayout";
import SubmitPage from "./pages/Submit/Submit";

const router = createBrowserRouter([
  // { path: "/", element: <Navigate to={"open-problems"} /> },
  {
    path: "/",
    element: <RootHome />,
    children: [{ path: "", index: true, element: <Home /> }],
  },
  // {path: 'About', element: <About/>}]},
  {
    path: "/login",
    element: <RootLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "open-problems",
    element: <RootLayout />,
    children: [{ index: true, element: <OpenProblems /> }],
  },
  {
    path: "open-problems/:id",
    element: <RootLayout />, // Use RootLayout as the root element for the Details page
    children: [
      {
        index: true,
        element: <Details />,
        loader: ({ params }) => apiProblems.getDetails({ id: params.id }),
      },
    ],
  },
  {
    path: "submit",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SubmitPage />,
      },
    ],
  },
  {
    path: "annotation",
    element: <RootLayout />,
    children: [
      {
        path: ":category/:id",
        element: <AnnotationDetails />,
        loader: ({ params }) =>
          apiAnnotations.getAnnotationDetails({
            annotation: params.category,
            annotationId: params.id,
          }),
      },
    ],
  },
]);
// Uncompleted home pages:

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
