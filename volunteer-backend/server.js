// Bring in the tools we installed
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create our app
const app = express();
// Allow apps to send JSON data to us
app.use(express.json());

// Allow web/mobile apps to connect
app.use(cors());

// Test route - check if server is working
app.get('/', (req, res) => {
  res.json({ message: 'Volunteer API is running!' });
});


// Import routes
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/api/auth', authRoutes);



// Database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '0a05dZ4vUP8EbSSf';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
  });
