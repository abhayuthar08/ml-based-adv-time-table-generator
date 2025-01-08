const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const Teacher = require('../models/teacher.model.js'); // Teacher model
const Subject = require('../models/subject.model.js'); // Subject model

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Helper function to generate a subject code (you can adjust this as needed)
const generateSubjectCode = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase(); // Random code generation
};

// Register a new teacher with multiple subjects
const registerTeacher = async (req, res) => {
  const { name, email, password, subjects, contactNumber } = req.body;

  try {
    // Check if the email is already registered
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Process the subjects - either find or create them
    const subjectIds = [];
    for (let subjectName of subjects) {
      // Find existing subject or create a new one
      let subject = await Subject.findOne({ name: subjectName });
      if (!subject) {
        // If subject doesn't exist, create a new subject with a generated code
        subject = new Subject({ name: subjectName, code: generateSubjectCode() });
        await subject.save();
      }
      subjectIds.push(subject._id);
    }

    // Create and save the teacher
    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      subjects: subjectIds,
      contactNumber,
    });

    await teacher.save();
    res.status(201).json({ message: 'Teacher registered successfully', teacher });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ message: 'Error registering teacher', error });
  }
};

// Add subjects to an existing teacher
const addSubjectsToTeacher = async (req, res) => {
  const { teacherId, subjects } = req.body; // Expecting an array of subject names

  try {
    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Validate and convert subject names to IDs
    const subjectRecords = await Subject.find({ name: { $in: subjects } }).select('_id name');
    if (subjectRecords.length !== subjects.length) {
      return res.status(400).json({ message: 'One or more subject names are invalid' });
    }

    // Get the subject IDs
    const subjectIds = subjectRecords.map(subject => subject._id);

    // Add the new subjects to the teacher's subjects array
    teacher.subjects.push(...subjectIds);

    // Save the updated teacher document
    await teacher.save();

    res.status(200).json({ message: 'Subjects added successfully', teacher });
  } catch (error) {
    console.error('Error adding subjects to teacher:', error);
    res.status(500).json({ message: 'Error adding subjects to teacher', error });
  }
};

// Teacher login
const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ensure that the email and password are provided in the request
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the teacher by email and populate subjects
    const teacher = await Teacher.findOne({ email }).populate('subjects');
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token if password is correct
    const token = jwt.sign({ id: teacher._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      teacher: { id: teacher._id, name: teacher.name, email: teacher.email, subjects: teacher.subjects },
    });
  } catch (error) {
    console.error('Error logging in teacher:', error);
    res.status(500).json({ message: 'Error logging in teacher', error: error.message });
  }
};

// Get teacher profile (protected route)
const getTeacherProfile = async (req, res) => {
  try {
    // Retrieve the teacher's profile based on the JWT token
    const teacher = await Teacher.findById(req.user.id).populate('subjects schedule');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ teacher });
  } catch (error) {
    console.error('Error fetching teacher profile:', error);
    res.status(500).json({ message: 'Error fetching teacher profile', error });
  }
};



// Add a new teacher
const addTeacher = async (req, res) => {
  try {
    const { name, email, password, contactNumber, subjects } = req.body;

    // Validate subjects if provided
    const validSubjects = await Subject.find({ _id: { $in: subjects } });
    if (validSubjects.length !== subjects.length) {
      return res.status(400).json({ message: 'Invalid subjects provided.' });
    }

    const newTeacher = new Teacher({ name, email, password, contactNumber, subjects });
    await newTeacher.save();

    res.status(201).json({ message: 'Teacher added successfully', teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: 'Error adding teacher', error });
  }
};

// Get all teachers
 const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('subjects');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error });
  }
};

module.exports = {
  registerTeacher,
  addSubjectsToTeacher,
  loginTeacher,
  getTeacherProfile,
  addTeacher,
  getAllTeachers,
 
};
