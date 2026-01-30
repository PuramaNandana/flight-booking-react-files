import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedClouds.css';

function AnimatedClouds() {
  const cloudVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="clouds-background">
      <motion.div
        className="cloud cloud-1"
        variants={cloudVariants}
        initial="hidden"
        animate="visible"
      >
        <svg viewBox="0 0 100 40" className="cloud-svg">
          <defs>
            <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#f0f9ff', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path
            d="M 10 20 Q 5 10 15 5 Q 25 0 35 5 Q 45 2 50 10 Q 55 5 65 5 Q 75 5 80 15 Q 90 10 95 20 Q 90 30 80 35 Q 70 38 60 35 Q 50 40 40 38 Q 30 40 20 35 Q 10 32 10 20 Z"
            fill="url(#cloudGradient)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="cloud cloud-2"
        variants={cloudVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      >
        <svg viewBox="0 0 100 40" className="cloud-svg">
          <path
            d="M 10 20 Q 5 10 15 5 Q 25 0 35 5 Q 45 2 50 10 Q 55 5 65 5 Q 75 5 80 15 Q 90 10 95 20 Q 90 30 80 35 Q 70 38 60 35 Q 50 40 40 38 Q 30 40 20 35 Q 10 32 10 20 Z"
            fill="rgba(255, 255, 255, 0.7)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="cloud cloud-3"
        variants={cloudVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2 }}
      >
        <svg viewBox="0 0 100 40" className="cloud-svg">
          <path
            d="M 10 20 Q 5 10 15 5 Q 25 0 35 5 Q 45 2 50 10 Q 55 5 65 5 Q 75 5 80 15 Q 90 10 95 20 Q 90 30 80 35 Q 70 38 60 35 Q 50 40 40 38 Q 30 40 20 35 Q 10 32 10 20 Z"
            fill="rgba(255, 255, 255, 0.5)"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default AnimatedClouds;
