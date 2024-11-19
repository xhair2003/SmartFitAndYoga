import React from "react";
import "./LoadingPageStyles.css";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-header">
        <div className="progress-bar">
          <span className="step">1</span>
          <span className="line"></span>
          <span className="step active">2</span>
          <span className="line"></span>
          <span className="step">3</span>
        </div>
        <h1>Sit tight, we're cooking up your plan</h1>
        <p>
          Our AI is hard at work building your fully curated and customised meal
          plan so it can take a little bit of time.
        </p>
      </div>
      <div className="loading-days">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Ingredients"].map(
          (day, index) => (
            <div key={index} className="day-row">
              <span>{day}</span>
              <span className="loading-circle"></span>
            </div>
          )
        )}
      </div>
      <div className="loading-footer">
        <p>
          This page will automatically refresh when your plan is ready. Most
          plans take between <strong>2 to 5 minutes</strong> on average to
          finalise. It's still faster than if you were to do this manually!
        </p>
        <a href="/" className="retry-link">
          Taking longer than 10 minutes? Restart the process.
        </a>
        <div className="info-box">
          Did you know that consuming a diet high in fruits and vegetables can
          help reduce your risk of developing chronic diseases such as heart
          disease, stroke, and certain types of cancer?
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
