import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import SearchFlights from "./components/SearchFlights";
import FlightResults from "./components/FlightResults";
import BookingPage from "./components/BookingPage";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={localStorage.getItem("user") ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={localStorage.getItem("user") ? <SearchFlights /> : <Navigate to="/login" />}
            />
            <Route
              path="/results"
              element={<FlightResults onSelectFlight={setSelectedFlight} />}
            />
            <Route
              path="/booking"
              element={selectedFlight ? <BookingPage flight={selectedFlight} /> : <Navigate to="/search" />}
            />
            <Route
              path="/profile"
              element={localStorage.getItem("user") ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
