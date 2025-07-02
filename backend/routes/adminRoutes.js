const express = require("express");
const path = require("path"); // To serve React files
const router = express.Router();

const {
  generateTimeTableController,
  getResultTimeTableController,
} = require("../controllers/allControllers.js");

const {
  registerAdmin,
  loginAdmin,
  logoutAdmin
} = require("../controllers/adminController.js");

// const { verifyToken, isLoggedIn } = require("../middlewares.cjs");

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
