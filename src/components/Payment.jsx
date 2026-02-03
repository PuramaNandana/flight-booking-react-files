import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, Calendar, Smartphone, Zap } from 'lucide-react';
import './Payment.css';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, selectedSeats, passengers } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [upiData, setUpiData] = useState({
    upiId: ''
  });
  const [phoneData, setPhoneData] = useState({
    phoneNumber: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!flight || !selectedSeats) {
    return <div className="no-data">No payment data</div>;
  }

  const totalAmount = flight.price * selectedSeats.length;

  // Indian phone number validation (10 digits)
  const validateIndianPhoneNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, '');
    return cleanNumber.length === 10;
  };

  // Format phone number to +91XXXXXXXXXX format
  const formatPhoneNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.length === 10) {
      return `+91${cleanNumber}`;
    }
    return number;
  };

  // UPI ID validation
  const validateUpiId = (upi) => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(upi);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (paymentMethod === 'card') {
      setCardData(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (paymentMethod === 'upi') {
      setUpiData(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (paymentMethod === 'netbanking' || paymentMethod === 'debitcard') {
      setPhoneData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePayment = async () => {
    let isValid = false;

    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
        alert('Please fill in all card details');
        return;
      }
      isValid = true;
    } else if (paymentMethod === 'upi') {
      if (!upiData.upiId || !validateUpiId(upiData.upiId)) {
        alert('Please enter a valid UPI ID (e.g., yourname@okhdfcbank)');
        return;
      }
      isValid = true;
    } else if (paymentMethod === 'debitcard' || paymentMethod === 'creditcard' || paymentMethod === 'netbanking') {
      if (!phoneData.phoneNumber || !validateIndianPhoneNumber(phoneData.phoneNumber)) {
        alert('Please enter a valid 10-digit Indian mobile number');
        return;
      }
      isValid = true;
    }

    if (!isValid) {
      alert('Please select a valid payment method');
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      // Create booking object with all required fields
      const bookingObject = {
        bookingId: `BK${Date.now()}`,
        flightId: flight.id || flight.flightNumber,
        from: flight.from,
        to: flight.to,
        date: flight.date,
        passengerName: passengers[0]?.firstName + ' ' + passengers[0]?.lastName,
        seat: selectedSeats.join(', '),
        price: Math.round(totalAmount * 83), // INR
        status: 'Confirmed',
        bookingDate: new Date().toISOString(),
        totalAmount,
        paymentMethod,
        flight,
        selectedSeats,
        passengers,
      };

      if (paymentMethod === 'card') {
        bookingObject.paymentDetails = {
          cardLast4: cardData.cardNumber.slice(-4),
          cardName: cardData.cardName
        };
      } else if (paymentMethod === 'upi') {
        bookingObject.paymentDetails = {
          upiId: upiData.upiId
        };
      } else {
        bookingObject.paymentDetails = {
          phone: formatPhoneNumber(phoneData.phoneNumber)
        };
      }

      // Save to localStorage
      try {
        const existingBookings = localStorage.getItem('bookings');
        const bookingsArray = existingBookings ? JSON.parse(existingBookings) : [];
        bookingsArray.push(bookingObject);
        localStorage.setItem('bookings', JSON.stringify(bookingsArray));
        
        // Navigate to My Bookings page
        navigate('/my-bookings');
      } catch (error) {
        console.error('Error saving booking:', error);
        alert('Error saving booking. Please try again.');
        setIsProcessing(false);
      }
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
        {/* Payment Method Selector */}
        <motion.div className="payment-methods" variants={itemVariants}>
          <h3>Select Payment Method</h3>
          <div className="methods-grid">
            <motion.button
              className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard size={24} />
              <span>Debit/Credit Card</span>
            </motion.button>

            <motion.button
              className={`method-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('upi')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={24} />
              <span>UPI</span>
            </motion.button>

            <motion.button
              className={`method-btn ${paymentMethod === 'debitcard' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('debitcard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard size={24} />
              <span>Debit Card (Net Banking)</span>
            </motion.button>

            <motion.button
              className={`method-btn ${paymentMethod === 'creditcard' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('creditcard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard size={24} />
              <span>Credit Card (Net Banking)</span>
            </motion.button>

            <motion.button
              className={`method-btn ${paymentMethod === 'netbanking' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('netbanking')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone size={24} />
              <span>Net Banking</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Payment Form */}
        <motion.div className="payment-form" variants={itemVariants}>
          {paymentMethod === 'card' && (
            <>
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
            </>
          )}

          {paymentMethod === 'upi' && (
            <>
              <h3>UPI Payment</h3>
              <div className="form-group">
                <label>
                  <Zap size={16} />
                  UPI ID
                </label>
                <motion.input
                  type="text"
                  name="upiId"
                  value={upiData.upiId}
                  onChange={handleInputChange}
                  placeholder="yourname@okhdfcbank"
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                />
                <p className="input-hint">Examples: yourname@okhdfcbank, yourname@okaxis, yourname@okicici</p>
              </div>
            </>
          )}

          {(paymentMethod === 'debitcard' || paymentMethod === 'creditcard' || paymentMethod === 'netbanking') && (
            <>
              <h3>{paymentMethod === 'debitcard' ? 'Debit Card Net Banking' : paymentMethod === 'creditcard' ? 'Credit Card Net Banking' : 'Net Banking'}</h3>
              <div className="form-group">
                <label>
                  <Smartphone size={16} />
                  Mobile Number (for verification)
                </label>
                <motion.input
                  type="text"
                  name="phoneNumber"
                  value={phoneData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                />
                <p className="input-hint">Enter 10-digit Indian mobile number (will be formatted as +91XXXXXXXXXX)</p>
              </div>
            </>
          )}

          <motion.div className="security-info" whileHover={{ y: -5 }}>
            <Lock size={16} />
            <span>Your payment information is encrypted and secure (SSL Secure)</span>
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
            <p className="price">₹{Math.round(totalAmount * 83)}</p>
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
              <span>₹{Math.round(flight.price * selectedSeats.length * 83)}</span>
            </div>
            <div className="breakdown-row">
              <span>Taxes & Fees</span>
              <span>Included</span>
            </div>
            <div className="breakdown-row total">
              <span>Total Amount (INR)</span>
              <span className="total-price">₹{Math.round(totalAmount * 83)}</span>
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
                Pay ₹{Math.round(totalAmount * 83)}
                <span>→</span>
              </>
            )}
          </motion.button>

          <p className="payment-note">
            By clicking Pay, you agree to our terms and conditions. This is a secure transaction.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Payment;
