import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import Stepper from "../../Components/Stepper/Stepper";
import "./LoadingPageStyles.css";

const LoadingPage = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Ingredients",
  ];

  const [activeDay, setActiveDay] = useState(0); // State để theo dõi vòng tròn nào được làm nổi bật
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    if (activeDay < days.length) {
      // Tạo interval để tăng activeDay
      const interval = setInterval(() => {
        setActiveDay((prev) => prev + 1); // Tăng vòng tròn
      }, 3000); // Cứ 3 giây
      return () => clearInterval(interval); // Xóa interval khi component bị unmount
    } else {
      // Khi tất cả vòng tròn hoàn thành, điều hướng sang trang khác
      navigate("/complete"); // Chuyển sang trang /complete (thay đổi URL nếu cần)
    }
  }, [activeDay, days.length, navigate]); // Gồm activeDay để theo dõi trạng thái

  return (
    <div className="loading-container">
      <div className="loading-header">
        <Stepper currentStep={2} />
        <h1>Sit tight, we're cooking up your plan</h1>
        <p>
          Our AI is hard at work building your fully curated and customised
          plan so it can take a little bit of time.
        </p>
      </div>
      <div className="loading-days">
        {days.map((day, index) => (
          <div key={index} className="day-row">
            <span>{day}</span>
            <span
              className={`loading-circle ${
                index <= activeDay ? "completed" : "pending"
              }`}
            ></span>
          </div>
        ))}
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
