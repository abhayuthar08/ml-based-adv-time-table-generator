const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require('../models/admin.model.js');

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';

// ** Register a new admin **
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log("Registering Admin:", { name, email }); // Debug log

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    console.error("Error in registerAdmin:", error); // Log error
    res.status(500).json({ message: 'Error registering admin', error: error.message });
  }
};



// ** Login Admin **
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Logging in Admin:", email); // Debug log

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    console.error("Error in loginAdmin:", error); // Log error
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// ** Logout Admin **
const logoutAdmin = async (req, res) => {
  try {
    // Instruct client to remove token
    res.status(200).json({ message: 'Logout successful. Please remove the token from client storage.' });
  } catch (error) {
    console.error("Error in logoutAdmin:", error);
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
};



module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
};
