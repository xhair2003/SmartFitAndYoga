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
      <div className="navbar-logo">
        <a href="/">
          <img src="logo.png" alt="Logo" />
        </a>
      </div>
      <div className="spacer"></div>
      <div className="navbar-links">
        <a href="/create" className='navbar-a'>CREATE PLANS</a>
        <a href="/workout-plans" className='navbar-a'>WORKOUT PLANS</a>
        <a href="/plans" className='navbar-a'>NUTRITION PLANS</a>
        <a href="/" className='navbar-a'>PROGRESS TRACKING</a>
        <a href="/about" className='navbar-a'>ABOUT</a>
      </div>
      <div className="spacer"></div>
      <div className="navbar-search-container">
        <CiSearch className="fas fa-search navbar-search-icon"/>  
        <input type="text" className="navbar-search" placeholder="Search..." />
      </div>
      <a href="/"><IoIosNotificationsOutline className='navbar-logo-icon' /></a>
      <a onClick={handleUserClick} className="navbar-logo-icon">
        <CiUser />
      </a>
    </nav>
  );
};

export default Navbar;
