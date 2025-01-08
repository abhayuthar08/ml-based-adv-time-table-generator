const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Correctly get the Schema constructor

const roomSchema = new Schema({
    name: { type: String, required: true },
    // building: { type: String },
    capacity: { type: Number }
    // equipment: [String], // List of available equipment in the room
    // createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Room', roomSchema);
  