import { useEffect } from "react";
import { useNavigate } from "react-router";
import useUserRole from "../Hook/UserRole";
import Swal from "sweetalert2";

const DashboardRedirect = () => {
  const navigate = useNavigate();
  const { role, loading } = useUserRole();

  useEffect(() => {
    if (loading) return;

    // console.log("worker role for index route ", role);

    if (role === "admin") {
      navigate("/dashboard/taskreviewforadmin");
    } else if (role === "buyer") {
      navigate("/dashboard/tasksreview");
    } else if (role === "worker") {
      navigate("/dashboard/taskreviewforworker");
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please register with another email. Don’t use this email again.",
        confirmButtonColor: "#d33",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [role, navigate, loading]);

  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
};

export default DashboardRedirect;
