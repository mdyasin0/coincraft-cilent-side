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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0f172a]">
        Payment History
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading payment history...</p>
      ) : payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount ($)</th>
                <th>Coins</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td className="text-sm text-blue-700">{payment.transactionId}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.coins}</td>
                  <td>{new Date(payment.date).toLocaleString()}</td>
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
