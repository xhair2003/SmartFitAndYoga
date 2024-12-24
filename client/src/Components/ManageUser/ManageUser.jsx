import React, { useState } from "react";
import "./ManageUser.css";

const ManageUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Williams", email: "bob@example.com", role: "Moderator" },
    { id: 4, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 5, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 6, name: "Bob Williams", email: "bob@example.com", role: "Moderator" },
    { id: 7, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 8, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 9, name: "Bob Williams", email: "bob@example.com", role: "Moderator" },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [editUser, setEditUser] = useState(null);
  const [notification, setNotification] = useState(""); // Thông báo hành động
  const [confirmDelete, setConfirmDelete] = useState(null); // Xác nhận xóa người dùng

  // Hiển thị thông báo
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Thông báo biến mất sau 3 giây
  };

  // Xóa người dùng
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setConfirmDelete(null); // Đóng xác nhận xóa
    showNotification("User deleted successfully.");
  };

  // Thêm người dùng
  const addUser = (e) => {
    e.preventDefault();
    const newUserWithId = { ...newUser, id: users.length + 1 };
    setUsers([...users, newUserWithId]);
    toggleAddForm(); // Đóng form
    showNotification("User added successfully.");
  };

  // Hiển thị form thêm người dùng
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewUser({ name: "", email: "", role: "" }); // Reset form
  };

  // Bắt đầu chỉnh sửa người dùng
  const handleEdit = (user) => {
    setEditUser(user);
  };

  // Lưu chỉnh sửa
  const saveEdit = (e) => {
    e.preventDefault();
    setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
    setEditUser(null);
    showNotification("User updated successfully.");
  };

  return (
    <div className="manage-user-container">
      <h2>Manage Users</h2>
      <p>Here you can view, edit, and manage all registered users.</p>

      {/* Thông báo */}
      {notification && <div className="notification">{notification}</div>}

      {/* Xác nhận xóa */}
      {confirmDelete && (
        <div className="confirm-delete">
          <p>Are you sure you want to delete this user?</p>
          <button onClick={() => deleteUser(confirmDelete)}>Yes</button>
          <button onClick={() => setConfirmDelete(null)}>No</button>
        </div>
      )}

      {/* Nút thêm người dùng */}
      <button className="add-user-button" onClick={toggleAddForm}>
        {showAddForm ? "Cancel" : "Add New User"}
      </button>

      {/* Form thêm người dùng */}
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
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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

      {/* Form chỉnh sửa người dùng */}
      {editUser && (
        <form className="edit-user-form" onSubmit={saveEdit}>
          <h3>Edit User</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
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
              <option value="Moderator">Moderator</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      )}

      {/* Bảng người dùng */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(user)}>
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
