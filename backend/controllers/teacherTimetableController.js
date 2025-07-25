const Timetable = require('../models/Timetable'); // Adjust path as needed

// Generate individual teacher timetables from existing timetable
export const generateTeacherTimetableController = async (req, res) => {
  console.log("👨‍🏫 Generating Teacher Timetables:", JSON.stringify(req.body, null, 2));

  try {
    const { timetableId, teacherName } = req.body;

    // ======================
    // 1. VALIDATION PHASE
    // ======================
    const errors = [];
    if (!timetableId) errors.push("Timetable ID is required");

    if (errors.length > 0) {
      throw new Error(`VALIDATION ERRORS:\n${errors.join("\n")}`);
    }

    // ======================
    // 2. FETCH EXISTING TIMETABLE
    // ======================
    const existingTimetable = await Timetable.findById(timetableId);
    if (!existingTimetable) {
      throw new Error("Timetable not found");
    }

    // ======================
    // 3. EXTRACT TEACHER DATA
    // ======================
    const teacherTimetables = {};
    const teacherWorkload = {};
    
    // Initialize teacher timetables structure
    const initializeTeacherTimetable = (teacher) => {
      if (!teacherTimetables[teacher]) {
        teacherTimetables[teacher] = {};
        teacherWorkload[teacher] = {
          totalClasses: 0,
          totalLabs: 0,
          subjectsTeaching: new Set(),
          classesTeaching: new Set()
        };
        
        existingTimetable.workingDays.forEach(day => {
          teacherTimetables[teacher][day] = {
            classes: [],
            labs: [],
            totalHours: 0
          };
        });
      }
    };

    // Process regular classes from main timetable
    if (existingTimetable.timetable) {
      Object.keys(existingTimetable.timetable).forEach(className => {
        const classData = existingTimetable.timetable[className];
        
        Object.keys(classData).forEach(day => {
          const dayData = classData[day];
          
          // Process regular classes
          if (dayData.classes && Array.isArray(dayData.classes)) {
            dayData.classes.forEach(classInfo => {
              if (classInfo.teacher) {
                initializeTeacherTimetable(classInfo.teacher);
                
                teacherTimetables[classInfo.teacher][day].classes.push({
                  time: classInfo.time,
                  subject: classInfo.subject,
                  room: classInfo.room,
                  class: className,
                  type: 'regular'
                });
                
                // Update workload
                teacherWorkload[classInfo.teacher].totalClasses++;
                teacherWorkload[classInfo.teacher].subjectsTeaching.add(classInfo.subject);
                teacherWorkload[classInfo.teacher].classesTeaching.add(className);
                teacherTimetables[classInfo.teacher][day].totalHours++;
              }
            });
          }
          
          // Process lab sessions
          if (dayData.lab && dayData.lab.slots) {
            dayData.lab.slots.forEach(labInfo => {
              if (labInfo.teacher) {
                initializeTeacherTimetable(labInfo.teacher);
                
                teacherTimetables[labInfo.teacher][day].labs.push({
                  time: labInfo.time,
                  subject: labInfo.subject,
                  lab: labInfo.lab,
                  batch: labInfo.batch,
                  class: className,
                  type: 'lab'
                });
                
                // Update workload
                teacherWorkload[labInfo.teacher].totalLabs++;
                teacherWorkload[labInfo.teacher].subjectsTeaching.add(labInfo.subject);
                teacherWorkload[labInfo.teacher].classesTeaching.add(className);
                teacherTimetables[labInfo.teacher][day].totalHours++;
              }
            });
          }
        });
      });
    }

    // ======================
    // 4. GENERATE FORMATTED TEACHER TIMETABLES
    // ======================
    const formattedTeacherTimetables = {};
    
    Object.keys(teacherTimetables).forEach(teacher => {
      formattedTeacherTimetables[teacher] = {
        teacherName: teacher,
        workingDays: existingTimetable.workingDays,
        classTimes: existingTimetable.classTimes,
        labTimings: existingTimetable.labTimings || [],
        schedule: {},
        weeklyStats: {
          totalClasses: teacherWorkload[teacher].totalClasses,
          totalLabs: teacherWorkload[teacher].totalLabs,
          totalHours: teacherWorkload[teacher].totalClasses + teacherWorkload[teacher].totalLabs,
          subjectsTeaching: Array.from(teacherWorkload[teacher].subjectsTeaching),
          classesTeaching: Array.from(teacherWorkload[teacher].classesTeaching)
        }
      };
      
      // Format daily schedule
      existingTimetable.workingDays.forEach(day => {
        const daySchedule = teacherTimetables[teacher][day];
        const allSessions = [
          ...daySchedule.classes.map(c => ({ ...c, sessionType: 'class' })),
          ...daySchedule.labs.map(l => ({ ...l, sessionType: 'lab' }))
        ].sort((a, b) => {
          // Sort by time
          const timeA = existingTimetable.classTimes.indexOf(a.time) !== -1 
            ? existingTimetable.classTimes.indexOf(a.time) 
            : 999;
          const timeB = existingTimetable.classTimes.indexOf(b.time) !== -1 
            ? existingTimetable.classTimes.indexOf(b.time) 
            : 999;
          return timeA - timeB;
        });
        
        formattedTeacherTimetables[teacher].schedule[day] = {
          sessions: allSessions,
          totalSessions: allSessions.length,
          dayStats: {
            classes: daySchedule.classes.length,
            labs: daySchedule.labs.length,
            totalHours: daySchedule.totalHours
          }
        };
      });
    });

    // ======================
    // 5. FILTER BY TEACHER NAME (if provided)
    // ======================
    let result;
    if (teacherName) {
      if (!formattedTeacherTimetables[teacherName]) {
        throw new Error(`Teacher "${teacherName}" not found in the timetable`);
      }
      
      result = {
        collegeName: existingTimetable.collegeName,
        branchName: existingTimetable.branchName,
        teacher: formattedTeacherTimetables[teacherName],
        metadata: {
          generatedAt: new Date(),
          baseTimetableId: timetableId,
          teacherSpecific: true
        }
      };
    } else {
      result = {
        collegeName: existingTimetable.collegeName,
        branchName: existingTimetable.branchName,
        allTeachers: formattedTeacherTimetables,
        teacherSummary: Object.keys(formattedTeacherTimetables).map(teacher => ({
          name: teacher,
          totalClasses: teacherWorkload[teacher].totalClasses,
          totalLabs: teacherWorkload[teacher].totalLabs,
          totalHours: teacherWorkload[teacher].totalClasses + teacherWorkload[teacher].totalLabs,
          subjects: Array.from(teacherWorkload[teacher].subjectsTeaching),
          classes: Array.from(teacherWorkload[teacher].classesTeaching)
        })),
        metadata: {
          generatedAt: new Date(),
          baseTimetableId: timetableId,
          totalTeachers: Object.keys(formattedTeacherTimetables).length
        }
      };
    }

    // ======================
    // 6. UPDATE DATABASE WITH TEACHER TIMETABLES
    // ======================
    existingTimetable.teacherTimetables = new Map(
      Object.entries(formattedTeacherTimetables)
    );
    existingTimetable.metadata.lastUpdated = new Date();
    await existingTimetable.save();

    // ======================
    // 7. RETURN RESPONSE
    // ======================
    return res.status(200).json({
      success: true,
      message: teacherName 
        ? `✅ Teacher timetable generated for ${teacherName}` 
        : `✅ Teacher timetables generated for ${Object.keys(formattedTeacherTimetables).length} teachers`,
      ...result
    });

  } catch (error) {
    console.error("❌ Teacher timetable generation failed:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      suggestion: error.message.includes("not found") 
        ? "Please provide a valid timetable ID or teacher name"
        : "Please check your input parameters and try again"
    });
  }
};

// Get specific teacher's timetable
export const getTeacherTimetableController = async (req, res) => {
  try {
    const { timetableId, teacherName } = req.params;

    if (!timetableId || !teacherName) {
      return res.status(400).json({
        success: false,
        error: "Timetable ID and teacher name are required"
      });
    }

    const timetable = await Timetable.findById(timetableId);
    if (!timetable) {
      return res.status(404).json({
        success: false,
        error: "Timetable not found"
      });
    }

    const teacherTimetable = timetable.teacherTimetables?.get(teacherName);
    if (!teacherTimetable) {
      return res.status(404).json({
        success: false,
        error: `Teacher "${teacherName}" not found in this timetable`
      });
    }

    return res.status(200).json({
      success: true,
      collegeName: timetable.collegeName,
      branchName: timetable.branchName,
      teacher: teacherTimetable,
      metadata: {
        retrievedAt: new Date(),
        baseTimetableId: timetableId
      }
    });

  } catch (error) {
    console.error("❌ Failed to retrieve teacher timetable:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all teachers list from a timetable
export const getAllTeachersController = async (req, res) => {
  try {
    const { timetableId } = req.params;

    if (!timetableId) {
      return res.status(400).json({
        success: false,
        error: "Timetable ID is required"
      });
    }

    const timetable = await Timetable.findById(timetableId);
    if (!timetable) {
      return res.status(404).json({
        success: false,
        error: "Timetable not found"
      });
    }

    const teachersList = [];
    if (timetable.teacherTimetables) {
      for (let [teacherName, teacherData] of timetable.teacherTimetables) {
        teachersList.push({
          name: teacherName,
          weeklyStats: teacherData.weeklyStats || {},
          hasData: true
        });
      }
    }

    // Also extract from subjects if teacher timetables haven't been generated
    if (teachersList.length === 0 && timetable.subjects) {
      const uniqueTeachers = new Set();
      timetable.subjects.forEach(subject => {
        if (subject.teachers) {
          subject.teachers.forEach(teacher => uniqueTeachers.add(teacher));
        }
      });
      
      uniqueTeachers.forEach(teacher => {
        teachersList.push({
          name: teacher,
          hasData: false
        });
      });
    }

    return res.status(200).json({
      success: true,
      collegeName: timetable.collegeName,
      branchName: timetable.branchName,
      teachers: teachersList,
      totalTeachers: teachersList.length,
      metadata: {
        retrievedAt: new Date(),
        baseTimetableId: timetableId
      }
    });

  } catch (error) {
    console.error("❌ Failed to retrieve teachers list:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};