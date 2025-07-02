const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, './.env') });

const adminRoutes = require('./routes/adminRoutes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    'http://localhost:5173', // Local frontend (dev)
    'https://ml-based-adv-time-table-generator-111.onrender.com' // Deployed frontend
  ],
  credentials: true,
};

app.use(cors(corsOptions));

const mongoURI = process.env.MONGO_URI;
console.log('Mongo URI:', mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Serve React static files in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.send('React app is not available in development mode. Please run `npm run build` first.');
  });
}

app.use('/', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
