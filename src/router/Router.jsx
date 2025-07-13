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
import MyTaskList from "../DashboardPage/Mytasks";
import Updatetask from "../DashboardPage/Updatetask";
import ManageUsers from "../DashboardPage/ManageUsers";
import ManageTasks from "../DashboardPage/ManageTasks";
import PurchaseCoins from "../DashboardPage/PurchaseCoins";
import PaymentHistory from "../DashboardPage/PaymentHistory";
import TaskListForWorker from "../DashboardPage/TasklistForWorker";
import TaskDetails from "../DashboardPage/TaskDetails";
import MySubmission from "../DashboardPage/MySubmission";
import Withdrawals from "../DashboardPage/Withdrawals";

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
      {
        path: "/dashboard/mytasklist",
        Component: MyTaskList,
      },
      {
        path: "/dashboard/update-task/:id",
        Component: Updatetask,
      },
      {
        path: "/dashboard/manageusers",
        Component: ManageUsers,
      },
      {
        path: "/dashboard/managetasks",
        Component: ManageTasks,
      },
      {
        path: "/dashboard/purchasecoins",
        Component: PurchaseCoins,
      },
      {
        path: "/dashboard/paymenthistory",
        Component: PaymentHistory,
      },

      {
        path: "/dashboard/tasklistforworker",
        Component: TaskListForWorker,
      },
      {
        path: "/dashboard/task-details/:id",
        Component: TaskDetails,
      },
      {
        path:"/dashboard/mysubmission" ,
        Component: MySubmission ,
      },{
        path: "/dashboard/withdrawals" ,
        Component : Withdrawals ,
        
      }
    ],
  },
]);
