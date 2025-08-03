import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Timetable = require("../models/timetable.model");
import { formatTimeSlot, transformTeacherTimetables } from "../helpers/timetable.helpers.js";

export const generateTimeTableController = async (req, res) => {
  let teacherPool = new Set();
  let teacherTimetables = {};

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
    });

    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
    }

    console.log(`Initializing timetable for ${teacherPool.size} teachers`);

    const timetable = {};
    const roomAssignments = {};
    const teacherWorkload = {};
    const teacherAvailability = {};
    const teacherSubjectMap = {};

    Array.from(teacherPool).forEach(teacher => {
      teacherTimetables[teacher] = {};
      teacherWorkload[teacher] = 0;
      teacherAvailability[teacher] = {};
      teacherSubjectMap[teacher] = new Set();
      
      workingDays.forEach(day => {
        teacherTimetables[teacher][day] = {};
        teacherAvailability[teacher][day] = new Set();
        
        [...classTimes, ...labTimings].forEach(time => {
          teacherTimetables[teacher][day][time] = null;
        });
      });
    });

    subjects.forEach(subject => {
      subject.teachers.forEach(teacher => {
        teacherSubjectMap[teacher].add(subject.name);
      });
    });

    workingDays.forEach(day => {
      roomAssignments[day] = {};
      [...classTimes, ...labTimings].forEach(time => {
        roomAssignments[day][time] = new Set();
      });
    });

    totalClasses.forEach(className => {
      timetable[className] = {};
      workingDays.forEach(day => {
        timetable[className][day] = {
          classes: [],
          lab: null
        };
      });
    });

    totalClasses.forEach(className => {
      const subjectRotation = [];
      const subjectPool = [...subjects];
      
      for (let i = 0; i < workingDays.length; i++) {
        const daySubjects = [];
        const subjectsPerDay = Math.min(
          Math.ceil(subjects.length / workingDays.length),
          totalClassesPerDay
        );
        
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

        for (let i = 0; i < totalClassesPerDay && i < classTimes.length; i++) {
          const timeSlot = classTimes[i];
          let slotAssigned = false;

          for (const subject of shuffledSubjects) {
            if (!usedSubjects.has(subject)) {
              const subjectData = subjects.find(s => s.name === subject);
              if (!subjectData) continue;

              const availableTeachers = subjectData.teachers.filter(teacher => {
                return teacherAvailability[teacher] && 
                       teacherAvailability[teacher][day] &&
                       !teacherAvailability[teacher][day].has(timeSlot);
              });

              if (availableTeachers.length === 0) continue;

              const availableRooms = rooms.filter(room => 
                !roomAssignments[day][timeSlot].has(room)
              );

              if (availableRooms.length === 0) continue;

              const teacher = availableTeachers.sort((a, b) => 
                teacherWorkload[a] - teacherWorkload[b]
              )[0];
              const room = availableRooms[0];

              teacherWorkload[teacher]++;
              teacherAvailability[teacher][day].add(timeSlot);
              roomAssignments[day][timeSlot].add(room);

              const slot = {
                type: "CLASS",
                subject,
                className,
                room,
                time: timeSlot,
                teacher
              };

              teacherTimetables[teacher][day][timeSlot] = slot;
              timetable[className][day].classes.push(slot);
              usedSubjects.add(subject);
              slotAssigned = true;
              break;
            }
          }

          if (!slotAssigned) {
            const fallbackSubject = subjects.find(s => 
              !usedSubjects.has(s.name)
            );
            if (fallbackSubject) {
              const availableTeachers = fallbackSubject.teachers.filter(teacher => 
                teacherAvailability[teacher] && 
                teacherAvailability[teacher][day] &&
                !teacherAvailability[teacher][day].has(timeSlot)
              );
              
              if (availableTeachers.length > 0) {
                const availableRooms = rooms.filter(room => 
                  !roomAssignments[day][timeSlot].has(room)
                );
                
                if (availableRooms.length > 0) {
                  const teacher = availableTeachers.sort((a, b) => 
                    teacherWorkload[a] - teacherWorkload[b]
                  )[0];
                  const room = availableRooms[0];

                  teacherWorkload[teacher]++;
                  teacherAvailability[teacher][day].add(timeSlot);
                  roomAssignments[day][timeSlot].add(room);

                  const slot = {
                    type: "CLASS",
                    subject: fallbackSubject.name,
                    className,
                    room,
                    time: timeSlot,
                    teacher
                  };

                  teacherTimetables[teacher][day][timeSlot] = slot;
                  timetable[className][day].classes.push(slot);
                  usedSubjects.add(fallbackSubject.name);
                }
              }
            }
          }
        }
      });
    });

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
            const labTimeIndex = batchIndex % labTimings.length;
            const labTime = labTimings[labTimeIndex];
            
            const subjectIndex = (dayIndex + batchIndex) % subjects.length;
            const subject = subjects[subjectIndex].name;
            const subjectTeachers = subjects[subjectIndex].teachers;

            const availableTeachers = subjectTeachers.filter(teacher => 
              teacherAvailability[teacher] && 
              teacherAvailability[teacher][day] &&
              !teacherAvailability[teacher][day].has(labTime)
            );
            
            if (availableTeachers.length === 0) {
              console.warn(`No teachers available for ${subject} lab on ${day} at ${labTime} - skipping`);
              return;
            }

            let labLocation = null;
            for (const lab of labLocations) {
              if (!labLocationUsage[day][labTime].has(lab)) {
                labLocation = lab;
                break;
              }
            }
            
            if (!labLocation) {
              console.warn(`No lab location available for ${subject} on ${day} at ${labTime} - skipping`);
              return;
            }

            const teacher = availableTeachers.sort((a, b) => 
              teacherWorkload[a] - teacherWorkload[b]
            )[0];

            teacherWorkload[teacher]++;
            teacherAvailability[teacher][day].add(labTime);
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

            teacherTimetables[teacher][day][labTime] = labSlot;
            labSlots.push(labSlot);
          });

          if (labSlots.length > 0) {
            timetable[className][day].lab = {
              type: "Lab",
              slots: labSlots,
              time: labSlots[0].time
            };
          }
        });
      });
    }

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
          includesLabs: includeLabs,
          teachersWithAssignments: Object.keys(formattedTeacherTimetables).length
        }
      }
    };

    const newTimetable = new Timetable(result);
    await newTimetable.save();

    return res.status(200).json({
      success: true,
      message: `✅ Timetable generated successfully${includeLabs ? " with lab sessions" : ""}`,
      ...result
    });

  } catch (error) {
    console.error("Generation failed:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      debug: {
        teacherPool: Array.from(teacherPool),
        teacherTimetables: Object.keys(teacherTimetables).map(teacher => ({
          teacher,
          hasAssignments: workingDays.some(day => 
            Object.values(teacherTimetables[teacher][day] || {}).some(slot => slot !== null)
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