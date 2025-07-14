import React, { useEffect, useState } from "react";

const AdminStats = () => {
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

        // Fetch worker, buyer, coin stats
        const resStats = await fetch("http://localhost:5000/admin_stats");
        if (!resStats.ok) throw new Error("Failed to fetch admin stats");
        const statsData = await resStats.json();

        // Fetch total payments
        const resPayments = await fetch("http://localhost:5000/withdrawals/total-payment");
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

  if (loading) return <p>Loading admin stats...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="admin-stats w-full max-w-4xl mx-auto p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
    Admin Dashboard Stats
  </h2>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div className="bg-blue-100 dark:bg-blue-900 p-5 rounded-xl shadow">
      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Workers</p>
      <p className="text-xl font-bold text-blue-900 dark:text-blue-100">{stats.totalWorkers}</p>
    </div>
    
    <div className="bg-green-100 dark:bg-green-900 p-5 rounded-xl shadow">
      <p className="text-sm font-medium text-green-800 dark:text-green-200">Total Buyers</p>
      <p className="text-xl font-bold text-green-900 dark:text-green-100">{stats.totalBuyers}</p>
    </div>
    
    <div className="bg-yellow-100 dark:bg-yellow-900 p-5 rounded-xl shadow">
      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Total Available Coins</p>
      <p className="text-xl font-bold text-yellow-900 dark:text-yellow-100">{stats.totalCoins.toLocaleString()}</p>
    </div>
    
    <div className="bg-purple-100 dark:bg-purple-900 p-5 rounded-xl shadow">
      <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Payments (Approved Withdrawals)</p>
      <p className="text-xl font-bold text-purple-900 dark:text-purple-100">${stats.totalPayments.toFixed(2)}</p>
    </div>
  </div>
</div>

  );
};

export default AdminStats;
