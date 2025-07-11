import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
const googleSubmit =(e)=>{
  e.prevendefault()
}
  const onSubmit = data => {
    console.log(data);
    // Implement login logic here
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

        <button onSubmit={googleSubmit} className="flex items-center justify-center gap-2 w-full bg-white border hover:bg-gray-100 text-[#0f172a] py-2 rounded-md">
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
