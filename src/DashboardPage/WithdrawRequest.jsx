import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const WithdrawRequest = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  // Load pending withdrawal requests
  useEffect(() => {
    axios
      .get("http://localhost:5000/withdrawals/pending")
      .then((res) => setWithdrawals(res.data))
      .catch((err) => console.error("Error loading withdrawals:", err));
  }, []);

  // Approve withdrawal
  const handleApprove = async (id) => {
    const confirm = window.confirm("Are you sure to mark as paid?");
    if (!confirm) return;

    try {
      const res = await axios.patch(`http://localhost:5000/withdrawals/approve/${id}`);
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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pending Withdrawal Requests</h2>

      {withdrawals.length === 0 ? (
        <p className="text-gray-500">No pending requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Worker</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Coin</th>
                <th className="p-2 border">Amount ($)</th>
                <th className="p-2 border">Payment System</th>
                <th className="p-2 border">Account Number</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((item, index) => (
                <tr key={item._id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.worker_name}</td>
                  <td className="p-2 border">{item.worker_email}</td>
                  <td className="p-2 border">{item.withdrawal_coin}</td>
                  <td className="p-2 border">${item.withdrawal_amount}</td>
                  <td className="p-2 border">{item.payment_system}</td>
                  <td className="p-2 border">{item.account_number}</td>
                  <td className="p-2 border">
                    {new Date(item.withdraw_date).toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
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
