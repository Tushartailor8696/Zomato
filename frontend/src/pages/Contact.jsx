import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Axios के जरिए बैकएंड API को डेटा भेजना (जो सीधे MongoDB में सेव होगा)
      const res = await axios.post('http://localhost:5000/api/contact', form);
      
      if (res.data.success || res.status === 201) {
        setSuccessMessage('🎉 Thank you! Your message has been successfully saved in our database.');
        setForm({ name: '', email: '', phone: '', message: '' }); // फॉर्म खाली करना
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || '❌ Failed to send message. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-red-50 text-gray-900 py-16 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-2xl space-y-8 backdrop-blur-xl">
        
        {/* --- हेडर सेक्शन --- */}
        <div className="text-center space-y-3">
          <span className="bg-red-100 text-red-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
            📩 Get in Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Contact Our Team
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Have questions about your order or need support? Drop us a message below and we’ll store it in our database instantly.
          </p>
        </div>

        {/* --- सफलता (Success) या एरर (Error) मैसेज --- */}
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm font-medium text-center shadow-sm animate-fade-in">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-sm font-medium text-center shadow-sm animate-fade-in">
            {errorMessage}
          </div>
        )}

        {/* --- फॉर्म सेक्शन --- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Your Name</label>
            <input 
              type="text" 
              placeholder="full name" 
              value={form.name} 
              onChange={(e) => setForm({...form, name: e.target.value})} 
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:bg-white focus:outline-none transition shadow-sm font-medium" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Your Email</label>
              <input 
                type="email" 
                placeholder="email" 
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})} 
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:bg-white focus:outline-none transition shadow-sm font-medium" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Phone Number</label>
              <input 
                type="text" 
                placeholder="phone number" 
                value={form.phone} 
                onChange={(e) => setForm({...form, phone: e.target.value})} 
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:bg-white focus:outline-none transition shadow-sm font-medium" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Your Message</label>
            <textarea 
              placeholder="Write your message or query here..." 
              rows="4"
              value={form.message} 
              onChange={(e) => setForm({...form, message: e.target.value})} 
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:bg-white focus:outline-none transition shadow-sm font-medium resize-none" 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? 'Submitting to Database...' : '🚀 Submit Message to Database'}
          </button>
        </form>

      </div>
    </div>
  );
}