import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Authprovider/Firebase_context";
import axios from "axios";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://coincrafter-chi.vercel.app/user?email=${user.email}`)
        .then((res) => {
          setUserData(res.data); 
          // console.log("navbar data",res.data);
        })
        .catch((err) => console.error("Failed to load user", err));
    }
  }, [user]);

  const logouthandale = async () => {
    try {
      await logOut();
         setUserData(null);
      Swal.fire("Success", "Logged out successfully!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to logout!", "error");
    }
  };
  return (
     <div className="bg-[#0f172a] fixed top-0 w-full z-10 mb-10">
      <nav className="py-3 max-w-6xl mx-auto flex flex-wrap items-center justify-between px-4 md:px-0">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <Link to="/home">
            <img className="w-10" src="/favicon.png" alt="logo" />
          </Link>
          <Link to="/home">
            <h1 className="text-[#facc15] transition duration-300 text-xl font-bold">
              CoinCrafter
            </h1>
          </Link>
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:justify-between md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6`}
        >
          <div className="font-bold text-md flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5">
            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className="text-white hover:text-[#facc15] transition duration-300"
                >
                  Dashboard
                </NavLink>

                <div className="text-white flex items-center gap-1">
                  <img className="w-6" src="https://i.ibb.co/PZSBhqZk/coin.png" alt="coin" />
                  {userData?.coin}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName}
                width={40}
                className="rounded-full"
              />
            )}

            <NavLink
              to="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-mdyasin0"
              className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1] px-4 py-2 rounded-md"
            >
              Join as Developer
            </NavLink>

            {user ? (
              <button
                onClick={logouthandale}
                className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1] px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1] px-4 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1] px-4 py-2 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
