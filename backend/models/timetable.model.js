// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Subject and teacher schema for each class
// const subjectTeacherSchema = new Schema({
//   subjectName: { type: String, required: true },
//   teacherName: { type: String, required: true },
// });

// // Timetable schema
// const timetableSchema = new Schema({
//   collegeName: { type: String, required: true },
//   branchName: { type: String, required: true },
//   classes: [{ type: String }], // e.g., IT-I, IT-J, IT-K
//   workingDays: [{ type: String }], // e.g., ['Monday', 'Tuesday', ...]
//   subjects: [subjectTeacherSchema], // Array of subject-teacher pairs
//   teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
//   classTimes: [{ type: String }], // e.g., ['9:00-10:00', '10:00-11:00', ...]
//   classDuration: { type: Number, required: true }, // Class duration in minutes
//   breaksDuration: { type: Number, required: true }, // Break duration in minutes
//   totalClassesPerDay: { type: Number, required: true }, // Total number of classes per day
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Timetable', timetableSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subject-Teacher Schema
const subjectTeacherSchema = new Schema({
  subjectName: { type: String, required: true }, // e.g., 'Mathematics'
  teacherName: { type: String, required: true }, // e.g., 'John Doe'
  specialization: { type: String }, // Optional: 'Algebra', 'Geometry', etc.
});

// Time Slot Schema for Generated Timetable
const timeSlotSchema = new Schema({
  time: { type: String, required: true }, // e.g., '9:00-10:00'
  subject: { type: String, required: true }, // e.g., 'Mathematics'
  teacher: { type: String, required: true }, // e.g., 'John Doe'
  room: { type: String }, // Optional: Room number or location
});

// Day-Wise Class Schedule Schema
const classScheduleSchema = new Schema({
  className: { type: String, required: true }, // e.g., 'IT-I'
  slots: [timeSlotSchema], // Array of time slots for the class
});

// Timetable Schema
const timetableSchema = new Schema({
  collegeName: { type: String, required: true }, // College name
  branchName: { type: String, required: true }, // Branch name, e.g., 'IT'
  classes: [{ type: String, required: true }], // e.g., ['IT-I', 'IT-J']
  workingDays: [{ type: String, required: true }], // e.g., ['Monday', 'Tuesday']
  subjects: [subjectTeacherSchema], // Array of subjects and their teachers
  classTimes: [{ type: String, required: true }], // e.g., ['9:00-10:00', '10:00-11:00']
  classDuration: { type: Number, required: true }, // Class duration in minutes
  breaksDuration: { type: Number, required: true }, // Break duration in minutes
  totalClassesPerDay: { type: Number, required: true }, // Total classes per day
  timetable: [
    {
      day: { type: String, required: true }, // e.g., 'Monday'
      classes: [classScheduleSchema], // Class-wise schedule for the day
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Timetable', timetableSchema);
