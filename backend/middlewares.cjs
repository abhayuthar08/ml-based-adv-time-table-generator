const jwt = require('jsonwebtoken');
const Joi = require('joi');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded info to req object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token. Please login again.' });
  }
};



const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token is required' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded user data to the request
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Middleware to handle errors globally.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}, // Show detailed error in development
  });
};

/**
 * Middleware to validate request payloads against a schema.
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body); // Use Joi or any validation library
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

/**
 * Middleware to log incoming requests.
 */
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = {
  verifyToken,
  errorHandler,
  validateRequest,
  logger,isLoggedIn
};
