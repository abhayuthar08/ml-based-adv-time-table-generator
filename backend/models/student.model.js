const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Correctly get the Schema constructor

const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course' }, // Associated course
    schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Student', studentSchema);
  