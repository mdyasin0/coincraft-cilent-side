import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { AuthContext } from "../../Authprovider/Firebase_context";


const WorkerStats = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/submissions/worker?email=${user.email}`)
        .then((res) => {
          setSubmissions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load submissions", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <p>Loading stats...</p>;

  const totalSubmissions = submissions.length;
  const totalPending = submissions.filter((s) => s.status === "pending").length;
  const totalEarnings = submissions
    .filter((s) => s.status === "approved")
    .reduce((sum, curr) => sum + (curr.payable_amount || 0), 0);

  return (
    <div className="p-4 bg-white rounded shadow-md space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">📊 Worker Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded">
          <p className="text-lg font-bold text-blue-700">{totalSubmissions}</p>
          <p>Total Submissions</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-lg font-bold text-yellow-700">{totalPending}</p>
          <p>Pending Submissions</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-lg font-bold text-green-700">${totalEarnings}</p>
          <p>Total Earnings</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerStats;
