import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone } from "lucide-react";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    return newErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Store registration data
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Registration successful! Please login.");
      navigate("/login");
    } else {
      setErrors(newErrors);
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

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="register-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="register-box" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <h1>FLIGHT BOOKING</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <motion.div
            className="form-group"
            variants={inputVariants}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="fullName">
              <User size={18} /> Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
          </motion.div>

          <motion.div
            className="form-group"
            variants={inputVariants}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email">
              <Mail size={18} /> Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </motion.div>

          <motion.div
            className="form-group"
            variants={inputVariants}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="password">
              <Lock size={18} /> Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </motion.div>

          <motion.div
            className="form-group"
            variants={inputVariants}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="phoneNumber">
              <Phone size={18} /> Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <span className="error-msg">{errors.phoneNumber}</span>}
          </motion.div>

          <motion.button
            type="submit"
            className="register-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0.5 }}
          >
            Register
          </motion.button>
        </form>

        <p className="login-prompt">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Login Here
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Register;
