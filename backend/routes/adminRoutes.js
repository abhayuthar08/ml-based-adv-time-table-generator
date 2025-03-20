// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// const express = require("express");
// const path = require("path"); // To serve React files

// // Import Controllers (Ensure paths are correct)
// const {
//   // registerAdmin,
//   // loginAdmin,
//   // addSubject,
//   // addRoomVenue,
//   generateTimeTableController,
//   getResultTimeTableController,
// } = require("../controllers/allControllers.js"); // Ensure this file exports all functions correctly

// const {registerAdmin,
//   loginAdmin,logoutAdmin,addSubject,addRoomVenue,searchTimetableController
//   } = require("../controllers/adminController.js"); // Ensure this file exports all functions correctly

// const router = express.Router();

// // ✅ Admin Authentication Routes
// router.post("/register", async (req, res) => {
//   try {
//     await registerAdmin(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error during registration." });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     await loginAdmin(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error during login." });
//   }
// });

// router.post("/logout", async (req, res) => {
//   try {
//     await logoutAdmin(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error during login." });
//   }
// });
// // ✅ Subject Management
// router.post("/add-subject", async (req, res) => {
//   try {
//     await addSubject(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while adding subject." });
//   }
// });

// router.get("/search-timetable", async (req, res) => {
//   try {
//     await searchTimetableController(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while searching timetable." });
//   }
// });

// export default router;

// // ✅ Room Management
// router.post("/add-room-venue", async (req, res) => {
//   try {
//     await addRoomVenue(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while adding room." });
//   }
// });

// // ✅ Timetable Routes
// router.post("/generate-time-table", async (req, res) => {
//   try {
//     await generateTimeTableController(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while generating timetable." });
//   }
// });



// router.get("/result-time-table", async (req, res) => {
//   try {
//     await getResultTimeTableController(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while fetching timetable." });
//   }
// });

// // ✅ Serve React Frontend Based on Environment
// if (process.env.NODE_ENV === "production") {
//   // In production, serve built frontend files
//   const frontendPath = path.join(__dirname, "../frontend/dist");
//   router.use(express.static(frontendPath));

//   router.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// } else {
//   // In development mode, show a message
//   router.get("*", (req, res) => {
//     res.send("React app is running in development mode via Vite.");
//   });
// }


// // export default router;
// // ✅ Export Router
// module.exports = router;


// const express = require("express");
// const path = require("path"); // To serve React files

// // Import Controllers (Ensure paths are correct)
// const {
//   generateTimeTableController,
//   getResultTimeTableController,
// } = require("../controllers/allControllers.js"); // Ensure this file exports all functions correctly

// const {
//   registerAdmin,
//   loginAdmin,
//   logoutAdmin,
//   addSubject,
//   addRoomVenue,
//   searchTimetableController,
// } = require("../controllers/adminController.js"); // Ensure this file exports all functions correctly

// const router = express.Router();

// // ✅ Admin Authentication Routes
// router.post("/register", async (req, res) => {
//   try {
//     await registerAdmin(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error during registration." });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     await loginAdmin(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error during login." });
//   }
// });

// router.post("/logout", async (req, res) => {
//   try {
//     await logoutAdmin(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error during login." });
//   }
// });

// // ✅ Subject Management
// router.post("/add-subject", async (req, res) => {
//   try {
//     await addSubject(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while adding subject." });
//   }
// });

// router.get("/search-timetable", async (req, res) => {
//   try {
//     await searchTimetableController(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while searching timetable." });
//   }
// });

// // ✅ Room Management
// router.post("/add-room-venue", async (req, res) => {
//   try {
//     await addRoomVenue(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while adding room." });
//   }
// });

// // ✅ Timetable Routes
// router.post("/generate-time-table", async (req, res) => {
//   try {
//     await generateTimeTableController(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while generating timetable." });
//   }
// });

// router.get("/result-time-table", async (req, res) => {
//   try {
//     await getResultTimeTableController(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error while fetching timetable." });
//   }
// });

// // ✅ Serve React Frontend Based on Environment
// if (process.env.NODE_ENV === "production") {
//   // In production, serve built frontend files
//   const frontendPath = path.join(__dirname, "../frontend/dist");
//   router.use(express.static(frontendPath));

//   router.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// } else {
//   // In development mode, show a message
//   router.get("*", (req, res) => {
//     res.send("React app is running in development mode via Vite.");
//   });
// }

// // ✅ Export Router
// module.exports = router;


























const express = require("express");
const path = require("path"); // To serve React files
const router = express.Router();

// ✅ Import Controllers
const {
  generateTimeTableController,
  getResultTimeTableController,
} = require("../controllers/allControllers.js");

const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  addSubject,
  addRoomVenue,
  searchTimetableController,
} = require("../controllers/adminController.js");

// ✅ Helper Function to Handle Async Errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error(`❌ Error in ${req.originalUrl}:`, error);
    res.status(500).json({ error: "❌ Internal Server Error." });
  });
};

// ✅ Admin Authentication Routes
router.post("/register", asyncHandler(registerAdmin));
router.post("/login", asyncHandler(loginAdmin));
router.post("/logout", asyncHandler(logoutAdmin));

// ✅ Subject Management
router.post("/add-subject", asyncHandler(addSubject));
router.get("/search-timetable", asyncHandler(searchTimetableController));

// ✅ Room Management
router.post("/add-room-venue", asyncHandler(addRoomVenue));

// ✅ Timetable Routes
router.post("/generate-time-table", asyncHandler(generateTimeTableController));
router.get("/result-time-table", asyncHandler(getResultTimeTableController));

// ✅ Serve React Frontend Based on Environment
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend/dist");

  router.use(express.static(frontendPath));

  router.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  router.get("*", (req, res) => {
    res.status(200).send("⚡ React app running in development mode via Vite.");
  });
}

// ✅ Export Router
module.exports = router;
