// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';  
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [dashboardData, setDashboardData] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data for the bar chart
  const [chartData, setChartData] = useState({
    labels: ['Total Blogs', 'Total Users'],
    datasets: [
      {
        label: 'Dashboard Stats',
        data: [0, 0], 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8005/api/admin/dashboard');
        setDashboardData(response.data);
        setLoading(false);

        setChartData({
          labels: ['Total Blogs', 'Total Users'],
          datasets: [
            {
              label: 'Dashboard Stats',
              data: [response.data.totalBlogs, response.data.totalUsers],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
   const handleLogout = () => {

      navigate('/login');
   };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-3 bg-dark text-white p-4" style={{ height: '100vh' }}>
          <h4 className="text-center">Admin Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="/admin" className="nav-link text-white">Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="/admin/users" className="nav-link text-white">Manage Users</a>
            </li>
            <li className="nav-item">
              <a href="/admin/blogs" className="nav-link text-white">Manage Blogs</a>
            </li>
            <li className="nav-item">
              <a href="/admin/settings" className="nav-link text-white">Settings</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <nav className="d-flex justify-content-between align-items-center">
            <h3>Dashboard Overview</h3>
            <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
          </nav>

          <div className="row mt-4">
          
            <div className="col-md-4 mb-4">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Blogs</h5>
                  <p className="card-text">{dashboardData.totalBlogs}</p>
                </div>
              </div>
            </div>

            {/* Total Users */}
            <div className="col-md-4 mb-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{dashboardData.totalUsers}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Bar Chart */}
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Dashboard Stats</h5>
                  <Bar data={chartData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
