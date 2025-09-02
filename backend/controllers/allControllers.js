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