import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedPlane.css';

function AnimatedPlane() {
  return (
    <motion.svg
      width="200"
      height="100"
      viewBox="0 0 200 100"
      className="animated-plane-svg"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, type: 'spring' }}
    >
      {/* Plane body */}
      <motion.ellipse
        cx="100"
        cy="50"
        rx="50"
        ry="25"
        fill="url(#planeGradient)"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Cockpit */}
      <motion.circle
        cx="140"
        cy="40"
        r="8"
        fill="#1f2937"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Wings */}
      <motion.path
        d="M 80 50 Q 50 45 30 55 Q 50 60 80 55"
        fill="#3b82f6"
        opacity="0.7"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.path
        d="M 120 50 Q 150 45 170 55 Q 150 60 120 55"
        fill="#3b82f6"
        opacity="0.7"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Tail */}
      <motion.path
        d="M 50 50 L 40 40 L 40 60 Z"
        fill="#1f2937"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export default AnimatedPlane;
