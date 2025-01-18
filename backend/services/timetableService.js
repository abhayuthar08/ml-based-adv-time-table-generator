// // const Timetable = require('../models/timetable.model'); // Timetable model
// // const Teacher = require('../models/teacher.model'); // Teacher model
// // const Room = require('../models/room.model'); // Room model
// // const Subject = require('../models/subject.model'); // Subject model

// // /**
// //  * Transform the input data for machine learning processing
// //  * @param {Object} inputData - The input data from the request
// //  * @returns {Object} - Transformed data ready for ML model
// //  */
// // const transformDataForML = async (inputData) => {
// //   try {
// //     // Validate required fields
// //     const requiredFields = ['collegeName', 'branchName', 'workingDays', 'classTimes', 'subjects', 'teachers', 'rooms'];
// //     requiredFields.forEach((field) => {
// //       if (!inputData[field] || (Array.isArray(inputData[field]) && inputData[field].length === 0)) {
// //         throw new Error(`Invalid input data: ${field} is missing or empty.`);
// //       }
// //     });

// //     // Transform data
// //     const transformedData = {
// //       collegeName: inputData.collegeName,
// //       branchName: inputData.branchName,
// //       workingDays: inputData.workingDays,
// //       classTimes: inputData.classTimes,
// //       subjects: inputData.subjects.map((subject) =>
// //         typeof subject === 'string' ? { name: subject } : subject
// //       ),
// //       teachers: inputData.teachers.map((teacher) =>
// //         typeof teacher === 'object' && teacher.name ? teacher : { name: teacher, subject: null }
// //       ),
// //       rooms: inputData.rooms.map((room) => (typeof room === 'string' ? { name: room } : room)),
// //     };

// //     return transformedData;
// //   } catch (error) {
// //     console.error('Error transforming data for ML:', error.message);
// //     throw error;
// //   }
// // };

// // /**
// //  * Generate a conflict-free timetable using input data
// //  * @param {Array} workingDays - Days of the week for classes
// //  * @param {Array} classTimes - Time slots for classes
// //  * @param {Array} subjects - List of subjects
// //  * @param {Array} teachers - List of teachers
// //  * @param {Array} rooms - List of rooms
// //  * @param {Array} totalClasses - List of class names (e.g., CS-I, CS-J)
// //  * @returns {Object} - The generated timetable
// //  */
// // function generateTimetable(workingDays, classTimes, subjects, teachers, rooms, totalClasses) {
// //   try {
// //     // Validate input arrays
// //     if (!Array.isArray(workingDays) || !Array.isArray(classTimes) || !Array.isArray(subjects) || !Array.isArray(teachers) || !Array.isArray(rooms)) {
// //       throw new Error('Invalid data format. Ensure all inputs are arrays.');
// //     }

// //     const timetable = {};

// //     // Track teacher's schedule and room availability
// //     const teacherSchedule = {};
// //     const roomSchedule = {};

// //     // Initialize teacher schedule and room schedule
// //     teachers.forEach((teacher) => {
// //       teacherSchedule[teacher.name] = {};
// //     });
// //     rooms.forEach((room) => {
// //       roomSchedule[room.name] = {};
// //     });

// //     totalClasses.forEach((className) => {
// //       timetable[className] = {};

// //       workingDays.forEach((day) => {
// //         timetable[className][day] = classTimes.map((timeSlot) => {
// //           const subject = subjects[Math.floor(Math.random() * subjects.length)];
// //           const teacher = teachers.find((t) => t.subject === subject.name);
// //           const room = rooms[Math.floor(Math.random() * rooms.length)];

// //           // Check if teacher and room are available for this timeslot and day
// //           if (!teacherSchedule[teacher.name][day]) {
// //             teacherSchedule[teacher.name][day] = new Set();
// //           }

// //           if (!roomSchedule[room.name][day]) {
// //             roomSchedule[room.name][day] = new Set();
// //           }

// //           // Ensure teacher and room are not double-booked
// //           if (!teacherSchedule[teacher.name][day].has(timeSlot) && !roomSchedule[room.name][day].has(timeSlot)) {
// //             teacherSchedule[teacher.name][day].add(timeSlot);
// //             roomSchedule[room.name][day].add(timeSlot);

// //             return {
// //               subject: subject.name,
// //               teacher: teacher.name,
// //               room: room.name,
// //               time: timeSlot,
// //             };
// //           }

// //           // If there's a conflict, return TBD
// //           return {
// //             subject: subject.name,
// //             teacher: 'TBD',
// //             room: 'TBD',
// //             time: timeSlot,
// //           };
// //         });
// //       });
// //     });

// //     return timetable;
// //   } catch (error) {
// //     console.error('Error generating timetable:', error.message);
// //     throw error;
// //   }
// // }

// // /**
// //  * Generate and save a conflict-free timetable to the database
// //  * @param {Object} data - Input data for timetable generation
// //  */
// // async function generateConflictFreeTimetable(data) {
// //   try {
// //     // Validate input
// //     const requiredFields = ['collegeName', 'branchName', 'workingDays', 'classes', 'subjects', 'teachers', 'rooms'];
// //     requiredFields.forEach((field) => {
// //       if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
// //         throw new Error(`${field} is missing or empty.`);
// //       }
// //     });

// //     // Generate timetable
// //     const timetableData = {
// //       collegeName: data.collegeName,
// //       branchName: data.branchName,
// //       classes: data.classes,
// //       workingDays: data.workingDays,
// //       classTimes: data.classTimes,
// //       classDuration: data.classDuration,
// //       breaksDuration: data.breaksDuration || 0,
// //       totalClassesPerDay: data.totalClassesPerDay,
// //       subjects: data.subjects.map((subject) => ({
// //         subjectName: subject.name,
// //         teacherName: subject.teacher || 'TBD',
// //         specialization: subject.specialization || null,
// //       })),
// //       timetable: generateTimetable(
// //         data.workingDays,
// //         data.classTimes,
// //         data.subjects,
// //         data.teachers,
// //         data.rooms,
// //         data.classes
// //       ),
// //     };

// //     // Save to database
// //     const timetable = new Timetable(timetableData);
// //     await timetable.save();

// //     console.log('Timetable generated and saved successfully!');
// //     return timetable;
// //   } catch (error) {
// //     console.error('Error generating conflict-free timetable:', error.message);
// //     throw error;
// //   }
// // }

// // /**
// //  * Generate timetable from services (called from the controller)
// //  * @param {Object} data - Input data for timetable generation
// //  */
// // async function generateTimeTableFromServices(data) {
// //   try {
// //     // Transform data
// //     const transformedData = await transformDataForML(data);

// //     // Generate timetable
// //     const timetable = generateTimetable(
// //       transformedData.workingDays,
// //       transformedData.classTimes,
// //       transformedData.subjects,
// //       transformedData.teachers,
// //       transformedData.rooms,
// //       data.totalClasses // Pass totalClasses to generate timetable for both CS-I and CS-J
// //     );

// //     if (!timetable) {
// //       throw new Error('Timetable generation failed. No data returned.');
// //     }

// //     console.log('Generated Timetable:', timetable);
// //     return timetable;
// //   } catch (error) {
// //     console.error('Error generating timetable from services:', error.message);
// //     throw new Error('Failed to generate timetable from services');
// //   }
// // }

// // module.exports = {
// //   generateConflictFreeTimetable,
// //   generateTimetable,
// //   generateTimeTableFromServices,
// // };




// const Timetable = require('../models/timetable.model'); // Timetable model
// const Teacher = require('../models/teacher.model'); // Teacher model
// const Room = require('../models/room.model'); // Room model
// const Subject = require('../models/subject.model'); // Subject model

// /**
//  * Transform the input data for machine learning processing
//  * @param {Object} inputData - The input data from the request
//  * @returns {Object} - Transformed data ready for ML model
//  */
// const transformDataForML = async (inputData) => {
//   try {
//     // Validate required fields
//     const requiredFields = ['collegeName', 'branchName', 'workingDays', 'classTimes', 'subjects', 'teachers', 'rooms'];
//     requiredFields.forEach((field) => {
//       if (!inputData[field] || (Array.isArray(inputData[field]) && inputData[field].length === 0)) {
//         throw new Error(`Invalid input data: ${field} is missing or empty.`);
//       }
//     });

//     // Transform data
//     const transformedData = {
//       collegeName: inputData.collegeName,
//       branchName: inputData.branchName,
//       workingDays: inputData.workingDays,
//       classTimes: inputData.classTimes,
//       subjects: inputData.subjects.map((subject) =>
//         typeof subject === 'string' ? { name: subject } : subject
//       ),
//       teachers: inputData.teachers.map((teacher) => {
//         if (typeof teacher === 'object' && teacher.name) {
//           return teacher;
//         } else {
//           // Handle invalid teacher entry
//           return { name: teacher, subject: null };
//         }
//       }),
//       rooms: inputData.rooms.map((room) => (typeof room === 'string' ? { name: room } : room)),
//     };

//     return transformedData;
//   } catch (error) {
//     console.error('Error transforming data for ML:', error.message);
//     throw error;
//   }
// };

// /**
//  * Generate a conflict-free timetable using input data
//  * @param {Array} workingDays - Days of the week for classes
//  * @param {Array} classTimes - Time slots for classes
//  * @param {Array} subjects - List of subjects
//  * @param {Array} teachers - List of teachers
//  * @param {Array} rooms - List of rooms
//  * @param {Array} totalClasses - List of class names (e.g., CS-I, CS-J)
//  * @returns {Object} - The generated timetable
//  */
// function generateTimetable(workingDays, classTimes, subjects, teachers, rooms, totalClasses) {
//   try {
//     // Validate input arrays
//     if (!Array.isArray(workingDays) || !Array.isArray(classTimes) || !Array.isArray(subjects) || !Array.isArray(teachers) || !Array.isArray(rooms)) {
//       throw new Error('Invalid data format. Ensure all inputs are arrays.');
//     }

//     const timetable = {};

//     // Track teacher's schedule and room availability
//     const teacherSchedule = {};
//     const roomSchedule = {};

//     // Initialize teacher schedule and room schedule
//     teachers.forEach((teacher) => {
//       teacherSchedule[teacher.name] = {};
//     });
//     rooms.forEach((room) => {
//       roomSchedule[room.name] = {};
//     });

//     totalClasses.forEach((className) => {
//       timetable[className] = {};

//       workingDays.forEach((day) => {
//         timetable[className][day] = classTimes.map((timeSlot) => {
//           const subject = subjects[Math.floor(Math.random() * subjects.length)];
//           const teacher = teachers.find((t) => t.subject === subject.name);
//           const room = rooms[Math.floor(Math.random() * rooms.length)];

//           // Ensure teacher and room are available for this timeslot and day
//           if (!teacherSchedule[teacher.name][day]) {
//             teacherSchedule[teacher.name][day] = new Set();
//           }

//           if (!roomSchedule[room.name][day]) {
//             roomSchedule[room.name][day] = new Set();
//           }

//           // Ensure teacher and room are not double-booked
//           if (!teacherSchedule[teacher.name][day].has(timeSlot) && !roomSchedule[room.name][day].has(timeSlot)) {
//             teacherSchedule[teacher.name][day].add(timeSlot);
//             roomSchedule[room.name][day].add(timeSlot);

//             return {
//               subject: subject.name,
//               teacher: teacher.name,
//               room: room.name,
//               time: timeSlot,
//             };
//           }

//           // If there's a conflict, return TBD
//           return {
//             subject: subject.name,
//             teacher: 'TBD',
//             room: 'TBD',
//             time: timeSlot,
//           };
//         });
//       });
//     });

//     return timetable;
//   } catch (error) {
//     console.error('Error generating timetable:', error.message);
//     throw error;
//   }
// }

// /**
//  * Generate and save a conflict-free timetable to the database
//  * @param {Object} data - Input data for timetable generation
//  */
// async function generateConflictFreeTimetable(data) {
//   try {
//     // Validate input
//     const requiredFields = ['collegeName', 'branchName', 'workingDays', 'classes', 'subjects', 'teachers', 'rooms'];
//     requiredFields.forEach((field) => {
//       if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
//         throw new Error(`${field} is missing or empty.`);
//       }
//     });

//     // Generate timetable
//     const timetableData = {
//       collegeName: data.collegeName,
//       branchName: data.branchName,
//       classes: data.classes,
//       workingDays: data.workingDays,
//       classTimes: data.classTimes,
//       classDuration: data.classDuration,
//       breaksDuration: data.breaksDuration || 0,
//       totalClassesPerDay: data.totalClassesPerDay,
//       subjects: data.subjects.map((subject) => ({
//         subjectName: subject.name,
//         teacherName: subject.teacher || 'TBD',
//         specialization: subject.specialization || null,
//       })),
//       timetable: generateTimetable(
//         data.workingDays,
//         data.classTimes,
//         data.subjects,
//         data.teachers,
//         data.rooms,
//         data.classes
//       ),
//     };

//     // Save to database
//     const timetable = new Timetable(timetableData);
//     await timetable.save();

//     console.log('Timetable generated and saved successfully!');
//     return timetable;
//   } catch (error) {
//     console.error('Error generating conflict-free timetable:', error.message);
//     throw error;
//   }
// }

// /**
//  * Generate timetable from services (called from the controller)
//  * @param {Object} data - Input data for timetable generation
//  */
// const generateTimeTableFromServices = (req, res) => {
//   const {
//     collegeName,
//     branchName,
//     workingDays,
//     classTimes,
//     totalClasses,
//     teachers,
//     rooms,
//     classDuration,
//     totalClassesPerDay,
//   } = req.body;

//   // Check required fields
//   if (
//     !collegeName ||
//     !branchName ||
//     !workingDays.length ||
//     !classTimes.length ||
//     !totalClasses.length ||
//     !teachers.length ||
//     !rooms.length ||
//     !classDuration ||
//     !totalClassesPerDay
//   ) {
//     return res.status(400).json({ error: "All fields are required." });
//     console.log("field are missing ok");
//   }

//   // Proceed with timetable generation logic
//   try {
//     // Your timetable generation logic here...
//     const generatedTimetable = timetableGenerator(req.body);
//     res.status(200).json(generatedTimetable);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to generate timetable." });
//   }
// };


// module.exports = {
//   generateConflictFreeTimetable,
//   generateTimetable,
//   generateTimeTableFromServices,
// };


const Timetable = require('../models/timetable.model'); // Timetable model
const Teacher = require('../models/teacher.model'); // Teacher model
const Room = require('../models/room.model'); // Room model
const Subject = require('../models/subject.model'); // Subject model

/**
 * Validate required fields in the input data.
 * @param {Object} data - Input data to validate.
 * @param {Array} fields - Required fields to check.
 */
function validateRequiredFields(data, fields) {
  fields.forEach((field) => {
    if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
      throw new Error(`${field} is missing or invalid.`);
    }
  });
}

/**
 * Generate a conflict-free timetable using input data.
 * @param {Array} workingDays - Days of the week for classes.
 * @param {Array} classTimes - Time slots for classes.
 * @param {Array} subjects - List of subjects.
 * @param {Array} teachers - List of teachers.
 * @param {Array} rooms - List of rooms.
 * @param {Array} totalClasses - List of class names (e.g., CS-I, CS-J).
 * @returns {Object} - The generated timetable.
 */
function generateTimetable(workingDays, classTimes, subjects, teachers, rooms, totalClasses) {
  const timetable = {};
  const teacherSchedule = {};
  const roomSchedule = {};

  teachers.forEach((teacher) => (teacherSchedule[teacher.name] = {}));
  rooms.forEach((room) => (roomSchedule[room.name] = {}));

  totalClasses.forEach((className) => {
    timetable[className] = {};

    workingDays.forEach((day) => {
      timetable[className][day] = [];

      classTimes.forEach((timeSlot) => {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const teacher = teachers.find((t) => t.subject === subject.name);
        const room = rooms[Math.floor(Math.random() * rooms.length)];

        // Ensure no conflicts for teacher or room
        if (
          teacher &&
          room &&
          (!teacherSchedule[teacher.name][day] || !teacherSchedule[teacher.name][day].has(timeSlot)) &&
          (!roomSchedule[room.name][day] || !roomSchedule[room.name][day].has(timeSlot))
        ) {
          // Add to schedules
          teacherSchedule[teacher.name][day] = teacherSchedule[teacher.name][day] || new Set();
          teacherSchedule[teacher.name][day].add(timeSlot);

          roomSchedule[room.name][day] = roomSchedule[room.name][day] || new Set();
          roomSchedule[room.name][day].add(timeSlot);

          timetable[className][day].push({
            subject: subject.name,
            teacher: teacher.name,
            room: room.name,
            time: timeSlot,
          });
        }
      });
    });
  });

  return timetable;
}

/**
 * Generate and save a conflict-free timetable to the database.
 * @param {Object} data - Input data for timetable generation.
 */
async function generateConflictFreeTimetable(data) {
  try {
    // Validate input fields
    validateRequiredFields(data, [
      'collegeName',
      'branchName',
      'workingDays',
      'classTimes',
      'subjects',
      'teachers',
      'rooms',
      'totalClasses',
    ]);

    // Generate timetable
    const timetable = generateTimetable(
      data.workingDays,
      data.classTimes,
      data.subjects,
      data.teachers,
      data.rooms,
      data.totalClasses
    );

    // Save to database
    const savedTimetable = new Timetable({
      collegeName: data.collegeName,
      branchName: data.branchName,
      workingDays: data.workingDays,
      classTimes: data.classTimes,
      timetable,
    });

    await savedTimetable.save();
    return savedTimetable;
  } catch (error) {
    console.error('Error generating conflict-free timetable:', error.message);
    throw error;
  }
}

/**
 * Controller: Generate a timetable from input data.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const generateTimeTableFromServices = async ({
  collegeName,
  branchName,
  workingDays,
  classTimes,
  totalClasses,
  subjects,
  teachers,
  rooms,
  classDuration,
  totalClassesPerDay,
}) => {
  if (!collegeName || !branchName) {
    throw new Error('College name or branch name is missing');
  }

  // Logic for timetable generation
  const timetable = {
    collegeName,
    branchName,
    workingDays,
    classTimes,
    totalClasses,
    subjects,
    teachers,
    rooms,
    classDuration,
    totalClassesPerDay,
  };

  return timetable; // Return a mock or actual generated timetable
};

module.exports = {
  generateConflictFreeTimetable,
  generateTimetable,
  generateTimeTableFromServices,
};
