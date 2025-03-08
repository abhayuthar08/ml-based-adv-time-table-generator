import { createRequire } from "module";
const require = createRequire(import.meta.url);

const Timetable = require("../models/timetable.model");
const timetableService = require("../services/timetableService");
const mlService = require("../services/mlService");

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Temporary in-memory store for generated timetable
let generatedTimetable = {};

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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject, index) => {
//       if (!subject.name) {
//         throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       }
//       if (!subject.teachers?.length) {
//         throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       }
//       if (!subject.weeklyClasses) {
//         throw new Error(`❌ Subject "${subject.name}" is missing weekly classes.`);
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

//     console.log("✅ Teacher Workload Initialized:", JSON.stringify(teacherWorkload, null, 2));

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = 0;
//       });
//     });

//     console.log("✅ Subject Allocation Initialized:", JSON.stringify(subjectAllocation, null, 2));

//     // Track lab allocation to ensure each lab subject is assigned only once per batch
//     const labAllocation = {};
//     batches.forEach((batch) => {
//       labAllocation[batch] = {};
//       subjects.forEach((subject) => {
//         labAllocation[batch][subject.name] = 0;
//       });
//     });

//     console.log("✅ Lab Allocation Initialized:", JSON.stringify(labAllocation, null, 2));

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       try {
//         console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
//         let availableTeachers = teacherPool[subject] || [];
//         console.log("✅ Available Teachers:", availableTeachers);

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           return { subject, teacher: null, room: null };
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         const teacher = availableTeachers[0];

//         // Assign a random available room
//         const room = rooms[Math.floor(Math.random() * rooms.length)];

//         // Update teacher workload and subject allocation
//         teacherWorkload[teacher]++;
//         subjectAllocation[className][subject]++;

//         console.log(`✅ Assigned slot:`, { subject, teacher, room });
//         return { subject, teacher, room };
//       } catch (error) {
//         console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Function to assign a lab slot for a batch, day, and time
//     const assignLabSlot = (batch, day, timeSlot) => {
//       try {
//         console.log(`🔧 Assigning lab slot for batch ${batch} on ${day} at ${timeSlot}`);
//         const availableSubjects = subjects.filter(
//           (subject) => labAllocation[batch][subject.name] === 0
//         );
//         console.log("✅ Available Subjects:", availableSubjects);

//         if (availableSubjects.length === 0) {
//           console.error(`❌ No subjects available for lab session for batch: ${batch}`);
//           return { subject: "Extra Lab", teacher: null, lab: null };
//         }

//         // Assign a random available subject
//         const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//         // Mark the subject as assigned as a lab to this batch
//         labAllocation[batch][subject.name]++;

//         // Assign a random available lab location
//         const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//         console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
//         return { subject: subject.name, teacher: null, lab };
//       } catch (error) {
//         console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Assign regular classes
//         for (let i = 0; i < totalClassesPerDay - 1; i++) { // Reserve one slot for lab
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const availableSubjects = subjects.filter(
//               (subject) => subjectAllocation[className][subject.name] < subject.weeklyClasses
//             );

//             if (availableSubjects.length > 0) {
//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   type: "Class",
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
//           }
//         }

//         // Assign lab session
//         const labTimeSlot = classTimes[totalClassesPerDay - 1]; // Last slot is reserved for lab
//         const labSlots = [];

//         // Assign lab sessions for each batch
//         batches.forEach((batch) => {
//           try {
//             const labSlot = assignLabSlot(batch, day, labTimeSlot);
//             labSlots.push({
//               batch,
//               subject: labSlot.subject,
//               lab: labSlot.lab, // Use "lab" instead of "room"
//               time: labTimeSlot,
//             });
//           } catch (error) {
//             console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
//           }
//         });

//         // Add lab sessions to the timetable
//         timetable[className][day].push({
//           type: "Lab",
//           slots: labSlots,
//         });
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Store the generated timetable in memory
//     generatedTimetable = timetable;

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject, index) => {
//       if (!subject.name) {
//         throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       }
//       if (!subject.teachers?.length) {
//         throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       }
//       if (!subject.weeklyClasses) {
//         throw new Error(`❌ Subject "${subject.name}" is missing weekly classes.`);
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

//     console.log("✅ Teacher Workload Initialized:", JSON.stringify(teacherWorkload, null, 2));

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = 0;
//       });
//     });

//     console.log("✅ Subject Allocation Initialized:", JSON.stringify(subjectAllocation, null, 2));

//     // Track lab allocation to ensure each lab subject is assigned only once per batch per day
//     const labAllocation = {};
//     totalClasses.forEach((className) => {
//       labAllocation[className] = {};
//       workingDays.forEach((day) => {
//         labAllocation[className][day] = {};
//         batches.forEach((batch) => {
//           labAllocation[className][day][batch] = {};
//           subjects.forEach((subject) => {
//             labAllocation[className][day][batch][subject.name] = false; // Track if subject is assigned to this batch on this day
//           });
//         });
//       });
//     });

//     console.log("✅ Lab Allocation Initialized:", JSON.stringify(labAllocation, null, 2));

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       try {
//         console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
//         let availableTeachers = teacherPool[subject] || [];
//         console.log("✅ Available Teachers:", availableTeachers);

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           return { subject, teacher: null, room: null };
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         const teacher = availableTeachers[0];

//         // Assign a random available room
//         const room = rooms[Math.floor(Math.random() * rooms.length)];

//         // Update teacher workload and subject allocation
//         teacherWorkload[teacher]++;
//         subjectAllocation[className][subject]++;

//         console.log(`✅ Assigned slot:`, { subject, teacher, room });
//         return { subject, teacher, room };
//       } catch (error) {
//         console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Function to assign a lab slot for a batch, day, and time
//     const assignLabSlot = (className, day, batch, timeSlot) => {
//       try {
//         console.log(`🔧 Assigning lab slot for ${className} on ${day} at ${timeSlot} for batch: ${batch}`);
//         const availableSubjects = subjects.filter((subject) => {
//           // Check if the subject is not already assigned to any batch in this class on this day
//           return !Object.values(labAllocation[className][day]).some(
//             (batchAllocation) => batchAllocation[subject.name]
//           );
//         });

//         console.log("✅ Available Subjects:", availableSubjects);

//         if (availableSubjects.length === 0) {
//           console.error(`❌ No subjects available for lab session for batch: ${batch}`);
//           return { subject: "Extra Lab", teacher: null, lab: null };
//         }

//         // Assign a random available subject
//         const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//         // Mark the subject as assigned as a lab to this batch on this day
//         labAllocation[className][day][batch][subject.name] = true;

//         // Assign a random available lab location
//         const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//         console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
//         return { subject: subject.name, teacher: null, lab };
//       } catch (error) {
//         console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Assign regular classes
//         for (let i = 0; i < totalClassesPerDay - 1; i++) { // Reserve one slot for lab
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const availableSubjects = subjects.filter(
//               (subject) => subjectAllocation[className][subject.name] < subject.weeklyClasses
//             );

//             if (availableSubjects.length > 0) {
//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   type: "Class",
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
//           }
//         }

//         // Assign lab session
//         const labTimeSlot = classTimes[totalClassesPerDay - 1]; // Last slot is reserved for lab
//         const labSlots = [];

//         // Assign lab sessions for each batch
//         batches.forEach((batch) => {
//           try {
//             const labSlot = assignLabSlot(className, day, batch, labTimeSlot);
//             labSlots.push({
//               batch,
//               subject: labSlot.subject,
//               lab: labSlot.lab, // Use "lab" instead of "room"
//               time: labTimeSlot,
//             });
//           } catch (error) {
//             console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
//           }
//         });

//         // Add lab sessions to the timetable
//         timetable[className][day].push({
//           type: "Lab",
//           slots: labSlots,
//         });
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Store the generated timetable in memory
//     generatedTimetable = timetable;

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject, index) => {
//       if (!subject.name) {
//         throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       }
//       if (!subject.teachers?.length) {
//         throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       }
//       if (!subject.weeklyClasses) {
//         throw new Error(`❌ Subject "${subject.name}" is missing weekly classes.`);
//       }
//     });

//     // Assign a fixed classroom to each class
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Classroom Assignment:", JSON.stringify(classRoomAssignment, null, 2));

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

//     console.log("✅ Teacher Workload Initialized:", JSON.stringify(teacherWorkload, null, 2));

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = 0;
//       });
//     });

//     console.log("✅ Subject Allocation Initialized:", JSON.stringify(subjectAllocation, null, 2));

//     // Track lab allocation to ensure each lab subject is assigned only once per batch per day
//     const labAllocation = {};
//     totalClasses.forEach((className) => {
//       labAllocation[className] = {};
//       workingDays.forEach((day) => {
//         labAllocation[className][day] = {};
//         batches.forEach((batch) => {
//           labAllocation[className][day][batch] = {};
//           subjects.forEach((subject) => {
//             labAllocation[className][day][batch][subject.name] = false; // Track if subject is assigned to this batch on this day
//           });
//         });
//       });
//     });

//     console.log("✅ Lab Allocation Initialized:", JSON.stringify(labAllocation, null, 2));

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       try {
//         console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
//         let availableTeachers = teacherPool[subject] || [];
//         console.log("✅ Available Teachers:", availableTeachers);

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           return { subject, teacher: null, room: null };
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         const teacher = availableTeachers[0];

//         // Use the fixed classroom assigned to this class
//         const room = classRoomAssignment[className];

//         // Update teacher workload and subject allocation
//         teacherWorkload[teacher]++;
//         subjectAllocation[className][subject]++;

//         console.log(`✅ Assigned slot:`, { subject, teacher, room });
//         return { subject, teacher, room };
//       } catch (error) {
//         console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Function to assign a lab slot for a batch, day, and time
//     const assignLabSlot = (className, day, batch, timeSlot) => {
//       try {
//         console.log(`🔧 Assigning lab slot for ${className} on ${day} at ${timeSlot} for batch: ${batch}`);
//         const availableSubjects = subjects.filter((subject) => {
//           // Check if the subject is not already assigned to any batch in this class on this day
//           return !Object.values(labAllocation[className][day]).some(
//             (batchAllocation) => batchAllocation[subject.name]
//           );
//         });

//         console.log("✅ Available Subjects:", availableSubjects);

//         if (availableSubjects.length === 0) {
//           console.error(`❌ No subjects available for lab session for batch: ${batch}`);
//           return { subject: "Extra Lab", teacher: null, lab: null };
//         }

//         // Assign a random available subject
//         const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//         // Mark the subject as assigned as a lab to this batch on this day
//         labAllocation[className][day][batch][subject.name] = true;

//         // Assign a random available lab location
//         const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//         console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
//         return { subject: subject.name, teacher: null, lab };
//       } catch (error) {
//         console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Assign regular classes
//         for (let i = 0; i < totalClassesPerDay - 1; i++) { // Reserve one slot for lab
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const availableSubjects = subjects.filter(
//               (subject) => subjectAllocation[className][subject.name] < subject.weeklyClasses
//             );

//             if (availableSubjects.length > 0) {
//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   type: "Class",
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: classRoomAssignment[className], // Use the fixed classroom
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
//           }
//         }

//         // Assign lab session
//         const labTimeSlot = classTimes[totalClassesPerDay - 1]; // Last slot is reserved for lab
//         const labSlots = [];

//         // Assign lab sessions for each batch
//         batches.forEach((batch) => {
//           try {
//             const labSlot = assignLabSlot(className, day, batch, labTimeSlot);
//             labSlots.push({
//               batch,
//               subject: labSlot.subject,
//               lab: labSlot.lab, // Use "lab" instead of "room"
//               time: labTimeSlot,
//             });
//           } catch (error) {
//             console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
//           }
//         });

//         // Add lab sessions to the timetable
//         timetable[className][day].push({
//           type: "Lab",
//           slots: labSlots,
//         });
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Store the generated timetable in memory
//     generatedTimetable = timetable;

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject, index) => {
//       if (!subject.name) {
//         throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       }
//       if (!subject.teachers?.length) {
//         throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       }
//       if (!subject.weeklyClasses) {
//         throw new Error(`❌ Subject "${subject.name}" is missing weekly classes.`);
//       }
//     });

//     // Assign a fixed classroom to each class
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Classroom Assignment:", JSON.stringify(classRoomAssignment, null, 2));

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

//     console.log("✅ Teacher Workload Initialized:", JSON.stringify(teacherWorkload, null, 2));

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = 0;
//       });
//     });

//     console.log("✅ Subject Allocation Initialized:", JSON.stringify(subjectAllocation, null, 2));

//     // Track lab allocation to ensure each lab subject is assigned only once per batch per day
//     const labAllocation = {};
//     totalClasses.forEach((className) => {
//       labAllocation[className] = {};
//       workingDays.forEach((day) => {
//         labAllocation[className][day] = {};
//         batches.forEach((batch) => {
//           labAllocation[className][day][batch] = {};
//           subjects.forEach((subject) => {
//             labAllocation[className][day][batch][subject.name] = false; // Track if subject is assigned to this batch on this day
//           });
//         });
//       });
//     });

//     console.log("✅ Lab Allocation Initialized:", JSON.stringify(labAllocation, null, 2));

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       try {
//         console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
//         let availableTeachers = teacherPool[subject] || [];
//         console.log("✅ Available Teachers:", availableTeachers);

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           return { subject, teacher: null };
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         const teacher = availableTeachers[0];

//         // Update teacher workload and subject allocation
//         teacherWorkload[teacher]++;
//         subjectAllocation[className][subject]++;

//         console.log(`✅ Assigned slot:`, { subject, teacher });
//         return { subject, teacher };
//       } catch (error) {
//         console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Function to assign a lab slot for a batch, day, and time
//     const assignLabSlot = (className, day, batch, timeSlot) => {
//       try {
//         console.log(`🔧 Assigning lab slot for ${className} on ${day} at ${timeSlot} for batch: ${batch}`);
//         const availableSubjects = subjects.filter((subject) => {
//           // Check if the subject is not already assigned to any batch in this class on this day
//           return !Object.values(labAllocation[className][day]).some(
//             (batchAllocation) => batchAllocation[subject.name]
//           );
//         });

//         console.log("✅ Available Subjects:", availableSubjects);

//         if (availableSubjects.length === 0) {
//           console.error(`❌ No subjects available for lab session for batch: ${batch}`);
//           return { subject: "Extra Lab", teacher: null, lab: null };
//         }

//         // Assign a random available subject
//         const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//         // Mark the subject as assigned as a lab to this batch on this day
//         labAllocation[className][day][batch][subject.name] = true;

//         // Assign a random available lab location
//         const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//         console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
//         return { subject: subject.name, teacher: null, lab };
//       } catch (error) {
//         console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Assign regular classes
//         for (let i = 0; i < totalClassesPerDay - 1; i++) { // Reserve one slot for lab
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const availableSubjects = subjects.filter(
//               (subject) => subjectAllocation[className][subject.name] < subject.weeklyClasses
//             );

//             if (availableSubjects.length > 0) {
//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   type: "Class",
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
//           }
//         }

//         // Assign lab session
//         const labTimeSlot = classTimes[totalClassesPerDay - 1]; // Last slot is reserved for lab
//         const labSlots = [];

//         // Assign lab sessions for each batch
//         batches.forEach((batch) => {
//           try {
//             const labSlot = assignLabSlot(className, day, batch, labTimeSlot);
//             labSlots.push({
//               batch,
//               subject: labSlot.subject,
//               lab: labSlot.lab, // Use "lab" instead of "room"
//               time: labTimeSlot,
//             });
//           } catch (error) {
//             console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
//           }
//         });

//         // Add lab sessions to the timetable
//         timetable[className][day].push({
//           type: "Lab",
//           slots: labSlots,
//         });
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable along with the room assignments
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment, // Include room assignments in the response
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject, index) => {
//       if (!subject.name) {
//         throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       }
//       if (!subject.teachers?.length) {
//         throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       }
//       if (!subject.weeklyClasses) {
//         throw new Error(`❌ Subject "${subject.name}" is missing weekly classes.`);
//       }
//     });

//     // Assign a fixed classroom to each class
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Classroom Assignment:", JSON.stringify(classRoomAssignment, null, 2));

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

//     console.log("✅ Teacher Workload Initialized:", JSON.stringify(teacherWorkload, null, 2));

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = 0;
//       });
//     });

//     console.log("✅ Subject Allocation Initialized:", JSON.stringify(subjectAllocation, null, 2));

//     // Track lab allocation to ensure each lab subject is assigned only once per batch per day
//     const labAllocation = {};
//     totalClasses.forEach((className) => {
//       labAllocation[className] = {};
//       workingDays.forEach((day) => {
//         labAllocation[className][day] = {};
//         batches.forEach((batch) => {
//           labAllocation[className][day][batch] = {};
//           subjects.forEach((subject) => {
//             labAllocation[className][day][batch][subject.name] = false; // Track if subject is assigned to this batch on this day
//           });
//         });
//       });
//     });

//     console.log("✅ Lab Allocation Initialized:", JSON.stringify(labAllocation, null, 2));

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       try {
//         console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
//         let availableTeachers = teacherPool[subject] || [];
//         console.log("✅ Available Teachers:", availableTeachers);

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           return { subject, teacher: null };
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         const teacher = availableTeachers[0];

//         // Update teacher workload and subject allocation
//         teacherWorkload[teacher]++;
//         subjectAllocation[className][subject]++;

//         console.log(`✅ Assigned slot:`, { subject, teacher });
//         return { subject, teacher };
//       } catch (error) {
//         console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Function to assign a lab slot for a batch, day, and time
//     const assignLabSlot = (className, day, batch, timeSlot) => {
//       try {
//         console.log(`🔧 Assigning lab slot for ${className} on ${day} at ${timeSlot} for batch: ${batch}`);
//         const availableSubjects = subjects.filter((subject) => {
//           // Check if the subject is not already assigned to any batch in this class on this day
//           return !Object.values(labAllocation[className][day]).some(
//             (batchAllocation) => batchAllocation[subject.name]
//           );
//         });

//         console.log("✅ Available Subjects:", availableSubjects);

//         if (availableSubjects.length === 0) {
//           console.error(`❌ No subjects available for lab session for batch: ${batch}`);
//           return { subject: "Extra Lab", teacher: null, lab: null };
//         }

//         // Assign a random available subject
//         const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//         // Mark the subject as assigned as a lab to this batch on this day
//         labAllocation[className][day][batch][subject.name] = true;

//         // Assign a random available lab location
//         const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//         console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
//         return { subject: subject.name, teacher: null, lab };
//       } catch (error) {
//         console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Assign regular classes
//         for (let i = 0; i < totalClassesPerDay - 1; i++) { // Reserve one slot for lab
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const availableSubjects = subjects.filter(
//               (subject) => subjectAllocation[className][subject.name] < subject.weeklyClasses
//             );

//             if (availableSubjects.length > 0) {
//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   type: "Class",
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
//           }
//         }

//         // Assign lab session
//         const labTimeSlot = classTimes[totalClassesPerDay - 1]; // Last slot is reserved for lab
//         const labSlots = [];

//         // Assign lab sessions for each batch
//         batches.forEach((batch) => {
//           try {
//             const labSlot = assignLabSlot(className, day, batch, labTimeSlot);
//             labSlots.push({
//               batch,
//               subject: labSlot.subject,
//               lab: labSlot.lab, // Use "lab" instead of "room"
//               time: labTimeSlot,
//             });
//           } catch (error) {
//             console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
//           }
//         });

//         // Add lab sessions to the timetable
//         timetable[className][day].push({
//           type: "Lab",
//           slots: labSlots,
//         });
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable along with the room assignments
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment, // Include room assignments in the response
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
//   }
// };// up
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//     } = req.body;

//     // Validate required fields (unchanged)
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: subjectObj.name,
//               teacher: subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)],
//               time: timeSlot,
//             });
//             subjectObj.weeklyClasses--; // Reduce weekly classes count
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labTimeSlot = "Lab Timing"; // Fixed lab timing
//         const labSlots = batches.map((batch) => {
//           const availableSubjects = subjects.filter((subject) => subject.weeklyClasses > 0);
//           const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//           subjectObj.weeklyClasses--; // Reduce weekly classes count

//           return {
//             batch,
//             subject: subjectObj.name,
//             lab: labLocations[Math.floor(Math.random() * labLocations.length)],
//             time: labTimeSlot,
//           };
//         });

//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimeSlot,
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment: totalClasses.reduce((acc, className, index) => {
//         acc[className] = rooms[index % rooms.length];
//         return acc;
//       }, {}),
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings, // Add labTimings to the request body
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             const teacher = subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)];

//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: subjectObj.name,
//               teacher,
//               time: timeSlot,
//             });

//             subjectObj.weeklyClasses--; // Reduce weekly classes count
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labSlots = batches.map((batch) => {
//           const availableSubjects = subjects.filter((subject) => subject.weeklyClasses > 0);
//           const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//           const teacher = subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)];

//           subjectObj.weeklyClasses--; // Reduce weekly classes count

//           return {
//             batch,
//             subject: subjectObj.name,
//             teacher,
//             lab: labLocations[Math.floor(Math.random() * labLocations.length)],
//             time: labTimings[0], // Use the first lab timing
//           };
//         });

//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimings[0], // Use the first lab timing
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment: totalClasses.reduce((acc, className, index) => {
//         acc[className] = rooms[index % rooms.length];
//         return acc;
//       }, {}),
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
//   }
// };//final
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Track teacher availability
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
//       });
//     });

//     // Assign global rooms to classes
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Room Assignment:", JSON.stringify(classRoomAssignment, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             const availableTeachers = subjectObj.teachers.filter(
//               (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
//             );

//             if (availableTeachers.length > 0) {
//               const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: subjectObj.name,
//                 teacher,
//                 time: timeSlot,
//               });

//               // Mark teacher as unavailable for this time slot
//               teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//               subjectObj.weeklyClasses--; // Reduce weekly classes count
//             } else {
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labSlots = [];
//         const usedSubjects = new Set(); // Track subjects used in the current day

//         for (let batch of batches) {
//           // Filter subjects that haven't been used in the current day
//           const availableSubjects = subjects.filter(
//             (subject) => !usedSubjects.has(subject.name)
//           );

//           if (availableSubjects.length === 0) {
//             throw new Error("❌ Not enough subjects to allocate for labs.");
//           }

//           // Select the first available subject (or use a rotation mechanism)
//           const subjectObj = availableSubjects[0];
//           const availableTeachers = subjectObj.teachers.filter(
//             (teacher) => !teacherAvailability[teacher].has(`${day}-${labTimings[0]}`)
//           );

//           if (availableTeachers.length === 0) {
//             throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${labTimings[0]}.`);
//           }

//           const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//           // Add the subject to the used set
//           usedSubjects.add(subjectObj.name);

//           labSlots.push({
//             batch,
//             subject: subjectObj.name,
//             teacher,
//             lab: labLocations[Math.floor(Math.random() * labLocations.length)],
//             time: labTimings[0], // Use the first lab timing
//           });

//           // Mark teacher as unavailable for this time slot
//           teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           subjectObj.weeklyClasses--; // Reduce weekly classes count
//         }

//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimings[0], // Use the first lab timing
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment, // Include room assignment in the response
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
//   }
// }; //final2
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Track teacher availability
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
//       });
//     });

//     // Track subject usage for each batch across days
//     const batchSubjectUsage = {};
//     batches.forEach((batch) => {
//       batchSubjectUsage[batch] = new Set(); // Track subjects used by each batch
//     });

//     // Assign global rooms to classes
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Room Assignment:", JSON.stringify(classRoomAssignment, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             const availableTeachers = subjectObj.teachers.filter(
//               (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
//             );

//             if (availableTeachers.length > 0) {
//               const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: subjectObj.name,
//                 teacher,
//                 time: timeSlot,
//               });

//               // Mark teacher as unavailable for this time slot
//               teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//               subjectObj.weeklyClasses--; // Reduce weekly classes count
//             } else {
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labSlots = [];
//         const usedSubjects = new Set(); // Track subjects used in the current day

//         // Shuffle subjects to ensure randomness
//         const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);

//         for (let batch of batches) {
//           // Filter subjects that haven't been used in the current day for any batch
//           const availableSubjects = shuffledSubjects.filter(
//             (subject) =>
//               !usedSubjects.has(subject.name) && // Subject not used on this day
//               !batchSubjectUsage[batch].has(subject.name) // Subject not used by this batch
//           );

//           if (availableSubjects.length === 0) {
//             throw new Error("❌ Not enough subjects to allocate for labs.");
//           }

//           // Select the first available subject
//           const subjectObj = availableSubjects[0];
//           const availableTeachers = subjectObj.teachers.filter(
//             (teacher) => !teacherAvailability[teacher].has(`${day}-${labTimings[0]}`)
//           );

//           if (availableTeachers.length === 0) {
//             throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${labTimings[0]}.`);
//           }

//           const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//           // Add the subject to the used sets
//           usedSubjects.add(subjectObj.name);
//           batchSubjectUsage[batch].add(subjectObj.name);

//           labSlots.push({
//             batch,
//             subject: subjectObj.name,
//             teacher,
//             lab: labLocations[Math.floor(Math.random() * labLocations.length)],
//             time: labTimings[0], // Use the first lab timing
//           });

//           // Mark teacher as unavailable for this time slot
//           teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           subjectObj.weeklyClasses--; // Reduce weekly classes count
//         }

//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimings[0], // Use the first lab timing
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labTimes,
//       totalClasses,
//       subjects,
//       rooms,
//       labLocations,
//       totalClassesPerDay,
//       totalLabsPerDay,
//       batches,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!labTimes?.length) {
//       throw new Error("❌ Lab times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!totalLabsPerDay) {
//       throw new Error("❌ Total labs per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject, index) => {
//       if (!subject.name) {
//         throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       }
//       if (!subject.teachers?.length) {
//         throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       }
//       if (!subject.weeklyClasses) {
//         throw new Error(`❌ Subject "${subject.name}" is missing weekly classes.`);
//       }
//       if (!subject.weeklyLabs) {
//         throw new Error(`❌ Subject "${subject.name}" is missing weekly labs.`);
//       }
//     });

//     // Assign a fixed classroom to each class
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Classroom Assignment:", JSON.stringify(classRoomAssignment, null, 2));

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           labs: [],    // Lab sessions
//         };
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

//     console.log("✅ Teacher Workload Initialized:", JSON.stringify(teacherWorkload, null, 2));

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = {
//           classes: 0, // Track weekly classes
//           labs: 0,    // Track weekly labs
//         };
//       });
//     });

//     console.log("✅ Subject Allocation Initialized:", JSON.stringify(subjectAllocation, null, 2));

//     // Track lab allocation to ensure each lab subject is assigned only once per batch per day
//     const labAllocation = {};
//     totalClasses.forEach((className) => {
//       labAllocation[className] = {};
//       workingDays.forEach((day) => {
//         labAllocation[className][day] = {};
//         batches.forEach((batch) => {
//           labAllocation[className][day][batch] = {};
//           subjects.forEach((subject) => {
//             labAllocation[className][day][batch][subject.name] = false; // Track if subject is assigned to this batch on this day
//           });
//         });
//       });
//     });

//     console.log("✅ Lab Allocation Initialized:", JSON.stringify(labAllocation, null, 2));

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       try {
//         console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
//         let availableTeachers = teacherPool[subject] || [];
//         console.log("✅ Available Teachers:", availableTeachers);

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           return { subject, teacher: null };
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         const teacher = availableTeachers[0];

//         // Update teacher workload and subject allocation
//         teacherWorkload[teacher]++;
//         subjectAllocation[className][subject].classes++;

//         console.log(`✅ Assigned slot:`, { subject, teacher });
//         return { subject, teacher };
//       } catch (error) {
//         console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Function to assign a lab slot for a batch, day, and time
//     const assignLabSlot = (className, day, batch, timeSlot) => {
//       try {
//         console.log(`🔧 Assigning lab slot for ${className} on ${day} at ${timeSlot} for batch: ${batch}`);
//         const availableSubjects = subjects.filter((subject) => {
//           // Check if the subject is not already assigned to any batch in this class on this day
//           return !Object.values(labAllocation[className][day]).some(
//             (batchAllocation) => batchAllocation[subject.name]
//           );
//         });

//         console.log("✅ Available Subjects:", availableSubjects);

//         if (availableSubjects.length === 0) {
//           console.error(`❌ No subjects available for lab session for batch: ${batch}`);
//           return { subject: "Extra Lab", teacher: null, lab: null };
//         }

//         // Assign a random available subject
//         const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//         // Mark the subject as assigned as a lab to this batch on this day
//         labAllocation[className][day][batch][subject.name] = true;

//         // Assign a random available lab location
//         const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//         // Update subject allocation for labs
//         subjectAllocation[className][subject.name].labs++;

//         console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
//         return { subject: subject.name, teacher: null, lab };
//       } catch (error) {
//         console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Assign regular classes
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const availableSubjects = subjects.filter(
//               (subject) => subjectAllocation[className][subject.name].classes < subject.weeklyClasses
//             );

//             if (availableSubjects.length > 0) {
//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].classes.push({
//                   type: "Class",
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
//           }
//         }

//         // Assign lab sessions
//         for (let i = 0; i < totalLabsPerDay; i++) {
//           const labTimeSlot = labTimes[i % labTimes.length];

//           const labSlots = [];

//           // Assign lab sessions for each batch
//           batches.forEach((batch) => {
//             try {
//               const labSlot = assignLabSlot(className, day, batch, labTimeSlot);
//               labSlots.push({
//                 batch,
//                 subject: labSlot.subject,
//                 lab: labSlot.lab, // Use "lab" instead of "room"
//                 time: labTimeSlot,
//               });
//             } catch (error) {
//               console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
//               return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
//             }
//           });

//           // Add lab sessions to the timetable
//           timetable[className][day].labs.push({
//             type: "Lab",
//             slots: labSlots,
//           });
//         }
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable along with the room assignments
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment, // Include room assignments in the response
//       workingDays,
//       classTimes,
//       labTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     const classRoomAssignment = {}; // Track room assignments for classes
//     const labRoomAssignment = {}; // Track room assignments for labs

//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       classRoomAssignment[className] = rooms[Math.floor(Math.random() * rooms.length)]; // Assign a random room to the class
//       workingDays.forEach((day) => {
//         timetable[className][day] = [];
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       try {
//         console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
//         let availableTeachers = teacherPool[subject] || [];
//         console.log("✅ Available Teachers:", availableTeachers);

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           return { subject, teacher: null, room: null };
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         const teacher = availableTeachers[0];

//         // Assign a random available room
//         const room = rooms[Math.floor(Math.random() * rooms.length)];

//         // Update teacher workload and subject allocation
//         teacherWorkload[teacher]++;
//         subjectAllocation[className][subject]++;

//         console.log(`✅ Assigned slot:`, { subject, teacher, room });
//         return { subject, teacher, room };
//       } catch (error) {
//         console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Function to assign a lab slot for a batch, day, and time
//     const assignLabSlot = (className, day, batch, timeSlot) => {
//       try {
//         console.log(`🔧 Assigning lab slot for ${className} on ${day} at ${timeSlot} for batch: ${batch}`);
//         const availableSubjects = subjects.filter((subject) => {
//           // Check if the subject is not already assigned to any batch in this class on this day
//           return !Object.values(labAllocation[className][day]).some(
//             (batchAllocation) => batchAllocation[subject.name]
//           );
//         });

//         console.log("✅ Available Subjects:", availableSubjects);

//         if (availableSubjects.length === 0) {
//           console.error(`❌ No subjects available for lab session for batch: ${batch}`);
//           return { subject: "Extra Lab", teacher: null, lab: null };
//         }

//         // Assign a random available subject
//         const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//         // Mark the subject as assigned as a lab to this batch on this day
//         labAllocation[className][day][batch][subject.name] = true;

//         // Assign a random available lab location
//         const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//         // Track lab room assignment
//         labRoomAssignment[`${className}-${day}-${timeSlot}`] = lab;

//         console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
//         return { subject: subject.name, teacher: null, lab };
//       } catch (error) {
//         console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Assign regular classes
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           // Skip if the current time slot is reserved for lab sessions
//           if (labTimings.includes(timeSlot)) {
//             continue;
//           }

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const availableSubjects = subjects.filter(
//               (subject) => subjectAllocation[className][subject.name] < subject.weeklyClasses
//             );

//             if (availableSubjects.length > 0) {
//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   type: "Class",
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
//           }
//         }

//         // Assign lab sessions during lab timings
//         labTimings.forEach((labTimeSlot) => {
//           const labSlots = [];

//           // Assign lab sessions for each batch
//           batches.forEach((batch) => {
//             try {
//               const labSlot = assignLabSlot(className, day, batch, labTimeSlot);
//               labSlots.push({
//                 batch,
//                 subject: labSlot.subject,
//                 lab: labSlot.lab, // Use "lab" instead of "room"
//                 time: labTimeSlot,
//               });
//             } catch (error) {
//               console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
//               return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
//             }
//           });

//           // Add lab sessions to the timetable
//           timetable[className][day].push({
//             type: "Lab",
//             slots: labSlots,
//             time: labTimeSlot,
//           });
//         });
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//       classRoomAssignment,
//       labRoomAssignment,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings, // New field for lab timings
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Validate subjects
//     subjects.forEach((subject, index) => {
//       if (!subject.name) {
//         throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       }
//       if (!subject.teachers?.length) {
//         throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       }
//       if (!subject.weeklyClasses) {
//         throw new Error(`❌ Subject "${subject.name}" is missing weekly classes.`);
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

//     console.log("✅ Teacher Workload Initialized:", JSON.stringify(teacherWorkload, null, 2));

//     // Track subject allocation to ensure fair distribution
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = 0;
//       });
//     });

//     console.log("✅ Subject Allocation Initialized:", JSON.stringify(subjectAllocation, null, 2));

//     // Track lab allocation to ensure each lab subject is assigned only once per batch per day
//     const labAllocation = {};
//     totalClasses.forEach((className) => {
//       labAllocation[className] = {};
//       workingDays.forEach((day) => {
//         labAllocation[className][day] = {};
//         batches.forEach((batch) => {
//           labAllocation[className][day][batch] = {};
//           subjects.forEach((subject) => {
//             labAllocation[className][day][batch][subject.name] = false; // Track if subject is assigned to this batch on this day
//           });
//         });
//       });
//     });

//     console.log("✅ Lab Allocation Initialized:", JSON.stringify(labAllocation, null, 2));

//     // Function to assign a slot for a class, day, and time
//     const assignSlot = (className, day, timeSlot, subject) => {
//       try {
//         console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
//         let availableTeachers = teacherPool[subject] || [];
//         console.log("✅ Available Teachers:", availableTeachers);

//         if (availableTeachers.length === 0) {
//           console.error(`❌ No teachers available for subject: ${subject}`);
//           return { subject, teacher: null, room: null };
//         }

//         // Sort teachers by workload (assign teachers with the least workload first)
//         availableTeachers = availableTeachers.sort(
//           (a, b) => teacherWorkload[a] - teacherWorkload[b]
//         );

//         // Pick the teacher with the least workload
//         const teacher = availableTeachers[0];

//         // Assign a random available room
//         const room = rooms[Math.floor(Math.random() * rooms.length)];

//         // Update teacher workload and subject allocation
//         teacherWorkload[teacher]++;
//         subjectAllocation[className][subject]++;

//         console.log(`✅ Assigned slot:`, { subject, teacher, room });
//         return { subject, teacher, room };
//       } catch (error) {
//         console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Function to assign a lab slot for a batch, day, and time
//     const assignLabSlot = (className, day, batch, timeSlot) => {
//       try {
//         console.log(`🔧 Assigning lab slot for ${className} on ${day} at ${timeSlot} for batch: ${batch}`);
//         const availableSubjects = subjects.filter((subject) => {
//           // Check if the subject is not already assigned to any batch in this class on this day
//           return !Object.values(labAllocation[className][day]).some(
//             (batchAllocation) => batchAllocation[subject.name]
//           );
//         });

//         console.log("✅ Available Subjects:", availableSubjects);

//         if (availableSubjects.length === 0) {
//           console.error(`❌ No subjects available for lab session for batch: ${batch}`);
//           return { subject: "Extra Lab", teacher: null, lab: null };
//         }

//         // Assign a random available subject
//         const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//         // Mark the subject as assigned as a lab to this batch on this day
//         labAllocation[className][day][batch][subject.name] = true;

//         // Assign a random available lab location
//         const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//         console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
//         return { subject: subject.name, teacher: null, lab };
//       } catch (error) {
//         console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
//         throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
//       }
//     };

//     // Generate the timetable ensuring no teacher conflicts & fair distribution
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         // Assign regular classes
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           // Skip if the current time slot is reserved for lab sessions
//           if (labTimings.includes(timeSlot)) {
//             continue;
//           }

//           try {
//             // Find a subject that hasn't been assigned on this day yet
//             const availableSubjects = subjects.filter(
//               (subject) => subjectAllocation[className][subject.name] < subject.weeklyClasses
//             );

//             if (availableSubjects.length > 0) {
//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const slot = assignSlot(className, day, timeSlot, subjectObj.name);

//               if (slot) {
//                 timetable[className][day].push({
//                   type: "Class",
//                   subject: slot.subject,
//                   teacher: slot.teacher,
//                   room: slot.room,
//                   time: timeSlot,
//                 });
//               }
//             } else {
//               // All subjects have been assigned for this day, assign an extra class
//               timetable[className][day].push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: rooms[Math.floor(Math.random() * rooms.length)],
//                 time: timeSlot,
//               });
//             }
//           } catch (error) {
//             console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
//             return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
//           }
//         }

//         // Assign lab sessions during lab timings
//         labTimings.forEach((labTimeSlot) => {
//           const labSlots = [];

//           // Assign lab sessions for each batch
//           batches.forEach((batch) => {
//             try {
//               const labSlot = assignLabSlot(className, day, batch, labTimeSlot);
//               labSlots.push({
//                 batch,
//                 subject: labSlot.subject,
//                 lab: labSlot.lab, // Use "lab" instead of "room"
//                 time: labTimeSlot,
//               });
//             } catch (error) {
//               console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
//               return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
//             }
//           });

//           // Add lab sessions to the timetable
//           timetable[className][day].push({
//             type: "Lab",
//             slots: labSlots,
//           });
//         });
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Store the generated timetable in memory
//     generatedTimetable = timetable;

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       workingDays,
//       classTimes,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
//   }
// };




//part of the ga
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Chromosome Representation
//     class Chromosome {
//       constructor() {
//         this.genes = []; // Represents the timetable
//         this.fitness = 0; // Fitness score
//       }

//       // Generate a random timetable
//       generateRandom() {
//         for (let className of totalClasses) {
//           for (let day of workingDays) {
//             for (let i = 0; i < totalClassesPerDay; i++) {
//               const timeSlot = classTimes[i % classTimes.length];
//               const subjectObj = subjects[Math.floor(Math.random() * subjects.length)];
//               const teacher = subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)];
//               const room = rooms[Math.floor(Math.random() * rooms.length)];

//               this.genes.push({
//                 className,
//                 day,
//                 timeSlot,
//                 subject: subjectObj.name,
//                 teacher,
//                 room,
//                 type: "Class", // Regular class
//               });
//             }

//             // Generate lab sessions
//             const labSlots = [];
//             const usedSubjects = new Set();
//             for (let batch of batches) {
//               const availableSubjects = subjects.filter(
//                 (subject) => !usedSubjects.has(subject.name)
//               );
//               if (availableSubjects.length === 0) break;

//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const teacher = subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)];
//               const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//               labSlots.push({
//                 batch,
//                 subject: subjectObj.name,
//                 teacher,
//                 lab,
//                 time: labTimings[0], // Use the first lab timing
//               });

//               usedSubjects.add(subjectObj.name);
//             }

//             this.genes.push({
//               className,
//               day,
//               type: "Lab",
//               slots: labSlots,
//             });
//           }
//         }
//       }

//       // Calculate fitness based on constraints
//       calculateFitness() {
//         let fitness = 0;
//         const teacherAvailability = {};
//         const roomAvailability = {};
//         const batchSubjectUsage = {}; // Track subjects used by each batch
//         const daySubjectUsage = {}; // Track subjects used on each day

//         // Initialize trackers
//         batches.forEach((batch) => {
//           batchSubjectUsage[batch] = new Set();
//         });
//         workingDays.forEach((day) => {
//           daySubjectUsage[day] = new Set();
//         });

//         for (let gene of this.genes) {
//           const key = `${gene.day}-${gene.timeSlot}`;

//           // Check for teacher and room conflicts
//           if (!teacherAvailability[gene.teacher]) teacherAvailability[gene.teacher] = new Set();
//           if (!roomAvailability[gene.room]) roomAvailability[gene.room] = new Set();

//           if (!teacherAvailability[gene.teacher].has(key) && !roomAvailability[gene.room].has(key)) {
//             fitness += 1; // Reward for no conflicts
//             teacherAvailability[gene.teacher].add(key);
//             roomAvailability[gene.room].add(key);
//           } else {
//             fitness -= 10; // Penalize conflicts
//           }

//           // Check for batch subject repetition
//           if (gene.type === "Lab") {
//             gene.slots.forEach((slot) => {
//               if (batchSubjectUsage[slot.batch].has(slot.subject)) {
//                 fitness -= 5; // Penalize subject repetition for a batch
//               } else {
//                 batchSubjectUsage[slot.batch].add(slot.subject);
//                 fitness += 1; // Reward for unique subject
//               }

//               // Check for unique subjects per day
//               if (daySubjectUsage[gene.day].has(slot.subject)) {
//                 fitness -= 5; // Penalize duplicate subjects on the same day
//               } else {
//                 daySubjectUsage[gene.day].add(slot.subject);
//                 fitness += 1; // Reward for unique subject per day
//               }
//             });
//           }
//         }

//         this.fitness = fitness;
//       }
//     }

//     // Initialize Population
//     const populationSize = 50;
//     let population = [];
//     for (let i = 0; i < populationSize; i++) {
//       const chromosome = new Chromosome();
//       chromosome.generateRandom();
//       chromosome.calculateFitness();
//       population.push(chromosome);
//     }

//     // Genetic Algorithm
//     const generations = 100;
//     for (let generation = 0; generation < generations; generation++) {
//       // Selection (Elitism: Keep the top 10% of the population)
//       population.sort((a, b) => b.fitness - a.fitness);
//       const elites = population.slice(0, Math.floor(populationSize * 0.1));

//       // Crossover (Uniform Crossover)
//       const offspring = [];
//       for (let i = 0; i < populationSize - elites.length; i++) {
//         const parent1 = population[Math.floor(Math.random() * populationSize)];
//         const parent2 = population[Math.floor(Math.random() * populationSize)];
//         const child = new Chromosome();

//         // Uniform crossover: Randomly select genes from parents
//         for (let j = 0; j < parent1.genes.length; j++) {
//           child.genes.push(Math.random() < 0.5 ? parent1.genes[j] : parent2.genes[j]);
//         }

//         child.calculateFitness();
//         offspring.push(child);
//       }

//       // Mutation (Adaptive Mutation)
//       offspring.forEach((child) => {
//         if (Math.random() < 0.1) { // 10% mutation rate
//           const geneIndex = Math.floor(Math.random() * child.genes.length);
//           const gene = child.genes[geneIndex];

//           if (gene.type === "Class") {
//             gene.teacher = subjects.find((s) => s.name === gene.subject).teachers[
//               Math.floor(Math.random() * subjects.find((s) => s.name === gene.subject).teachers.length)
//             ];
//             gene.room = rooms[Math.floor(Math.random() * rooms.length)];
//           } else if (gene.type === "Lab") {
//             gene.slots.forEach((slot) => {
//               slot.teacher = subjects.find((s) => s.name === slot.subject).teachers[
//                 Math.floor(Math.random() * subjects.find((s) => s.name === slot.subject).teachers.length)
//               ];
//               slot.lab = labLocations[Math.floor(Math.random() * labLocations.length)];
//             });
//           }

//           child.calculateFitness();
//         }
//       });

//       // New Population
//       population = [...elites, ...offspring];
//     }

//     // Select the best timetable
//     population.sort((a, b) => b.fitness - a.fitness);
//     const bestTimetable = population[0];

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: bestTimetable.genes,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Chromosome Representation
//     class Chromosome {
//       constructor() {
//         this.genes = []; // Represents the timetable
//         this.fitness = 0; // Fitness score
//       }

//       // Generate a random timetable
//       generateRandom() {
//         for (let className of totalClasses) {
//           for (let day of workingDays) {
//             for (let i = 0; i < totalClassesPerDay; i++) {
//               const timeSlot = classTimes[i % classTimes.length];
//               const subjectObj = subjects[Math.floor(Math.random() * subjects.length)];
//               const teacher = subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)];
//               const room = rooms[Math.floor(Math.random() * rooms.length)];

//               this.genes.push({
//                 className,
//                 day,
//                 timeSlot,
//                 subject: subjectObj.name,
//                 teacher,
//                 room,
//                 type: "Class", // Regular class
//               });
//             }

//             // Generate lab sessions
//             const labSlots = [];
//             const usedSubjects = new Set();
//             for (let batch of batches) {
//               const availableSubjects = subjects.filter(
//                 (subject) => !usedSubjects.has(subject.name)
//               );
//               if (availableSubjects.length === 0) break;

//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const teacher = subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)];
//               const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//               labSlots.push({
//                 batch,
//                 subject: subjectObj.name,
//                 teacher,
//                 lab,
//                 time: labTimings[0], // Use the first lab timing
//               });

//               usedSubjects.add(subjectObj.name);
//             }

//             this.genes.push({
//               className,
//               day,
//               type: "Lab",
//               slots: labSlots,
//             });
//           }
//         }
//       }

//       // Calculate fitness based on constraints
//       calculateFitness() {
//         let fitness = 0;
//         const teacherAvailability = {};
//         const roomAvailability = {};
//         const batchSubjectUsage = {}; // Track subjects used by each batch
//         const daySubjectUsage = {}; // Track subjects used on each day

//         // Initialize trackers
//         batches.forEach((batch) => {
//           batchSubjectUsage[batch] = new Set();
//         });
//         workingDays.forEach((day) => {
//           daySubjectUsage[day] = new Set();
//         });

//         for (let gene of this.genes) {
//           const key = `${gene.day}-${gene.timeSlot}`;

//           // Check for teacher and room conflicts
//           if (!teacherAvailability[gene.teacher]) teacherAvailability[gene.teacher] = new Set();
//           if (!roomAvailability[gene.room]) roomAvailability[gene.room] = new Set();

//           if (!teacherAvailability[gene.teacher].has(key) && !roomAvailability[gene.room].has(key)) {
//             fitness += 1; // Reward for no conflicts
//             teacherAvailability[gene.teacher].add(key);
//             roomAvailability[gene.room].add(key);
//           } else {
//             fitness -= 10; // Penalize conflicts
//           }

//           // Check for batch subject repetition
//           if (gene.type === "Lab") {
//             gene.slots.forEach((slot) => {
//               if (batchSubjectUsage[slot.batch].has(slot.subject)) {
//                 fitness -= 5; // Penalize subject repetition for a batch
//               } else {
//                 batchSubjectUsage[slot.batch].add(slot.subject);
//                 fitness += 1; // Reward for unique subject
//               }

//               // Check for unique subjects per day
//               if (daySubjectUsage[gene.day].has(slot.subject)) {
//                 fitness -= 5; // Penalize duplicate subjects on the same day
//               } else {
//                 daySubjectUsage[gene.day].add(slot.subject);
//                 fitness += 1; // Reward for unique subject per day
//               }
//             });
//           }
//         }

//         this.fitness = fitness;
//       }
//     }

//     // Initialize Population
//     const populationSize = 50;
//     let population = [];
//     for (let i = 0; i < populationSize; i++) {
//       const chromosome = new Chromosome();
//       chromosome.generateRandom();
//       chromosome.calculateFitness();
//       population.push(chromosome);
//     }

//     // Genetic Algorithm
//     const generations = 100;
//     for (let generation = 0; generation < generations; generation++) {
//       // Selection (Elitism: Keep the top 10% of the population)
//       population.sort((a, b) => b.fitness - a.fitness);
//       const elites = population.slice(0, Math.floor(populationSize * 0.1));

//       // Crossover (Uniform Crossover)
//       const offspring = [];
//       for (let i = 0; i < populationSize - elites.length; i++) {
//         const parent1 = population[Math.floor(Math.random() * populationSize)];
//         const parent2 = population[Math.floor(Math.random() * populationSize)];
//         const child = new Chromosome();

//         // Uniform crossover: Randomly select genes from parents
//         for (let j = 0; j < parent1.genes.length; j++) {
//           child.genes.push(Math.random() < 0.5 ? parent1.genes[j] : parent2.genes[j]);
//         }

//         child.calculateFitness();
//         offspring.push(child);
//       }

//       // Mutation (Adaptive Mutation)
//       offspring.forEach((child) => {
//         if (Math.random() < 0.1) { // 10% mutation rate
//           const geneIndex = Math.floor(Math.random() * child.genes.length);
//           const gene = child.genes[geneIndex];

//           if (gene.type === "Class") {
//             gene.teacher = subjects.find((s) => s.name === gene.subject).teachers[
//               Math.floor(Math.random() * subjects.find((s) => s.name === gene.subject).teachers.length)
//             ];
//             gene.room = rooms[Math.floor(Math.random() * rooms.length)];
//           } else if (gene.type === "Lab") {
//             gene.slots.forEach((slot) => {
//               slot.teacher = subjects.find((s) => s.name === slot.subject).teachers[
//                 Math.floor(Math.random() * subjects.find((s) => s.name === slot.subject).teachers.length)
//               ];
//               slot.lab = labLocations[Math.floor(Math.random() * labLocations.length)];
//             });
//           }

//           child.calculateFitness();
//         }
//       });

//       // New Population
//       population = [...elites, ...offspring];
//     }

//     // Select the best timetable
//     population.sort((a, b) => b.fitness - a.fitness);
//     const bestTimetable = population[0];

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: bestTimetable.genes,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Chromosome Representation
//     class Chromosome {
//       constructor() {
//         this.genes = []; // Represents the timetable
//         this.fitness = 0; // Fitness score
//       }

//       // Generate a random timetable
//       generateRandom() {
//         for (let className of totalClasses) {
//           for (let day of workingDays) {
//             for (let i = 0; i < totalClassesPerDay; i++) {
//               const timeSlot = classTimes[i % classTimes.length];
//               const subjectObj = subjects[Math.floor(Math.random() * subjects.length)];
//               const teacher = subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)];
//               const room = rooms[Math.floor(Math.random() * rooms.length)];

//               this.genes.push({
//                 className,
//                 day,
//                 timeSlot,
//                 subject: subjectObj.name,
//                 teacher,
//                 room,
//                 type: "Class", // Regular class
//               });
//             }

//             // Generate lab sessions
//             const labSlots = [];
//             const usedSubjects = new Set();
//             for (let batch of batches) {
//               const availableSubjects = subjects.filter(
//                 (subject) => !usedSubjects.has(subject.name)
//               );
//               if (availableSubjects.length === 0) break;

//               const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//               const teacher = subjectObj.teachers[Math.floor(Math.random() * subjectObj.teachers.length)];
//               const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

//               labSlots.push({
//                 batch,
//                 subject: subjectObj.name,
//                 teacher,
//                 lab,
//                 time: labTimings[0], // Use the first lab timing
//               });

//               usedSubjects.add(subjectObj.name);
//             }

//             this.genes.push({
//               className,
//               day,
//               type: "Lab",
//               slots: labSlots,
//             });
//           }
//         }
//       }

//       // Calculate fitness based on constraints
//       calculateFitness() {
//         let fitness = 0;
//         const teacherAvailability = {};
//         const roomAvailability = {};
//         const batchSubjectUsage = {}; // Track subjects used by each batch
//         const daySubjectUsage = {}; // Track subjects used on each day

//         // Initialize trackers
//         batches.forEach((batch) => {
//           batchSubjectUsage[batch] = new Set();
//         });
//         workingDays.forEach((day) => {
//           daySubjectUsage[day] = new Set();
//         });

//         for (let gene of this.genes) {
//           const key = `${gene.day}-${gene.timeSlot}`;

//           // Check for teacher and room conflicts
//           if (!teacherAvailability[gene.teacher]) teacherAvailability[gene.teacher] = new Set();
//           if (!roomAvailability[gene.room]) roomAvailability[gene.room] = new Set();

//           if (!teacherAvailability[gene.teacher].has(key) && !roomAvailability[gene.room].has(key)) {
//             fitness += 1; // Reward for no conflicts
//             teacherAvailability[gene.teacher].add(key);
//             roomAvailability[gene.room].add(key);
//           } else {
//             fitness -= 10; // Penalize conflicts
//           }

//           // Check for batch subject repetition
//           if (gene.type === "Lab") {
//             gene.slots.forEach((slot) => {
//               if (batchSubjectUsage[slot.batch].has(slot.subject)) {
//                 fitness -= 5; // Penalize subject repetition for a batch
//               } else {
//                 batchSubjectUsage[slot.batch].add(slot.subject);
//                 fitness += 1; // Reward for unique subject
//               }

//               // Check for unique subjects per day
//               if (daySubjectUsage[gene.day].has(slot.subject)) {
//                 fitness -= 5; // Penalize duplicate subjects on the same day
//               } else {
//                 daySubjectUsage[gene.day].add(slot.subject);
//                 fitness += 1; // Reward for unique subject per day
//               }
//             });
//           }
//         }

//         this.fitness = fitness;
//       }
//     }

//     // Initialize Population
//     const populationSize = 50;
//     let population = [];
//     for (let i = 0; i < populationSize; i++) {
//       const chromosome = new Chromosome();
//       chromosome.generateRandom();
//       chromosome.calculateFitness();
//       population.push(chromosome);
//     }

//     // Genetic Algorithm
//     const generations = 100;
//     for (let generation = 0; generation < generations; generation++) {
//       // Selection (Elitism: Keep the top 10% of the population)
//       population.sort((a, b) => b.fitness - a.fitness);
//       const elites = population.slice(0, Math.floor(populationSize * 0.1));

//       // Crossover (Uniform Crossover)
//       const offspring = [];
//       for (let i = 0; i < populationSize - elites.length; i++) {
//         const parent1 = population[Math.floor(Math.random() * populationSize)];
//         const parent2 = population[Math.floor(Math.random() * populationSize)];
//         const child = new Chromosome();

//         // Uniform crossover: Randomly select genes from parents
//         for (let j = 0; j < parent1.genes.length; j++) {
//           child.genes.push(Math.random() < 0.5 ? parent1.genes[j] : parent2.genes[j]);
//         }

//         child.calculateFitness();
//         offspring.push(child);
//       }

//       // Mutation (Adaptive Mutation)
//       offspring.forEach((child) => {
//         if (Math.random() < 0.1) { // 10% mutation rate
//           const geneIndex = Math.floor(Math.random() * child.genes.length);
//           const gene = child.genes[geneIndex];

//           if (gene.type === "Class") {
//             gene.teacher = subjects.find((s) => s.name === gene.subject).teachers[
//               Math.floor(Math.random() * subjects.find((s) => s.name === gene.subject).teachers.length)
//             ];
//             gene.room = rooms[Math.floor(Math.random() * rooms.length)];
//           } else if (gene.type === "Lab") {
//             gene.slots.forEach((slot) => {
//               slot.teacher = subjects.find((s) => s.name === slot.subject).teachers[
//                 Math.floor(Math.random() * subjects.find((s) => s.name === slot.subject).teachers.length)
//               ];
//               slot.lab = labLocations[Math.floor(Math.random() * labLocations.length)];
//             });
//           }

//           child.calculateFitness();
//         }
//       });

//       // New Population
//       population = [...elites, ...offspring];
//     }

//     // Select the best timetable
//     population.sort((a, b) => b.fitness - a.fitness);
//     const bestTimetable = population[0];

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: bestTimetable.genes,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Track teacher availability
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
//       });
//     });

//     // Track subject usage for each batch across days
//     const batchSubjectUsage = {};
//     batches.forEach((batch) => {
//       batchSubjectUsage[batch] = new Set(); // Track subjects used by each batch
//     });

//     // Assign global rooms to classes
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Room Assignment:", JSON.stringify(classRoomAssignment, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             const availableTeachers = subjectObj.teachers.filter(
//               (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
//             );

//             if (availableTeachers.length > 0) {
//               const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: subjectObj.name,
//                 teacher,
//                 time: timeSlot,
//               });

//               // Mark teacher as unavailable for this time slot
//               teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//               subjectObj.weeklyClasses--; // Reduce weekly classes count
//             } else {
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labSlots = [];
//         const usedSubjects = new Set(); // Track subjects used in the current day

//         // Shuffle subjects to ensure randomness
//         const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);

//         for (let batch of batches) {
//           // Filter subjects that haven't been used in the current day for any batch
//           const availableSubjects = shuffledSubjects.filter(
//             (subject) =>
//               !usedSubjects.has(subject.name) && // Subject not used on this day
//               !batchSubjectUsage[batch].has(subject.name) // Subject not used by this batch
//           );

//           if (availableSubjects.length === 0) {
//             throw new Error("❌ Not enough subjects to allocate for labs.");
//           }

//           // Select the first available subject
//           const subjectObj = availableSubjects[0];
//           const availableTeachers = subjectObj.teachers.filter(
//             (teacher) => !teacherAvailability[teacher].has(`${day}-${labTimings[0]}`)
//           );

//           if (availableTeachers.length === 0) {
//             throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${labTimings[0]}.`);
//           }

//           const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//           // Add the subject to the used sets
//           usedSubjects.add(subjectObj.name);
//           batchSubjectUsage[batch].add(subjectObj.name);

//           labSlots.push({
//             batch,
//             subject: subjectObj.name,
//             teacher,
//             lab: labLocations[Math.floor(Math.random() * labLocations.length)],
//             time: labTimings[0], // Use the first lab timing
//           });

//           // Mark teacher as unavailable for this time slot
//           teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           subjectObj.weeklyClasses--; // Reduce weekly classes count
//         }

//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimings[0], // Use the first lab timing
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     const requiredFields = [
//       { field: collegeName, message: "College name is required." },
//       { field: branchName, message: "Branch name is required." },
//       { field: workingDays?.length, message: "Working days are required." },
//       { field: classTimes?.length, message: "Class times are required." },
//       { field: totalClasses?.length, message: "Total classes are required." },
//       { field: subjects?.length, message: "Subjects are required." },
//       { field: rooms?.length, message: "Rooms are required." },
//       { field: labLocations?.length, message: "Lab locations are required." },
//       { field: totalClassesPerDay, message: "Total classes per day are required." },
//       { field: batches?.length, message: "Batches are required." },
//       { field: labTimings?.length, message: "Lab timings are required." },
//     ];

//     for (const { field, message } of requiredFields) {
//       if (!field) {
//         throw new Error(`❌ ${message}`);
//       }
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Track teacher availability
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
//       });
//     });

//     console.log("✅ Teacher Availability Initialized:", JSON.stringify(teacherAvailability, null, 2));

//     // Track subject usage for each batch across days
//     const batchSubjectUsage = {};
//     batches.forEach((batch) => {
//       batchSubjectUsage[batch] = new Set(); // Track subjects used by each batch
//     });

//     console.log("✅ Batch Subject Usage Initialized:", JSON.stringify(batchSubjectUsage, null, 2));

//     // Assign global rooms to classes
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Room Assignment:", JSON.stringify(classRoomAssignment, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             const availableTeachers = subjectObj.teachers.filter(
//               (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
//             );

//             if (availableTeachers.length > 0) {
//               const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: subjectObj.name,
//                 teacher,
//                 time: timeSlot,
//               });

//               // Mark teacher as unavailable for this time slot
//               teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//               subjectObj.weeklyClasses--; // Reduce weekly classes count
//             } else {
//               console.warn(`⚠️ No available teachers for ${subjectObj.name} on ${day} at ${timeSlot}`);
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } else {
//             console.warn(`⚠️ No available subjects for ${className} on ${day} at ${timeSlot}`);
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     console.log("✅ Regular Classes Generated:", JSON.stringify(timetable, null, 2));

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labSlots = [];
//         const usedSubjects = new Set(); // Track subjects used in the current day

//         // Shuffle subjects to ensure randomness
//         const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);

//         for (let batch of batches) {
//           // Filter subjects that haven't been used in the current day for any batch
//           const availableSubjects = shuffledSubjects.filter(
//             (subject) =>
//               !usedSubjects.has(subject.name) && // Subject not used on this day
//               !batchSubjectUsage[batch].has(subject.name) // Subject not used by this batch
//           );

//           if (availableSubjects.length === 0) {
//             throw new Error("❌ Not enough subjects to allocate for labs.");
//           }

//           // Select the first available subject
//           const subjectObj = availableSubjects[0];
//           const availableTeachers = subjectObj.teachers.filter(
//             (teacher) => !teacherAvailability[teacher].has(`${day}-${labTimings[0]}`)
//           );

//           if (availableTeachers.length === 0) {
//             throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${labTimings[0]}.`);
//           }

//           const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//           // Add the subject to the used sets
//           usedSubjects.add(subjectObj.name);
//           batchSubjectUsage[batch].add(subjectObj.name);

//           labSlots.push({
//             batch,
//             subject: subjectObj.name,
//             teacher,
//             lab: labLocations[Math.floor(Math.random() * labLocations.length)],
//             time: labTimings[0], // Use the first lab timing
//           });

//           // Mark teacher as unavailable for this time slot
//           teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           subjectObj.weeklyClasses--; // Reduce weekly classes count
//         }

//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimings[0], // Use the first lab timing
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
      rooms,
      labLocations,
      totalClassesPerDay,
      batches,
      labTimings,
    } = req.body;

    // ✅ Validate required fields
    const requiredFields = [
      { field: collegeName, message: "College name is required." },
      { field: branchName, message: "Branch name is required." },
      { field: workingDays?.length, message: "Working days are required." },
      { field: classTimes?.length, message: "Class times are required." },
      { field: totalClasses?.length, message: "Total classes are required." },
      { field: subjects?.length, message: "Subjects are required." },
      { field: rooms?.length, message: "Rooms are required." },
      { field: labLocations?.length, message: "Lab locations are required." },
      { field: totalClassesPerDay, message: "Total classes per day are required." },
      { field: batches?.length, message: "Batches are required." },
      { field: labTimings?.length, message: "Lab timings are required." },
    ];

    for (const { field, message } of requiredFields) {
      if (!field) {
        throw new Error(`❌ ${message}`);
      }
    }

    console.log("✅ Request Data is Valid");

    // Initialize timetable structure
    const timetable = {};
    totalClasses.forEach((className) => {
      timetable[className] = {};
      workingDays.forEach((day) => {
        timetable[className][day] = {
          classes: [], // Regular classes
          lab: null, // Lab session
        };
      });
    });

    console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

    // Track teacher availability
    const teacherAvailability = {};
    subjects.forEach((subject) => {
      subject.teachers.forEach((teacher) => {
        teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
      });
    });

    console.log("✅ Teacher Availability Initialized:", JSON.stringify(teacherAvailability, null, 2));

    // Track subject usage for each batch across days
    const batchSubjectUsage = {};
    batches.forEach((batch) => {
      batchSubjectUsage[batch] = new Set(); // Track subjects used by each batch
    });

    console.log("✅ Batch Subject Usage Initialized:", JSON.stringify(batchSubjectUsage, null, 2));

    // Assign global rooms to classes
    const classRoomAssignment = {};
    totalClasses.forEach((className, index) => {
      classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
    });

    console.log("✅ Room Assignment:", JSON.stringify(classRoomAssignment, null, 2));

    // Generate regular classes
    for (let className of totalClasses) {
      for (let day of workingDays) {
        for (let i = 0; i < totalClassesPerDay; i++) {
          const timeSlot = classTimes[i % classTimes.length];
          const availableSubjects = subjects.filter(
            (subject) => subject.weeklyClasses > 0
          );

          if (availableSubjects.length > 0) {
            const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
            const availableTeachers = subjectObj.teachers.filter(
              (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
            );

            if (availableTeachers.length > 0) {
              const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

              timetable[className][day].classes.push({
                type: "Class",
                subject: subjectObj.name,
                teacher,
                time: timeSlot,
              });

              // Mark teacher as unavailable for this time slot
              teacherAvailability[teacher].add(`${day}-${timeSlot}`);
              subjectObj.weeklyClasses--; // Reduce weekly classes count
            } else {
              throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${timeSlot}`);
            }
          } else {
            throw new Error(`❌ No available subjects for ${className} on ${day} at ${timeSlot}`);
          }
        }
      }
    }

    console.log("✅ Regular Classes Generated:", JSON.stringify(timetable, null, 2));

    // Generate lab sessions
    for (let className of totalClasses) {
      for (let day of workingDays) {
        const labSlots = [];
        const usedSubjects = new Set(); // Track subjects used in the current day

        // Shuffle subjects to ensure randomness
        const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);

        for (let batch of batches) {
          // Filter subjects that haven't been used in the current day for any batch
          const availableSubjects = shuffledSubjects.filter(
            (subject) =>
              !usedSubjects.has(subject.name) && // Subject not used on this day
              !batchSubjectUsage[batch].has(subject.name) // Subject not used by this batch
          );

          if (availableSubjects.length === 0) {
            throw new Error(`❌ Not enough subjects to allocate for labs for ${batch} on ${day}`);
          }

          // Select the first available subject
          const subjectObj = availableSubjects[0];
          const availableTeachers = subjectObj.teachers.filter(
            (teacher) => !teacherAvailability[teacher].has(`${day}-${labTimings[0]}`)
          );

          if (availableTeachers.length === 0) {
            throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${labTimings[0]}`);
          }

          const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

          // Add the subject to the used sets
          usedSubjects.add(subjectObj.name);
          batchSubjectUsage[batch].add(subjectObj.name);

          labSlots.push({
            batch,
            subject: subjectObj.name,
            teacher,
            lab: labLocations[Math.floor(Math.random() * labLocations.length)],
            time: labTimings[0], // Use the first lab timing
          });

          // Mark teacher as unavailable for this time slot
          teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
          subjectObj.weeklyClasses--; // Reduce weekly classes count
        }

        timetable[className][day].lab = {
          type: "Lab",
          slots: labSlots,
          time: labTimings[0], // Use the first lab timing
        };
      }
    }

    console.log("✅ Timetable Successfully Generated");

    // Return the generated timetable
    return res.status(200).json({
      message: "✅ Timetable generated successfully!",
      timetable,
      classRoomAssignment,
      workingDays,
      classTimes,
      labTimings,
    });
  } catch (error) {
    console.error("❌ Error generating timetable:", error);

    // ✅ Return specific error messages
    if (error.message.includes("No available teachers")) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message.includes("No available subjects")) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message.includes("Not enough subjects")) {
      return res.status(400).json({ error: error.message });
    }

    // ✅ Handle generic errors
    return res.status(500).json({ error: "Internal Server Error while generating timetable." });
  }
};

// module.exports = generateTimeTableController;
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Track teacher availability
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
//       });
//     });

//     // Track subject usage for each batch across days
//     const batchSubjectUsage = {};
//     batches.forEach((batch) => {
//       batchSubjectUsage[batch] = new Set(); // Track subjects used by each batch
//     });

//     // Track lab locations used on each day
//     const labLocationUsage = {};
//     workingDays.forEach((day) => {
//       labLocationUsage[day] = new Set(); // Track lab locations used on each day
//     });

//     // Assign global rooms to classes
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Room Assignment:", JSON.stringify(classRoomAssignment, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             const availableTeachers = subjectObj.teachers.filter(
//               (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
//             );

//             if (availableTeachers.length > 0) {
//               const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: subjectObj.name,
//                 teacher,
//                 time: timeSlot,
//               });

//               // Mark teacher as unavailable for this time slot
//               teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//               subjectObj.weeklyClasses--; // Reduce weekly classes count
//             } else {
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labSlots = [];
//         const usedSubjects = new Set(); // Track subjects used in the current day

//         // Shuffle subjects to ensure randomness
//         const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);

//         for (let batch of batches) {
//           // Filter subjects that haven't been used in the current day for any batch
//           const availableSubjects = shuffledSubjects.filter(
//             (subject) =>
//               !usedSubjects.has(subject.name) && // Subject not used on this day
//               !batchSubjectUsage[batch].has(subject.name) // Subject not used by this batch
//           );

//           if (availableSubjects.length === 0) {
//             throw new Error("❌ Not enough subjects to allocate for labs.");
//           }

//           // Select the first available subject
//           const subjectObj = availableSubjects[0];
//           const availableTeachers = subjectObj.teachers.filter(
//             (teacher) => !teacherAvailability[teacher].has(`${day}-${labTimings[0]}`)
//           );

//           if (availableTeachers.length === 0) {
//             throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${labTimings[0]}.`);
//           }

//           const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//           // Find an available lab location
//           const availableLabLocations = labLocations.filter(
//             (lab) => !labLocationUsage[day].has(lab)
//           );

//           if (availableLabLocations.length === 0) {
//             throw new Error(`❌ No available lab locations on ${day}.`);
//           }

//           const lab = availableLabLocations[Math.floor(Math.random() * availableLabLocations.length)];

//           // Add the subject to the used sets
//           usedSubjects.add(subjectObj.name);
//           batchSubjectUsage[batch].add(subjectObj.name);
//           labLocationUsage[day].add(lab);

//           labSlots.push({
//             batch,
//             subject: subjectObj.name,
//             teacher, // Assign the teacher to the lab session
//             lab,
//             time: labTimings[0], // Use the first lab timing
//           });

//           // Mark teacher as unavailable for this time slot
//           teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           subjectObj.weeklyClasses--; // Reduce weekly classes count
//         }

//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimings[0], // Use the first lab timing
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Track teacher availability
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
//       });
//     });

//     // Track subject usage for each batch across days
//     const batchSubjectUsage = {};
//     batches.forEach((batch) => {
//       batchSubjectUsage[batch] = new Set(); // Track subjects used by each batch
//     });

//     // Track lab locations used on each day
//     const labLocationUsage = {};
//     workingDays.forEach((day) => {
//       labLocationUsage[day] = new Set(); // Track lab locations used on each day
//     });

//     // Assign global rooms to classes
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Room Assignment:", JSON.stringify(classRoomAssignment, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             const availableTeachers = subjectObj.teachers.filter(
//               (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
//             );

//             if (availableTeachers.length > 0) {
//               const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: subjectObj.name,
//                 teacher,
//                 time: timeSlot,
//               });

//               // Mark teacher as unavailable for this time slot
//               teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//               subjectObj.weeklyClasses--; // Reduce weekly classes count
//             } else {
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labSlots = [];
//         const usedSubjects = new Set(); // Track subjects used in the current day

//         // Shuffle subjects to ensure randomness
//         const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);

//         for (let batch of batches) {
//           // Filter subjects that haven't been used in the current day for any batch
//           const availableSubjects = shuffledSubjects.filter(
//             (subject) =>
//               !usedSubjects.has(subject.name) && // Subject not used on this day
//               !batchSubjectUsage[batch].has(subject.name) // Subject not used by this batch
//           );

//           if (availableSubjects.length === 0) {
//             throw new Error("❌ Not enough subjects to allocate for labs.");
//           }

//           // Select the first available subject
//           const subjectObj = availableSubjects[0];
//           const availableTeachers = subjectObj.teachers.filter(
//             (teacher) => !teacherAvailability[teacher].has(`${day}-${labTimings[0]}`)
//           );

//           if (availableTeachers.length === 0) {
//             throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${labTimings[0]}.`);
//           }

//           const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//           // Find an available lab location
//           const availableLabLocations = labLocations.filter(
//             (lab) => !labLocationUsage[day].has(lab)
//           );

//           if (availableLabLocations.length === 0) {
//             throw new Error(`❌ No available lab locations on ${day}.`);
//           }

//           const lab = availableLabLocations[Math.floor(Math.random() * availableLabLocations.length)];

//           // Add the subject to the used sets
//           usedSubjects.add(subjectObj.name);
//           batchSubjectUsage[batch].add(subjectObj.name);
//           labLocationUsage[day].add(lab);

//           labSlots.push({
//             batch,
//             subject: subjectObj.name,
//             teacher, // Assign the teacher to the lab session
//             lab,
//             time: labTimings[0], // Use the first lab timing
//           });

//           // Mark teacher as unavailable for this time slot
//           teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           subjectObj.weeklyClasses--; // Reduce weekly classes count
//         }

//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimings[0], // Use the first lab timing
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
//   }
// };
// export const generateTimeTableController = async (req, res) => {
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
//       labLocations,
//       totalClassesPerDay,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (!collegeName || !branchName) {
//       throw new Error("❌ College name and branch name are required.");
//     }
//     if (!workingDays?.length) {
//       throw new Error("❌ Working days are required.");
//     }
//     if (!classTimes?.length) {
//       throw new Error("❌ Class times are required.");
//     }
//     if (!totalClasses?.length) {
//       throw new Error("❌ Total classes are required.");
//     }
//     if (!subjects?.length) {
//       throw new Error("❌ Subjects are required.");
//     }
//     if (!rooms?.length) {
//       throw new Error("❌ Rooms are required.");
//     }
//     if (!labLocations?.length) {
//       throw new Error("❌ Lab locations are required.");
//     }
//     if (!totalClassesPerDay) {
//       throw new Error("❌ Total classes per day are required.");
//     }
//     if (!batches?.length) {
//       throw new Error("❌ Batches are required.");
//     }
//     if (!labTimings?.length) {
//       throw new Error("❌ Lab timings are required.");
//     }

//     console.log("✅ Request Data is Valid");

//     // Initialize timetable structure
//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized:", JSON.stringify(timetable, null, 2));

//     // Track teacher availability
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
//       });
//     });

//     // Track subject usage for each batch across days
//     const batchSubjectUsage = {};
//     batches.forEach((batch) => {
//       batchSubjectUsage[batch] = new Set(); // Track subjects used by each batch
//     });

//     // Track lab locations used on each day
//     const labLocationUsage = {};
//     workingDays.forEach((day) => {
//       labLocationUsage[day] = new Set(); // Track lab locations used on each day
//     });

//     // Assign global rooms to classes
//     const classRoomAssignment = {};
//     totalClasses.forEach((className, index) => {
//       classRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });

//     console.log("✅ Room Assignment:", JSON.stringify(classRoomAssignment, null, 2));

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0
//           );

//           if (availableSubjects.length > 0) {
//             const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
//             const availableTeachers = subjectObj.teachers.filter(
//               (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
//             );

//             if (availableTeachers.length > 0) {
//               const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: subjectObj.name,
//                 teacher,
//                 time: timeSlot,
//               });

//               // Mark teacher as unavailable for this time slot
//               teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//               subjectObj.weeklyClasses--; // Reduce weekly classes count
//             } else {
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     // Generate lab sessions
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const labSlots = [];
//         const usedSubjects = new Set(); // Track subjects used in the current day

//         // Shuffle subjects to ensure randomness
//         const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);

//         for (let batch of batches) {
//           // Filter subjects that haven't been used in the current day for any batch
//           const availableSubjects = shuffledSubjects.filter(
//             (subject) =>
//               !usedSubjects.has(subject.name) && // Subject not used on this day
//               !batchSubjectUsage[batch].has(subject.name) // Subject not used by this batch
//           );

//           if (availableSubjects.length === 0) {
//             throw new Error("❌ Not enough subjects to allocate for labs.");
//           }

//           // Select the first available subject
//           const subjectObj = availableSubjects[0];

//           // Find available teachers for this subject who are not already booked for this time slot
//           const availableTeachers = subjectObj.teachers.filter(
//             (teacher) => !teacherAvailability[teacher].has(`${day}-${labTimings[0]}`)
//           );

//           if (availableTeachers.length === 0) {
//             throw new Error(`❌ No available teachers for ${subjectObj.name} on ${day} at ${labTimings[0]}.`);
//           }

//           // Select a random available teacher
//           const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//           // Debugging: Log the assigned teacher
//           console.log(`✅ Assigned Teacher for Lab: ${teacher} (Subject: ${subjectObj.name}, Batch: ${batch}, Day: ${day}, Time: ${labTimings[0]})`);

//           // Find an available lab location
//           const availableLabLocations = labLocations.filter(
//             (lab) => !labLocationUsage[day].has(lab)
//           );

//           if (availableLabLocations.length === 0) {
//             throw new Error(`❌ No available lab locations on ${day}.`);
//           }

//           // Select a random available lab location
//           const lab = availableLabLocations[Math.floor(Math.random() * availableLabLocations.length)];

//           // Add the subject to the used sets
//           usedSubjects.add(subjectObj.name);
//           batchSubjectUsage[batch].add(subjectObj.name);
//           labLocationUsage[day].add(lab);

//           // Add the lab session to the timetable
//           labSlots.push({
//             batch,
//             subject: subjectObj.name,
//             teacher, // Assign the teacher to the lab session
//             lab,
//             time: labTimings[0], // Use the first lab timing
//           });

//           // Mark teacher as unavailable for this time slot
//           teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           subjectObj.weeklyClasses--; // Reduce weekly classes count
//         }

//         // Assign the lab sessions to the timetable
//         timetable[className][day].lab = {
//           type: "Lab",
//           slots: labSlots,
//           time: labTimings[0], // Use the first lab timing
//         };
//       }
//     }

//     console.log("✅ Timetable Successfully Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable,
//       classRoomAssignment,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
//   }
// };

// module.exports = { generateTimeTableController };


// module.exports = { generateTimeTableController };

export const getResultTimeTableController = async (req, res) => {
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
export const generateConflictFreeTimetable = async (req, res) => {
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

// module.exports = {
//   generateTimeTableController,
//   getResultTimeTableController,
//   generateConflictFreeTimetable,
// };
