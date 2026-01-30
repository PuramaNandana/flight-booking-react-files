import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Briefcase } from 'lucide-react';
import './PassengerDetails.css';

function PassengerDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, selectedSeats } = location.state || {};
  const [passengers, setPassengers] = useState(
    selectedSeats?.map(() => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passport: ''
    })) || []
  );

  if (!flight || !selectedSeats) {
    return <div className="no-data">No booking data</div>;
  }

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleContinue = () => {
    const allFilled = passengers.every(p => 
      p.firstName && p.lastName && p.email && p.phone && p.passport
    );
    if (!allFilled) {
      alert('Please fill in all passenger details');
      return;
    }
    navigate('/payment', { state: { flight, selectedSeats, passengers } });
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
    <motion.div className="passenger-details-container"
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
        <h2>Passenger Details</h2>
        <p>{flight.airline} • {flight.flightNumber}</p>
      </motion.div>

      {/* Passengers Form */}
      <div className="passengers-form">
        {passengers.map((passenger, index) => (
          <motion.div 
            key={index}
            className="passenger-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="passenger-header">
              <motion.div 
                className="seat-indicator"
                whileHover={{ scale: 1.1 }}
              >
                <Briefcase size={18} />
                {selectedSeats[index]}
              </motion.div>
              <h3>Passenger {index + 1}</h3>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  <User size={16} />
                  First Name
                </label>
                <motion.input
                  type="text"
                  value={passenger.firstName}
                  onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                  placeholder="John"
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <motion.input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                  placeholder="Doe"
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                />
              </div>

              <div className="form-group full-width">
                <label>
                  <Mail size={16} />
                  Email Address
                </label>
                <motion.input
                  type="email"
                  value={passenger.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  placeholder="john@example.com"
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                />
              </div>

              <div className="form-group">
                <label>
                  <Phone size={16} />
                  Phone Number
                </label>
                <motion.input
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                />
              </div>

              <div className="form-group">
                <label>Passport Number</label>
                <motion.input
                  type="text"
                  value={passenger.passport}
                  onChange={(e) => handleInputChange(index, 'passport', e.target.value)}
                  placeholder="ABC123456"
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div className="booking-summary" variants={itemVariants}>
        <h3>Booking Summary</h3>
        <div className="summary-row">
          <span>Flight</span>
          <span>{flight.flightNumber}</span>
        </div>
        <div className="summary-row">
          <span>Passengers</span>
          <span>{passengers.length}</span>
        </div>
        <div className="summary-row">
          <span>Total Seats</span>
          <span>{selectedSeats.join(', ')}</span>
        </div>
        <div className="summary-row total">
          <span>Total Price</span>
          <span>${flight.price * passengers.length}</span>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.button 
        className="cta-button"
        onClick={handleContinue}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={itemVariants}
      >
        Continue to Payment
        <span>→</span>
      </motion.button>
    </motion.div>
  );
}

export default PassengerDetails;
