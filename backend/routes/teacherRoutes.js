const express = require('express');
const router = express.Router();
const { 
  generateTeacherTimetableController,
  getTeacherTimetableController,
  getAllTeachersController
} = require('../controllers/teacherTimetableController'); // Adjust path as needed

// ======================
// TEACHER TIMETABLE ROUTES
// ======================

/**
 * POST /api/teacher-timetable/generate
 * Generate teacher timetables from existing main timetable
 * Body: { timetableId: string, teacherName?: string }
 */
router.post('/generate', generateTeacherTimetableController);

/**
 * GET /api/teacher-timetable/:timetableId/teacher/:teacherName
 * Get specific teacher's timetable
 */
router.get('/:timetableId/teacher/:teacherName', getTeacherTimetableController);

/**
 * GET /api/teacher-timetable/:timetableId/teachers
 * Get list of all teachers in a timetable
 */
router.get('/:timetableId/teachers', getAllTeachersController);

/**
 * GET /api/teacher-timetable/:timetableId/all
 * Get all teacher timetables for a specific main timetable
 */
router.get('/:timetableId/all', async (req, res) => {
  try {
    // Reuse the generate controller without teacherName to get all teachers
    req.body = { timetableId: req.params.timetableId };
    await generateTeacherTimetableController(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;