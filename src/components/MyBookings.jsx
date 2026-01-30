import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, DollarSign } from 'lucide-react';
import './MyBookings.css';

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const myBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    setBookings(myBookings);
  }, []);

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
    <motion.div className="my-bookings-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="bookings-header" variants={itemVariants}>
        <h1>My Bookings</h1>
        <p>View and manage all your flight bookings</p>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div className="no-bookings" variants={itemVariants}>
          <div className="empty-icon">📭</div>
          <h3>No Bookings Yet</h3>
          <p>You haven't booked any flights yet.</p>
          <motion.button
            className="cta-btn"
            onClick={() => navigate('/search')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search Flights
          </motion.button>
        </motion.div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.bookingId}
              className="booking-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="booking-id">
                <span className="label">Booking ID</span>
                <span className="id">{booking.bookingId}</span>
              </div>

              <div className="flight-info">
                <div className="route">
                  <div className="location">
                    <p className="code">{booking.flight.from.match(/\(([^)]+)\)/)?.[1]}</p>
                    <p className="city">{booking.flight.from.split('(')[0]}</p>
                  </div>
                  <div className="arrow">✈</div>
                  <div className="location">
                    <p className="code">{booking.flight.to.match(/\(([^)]+)\)/)?.[1]}</p>
                    <p className="city">{booking.flight.to.split('(')[0]}</p>
                  </div>
                </div>

                <div className="flight-details">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>{booking.flight.date}</span>
                  </div>
                  <div className="detail-item">
                    <Users size={16} />
                    <span>{booking.passengers.length} passengers</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <span>${booking.totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="booking-status">
                <span className="status-badge">Confirmed</span>
                <motion.button
                  className="view-btn"
                  whileHover={{ x: 5 }}
                  onClick={() => alert(`Booking Details: ${booking.bookingId}`)}
                >
                  View Details
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default MyBookings;
