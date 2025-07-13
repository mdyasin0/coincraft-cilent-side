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
        Swal.fire("✅ Approved!", "Submission has been approved.", "success");
        setSubmissions(submissions.filter((s) => s._id !== submission._id));
        setSelectedSubmission(null);
      }
    } catch (err) {
      Swal.fire("❌ Error", "Something went wrong.", "error");
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
    } catch (err) {
      Swal.fire("❌ Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">📝 Tasks to Review</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No pending submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th>Worker</th>
                <th>Task Title</th>
                <th>Payable Amount</th>
                <th>Submission</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.worker_name}</td>
                  <td>{submission.task_title}</td>
                  <td>{submission.payable_amount} coins</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
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
        <div className="modal modal-open bg-black/60 backdrop-blur-sm">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">📄 Submission Details</h3>
            <p><strong>Worker:</strong> {selectedSubmission.worker_name}</p>
            <p><strong>Task:</strong> {selectedSubmission.task_title}</p>
            <p><strong>Details:</strong> {selectedSubmission.submission_details}</p>

            <div className="modal-action justify-between mt-4">
              <button
                onClick={() => handleApprove(selectedSubmission)}
                className="btn btn-success"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => handleReject(selectedSubmission)}
                className="btn btn-error"
              >
                ❌ Reject
              </button>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="btn"
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
