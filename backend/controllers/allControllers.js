
const Timetable = require("../models/timetable.model");
const timetableService = require("../services/timetableService");
const mlService = require("../services/mlService");

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
    } = req.body;

    // Validate required fields
    if (!collegeName || !branchName) {
      throw new Error("❌ College name and branch name are required.");
    }
    if (!workingDays?.length) {
      throw new Error("❌ Working days are required.");
    }
    if (!classTimes?.length) {
      throw new Error("❌ Class times are required.");
    }
    if (!totalClasses?.length) {
      throw new Error("❌ Total classes are required.");
    }
    if (!subjects?.length) {
      throw new Error("❌ Subjects are required.");
    }
    if (!rooms?.length) {
      throw new Error("❌ Rooms are required.");
    }
    if (!labLocations?.length) {
      throw new Error("❌ Lab locations are required.");
    }
    if (!totalClassesPerDay) {
      throw new Error("❌ Total classes per day are required.");
    }
    if (!batches?.length) {
      throw new Error("❌ Batches are required.");
    }

    console.log("✅ Request Data is Valid");

    // Validate subjects
    subjects.forEach((subject, index) => {
      if (!subject.name) {
        throw new Error(`❌ Subject at index ${index} is missing a name.`);
      }
      if (!subject.teachers?.length) {
        throw new Error(`❌ Subject "${subject.name}" has no teachers assigned.`);
      }
      if (!subject.weeklyClasses) {
        throw new Error(`❌ Subject "${subject.name}" is missing weekly classes.`);
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

    console.log("✅ Teacher Workload Initialized:", JSON.stringify(teacherWorkload, null, 2));

    // Track subject allocation to ensure fair distribution
    const subjectAllocation = {};
    totalClasses.forEach((className) => {
      subjectAllocation[className] = {};
      subjects.forEach((subject) => {
        subjectAllocation[className][subject.name] = 0;
      });
    });

    console.log("✅ Subject Allocation Initialized:", JSON.stringify(subjectAllocation, null, 2));

    // Track lab allocation to ensure each lab subject is assigned only once per batch per day
    const labAllocation = {};
    totalClasses.forEach((className) => {
      labAllocation[className] = {};
      workingDays.forEach((day) => {
        labAllocation[className][day] = {};
        batches.forEach((batch) => {
          labAllocation[className][day][batch] = {};
          subjects.forEach((subject) => {
            labAllocation[className][day][batch][subject.name] = false; // Track if subject is assigned to this batch on this day
          });
        });
      });
    });

    console.log("✅ Lab Allocation Initialized:", JSON.stringify(labAllocation, null, 2));

    // Function to assign a slot for a class, day, and time
    const assignSlot = (className, day, timeSlot, subject) => {
      try {
        console.log(`🔧 Assigning slot for ${className} on ${day} at ${timeSlot} for subject: ${subject}`);
        let availableTeachers = teacherPool[subject] || [];
        console.log("✅ Available Teachers:", availableTeachers);

        if (availableTeachers.length === 0) {
          console.error(`❌ No teachers available for subject: ${subject}`);
          return { subject, teacher: null, room: null };
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

        console.log(`✅ Assigned slot:`, { subject, teacher, room });
        return { subject, teacher, room };
      } catch (error) {
        console.error(`❌ Error assigning slot for ${className} on ${day} at ${timeSlot}:`, error);
        throw new Error(`Failed to assign slot for ${className} on ${day} at ${timeSlot}.`);
      }
    };

    // Function to assign a lab slot for a batch, day, and time
    const assignLabSlot = (className, day, batch, timeSlot) => {
      try {
        console.log(`🔧 Assigning lab slot for ${className} on ${day} at ${timeSlot} for batch: ${batch}`);
        const availableSubjects = subjects.filter((subject) => {
          // Check if the subject is not already assigned to any batch in this class on this day
          return !Object.values(labAllocation[className][day]).some(
            (batchAllocation) => batchAllocation[subject.name]
          );
        });

        console.log("✅ Available Subjects:", availableSubjects);

        if (availableSubjects.length === 0) {
          console.error(`❌ No subjects available for lab session for batch: ${batch}`);
          return { subject: "Extra Lab", teacher: null, lab: null };
        }

        // Assign a random available subject
        const subject = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];

        // Mark the subject as assigned as a lab to this batch on this day
        labAllocation[className][day][batch][subject.name] = true;

        // Assign a random available lab location
        const lab = labLocations[Math.floor(Math.random() * labLocations.length)];

        console.log(`✅ Assigned lab slot:`, { subject: subject.name, lab });
        return { subject: subject.name, teacher: null, lab };
      } catch (error) {
        console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${timeSlot}:`, error);
        throw new Error(`Failed to assign lab slot for batch ${batch} on ${day} at ${timeSlot}.`);
      }
    };

    // Generate the timetable ensuring no teacher conflicts & fair distribution
    for (let className of totalClasses) {
      for (let day of workingDays) {
        // Assign regular classes
        for (let i = 0; i < totalClassesPerDay - 1; i++) { // Reserve one slot for lab
          const timeSlot = classTimes[i % classTimes.length];

          try {
            // Find a subject that hasn't been assigned on this day yet
            const availableSubjects = subjects.filter(
              (subject) => subjectAllocation[className][subject.name] < subject.weeklyClasses
            );

            if (availableSubjects.length > 0) {
              const subjectObj = availableSubjects[Math.floor(Math.random() * availableSubjects.length)];
              const slot = assignSlot(className, day, timeSlot, subjectObj.name);

              if (slot) {
                timetable[className][day].push({
                  type: "Class",
                  subject: slot.subject,
                  teacher: slot.teacher,
                  room: slot.room,
                  time: timeSlot,
                });
              }
            } else {
              // All subjects have been assigned for this day, assign an extra class
              timetable[className][day].push({
                type: "Class",
                subject: "Extra Class",
                teacher: null,
                room: rooms[Math.floor(Math.random() * rooms.length)],
                time: timeSlot,
              });
            }
          } catch (error) {
            console.error(`❌ Error assigning class for ${className} on ${day} at ${timeSlot}:`, error);
            return res.status(500).json({ error: `❌ Failed to assign class for ${className} on ${day} at ${timeSlot}.` });
          }
        }

        // Assign lab session
        const labTimeSlot = classTimes[totalClassesPerDay - 1]; // Last slot is reserved for lab
        const labSlots = [];

        // Assign lab sessions for each batch
        batches.forEach((batch) => {
          try {
            const labSlot = assignLabSlot(className, day, batch, labTimeSlot);
            labSlots.push({
              batch,
              subject: labSlot.subject,
              lab: labSlot.lab, // Use "lab" instead of "room"
              time: labTimeSlot,
            });
          } catch (error) {
            console.error(`❌ Error assigning lab slot for batch ${batch} on ${day} at ${labTimeSlot}:`, error);
            return res.status(500).json({ error: `❌ Failed to assign lab slot for batch ${batch} on ${day} at ${labTimeSlot}.` });
          }
        });

        // Add lab sessions to the timetable
        timetable[className][day].push({
          type: "Lab",
          slots: labSlots,
        });
      }
    }

    console.log("✅ Timetable Successfully Generated");

    // Store the generated timetable in memory
    generatedTimetable = timetable;

    return res.status(200).json({
      message: "✅ Timetable generated successfully!",
      timetable,
      workingDays,
      classTimes,
    });
  } catch (error) {
    console.error("❌ Error generating timetable:", error);
    return res.status(500).json({ error: `❌ Internal Server Error: ${error.message}` });
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
