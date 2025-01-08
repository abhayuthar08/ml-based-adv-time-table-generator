const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subject and teacher schema for each class
const subjectTeacherSchema = new Schema({
  subjectName: { type: String, required: true },
  teacherName: { type: String, required: true },
});

// Timetable schema
const timetableSchema = new Schema({
  collegeName: { type: String, required: true },
  branchName: { type: String, required: true },
  classes: [{ type: String }], // e.g., IT-I, IT-J, IT-K
  workingDays: [{ type: String }], // e.g., ['Monday', 'Tuesday', ...]
  subjects: [subjectTeacherSchema], // Array of subject-teacher pairs
  teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
  classTimes: [{ type: String }], // e.g., ['9:00-10:00', '10:00-11:00', ...]
  classDuration: { type: Number, required: true }, // Class duration in minutes
  breaksDuration: { type: Number, required: true }, // Break duration in minutes
  totalClassesPerDay: { type: Number, required: true }, // Total number of classes per day
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Timetable', timetableSchema);
