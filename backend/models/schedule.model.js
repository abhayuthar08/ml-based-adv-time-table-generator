const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Correctly get the Schema constructor

const scheduleSchema = new Schema({
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    student: { type: Schema.Types.ObjectId, ref: 'Student' }, // Optional, if you're assigning individual students
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Schedule', scheduleSchema);
  