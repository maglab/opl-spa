import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import RootLayout from "./pages/Root/RootLayout";
// import Home from './pages/Home/Home'
// import About from './pages/About/About'
import RootOpenProblems from "./pages/Root/OpenProblems";
import OpenProblems from "./pages/OpenProblems/OpenProblems";
import { getProblems } from "./utils/functions/getOpenProblems";
import Details from "./pages/OpenProblemDetails/Details";
import getDetails from "./utils/functions/getDetails";
import AnnotationDetails from "./pages/AnnotationDetails/AnnotationDetails";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to={"open-problems"} /> },
  {
    path: "open-problems",
    element: <RootOpenProblems />,
    children: [
      { index: true, element: <OpenProblems />, loader: getProblems },
      {
        path: ":id",
        element: <Details />,
        loader: ({ params }) => getDetails(params.id),
      },
    ],
  },
  {
    path: "annotation",
    element: <RootOpenProblems />,
    children: [{ path: ":category/:id", element: <AnnotationDetails /> }],
  },
]);
//Uncompleted home pages:
// {path: '/', element: <RootLayout/> ,children:[
//   {path: '', index: true, element: <Home/>},
//   {path: 'About', element: <About/>}]}

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
