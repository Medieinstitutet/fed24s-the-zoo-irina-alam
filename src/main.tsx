import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // ← add createBrowserRouter
import Home from "./Home.tsx";
import AnimalPage from "./AnimalPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Page not found</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "animal/:id", element: <AnimalPage /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
