import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Plane, TrendingUp } from 'lucide-react';
import './AdminPanel.css';

function AdminPanel() {
  const [stats] = useState({
    totalBookings: 1250,
    totalRevenue: '$125,000',
    totalFlights: 45,
    totalUsers: 892,
    revenueGrowth: '+25%',
    bookingGrowth: '+18%',
    flightGrowth: '+12%',
    userGrowth: '+35%'
  });

  const [chartData] = useState([
    { month: 'Jan', bookings: 120, revenue: 8000 },
    { month: 'Feb', bookings: 150, revenue: 10000 },
    { month: 'Mar', bookings: 180, revenue: 12000 },
    { month: 'Apr', bookings: 220, revenue: 15000 },
    { month: 'May', bookings: 280, revenue: 18000 },
    { month: 'Jun', bookings: 250, revenue: 16500 }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const getMaxBooking = () => Math.max(...chartData.map(d => d.bookings));

  return (
    <motion.div className="admin-panel-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="admin-header" variants={itemVariants}>
        <h1>Admin Dashboard</h1>
        <p>System analytics and management</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div className="kpi-grid" variants={itemVariants}>
        <motion.div 
          className="kpi-card"
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)' }}
        >
          <div className="kpi-icon blue">
            <Plane size={32} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Flights</p>
            <p className="kpi-value">{stats.totalFlights}</p>
            <p className="kpi-growth">{stats.flightGrowth}</p>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(8, 145, 178, 0.2)' }}
        >
          <div className="kpi-icon cyan">
            <Users size={32} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Users</p>
            <p className="kpi-value">{stats.totalUsers}</p>
            <p className="kpi-growth">{stats.userGrowth}</p>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2)' }}
        >
          <div className="kpi-icon purple">
            <BarChart3 size={32} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Bookings</p>
            <p className="kpi-value">{stats.totalBookings}</p>
            <p className="kpi-growth">{stats.bookingGrowth}</p>
          </div>
        </motion.div>

        <motion.div 
          className="kpi-card"
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)' }}
        >
          <div className="kpi-icon green">
            <TrendingUp size={32} />
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Revenue</p>
            <p className="kpi-value">{stats.totalRevenue}</p>
            <p className="kpi-growth">{stats.revenueGrowth}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Chart */}
      <motion.div className="chart-container" variants={itemVariants}>
        <h2>Bookings & Revenue Trend</h2>
        <div className="chart">
          <div className="chart-y-axis">
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>
          <div className="chart-bars">
            {chartData.map((data, index) => (
              <motion.div
                key={data.month}
                className="bar-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bar-container">
                  <motion.div
                    className="bar bookings"
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.bookings / getMaxBooking()) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <span className="month-label">{data.month}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color bookings"></div>
            <span>Bookings</span>
          </div>
        </div>
      </motion.div>

      {/* Management Section */}
      <motion.div className="management-grid" variants={itemVariants}>
        <div className="management-card">
          <h3>📊 Reports</h3>
          <ul>
            <li>Monthly booking reports</li>
            <li>Revenue analytics</li>
            <li>User demographics</li>
            <li>Flight performance</li>
          </ul>
        </div>

        <div className="management-card">
          <h3>⚙️ System Settings</h3>
          <ul>
            <li>Flight management</li>
            <li>User management</li>
            <li>Payment settings</li>
            <li>Security settings</li>
          </ul>
        </div>

        <div className="management-card">
          <h3>📧 Communications</h3>
          <ul>
            <li>Send notifications</li>
            <li>Email campaigns</li>
            <li>Support tickets</li>
            <li>Feedback management</li>
          </ul>
        </div>

        <div className="management-card">
          <h3>🔒 Security</h3>
          <ul>
            <li>User activity logs</li>
            <li>Payment security</li>
            <li>Fraud detection</li>
            <li>Backup & recovery</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminPanel;
