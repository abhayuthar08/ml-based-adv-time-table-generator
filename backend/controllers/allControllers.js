


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
      teachers,
      rooms,
      totalClassesPerDay,
    } = req.body;

    if (!collegeName || !branchName || !workingDays.length || !totalClasses.length || !subjects.length || !teachers.length || !rooms.length || !totalClassesPerDay) {
      throw new Error("❌ Missing required fields.");
    }

    console.log("✅ Request Data is Valid");

    // Initialize timetable
    const timetable = {};
    totalClasses.forEach((className) => {
      timetable[className] = {};
      workingDays.forEach((day) => {
        timetable[className][day] = [];
      });
    });

    console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

    // ✅ Organize teachers by subject for workload balancing
    const teacherPool = {};
    teachers.forEach(({ name, subject }) => {
      if (!teacherPool[subject]) {
        teacherPool[subject] = [];
      }
      teacherPool[subject].push(name);
    });

    console.log("✅ Teacher Pool:", JSON.stringify(teacherPool, null, 2));

    // ✅ Track teacher assignments to avoid overlaps
    const teacherSchedule = {};

    console.log("✅ Assign Slot Function Ready");

    const assignSlot = (className, day, timeSlot) => {
      let attempts = 0;
      const maxAttempts = 10;
      let subject, teacher, room;

      while (attempts < maxAttempts) {
        // Select a subject in a round-robin manner
        subject = subjects[attempts % subjects.length].name;

        // Get teachers for this subject
        let availableTeachers = teacherPool[subject] || [];

        if (availableTeachers.length === 0) {
          console.error(`❌ No teachers available for subject: ${subject}`);
          attempts++;
          continue;
        }

        // Sort teachers by workload (give priority to less assigned teachers)
        availableTeachers = availableTeachers.sort(
          (a, b) => (teacherSchedule[a]?.length || 0) - (teacherSchedule[b]?.length || 0)
        );

        // Pick the teacher with the least workload
        teacher = availableTeachers[0];

        // Assign a random available room
        room = rooms[Math.floor(Math.random() * rooms.length)];

        // Avoid teacher overlap across multiple classes at the same time
        if (!teacherSchedule[day]) teacherSchedule[day] = {};
        if (!teacherSchedule[day][timeSlot]) teacherSchedule[day][timeSlot] = new Set();

        if (!teacherSchedule[day][timeSlot].has(teacher)) {
          // Assign teacher and update schedule
          teacherSchedule[day][timeSlot].add(teacher);

          console.log(`✅ Assigned ${subject} to ${teacher} in ${room} at ${timeSlot}`);

          return { subject, teacher, room };
        }

        attempts++;
      }

      console.error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
      return null;
    };

    // ✅ Generate the timetable ensuring no teacher conflicts & fair distribution
    for (let day of workingDays) {
      for (let className of totalClasses) {
        for (let i = 0; i < totalClassesPerDay; i++) {
          const timeSlot = classTimes[i % classTimes.length];

          try {
            const slot = assignSlot(className, day, timeSlot);

            if (slot) {
              timetable[className][day].push({
                subject: slot.subject,
                teacher: slot.teacher,
                room: slot.room,
                time: timeSlot,
                // workingDays: slot.workingDays,
                // classTimes: slot.classTimes
              });
            }
          } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: "❌ Failed to generate conflict-free timetable." });
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
    return res.status(500).json({ error: error.message });
  }
};



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

//     if (!collegeName || !branchName || !workingDays.length || !totalClasses.length || !subjects.length || !teachers.length || !rooms.length || !totalClassesPerDay) {
//       throw new Error("❌ Missing required fields.");
//     }

//     // Initialize timetable
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     // ✅ Organize teachers by subject for workload balancing
//     const teacherPool = {};
//     teachers.forEach(({ name, subject }) => {
//       if (!teacherPool[subject]) {
//         teacherPool[subject] = [];
//       }
//       teacherPool[subject].push(name);
//     });

//     // ✅ Helper function to get the next available teacher for a subject
//     const getNextTeacher = (() => {
//       const teacherIndex = {}; // Keep track of last assigned teacher for each subject
//       return (subject) => {
//         if (!teacherPool[subject] || teacherPool[subject].length === 0) {
//           throw new Error(`No teacher available for subject: ${subject}`);
//         }

//         if (!teacherIndex[subject]) {
//           teacherIndex[subject] = 0;
//         } else {
//           teacherIndex[subject] = (teacherIndex[subject] + 1) % teacherPool[subject].length;
//         }

//         return teacherPool[subject][teacherIndex[subject]];
//       };
//     })();

//     // ✅ Ensure subjects are assigned evenly across all classes
//     const subjectIndex = {}; // Track last assigned subject index for each class
//     totalClasses.forEach((className) => {
//       subjectIndex[className] = 0; // Initialize index for subject rotation
//     });

//     // ✅ Avoid overlapping teachers by tracking assignments
//     const teacherSchedule = {};

//     const assignSlot = (className, day, timeSlot) => {
//       let attempts = 0;
//       const maxAttempts = 10;
//       let subject, teacher, room;

//       while (attempts < maxAttempts) {
//         // Assign subjects one by one in a round-robin manner
//         subject = subjects[subjectIndex[className] % subjects.length].name;
//         teacher = getNextTeacher(subject);
//         room = rooms[Math.floor(Math.random() * rooms.length)];

//         // Avoid teacher overlap across multiple classes at the same time
//         if (!teacherSchedule[day]) teacherSchedule[day] = {};
//         if (!teacherSchedule[day][timeSlot]) teacherSchedule[day][timeSlot] = new Set();

//         if (!teacherSchedule[day][timeSlot].has(teacher)) {
//           // Assign teacher and update schedule
//           teacherSchedule[day][timeSlot].add(teacher);

//           // Move to the next subject for this class
//           subjectIndex[className] = (subjectIndex[className] + 1) % subjects.length;

//           return { subject, teacher, room };
//         }

//         attempts++;
//       }

//       throw new Error(`❌ Failed to assign slot for ${className} on ${day} at ${timeSlot} after ${maxAttempts} attempts.`);
//     };

//     // ✅ Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let day of workingDays) {
//       for (let className of totalClasses) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             const { subject, teacher, room } = assignSlot(className, day, timeSlot);
//             timetable[className][day].push({
//               subject,
//               teacher,
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
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports = generateTimeTableController;

// export default generateTimeTableController;

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
//       classTimes: classTimes || []
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };




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
