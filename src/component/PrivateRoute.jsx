import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Authprovider/Firebase_context";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center text-xl py-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
