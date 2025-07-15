import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  // Load all tasks from the server
  const fetchTasks = async () => {
    try {
      setLoading(true); // Start loading
      const res = await axios.get("https://coincrafter-chi.vercel.app/alltasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Delete task with confirmation
  const handleDeleteTask = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`https://coincrafter-chi.vercel.app/delete-task/${id}`);
      Swal.fire("Deleted!", "Task has been deleted.", "success");
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      Swal.fire("Error", "Failed to delete task.", "error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-8">
        Manage Tasks
      </h2>

      {loading ? (
       <div className="flex justify-center items-center h-screen">
       <span className="loading loading-spinner loading-xl"></span>
     </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border border-gray-200 text-sm sm:text-base">
            <thead className="bg-[#0284c7] text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Buyer</th>
                <th className="px-4 py-3 text-left">Payable</th>
                <th className="px-4 py-3 text-left">Workers</th>
                <th className="px-4 py-3 text-left">Deadline</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={task._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{task.task_title}</td>
                    <td className="px-4 py-3">{task.buyer_email}</td>
                    <td className="px-4 py-3">${task.payable_amount}</td>
                    <td className="px-4 py-3">{task.required_workers}</td>
                    <td className="px-4 py-3">{task.completion_date}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md shadow-sm transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-8">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;
