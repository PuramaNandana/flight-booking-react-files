import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, DollarSign, MapPin, CheckCircle, Trash2, RefreshCw } from 'lucide-react';
import './MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookings from localStorage on component mount and when storage changes
  useEffect(() => {
    loadBookings();
    
    // Listen for storage changes (from other tabs)
    window.addEventListener('storage', loadBookings);
    return () => window.removeEventListener('storage', loadBookings);
  }, []);

  const loadBookings = () => {
    try {
      const storedBookings = localStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    }
    setIsLoading(false);
  };

  const deleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const updatedBookings = bookings.filter(b => b.bookingId !== bookingId);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Error deleting booking. Please try again.');
      }
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => loadBookings(), 300);
  };

  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
    exit: {
      opacity: 0,
      y: -20,
      x: 20,
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="my-bookings-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="bookings-background">
        <div className="animated-plane">✈️</div>
        <div className="animated-cloud cloud-1">☁️</div>
        <div className="animated-cloud cloud-2">☁️</div>
        <div className="animated-cloud cloud-3">☁️</div>
      </div>

      {/* Header Section with Animation */}
      <motion.div className="bookings-header" variants={headerVariants}>
        <h1>My Bookings</h1>
        <p>View your confirmed bookings and flight details</p>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div className="no-bookings" variants={cardVariants}>
          <Plane size={64} />
          <h2>No Bookings Yet</h2>
          <p>You haven't booked any flights yet. Start your journey today!</p>
        </motion.div>
      ) : (
        <>
          <motion.button 
            className="refresh-btn"
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            <RefreshCw size={18} className={isLoading ? 'spinning' : ''} />
            Refresh Bookings
          </motion.button>

          <motion.div
            className="bookings-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {bookings.map((booking) => (
              <motion.div
                key={booking.bookingId}
                className="booking-card"
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Status Badge */}
                <div className="booking-status">
                  <CheckCircle size={20} />
                  <span>{booking.status}</span>
                </div>

                {/* Flight Header */}
                <div className="booking-header-info">
                  <div className="flight-airline">
                    <h3>{booking.flight?.airline || 'Flight'}</h3>
                    <span className="flight-number">Flight: {booking.flightId}</span>
                  </div>
                  <div className="booking-price">
                    <DollarSign size={24} />
                    <span>₹{booking.price}</span>
                  </div>
                </div>

                {/* Route Information */}
                <div className="booking-route">
                  <div className="route-point">
                    <MapPin size={18} className="icon" />
                    <div>
                      <p className="label">From</p>
                      <p className="value">{booking.from}</p>
                    </div>
                  </div>

                  <div className="route-arrow">→</div>

                  <div className="route-point">
                    <MapPin size={18} className="icon" />
                    <div>
                      <p className="label">To</p>
                      <p className="value">{booking.to}</p>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="booking-details">
                  <div className="detail-item">
                    <Calendar size={18} />
                    <div>
                      <p className="label">Travel Date</p>
                      <p className="value">{new Date(booking.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Plane size={18} />
                    <div>
                      <p className="label">Booked On</p>
                      <p className="value">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Seats Information */}
                <div className="booking-seats">
                  <p className="label">Seats:</p>
                  <div className="seats-badges">
                    {booking.selectedSeats?.map((seat, idx) => (
                      <span key={idx} className="seat-badge">
                        {seat}
                      </span>
                    )) || <span className="seat-badge">{booking.seat}</span>}
                  </div>
                </div>

                {/* Passengers Information */}
                <div className="booking-passengers">
                  <p className="label">Passengers:</p>
                  <p className="value">
                    {booking.passengers?.length > 0 
                      ? booking.passengers.map((p, i) => `${p.firstName} ${p.lastName}`).join(', ')
                      : booking.passengerName}
                  </p>
                </div>

                {/* Delete Button */}
                <motion.button 
                  className="delete-btn"
                  onClick={() => deleteBooking(booking.bookingId)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Delete this booking"
                >
                  <Trash2 size={18} />
                  Delete Booking
                </motion.button>

                {/* Booking ID */}
                <p className="booking-id">Booking ID: {booking.bookingId}</p>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default MyBookings;
