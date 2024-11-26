import React, { useState } from "react";
import "./UserProfilePage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

// Dữ liệu người dùng (mẫu)
const initialUser = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  password: "hashed_password_1", // Đây chỉ là minh họa, mật khẩu thực tế nên được hash
  age: 28,
  weight: 70.5,
  height: 175.3,
  role: "user",
  created_at: "2023-01-01 12:00:00",
  updated_at: "2023-01-01 12:00:00",
};

const UserProfilePage = () => {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [formData, setFormData] = useState(initialUser);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser({ ...formData, updated_at: new Date().toISOString() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <h1 className="profile-header">User Profile</h1>
        <div className="profile-card">
          {isEditing ? (
            <>
              <div className="profile-field">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-field">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-field">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-field">
                <label>Weight:</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-field">
                <label>Height:</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-buttons">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Weight:</strong> {user.weight} kg
              </p>
              <p>
                <strong>Height:</strong> {user.height} cm
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Created At:</strong> {user.created_at}
              </p>
              <p>
                <strong>Updated At:</strong> {user.updated_at}
              </p>
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfilePage;
