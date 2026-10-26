import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [payments, setPayments] = useState([]);
  
  // Item Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  // Payment Form States
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('Food Delivery Order');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch Items & Payments
  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const itemsRes = await axios.get('http://localhost:5000/api/items', { headers });
      const paymentsRes = await axios.get('http://localhost:5000/api/payments', { headers });
      
      setItems(itemsRes.data);
      setPayments(paymentsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Create or Update Item (Add & Update)
  const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (editId) {
        // Update API
        await axios.put(`http://localhost:5000/api/items/${editId}`, { title, description }, { headers });
        setEditId(null);
        alert('Item successfully updated!');
      } else {
        // Add API
        await axios.post('http://localhost:5000/api/items', { title, description }, { headers });
        alert('Item successfully added!');
      }
      setTitle('');
      setDescription('');
      fetchData();
    } catch (err) {
      alert('Operation failed');
    }
  };

  // Handle Edit Click
  const handleEdit = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setDescription(item.description);
  };

  // Handle Delete Item
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
        alert('Item deleted successfully!');
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  // Handle Simulated Payment (Show Payment Status)
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post('http://localhost:5000/api/payments', { amount, orderType }, { headers });
      alert('Payment Successful & Status Saved!');
      setAmount('');
      fetchData();
    } catch (err) {
      alert('Payment failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white text-gray-900 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* -- वेलकम हेडर -- */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center">
          <div className="space-y-1">
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Full Control Panel
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Welcome, {user?.name || 'User'}!</h1>
            <p className="text-white/80 text-sm">Add, Update, Delete items and monitor your payment status in real-time.</p>
          </div>
          <div className="hidden md:flex text-5xl">⚡</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- 1. ADD / UPDATE ITEM FORM --- */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editId ? '✏️ Update Item' : '➕ Add New Item'}
              </h2>
              {editId && (
                <button 
                  onClick={() => { setEditId(null); setTitle(''); setDescription(''); }} 
                  className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleItemSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Special Thali / Project Task" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition shadow-sm" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Description</label>
                <textarea 
                  placeholder="Enter details..." 
                  rows="3"
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition shadow-sm" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg"
              >
                {editId ? 'Update Item in Database' : 'Add Item to Database'}
              </button>
            </form>
          </div>

          {/* --- 2. PAYMENT GATEWAY & STATUS SIMULATOR --- */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">💳 Simulated Payment</h2>
            
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Order Type</label>
                <select 
                  value={orderType} 
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition shadow-sm"
                >
                  <option value="Food Delivery Order">Food Delivery Order</option>
                  <option value="Dining Reservation">Dining Reservation</option>
                  <option value="Pro Membership">Pro Membership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="500" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition shadow-sm" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg"
              >
                Pay Now & Save Status
              </button>
            </form>
          </div>

        </div>

        {/* --- 3. ITEMS LIST (SHOW, EDIT, DELETE) --- */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">📋 Your Added Items (CRUD)</h2>
          
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No items found. Add a new item using the form above.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- 4. PAYMENT STATUS & HISTORY SECTION --- */}
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">📜 Payment History & Status</h2>
          
          {payments.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No payment records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <th className="p-4">Order Type</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {payments.map(pay => (
                    <tr key={pay._id} className="hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">{pay.orderType}</td>
                      <td className="p-4 text-gray-700">₹{pay.amount}</td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                          {pay.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{new Date(pay.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
} 


