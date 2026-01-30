import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, Calendar } from 'lucide-react';
import './Payment.css';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, selectedSeats, passengers } = location.state || {};
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!flight || !selectedSeats) {
    return <div className="no-data">No payment data</div>;
  }

  const totalAmount = flight.price * selectedSeats.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
      alert('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate('/booking-confirmation', {
        state: {
          flight,
          selectedSeats,
          passengers,
          bookingId: `BK${Date.now()}`,
          totalAmount
        }
      });
    }, 2000);
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
    <motion.div className="payment-container"
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

      <motion.div className="payment-header" variants={itemVariants}>
        <h2>Payment Details</h2>
        <p>Complete your booking by providing payment information</p>
      </motion.div>

      <div className="payment-content">
        {/* Payment Form */}
        <motion.div className="payment-form" variants={itemVariants}>
          <h3>Card Information</h3>

          <div className="form-group">
            <label>
              <CreditCard size={16} />
              Card Number
            </label>
            <motion.input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
            />
          </div>

          <div className="form-group">
            <label>Cardholder Name</label>
            <motion.input
              type="text"
              name="cardName"
              value={cardData.cardName}
              onChange={handleInputChange}
              placeholder="John Doe"
              whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <Calendar size={16} />
                Expiry Date
              </label>
              <motion.input
                type="text"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
              />
            </div>

            <div className="form-group">
              <label>
                <Lock size={16} />
                CVV
              </label>
              <motion.input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="3"
                whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
              />
            </div>
          </div>

          <motion.div className="security-info" whileHover={{ y: -5 }}>
            <Lock size={16} />
            <span>Your payment information is encrypted and secure</span>
          </motion.div>
        </motion.div>

        {/* Order Summary */}
        <motion.div className="order-summary" variants={itemVariants}>
          <h3>Order Summary</h3>
          
          <div className="summary-flight">
            <div className="flight-info">
              <p className="airline">{flight.airline}</p>
              <p className="route">{flight.from} → {flight.to}</p>
              <p className="date">{flight.date}</p>
            </div>
            <p className="price">${totalAmount}</p>
          </div>

          <div className="summary-items">
            <h4>Passengers ({passengers.length})</h4>
            {passengers.map((passenger, index) => (
              <div key={index} className="passenger-item">
                <span>{passenger.firstName} {passenger.lastName}</span>
                <span className="seat">{selectedSeats[index]}</span>
              </div>
            ))}
          </div>

          <div className="summary-breakdown">
            <div className="breakdown-row">
              <span>Base Fare ({selectedSeats.length} seats)</span>
              <span>${flight.price * selectedSeats.length}</span>
            </div>
            <div className="breakdown-row">
              <span>Taxes & Fees</span>
              <span>Included</span>
            </div>
            <div className="breakdown-row total">
              <span>Total Amount</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <motion.button 
            className={`pay-button ${isProcessing ? 'processing' : ''}`}
            onClick={handlePayment}
            disabled={isProcessing}
            whileHover={!isProcessing ? { scale: 1.05 } : {}}
            whileTap={!isProcessing ? { scale: 0.95 } : {}}
          >
            {isProcessing ? (
              <>
                <motion.div 
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Lock size={18} />
                </motion.div>
                Processing Payment...
              </>
            ) : (
              <>
                Pay ${totalAmount}
                <span>→</span>
              </>
            )}
          </motion.button>

          <p className="payment-note">
            By clicking Pay, you agree to our terms and conditions
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Payment;
