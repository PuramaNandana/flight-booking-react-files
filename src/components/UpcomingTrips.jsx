import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Calendar, Users, AlertCircle } from 'lucide-react';
import './UpcomingTrips.css';

function UpcomingTrips() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load and filter upcoming trips from localStorage
  useEffect(() => {
    loadUpcomingTrips();
    
    // Listen for storage changes (from other tabs)
    window.addEventListener('storage', loadUpcomingTrips);
    return () => window.removeEventListener('storage', loadUpcomingTrips);
  }, []);

  const loadUpcomingTrips = () => {
    try {
      const storedBookings = localStorage.getItem('bookings');
      if (storedBookings) {
        const bookings = JSON.parse(storedBookings);
        
        // Filter bookings where travel date > today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingTrips = bookings.filter(booking => {
          const travelDate = new Date(booking.date);
          travelDate.setHours(0, 0, 0, 0);
          return travelDate > today;
        }).map((booking, index) => ({
          id: booking.bookingId,
          bookingId: booking.bookingId,
          destination: `${booking.to}`,
          departureDate: booking.date,
          returnDate: booking.date, // Could be extended for return flights
          days: 1,
          travelers: booking.passengers?.length || 1,
          status: booking.status,
          flights: 1,
          hotels: 0,
          activities: 0,
          color: ['#FF6B6B', '#4ECDC4', '#95E1D3', '#FFD93D', '#6BCB77'][index % 5],
          booking: booking
        }));
        
        setTrips(upcomingTrips);
      } else {
        setTrips([]);
      }
    } catch (error) {
      console.error('Error loading upcoming trips:', error);
      setTrips([]);
    }
    setIsLoading(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    hidden: { opacity: 0, y: 40, x: -30 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: -40,
      x: 30,
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: 'spring', stiffness: 100 },
    },
  };

  const daysCounterVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="upcoming-trips-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className="trips-background">
        <div className="animated-plane-trips">✈️</div>
        <div className="animated-cloud trips-cloud-1">☁️</div>
        <div className="animated-cloud trips-cloud-2">☁️</div>
      </div>

      {/* Header Section */}
      <motion.div className="trips-header" variants={headerVariants}>
        <h1>Upcoming Trips</h1>
        <p>Your future travels at a glance</p>
      </motion.div>

      {/* Trips Grid */}
      <motion.div
        className="trips-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          <motion.div className="loading-state" variants={cardVariants}>
            <Plane size={48} />
            <p>Loading your upcoming trips...</p>
          </motion.div>
        ) : trips.length > 0 ? (
          trips.map((trip) => (
            <motion.div
              key={trip.id}
              className="trip-card"
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 25px 50px rgba(102, 126, 234, 0.25)',
              }}
              transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            >
              {/* Status Badge */}
              <div className="trip-status-badge" style={{ borderLeftColor: trip.color }}>
                <AlertCircle size={18} />
                <span>{trip.status}</span>
              </div>

              {/* Trip Header */}
              <div className="trip-header-content">
                <div className="destination-info">
                  <MapPin size={24} style={{ color: trip.color }} />
                  <h3>{trip.destination}</h3>
                </div>

                {/* Days Counter */}
                <motion.div
                  className="days-counter"
                  style={{ backgroundColor: trip.color }}
                  variants={daysCounterVariants}
                >
                  <span className="days-number">{trip.days}</span>
                  <span className="days-label">Day{trip.days > 1 ? 's' : ''}</span>
                </motion.div>
              </div>

              {/* Trip Dates */}
              <div className="trip-dates">
                <div className="date-item">
                  <Calendar size={16} />
                  <div>
                    <p className="label">Departure</p>
                    <p className="date-value">
                      {new Date(trip.departureDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="date-arrow">→</div>

                <div className="date-item">
                  <Calendar size={16} />
                  <div>
                    <p className="label">Return</p>
                    <p className="date-value">
                      {new Date(trip.returnDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Travelers */}
              <div className="trip-travelers">
                <Users size={18} style={{ color: trip.color }} />
                <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
              </div>

              {/* Trip Details Grid */}
              <div className="trip-details-grid">
                <div className="trip-detail">
                  <Plane size={16} style={{ color: trip.color }} />
                  <div>
                    <p className="detail-label">Flights</p>
                    <p className="detail-value">{trip.flights}</p>
                  </div>
                </div>

                <div className="trip-detail">
                  <span className="hotel-icon" style={{ color: trip.color }}>🏨</span>
                  <div>
                    <p className="detail-label">Hotels</p>
                    <p className="detail-value">{trip.hotels}</p>
                  </div>
                </div>

                <div className="trip-detail">
                  <span className="activity-icon" style={{ color: trip.color }}>🎯</span>
                  <div>
                    <p className="detail-label">Activities</p>
                    <p className="detail-value">{trip.activities}</p>
                  </div>
                </div>
              </div>

              {/* Trip ID */}
              <p className="trip-id">Booking ID: {trip.bookingId}</p>
            </motion.div>
          ))
        ) : (
          <motion.div className="no-trips" variants={cardVariants}>
            <Plane size={64} />
            <h2>No Upcoming Trips</h2>
            <p>You don't have any upcoming flights. Book your next adventure now!</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default UpcomingTrips;
