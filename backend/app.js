// Importing necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes.js');
const teacherRoutes = require('./routes/teacherRoutes.js');
const mixedRoutes = require('./routes/mixedRoutes.js')

// Load environment variables from .env file
dotenv.config();

// Initialize the express application
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/schedulifyX'; // Default to local DB if not set in .env
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Import routes (you can create separate route files for better organization)
// const timetableRoutes = require('./routes/timetable');
// const userRoutes = require('./routes/user');

// Use routes in the app
// app.use('/api/timetable', timetableRoutes);
// app.use('/api/user', userRoutes);

// Example route for the homepage (can be customized)
app.get('/', (req, res) => {
  res.send('Welcome to the SchedulifyX API - Timetable Generator');
});

app.use('/', adminRoutes);
// app.use('/api/teacher', teacherRoutes);
// app.use('/api/add' , mixedRoutes);

// Port setup
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});