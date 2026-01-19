// App.jsx
import React, { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkSpace from "./pages/workSpace/WorkSpace.jsx";
import "./sass/main.scss";

function App() {
  const router = createBrowserRouter([
    {
      element: <WorkSpace />,
      path: "/",
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
