# Complete Code Reference - Flight Booking System

This document contains all the code for the Flight Booking System project in one place for easy reference.

---

## 📄 package.json

```json
{
  "name": "flight-booking-react",
  "version": "1.0.0",
  "description": "Flight Booking System using React",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.13.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

## 🌐 public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Flight Booking</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

---

## 🚀 src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

---

## 📱 src/App.js

```javascript
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 🎨 src/App.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#root {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

---

## 🏠 src/components/Landing.jsx

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/home');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">FLIGHT BOOKING SYSTEM</h1>
        <p className="landing-quote">
          "The sky is not the limit, it's just the beginning."
        </p>
        <button className="book-now-btn" onClick={handleBookNow}>
          BOOK NOW
        </button>
      </div>
    </div>
  );
}

export default Landing;
```

---

## 🏠 src/components/Landing.css

```css
.landing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.landing-content {
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 60px 40px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
}

.landing-title {
  font-size: 3.5em;
  color: #667eea;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.landing-quote {
  font-size: 1.3em;
  color: #333;
  font-style: italic;
  margin-bottom: 40px;
  line-height: 1.6;
}

.book-now-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 50px;
  font-size: 1.1em;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.book-now-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.book-now-btn:active {
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .landing-title {
    font-size: 2.5em;
  }

  .landing-quote {
    font-size: 1.1em;
  }

  .landing-content {
    padding: 40px 20px;
  }
}
```

---

## 🔐 src/components/Home.jsx

```jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      alert("Login successful! (Demo)");
      setUsername("");
      setPassword("");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="home-container">
      <div className="login-box">
        <h1>FLIGHT BOOKING</h1>
        <h2>Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="register-section">
          <p>Don't have an account?</p>
          <Link to="/register" className="register-link">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
```

---

## 🔐 src/components/Home.css

```css
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 50px 40px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

.login-box h1 {
  color: #667eea;
  font-size: 1.8em;
  margin-bottom: 10px;
  text-align: center;
}

.login-box h2 {
  color: #333;
  font-size: 1.5em;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.login-btn:active {
  transform: translateY(0);
}

.register-section {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
}

.register-section p {
  color: #666;
  margin-bottom: 10px;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

@media (max-width: 500px) {
  .login-box {
    padding: 30px 20px;
  }

  .login-box h1 {
    font-size: 1.5em;
  }

  .login-box h2 {
    font-size: 1.2em;
  }
}
```

---

## 📝 src/components/Register.jsx

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (
      formData.fullName &&
      formData.email &&
      formData.password &&
      formData.phoneNumber
    ) {
      alert("Registration successful! (Demo)\nPlease login now.");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
      navigate("/home");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>FLIGHT BOOKING</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="login-prompt">
          Already have an account?{" "}
          <a href="/home" className="login-link">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
```

---

## 📝 src/components/Register.css

```css
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 50px 40px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 100%;
}

.register-box h1 {
  color: #667eea;
  font-size: 1.8em;
  margin-bottom: 10px;
  text-align: center;
}

.register-box h2 {
  color: #333;
  font-size: 1.5em;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
}

.register-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.register-btn:active {
  transform: translateY(0);
}

.login-prompt {
  text-align: center;
  margin-top: 30px;
  color: #666;
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

@media (max-width: 500px) {
  .register-box {
    padding: 30px 20px;
  }

  .register-box h1 {
    font-size: 1.5em;
  }

  .register-box h2 {
    font-size: 1.2em;
  }
}
```

---

## 🎯 Key Code Patterns Used

### Pattern 1: Form State Management
```javascript
const [value, setValue] = useState("");

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Pattern 2: Form Submission with Validation
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (validation_passes) {
    alert("Success!");
  } else {
    alert("Error!");
  }
};

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

### Pattern 3: React Router Navigation
```javascript
import { useNavigate, Link } from 'react-router-dom';

const navigate = useNavigate();
navigate('/path');  // Programmatic navigation

<Link to="/path">Link Text</Link>  // Link component
```

### Pattern 4: Component Structure
```javascript
import React from 'react';
import './Component.css';

function Component() {
  // Logic here
  
  return (
    <div>
      {/* JSX here */}
    </div>
  );
}

export default Component;
```

---

## ✅ All Files Complete!

Your complete Flight Booking System is ready with:
- ✅ 3 pages (Landing, Login, Register)
- ✅ Form validation
- ✅ React Router navigation
- ✅ Professional styling
- ✅ Mobile responsive design
- ✅ Error-free code
- ✅ Beginner-friendly structure

**Ready to run:** `npm start`

---

*Last Updated: January 29, 2026*
*Version: 1.0.0*
