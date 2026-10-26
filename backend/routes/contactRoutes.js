const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    
    res.status(201).json({ success: true, message: 'Saved to Database!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;