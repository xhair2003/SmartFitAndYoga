import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giả lập trạng thái đăng nhập
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/profile'); // Chuyển hướng đến trang Profile
    } else {
      navigate('/login'); // Chuyển hướng đến trang Login
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <a href="/home">
          <img src="logo.png" alt="Logo" />
        </a>
      </div>

      {/* Spacer for layout */}
      <div className="spacer"></div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <a href="/create" className="navbar-a" data-testid="create-link">CREATE PLANS</a>
        <a href="/workout-plans" className="navbar-a" data-testid="workout-link">WORKOUT PLANS</a>
        <a href="/plans" className="navbar-a" data-testid="nutrition-link">NUTRITION PLANS</a>
        <a href="/home" className="navbar-a" data-testid="progress-link">PROGRESS TRACKING</a>
        <a href="/about" className="navbar-a" data-testid="about-link">ABOUT</a>
        <a href="/" className='navbar-a'>CREATE PLANS</a>
        <a href="/workout-plans" className='navbar-a'>WORKOUT PLANS</a>
        <a href="/plans" className='navbar-a'>NUTRITION PLANS</a>
        <a href="/" className='navbar-a'>PROGRESS TRACKING</a>
        <a href="/about" className='navbar-a'>ABOUT</a>
      </div>

      {/* Spacer for layout */}
      <div className="spacer"></div>

      {/* Search Bar */}
      <div className="navbar-search-container">
        <CiSearch className="navbar-search-icon" data-testid="search-icon" />
        <input 
          type="text" 
          className="navbar-search" 
          placeholder="Search..." 
          data-testid="search-input" 
        />
      </div>

      {/* Notification Icon */}
      <a href="/home" data-testid="notification-icon">
        <IoIosNotificationsOutline className="navbar-logo-icon" />
      </a>

      {/* User Icon */}
      <button 
        onClick={handleUserClick} 
        className="navbar-logo-icon" 
        data-testid="user-icon"
      >
        <CiUser />
      </button>
      <a href="/"><IoIosNotificationsOutline className='navbar-logo-icon' /></a>
      <a onClick={handleUserClick} className="navbar-logo-icon">
        <CiUser />
      </a>
    </nav>
  );
};

export default Navbar;
