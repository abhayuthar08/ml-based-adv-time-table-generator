# SchedulifyX - Advanced Time Table Generator

This project is a full-stack application for generating advanced, conflict-free academic timetables. It features a modern React frontend and a Node.js/Express backend with MongoDB for data storage.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Backend Structure & Components](#backend-structure--components)
- [Frontend Setup](#frontend-setup)
- [Frontend Structure & Components](#frontend-structure--components)
- [API Endpoints](#api-endpoints)
- [Main Pages & Routes](#main-pages--routes)
- [Environment Variables](#environment-variables)
- [Development & Production](#development--production)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Admin Registration & Login**: Secure authentication using JWT and bcrypt
- **Timetable Generation**: Generate and retrieve class/lab timetables with conflict-free logic
- **Search & History**: Search for timetables and view history
- **Modern UI**: Built with React, Vite, Tailwind CSS, and Framer Motion
- **CORS Support**: Allows requests from both local and deployed frontends
- **Production-Ready**: Serves React frontend in production mode

> **Note:** While the project structure and some code are designed to support future machine learning integration, the current version does not use any ML algorithms for timetable generation. All logic is rule-based.

---

## Project Structure
```
6th project/
  backend/
    app.js
    controllers/
      adminController.js
      allControllers.js
    models/
      admin.model.js
      timetable.model.js
    routes/
      adminRoutes.js
    middlewares.cjs
    package.json
    ...
  frontend/
    public/
    src/
      App.jsx
      main.jsx
      index.css
      components/
        About.jsx
        AboutUs.jsx
        Admin.jsx
        Button.jsx
        Cyl.jsx
        Footer.jsx
        GenerateTimeTable.jsx
        HomePage.jsx
        Login.jsx
        Logout.jsx
        Moving.jsx
        Navbar.jsx
        Page3.jsx
        PrivateRoute.jsx
        Register.jsx
        ResultTimeTable.jsx
        Search.jsx
        SearchTimeTable.jsx
        Slides.jsx
        Three.jsx
        TimetableDetails.jsx
        TimetableHistory.jsx
        Work.css
        Work.jsx
      stylesheets/
        HomePage.css
    ...
  README.md  # ← (This file)
```

---

## Backend Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB database (local or cloud)

### Installation
```bash
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the `backend` folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```

### Running the Server
- **Development:**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm start
  ```

---

## Backend Structure & Components
- `app.js`: Main Express app, configures middleware, CORS, connects to MongoDB, and sets up routes.
- `controllers/`:
  - `adminController.js`: Handles admin registration, login, and logout logic.
  - `allControllers.js`: Handles timetable generation and retrieval logic.
- `models/`:
  - `admin.model.js`: Mongoose schema for admin users.
  - `timetable.model.js`: Mongoose schema for timetables.
- `routes/`:
  - `adminRoutes.js`: Defines all API endpoints for authentication and timetable operations.
- `middlewares.cjs`: (Optional) Middleware functions for authentication, error handling, etc.
- `package.json`: Backend dependencies and scripts.

---

## Frontend Setup

### Prerequisites
- Node.js (v16+ recommended)

### Installation
```bash
cd frontend
npm install
```

### Environment Variables
Create a `.env` file in the `frontend` folder:
```
VITE_API_BASE_URL=https://ml-based-adv-time-table-generator.onrender.com
```
Set this to your backend API base URL.

### Running the App
- **Development:**
  ```bash
  npm run dev
  ```
- The app will be available at `http://localhost:5173` by default.

### Building for Production
```bash
npm run build
```
The production build will be in the `dist/` folder. Deploy this folder to your static hosting provider.

---

## Frontend Structure & Components
- `App.jsx`: Main app with all routes
- `main.jsx`: Entry point for React
- `components/`: Contains all UI and logic components, including:
  - `Register`, `Login`, `Logout`, `Admin`, `HomePage`, `About`, `AboutUs`, `Navbar`, `Footer`, `GenerateTimeTable`, `ResultTimeTable`, `SearchTimeTable`, `TimetableDetails`, `TimetableHistory`, `PrivateRoute`, and more
- `stylesheets/`: Custom CSS for specific components
- `public/`: Static assets (images, videos)

---

## API Endpoints

### Auth
- `POST /register` — Register a new admin
- `POST /login` — Login as admin
- `POST /logout` — Logout admin

### Timetable
- `POST /generate-time-table` — Generate a new timetable
- `GET /result-time-table` — Get the latest generated timetable

---

## Main Pages & Routes (Frontend)
- `/` — Home page
- `/register` — Admin registration
- `/login` — Admin login
- `/logout` — Logout
- `/about` — About the project
- `/about_us` — About the team
- `/as_admin` — Admin dashboard
- `/generate-time-table` — Generate timetable (protected)
- `/result-time-table` — View generated timetable (protected)
- `/search-timetable` — Search timetables
- `/timetable-history` — View timetable history
- `/timetable-details` — Timetable details

Some routes (like timetable generation/results) are protected and require authentication. The `PrivateRoute` component handles this logic.

---

## Environment Variables
- **Backend:**
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET` — Secret for JWT authentication
  - `NODE_ENV` — Set to `development` or `production`
  - `PORT` — Port for backend server (default: 5000)
- **Frontend:**
  - `VITE_API_BASE_URL` — URL of the backend API

---

## Development & Production
- In development, run backend and frontend separately.
- In production, the backend serves the React build from `frontend/build`.
- CORS is enabled for both local and deployed frontends.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first.
