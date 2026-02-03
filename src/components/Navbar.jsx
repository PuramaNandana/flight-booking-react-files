import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import './Navbar.css';

function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('user');
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav
      className="navbar"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✈️</span>
          FLY SKY
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          {isLoggedIn ? (
            <>
              <motion.div variants={itemVariants}>
                <Link
                  to="/dashboard"
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/search"
                  className={`nav-link ${isActive('/search') ? 'active' : ''}`}
                >
                  Search Flights
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/profile"
                  className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                >
                  Profile
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/my-bookings"
                  className={`nav-link ${isActive('/my-bookings') ? 'active' : ''}`}
                >
                  My Bookings
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/upcoming-trips"
                  className={`nav-link ${isActive('/upcoming-trips') ? 'active' : ''}`}
                >
                  Upcoming Trips
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  <LogOut size={18} />
                  Logout
                </button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={itemVariants}>
                <Link
                  to="/"
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/login"
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                >
                  Login
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/register"
                  className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                >
                  Register
                </Link>
              </motion.div>
            </>
          )}

          {/* Dark Mode Toggle */}
          <motion.button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="navbar-toggle">
          <motion.button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.1 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <button
            className="hamburger"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`mobile-menu ${isOpen ? 'open' : ''}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/search"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                Search Flights
              </Link>
              <Link
                to="/profile"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/my-bookings"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                My Bookings
              </Link>
              <Link
                to="/upcoming-trips"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                Upcoming Trips
              </Link>
              <button
                className="mobile-nav-link logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/login"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
