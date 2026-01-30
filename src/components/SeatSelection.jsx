import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import './SeatSelection.css';

function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { flight } = location.state || {};

  // Generate seat grid (12 columns, 15 rows)
  const generateSeats = () => {
    const seats = [];
    const rows = 15;
    const cols = 12;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;
        // Randomly mark some as booked
        const isBooked = Math.random() > 0.7;
        seats.push({
          id: `${row}-${col}`,
          number: seatNumber,
          isBooked,
          isSelected: false
        });
      }
    }
    return seats;
  };

  const [seats] = useState(generateSeats());

  if (!flight) {
    return <div className="no-flight">No flight data</div>;
  }

  const toggleSeat = (seatId, seatNumber) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat.isBooked) {
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    navigate('/passenger-details', { 
      state: { flight, selectedSeats } 
    });
  };

  const seatVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 }
    }
  };

  return (
    <motion.div className="seat-selection-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button 
        className="back-btn"
        onClick={() => navigate(-1)}
        whileHover={{ x: -5 }}
      >
        <ArrowLeft size={20} />
      </motion.button>

      <motion.div className="seat-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2>Select Your Seats</h2>
        <p>{flight.airline} • {flight.flightNumber}</p>
      </motion.div>

      <div className="seat-content">
        {/* Legend */}
        <motion.div className="seat-legend"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="legend-item">
            <div className="seat available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat booked"></div>
            <span>Booked</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
        </motion.div>

        {/* Seat Grid */}
        <div className="airplane-cabin">
          <div className="cabin-screen"></div>
          
          <motion.div 
            className="seat-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {seats.map((seat) => (
              <motion.button
                key={seat.id}
                className={`seat ${seat.isBooked ? 'booked' : ''} ${
                  selectedSeats.includes(seat.number) ? 'selected' : ''
                }`}
                onClick={() => toggleSeat(seat.id, seat.number)}
                disabled={seat.isBooked}
                variants={seatVariants}
                whileHover={!seat.isBooked ? { scale: 1.1 } : {}}
                whileTap={!seat.isBooked ? { scale: 0.95 } : {}}
                title={seat.number}
              >
                {selectedSeats.includes(seat.number) && <Check size={14} />}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Selection Summary */}
        <motion.div className="selection-summary"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="summary-left">
            <h3>Selected Seats</h3>
            {selectedSeats.length > 0 ? (
              <div className="selected-seats-list">
                {selectedSeats.map((seat) => (
                  <motion.span 
                    key={seat}
                    className="seat-badge"
                    layoutId={seat}
                  >
                    {seat}
                    <button
                      onClick={() => setSelectedSeats(selectedSeats.filter(s => s !== seat))}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
              </div>
            ) : (
              <p className="no-seats">No seats selected</p>
            )}
          </div>

          <div className="summary-right">
            <div className="price-breakdown">
              <div className="price-row">
                <span>Seats ({selectedSeats.length}):</span>
                <span>${flight.price * selectedSeats.length}</span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span>${flight.price * selectedSeats.length}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.button 
        className={`cta-button ${selectedSeats.length === 0 ? 'disabled' : ''}`}
        onClick={handleContinue}
        whileHover={selectedSeats.length > 0 ? { scale: 1.05 } : {}}
        whileTap={selectedSeats.length > 0 ? { scale: 0.95 } : {}}
      >
        Continue to Passenger Details
        <span>→</span>
      </motion.button>
    </motion.div>
  );
}

export default SeatSelection;
