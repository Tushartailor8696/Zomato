import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white text-gray-900 py-16 px-6 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl space-y-8">
        
        {/* हेडर */}
        <div className="text-center space-y-2">
          <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            New Account
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Register</h1>
          <p className="text-gray-600 text-sm">
            Create a new account to start managing your items.
          </p>
        </div>

        {/* फॉर्म */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition shadow-sm" 
              required 
            />
          </div>

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
            Register
          </button>
        </form>

        {/* फुटर लिंक */}
        <div className="text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-red-600 font-semibold hover:underline">Login</Link>
        </div>

      </div>
    </div>
  );
}