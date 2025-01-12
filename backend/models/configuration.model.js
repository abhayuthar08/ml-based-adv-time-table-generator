const mongoose = require ("mongoose");

const configurationSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  branchName: { type: String, required: true },
  classes: [{ type: String, required: true }], // E.g., ['6A', '6B', '6C']
  workingDays: [{ type: String, required: true }], // E.g., ['Monday', 'Tuesday']
  classTimes: [{ type: String, required: true }], // E.g., ['9:00-10:00', '10:00-11:00']
  classDuration: { type: Number, required: true }, // Minutes
  breaksDuration: { type: Number, required: true }, // Minutes
  totalClassesPerDay: { type: Number, required: true },
  subjects: [
    {
      subjectName: { type: String, required: true },
      teachers: [{ type: String, required: true }], // E.g., ['Teacher1', 'Teacher2']
    },
  ],
});

module.exports =  mongoose.model("Configuration", configurationSchema);
