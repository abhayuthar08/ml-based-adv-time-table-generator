const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  registerTeacher,
  addSubjectsToTeacher,
  addSubject,
  addRoomVenue,
  addCourse,
  generateTimetable,
  getTimeTable
} = require('../controllers/allControllers.js'); // Import all controllers

const router = express.Router();

// Admin authentication routes
router.post('/register', registerAdmin); // Register an admin
router.post('/login', loginAdmin); // Login for admin

// Teacher-related routes
router.post('/register-teacher', registerTeacher); // Register a teacher
router.post('/add-subjects-to-teacher', addSubjectsToTeacher); // Add subjects to a teacher

// Subject-related routes
router.post('/add-subject', addSubject); // Add a new subject

// Room venue-related routes
router.post('/add-room-venue', addRoomVenue); // Add a new room venue

// Course-related routes
router.post('/add-course', addCourse); // Add a new course

// Timetable-related routes
router.post('/generate-time-table', generateTimetable); // Generate timetable
router.post('/get-time-table', getTimeTable); // Fetch generated timetable

module.exports = router;
