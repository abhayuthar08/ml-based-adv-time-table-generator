// const express = require('express');
// const { registerAdmin, loginAdmin , createTimetable } = require('../controllers/adminController.js'); // Import controllers
// const { addTeacher , getAllTeachers } = require('../controllers/teacherController.js');  // Adjust path if needed

// const router = express.Router();

// router.post('/add-teacher', addTeacher);
// router.get('/getAllTeachers', getAllTeachers);


// // Routes
// router.post('/register', registerAdmin);
// router.post('/login', loginAdmin);



// router.post('/addTeacher', addTeacher);
// router.get('/getAllTeachers', getAllTeachers);

// // router.post('/create-timetable', createTimetable);

// module.exports = router;

const express = require('express');
const {
  registerTeacher,
  addSubjectsToTeacher,
  addSubject,
  addRoomVenue,
  addCourse , registerAdmin, loginAdmin ,  generateTimetable , getTimetable
} = require('../controllers/allControllers.js'); // Import all controllers
// const { registerAdmin, loginAdmin , createTimetable } = require('../controllers/adminController.js'); // Import controllers


const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Teacher-related routes
router.post('/register-teacher', registerTeacher);
router.post('/add-subjects-to-teacher', addSubjectsToTeacher);

// Subject-related routes
router.post('/add-subject', addSubject);

// Room venue-related routes
router.post('/add-room-venue', addRoomVenue);

// Course-related routes
router.post('/add-course', addCourse);

// Admin-related routes
// router.post('/admin/login', loginAdmin);

router.post('/generate-time-table', generateTimetable);
router.post('/get-time-table' , getTimetable);

module.exports = router;

