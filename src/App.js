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
import FlightDetails from "./components/FlightDetails";
import BookingDetails from "./components/BookingDetails";
import SeatSelection from "./components/SeatSelection";
import PassengerDetails from "./components/PassengerDetails";
import Payment from "./components/Payment";
import BookingConfirmation from "./components/BookingConfirmation";
import UserProfile from "./components/UserProfile";
import MyBookings from "./components/MyBookings";
import AdminPanel from "./components/AdminPanel";
import BookingPage from "./components/BookingPage";
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
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Home />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
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
              element={localStorage.getItem("user") ? <FlightResults onSelectFlight={setSelectedFlight} /> : <Navigate to="/login" />}
            />
            <Route
              path="/flight-details"
              element={localStorage.getItem("user") ? <FlightDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/booking-details"
              element={localStorage.getItem("user") ? <BookingDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/seat-selection"
              element={localStorage.getItem("user") ? <SeatSelection /> : <Navigate to="/login" />}
            />
            <Route
              path="/passenger-details"
              element={localStorage.getItem("user") ? <PassengerDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment"
              element={localStorage.getItem("user") ? <Payment /> : <Navigate to="/login" />}
            />
            <Route
              path="/booking-confirmation"
              element={localStorage.getItem("user") ? <BookingConfirmation /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={localStorage.getItem("user") ? <UserProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/my-bookings"
              element={localStorage.getItem("user") ? <MyBookings /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={localStorage.getItem("user") ? <AdminPanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/booking"
              element={localStorage.getItem("user") ? (selectedFlight ? <BookingPage flight={selectedFlight} /> : <Navigate to="/search" />) : <Navigate to="/login" />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
