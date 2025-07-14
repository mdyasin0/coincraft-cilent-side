// hooks/useUserRole.js
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authprovider/Firebase_context";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/user?email=${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          console.log( "data by user role hooks ",res.data.role)
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load role", err);
          setLoading(false);
        });
    }
  }, [user]);

  return { role, loading };
};

export default useUserRole;
