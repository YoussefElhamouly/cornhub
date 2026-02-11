import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./sass/main.scss";

// Pages
import Profile from "./pages/profile/Profile.jsx";
import Project from "./pages/project/Project.jsx";
import Branches from "./pages/project/branches/Branches.jsx";
import WorkSpace from "./pages/workSpace/WorkSpace.jsx";
import Wiki from "./pages/project/wiki/Wiki.jsx";
import Code from "./pages/project/code/Code.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
  },
  {
    path: "/:user/:project",
    element: <Project />,
    children: [
      {
        index: true,
        element: <Code />,
      },
      {
        path: "wiki",
        element: <Wiki />,
      },
    ],
  },
  {
    path: "/:user/:project/branches",
    element: <Branches />,
  },
  {
    path: "/:user/:project/tree",
    element: <WorkSpace />,
  },
  {
    path: "/:user/:project/settings",
    element: <Project />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
