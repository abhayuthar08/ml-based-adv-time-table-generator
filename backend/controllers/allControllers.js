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
// export const generateLabTimeTableController = async (req, res) => {
//   console.log("📩 Received Request Data for Lab Timetable:", JSON.stringify(req.body, null, 2));

//   try {
//     const {
//       collegeName,
//       branchName,
//       workingDays,
//       totalClasses,
//       subjects,
//       labLocations,
//       batches,
//       labTimings,
//     } = req.body;

//     // Validate required fields
//     if (
//       !collegeName ||
//       !branchName ||
//       !workingDays?.length ||
//       !totalClasses?.length ||
//       !subjects?.length ||
//       !labLocations?.length ||
//       !batches?.length ||
//       !labTimings?.length
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid for Lab Timetable");

//     // Initialize lab timetable structure
//     const labTimetable = {};
//     totalClasses.forEach((className) => {
//       labTimetable[className] = {};
//       workingDays.forEach((day) => {
//         labTimetable[className][day] = {
//           lab: null, // Lab session data
//         };
//       });
//     });

//     console.log("✅ Lab Timetable Structure Initialized");

//     // Track teacher availability for lab sessions
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
//       });
//     });

//     const assignLabs = (labTimetable) => {
//       const subjectRotation = {}; // Track subject rotation for each batch
//       batches.forEach((batch) => {
//         subjectRotation[batch] = [...subjects].sort(() => Math.random() - 0.5); // Shuffle subjects for each batch
//       });

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const usedSubjects = new Set(); // Track subjects used in the current day

//           batches.forEach((batch) => {
//             // Get the next subject for this batch
//             let subjectIndex = dayIndex % subjects.length;
//             let subject = subjectRotation[batch][subjectIndex];

//             // Ensure the subject is not repeated on consecutive days
//             if (dayIndex > 0) {
//               const previousDayLab = labTimetable[className][workingDays[dayIndex - 1]].lab;
//               if (previousDayLab) {
//                 const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
//                 if (previousSubject === subject.name) {
//                   subjectIndex = (subjectIndex + 1) % subjects.length; // Move to the next subject
//                   subject = subjectRotation[batch][subjectIndex];
//                 }
//               }
//             }

//             // Ensure the subject is not used for another batch on the same day
//             while (usedSubjects.has(subject.name)) {
//               subjectIndex = (subjectIndex + 1) % subjects.length;
//               subject = subjectRotation[batch][subjectIndex];
//             }

//             // Assign the lab
//             const availableTeachers = subject.teachers.filter(
//               (teacher) => !teacherAvailability[teacher]?.has(`${day}-${labTimings[0]}`)
//             );

//             if (availableTeachers.length === 0) {
//               throw new Error(`❌ No available teachers for ${subject.name} on ${day} at ${labTimings[0]}.`);
//             }

//             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];
//             const labLocation = labLocations[Math.floor(Math.random() * labLocations.length)];

//             labSlots.push({
//               batch,
//               subject: subject.name,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });

//             // Mark subject and teacher as used
//             usedSubjects.add(subject.name);
//             teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           });

//           labTimetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0],
//           };
//         });
//       });

//       return labTimetable;
//     };

//     // Generate labs only
//     const finalLabTimetable = assignLabs(labTimetable);

//     console.log("✅ Lab Sessions Generated Successfully");

//     // Return only the lab timetable
//     return res.status(200).json({
//       message: "✅ Lab Timetable generated successfully!",
//       labTimetable: finalLabTimetable,
//       workingDays,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating lab timetable:", error);
//     return res.status(500).json({ error: error.message });
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

//     if (
//       !collegeName ||
//       !branchName ||
//       !workingDays?.length ||
//       !totalClasses?.length ||
//       !subjects?.length ||
//       !classTimes?.length ||
//       !rooms?.length ||
//       !totalClassesPerDay ||
//       !labLocations?.length ||
//       !batches?.length ||
//       !labTimings?.length
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [],
//           lab: null,
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized");

//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = [...subject.teachers];
//     });

//     console.log("✅ Teacher Pool Initialized");

//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     const assignSlot = (className, day, timeSlot, subject) => {
//       let availableTeachers = teacherPool[subject] || [];
//       availableTeachers = availableTeachers.filter(
//         (teacher) =>
//           !timetable[className][day].classes.some((cls) => cls.teacher === teacher)
//       );
//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null };
//       }
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );
//       const teacher = availableTeachers[0];
//       const room = rooms[Math.floor(Math.random() * rooms.length)];
//       teacherWorkload[teacher]++;
//       return { subject, teacher, room, time: timeSlot };
//     };

//     totalClasses.forEach((className) => {
//       const subjectAllocation = subjects.reduce((acc, subject) => {
//         acc[subject.name] = subject.weeklyClasses;
//         return acc;
//       }, {});

//       const availableSubjects = [...subjects];

//       workingDays.forEach((day) => {
//         const daySubjects = availableSubjects.sort(() => Math.random() - 0.5);
//         const usedSubjects = new Set();

//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const subject = daySubjects.find(
//             (subj) =>
//               subjectAllocation[subj.name] > 0 && !usedSubjects.has(subj.name)
//           );
//           if (subject) {
//             const timeSlot = classTimes[i];
//             const slot = assignSlot(className, day, timeSlot, subject.name);
//             if (slot.teacher) {
//               timetable[className][day].classes.push(slot);
//               subjectAllocation[subject.name]--;
//               usedSubjects.add(subject.name);
//             }
//           }
//         }
//       });
//     });

//     console.log("✅ Regular Classes Generated");

//     // **Improved Lab Assignment Logic**
//     const assignLabs = (timetable) => {
//       const subjectRotation = {}; // Track subject rotation for each batch
//       batches.forEach((batch) => {
//         subjectRotation[batch] = [...subjects].map((subject) => subject.name);
//       });

//       // Function to shuffle an array (Fisher-Yates shuffle)
//       const shuffleArray = (array) => {
//         for (let i = array.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [array[i], array[j]] = [array[j], array[i]];
//         }
//       };

//       // Shuffle subject rotation for fair distribution
//       Object.keys(subjectRotation).forEach((batch) => shuffleArray(subjectRotation[batch]));

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const usedSubjects = new Set(); // Track subjects used in the current day
//           let availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

//           batches.forEach((batch) => {
//             let subject = subjectRotation[batch][dayIndex % subjects.length];

//             // Ensure the subject is not repeated on consecutive days for the same batch
//             if (dayIndex > 0) {
//               const previousDayLab = timetable[className][workingDays[dayIndex - 1]].lab;
//               if (previousDayLab) {
//                 const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
//                 if (previousSubject === subject) {
//                   shuffleArray(subjectRotation[batch]); // Shuffle to get a different subject
//                   subject = subjectRotation[batch][dayIndex % subjects.length];
//                 }
//               }
//             }

//             // Ensure different subjects for different batches on the same day
//             while (usedSubjects.has(subject)) {
//               shuffleArray(subjectRotation[batch]); // Shuffle to ensure uniqueness
//               subject = subjectRotation[batch][dayIndex % subjects.length];
//             }

//             usedSubjects.add(subject);

//             // Find the subject details
//             const subjectDetails = subjects.find((sub) => sub.name === subject);
//             if (!subjectDetails) {
//               throw new Error(`❌ Subject not found: ${subject}`);
//             }

//             // Assign an available teacher
//             const availableTeachers = subjectDetails.teachers;
//             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//             // Ensure different labs for different batches at the same time
//             if (availableLabs.length === 0) {
//               availableLabs = [...labLocations].sort(() => Math.random() - 0.5);
//             }
//             const labLocation = availableLabs.pop();

//             labSlots.push({
//               batch,
//               subject,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0],
//           };
//         });
//       });

//       return timetable;
//     };

//     // Generate labs
//     const finalTimetable = assignLabs(timetable);

//     console.log("✅ Labs Generated");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: finalTimetable,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// }; // perfectttttttttt workinggggggggggg

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
      labLocations,
      totalClassesPerDay,
      batches,
      labTimings,
    } = req.body;

    if (
      !collegeName ||
      !branchName ||
      !workingDays?.length ||
      !totalClasses?.length ||
      !subjects?.length ||
      !classTimes?.length ||
      !rooms?.length ||
      !totalClassesPerDay ||
      !labLocations?.length ||
      !batches?.length ||
      !labTimings?.length
    ) {
      throw new Error("❌ Missing required fields.");
    }

    console.log("✅ Request Data is Valid");

    subjects.forEach((subject) => {
      if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
        throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
      }
    });

    const timetable = {};
    totalClasses.forEach((className) => {
      timetable[className] = {};
      workingDays.forEach((day) => {
        timetable[className][day] = {
          classes: [],
          lab: null,
        };
      });
    });

    console.log("✅ Timetable Structure Initialized");

    const teacherPool = {};
    subjects.forEach((subject) => {
      teacherPool[subject.name] = [...subject.teachers];
    });

    console.log("✅ Teacher Pool Initialized");

    const teacherWorkload = {};
    subjects.forEach((subject) => {
      subject.teachers.forEach((teacher) => {
        teacherWorkload[teacher] = 0;
      });
    });

    const assignSlot = (className, day, timeSlot, subject) => {
      let availableTeachers = teacherPool[subject] || [];
      availableTeachers = availableTeachers.filter(
        (teacher) =>
          !timetable[className][day].classes.some((cls) => cls.teacher === teacher)
      );
      if (availableTeachers.length === 0) {
        console.error(`❌ No teachers available for subject: ${subject}`);
        return { subject, teacher: null, room: null };
      }
      availableTeachers = availableTeachers.sort(
        (a, b) => teacherWorkload[a] - teacherWorkload[b]
      );
      const teacher = availableTeachers[0];
      const room = rooms[Math.floor(Math.random() * rooms.length)];
      teacherWorkload[teacher]++;
      return { subject, teacher, room, time: timeSlot };
    };

    totalClasses.forEach((className) => {
      const subjectAllocation = subjects.reduce((acc, subject) => {
        acc[subject.name] = subject.weeklyClasses;
        return acc;
      }, {});

      const availableSubjects = [...subjects];

      workingDays.forEach((day) => {
        const daySubjects = availableSubjects.sort(() => Math.random() - 0.5);
        const usedSubjects = new Set();

        for (let i = 0; i < totalClassesPerDay; i++) {
          let subject;
          let attempts = 0;

          while (attempts < 500) {
            subject = daySubjects.find(
              (subj) =>
                subjectAllocation[subj.name] > 0 && !usedSubjects.has(subj.name)
            );

            if (subject) break;
            attempts++;
          }

          if (subject) {
            const timeSlot = classTimes[i];
            const slot = assignSlot(className, day, timeSlot, subject.name);
            if (slot.teacher) {
              timetable[className][day].classes.push(slot);
              subjectAllocation[subject.name]--;
              usedSubjects.add(subject.name);
            }
          }
        }
      });
    });

    console.log("✅ Regular Classes Generated");

    // **Improved Lab Assignment Logic**
    const assignLabs = (timetable) => {
      const subjectRotation = {}; // Track subject rotation for each batch
      batches.forEach((batch) => {
        subjectRotation[batch] = [...subjects].map((subject) => subject.name);
      });

      // Function to shuffle an array (Fisher-Yates shuffle)
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };

      // Shuffle subject rotation for fair distribution
      Object.keys(subjectRotation).forEach((batch) => shuffleArray(subjectRotation[batch]));

      totalClasses.forEach((className) => {
        workingDays.forEach((day, dayIndex) => {
          const labSlots = [];
          const usedSubjects = new Set();
          let availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

          batches.forEach((batch) => {
            let subject = subjectRotation[batch][dayIndex % subjects.length];

            if (dayIndex > 0) {
              const previousDayLab = timetable[className][workingDays[dayIndex - 1]].lab;
              if (previousDayLab) {
                const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
                if (previousSubject === subject) {
                  shuffleArray(subjectRotation[batch]);
                  subject = subjectRotation[batch][dayIndex % subjects.length];
                }
              }
            }

            while (usedSubjects.has(subject)) {
              shuffleArray(subjectRotation[batch]);
              subject = subjectRotation[batch][dayIndex % subjects.length];
            }

            usedSubjects.add(subject);

            const subjectDetails = subjects.find((sub) => sub.name === subject);
            if (!subjectDetails) {
              throw new Error(`❌ Subject not found: ${subject}`);
            }

            const availableTeachers = subjectDetails.teachers;
            const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

            if (availableLabs.length === 0) {
              availableLabs = [...labLocations].sort(() => Math.random() - 0.5);
            }
            const labLocation = availableLabs.pop();

            labSlots.push({
              batch,
              subject,
              teacher,
              lab: labLocation,
              time: labTimings[0],
            });
          });

          timetable[className][day].lab = {
            type: "Lab",
            slots: labSlots,
            time: labTimings[0],
          };
        });
      });

      return timetable;
    };

    // Generate labs
    const finalTimetable = assignLabs(timetable);

    console.log("✅ Labs Generated");

    return res.status(200).json({
      message: "✅ Timetable generated successfully!",
      timetable: finalTimetable,
      workingDays,
      classTimes,
      labTimings,
    });
  } catch (error) {
    console.error("❌ Error generating timetable:", error);
    return res.status(500).json({ error: error.message });
  }
};




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

//     if (
//       !collegeName ||
//       !branchName ||
//       !workingDays?.length ||
//       !totalClasses?.length ||
//       !subjects?.length ||
//       !classTimes?.length ||
//       !rooms?.length ||
//       !totalClassesPerDay ||
//       !labLocations?.length ||
//       !batches?.length ||
//       !labTimings?.length
//     ) {
//       throw new Error("❌ Missing required fields.");
//     }

//     console.log("✅ Request Data is Valid");

//     subjects.forEach((subject) => {
//       if (!subject.name || !subject.teachers?.length || !subject.weeklyClasses) {
//         throw new Error(`❌ Invalid subject: ${JSON.stringify(subject)}`);
//       }
//     });

//     const timetable = {};
//     totalClasses.forEach((className) => {
//       timetable[className] = {};
//       workingDays.forEach((day) => {
//         timetable[className][day] = {
//           classes: [],
//           lab: null,
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized");

//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = [...subject.teachers];
//     });

//     console.log("✅ Teacher Pool Initialized");

//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0;
//       });
//     });

//     const assignSlot = (className, day, timeSlot, subject) => {
//       let availableTeachers = teacherPool[subject] || [];
//       availableTeachers = availableTeachers.filter(
//         (teacher) =>
//           !timetable[className][day].classes.some((cls) => cls.teacher === teacher)
//       );
//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for subject: ${subject}`);
//         return { subject, teacher: null, room: null };
//       }
//       availableTeachers = availableTeachers.sort(
//         (a, b) => teacherWorkload[a] - teacherWorkload[b]
//       );
//       const teacher = availableTeachers[0];
//       const room = rooms[Math.floor(Math.random() * rooms.length)];
//       teacherWorkload[teacher]++;
//       return { subject, teacher, room, time: timeSlot };
//     };

//     totalClasses.forEach((className) => {
//       const subjectAllocation = subjects.reduce((acc, subject) => {
//         acc[subject.name] = subject.weeklyClasses;
//         return acc;
//       }, {});

//       const availableSubjects = [...subjects];

//       workingDays.forEach((day) => {
//         const daySubjects = availableSubjects.sort(() => Math.random() - 0.5);
//         const usedSubjects = new Set();

//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const subject = daySubjects.find(
//             (subj) =>
//               subjectAllocation[subj.name] > 0 && !usedSubjects.has(subj.name)
//           );
//           if (subject) {
//             const timeSlot = classTimes[i];
//             const slot = assignSlot(className, day, timeSlot, subject.name);
//             if (slot.teacher) {
//               timetable[className][day].classes.push(slot);
//               subjectAllocation[subject.name]--;
//               usedSubjects.add(subject.name);
//             }
//           }
//         }
//       });
//     });

//     console.log("✅ Regular Classes Generated");

//     const assignLabs = (timetable) => {
//       totalClasses.forEach((className) => {
//         const subjectLabMap = {};
//         subjects.forEach((subject) => {
//           subjectLabMap[subject.name] = subject.teachers;
//         });

//         workingDays.forEach((day) => {
//           let availableLabs = [...labLocations].sort(() => Math.random() - 0.5);
//           let subjectQueue = [...subjects].sort(() => Math.random() - 0.5);
//           let usedSubjects = new Set();
//           let batchAssignments = [];

//           batches.forEach((batch) => {
//             let subjectIndex = batchAssignments.length % subjectQueue.length;
//             let subject = subjectQueue[subjectIndex];

//             while (usedSubjects.has(subject.name)) {
//               subjectIndex = (subjectIndex + 1) % subjectQueue.length;
//               subject = subjectQueue[subjectIndex];
//             }

//             let availableTeachers = subject.teachers;
//             let teacher =
//               availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//             if (availableLabs.length === 0) {
//               availableLabs = [...labLocations].sort(() => Math.random() - 0.5);
//             }

//             const labLocation = availableLabs.pop();

//             batchAssignments.push({
//               batch,
//               subject: subject.name,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });

//             usedSubjects.add(subject.name);
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: batchAssignments,
//             time: labTimings[0],
//           };
//         });
//       });
//       return timetable;
//     };

//     const finalTimetable = assignLabs(timetable);

//     console.log("✅ Labs Generated Successfully");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: finalTimetable,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };//perfect working














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
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay ||
//       !labLocations?.length || !batches?.length || !labTimings?.length
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
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized");

//     // Organize teachers by subject for fair workload distribution
//     const teacherPool = {};
//     subjects.forEach((subject) => {
//       teacherPool[subject.name] = [...subject.teachers];
//     });

//     console.log("✅ Teacher Pool Initialized");

//     // Track teacher availability
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
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

//     // Function to assign a slot for a class, day, and time
//     const assignClass = (className, day, timeSlot, subject) => {
//       const availableTeachers = teacherPool[subject.name].filter(
//         (teacher) => !teacherAvailability[teacher].has(`${day}-${timeSlot}`)
//       );

//       if (availableTeachers.length === 0) {
//         console.error(`❌ No teachers available for ${subject.name} on ${day} at ${timeSlot}.`);
//         return null;
//       }

//       // Sort teachers by workload (assign teachers with the least workload first)
//       const teacher = availableTeachers.sort(
//         (a, b) => teacherAvailability[a].size - teacherAvailability[b].size
//       )[0];

//       // Assign a random available room
//       const room = rooms[Math.floor(Math.random() * rooms.length)];

//       // Update teacher availability
//       teacherAvailability[teacher].add(`${day}-${timeSlot}`);

//       // Update subject allocation
//       subjectAllocation[className][subject.name]++;

//       return {
//         subject: subject.name,
//         teacher,
//         room,
//         time: timeSlot,
//         type: "class",
//       };
//     };

//     // Generate regular classes ensuring no teacher conflicts & fair distribution
//     totalClasses.forEach((className) => {
//       const shuffledSubjects = [...subjects].sort(() => Math.random() - 0.5);

//       shuffledSubjects.forEach((subject) => {
//         const requiredClasses = subject.weeklyClasses;

//         while (subjectAllocation[className][subject.name] < requiredClasses) {
//           let assigned = false;

//           // Shuffle working days to distribute subjects across days
//           const shuffledDays = [...workingDays].sort(() => Math.random() - 0.5);

//           for (const day of shuffledDays) {
//             // Check if the subject is already assigned on this day
//             if (timetable[className][day].classes.some((cls) => cls.subject === subject.name)) {
//               continue; // Skip if the subject is already assigned on this day
//             }

//             // Shuffle class times to distribute subjects across time slots
//             const shuffledClassTimes = [...classTimes].sort(() => Math.random() - 0.5);

//             for (const timeSlot of shuffledClassTimes) {
//               // Check if the slot is available
//               if (timetable[className][day].classes.length < totalClassesPerDay) {
//                 const slot = assignClass(className, day, timeSlot, subject);

//                 if (slot) {
//                   timetable[className][day].classes.push(slot);
//                   assigned = true;
//                   break;
//                 }
//               }
//             }

//             if (assigned) break;
//           }

//           if (!assigned) {
//             throw new Error(`❌ Failed to assign ${subject.name} to ${className}.`);
//           }
//         }
//       });
//     });

//     console.log("✅ Regular Classes Generated");

//     // Function to assign labs to batches
//     const assignLabs = (timetable) => {
//       const subjectRotation = {}; // Track subject rotation for each batch
//       const labLocationRotation = {}; // Track lab location rotation for each batch

//       batches.forEach((batch) => {
//         subjectRotation[batch] = [...subjects].sort(() => Math.random() - 0.5); // Shuffle subjects for each batch
//         labLocationRotation[batch] = [...labLocations].sort(() => Math.random() - 0.5); // Shuffle lab locations for each batch
//       });

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const usedSubjects = new Set(); // Track subjects used in the current day
//           const usedLabLocations = new Set(); // Track lab locations used in the current day

//           batches.forEach((batch) => {
//             // Get the next subject for this batch
//             let subjectIndex = dayIndex % subjects.length;
//             let subject = subjectRotation[batch][subjectIndex];

//             // Ensure the subject is not repeated on consecutive days
//             if (dayIndex > 0) {
//               const previousDayLab = timetable[className][workingDays[dayIndex - 1]].lab;
//               if (previousDayLab) {
//                 const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
//                 if (previousSubject === subject.name) {
//                   subjectIndex = (subjectIndex + 1) % subjects.length; // Move to the next subject
//                   subject = subjectRotation[batch][subjectIndex];
//                 }
//               }
//             }

//             // Ensure the subject is not used for another batch on the same day
//             while (usedSubjects.has(subject.name)) {
//               subjectIndex = (subjectIndex + 1) % subjects.length;
//               subject = subjectRotation[batch][subjectIndex];
//             }

//             // Get the next lab location for this batch
//             let labLocationIndex = dayIndex % labLocations.length;
//             let labLocation = labLocationRotation[batch][labLocationIndex];

//             // Ensure the lab location is not used for another batch on the same day
//             while (usedLabLocations.has(labLocation)) {
//               labLocationIndex = (labLocationIndex + 1) % labLocations.length;
//               labLocation = labLocationRotation[batch][labLocationIndex];
//             }

//             // Assign the lab
//             const availableTeachers = subject.teachers.filter(
//               (teacher) => !teacherAvailability[teacher]?.has(`${day}-${labTimings[0]}`)
//             );

//             if (availableTeachers.length === 0) {
//               throw new Error(`❌ No available teachers for ${subject.name} on ${day} at ${labTimings[0]}.`);
//             }

//             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//             labSlots.push({
//               batch,
//               subject: subject.name,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });

//             // Mark subject and lab location as used
//             usedSubjects.add(subject.name);
//             usedLabLocations.add(labLocation);
//             teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0],
//           };
//         });
//       });

//       return timetable;
//     };

//     // Generate labs
//     const finalTimetable = assignLabs(timetable);

//     console.log("✅ Labs Generated Successfully");

//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: finalTimetable,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
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
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay ||
//       !labLocations?.length || !batches?.length || !labTimings?.length
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
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
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

//     // Track teacher availability for lab sessions
//     const teacherAvailability = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherAvailability[teacher] = new Set(); // Track time slots for each teacher
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

//     // Generate regular classes ensuring no teacher conflicts & fair distribution
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
//               timetable[className][day].classes.length < totalClassesPerDay &&
//               !timetable[className][day].classes.some((slot) => slot.subject === subject.name)
//             ) {
//               const slot = assignSlot(className, day, timeSlot, subject.name);

//               if (slot) {
//                 timetable[className][day].classes.push({
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

//     console.log("✅ Regular Classes Generated");

//     // Function to assign labs to batches
//     const assignLabs = (timetable) => {
//       const subjectRotation = {}; // Track subject rotation for each batch
//       batches.forEach((batch) => {
//         subjectRotation[batch] = [...subjects].sort(() => Math.random() - 0.5); // Shuffle subjects for each batch
//       });

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const usedSubjects = new Set(); // Track subjects used in the current day

//           batches.forEach((batch) => {
//             // Get the next subject for this batch
//             let subjectIndex = dayIndex % subjects.length;
//             let subject = subjectRotation[batch][subjectIndex];

//             // Ensure the subject is not repeated on consecutive days
//             if (dayIndex > 0) {
//               const previousDayLab = timetable[className][workingDays[dayIndex - 1]].lab;
//               if (previousDayLab) {
//                 const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
//                 if (previousSubject === subject.name) {
//                   subjectIndex = (subjectIndex + 1) % subjects.length; // Move to the next subject
//                   subject = subjectRotation[batch][subjectIndex];
//                 }
//               }
//             }

//             // Ensure the subject is not used for another batch on the same day
//             while (usedSubjects.has(subject.name)) {
//               subjectIndex = (subjectIndex + 1) % subjects.length;
//               subject = subjectRotation[batch][subjectIndex];
//             }

//             // Assign the lab
//             const availableTeachers = subject.teachers.filter(
//               (teacher) => !teacherAvailability[teacher]?.has(`${day}-${labTimings[0]}`)
//             );

//             if (availableTeachers.length === 0) {
//               throw new Error(`❌ No available teachers for ${subject.name} on ${day} at ${labTimings[0]}.`);
//             }

//             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];
//             const labLocation = labLocations[Math.floor(Math.random() * labLocations.length)];

//             labSlots.push({
//               batch,
//               subject: subject.name,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });

//             // Mark subject and teacher as used
//             usedSubjects.add(subject.name);
//             teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0],
//           };
//         });
//       });

//       return timetable;
//     };

//     // Generate labs
//     const finalTimetable = assignLabs(timetable);

//     console.log("✅ Labs Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: finalTimetable,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };//the code is working for perfect lab with no class




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
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay ||
//       !labLocations?.length || !batches?.length || !labTimings?.length
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
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized");

//     // Track teacher availability globally
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

//     console.log("✅ Room Assignment Done");

//     // Helper function to assign subjects to classes
//     const assignSubjectsToClasses = (timetable) => {
//       // Create a copy of subjects to track remaining weekly classes
//       const subjectWeeklyClasses = {};
//       subjects.forEach((subject) => {
//         subjectWeeklyClasses[subject.name] = subject.weeklyClasses;
//       });

//       // Assign subjects to classes
//       totalClasses.forEach((className) => {
//         workingDays.forEach((day) => {
//           const usedSubjects = new Set(); // Track subjects used in the current day for this class

//           for (let i = 0; i < totalClassesPerDay; i++) {
//             const timeSlot = classTimes[i % classTimes.length];
//             let subjectAssigned = false;

//             // Try to assign a subject from the list
//             for (let subject of subjects) {
//               if (
//                 subjectWeeklyClasses[subject.name] > 0 && // Check if the subject has remaining classes
//                 !usedSubjects.has(subject.name) // Ensure the subject is not used twice in the same day
//               ) {
//                 const availableTeachers = subject.teachers.filter(
//                   (teacher) => !teacherAvailability[teacher]?.has(`${day}-${timeSlot}`)
//                 );

//                 if (availableTeachers.length > 0) {
//                   const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//                   timetable[className][day].classes.push({
//                     type: "Class",
//                     subject: subject.name,
//                     teacher,
//                     time: timeSlot,
//                   });

//                   // Mark teacher as unavailable for this time slot
//                   teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//                   subjectWeeklyClasses[subject.name]--; // Reduce weekly classes count
//                   usedSubjects.add(subject.name); // Mark subject as used for the day
//                   subjectAssigned = true;
//                   break; // Move to the next time slot
//                 }
//               }
//             }

//             // If no subject could be assigned, assign "Extra Class"
//             if (!subjectAssigned) {
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 time: timeSlot,
//               });
//             }
//           }
//         });
//       });

//       // Verify that all subjects have been assigned the correct number of classes
//       for (const subjectName in subjectWeeklyClasses) {
//         if (subjectWeeklyClasses[subjectName] > 0) {
//           console.warn(`⚠️ Subject ${subjectName} has ${subjectWeeklyClasses[subjectName]} unassigned classes.`);
//         }
//       }

//       return timetable;
//     };

//     // Generate regular classes
//     const updatedTimetable = assignSubjectsToClasses(timetable);

//     console.log("✅ Regular Classes Generated");

//     // Function to assign labs to batches
//     const assignLabs = (timetable) => {
//       const subjectRotation = {}; // Track subject rotation for each batch
//       const batchSubjectUsage = {}; // Track subjects used by each batch across days
//       batches.forEach((batch) => {
//         subjectRotation[batch] = [...subjects].sort(() => Math.random() - 0.5); // Shuffle subjects for each batch
//         batchSubjectUsage[batch] = new Set(); // Initialize subject usage for each batch
//       });

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const usedSubjects = new Set(); // Track subjects used in the current day

//           batches.forEach((batch) => {
//             // Get the next subject for this batch
//             let subjectIndex = dayIndex % subjects.length;
//             let subject = subjectRotation[batch][subjectIndex];

//             // Ensure the subject is not repeated on consecutive days
//             if (dayIndex > 0) {
//               const previousDayLab = timetable[className][workingDays[dayIndex - 1]].lab;
//               if (previousDayLab) {
//                 const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
//                 if (previousSubject === subject.name) {
//                   subjectIndex = (subjectIndex + 1) % subjects.length; // Move to the next subject
//                   subject = subjectRotation[batch][subjectIndex];
//                 }
//               }
//             }

//             // Ensure the subject is not used for another batch on the same day
//             while (usedSubjects.has(subject.name) || batchSubjectUsage[batch].has(subject.name)) {
//               subjectIndex = (subjectIndex + 1) % subjects.length;
//               subject = subjectRotation[batch][subjectIndex];
//             }

//             // Assign the lab
//             const availableTeachers = subject.teachers.filter(
//               (teacher) => !teacherAvailability[teacher]?.has(`${day}-${labTimings[0]}`)
//             );

//             if (availableTeachers.length === 0) {
//               throw new Error(`❌ No available teachers for ${subject.name} on ${day} at ${labTimings[0]}.`);
//             }

//             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];
//             const labLocation = labLocations[Math.floor(Math.random() * labLocations.length)];

//             labSlots.push({
//               batch,
//               subject: subject.name,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });

//             // Mark subject and teacher as used
//             usedSubjects.add(subject.name);
//             batchSubjectUsage[batch].add(subject.name); // Mark subject as used for this batch
//             if (!teacherAvailability[teacher]) teacherAvailability[teacher] = new Set();
//             teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0],
//           };
//         });
//       });

//       return timetable;
//     };

//     // Generate labs
//     const finalTimetable = assignLabs(updatedTimetable);

//     console.log("✅ Labs Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: finalTimetable,
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
//     if (
//       !collegeName || !branchName || !workingDays?.length || !totalClasses?.length ||
//       !subjects?.length || !classTimes?.length || !rooms?.length || !totalClassesPerDay ||
//       !labLocations?.length || !batches?.length || !labTimings?.length
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
//         timetable[className][day] = {
//           classes: [], // Regular classes
//           lab: null, // Lab session
//         };
//       });
//     });

//     console.log("✅ Timetable Structure Initialized");

//     // Track teacher availability globally
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

//     console.log("✅ Room Assignment Done");

//     // Helper function to assign subjects to classes
//     const assignSubjectsToClasses = (timetable) => {
//       const subjectRotation = {}; // Track subject rotation for each class
//       totalClasses.forEach((className) => {
//         subjectRotation[className] = [...subjects].sort(() => Math.random() - 0.5); // Shuffle subjects for each class
//       });

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day) => {
//           const usedSubjects = new Set(); // Track subjects used in the current day for this class

//           for (let i = 0; i < totalClassesPerDay; i++) {
//             const timeSlot = classTimes[i % classTimes.length];
//             let subjectAssigned = false;

//             // Try to assign a subject from the rotation
//             for (let subject of subjectRotation[className]) {
//               if (subject.weeklyClasses > 0 && !usedSubjects.has(subject.name)) {
//                 const availableTeachers = subject.teachers.filter(
//                   (teacher) => !teacherAvailability[teacher]?.has(`${day}-${timeSlot}`)
//                 );

//                 if (availableTeachers.length > 0) {
//                   const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];

//                   timetable[className][day].classes.push({
//                     type: "Class",
//                     subject: subject.name,
//                     teacher,
//                     room: classRoomAssignment[className], // Assign room
//                     time: timeSlot,
//                   });

//                   // Mark teacher as unavailable for this time slot
//                   teacherAvailability[teacher].add(`${day}-${timeSlot}`);
//                   subject.weeklyClasses--; // Reduce weekly classes count
//                   usedSubjects.add(subject.name); // Mark subject as used for the day
//                   subjectAssigned = true;
//                   break; // Move to the next time slot
//                 }
//               }
//             }

//             // If no subject could be assigned, assign "Extra Class"
//             if (!subjectAssigned) {
//               timetable[className][day].classes.push({
//                 type: "Class",
//                 subject: "Extra Class",
//                 teacher: null,
//                 room: classRoomAssignment[className], // Assign room
//                 time: timeSlot,
//               });
//             }
//           }
//         });
//       });

//       return timetable;
//     };

//     // Generate regular classes
//     const updatedTimetable = assignSubjectsToClasses(timetable);

//     console.log("✅ Regular Classes Generated");

//     // Function to assign labs to batches
//     const assignLabs = (timetable) => {
//       const subjectRotation = {}; // Track subject rotation for each batch
//       const batchSubjectUsage = {}; // Track subjects used by each batch across days
//       batches.forEach((batch) => {
//         subjectRotation[batch] = [...subjects].sort(() => Math.random() - 0.5); // Shuffle subjects for each batch
//         batchSubjectUsage[batch] = new Set(); // Initialize subject usage for each batch
//       });

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const usedSubjects = new Set(); // Track subjects used in the current day

//           batches.forEach((batch) => {
//             // Get the next subject for this batch
//             let subjectIndex = dayIndex % subjects.length;
//             let subject = subjectRotation[batch][subjectIndex];

//             // Ensure the subject is not repeated on consecutive days
//             if (dayIndex > 0) {
//               const previousDayLab = timetable[className][workingDays[dayIndex - 1]].lab;
//               if (previousDayLab) {
//                 const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
//                 if (previousSubject === subject.name) {
//                   subjectIndex = (subjectIndex + 1) % subjects.length; // Move to the next subject
//                   subject = subjectRotation[batch][subjectIndex];
//                 }
//               }
//             }

//             // Ensure the subject is not used for another batch on the same day
//             while (usedSubjects.has(subject.name) || batchSubjectUsage[batch].has(subject.name)) {
//               subjectIndex = (subjectIndex + 1) % subjects.length;
//               subject = subjectRotation[batch][subjectIndex];
//             }

//             // Assign the lab
//             const availableTeachers = subject.teachers.filter(
//               (teacher) => !teacherAvailability[teacher]?.has(`${day}-${labTimings[0]}`)
//             );

//             if (availableTeachers.length === 0) {
//               throw new Error(`❌ No available teachers for ${subject.name} on ${day} at ${labTimings[0]}.`);
//             }

//             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];
//             const labLocation = labLocations[Math.floor(Math.random() * labLocations.length)];

//             labSlots.push({
//               batch,
//               subject: subject.name,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });

//             // Mark subject and teacher as used
//             usedSubjects.add(subject.name);
//             batchSubjectUsage[batch].add(subject.name); // Mark subject as used for this batch
//             if (!teacherAvailability[teacher]) teacherAvailability[teacher] = new Set();
//             teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0],
//           };
//         });
//       });

//       return timetable;
//     };

//     // Generate labs
//     const finalTimetable = assignLabs(updatedTimetable);

//     console.log("✅ Labs Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: finalTimetable,
//       classRoomAssignment,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
//   }
// };//mid



// this is working lab compl
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
//     if (!collegeName || !branchName) throw new Error("❌ College name and branch name are required.");
//     if (!workingDays?.length) throw new Error("❌ Working days are required.");
//     if (!classTimes?.length) throw new Error("❌ Class times are required.");
//     if (!totalClasses?.length) throw new Error("❌ Total classes are required.");
//     if (!subjects?.length) throw new Error("❌ Subjects are required.");
//     if (!rooms?.length) throw new Error("❌ Rooms are required.");
//     if (!labLocations?.length) throw new Error("❌ Lab locations are required.");
//     if (!totalClassesPerDay) throw new Error("❌ Total classes per day are required.");
//     if (!batches?.length) throw new Error("❌ Batches are required.");
//     if (!labTimings?.length) throw new Error("❌ Lab timings are required.");

//     // Validate subjects structure
//     subjects.forEach((subject, index) => {
//       if (!subject.name) throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       if (!subject.teachers?.length) throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       if (!subject.weeklyClasses) throw new Error(`❌ Subject "${subject.name}" has no weekly classes defined.`);
//     });

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

//     console.log("✅ Timetable Structure Initialized");

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

//     console.log("✅ Room Assignment Done");

//     // Generate regular classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         const usedSubjects = new Set(); // Track subjects used in the current day

//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];
//           const availableSubjects = subjects.filter(
//             (subject) => subject.weeklyClasses > 0 && !usedSubjects.has(subject.name)
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
//               usedSubjects.add(subjectObj.name); // Mark subject as used for the day
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

//     console.log("✅ Regular Classes Generated");

//     // Function to assign labs to batches
//     const assignLabs = (timetable) => {
//       const subjectRotation = {}; // Track subject rotation for each batch
//       batches.forEach((batch) => {
//         subjectRotation[batch] = [...subjects].sort(() => Math.random() - 0.5); // Shuffle subjects for each batch
//       });

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const usedSubjects = new Set(); // Track subjects used in the current day

//           batches.forEach((batch) => {
//             // Get the next subject for this batch
//             let subjectIndex = dayIndex % subjects.length;
//             let subject = subjectRotation[batch][subjectIndex];

//             // Ensure the subject is not repeated on consecutive days
//             if (dayIndex > 0) {
//               const previousDayLab = timetable[className][workingDays[dayIndex - 1]].lab;
//               if (previousDayLab) {
//                 const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
//                 if (previousSubject === subject.name) {
//                   subjectIndex = (subjectIndex + 1) % subjects.length; // Move to the next subject
//                   subject = subjectRotation[batch][subjectIndex];
//                 }
//               }
//             }

//             // Ensure the subject is not used for another batch on the same day
//             while (usedSubjects.has(subject.name)) {
//               subjectIndex = (subjectIndex + 1) % subjects.length;
//               subject = subjectRotation[batch][subjectIndex];
//             }

//             // Assign the lab
//             const availableTeachers = subject.teachers.filter(
//               (teacher) => !teacherAvailability[teacher]?.has(`${day}-${labTimings[0]}`)
//             );

//             if (availableTeachers.length === 0) {
//               throw new Error(`❌ No available teachers for ${subject.name} on ${day} at ${labTimings[0]}.`);
//             }

//             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];
//             const labLocation = labLocations[Math.floor(Math.random() * labLocations.length)];

//             labSlots.push({
//               batch,
//               subject: subject.name,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });

//             // Mark subject and teacher as used
//             usedSubjects.add(subject.name);
//             if (!teacherAvailability[teacher]) teacherAvailability[teacher] = new Set();
//             teacherAvailability[teacher].add(`${day}-${labTimings[0]}`);
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0],
//           };
//         });
//       });

//       return timetable;
//     };

//     // Generate labs
//     const updatedTimetable = assignLabs(timetable);

//     console.log("✅ Labs Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: updatedTimetable,
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
//     if (!collegeName || !branchName) throw new Error("❌ College name and branch name are required.");
//     if (!workingDays?.length) throw new Error("❌ Working days are required.");
//     if (!classTimes?.length) throw new Error("❌ Class times are required.");
//     if (!totalClasses?.length) throw new Error("❌ Total classes are required.");
//     if (!subjects?.length) throw new Error("❌ Subjects are required.");
//     if (!rooms?.length) throw new Error("❌ Rooms are required.");
//     if (!labLocations?.length) throw new Error("❌ Lab locations are required.");
//     if (!totalClassesPerDay) throw new Error("❌ Total classes per day are required.");
//     if (!batches?.length) throw new Error("❌ Batches are required.");
//     if (!labTimings?.length) throw new Error("❌ Lab timings are required.");

//     // Validate subjects structure
//     subjects.forEach((subject, index) => {
//       if (!subject.name) throw new Error(`❌ Subject at index ${index} is missing a name.`);
//       if (!subject.teachers?.length) throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
//       if (!subject.weeklyClasses) throw new Error(`❌ Subject "${subject.name}" has no weekly classes defined.`);
//     });

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

//     console.log("✅ Timetable Structure Initialized");

//     // Track teacher workload (number of classes assigned to each teacher)
//     const teacherWorkload = {};
//     subjects.forEach((subject) => {
//       subject.teachers.forEach((teacher) => {
//         teacherWorkload[teacher] = 0; // Initialize workload for each teacher
//       });
//     });

//     // Track subject allocation (number of classes assigned for each subject)
//     const subjectAllocation = {};
//     totalClasses.forEach((className) => {
//       subjectAllocation[className] = {};
//       subjects.forEach((subject) => {
//         subjectAllocation[className][subject.name] = 0; // Initialize allocation for each subject
//       });
//     });

//     console.log("✅ Teacher Workload and Subject Allocation Tracked");

//     // Function to assign a regular class
//     const assignRegularClass = (className, day, timeSlot) => {
//       const availableSubjects = subjects.filter(
//         (subject) => subject.weeklyClasses > 0
//       );

//       if (availableSubjects.length === 0) {
//         return null; // No subjects left to assign
//       }

//       // Randomly select a subject
//       const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

//       // Get available teachers for this subject, sorted by workload (ascending)
//       const availableTeachers = subjectObj.teachers
//         .filter((teacher) => !teacherWorkload[teacher]) // Teachers with no workload
//         .sort((a, b) => teacherWorkload[a] - teacherWorkload[b]); // Sort by workload

//       if (availableTeachers.length === 0) {
//         return null; // No available teachers for this subject
//       }

//       // Assign the teacher with the least workload
//       const teacher = availableTeachers[0];

//       // Assign a random available room
//       const room = rooms[Math.floor(Math.random() * rooms.length)];

//       // Update teacher workload and subject allocation
//       teacherWorkload[teacher]++;
//       subjectAllocation[className][subjectObj.name]++;
//       subjectObj.weeklyClasses--;

//       return {
//         type: "Class",
//         subject: subjectObj.name,
//         teacher,
//         room,
//         time: timeSlot,
//       };
//     };

//     // Generate regular classes for all classes
//     for (let className of totalClasses) {
//       for (let day of workingDays) {
//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i % classTimes.length];

//           // Skip if this time slot is reserved for lab
//           if (labTimings.includes(timeSlot)) continue;

//           // Assign a regular class
//           const classSlot = assignRegularClass(className, day, timeSlot);

//           if (classSlot) {
//             timetable[className][day].classes.push(classSlot);
//           } else {
//             timetable[className][day].classes.push({
//               type: "Class",
//               subject: "Extra Class",
//               teacher: null,
//               room: null,
//               time: timeSlot,
//             });
//           }
//         }
//       }
//     }

//     console.log("✅ Regular Classes Generated");

//     // Function to assign labs to batches
//     const assignLabs = (timetable) => {
//       const subjectRotation = {}; // Track subject rotation for each batch
//       batches.forEach((batch) => {
//         subjectRotation[batch] = [...subjects].sort(() => Math.random() - 0.5); // Shuffle subjects for each batch
//       });

//       totalClasses.forEach((className) => {
//         workingDays.forEach((day, dayIndex) => {
//           const labSlots = [];
//           const usedSubjects = new Set(); // Track subjects used in the current day

//           batches.forEach((batch) => {
//             // Get the next subject for this batch
//             let subjectIndex = dayIndex % subjects.length;
//             let subject = subjectRotation[batch][subjectIndex];

//             // Ensure the subject is not repeated on consecutive days
//             if (dayIndex > 0) {
//               const previousDayLab = timetable[className][workingDays[dayIndex - 1]].lab;
//               if (previousDayLab) {
//                 const previousSubject = previousDayLab.slots.find((slot) => slot.batch === batch)?.subject;
//                 if (previousSubject === subject.name) {
//                   subjectIndex = (subjectIndex + 1) % subjects.length; // Move to the next subject
//                   subject = subjectRotation[batch][subjectIndex];
//                 }
//               }
//             }

//             // Ensure the subject is not used for another batch on the same day
//             while (usedSubjects.has(subject.name)) {
//               subjectIndex = (subjectIndex + 1) % subjects.length;
//               subject = subjectRotation[batch][subjectIndex];
//             }

//             // Assign the lab
//             const availableTeachers = subject.teachers.filter(
//               (teacher) => !teacherWorkload[teacher]?.has(`${day}-${labTimings[0]}`)
//             );

//             if (availableTeachers.length === 0) {
//               throw new Error(`❌ No available teachers for ${subject.name} on ${day} at ${labTimings[0]}.`);
//             }

//             const teacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];
//             const labLocation = labLocations[Math.floor(Math.random() * labLocations.length)];

//             labSlots.push({
//               batch,
//               subject: subject.name,
//               teacher,
//               lab: labLocation,
//               time: labTimings[0],
//             });

//             // Mark subject and teacher as used
//             usedSubjects.add(subject.name);
//             if (!teacherWorkload[teacher]) teacherWorkload[teacher] = new Set();
//             teacherWorkload[teacher].add(`${day}-${labTimings[0]}`);
//           });

//           timetable[className][day].lab = {
//             type: "Lab",
//             slots: labSlots,
//             time: labTimings[0],
//           };
//         });
//       });

//       return timetable;
//     };

//     // Generate labs
//     const updatedTimetable = assignLabs(timetable);

//     console.log("✅ Labs Generated");

//     // Return the generated timetable
//     return res.status(200).json({
//       message: "✅ Timetable generated successfully!",
//       timetable: updatedTimetable,
//       workingDays,
//       classTimes,
//       labTimings,
//     });
//   } catch (error) {
//     console.error("❌ Error generating timetable:", error);
//     return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
//   }
// };
















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
