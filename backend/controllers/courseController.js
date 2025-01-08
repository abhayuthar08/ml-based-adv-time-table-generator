const Course = require('../models/course.model');
const Subject = require('../models/subject.model');
const Teacher = require('../models/teacher.model');

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { name, courseCode, description, teachers, subjects } = req.body;

    // Validate subjects and teachers if provided
    const validSubjects = await Subject.find({ _id: { $in: subjects } });
    const validTeachers = await Teacher.find({ _id: { $in: teachers } });

    if (validSubjects.length !== subjects.length || validTeachers.length !== teachers.length) {
      return res.status(400).json({ message: 'Invalid subjects or teachers provided.' });
    }

    const newCourse = new Course({ name, courseCode, description, teachers, subjects });
    await newCourse.save();

    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teachers subjects');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};
