import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/admin/users/getDashboardStats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  // Extracting data from API response
  const { totalUsers, newUsers, activeUsers, rolesStats, locationStats } = dashboardData;

  const rolesLabels = rolesStats.map((role) => role._id || "Unknown");
  const rolesData = rolesStats.map((role) => role.count);

  const locationLabels = locationStats.map((location) => location._id || "Unknown");
  const locationData = locationStats.map((location) => location.count);

  // Data for charts
  const rolesChartData = {
    labels: rolesLabels,
    datasets: [
      {
        label: "Roles",
        data: rolesData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const locationChartData = {
    labels: locationLabels,
    datasets: [
      {
        label: "Users by Location",
        data: locationData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const summaryChartData = {
    labels: ["Total Users", "New Users", "Active Users"],
    datasets: [
      {
        label: "Summary",
        data: [totalUsers, newUsers, activeUsers],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>
      <p>Welcome to the admin dashboard. Here you can see key metrics and insights.</p>

      <div className="stats-summary">
        <p>Total Users: {totalUsers}</p>
        <p>New Users: {newUsers}</p>
        <p>Active Users: {activeUsers}</p>
      </div>

      {/* Summary Chart */}
      <div className="chart-section">
        <h3>User Summary</h3>
        <Pie data={summaryChartData} options={{ responsive: true }} />
      </div>

      {/* Roles Chart */}
      <div className="chart-section">
        <h3>User Roles</h3>
        <Bar data={rolesChartData} options={{ responsive: true }} />
      </div>

      {/* Location Chart */}
      <div className="chart-section">
        <h3>Users by Location</h3>
        <Pie data={locationChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Dashboard;
