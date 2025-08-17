import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import AddTask from "../DashboardPage/AddNewTasks";
import Dashboard from "../page/Dashboard";
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
import Taskreviewforadmin from "../DashboardPage/Taskslist/Taskreviewforadmin";
import Taskreviewforworker from "../DashboardPage/Taskslist/Taskreviewforworker";
import Tasksreview from "../DashboardPage/Taskslist/Tasksreviewforbuyer";
import PrivateRoute from "../component/PrivateRoute";
import ErrorPage from "../page/ErrorPage";
import DashboardRedirect from "./DashboardRedirect";
import Admin_overview from "../DashboardPage/Overview/Admin_overview";
import Worker_overview from "../DashboardPage/Overview/Worker_overview";
import Buyer_overview from "../DashboardPage/Overview/buyer_overview";

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

    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
       {
      index: true,
      element: (
        <PrivateRoute>
          <DashboardRedirect />
        </PrivateRoute>
      ),
    },
      {
        path: "/dashboard/addtask",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/tasksreview",
        element: (
          <PrivateRoute>
            <Tasksreview />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/mytasklist",
        element: (
          <PrivateRoute>
            <MyTaskList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-task/:id",
        element: (
          <PrivateRoute>
            <Updatetask />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageusers",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/managetasks",
        element: (
          <PrivateRoute>
            <ManageTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/purchasecoins",
        element: (
          <PrivateRoute>
            <PurchaseCoins />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/paymenthistory",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/tasklistforworker",
        element: (
          <PrivateRoute>
            <TaskListForWorker />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/taskreviewforadmin",
        element: (
          <PrivateRoute>
            <Taskreviewforadmin />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/taskreviewforworker",
        element: (
          <PrivateRoute>
            <Taskreviewforworker />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/task-details/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/mysubmission",
        element: (
          <PrivateRoute>
            <MySubmission />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/adminoverview" ,
        element : (
          <PrivateRoute>
            <Admin_overview></Admin_overview>
          </PrivateRoute>
        )
      },
      {
        path: "/dashboard/worker_overview" ,
        element: (
          <PrivateRoute>
            <Worker_overview></Worker_overview>
          </PrivateRoute>
        )
      }
      ,
      {
        path: "/dashboard/buyer_overview" ,
        element: (
          <PrivateRoute>
            <Buyer_overview></Buyer_overview>
          </PrivateRoute>
        )
      }
      ,
      {
        path: "/dashboard/withdrawals",
        element: (
          <PrivateRoute>
            <Withdrawals />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path:"*",
    Component: ErrorPage ,
  }
]);
