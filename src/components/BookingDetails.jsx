import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import './BookingDetails.css';

function BookingDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, selectedSeats } = location.state || {};

  if (!flight) {
    return (
      <div className="no-data">
        <p>No booking details</p>
        <button onClick={() => navigate('/search')}>Search Flights</button>
      </div>
    );
  }

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
    <motion.div className="booking-details-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.button 
        className="back-btn"
        onClick={() => navigate(-1)}
        whileHover={{ x: -5 }}
      >
        <ArrowLeft size={20} />
      </motion.button>

      <motion.div className="details-header" variants={itemVariants}>
        <h2>Booking Details</h2>
        <p>Review your flight booking information</p>
      </motion.div>

      {/* Flight Information */}
      <motion.div className="details-card" variants={itemVariants}>
        <h3>Flight Information</h3>
        
        <div className="info-grid">
          <div className="info-item">
            <label>Airline</label>
            <p>{flight.airline}</p>
          </div>
          <div className="info-item">
            <label>Flight Number</label>
            <p>{flight.flightNumber}</p>
          </div>
          <div className="info-item">
            <label>Date</label>
            <p>{flight.date}</p>
          </div>
          <div className="info-item">
            <label>Aircraft</label>
            <p>{flight.aircraft}</p>
          </div>
        </div>
      </motion.div>

      {/* Route Information */}
      <motion.div className="details-card" variants={itemVariants}>
        <h3>Route Information</h3>
        
        <div className="route-info">
          <div className="location">
            <label>Departure</label>
            <p className="city">{flight.from}</p>
            <p className="time">{flight.departure}</p>
          </div>
          <div className="route-line">
            <div className="line"></div>
            <span>✈</span>
          </div>
          <div className="location">
            <label>Arrival</label>
            <p className="city">{flight.to}</p>
            <p className="time">{flight.arrival}</p>
          </div>
        </div>

        <div className="route-details">
          <p><strong>Duration:</strong> {flight.duration}</p>
          <p><strong>Stops:</strong> {flight.stops === 0 ? 'Direct' : flight.stops + ' stop(s)'}</p>
          <p><strong>Distance:</strong> ~2,500 km</p>
        </div>
      </motion.div>

      {/* Seat Selection */}
      <motion.div className="details-card" variants={itemVariants}>
        <h3>Selected Seats</h3>
        
        <div className="seats-display">
          {selectedSeats && selectedSeats.map((seat, index) => (
            <motion.div
              key={seat}
              className="seat-item"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Check size={16} />
              {seat}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing Summary */}
      <motion.div className="details-card pricing" variants={itemVariants}>
        <h3>Price Summary</h3>
        
        <div className="pricing-items">
          <div className="pricing-row">
            <span>Base Fare × {selectedSeats?.length || 1}</span>
            <span>${flight.price * (selectedSeats?.length || 1)}</span>
          </div>
          <div className="pricing-row">
            <span>Seat Selection</span>
            <span>Free</span>
          </div>
          <div className="pricing-row">
            <span>Taxes & Fees</span>
            <span>Included</span>
          </div>
          <div className="pricing-row total">
            <span>Total Amount</span>
            <span>${flight.price * (selectedSeats?.length || 1)}</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div className="action-buttons" variants={itemVariants}>
        <motion.button
          className="cancel-btn"
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back
        </motion.button>

        <motion.button
          className="continue-btn"
          onClick={() => navigate('/seat-selection', { state: { flight } })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue to Seat Selection
          <span>→</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default BookingDetails;
