// import React, { useState, useEffect } from "react";

// const ResultTimeTable = () => {
//   const [timetable, setTimetable] = useState(null);

//   useEffect(() => {
//     // Fetch timetable from the API
//     fetch("http://localhost:5000/result-time-table")
//       .then((res) => res.json())
//       .then((data) => setTimetable(data))
//       .catch((error) => console.error("Error fetching timetable:", error));
//   }, []);

//   if (!timetable) {
//     return <p>Loading timetable...</p>;
//   }

//   return (
//     <div>
//       <h1>Generated Timetable</h1>
//       <pre>{JSON.stringify(timetable, null, 2)}</pre>
//     </div>
//   );
// };

// export default ResultTimeTable;

import React from "react";
import { useLocation } from "react-router-dom"; // To access the state passed via navigate

const ResultTimeTable = () => {
  const { state } = useLocation(); // Get the state (timetable) passed from GenerateTimetable
  const { timetable } = state || {};

  if (!timetable) {
    return <p>No timetable data found.</p>;
  }

  return (
    <div>
      <h1>Generated Timetable</h1>
      <pre>{JSON.stringify(timetable, null, 2)}</pre> {/* Display timetable in JSON format */}
      {/* You can replace the <pre> tag with a more structured timetable display */}
    </div>
  );
};

export default ResultTimeTable;
