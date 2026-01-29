import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, MapPin, Calendar, Users, CreditCard } from 'lucide-react';
import './BookingPage.css';

function BookingPage({ flight }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  if (!flight) {
    return <div>No flight selected</div>;
  }

  const handleSeatSelect = (seatNum) => {
    setSelectedSeats(prev =>
      prev.includes(seatNum) ? prev.filter(s => s !== seatNum) : [...prev, seatNum]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    alert(`Booking confirmed! Seats: ${selectedSeats.join(', ')}`);
    navigate('/dashboard');
  };

  const seatRows = Array.from({ length: 15 }, (_, i) => i);
  const seatCols = ['A', 'B', 'C', 'D', 'E', 'F'];
  const totalPrice = flight.price * passengers;

  return (
    <motion.div
      className="booking-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="booking-header">
        <h1>Complete Your Booking</h1>
        <p>{flight.airline} - {flight.flightNumber}</p>
      </div>

      <div className="booking-content">
        {/* Flight Info */}
        <motion.div
          className="flight-summary"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
        >
          <div className="summary-card">
            <h2>Flight Details</h2>
            <div className="detail-item">
              <Plane size={20} />
              <div>
                <span>Route</span>
                <p>{flight.from} → {flight.to}</p>
              </div>
            </div>
            <div className="detail-item">
              <Calendar size={20} />
              <div>
                <span>Date</span>
                <p>{flight.date}</p>
              </div>
            </div>
            <div className="detail-item">
              <Users size={20} />
              <div>
                <span>Passengers</span>
                <p>{passengers}</p>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="price-summary">
            <h3>Price Summary</h3>
            <div className="price-row">
              <span>Base Fare</span>
              <span>${flight.price}</span>
            </div>
            <div className="price-row">
              <span>Passengers</span>
              <span>{passengers}x</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </motion.div>

        {/* Seat Selection */}
        <motion.div
          className="seat-selection"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
        >
          <h2>Select Your Seats</h2>
          <div className="seats-container">
            {seatRows.map(row => (
              <div key={row} className="seat-row">
                {seatCols.map(col => {
                  const seatNum = `${row + 1}${col}`;
                  const isSelected = selectedSeats.includes(seatNum);
                  return (
                    <motion.button
                      key={seatNum}
                      className={`seat ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSeatSelect(seatNum)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {col}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="seat-legend">
            <div className="legend-item"><span className="seat available"></span> Available</div>
            <div className="legend-item"><span className="seat selected"></span> Selected</div>
          </div>

          {/* Payment */}
          <div className="payment-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input type="radio" name="payment" defaultChecked />
                <CreditCard size={18} />
                <span>Credit Card</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment" />
                <span>Debit Card</span>
              </label>
            </div>
          </div>

          <motion.button
            className="book-btn"
            onClick={handleBooking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Complete Booking
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BookingPage;
