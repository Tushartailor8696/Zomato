import React, { useState } from 'react';
import axios from 'axios';

export default function About() {
  // 1. Cart State
  const [cart, setCart] = useState([]);

  // 2. Checkout & Payment States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  // 3. Menu Items
  const menuItems = [
    {
      id: 1,
      name: "Baahubali Pizza",
      category: "Special Pizza",
      price: 899,
      description: "Giant multi-layered pizza loaded with extra cheese, exotic vegetables, and paneer.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Cheese Burst Pizza",
      category: "Pizza",
      price: 349,
      description: "Classic pizza overflowing with liquid cheese and fresh toppings.",
      image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Crispy Veg Burger",
      category: "Burger",
      price: 149,
      description: "Crunchy potato patty with fresh lettuce, tomatoes, and creamy mayonnaise.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Steamed Veg Momos",
      category: "Momos",
      price: 120,
      description: "Soft dumplings stuffed with finely chopped vegetables, served with fiery red chutney.",
      image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      name: "Chocolate Truffle Cake",
      category: "Cake",
      price: 549,
      description: "Rich, decadent chocolate sponge layered with smooth dark chocolate ganache.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // 4. Cart Handlers
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveOne = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      }
      return prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const handleDeleteItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId));
  };

  // Calculations
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subTotal > 0 ? 40 : 0;
  const grandTotal = subTotal + deliveryFee;

  // 5. Handle Payment Submission
  const handlePayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      // बैकएंड पेमेंट API को कॉल करना
      await axios.post('http://localhost:5000/api/payments', {
        amount: grandTotal,
        orderType: `Food Order (${cart.map(i => `${i.name} x${i.quantity}`).join(', ')})`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPaymentSuccess({
        orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        amount: grandTotal,
        items: [...cart],
        paymentMethod,
        address: deliveryAddress
      });

      setCart([]);
      setIsCheckoutOpen(false);
    } catch (err) {
      alert("Payment Success simulated (or login to save to Database)!");
      setPaymentSuccess({
        orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        amount: grandTotal,
        items: [...cart],
        paymentMethod,
        address: deliveryAddress
      });
      setCart([]);
      setIsCheckoutOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
            Special Zomato Menu
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Explore Dishes & Order Now
          </h1>
          <p className="text-gray-600 text-base">
            Select your favorite items, view your itemized cart summary, and make a instant payment.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => {
            const inCart = cart.find((cartItem) => cartItem.id === item.id);

            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                      <span className="text-xl font-extrabold text-red-600">₹{item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  {inCart ? (
                    <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl p-1.5">
                      <button onClick={() => handleRemoveOne(item.id)} className="w-10 h-10 bg-white text-red-600 font-bold rounded-lg shadow hover:bg-red-100 transition flex items-center justify-center text-lg">-</button>
                      <span className="font-bold text-gray-900 text-base">{inCart.quantity} in Cart</span>
                      <button onClick={() => handleAddToCart(item)} className="w-10 h-10 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition flex items-center justify-center text-lg">+</button>
                    </div>
                  ) : (
                    <button onClick={() => handleAddToCart(item)} className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2">
                      🛒 Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- SELECTED CART & PAYMENT BILLING SECTION --- */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🛍️ Selected Items for Purchase</h2>
              <p className="text-gray-500 text-sm">Review your selected items and complete your order.</p>
            </div>
            <div className="bg-red-100 text-red-700 font-bold px-4 py-2 rounded-xl text-sm">
              Items Selected: {totalItemsCount}
            </div>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-400 text-sm italic text-center py-6">
              No items selected yet. Choose items from above to buy!
            </p>
          ) : (
            <div className="space-y-6">
              {/* Itemized List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cart.map((cartItem) => (
                  <div key={cartItem.id} className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                      <img src={cartItem.image} alt={cartItem.name} className="w-14 h-14 object-cover rounded-xl" />
                      <div>
                        <h4 className="font-bold text-gray-900">{cartItem.name}</h4>
                        <p className="text-red-600 font-semibold text-sm">₹{cartItem.price} × {cartItem.quantity} = ₹{cartItem.price * cartItem.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                        <button onClick={() => handleRemoveOne(cartItem.id)} className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold">-</button>
                        <span className="px-3 font-semibold text-sm">{cartItem.quantity}</span>
                        <button onClick={() => handleAddToCart(cartItem)} className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold">+</button>
                      </div>
                      <button onClick={() => handleDeleteItem(cartItem.id)} className="text-gray-400 hover:text-red-600 font-bold text-sm px-1 transition">✕</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Card */}
              <div className="bg-gray-900 text-white p-6 rounded-2xl space-y-4">
                <div className="border-b border-gray-800 pb-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Items Subtotal:</span>
                    <span>₹{subTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Charge:</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">Total Amount to Pay</span>
                    <h3 className="text-3xl font-extrabold text-white">₹{grandTotal}</h3>
                  </div>
                  
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2"
                  >
                    💳 Pay & Order Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- CHECKOUT / PAYMENT FORM MODAL --- */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-xl font-bold text-gray-900">💳 Complete Your Payment</h3>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg font-bold">✕</button>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Delivery Address</label>
                  <input 
                    type="text" 
                    placeholder="e.g. House No. 12, Ratanada, Jodhpur" 
                    value={deliveryAddress} 
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none text-sm" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Select Payment Method</label>
                  <select 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none text-sm font-medium"
                  >
                    <option value="UPI (Google Pay / PhonePe)">UPI (Google Pay / PhonePe / Paytm)</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                  </select>
                </div>

                <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-700">Final Bill Amount:</span>
                  <span className="font-extrabold text-red-600 text-lg">₹{grandTotal}</span>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg"
                >
                  Confirm Payment of ₹{grandTotal}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- SUCCESSFUL PAYMENT RECEIPT --- */}
        {paymentSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 space-y-4 text-emerald-900 shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <h3 className="text-2xl font-extrabold">Payment Successful & Order Placed!</h3>
                <p className="text-emerald-700 text-sm">Order ID: {paymentSuccess.orderId}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100 text-sm space-y-2">
              <p><strong>Paid Amount:</strong> ₹{paymentSuccess.amount}</p>
              <p><strong>Payment Mode:</strong> {paymentSuccess.paymentMethod}</p>
              <p><strong>Delivery Address:</strong> {paymentSuccess.address || 'Address provided at checkout'}</p>
              <div>
                <strong>Purchased Items:</strong>
                <ul className="list-disc list-inside mt-1 text-gray-700">
                  {paymentSuccess.items.map((it, idx) => (
                    <li key={idx}>{it.name} (Quantity: {it.quantity}) - ₹{it.price * it.quantity}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setPaymentSuccess(null)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition"
            >
              Close Receipt
            </button>
          </div>
        )}

      </div>
    </div>
  );
}