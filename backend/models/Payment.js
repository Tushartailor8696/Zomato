const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  orderType: { type: String, required: true }, // जैसे: "Food Order", "Pro Membership"
  status: { type: String, default: "Success" }, // Success, Pending, Failed
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);