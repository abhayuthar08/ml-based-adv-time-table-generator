// // // // Importing necessary modules
// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cors = require('cors');
// // // const bodyParser = require('body-parser');
// // // const dotenv = require('dotenv');
// // // const path = require('path'); // To serve static React files

// // // // Import routes for your API
// // // const adminRoutes = require('./routes/adminRoutes.js');
// // // const teacherRoutes = require('./routes/teacherRoutes.js');
// // // const mixedRoutes = require('./routes/mixedRoutes.js');

// // // // Load environment variables from .env file
// // // dotenv.config();

// // // // Initialize the express application
// // // const app = express();

// // // // Middleware setup
// // // app.use(cors()); // Enabling CORS for all routes (configure later for security)
// // // app.use(bodyParser.json());

// // // // MongoDB connection setup
// // // const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/schedulifyX'; // Default to local DB if not set in .env
// // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// // //   .then(() => {
// // //     console.log('MongoDB connected successfully!');
// // //   })
// // //   .catch((err) => {
// // //     console.error('Error connecting to MongoDB:', err);
// // //   });

// // // // Serve React static files
// // // if (process.env.NODE_ENV === 'production') {
// // //   // In production mode, serve the build directory from React
// // //   app.use(express.static(path.join(__dirname, 'frontend/build')));

// // //   // For any request that doesn't match an API route, serve the React app
// // //   app.get('*', (req, res) => {
// // //     res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// // //   });
// // // } else {
// // //   // In development, Vite handles serving the React app, so we don't serve it here
// // //   // Just send a simple message if someone accesses the root endpoint
// // //   app.get('*', (req, res) => {
// // //     res.send('React app is not available in development mode. Please run `npm run build` first.');
// // //   });
// // // }

// // // // Import and use API routes for admin, teacher, etc.
// // // app.use('/', adminRoutes);
// // // // app.use('/api/teacher', teacherRoutes);
// // // // app.use('/api/mixed', mixedRoutes);

// // // // Example route for the homepage (can be customized)
// // // app.get('/', (req, res) => {
// // //   res.send('Welcome to the SchedulifyX API - Timetable Generator');
// // // });

// // // // Port setup
// // // const PORT = process.env.PORT || 5000;

// // // // Start the server
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });
// // // ``

// // // Importing necessary modules
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const dotenv = require('dotenv');
// // const path = require('path'); // To serve static React files

// // // Import routes for your API
// // const adminRoutes = require('./routes/adminRoutes.js');
// // const teacherRoutes = require('./routes/teacherRoutes.js');
// // const mixedRoutes = require('./routes/mixedRoutes.js');

// // // Load environment variables from .env file
// // dotenv.config();

// // // Initialize the express application
// // const app = express();

// // // Middleware setup
// // app.use(cors()); // Enabling CORS for all routes (configure later for security)
// // app.use(bodyParser.json());

// // // MongoDB connection setup
// // const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/schedulifyX'; // Default to local DB if not set in .env
// // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => {
// //     console.log('MongoDB connected successfully!');
// //   })
// //   .catch((err) => {
// //     console.error('Error connecting to MongoDB:', err);
// //   });

// // // Serve React static files in production mode
// // if (process.env.NODE_ENV === 'production') {
// //   // In production mode, serve the build directory from React
// //   app.use(express.static(path.join(__dirname, 'frontend/build')));

// //   // For any request that doesn't match an API route, serve the React app
// //   app.get('*', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// //   });
// // } else {
// //   // In development, Vite handles serving the React app, so we don't serve it here
// //   // Just send a simple message if someone accesses the root endpoint
// //   app.get('*', (req, res) => {
// //     res.send('React app is not available in development mode. Please run `npm run build` first.');
// //   });
// // }

// // // Import and use API routes for admin, teacher, etc.
// // app.use('/', adminRoutes);
// // // app.use('/api/teacher', teacherRoutes);
// // // app.use('/api/mixed', mixedRoutes);

// // // Example route for the homepage (can be customized)
// // app.get('/', (req, res) => {
// //   res.send('Welcome to the SchedulifyX API - Timetable Generator');
// // });

// // // Port setup
// // const PORT = process.env.PORT || 5000;

// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });


// // Importing necessary modules
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const path = require('path'); // To serve React files

// // Import routes for your API
// const adminRoutes = require('./routes/adminRoutes.js');
// const teacherRoutes = require('./routes/teacherRoutes.js');
// const mixedRoutes = require('./routes/mixedRoutes.js');

// // Load environment variables from .env file
// dotenv.config();

// // Initialize the express application
// const app = express();

// // Middleware setup
// app.use(cors()); // Enabling CORS for all routes (configure later for security)
// app.use(bodyParser.json());

// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend URL
//   credentials: true,
// }

// // MongoDB connection setup
// const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/schedulifyX'; // Default to local DB if not set in .env
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected successfully!');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// // Serve React static files only in production mode
// if (process.env.NODE_ENV === 'production') {
//   // In production mode, serve the build directory from React
//   app.use(express.static(path.join(__dirname, 'frontend/build')));

//   // For any request that doesn't match an API route, serve the React app
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
//   });
// } else {
//   // In development, Vite handles serving the React app, so we don't serve it here
//   // Just send a simple message if someone accesses the root endpoint
//   app.get('*', (req, res) => {
//     res.send('React app is not available in development mode. Please run `npm run build` first.');
//   });
// }

// // Import and use API routes for admin, teacher, etc.
// app.use('/', adminRoutes);


// // Example route for the homepage (can be customized)
// app.get('/api', (req, res) => {
//   res.send('Welcome to the SchedulifyX API - Timetable Generator');
// });

// // Port setup
// const PORT = process.env.PORT || 5000;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// Importing necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path'); // To serve React files

// Import routes for your API
const adminRoutes = require('./routes/adminRoutes.js');
const teacherRoutes = require('./routes/teacherRoutes.js');
const mixedRoutes = require('./routes/mixedRoutes.js');

// Load environment variables from .env file
dotenv.config();


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
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/schedulifyX'; // Default to local DB if not set in .env
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
