import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WorkoutPlan.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const WorkoutPlan = () => {
  // Khởi tạo các state sử dụng useState
  const [workoutPlan, setWorkoutPlan] = useState(null); // Lưu kế hoạch tập luyện
  const [selectedDay, setSelectedDay] = useState(null); // Lưu ngày tập luyện được chọn
  const [selectedExercise, setSelectedExercise] = useState(null); // Lưu bài tập được chọn
  const [loading, setLoading] = useState(true); // Trạng thái đang tải dữ liệu
  const [error, setError] = useState(null); // Lưu lỗi khi gọi API

  // Sử dụng useEffect để gọi API lấy dữ liệu kế hoạch tập luyện
  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      setLoading(true); // Bắt đầu tải dữ liệu
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (!token) {
        setError('Please login to use this function');
        setLoading(false); // Dừng trạng thái loading
        return;
      }

      try {
        // Gọi API để lấy kế hoạch tập luyện từ server
        const response = await axios.get('http://localhost:5000/api/workout-plans/my', {
          headers: { Authorization: `Bearer ${token}` }, // Gửi token trong header
        });
        console.log('Workout Plan Response:', response.data); // Log dữ liệu nhận được từ API
        setWorkoutPlan(response.data.weeklyWorkoutPlan); // Lưu kế hoạch vào state
      } catch (err) {
        console.error('Error fetching workout plan:', err); // Log lỗi nếu có
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false); // Dừng trạng thái loading
      }
    };

    fetchWorkoutPlan(); // Gọi hàm fetch dữ liệu
  }, []); // useEffect này chạy chỉ một lần khi component được render lần đầu tiên

  // Hàm lấy danh sách bài tập cho một ngày cụ thể
  const getWorkoutsForDay = (day) => day.workouts || [];

  // Hàm xử lý khi người dùng click vào một bài tập
  const handleExerciseClick = (exercise) => {
    console.log('Selected Exercise:', exercise); // Log bài tập được chọn
    setSelectedExercise(exercise);
  };

  return (
    <div>
      {/* Navbar component */}
      <Navbar />
      
      <div className="workout-header">
        <h1>WORKOUT PLANS</h1>
      </div>
      
      <div className="workout-plan-container">
        <div className="workout-wrapper">
          {loading ? (
            <p>Loading...</p> // Hiển thị "Loading..." khi dữ liệu đang được tải
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p> // Nếu có lỗi, hiển thị thông báo lỗi
          ) : (
            <div>
              {/* Danh sách các ngày trong kế hoạch */}
              <div className="workout-week-container">
                <ul className="workout-day-list">
                  {workoutPlan?.week?.map((day, index) => (
                    <li
                      key={index}
                      className={`workout-day-item ${selectedDay === day.day ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedDay(day.day); // Khi click vào ngày, chọn ngày đó
                      }}
                    >
                      {day.day} {/* Hiển thị tên ngày */}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Container chứa các bài tập cho ngày đã chọn */}
              <div className="workout-day-container">
                {selectedDay && (
                  <div className="exercise-list-container grid">
                    {workoutPlan.week
                      .map((day) => {
                        if (day.day === selectedDay) {
                          return (
                            <div key={day.day}>
                              {getWorkoutsForDay(day).map((exercise) => ( 
                                <div
                                  key={exercise._id}
                                  className="workout-daily-item"
                                  onClick={() => handleExerciseClick(exercise)}
                                >
                                  <h3>{exercise.title}</h3>
                                  <p>Duration: {exercise.duration} mins</p>
                                  <p>Intensity: {exercise.intensity}</p>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal hiển thị chi tiết bài tập */}
        {selectedExercise && (
          <div className="exercise-detail-modal">
            <div className="modal-container">
              <div className="modal-header">
                <h2>{selectedExercise.title}</h2>
                <button className="close-btn" onClick={() => setSelectedExercise(null)}>&times;</button>
              </div>
              <div >
                <p><strong>Duration:</strong> {selectedExercise.duration} mins</p>
                <p><strong>Intensity:</strong> {selectedExercise.intensity}</p>
                <p><strong>Description:</strong> {selectedExercise.description}</p>
              </div>
              <div className="modal-footer">
                <button onClick={() => setSelectedExercise(null)}>Close</button> {/* Nút đóng modal */}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default WorkoutPlan;