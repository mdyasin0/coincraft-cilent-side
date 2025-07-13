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
    <div className="admin-stats p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard Stats</h2>
      <ul className="space-y-2 text-lg">
        <li>
          <strong>Total Workers:</strong> {stats.totalWorkers}
        </li>
        <li>
          <strong>Total Buyers:</strong> {stats.totalBuyers}
        </li>
        <li>
          <strong>Total Available Coins:</strong> {stats.totalCoins.toLocaleString()}
        </li>
        <li>
          <strong>Total Payments (Approved Withdrawals):</strong> ${stats.totalPayments.toFixed(2)}
        </li>
      </ul>
    </div>
  );
};

export default AdminStats;
