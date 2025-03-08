import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GenerateTimetable from './components/GenerateTimeTable';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Admin from './components/Admin';
import ResultTimeTable from './components/ResultTimeTable.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/generate-time-table" element={<GenerateTimetable />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/as-admin" element={<Admin />} />
        <Route path="/result-time-table" element={<ResultTimeTable />} />
        
      </Routes>
    </Router>
  );
}

export default App;


