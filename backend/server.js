const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exitCode = 1;
  });