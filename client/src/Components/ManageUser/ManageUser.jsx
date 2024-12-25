import React, { useState, useEffect } from "react";
import "./ManageUser.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [editUser, setEditUser] = useState(null);
  const [notification, setNotification] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Token not found. Please log in.");

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete user.");

      setUsers(users.filter((user) => user.id !== id));
      setConfirmDelete(null);
      showNotification("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      showNotification("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Token not found. Please log in.");

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Failed to add user.");

      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      toggleAddForm();
      showNotification("User added successfully.");
    } catch (error) {
      console.error("Error adding user:", error);
      showNotification("Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Token not found. Please log in.");

      const response = await fetch(`${API_BASE_URL}/${editUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editUser.name,
          role: editUser.role,
        }),
      });
      if (!response.ok) throw new Error("Failed to update user.");

      const updatedUser = await response.json();
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
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

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewUser({ name: "", email: "", role: "" });
  };

  const cancelEdit = () => setEditUser(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="manage-user-container">
      <h2>Manage Users</h2>
      <p>View, edit, and manage all registered users.</p>

      {notification && <div className="notification">{notification}</div>}

      {loading && <div className="loading">Loading...</div>}

      {confirmDelete && (
        <div className="confirm-delete">
          <p>Are you sure you want to delete:</p>
          <p>
            <strong>{users.find((user) => user.id === confirmDelete)?.name}</strong>
          </p>
          <button onClick={() => deleteUser(confirmDelete)}>Yes</button>
          <button onClick={() => setConfirmDelete(null)}>No</button>
        </div>
      )}

      <button className="add-user-button" onClick={toggleAddForm}>
        {showAddForm ? "Cancel" : "Add New User"}
      </button>

      {showAddForm && (
        <form className="add-user-form" onSubmit={addUser}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Add User
          </button>
        </form>
      )}

      {editUser && (
        <form className="edit-user-form" onSubmit={saveEdit}>
          <h3>Edit User</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <select
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
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
          <button type="button" className="cancel-button" onClick={cancelEdit}>
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
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => setEditUser({ ...user })}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => setConfirmDelete(user.id)}
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

export default ManageUser;
