// App.jsx
import React, { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkSpace from "./pages/workSpace/WorkSpace.jsx";
import "./sass/main.scss";
import Profile from "./pages/profile/Profile.jsx";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
