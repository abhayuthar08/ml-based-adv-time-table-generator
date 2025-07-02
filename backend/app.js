const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config({ path: path.resolve(__dirname, './.env') }); 

const adminRoutes = require('./routes/adminRoutes.js');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };
// app.use(cors(corsOptions));

// const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://ml-based-adv-time-table-generator-111.onrender.com/', // ✅ replace with actual frontend deploy domain
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like curl/postman) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI;
console.log('Mongo URI:', mongoURI); 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Serve React static files only in production mode
if (process.env.NODE_ENV === 'production') {
  // In production mode, serve the build directory from React
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


const FINAL = process.env.PORT || 5000;

// Start the server
app.listen(FINAL, () => {
  console.log(`Server running on port ${FINAL}`);
});
