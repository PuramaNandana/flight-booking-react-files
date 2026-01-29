import React from 'react';
import { Github, Twitter, Linkedin, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      variants={footerVariants}
    >
      <div className="footer-container">
        {/* Footer Content */}
        <div className="footer-content">
          <div className="footer-section">
            <h3>About FLY SKY</h3>
            <p>Your trusted partner for seamless flight booking and travel experiences.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/search">Search Flights</a></li>
              <li><a href="/profile">My Profile</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: info@flysky.com</li>
              <li>Phone: +1 (800) FLY-SKYY</li>
              <li>Address: 123 Aviation Blvd, Sky City</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <Github size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} FLY SKY Airlines. All rights reserved.</p>
          <p>Privacy Policy | Terms of Service | Contact</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
