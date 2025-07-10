import {
  createBrowserRouter,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import Home from "../page/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
        { index: true, Component: Home },
    ]
  },
]);

