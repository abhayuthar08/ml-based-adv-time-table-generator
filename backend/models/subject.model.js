const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Correctly get the Schema constructor

// Define the subject schema
const subjectSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Export the subject model
module.exports = mongoose.model('Subject', subjectSchema);
