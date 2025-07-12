import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authprovider/Firebase_context";
import Swal from "sweetalert2";

const MyTaskList = () => {
  const { user } = useContext(AuthContext);
  const [myTasks, setMyTasks] = useState([]);

  const fetchMyTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/my-tasks/${user.email}`);
      setMyTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyTasks();
    }
  }, [user]);

 const handleDelete = async (taskId, workers, amount, status) => {
  const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete this task?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (confirm.isConfirmed) {
    try {
      // Delete task
      await axios.delete(`http://localhost:5000/delete-task/${taskId}`);

      // Refill coins if task is not completed
      if (status !== 'completed') {
        const refillAmount = workers * amount;
        await axios.patch(`http://localhost:5000/refill-coins/${user.email}`, {
          refill: refillAmount,
        });
      }

      // Reload task list
      fetchMyTasks();

      Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  }
};

  const handleUpdate = (task) => {
    // Navigate to update page with task ID
    window.location.href = `/dashboard/update-task/${task._id}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-[#0f172a] text-white">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Workers</th>
            <th className="p-2">Pay</th>
            <th className="p-2">Completion Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myTasks.map((task) => (
            <tr key={task._id} className="text-center border-b hover:bg-gray-100">
              <td className="p-2">{task.task_title}</td>
              <td className="p-2">{task.required_workers}</td>
              <td className="p-2">{task.payable_amount}</td>
              <td className="p-2">{task.completion_date}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2 flex gap-2 justify-center">
                <button
                  onClick={() => handleUpdate(task)}
                  className="bg-[#0284c7] text-white px-3 py-1 rounded hover:bg-[#0369a1]"
                >
                  Update
                </button>
                <button
                  onClick={() =>
                    handleDelete(task._id, task.required_workers, task.payable_amount, task.status)
                  }
                  className="bg-[#dc2626] text-white px-3 py-1 rounded hover:bg-[#b91c1c]"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTaskList;
