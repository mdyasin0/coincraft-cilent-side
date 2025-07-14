import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Authprovider/Firebase_context";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";


const Login = () => {
  const location = useLocation();
const navigate = useNavigate();

const from = location.state?.from?.pathname || "/dashboard";
  
  const { register, handleSubmit, formState: { errors } } = useForm();
   const { signIn ,googleSignIn } = useContext(AuthContext);
const googleSubmit = async (e) => {
  
    e.preventDefault();

    try {
     
      const result = await googleSignIn();
      const user = result.user;

      const saveUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "worker", // default role
      };

      
      const res = await axios.post("http://localhost:5000/google-signin", saveUser);

      if (res.data.insertedId || res.data.user) {
        Swal.fire("Success", "User signed in and saved!", "success");
       
        navigate("/dashboard"); 
      } else {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Google Sign-In Failed:", error);
      Swal.fire("Error", "Google Sign-In failed!", "error");
    }
  };
 const onSubmit = async (data) => {
  const { email, password } = data;

  try {
    await signIn(email, password);
    Swal.fire("Success", "Login successful!", "success");
     navigate(from, { replace: true });
  } catch (error) {
    console.error(error);
    let message = "Something went wrong!";

    if (error.code === "auth/invalid-credential") {
      message = "User not found. Please register first.";
    } else if (error.code === "auth/wrong-password") {
      message = "Incorrect password. Try again.";
    } else if (error.code === "auth/invalid-email") {
      message = "Invalid email address.";
    }

    Swal.fire("Error", message, "error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#0f172a] mb-6 text-center">Login to CoinCrafter</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-[#0f172a] font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.email && <p className="text-[#dc2626] text-sm">Email is required</p>}
          </div>

          <div>
            <label className="text-[#0f172a] font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.password && <p className="text-[#dc2626] text-sm">Password is required</p>}
          </div>

          <button type="submit" className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-2 rounded-md">
            Login
          </button>
        </form>

        <div className="text-center my-4">— or —</div>

        <button onClick={googleSubmit} className="flex items-center justify-center gap-2 w-full bg-white border hover:bg-gray-100 text-[#0f172a] py-2 rounded-md">
          <FaGoogle /> Sign in with Google
        </button>

        <p className="mt-4 text-sm text-center text-[#334155]">
          Don't have an account? <a href="/register" className="text-[#0284c7] hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
