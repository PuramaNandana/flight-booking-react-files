import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Edit2, LogOut } from 'lucide-react';
import './UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      firstName: user.firstName || 'John',
      lastName: user.lastName || 'Doe',
      email: user.email || 'john@example.com',
      phone: user.phone || '+1 234 567 8900',
      address: user.address || '123 Main St, New York, NY 10001',
      passportNumber: user.passportNumber || 'ABC123456'
    };
  });

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...user, ...profile }));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

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

  return (
    <motion.div className="user-profile-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="profile-header" variants={itemVariants}>
        <motion.div 
          className="avatar"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <User size={50} />
        </motion.div>
        <div className="header-text">
          <h1>My Profile</h1>
          <p>Manage your personal information</p>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div className="profile-card" variants={itemVariants}>
        <div className="card-header">
          <h2>Personal Information</h2>
          <motion.button
            className={`edit-btn ${isEditing ? 'active' : ''}`}
            onClick={() => setIsEditing(!isEditing)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit2 size={18} />
            {isEditing ? 'Cancel' : 'Edit'}
          </motion.button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <motion.input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              whileFocus={isEditing ? { scale: 1.02 } : {}}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <motion.input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              whileFocus={isEditing ? { scale: 1.02 } : {}}
            />
          </div>

          <div className="form-group full-width">
            <label>Email Address</label>
            <motion.input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              whileFocus={isEditing ? { scale: 1.02 } : {}}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <motion.input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              whileFocus={isEditing ? { scale: 1.02 } : {}}
            />
          </div>

          <div className="form-group">
            <label>Passport Number</label>
            <motion.input
              type="text"
              value={profile.passportNumber}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
              disabled={!isEditing}
              whileFocus={isEditing ? { scale: 1.02 } : {}}
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <motion.textarea
              value={profile.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              rows="3"
              whileFocus={isEditing ? { scale: 1.02 } : {}}
            />
          </div>
        </div>

        {isEditing && (
          <motion.button
            className="save-btn"
            onClick={handleSave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Save Changes
          </motion.button>
        )}
      </motion.div>

      {/* Account Stats */}
      <motion.div className="stats-grid" variants={itemVariants}>
        <motion.div className="stat-card"
          whileHover={{ y: -5 }}
        >
          <div className="stat-number">12</div>
          <div className="stat-label">Total Bookings</div>
        </motion.div>
        <motion.div className="stat-card"
          whileHover={{ y: -5 }}
        >
          <div className="stat-number">$3,450</div>
          <div className="stat-label">Total Spent</div>
        </motion.div>
        <motion.div className="stat-card"
          whileHover={{ y: -5 }}
        >
          <div className="stat-number">25</div>
          <div className="stat-label">Flights Taken</div>
        </motion.div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        className="logout-btn"
        onClick={handleLogout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        variants={itemVariants}
      >
        <LogOut size={18} />
        Logout
      </motion.button>
    </motion.div>
  );
}

export default UserProfile;
