import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2, Home, Users, Plane, Clock } from 'lucide-react';
import './BookingConfirmation.css';

function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const { flight, selectedSeats, passengers, bookingId, totalAmount } = location.state || {};

  // Confetti timer
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Save booking to localStorage
  useEffect(() => {
    if (flight && bookingId) {
      const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
      bookings.push({
        bookingId,
        flight,
        selectedSeats,
        passengers,
        totalAmount,
        bookingDate: new Date().toISOString()
      });
      localStorage.setItem('myBookings', JSON.stringify(bookings));
    }
  }, [bookingId, flight, selectedSeats, passengers, totalAmount]);

  if (!flight || !bookingId) {
    return <div className="no-data">Booking not found</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const checkmarkVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }
    },
    rotate: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 2, delay: 0.8 }
    }
  };

  return (
    <motion.div className="booking-confirmation-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              initial={{ y: -10, opacity: 1 }}
              animate={{ 
                y: window.innerHeight, 
                opacity: 0,
                rotate: Math.random() * 720
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5
              }}
              style={{
                left: Math.random() * 100 + '%',
                backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)]
              }}
            />
          ))}
        </div>
      )}

      {/* Success Icon */}
      <motion.div className="success-icon"
        variants={checkmarkVariants}
        animate={['visible', 'rotate']}
      >
        <CheckCircle size={80} />
      </motion.div>

      {/* Success Message */}
      <motion.div className="success-message" variants={itemVariants}>
        <h1>Booking Confirmed!</h1>
        <p>Your flight has been successfully booked</p>
      </motion.div>

      {/* Booking ID */}
      <motion.div className="booking-id-card" variants={itemVariants}>
        <div>
          <p className="label">Booking Reference</p>
          <p className="booking-id">{bookingId}</p>
        </div>
        <motion.button
          className="copy-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigator.clipboard.writeText(bookingId);
            alert('Booking ID copied!');
          }}
        >
          Copy
        </motion.button>
      </motion.div>

      {/* Flight Details */}
      <motion.div className="flight-details-card" variants={itemVariants}>
        <div className="flight-header-info">
          <div>
            <p className="airline">{flight.airline}</p>
            <p className="flight-number">{flight.flightNumber}</p>
          </div>
          <motion.div 
            className="plane-icon"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Plane size={32} />
          </motion.div>
        </div>

        <div className="flight-route">
          <div className="location">
            <p className="city">{flight.from.split('(')[0]}</p>
            <p className="code">{flight.from.match(/\(([^)]+)\)/)?.[1]}</p>
          </div>
          <div className="connector">
            <div className="line"></div>
          </div>
          <div className="location">
            <p className="city">{flight.to.split('(')[0]}</p>
            <p className="code">{flight.to.match(/\(([^)]+)\)/)?.[1]}</p>
          </div>
        </div>

        <div className="flight-info-grid">
          <div className="info-item">
            <Clock size={18} />
            <div>
              <p className="label">Departure</p>
              <p className="value">{flight.departure}</p>
            </div>
          </div>
          <div className="info-item">
            <Clock size={18} />
            <div>
              <p className="label">Arrival</p>
              <p className="value">{flight.arrival}</p>
            </div>
          </div>
          <div className="info-item">
            <Users size={18} />
            <div>
              <p className="label">Passengers</p>
              <p className="value">{passengers.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Passengers List */}
      <motion.div className="passengers-card" variants={itemVariants}>
        <h3>Passengers</h3>
        {passengers.map((passenger, index) => (
          <motion.div 
            key={index}
            className="passenger-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="passenger-info">
              <p className="name">{passenger.firstName} {passenger.lastName}</p>
              <p className="email">{passenger.email}</p>
            </div>
            <motion.div 
              className="seat-badge"
              whileHover={{ scale: 1.1 }}
            >
              {selectedSeats[index]}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pricing Summary */}
      <motion.div className="pricing-summary" variants={itemVariants}>
        <h3>Booking Summary</h3>
        <div className="summary-row">
          <span>Base Fare × {passengers.length}</span>
          <span>${flight.price * passengers.length}</span>
        </div>
        <div className="summary-row">
          <span>Taxes & Fees</span>
          <span>Included</span>
        </div>
        <div className="summary-row total">
          <span>Total Paid</span>
          <span>${totalAmount}</span>
        </div>
      </motion.div>

      {/* Important Notes */}
      <motion.div className="important-notes" variants={itemVariants}>
        <h4>✓ Important Information</h4>
        <ul>
          <li>Check-in opens 24 hours before departure</li>
          <li>Arrive 3 hours early for international flights</li>
          <li>Bring valid ID and passport</li>
          <li>Baggage allowance: 20kg per passenger</li>
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <motion.div className="action-buttons" variants={itemVariants}>
        <motion.button
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const bookingData = {
              bookingId,
              flight,
              passengers,
              selectedSeats,
              totalAmount
            };
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookingData, null, 2)));
            element.setAttribute('download', `booking-${bookingId}.txt`);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }}
        >
          <Download size={18} />
          Download Booking
        </motion.button>

        <motion.button
          className="secondary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const text = `I just booked my flight ${flight.flightNumber} on ${flight.date}! Booking ID: ${bookingId}`;
            navigator.share ? navigator.share({ text }) : alert(text);
          }}
        >
          <Share2 size={18} />
          Share
        </motion.button>

        <motion.button
          className="tertiary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
        >
          <Home size={18} />
          Back to Dashboard
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default BookingConfirmation;
