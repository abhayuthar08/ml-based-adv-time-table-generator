/**
 * Transform the input data for machine learning processing
 * @param {Object} inputData - The input data from the request
 * @returns {Object} - Transformed data ready for ML model
 */
const transformDataForML = async (inputData) => {
  try {
    // Validate required fields
    const requiredFields = ['collegeName', 'branchName', 'workingDays', 'classTimes', 'subjects', 'teachers', 'rooms'];
    requiredFields.forEach((field) => {
      if (!inputData[field] || (Array.isArray(inputData[field]) && inputData[field].length === 0)) {
        throw new Error(`Invalid input data: ${field} is missing or empty.`);
      }
    });

    // Transform data
    const transformedData = {
      collegeName: inputData.collegeName,
      branchName: inputData.branchName,
      workingDays: inputData.workingDays,
      classTimes: inputData.classTimes,
      subjects: inputData.subjects.map((subject) =>
        typeof subject === 'string' ? { name: subject } : subject
      ),
      teachers: inputData.teachers.map((teacher) => {
        // Clean and split subjects into an array for each teacher
        const subjectsArray = teacher.subject
          ? teacher.subject
              .replace(/undefined/g, '') // Remove 'undefined' from the subject string
              .split(',')
              .map((subj) => subj.trim()) // Ensure no extra spaces
          : [];
        return {
          name: teacher.name,
          subjects: subjectsArray, // Store the subjects as an array
        };
      }),
      rooms: inputData.rooms.map((room) => (typeof room === 'string' ? { name: room } : room)),
    };

    console.log("Transformed Data:", transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error transforming data for ML:', error.message);
    throw error;
  }
};

/**
 * Generate the conflict-free timetable using an ML model
 * @param {Object} transformedData - The transformed data to feed into the ML model
 * @returns {Object} - The optimized timetable without conflicts
 */
const generateTimetable = async (transformedData) => {
  try {
    const teacherAvailability = {};
    const roomAvailability = {};
    const timetable = {};

    // Initialize teacher and room availability
    transformedData.teachers.forEach((teacher) => {
      teacherAvailability[teacher.name] = new Set();
    });
    transformedData.rooms.forEach((room) => {
      roomAvailability[room.name] = new Set();
    });

    // Generate timetable
    transformedData.workingDays.forEach((day) => {
      timetable[day] = [];
      transformedData.classTimes.forEach((time) => {
        // Find an available subject, teacher, and room
        const subject = transformedData.subjects.find((subj) =>
          transformedData.teachers.some(
            (teacher) =>
              teacher.subjects.includes(subj.name) && !teacherAvailability[teacher.name].has(time)
          )
        );

        if (!subject) {
          console.warn(`No available teacher for time slot: ${time} on ${day}. Skipping this slot.`);
          return; // Skip this time slot
        }

        const teacher = transformedData.teachers.find(
          (t) => t.subjects.includes(subject.name) && !teacherAvailability[t.name].has(time)
        );
        const room = transformedData.rooms.find((r) => !roomAvailability[r.name].has(time));

        if (!teacher || !room) {
          console.warn(`Insufficient teachers or rooms for time slot: ${time} on ${day}. Skipping this slot.`);
          return; // Skip this time slot
        }

        // Assign the subject, teacher, and room to the time slot
        timetable[day].push({
          time,
          subject: subject.name,
          teacher: teacher.name,
          room: room.name,
        });

        // Mark the teacher and room as booked for this time slot
        teacherAvailability[teacher.name].add(time);
        roomAvailability[room.name].add(time);
      });
    });

    return timetable;
  } catch (error) {
    console.error('Error generating timetable:', error.message);
    throw error;
  }
};

module.exports = {
  transformDataForML,
  generateTimetable,
};
