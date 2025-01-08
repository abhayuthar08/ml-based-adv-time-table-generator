const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Correctly get the Schema constructor

// Define the teacher schema
const teacherSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added password field
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }], // Array of subjects the teacher teaches
  contactNumber: { type: String },
  schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }], // Array of schedules for the teacher
  createdAt: { type: Date, default: Date.now }
});

// Export the teacher model
module.exports = mongoose.model('Teacher', teacherSchema);




