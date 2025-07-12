import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/Firebase_context';


const AddTask = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseInt(form.payable_amount.value);
    const completion_date = form.completion_date.value;
    const submission_info = form.submission_info.value;

    const totalAmount = required_workers * payable_amount;

    try {
      const { data: buyer } = await axios.get(`http://localhost:5000/user/${user.email}`);
      if (buyer.coin < totalAmount) {
        Swal.fire('Not enough coins', 'Please purchase coins first.', 'warning');
        return navigate('/dashboard/purchase-coin');
      }

      const taskData = {
        task_title,
        task_detail,
        required_workers,
        payable_amount,
        completion_date,
        submission_info,
        task_image_url: image,
        buyer_email: user.email,
        buyer_name: user.displayName,
        created_at: new Date(),
        status: 'active'
      };

      await axios.post('http://localhost:5000/tasks', taskData);
      await axios.patch(`http://localhost:5000/coins/${user.email}`, { coinToDeduct: totalAmount });

      Swal.fire('Success!', 'Task added successfully.', 'success');
      form.reset();
      setImage(null);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Add New Task</h2>
      <form onSubmit={handleAddTask}>
        <input type="text" name="task_title" placeholder="Task Title" className="input input-bordered w-full mb-4" required />

        <textarea name="task_detail" placeholder="Task Detail" className="textarea textarea-bordered w-full mb-4" required></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="required_workers" placeholder="Required Workers" className="input input-bordered" required />
          <input type="number" name="payable_amount" placeholder="Payable Amount" className="input input-bordered" required />
        </div>

        <input type="date" name="completion_date" className="input input-bordered w-full mt-4" required />
        <input type="text" name="submission_info" placeholder="What to submit?" className="input input-bordered w-full mt-4" required />

        <input type="file" onChange={handleImageUpload} className="file-input file-input-bordered w-full mt-4" required />
        {uploading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}

        <button type="submit" className="mt-6 w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-2 rounded-md">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
