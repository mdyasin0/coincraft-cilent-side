import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Load all tasks from the server
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/alltasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
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
      await axios.delete(`http://localhost:5000/delete-task/${id}`);
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-5 text-center text-[#0f172a]">Manage Tasks</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border">
          <thead className="bg-[#0284c7] text-white">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Buyer</th>
              <th>Payable</th>
              <th>Workers</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.task_title}</td>
                <td>{task.buyer_email}</td>
                <td>{task.payable_amount}</td>
                <td>{task.required_workers}</td>
                <td>{task.completion_date}</td>
                <td>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete Task
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-5">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
