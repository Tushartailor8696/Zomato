import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import Collections from './pages/Collections';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* पब्लिक पेजेस (कोई भी देख सकता है) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collections" element={<Collections />} />

        {/* प्रोटेक्टेड पेज (सिर्फ लॉगिन यूजर ही देख सकता है) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/order-online"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}