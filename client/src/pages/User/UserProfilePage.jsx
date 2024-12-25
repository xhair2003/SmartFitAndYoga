import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfilePage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const initialUser = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  password: "hashed_password_1",
  age: 28,
  weight: 70.5,
  height: 175.3,
  role: "user",
  gender: "male",
  created_at: "2023-01-01 12:00:00",
  updated_at: "2023-01-01 12:00:00",
};

const UserProfilePage = () => {
  const [user, setUser] = useState(initialUser);
  const [formData, setFormData] = useState(initialUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setUser({ ...formData, updated_at: new Date().toISOString() });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="workout-header">
        <h1>PROFILE</h1>
      </div>
      <div className="profile-container">
        <div className="profile-card">
          <div className="avatar-container">
            <img
              src={user.gender === "male" ? "./man.png" : "./woman.png"}
              alt="User Avatar"
              className="avatar"
            />
          </div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
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
          <div className="buttonstyle">
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
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
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
        </Modal>
      )}

      <Footer />
    </div>
  );
};

const Modal = ({ onClose, children }) => (
  <div className="modal">
    <div className="modal-content">
      {children}
    </div>
  </div>
);

export default UserProfilePage;
