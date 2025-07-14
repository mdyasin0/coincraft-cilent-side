import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Load users from server
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/alluser");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleRemove = async (email) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(`http://localhost:5000/delete-user/${email}`);
    Swal.fire('Deleted!', 'User removed successfully.', 'success');
    fetchUsers();
  } catch (err) {
    console.error("Error deleting user:", err);
    Swal.fire('Error', 'Failed to delete user.', 'error');
  }
};


  // Update role
  const handleRoleChange = async (email, newRole) => {
    try {
      await axios.patch(`http://localhost:5000/update-role/${email}`, { role: newRole });
      Swal.fire("Updated!", "User role updated successfully.", "success");
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
      Swal.fire("Error", "Failed to update role.", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
  <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">Manage Users</h2>

  {/* Mobile View - Card Based */}
  <div className="md:hidden space-y-4">
    {users.length === 0 ? (
      <p className="text-center text-gray-500">No users found.</p>
    ) : (
      users.map((user) => (
        <div key={user._id} className="bg-white shadow-md rounded-lg p-4 border">
          <div className="flex items-center space-x-4 mb-3">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700">Role:</label>
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user.email, e.target.value)}
              className="w-full mt-1 border rounded px-3 py-1"
            >
              <option value="admin">Admin</option>
              <option value="buyer">Buyer</option>
              <option value="worker">Worker</option>
            </select>
          </div>

          <p className="text-sm mb-3">
            <span className="font-medium">Coin:</span> {user.coin}
          </p>

          <button
            onClick={() => handleRemove(user.email)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-1.5 rounded"
          >
            Remove
          </button>
        </div>
      ))
    )}
  </div>

  {/* Desktop / Tablet View - Table Based */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full border rounded-lg bg-white">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="py-3 px-4 text-left">Photo</th>
          <th className="py-3 px-4 text-left">Name</th>
          <th className="py-3 px-4 text-left">Email</th>
          <th className="py-3 px-4 text-left">Role</th>
          <th className="py-3 px-4 text-left">Coin</th>
          <th className="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="border-t hover:bg-gray-50">
            <td className="py-3 px-4">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            </td>
            <td className="py-3 px-4 font-medium">{user.name}</td>
            <td className="py-3 px-4">{user.email}</td>
            <td className="py-3 px-4">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.email, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="admin">Admin</option>
                <option value="buyer">Buyer</option>
                <option value="worker">Worker</option>
              </select>
            </td>
            <td className="py-3 px-4">{user.coin}</td>
            <td className="py-3 px-4">
              <button
                onClick={() => handleRemove(user.email)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
        {users.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-4 text-gray-500">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ManageUsers;
