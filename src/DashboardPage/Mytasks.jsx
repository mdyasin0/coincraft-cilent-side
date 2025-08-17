import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authprovider/Firebase_context";
import Swal from "sweetalert2";

const MyTaskList = () => {
  const { user } = useContext(AuthContext);
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://coincrafter-chi.vercel.app/my-tasks/${user.email}`);
      setMyTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyTasks();
    }
  }, [user?.email]);

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
        await axios.delete(`https://coincrafter-chi.vercel.app/delete-task/${taskId}`);
        if (status !== 'completed') {
          const refillAmount = workers * amount;
          await axios.patch(`https://coincrafter-chi.vercel.app/refill-coins/${user.email}`, { refill: refillAmount });
        }
        fetchMyTasks();
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  const handleUpdate = (task) => {
    window.location.href = `/dashboard/update-task/${task._id}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (myTasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        You have not added any task.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[600px] w-full bg-white rounded shadow">
        <thead className="bg-[#0f172a] text-white">
          <tr>
            <th className="p-2 text-sm text-left">Title</th>
            <th className="p-2 text-sm text-left">Workers</th>
            <th className="p-2 text-sm text-left">Pay</th>
            <th className="p-2 text-sm text-left">Completion Date</th>
            <th className="p-2 text-sm text-left">Status</th>
            <th className="p-2 text-sm text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myTasks.map((task) => (
            <tr key={task._id} className="border-b hover:bg-gray-100 text-sm text-gray-700">
              <td className="p-2">{task.task_title}</td>
              <td className="p-2">{task.required_workers}</td>
              <td className="p-2">{task.payable_amount}</td>
              <td className="p-2">{task.completion_date}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2">
                <div className="flex flex-wrap justify-start gap-2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="bg-[#0284c7] text-white px-3 py-1 rounded hover:bg-[#0369a1] text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task._id, task.required_workers, task.payable_amount, task.status)}
                    className="bg-[#dc2626] text-white px-3 py-1 rounded hover:bg-[#b91c1c] text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTaskList;
