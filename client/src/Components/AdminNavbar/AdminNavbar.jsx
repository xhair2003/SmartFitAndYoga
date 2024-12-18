import React, { useState } from 'react';
import './AdminNavbar.css';
import { IoMdMenu } from 'react-icons/io';
import { AiOutlineHome } from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';
import { PiNotificationBold } from 'react-icons/pi';
import { LiaToolsSolid } from 'react-icons/lia';
import { GoShieldLock } from 'react-icons/go';
import { FaRegQuestionCircle } from 'react-icons/fa';

const AdminNavbar = ({ onToggle, onMenuSelect }) => {
    const [isHidden, setIsHidden] = useState(false);

    // Đóng hoặc mở navbar
    const toggleNavbar = () => {
        const newState = !isHidden;
        setIsHidden(newState);
        onToggle(newState); // Gửi trạng thái lên parent component
    };

    // Hiện lại navbar
    const showNavbar = () => {
        setIsHidden(false);
        onToggle(false);
    };

    return (
        <div>
            {/* Nút mở lại navbar khi navbar bị ẩn */}
            {isHidden && (
                <button className="admin-show-button" onClick={showNavbar}>
                    <IoMdMenu />
                </button>
            )}

            {/* Navbar */}
            <div className={`admin-navbar ${isHidden ? 'hidden' : ''}`}>
                {/* Header */}
                <div className="admin-header">
                    <span className="admin-title">ADMINIS</span>
                    <span className="admin-hide-button" onClick={toggleNavbar}>
                        <IoMdMenu />
                    </span>
                </div>

                {/* Avatar */}
                <div className="admin-avatar">
                    <img src="./img3.jpg" alt="Avatar" className="avatar-image" />
                </div>

                {/* Tên và Role */}
                <div className="admin-name-role">
                    <span className="admin-name">John Doe</span>
                    <span className="admin-role">Administrator</span>
                </div>

                {/* Menu */}
                <div className="admin-dashboard-button" onClick={() => onMenuSelect('dashboard')}>
                    <span className="dashboard-icon"><AiOutlineHome /></span>
                    <span className="dashboard-icon-function"> Dashboard</span>
                </div>

                <span className="dashboard-title">Manage Data</span>
                <div className="admin-dashboard-button" onClick={() => onMenuSelect('user')}>
                    <span className="dashboard-icon"><MdManageAccounts /></span>
                    <span className="dashboard-icon-function">User</span>
                </div>
                <div className="admin-dashboard-button" onClick={() => onMenuSelect('notification')}>
                    <span className="dashboard-icon"><PiNotificationBold /></span>
                    <span className="dashboard-icon-function">Notification</span>
                </div>

                <span className="dashboard-title">Setting</span>
                <div className="admin-dashboard-button" onClick={() => onMenuSelect('tools')}>
                    <span className="dashboard-icon"><LiaToolsSolid /></span>
                    <span className="dashboard-icon-function">Tools</span>
                </div>
                <div className="admin-dashboard-button" onClick={() => onMenuSelect('security')}>
                    <span className="dashboard-icon"><GoShieldLock /></span>
                    <span className="dashboard-icon-function">Security</span>
                </div>

                <span className="dashboard-title">FAQ</span>
                <div className="admin-dashboard-button" onClick={() => onMenuSelect('faq')}>
                    <span className="dashboard-icon"><FaRegQuestionCircle /></span>
                    <span className="dashboard-icon-function">FAQ</span>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
