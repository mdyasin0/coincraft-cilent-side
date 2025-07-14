import { useContext, useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authprovider/Firebase_context";

const TaskToReview = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  


  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/submissions/pending/${user.email}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setSubmissions(res.data);
          } else {
            setSubmissions([]);
            console.error("Response is not an array:", res.data);
          }
        })
        .catch((err) => {
          console.error("Fetch Error:", err);
        });
    }
  }, [user]);

  const handleApprove = async (submission) => {
    try {
      const res = await axios.patch(`http://localhost:5000/submissions/approve/${submission._id}`);
      if (res.data.success) {
        Swal.fire(" Approved!", "Submission has been approved.", "success");
        setSubmissions(submissions.filter((s) => s._id !== submission._id));
        setSelectedSubmission(null);
      }
    } catch  {
      Swal.fire(" Error", "Something went wrong.", "error");
    }
  };

  const handleReject = async (submission) => {
    try {
      const res = await axios.patch(`http://localhost:5000/submissions/reject/${submission._id}`);
      if (res.data.success) {
        Swal.fire("❗ Rejected!", "Submission has been rejected.", "info");
        setSubmissions(submissions.filter((s) => s._id !== submission._id));
        setSelectedSubmission(null);
      }
    } catch  {
      Swal.fire(" Error", "Something went wrong.", "error");
    }
  };

  return (
   <div className="px-4 py-8 max-w-6xl mx-auto">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left text-gray-800">
    📝 Tasks to Review
  </h2>

  {submissions.length === 0 ? (
    <p className="text-gray-500 text-center">No pending submissions found.</p>
  ) : (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="min-w-full text-sm sm:text-base text-center">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
          <tr>
            <th className="px-4 py-3">Worker</th>
            <th className="px-4 py-3">Task Title</th>
            <th className="px-4 py-3">Payable Amount</th>
            <th className="px-4 py-3">Submission</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {submissions.map((submission) => (
            <tr key={submission._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3">{submission.worker_name}</td>
              <td className="px-4 py-3">{submission.task_title}</td>
              <td className="px-4 py-3">{submission.payable_amount} coins</td>
              <td className="px-4 py-3">
                <button
                  className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition px-3 py-1 rounded"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Modal */}
  {selectedSubmission && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
          📄 Submission Details
        </h3>
        <div className="text-gray-700 space-y-2">
          <p>
            <strong>Worker:</strong> {selectedSubmission.worker_name}
          </p>
          <p>
            <strong>Task:</strong> {selectedSubmission.task_title}
          </p>
          <p>
            <strong>Details:</strong> {selectedSubmission.submission_details}
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            onClick={() => handleApprove(selectedSubmission)}
            className="btn w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white transition"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(selectedSubmission)}
            className="btn w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white transition"
          >
             Reject
          </button>
          <button
            onClick={() => setSelectedSubmission(null)}
            className="btn w-full sm:w-auto bg-gray-300 hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>


  );
};

export default TaskToReview;
