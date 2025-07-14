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
    <div className="p-4 sm:p-6 md:p-8 bg-white shadow-md rounded-xl overflow-hidden">
  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
    <span className="text-green-600 text-xl">✅</span>
    Approved Submissions
  </h2>

  {approvedSubmissions.length === 0 ? (
    <p className="text-gray-500 text-sm md:text-base">No approved submissions found.</p>
  ) : (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-[500px] w-full table-auto text-sm md:text-base text-gray-700">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left border">Task Title</th>
            <th className="px-4 py-3 text-left border">Payable Amount</th>
            <th className="px-4 py-3 text-left border">Buyer Name</th>
            <th className="px-4 py-3 text-left border">Status</th>
          </tr>
        </thead>
        <tbody>
          {approvedSubmissions.map((submission, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-all border-b last:border-b-0"
            >
              <td className="px-4 py-3 border whitespace-nowrap">{submission.task_title}</td>
              <td className="px-4 py-3 border whitespace-nowrap text-green-700 font-medium">
                ${submission.payable_amount}
              </td>
              <td className="px-4 py-3 border whitespace-nowrap">{submission.buyer_name}</td>
              <td className="px-4 py-3 border whitespace-nowrap text-green-600 font-semibold">
                {submission.status}
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

export default ApprovedSubmissions;
