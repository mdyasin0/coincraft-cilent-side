import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authprovider/Firebase_context";
;

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/payments/${user.email}`)
        .then((res) => {
          setPayments(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching payment history:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  return (
<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-[#0f172a] tracking-wide">
    Payment History
  </h2>

  {loading ? (
    <p className="text-center text-gray-500 italic">Loading payment history...</p>
  ) : payments.length === 0 ? (
    <p className="text-center text-gray-500 italic">No payment history found.</p>
  ) : (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full border border-gray-200 text-sm sm:text-base table-auto">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
          <tr>
            <th className="px-3 py-3 text-left whitespace-nowrap">#</th>
            <th className="px-3 py-3 text-left whitespace-nowrap">Transaction ID</th>
            <th className="px-3 py-3 text-left whitespace-nowrap">Amount ($)</th>
            <th className="px-3 py-3 text-left whitespace-nowrap">Coins</th>
            <th className="px-3 py-3 text-left whitespace-nowrap">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr
              key={payment._id}
              className="hover:bg-gray-50 border-t border-gray-200 transition-colors duration-150"
            >
              <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>
              <td className="px-3 py-2 text-blue-700 break-words max-w-xs">
                {payment.transactionId}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
              <td className="px-3 py-2 whitespace-nowrap">{payment.coins}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                {new Date(payment.date).toLocaleString()}
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

export default PaymentHistory;
