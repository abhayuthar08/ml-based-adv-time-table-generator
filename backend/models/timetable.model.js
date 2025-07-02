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