import React, { useState, useEffect } from "react";
import "./ManageUser.css";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    role: "",
  });
  const [confirmDelete, setConfirmDelete] = useState(null); // Lưu user đang được xác nhận xóa

  const API_BASE_URL = "http://localhost:5000/api/admin/users";

  const getToken = () => localStorage.getItem("token");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Token not found. Please log in.");

      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users.");

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setUpdatedUser({
      name: user.name,
      role: user.role,
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Token not found. Please log in.");

      const response = await fetch(`${API_BASE_URL}/${editUser._id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedUser.name,
          role: updatedUser.role,
        }),
      });

      if (!response.ok) throw new Error("Failed to update user.");

      const updatedData = await response.json();
      setUsers(
        users.map((user) =>
          user._id === updatedData.user._id ? updatedData.user : user
        )
      );
      setEditUser(null);
      showNotification("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
      showNotification("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditUser(null);
  };

  const handleDeleteClick = (user) => {
    setConfirmDelete(user); // Hiển thị xác nhận xóa với user được chọn
  };

  const deleteUser = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Token not found. Please log in.");

      const response = await fetch(`${API_BASE_URL}/${confirmDelete._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete user.");

      setUsers(users.filter((user) => user._id !== confirmDelete._id));
      setConfirmDelete(null);
      showNotification("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      showNotification("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="manage-user-container">
      <h2>Manage Users</h2>
      <p>View, edit, and manage users.</p>

      {notification && <div className="notification">{notification}</div>}
      {loading && <div className="loading">Loading...</div>}

      {confirmDelete && (
        <div className="confirm-delete">
          <p >Are you sure you want to delete user:</p>
          <strong >{confirmDelete.name}</strong>
          <div className="paccept">
            <button onClick={deleteUser} className="delete-confirm-button">
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmDelete(null)}
              className="delete-cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {editUser && (
        <form className="edit-user-form" onSubmit={saveEdit}>
          <h3>Edit User</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <select
              value={updatedUser.role}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, role: e.target.value })
              }
              required
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </form>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="grbutton">
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(user)}
                >
                  <BiSolidEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(user)}
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
