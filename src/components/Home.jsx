import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./Home.css";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify({ username, email: username }));
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Please enter username and password");
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
      className="home-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="login-box" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <h1>FLIGHT BOOKING</h1>
        <h2>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <motion.div
            className="form-group"
            variants={inputVariants}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="username">
              <Mail size={18} /> Username:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            variants={inputVariants}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="password">
              <Lock size={18} /> Password:
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0.3 }}
          >
            Login
          </motion.button>
        </form>

        <div className="register-section">
          <p>Don't have an account?</p>
          <Link to="/register" className="register-link">
            Register Here
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
