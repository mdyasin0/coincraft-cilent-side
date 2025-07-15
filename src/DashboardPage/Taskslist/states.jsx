import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Authprovider/Firebase_context";


const BuyerStats = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalTaskCount: 0,
    pendingTaskCount: 0,
    totalPayment: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerStats = async () => {
      try {
        const res = await axios.get(`https://coincrafter-chi.vercel.app/buyer-stats/${user.email}`);
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

  if (loading) return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-xl"></span>
    </div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto gap-4 text-[#0f172a]">
      <div className="bg-white p-4 text-center    rounded shadow">
        <h3 className="font-bold ">Total Tasks</h3>
        <p className="text-xl font-black text-[#0284c7]">{stats.totalTaskCount}</p>
      </div>

      <div className="bg-white p-4  text-center   rounded shadow">
        <h3 className="font-bold ">Pending Task (Workers Needed)</h3>
        <p className="text-xl font-black text-[#facc15]">{stats.pendingTaskCount}</p>
      </div>

      <div className="bg-white p-4  text-center    rounded shadow">
        <h3 className="font-bold ">Total Payment Paid</h3>
        <p className="text-xl font-black text-[#16a34a]">{stats.totalPayment} Coins</p>
      </div>
    </div>
  );
};

export default BuyerStats;
