import React from "react";
import "./Dashboard.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dữ liệu giả
  const visitsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Website Visits",
        data: [1200, 1500, 800, 1700, 1900, 2200, 2000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const accountsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Accounts Created",
        data: [50, 80, 65, 90],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (in $)",
        data: [5000, 7000, 8000, 6000, 9000, 11000],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Ratio",
        data: [60, 40],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>
      <p>Welcome to the admin dashboard. Here you can see key metrics and insights.</p>

      {/* Biểu đồ truy cập trang web */}
      <div className="chart-row">
        <div className="chart-section">
          <h3>Website Visits (Weekly)</h3>
          <Bar data={visitsData} options={{ responsive: true }} />
        </div>

        {/* Biểu đồ tỷ lệ giới tính */}
        <div className="chart-section">
          <h3>Gender Ratio</h3>
          <Pie data={genderData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Biểu đồ tài khoản được tạo */}
      <div className="chart-section">
        <h3>Accounts Created (Monthly)</h3>
        <Bar data={accountsData} options={{ responsive: true }} />
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="chart-section">
        <h3>Revenue (Last 6 Months)</h3>
        <Line data={revenueData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Dashboard;
