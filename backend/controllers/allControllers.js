// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url);

// // const Timetable = require("../models/timetable.model");

// // import express from 'express';
// // import bodyParser from 'body-parser';

// // const app = express();

// // app.use(bodyParser.json());

// // let generatedTimetable = {};

// // export const generateTimeTableController = async (req, res) => {
// //   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

// //   try {
// //     const {
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       totalClasses,
// //       subjects,
// //       rooms,
// //       labLocations,
// //       totalClassesPerDay,
// //       batches,
// //       labTimings,
// //     } = req.body;

// //     if (
// //       !collegeName ||
// //       !branchName ||
// //       !workingDays?.length ||
// //       !totalClasses?.length ||
// //       !subjects?.length ||
// //       !classTimes?.length ||
// //       !rooms?.length ||
// //       !totalClassesPerDay ||
// //       !labLocations?.length ||
// //       !batches?.length ||
// //       !labTimings?.length
// //     ) {
// //       throw new Error("❌ Missing required fields.");
// //     }

// //     console.log("✅ Request Data is Valid");

// //     subjects.forEach((subject) => {
// //       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
// //         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
// //       }
// //     });

// //     const timetable = {};
// //     totalClasses.forEach((className) => {
// //       timetable[className] = {};
// //       workingDays.forEach((day) => {
// //         timetable[className][day] = {
// //           classes: [],
// //           lab: null,
// //         };
// //       });
// //     });

// //     console.log("✅ Timetable Structure Initialized");

// //     const teacherPool = {};
// //     subjects.forEach((subject) => {
// //       teacherPool[subject.name] = [...subject.teachers];
// //     });

// //     console.log("✅ Teacher Pool Initialized");

// //     const teacherWorkload = {};
// //     subjects.forEach((subject) => {
// //       subject.teachers.forEach((teacher) => {
// //         teacherWorkload[teacher] = 0;
// //       });
// //     });

// //     const assignSlot = (className, day, timeSlot, subject) => {
// //       let availableTeachers = teacherPool[subject] || [];
// //       availableTeachers = availableTeachers.filter(
// //         (teacher) =>
// //           !timetable[className][day].classes.some((cls) => cls.teacher === teacher)
// //       );
// //       if (availableTeachers.length === 0) {
// //         console.error(`❌ No teachers available for subject: ${subject}`);
// //         return null;
// //       }
// //       availableTeachers = availableTeachers.sort(
// //         (a, b) => teacherWorkload[a] - teacherWorkload[b]
// //       );
// //       const teacher = availableTeachers[0];
// //       const room = rooms[Math.floor(Math.random() * rooms.length)];
// //       teacherWorkload[teacher]++;
// //       return { subject, teacher, room, time: timeSlot };
// //     };

// //     totalClasses.forEach((className) => {
// //       const subjectAllocation = subjects.reduce((acc, subject) => {
// //         acc[subject.name] = subject.weeklyClasses;
// //         return acc;
// //       }, {});

// //       const availableSubjects = [...subjects];

// //       workingDays.forEach((day) => {
// //         const daySubjects = availableSubjects.sort(() => Math.random() - 0.5);
// //         const usedSubjects = new Set();

// //         for (let i = 0; i < totalClassesPerDay; i++) {
// //           let subject;
// //           let attempts = 0;

// //           while (attempts < 1000) { // Increased attempts to ensure accuracy
// //             subject = daySubjects.find(
// //               (subj) =>
// //                 subjectAllocation[subj.name] > 0 && !usedSubjects.has(subj.name)
// //             );

// //             if (subject) break;
// //             attempts++;
// //           }

// //           if (subject) {
// //             const timeSlot = classTimes[i];
// //             const slot = assignSlot(className, day, timeSlot, subject.name);
// //             if (slot && subjectAllocation[subject.name] > 0) {
// //               timetable[className][day].classes.push(slot);
// //               subjectAllocation[subject.name]--;
// //               usedSubjects.add(subject.name);
// //             }
// //           }
// //         }
// //       });
// //     });

// //     console.log("✅ Regular Classes Generated");

// //     // **Improved Lab Assignment Logic to Ensure Unique Distribution Per Class**
// //     const assignLabs = (timetable) => {
// //       const classWiseLabSubjects = {}; // Store unique lab distributions per class

// //       totalClasses.forEach((className) => {
// //         classWiseLabSubjects[className] = [...subjects].map((subject) => subject.name);
// //       });

// //       // Function to shuffle an array (Fisher-Yates shuffle)
// //       const shuffleArray = (array) => {
// //         for (let i = array.length - 1; i > 0; i--) {
// //           const j = Math.floor(Math.random() * (i + 1));
// //           [array[i], array[j]] = [array[j], array[i]];
// //         }
// //       };

// //       // Shuffle lab subjects for each class uniquely
// //       Object.keys(classWiseLabSubjects).forEach((className) =>
// //         shuffleArray(classWiseLabSubjects[className])
// //       );

// //       totalClasses.forEach((className) => {
// //         workingDays.forEach((day, dayIndex) => {
// //           const labSlots = [];
// //           const usedSubjects = new Set();
// //           let availableLabs = [...labLocations].sort(() => Math.random() - 0.5);
// //           let usedLabLocations = new Set(); // Track lab assignments to prevent conflicts

// //           batches.forEach((batch) => {
// //             let subjectIndex = (dayIndex + batches.indexOf(batch)) % subjects.length;
// //             let subject = classWiseLabSubjects[className][subjectIndex];

// //             // Ensure different subjects per class and avoid repetition
// //             while (usedSubjects.has(subject)) {
// //               shuffleArray(classWiseLabSubjects[className]);
// //               subject = classWiseLabSubjects[className][subjectIndex];
// //             }

// //             usedSubjects.add(subject);

// //             const subjectDetails = subjects.find((sub) => sub.name === subject);
// //             if (!subjectDetails) {
// //               throw new Error(`❌ Subject not found: ${subject}`);
// //             }

// //             const availableTeachers = subjectDetails.teachers;
// //             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

// //             let labLocation;
// //             let labAttempts = 0;

// //             while (labAttempts < 500) { // Increased lab selection attempts to avoid conflicts
// //               const tempLab = availableLabs[Math.floor(Math.random() * availableLabs.length)];
// //               if (!usedLabLocations.has(tempLab)) {
// //                 labLocation = tempLab;
// //                 usedLabLocations.add(tempLab);
// //                 break;
// //               }
// //               labAttempts++;
// //             }

// //             if (!labLocation) {
// //               console.error(`⚠️ No unique lab location found for ${subject} on ${day}`);
// //               labLocation = availableLabs[Math.floor(Math.random() * availableLabs.length)];
// //             }

// //             labSlots.push({
// //               batch,
// //               subject,
// //               teacher,
// //               lab: labLocation,
// //               time: labTimings[0],
// //             });
// //           });

// //           timetable[className][day].lab = {
// //             type: "Lab",
// //             slots: labSlots,
// //             time: labTimings[0],
// //           };
// //         });
// //       });

// //       return timetable;
// //     };

// //     // Generate labs
// //     const finalTimetable = assignLabs(timetable);

// //     console.log("✅ Labs Generated");

// //     return res.status(200).json({
// //       message: "✅ Timetable generated successfully!",
// //       timetable: finalTimetable,
// //       workingDays,
// //       classTimes,
// //       labTimings,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error generating timetable:", error);
// //     return res.status(500).json({ error: error.message });
// //   }
// // };



// // export const getResultTimeTableController = async (req, res) => {
// //   try {
// //     if (!generatedTimetable || Object.keys(generatedTimetable).length === 0) {
// //       return res.status(404).json({ error: "❌ Timetable not found. Please generate it first." });
// //     }
// //     return res.status(200).json(generatedTimetable);
// //   } catch (error) {
// //     console.error("❌ Error fetching timetable:", error);
// //     res.status(500).json({ error: "❌ Failed to fetch timetable." });
// //   }
// // };

// // // 📌 Generate Conflict-Free Timetable Using Machine Learning
// // export const generateConflictFreeTimetable = async (req, res) => {
// //   try {
// //     const inputData = req.body;

// //     if (!inputData.collegeName || !inputData.branchName || !inputData.workingDays) {
// //       return res.status(400).json({ message: "❌ Missing required fields in input data" });
// //     }

// //     // Transform input for ML processing
// //     const transformedData = timetableService.transformDataForML(inputData);

// //     // Generate timetable using ML
// //     const conflictFreeTimetable = await mlService.generateTimetable(transformedData);

// //     // Save timetable in database
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

// //     generatedTimetable = conflictFreeTimetable; // Store in memory for quick retrieval

// //     res.status(200).json({
// //       message: "✅ Conflict-free timetable generated successfully",
// //       timetable: conflictFreeTimetable,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error generating conflict-free timetable:", error);
// //     res.status(500).json({
// //       error: "❌ Failed to generate conflict-free timetable",
// //       message: error.message,
// //     });
// //   }
// // };

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const Timetable = require("../models/timetable.model");

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
//       labLocations = [],
//       totalClassesPerDay,
//       batches = [],
//       labTimings = [],
//       includeLabs = false
//     } = req.body;

//     // ======================
//     // 1. VALIDATION PHASE
//     // ======================
//     const errors = [];
//     if (!collegeName) errors.push("College name is required");
//     if (!branchName) errors.push("Branch name is required");
//     if (!workingDays?.length) errors.push("Working days are required");
//     if (!classTimes?.length) errors.push("Class times are required");
//     if (!totalClasses?.length) errors.push("Total classes are required");
//     if (!subjects?.length) errors.push("Subjects are required");
//     if (!rooms?.length) errors.push("Rooms are required");
//     if (!totalClassesPerDay) errors.push("Total classes per day is required");

//     // Teacher validation
//     const teacherPool = new Set();
//     subjects.forEach(subject => {
//       if (!subject.teachers?.length) {
//         errors.push(`Subject "${subject.name}" has no teachers assigned`);
//       } else {
//         subject.teachers.forEach(teacher => teacherPool.add(teacher));
//       }
//     });

//     // Room validation
//     if (rooms.length < totalClasses.length) {
//       errors.push(`Need ${totalClasses.length} rooms (only ${rooms.length} provided)`);
//     }

//     // Lab validation (if enabled)
//     if (includeLabs) {
//       if (!batches.length) errors.push("No batches provided for lab sessions");
//       if (!labLocations.length) errors.push("No lab locations provided");
//       if (labLocations.length < batches.length) {
//         errors.push(`Need ${batches.length} lab locations (only ${labLocations.length} provided)`);
//       }
//       if (!labTimings.length) errors.push("No lab timings provided");
//     }

//     if (errors.length > 0) {
//       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
//     }

//     // ======================
//     // 2. INITIALIZATION
//     // ======================
//     const timetable = {};
//     const roomAssignments = {}; // { day: { time: Set<room> } }
//     workingDays.forEach(day => {
//       roomAssignments[day] = {};
//       classTimes.forEach(time => {
//         roomAssignments[day][time] = new Set();
//       });
//     });

//     // Initialize timetable structure
//     totalClasses.forEach(className => {
//       timetable[className] = {};
//       workingDays.forEach(day => {
//         timetable[className][day] = {
//           classes: [],
//           lab: null
//         };
//       });
//     });

//     // Teacher tracking
//     const teacherWorkload = {};
//     const teacherAvailability = {};
//     subjects.forEach(subject => {
//       subject.teachers.forEach(teacher => {
//         teacherWorkload[teacher] = 0;
//         teacherAvailability[teacher] = {};
//         workingDays.forEach(day => {
//           teacherAvailability[teacher][day] = new Set();
//         });
//       });
//     });

//     // ======================
//     // 3. CORE SCHEDULING LOGIC
//     // ======================
//     const assignSlot = (className, day, timeSlot, subject) => {
//       const subjectData = subjects.find(s => s.name === subject);
//       if (!subjectData) return null;

//       // Get available teachers
//       const availableTeachers = subjectData.teachers.filter(teacher => 
//         !teacherAvailability[teacher][day].has(timeSlot)
//       );
//       if (availableTeachers.length === 0) return null;

//       // Get available rooms
//       const availableRooms = rooms.filter(room => 
//         !roomAssignments[day][timeSlot].has(room)
//       );
//       if (availableRooms.length === 0) return null;

//       // Select least busy teacher and first available room
//       const teacher = availableTeachers.sort((a, b) => 
//         teacherWorkload[a] - teacherWorkload[b]
//       )[0];
//       const room = availableRooms[0];

//       // Update trackers
//       teacherWorkload[teacher]++;
//       teacherAvailability[teacher][day].add(timeSlot);
//       roomAssignments[day][timeSlot].add(room);

//       return {
//         subject,
//         teacher,
//         room, // Now guaranteed to have a room
//         time: timeSlot
//       };
//     };

//     // Generate regular classes
//     totalClasses.forEach(className => {
//       const subjectAllocation = {};
//       subjects.forEach(subject => {
//         subjectAllocation[subject.name] = subject.weeklyClasses;
//       });

//       workingDays.forEach(day => {
//         const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);
        
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i];
//           let slotAssigned = false;

//           // Try all subjects until we find one that fits
//           for (const subject of shuffledSubjects) {
//             if (subjectAllocation[subject.name] > 0) {
//               const slot = assignSlot(className, day, timeSlot, subject.name);
//               if (slot) {
//                 timetable[className][day].classes.push(slot);
//                 subjectAllocation[subject.name]--;
//                 slotAssigned = true;
//                 break;
//               }
//             }
//           }

//           if (!slotAssigned) {
//             throw new Error(`Could not assign any subject to ${className} on ${day} at ${timeSlot}`);
//           }
//         }
//       });
//     });

//     // ======================
//     // 4. LAB SESSION SCHEDULING
//     // ======================
//     if (includeLabs) {
//       const labLocationUsage = {};
//       workingDays.forEach(day => {
//         labLocationUsage[day] = new Set();
//       });

//       totalClasses.forEach(className => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

//           batches.forEach((batch, batchIndex) => {
//             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
//             const subject = subjects[subjectIndex].name;
//             const subjectTeachers = subjects[subjectIndex].teachers;

//             // Find available teacher
//             const availableTeachers = subjectTeachers.filter(teacher => 
//               !teacherAvailability[teacher][day].has(labTimings[0])
//             );
//             if (availableTeachers.length === 0) {
//               throw new Error(`No teachers available for ${subject} lab on ${day}`);
//             }

//             // Find available lab location
//             let labLocation = null;
//             for (const lab of availableLabs) {
//               if (!labLocationUsage[day].has(lab)) {
//                 labLocation = lab;
//                 break;
//               }
//             }
//             if (!labLocation) {
//               throw new Error(`No lab location available for ${subject} on ${day}`);
//             }

//             // Select least busy teacher
//             const teacher = availableTeachers.sort((a, b) => 
//               teacherWorkload[a] - teacherWorkload[b]
//             )[0];

//             // Update trackers
//             teacherWorkload[teacher]++;
//             teacherAvailability[teacher][day].add(labTimings[0]);
//             labLocationUsage[day].add(labLocation);

//             labSlots.push({
//               batch,
//               subject,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//               isLab: true
//             });
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0]
//           };
//         });
//       });
//     }

//     // ======================
//     // 5. FINAL VALIDATION
//     // ======================
//     const validateRoomAssignments = () => {
//       const roomUsage = {};
//       let errors = [];

//       workingDays.forEach(day => {
//         roomUsage[day] = {};
//         classTimes.forEach(time => {
//           roomUsage[day][time] = new Set();
//         });
//       });

//       totalClasses.forEach(className => {
//         workingDays.forEach(day => {
//           timetable[className][day].classes.forEach(cls => {
//             if (!cls.room) {
//               errors.push(`❌ ${className} on ${day} at ${cls.time} has no room assigned`);
//             } else if (roomUsage[day][cls.time].has(cls.room)) {
//               errors.push(`❌ Room ${cls.room} double booked on ${day} at ${cls.time}`);
//             } else {
//               roomUsage[day][cls.time].add(cls.room);
//             }
//           });
//         });
//       });

//       return errors;
//     };

//     const validationErrors = validateRoomAssignments();
//     if (validationErrors.length > 0) {
//       throw new Error(`FINAL VALIDATION FAILED:\n${validationErrors.join("\n")}`);
//     }

//     // ======================
//     // 6. SAVE AND RETURN
//     // ======================
//     const result = {
//       collegeName,
//       branchName,
//       workingDays,
//       classTimes,
//       labTimings: includeLabs ? labTimings : [],
//       timetable,
//       metadata: {
//         generatedAt: new Date(),
//         version: 1,
//         stats: {
//           totalClasses: totalClasses.length,
//           totalRoomsUsed: rooms.length,
//           totalTeachers: teacherPool.size,
//           includesLabs: includeLabs
//         }
//       }
//     };

//     // Save to database
//     const newTimetable = new Timetable(result);
//     await newTimetable.save();

//     return res.status(200).json({
//       success: true,
//       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
//       ...result
//     });

//   } catch (error) {
//     console.error("❌ Generation failed:", error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//       suggestion: error.message.includes("room") ? 
//         "Add more rooms or reduce number of concurrent classes" :
//         error.message.includes("teacher") ?
//         "Add more teachers or adjust subject allocations" :
//         "Please check all input parameters"
//     });
//   }
// };

// // Keep unchanged
// export const getResultTimeTableController = async (req, res) => {
//   try {
//     const timetables = await Timetable.find().sort({ createdAt: -1 });
//     res.status(200).json(timetables);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch timetables" });
//   }
// };

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Timetable = require("../models/timetable.model");

export const generateTimeTableController = async (req, res) => {
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
      labLocations = [],
      totalClassesPerDay,
      batches = [],
      labTimings = [],
      includeLabs = false
    } = req.body;

    // ======================
    // 1. VALIDATION PHASE
    // ======================
    const errors = [];
    if (!collegeName) errors.push("College name is required");
    if (!branchName) errors.push("Branch name is required");
    if (!workingDays?.length) errors.push("Working days are required");
    if (!classTimes?.length) errors.push("Class times are required");
    if (!totalClasses?.length) errors.push("Total classes are required");
    if (!subjects?.length) errors.push("Subjects are required");
    if (!rooms?.length) errors.push("Rooms are required");
    if (!totalClassesPerDay) errors.push("Total classes per day is required");

    // Teacher validation
    const teacherPool = new Set();
    subjects.forEach(subject => {
      if (!subject.teachers?.length) {
        errors.push(`Subject "${subject.name}" has no teachers assigned`);
      } else {
        subject.teachers.forEach(teacher => teacherPool.add(teacher));
      }
    });

    // Room validation
    if (rooms.length < totalClasses.length) {
      errors.push(`Need ${totalClasses.length} rooms (only ${rooms.length} provided)`);
    }

    // Lab validation (if enabled)
    if (includeLabs) {
      if (!batches.length) errors.push("No batches provided for lab sessions");
      if (!labLocations.length) errors.push("No lab locations provided");
      if (labLocations.length < batches.length) {
        errors.push(`Need ${batches.length} lab locations (only ${labLocations.length} provided)`);
      }
      if (!labTimings.length) errors.push("No lab timings provided");
    }

    if (errors.length > 0) {
      throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
    }

    // ======================
    // 2. INITIALIZATION
    // ======================
    const timetable = {};
    const roomAssignments = {}; // { day: { time: Set<room> } }
    workingDays.forEach(day => {
      roomAssignments[day] = {};
      classTimes.forEach(time => {
        roomAssignments[day][time] = new Set();
      });
    });

    // Initialize timetable structure
    totalClasses.forEach(className => {
      timetable[className] = {};
      workingDays.forEach(day => {
        timetable[className][day] = {
          classes: [],
          lab: null
        };
      });
    });

    // Teacher tracking
    const teacherWorkload = {};
    const teacherAvailability = {};
    subjects.forEach(subject => {
      subject.teachers.forEach(teacher => {
        teacherWorkload[teacher] = 0;
        teacherAvailability[teacher] = {};
        workingDays.forEach(day => {
          teacherAvailability[teacher][day] = new Set();
        });
      });
    });

    // ======================
    // 3. CORE SCHEDULING LOGIC
    // ======================
    const assignSlot = (className, day, timeSlot, subject) => {
      const subjectData = subjects.find(s => s.name === subject);
      if (!subjectData) return null;

      // Get available teachers
      const availableTeachers = subjectData.teachers.filter(teacher => 
        !teacherAvailability[teacher][day].has(timeSlot)
      );
      if (availableTeachers.length === 0) return null;

      // Get available rooms
      const availableRooms = rooms.filter(room => 
        !roomAssignments[day][timeSlot].has(room)
      );
      if (availableRooms.length === 0) return null;

      // Select least busy teacher and first available room
      const teacher = availableTeachers.sort((a, b) => 
        teacherWorkload[a] - teacherWorkload[b]
      )[0];
      const room = availableRooms[0];

      // Update trackers
      teacherWorkload[teacher]++;
      teacherAvailability[teacher][day].add(timeSlot);
      roomAssignments[day][timeSlot].add(room);

      return {
        subject,
        teacher,
        room,
        time: timeSlot
      };
    };

    // Generate regular classes with subject rotation
    totalClasses.forEach(className => {
      // Create a subject rotation plan for the week
      const subjectRotation = [];
      const subjectPool = [...subjects];
      
      // Distribute subjects evenly across days
      for (let i = 0; i < workingDays.length; i++) {
        const daySubjects = [];
        const subjectsPerDay = Math.ceil(subjects.length / workingDays.length);
        
        for (let j = 0; j < subjectsPerDay; j++) {
          const subjectIndex = (i + j) % subjectPool.length;
          daySubjects.push(subjectPool[subjectIndex].name);
        }
        
        subjectRotation.push(daySubjects);
      }

      workingDays.forEach((day, dayIndex) => {
        const daySubjects = subjectRotation[dayIndex % subjectRotation.length];
        const shuffledSubjects = [...daySubjects].sort(() => Math.random() - 0.5);
        const usedSubjects = new Set();

        for (let i = 0; i < totalClassesPerDay; i++) {
          const timeSlot = classTimes[i];
          let slotAssigned = false;

          // Try preferred subjects first
          for (const subject of shuffledSubjects) {
            if (!usedSubjects.has(subject)) {
              const slot = assignSlot(className, day, timeSlot, subject);
              if (slot) {
                timetable[className][day].classes.push(slot);
                usedSubjects.add(subject);
                slotAssigned = true;
                break;
              }
            }
          }

          // Fallback to any available subject
          if (!slotAssigned) {
            const fallbackSubject = subjects.find(s => 
              !usedSubjects.has(s.name)
            );
            if (fallbackSubject) {
              const slot = assignSlot(className, day, timeSlot, fallbackSubject.name);
              if (slot) {
                timetable[className][day].classes.push(slot);
                usedSubjects.add(fallbackSubject.name);
              }
            }
          }
        }
      });
    });

    // ======================
    // 4. LAB SESSION SCHEDULING
    // ======================
    if (includeLabs) {
      const labLocationUsage = {};
      workingDays.forEach(day => {
        labLocationUsage[day] = new Set();
      });

      totalClasses.forEach(className => {
        workingDays.forEach((day, dayIndex) => {
          const labSlots = [];
          const availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

          // Rotate lab subjects through batches
          batches.forEach((batch, batchIndex) => {
            const subjectIndex = (dayIndex + batchIndex) % subjects.length;
            const subject = subjects[subjectIndex].name;
            const subjectTeachers = subjects[subjectIndex].teachers;

            // Find available teacher
            const availableTeachers = subjectTeachers.filter(teacher => 
              !teacherAvailability[teacher][day].has(labTimings[0])
            );
            if (availableTeachers.length === 0) {
              throw new Error(`No teachers available for ${subject} lab on ${day}`);
            }

            // Find available lab location
            let labLocation = null;
            for (const lab of availableLabs) {
              if (!labLocationUsage[day].has(lab)) {
                labLocation = lab;
                break;
              }
            }
            if (!labLocation) {
              throw new Error(`No lab location available for ${subject} on ${day}`);
            }

            // Select least busy teacher
            const teacher = availableTeachers.sort((a, b) => 
              teacherWorkload[a] - teacherWorkload[b]
            )[0];

            // Update trackers
            teacherWorkload[teacher]++;
            teacherAvailability[teacher][day].add(labTimings[0]);
            labLocationUsage[day].add(labLocation);

            labSlots.push({
              batch,
              subject,
              teacher,
              lab: labLocation,
              time: labTimings[0],
              isLab: true
            });
          });

          timetable[className][day].lab = {
            type: "Lab",
            slots: labSlots,
            time: labTimings[0]
          };
        });
      });
    }

    // ======================
    // 5. FINAL VALIDATION
    // ======================
    const validateTimetable = () => {
      const conflicts = [];
      const teacherTracker = {};
      const roomTracker = {};

      workingDays.forEach(day => {
        teacherTracker[day] = {};
        roomTracker[day] = {};
        classTimes.forEach(time => {
          teacherTracker[day][time] = new Set();
          roomTracker[day][time] = new Set();
        });
      });

      totalClasses.forEach(className => {
        workingDays.forEach(day => {
          timetable[className][day].classes.forEach(cls => {
            // Check teacher conflicts
            if (teacherTracker[day][cls.time].has(cls.teacher)) {
              conflicts.push(`Teacher ${cls.teacher} double booked on ${day} at ${cls.time}`);
            } else {
              teacherTracker[day][cls.time].add(cls.teacher);
            }

            // Check room conflicts
            if (roomTracker[day][cls.time].has(cls.room)) {
              conflicts.push(`Room ${cls.room} double booked on ${day} at ${cls.time}`);
            } else {
              roomTracker[day][cls.time].add(cls.room);
            }
          });
        });
      });

      return conflicts;
    };

    const conflicts = validateTimetable();
    if (conflicts.length > 0) {
      throw new Error(`TIMETABLE CONFLICTS:\n${conflicts.join("\n")}`);
    }

    // ======================
    // 6. SAVE AND RETURN
    // ======================
    const result = {
      collegeName,
      branchName,
      workingDays,
      classTimes,
      labTimings: includeLabs ? labTimings : [],
      timetable,
      metadata: {
        generatedAt: new Date(),
        version: 1,
        stats: {
          totalClasses: totalClasses.length,
          totalSubjects: subjects.length,
          totalTeachers: teacherPool.size,
          totalSlots: workingDays.length * classTimes.length * totalClasses.length,
          includesLabs: includeLabs
        }
      }
    };

    // Save to database
    const newTimetable = new Timetable(result);
    await newTimetable.save();

    return res.status(200).json({
      success: true,
      message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
      ...result
    });

  } catch (error) {
    console.error("❌ Generation failed:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      suggestion: error.message.includes("teacher") ? 
        "Add more teachers or reduce weekly classes per teacher" :
        error.message.includes("room") ?
        "Add more rooms or reduce number of concurrent classes" :
        "Please check all input parameters"
    });
  }
};