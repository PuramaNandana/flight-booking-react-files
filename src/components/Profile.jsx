import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';
import './Profile.css';

function Profile() {
  const [user] = useState(() => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  });

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
      className="profile-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Profile Header */}
      <motion.div className="profile-header" variants={cardVariants}>
        <div className="profile-avatar">
          {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="profile-title">
          <h1>{user.fullName || user.username || 'User'}</h1>
          <p>Member since {new Date().getFullYear()}</p>
        </div>
      </motion.div>

      {/* Profile Info */}
      <div className="profile-grid">
        <motion.div className="profile-card" variants={cardVariants}>
          <h2>Personal Information</h2>
          <div className="info-item">
            <User size={20} />
            <div>
              <span>Full Name</span>
              <p>{user.fullName || 'Not provided'}</p>
            </div>
          </div>
          <div className="info-item">
            <Mail size={20} />
            <div>
              <span>Email</span>
              <p>{user.email || 'Not provided'}</p>
            </div>
          </div>
          <div className="info-item">
            <Phone size={20} />
            <div>
              <span>Phone Number</span>
              <p>{user.phoneNumber || 'Not provided'}</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="profile-card" variants={cardVariants}>
          <h2>Travel Statistics</h2>
          <div className="stat-item">
            <div className="stat-value">0</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">0</div>
            <div className="stat-label">Miles Earned</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">Premium</div>
            <div className="stat-label">Membership Status</div>
          </div>
        </motion.div>

        <motion.div className="profile-card" variants={cardVariants}>
          <h2>Account Status</h2>
          <div className="status-item">
            <Award size={40} className="icon" />
            <h3>Premium Member</h3>
            <p>Enjoy exclusive benefits and discounts</p>
            <ul>
              <li>✓ Priority Booking</li>
              <li>✓ Special Discounts</li>
              <li>✓ Extra Baggage</li>
              <li>✓ 24/7 Support</li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="profile-card" variants={cardVariants}>
          <h2>Preferences</h2>
          <div className="preferences">
            <label className="pref-item">
              <input type="checkbox" defaultChecked />
              <span>Receive promotional emails</span>
            </label>
            <label className="pref-item">
              <input type="checkbox" defaultChecked />
              <span>Newsletter subscriptions</span>
            </label>
            <label className="pref-item">
              <input type="checkbox" />
              <span>SMS notifications</span>
            </label>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div className="profile-actions" variants={cardVariants}>
        <button className="btn-primary">Edit Profile</button>
        <button className="btn-secondary">Change Password</button>
        <button className="btn-danger">Logout</button>
      </motion.div>
    </motion.div>
  );
}

export default Profile;
