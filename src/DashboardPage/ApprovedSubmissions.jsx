import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authprovider/Firebase_context";


const ApprovedSubmissions = () => {
  const { user } = useContext(AuthContext);
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/filter_submission?email=${user.email}&status=approved`)
        .then((res) => {
          setApprovedSubmissions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load submissions", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <p>Loading approved submissions...</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-gray-800">✅ Approved Submissions</h2>
      {approvedSubmissions.length === 0 ? (
        <p>No approved submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Task Title</th>
                <th className="px-4 py-2 border">Payable Amount</th>
                <th className="px-4 py-2 border">Buyer Name</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedSubmissions.map((submission, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">{submission.task_title}</td>
                  <td className="px-4 py-2 border">${submission.payable_amount}</td>
                  <td className="px-4 py-2 border">{submission.buyer_name}</td>
                  <td className="px-4 py-2 border text-green-600 font-semibold">{submission.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedSubmissions;
