import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Fullpage from './components/Fullpage';
import HalfPage from './components/HalfPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div style={appWrapper}>
      {/* Animated Glow Background */}
      <div style={bgGlowOne}></div>
      <div style={bgGlowTwo}></div>

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Fullpage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/successfull"
            element={
              <ProtectedRoute>
                <HalfPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// ---------------- Styles ----------------

const appWrapper = {
  minHeight: "100vh",
  padding: "30px",
  background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  position: "relative",
  overflow: "hidden",
};

const bgGlowOne = {
  position: "fixed",
  top: "-120px",
  left: "-100px",
  width: "500px",
  height: "500px",
  background:
    "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0) 70%)",
  filter: "blur(120px)",
  zIndex: 0,
  animation: "floatGlow 8s ease-in-out infinite",
};

const bgGlowTwo = {
  position: "fixed",
  bottom: "-120px",
  right: "-100px",
  width: "450px",
  height: "450px",
  background:
    "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0) 70%)",
  filter: "blur(120px)",
  zIndex: 0,
  animation: "floatGlowReverse 10s ease-in-out infinite",
};
