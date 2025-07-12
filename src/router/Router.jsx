import { createBrowserRouter } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";

import AddTask from "../DashboardPage/AddNewTasks";
import Dashboard from "../page/Dashboard";
import Tasksreview from "../DashboardPage/Taskslist/Tasksreview";

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
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        path: "/dashboard/addtask",
        Component: AddTask,
      },
      {
        path: "/dashboard/tasksreview",
        Component: Tasksreview,
      },
    ],
  },
]);
