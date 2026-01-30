// App.jsx
import React, { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkSpace from "./pages/workSpace/WorkSpace.jsx";
import "./sass/main.scss";
import Profile from "./pages/profile/Profile.jsx";
import Project from "./pages/project/Project.jsx";
import Wiki from "./pages/wiki/Wiki.jsx";
function App() {
  const router = createBrowserRouter([
    {
      element: <WorkSpace />,
      path: "/",
    },
    {
      element: <Profile />,
      path: "/profile",
    },
    {
      element: <Project />,
      path: "/project",
    },
    {
      element: <Wiki />,
      path: "/wiki",
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
