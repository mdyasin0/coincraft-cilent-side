import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-[#0f172a]">
      <nav className=" py-3 max-w-6xl mx-auto  flex items-center  justify-between">
        <div className="flex items-center gap-3">
          <div>
            <Link>
              <img className="w-15" src="/favicon.png" alt="" />
            </Link>
          </div>
          <div>
            <Link>
              <h1 className="text-[#facc15] transition duration-300 text-xl font-bold">
                CoinCrafter
              </h1>
            </Link>
          </div>
        </div>

        <div className="font-bold text-md gap-5 flex">
          <NavLink className="text-white hover:text-[#facc15] transition duration-300">
            Dashboard
          </NavLink>
          <NavLink className="text-white hover:text-[#facc15] transition duration-300">
            Available Coin
          </NavLink>
        </div>
        <div className="flex gap-5 font-bold text-md">
          <NavLink className="text-white hover:text-[#facc15] transition duration-300">
            <img
              className="p-2  rounded-full w-12 bg-white"
              src="/favicon.png"
              alt=""
            />
          </NavLink>
          <NavLink className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1]  px-4 py-2 rounded-md">
            Logout{" "}
          </NavLink>
          <NavLink className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1]  px-4 py-2 rounded-md">
            Join as Developer
          </NavLink>
          <NavLink className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1]  px-4 py-2 rounded-md">
            Login
          </NavLink>
          <NavLink className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1]  px-4 py-2 rounded-md">
            Register
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
