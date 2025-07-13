import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const TaskListForWorker = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/alltasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-4 shadow-md rounded-lg border">
            <h3 className="text-xl font-semibold text-[#0f172a]">{task.task_title}</h3>
            <p>Buyer: {task.buyer_name}</p>
            <p>Deadline: {task.completion_date}</p>
            <p>Payable: ${task.payable_amount}</p>
            <p>Needed Workers: {task.required_workers}</p>
            <Link
              to={`/dashboard/task-details/${task._id}`}
              className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListForWorker;
