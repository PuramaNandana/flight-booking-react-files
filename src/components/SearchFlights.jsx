import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import './SearchFlights.css';

function SearchFlights() {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.from && searchData.to && searchData.date) {
      // Pass search data via navigate
      navigate('/results', { state: { searchData } });
    } else {
      alert('Please fill all fields');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="search-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="search-card" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <h1>Find Your Perfect Flight</h1>
        <p>Search and compare flights from the best airlines</p>

        <form onSubmit={handleSearch} className="search-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <input
                type="text"
                id="from"
                name="from"
                placeholder="Departure city"
                value={searchData.from}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="to">To</label>
              <input
                type="text"
                id="to"
                name="to"
                placeholder="Arrival city"
                value={searchData.to}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={searchData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passengers">Passengers</label>
              <select
                id="passengers"
                name="passengers"
                value={searchData.passengers}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            className="search-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search size={20} />
            Search Flights
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        className="quick-routes"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3>Popular Routes</h3>
        <div className="routes-grid">
          {[
            { from: 'New York', to: 'Los Angeles', price: '$245' },
            { from: 'Chicago', to: 'Miami', price: '$189' },
            { from: 'San Francisco', to: 'Seattle', price: '$95' },
            { from: 'Boston', to: 'Denver', price: '$156' },
          ].map((route, idx) => (
            <motion.div
              key={idx}
              className="route-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p><strong>{route.from}</strong> → <strong>{route.to}</strong></p>
              <span className="price">{route.price}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SearchFlights;
