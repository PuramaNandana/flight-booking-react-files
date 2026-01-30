import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Plane } from 'lucide-react';
import flightsData from '../data/flights.json';
import './FlightResults.css';

function FlightResults({ onSelectFlight }) {
  const [filteredFlights, setFilteredFlights] = useState(flightsData.flights);
  const [sortBy, setSortBy] = useState('price');
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredFlights(flightsData.flights);
  }, []);

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);

    let sorted = [...filteredFlights];
    if (sortValue === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'duration') {
      sorted.sort((a, b) => a.duration.localeCompare(b.duration));
    } else if (sortValue === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    setFilteredFlights(sorted);
  };

  const handleSelectFlight = (flight) => {
    navigate('/flight-details', { state: { flight } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const flightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="results-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="results-header" variants={flightVariants}>
        <h1>Available Flights</h1>
        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSort}>
            <option value="price">Price (Low to High)</option>
            <option value="duration">Duration</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </motion.div>

      <div className="flights-list">
        {filteredFlights.map((flight, idx) => (
          <motion.div
            key={flight.id}
            className="flight-card"
            variants={flightVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: idx * 0.05 }}
          >
            {/* Airline Info */}
            <div className="flight-header">
              <div className="airline-info">
                <h3>{flight.airline}</h3>
                <p className="flight-number">{flight.flightNumber}</p>
              </div>
              <div className="rating">
                <Star size={18} fill="currentColor" />
                <span>{flight.rating}</span>
              </div>
            </div>

            {/* Flight Details */}
            <div className="flight-details">
              <div className="flight-route">
                <div className="stop">
                  <p className="time">{flight.departure}</p>
                  <p className="city">{flight.from}</p>
                </div>

                <div className="duration">
                  <Plane size={20} />
                  <p>{flight.duration}</p>
                  <p className="stops">{flight.stops} Stop</p>
                </div>

                <div className="stop">
                  <p className="time">{flight.arrival}</p>
                  <p className="city">{flight.to}</p>
                </div>
              </div>

              <div className="flight-info">
                <span className="aircraft">{flight.aircraft}</span>
                <span className="seats">
                  {flight.availableSeats} seats available
                </span>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flight-footer">
              <div className="price-section">
                <span className="price-label">Price per person</span>
                <h2 className="price">${flight.price}</h2>
              </div>
              <motion.button
                className="select-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectFlight(flight)}
              >
                Select Flight
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default FlightResults;
