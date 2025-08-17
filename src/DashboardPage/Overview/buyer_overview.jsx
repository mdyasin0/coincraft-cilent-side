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

const BuyerOverviewChart = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalTaskCount: 0,
    pendingTaskCount: 0,
    totalPayment: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerStats = async () => {
      try {
        const res = await axios.get(
          `https://coincrafter-chi.vercel.app/buyer-stats/${user.email}`
        );
        setStats(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching buyer stats:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchBuyerStats();
    }
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  // Convert stats object into Recharts-friendly array
  const data = [
    { name: "Total Tasks", value: stats.totalTaskCount },
    { name: "Pending Tasks", value: stats.pendingTaskCount },
    { name: "Total Payment", value: stats.totalPayment },
  ];

  return (
    <div className="w-full h-80 sm:h-96 max-w-4xl mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={40}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#0284c7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BuyerOverviewChart;
