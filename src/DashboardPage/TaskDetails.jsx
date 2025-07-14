import{ useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Authprovider/Firebase_context";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`).then((res) => {
      setTask(res.data);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(user.email);
    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user.email,
      worker_name: user.displayName,
      submission_details: submissionDetails,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      status: "pending",
      submission_date: new Date(),
    };

    await axios.post("http://localhost:5000/submissions", submissionData);

    Swal.fire("Submitted!", "Your task has been submitted for review.", "success");
 navigate("/dashboard/taskreviewforworker"); 
    setSubmissionDetails("");
  };

  if (!task) return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-xl"></span>
    </div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#0f172a]">{task.task_title}</h2>
      <p><strong>Buyer:</strong> {task.buyer_name}</p>
      <p><strong>Deadline:</strong> {task.completion_date}</p>
      <p><strong>Payable:</strong> ${task.payable_amount}</p>
      <p><strong>Workers Needed:</strong> {task.required_workers}</p>
      <p className="mt-2 text-gray-600">{task.description}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block font-medium text-gray-700">Submission Details:</label>
        <textarea
          value={submissionDetails}
          onChange={(e) => setSubmissionDetails(e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;
