import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Authprovider/Firebase_context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WorkerOverviewChart = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://coincrafter-chi.vercel.app/submissions/worker?email=${user.email}`
        )
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  const totalSubmissions = submissions.length;
  const totalPending = submissions.filter((s) => s.status === "pending").length;
  const totalEarnings = submissions
    .filter((s) => s.status === "approved")
    .reduce((sum, curr) => sum + (curr.payable_amount || 0), 0);

  const data = [
    { name: "Total Submissions", value: totalSubmissions },
    { name: "Pending Submissions", value: totalPending },
    { name: "Total Earnings ($)", value: totalEarnings },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        📊 Worker Stats
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkerOverviewChart;
