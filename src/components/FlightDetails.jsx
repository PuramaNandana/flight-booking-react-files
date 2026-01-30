import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, DollarSign, Plane, Star } from 'lucide-react';
import './FlightDetails.css';

function FlightDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const flight = location.state?.flight;
  const [selectedSeats] = React.useState([]);

  if (!flight) {
    return (
      <div className="no-flight">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          No flight selected. Please search flights first.
        </motion.p>
        <button onClick={() => navigate('/search')}>Search Flights</button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleContinue = () => {
    navigate('/booking-details', { state: { flight, selectedSeats } });
  };

  return (
    <motion.div className="flight-details-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Back Button */}
      <motion.button 
        className="back-btn"
        onClick={() => navigate(-1)}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
      </motion.button>

      {/* Flight Header */}
      <motion.div className="flight-header" variants={itemVariants}>
        <div className="airline-info">
          <motion.div 
            className="airline-icon"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Plane size={40} />
          </motion.div>
          <div>
            <h2>{flight.airline}</h2>
            <p className="flight-number">{flight.flightNumber}</p>
          </div>
        </div>
        <motion.div className="rating"
          whileHover={{ scale: 1.1 }}
        >
          <Star size={20} fill="#FFD700" />
          <span>{flight.rating}/5</span>
        </motion.div>
      </motion.div>

      {/* Flight Timeline */}
      <motion.div className="flight-timeline" variants={itemVariants}>
        <div className="timeline-item">
          <div className="time">{flight.departure}</div>
          <div className="location">{flight.from}</div>
        </div>
        <div className="timeline-connector">
          <div className="connector-line"></div>
          <Plane className="plane-icon" />
        </div>
        <div className="timeline-item">
          <div className="time">{flight.arrival}</div>
          <div className="location">{flight.to}</div>
        </div>
      </motion.div>

      {/* Flight Details Grid */}
      <motion.div className="details-grid" variants={itemVariants}>
        <motion.div 
          className="detail-card"
          whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        >
          <Clock size={24} />
          <div>
            <p className="label">Duration</p>
            <p className="value">{flight.duration}</p>
          </div>
        </motion.div>

        <motion.div 
          className="detail-card"
          whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        >
          <Plane size={24} />
          <div>
            <p className="label">Aircraft</p>
            <p className="value">{flight.aircraft}</p>
          </div>
        </motion.div>

        <motion.div 
          className="detail-card"
          whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        >
          <Users size={24} />
          <div>
            <p className="label">Available Seats</p>
            <p className="value">{flight.availableSeats}/{flight.totalSeats}</p>
          </div>
        </motion.div>

        <motion.div 
          className="detail-card price-card"
          whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
        >
          <DollarSign size={24} />
          <div>
            <p className="label">Price per Seat</p>
            <p className="value">${flight.price}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Amenities */}
      <motion.div className="amenities" variants={itemVariants}>
        <h3>Amenities Included</h3>
        <ul>
          <li>✓ Complimentary meals & beverages</li>
          <li>✓ Personal entertainment system</li>
          <li>✓ 20kg baggage allowance</li>
          <li>✓ Free WiFi on board</li>
        </ul>
      </motion.div>

      {/* CTA Button */}
      <motion.button 
        className="cta-button"
        onClick={handleContinue}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={itemVariants}
      >
        Continue to Booking
        <span>→</span>
      </motion.button>
    </motion.div>
  );
}

export default FlightDetails;
