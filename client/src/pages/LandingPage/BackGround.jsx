import React from "react";
import { useNavigate } from "react-router-dom";
import './BackGround.css';


const BackGround = () => {
    const navigate = useNavigate();

    const handleJoinNowClick = () => {
        navigate('/login');
    };

    return (
      <div className="background-container">
        <video className="background fade-in" autoPlay loop muted>
          <source src= "/video_bg3.mp4" type="video/mp4" />
        </video>
        <div className="slogan-overlay">
          <h1>Start your journey to a healthier you today</h1>
          <button className="join-now-button" onClick={handleJoinNowClick}>
            Join now
          </button>
        </div>
      </div>
    );
};

export default BackGround;
