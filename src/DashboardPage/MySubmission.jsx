import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authprovider/Firebase_context";

const MySubmission = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    if (user?.email) {
      setLoading(true); // start loading
      axios.get(`http://localhost:5000/submissions/worker/${user.email}`)
        .then((res) => setSubmissions(res.data))
        .catch((err) => console.error("Error loading submissions:", err))
        .finally(() => setLoading(false)); // end loading
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
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
        📄 My Submissions
      </h2>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
       <span className="loading loading-spinner loading-xl"></span>
     </div>
      ) : submissions.length === 0 ? (
        <p className="text-gray-500 text-center sm:text-left">
          You haven’t submitted any tasks yet.
        </p>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-[640px] w-full text-sm md:text-base text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left whitespace-nowrap">Task Title</th>
                <th className="px-4 py-3 text-left whitespace-nowrap">Details</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Payable</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-left">{sub.task_title}</td>
                  <td className="px-4 py-3 text-left">
                    {sub.submission_details?.slice(0, 30)}...
                  </td>
                  <td className="px-4 py-3 text-center">{sub.payable_amount} coins</td>
                  <td
                    className={`px-4 py-3 text-center font-medium ${getStatusStyle(
                      sub.status
                    )}`}
                  >
                    {sub.status}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {new Date(
                      sub.createdAt || new Date()
                    ).toLocaleDateString()}
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

export default MySubmission;
