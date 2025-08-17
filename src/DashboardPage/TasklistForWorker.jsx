import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const TaskListForWorker = () => {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState(null); 

  useEffect(() => {
    axios.get("https://coincrafter-chi.vercel.app/alltasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortOrder) return 0;
    if (sortOrder === "asc") return a.payable_amount - b.payable_amount;
    if (sortOrder === "desc") return b.payable_amount - a.payable_amount;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
        📝 Available Tasks
      </h2>

      {/* Sorting Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSortOrder("asc")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Sort by Price: Low → High
        </button>
        <button
          onClick={() => setSortOrder("desc")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sort by Price: High → Low
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]"
          >
            <img
              src={task.task_image_url || "https://via.placeholder.com/400x300.png?text=Task+Image"}
              alt={task.task_title}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-[#0f172a]">{task.task_title}</h3>
              <p className="text-gray-700"><span className="font-medium">👤 Buyer:</span> {task.buyer_name}</p>
              <p className="text-gray-700"><span className="font-medium">⏰ Deadline:</span> {task.completion_date}</p>
              <p className="text-gray-700"><span className="font-medium">💰 Payable:</span> ${task.payable_amount}</p>
              <p className="text-gray-700"><span className="font-medium">👥 Workers Needed:</span> {task.required_workers}</p>

              <Link
                to={`/dashboard/task-details/${task._id}`}
                className="inline-block w-full text-center mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                🔍 View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListForWorker;
