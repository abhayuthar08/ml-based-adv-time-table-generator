import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GenerateTimetable from './components/GenerateTimeTable';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Admin from './components/Admin';
import ResultTimeTable from './components/ResultTimeTable.jsx';
import SearchTimetable from './components/SearchTimeTable.jsx';
import Logout from './components/Logout.jsx';
import TimetableDetails from './components/TimetableDetails.jsx';
import TimetableHistory from './components/TimetableHistory.jsx';
import AboutUs from './components/AboutUs.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate-time-table" element={<GenerateTimetable />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/as_admin" element={<Admin />} />
        <Route path="/result-time-table" element={<ResultTimeTable />} />
        <Route path='/search-timetable' element={<SearchTimetable />} />
        <Route path="/timetable-history" element={<TimetableHistory />} />
        <Route path="/timetable-details" element={<TimetableDetails />} />
        <Route path='/logout' element={<Logout />} />
        
      </Routes>
    </Router>
  );
}

export default App;


