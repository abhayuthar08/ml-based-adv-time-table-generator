// // // // // // import { createRequire } from "module";
// // // // // // const require = createRequire(import.meta.url);
// // // // // // const Timetable = require("../models/timetable.model");
// // // // // // import { formatTimeSlot, transformTeacherTimetables } from "../helpers/timetable.helpers.js";

// // // // // // export const generateTimeTableController = async (req, res) => {
// // // // // //   let teacherPool = new Set();
// // // // // //   let teacherTimetables = {};

// // // // // //   try {
// // // // // //     const {
// // // // // //       collegeName,
// // // // // //       branchName,
// // // // // //       workingDays,
// // // // // //       classTimes,
// // // // // //       totalClasses,
// // // // // //       subjects,
// // // // // //       rooms,
// // // // // //       labLocations = [],
// // // // // //       totalClassesPerDay,
// // // // // //       batches = [],
// // // // // //       labTimings = [],
// // // // // //       includeLabs = false
// // // // // //     } = req.body;

// // // // // //     const errors = [];
// // // // // //     if (!collegeName) errors.push("College name is required");
// // // // // //     if (!branchName) errors.push("Branch name is required");
// // // // // //     if (!workingDays?.length) errors.push("Working days are required");
// // // // // //     if (!classTimes?.length) errors.push("Class times are required");
// // // // // //     if (!totalClasses?.length) errors.push("Total classes are required");
// // // // // //     if (!subjects?.length) errors.push("Subjects are required");
// // // // // //     if (!rooms?.length) errors.push("Rooms are required");
// // // // // //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// // // // // //     subjects.forEach(subject => {
// // // // // //       if (!subject.teachers?.length) {
// // // // // //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// // // // // //       } else {
// // // // // //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// // // // // //       }
// // // // // //     });

// // // // // //     if (errors.length > 0) {
// // // // // //       console.error("Validation errors:", errors);
// // // // // //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// // // // // //     }

// // // // // //     console.log(`Initializing timetable for ${teacherPool.size} teachers`);

// // // // // //     const timetable = {};
// // // // // //     const roomAssignments = {};
// // // // // //     const teacherWorkload = {};
// // // // // //     const teacherAvailability = {};
// // // // // //     const teacherSubjectMap = {};

// // // // // //     Array.from(teacherPool).forEach(teacher => {
// // // // // //       teacherTimetables[teacher] = {};
// // // // // //       teacherWorkload[teacher] = 0;
// // // // // //       teacherAvailability[teacher] = {};
// // // // // //       teacherSubjectMap[teacher] = new Set();
      
// // // // // //       workingDays.forEach(day => {
// // // // // //         teacherTimetables[teacher][day] = {};
// // // // // //         teacherAvailability[teacher][day] = new Set();
        
// // // // // //         [...classTimes, ...labTimings].forEach(time => {
// // // // // //           teacherTimetables[teacher][day][time] = null;
// // // // // //         });
// // // // // //       });
// // // // // //     });

// // // // // //     subjects.forEach(subject => {
// // // // // //       subject.teachers.forEach(teacher => {
// // // // // //         teacherSubjectMap[teacher].add(subject.name);
// // // // // //       });
// // // // // //     });

// // // // // //     workingDays.forEach(day => {
// // // // // //       roomAssignments[day] = {};
// // // // // //       [...classTimes, ...labTimings].forEach(time => {
// // // // // //         roomAssignments[day][time] = new Set();
// // // // // //       });
// // // // // //     });

// // // // // //     totalClasses.forEach(className => {
// // // // // //       timetable[className] = {};
// // // // // //       workingDays.forEach(day => {
// // // // // //         timetable[className][day] = {
// // // // // //           classes: [],
// // // // // //           lab: null
// // // // // //         };
// // // // // //       });
// // // // // //     });

// // // // // //     totalClasses.forEach(className => {
// // // // // //       const subjectRotation = [];
// // // // // //       const subjectPool = [...subjects];
      
// // // // // //       for (let i = 0; i < workingDays.length; i++) {
// // // // // //         const daySubjects = [];
// // // // // //         const subjectsPerDay = Math.min(
// // // // // //           Math.ceil(subjects.length / workingDays.length),
// // // // // //           totalClassesPerDay
// // // // // //         );
        
// // // // // //         for (let j = 0; j < subjectsPerDay; j++) {
// // // // // //           const subjectIndex = (i + j) % subjectPool.length;
// // // // // //           daySubjects.push(subjectPool[subjectIndex].name);
// // // // // //         }
        
// // // // // //         subjectRotation.push(daySubjects);
// // // // // //       }

// // // // // //       workingDays.forEach((day, dayIndex) => {
// // // // // //         const daySubjects = subjectRotation[dayIndex % subjectRotation.length];
// // // // // //         const shuffledSubjects = [...daySubjects].sort(() => Math.random() - 0.5);
// // // // // //         const usedSubjects = new Set();

// // // // // //         for (let i = 0; i < totalClassesPerDay && i < classTimes.length; i++) {
// // // // // //           const timeSlot = classTimes[i];
// // // // // //           let slotAssigned = false;

// // // // // //           for (const subject of shuffledSubjects) {
// // // // // //             if (!usedSubjects.has(subject)) {
// // // // // //               const subjectData = subjects.find(s => s.name === subject);
// // // // // //               if (!subjectData) continue;

// // // // // //               const availableTeachers = subjectData.teachers.filter(teacher => {
// // // // // //                 return teacherAvailability[teacher] && 
// // // // // //                        teacherAvailability[teacher][day] &&
// // // // // //                        !teacherAvailability[teacher][day].has(timeSlot);
// // // // // //               });

// // // // // //               if (availableTeachers.length === 0) continue;

// // // // // //               const availableRooms = rooms.filter(room => 
// // // // // //                 !roomAssignments[day][timeSlot].has(room)
// // // // // //               );

// // // // // //               if (availableRooms.length === 0) continue;

// // // // // //               const teacher = availableTeachers.sort((a, b) => 
// // // // // //                 teacherWorkload[a] - teacherWorkload[b]
// // // // // //               )[0];
// // // // // //               const room = availableRooms[0];

// // // // // //               teacherWorkload[teacher]++;
// // // // // //               teacherAvailability[teacher][day].add(timeSlot);
// // // // // //               roomAssignments[day][timeSlot].add(room);

// // // // // //               const slot = {
// // // // // //                 type: "CLASS",
// // // // // //                 subject,
// // // // // //                 className,
// // // // // //                 room,
// // // // // //                 time: timeSlot,
// // // // // //                 teacher
// // // // // //               };

// // // // // //               teacherTimetables[teacher][day][timeSlot] = slot;
// // // // // //               timetable[className][day].classes.push(slot);
// // // // // //               usedSubjects.add(subject);
// // // // // //               slotAssigned = true;
// // // // // //               break;
// // // // // //             }
// // // // // //           }

// // // // // //           if (!slotAssigned) {
// // // // // //             const fallbackSubject = subjects.find(s => 
// // // // // //               !usedSubjects.has(s.name)
// // // // // //             );
// // // // // //             if (fallbackSubject) {
// // // // // //               const availableTeachers = fallbackSubject.teachers.filter(teacher => 
// // // // // //                 teacherAvailability[teacher] && 
// // // // // //                 teacherAvailability[teacher][day] &&
// // // // // //                 !teacherAvailability[teacher][day].has(timeSlot)
// // // // // //               );
              
// // // // // //               if (availableTeachers.length > 0) {
// // // // // //                 const availableRooms = rooms.filter(room => 
// // // // // //                   !roomAssignments[day][timeSlot].has(room)
// // // // // //                 );
                
// // // // // //                 if (availableRooms.length > 0) {
// // // // // //                   const teacher = availableTeachers.sort((a, b) => 
// // // // // //                     teacherWorkload[a] - teacherWorkload[b]
// // // // // //                   )[0];
// // // // // //                   const room = availableRooms[0];

// // // // // //                   teacherWorkload[teacher]++;
// // // // // //                   teacherAvailability[teacher][day].add(timeSlot);
// // // // // //                   roomAssignments[day][timeSlot].add(room);

// // // // // //                   const slot = {
// // // // // //                     type: "CLASS",
// // // // // //                     subject: fallbackSubject.name,
// // // // // //                     className,
// // // // // //                     room,
// // // // // //                     time: timeSlot,
// // // // // //                     teacher
// // // // // //                   };

// // // // // //                   teacherTimetables[teacher][day][timeSlot] = slot;
// // // // // //                   timetable[className][day].classes.push(slot);
// // // // // //                   usedSubjects.add(fallbackSubject.name);
// // // // // //                 }
// // // // // //               }
// // // // // //             }
// // // // // //           }
// // // // // //         }
// // // // // //       });
// // // // // //     });

// // // // // //     if (includeLabs && labTimings.length > 0 && batches.length > 0) {
// // // // // //       const labLocationUsage = {};
// // // // // //       workingDays.forEach(day => {
// // // // // //         labLocationUsage[day] = {};
// // // // // //         labTimings.forEach(labTime => {
// // // // // //           labLocationUsage[day][labTime] = new Set();
// // // // // //         });
// // // // // //       });

// // // // // //       totalClasses.forEach(className => {
// // // // // //         workingDays.forEach((day, dayIndex) => {
// // // // // //           const labSlots = [];

// // // // // //           batches.forEach((batch, batchIndex) => {
// // // // // //             const labTimeIndex = batchIndex % labTimings.length;
// // // // // //             const labTime = labTimings[labTimeIndex];
            
// // // // // //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// // // // // //             const subject = subjects[subjectIndex].name;
// // // // // //             const subjectTeachers = subjects[subjectIndex].teachers;

// // // // // //             const availableTeachers = subjectTeachers.filter(teacher => 
// // // // // //               teacherAvailability[teacher] && 
// // // // // //               teacherAvailability[teacher][day] &&
// // // // // //               !teacherAvailability[teacher][day].has(labTime)
// // // // // //             );
            
// // // // // //             if (availableTeachers.length === 0) {
// // // // // //               console.warn(`No teachers available for ${subject} lab on ${day} at ${labTime} - skipping`);
// // // // // //               return;
// // // // // //             }

// // // // // //             let labLocation = null;
// // // // // //             for (const lab of labLocations) {
// // // // // //               if (!labLocationUsage[day][labTime].has(lab)) {
// // // // // //                 labLocation = lab;
// // // // // //                 break;
// // // // // //               }
// // // // // //             }
            
// // // // // //             if (!labLocation) {
// // // // // //               console.warn(`No lab location available for ${subject} on ${day} at ${labTime} - skipping`);
// // // // // //               return;
// // // // // //             }

// // // // // //             const teacher = availableTeachers.sort((a, b) => 
// // // // // //               teacherWorkload[a] - teacherWorkload[b]
// // // // // //             )[0];

// // // // // //             teacherWorkload[teacher]++;
// // // // // //             teacherAvailability[teacher][day].add(labTime);
// // // // // //             labLocationUsage[day][labTime].add(labLocation);

// // // // // //             const labSlot = {
// // // // // //               type: "LAB",
// // // // // //               subject,
// // // // // //               batch,
// // // // // //               location: labLocation,
// // // // // //               time: labTime,
// // // // // //               className,
// // // // // //               teacher
// // // // // //             };

// // // // // //             teacherTimetables[teacher][day][labTime] = labSlot;
// // // // // //             labSlots.push(labSlot);
// // // // // //           });

// // // // // //           if (labSlots.length > 0) {
// // // // // //             timetable[className][day].lab = {
// // // // // //               type: "Lab",
// // // // // //               slots: labSlots,
// // // // // //               time: labSlots[0].time
// // // // // //             };
// // // // // //           }
// // // // // //         });
// // // // // //       });
// // // // // //     }

// // // // // //     const formattedTeacherTimetables = transformTeacherTimetables(
// // // // // //       teacherTimetables,
// // // // // //       workingDays,
// // // // // //       classTimes,
// // // // // //       includeLabs ? labTimings : []
// // // // // //     );

// // // // // //     const result = {
// // // // // //       collegeName,
// // // // // //       branchName,
// // // // // //       workingDays,
// // // // // //       classTimes,
// // // // // //       labTimings: includeLabs ? labTimings : [],
// // // // // //       timetable,
// // // // // //       teacherTimetables: formattedTeacherTimetables,
// // // // // //       metadata: {
// // // // // //         generatedAt: new Date(),
// // // // // //         version: 1,
// // // // // //         stats: {
// // // // // //           totalClasses: totalClasses.length,
// // // // // //           totalSubjects: subjects.length,
// // // // // //           totalTeachers: teacherPool.size,
// // // // // //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// // // // // //           includesLabs: includeLabs,
// // // // // //           teachersWithAssignments: Object.keys(formattedTeacherTimetables).length
// // // // // //         }
// // // // // //       }
// // // // // //     };

// // // // // //     const newTimetable = new Timetable(result);
// // // // // //     await newTimetable.save();

// // // // // //     return res.status(200).json({
// // // // // //       success: true,
// // // // // //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// // // // // //       ...result
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error("Generation failed:", error);
// // // // // //     return res.status(500).json({
// // // // // //       success: false,
// // // // // //       error: error.message,
// // // // // //       debug: {
// // // // // //         teacherPool: Array.from(teacherPool),
// // // // // //         teacherTimetables: Object.keys(teacherTimetables).map(teacher => ({
// // // // // //           teacher,
// // // // // //           hasAssignments: workingDays.some(day => 
// // // // // //             Object.values(teacherTimetables[teacher][day] || {}).some(slot => slot !== null)
// // // // // //           )
// // // // // //         }))
// // // // // //       }
// // // // // //     });
// // // // // //   }
// // // // // // };

// // // // // // export const getResultTimeTableController = async (req, res) => {
// // // // // //   try {
// // // // // //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       count: timetables.length,
// // // // // //       data: timetables
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     res.status(500).json({ 
// // // // // //       success: false,
// // // // // //       error: "Failed to fetch timetables",
// // // // // //       details: error.message
// // // // // //     });
// // // // // //   }
// // // // // // };

// // // // // import { createRequire } from "module";
// // // // // const require = createRequire(import.meta.url);
// // // // // const Timetable = require("../models/timetable.model");
// // // // // import { formatTimeSlot, transformTeacherTimetables } from "../helpers/timetable.helpers.js";

// // // // // export const generateTimeTableController = async (req, res) => {
// // // // //   let teacherPool = new Set();
// // // // //   let teacherTimetables = {};

// // // // //   try {
// // // // //     const {
// // // // //       collegeName,
// // // // //       branchName,
// // // // //       workingDays,
// // // // //       classTimes,
// // // // //       totalClasses,
// // // // //       subjects,
// // // // //       rooms,
// // // // //       labLocations = [],
// // // // //       totalClassesPerDay,
// // // // //       batches = [],
// // // // //       labTimings = [],
// // // // //       includeLabs = false
// // // // //     } = req.body;

// // // // //     const errors = [];
// // // // //     if (!collegeName) errors.push("College name is required");
// // // // //     if (!branchName) errors.push("Branch name is required");
// // // // //     if (!workingDays?.length) errors.push("Working days are required");
// // // // //     if (!classTimes?.length) errors.push("Class times are required");
// // // // //     if (!totalClasses?.length) errors.push("Total classes are required");
// // // // //     if (!subjects?.length) errors.push("Subjects are required");
// // // // //     if (!rooms?.length) errors.push("Rooms are required");
// // // // //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// // // // //     // Validate weekly classes for each subject
// // // // //     subjects.forEach(subject => {
// // // // //       if (!subject.teachers?.length) {
// // // // //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// // // // //       } else {
// // // // //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// // // // //       }
      
// // // // //       if (!subject.weeklyClasses || subject.weeklyClasses <= 0) {
// // // // //         errors.push(`Subject "${subject.name}" must have a positive number of weekly classes`);
// // // // //       }
// // // // //     });

// // // // //     // Calculate total required classes across all classes
// // // // //     const totalRequiredClasses = subjects.reduce((sum, subject) => 
// // // // //       sum + (subject.weeklyClasses * totalClasses.length), 0);
// // // // //     const totalAvailableSlots = workingDays.length * totalClassesPerDay * totalClasses.length;
    
// // // // //     if (totalRequiredClasses > totalAvailableSlots) {
// // // // //       errors.push(`Not enough slots available. Required: ${totalRequiredClasses}, Available: ${totalAvailableSlots}`);
// // // // //     }

// // // // //     if (errors.length > 0) {
// // // // //       console.error("Validation errors:", errors);
// // // // //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// // // // //     }

// // // // //     console.log(`Initializing timetable for ${teacherPool.size} teachers`);

// // // // //     const timetable = {};
// // // // //     const roomAssignments = {};
// // // // //     const teacherWorkload = {};
// // // // //     const teacherAvailability = {};
// // // // //     const teacherSubjectMap = {};
// // // // //     const subjectAllocationCount = {}; // Track allocated classes per subject

// // // // //     // Initialize subject allocation counters
// // // // //     subjects.forEach(subject => {
// // // // //       subjectAllocationCount[subject.name] = 0;
// // // // //     });

// // // // //     Array.from(teacherPool).forEach(teacher => {
// // // // //       teacherTimetables[teacher] = {};
// // // // //       teacherWorkload[teacher] = 0;
// // // // //       teacherAvailability[teacher] = {};
// // // // //       teacherSubjectMap[teacher] = new Set();
      
// // // // //       workingDays.forEach(day => {
// // // // //         teacherTimetables[teacher][day] = {};
// // // // //         teacherAvailability[teacher][day] = new Set();
        
// // // // //         [...classTimes, ...labTimings].forEach(time => {
// // // // //           teacherTimetables[teacher][day][time] = null;
// // // // //         });
// // // // //       });
// // // // //     });

// // // // //     subjects.forEach(subject => {
// // // // //       subject.teachers.forEach(teacher => {
// // // // //         teacherSubjectMap[teacher].add(subject.name);
// // // // //       });
// // // // //     });

// // // // //     workingDays.forEach(day => {
// // // // //       roomAssignments[day] = {};
// // // // //       [...classTimes, ...labTimings].forEach(time => {
// // // // //         roomAssignments[day][time] = new Set();
// // // // //       });
// // // // //     });

// // // // //     totalClasses.forEach(className => {
// // // // //       timetable[className] = {};
// // // // //       workingDays.forEach(day => {
// // // // //         timetable[className][day] = {
// // // // //           classes: [],
// // // // //           lab: null
// // // // //         };
// // // // //       });
// // // // //     });

// // // // //     // Create a master schedule plan for all classes
// // // // //     const masterSubjectPlan = [];
    
// // // // //     // Add subjects to the master plan based on their weekly class requirements
// // // // //     subjects.forEach(subject => {
// // // // //       const totalNeeded = subject.weeklyClasses * totalClasses.length;
// // // // //       for (let i = 0; i < totalNeeded; i++) {
// // // // //         masterSubjectPlan.push({
// // // // //           subject: subject.name,
// // // // //           teachers: subject.teachers,
// // // // //           priority: subject.weeklyClasses // Higher priority for subjects with more classes
// // // // //         });
// // // // //       }
// // // // //     });
    
// // // // //     // Shuffle the master plan to distribute classes across days and classes
// // // // //     for (let i = masterSubjectPlan.length - 1; i > 0; i--) {
// // // // //       const j = Math.floor(Math.random() * (i + 1));
// // // // //       [masterSubjectPlan[i], masterSubjectPlan[j]] = [masterSubjectPlan[j], masterSubjectPlan[i]];
// // // // //     }
    
// // // // //     // Distribute subjects across classes and days
// // // // //     const classSubjectDistribution = {};
// // // // //     totalClasses.forEach(className => {
// // // // //       classSubjectDistribution[className] = {};
// // // // //       workingDays.forEach(day => {
// // // // //         classSubjectDistribution[className][day] = [];
// // // // //       });
// // // // //     });
    
// // // // //     // Distribute subjects evenly across classes and days
// // // // //     let classIndex = 0;
// // // // //     let dayIndex = 0;
    
// // // // //     masterSubjectPlan.forEach((subjectPlan, index) => {
// // // // //       const className = totalClasses[classIndex % totalClasses.length];
// // // // //       const day = workingDays[dayIndex % workingDays.length];
      
// // // // //       classSubjectDistribution[className][day].push(subjectPlan);
      
// // // // //       classIndex++;
// // // // //       if (classIndex % totalClasses.length === 0) {
// // // // //         dayIndex++;
// // // // //       }
// // // // //     });

// // // // //     // Process each class
// // // // //     totalClasses.forEach(className => {
// // // // //       workingDays.forEach(day => {
// // // // //         const daySubjects = classSubjectDistribution[className][day];
// // // // //         const usedSubjects = new Set();
// // // // //         const usedTimeSlots = new Set();
        
// // // // //         // Process each subject in the plan for this day and class
// // // // //         for (const subjectPlan of daySubjects) {
// // // // //           if (usedSubjects.has(subjectPlan.subject) || 
// // // // //               subjectAllocationCount[subjectPlan.subject] >= 
// // // // //               subjects.find(s => s.name === subjectPlan.subject).weeklyClasses * totalClasses.length) {
// // // // //             continue;
// // // // //           }
          
// // // // //           // Find the best time slot for this subject
// // // // //           let bestSlot = null;
// // // // //           let bestTeacher = null;
// // // // //           let bestRoom = null;
// // // // //           let minWorkload = Infinity;
          
// // // // //           for (const timeSlot of classTimes) {
// // // // //             if (usedTimeSlots.has(timeSlot)) continue;
            
// // // // //             const availableTeachers = subjectPlan.teachers.filter(teacher => {
// // // // //               return teacherAvailability[teacher] && 
// // // // //                      teacherAvailability[teacher][day] &&
// // // // //                      !teacherAvailability[teacher][day].has(timeSlot);
// // // // //             });
            
// // // // //             if (availableTeachers.length === 0) continue;
            
// // // // //             const availableRooms = rooms.filter(room => 
// // // // //               !roomAssignments[day][timeSlot].has(room)
// // // // //             );
            
// // // // //             if (availableRooms.length === 0) continue;
            
// // // // //             // Find the teacher with the least workload
// // // // //             const teacher = availableTeachers.sort((a, b) => 
// // // // //               teacherWorkload[a] - teacherWorkload[b]
// // // // //             )[0];
            
// // // // //             const room = availableRooms[0];
            
// // // // //             if (teacherWorkload[teacher] < minWorkload) {
// // // // //               minWorkload = teacherWorkload[teacher];
// // // // //               bestSlot = timeSlot;
// // // // //               bestTeacher = teacher;
// // // // //               bestRoom = room;
// // // // //             }
// // // // //           }
          
// // // // //           if (bestSlot) {
// // // // //             teacherWorkload[bestTeacher]++;
// // // // //             teacherAvailability[bestTeacher][day].add(bestSlot);
// // // // //             roomAssignments[day][bestSlot].add(bestRoom);
// // // // //             subjectAllocationCount[subjectPlan.subject]++;
// // // // //             usedTimeSlots.add(bestSlot);
// // // // //             usedSubjects.add(subjectPlan.subject);
            
// // // // //             const slot = {
// // // // //               type: "CLASS",
// // // // //               subject: subjectPlan.subject,
// // // // //               className,
// // // // //               room: bestRoom,
// // // // //               time: bestSlot,
// // // // //               teacher: bestTeacher
// // // // //             };
            
// // // // //             teacherTimetables[bestTeacher][day][bestSlot] = slot;
// // // // //             timetable[className][day].classes.push(slot);
// // // // //           }
// // // // //         }
        
// // // // //         // Fill remaining slots with any available subjects
// // // // //         const remainingSlots = classTimes.filter(time => !usedTimeSlots.has(time));
        
// // // // //         for (const timeSlot of remainingSlots) {
// // // // //           let slotAssigned = false;
          
// // // // //           // Try to assign any subject that hasn't reached its weekly limit
// // // // //           for (const subject of subjects) {
// // // // //             if (subjectAllocationCount[subject.name] >= 
// // // // //                 subject.weeklyClasses * totalClasses.length) {
// // // // //               continue;
// // // // //             }
            
// // // // //             const availableTeachers = subject.teachers.filter(teacher => 
// // // // //               teacherAvailability[teacher] && 
// // // // //               teacherAvailability[teacher][day] &&
// // // // //               !teacherAvailability[teacher][day].has(timeSlot)
// // // // //             );
            
// // // // //             if (availableTeachers.length === 0) continue;
            
// // // // //             const availableRooms = rooms.filter(room => 
// // // // //               !roomAssignments[day][timeSlot].has(room)
// // // // //             );
            
// // // // //             if (availableRooms.length === 0) continue;
            
// // // // //             const teacher = availableTeachers.sort((a, b) => 
// // // // //               teacherWorkload[a] - teacherWorkload[b]
// // // // //             )[0];
// // // // //             const room = availableRooms[0];
            
// // // // //             teacherWorkload[teacher]++;
// // // // //             teacherAvailability[teacher][day].add(timeSlot);
// // // // //             roomAssignments[day][timeSlot].add(room);
// // // // //             subjectAllocationCount[subject.name]++;
            
// // // // //             const slot = {
// // // // //               type: "CLASS",
// // // // //               subject: subject.name,
// // // // //               className,
// // // // //               room,
// // // // //               time: timeSlot,
// // // // //               teacher
// // // // //             };
            
// // // // //             teacherTimetables[teacher][day][timeSlot] = slot;
// // // // //             timetable[className][day].classes.push(slot);
// // // // //             slotAssigned = true;
// // // // //             break;
// // // // //           }
          
// // // // //           // If still no slot assigned, try any available subject
// // // // //           if (!slotAssigned) {
// // // // //             for (const subject of subjects) {
// // // // //               const availableTeachers = subject.teachers.filter(teacher => 
// // // // //                 teacherAvailability[teacher] && 
// // // // //                 teacherAvailability[teacher][day] &&
// // // // //                 !teacherAvailability[teacher][day].has(timeSlot)
// // // // //               );
              
// // // // //               if (availableTeachers.length === 0) continue;
              
// // // // //               const availableRooms = rooms.filter(room => 
// // // // //                 !roomAssignments[day][timeSlot].has(room)
// // // // //               );
              
// // // // //               if (availableRooms.length === 0) continue;
              
// // // // //               const teacher = availableTeachers.sort((a, b) => 
// // // // //                 teacherWorkload[a] - teacherWorkload[b]
// // // // //               )[0];
// // // // //               const room = availableRooms[0];
              
// // // // //               teacherWorkload[teacher]++;
// // // // //               teacherAvailability[teacher][day].add(timeSlot);
// // // // //               roomAssignments[day][timeSlot].add(room);
              
// // // // //               const slot = {
// // // // //                 type: "CLASS",
// // // // //                 subject: subject.name,
// // // // //                 className,
// // // // //                 room,
// // // // //                 time: timeSlot,
// // // // //                 teacher
// // // // //               };
              
// // // // //               teacherTimetables[teacher][day][timeSlot] = slot;
// // // // //               timetable[className][day].classes.push(slot);
// // // // //               break;
// // // // //             }
// // // // //           }
// // // // //         }
        
// // // // //         // Sort classes by time for consistent ordering
// // // // //         timetable[className][day].classes.sort((a, b) => {
// // // // //           const timeA = classTimes.indexOf(a.time);
// // // // //           const timeB = classTimes.indexOf(b.time);
// // // // //           return timeA - timeB;
// // // // //         });
// // // // //       });
// // // // //     });

// // // // //     // Verify that all subjects got their required classes
// // // // //     const allocationReport = {};
// // // // //     let allSubjectsSatisfied = true;
    
// // // // //     subjects.forEach(subject => {
// // // // //       const required = subject.weeklyClasses * totalClasses.length;
// // // // //       const allocated = subjectAllocationCount[subject.name] || 0;
      
// // // // //       allocationReport[subject.name] = {
// // // // //         required: required,
// // // // //         allocated: allocated,
// // // // //         satisfied: allocated >= required
// // // // //       };
      
// // // // //       if (!allocationReport[subject.name].satisfied) {
// // // // //         allSubjectsSatisfied = false;
// // // // //         console.warn(`Subject ${subject.name} only got ${allocated} out of ${required} required classes`);
// // // // //       }
// // // // //     });
    
// // // // //     console.log("Subject allocation report:", allocationReport);

// // // // //     if (includeLabs && labTimings.length > 0 && batches.length > 0) {
// // // // //       const labLocationUsage = {};
// // // // //       workingDays.forEach(day => {
// // // // //         labLocationUsage[day] = {};
// // // // //         labTimings.forEach(labTime => {
// // // // //           labLocationUsage[day][labTime] = new Set();
// // // // //         });
// // // // //       });

// // // // //       totalClasses.forEach(className => {
// // // // //         workingDays.forEach((day, dayIndex) => {
// // // // //           const labSlots = [];

// // // // //           batches.forEach((batch, batchIndex) => {
// // // // //             const labTimeIndex = (dayIndex + batchIndex) % labTimings.length;
// // // // //             const labTime = labTimings[labTimeIndex];
            
// // // // //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// // // // //             const subject = subjects[subjectIndex].name;
// // // // //             const subjectTeachers = subjects[subjectIndex].teachers;

// // // // //             const availableTeachers = subjectTeachers.filter(teacher => 
// // // // //               teacherAvailability[teacher] && 
// // // // //               teacherAvailability[teacher][day] &&
// // // // //               !teacherAvailability[teacher][day].has(labTime)
// // // // //             );
            
// // // // //             if (availableTeachers.length === 0) {
// // // // //               console.warn(`No teachers available for ${subject} lab on ${day} at ${labTime} - skipping`);
// // // // //               return;
// // // // //             }

// // // // //             let labLocation = null;
// // // // //             for (const lab of labLocations) {
// // // // //               if (!labLocationUsage[day][labTime].has(lab)) {
// // // // //                 labLocation = lab;
// // // // //                 break;
// // // // //               }
// // // // //             }
            
// // // // //             if (!labLocation) {
// // // // //               console.warn(`No lab location available for ${subject} on ${day} at ${labTime} - skipping`);
// // // // //               return;
// // // // //             }

// // // // //             const teacher = availableTeachers.sort((a, b) => 
// // // // //               teacherWorkload[a] - teacherWorkload[b]
// // // // //             )[0];

// // // // //             teacherWorkload[teacher]++;
// // // // //             teacherAvailability[teacher][day].add(labTime);
// // // // //             labLocationUsage[day][labTime].add(labLocation);

// // // // //             const labSlot = {
// // // // //               type: "LAB",
// // // // //               subject,
// // // // //               batch,
// // // // //               location: labLocation,
// // // // //               time: labTime,
// // // // //               className,
// // // // //               teacher
// // // // //             };

// // // // //             teacherTimetables[teacher][day][labTime] = labSlot;
// // // // //             labSlots.push(labSlot);
// // // // //           });

// // // // //           if (labSlots.length > 0) {
// // // // //             timetable[className][day].lab = {
// // // // //               type: "Lab",
// // // // //               slots: labSlots,
// // // // //               time: labSlots[0].time
// // // // //             };
// // // // //           }
// // // // //         });
// // // // //       });
// // // // //     }

// // // // //     const formattedTeacherTimetables = transformTeacherTimetables(
// // // // //       teacherTimetables,
// // // // //       workingDays,
// // // // //       classTimes,
// // // // //       includeLabs ? labTimings : []
// // // // //     );

// // // // //     const result = {
// // // // //       collegeName,
// // // // //       branchName,
// // // // //       workingDays,
// // // // //       classTimes,
// // // // //       labTimings: includeLabs ? labTimings : [],
// // // // //       timetable,
// // // // //       teacherTimetables: formattedTeacherTimetables,
// // // // //       allocationReport, // Include allocation report in the response
// // // // //       metadata: {
// // // // //         generatedAt: new Date(),
// // // // //         version: 1,
// // // // //         stats: {
// // // // //           totalClasses: totalClasses.length,
// // // // //           totalSubjects: subjects.length,
// // // // //           totalTeachers: teacherPool.size,
// // // // //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// // // // //           includesLabs: includeLabs,
// // // // //           teachersWithAssignments: Object.keys(formattedTeacherTimetables).length,
// // // // //           allSubjectsSatisfied: allSubjectsSatisfied
// // // // //         }
// // // // //       }
// // // // //     };

// // // // //     const newTimetable = new Timetable(result);
// // // // //     await newTimetable.save();

// // // // //     return res.status(200).json({
// // // // //       success: true,
// // // // //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// // // // //       allSubjectsSatisfied,
// // // // //       ...result
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error("Generation failed:", error);
// // // // //     return res.status(500).json({
// // // // //       success: false,
// // // // //       error: error.message,
// // // // //       debug: {
// // // // //         teacherPool: Array.from(teacherPool),
// // // // //         teacherTimetables: Object.keys(teacherTimetables).map(teacher => ({
// // // // //           teacher,
// // // // //           hasAssignments: workingDays.some(day => 
// // // // //             Object.values(teacherTimetables[teacher][day] || {}).some(slot => slot !== null)
// // // // //           )
// // // // //         }))
// // // // //       }
// // // // //     });
// // // // //   }
// // // // // };

// // // // // export const getResultTimeTableController = async (req, res) => {
// // // // //   try {
// // // // //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       count: timetables.length,
// // // // //       data: timetables
// // // // //     });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ 
// // // // //       success: false,
// // // // //       error: "Failed to fetch timetables",
// // // // //       details: error.message
// // // // //     });
// // // // //   }
// // // // // };






// // // // import { createRequire } from "module";
// // // // const require = createRequire(import.meta.url);
// // // // const Timetable = require("../models/timetable.model");
// // // // import { formatTimeSlot, transformTeacherTimetables } from "../helpers/timetable.helpers.js";

// // // // // Helper function to deep clone objects
// // // // function deepClone(obj) {
// // // //   return JSON.parse(JSON.stringify(obj));
// // // // }

// // // // export const generateTimeTableController = async (req, res) => {
// // // //   let teacherPool = new Set();
// // // //   let teacherTimetables = {};

// // // //   try {
// // // //     const {
// // // //       collegeName,
// // // //       branchName,
// // // //       workingDays,
// // // //       classTimes,
// // // //       totalClasses,
// // // //       subjects,
// // // //       rooms,
// // // //       labLocations = [],
// // // //       totalClassesPerDay,
// // // //       batches = [],
// // // //       labTimings = [],
// // // //       includeLabs = false
// // // //     } = req.body;

// // // //     const errors = [];
// // // //     if (!collegeName) errors.push("College name is required");
// // // //     if (!branchName) errors.push("Branch name is required");
// // // //     if (!workingDays?.length) errors.push("Working days are required");
// // // //     if (!classTimes?.length) errors.push("Class times are required");
// // // //     if (!totalClasses?.length) errors.push("Total classes are required");
// // // //     if (!subjects?.length) errors.push("Subjects are required");
// // // //     if (!rooms?.length) errors.push("Rooms are required");
// // // //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// // // //     subjects.forEach(subject => {
// // // //       if (!subject.teachers?.length) {
// // // //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// // // //       } else {
// // // //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// // // //       }
      
// // // //       if (!subject.weeklyClasses || subject.weeklyClasses <= 0) {
// // // //         errors.push(`Subject "${subject.name}" must have a positive number of weekly classes`);
// // // //       }
// // // //     });

// // // //     const totalRequiredClasses = subjects.reduce((sum, subject) => 
// // // //       sum + (subject.weeklyClasses * totalClasses.length), 0);
// // // //     const totalAvailableSlots = workingDays.length * totalClassesPerDay * totalClasses.length;
    
// // // //     if (totalRequiredClasses > totalAvailableSlots) {
// // // //       errors.push(`Not enough slots available. Required: ${totalRequiredClasses}, Available: ${totalAvailableSlots}`);
// // // //     }

// // // //     if (errors.length > 0) {
// // // //       console.error("Validation errors:", errors);
// // // //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// // // //     }

// // // //     console.log(`Initializing timetable for ${teacherPool.size} teachers`);

// // // //     // Initialize all data structures
// // // //     const timetable = {};
// // // //     const roomAssignments = {};
// // // //     const teacherWorkload = {};
// // // //     const teacherAvailability = {};
// // // //     const subjectAllocationCount = {};
// // // //     const teacherSubjectAllocation = {};

// // // //     // Initialize subject allocation counters
// // // //     totalClasses.forEach(className => {
// // // //       subjectAllocationCount[className] = {};
// // // //       subjects.forEach(subject => {
// // // //         subjectAllocationCount[className][subject.name] = 0;
// // // //       });
// // // //     });

// // // //     Array.from(teacherPool).forEach(teacher => {
// // // //       teacherTimetables[teacher] = {};
// // // //       teacherWorkload[teacher] = 0;
// // // //       teacherAvailability[teacher] = {};
// // // //       teacherSubjectAllocation[teacher] = {};
      
// // // //       workingDays.forEach(day => {
// // // //         teacherTimetables[teacher][day] = {};
// // // //         teacherAvailability[teacher][day] = new Set();
// // // //       });
// // // //     });

// // // //     subjects.forEach(subject => {
// // // //       subject.teachers.forEach(teacher => {
// // // //         teacherSubjectAllocation[teacher][subject.name] = 0;
// // // //       });
// // // //     });

// // // //     workingDays.forEach(day => {
// // // //       roomAssignments[day] = {};
// // // //       classTimes.forEach(time => {
// // // //         roomAssignments[day][time] = new Set();
// // // //       });
// // // //     });

// // // //     totalClasses.forEach(className => {
// // // //       timetable[className] = {};
// // // //       workingDays.forEach(day => {
// // // //         timetable[className][day] = { classes: [], lab: null };
// // // //       });
// // // //     });

// // // //     // NEW: Create allocation plan with priority for subjects with fewer teachers
// // // //     const allocationPlan = [];
// // // //     totalClasses.forEach(className => {
// // // //       subjects.forEach(subject => {
// // // //         for (let i = 0; i < subject.weeklyClasses; i++) {
// // // //           allocationPlan.push({
// // // //             className,
// // // //             subject: subject.name,
// // // //             teachers: subject.teachers,
// // // //             priority: subject.teachers.length // Higher priority for subjects with fewer teachers
// // // //           });
// // // //         }
// // // //       });
// // // //     });

// // // //     // Sort by priority (subjects with fewer teachers get scheduled first)
// // // //     allocationPlan.sort((a, b) => a.priority - b.priority);

// // // //     // NEW: Implement backtracking with multiple attempts
// // // //     let attempt = 0;
// // // //     const maxAttempts = 10;
// // // //     let success = false;

// // // //     while (attempt < maxAttempts && !success) {
// // // //       attempt++;
// // // //       console.log(`\n=== Attempt ${attempt} ===`);
      
// // // //       // Reset all allocations for this attempt
// // // //       totalClasses.forEach(className => {
// // // //         subjects.forEach(subject => {
// // // //           subjectAllocationCount[className][subject.name] = 0;
// // // //         });
// // // //       });
      
// // // //       Array.from(teacherPool).forEach(teacher => {
// // // //         teacherWorkload[teacher] = 0;
// // // //         workingDays.forEach(day => {
// // // //           teacherAvailability[teacher][day] = new Set();
// // // //         });
// // // //       });
      
// // // //       workingDays.forEach(day => {
// // // //         classTimes.forEach(time => {
// // // //           roomAssignments[day][time] = new Set();
// // // //         });
// // // //       });
      
// // // //       totalClasses.forEach(className => {
// // // //         workingDays.forEach(day => {
// // // //           timetable[className][day].classes = [];
// // // //         });
// // // //       });

// // // //       // Shuffle allocation plan for this attempt
// // // //       for (let i = allocationPlan.length - 1; i > 0; i--) {
// // // //         const j = Math.floor(Math.random() * (i + 1));
// // // //         [allocationPlan[i], allocationPlan[j]] = [allocationPlan[j], allocationPlan[i]];
// // // //       }

// // // //       success = true;

// // // //       // Try to allocate each subject-class combination
// // // //       for (const allocation of allocationPlan) {
// // // //         const { className, subject, teachers } = allocation;
        
// // // //         if (subjectAllocationCount[className][subject] >= 
// // // //             subjects.find(s => s.name === subject).weeklyClasses) {
// // // //           continue;
// // // //         }

// // // //         let allocated = false;

// // // //         // Try all possible days and time slots
// // // //         for (const day of workingDays) {
// // // //           if (allocated) break;
          
// // // //           for (const timeSlot of classTimes) {
// // // //             if (allocated) break;
            
// // // //             // Check if this class already has a class at this time
// // // //             const hasClassAtThisTime = timetable[className][day].classes.some(
// // // //               cls => cls.time === timeSlot
// // // //             );
            
// // // //             if (hasClassAtThisTime) continue;

// // // //             // Find available teacher
// // // //             const availableTeachers = teachers.filter(teacher => 
// // // //               !teacherAvailability[teacher][day].has(timeSlot)
// // // //             );

// // // //             if (availableTeachers.length === 0) continue;

// // // //             // Find available room
// // // //             const availableRooms = rooms.filter(room => 
// // // //               !roomAssignments[day][timeSlot].has(room)
// // // //             );

// // // //             if (availableRooms.length === 0) continue;

// // // //             // Select teacher with least workload
// // // //             const teacher = availableTeachers.sort((a, b) => 
// // // //               teacherWorkload[a] - teacherWorkload[b]
// // // //             )[0];

// // // //             const room = availableRooms[0];

// // // //             // Make the allocation
// // // //             teacherWorkload[teacher]++;
// // // //             teacherAvailability[teacher][day].add(timeSlot);
// // // //             teacherSubjectAllocation[teacher][subject]++;
// // // //             roomAssignments[day][timeSlot].add(room);
// // // //             subjectAllocationCount[className][subject]++;

// // // //             const slot = {
// // // //               type: "CLASS",
// // // //               subject,
// // // //               className,
// // // //               room,
// // // //               time: timeSlot,
// // // //               teacher
// // // //             };

// // // //             teacherTimetables[teacher][day][timeSlot] = slot;
// // // //             timetable[className][day].classes.push(slot);
// // // //             allocated = true;

// // // //             console.log(`Allocated ${subject} to ${className} on ${day} at ${timeSlot}`);
// // // //             break;
// // // //           }
// // // //         }

// // // //         if (!allocated) {
// // // //           console.warn(`Failed to allocate ${subject} for ${className}`);
// // // //           success = false;
// // // //           break;
// // // //         }
// // // //       }

// // // //       if (success) {
// // // //         console.log(`✅ Successfully generated timetable on attempt ${attempt}`);
// // // //       }
// // // //     }

// // // //     if (!success) {
// // // //       throw new Error(`Failed to generate valid timetable after ${maxAttempts} attempts`);
// // // //     }

// // // //     // Final validation
// // // //     const allocationReport = {};
// // // //     let allSubjectsSatisfied = true;
    
// // // //     totalClasses.forEach(className => {
// // // //       allocationReport[className] = {};
      
// // // //       subjects.forEach(subject => {
// // // //         const required = subject.weeklyClasses;
// // // //         const allocated = subjectAllocationCount[className][subject.name] || 0;
        
// // // //         allocationReport[className][subject.name] = {
// // // //           required: required,
// // // //           allocated: allocated,
// // // //           satisfied: allocated === required
// // // //         };
        
// // // //         if (!allocationReport[className][subject.name].satisfied) {
// // // //           allSubjectsSatisfied = false;
// // // //           console.error(`❌ Class ${className}: Subject ${subject.name} got ${allocated} out of ${required} required classes`);
// // // //         }
// // // //       });
// // // //     });

// // // //     if (!allSubjectsSatisfied) {
// // // //       throw new Error("Timetable generation failed: Not all subjects got their required classes");
// // // //     }

// // // //     // Sort classes by time
// // // //     totalClasses.forEach(className => {
// // // //       workingDays.forEach(day => {
// // // //         timetable[className][day].classes.sort((a, b) => {
// // // //           return classTimes.indexOf(a.time) - classTimes.indexOf(b.time);
// // // //         });
// // // //       });
// // // //     });

// // // //     // Lab sessions (existing code)
// // // //     if (includeLabs && labTimings.length > 0 && batches.length > 0) {
// // // //       const labLocationUsage = {};
// // // //       workingDays.forEach(day => {
// // // //         labLocationUsage[day] = {};
// // // //         labTimings.forEach(labTime => {
// // // //           labLocationUsage[day][labTime] = new Set();
// // // //         });
// // // //       });

// // // //       totalClasses.forEach(className => {
// // // //         workingDays.forEach((day, dayIndex) => {
// // // //           const labSlots = [];
// // // //           batches.forEach((batch, batchIndex) => {
// // // //             const labTimeIndex = (dayIndex + batchIndex) % labTimings.length;
// // // //             const labTime = labTimings[labTimeIndex];
// // // //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// // // //             const subject = subjects[subjectIndex].name;
// // // //             const subjectTeachers = subjects[subjectIndex].teachers;

// // // //             const availableTeachers = subjectTeachers.filter(teacher => 
// // // //               !teacherAvailability[teacher][day].has(labTime)
// // // //             );
            
// // // //             if (availableTeachers.length === 0) return;

// // // //             let labLocation = null;
// // // //             for (const lab of labLocations) {
// // // //               if (!labLocationUsage[day][labTime].has(lab)) {
// // // //                 labLocation = lab;
// // // //                 break;
// // // //               }
// // // //             }
            
// // // //             if (!labLocation) return;

// // // //             const teacher = availableTeachers.sort((a, b) => 
// // // //               teacherWorkload[a] - teacherWorkload[b]
// // // //             )[0];

// // // //             teacherWorkload[teacher]++;
// // // //             teacherAvailability[teacher][day].add(labTime);
// // // //             labLocationUsage[day][labTime].add(labLocation);

// // // //             const labSlot = {
// // // //               type: "LAB",
// // // //               subject,
// // // //               batch,
// // // //               location: labLocation,
// // // //               time: labTime,
// // // //               className,
// // // //               teacher
// // // //             };

// // // //             teacherTimetables[teacher][day][labTime] = labSlot;
// // // //             labSlots.push(labSlot);
// // // //           });

// // // //           if (labSlots.length > 0) {
// // // //             timetable[className][day].lab = {
// // // //               type: "Lab",
// // // //               slots: labSlots,
// // // //               time: labSlots[0].time
// // // //             };
// // // //           }
// // // //         });
// // // //       });
// // // //     }

// // // //     const formattedTeacherTimetables = transformTeacherTimetables(
// // // //       teacherTimetables,
// // // //       workingDays,
// // // //       classTimes,
// // // //       includeLabs ? labTimings : []
// // // //     );

// // // //     const result = {
// // // //       collegeName,
// // // //       branchName,
// // // //       workingDays,
// // // //       classTimes,
// // // //       labTimings: includeLabs ? labTimings : [],
// // // //       timetable,
// // // //       teacherTimetables: formattedTeacherTimetables,
// // // //       allocationReport,
// // // //       metadata: {
// // // //         generatedAt: new Date(),
// // // //         version: 1,
// // // //         stats: {
// // // //           totalClasses: totalClasses.length,
// // // //           totalSubjects: subjects.length,
// // // //           totalTeachers: teacherPool.size,
// // // //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// // // //           includesLabs: includeLabs,
// // // //           teachersWithAssignments: Object.keys(formattedTeacherTimetables).length,
// // // //           allSubjectsSatisfied: allSubjectsSatisfied
// // // //         }
// // // //       }
// // // //     };

// // // //     const newTimetable = new Timetable(result);
// // // //     await newTimetable.save();

// // // //     return res.status(200).json({
// // // //       success: true,
// // // //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// // // //       allSubjectsSatisfied,
// // // //       ...result
// // // //     });

// // // //   } catch (error) {
// // // //     console.error("Generation failed:", error);
// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       error: error.message,
// // // //       debug: {
// // // //         teacherPool: Array.from(teacherPool),
// // // //         teacherTimetables: Object.keys(teacherTimetables).map(teacher => ({
// // // //           teacher,
// // // //           hasAssignments: workingDays.some(day => 
// // // //             Object.values(teacherTimetables[teacher][day] || {}).some(slot => slot !== null)
// // // //           )
// // // //         }))
// // // //       }
// // // //     });
// // // //   }
// // // // };

// // // // export const getResultTimeTableController = async (req, res) => {
// // // //   try {
// // // //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// // // //     res.status(200).json({
// // // //       success: true,
// // // //       count: timetables.length,
// // // //       data: timetables
// // // //     });
// // // //   } catch (error) {
// // // //     res.status(500).json({ 
// // // //       success: false,
// // // //       error: "Failed to fetch timetables",
// // // //       details: error.message
// // // //     });
// // // //   }
// // // // };

// // // import { createRequire } from "module";
// // // const require = createRequire(import.meta.url);
// // // const Timetable = require("../models/timetable.model");
// // // import { formatTimeSlot, transformTeacherTimetables } from "../helpers/timetable.helpers.js";

// // // export const generateTimeTableController = async (req, res) => {
// // //   let teacherPool = new Set();
// // //   let teacherTimetables = {};

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

// // //     const errors = [];
// // //     if (!collegeName) errors.push("College name is required");
// // //     if (!branchName) errors.push("Branch name is required");
// // //     if (!workingDays?.length) errors.push("Working days are required");
// // //     if (!classTimes?.length) errors.push("Class times are required");
// // //     if (!totalClasses?.length) errors.push("Total classes are required");
// // //     if (!subjects?.length) errors.push("Subjects are required");
// // //     if (!rooms?.length) errors.push("Rooms are required");
// // //     if (!totalClassesPerDay) errors.push("Total classes per day is required");

// // //     subjects.forEach(subject => {
// // //       if (!subject.teachers?.length) {
// // //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// // //       } else {
// // //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// // //       }
      
// // //       if (!subject.weeklyClasses || subject.weeklyClasses <= 0) {
// // //         errors.push(`Subject "${subject.name}" must have a positive number of weekly classes`);
// // //       }
// // //     });

// // //     const totalRequiredClasses = subjects.reduce((sum, subject) => 
// // //       sum + (subject.weeklyClasses * totalClasses.length), 0);
// // //     const totalAvailableSlots = workingDays.length * totalClassesPerDay * totalClasses.length;
    
// // //     if (totalRequiredClasses > totalAvailableSlots) {
// // //       errors.push(`Not enough slots available. Required: ${totalRequiredClasses}, Available: ${totalAvailableSlots}`);
// // //     }

// // //     if (errors.length > 0) {
// // //       console.error("Validation errors:", errors);
// // //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// // //     }

// // //     console.log(`Initializing timetable for ${teacherPool.size} teachers`);

// // //     const timetable = {};
// // //     const roomAssignments = {};
// // //     const teacherWorkload = {};
// // //     const teacherAvailability = {};
// // //     const subjectAllocationCount = {};
// // //     const teacherSubjectAllocation = {};

// // //     // Initialize subject allocation counters for each class
// // //     totalClasses.forEach(className => {
// // //       subjectAllocationCount[className] = {};
// // //       subjects.forEach(subject => {
// // //         subjectAllocationCount[className][subject.name] = 0;
// // //       });
// // //     });

// // //     Array.from(teacherPool).forEach(teacher => {
// // //       teacherTimetables[teacher] = {};
// // //       teacherWorkload[teacher] = 0;
// // //       teacherAvailability[teacher] = {};
// // //       teacherSubjectAllocation[teacher] = {};
      
// // //       workingDays.forEach(day => {
// // //         teacherTimetables[teacher][day] = {};
// // //         teacherAvailability[teacher][day] = new Set();
        
// // //         [...classTimes, ...labTimings].forEach(time => {
// // //           teacherTimetables[teacher][day][time] = null;
// // //         });
// // //       });
// // //     });

// // //     subjects.forEach(subject => {
// // //       subject.teachers.forEach(teacher => {
// // //         teacherSubjectAllocation[teacher][subject.name] = 0;
// // //       });
// // //     });

// // //     workingDays.forEach(day => {
// // //       roomAssignments[day] = {};
// // //       [...classTimes, ...labTimings].forEach(time => {
// // //         roomAssignments[day][time] = new Set();
// // //       });
// // //     });

// // //     totalClasses.forEach(className => {
// // //       timetable[className] = {};
// // //       workingDays.forEach(day => {
// // //         timetable[className][day] = {
// // //           classes: [],
// // //           lab: null
// // //         };
// // //       });
// // //     });

// // //     // Create allocation plan with priority for subjects with fewer teachers
// // //     const allocationPlan = [];
// // //     totalClasses.forEach(className => {
// // //       subjects.forEach(subject => {
// // //         for (let i = 0; i < subject.weeklyClasses; i++) {
// // //           allocationPlan.push({
// // //             className,
// // //             subject: subject.name,
// // //             teachers: subject.teachers,
// // //             priority: subject.teachers.length // Higher priority for subjects with fewer teachers
// // //           });
// // //         }
// // //       });
// // //     });

// // //     // Sort by priority (subjects with fewer teachers get scheduled first)
// // //     allocationPlan.sort((a, b) => a.priority - b.priority);

// // //     // Implement multiple attempts with backtracking
// // //     let attempt = 0;
// // //     const maxAttempts = 20;
// // //     let success = false;

// // //     while (attempt < maxAttempts && !success) {
// // //       attempt++;
// // //       console.log(`\n=== Attempt ${attempt} ===`);
      
// // //       // Reset all allocations for this attempt
// // //       totalClasses.forEach(className => {
// // //         subjects.forEach(subject => {
// // //           subjectAllocationCount[className][subject.name] = 0;
// // //         });
// // //       });
      
// // //       Array.from(teacherPool).forEach(teacher => {
// // //         teacherWorkload[teacher] = 0;
// // //         workingDays.forEach(day => {
// // //           teacherAvailability[teacher][day] = new Set();
// // //         });
// // //       });
      
// // //       workingDays.forEach(day => {
// // //         [...classTimes, ...labTimings].forEach(time => {
// // //           roomAssignments[day][time] = new Set();
// // //         });
// // //       });
      
// // //       totalClasses.forEach(className => {
// // //         workingDays.forEach(day => {
// // //           timetable[className][day].classes = [];
// // //         });
// // //       });

// // //       // Shuffle allocation plan for this attempt
// // //       for (let i = allocationPlan.length - 1; i > 0; i--) {
// // //         const j = Math.floor(Math.random() * (i + 1));
// // //         [allocationPlan[i], allocationPlan[j]] = [allocationPlan[j], allocationPlan[i]];
// // //       }

// // //       success = true;

// // //       // Try to allocate each subject-class combination
// // //       for (const allocation of allocationPlan) {
// // //         const { className, subject, teachers } = allocation;
        
// // //         // Skip if already allocated enough for this class
// // //         if (subjectAllocationCount[className][subject] >= 
// // //             subjects.find(s => s.name === subject).weeklyClasses) {
// // //           continue;
// // //         }

// // //         let allocated = false;
// // //         const maxDaysAttempts = 10;
// // //         let daysAttempted = 0;

// // //         // Try different days with priority
// // //         const shuffledDays = [...workingDays].sort(() => Math.random() - 0.5);
        
// // //         for (const day of shuffledDays) {
// // //           if (allocated || daysAttempted >= maxDaysAttempts) break;
// // //           daysAttempted++;

// // //           // Check if this subject is already allocated on this day for this class
// // //           const alreadyOnThisDay = timetable[className][day].classes.some(
// // //             cls => cls.subject === subject
// // //           );
          
// // //           if (alreadyOnThisDay) continue;

// // //           // Try all time slots for this day
// // //           const shuffledTimeSlots = [...classTimes].sort(() => Math.random() - 0.5);
          
// // //           for (const timeSlot of shuffledTimeSlots) {
// // //             if (allocated) break;

// // //             // Check if this class already has a class at this time
// // //             const hasClassAtThisTime = timetable[className][day].classes.some(
// // //               cls => cls.time === timeSlot
// // //             );
            
// // //             if (hasClassAtThisTime) continue;

// // //             // Find available teacher
// // //             const availableTeachers = teachers.filter(teacher => 
// // //               !teacherAvailability[teacher][day].has(timeSlot)
// // //             );

// // //             if (availableTeachers.length === 0) continue;

// // //             // Find available room
// // //             const availableRooms = rooms.filter(room => 
// // //               !roomAssignments[day][timeSlot].has(room)
// // //             );

// // //             if (availableRooms.length === 0) continue;

// // //             // Select teacher with least workload
// // //             const teacher = availableTeachers.sort((a, b) => 
// // //               teacherWorkload[a] - teacherWorkload[b]
// // //             )[0];

// // //             const room = availableRooms[0];

// // //             // Make the allocation
// // //             teacherWorkload[teacher]++;
// // //             teacherAvailability[teacher][day].add(timeSlot);
// // //             teacherSubjectAllocation[teacher][subject]++;
// // //             roomAssignments[day][timeSlot].add(room);
// // //             subjectAllocationCount[className][subject]++;

// // //             const slot = {
// // //               type: "CLASS",
// // //               subject,
// // //               className,
// // //               room,
// // //               time: timeSlot,
// // //               teacher
// // //             };

// // //             teacherTimetables[teacher][day][timeSlot] = slot;
// // //             timetable[className][day].classes.push(slot);
// // //             allocated = true;

// // //             console.log(`Allocated ${subject} to ${className} on ${day} at ${timeSlot}`);
// // //             break;
// // //           }
// // //         }

// // //         if (!allocated) {
// // //           console.warn(`Failed to allocate ${subject} for ${className}`);
// // //           success = false;
// // //           break;
// // //         }
// // //       }

// // //       if (success) {
// // //         console.log(`✅ Successfully generated timetable on attempt ${attempt}`);
        
// // //         // Validate the allocation
// // //         let valid = true;
// // //         totalClasses.forEach(className => {
// // //           subjects.forEach(subject => {
// // //             const allocated = subjectAllocationCount[className][subject.name] || 0;
// // //             const required = subject.weeklyClasses;
            
// // //             if (allocated !== required) {
// // //               console.error(`❌ ${className}: ${subject.name} - Required ${required}, Got ${allocated}`);
// // //               valid = false;
// // //             }
// // //           });
// // //         });
        
// // //         if (!valid) {
// // //           success = false;
// // //           console.log("Validation failed, trying again...");
// // //         }
// // //       }
// // //     }

// // //     if (!success) {
// // //       throw new Error(`Failed to generate valid timetable after ${maxAttempts} attempts`);
// // //     }

// // //     // Final validation
// // //     const allocationReport = {};
// // //     let allSubjectsSatisfied = true;
    
// // //     totalClasses.forEach(className => {
// // //       allocationReport[className] = {};
      
// // //       subjects.forEach(subject => {
// // //         const required = subject.weeklyClasses;
// // //         const allocated = subjectAllocationCount[className][subject.name] || 0;
        
// // //         allocationReport[className][subject.name] = {
// // //           required: required,
// // //           allocated: allocated,
// // //           satisfied: allocated === required
// // //         };
        
// // //         if (!allocationReport[className][subject.name].satisfied) {
// // //           allSubjectsSatisfied = false;
// // //           console.error(`❌ Class ${className}: Subject ${subject.name} got ${allocated} out of ${required} required classes`);
// // //         }
// // //       });
// // //     });

// // //     if (!allSubjectsSatisfied) {
// // //       throw new Error("Timetable generation failed: Not all subjects got their required classes");
// // //     }

// // //     // Sort classes by time
// // //     totalClasses.forEach(className => {
// // //       workingDays.forEach(day => {
// // //         timetable[className][day].classes.sort((a, b) => {
// // //           return classTimes.indexOf(a.time) - classTimes.indexOf(b.time);
// // //         });
// // //       });
// // //     });

// // //     // Lab sessions
// // //     if (includeLabs && labTimings.length > 0 && batches.length > 0) {
// // //       const labLocationUsage = {};
// // //       workingDays.forEach(day => {
// // //         labLocationUsage[day] = {};
// // //         labTimings.forEach(labTime => {
// // //           labLocationUsage[day][labTime] = new Set();
// // //         });
// // //       });

// // //       totalClasses.forEach(className => {
// // //         workingDays.forEach((day, dayIndex) => {
// // //           const labSlots = [];

// // //           batches.forEach((batch, batchIndex) => {
// // //             const labTimeIndex = (dayIndex + batchIndex) % labTimings.length;
// // //             const labTime = labTimings[labTimeIndex];
            
// // //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// // //             const subject = subjects[subjectIndex].name;
// // //             const subjectTeachers = subjects[subjectIndex].teachers;

// // //             const availableTeachers = subjectTeachers.filter(teacher => 
// // //               teacherAvailability[teacher] && 
// // //               teacherAvailability[teacher][day] &&
// // //               !teacherAvailability[teacher][day].has(labTime)
// // //             );
            
// // //             if (availableTeachers.length === 0) {
// // //               console.warn(`No teachers available for ${subject} lab on ${day} at ${labTime} - skipping`);
// // //               return;
// // //             }

// // //             let labLocation = null;
// // //             for (const lab of labLocations) {
// // //               if (!labLocationUsage[day][labTime].has(lab)) {
// // //                 labLocation = lab;
// // //                 break;
// // //               }
// // //             }
            
// // //             if (!labLocation) {
// // //               console.warn(`No lab location available for ${subject} on ${day} at ${labTime} - skipping`);
// // //               return;
// // //             }

// // //             const teacher = availableTeachers.sort((a, b) => 
// // //               teacherWorkload[a] - teacherWorkload[b]
// // //             )[0];

// // //             teacherWorkload[teacher]++;
// // //             teacherAvailability[teacher][day].add(labTime);
// // //             labLocationUsage[day][labTime].add(labLocation);

// // //             const labSlot = {
// // //               type: "LAB",
// // //               subject,
// // //               batch,
// // //               location: labLocation,
// // //               time: labTime,
// // //               className,
// // //               teacher
// // //             };

// // //             teacherTimetables[teacher][day][labTime] = labSlot;
// // //             labSlots.push(labSlot);
// // //           });

// // //           if (labSlots.length > 0) {
// // //             timetable[className][day].lab = {
// // //               type: "Lab",
// // //               slots: labSlots,
// // //               time: labSlots[0].time
// // //             };
// // //           }
// // //         });
// // //       });
// // //     }

// // //     const formattedTeacherTimetables = transformTeacherTimetables(
// // //       teacherTimetables,
// // //       workingDays,
// // //       classTimes,
// // //       includeLabs ? labTimings : []
// // //     );

// // //     const result = {
// // //       collegeName,
// // //       branchName,
// // //       workingDays,
// // //       classTimes,
// // //       labTimings: includeLabs ? labTimings : [],
// // //       timetable,
// // //       teacherTimetables: formattedTeacherTimetables,
// // //       allocationReport,
// // //       metadata: {
// // //         generatedAt: new Date(),
// // //         version: 1,
// // //         stats: {
// // //           totalClasses: totalClasses.length,
// // //           totalSubjects: subjects.length,
// // //           totalTeachers: teacherPool.size,
// // //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// // //           includesLabs: includeLabs,
// // //           teachersWithAssignments: Object.keys(formattedTeacherTimetables).length,
// // //           allSubjectsSatisfied: allSubjectsSatisfied
// // //         }
// // //       }
// // //     };

// // //     const newTimetable = new Timetable(result);
// // //     await newTimetable.save();

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// // //       allSubjectsSatisfied,
// // //       ...result
// // //     });

// // //   } catch (error) {
// // //     console.error("Generation failed:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //       debug: {
// // //         teacherPool: Array.from(teacherPool),
// // //         teacherTimetables: Object.keys(teacherTimetables).map(teacher => ({
// // //           teacher,
// // //           hasAssignments: workingDays.some(day => 
// // //             Object.values(teacherTimetables[teacher][day] || {}).some(slot => slot !== null)
// // //           )
// // //         }))
// // //       }
// // //     });
// // //   }
// // // };

// // // export const getResultTimeTableController = async (req, res) => {
// // //   try {
// // //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// // //     res.status(200).json({
// // //       success: true,
// // //       count: timetables.length,
// // //       data: timetables
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ 
// // //       success: false,
// // //       error: "Failed to fetch timetables",
// // //       details: error.message
// // //     });
// // //   }
// // // };








// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url);
// // const Timetable = require("../models/timetable.model");
// // import { formatTimeSlot, transformTeacherTimetables } from "../helpers/timetable.helpers.js";

// // // Helper function to deep clone objects
// // function deepClone(obj) {
// //   return JSON.parse(JSON.stringify(obj));
// // }

// // export const generateTimeTableController = async (req, res) => {
// //   let teacherPool = new Set();
// //   let teacherTimetables = {};

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

// //     subjects.forEach(subject => {
// //       if (!subject.teachers?.length) {
// //         errors.push(`Subject "${subject.name}" has no teachers assigned`);
// //       } else {
// //         subject.teachers.forEach(teacher => teacherPool.add(teacher));
// //       }
      
// //       if (!subject.weeklyClasses || subject.weeklyClasses <= 0) {
// //         errors.push(`Subject "${subject.name}" must have a positive number of weekly classes`);
// //       }
// //     });

// //     const totalRequiredClasses = subjects.reduce((sum, subject) => 
// //       sum + (subject.weeklyClasses * totalClasses.length), 0);
// //     const totalAvailableSlots = workingDays.length * totalClassesPerDay * totalClasses.length;
    
// //     if (totalRequiredClasses > totalAvailableSlots) {
// //       errors.push(`Not enough slots available. Required: ${totalRequiredClasses}, Available: ${totalAvailableSlots}`);
// //     }

// //     if (errors.length > 0) {
// //       console.error("Validation errors:", errors);
// //       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
// //     }

// //     console.log(`Initializing timetable for ${teacherPool.size} teachers`);

// //     // Initialize all data structures
// //     const timetable = {};
// //     const roomAssignments = {};
// //     const teacherWorkload = {};
// //     const teacherAvailability = {};
// //     const subjectAllocationCount = {};
// //     const teacherSubjectAllocation = {};

// //     // Initialize subject allocation counters for each class
// //     totalClasses.forEach(className => {
// //       subjectAllocationCount[className] = {};
// //       subjects.forEach(subject => {
// //         subjectAllocationCount[className][subject.name] = 0;
// //       });
// //     });

// //     Array.from(teacherPool).forEach(teacher => {
// //       teacherTimetables[teacher] = {};
// //       teacherWorkload[teacher] = 0;
// //       teacherAvailability[teacher] = {};
// //       teacherSubjectAllocation[teacher] = {};
      
// //       workingDays.forEach(day => {
// //         teacherTimetables[teacher][day] = {};
// //         teacherAvailability[teacher][day] = new Set();
        
// //         [...classTimes, ...labTimings].forEach(time => {
// //           teacherTimetables[teacher][day][time] = null;
// //         });
// //       });
// //     });

// //     subjects.forEach(subject => {
// //       subject.teachers.forEach(teacher => {
// //         teacherSubjectAllocation[teacher][subject.name] = 0;
// //       });
// //     });

// //     workingDays.forEach(day => {
// //       roomAssignments[day] = {};
// //       [...classTimes, ...labTimings].forEach(time => {
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

// //     // Create allocation plan with priority for subjects with fewer teachers
// //     const allocationPlan = [];
// //     totalClasses.forEach(className => {
// //       subjects.forEach(subject => {
// //         for (let i = 0; i < subject.weeklyClasses; i++) {
// //           allocationPlan.push({
// //             className,
// //             subject: subject.name,
// //             teachers: subject.teachers,
// //             priority: subject.teachers.length // Higher priority for subjects with fewer teachers
// //           });
// //         }
// //       });
// //     });

// //     // Sort by priority (subjects with fewer teachers get scheduled first)
// //     allocationPlan.sort((a, b) => a.priority - b.priority);

// //     // Implement advanced backtracking with multiple attempts
// //     let attempt = 0;
// //     const maxAttempts = 100; // Increased from 20 to 100
// //     let success = false;
// //     let bestAllocation = null;
// //     let bestScore = -Infinity;

// //     while (attempt < maxAttempts && !success) {
// //       attempt++;
// //       console.log(`\n=== Attempt ${attempt} ===`);
      
// //       // Create deep copies of all data structures for this attempt
// //       const attemptTimetable = deepClone(timetable);
// //       const attemptRoomAssignments = deepClone(roomAssignments);
// //       const attemptTeacherWorkload = deepClone(teacherWorkload);
// //       const attemptTeacherAvailability = deepClone(teacherAvailability);
// //       const attemptSubjectAllocationCount = deepClone(subjectAllocationCount);
// //       const attemptTeacherSubjectAllocation = deepClone(teacherSubjectAllocation);

// //       // Shuffle allocation plan for this attempt with more randomness
// //       for (let i = allocationPlan.length - 1; i > 0; i--) {
// //         const j = Math.floor(Math.random() * (i + 1));
// //         [allocationPlan[i], allocationPlan[j]] = [allocationPlan[j], allocationPlan[i]];
// //       }

// //       let attemptSuccess = true;
// //       let allocationScore = 0;

// //       // Try to allocate each subject-class combination with improved logic
// //       for (const allocation of allocationPlan) {
// //         const { className, subject, teachers } = allocation;
        
// //         if (attemptSubjectAllocationCount[className][subject] >= 
// //             subjects.find(s => s.name === subject).weeklyClasses) {
// //           continue;
// //         }

// //         let allocated = false;
// //         const maxDaysAttempts = 15; // Increased from 10
// //         let daysAttempted = 0;

// //         // Try different days with more sophisticated prioritization
// //         const dayPriority = workingDays.map(day => ({
// //           day,
// //           score: Math.random() * 100 + 
// //                  (attemptTimetable[className][day].classes.length < totalClassesPerDay ? 50 : 0)
// //         })).sort((a, b) => b.score - a.score).map(item => item.day);
        
// //         for (const day of dayPriority) {
// //           if (allocated || daysAttempted >= maxDaysAttempts) break;
// //           daysAttempted++;

// //           // Strict check: No same subject on same day for same class
// //           const alreadyOnThisDay = attemptTimetable[className][day].classes.some(
// //             cls => cls.subject === subject
// //           );
          
// //           if (alreadyOnThisDay) continue;

// //           // Try time slots with prioritization
// //           const timePriority = classTimes.map(time => ({
// //             time,
// //             score: Math.random() * 100 +
// //                    (attemptTimetable[className][day].classes.some(cls => cls.time === time) ? -100 : 0)
// //           })).sort((a, b) => b.score - a.score).map(item => item.time);
          
// //           for (const timeSlot of timePriority) {
// //             if (allocated) break;

// //             // Check if class already has a class at this time
// //             const hasClassAtThisTime = attemptTimetable[className][day].classes.some(
// //               cls => cls.time === timeSlot
// //             );
            
// //             if (hasClassAtThisTime) continue;

// //             // Find available teacher with load balancing
// //             const availableTeachers = teachers.filter(teacher => 
// //               !attemptTeacherAvailability[teacher][day].has(timeSlot)
// //             );

// //             if (availableTeachers.length === 0) continue;

// //             // Find available room
// //             const availableRooms = rooms.filter(room => 
// //               !attemptRoomAssignments[day][timeSlot].has(room)
// //             );

// //             if (availableRooms.length === 0) continue;

// //             // Select teacher with sophisticated criteria
// //             const teacher = availableTeachers.sort((a, b) => {
// //               const workloadDiff = attemptTeacherWorkload[a] - attemptTeacherWorkload[b];
// //               const subjectAllocDiff = attemptTeacherSubjectAllocation[a][subject] - 
// //                                       attemptTeacherSubjectAllocation[b][subject];
// //               return workloadDiff * 2 + subjectAllocDiff;
// //             })[0];

// //             const room = availableRooms[Math.floor(Math.random() * availableRooms.length)];

// //             // Make the allocation
// //             attemptTeacherWorkload[teacher]++;
// //             attemptTeacherAvailability[teacher][day].add(timeSlot);
// //             attemptTeacherSubjectAllocation[teacher][subject]++;
// //             attemptRoomAssignments[day][timeSlot].add(room);
// //             attemptSubjectAllocationCount[className][subject]++;

// //             const slot = {
// //               type: "CLASS",
// //               subject,
// //               className,
// //               room,
// //               time: timeSlot,
// //               teacher
// //             };

// //             attemptTimetable[className][day].classes.push(slot);
// //             allocated = true;
// //             allocationScore += 10; // Score for successful allocation

// //             break;
// //           }
// //         }

// //         if (!allocated) {
// //           console.warn(`Failed to allocate ${subject} for ${className}`);
// //           attemptSuccess = false;
// //           allocationScore -= 50; // Penalty for failed allocation
// //           break;
// //         }
// //       }

// //       // Validate the attempt
// //       if (attemptSuccess) {
// //         let valid = true;
// //         totalClasses.forEach(className => {
// //           subjects.forEach(subject => {
// //             const allocated = attemptSubjectAllocationCount[className][subject.name] || 0;
// //             const required = subject.weeklyClasses;
            
// //             if (allocated !== required) {
// //               console.error(`❌ ${className}: ${subject.name} - Required ${required}, Got ${allocated}`);
// //               valid = false;
// //               allocationScore -= 100; // Heavy penalty for incorrect allocation
// //             } else {
// //               allocationScore += 20; // Bonus for correct allocation
// //             }
// //           });
// //         });
        
// //         if (valid) {
// //           console.log(`✅ Perfect timetable generated on attempt ${attempt}`);
// //           success = true;
          
// //           // Update global structures
// //           Object.assign(timetable, attemptTimetable);
// //           Object.assign(roomAssignments, attemptRoomAssignments);
// //           Object.assign(teacherWorkload, attemptTeacherWorkload);
// //           Object.assign(teacherAvailability, attemptTeacherAvailability);
// //           Object.assign(subjectAllocationCount, attemptSubjectAllocationCount);
// //           Object.assign(teacherSubjectAllocation, attemptTeacherSubjectAllocation);
// //         } else if (allocationScore > bestScore) {
// //           // Store best attempt so far
// //           bestScore = allocationScore;
// //           bestAllocation = {
// //             timetable: deepClone(attemptTimetable),
// //             roomAssignments: deepClone(attemptRoomAssignments),
// //             teacherWorkload: deepClone(attemptTeacherWorkload),
// //             teacherAvailability: deepClone(attemptTeacherAvailability),
// //             subjectAllocationCount: deepClone(attemptSubjectAllocationCount),
// //             teacherSubjectAllocation: deepClone(attemptTeacherSubjectAllocation)
// //           };
// //           console.log(`📊 New best score: ${bestScore}`);
// //         }
// //       }
// //     }

// //     // If no perfect solution, use the best attempt
// //     if (!success && bestAllocation) {
// //       console.log(`Using best attempt with score: ${bestScore}`);
// //       Object.assign(timetable, bestAllocation.timetable);
// //       Object.assign(roomAssignments, bestAllocation.roomAssignments);
// //       Object.assign(teacherWorkload, bestAllocation.teacherWorkload);
// //       Object.assign(teacherAvailability, bestAllocation.teacherAvailability);
// //       Object.assign(subjectAllocationCount, bestAllocation.subjectAllocationCount);
// //       Object.assign(teacherSubjectAllocation, bestAllocation.teacherSubjectAllocation);
// //       success = true;
// //     }

// //     if (!success) {
// //       throw new Error(`Failed to generate valid timetable after ${maxAttempts} attempts`);
// //     }

// //     // Update teacher timetables
// //     totalClasses.forEach(className => {
// //       workingDays.forEach(day => {
// //         timetable[className][day].classes.forEach(slot => {
// //           teacherTimetables[slot.teacher][day][slot.time] = slot;
// //         });
// //       });
// //     });

// //     // Final validation
// //     const allocationReport = {};
// //     let allSubjectsSatisfied = true;
    
// //     totalClasses.forEach(className => {
// //       allocationReport[className] = {};
      
// //       subjects.forEach(subject => {
// //         const required = subject.weeklyClasses;
// //         const allocated = subjectAllocationCount[className][subject.name] || 0;
        
// //         allocationReport[className][subject.name] = {
// //           required: required,
// //           allocated: allocated,
// //           satisfied: allocated === required
// //         };
        
// //         if (!allocationReport[className][subject.name].satisfied) {
// //           allSubjectsSatisfied = false;
// //           console.error(`❌ Class ${className}: Subject ${subject.name} got ${allocated} out of ${required} required classes`);
// //         }
// //       });
// //     });

// //     if (!allSubjectsSatisfied) {
// //       throw new Error("Timetable generation failed: Not all subjects got their required classes");
// //     }

// //     // Sort classes by time
// //     totalClasses.forEach(className => {
// //       workingDays.forEach(day => {
// //         timetable[className][day].classes.sort((a, b) => {
// //           return classTimes.indexOf(a.time) - classTimes.indexOf(b.time);
// //         });
// //       });
// //     });

// //     // Lab sessions
// //     if (includeLabs && labTimings.length > 0 && batches.length > 0) {
// //       const labLocationUsage = {};
// //       workingDays.forEach(day => {
// //         labLocationUsage[day] = {};
// //         labTimings.forEach(labTime => {
// //           labLocationUsage[day][labTime] = new Set();
// //         });
// //       });

// //       totalClasses.forEach(className => {
// //         workingDays.forEach((day, dayIndex) => {
// //           const labSlots = [];

// //           batches.forEach((batch, batchIndex) => {
// //             const labTimeIndex = (dayIndex + batchIndex) % labTimings.length;
// //             const labTime = labTimings[labTimeIndex];
            
// //             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
// //             const subject = subjects[subjectIndex].name;
// //             const subjectTeachers = subjects[subjectIndex].teachers;

// //             const availableTeachers = subjectTeachers.filter(teacher => 
// //               teacherAvailability[teacher] && 
// //               teacherAvailability[teacher][day] &&
// //               !teacherAvailability[teacher][day].has(labTime)
// //             );
            
// //             if (availableTeachers.length === 0) {
// //               console.warn(`No teachers available for ${subject} lab on ${day} at ${labTime} - skipping`);
// //               return;
// //             }

// //             let labLocation = null;
// //             for (const lab of labLocations) {
// //               if (!labLocationUsage[day][labTime].has(lab)) {
// //                 labLocation = lab;
// //                 break;
// //               }
// //             }
            
// //             if (!labLocation) {
// //               console.warn(`No lab location available for ${subject} on ${day} at ${labTime} - skipping`);
// //               return;
// //             }

// //             const teacher = availableTeachers.sort((a, b) => 
// //               teacherWorkload[a] - teacherWorkload[b]
// //             )[0];

// //             teacherWorkload[teacher]++;
// //             teacherAvailability[teacher][day].add(labTime);
// //             labLocationUsage[day][labTime].add(labLocation);

// //             const labSlot = {
// //               type: "LAB",
// //               subject,
// //               batch,
// //               location: labLocation,
// //               time: labTime,
// //               className,
// //               teacher
// //             };

// //             teacherTimetables[teacher][day][labTime] = labSlot;
// //             labSlots.push(labSlot);
// //           });

// //           if (labSlots.length > 0) {
// //             timetable[className][day].lab = {
// //               type: "Lab",
// //               slots: labSlots,
// //               time: labSlots[0].time
// //             };
// //           }
// //         });
// //       });
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
// //       allocationReport,
// //       metadata: {
// //         generatedAt: new Date(),
// //         version: 1,
// //         stats: {
// //           totalClasses: totalClasses.length,
// //           totalSubjects: subjects.length,
// //           totalTeachers: teacherPool.size,
// //           totalSlots: workingDays.length * classTimes.length * totalClasses.length,
// //           includesLabs: includeLabs,
// //           teachersWithAssignments: Object.keys(formattedTeacherTimetables).length,
// //           allSubjectsSatisfied: allSubjectsSatisfied
// //         }
// //       }
// //     };

// //     const newTimetable = new Timetable(result);
// //     await newTimetable.save();

// //     return res.status(200).json({
// //       success: true,
// //       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
// //       allSubjectsSatisfied,
// //       ...result
// //     });

// //   } catch (error) {
// //     console.error("Generation failed:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: error.message,
// //       debug: {
// //         teacherPool: Array.from(teacherPool),
// //         teacherTimetables: Object.keys(teacherTimetables).map(teacher => ({
// //           teacher,
// //           hasAssignments: workingDays.some(day => 
// //             Object.values(teacherTimetables[teacher][day] || {}).some(slot => slot !== null)
// //           )
// //         }))
// //       }
// //     });
// //   }
// // };

// // export const getResultTimeTableController = async (req, res) => {
// //   try {
// //     const timetables = await Timetable.find().sort({ createdAt: -1 });
// //     res.status(200).json({
// //       success: true,
// //       count: timetables.length,
// //       data: timetables
// //     });
// //   } catch (error) {
// //     res.status(500).json({ 
// //       success: false,
// //       error: "Failed to fetch timetables",
// //       details: error.message
// //     });
// //   }
// // };

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const Timetable = require("../models/timetable.model");
// import { formatTimeSlot, transformTeacherTimetables } from "../helpers/timetable.helpers.js";

// // Helper function to properly clone objects with Sets
// function deepClone(obj) {
//   const cloned = JSON.parse(JSON.stringify(obj));
  
//   // Reconstruct Sets from arrays
//   if (cloned.teacherAvailability) {
//     Object.keys(cloned.teacherAvailability).forEach(teacher => {
//       Object.keys(cloned.teacherAvailability[teacher]).forEach(day => {
//         cloned.teacherAvailability[teacher][day] = new Set(cloned.teacherAvailability[teacher][day]);
//       });
//     });
//   }
  
//   if (cloned.roomAssignments) {
//     Object.keys(cloned.roomAssignments).forEach(day => {
//       Object.keys(cloned.roomAssignments[day]).forEach(time => {
//         cloned.roomAssignments[day][time] = new Set(cloned.roomAssignments[day][time]);
//       });
//     });
//   }
  
//   return cloned;
// }

// // Helper function to initialize Sets properly
// function initializeSets(obj) {
//   if (obj.teacherAvailability) {
//     Object.keys(obj.teacherAvailability).forEach(teacher => {
//       Object.keys(obj.teacherAvailability[teacher]).forEach(day => {
//         if (!(obj.teacherAvailability[teacher][day] instanceof Set)) {
//           obj.teacherAvailability[teacher][day] = new Set(obj.teacherAvailability[teacher][day] || []);
//         }
//       });
//     });
//   }
  
//   if (obj.roomAssignments) {
//     Object.keys(obj.roomAssignments).forEach(day => {
//       Object.keys(obj.roomAssignments[day]).forEach(time => {
//         if (!(obj.roomAssignments[day][time] instanceof Set)) {
//           obj.roomAssignments[day][time] = new Set(obj.roomAssignments[day][time] || []);
//         }
//       });
//     });
//   }
  
//   return obj;
// }

// export const generateTimeTableController = async (req, res) => {
//   let teacherPool = new Set();
//   let teacherTimetables = {};

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

//     const errors = [];
//     if (!collegeName) errors.push("College name is required");
//     if (!branchName) errors.push("Branch name is required");
//     if (!workingDays?.length) errors.push("Working days are required");
//     if (!classTimes?.length) errors.push("Class times are required");
//     if (!totalClasses?.length) errors.push("Total classes are required");
//     if (!subjects?.length) errors.push("Subjects are required");
//     if (!rooms?.length) errors.push("Rooms are required");
//     if (!totalClassesPerDay) errors.push("Total classes per day is required");

//     subjects.forEach(subject => {
//       if (!subject.teachers?.length) {
//         errors.push(`Subject "${subject.name}" has no teachers assigned`);
//       } else {
//         subject.teachers.forEach(teacher => teacherPool.add(teacher));
//       }
      
//       if (!subject.weeklyClasses || subject.weeklyClasses <= 0) {
//         errors.push(`Subject "${subject.name}" must have a positive number of weekly classes`);
//       }
//     });

//     const totalRequiredClasses = subjects.reduce((sum, subject) => 
//       sum + (subject.weeklyClasses * totalClasses.length), 0);
//     const totalAvailableSlots = workingDays.length * totalClassesPerDay * totalClasses.length;
    
//     if (totalRequiredClasses > totalAvailableSlots) {
//       errors.push(`Not enough slots available. Required: ${totalRequiredClasses}, Available: ${totalAvailableSlots}`);
//     }

//     if (errors.length > 0) {
//       console.error("Validation errors:", errors);
//       throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
//     }

//     console.log(`Initializing timetable for ${teacherPool.size} teachers`);

//     // Initialize all data structures
//     const timetable = {};
//     const roomAssignments = {};
//     const teacherWorkload = {};
//     const teacherAvailability = {};
//     const subjectAllocationCount = {};
//     const teacherSubjectAllocation = {};

//     // Initialize subject allocation counters for each class
//     totalClasses.forEach(className => {
//       subjectAllocationCount[className] = {};
//       subjects.forEach(subject => {
//         subjectAllocationCount[className][subject.name] = 0;
//       });
//     });

//     Array.from(teacherPool).forEach(teacher => {
//       teacherTimetables[teacher] = {};
//       teacherWorkload[teacher] = 0;
//       teacherAvailability[teacher] = {};
//       teacherSubjectAllocation[teacher] = {};
      
//       workingDays.forEach(day => {
//         teacherTimetables[teacher][day] = {};
//         teacherAvailability[teacher][day] = new Set();
        
//         [...classTimes, ...labTimings].forEach(time => {
//           teacherTimetables[teacher][day][time] = null;
//         });
//       });
//     });

//     subjects.forEach(subject => {
//       subject.teachers.forEach(teacher => {
//         teacherSubjectAllocation[teacher][subject.name] = 0;
//       });
//     });

//     workingDays.forEach(day => {
//       roomAssignments[day] = {};
//       [...classTimes, ...labTimings].forEach(time => {
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

//     // Create allocation plan with priority for subjects with fewer teachers
//     const allocationPlan = [];
//     totalClasses.forEach(className => {
//       subjects.forEach(subject => {
//         for (let i = 0; i < subject.weeklyClasses; i++) {
//           allocationPlan.push({
//             className,
//             subject: subject.name,
//             teachers: subject.teachers,
//             priority: subject.teachers.length
//           });
//         }
//       });
//     });

//     // Sort by priority (subjects with fewer teachers get scheduled first)
//     allocationPlan.sort((a, b) => a.priority - b.priority);

//     // Store original workingDays reference
//     const workingDaysRef = workingDays;
//     const classTimesRef = classTimes;

//     // Implement advanced backtracking with multiple attempts
//     let attempt = 0;
//     const maxAttempts = 50;
//     let success = false;
//     let bestAllocation = null;
//     let bestScore = -Infinity;

//     while (attempt < maxAttempts && !success) {
//       attempt++;
//       console.log(`\n=== Attempt ${attempt} ===`);
      
//       // Create deep copies of all data structures for this attempt
//       const attemptTimetable = deepClone(timetable);
//       const attemptRoomAssignments = deepClone(roomAssignments);
//       const attemptTeacherWorkload = deepClone(teacherWorkload);
//       const attemptTeacherAvailability = deepClone(teacherAvailability);
//       const attemptSubjectAllocationCount = deepClone(subjectAllocationCount);
//       const attemptTeacherSubjectAllocation = deepClone(teacherSubjectAllocation);

//       // Ensure Sets are properly initialized
//       initializeSets(attemptTeacherAvailability);
//       initializeSets(attemptRoomAssignments);

//       // Shuffle allocation plan for this attempt
//       for (let i = allocationPlan.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [allocationPlan[i], allocationPlan[j]] = [allocationPlan[j], allocationPlan[i]];
//       }

//       let attemptSuccess = true;
//       let allocationScore = 0;

//       // Try to allocate each subject-class combination
//       for (const allocation of allocationPlan) {
//         const { className, subject, teachers } = allocation;
        
//         if (attemptSubjectAllocationCount[className][subject] >= 
//             subjects.find(s => s.name === subject).weeklyClasses) {
//           continue;
//         }

//         let allocated = false;
//         const maxDaysAttempts = 10;

//         // Try different days
//         const shuffledDays = [...workingDaysRef].sort(() => Math.random() - 0.5);
        
//         for (const day of shuffledDays) {
//           if (allocated) break;

//           // Check if this subject is already allocated on this day for this class
//           const alreadyOnThisDay = attemptTimetable[className][day].classes.some(
//             cls => cls.subject === subject
//           );
          
//           if (alreadyOnThisDay) continue;

//           // Try all time slots for this day
//           const shuffledTimeSlots = [...classTimesRef].sort(() => Math.random() - 0.5);
          
//           for (const timeSlot of shuffledTimeSlots) {
//             if (allocated) break;

//             // Check if this class already has a class at this time
//             const hasClassAtThisTime = attemptTimetable[className][day].classes.some(
//               cls => cls.time === timeSlot
//             );
            
//             if (hasClassAtThisTime) continue;

//             // Find available teacher
//             const availableTeachers = teachers.filter(teacher => 
//               attemptTeacherAvailability[teacher] && 
//               attemptTeacherAvailability[teacher][day] &&
//               !attemptTeacherAvailability[teacher][day].has(timeSlot)
//             );

//             if (availableTeachers.length === 0) continue;

//             // Find available room
//             const availableRooms = rooms.filter(room => 
//               attemptRoomAssignments[day] &&
//               attemptRoomAssignments[day][timeSlot] &&
//               !attemptRoomAssignments[day][timeSlot].has(room)
//             );

//             if (availableRooms.length === 0) continue;

//             // Select teacher with least workload
//             const teacher = availableTeachers.sort((a, b) => 
//               attemptTeacherWorkload[a] - attemptTeacherWorkload[b]
//             )[0];

//             const room = availableRooms[0];

//             // Make the allocation
//             attemptTeacherWorkload[teacher]++;
//             attemptTeacherAvailability[teacher][day].add(timeSlot);
//             attemptTeacherSubjectAllocation[teacher][subject]++;
//             attemptRoomAssignments[day][timeSlot].add(room);
//             attemptSubjectAllocationCount[className][subject]++;

//             const slot = {
//               type: "CLASS",
//               subject,
//               className,
//               room,
//               time: timeSlot,
//               teacher
//             };

//             attemptTimetable[className][day].classes.push(slot);
//             allocated = true;
//             allocationScore += 10;

//             break;
//           }
//         }

//         if (!allocated) {
//           console.warn(`Failed to allocate ${subject} for ${className}`);
//           attemptSuccess = false;
//           allocationScore -= 50;
//           break;
//         }
//       }

//       // Validate the attempt
//       if (attemptSuccess) {
//         let valid = true;
//         totalClasses.forEach(className => {
//           subjects.forEach(subject => {
//             const allocated = attemptSubjectAllocationCount[className][subject.name] || 0;
//             const required = subject.weeklyClasses;
            
//             if (allocated !== required) {
//               console.error(`❌ ${className}: ${subject.name} - Required ${required}, Got ${allocated}`);
//               valid = false;
//               allocationScore -= 100;
//             } else {
//               allocationScore += 20;
//             }
//           });
//         });
        
//         if (valid) {
//           console.log(`✅ Perfect timetable generated on attempt ${attempt}`);
//           success = true;
          
//           // Update global structures
//           Object.assign(timetable, attemptTimetable);
//           Object.assign(roomAssignments, attemptRoomAssignments);
//           Object.assign(teacherWorkload, attemptTeacherWorkload);
//           Object.assign(teacherAvailability, attemptTeacherAvailability);
//           Object.assign(subjectAllocationCount, attemptSubjectAllocationCount);
//           Object.assign(teacherSubjectAllocation, attemptTeacherSubjectAllocation);
//         } else if (allocationScore > bestScore) {
//           bestScore = allocationScore;
//           bestAllocation = {
//             timetable: deepClone(attemptTimetable),
//             roomAssignments: deepClone(attemptRoomAssignments),
//             teacherWorkload: deepClone(attemptTeacherWorkload),
//             teacherAvailability: deepClone(attemptTeacherAvailability),
//             subjectAllocationCount: deepClone(attemptSubjectAllocationCount),
//             teacherSubjectAllocation: deepClone(attemptTeacherSubjectAllocation)
//           };
//         }
//       }
//     }

//     // If no perfect solution, use the best attempt
//     if (!success && bestAllocation) {
//       console.log(`Using best attempt with score: ${bestScore}`);
//       Object.assign(timetable, bestAllocation.timetable);
//       Object.assign(roomAssignments, bestAllocation.roomAssignments);
//       Object.assign(teacherWorkload, bestAllocation.teacherWorkload);
//       Object.assign(teacherAvailability, bestAllocation.teacherAvailability);
//       Object.assign(subjectAllocationCount, bestAllocation.subjectAllocationCount);
//       Object.assign(teacherSubjectAllocation, bestAllocation.teacherSubjectAllocation);
//       success = true;
//     }

//     if (!success) {
//       throw new Error(`Failed to generate valid timetable after ${maxAttempts} attempts`);
//     }

//     // Update teacher timetables
//     totalClasses.forEach(className => {
//       workingDaysRef.forEach(day => {
//         timetable[className][day].classes.forEach(slot => {
//           if (teacherTimetables[slot.teacher] && teacherTimetables[slot.teacher][day]) {
//             teacherTimetables[slot.teacher][day][slot.time] = slot;
//           }
//         });
//       });
//     });

//     // Final validation
//     const allocationReport = {};
//     let allSubjectsSatisfied = true;
    
//     totalClasses.forEach(className => {
//       allocationReport[className] = {};
      
//       subjects.forEach(subject => {
//         const required = subject.weeklyClasses;
//         const allocated = subjectAllocationCount[className][subject.name] || 0;
        
//         allocationReport[className][subject.name] = {
//           required: required,
//           allocated: allocated,
//           satisfied: allocated === required
//         };
        
//         if (!allocationReport[className][subject.name].satisfied) {
//           allSubjectsSatisfied = false;
//           console.error(`❌ Class ${className}: Subject ${subject.name} got ${allocated} out of ${required} required classes`);
//         }
//       });
//     });

//     if (!allSubjectsSatisfied) {
//       throw new Error("Timetable generation failed: Not all subjects got their required classes");
//     }

//     // Sort classes by time
//     totalClasses.forEach(className => {
//       workingDaysRef.forEach(day => {
//         timetable[className][day].classes.sort((a, b) => {
//           return classTimesRef.indexOf(a.time) - classTimesRef.indexOf(b.time);
//         });
//       });
//     });

//     // Lab sessions
//     if (includeLabs && labTimings.length > 0 && batches.length > 0) {
//       const labLocationUsage = {};
//       workingDaysRef.forEach(day => {
//         labLocationUsage[day] = {};
//         labTimings.forEach(labTime => {
//           labLocationUsage[day][labTime] = new Set();
//         });
//       });

//       totalClasses.forEach(className => {
//         workingDaysRef.forEach((day, dayIndex) => {
//           const labSlots = [];

//           batches.forEach((batch, batchIndex) => {
//             const labTimeIndex = (dayIndex + batchIndex) % labTimings.length;
//             const labTime = labTimings[labTimeIndex];
            
//             const subjectIndex = (dayIndex + batchIndex) % subjects.length;
//             const subject = subjects[subjectIndex].name;
//             const subjectTeachers = subjects[subjectIndex].teachers;

//             const availableTeachers = subjectTeachers.filter(teacher => 
//               teacherAvailability[teacher] && 
//               teacherAvailability[teacher][day] &&
//               !teacherAvailability[teacher][day].has(labTime)
//             );
            
//             if (availableTeachers.length === 0) {
//               console.warn(`No teachers available for ${subject} lab on ${day} at ${labTime} - skipping`);
//               return;
//             }

//             let labLocation = null;
//             for (const lab of labLocations) {
//               if (!labLocationUsage[day][labTime].has(lab)) {
//                 labLocation = lab;
//                 break;
//               }
//             }
            
//             if (!labLocation) {
//               console.warn(`No lab location available for ${subject} on ${day} at ${labTime} - skipping`);
//               return;
//             }

//             const teacher = availableTeachers.sort((a, b) => 
//               teacherWorkload[a] - teacherWorkload[b]
//             )[0];

//             teacherWorkload[teacher]++;
//             teacherAvailability[teacher][day].add(labTime);
//             labLocationUsage[day][labTime].add(labLocation);

//             const labSlot = {
//               type: "LAB",
//               subject,
//               batch,
//               location: labLocation,
//               time: labTime,
//               className,
//               teacher
//             };

//             teacherTimetables[teacher][day][labTime] = labSlot;
//             labSlots.push(labSlot);
//           });

//           if (labSlots.length > 0) {
//             timetable[className][day].lab = {
//               type: "Lab",
//               slots: labSlots,
//               time: labSlots[0].time
//             };
//           }
//         });
//       });
//     }

//     const formattedTeacherTimetables = transformTeacherTimetables(
//       teacherTimetables,
//       workingDaysRef,
//       classTimesRef,
//       includeLabs ? labTimings : []
//     );

//     const result = {
//       collegeName,
//       branchName,
//       workingDays: workingDaysRef,
//       classTimes: classTimesRef,
//       labTimings: includeLabs ? labTimings : [],
//       timetable,
//       teacherTimetables: formattedTeacherTimetables,
//       allocationReport,
//       metadata: {
//         generatedAt: new Date(),
//         version: 1,
//         stats: {
//           totalClasses: totalClasses.length,
//           totalSubjects: subjects.length,
//           totalTeachers: teacherPool.size,
//           totalSlots: workingDaysRef.length * classTimesRef.length * totalClasses.length,
//           includesLabs: includeLabs,
//           teachersWithAssignments: Object.keys(formattedTeacherTimetables).length,
//           allSubjectsSatisfied: allSubjectsSatisfied
//         }
//       }
//     };

//     const newTimetable = new Timetable(result);
//     await newTimetable.save();

//     return res.status(200).json({
//       success: true,
//       message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
//       allSubjectsSatisfied,
//       ...result
//     });

//   } catch (error) {
//     console.error("Generation failed:", error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//       debug: {
//         teacherPool: Array.from(teacherPool),
//         teacherTimetables: Object.keys(teacherTimetables).map(teacher => ({
//           teacher,
//           hasAssignments: workingDays.some(day => 
//             Object.values(teacherTimetables[teacher][day] || {}).some(slot => slot !== null)
//           )
//         }))
//       }
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
import { formatTimeSlot, transformTeacherTimetables } from "../helpers/timetable.helpers.js";

// Simple deep clone without Set reconstruction
function simpleDeepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Initialize fresh data structures for each attempt
function initializeFreshDataStructures(workingDays, classTimes, totalClasses, subjects, teachers, labTimings) {
  const timetable = {};
  const roomAssignments = {};
  const teacherWorkload = {};
  const teacherAvailability = {};
  const subjectAllocationCount = {};
  const teacherSubjectAllocation = {};

  // Initialize subject allocation counters for each class
  totalClasses.forEach(className => {
    subjectAllocationCount[className] = {};
    subjects.forEach(subject => {
      subjectAllocationCount[className][subject.name] = 0;
    });
  });

  // Initialize teacher data
  teachers.forEach(teacher => {
    teacherWorkload[teacher] = 0;
    teacherAvailability[teacher] = {};
    teacherSubjectAllocation[teacher] = {};
    
    workingDays.forEach(day => {
      teacherAvailability[teacher][day] = new Set();
    });

    subjects.forEach(subject => {
      teacherSubjectAllocation[teacher][subject.name] = 0;
    });
  });

  // Initialize room assignments
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

  return {
    timetable,
    roomAssignments,
    teacherWorkload,
    teacherAvailability,
    subjectAllocationCount,
    teacherSubjectAllocation
  };
}

export const generateTimeTableController = async (req, res) => {
  let teacherPool = new Set();
  let finalTeacherTimetables = {};

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

    const errors = [];
    if (!collegeName) errors.push("College name is required");
    if (!branchName) errors.push("Branch name is required");
    if (!workingDays?.length) errors.push("Working days are required");
    if (!classTimes?.length) errors.push("Class times are required");
    if (!totalClasses?.length) errors.push("Total classes are required");
    if (!subjects?.length) errors.push("Subjects are required");
    if (!rooms?.length) errors.push("Rooms are required");
    if (!totalClassesPerDay) errors.push("Total classes per day is required");

    subjects.forEach(subject => {
      if (!subject.teachers?.length) {
        errors.push(`Subject "${subject.name}" has no teachers assigned`);
      } else {
        subject.teachers.forEach(teacher => teacherPool.add(teacher));
      }
      
      if (!subject.weeklyClasses || subject.weeklyClasses <= 0) {
        errors.push(`Subject "${subject.name}" must have a positive number of weekly classes`);
      }
    });

    const totalRequiredClasses = subjects.reduce((sum, subject) => 
      sum + (subject.weeklyClasses * totalClasses.length), 0);
    const totalAvailableSlots = workingDays.length * totalClassesPerDay * totalClasses.length;
    
    if (totalRequiredClasses > totalAvailableSlots) {
      errors.push(`Not enough slots available. Required: ${totalRequiredClasses}, Available: ${totalAvailableSlots}`);
    }

    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
    }

    console.log(`Initializing timetable for ${teacherPool.size} teachers`);

    const teachers = Array.from(teacherPool);

    // Create allocation plan
    const allocationPlan = [];
    totalClasses.forEach(className => {
      subjects.forEach(subject => {
        for (let i = 0; i < subject.weeklyClasses; i++) {
          allocationPlan.push({
            className,
            subject: subject.name,
            teachers: subject.teachers,
            priority: subject.teachers.length
          });
        }
      });
    });

    // Sort by priority
    allocationPlan.sort((a, b) => a.priority - b.priority);

    let attempt = 0;
    const maxAttempts = 50;
    let success = false;
    let bestSolution = null;
    let bestScore = -Infinity;

    while (attempt < maxAttempts && !success) {
      attempt++;
      console.log(`\n=== Attempt ${attempt} ===`);
      
      // Initialize fresh data structures for this attempt
      const {
        timetable,
        roomAssignments,
        teacherWorkload,
        teacherAvailability,
        subjectAllocationCount,
        teacherSubjectAllocation
      } = initializeFreshDataStructures(workingDays, classTimes, totalClasses, subjects, teachers, labTimings);

      let attemptSuccess = true;
      let allocationScore = 0;

      // Shuffle allocation plan for this attempt
      const shuffledPlan = [...allocationPlan].sort(() => Math.random() - 0.5);

      for (const allocation of shuffledPlan) {
        const { className, subject, teachers: subjectTeachers } = allocation;
        
        if (subjectAllocationCount[className][subject] >= 
            subjects.find(s => s.name === subject).weeklyClasses) {
          continue;
        }

        let allocated = false;

        // Try different days
        const shuffledDays = [...workingDays].sort(() => Math.random() - 0.5);
        
        for (const day of shuffledDays) {
          if (allocated) break;

          // Check if subject already on this day
          const alreadyOnThisDay = timetable[className][day].classes.some(
            cls => cls.subject === subject
          );
          
          if (alreadyOnThisDay) continue;

          // Try time slots
          const shuffledTimeSlots = [...classTimes].sort(() => Math.random() - 0.5);
          
          for (const timeSlot of shuffledTimeSlots) {
            if (allocated) break;

            // Check if class already has a class at this time
            const hasClassAtThisTime = timetable[className][day].classes.some(
              cls => cls.time === timeSlot
            );
            
            if (hasClassAtThisTime) continue;

            // Find available teacher
            const availableTeachers = subjectTeachers.filter(teacher => 
              !teacherAvailability[teacher][day].has(timeSlot)
            );

            if (availableTeachers.length === 0) continue;

            // Find available room
            const availableRooms = rooms.filter(room => 
              !roomAssignments[day][timeSlot].has(room)
            );

            if (availableRooms.length === 0) continue;

            // Select teacher with least workload
            const teacher = availableTeachers.sort((a, b) => 
              teacherWorkload[a] - teacherWorkload[b]
            )[0];

            const room = availableRooms[0];

            // Make the allocation
            teacherWorkload[teacher]++;
            teacherAvailability[teacher][day].add(timeSlot);
            teacherSubjectAllocation[teacher][subject]++;
            roomAssignments[day][timeSlot].add(room);
            subjectAllocationCount[className][subject]++;

            const slot = {
              type: "CLASS",
              subject,
              className,
              room,
              time: timeSlot,
              teacher
            };

            timetable[className][day].classes.push(slot);
            allocated = true;
            allocationScore += 10;

            break;
          }
        }

        if (!allocated) {
          attemptSuccess = false;
          allocationScore -= 50;
          break;
        }
      }

      // Validate the attempt
      if (attemptSuccess) {
        let valid = true;
        totalClasses.forEach(className => {
          subjects.forEach(subject => {
            const allocated = subjectAllocationCount[className][subject.name] || 0;
            const required = subject.weeklyClasses;
            
            if (allocated !== required) {
              valid = false;
              allocationScore -= 100;
            } else {
              allocationScore += 20;
            }
          });
        });
        
        if (valid) {
          console.log(`✅ Perfect timetable generated on attempt ${attempt}`);
          success = true;
          bestSolution = {
            timetable,
            teacherWorkload,
            teacherAvailability,
            subjectAllocationCount
          };
        } else if (allocationScore > bestScore) {
          bestScore = allocationScore;
          bestSolution = {
            timetable: simpleDeepClone(timetable),
            teacherWorkload: simpleDeepClone(teacherWorkload),
            teacherAvailability: simpleDeepClone(teacherAvailability),
            subjectAllocationCount: simpleDeepClone(subjectAllocationCount)
          };
        }
      }
    }

    if (!success && bestSolution) {
      console.log(`Using best attempt with score: ${bestScore}`);
      success = true;
    }

    if (!success) {
      throw new Error(`Failed to generate valid timetable after ${maxAttempts} attempts`);
    }

    // Build final teacher timetables
    teachers.forEach(teacher => {
      finalTeacherTimetables[teacher] = {};
      workingDays.forEach(day => {
        finalTeacherTimetables[teacher][day] = {};
        classTimes.forEach(time => {
          finalTeacherTimetables[teacher][day][time] = null;
        });
      });
    });

    totalClasses.forEach(className => {
      workingDays.forEach(day => {
        bestSolution.timetable[className][day].classes.forEach(slot => {
          if (finalTeacherTimetables[slot.teacher] && finalTeacherTimetables[slot.teacher][day]) {
            finalTeacherTimetables[slot.teacher][day][slot.time] = slot;
          }
        });
        
        // Sort classes by time
        bestSolution.timetable[className][day].classes.sort((a, b) => {
          return classTimes.indexOf(a.time) - classTimes.indexOf(b.time);
        });
      });
    });

    // Final validation
    const allocationReport = {};
    let allSubjectsSatisfied = true;
    
    totalClasses.forEach(className => {
      allocationReport[className] = {};
      
      subjects.forEach(subject => {
        const required = subject.weeklyClasses;
        const allocated = bestSolution.subjectAllocationCount[className][subject.name] || 0;
        
        allocationReport[className][subject.name] = {
          required: required,
          allocated: allocated,
          satisfied: allocated === required
        };
        
        if (!allocationReport[className][subject.name].satisfied) {
          allSubjectsSatisfied = false;
          console.error(`❌ Class ${className}: Subject ${subject.name} got ${allocated} out of ${required} required classes`);
        }
      });
    });

    if (!allSubjectsSatisfied) {
      throw new Error("Timetable generation failed: Not all subjects got their required classes");
    }

    // Lab sessions (simplified)
    if (includeLabs && labTimings.length > 0 && batches.length > 0) {
      const labLocationUsage = {};
      workingDays.forEach(day => {
        labLocationUsage[day] = {};
        labTimings.forEach(labTime => {
          labLocationUsage[day][labTime] = new Set();
        });
      });

      totalClasses.forEach(className => {
        workingDays.forEach((day, dayIndex) => {
          const labSlots = [];

          batches.forEach((batch, batchIndex) => {
            const labTimeIndex = (dayIndex + batchIndex) % labTimings.length;
            const labTime = labTimings[labTimeIndex];
            
            const subjectIndex = (dayIndex + batchIndex) % subjects.length;
            const subject = subjects[subjectIndex].name;
            const subjectTeachers = subjects[subjectIndex].teachers;

            const availableTeachers = subjectTeachers.filter(teacher => 
              !bestSolution.teacherAvailability[teacher][day].has(labTime)
            );
            
            if (availableTeachers.length === 0) return;

            let labLocation = null;
            for (const lab of labLocations) {
              if (!labLocationUsage[day][labTime].has(lab)) {
                labLocation = lab;
                break;
              }
            }
            
            if (!labLocation) return;

            const teacher = availableTeachers[0];
            bestSolution.teacherWorkload[teacher]++;
            bestSolution.teacherAvailability[teacher][day].add(labTime);
            labLocationUsage[day][labTime].add(labLocation);

            const labSlot = {
              type: "LAB",
              subject,
              batch,
              location: labLocation,
              time: labTime,
              className,
              teacher
            };

            finalTeacherTimetables[teacher][day][labTime] = labSlot;
            labSlots.push(labSlot);
          });

          if (labSlots.length > 0) {
            bestSolution.timetable[className][day].lab = {
              type: "Lab",
              slots: labSlots,
              time: labSlots[0].time
            };
          }
        });
      });
    }

    const formattedTeacherTimetables = transformTeacherTimetables(
      finalTeacherTimetables,
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
      timetable: bestSolution.timetable,
      teacherTimetables: formattedTeacherTimetables,
      allocationReport,
      metadata: {
        generatedAt: new Date(),
        version: 1,
        stats: {
          totalClasses: totalClasses.length,
          totalSubjects: subjects.length,
          totalTeachers: teacherPool.size,
          totalSlots: workingDays.length * classTimes.length * totalClasses.length,
          includesLabs: includeLabs,
          teachersWithAssignments: Object.keys(formattedTeacherTimetables).length,
          allSubjectsSatisfied: allSubjectsSatisfied
        }
      }
    };

    const newTimetable = new Timetable(result);
    await newTimetable.save();

    return res.status(200).json({
      success: true,
      message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
      allSubjectsSatisfied,
      ...result
    });

  } catch (error) {
    console.error("Generation failed:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      debug: {
        teacherPool: Array.from(teacherPool),
        teacherTimetables: Object.keys(finalTeacherTimetables).map(teacher => ({
          teacher,
          hasAssignments: workingDays.some(day => 
            Object.values(finalTeacherTimetables[teacher][day] || {}).some(slot => slot !== null)
          )
        }))
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