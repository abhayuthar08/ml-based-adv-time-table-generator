const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Correctly get the Schema constructor

const courseSchema = new Schema({
    name: { type: String, required: true },
    courseCode: { type: String, required: true, unique: true },
    description: { type: String },
    teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }], // Teachers associated with this course
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }], // Subjects associated with this course
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Course', courseSchema);
  