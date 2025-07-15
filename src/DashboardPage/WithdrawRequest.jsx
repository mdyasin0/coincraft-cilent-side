import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const WithdrawRequest = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  // Load pending withdrawal requests
  useEffect(() => {
    axios
      .get("https://coincrafter-chi.vercel.app/withdrawals/pending")
      .then((res) => setWithdrawals(res.data))
      .catch((err) => console.error("Error loading withdrawals:", err));
  }, []);

  // Approve withdrawal
  const handleApprove = async (id) => {
    const confirm = window.confirm("Are you sure to mark as paid?");
    if (!confirm) return;

    try {
      const res = await axios.patch(`https://coincrafter-chi.vercel.app/withdrawals/approve/${id}`);
      if (res.data.success) {
        Swal.fire("Success", "Withdrawal marked as paid!", "success");
        // Remove approved item from state
        setWithdrawals(withdrawals.filter((item) => item._id !== id));
      } else {
        Swal.fire("Failed", "Could not approve withdrawal", "error");
      }
    } catch (error) {
      console.error("Approval error:", error);
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  return (
  <div className="px-4 py-6 sm:px-6 lg:px-8">
  <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
    Pending Withdrawal Requests
  </h2>

  {withdrawals.length === 0 ? (
    <p className="text-gray-500 text-center">No pending requests.</p>
  ) : (
    <div className="w-full overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full table-auto border border-gray-200 bg-white">
        <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase">
          <tr>
            <th className="px-3 py-2 border text-left">#</th>
            <th className="px-3 py-2 border text-left">Worker</th>
            <th className="px-3 py-2 border text-left">Email</th>
            <th className="px-3 py-2 border text-center">Coin</th>
            <th className="px-3 py-2 border text-center">Amount ($)</th>
            <th className="px-3 py-2 border text-left">Payment System</th>
            <th className="px-3 py-2 border text-left">Account Number</th>
            <th className="px-3 py-2 border text-left">Date</th>
            <th className="px-3 py-2 border text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm sm:text-base text-gray-800">
          {withdrawals.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-3 py-2 border text-left">{index + 1}</td>
              <td className="px-3 py-2 border text-left">{item.worker_name}</td>
              <td className="px-3 py-2 border text-left">{item.worker_email}</td>
              <td className="px-3 py-2 border text-center">{item.withdrawal_coin}</td>
              <td className="px-3 py-2 border text-center">${item.withdrawal_amount}</td>
              <td className="px-3 py-2 border text-left">{item.payment_system}</td>
              <td className="px-3 py-2 border text-left break-all">{item.account_number}</td>
              <td className="px-3 py-2 border text-left">
                {new Date(item.withdraw_date).toLocaleString()}
              </td>
              <td className="px-3 py-2 border text-center">
                <button
                  onClick={() => handleApprove(item._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-xs sm:text-sm transition"
                >
                  Payment Success
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


  );
};

export default WithdrawRequest;
