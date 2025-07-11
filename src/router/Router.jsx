import { createBrowserRouter } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },

      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
