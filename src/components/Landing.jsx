import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Cloud, Zap } from 'lucide-react';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const planeVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
    animate: {
      x: [0, 10, 0],
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.8 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
    },
    tap: { scale: 0.95 },
  };

  const cloudVariants = {
    animate: {
      x: [0, 30, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="landing-wrapper">
      {/* Animated Background Elements */}
      <motion.div className="floating-plane" variants={planeVariants} initial="hidden" animate={['visible', 'animate']}>
        <Plane size={60} />
      </motion.div>

      <motion.div className="floating-cloud cloud-1" variants={cloudVariants} animate="animate">
        <Cloud size={80} />
      </motion.div>

      <motion.div className="floating-cloud cloud-2" variants={cloudVariants} animate="animate">
        <Cloud size={100} />
      </motion.div>

      <motion.div className="floating-cloud cloud-3" variants={cloudVariants} animate="animate">
        <Cloud size={90} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="landing-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="landing-content" variants={itemVariants}>
          {/* Title */}
          <motion.h1 className="landing-title" variants={itemVariants}>
            <span className="title-icon">✈️</span>
            FLIGHT BOOKING SYSTEM
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="landing-subtitle" variants={itemVariants}>
            Your Gateway to the World
          </motion.p>

          {/* Quote */}
          <motion.p className="landing-quote" variants={itemVariants}>
            "The sky is not the limit, it's just the beginning."
          </motion.p>

          {/* Features */}
          <motion.div className="features" variants={itemVariants}>
            <div className="feature-item">
              <Zap size={24} />
              <span>Fast Booking</span>
            </div>
            <div className="feature-item">
              <Zap size={24} />
              <span>Best Prices</span>
            </div>
            <div className="feature-item">
              <Zap size={24} />
              <span>Easy Cancellation</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div className="cta-buttons" variants={itemVariants}>
            <motion.button
              className="book-now-btn"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/login')}
            >
              BOOK NOW
            </motion.button>
            <motion.button
              className="learn-more-btn"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/register')}
            >
              GET STARTED
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Gradient Background */}
      <div className="animated-gradient"></div>
    </div>
  );
}

export default Landing;

