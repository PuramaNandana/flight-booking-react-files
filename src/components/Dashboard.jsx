import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plane, MapPin, Calendar, Users } from 'lucide-react';
import './Dashboard.css';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="dashboard-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="dashboard-header" variants={cardVariants}>
        <h1>Welcome, {user.fullName || user.username}! ✈️</h1>
        <p>Manage your flights and bookings easily</p>
      </motion.div>

      <div className="dashboard-grid">
        <motion.div className="dashboard-card" variants={cardVariants}>
          <Plane size={48} className="card-icon" />
          <h3>Search Flights</h3>
          <p>Find and book your next flight</p>
          <a href="/search" className="card-btn">Explore</a>
        </motion.div>

        <motion.div className="dashboard-card" variants={cardVariants}>
          <MapPin size={48} className="card-icon" />
          <h3>My Bookings</h3>
          <p>View your confirmed bookings</p>
          <button className="card-btn" onClick={() => navigate('/my-bookings')}>View Bookings</button>
        </motion.div>

        <motion.div className="dashboard-card" variants={cardVariants}>
          <Calendar size={48} className="card-icon" />
          <h3>Upcoming Trips</h3>
          <p>Your future travels at a glance</p>
          <button className="card-btn" onClick={() => navigate('/upcoming-trips')}>View Trips</button>
        </motion.div>

        <motion.div className="dashboard-card" variants={cardVariants}>
          <Users size={48} className="card-icon" />
          <h3>Profile</h3>
          <p>Manage your account details</p>
          <a href="/profile" className="card-btn">View Profile</a>
        </motion.div>
      </div>

      <motion.div className="quick-stats" variants={cardVariants}>
        <div className="stat">
          <h4>0</h4>
          <p>Total Bookings</p>
        </div>
        <div className="stat">
          <h4>0</h4>
          <p>Miles Earned</p>
        </div>
        <div className="stat">
          <h4>Premium</h4>
          <p>Membership</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
