// // // const express = require('express');
// // // const path = require('path'); // To serve React files

// // // // Controller imports (for admin-related actions)
// // // const {
// // //   registerAdmin,
// // //   loginAdmin,
// // //   addSubject,
// // //   addRoomVenue,
// // //   generateTimeTableController,
// // // } = require('../controllers/allControllers.js'); // Import all controllers

// // // const router = express.Router();

// // // // Admin authentication routes
// // // router.post('/register', registerAdmin); // Register an admin
// // // router.post('/login', loginAdmin); // Login for admin

// // // // Subject-related routes
// // // router.post('/add-subject', addSubject); // Add a new subject

// // // // Room venue-related routes
// // // router.post('/add-room-venue', addRoomVenue); // Add a new room venue

// // // // Timetable-related routes
// // // router.post('/generate-time-table', generateTimeTableController); // Generate timetable

// // // // Serve React homepage only in production
// // // if (process.env.NODE_ENV === 'production') {
// // //   // Serve the build directory of React app when in production
// // //   router.get('/home', (req, res) => {
// // //     // Make sure the path is correct depending on your project structure
// // //     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// // //   });
// // // } else {
// // //   // In development mode, we don't need to serve React files via Express (handled by Vite)
// // //   router.get('/home', (req, res) => {
// // //     res.send('React app is running in development mode via Vite.');
// // //   });
// // // }

// // // module.exports = router; // Make sure this is correctly exporting the router
// // const express = require('express');
// // const path = require('path'); // To serve React files

// // // Controller imports (for admin-related actions)
// // const {
// //   registerAdmin,
// //   loginAdmin,
// //   addSubject,
// //   addRoomVenue,
// //   generateTimeTableController,
// // } = require('../controllers/allControllers.js'); // Import all controllers

// // const router = express.Router();

// // // Admin authentication routes
// // router.post('/register', registerAdmin); // Register an admin
// // router.post('/login', loginAdmin); // Login for admin

// // // Subject-related routes
// // router.post('/add-subject', addSubject); // Add a new subject

// // // Room venue-related routes
// // router.post('/add-room-venue', addRoomVenue); // Add a new room venue

// // // Timetable-related routes
// // router.post('/generate-time-table', generateTimeTableController); // Generate timetable

// // // Serve React homepage only in production
// // if (process.env.NODE_ENV === 'production') {
// //   // Serve the build directory of React app when in production
// //   router.get('/home', (req, res) => {
// //     // Make sure the path is correct depending on your project structure
// //     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// //   });
// // } else {
// //   // In development mode, we don't need to serve React files via Express (handled by Vite)
// //   router.get('/home', (req, res) => {
// //     res.send('React app is running in development mode via Vite.');
// //   });
// // }

// // module.exports = router; // Make sure this is correctly exporting the router


// const express = require('express');
// const path = require('path'); // To serve React files

// // Controller imports (for admin-related actions)
// const {
//   registerAdmin,
//   loginAdmin,
//   addSubject,
//   addRoomVenue,
//   generateTimeTableController,
// } = require('../controllers/allControllers.js'); // Import all controllers

// const router = express.Router();

// // Admin authentication routes
// router.post('/register', registerAdmin); // Register an admin
// router.post('/login', loginAdmin); // Login for admin

// // Subject-related routes
// router.post('/add-subject', addSubject); // Add a new subject

// // Room venue-related routes
// router.post('/add-room-venue', addRoomVenue); // Add a new room venue

// // Timetable-related routes
// router.post('/generate-time-table', generateTimeTableController); // Generate timetable

// // Serve React homepage only in production
// if (process.env.NODE_ENV === 'production') {
//   // Serve the build directory of React app when in production
//   router.get('/api', (req, res) => {
//     // Make sure the path is correct depending on your project structure
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
//   });
// } else {
//   // In development mode, we don't need to serve React files via Express (handled by Vite)
//   router.get('/hapi', (req, res) => {
//     res.send('React app is running in development mode via Vite.');
//   });
// }

// // In your Express route (e.g., app.js or adminRoutes.js)
// // app.get('/api', (req, res) => {
// //   res.json({ message: 'Hello from the backend!' });
// // });


// // module.exports = router; // Make sure this is correctly exporting the router
// const express = require('express');
// const path = require('path'); // To serve React files

// // Controller imports (for admin-related actions)
// const {
//   registerAdmin,
//   loginAdmin,
//   addSubject,
//   addRoomVenue,
//   generateTimeTableController,
// } = require('../controllers/allControllers.js'); // Import all controllers

// const router = express.Router();

// // Admin authentication routes
// router.post('/register', registerAdmin); // Register an admin
// router.post('/login', loginAdmin); // Login for admin

// // Subject-related routes
// router.post('/add-subject', addSubject); // Add a new subject

// // Room venue-related routes
// router.post('/add-room-venue', addRoomVenue); // Add a new room venue

// // Timetable-related routes
// router.post('/generate-time-table', generateTimeTableController); // Generate timetable

// // Serve React homepage only in production
// if (process.env.NODE_ENV === 'production') {
//   // Serve the build directory of React app when in production
//   router.get('/home', (req, res) => {
//     // Make sure the path is correct depending on your project structure
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
//   });
// } else {
//   // In development mode, we don't need to serve React files via Express (handled by Vite)
//   router.get('/home', (req, res) => {
//     res.send('React app is running in development mode via Vite.');
//   });
// }

// module.exports = router; // Make sure this is correctly exporting the router




// const express = require('express');
// const path = require('path'); // To serve React files

// // Controller imports (for admin-related actions)
// const {
//   registerAdmin,
//   loginAdmin,
//   addSubject,
//   addRoomVenue,
//   generateTimeTableController,getResultTimeTableController
// } = require('../controllers/allControllers.js'); // Import all controllers

// const router = express.Router();

// // Admin authentication routes
// router.post('/register', registerAdmin); // Register an admin
// router.post('/login', loginAdmin); // Login for admin

// // Subject-related routes
// router.post('/add-subject', addSubject); // Add a new subject

// // Room venue-related routes
// router.post('/add-room-venue', addRoomVenue); // Add a new room venue

// // Timetable-related routes
// router.post('/generate-time-table', generateTimeTableController); // Generate timetable

// router.post('/result-time-table', getResultTimeTableController); // Generate timetable


// // Serve React homepage based on the environment
// if (process.env.NODE_ENV === 'production') {
//   // In production, serve static files from the build folder
//   router.use(express.static(path.join(__dirname, '../frontend/dist'))); // Vite outputs the production build to 'dist'

//   router.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
//   });
// } else {
//   // In development mode, Vite handles serving files via its own dev server
//   router.get('/home', (req, res) => {
//     res.send('React app is running in development mode via Vite.');
//   });
// }

// module.exports = router; // Export the router


const express = require("express");
const path = require("path"); // To serve React files

// Import Controllers (Ensure paths are correct)
const {
  // registerAdmin,
  // loginAdmin,
  // addSubject,
  // addRoomVenue,
  generateTimeTableController,
  getResultTimeTableController,
} = require("../controllers/allControllers.js"); // Ensure this file exports all functions correctly

const {registerAdmin,
  loginAdmin,
  } = require("../controllers/adminController.js"); // Ensure this file exports all functions correctly

const router = express.Router();

// ✅ Admin Authentication Routes
router.post("/register", async (req, res) => {
  try {
    await registerAdmin(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error during registration." });
  }
});

router.post("/login", async (req, res) => {
  try {
    await loginAdmin(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error during login." });
  }
});

// ✅ Subject Management
router.post("/add-subject", async (req, res) => {
  try {
    await addSubject(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while adding subject." });
  }
});

// ✅ Room Management
router.post("/add-room-venue", async (req, res) => {
  try {
    await addRoomVenue(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while adding room." });
  }
});

// ✅ Timetable Routes
router.post("/generate-time-table", async (req, res) => {
  try {
    await generateTimeTableController(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while generating timetable." });
  }
});

router.get("/result-time-table", async (req, res) => {
  try {
    await getResultTimeTableController(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while fetching timetable." });
  }
});

// ✅ Serve React Frontend Based on Environment
if (process.env.NODE_ENV === "production") {
  // In production, serve built frontend files
  const frontendPath = path.join(__dirname, "../frontend/dist");
  router.use(express.static(frontendPath));

  router.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // In development mode, show a message
  router.get("*", (req, res) => {
    res.send("React app is running in development mode via Vite.");
  });
}

// ✅ Export Router
module.exports = router;
