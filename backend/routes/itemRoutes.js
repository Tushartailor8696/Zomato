const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT Token
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

// Get All Items for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Item
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newItem = new Item({ title, description, user: req.user.id });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Item
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Item
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;