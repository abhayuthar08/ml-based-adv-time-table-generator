// // // import { createRequire } from "module";
// // // const require = createRequire(import.meta.url);
// // // const Timetable = require("../models/timetable.model");

// // // export const generateTimeTableController = async (req, res) => {
// // //   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

// // //   try {
// // //     const {
// // //       collegeName,
// // //       branchName,
// // //       workingDays,
// // //       classTimes,
// // //       totalClasses,
// // //       subjects,
// // //       rooms,
// // //       labLocations = [],
// // //       totalClassesPerDay,
// // //       batches = [],
// // //       labTimings = [],
// // //       includeLabs = false
// // //     } = req.body;

// // //     // ======================
// // //     // 1. VALIDATION PHASE
// // //     // ======================
// // //     const errors = [];
// // //     if (!collegeName) errors.push("College name is required");
// // //     if (!branchName) errors.push("Branch name is required");
// // //     if (!workingDays?.length) errors.push("Working days are required");
// // //     if (!classTimes?.length) errors.push("Class times are required");
// // //     if (!totalClasses?.length) errors.push("Total classes are required");
// // //     if (!subjects?.length) errors.push("Subjects are required");
// // //     if (!rooms?.length) errors.push("Rooms are required");
// // //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// // //     // Teacher validation
// // //     const teacherPool = new Set();
// // //     subjects.forEach(subject => {
// // //       if (!subject.teachers?.length) {
// // //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// // //       } else {
// // //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// // //       }
// // //     });

// // //     // Room validation
// // //     if (rooms.length < totalClasses.length) {
// // //       errors.push(`Need ${totalClasses.length} rooms (only ${rooms.length} provided)`);
// // //     }

// // //     // Lab validation (if enabled)
// // //     if (includeLabs) {
// // //       if (!batches.length) errors.push("No batches provided for lab sessions");
// // //       if (!labLocations.length) errors.push("No lab locations provided");
// // //       if (labLocations.length < batches.length) {
// // //         errors.push(`Need ${batches.length} lab locations (only ${labLocations.length} provided)`);
// // //       }
// // //       if (!labTimings.length) errors.push("No lab timings provided");
// // //     }

// // //     if (errors.length > 0) {
// // //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// // //     }

// // //     // ======================
// // //     // 2. INITIALIZATION
// // //     // ======================
// // //     const timetable = {};
// // //     const roomAssignments = {}; // { day: { time: Set<room> } }
// // //     workingDays.forEach(day => {
// // //       roomAssignments[day] = {};
// // //       classTimes.forEach(time => {
// // //         roomAssignments[day][time] = new Set();
// // //       });
// // //     });

// // //     // Initialize timetable structure
// // //     totalClasses.forEach(className => {
// // //       timetable[className] = {};
// // //       workingDays.forEach(day => {
// // //         timetable[className][day] = {
// // //           classes: [],
// // //           lab: null
// // //         };
// // //       });
// // //     });

// // //     // Teacher tracking
// // //     const teacherWorkload = {};
// // //     const teacherAvailability = {};
// // //     subjects.forEach(subject => {
// // //       subject.teachers.forEach(teacher => {
// // //         teacherWorkload[teacher] = 0;
// // //         teacherAvailability[teacher] = {};
// // //         workingDays.forEach(day => {
// // //           teacherAvailability[teacher][day] = new Set();
// // //         });
// // //       });
// // //     });

// // //     // ======================
// // //     // 3. CORE SCHEDULING LOGIC
// // //     // ======================
// // //     const assignSlot = (className, day, timeSlot, subject) => {
// // //       const subjectData = subjects.find(s => s.name === subject);
// // //       if (!subjectData) return null;

// // //       // Get available teachers
// // //       const availableTeachers = subjectData.teachers.filter(teacher => 
// // //         !teacherAvailability[teacher][day].has(timeSlot)
// // //       );
// // //       if (availableTeachers.length === 0) return null;

// // //       // Get available rooms
// // //       const availableRooms = rooms.filter(room => 
// // //         !roomAssignments[day][timeSlot].has(room)
// // //       );
// // //       if (availableRooms.length === 0) return null;

// // //       // Select least busy teacher and first available room
// // //       const teacher = availableTeachers.sort((a, b) => 
// // //         teacherWorkload[a] - teacherWorkload[b]
// // //       )[0];
// // //       const room = availableRooms[0];

// // //       // Update trackers
// // //       teacherWorkload[teacher]++;
// // //       teacherAvailability[teacher][day].add(timeSlot);
// // //       roomAssignments[day][timeSlot].add(room);

// // //       return {
// // //         subject,
// // //         teacher,
// // //         room,
// // //         time: timeSlot
// // //       };
// // //     };

// // //     // Generate regular classes with subject rotation
// // //     totalClasses.forEach(className => {
// // //       // Create a subject rotation plan for the week
// // //       const subjectRotation = [];
// // //       const subjectPool = [...subjects];
      
// // //       // Distribute subjects evenly across days
// // //       for (let i = 0; i < workingDays.length; i++) {
// // //         const daySubjects = [];
// // //         const subjectsPerDay = Math.ceil(subjects.length / workingDays.length);
        
// // //         for (let j = 0; j < subjectsPerDay; j++) {
// // //           const subjectIndex = (i + j) % subjectPool.length;
// // //           daySubjects.push(subjectPool[subjectIndex].name);
// // //         }
        
// // //         subjectRotation.push(daySubjects);
// // //       }

// // //       workingDays.forEach((day, dayIndex) => {
// // //         const daySubjects = subjectRotation[dayIndex % subjectRotation.length];
// // //         const shuffledSubjects = [...daySubjects].sort(() => Math.random() - 0.5);
// // //         const usedSubjects = new Set();

// // //         for (let i = 0; i < totalClassesPerDay; i++) {
// // //           const timeSlot = classTimes[i];
// // //           let slotAssigned = false;

// // //           // Try preferred subjects first
// // //           for (const subject of shuffledSubjects) {
// // //             if (!usedSubjects.has(subject)) {
// // //               const slot = assignSlot(className, day, timeSlot, subject);
// // //               if (slot) {
// // //                 timetable[className][day].classes.push(slot);
// // //                 usedSubjects.add(subject);
// // //                 slotAssigned = true;
// // //                 break;
// // //               }
// // //             }
// // //           }

// // //           // Fallback to any available subject
// // //           if (!slotAssigned) {
// // //             const fallbackSubject = subjects.find(s => 
// // //               !usedSubjects.has(s.name)
// // //             );
// // //             if (fallbackSubject) {
// // //               const slot = assignSlot(className, day, timeSlot, fallbackSubject.name);
// // //               if (slot) {
// // //                 timetable[className][day].classes.push(slot);
// // //                 usedSubjects.add(fallbackSubject.name);
// // //               }
// // //             }
// // //           }
// // //         }
// // //       });
// // //     });

// // //     // ======================
// // //     // 4. LAB SESSION SCHEDULING
// // //     // ======================
// // //     if (includeLabs) {
// // //       const labLocationUsage = {};
// // //       workingDays.forEach(day => {
// // //         labLocationUsage[day] = new Set();
// // //       });

// // //       totalClasses.forEach(className => {
// // //         workingDays.forEach((day, dayIndex) => {
// // //           const labSlots = [];
// // //           const availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

// // //           // Rotate lab subjects through batches
// // //           batches.forEach((batch, batchIndex) => {
// // //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// // //             const subject = subjects[subjectIndex].name;
// // //             const subjectTeachers = subjects[subjectIndex].teachers;

// // //             // Find available teacher
// // //             const availableTeachers = subjectTeachers.filter(teacher => 
// // //               !teacherAvailability[teacher][day].has(labTimings[0])
// // //             );
// // //             if (availableTeachers.length === 0) {
// // //               throw new Error(`No teachers available for ${subject} lab on ${day}`);
// // //             }

// // //             // Find available lab location
// // //             let labLocation = null;
// // //             for (const lab of availableLabs) {
// // //               if (!labLocationUsage[day].has(lab)) {
// // //                 labLocation = lab;
// // //                 break;
// // //               }
// // //             }
// // //             if (!labLocation) {
// // //               throw new Error(`No lab location available for ${subject} on ${day}`);
// // //             }

// // //             // Select least busy teacher
// // //             const teacher = availableTeachers.sort((a, b) => 
// // //               teacherWorkload[a] - teacherWorkload[b]
// // //             )[0];

// // //             // Update trackers
// // //             teacherWorkload[teacher]++;
// // //             teacherAvailability[teacher][day].add(labTimings[0]);
// // //             labLocationUsage[day].add(labLocation);

// // //             labSlots.push({
// // //               batch,
// // //               subject,
// // //               teacher,
// // //               lab: labLocation,
// // //               time: labTimings[0],
// // //               isLab: true
// // //             });
// // //           });

// // //           timetable[className][day].lab = {
// // //             type: "Lab",
// // //             slots: labSlots,
// // //             time: labTimings[0]
// // //           };
// // //         });
// // //       });
// // //     }

// // //     // ======================
// // //     // 5. FINAL VALIDATION
// // //     // ======================
// // //     const validateTimetable = () => {
// // //       const conflicts = [];
// // //       const teacherTracker = {};
// // //       const roomTracker = {};

// // //       workingDays.forEach(day => {
// // //         teacherTracker[day] = {};
// // //         roomTracker[day] = {};
// // //         classTimes.forEach(time => {
// // //           teacherTracker[day][time] = new Set();
// // //           roomTracker[day][time] = new Set();
// // //         });
// // //       });

// // //       totalClasses.forEach(className => {
// // //         workingDays.forEach(day => {
// // //           timetable[className][day].classes.forEach(cls => {
// // //             // Check teacher conflicts
// // //             if (teacherTracker[day][cls.time].has(cls.teacher)) {
// // //               conflicts.push(`Teacher ${cls.teacher} double booked on ${day} at ${cls.time}`);
// // //             } else {
// // //               teacherTracker[day][cls.time].add(cls.teacher);
// // //             }

// // //             // Check room conflicts
// // //             if (roomTracker[day][cls.time].has(cls.room)) {
// // //               conflicts.push(`Room ${cls.room} double booked on ${day} at ${cls.time}`);
// // //             } else {
// // //               roomTracker[day][cls.time].add(cls.room);
// // //             }
// // //           });
// // //         });
// // //       });

// // //       return conflicts;
// // //     };

// // //     const conflicts = validateTimetable();
// // //     if (conflicts.length > 0) {
// // //       throw new Error(`TIMETABLE CONFLICTS:\n${conflicts.join("\n")}`);
// // //     }

// // //     // ======================
// // //     // 6. SAVE AND RETURN
// // //     // ======================
// // //     const result = {
// // //       collegeName,
// // //       branchName,
// // //       workingDays,
// // //       classTimes,
// // //       labTimings: includeLabs ? labTimings : [],
// // //       timetable,
// // //       metadata: {
// // //         generatedAt: new Date(),
// // //         version: 1,
// // //         stats: {
// // //           totalClasses: totalClasses.length,
// // //           totalSubjects: subjects.length,
// // //           totalTeachers: teacherPool.size,
// // //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// // //           includesLabs: includeLabs
// // //         }
// // //       }
// // //     };

// // //     // Save to database
// // //     const newTimetable = new Timetable(result);
// // //     await newTimetable.save();

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// // //       ...result
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Generation failed:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //       suggestion: error.message.includes("teacher") ? 
// // //         "Add more teachers or reduce weekly classes per teacher" :
// // //         error.message.includes("room") ?
// // //         "Add more rooms or reduce number of concurrent classes" :
// // //         "Please check all input parameters"
// // //     });
// // //   }
// // // };

// // // export const getResultTimeTableController = async (req, res) => {
// // //   try {
// // //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// // //     res.status(200).json(timetables);
// // //   } catch (error) {
// // //     res.status(500).json({ error: "Failed to fetch timetables" });
// // //   }
// // // };

// // // import { createRequire } from "module";
// // // const require = createRequire(import.meta.url);
// // // const Timetable = require("../models/timetable.model");

// // // export const generateTimeTableController = async (req, res) => {
// // //   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

// // //   try {
// // //     const {
// // //       collegeName,
// // //       branchName,
// // //       workingDays,
// // //       classTimes,
// // //       totalClasses,
// // //       subjects,
// // //       rooms,
// // //       labLocations = [],
// // //       totalClassesPerDay,
// // //       batches = [],
// // //       labTimings = [],
// // //       includeLabs = false
// // //     } = req.body;

// // //     // ======================
// // //     // 1. VALIDATION PHASE
// // //     // ======================
// // //     const errors = [];
// // //     if (!collegeName) errors.push("College name is required");
// // //     if (!branchName) errors.push("Branch name is required");
// // //     if (!workingDays?.length) errors.push("Working days are required");
// // //     if (!classTimes?.length) errors.push("Class times are required");
// // //     if (!totalClasses?.length) errors.push("Total classes are required");
// // //     if (!subjects?.length) errors.push("Subjects are required");
// // //     if (!rooms?.length) errors.push("Rooms are required");
// // //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// // //     // Teacher validation
// // //     const teacherPool = new Set();
// // //     subjects.forEach(subject => {
// // //       if (!subject.teachers?.length) {
// // //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// // //       } else {
// // //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// // //       }
// // //     });

// // //     // Room validation
// // //     if (rooms.length < totalClasses.length) {
// // //       errors.push(`Need ${totalClasses.length} rooms (only ${rooms.length} provided)`);
// // //     }

// // //     // Lab validation (if enabled)
// // //     if (includeLabs) {
// // //       if (!batches.length) errors.push("No batches provided for lab sessions");
// // //       if (!labLocations.length) errors.push("No lab locations provided");
// // //       if (labLocations.length < batches.length) {
// // //         errors.push(`Need ${batches.length} lab locations (only ${labLocations.length} provided)`);
// // //       }
// // //       if (!labTimings.length) errors.push("No lab timings provided");
// // //     }

// // //     if (errors.length > 0) {
// // //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// // //     }

// // //     // ======================
// // //     // 2. INITIALIZATION
// // //     // ======================
// // //     const timetable = {};
// // //     const teacherTimetables = {}; // NEW: For teacher schedules
// // //     const roomAssignments = {}; // { day: { time: Set<room> } }
// // //     workingDays.forEach(day => {
// // //       roomAssignments[day] = {};
// // //       classTimes.forEach(time => {
// // //         roomAssignments[day][time] = new Set();
// // //       });
// // //     });

// // //     // Initialize timetable structure
// // //     totalClasses.forEach(className => {
// // //       timetable[className] = {};
// // //       workingDays.forEach(day => {
// // //         timetable[className][day] = {
// // //           classes: [],
// // //           lab: null
// // //         };
// // //       });
// // //     });

// // //     // Teacher tracking
// // //     const teacherWorkload = {};
// // //     const teacherAvailability = {};
// // //     subjects.forEach(subject => {
// // //       subject.teachers.forEach(teacher => {
// // //         teacherWorkload[teacher] = 0;
// // //         teacherAvailability[teacher] = {};
// // //         workingDays.forEach(day => {
// // //           teacherAvailability[teacher][day] = new Set();
// // //         });
// // //         // NEW: Initialize teacher timetable
// // //         teacherTimetables[teacher] = {};
// // //       });
// // //     });

// // //     // ======================
// // //     // 3. CORE SCHEDULING LOGIC
// // //     // ======================
// // //     const assignSlot = (className, day, timeSlot, subject) => {
// // //       const subjectData = subjects.find(s => s.name === subject);
// // //       if (!subjectData) return null;

// // //       // Get available teachers
// // //       const availableTeachers = subjectData.teachers.filter(teacher => 
// // //         !teacherAvailability[teacher][day].has(timeSlot)
// // //       );
// // //       if (availableTeachers.length === 0) return null;

// // //       // Get available rooms
// // //       const availableRooms = rooms.filter(room => 
// // //         !roomAssignments[day][timeSlot].has(room)
// // //       );
// // //       if (availableRooms.length === 0) return null;

// // //       // Select least busy teacher and first available room
// // //       const teacher = availableTeachers.sort((a, b) => 
// // //         teacherWorkload[a] - teacherWorkload[b]
// // //       )[0];
// // //       const room = availableRooms[0];

// // //       // Update trackers
// // //       teacherWorkload[teacher]++;
// // //       teacherAvailability[teacher][day].add(timeSlot);
// // //       roomAssignments[day][timeSlot].add(room);

// // //       // NEW: Update teacher timetable
// // //       if (!teacherTimetables[teacher][day]) {
// // //         teacherTimetables[teacher][day] = {};
// // //       }
// // //       teacherTimetables[teacher][day][timeSlot] = {
// // //         subject,
// // //         class: className,
// // //         room,
// // //         isLab: false
// // //       };

// // //       return {
// // //         subject,
// // //         teacher,
// // //         room,
// // //         time: timeSlot
// // //       };
// // //     };

// // //     // Generate regular classes with subject rotation
// // //     totalClasses.forEach(className => {
// // //       // Create a subject rotation plan for the week
// // //       const subjectRotation = [];
// // //       const subjectPool = [...subjects];
      
// // //       // Distribute subjects evenly across days
// // //       for (let i = 0; i < workingDays.length; i++) {
// // //         const daySubjects = [];
// // //         const subjectsPerDay = Math.ceil(subjects.length / workingDays.length);
        
// // //         for (let j = 0; j < subjectsPerDay; j++) {
// // //           const subjectIndex = (i + j) % subjectPool.length;
// // //           daySubjects.push(subjectPool[subjectIndex].name);
// // //         }
        
// // //         subjectRotation.push(daySubjects);
// // //       }

// // //       workingDays.forEach((day, dayIndex) => {
// // //         const daySubjects = subjectRotation[dayIndex % subjectRotation.length];
// // //         const shuffledSubjects = [...daySubjects].sort(() => Math.random() - 0.5);
// // //         const usedSubjects = new Set();

// // //         for (let i = 0; i < totalClassesPerDay; i++) {
// // //           const timeSlot = classTimes[i];
// // //           let slotAssigned = false;

// // //           // Try preferred subjects first
// // //           for (const subject of shuffledSubjects) {
// // //             if (!usedSubjects.has(subject)) {
// // //               const slot = assignSlot(className, day, timeSlot, subject);
// // //               if (slot) {
// // //                 timetable[className][day].classes.push(slot);
// // //                 usedSubjects.add(subject);
// // //                 slotAssigned = true;
// // //                 break;
// // //               }
// // //             }
// // //           }

// // //           // Fallback to any available subject
// // //           if (!slotAssigned) {
// // //             const fallbackSubject = subjects.find(s => 
// // //               !usedSubjects.has(s.name)
// // //             );
// // //             if (fallbackSubject) {
// // //               const slot = assignSlot(className, day, timeSlot, fallbackSubject.name);
// // //               if (slot) {
// // //                 timetable[className][day].classes.push(slot);
// // //                 usedSubjects.add(fallbackSubject.name);
// // //               }
// // //             }
// // //           }
// // //         }
// // //       });
// // //     });

// // //     // ======================
// // //     // 4. LAB SESSION SCHEDULING
// // //     // ======================
// // //     if (includeLabs) {
// // //       const labLocationUsage = {};
// // //       workingDays.forEach(day => {
// // //         labLocationUsage[day] = new Set();
// // //       });

// // //       totalClasses.forEach(className => {
// // //         workingDays.forEach((day, dayIndex) => {
// // //           const labSlots = [];
// // //           const availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

// // //           // Rotate lab subjects through batches
// // //           batches.forEach((batch, batchIndex) => {
// // //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// // //             const subject = subjects[subjectIndex].name;
// // //             const subjectTeachers = subjects[subjectIndex].teachers;

// // //             // Find available teacher
// // //             const availableTeachers = subjectTeachers.filter(teacher => 
// // //               !teacherAvailability[teacher][day].has(labTimings[0])
// // //             );
// // //             if (availableTeachers.length === 0) {
// // //               throw new Error(`No teachers available for ${subject} lab on ${day}`);
// // //             }

// // //             // Find available lab location
// // //             let labLocation = null;
// // //             for (const lab of availableLabs) {
// // //               if (!labLocationUsage[day].has(lab)) {
// // //                 labLocation = lab;
// // //                 break;
// // //               }
// // //             }
// // //             if (!labLocation) {
// // //               throw new Error(`No lab location available for ${subject} on ${day}`);
// // //             }

// // //             // Select least busy teacher
// // //             const teacher = availableTeachers.sort((a, b) => 
// // //               teacherWorkload[a] - teacherWorkload[b]
// // //             )[0];

// // //             // Update trackers
// // //             teacherWorkload[teacher]++;
// // //             teacherAvailability[teacher][day].add(labTimings[0]);
// // //             labLocationUsage[day].add(labLocation);

// // //             // NEW: Update teacher timetable for lab
// // //             if (!teacherTimetables[teacher][day]) {
// // //               teacherTimetables[teacher][day] = {};
// // //             }
// // //             teacherTimetables[teacher][day][labTimings[0]] = {
// // //               subject,
// // //               batch,
// // //               location: labLocation,
// // //               isLab: true
// // //             };

// // //             labSlots.push({
// // //               batch,
// // //               subject,
// // //               teacher,
// // //               lab: labLocation,
// // //               time: labTimings[0],
// // //               isLab: true
// // //             });
// // //           });

// // //           timetable[className][day].lab = {
// // //             type: "Lab",
// // //             slots: labSlots,
// // //             time: labTimings[0]
// // //           };
// // //         });
// // //       });
// // //     }

// // //     // ======================
// // //     // 5. FINAL VALIDATION
// // //     // ======================
// // //     const validateTimetable = () => {
// // //       const conflicts = [];
// // //       const teacherTracker = {};
// // //       const roomTracker = {};

// // //       workingDays.forEach(day => {
// // //         teacherTracker[day] = {};
// // //         roomTracker[day] = {};
// // //         classTimes.forEach(time => {
// // //           teacherTracker[day][time] = new Set();
// // //           roomTracker[day][time] = new Set();
// // //         });
// // //       });

// // //       totalClasses.forEach(className => {
// // //         workingDays.forEach(day => {
// // //           timetable[className][day].classes.forEach(cls => {
// // //             // Check teacher conflicts
// // //             if (teacherTracker[day][cls.time].has(cls.teacher)) {
// // //               conflicts.push(`Teacher ${cls.teacher} double booked on ${day} at ${cls.time}`);
// // //             } else {
// // //               teacherTracker[day][cls.time].add(cls.teacher);
// // //             }

// // //             // Check room conflicts
// // //             if (roomTracker[day][cls.time].has(cls.room)) {
// // //               conflicts.push(`Room ${cls.room} double booked on ${day} at ${cls.time}`);
// // //             } else {
// // //               roomTracker[day][cls.time].add(cls.room);
// // //             }
// // //           });
// // //         });
// // //       });

// // //       return conflicts;
// // //     };

// // //     const conflicts = validateTimetable();
// // //     if (conflicts.length > 0) {
// // //       throw new Error(`TIMETABLE CONFLICTS:\n${conflicts.join("\n")}`);
// // //     }

// // //     // ======================
// // //     // 6. SAVE AND RETURN
// // //     // ======================
// // //     const result = {
// // //       collegeName,
// // //       branchName,
// // //       workingDays,
// // //       classTimes,
// // //       labTimings: includeLabs ? labTimings : [],
// // //       timetable,
// // //       teacherTimetables, // NEW: Added teacher timetables
// // //       metadata: {
// // //         generatedAt: new Date(),
// // //         version: 1,
// // //         stats: {
// // //           totalClasses: totalClasses.length,
// // //           totalSubjects: subjects.length,
// // //           totalTeachers: teacherPool.size,
// // //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// // //           includesLabs: includeLabs
// // //         }
// // //       }
// // //     };

// // //     // Save to database
// // //     const newTimetable = new Timetable(result);
// // //     await newTimetable.save();

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// // //       ...result
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Generation failed:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //       suggestion: error.message.includes("teacher") ? 
// // //         "Add more teachers or reduce weekly classes per teacher" :
// // //         error.message.includes("room") ?
// // //         "Add more rooms or reduce number of concurrent classes" :
// // //         "Please check all input parameters"
// // //     });
// // //   }
// // // };

// // // export const getResultTimeTableController = async (req, res) => {
// // //   try {
// // //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// // //     res.status(200).json(timetables);
// // //   } catch (error) {
// // //     res.status(500).json({ error: "Failed to fetch timetables" });
// // //   }
// // // };

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Container, Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Tabs, Tab } from '@mui/material';
// // // import { styled } from '@mui/material/styles';
// // // import { toast } from 'react-toastify';

// // // const StyledTableCell = styled(TableCell)(({ theme }) => ({
// // //   fontWeight: 'bold',
// // //   backgroundColor: theme.palette.primary.main,
// // //   color: theme.palette.common.white,
// // // }));

// // // const ResultTimetableComponent = () => {
// // //   const [timetables, setTimetables] = useState([]);
// // //   const [selectedTimetable, setSelectedTimetable] = useState(null);
// // //   const [activeTab, setActiveTab] = useState(0);
// // //   const [selectedTeacher, setSelectedTeacher] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchTimetables = async () => {
// // //       try {
// // //         const response = await fetch('/api/timetable');
// // //         const data = await response.json();
// // //         setTimetables(data);
// // //         if (data.length > 0) {
// // //           setSelectedTimetable(data[0]);
// // //         }
// // //       } catch (error) {
// // //         toast.error('Failed to fetch timetables');
// // //       }
// // //     };
// // //     fetchTimetables();
// // //   }, []);

// // //   const handleTabChange = (event, newValue) => {
// // //     setActiveTab(newValue);
// // //   };

// // //   const renderStudentTimetable = () => {
// // //     if (!selectedTimetable) return null;

// // //     return (
// // //       <Box mt={4}>
// // //         <Typography variant="h5" gutterBottom>
// // //           Student Timetables
// // //         </Typography>
// // //         {Object.entries(selectedTimetable.timetable).map(([className, classData]) => (
// // //           <Box key={className} mb={6}>
// // //             <Typography variant="h6" gutterBottom>
// // //               {className} Timetable
// // //             </Typography>
// // //             <TableContainer component={Paper}>
// // //               <Table>
// // //                 <TableHead>
// // //                   <TableRow>
// // //                     <StyledTableCell>Day/Time</StyledTableCell>
// // //                     {selectedTimetable.classTimes.map((time) => (
// // //                       <StyledTableCell key={time}>{time}</StyledTableCell>
// // //                     ))}
// // //                     {selectedTimetable.labTimings.length > 0 && (
// // //                       <StyledTableCell>Lab Session</StyledTableCell>
// // //                     )}
// // //                   </TableRow>
// // //                 </TableHead>
// // //                 <TableBody>
// // //                   {selectedTimetable.workingDays.map((day) => (
// // //                     <TableRow key={day}>
// // //                       <TableCell>{day}</TableCell>
// // //                       {selectedTimetable.classTimes.map((time) => {
// // //                         const classSlot = classData[day].classes.find(
// // //                           (slot) => slot.time === time
// // //                         );
// // //                         return (
// // //                           <TableCell key={time}>
// // //                             {classSlot ? (
// // //                               <div>
// // //                                 <strong>{classSlot.subject}</strong>
// // //                                 <br />
// // //                                 {classSlot.teacher}
// // //                                 <br />
// // //                                 {classSlot.room}
// // //                               </div>
// // //                             ) : (
// // //                               '-'
// // //                             )}
// // //                           </TableCell>
// // //                         );
// // //                       })}
// // //                       {selectedTimetable.labTimings.length > 0 && (
// // //                         <TableCell>
// // //                           {classData[day].lab ? (
// // //                             <div>
// // //                               <strong>Lab: {classData[day].lab.slots[0].subject}</strong>
// // //                               <br />
// // //                               Batch: {classData[day].lab.slots.map(s => s.batch).join(', ')}
// // //                               <br />
// // //                               Location: {classData[day].lab.slots[0].lab}
// // //                               <br />
// // //                               Teacher: {classData[day].lab.slots[0].teacher}
// // //                             </div>
// // //                           ) : (
// // //                             '-'
// // //                           )}
// // //                         </TableCell>
// // //                       )}
// // //                     </TableRow>
// // //                   ))}
// // //                 </TableBody>
// // //               </Table>
// // //             </TableContainer>
// // //           </Box>
// // //         ))}
// // //       </Box>
// // //     );
// // //   };

// // //   const renderTeacherTimetable = () => {
// // //     if (!selectedTimetable || !selectedTeacher) return null;

// // //     const teacherData = selectedTimetable.teacherTimetables[selectedTeacher];
// // //     if (!teacherData) return null;

// // //     return (
// // //       <Box mt={4}>
// // //         <Typography variant="h5" gutterBottom>
// // //           Teacher Timetable: {selectedTeacher}
// // //         </Typography>
// // //         <TableContainer component={Paper}>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <StyledTableCell>Day/Time</StyledTableCell>
// // //                 {[...selectedTimetable.classTimes, ...selectedTimetable.labTimings].map((time) => (
// // //                   <StyledTableCell key={time}>{time}</StyledTableCell>
// // //                 ))}
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {selectedTimetable.workingDays.map((day) => (
// // //                 <TableRow key={day}>
// // //                   <TableCell>{day}</TableCell>
// // //                   {[...selectedTimetable.classTimes, ...selectedTimetable.labTimings].map((time) => {
// // //                     const slot = teacherData[day]?.[time];
// // //                     return (
// // //                       <TableCell key={time}>
// // //                         {slot ? (
// // //                           <div>
// // //                             {slot.type === 'CLASS' ? (
// // //                               <>
// // //                                 <strong>{slot.subject}</strong>
// // //                                 <br />
// // //                                 Class: {slot.className}
// // //                                 <br />
// // //                                 Room: {slot.room}
// // //                               </>
// // //                             ) : (
// // //                               <>
// // //                                 <strong>LAB: {slot.subject}</strong>
// // //                                 <br />
// // //                                 Batch: {slot.batch}
// // //                                 <br />
// // //                                 Location: {slot.location}
// // //                               </>
// // //                             )}
// // //                           </div>
// // //                         ) : (
// // //                           '-'
// // //                         )}
// // //                       </TableCell>
// // //                     );
// // //                   })}
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       </Box>
// // //     );
// // //   };

// // //   const renderTeacherSelector = () => {
// // //     if (!selectedTimetable) return null;

// // //     const teachers = Object.keys(selectedTimetable.teacherTimetables || {});
// // //     if (teachers.length === 0) return null;

// // //     return (
// // //       <Box mt={4}>
// // //         <Typography variant="h6" gutterBottom>
// // //           Select Teacher
// // //         </Typography>
// // //         <Grid container spacing={2}>
// // //           {teachers.map((teacher) => (
// // //             <Grid item key={teacher}>
// // //               <Button
// // //                 variant={selectedTeacher === teacher ? 'contained' : 'outlined'}
// // //                 onClick={() => setSelectedTeacher(teacher)}
// // //               >
// // //                 {teacher}
// // //               </Button>
// // //             </Grid>
// // //           ))}
// // //         </Grid>
// // //       </Box>
// // //     );
// // //   };

// // //   return (
// // //     <Container maxWidth="xl">
// // //       <Box my={4}>
// // //         <Typography variant="h4" gutterBottom>
// // //           Generated Timetables
// // //         </Typography>
        
// // //         {timetables.length > 0 && (
// // //           <Box mb={4}>
// // //             <Typography variant="h6">Select Timetable</Typography>
// // //             <Grid container spacing={2}>
// // //               {timetables.map((tt) => (
// // //                 <Grid item key={tt._id}>
// // //                   <Button
// // //                     variant={selectedTimetable?._id === tt._id ? 'contained' : 'outlined'}
// // //                     onClick={() => {
// // //                       setSelectedTimetable(tt);
// // //                       setSelectedTeacher(null);
// // //                     }}
// // //                   >
// // //                     {tt.collegeName} - {tt.branchName}
// // //                   </Button>
// // //                 </Grid>
// // //               ))}
// // //             </Grid>
// // //           </Box>
// // //         )}

// // //         {selectedTimetable && (
// // //           <>
// // //             <Tabs value={activeTab} onChange={handleTabChange}>
// // //               <Tab label="Student Timetables" />
// // //               <Tab label="Teacher Timetables" />
// // //             </Tabs>

// // //             {activeTab === 0 && renderStudentTimetable()}
// // //             {activeTab === 1 && (
// // //               <>
// // //                 {renderTeacherSelector()}
// // //                 {renderTeacherTimetable()}
// // //               </>
// // //             )}
// // //           </>
// // //         )}
// // //       </Box>
// // //     </Container>
// // //   );
// // // };

// // // export default ResultTimetableComponent;







































































































































// // // import { createRequire } from "module";
// // // const require = createRequire(import.meta.url);
// // // const Timetable = require("../models/timetable.model");

// // // export const generateTimeTableController = async (req, res) => {
// // //   console.log("📩 Received Request Data:", JSON.stringify(req.body, null, 2));

// // //   try {
// // //     const {
// // //       collegeName,
// // //       branchName,
// // //       workingDays,
// // //       classTimes,
// // //       totalClasses,
// // //       subjects,
// // //       rooms,
// // //       labLocations = [],
// // //       totalClassesPerDay,
// // //       batches = [],
// // //       labTimings = [],
// // //       includeLabs = false
// // //     } = req.body;

// // //     // ======================
// // //     // 1. VALIDATION PHASE
// // //     // ======================
// // //     const errors = [];
// // //     if (!collegeName) errors.push("College name is required");
// // //     if (!branchName) errors.push("Branch name is required");
// // //     if (!workingDays?.length) errors.push("Working days are required");
// // //     if (!classTimes?.length) errors.push("Class times are required");
// // //     if (!totalClasses?.length) errors.push("Total classes are required");
// // //     if (!subjects?.length) errors.push("Subjects are required");
// // //     if (!rooms?.length) errors.push("Rooms are required");
// // //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// // //     // Teacher validation
// // //     const teacherPool = new Set();
// // //     subjects.forEach(subject => {
// // //       if (!subject.teachers?.length) {
// // //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// // //       } else {
// // //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// // //       }
// // //     });

// // //     // Room validation
// // //     if (rooms.length < totalClasses.length) {
// // //       errors.push(`Need ${totalClasses.length} rooms (only ${rooms.length} provided)`);
// // //     }

// // //     // Lab validation (if enabled)
// // //     if (includeLabs) {
// // //       if (!batches.length) errors.push("No batches provided for lab sessions");
// // //       if (!labLocations.length) errors.push("No lab locations provided");
// // //       if (labLocations.length < batches.length) {
// // //         errors.push(`Need ${batches.length} lab locations (only ${labLocations.length} provided)`);
// // //       }
// // //       if (!labTimings.length) errors.push("No lab timings provided");
// // //     }

// // //     if (errors.length > 0) {
// // //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// // //     }

// // //     // ======================
// // //     // 2. INITIALIZATION
// // //     // ======================
// // //     const timetable = {};
// // //     const teacherTimetables = {};
// // //     const roomAssignments = {};
// // //     workingDays.forEach(day => {
// // //       roomAssignments[day] = {};
// // //       classTimes.forEach(time => {
// // //         roomAssignments[day][time] = new Set();
// // //       });
// // //     });

// // //     // Initialize timetable structure
// // //     totalClasses.forEach(className => {
// // //       timetable[className] = {};
// // //       workingDays.forEach(day => {
// // //         timetable[className][day] = {
// // //           classes: [],
// // //           lab: null
// // //         };
// // //       });
// // //     });

// // //     // Teacher tracking
// // //     const teacherWorkload = {};
// // //     const teacherAvailability = {};
// // //     Array.from(teacherPool).forEach(teacher => {
// // //       teacherWorkload[teacher] = 0;
// // //       teacherAvailability[teacher] = {};
// // //       teacherTimetables[teacher] = {};
      
// // //       workingDays.forEach(day => {
// // //         teacherAvailability[teacher][day] = new Set();
// // //         teacherTimetables[teacher][day] = {};
        
// // //         classTimes.forEach(time => {
// // //           teacherTimetables[teacher][day][time] = null;
// // //         });
        
// // //         if (includeLabs) {
// // //           labTimings.forEach(time => {
// // //             teacherTimetables[teacher][day][time] = null;
// // //           });
// // //         }
// // //       });
// // //     });

// // //     // ======================
// // //     // 3. CORE SCHEDULING LOGIC
// // //     // ======================
// // //     const assignSlot = (className, day, timeSlot, subject) => {
// // //       const subjectData = subjects.find(s => s.name === subject);
// // //       if (!subjectData) return null;

// // //       const availableTeachers = subjectData.teachers.filter(teacher => 
// // //         !teacherAvailability[teacher][day].has(timeSlot)
// // //       );
// // //       if (availableTeachers.length === 0) return null;

// // //       const availableRooms = rooms.filter(room => 
// // //         !roomAssignments[day][timeSlot].has(room)
// // //       );
// // //       if (availableRooms.length === 0) return null;

// // //       const teacher = availableTeachers.sort((a, b) => 
// // //         teacherWorkload[a] - teacherWorkload[b]
// // //       )[0];
// // //       const room = availableRooms[0];

// // //       teacherWorkload[teacher]++;
// // //       teacherAvailability[teacher][day].add(timeSlot);
// // //       roomAssignments[day][timeSlot].add(room);

// // //       teacherTimetables[teacher][day][timeSlot] = {
// // //         type: "CLASS",
// // //         subject,
// // //         className,
// // //         room,
// // //         time: timeSlot
// // //       };

// // //       return {
// // //         subject,
// // //         teacher,
// // //         room,
// // //         time: timeSlot
// // //       };
// // //     };

// // //     // Generate regular classes
// // //     totalClasses.forEach(className => {
// // //       const subjectRotation = [];
// // //       const subjectPool = [...subjects];
      
// // //       for (let i = 0; i < workingDays.length; i++) {
// // //         const daySubjects = [];
// // //         const subjectsPerDay = Math.ceil(subjects.length / workingDays.length);
        
// // //         for (let j = 0; j < subjectsPerDay; j++) {
// // //           const subjectIndex = (i + j) % subjectPool.length;
// // //           daySubjects.push(subjectPool[subjectIndex].name);
// // //         }
        
// // //         subjectRotation.push(daySubjects);
// // //       }

// // //       workingDays.forEach((day, dayIndex) => {
// // //         const daySubjects = subjectRotation[dayIndex % subjectRotation.length];
// // //         const shuffledSubjects = [...daySubjects].sort(() => Math.random() - 0.5);
// // //         const usedSubjects = new Set();

// // //         for (let i = 0; i < totalClassesPerDay; i++) {
// // //           const timeSlot = classTimes[i];
// // //           let slotAssigned = false;

// // //           for (const subject of shuffledSubjects) {
// // //             if (!usedSubjects.has(subject)) {
// // //               const slot = assignSlot(className, day, timeSlot, subject);
// // //               if (slot) {
// // //                 timetable[className][day].classes.push(slot);
// // //                 usedSubjects.add(subject);
// // //                 slotAssigned = true;
// // //                 break;
// // //               }
// // //             }
// // //           }

// // //           if (!slotAssigned) {
// // //             const fallbackSubject = subjects.find(s => 
// // //               !usedSubjects.has(s.name)
// // //             );
// // //             if (fallbackSubject) {
// // //               const slot = assignSlot(className, day, timeSlot, fallbackSubject.name);
// // //               if (slot) {
// // //                 timetable[className][day].classes.push(slot);
// // //                 usedSubjects.add(fallbackSubject.name);
// // //               }
// // //             }
// // //           }
// // //         }
// // //       });
// // //     });

// // //     // ======================
// // //     // 4. LAB SESSION SCHEDULING
// // //     // ======================
// // //     if (includeLabs) {
// // //       const labLocationUsage = {};
// // //       workingDays.forEach(day => {
// // //         labLocationUsage[day] = new Set();
// // //       });

// // //       totalClasses.forEach(className => {
// // //         workingDays.forEach((day, dayIndex) => {
// // //           const labSlots = [];
// // //           const availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

// // //           batches.forEach((batch, batchIndex) => {
// // //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// // //             const subject = subjects[subjectIndex].name;
// // //             const subjectTeachers = subjects[subjectIndex].teachers;

// // //             const availableTeachers = subjectTeachers.filter(teacher => 
// // //               !teacherAvailability[teacher][day].has(labTimings[0])
// // //             );
// // //             if (availableTeachers.length === 0) {
// // //               throw new Error(`No teachers available for ${subject} lab on ${day}`);
// // //             }

// // //             let labLocation = null;
// // //             for (const lab of availableLabs) {
// // //               if (!labLocationUsage[day].has(lab)) {
// // //                 labLocation = lab;
// // //                 break;
// // //               }
// // //             }
// // //             if (!labLocation) {
// // //               throw new Error(`No lab location available for ${subject} on ${day}`);
// // //             }

// // //             const teacher = availableTeachers.sort((a, b) => 
// // //               teacherWorkload[a] - teacherWorkload[b]
// // //             )[0];

// // //             teacherWorkload[teacher]++;
// // //             teacherAvailability[teacher][day].add(labTimings[0]);
// // //             labLocationUsage[day].add(labLocation);

// // //             teacherTimetables[teacher][day][labTimings[0]] = {
// // //               type: "LAB",
// // //               subject,
// // //               batch,
// // //               location: labLocation,
// // //               time: labTimings[0]
// // //             };

// // //             labSlots.push({
// // //               batch,
// // //               subject,
// // //               teacher,
// // //               lab: labLocation,
// // //               time: labTimings[0],
// // //               isLab: true
// // //             });
// // //           });

// // //           timetable[className][day].lab = {
// // //             type: "Lab",
// // //             slots: labSlots,
// // //             time: labTimings[0]
// // //           };
// // //         });
// // //       });
// // //     }

// // //     // ======================
// // //     // 5. FINAL VALIDATION
// // //     // ======================
// // //     const validateTimetable = () => {
// // //       const conflicts = [];
// // //       const teacherTracker = {};
// // //       const roomTracker = {};

// // //       workingDays.forEach(day => {
// // //         teacherTracker[day] = {};
// // //         roomTracker[day] = {};
// // //         classTimes.forEach(time => {
// // //           teacherTracker[day][time] = new Set();
// // //           roomTracker[day][time] = new Set();
// // //         });
// // //       });

// // //       totalClasses.forEach(className => {
// // //         workingDays.forEach(day => {
// // //           timetable[className][day].classes.forEach(cls => {
// // //             if (teacherTracker[day][cls.time].has(cls.teacher)) {
// // //               conflicts.push(`Teacher ${cls.teacher} double booked on ${day} at ${cls.time}`);
// // //             } else {
// // //               teacherTracker[day][cls.time].add(cls.teacher);
// // //             }

// // //             if (roomTracker[day][cls.time].has(cls.room)) {
// // //               conflicts.push(`Room ${cls.room} double booked on ${day} at ${cls.time}`);
// // //             } else {
// // //               roomTracker[day][cls.time].add(cls.room);
// // //             }
// // //           });
// // //         });
// // //       });

// // //       return conflicts;
// // //     };

// // //     const conflicts = validateTimetable();
// // //     if (conflicts.length > 0) {
// // //       throw new Error(`TIMETABLE CONFLICTS:\n${conflicts.join("\n")}`);
// // //     }

// // //     // ======================
// // //     // 6. SAVE AND RETURN
// // //     // ======================
// // //     const result = {
// // //       collegeName,
// // //       branchName,
// // //       workingDays,
// // //       classTimes,
// // //       labTimings: includeLabs ? labTimings : [],
// // //       timetable,
// // //       teacherTimetables,
// // //       metadata: {
// // //         generatedAt: new Date(),
// // //         version: 1,
// // //         stats: {
// // //           totalClasses: totalClasses.length,
// // //           totalSubjects: subjects.length,
// // //           totalTeachers: teacherPool.size,
// // //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// // //           includesLabs: includeLabs
// // //         }
// // //       }
// // //     };

// // //     const newTimetable = new Timetable(result);
// // //     await newTimetable.save();

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// // //       ...result
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Generation failed:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //       suggestion: error.message.includes("teacher") ? 
// // //         "Add more teachers or reduce weekly classes per teacher" :
// // //         error.message.includes("room") ?
// // //         "Add more rooms or reduce number of concurrent classes" :
// // //         "Please check all input parameters"
// // //     });
// // //   }
// // // };

// // // export const getResultTimeTableController = async (req, res) => {
// // //   try {
// // //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// // //     res.status(200).json(timetables);
// // //   } catch (error) {
// // //     res.status(500).json({ error: "Failed to fetch timetables" });
// // //   }
// // // };

// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url);
// // const Timetable = require("../models/timetable.model");

// // const transformTeacherTimetables = (teacherTimetables, workingDays, classTimes, labTimings) => {
// //   const result = {};
// //   Object.keys(teacherTimetables).forEach(teacher => {
// //     result[teacher] = {};
// //     workingDays.forEach(day => {
// //       result[teacher][day] = {};
      
// //       classTimes.forEach(time => {
// //         const slot = teacherTimetables[teacher][day][time];
// //         if (slot) {
// //           result[teacher][day][time] = {
// //             ...slot,
// //             displayText: `${slot.subject} - ${slot.className} (${slot.room})`
// //           };
// //         } else {
// //           result[teacher][day][time] = null;
// //         }
// //       });

// //       if (labTimings?.length > 0) {
// //         labTimings.forEach(time => {
// //           const slot = teacherTimetables[teacher][day][time];
// //           if (slot) {
// //             result[teacher][day][time] = {
// //               ...slot,
// //               displayText: `${slot.subject} Lab - Batch ${slot.batch} (${slot.location})`
// //             };
// //           } else {
// //             result[teacher][day][time] = null;
// //           }
// //         });
// //       }
// //     });
// //   });
// //   return result;
// // };

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
// //       labLocations = [],
// //       totalClassesPerDay,
// //       batches = [],
// //       labTimings = [],
// //       includeLabs = false
// //     } = req.body;

// //     const errors = [];
// //     if (!collegeName) errors.push("College name is required");
// //     if (!branchName) errors.push("Branch name is required");
// //     if (!workingDays?.length) errors.push("Working days are required");
// //     if (!classTimes?.length) errors.push("Class times are required");
// //     if (!totalClasses?.length) errors.push("Total classes are required");
// //     if (!subjects?.length) errors.push("Subjects are required");
// //     if (!rooms?.length) errors.push("Rooms are required");
// //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// //     const teacherPool = new Set();
// //     subjects.forEach(subject => {
// //       if (!subject.teachers?.length) {
// //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// //       } else {
// //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// //       }
// //     });

// //     if (rooms.length < totalClasses.length) {
// //       errors.push(`Need ${totalClasses.length} rooms (only ${rooms.length} provided)`);
// //     }

// //     if (includeLabs) {
// //       if (!batches.length) errors.push("No batches provided for lab sessions");
// //       if (!labLocations.length) errors.push("No lab locations provided");
// //       if (labLocations.length < batches.length) {
// //         errors.push(`Need ${batches.length} lab locations (only ${labLocations.length} provided)`);
// //       }
// //       if (!labTimings.length) errors.push("No lab timings provided");
// //     }

// //     if (errors.length > 0) {
// //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// //     }

// //     const timetable = {};
// //     const teacherTimetables = {};
// //     const roomAssignments = {};
// //     workingDays.forEach(day => {
// //       roomAssignments[day] = {};
// //       classTimes.forEach(time => {
// //         roomAssignments[day][time] = new Set();
// //       });
// //     });

// //     totalClasses.forEach(className => {
// //       timetable[className] = {};
// //       workingDays.forEach(day => {
// //         timetable[className][day] = {
// //           classes: [],
// //           lab: null
// //         };
// //       });
// //     });

// //     const teacherWorkload = {};
// //     const teacherAvailability = {};
// //     const teacherSubjectMap = {};

// //     subjects.forEach(subject => {
// //       subject.teachers.forEach(teacher => {
// //         if (!teacherSubjectMap[teacher]) {
// //           teacherSubjectMap[teacher] = new Set();
// //           teacherWorkload[teacher] = 0;
// //           teacherAvailability[teacher] = {};
// //           teacherTimetables[teacher] = {};
          
// //           workingDays.forEach(day => {
// //             teacherAvailability[teacher][day] = new Set();
// //             teacherTimetables[teacher][day] = {};
            
// //             classTimes.forEach(time => {
// //               teacherTimetables[teacher][day][time] = null;
// //             });
            
// //             if (includeLabs) {
// //               labTimings.forEach(time => {
// //                 teacherTimetables[teacher][day][time] = null;
// //               });
// //             }
// //           });
// //         }
// //         teacherSubjectMap[teacher].add(subject.name);
// //       });
// //     });

// //     const assignSlot = (className, day, timeSlot, subject) => {
// //       const subjectData = subjects.find(s => s.name === subject);
// //       if (!subjectData) return null;

// //       const availableTeachers = subjectData.teachers.filter(teacher => 
// //         !teacherAvailability[teacher][day].has(timeSlot)
// //       );
// //       if (availableTeachers.length === 0) return null;

// //       const availableRooms = rooms.filter(room => 
// //         !roomAssignments[day][timeSlot].has(room)
// //       );
// //       if (availableRooms.length === 0) return null;

// //       const teacher = availableTeachers.sort((a, b) => 
// //         teacherWorkload[a] - teacherWorkload[b]
// //       )[0];
// //       const room = availableRooms[0];

// //       teacherWorkload[teacher]++;
// //       teacherAvailability[teacher][day].add(timeSlot);
// //       roomAssignments[day][timeSlot].add(room);

// //       teacherTimetables[teacher][day][timeSlot] = {
// //         type: "CLASS",
// //         subject,
// //         className,
// //         room,
// //         time: timeSlot
// //       };

// //       return {
// //         subject,
// //         teacher,
// //         room,
// //         time: timeSlot
// //       };
// //     };

// //     totalClasses.forEach(className => {
// //       const subjectRotation = [];
// //       const subjectPool = [...subjects];
      
// //       for (let i = 0; i < workingDays.length; i++) {
// //         const daySubjects = [];
// //         const subjectsPerDay = Math.ceil(subjects.length / workingDays.length);
        
// //         for (let j = 0; j < subjectsPerDay; j++) {
// //           const subjectIndex = (i + j) % subjectPool.length;
// //           daySubjects.push(subjectPool[subjectIndex].name);
// //         }
        
// //         subjectRotation.push(daySubjects);
// //       }

// //       workingDays.forEach((day, dayIndex) => {
// //         const daySubjects = subjectRotation[dayIndex % subjectRotation.length];
// //         const shuffledSubjects = [...daySubjects].sort(() => Math.random() - 0.5);
// //         const usedSubjects = new Set();

// //         for (let i = 0; i < totalClassesPerDay; i++) {
// //           const timeSlot = classTimes[i];
// //           let slotAssigned = false;

// //           for (const subject of shuffledSubjects) {
// //             if (!usedSubjects.has(subject)) {
// //               const slot = assignSlot(className, day, timeSlot, subject);
// //               if (slot) {
// //                 timetable[className][day].classes.push(slot);
// //                 usedSubjects.add(subject);
// //                 slotAssigned = true;
// //                 break;
// //               }
// //             }
// //           }

// //           if (!slotAssigned) {
// //             const fallbackSubject = subjects.find(s => 
// //               !usedSubjects.has(s.name)
// //             );
// //             if (fallbackSubject) {
// //               const slot = assignSlot(className, day, timeSlot, fallbackSubject.name);
// //               if (slot) {
// //                 timetable[className][day].classes.push(slot);
// //                 usedSubjects.add(fallbackSubject.name);
// //               }
// //             }
// //           }
// //         }
// //       });
// //     });

// //     if (includeLabs) {
// //       const labLocationUsage = {};
// //       workingDays.forEach(day => {
// //         labLocationUsage[day] = new Set();
// //       });

// //       totalClasses.forEach(className => {
// //         workingDays.forEach((day, dayIndex) => {
// //           const labSlots = [];
// //           const availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

// //           batches.forEach((batch, batchIndex) => {
// //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// //             const subject = subjects[subjectIndex].name;
// //             const subjectTeachers = subjects[subjectIndex].teachers;

// //             const availableTeachers = subjectTeachers.filter(teacher => 
// //               !teacherAvailability[teacher][day].has(labTimings[0])
// //             );
// //             if (availableTeachers.length === 0) {
// //               throw new Error(`No teachers available for ${subject} lab on ${day}`);
// //             }

// //             let labLocation = null;
// //             for (const lab of availableLabs) {
// //               if (!labLocationUsage[day].has(lab)) {
// //                 labLocation = lab;
// //                 break;
// //               }
// //             }
// //             if (!labLocation) {
// //               throw new Error(`No lab location available for ${subject} on ${day}`);
// //             }

// //             const teacher = availableTeachers.sort((a, b) => 
// //               teacherWorkload[a] - teacherWorkload[b]
// //             )[0];

// //             teacherWorkload[teacher]++;
// //             teacherAvailability[teacher][day].add(labTimings[0]);
// //             labLocationUsage[day].add(labLocation);

// //             teacherTimetables[teacher][day][labTimings[0]] = {
// //               type: "LAB",
// //               subject,
// //               batch,
// //               location: labLocation,
// //               time: labTimings[0]
// //             };

// //             labSlots.push({
// //               batch,
// //               subject,
// //               teacher,
// //               lab: labLocation,
// //               time: labTimings[0],
// //               isLab: true
// //             });
// //           });

// //           timetable[className][day].lab = {
// //             type: "Lab",
// //             slots: labSlots,
// //             time: labTimings[0]
// //           };
// //         });
// //       });
// //     }

// //     const validateTimetable = () => {
// //       const conflicts = [];
// //       const teacherTracker = {};
// //       const roomTracker = {};

// //       workingDays.forEach(day => {
// //         teacherTracker[day] = {};
// //         roomTracker[day] = {};
// //         classTimes.forEach(time => {
// //           teacherTracker[day][time] = new Set();
// //           roomTracker[day][time] = new Set();
// //         });
// //       });

// //       totalClasses.forEach(className => {
// //         workingDays.forEach(day => {
// //           timetable[className][day].classes.forEach(cls => {
// //             if (teacherTracker[day][cls.time].has(cls.teacher)) {
// //               conflicts.push(`Teacher ${cls.teacher} double booked on ${day} at ${cls.time}`);
// //             } else {
// //               teacherTracker[day][cls.time].add(cls.teacher);
// //             }

// //             if (roomTracker[day][cls.time].has(cls.room)) {
// //               conflicts.push(`Room ${cls.room} double booked on ${day} at ${cls.time}`);
// //             } else {
// //               roomTracker[day][cls.time].add(cls.room);
// //             }
// //           });
// //         });
// //       });

// //       return conflicts;
// //     };

// //     const conflicts = validateTimetable();
// //     if (conflicts.length > 0) {
// //       throw new Error(`TIMETABLE CONFLICTS:\n${conflicts.join("\n")}`);
// //     }

// //     const formattedTeacherTimetables = transformTeacherTimetables(
// //       teacherTimetables,
// //       workingDays,
// //       classTimes,
// //       includeLabs ? labTimings : []
// //     );

// //     const result = {
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       labTimings: includeLabs ? labTimings : [],
// //       timetable,
// //       teacherTimetables: formattedTeacherTimetables,
// //       metadata: {
// //         generatedAt: new Date(),
// //         version: 1,
// //         stats: {
// //           totalClasses: totalClasses.length,
// //           totalSubjects: subjects.length,
// //           totalTeachers: teacherPool.size,
// //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// //           includesLabs: includeLabs
// //         }
// //       }
// //     };

// //     const newTimetable = new Timetable(result);
// //     await newTimetable.save();

// //     return res.status(200).json({
// //       success: true,
// //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// //       ...result
// //     });

// //   } catch (error) {
// //     console.error("❌ Generation failed:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: error.message,
// //       suggestion: error.message.includes("teacher") ? 
// //         "Add more teachers or reduce weekly classes per teacher" :
// //         error.message.includes("room") ?
// //         "Add more rooms or reduce number of concurrent classes" :
// //         "Please check all input parameters"
// //     });
// //   }
// // };

// // export const getResultTimeTableController = async (req, res) => {
// //   try {
// //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// //     res.status(200).json(timetables);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch timetables" });
// //   }
// // };

// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url);
// // const Timetable = require("../models/timetable.model");

// // const transformTeacherTimetables = (teacherTimetables, workingDays, classTimes, labTimings) => {
// //   const result = {};
// //   Object.keys(teacherTimetables).forEach(teacher => {
// //     result[teacher] = {};
// //     workingDays.forEach(day => {
// //       result[teacher][day] = {};
      
// //       classTimes.forEach(time => {
// //         const slot = teacherTimetables[teacher][day][time];
// //         if (slot) {
// //           result[teacher][day][time] = {
// //             ...slot,
// //             displayText: `${slot.subject} - ${slot.className} (${slot.room})`
// //           };
// //         } else {
// //           result[teacher][day][time] = null;
// //         }
// //       });

// //       if (labTimings?.length > 0) {
// //         labTimings.forEach(time => {
// //           const slot = teacherTimetables[teacher][day][time];
// //           if (slot) {
// //             result[teacher][day][time] = {
// //               ...slot,
// //               displayText: `${slot.subject} Lab - Batch ${slot.batch} (${slot.location})`
// //             };
// //           } else {
// //             result[teacher][day][time] = null;
// //           }
// //         });
// //       }
// //     });
// //   });
// //   return result;
// // };

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
// //       labLocations = [],
// //       totalClassesPerDay,
// //       batches = [],
// //       labTimings = [],
// //       includeLabs = false
// //     } = req.body;

// //     const errors = [];
// //     if (!collegeName) errors.push("College name is required");
// //     if (!branchName) errors.push("Branch name is required");
// //     if (!workingDays?.length) errors.push("Working days are required");
// //     if (!classTimes?.length) errors.push("Class times are required");
// //     if (!totalClasses?.length) errors.push("Total classes are required");
// //     if (!subjects?.length) errors.push("Subjects are required");
// //     if (!rooms?.length) errors.push("Rooms are required");
// //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// //     const teacherPool = new Set();
// //     subjects.forEach(subject => {
// //       if (!subject.teachers?.length) {
// //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// //       } else {
// //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// //       }
// //     });

// //     if (rooms.length < totalClasses.length) {
// //       errors.push(`Need ${totalClasses.length} rooms (only ${rooms.length} provided)`);
// //     }

// //     if (includeLabs) {
// //       if (!batches.length) errors.push("No batches provided for lab sessions");
// //       if (!labLocations.length) errors.push("No lab locations provided");
// //       if (labLocations.length < batches.length) {
// //         errors.push(`Need ${batches.length} lab locations (only ${labLocations.length} provided)`);
// //       }
// //       if (!labTimings.length) errors.push("No lab timings provided");
// //     }

// //     if (errors.length > 0) {
// //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// //     }

// //     const timetable = {};
// //     const teacherTimetables = {};
// //     const roomAssignments = {};
// //     workingDays.forEach(day => {
// //       roomAssignments[day] = {};
// //       classTimes.forEach(time => {
// //         roomAssignments[day][time] = new Set();
// //       });
// //     });

// //     totalClasses.forEach(className => {
// //       timetable[className] = {};
// //       workingDays.forEach(day => {
// //         timetable[className][day] = {
// //           classes: [],
// //           lab: null
// //         };
// //       });
// //     });

// //     const teacherWorkload = {};
// //     const teacherAvailability = {};
// //     const teacherSubjectMap = {};

// //     subjects.forEach(subject => {
// //       subject.teachers.forEach(teacher => {
// //         if (!teacherSubjectMap[teacher]) {
// //           teacherSubjectMap[teacher] = new Set();
// //           teacherWorkload[teacher] = 0;
// //           teacherAvailability[teacher] = {};
// //           teacherTimetables[teacher] = {};
          
// //           workingDays.forEach(day => {
// //             teacherAvailability[teacher][day] = new Set();
// //             teacherTimetables[teacher][day] = {};
            
// //             classTimes.forEach(time => {
// //               teacherTimetables[teacher][day][time] = null;
// //             });
            
// //             if (includeLabs) {
// //               labTimings.forEach(time => {
// //                 teacherTimetables[teacher][day][time] = null;
// //               });
// //             }
// //           });
// //         }
// //         teacherSubjectMap[teacher].add(subject.name);
// //       });
// //     });

// //     const assignSlot = (className, day, timeSlot, subject) => {
// //       const subjectData = subjects.find(s => s.name === subject);
// //       if (!subjectData) return null;

// //       const availableTeachers = subjectData.teachers.filter(teacher => 
// //         !teacherAvailability[teacher][day].has(timeSlot)
// //       );
// //       if (availableTeachers.length === 0) return null;

// //       const availableRooms = rooms.filter(room => 
// //         !roomAssignments[day][timeSlot].has(room)
// //       );
// //       if (availableRooms.length === 0) return null;

// //       const teacher = availableTeachers.sort((a, b) => 
// //         teacherWorkload[a] - teacherWorkload[b]
// //       )[0];
// //       const room = availableRooms[0];

// //       teacherWorkload[teacher]++;
// //       teacherAvailability[teacher][day].add(timeSlot);
// //       roomAssignments[day][timeSlot].add(room);

// //       teacherTimetables[teacher][day][timeSlot] = {
// //         type: "CLASS",
// //         subject,
// //         className,
// //         room,
// //         time: timeSlot
// //       };

// //       return {
// //         subject,
// //         teacher,
// //         room,
// //         time: timeSlot
// //       };
// //     };

// //     totalClasses.forEach(className => {
// //       const subjectRotation = [];
// //       const subjectPool = [...subjects];
      
// //       for (let i = 0; i < workingDays.length; i++) {
// //         const daySubjects = [];
// //         const subjectsPerDay = Math.ceil(subjects.length / workingDays.length);
        
// //         for (let j = 0; j < subjectsPerDay; j++) {
// //           const subjectIndex = (i + j) % subjectPool.length;
// //           daySubjects.push(subjectPool[subjectIndex].name);
// //         }
        
// //         subjectRotation.push(daySubjects);
// //       }

// //       workingDays.forEach((day, dayIndex) => {
// //         const daySubjects = subjectRotation[dayIndex % subjectRotation.length];
// //         const shuffledSubjects = [...daySubjects].sort(() => Math.random() - 0.5);
// //         const usedSubjects = new Set();

// //         for (let i = 0; i < totalClassesPerDay; i++) {
// //           const timeSlot = classTimes[i];
// //           let slotAssigned = false;

// //           for (const subject of shuffledSubjects) {
// //             if (!usedSubjects.has(subject)) {
// //               const slot = assignSlot(className, day, timeSlot, subject);
// //               if (slot) {
// //                 timetable[className][day].classes.push(slot);
// //                 usedSubjects.add(subject);
// //                 slotAssigned = true;
// //                 break;
// //               }
// //             }
// //           }

// //           if (!slotAssigned) {
// //             const fallbackSubject = subjects.find(s => 
// //               !usedSubjects.has(s.name)
// //             );
// //             if (fallbackSubject) {
// //               const slot = assignSlot(className, day, timeSlot, fallbackSubject.name);
// //               if (slot) {
// //                 timetable[className][day].classes.push(slot);
// //                 usedSubjects.add(fallbackSubject.name);
// //               }
// //             }
// //           }
// //         }
// //       });
// //     });

// //     if (includeLabs) {
// //       const labLocationUsage = {};
// //       workingDays.forEach(day => {
// //         labLocationUsage[day] = new Set();
// //       });

// //       totalClasses.forEach(className => {
// //         workingDays.forEach((day, dayIndex) => {
// //           const labSlots = [];
// //           const availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

// //           batches.forEach((batch, batchIndex) => {
// //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// //             const subject = subjects[subjectIndex].name;
// //             const subjectTeachers = subjects[subjectIndex].teachers;

// //             const availableTeachers = subjectTeachers.filter(teacher => 
// //               !teacherAvailability[teacher][day].has(labTimings[0])
// //             );
// //             if (availableTeachers.length === 0) {
// //               throw new Error(`No teachers available for ${subject} lab on ${day}`);
// //             }

// //             let labLocation = null;
// //             for (const lab of availableLabs) {
// //               if (!labLocationUsage[day].has(lab)) {
// //                 labLocation = lab;
// //                 break;
// //               }
// //             }
// //             if (!labLocation) {
// //               throw new Error(`No lab location available for ${subject} on ${day}`);
// //             }

// //             const teacher = availableTeachers.sort((a, b) => 
// //               teacherWorkload[a] - teacherWorkload[b]
// //             )[0];

// //             teacherWorkload[teacher]++;
// //             teacherAvailability[teacher][day].add(labTimings[0]);
// //             labLocationUsage[day].add(labLocation);

// //             teacherTimetables[teacher][day][labTimings[0]] = {
// //               type: "LAB",
// //               subject,
// //               batch,
// //               location: labLocation,
// //               time: labTimings[0]
// //             };

// //             labSlots.push({
// //               batch,
// //               subject,
// //               teacher,
// //               lab: labLocation,
// //               time: labTimings[0],
// //               isLab: true
// //             });
// //           });

// //           timetable[className][day].lab = {
// //             type: "Lab",
// //             slots: labSlots,
// //             time: labTimings[0]
// //           };
// //         });
// //       });
// //     }

// //     const validateTimetable = () => {
// //       const conflicts = [];
// //       const teacherTracker = {};
// //       const roomTracker = {};

// //       workingDays.forEach(day => {
// //         teacherTracker[day] = {};
// //         roomTracker[day] = {};
// //         classTimes.forEach(time => {
// //           teacherTracker[day][time] = new Set();
// //           roomTracker[day][time] = new Set();
// //         });
// //       });

// //       totalClasses.forEach(className => {
// //         workingDays.forEach(day => {
// //           timetable[className][day].classes.forEach(cls => {
// //             if (teacherTracker[day][cls.time].has(cls.teacher)) {
// //               conflicts.push(`Teacher ${cls.teacher} double booked on ${day} at ${cls.time}`);
// //             } else {
// //               teacherTracker[day][cls.time].add(cls.teacher);
// //             }

// //             if (roomTracker[day][cls.time].has(cls.room)) {
// //               conflicts.push(`Room ${cls.room} double booked on ${day} at ${cls.time}`);
// //             } else {
// //               roomTracker[day][cls.time].add(cls.room);
// //             }
// //           });
// //         });
// //       });

// //       return conflicts;
// //     };

// //     const conflicts = validateTimetable();
// //     if (conflicts.length > 0) {
// //       throw new Error(`TIMETABLE CONFLICTS:\n${conflicts.join("\n")}`);
// //     }

// //     const formattedTeacherTimetables = transformTeacherTimetables(
// //       teacherTimetables,
// //       workingDays,
// //       classTimes,
// //       includeLabs ? labTimings : []
// //     );

// //     const result = {
// //       collegeName,
// //       branchName,
// //       workingDays,
// //       classTimes,
// //       labTimings: includeLabs ? labTimings : [],
// //       timetable,
// //       teacherTimetables: formattedTeacherTimetables,
// //       metadata: {
// //         generatedAt: new Date(),
// //         version: 1,
// //         stats: {
// //           totalClasses: totalClasses.length,
// //           totalSubjects: subjects.length,
// //           totalTeachers: teacherPool.size,
// //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// //           includesLabs: includeLabs
// //         }
// //       }
// //     };

// //     const newTimetable = new Timetable(result);
// //     await newTimetable.save();

// //     return res.status(200).json({
// //       success: true,
// //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// //       ...result
// //     });

// //   } catch (error) {
// //     console.error("❌ Generation failed:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: error.message,
// //       suggestion: error.message.includes("teacher") ? 
// //         "Add more teachers or reduce weekly classes per teacher" :
// //         error.message.includes("room") ?
// //         "Add more rooms or reduce number of concurrent classes" :
// //         "Please check all input parameters"
// //     });
// //   }
// // };

// // export const getResultTimeTableController = async (req, res) => {
// //   try {
// //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// //     res.status(200).json(timetables);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch timetables" });
// //   }
// // };

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const Timetable = require("../models/timetable.model");

// // Enhanced transformer function for teacher timetables
// const transformTeacherTimetables = (teacherTimetables, workingDays, classTimes, labTimings) => {
//   const result = {};
  
//   Object.keys(teacherTimetables).forEach(teacher => {
//     result[teacher] = {};
    
//     workingDays.forEach(day => {
//       result[teacher][day] = {};
      
//       // Process regular class times
//       classTimes.forEach(time => {
//         const slot = teacherTimetables[teacher][day][time];
//         result[teacher][day][time] = slot ? {
//           ...slot,
//           displayText: `${slot.subject} - ${slot.className} (${slot.room})`,
//           type: "CLASS" // Explicitly marking type
//         } : null;
//       });

//       // Process lab times if they exist
//       if (labTimings?.length > 0) {
//         labTimings.forEach(time => {
//           const slot = teacherTimetables[teacher][day][time];
//           result[teacher][day][time] = slot ? {
//             ...slot,
//             displayText: `${slot.subject} Lab - Batch ${slot.batch} (${slot.location})`,
//             type: "LAB" // Explicitly marking type
//           } : null;
//         });
//       }
//     });
//   });
  
//   return result;
// };

// // Enhanced response formatter
// const formatTimetableResponse = (data, teacherTimetables) => {
//   return {
//     collegeName: data.collegeName,
//     branchName: data.branchName,
//     workingDays: data.workingDays,
//     classTimes: data.classTimes,
//     labTimings: data.includeLabs ? data.labTimings : [],
//     timetable: data.timetable,
//     teacherTimetables: teacherTimetables,
//     metadata: {
//       generatedAt: new Date(),
//       version: 1,
//       stats: {
//         totalClasses: data.totalClasses.length,
//         totalSubjects: data.subjects.length,
//         totalTeachers: new Set(
//           data.subjects.flatMap(subject => subject.teachers)
//         ).size,
//         totalSlots: data.workingDays.length * data.classTimes.length * data.totalClasses.length,
//         includesLabs: data.includeLabs
//       }
//     }
//   };
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
//       labLocations = [],
//       totalClassesPerDay,
//       batches = [],
//       labTimings = [],
//       includeLabs = false
//     } = req.body;

//     // Validation (unchanged)
//     const errors = [];
//     if (!collegeName) errors.push("College name is required");
//     if (!branchName) errors.push("Branch name is required");
//     if (!workingDays?.length) errors.push("Working days are required");
//     if (!classTimes?.length) errors.push("Class times are required");
//     if (!totalClasses?.length) errors.push("Total classes are required");
//     if (!subjects?.length) errors.push("Subjects are required");
//     if (!rooms?.length) errors.push("Rooms are required");
//     if (!totalClassesPerDay) errors.push("Total classes per day is required");

//     const teacherPool = new Set();
//     subjects.forEach(subject => {
//       if (!subject.teachers?.length) {
//         errors.push(`Subject "${subject.name}" has no teachers assigned`);
//       } else {
//         subject.teachers.forEach(teacher => teacherPool.add(teacher));
//       }
//     });

//     if (rooms.length < totalClasses.length) {
//       errors.push(`Need ${totalClasses.length} rooms (only ${rooms.length} provided)`);
//     }

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

//     // Initialize data structures (unchanged)
//     const timetable = {};
//     const teacherTimetables = {};
//     const roomAssignments = {};
    
//     workingDays.forEach(day => {
//       roomAssignments[day] = {};
//       classTimes.forEach(time => {
//         roomAssignments[day][time] = new Set();
//       });
//     });

//     totalClasses.forEach(className => {
//       timetable[className] = {};
//       workingDays.forEach(day => {
//         timetable[className][day] = {
//           classes: [],
//           lab: null
//         };
//       });
//     });

//     const teacherWorkload = {};
//     const teacherAvailability = {};
//     const teacherSubjectMap = {};

//     subjects.forEach(subject => {
//       subject.teachers.forEach(teacher => {
//         if (!teacherSubjectMap[teacher]) {
//           teacherSubjectMap[teacher] = new Set();
//           teacherWorkload[teacher] = 0;
//           teacherAvailability[teacher] = {};
//           teacherTimetables[teacher] = {};
          
//           workingDays.forEach(day => {
//             teacherAvailability[teacher][day] = new Set();
//             teacherTimetables[teacher][day] = {};
            
//             classTimes.forEach(time => {
//               teacherTimetables[teacher][day][time] = null;
//             });
            
//             if (includeLabs) {
//               labTimings.forEach(time => {
//                 teacherTimetables[teacher][day][time] = null;
//               });
//             }
//           });
//         }
//         teacherSubjectMap[teacher].add(subject.name);
//       });
//     });

//     // Assignment logic (unchanged)
//     const assignSlot = (className, day, timeSlot, subject) => {
//       const subjectData = subjects.find(s => s.name === subject);
//       if (!subjectData) return null;

//       const availableTeachers = subjectData.teachers.filter(teacher => 
//         !teacherAvailability[teacher][day].has(timeSlot)
//       );
//       if (availableTeachers.length === 0) return null;

//       const availableRooms = rooms.filter(room => 
//         !roomAssignments[day][timeSlot].has(room)
//       );
//       if (availableRooms.length === 0) return null;

//       const teacher = availableTeachers.sort((a, b) => 
//         teacherWorkload[a] - teacherWorkload[b]
//       )[0];
//       const room = availableRooms[0];

//       teacherWorkload[teacher]++;
//       teacherAvailability[teacher][day].add(timeSlot);
//       roomAssignments[day][timeSlot].add(room);

//       teacherTimetables[teacher][day][timeSlot] = {
//         type: "CLASS",
//         subject,
//         className,
//         room,
//         time: timeSlot
//       };

//       return {
//         subject,
//         teacher,
//         room,
//         time: timeSlot
//       };
//     };

//     // Class assignment logic (unchanged)
//     totalClasses.forEach(className => {
//       const subjectRotation = [];
//       const subjectPool = [...subjects];
      
//       for (let i = 0; i < workingDays.length; i++) {
//         const daySubjects = [];
//         const subjectsPerDay = Math.ceil(subjects.length / workingDays.length);
        
//         for (let j = 0; j < subjectsPerDay; j++) {
//           const subjectIndex = (i + j) % subjectPool.length;
//           daySubjects.push(subjectPool[subjectIndex].name);
//         }
        
//         subjectRotation.push(daySubjects);
//       }

//       workingDays.forEach((day, dayIndex) => {
//         const daySubjects = subjectRotation[dayIndex % subjectRotation.length];
//         const shuffledSubjects = [...daySubjects].sort(() => Math.random() - 0.5);
//         const usedSubjects = new Set();

//         for (let i = 0; i < totalClassesPerDay; i++) {
//           const timeSlot = classTimes[i];
//           let slotAssigned = false;

//           for (const subject of shuffledSubjects) {
//             if (!usedSubjects.has(subject)) {
//               const slot = assignSlot(className, day, timeSlot, subject);
//               if (slot) {
//                 timetable[className][day].classes.push(slot);
//                 usedSubjects.add(subject);
//                 slotAssigned = true;
//                 break;
//               }
//             }
//           }

//           if (!slotAssigned) {
//             const fallbackSubject = subjects.find(s => 
//               !usedSubjects.has(s.name)
//             );
//             if (fallbackSubject) {
//               const slot = assignSlot(className, day, timeSlot, fallbackSubject.name);
//               if (slot) {
//                 timetable[className][day].classes.push(slot);
//                 usedSubjects.add(fallbackSubject.name);
//               }
//             }
//           }
//         }
//       });
//     });

//     // Lab assignment logic (unchanged)
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

//             const availableTeachers = subjectTeachers.filter(teacher => 
//               !teacherAvailability[teacher][day].has(labTimings[0])
//             );
//             if (availableTeachers.length === 0) {
//               throw new Error(`No teachers available for ${subject} lab on ${day}`);
//             }

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

//             const teacher = availableTeachers.sort((a, b) => 
//               teacherWorkload[a] - teacherWorkload[b]
//             )[0];

//             teacherWorkload[teacher]++;
//             teacherAvailability[teacher][day].add(labTimings[0]);
//             labLocationUsage[day].add(labLocation);

//             teacherTimetables[teacher][day][labTimings[0]] = {
//               type: "LAB",
//               subject,
//               batch,
//               location: labLocation,
//               time: labTimings[0]
//             };

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

//     // Validation (unchanged)
//     const validateTimetable = () => {
//       const conflicts = [];
//       const teacherTracker = {};
//       const roomTracker = {};

//       workingDays.forEach(day => {
//         teacherTracker[day] = {};
//         roomTracker[day] = {};
//         classTimes.forEach(time => {
//           teacherTracker[day][time] = new Set();
//           roomTracker[day][time] = new Set();
//         });
//       });

//       totalClasses.forEach(className => {
//         workingDays.forEach(day => {
//           timetable[className][day].classes.forEach(cls => {
//             if (teacherTracker[day][cls.time].has(cls.teacher)) {
//               conflicts.push(`Teacher ${cls.teacher} double booked on ${day} at ${cls.time}`);
//             } else {
//               teacherTracker[day][cls.time].add(cls.teacher);
//             }

//             if (roomTracker[day][cls.time].has(cls.room)) {
//               conflicts.push(`Room ${cls.room} double booked on ${day} at ${cls.time}`);
//             } else {
//               roomTracker[day][cls.time].add(cls.room);
//             }
//           });
//         });
//       });

//       return conflicts;
//     };

//     const conflicts = validateTimetable();
//     if (conflicts.length > 0) {
//       throw new Error(`TIMETABLE CONFLICTS:\n${conflicts.join("\n")}`);
//     }

//     // Enhanced teacher timetable transformation
//     const formattedTeacherTimetables = transformTeacherTimetables(
//       teacherTimetables,
//       workingDays,
//       classTimes,
//       includeLabs ? labTimings : []
//     );

//     // Format the complete response
//     const result = formatTimetableResponse(
//       {
//         collegeName,
//         branchName,
//         workingDays,
//         classTimes,
//         totalClasses,
//         subjects,
//         includeLabs,
//         labTimings
//       },
//       formattedTeacherTimetables
//     );

//     // Add the generated timetable to the response
//     result.timetable = timetable;

//     // Save to database
//     const newTimetable = new Timetable(result);
//     await newTimetable.save();

//     return res.status(200).json({
//       success: true,
//       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
//       data: result // Structured response
//     });

//   } catch (error) {
//     console.error("❌ Generation failed:", error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//       suggestion: error.message.includes("teacher") ? 
//         "Add more teachers or reduce weekly classes per teacher" :
//         error.message.includes("room") ?
//         "Add more rooms or reduce number of concurrent classes" :
//         "Please check all input parameters"
//     });
//   }
// };

// export const getResultTimeTableController = async (req, res) => {
//   try {
//     const timetables = await Timetable.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       count: timetables.length,
//       data: timetables
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       error: "Failed to fetch timetables",
//       details: error.message
//     });
//   }
// };

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Timetable = require("../models/timetable.model");

const transformTeacherTimetables = (teacherTimetables, workingDays, classTimes, labTimings) => {
  console.log("Transforming teacher timetables...");
  const result = {};
  
  Object.keys(teacherTimetables).forEach(teacher => {
    result[teacher] = {};
    
    workingDays.forEach(day => {
      result[teacher][day] = {};
      
      classTimes.forEach(time => {
        const slot = teacherTimetables[teacher][day][time];
        if (slot) {
          result[teacher][day][time] = {
            ...slot,
            displayText: `${slot.subject} - ${slot.className} (${slot.room})`,
            type: "CLASS"
          };
        } else {
          result[teacher][day][time] = null;
        }
      });

      if (labTimings?.length > 0) {
        labTimings.forEach(time => {
          const slot = teacherTimetables[teacher][day][time];
          if (slot) {
            result[teacher][day][time] = {
              ...slot,
              displayText: `${slot.subject} Lab - Batch ${slot.batch} (${slot.location})`,
              type: "LAB"
            };
          } else {
            result[teacher][day][time] = null;
          }
        });
      }
    });
  });
  
  console.log(`Transformed ${Object.keys(result).length} teacher timetables`);
  return result;
};

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

    // Enhanced validation
    const errors = [];
    if (!collegeName) errors.push("College name is required");
    if (!branchName) errors.push("Branch name is required");
    if (!workingDays?.length) errors.push("Working days are required");
    if (!classTimes?.length) errors.push("Class times are required");
    if (!totalClasses?.length) errors.push("Total classes are required");
    if (!subjects?.length) errors.push("Subjects are required");
    if (!rooms?.length) errors.push("Rooms are required");
    if (!totalClassesPerDay) errors.push("Total classes per day is required");

    const teacherPool = new Set();
    subjects.forEach(subject => {
      if (!subject.teachers?.length) {
        errors.push(`Subject "${subject.name}" has no teachers assigned`);
      } else {
        subject.teachers.forEach(teacher => teacherPool.add(teacher));
      }
    });

    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
    }

    console.log(`Initializing timetable for ${teacherPool.size} teachers`);

    const timetable = {};
    const teacherTimetables = {};
    const roomAssignments = {};
    const teacherWorkload = {};
    const teacherAvailability = {};
    const teacherSubjectMap = {};

    // Initialize teacher data structures
    Array.from(teacherPool).forEach(teacher => {
      teacherTimetables[teacher] = {};
      teacherWorkload[teacher] = 0;
      teacherAvailability[teacher] = {};
      teacherSubjectMap[teacher] = new Set();
      
      workingDays.forEach(day => {
        teacherTimetables[teacher][day] = {};
        teacherAvailability[teacher][day] = new Set();
        
        classTimes.forEach(time => {
          teacherTimetables[teacher][day][time] = null;
        });
        
        if (includeLabs) {
          labTimings.forEach(time => {
            teacherTimetables[teacher][day][time] = null;
          });
        }
      });
    });

    // Initialize subjects and teacher mappings
    subjects.forEach(subject => {
      subject.teachers.forEach(teacher => {
        teacherSubjectMap[teacher].add(subject.name);
      });
    });

    // Initialize room assignments
    workingDays.forEach(day => {
      roomAssignments[day] = {};
      classTimes.forEach(time => {
        roomAssignments[day][time] = new Set();
      });
    });

    // Initialize class timetables
    totalClasses.forEach(className => {
      timetable[className] = {};
      workingDays.forEach(day => {
        timetable[className][day] = {
          classes: [],
          lab: null
        };
      });
    });

    // Enhanced assignSlot function with debugging
    const assignSlot = (className, day, timeSlot, subject) => {
      const subjectData = subjects.find(s => s.name === subject);
      if (!subjectData) {
        console.warn(`Subject not found: ${subject}`);
        return null;
      }

      const availableTeachers = subjectData.teachers.filter(teacher => {
        const isAvailable = !teacherAvailability[teacher][day].has(timeSlot);
        if (!isAvailable) {
          console.log(`Teacher ${teacher} not available on ${day} at ${timeSlot}`);
        }
        return isAvailable;
      });

      if (availableTeachers.length === 0) {
        console.warn(`No available teachers for ${subject} on ${day} at ${timeSlot}`);
        return null;
      }

      const availableRooms = rooms.filter(room => 
        !roomAssignments[day][timeSlot].has(room)
      );
      if (availableRooms.length === 0) {
        console.warn(`No available rooms on ${day} at ${timeSlot}`);
        return null;
      }

      // Select teacher with least workload
      const teacher = availableTeachers.sort((a, b) => 
        teacherWorkload[a] - teacherWorkload[b]
      )[0];
      const room = availableRooms[0];

      // Update tracking
      teacherWorkload[teacher]++;
      teacherAvailability[teacher][day].add(timeSlot);
      roomAssignments[day][timeSlot].add(room);

      // Create the slot
      const slot = {
        type: "CLASS",
        subject,
        className,
        room,
        time: timeSlot
      };

      // Update teacher timetable
      teacherTimetables[teacher][day][timeSlot] = slot;
      console.log(`Assigned ${teacher} to ${className} for ${subject} on ${day} at ${timeSlot}`);

      return {
        subject,
        teacher,
        room,
        time: timeSlot
      };
    };

    // Assign regular classes
    totalClasses.forEach(className => {
      const subjectRotation = [];
      const subjectPool = [...subjects];
      
      // Create subject rotation pattern
      for (let i = 0; i < workingDays.length; i++) {
        const daySubjects = [];
        const subjectsPerDay = Math.ceil(subjects.length / workingDays.length);
        
        for (let j = 0; j < subjectsPerDay; j++) {
          const subjectIndex = (i + j) % subjectPool.length;
          daySubjects.push(subjectPool[subjectIndex].name);
        }
        
        subjectRotation.push(daySubjects);
      }

      // Assign subjects to days
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

    // Lab assignment logic
    if (includeLabs) {
      console.log("Assigning lab sessions...");
      const labLocationUsage = {};
      workingDays.forEach(day => {
        labLocationUsage[day] = new Set();
      });

      totalClasses.forEach(className => {
        workingDays.forEach((day, dayIndex) => {
          const labSlots = [];
          const availableLabs = [...labLocations].sort(() => Math.random() - 0.5);

          batches.forEach((batch, batchIndex) => {
            const subjectIndex = (dayIndex + batchIndex) % subjects.length;
            const subject = subjects[subjectIndex].name;
            const subjectTeachers = subjects[subjectIndex].teachers;

            const availableTeachers = subjectTeachers.filter(teacher => 
              !teacherAvailability[teacher][day].has(labTimings[0])
            );
            if (availableTeachers.length === 0) {
              console.error(`No teachers available for ${subject} lab on ${day}`);
              return;
            }

            let labLocation = null;
            for (const lab of availableLabs) {
              if (!labLocationUsage[day].has(lab)) {
                labLocation = lab;
                break;
              }
            }
            if (!labLocation) {
              console.error(`No lab location available for ${subject} on ${day}`);
              return;
            }

            const teacher = availableTeachers.sort((a, b) => 
              teacherWorkload[a] - teacherWorkload[b]
            )[0];

            // Update tracking
            teacherWorkload[teacher]++;
            teacherAvailability[teacher][day].add(labTimings[0]);
            labLocationUsage[day].add(labLocation);

            // Create lab slot
            const labSlot = {
              type: "LAB",
              subject,
              batch,
              location: labLocation,
              time: labTimings[0]
            };

            // Update teacher timetable
            teacherTimetables[teacher][day][labTimings[0]] = labSlot;
            console.log(`Assigned ${teacher} to ${className} lab for ${subject} on ${day}`);

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

    // Validation
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
            if (teacherTracker[day][cls.time].has(cls.teacher)) {
              conflicts.push(`Teacher ${cls.teacher} double booked on ${day} at ${cls.time}`);
            } else {
              teacherTracker[day][cls.time].add(cls.teacher);
            }

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
      console.error("Timetable conflicts:", conflicts);
      throw new Error(`TIMETABLE CONFLICTS:\n${conflicts.join("\n")}`);
    }

    // Prepare final response
    const formattedTeacherTimetables = transformTeacherTimetables(
      teacherTimetables,
      workingDays,
      classTimes,
      includeLabs ? labTimings : []
    );

    const result = {
      collegeName,
      branchName,
      workingDays,
      classTimes,
      labTimings: includeLabs ? labTimings : [],
      timetable,
      teacherTimetables: formattedTeacherTimetables,
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

    console.log("Timetable generated successfully");
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
        "Please check all input parameters",
      debug: {
        teacherPool: Array.from(teacherPool || []),
        teacherTimetables: teacherTimetables || 'Not generated'
      }
    });
  }
};

export const getResultTimeTableController = async (req, res) => {
  try {
    const timetables = await Timetable.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: timetables.length,
      data: timetables
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch timetables",
      details: error.message
    });
  }
};