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

// // import React, { useEffect, useState } from "react";

// // function App() {
// //   const [data, setData] = useState(null);
// //   const [error, setError] = useState(null); // To track any errors

// //   useEffect(() => {
// //     // Making a request to the backend through the proxy
// //     fetch("/api")  // Using the API endpoint that Vite is proxying
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         return response.json();
// //       })
// //       .then((data) => setData(data))  // Set the data from the response
// //       .catch((error) => setError(error.message));  // Handle any error and set it in state
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Data from Backend</h1>
// //       {error ? (
// //         <p>Error: {error}</p>  // Display error message if any
// //       ) : (
// //         <pre>{JSON.stringify(data, null, 2)}</pre>  // Display the data if it's available
// //       )}
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useEffect, useState } from "react";

// function App() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null); // To track any errors

//   useEffect(() => {
//     // Making a request to the backend through the proxy
//     fetch("/")  // Using the API endpoint that Vite is proxying
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => setData(data))  // Set the data from the response
//       .catch((error) => setError(error.message));  // Handle any error and set it in state
//   }, []);

//   return (
//     <div>
//       <h1>Data from Backend</h1>
//       {error ? (
//         <p>Error: {error}</p>  // Display error message if any
//       ) : (
//         <pre>{JSON.stringify(data, null, 2)}</pre>  // Display the data if it's available
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import GenerateTimetable from './components/GenerateTimeTable';
// import HomePage from './components/HomePage';

// function App() {
//   // const [data, setData] = useState(null);
//   // const [error, setError] = useState(null); // To track any errors
  

//   // useEffect(() => {
//   //   // Making a request to the backend through the proxy
//   //   fetch('/api')  // Using the API endpoint that Vite is proxying
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error('Network response was not ok');
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((data) => setData(data))  // Set the data from the response
//   //     .catch((error) => setError(error.message));  // Handle any error and set it in state
//   // }, []);

//   return (
//     <div>
//       {/* <h1>Data from Backend</h1>
//       {error ? (
//         <p>Error: {error}</p>  // Display error message if any
//       ) : (
//         <pre>{JSON.stringify(data, null, 2)}</pre>  // Display the data if it's available
//       )} */}
//       <GenerateTimetable/>
//       {/* <HomePage></HomePage> */}
//     </div>
//   );
// }

// export default App;


