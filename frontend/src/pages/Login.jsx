import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // एरर दिखाने के लिए स्टेट
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // पुराना एरर साफ करें

    try {
      // बैकएंड API को रिक्वेस्ट भेजें
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });

      // अगर ईमेल और पासवर्ड सही हैं, तो टोकन सेव करें और डैशबोर्ड पर भेजें
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');

    } catch (err) {
      // अगर ईमेल या पासवर्ड गलत है, तो बैकएंड से जो मैसेज आएगा उसे यहाँ दिखाएंगे
      const errorMsg = err.response?.data?.message || 'Invalid email or password. Login failed!';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white text-gray-900 py-16 px-6 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        
        {/* हेडर */}
        <div className="text-center space-y-2">
          <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Secure Login
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Sign In</h1>
          <p className="text-gray-600 text-sm">
            Enter your correct credentials to proceed.
          </p>
        </div>

        {/* अगर पासवर्ड या ईमेल गलत है, तो यह एरर बॉक्स दिखेगा */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* फॉर्म */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition shadow-sm" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition shadow-sm" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        {/* फुटर लिंक */}
        <div className="text-center text-sm text-gray-600 pt-2 border-t border-gray-200">
          Don't have an account? <Link to="/register" className="text-red-600 font-semibold hover:underline">Register here</Link>
        </div>

      </div>
    </div>
  );
}