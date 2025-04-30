const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path'); // To serve React files

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, './.env') }); // Specify path to .env outside the 'backend' folder

// Import routes for your API
const adminRoutes = require('./routes/adminRoutes.js');
// const teacherRoutes = require('./routes/teacherRoutes.js');
// const mixedRoutes = require('./routes/mixedRoutes.js');

// Initialize the express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,  // Allow cookies to be sent from the frontend
};
app.use(cors(corsOptions));  // Apply CORS settings

// Middleware setup
app.use(bodyParser.json()); // Middleware to parse JSON requests

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;
console.log('Mongo URI:', mongoURI); // Log to ensure the URI is being loaded correctly

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Serve React static files only in production mode
if (process.env.NODE_ENV === 'production') {
  // In production mode, serve the build directory from React
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // For any request that doesn't match an API route, serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
} else {
  // In development, Vite handles serving the React app, so we don't serve it here
  // Just send a simple message if someone accesses the root endpoint
  app.get('*', (req, res) => {
    res.send('React app is not available in development mode. Please run `npm run build` first.');
  });
}

// Import and use API routes for admin, teacher, etc.
app.use('/', adminRoutes); // Make sure '/api' matches the route structure

// Example route for the homepage (can be customized)
app.get('/api', (req, res) => {
  res.send('Welcome to the SchedulifyX API - Timetable Generator');
});

// Port setup
const FINAL = process.env.PORT || 5000;

// Start the server
app.listen(FINAL, () => {
  console.log(`Server running on port ${FINAL}`);
});
