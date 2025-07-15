import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/Firebase_context';


const Updatetask = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate("/dashboard/mytasklist");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { id } = useParams();
  const [task, setTask] = useState(null);

useEffect(() => {
  const fetchTask = async () => {
    try {
      const res = await axios.get(`https://coincrafter-chi.vercel.app/task/${id}`);
      setTask(res.data);
    } catch (error) {
      console.error("Failed to load task:", error);
    }
  };
  fetchTask();
}, [id]);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
      setImage(res.data.data.url);
      setUploading(false);
    } catch (error) {
      console.error('Image Upload Failed:', error);
      setUploading(false);
    }
  };


  const [userInfo, setUserInfo] = useState(null);

useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://coincrafter-chi.vercel.app/user?email=${user.email}`)
        .then((res) => {
          setUserInfo(res.data); 
          // console.log(res.data);
        })
        .catch((err) => console.error("Failed to load user", err));
    }
  }, [user]);

const handleAddTask = async (e) => {
  e.preventDefault();

  const form = e.target;
  const task_title = form.task_title.value;
  const task_detail = form.task_detail.value;
  const required_workers = parseInt(form.required_workers.value);
  const payable_amount = parseInt(form.payable_amount.value);
  const completion_date = form.completion_date.value;
  const submission_info = form.submission_info.value;

  const task_image_url = image ? image : task?.task_image_url;

  const updatedTask = {
    task_title,
    task_detail,
    required_workers,
    payable_amount,
    completion_date,
    submission_info,
    task_image_url,
  };

  // how much coin needed
  const totalCost = required_workers * payable_amount;

  // have user coin
  if (userInfo?.coin < totalCost) {
    Swal.fire({
      icon: 'warning',
      title: 'Not enough coins!',
      text: `You need ${totalCost} coins but have only ${userInfo?.coin}. Please refill.`,
      confirmButtonText: 'Refill Now'
    }).then(() => {
      navigate('/dashboard/purchase-coins'); //  Navigate to coin purchase page
    });
    return; 
  }

  //if have coin then go 
  try {
    const res = await axios.patch(`https://coincrafter-chi.vercel.app/update-task/${id}`, updatedTask);
    // console.log("PATCH response:", res.data);

    Swal.fire('Success!', 'Task updated successfully.', 'success');
    navigate("/dashboard/mytasklist");
  } catch (err) {
    console.error("PATCH Error:", err);
    Swal.fire('Error', 'Something went wrong.', 'error');
  }
};




  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Update the Task</h2>
      <form onSubmit={handleAddTask}>
  {/* Task Title */}
  <div className="mb-4">
    <label htmlFor="task_title" className="block text-sm font-medium text-gray-700 mb-1">
      Task Title
    </label>
    <input
      type="text"
      name="task_title"
      id="task_title"
      placeholder="Task Title"
      className="input input-bordered w-full"
        defaultValue={task?.task_title}
 
    />
  </div>

  {/* Task Detail */}
  <div className="mb-4">
    <label htmlFor="task_detail" className="block text-sm font-medium text-gray-700 mb-1">
      Task Detail
    </label>
    <textarea
      name="task_detail"
      id="task_detail"
      placeholder="Task Detail"
      className="textarea textarea-bordered w-full"
      defaultValue={task?.task_detail}
      
    ></textarea>
  </div>

  {/* Workers & Amount */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
    <div>
      <label htmlFor="required_workers" className="block text-sm font-medium text-gray-700 mb-1">
        Required Workers
      </label>
      <input
        type="number"
        name="required_workers"
        id="required_workers"
        placeholder="Required Workers"
        className="input input-bordered w-full"
        defaultValue={task?.required_workers}
     
      />
    </div>
    <div>
      <label htmlFor="payable_amount" className="block text-sm font-medium text-gray-700 mb-1">
        Payable Amount
      </label>
      <input
        type="number"
        
        name="payable_amount"
        id="payable_amount"
        placeholder="Payable Amount"
        className="input input-bordered w-full"
         defaultValue={task?.payable_amount}
      
      />
    </div>
  </div>

  {/* Completion Date */}
  <div className="mb-4">
    <label htmlFor="completion_date" className="block text-sm font-medium text-gray-700 mb-1">
      Completion Date
    </label>
    <input
      type="date"
      name="completion_date"
      id="completion_date"
      className="input input-bordered w-full"
      defaultValue={task?.completion_date}
     
    />
  </div>

  {/* Submission Info */}
  <div className="mb-4">
    <label htmlFor="submission_info" className="block text-sm font-medium text-gray-700 mb-1">
      What to Submit?
    </label>
    <input
      type="text"
      name="submission_info"
      id="submission_info"
      placeholder="What to submit?"
      className="input input-bordered w-full"
      defaultValue={task?.submission_info}
    
    />
  </div>

  {/* Image Upload */}
  <div className="mb-4">
    <label htmlFor="task_image" className="block text-sm font-medium text-gray-700 mb-1">
      Upload Task Image
    </label>
    <input
      type="file"
      id="task_image"
      onChange={handleImageUpload}
      className="file-input file-input-bordered w-full"
     
    />
    {uploading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="mt-6 w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-2 rounded-md"
  >
    Update
  </button>
</form>

    </div>
  );
};

export default Updatetask;
