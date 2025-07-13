import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { AuthContext } from "../Authprovider/Firebase_context";

const MySubmission = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/submissions/worker/${user.email}`)
        .then((res) => setSubmissions(res.data))
        .catch((err) => console.error("Error loading submissions:", err));
    }
  }, [user]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 font-bold";
      case "rejected":
        return "text-red-600 font-bold";
      case "pending":
      default:
        return "text-yellow-600 font-bold";
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">📄 My Submissions</h2>
      {submissions.length === 0 ? (
        <p className="text-gray-500">You haven’t submitted any tasks yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th>Task Title</th>
                <th>Details</th>
                <th>Payable Amount</th>
                <th>Status</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.task_title}</td>
                  <td>{sub.submission_details?.slice(0, 30)}...</td>
                  <td>{sub.payable_amount} coins</td>
                  <td className={getStatusStyle(sub.status)}>{sub.status}</td>
                  <td>{new Date(sub.createdAt || sub._id?.getTimestamp()).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySubmission;
