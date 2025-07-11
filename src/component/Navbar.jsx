import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Authprovider/Firebase_context";
import axios from "axios";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/user?email=${user.email}`)
        .then((res) => {
          setUserData(res.data); 
          console.log(res.data);
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
    <div className="bg-[#0f172a]">
      <nav className=" py-3 max-w-6xl mx-auto  flex items-center  justify-between">
        <div className="flex items-center gap-3">
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
        </div>

        <div className="font-bold text-md gap-5 flex  items-center">
          
{user?(<>

<NavLink to="/dashboard" className="text-white hover:text-[#facc15] transition duration-300">
            Dashboard
          </NavLink>

            <div className="text-white flex gap-1 items-center">
            
           <img className="w-6" src="src/assets/coin.png" alt="" />{userData?.coin}

          </div>
</>):(" ")

            }

        
        </div>
        <div className="flex gap-5 font-bold text-md">
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
            className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1]  px-4 py-2 rounded-md"
          >
            Join as Developer
          </NavLink>

          {user ? (
            <>
              <button
                onClick={logouthandale}
                className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1]  px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1]  px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-[#facc15] transition duration-300 bg-[#0284c7] hover:bg-[#0369a1]  px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
