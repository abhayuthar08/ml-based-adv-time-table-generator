

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const subjectTeacherSchema = new Schema({
//   subjectName: { type: String, required: true },
//   teacherName: { type: String, required: true },
//   specialization: { type: String },
// });

// const timeSlotSchema = new Schema({
//   time: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (v) {
//         return /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(v);
//       },
//       message: (props) => `${props.value} is not a valid time range!`,
//     },
//   },
//   subject: { type: String, required: true },
//   teacher: { type: String, required: true },
//   room: { type: String },
// });

// const classScheduleSchema = new Schema({
//   className: { type: String, required: true },
//   slots: [timeSlotSchema],
// });

// const timetableSchema = new Schema({
//   collegeName: { type: String, required: true },
//   branchName: { type: String, required: true },
//   classes: [{ type: String, required: true }],
//   workingDays: {
//     type: [String],
//     required: true,
//     default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//   },
//   subjects: [subjectTeacherSchema],
//   classTimes: {
//     type: [String],
//     required: true,
//     validate: {
//       validator: function (v) {
//         return v.every((time) => /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(time));
//       },
//       message: () => 'All class times must be valid time ranges!',
//     },
//   },
//   classDuration: { type: Number, required: true },
//   breaksDuration: { type: Number, required: true },
//   totalClassesPerDay: { type: Number, required: true },
//   timetable: [
//     {
//       day: { type: String, required: true },
//       classes: [classScheduleSchema],
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

// // Add an index for faster queries
// timetableSchema.index({ collegeName: 1, branchName: 1 });

// module.exports = mongoose.model('Timetable', timetableSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String, required: true },
  teachers: [{ type: String, required: true }],
  weeklyClasses: { type: Number, required: true }
});

const timeSlotSchema = new Schema({
  time: { type: String, required: true },
  subject: { type: String },
  teacher: { type: String },
  room: { type: String },
  isLab: { type: Boolean, default: false },
  labLocation: { type: String },
  batch: { type: String }
});

const dayScheduleSchema = new Schema({
  day: { type: String, required: true },
  slots: [timeSlotSchema]
});

const timetableSchema = new Schema({
  collegeName: { type: String, required: true, index: true },
  branchName: { type: String, required: true, index: true },
  workingDays: { type: [String], required: true },
  classTimes: { type: [String], required: true },
  labTimings: { type: [String] },
  subjects: [subjectSchema],
  rooms: { type: [String] },
  labLocations: { type: [String] },
  batches: { type: [String] },
  classDuration: { type: String },
  totalClassesPerDay: { type: String },
  timetableData: {
    type: Map,
    of: [dayScheduleSchema]
  },
  classRoomAssignment: { type: Map, of: String },
  metadata: {
    generatedAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    version: { type: Number, default: 1 }
  }
}, { timestamps: true });

// Compound index for faster college+branch queries
timetableSchema.index({ collegeName: 1, branchName: 1 });

// Pre-save hook to update lastUpdated timestamp
timetableSchema.pre('save', function(next) {
  this.metadata.lastUpdated = new Date();
  next();
});

// Static method for finding by college and branch
timetableSchema.statics.findByCollegeAndBranch = function(collegeName, branchName) {
  return this.find({ collegeName, branchName }).sort({ 'metadata.generatedAt': -1 });
};

module.exports = mongoose.model('Timetable', timetableSchema);