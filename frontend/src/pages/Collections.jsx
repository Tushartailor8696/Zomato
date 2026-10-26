import React, { useState } from 'react';
import axios from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // इनपुट चेंज होने पर स्टेट अपडेट करें
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // फॉर्म सबमिट होने पर
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // बैकएंड API को डेटा भेजना
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      if (res.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-16 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Get in Touch
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-gray-600 text-sm">Have a question or feedback? Fill out the form below and we will store your query in our database.</p>
        </div>

        {submitted && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-center text-sm font-medium">
            ✅ Thank you! Your message has been successfully saved in our database.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-center text-sm font-medium">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Your Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="tushar" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none text-sm" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="tushar@example.com" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none text-sm" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                placeholder="9876543210" 
                value={formData.phone} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none text-sm" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Your Message</label>
            <textarea 
              name="message" 
              rows="4" 
              placeholder="Write your message here..." 
              value={formData.message} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none text-sm resize-none" 
              required 
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg"
          >
            Submit Message to Database
          </button>
        </form>

      </div>
    </div>
  );
}