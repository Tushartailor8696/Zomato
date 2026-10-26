import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 text-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* ब्रांड लोगो (Zomato-style) */}
        <Link to="/" className="text-3xl font-black text-red-600 tracking-tighter flex items-baseline gap-1">
          zomato
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">(MERN)</span>
        </Link>

        {/* नेविगेशन लिंक्स */}
        <div className="flex items-center space-x-6 text-sm md:text-base font-medium">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <Link to="/about" className="hover:text-red-600 transition">About</Link>
          <Link to="/contact" className="hover:text-red-600 transition">Contact</Link>
          
          {token ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="hover:text-red-600 transition font-semibold">Dashboard</Link>
              
              <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700">
                👤 {user?.name || 'User'}
              </div>

              <button 
                onClick={handleLogout} 
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-xl transition shadow-sm font-semibold text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="hover:text-red-600 transition font-semibold">Login</Link>
              <Link 
                to="/register" 
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}