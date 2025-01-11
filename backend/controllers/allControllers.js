// const bcrypt = require('bcryptjs'); // For password hashing
// const jwt = require('jsonwebtoken'); // For generating JWT tokens
// const Teacher = require('../models/teacher.model.js'); // Teacher model
// const Subject = require('../models/subject.model.js'); // Subject model
// const Room = require('../models/room.model.js'); // Room model
// const Course = require('../models/course.model.js'); 
// // Course model
// const Timetable = require('../models/timetable.model'); // Model for saving timetables
// // const bcrypt = require('bcryptjs'); // Import bcrypt
// // const jwt = require('jsonwebtoken'); // Import jsonwebtoken
// const Admin = require('../models/admin.model.js'); // Import Admin model

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Helper function to generate a subject code (you can adjust this as needed)
// const generateSubjectCode = () => {
//   return Math.random().toString(36).substr(2, 9).toUpperCase(); // Random code generation
// };

// // Register a new teacher with multiple subjects
// const registerTeacher = async (req, res) => {
//   const { name, email, password, subjects, contactNumber } = req.body;

//   try {
//     // Check if the email is already registered
//     const existingTeacher = await Teacher.findOne({ email });
//     if (existingTeacher) {
//       return res.status(400).json({ message: 'Email is already registered' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Process the subjects - either find or create them
//     const subjectIds = [];
//     for (let subjectName of subjects) {
//       let subject = await Subject.findOne({ name: subjectName });
//       if (!subject) {
//         subject = new Subject({ name: subjectName, code: generateSubjectCode() });
//         await subject.save();
//       }
//       subjectIds.push(subject._id);
//     }

//     // Create and save the teacher
//     const teacher = new Teacher({
//       name,
//       email,
//       password: hashedPassword, // Store the hashed password
//       subjects: subjectIds,
//       contactNumber,
//     });

//     await teacher.save();
//     res.status(201).json({ message: 'Teacher registered successfully', teacher });
//   } catch (error) {
//     console.error('Error registering teacher:', error);
//     res.status(500).json({ message: 'Error registering teacher', error });
//   }
// };

// // Add subjects to an existing teacher
// const addSubjectsToTeacher = async (req, res) => {
//   const { teacherId, subjects } = req.body;

//   try {
//     // Find the teacher by ID
//     const teacher = await Teacher.findById(teacherId);
//     if (!teacher) {
//       return res.status(404).json({ message: 'Teacher not found' });
//     }

//     // Validate and convert subject names to IDs
//     const subjectRecords = await Subject.find({ name: { $in: subjects } }).select('_id name');
//     if (subjectRecords.length !== subjects.length) {
//       return res.status(400).json({ message: 'One or more subject names are invalid' });
//     }

//     // Add the new subjects to the teacher's subjects array
//     teacher.subjects.push(...subjectRecords.map(subject => subject._id));
//     await teacher.save();

//     res.status(200).json({ message: 'Subjects added successfully', teacher });
//   } catch (error) {
//     console.error('Error adding subjects to teacher:', error);
//     res.status(500).json({ message: 'Error adding subjects to teacher', error });
//   }
// };

// // Add a new subject
// const addSubject = async (req, res) => {
//   const { name } = req.body;

//   try {
//     // Check if subject already exists
//     const existingSubject = await Subject.findOne({ name });
//     if (existingSubject) {
//       return res.status(400).json({ message: 'Subject already exists' });
//     }

//     // Create a new subject
//     const subject = new Subject({ name, code: generateSubjectCode() });
//     await subject.save();

//     res.status(201).json({ message: 'Subject added successfully', subject });
//   } catch (error) {
//     console.error('Error adding subject:', error);
//     res.status(500).json({ message: 'Error adding subject', error });
//   }
// };

// // Add a new room venue
// const addRoomVenue = async (req, res) => {
//   const { name, capacity } = req.body;

//   try {
//     const room = new Room({ name, capacity });
//     await room.save();

//     res.status(201).json({ message: 'Room venue added successfully', room });
//   } catch (error) {
//     console.error('Error adding room venue:', error);
//     res.status(500).json({ message: 'Error adding room venue', error });
//   }
// };

// // Add a new course
// const addCourse = async (req, res) => {
//     const { name, courseCode, description, teachers, subjects } = req.body;
  
//     try {
//       // Validate courseCode uniqueness
//       const existingCourse = await Course.findOne({ courseCode });
//       if (existingCourse) {
//         return res.status(400).json({ message: 'Course code already exists' });
//       }
  
//       // Validate teachers if provided
//       if (teachers && teachers.length > 0) {
//         const validTeachers = await Teacher.find({ _id: { $in: teachers } });
//         if (validTeachers.length !== teachers.length) {
//           return res.status(400).json({ message: 'Invalid teacher(s) provided' });
//         }
//       }
  
//       // Validate subjects if provided
//       if (subjects && subjects.length > 0) {
//         const validSubjects = await Subject.find({ _id: { $in: subjects } });
//         if (validSubjects.length !== subjects.length) {
//           return res.status(400).json({ message: 'Invalid subject(s) provided' });
//         }
//       }
  
//       // Create a new course
//       const course = new Course({
//         name,
//         courseCode,
//         description,
//         teachers,
//         subjects,
//       });
  
//       await course.save();
  
//       res.status(201).json({ message: 'Course added successfully', course });
//     } catch (error) {
//       console.error('Error adding course:', error);
//       res.status(500).json({ message: 'Error adding course', error });
//     }
//   };



// // const JWT_SECRET = process.env.JWT_SECRET || 'ahbf';

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








// // -------------

// // const Timetable = require('../models/timetable.model'); // Timetable model
// // const Teacher = require('../models/teacher.model'); // Teacher model

// // Generate Timetable
// const generateTimetable = async (req, res) => {
//   const {
//     collegeName,
//     branchName,
//     classes,
//     workingDays,
//     subjects,
//     classTimes,
//     classDuration,
//     breaksDuration,
//     totalClassesPerDay,
//   } = req.body;

//   try {
//     // Validation
//     if (!collegeName || !branchName || !classes.length || !workingDays.length || !subjects.length) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Map subjects and teachers
//     const subjectTeacherMap = {};
//     subjects.forEach((item) => {
//       if (!subjectTeacherMap[item.subjectName]) {
//         subjectTeacherMap[item.subjectName] = [];
//       }
//       subjectTeacherMap[item.subjectName].push(item.teacherName);
//     });

//     // Generate Timetable
//     const timetable = [];
//     for (const day of workingDays) {
//       const daySchedule = { day, classes: [] };

//       classes.forEach((className) => {
//         const classSchedule = { className, slots: [] };

//         for (let slot = 0; slot < totalClassesPerDay; slot++) {
//           const subjectIndex = slot % subjects.length;
//           const teacherIndex =
//             slot % subjectTeacherMap[subjects[subjectIndex].subjectName].length;

//           const subject = subjects[subjectIndex].subjectName;
//           const teacher = subjectTeacherMap[subject][teacherIndex];

//           classSchedule.slots.push({
//             time: classTimes[slot % classTimes.length],
//             subject,
//             teacher,
//           });
//         }

//         daySchedule.classes.push(classSchedule);
//       });

//       timetable.push(daySchedule);
//     }

//     // Save Timetable to Database
//     const newTimetable = new Timetable({
//       collegeName,
//       branchName,
//       classes,
//       workingDays,
//       subjects,
//       classTimes,
//       classDuration,
//       breaksDuration,
//       totalClassesPerDay,
//       timetable,
//     });

//     await newTimetable.save();

//     res.status(201).json({
//       message: 'Timetable generated successfully',
//       timetable: newTimetable,
//     });
//   } catch (error) {
//     console.error('Error generating timetable:', error);
//     res.status(500).json({ message: 'Error generating timetable', error });
//   }
// };

// // Get Timetable
// const getTimetable = async (req, res) => {
//   try {
//     const { branchName, collegeName } = req.query;

//     const timetable = await Timetable.findOne({ branchName, collegeName }).populate(
//       'teachers',
//       'name email'
//     );

//     if (!timetable) {
//       return res.status(404).json({ message: 'Timetable not found' });
//     }

//     res.status(200).json(timetable);
//   } catch (error) {
//     console.error('Error fetching timetable:', error);
//     res.status(500).json({ message: 'Error fetching timetable', error });
//   }
// };

// // module.exports = { generateTimetable, getTimetable  };
// module.exports = {
//   registerTeacher,
//   addSubjectsToTeacher,
//   addSubject,
//   addRoomVenue,
//   addCourse,
//   loginAdmin,
//   registerAdmin,
//   loginAdmin,
//   generateTimetable,
//   getTimetable
// };

const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const {jsPDF} = require('jspdf'); // For PDF generation
const Teacher = require('../models/teacher.model.js'); // Teacher model
const Subject = require('../models/subject.model.js'); // Subject model
const Room = require('../models/room.model.js'); // Room model
const Course = require('../models/course.model.js'); // Course model
const Timetable = require('../models/timetable.model.js'); // Timetable model
const Admin = require('../models/admin.model.js'); // Admin model

const JWT_SECRET = process.env.JWT_SECRET || 'sbsu';

// Helper function to generate a subject code
const generateSubjectCode = () => Math.random().toString(36).substr(2, 9).toUpperCase();

// Admin Registration
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const admin = new Admin({ name, email, password: hashedPassword });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(400).json({ message: 'Error registering admin', error });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

// Register a Teacher
const registerTeacher = async (req, res) => {
  const { name, email, password, subjects, contactNumber } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const subjectIds = [];
    for (const subjectName of subjects) {
      let subject = await Subject.findOne({ name: subjectName });
      if (!subject) {
        subject = new Subject({ name: subjectName, code: generateSubjectCode() });
        await subject.save();
      }
      subjectIds.push(subject._id);
    }

    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      subjects: subjectIds,
      contactNumber,
    });

    await teacher.save();
    res.status(201).json({ message: 'Teacher registered successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Error registering teacher', error });
  }
};

// Add Subjects to a Teacher
const addSubjectsToTeacher = async (req, res) => {
  const { teacherId, subjects } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const subjectRecords = await Subject.find({ name: { $in: subjects } });
    if (subjectRecords.length !== subjects.length) {
      return res.status(400).json({ message: 'One or more subject names are invalid' });
    }

    teacher.subjects.push(...subjectRecords.map((subject) => subject._id));
    await teacher.save();

    res.status(200).json({ message: 'Subjects added successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Error adding subjects to teacher', error });
  }
};

// Add a New Subject
const addSubject = async (req, res) => {
  const { name } = req.body;

  try {
    const existingSubject = await Subject.findOne({ name });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject already exists' });
    }

    const subject = new Subject({ name, code: generateSubjectCode() });
    await subject.save();

    res.status(201).json({ message: 'Subject added successfully', subject });
  } catch (error) {
    res.status(500).json({ message: 'Error adding subject', error });
  }
};

// Add a New Room Venue
const addRoomVenue = async (req, res) => {
  const { name, capacity } = req.body;

  try {
    const room = new Room({ name, capacity });
    await room.save();

    res.status(201).json({ message: 'Room venue added successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Error adding room venue', error });
  }
};

// Add a New Course
const addCourse = async (req, res) => {
  const { name, courseCode, description, teachers, subjects } = req.body;

  try {
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course code already exists' });
    }

    const course = new Course({
      name,
      courseCode,
      description,
      teachers,
      subjects,
    });

    await course.save();
    res.status(201).json({ message: 'Course added successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
};

// Generate Timetable
const generateTimetable = async (req, res) => {
  const {
    collegeName,
    branchName,
    classes,
    workingDays,
    subjects,
    classTimes,
    classDuration,
    breaksDuration,
    totalClassesPerDay,
  } = req.body;

  try {
    // Validate required fields
    if (
      !collegeName ||
      !branchName ||
      !Array.isArray(classes) ||
      !classes.length ||
      !Array.isArray(workingDays) ||
      !workingDays.length ||
      !Array.isArray(subjects) ||
      !subjects.length ||
      !Array.isArray(classTimes) ||
      classTimes.length === 0 ||
      typeof classDuration !== 'number' ||
      typeof breaksDuration !== 'number' ||
      typeof totalClassesPerDay !== 'number'
    ) {
      return res.status(400).json({ message: 'Invalid or missing input data.' });
    }

    // Build the subject-teacher map
    const subjectTeacherMap = {};
    subjects.forEach((item) => {
      if (!subjectTeacherMap[item.subjectName]) {
        subjectTeacherMap[item.subjectName] = [];
      }
      subjectTeacherMap[item.subjectName].push(item.teacherName);
    });

    // Generate timetable structure
    const timetable = [];
    for (const day of workingDays) {
      const daySchedule = { day, classes: [] };

      classes.forEach((className) => {
        const classSchedule = { className, slots: [] };

        for (let slot = 0; slot < totalClassesPerDay; slot++) {
          const subjectIndex = slot % subjects.length;
          const teacherIndex =
            slot % subjectTeacherMap[subjects[subjectIndex].subjectName].length;

          const subject = subjects[subjectIndex].subjectName;
          const teacher = subjectTeacherMap[subject][teacherIndex];

          classSchedule.slots.push({
            time: classTimes[slot % classTimes.length],
            subject,
            teacher,
          });
        }

        daySchedule.classes.push(classSchedule);
      });

      timetable.push(daySchedule);
    }

    // Log the generated timetable for debugging
    console.log("Generated Timetable:", timetable);

    // Save Timetable to Database with timetable field populated
    const newTimetable = new Timetable({
      collegeName,
      branchName,
      classes,
      workingDays,
      subjects,
      classTimes,
      classDuration,
      breaksDuration,
      totalClassesPerDay,
      timetable, // Ensure timetable is passed correctly
    });

    // Log the newTimetable object to ensure it's correct
    console.log("Timetable object being saved:", newTimetable);
    console.log("Generated Timetable:", JSON.stringify(timetable, null, 2));

    await newTimetable.save();

    // Generate PDF
    const pdfBuffer = generateTimetablePDF({
      branchName: newTimetable.branchName,
      timetable: newTimetable.timetable
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${branchName}_Timetable.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating timetable:', error.stack || error.message || error);
    res.status(500).json({ message: 'Error generating timetable', error: error.message || error });
  }
};

// Helper function to generate PDF for the timetable
const generateTimetablePDF = (timetable) => {
  const doc = new jsPDF();
  doc.setFontSize(10);
  doc.text(`Timetable for ${timetable.branchName}`, 10, 10);

  // Check if timetable.timetable exists and is an array
  if (Array.isArray(timetable.timetable)) {
    let yOffset = 20; // Initial vertical offset for text
    timetable.timetable.forEach((daySchedule, index) => {
      doc.text(`Day: ${daySchedule.day}`, 10, yOffset);
      yOffset += 10;
      
      daySchedule.classes.forEach((classSchedule) => {
        console.log("Class Schedule:", classSchedule); // Log for debugging
        const classText = `${classSchedule.className}: ${classSchedule.slots
          .map((slot) => `${slot.time} - ${slot.subject} (${slot.teacher})`)
          .join(', ')}`;
        
        // Update Y position for each class's timetable slots
        doc.text(classText, 10, yOffset);
        yOffset += 10;
      });
    });
  } else {
    console.error('Invalid timetable structure:', timetable.timetable);
  }

  return doc.output('arraybuffer');
};

// Controller for fetching timetables from the database
const getTimeTable = async (req, res) => {
  const { branchName, collegeName, className } = req.body;

  try {
    // Validate inputs
    if (!branchName || !collegeName) {
      return res.status(400).json({ message: 'Branch name and college name are required.' });
    }

    // Build query based on inputs
    const query = { branchName, collegeName };
    if (className) {
      query['classes'] = className; // Filter by class if provided
    }

    // Add pagination if needed, e.g. with limit and skip
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const timetable = await Timetable.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('teachers', 'name email');

    if (!timetable || timetable.length === 0) {
      return res.status(404).json({ message: 'No timetable found for the provided criteria.' });
    }

    res.status(200).json({
      message: 'Timetable retrieved successfully',
      timetable,
    });
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ message: 'Error fetching timetable', error: error.message || error });
  }
};


module.exports = {
  registerAdmin,
  loginAdmin,
  registerTeacher,
  addSubjectsToTeacher,
  addSubject,
  addRoomVenue,
  addCourse,
  generateTimetable, getTimeTable
};




