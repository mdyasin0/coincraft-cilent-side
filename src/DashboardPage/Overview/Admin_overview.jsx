import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const AdminOverviewChart = () => {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalCoins: 0,
    totalPayments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);

        const resStats = await fetch("https://coincrafter-chi.vercel.app/admin_stats");
        if (!resStats.ok) throw new Error("Failed to fetch admin stats");
        const statsData = await resStats.json();

        const resPayments = await fetch("https://coincrafter-chi.vercel.app/withdrawals/total-payment");
        if (!resPayments.ok) throw new Error("Failed to fetch total payments");
        const paymentsData = await resPayments.json();

        setStats({
          totalWorkers: statsData.totalWorkers || 0,
          totalBuyers: statsData.totalBuyers || 0,
          totalCoins: statsData.totalCoins || 0,
          totalPayments: paymentsData.totalApprovedPayment || 0,
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">
    <span className="loading loading-spinner loading-xl"></span>
  </div>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const chartData = [
    { name: 'Workers', value: stats.totalWorkers },
    { name: 'Buyers', value: stats.totalBuyers },
    { name: 'Coins', value: stats.totalCoins },
    { name: 'Payments', value: stats.totalPayments },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Admin Dashboard Stats
      </h2>

      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" shape={<TriangleBar />} label={{ position: 'top' }}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default AdminOverviewChart;
