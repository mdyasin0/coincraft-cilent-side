import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch ,  reset} = useForm();

 const onSubmit = async (data) => {
  const imageFile = data.photo[0]; 

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);

    const photoURL = imgbbRes.data.data.url;

    // ✅ Register user after photo is uploaded
    const { name, email, password, role } = data;

    const userData = {
      name,
      email,
      password,
      photoURL,
      role,
    };

    const res = await axios.post("http://localhost:5000/register-user", userData);

    if (res.data.insertedId) {
      Swal.fire("Success", "Registration successful!", "success");
      reset();
    } else {
      Swal.fire("Error", "Registration failed!", "error");
    }

  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 400) {
      Swal.fire("Error", error.response.data.message, "error");
    } else {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center pt-10 bg-[#f8fafc] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#0f172a] mb-6 text-center">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-[#0f172a] font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.name && <p className="text-[#dc2626] text-sm">Name is required</p>}
          </div>

          <div>
            <label className="text-[#0f172a] font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.email && <p className="text-[#dc2626] text-sm">Email is required</p>}
          </div>

          <div>
            <label className="text-[#0f172a] font-medium">Add Profile Picture </label>
            <input
              type="file"
              {...register("photo",{ required: true })}
              className="w-full px-4 py-2 border rounded-md mt-1"
              
            />
{errors.photo && <p className="text-red-500">Photo is required</p>}
          </div>

          <div>
            <label className="text-[#0f172a] font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
              })}
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.password && (
              <p className="text-[#dc2626] text-sm">Password must be 6 characters, one capital, one symbol</p>
            )}
          </div>

          <div>
            <label className="text-[#0f172a] font-medium">Select Role</label>
            <select
              {...register("role", { required: true })}
              className="w-full px-4 py-2 border rounded-md mt-1"
            >
              <option value="">Select</option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && <p className="text-[#dc2626] text-sm">Role is required</p>}
          </div>

          <button type="submit" className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-2 rounded-md">
            Register
          </button>
        </form>

      

        <p className="mt-4 text-sm text-center text-[#334155]">
          Already have an account? <a href="/login" className="text-[#0284c7] hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
