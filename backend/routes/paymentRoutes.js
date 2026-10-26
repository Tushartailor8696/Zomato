const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });
  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Get all payments for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new payment record
router.post('/', verifyToken, async (req, res) => {
  try {
    const { amount, orderType } = req.body;
    const newPayment = new Payment({
      user: req.user.id,
      amount,
      orderType
    });
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;