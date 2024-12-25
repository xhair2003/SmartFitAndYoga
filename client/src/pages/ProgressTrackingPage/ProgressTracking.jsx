import React from 'react';
import { Line } from 'react-chartjs-2';
import './ProgressTracking.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const ProgressTracking = () => {
  const weeklyWeightData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Weight Progress (kg)',
        data: [70.5, 70.3, 70.0, 69.8, 69.5, 69.2, 69.0],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
        <Navbar/>
        <header className="header">
            <h1>Progress Tracking</h1>
        </header>
        <div className="progress-tracking-container">
        {/* Overview Section */}
        <section className="overview-section">
            <div className="progress-card">
            <h3>Calories Burned</h3>
            <p>1850 kcal</p>
            </div>
            <div className="progress-card">
            <h3>Total Workout Time</h3>
            <p>5 hrs 20 mins</p>
            </div>
            <div className="progress-card">
            <h3>Current Weight</h3>
            <p>69 kg</p>
            </div>
            <div className="progress-card">
            <h3>Target Weight</h3>
            <p>65 kg</p>
            </div>
        </section>

        {/* Progress Chart */}
        <section className="chart-section">
            <h2>Weekly Progress</h2>
            <Line data={weeklyWeightData} />
        </section>

        {/* Workout and Nutrition History */}
        <section className="history-section">
            <h2>Activity History</h2>
            <div className="history-card">
            <h4>Monday</h4>
            <p>Treadmill Running - 30 mins</p>
            <p>Yoga Session - 20 mins</p>
            </div>
            <div className="history-card">
            <h4>Tuesday</h4>
            <p>Protein Pancakes - 560 kcal</p>
            <p>Chicken Salad - 747 kcal</p>
            </div>
            {/* Add more days */}
        </section>
        </div>
        <Footer/>
    </div>
    
  );
};

export default ProgressTracking;
