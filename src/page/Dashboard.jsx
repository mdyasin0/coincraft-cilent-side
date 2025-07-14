import React, { useContext, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Footer from "../component/Footer";
import { Link, NavLink, Outlet } from "react-router";
import { AiFillHome, AiOutlineHistory } from "react-icons/ai";
import { MdOutlineManageAccounts, MdTask } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";
import { FaCoins, FaUsersCog } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { BsClipboardCheck } from "react-icons/bs";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { AuthContext } from "../Authprovider/Firebase_context";
import axios from "axios";
import useUserRole from "../Hook/UserRole";

const Dashboard = () => {
  const { role, loading } = useUserRole();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/user?email=${user.email}`)
        .then((res) => {
          setUserData(res.data);
          console.log("navbar data", res.data);
        })
        .catch((err) => console.error("Failed to load user", err));
    }
  }, [user]);
  if (loading) return <p>Loading...</p>;
  return (
   <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="bg-[#0284c7] w-full">
        <nav className="flex justify-between items-center max-w-6xl mx-auto py-3 px-4 md:px-0">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/home">
              <img className="w-10" src="/favicon.png" alt="Logo" />
            </Link>
            <Link to="/home">
              <h1 className="text-[#facc15] text-xl font-bold">CoinCrafter</h1>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* User Info */}
            <div className="hidden sm:flex flex-col text-white text-sm">
              {userData ? (
                <>
                  <div className="flex items-center gap-3">
                    <img
                      src={userData?.photoURL || "/favicon.png"}
                      alt={userData?.name || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                    <p>Name: {userData?.name}</p>
                  </div>
                  <div className="border border-amber-300 my-1"></div>
                  <div className="flex items-center gap-3">
                    <p>Role: {userData?.role}</p>
                    <div className="flex items-center gap-1">
                      <img className="w-5" src="src/assets/coin.png" alt="" />
                      <p className="font-bold">{userData?.coin}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading user...</p>
              )}
            </div>

            {/* Notification */}
            <div className="text-white hover:text-[#facc15]">
              <div className="tooltip" data-tip="Notification">
                <div className="indicator">
                  <span className="indicator-item status status-success"></span>
                  <div className="bg-yellow-300 text-black text-lg p-2 rounded-full">
                    <IoMdNotificationsOutline />
                  </div>
                </div>
              </div>
            </div>

            {/* Hamburger for mobile */}
            <div className="sm:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white focus:outline-none"
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                {sidebarOpen ? (
                  // Cross icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {/* Small screen: fixed full screen overlay when open */}
        {/* Large screen: static sidebar */}
        <div
          className={`
            bg-[#0f172a] text-white p-4
            sm:relative sm:block sm:w-3/12  sm:h-auto overflow-y-auto
            fixed top-0 left-0 z-50 h-full w-full
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0 sm:w-3/12 sm:h-auto sm:static
          `}
        >
          <div className="space-y-2">
            <NavLink
              to="/"
              className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
              onClick={() => setSidebarOpen(false)} // close drawer on link click
            >
              <AiFillHome />
              Home
            </NavLink>

            {role === "admin" && (
              <>
                <NavLink
                  to="/dashboard/taskreviewforadmin"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <MdTask />
                  TaskList
                </NavLink>

                <NavLink
                  to="/dashboard/manageusers"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUsersCog />
                  Manage Users
                </NavLink>

                <NavLink
                  to="/dashboard/managetasks"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <MdOutlineManageAccounts />
                  Manage Tasks
                </NavLink>
              </>
            )}
            {role === "worker" && (
              <>
                <NavLink
                  to="/dashboard/taskreviewforworker"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <MdTask />
                  TaskList
                </NavLink>
                <NavLink
                  to="/dashboard/mysubmission"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <BiSend />
                  My Submissions
                </NavLink>
                <NavLink
                  to="/dashboard/withdrawals"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <HiOutlineCurrencyDollar />
                  Withdrawals
                </NavLink>
              </>
            )}
            {role === "buyer" && (
              <>
                <NavLink
                  to="/dashboard/tasksreview"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <MdTask />
                  TaskList
                </NavLink>
                <NavLink
                  to="/dashboard/addtask"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <RiPlayListAddLine />
                  Add Task
                </NavLink>
                <NavLink
                  to="/dashboard/mytasklist"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <BsClipboardCheck />
                  My Tasks
                </NavLink>
                <NavLink
                  to="/dashboard/purchasecoins"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaCoins />
                  Purchase Coin
                </NavLink>
                <NavLink
                  to="/dashboard/paymenthistory"
                  className="p-2 rounded flex items-center gap-3 hover:bg-[#0284c7]"
                  onClick={() => setSidebarOpen(false)}
                >
                  <AiOutlineHistory />
                  Payment History
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Overlay for small devices when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="bg-[#f8fafc] flex-1 h-full overflow-y-auto p-4 sm:w-9/12">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>

  );
};

export default Dashboard;
