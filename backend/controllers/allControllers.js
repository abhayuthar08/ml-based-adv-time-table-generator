


// const Timetable = require('../models/timetable.model');
// const timetableService = require('../services/timetableService');
// const mlService = require('../services/mlService'); // Assuming you have an ML service
// const { validateInputData, transformDataForML } = timetableService;

// // Temporary in-memory store for generated timetable (for demo purposes)
// let generatedTimetable = {};

// // Route to register admin
// const registerAdmin = async (req, res) => {
//   try {
//     // Admin registration logic
//   } catch (error) {
//     console.error('Error registering admin:', error);
//     return res.status(500).json({ error: 'Error registering admin.' });
//   }
// };

// // Route to login admin
// const loginAdmin = async (req, res) => {
//   try {
//     // Admin login logic
//   } catch (error) {
//     console.error('Error logging in admin:', error);
//     return res.status(500).json({ error: 'Error logging in admin.' });
//   }
// };

// // Route to register teacher
// const registerTeacher = async (req, res) => {
//   try {
//     // Teacher registration logic
//   } catch (error) {
//     console.error('Error registering teacher:', error);
//     return res.status(500).json({ error: 'Error registering teacher.' });
//   }
// };

// // Route to add a subject
// const addSubject = async (req, res) => {
//   try {
//     const { name, teacher } = req.body;
//     if (!name || !teacher) {
//       return res.status(400).json({ error: 'Subject name and teacher are required.' });
//     }
//     // Add subject logic here
//     res.status(200).json({ message: 'Subject added successfully' });
//   } catch (error) {
//     console.error('Error adding subject:', error);
//     return res.status(500).json({ error: 'Error adding subject.' });
//   }
// };

// // Route to add room/venue
// const addRoomVenue = async (req, res) => {
//   try {
//     const { roomName, capacity } = req.body;
//     if (!roomName || !capacity) {
//       return res.status(400).json({ error: 'Room name and capacity are required.' });
//     }
//     // Add room venue logic here
//     res.status(200).json({ message: 'Room venue added successfully' });
//   } catch (error) {
//     console.error('Error adding room venue:', error);
//     return res.status(500).json({ error: 'Error adding room venue.' });
//   }
// };

// //Generate timetable controller
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


// // Generate timetable controller
// // const generateTimeTableController = async (req, res) => {
// //   console.log('Request Body:', req.body);

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
// //       totalClassesPerDay,
// //     } = req.body;

// //     if (!collegeName || !branchName) throw new Error('College name and Branch name are required.');
// //     if (!workingDays || !classTimes || !subjects || !teachers || !rooms || !totalClasses) {
// //       throw new Error('All input fields are required.');
// //     }

// //     const timetable = {};

// //     totalClasses.forEach((className) => {
// //       timetable[className] = {};
// //       workingDays.forEach((day) => {
// //         timetable[className][day] = [];
// //       });
// //     });

// //     const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

// //     const checkConflictInClass = (className, day, timeSlot, teacherName, room) => {
// //       const classTimetable = timetable[className][day];
// //       return classTimetable.some(
// //         (item) => item.teacher === teacherName && item.time === timeSlot
// //       ) || classTimetable.some((item) => item.room === room && item.time === timeSlot);
// //     };

// //     const checkConflictBetweenClasses = (className, day, timeSlot, teacherName, room) => {
// //       const otherClassName = totalClasses.filter((c) => c !== className)[0];
// //       const otherClassTimetable = timetable[otherClassName][day];
// //       return otherClassTimetable.some(
// //         (item) => item.teacher === teacherName && item.time === timeSlot
// //       ) || otherClassTimetable.some((item) => item.room === room && item.time === timeSlot);
// //     };

// //     const assignSlot = (className, day, timeSlot) => {
// //       let subject, teacher, room;
// //       let attempts = 0;
// //       const maxAttempts = 10;

// //       while (attempts < maxAttempts) {
// //         subject = getRandomItem(subjects);
// //         teacher = getRandomItem(teachers);
// //         room = getRandomItem(rooms);

// //         if (
// //           !checkConflictInClass(className, day, timeSlot, teacher.name, room) &&
// //           !checkConflictBetweenClasses(className, day, timeSlot, teacher.name, room)
// //         ) {
// //           return { subject, teacher, room };
// //         }

// //         attempts++;
// //       }

// //       throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
// //     };

// //     const optimizeTimetable = () => {
// //       for (let day of workingDays) {
// //         for (let className of totalClasses) {
// //           const classTimetable = timetable[className][day];

// //           for (let i = 0; i < totalClassesPerDay; i++) {
// //             const timeSlot = classTimes[i % classTimes.length];

// //             try {
// //               const { subject, teacher, room } = assignSlot(className, day, timeSlot);
// //               classTimetable.push({
// //                 subject,
// //                 teacher: teacher.name,
// //                 room,
// //                 time: timeSlot,
// //               });
// //             } catch (error) {
// //               console.error(error.message);
// //               return null;
// //             }
// //           }
// //         }
// //       }
// //       return timetable;
// //     };

// //     const optimizedTimetable = optimizeTimetable();
// //     if (!optimizedTimetable) {
// //       return res.status(500).json({ error: 'Failed to generate conflict-free timetable.' });
// //     }

// //     generatedTimetable = optimizedTimetable;

// //     return res.status(200).json({
// //       message: 'Timetable generated successfully!',
// //       timetable: optimizedTimetable,
// //     });
// //   } catch (error) {
// //     console.error('Error generating timetable:', error);
// //     return res.status(500).json({ error: error.message });
// //   }
// // } 

// // Fetch generated timetable
// const getResultTimeTableController = (req, res) => {
//   if (Object.keys(generatedTimetable).length === 0) {
//     return res.status(404).json({ error: 'Timetable not found. Please generate it first.' });
//   }
//   return res.status(200).json(generatedTimetable);
// };

// // Generate conflict-free timetable using machine learning
// const generateConflictFreeTimetable = async (req, res) => {
//   try {
//     const inputData = req.body;

//     if (!inputData.collegeName || !inputData.branchName || !inputData.workingDays) {
//       return res.status(400).json({ message: 'Missing required fields in input data' });
//     }

//     const transformedData = timetableService.transformDataForML(inputData);

//     const conflictFreeTimetable = await mlService.generateTimetable(transformedData);

//     const newTimetable = new Timetable({
//       collegeName: inputData.collegeName,
//       branchName: inputData.branchName,
//       timetable: conflictFreeTimetable,
//       subjects: inputData.subjects,
//       teachers: inputData.teachers,
//       rooms: inputData.rooms,
//       classTimes: inputData.classTimes,
//       workingDays: inputData.workingDays,
//     });
//     await newTimetable.save();

//     res.status(200).json({
//       message: 'Conflict-free timetable generated successfully',
//       timetable: conflictFreeTimetable,
//     });
//   } catch (error) {
//     console.error('Error generating conflict-free timetable:', error);
//     res.status(500).json({
//       error: 'Failed to generate conflict-free timetable',
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   registerAdmin,
//   loginAdmin,
//   registerTeacher,
//   addSubject,
//   addRoomVenue,
//   generateTimeTableController,
//   getResultTimeTableController,
//   generateConflictFreeTimetable,
// };



















































const Timetable = require("../models/timetable.model");
const timetableService = require("../services/timetableService");
const mlService = require("../services/mlService");

// Temporary in-memory store for generated timetable
let generatedTimetable = {};

// // Route to register admin
// const registerAdmin = async (req, res) => {
//   try {
//     // Admin registration logic
//   } catch (error) {
//     console.error('Error registering admin:', error);
//     return res.status(500).json({ error: 'Error registering admin.' });
//   }
// };

// // Route to login admin
// const loginAdmin = async (req, res) => {
//   try {
//     // Admin login logic
//   } catch (error) {
//     console.error('Error logging in admin:', error);
//     return res.status(500).json({ error: 'Error logging in admin.' });
//   }
// };

// // 📌 Generate Timetable with Conflict Checking

//this is final
// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

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

//     // ✅ Validate Input Data
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and Branch name are required.");
//     }
//     if (!workingDays || !Array.isArray(workingDays) || workingDays.length === 0) {
//       throw new Error("❌ Invalid or missing 'workingDays'.");
//     }
//     if (!totalClasses || !Array.isArray(totalClasses) || totalClasses.length === 0) {
//       throw new Error("❌ Invalid or missing 'totalClasses'.");
//     }
//     if (!subjects || subjects.length === 0) {
//       throw new Error("❌ Subjects list is empty. Cannot generate timetable.");
//     }
//     if (!teachers || teachers.length === 0) {
//       throw new Error("❌ Teachers list is empty. Cannot generate timetable.");
//     }
//     if (!rooms || rooms.length === 0) {
//       throw new Error("❌ Rooms list is empty. Cannot generate timetable.");
//     }
//     if (!totalClassesPerDay || isNaN(totalClassesPerDay)) {
//       throw new Error("❌ Invalid or missing `totalClassesPerDay`.");
//     }

//     console.log("✅ Request Data is Valid");

//     // ✅ Initialize Timetable Object
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Function to get a random item from an array
//     const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

//     // Function to Assign Slot with Conflict Checking
//     const assignSlot = (className, day, timeSlot) => {
//       if (!subjects.length || !teachers.length || !rooms.length) {
//         throw new Error("❌ Subjects, teachers, and rooms must not be empty.");
//       }

//       let attempts = 0;
//       const maxAttempts = 10;
//       let subject, teacher, room;

//       while (attempts < maxAttempts) {
//         subject = getRandomItem(subjects);
//         teacher = getRandomItem(teachers);
//         room = getRandomItem(rooms);

//         if (subject && teacher && room) {
//           if (!timetable[className][day].some((item) => item.teacher === teacher.name || item.room === room)) {
//             return { subject, teacher, room };
//           }
//         }

//         attempts++;
//       }

//       throw new Error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//     };

//     console.log("✅ Assign Slot Function Ready");

//     // ✅ Populate the Timetable
//     for (let day of workingDays) {
//       for (let className of totalClasses) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             const { subject, teacher, room } = assignSlot(className, day, timeSlot);
//             timetable[className][day].push({
//               subject: subject.name,
//               teacher: teacher.name,
//               room,
//               time: timeSlot,
//             });
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Generated Successfully");

//     // ✅ Store Generated Timetable in Memory
//     generatedTimetable = timetable;

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

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

//     if (!collegeName || !branchName || !workingDays.length || !totalClasses.length || !subjects.length || !teachers.length || !rooms.length || !totalClassesPerDay) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // ✅ Organize teachers by subject for workload balancing
//     const teacherPool = {};
//     teachers.forEach(({ name, subject }) => {
//       if (!teacherPool[subject]) {
//         teacherPool[subject] = [];
//       }
//       teacherPool[subject].push(name);
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // ✅ Track teacher assignments to avoid overlaps
//     const teacherSchedule = {};

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot) => {
//       let attempts = 0;
//       const maxAttempts = 10;
//       let subject, teacher, room;

//       while (attempts < maxAttempts) {
//         // Select a subject in a round-robin manner
//         subject = subjects[attempts % subjects.length].name;

//         // Get teachers for this subject
//         let availableTeachers = teacherPool[subject] || [];

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           attempts++;
//           continue;
//         }

//         // Sort teachers by workload (give priority to less assigned teachers)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => (teacherSchedule[a]?.length || 0) - (teacherSchedule[b]?.length || 0)
//         );

//         // Pick the teacher with the least workload
//         teacher = availableTeachers[0];

//         // Assign a random available room
//         room = rooms[Math.floor(Math.random() * rooms.length)];

//         // Avoid teacher overlap across multiple classes at the same time
//         if (!teacherSchedule[day]) teacherSchedule[day] = {};
//         if (!teacherSchedule[day][timeSlot]) teacherSchedule[day][timeSlot] = new Set();

//         if (!teacherSchedule[day][timeSlot].has(teacher)) {
//           // Assign teacher and update schedule
//           teacherSchedule[day][timeSlot].add(teacher);

//           console.log(`✅ Assigned ${subject} to ${teacher} in ${room} at ${timeSlot}`);

//           return { subject, teacher, room };
//         }

//         attempts++;
//       }

//       console.error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//       return null;
//     };

//     // ✅ Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let day of workingDays) {
//       for (let className of totalClasses) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             const slot = assignSlot(className, day, timeSlot);

//             if (slot) {
//               timetable[className][day].push({
//                 subject: slot.subject,
//                 teacher: slot.teacher,
//                 room: slot.room,
//                 time: timeSlot,
//                 // workingDays: slot.workingDays,
//                 // classTimes: slot.classTimes
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }; //full final

// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

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
//       labBatchesPerClass,
//       labLocations,
//     } = req.body;

//     if (!collegeName || !branchName || !workingDays.length || !classTimes.length || !totalClasses.length || !subjects.length || !teachers.length || !rooms.length || !totalClassesPerDay || !labBatchesPerClass || !labLocations.length) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair distribution
//     const teacherPool = {};
//     teachers.forEach(({ name, subject }) => {
//       if (!teacherPool[subject]) {
//         teacherPool[subject] = [];
//       }
//       teacherPool[subject].push(name);
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher schedules to prevent conflicts
//     const teacherSchedule = {};

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject, isLab = false, batchNumber = null) => {
//       let attempts = 0;
//       const maxAttempts = 10;
//       let teacher, room;

//       while (attempts < maxAttempts) {
//         let availableTeachers = teacherPool[subject] || [];

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           attempts++;
//           continue;
//         }

//         // Sort teachers by workload to ensure fair distribution
//         availableTeachers.sort(
//           (a, b) => (teacherSchedule[a]?.length || 0) - (teacherSchedule[b]?.length || 0)
//         );
//         teacher = availableTeachers[0];

//         // Select an available room
//         room = isLab ? labLocations[Math.floor(Math.random() * labLocations.length)] : rooms[Math.floor(Math.random() * rooms.length)];

//         // Ensure teacher does not overlap
//         if (!teacherSchedule[day]) teacherSchedule[day] = {};
//         if (!teacherSchedule[day][timeSlot]) teacherSchedule[day][timeSlot] = new Set();

//         if (!teacherSchedule[day][timeSlot].has(teacher)) {
//           teacherSchedule[day][timeSlot].add(teacher);

//           console.log(`✅ Assigned ${subject} to ${teacher} in ${room} at ${timeSlot}`);

//           return {
//             subject: isLab ? `Lab (${subject})` : subject,
//             teacher,
//             room,
//             time: timeSlot,
//             batch: batchNumber ? `Batch ${batchNumber}` : null,
//           };
//         }

//         attempts++;
//       }

//       console.error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//       return null;
//     };

//     // Allocate subjects as per weekly lectures
//     const subjectWeeklyDistribution = {};
//     subjects.forEach(({ name, weeklyClasses }) => {
//       subjectWeeklyDistribution[name] = weeklyClasses;
//     });

//     // Generate the timetable ensuring fair subject distribution
//     for (let day of workingDays) {
//       for (let className of totalClasses) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           const availableSubjects = Object.keys(subjectWeeklyDistribution).filter((sub) => subjectWeeklyDistribution[sub] > 0);
//           if (availableSubjects.length === 0) continue;

//           const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//           subjectWeeklyDistribution[subject]--;

//           try {
//             const slot = assignSlot(className, day, timeSlot, subject);
//             if (slot) {
//               timetable[className][day].push({
//                 subject: slot.subject,
//                 teacher: slot.teacher,
//                 room: slot.room,
//                 time: timeSlot,
//                 batch: slot.batch || "",
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Allocate lab sessions with batch divisions
//     totalClasses.forEach((className) => {
//       if (labBatchesPerClass[className] > 1) {
//         for (let day of workingDays) {
//           for (let i = 0; i < labBatchesPerClass[className]; i++) {
//             const labSlot = classTimes[Math.floor(Math.random() * classTimes.length)];
//             const labSubject = subjects.find((sub) => sub.hasLab === "Yes");
//             if (!labSubject) continue;

//             let labTeacher = teachers.find((t) => t.subject === labSubject.name);
//             let labRoom = labLocations[Math.floor(Math.random() * labLocations.length)];

//             if (!timetable[className][day]) timetable[className][day] = [];
//             timetable[className][day].push({
//               subject: `Lab (${labSubject.name})`,
//               teacher: labTeacher ? labTeacher.name : "Unknown",
//               room: labRoom,
//               time: labSlot,
//               batch: `Batch ${i + 1}`,
//             });
//           }
//         }
//       }
//     });

//     console.log("✅ Lab Sessions Allocated Successfully");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       labTimings,
//       totalClasses,
//       subjects,
//       labBatches,
//       labLocations,
//       availableRooms,
//     } = req.body;

//     if (!collegeName || !branchName || !workingDays.length || !totalClasses.length || !subjects.length || !classTimes.length || !labTimings.length || !availableRooms.length) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach(({ name, teacher }) => {
//       if (!teacherPool[name]) {
//         teacherPool[name] = [];
//       }
//       teacherPool[name].push(teacher);
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher schedules to avoid conflicts
//     const teacherSchedule = {};

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject, isLab = false) => {
//       let attempts = 0;
//       const maxAttempts = 10;
//       let teacher, room;

//       while (attempts < maxAttempts) {
//         // Get teachers for this subject
//         let availableTeachers = teacherPool[subject] || [];

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           attempts++;
//           continue;
//         }

//         // Prioritize teachers with the least workload
//         availableTeachers = availableTeachers.sort(
//           (a, b) => (teacherSchedule[a]?.length || 0) - (teacherSchedule[b]?.length || 0)
//         );

//         // Pick the least busy teacher
//         teacher = availableTeachers[0];

//         // Assign a random available room or lab
//         room = isLab ? labLocations[Math.floor(Math.random() * labLocations.length)] : availableRooms[Math.floor(Math.random() * availableRooms.length)];

//         // Ensure no teacher conflict
//         if (!teacherSchedule[day]) teacherSchedule[day] = {};
//         if (!teacherSchedule[day][timeSlot]) teacherSchedule[day][timeSlot] = new Set();

//         if (!teacherSchedule[day][timeSlot].has(teacher)) {
//           teacherSchedule[day][timeSlot].add(teacher);
//           return { subject, teacher, room };
//         }

//         attempts++;
//       }

//       console.error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//       return null;
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let day of workingDays) {
//       for (let className of totalClasses) {
//         let remainingSubjects = [...subjects];

//         for (let i = 0; i < classTimes.length; i++) {
//           if (remainingSubjects.length === 0) remainingSubjects = [...subjects];

//           let subjectObj = remainingSubjects.shift();
//           let subjectName = subjectObj.name;

//           try {
//             const slot = assignSlot(className, day, classTimes[i], subjectName);

//             if (slot) {
//               timetable[className][day].push({
//                 subject: slot.subject,
//                 teacher: slot.teacher,
//                 room: slot.room,
//                 time: classTimes[i],
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }

//         // Handle Lab Sessions
//         for (let i = 0; i < labTimings.length; i++) {
//           let subjectWithLab = subjects.find(subj => subj.hasLab === "Yes");

//           if (!subjectWithLab) continue;

//           let subjectName = subjectWithLab.name;

//           try {
//             for (let batch = 1; batch <= labBatches; batch++) {
//               const slot = assignSlot(`${className} - Batch ${batch}`, day, labTimings[i], subjectName, true);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: `${slot.subject} (Batch ${batch})`,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: labTimings[i],
//                 });
//               }
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate lab schedule." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//       labTimings
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
// final latest




// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       labTimings,
//       totalClasses,
//       subjects,
//       labBatches,
//       labLocations,
//       availableRooms,
//     } = req.body;

//     if (
//       !collegeName || !branchName || !workingDays.length || !totalClasses.length ||
//       !subjects.length || !classTimes.length || !labTimings.length || !availableRooms.length
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // ✅ Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // ✅ Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach(({ name, teachers }) => {
//       if (!teachers || teachers.length === 0) {
//         throw new Error(`❌ No teachers assigned for subject: ${name}`);
//       }
//       teacherPool[name] = [...teachers]; // Store teacher lists properly
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // ✅ Track teacher schedules to avoid conflicts
//     const teacherSchedule = {};

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject, isLab = false) => {
//       let attempts = 0;
//       const maxAttempts = 10;
//       let teacher, room;

//       while (attempts < maxAttempts) {
//         // **Get teachers for this subject**
//         let availableTeachers = teacherPool[subject] || [];

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           throw new Error("❌ Teachers list is empty. Cannot generate timetable.");
//         }

//         // **Rotate teachers fairly**
//         teacher = availableTeachers[attempts % availableTeachers.length];

//         // **Assign a random available room or lab**
//         room = isLab
//           ? labLocations[Math.floor(Math.random() * labLocations.length)]
//           : availableRooms[Math.floor(Math.random() * availableRooms.length)];

//         // **Ensure no teacher conflict**
//         if (!teacherSchedule[day]) teacherSchedule[day] = {};
//         if (!teacherSchedule[day][timeSlot]) teacherSchedule[day][timeSlot] = new Set();

//         if (!teacherSchedule[day][timeSlot].has(teacher)) {
//           teacherSchedule[day][timeSlot].add(teacher);
//           return { subject, teacher, room };
//         }

//         attempts++;
//       }

//       console.error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//       return null;
//     };

//     // ✅ Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let day of workingDays) {
//       for (let className of totalClasses) {
//         let remainingSubjects = [...subjects];

//         for (let i = 0; i < classTimes.length; i++) {
//           if (remainingSubjects.length === 0) remainingSubjects = [...subjects];

//           let subjectObj = remainingSubjects.shift();
//           let subjectName = subjectObj.name;

//           try {
//             const slot = assignSlot(className, day, classTimes[i], subjectName);

//             if (slot) {
//               timetable[className][day].push({
//                 subject: slot.subject,
//                 teacher: slot.teacher,
//                 room: slot.room,
//                 time: classTimes[i],
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }

//         // ✅ Handle Lab Sessions
//         for (let i = 0; i < labTimings.length; i++) {
//           let subjectsWithLabs = subjects.filter(subj => subj.hasLab === "Yes");

//           if (subjectsWithLabs.length === 0) continue;

//           try {
//             for (let batch = 1; batch <= labBatches; batch++) {
//               let subjectWithLab = subjectsWithLabs[batch % subjectsWithLabs.length]; // Rotate lab subjects
//               let subjectName = subjectWithLab.name;

//               const slot = assignSlot(`${className} - Batch ${batch}`, day, labTimings[i], subjectName, true);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: `${slot.subject} (Batch ${batch})`,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: labTimings[i],
//                 });
//               }
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate lab schedule." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//       labTimings
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };





// const generateTimeTableController = async (req, res) => 
//   {

//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

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

//     if (!collegeName || !branchName || !workingDays.length || !totalClasses.length || !subjects.length || !teachers.length || !rooms.length || !totalClassesPerDay) {
//       throw new Error("❌ Missing required fields.");
//     }

//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     const teacherWorkload = {};
//     teachers.forEach(({ name, subject }) => {
//       if (!teacherWorkload[name]) {
//         teacherWorkload[name] = [];
//       }
//       teacherWorkload[name].push(subject);
//     });

//     const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

//     const assignSlot = (className, day, timeSlot) => {
//       let attempts = 0;
//       const maxAttempts = 10;
//       let subject, teacher, room;

//       while (attempts < maxAttempts) {
//         subject = getRandomItem(subjects);
//         teacher = getRandomItem(teachers);
//         room = getRandomItem(rooms);

//         if (teacherWorkload[teacher.name].includes(subject.name)) {
//           if (!timetable[className][day].some((item) => item.teacher === teacher.name || item.room === room)) {
//             return { subject, teacher, room };
//           }
//         }
//         attempts++;
//       }

//       throw new Error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//     };

//     for (let day of workingDays) {
//       for (let className of totalClasses) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             const { subject, teacher, room } = assignSlot(className, day, timeSlot);
//             timetable[className][day].push({
//               subject: subject.name,
//               teacher: teacher.name,
//               room,
//               time: timeSlot,
//             });
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays: workingDays || [],
//       classTimes: classTimes || [],
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }; //final 2


// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

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

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays.length || !totalClasses.length ||
//       !subjects.length || !teachers.length || !rooms.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     teachers.forEach(({ name, subject }) => {
//       if (!teacherPool[subject]) {
//         teacherPool[subject] = [];
//       }
//       teacherPool[subject].push(name);
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     teachers.forEach(({ name }) => {
//       teacherWorkload[name] = 0;
//     });

//     // Track room schedules to avoid conflicts
//     const roomSchedule = {};

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot) => {
//       let attempts = 0;
//       const maxAttempts = 20; // Increased attempts for better allocation
//       let subject, teacher, room;

//       while (attempts < maxAttempts) {
//         // Randomly select a subject
//         subject = subjects[Math.floor(Math.random() * subjects.length)];

//         // Get teachers for this subject
//         let availableTeachers = teacherPool[subject.name] || [];

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject.name}`);
//           attempts++;
//           continue;
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         teacher = availableTeachers[0];

//         // Assign a random available room
//         room = rooms[Math.floor(Math.random() * rooms.length)];

//         // Ensure no room conflict
//         if (!roomSchedule[day]) roomSchedule[day] = {};
//         if (!roomSchedule[day][timeSlot]) roomSchedule[day][timeSlot] = new Set();

//         if (!roomSchedule[day][timeSlot].has(room)) {
//           // Assign teacher and update workload
//           teacherWorkload[teacher]++;
//           roomSchedule[day][timeSlot].add(room);
//           return { subject, teacher, room };
//         }

//         attempts++;
//       }

//       console.error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//       return null;
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let day of workingDays) {
//       for (let className of totalClasses) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             const slot = assignSlot(className, day, timeSlot);

//             if (slot) {
//               timetable[className][day].push({
//                 subject: slot.subject.name,
//                 teacher: slot.teacher,
//                 room: slot.room,
//                 time: timeSlot,
//               });
//             } else {
//               console.warn(`⚠️ Skipping slot for ${className} on ${day} at ${timeSlot} due to assignment failure.`);
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }; // finally...

// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     subjects.forEach((subject) => {
//       subjectAllocation[subject.name] = 0;
//     });

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject) => {
//       let attempts = 0;
//       const maxAttempts = 20; // Increased attempts for better allocation
//       let teacher, room;

//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       teacher = availableTeachers[0];

//       // Assign a random available room
//       room = rooms[Math.floor(Math.random() * rooms.length)];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[subject]++;

//       return { subject, teacher, room };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't reached its weekly class limit
//             const subjectObj = subjects.find(
//               (subject) => subjectAllocation[subject.name] < subject.weeklyClasses
//             );

//             if (subjectObj) {
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have reached their weekly class limit, assign an extra class
//               timetable[className][day].push({
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }; // finally 1

// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     subjects.forEach((subject) => {
//       subjectAllocation[subject.name] = 0;
//     });

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject) => {
//       let attempts = 0;
//       const maxAttempts = 20; // Increased attempts for better allocation
//       let teacher, room;

//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       teacher = availableTeachers[0];

//       // Assign a random available room
//       room = rooms[Math.floor(Math.random() * rooms.length)];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[subject]++;

//       return { subject, teacher, room };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't reached its weekly class limit
//             const subjectObj = subjects.find(
//               (subject) => subjectAllocation[subject.name] < subject.weeklyClasses * totalClasses.length
//             );

//             if (subjectObj) {
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have reached their weekly class limit, assign an extra class
//               timetable[className][day].push({
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };


// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     subjects.forEach((subject) => {
//       subjectAllocation[subject.name] = 0;
//     });

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject) => {
//       let attempts = 0;
//       const maxAttempts = 20; // Increased attempts for better allocation
//       let teacher, room;

//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       teacher = availableTeachers[0];

//       // Assign a random available room
//       room = rooms[Math.floor(Math.random() * rooms.length)];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[subject]++;

//       return { subject, teacher, room };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't reached its weekly class limit
//             const subjectObj = subjects.find(
//               (subject) => subjectAllocation[subject.name] < subject.weeklyClasses * totalClasses.length
//             );

//             if (subjectObj) {
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have reached their weekly class limit, assign an extra class
//               timetable[className][day].push({
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };


// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     subjects.forEach((subject) => {
//       subjectAllocation[subject.name] = 0;
//     });

//     console.log("✅ Assign Slot Function Ready");

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       const teacher = availableTeachers[0];

//       // Assign a random available room
//       const room = rooms[Math.floor(Math.random() * rooms.length)];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[subject]++;

//       return { subject, teacher, room };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Create a list of subjects that can be assigned on this day
//         let availableSubjects = subjects.filter(
//           (subject) => subjectAllocation[subject.name] < subject.weeklyClasses * totalClasses.length
//         );

//         // Shuffle the subjects to randomize the order
//         availableSubjects = availableSubjects.sort(() => Math.random() - 0.5);

//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const subjectObj = availableSubjects.find(
//               (subject) => !timetable[className][day].some((slot) => slot.subject === subject.name)
//             );

//             if (subjectObj) {
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });

//                 // Remove the assigned subject from the available subjects for this day
//                 availableSubjects = availableSubjects.filter(
//                   (subject) => subject.name !== subjectObj.name
//                 );
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].push({
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }; // this is final with the priority lectures 


// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = 0;
//       });
//     });

//     console.log("✅ Assign Slot Function Ready");

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       const teacher = availableTeachers[0];

//       // Assign a random available room
//       const room = rooms[Math.floor(Math.random() * rooms.length)];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[className][subject]++;

//       return { subject, teacher, room };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let subject of subjects) {
//         const weeklyClasses = subject.weeklyClasses;

//         // Assign the required number of classes for this subject
//         while (subjectAllocation[className][subject.name] < weeklyClasses) {
//           let assigned = false;

//           // Try to assign the subject to a random day and time slot
//           for (let attempt = 0; attempt < 100; attempt++) {
//             const day = workingDays[Math.floor(Math.random() * workingDays.length)];
//             const timeSlot = classTimes[Math.floor(Math.random() * classTimes.length)];

//             // Check if the slot is available and the subject is not already assigned on this day
//             if (
//               timetable[className][day].length < totalClassesPerDay &&
//               !timetable[className][day].some((slot) => slot.subject === subject.name)
//             ) {
//               const slot = assignSlot(className, day, timeSlot, subject.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//                 assigned = true;
//                 break;
//               }
//             }
//           }

//           if (!assigned) {
//             console.error(`❌ Failed to assign ${subject.name} to ${className}`);
//             break;
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };


// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     subjects.forEach((subject) => {
//       subjectAllocation[subject.name] = 0;
//     });

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject) => {
//       let attempts = 0;
//       const maxAttempts = 20; // Increased attempts for better allocation
//       let teacher, room;

//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       teacher = availableTeachers[0];

//       // Assign a random available room
//       room = rooms[Math.floor(Math.random() * rooms.length)];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[subject]++;

//       return { subject, teacher, room };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't reached its weekly class limit
//             const subjectObj = subjects.find(
//               (subject) => subjectAllocation[subject.name] < subject.weeklyClasses
//             );

//             if (subjectObj) {
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have reached their weekly class limit, assign an extra class
//               timetable[className][day].push({
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { generateTimeTableController };


// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Assign a fixed room to each class
//     const classRoomMap = {};
//     totalClasses.forEach((className, index) => {
//       classRoomMap[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Class Room Mapping:", JSON.stringify(classRoomMap, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     subjects.forEach((subject) => {
//       subjectAllocation[subject.name] = 0;
//     });

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject) => {
//       let attempts = 0;
//       const maxAttempts = 20; // Increased attempts for better allocation
//       let teacher;

//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       teacher = availableTeachers[0];

//       // Use the fixed room assigned to the class
//       const room = classRoomMap[className];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[subject]++;

//       return { subject, teacher, room };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't reached its weekly class limit
//             const subjectObj = subjects.find(
//               (subject) => subjectAllocation[subject.name] < subject.weeklyClasses
//             );

//             if (subjectObj) {
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have reached their weekly class limit, assign an extra class
//               timetable[className][day].push({
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: classRoomMap[className], // Use the fixed room for extra classes as well
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }; // last

// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Predefine room assignments for each class
//     const classRoomMap = {
//       IT1: "101",
//       IT2: "102",
//       IT3: "103",
//       // Add more classes and rooms as needed
//     };

//     console.log("✅ Class Room Mapping:", JSON.stringify(classRoomMap, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     subjects.forEach((subject) => {
//       subjectAllocation[subject.name] = 0;
//     });

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject) => {
//       let attempts = 0;
//       const maxAttempts = 20; // Increased attempts for better allocation
//       let teacher;

//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       teacher = availableTeachers[0];

//       // Use the predefined room for the class
//       const room = classRoomMap[className];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[subject]++;

//       return { subject, teacher, room };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't reached its weekly class limit
//             const subjectObj = subjects.find(
//               (subject) => subjectAllocation[subject.name] < subject.weeklyClasses
//             );

//             if (subjectObj) {
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have reached their weekly class limit, assign an extra class
//               timetable[className][day].push({
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: classRoomMap[className], // Use the predefined room for extra classes
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }; //lastt


// const generateTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       totalClassesPerDay,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className, index) => {
//       timetable[className] = {
//         room: rooms[index % rooms.length], // Assign a fixed room to each class
//       };
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = subject.teachers;
//     });

//     console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

//     // Track teacher workload (number of classes assigned)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     subjects.forEach((subject) => {
//       subjectAllocation[subject.name] = 0;
//     });

//     console.log("✅ Assign Slot Function Ready");

//     const assignSlot = (className, day, timeSlot, subject) => {
//       // Get teachers for this subject
//       let availableTeachers = teacherPool[subject] || [];

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null }; // Extra class without a teacher
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );

//       // Pick the teacher with the least workload
//       const teacher = availableTeachers[0];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[subject]++;

//       return { subject, teacher };
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const usedSubjects = new Set(); // Track subjects used on this day

//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't reached its weekly class limit and isn't already used today
//             const subjectObj = subjects.find(
//               (subject) =>
//                 subjectAllocation[subject.name] < subject.weeklyClasses * totalClasses.length &&
//                 !usedSubjects.has(subject.name)
//             );

//             if (subjectObj) {
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: timetable[className].room, // Use the fixed room for the class
//                   time: timeSlot,
//                 });

//                 usedSubjects.add(slot.subject); // Mark subject as used for the day
//               }
//             } else {
//               // All subjects have reached their weekly class limit or are already used today, assign an extra class
//               timetable[className][day].push({
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: timetable[className].room, // Use the fixed room for extra classes
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(error.message);
//             return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
//           }
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }; //lasttt


const generateTimeTableController = async (req, res) => {
  console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

  try {
    const {
      collegeName,
      branchName,
      workingDays,
      classTimes,
      totalClasses,
      subjects,
      rooms,
      totalClassesPerDay,
    } = req.body;

    // Validate required fields
    if (
      !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
      !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay
    ) {
      throw new Error("❌ Missing required fields.");
    }

    console.log("✅ Request Data is Valid");

    // Validate subjects
    subjects.forEach((subject) => {
      if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
        throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
      }
    });

    // Initialize timetable structure
    const timetable = {};
    totalClasses.forEach((className) => {
      timetable[className] = {};
      workingDays.forEach((day) => {
        timetable[className][day] = [];
      });
    });

    console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

    // Organize teachers by subject for fair workload distribution
    const teacherPool = {};
    subjects.forEach((subject) => {
      teacherPool[subject.name] = subject.teachers;
    });

    console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

    // Track teacher workload (number of classes assigned)
    const teacherWorkload = {};
    subjects.forEach((subject) => {
      subject.teachers.forEach((teacher) => {
        teacherWorkload[teacher] = 0;
      });
    });

    // Track subject allocation to ensure fair distribution
    const subjectAllocation = {};
    totalClasses.forEach((className) => {
      subjectAllocation[className] = {};
      subjects.forEach((subject) => {
        subjectAllocation[className][subject.name] = 0;
      });
    });

    console.log("✅ Assign Slot Function Ready");

    // Function to assign a slot for a class, day, and time
    const assignSlot = (className, day, timeSlot, subject) => {
      // Get teachers for this subject
      let availableTeachers = teacherPool[subject] || [];

      if (availableTeachers.length === 0) {
        console.error(`❌ No teachers available for subject: ${subject}`);
        return { subject, teacher: null, room: null }; // Extra class without a teacher
      }

      // Sort teachers by workload (assign teachers with the least workload first)
      availableTeachers = availableTeachers.sort(
        (a, b) => teacherWorkload[a] - teacherWorkload[b]
      );

      // Pick the teacher with the least workload
      const teacher = availableTeachers[0];

      // Assign a random available room
      const room = rooms[Math.floor(Math.random() * rooms.length)];

      // Update teacher workload and subject allocation
      teacherWorkload[teacher]++;
      subjectAllocation[className][subject]++;

      return { subject, teacher, room };
    };

    // Generate the timetable ensuring no teacher conflicts & fair distribution
    for (let className of totalClasses) {
      for (let subject of subjects) {
        const weeklyClasses = subject.weeklyClasses;

        // Assign the required number of classes for this subject
        while (subjectAllocation[className][subject.name] < weeklyClasses) {
          let assigned = false;

          // Try to assign the subject to a random day and time slot
          for (let attempt = 0; attempt < 100; attempt++) {
            const day = workingDays[Math.floor(Math.random() * workingDays.length)];
            const timeSlot = classTimes[Math.floor(Math.random() * classTimes.length)];

            // Check if the slot is available and the subject is not already assigned on this day
            if (
              timetable[className][day].length < totalClassesPerDay &&
              !timetable[className][day].some((slot) => slot.subject === subject.name)
            ) {
              const slot = assignSlot(className, day, timeSlot, subject.name);

              if (slot) {
                timetable[className][day].push({
                  subject: slot.subject,
                  teacher: slot.teacher,
                  room: slot.room,
                  time: timeSlot,
                });
                assigned = true;
                break;
              }
            }
          }

          if (!assigned) {
            console.error(`❌ Failed to assign ${subject.name} to ${className}`);
            break;
          }
        }
      }
    }

    console.log("✅ Timetable Successfully Generated");

    return res.status(200).json({
      message: "✅ Timetable generated successfully!",
      timetable,
      workingDays,
      classTimes,
    });
  } catch (error) {
    console.error("❌ Error generating timetable:", error);
    return res.status(500).json({ error: error.message });
  }
};
module.exports = { generateTimeTableController };

const getResultTimeTableController = async (req, res) => {
  try {
    if (!generatedTimetable || Object.keys(generatedTimetable).length === 0) {
      return res.status(404).json({ error: "❌ Timetable not found. Please generate it first." });
    }
    return res.status(200).json(generatedTimetable);
  } catch (error) {
    console.error("❌ Error fetching timetable:", error);
    res.status(500).json({ error: "❌ Failed to fetch timetable." });
  }
};

// 📌 Generate Conflict-Free Timetable Using Machine Learning
const generateConflictFreeTimetable = async (req, res) => {
  try {
    const inputData = req.body;

    if (!inputData.collegeName || !inputData.branchName || !inputData.workingDays) {
      return res.status(400).json({ message: "❌ Missing required fields in input data" });
    }

    // Transform input for ML processing
    const transformedData = timetableService.transformDataForML(inputData);

    // Generate timetable using ML
    const conflictFreeTimetable = await mlService.generateTimetable(transformedData);

    // Save timetable in database
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

    generatedTimetable = conflictFreeTimetable; // Store in memory for quick retrieval

    res.status(200).json({
      message: "✅ Conflict-free timetable generated successfully",
      timetable: conflictFreeTimetable,
    });
  } catch (error) {
    console.error("❌ Error generating conflict-free timetable:", error);
    res.status(500).json({
      error: "❌ Failed to generate conflict-free timetable",
      message: error.message,
    });
  }
};

module.exports = {
  generateTimeTableController,
  getResultTimeTableController,
  generateConflictFreeTimetable,
};
