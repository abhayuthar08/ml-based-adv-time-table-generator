const Subject = require('../models/subject.model');

// Add a new subject
exports.addSubject = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    const newSubject = new Subject({ name, code, description });
    await newSubject.save();

    res.status(201).json({ message: 'Subject added successfully', subject: newSubject });
  } catch (error) {
    res.status(500).json({ message: 'Error adding subject', error });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};
