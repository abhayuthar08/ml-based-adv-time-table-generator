// const bcrypt = require('bcryptjs'); // Import bcrypt
// const jwt = require('jsonwebtoken'); // Import jsonwebtoken
// const Admin = require('../models/admin.model.js'); // Import Admin model

// // Secret key for JWT (should be stored in environment variables)
// const JWT_SECRET = process.env.JWT_SECRET || 'ahbf';

// // Register a new admin
// const registerAdmin = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // Check if the email is already registered
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Email is already registered' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
//     const admin = new Admin({ name, email, password: hashedPassword });

//     // Save the admin to the database
//     await admin.save();
//     res.status(201).json({ message: 'Admin registered successfully', admin });
//   } catch (error) {
//     res.status(400).json({ message: 'Error registering admin', error });
//   }
// };

// // Admin login
// const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find the admin by email
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Compare the provided password with the hashed password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
//       expiresIn: '1h', // Token expires in 1 hour
//     });

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       admin: { id: admin._id, name: admin.name, email: admin.email }, // Avoid sending password
//     });
//   } catch (error) {
//     res.status(400).json({ message: 'Error logging in', error });
//   }
// };

// module.exports = {
//   registerAdmin,
//   loginAdmin,
// };

// // ---------------------------------------------

// // Import Teacher, Subject, and Timetable models


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require('../models/admin.model.js');
const Teacher = require('../models/teacher.model.js');
const Subject = require('../models/subject.model.js');
const Timetable = require('../models/timetable.model.js');

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';

// ** Register a new admin **
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log("Registering Admin:", { name, email }); // Debug log

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    console.error("Error in registerAdmin:", error); // Log error
    res.status(500).json({ message: 'Error registering admin', error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Logging in Admin:", email); // Debug log

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    console.error("Error in loginAdmin:", error); // Log error
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


// ** Get all teachers **
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ message: 'Teachers retrieved successfully', teachers });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ** Get all subjects **
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({ message: 'Subjects retrieved successfully', subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ** Get Timetable **
const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find();
    res.status(200).json({ message: 'Timetable retrieved successfully', timetable });
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getTeachers,
  getSubjects,
  getTimetable,
};
