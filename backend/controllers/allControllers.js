// const bcrypt = require('bcryptjs'); // For password hashing
// const jwt = require('jsonwebtoken'); // For JWT token generation
// const { jsPDF } = require('jspdf'); // For PDF generation
// const Teacher = require('../models/teacher.model.js'); // Teacher model
// const Subject = require('../models/subject.model.js'); // Subject model
// const Room = require('../models/room.model.js'); // Room model
// const Course = require('../models/course.model.js'); // Course model
// const Timetable = require('../models/timetable.model.js'); // Timetable model
// const Admin = require('../models/admin.model.js'); // Admin model
// const Configuration = require('../models/configuration.model.js'); // Configuration model
// const timetableService = require('../services/timetableService.js');
// const mlService = require('../services/mlService.js');

// const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey'; // Secret for JWT tokens

// // Helper function to generate unique subject codes
// const generateSubjectCode = () => Math.random().toString(36).substr(2, 9).toUpperCase();

// /**
//  * Admin Registration
//  */
// const registerAdmin = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Email is already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const admin = new Admin({ name, email, password: hashedPassword });

//     await admin.save();
//     res.status(201).json({ message: 'Admin registered successfully', admin });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering admin', error: error.message });
//   }
// };

// /**
//  * Admin Login
//  */
// const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       admin: { id: admin._id, name: admin.name, email: admin.email },
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// };

// /**
//  * Register a Teacher
//  */
// const registerTeacher = async (req, res) => {
//   const { name, email, password, subjects, contactNumber } = req.body;

//   try {
//     const existingTeacher = await Teacher.findOne({ email });
//     if (existingTeacher) {
//       return res.status(400).json({ message: 'Email is already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const subjectIds = [];
//     for (const subjectName of subjects) {
//       let subject = await Subject.findOne({ name: subjectName });
//       if (!subject) {
//         subject = new Subject({ name: subjectName, code: generateSubjectCode() });
//         await subject.save();
//       }
//       subjectIds.push(subject._id);
//     }

//     const teacher = new Teacher({
//       name,
//       email,
//       password: hashedPassword,
//       subjects: subjectIds,
//       contactNumber,
//     });

//     await teacher.save();
//     res.status(201).json({ message: 'Teacher registered successfully', teacher });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering teacher', error: error.message });
//   }
// };

// /**
//  * Add a Subject
//  */
// const addSubject = async (req, res) => {
//   const { name } = req.body;

//   try {
//     const existingSubject = await Subject.findOne({ name });
//     if (existingSubject) {
//       return res.status(400).json({ message: 'Subject already exists' });
//     }

//     const subject = new Subject({ name, code: generateSubjectCode() });
//     await subject.save();

//     res.status(201).json({ message: 'Subject added successfully', subject });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding subject', error: error.message });
//   }
// };

// /**
//  * Add a Room
//  */
// const addRoomVenue = async (req, res) => {
//   const { name, capacity } = req.body;

//   try {
//     const room = new Room({ name, capacity });
//     await room.save();

//     res.status(201).json({ message: 'Room venue added successfully', room });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding room venue', error: error.message });
//   }
// };

// /**
//  * Save Configuration
//  */
// const saveConfiguration = async (req, res) => {
//   try {
//     const configuration = new Configuration(req.body);
//     await configuration.save();
//     res.status(201).json({ message: 'Configuration saved successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to save configuration', error: error.message });
//   }
// };

// /**
//  * Export Timetable as PDF
//  */
// const exportTimetableAsPDF = async (req, res) => {
//   const { timetableId } = req.params;

//   try {
//     const timetable = await Timetable.findById(timetableId);
//     if (!timetable) {
//       return res.status(404).json({ message: 'Timetable not found' });
//     }

//     const pdf = new jsPDF();
//     pdf.text('Timetable', 20, 20);
//     pdf.text(JSON.stringify(timetable.timetable, null, 2), 10, 30);
//     const pdfBuffer = pdf.output();

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=timetable-${timetableId}.pdf`);
//     res.send(pdfBuffer);
//   } catch (error) {
//     res.status(500).json({ message: 'Error exporting timetable as PDF', error: error.message });
//   }
// };

// /**
//  * Generate Timetable from Services
//  */
// // In your controller (allControllers.js)
// // const generateTimeTableController = async (req, res) => {
// //   try {
// //     // Extracting the input data from the request body
// //     const { collegeName, branchName, workingDays, classTimes, subjects, teachers, rooms, totalClasses } = req.body;

// //     console.log("Request Body:", req.body);

// //     // Validate required fields
// //     if (!collegeName || typeof collegeName !== 'string' || collegeName.trim() === '') {
// //       return res.status(400).json({ error: "College name is missing or invalid" });
// //     }

// //     if (!branchName || typeof branchName !== 'string' || branchName.trim() === '') {
// //       return res.status(400).json({ error: "Branch name is missing or invalid" });
// //     }

// //     if (!workingDays || !Array.isArray(workingDays) || workingDays.length === 0) {
// //       return res.status(400).json({ error: "Working days are missing or invalid" });
// //     }

// //     if (!classTimes || !Array.isArray(classTimes) || classTimes.length === 0) {
// //       return res.status(400).json({ error: "Class times are missing or invalid" });
// //     }

// //     if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
// //       return res.status(400).json({ error: "Subjects data is missing or invalid" });
// //     }

// //     if (!teachers || !Array.isArray(teachers) || teachers.length === 0) {
// //       return res.status(400).json({ error: "Teachers data is missing or invalid" });
// //     }

// //     if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
// //       return res.status(400).json({ error: "Rooms data is missing or invalid" });
// //     }

// //     if (!totalClasses || !Array.isArray(totalClasses) || totalClasses.length === 0) {
// //       return res.status(400).json({ error: "Total classes are missing or invalid" });
// //     }

// //     // Call the service to generate the timetable
// //     const timetable = await timetableService.generateTimeTableFromServices({
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       subjects,
// //       teachers,
// //       rooms,
// //       totalClasses
// //     });

// //     // Return the generated timetable as a response
// //     return res.status(200).json(timetable);
// //   } catch (error) {
// //     console.error("Error generating timetable:", error);
// //     return res.status(500).json({ error: `Error generating timetable: ${error.message}` });
// //   }
// // };
// // const generateTimeTableController = async (req, res) => {
// //   console.log('Request Body:', req.body); // Log the received body

// //   try {
// //     const {
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       subjects,
// //       teachers,
// //       rooms,
// //       totalClasses,
// //     } = req.body;

// //     if (!collegeName) throw new Error('College name is required.');
// //     // Additional validation...

// //     const timetable = await timetableService.generateTimeTableFromServices({
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       subjects,
// //       teachers,
// //       rooms,
// //       totalClasses,
// //     });

// //     return res.status(200).json({ message: 'Timetable generated successfully!', timetable });
// //   } catch (error) {
// //     console.error('Error generating timetable:', error);
// //     return res.status(500).json({ error: error.message });
// //   }
// // };

// // const generateTimeTableController = async (req, res) => {
// //   console.log('Request Body:', req.body); // Log the received body

// //   try {
// //     const {
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       subjects,
// //       teachers,
// //       rooms,
// //       totalClasses,
// //     } = req.body;

// //     if (!collegeName) throw new Error('College name is required.');
// //     if (!branchName) throw new Error('Branch name is required.');

// //     // Generate the timetable using the service (Replace with your actual service)
// //     const timetable = await timetableService.generateTimeTableFromServices({
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       subjects,
// //       teachers,
// //       rooms,
// //       totalClasses,
// //     });

// //     // Temporarily store the generated timetable
// //     // Here, you might store it in a database or session in a production environment
// //     generatedTimetable = timetable; // `generatedTimetable` could be a global variable or in-memory storage

// //     return res.status(200).json({ message: 'Timetable generated successfully!' });
// //   } catch (error) {
// //     console.error('Error generating timetable:', error);
// //     return res.status(500).json({ error: error.message });
// //   }
// // }; //--------------

// const generateTimeTableController = async (req, res) => {
//   console.log('Request Body:', req.body); // Log the received body

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses, // List of classes (e.g., ['CS-I', 'CS-J'])
//       subjects,
//       teachers,
//       rooms,
//       totalClassesPerDay, // Total number of periods per day (e.g., 6 classes per day)
//     } = req.body;

//     // Validate inputs
//     if (!collegeName || !branchName) throw new Error('College name and Branch name are required.');
//     if (!workingDays || !classTimes || !subjects || !teachers || !rooms || !totalClasses) {
//       throw new Error('All input fields are required.');
//     }

//     // Initialize the timetable object for each class
//     const timetable = {};
//     totalClasses.forEach(className => {
//       timetable[className] = {}; // Initialize a timetable for each class
//       workingDays.forEach(day => {
//         timetable[className][day] = []; // Initialize each day with an empty array
//       });
//     });

//     // Utility function to get a random item from a list (useful for random assignment)
//     const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

//     // Conflict check function within the same class
//     const checkConflictInClass = (className, day, timeSlot, teacherName, room) => {
//       const classTimetable = timetable[className][day];
//       return classTimetable.some(item => item.teacher === teacherName && item.time === timeSlot) ||
//              classTimetable.some(item => item.room === room && item.time === timeSlot);
//     };

//     // Conflict check between different classes (CS-I vs CS-J)
//     const checkConflictBetweenClasses = (className, day, timeSlot, teacherName, room) => {
//       const otherClassName = totalClasses.filter(c => c !== className)[0];
//       const otherClassTimetable = timetable[otherClassName][day];
//       return otherClassTimetable.some(item => item.teacher === teacherName && item.time === timeSlot) ||
//              otherClassTimetable.some(item => item.room === room && item.time === timeSlot);
//     };

//     // Function to try assigning a subject, teacher, and room to a time slot
//     const assignSlot = (className, day, timeSlot) => {
//       let subject, teacher, room;
      
//       let attempts = 0;
//       const maxAttempts = 10; // Max attempts to find a valid slot (to prevent infinite loops)

//       // Try to find an optimal assignment with the constraints
//       while (attempts < maxAttempts) {
//         subject = getRandomItem(subjects);
//         teacher = getRandomItem(teachers);
//         room = getRandomItem(rooms);

//         if (
//           !checkConflictInClass(className, day, timeSlot, teacher.name, room) &&
//           !checkConflictBetweenClasses(className, day, timeSlot, teacher.name, room)
//         ) {
//           // If no conflict, assign this slot
//           return { subject, teacher, room };
//         }

//         attempts++;
//       }

//       throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//     };

//     // Function to optimize the timetable (greedy and backtracking)
//     const optimizeTimetable = () => {
//       for (let day of workingDays) {
//         for (let className of totalClasses) {
//           const classTimetable = timetable[className][day]; // Reference to the class timetable for this day

//           for (let i = 0; i < totalClassesPerDay; i++) {
//             const timeSlot = classTimes[i % classTimes.length]; // Cycle through class time slots

//             try {
//               const { subject, teacher, room } = assignSlot(className, day, timeSlot);
              
//               // Assign the slot to the timetable
//               classTimetable.push({
//                 subject,
//                 teacher: teacher.name,
//                 room,
//                 time: timeSlot,
//               });
//             } catch (error) {
//               console.error(error.message);
//               return null; // Return null to indicate failure if assignment failed
//             }
//           }
//         }
//       }
//       return timetable; // Return the successfully generated timetable
//     };

//     const optimizedTimetable = optimizeTimetable();
//     if (!optimizedTimetable) {
//       return res.status(500).json({ error: 'Failed to generate conflict-free timetable.' });
//     }

//     // Temporarily store the generated timetable
//     generatedTimetable = optimizedTimetable;

//     // Return the timetable in the response
//     return res.status(200).json({
//       message: 'Timetable generated successfully!',
//       timetable: optimizedTimetable,
//     });
//   } catch (error) {
//     console.error('Error generating timetable:', error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// const generateOptimizedTimeTableController = async (req, res) => {
//   console.log('Request Body:', req.body); // Log the received body

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses, // List of classes (e.g., ['CS-I', 'CS-J'])
//       subjects,
//       teachers,
//       rooms,
//       totalClassesPerDay, // Total number of periods per day (e.g., 6 classes per day)
//     } = req.body;

//     // Validate inputs
//     if (!collegeName || !branchName) throw new Error('College name and Branch name are required.');
//     if (!workingDays || !classTimes || !subjects || !teachers || !rooms || !totalClasses) {
//       throw new Error('All input fields are required.');
//     }

//     // Initialize the timetable object for each class
//     const timetable = {};
//     totalClasses.forEach(className => {
//       timetable[className] = {}; // Initialize a timetable for each class
//       workingDays.forEach(day => {
//         timetable[className][day] = []; // Initialize each day with an empty array
//       });
//     });

//     // Utility function to get a random item from a list (useful for random assignment)
//     const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

//     // Conflict check function within the same class
//     const checkConflictInClass = (className, day, timeSlot, teacherName, room) => {
//       const classTimetable = timetable[className][day];
//       return classTimetable.some(item => item.teacher === teacherName && item.time === timeSlot) ||
//              classTimetable.some(item => item.room === room && item.time === timeSlot);
//     };

//     // Conflict check between different classes (CS-I vs CS-J)
//     const checkConflictBetweenClasses = (className, day, timeSlot, teacherName, room) => {
//       const otherClassName = totalClasses.filter(c => c !== className)[0];
//       const otherClassTimetable = timetable[otherClassName][day];
//       return otherClassTimetable.some(item => item.teacher === teacherName && item.time === timeSlot) ||
//              otherClassTimetable.some(item => item.room === room && item.time === timeSlot);
//     };

//     // Function to try assigning a subject, teacher, and room to a time slot
//     const assignSlot = (className, day, timeSlot) => {
//       let subject, teacher, room;
      
//       let attempts = 0;
//       const maxAttempts = 10; // Max attempts to find a valid slot (to prevent infinite loops)

//       // Try to find an optimal assignment with the constraints
//       while (attempts < maxAttempts) {
//         subject = getRandomItem(subjects);
//         teacher = getRandomItem(teachers);
//         room = getRandomItem(rooms);

//         if (
//           !checkConflictInClass(className, day, timeSlot, teacher.name, room) &&
//           !checkConflictBetweenClasses(className, day, timeSlot, teacher.name, room)
//         ) {
//           // If no conflict, assign this slot
//           return { subject, teacher, room };
//         }

//         attempts++;
//       }

//       throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//     };

//     // Function to optimize the timetable (greedy and backtracking)
//     const optimizeTimetable = () => {
//       for (let day of workingDays) {
//         for (let className of totalClasses) {
//           const classTimetable = timetable[className][day]; // Reference to the class timetable for this day

//           for (let i = 0; i < totalClassesPerDay; i++) {
//             const timeSlot = classTimes[i % classTimes.length]; // Cycle through class time slots

//             try {
//               const { subject, teacher, room } = assignSlot(className, day, timeSlot);
              
//               // Assign the slot to the timetable
//               classTimetable.push({
//                 subject,
//                 teacher: teacher.name,
//                 room,
//                 time: timeSlot,
//               });
//             } catch (error) {
//               console.error(error.message);
//               return null; // Return null to indicate failure if assignment failed
//             }
//           }
//         }
//       }
//       return timetable; // Return the successfully generated timetable
//     };

//     const optimizedTimetable = optimizeTimetable();
//     if (!optimizedTimetable) {
//       return res.status(500).json({ error: 'Failed to generate conflict-free timetable.' });
//     }

//     // Temporarily store the generated timetable
//     generatedTimetable = optimizedTimetable;

//     // Return the timetable in the response
//     return res.status(200).json({
//       message: 'Timetable generated successfully!',
//       timetable: optimizedTimetable,
//     });
//   } catch (error) {
//     console.error('Error generating timetable:', error);
//     return res.status(500).json({ error: error.message });
//   }
// };



// // const generateTimeTableController = async (req, res) => {
// //   try {
// //     const {
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       totalClasses,
// //       subjects,
// //       teachers,
// //       rooms,
// //       classDuration,
// //       totalClassesPerDay,
// //     } = req.body;

// //     const timetable = await generateTimeTableFromServices({
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       totalClasses,
// //       subjects,
// //       teachers,
// //       rooms,
// //       classDuration,
// //       totalClassesPerDay,
// //     });

// //     if (!timetable) {
// //       return res.status(404).json({ error: 'No timetable generated' });
// //     }

// //     // Return the timetable in the response
// //     res.status(200).json({ message: 'Timetable generated successfully!', timetable });
// //   } catch (error) {
// //     console.error('Error generating timetable:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // };

// // Temporary in-memory store for generated timetable (for demo purposes)
// let generatedTimetable = {};

// // Route to fetch the generated timetable
// const getResultTimeTableController = (req, res) => {
//   if (Object.keys(generatedTimetable).length === 0) {
//     return res.status(404).json({ error: 'Timetable not found. Please generate it first.' });
//   }
//   return res.status(200).json(generatedTimetable);
// };






// /**
//  * Generate Conflict-Free Timetable using ML
//  */
// // const generateConflictFreeTimetable = async (req, res) => {
// //   try {
// //     const inputData = req.body;

// //     // Validate input data
// //     if (!inputData.collegeName || !inputData.branchName || !inputData.workingDays) {
// //       return res.status(400).json({ message: 'Missing required fields in input data' });
// //     }

// //     // Transform data for the ML model
// //     const transformedData = timetableService.transformDataForML(inputData);

// //     // Generate the conflict-free timetable using the ML model
// //     const conflictFreeTimetable = await mlService.generateTimetable(transformedData);

// //     // Save the generated timetable to the database
// //     const newTimetable = new Timetable({
// //       collegeName: inputData.collegeName,
// //       branchName: inputData.branchName,
// //       timetable: conflictFreeTimetable,
// //       subjects: inputData.subjects,
// //       teachers: inputData.teachers,
// //       rooms: inputData.rooms,
// //       classTimes: inputData.classTimes,
// //       workingDays: inputData.workingDays,
// //     });
// //     await newTimetable.save();

// //     res.status(200).json({
// //       message: 'Conflict-free timetable generated successfully',
// //       timetable: conflictFreeTimetable,
// //     });
// //   } catch (error) {
// //     console.error('Error generating conflict-free timetable:', error);
// //     res.status(500).json({
// //       error: 'Failed to generate conflict-free timetable',
// //       message: error.message,
// //     });
// //   }
// // };

// // Example in timetableService.js or a related service
// async function generateConflictFreeTimetable(data) {
//   try {
//     // Assuming `data.workingDays` is an array of days like ["Monday", "Tuesday", ...]
//     const timetable = new Timetable({
//       collegeName: data.collegeName,
//       branchName: data.branchName,
//       classes: data.classes,
//       workingDays: data.workingDays,
//       subjects: data.subjects.map(subject => ({
//         subjectName: subject.name,
//         teacherName: subject.teacher,
//         specialization: subject.specialization || null,
//       })),
//       classTimes: data.classTimes,
//       classDuration: data.classDuration,
//       breaksDuration: data.breaksDuration,
//       totalClassesPerDay: data.totalClassesPerDay,
//       timetable: data.workingDays.map(day => ({
//         day: day,  // Ensure each object has the 'day' field
//         classes: data.classes.map(className => ({
//           className,
//           slots: []  // Add slot logic here
//         })),
//       })),
//     });

//     // Save the timetable to the database
//     await timetable.save();
//     console.log("Timetable generated successfully!");
//   } catch (error) {
//     console.error("Error generating conflict-free timetable:", error);
//     throw error;
//   }
// }

// module.exports = {
//   registerAdmin,
//   loginAdmin,
//   registerTeacher,
//   addSubject,
//   addRoomVenue,
//   generateTimeTableController,
//   getResultTimeTableController,
//   saveConfiguration,
//   exportTimetableAsPDF,
//   generateConflictFreeTimetable,
// };


const Timetable = require('../models/timetable.model');
const timetableService = require('../services/timetableService');
const mlService = require('../services/mlService'); // Assuming you have an ML service
const { validateInputData, transformDataForML } = timetableService;

// Temporary in-memory store for generated timetable (for demo purposes)
let generatedTimetable = {};

// Route to register admin
const registerAdmin = async (req, res) => {
  try {
    // Admin registration logic
  } catch (error) {
    console.error('Error registering admin:', error);
    return res.status(500).json({ error: 'Error registering admin.' });
  }
};

// Route to login admin
const loginAdmin = async (req, res) => {
  try {
    // Admin login logic
  } catch (error) {
    console.error('Error logging in admin:', error);
    return res.status(500).json({ error: 'Error logging in admin.' });
  }
};

// Route to register teacher
const registerTeacher = async (req, res) => {
  try {
    // Teacher registration logic
  } catch (error) {
    console.error('Error registering teacher:', error);
    return res.status(500).json({ error: 'Error registering teacher.' });
  }
};

// Route to add a subject
const addSubject = async (req, res) => {
  try {
    const { name, teacher } = req.body;
    if (!name || !teacher) {
      return res.status(400).json({ error: 'Subject name and teacher are required.' });
    }
    // Add subject logic here
    res.status(200).json({ message: 'Subject added successfully' });
  } catch (error) {
    console.error('Error adding subject:', error);
    return res.status(500).json({ error: 'Error adding subject.' });
  }
};

// Route to add room/venue
const addRoomVenue = async (req, res) => {
  try {
    const { roomName, capacity } = req.body;
    if (!roomName || !capacity) {
      return res.status(400).json({ error: 'Room name and capacity are required.' });
    }
    // Add room venue logic here
    res.status(200).json({ message: 'Room venue added successfully' });
  } catch (error) {
    console.error('Error adding room venue:', error);
    return res.status(500).json({ error: 'Error adding room venue.' });
  }
};

// Generate timetable controller
// const generateTimeTableController = async (req, res) => {
//   console.log('Request Body:', req.body);

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       teachers,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     if (!collegeName || !branchName) throw new Error('College name and Branch name are required.');
//     if (!workingDays || !classTimes || !subjects || !teachers || !rooms || !totalClasses) {
//       throw new Error('All input fields are required.');
//     }

//     const timetable = {};

//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

//     const checkConflictInClass = (className, day, timeSlot, teacherName, room) => {
//       const classTimetable = timetable[className][day];
//       return classTimetable.some(
//         (item) => item.teacher === teacherName && item.time === timeSlot
//       ) || classTimetable.some((item) => item.room === room && item.time === timeSlot);
//     };

//     const checkConflictBetweenClasses = (className, day, timeSlot, teacherName, room) => {
//       const otherClassName = totalClasses.filter((c) => c !== className)[0];
//       const otherClassTimetable = timetable[otherClassName][day];
//       return otherClassTimetable.some(
//         (item) => item.teacher === teacherName && item.time === timeSlot
//       ) || otherClassTimetable.some((item) => item.room === room && item.time === timeSlot);
//     };

//     const assignSlot = (className, day, timeSlot) => {
//       let subject, teacher, room;
//       let attempts = 0;
//       const maxAttempts = 10;

//       while (attempts < maxAttempts) {
//         subject = getRandomItem(subjects);
//         teacher = getRandomItem(teachers);
//         room = getRandomItem(rooms);

//         if (
//           !checkConflictInClass(className, day, timeSlot, teacher.name, room) &&
//           !checkConflictBetweenClasses(className, day, timeSlot, teacher.name, room)
//         ) {
//           return { subject, teacher, room };
//         }

//         attempts++;
//       }

//       throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//     };

//     const optimizeTimetable = () => {
//       for (let day of workingDays) {
//         for (let className of totalClasses) {
//           const classTimetable = timetable[className][day];

//           for (let i = 0; i < totalClassesPerDay; i++) {
//             const timeSlot = classTimes[i % classTimes.length];

//             try {
//               const { subject, teacher, room } = assignSlot(className, day, timeSlot);
//               classTimetable.push({
//                 subject: subject.name, // Add subject name here
//                 teacher: teacher.name,
//                 room,
//                 time: timeSlot,
//               });
//             } catch (error) {
//               console.error(error.message);
//               return null;
//             }
//           }
//         }
//       }
//       return timetable;
//     };

//     const optimizedTimetable = optimizeTimetable();
//     if (!optimizedTimetable) {
//       return res.status(500).json({ error: 'Failed to generate conflict-free timetable.' });
//     }

//     generatedTimetable = optimizedTimetable;

//     return res.status(200).json({
//       message: 'Timetable generated successfully!',
//       timetable: optimizedTimetable,
//     });
//   } catch (error) {
//     console.error('Error generating timetable:', error);
//     return res.status(500).json({ error: error.message });
//   }
// };


// Generate timetable controller
const generateTimeTableController = async (req, res) => {
  console.log('Request Body:', req.body);

  try {
    const {
      collegeName,
      branchName,
      workingDays,
      classTimes,
      totalClasses,
      subjects,
      teachers,
      rooms,
      totalClassesPerDay,
    } = req.body;

    if (!collegeName || !branchName) throw new Error('College name and Branch name are required.');
    if (!workingDays || !classTimes || !subjects || !teachers || !rooms || !totalClasses) {
      throw new Error('All input fields are required.');
    }

    const timetable = {};

    totalClasses.forEach((className) => {
      timetable[className] = {};
      workingDays.forEach((day) => {
        timetable[className][day] = [];
      });
    });

    const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

    const checkConflictInClass = (className, day, timeSlot, teacherName, room) => {
      const classTimetable = timetable[className][day];
      return classTimetable.some(
        (item) => item.teacher === teacherName && item.time === timeSlot
      ) || classTimetable.some((item) => item.room === room && item.time === timeSlot);
    };

    const checkConflictBetweenClasses = (className, day, timeSlot, teacherName, room) => {
      const otherClassName = totalClasses.filter((c) => c !== className)[0];
      const otherClassTimetable = timetable[otherClassName][day];
      return otherClassTimetable.some(
        (item) => item.teacher === teacherName && item.time === timeSlot
      ) || otherClassTimetable.some((item) => item.room === room && item.time === timeSlot);
    };

    const assignSlot = (className, day, timeSlot) => {
      let subject, teacher, room;
      let attempts = 0;
      const maxAttempts = 10;

      while (attempts < maxAttempts) {
        subject = getRandomItem(subjects);
        teacher = getRandomItem(teachers);
        room = getRandomItem(rooms);

        if (
          !checkConflictInClass(className, day, timeSlot, teacher.name, room) &&
          !checkConflictBetweenClasses(className, day, timeSlot, teacher.name, room)
        ) {
          return { subject, teacher, room };
        }

        attempts++;
      }

      throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
    };

    const optimizeTimetable = () => {
      for (let day of workingDays) {
        for (let className of totalClasses) {
          const classTimetable = timetable[className][day];

          for (let i = 0; i < totalClassesPerDay; i++) {
            const timeSlot = classTimes[i % classTimes.length];

            try {
              const { subject, teacher, room } = assignSlot(className, day, timeSlot);
              classTimetable.push({
                subject,
                teacher: teacher.name,
                room,
                time: timeSlot,
              });
            } catch (error) {
              console.error(error.message);
              return null;
            }
          }
        }
      }
      return timetable;
    };

    const optimizedTimetable = optimizeTimetable();
    if (!optimizedTimetable) {
      return res.status(500).json({ error: 'Failed to generate conflict-free timetable.' });
    }

    generatedTimetable = optimizedTimetable;

    return res.status(200).json({
      message: 'Timetable generated successfully!',
      timetable: optimizedTimetable,
    });
  } catch (error) {
    console.error('Error generating timetable:', error);
    return res.status(500).json({ error: error.message });
  }
}; 


// Fetch generated timetable
const getResultTimeTableController = (req, res) => {
  if (Object.keys(generatedTimetable).length === 0) {
    return res.status(404).json({ error: 'Timetable not found. Please generate it first.' });
  }
  return res.status(200).json(generatedTimetable);
};

// Generate conflict-free timetable using machine learning
const generateConflictFreeTimetable = async (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData.collegeName || !inputData.branchName || !inputData.workingDays) {
      return res.status(400).json({ message: 'Missing required fields in input data' });
    }

    const transformedData = timetableService.transformDataForML(inputData);

    const conflictFreeTimetable = await mlService.generateTimetable(transformedData);

    const newTimetable = new Timetable({
      collegeName: inputData.collegeName,
      branchName: inputData.branchName,
      timetable: conflictFreeTimetable,
      subjects: inputData.subjects,
      teachers: inputData.teachers,
      rooms: inputData.rooms,
      classTimes: inputData.classTimes,
      workingDays: inputData.workingDays,
    });
    await newTimetable.save();

    res.status(200).json({
      message: 'Conflict-free timetable generated successfully',
      timetable: conflictFreeTimetable,
    });
  } catch (error) {
    console.error('Error generating conflict-free timetable:', error);
    res.status(500).json({
      error: 'Failed to generate conflict-free timetable',
      message: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  registerTeacher,
  addSubject,
  addRoomVenue,
  generateTimeTableController,
  getResultTimeTableController,
  generateConflictFreeTimetable,
};
