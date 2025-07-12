import React from "react";
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

const Dashboard = () => {
  return (
    <div>
      <div className="bg-[#0284c7]"> 
        <nav className=" flex justify-between	 max-w-6xl mx-auto py-3">
        <div><div className="flex items-center gap-3">
                  <div>
                    <Link to="/home">
                      <img className="w-15" src="/favicon.png" alt="" />
                    </Link>
                  </div>
                  <div>
                    <Link to="/home">
                      <h1 className="text-[#facc15] transition duration-300 text-xl font-bold">
                        CoinCrafter
                      </h1>
                    </Link>
                  </div>
                </div></div>
        <div className="flex items-center gap-5">
          <div className="text-[#facc15]">
            <div className="flex  gap-5 items-center">
              <p>Available coin</p>
              <p>userImage </p>
            </div>
            <div className="flex gap-5 items-center">
              <p>userRole</p>
              <p>userName</p>
            </div>
          </div>
          <div className="text-white hover:text-[#facc15]">
            <div className="tooltip" data-tip="Notification">
              <div className="indicator">
                <span className="indicator-item status status-success"></span>
                <div className="  ">
                  <IoMdNotificationsOutline />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      </div>
      <div className="flex h-screen">
       <div className="bg-[#0f172a] w-3/12 h-full overflow-y-auto">
         <div>
            <NavLink to="/"  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><AiFillHome/>Home</NavLink>
            <NavLink  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><MdTask/>TaskList</NavLink>
            <NavLink to="/dashboard/addtask"  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><RiPlayListAddLine/>Add new Tasks</NavLink>
            <NavLink  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><FaUsersCog/>Manage Users</NavLink>
            <NavLink  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><BiSend/>My Submissions</NavLink>
            <NavLink  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><BsClipboardCheck/>My Task’s</NavLink>
            <NavLink  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><MdOutlineManageAccounts/>Manage Task</NavLink>
            <NavLink  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><HiOutlineCurrencyDollar/>Withdrawals</NavLink>
            <NavLink  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><FaCoins/>Purchase Coin</NavLink>
            <NavLink  className="  p-2 rounded transition flex items-center gap-5 text-white hover:bg-[#0284c7] hover:text-[#f8fafc]"><AiOutlineHistory/>Payment history</NavLink>
         </div>
       </div>
       <div className="bg-[#f8fafc] w-9/12 h-full overflow-y-auto py-10">
          <Outlet></Outlet>
       </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
