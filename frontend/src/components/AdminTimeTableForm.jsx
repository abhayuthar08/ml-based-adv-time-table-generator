// import React, { useState } from 'react';
// import axios from 'axios';

// function TimetableGenerator() {
//   const [numClasses, setNumClasses] = useState(6); // Default number of classes
//   const [subjects, setSubjects] = useState(
//     new Array(numClasses).fill({ subjectName: '', teacherName: '' }) // Array of subject objects
//   );

//   // Update number of classes and reset the subjects array
//   const handleNumClassesChange = (e) => {
//     const num = e.target.value;
//     setNumClasses(num);
//     setSubjects(new Array(Number(num)).fill({ subjectName: '', teacherName: '' }));
//   };

//   // Handle input changes for individual subjects and teachers
//   const handleSubjectChange = (index, field, value) => {
//     // Create a new array based on the previous one to avoid direct mutation of the state
//     const updatedSubjects = [...subjects]; 

//     // Update only the specific subject (subjectName or teacherName)
//     updatedSubjects[index] = {
//       ...updatedSubjects[index],
//       [field]: value, // Dynamically set the field (either subjectName or teacherName)
//     };

//     // Update the state with the modified array
//     setSubjects(updatedSubjects);
//   };

//   // Handle timetable generation
//   const handleGenerateTimetable = () => {
//     const requestData = {
//       numClassesPerDay: numClasses,
//       subjects: subjects, // Send subjects with their names and teachers
//     };

//     // Send request to generate timetable (adjust URL as necessary)
//     axios
//       .post('http://localhost:5000/timetable/create', requestData)
//       .then((response) => {
//         console.log('Timetable generated:', response.data);
//         // You can process the generated timetable here
//       })
//       .catch((error) => {
//         console.error('Error generating timetable:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Timetable Generator</h1>

//       {/* Number of Classes Input */}
//       <div>
//         <label htmlFor="numClasses">Number of Classes per Day: </label>
//         <input
//           type="number"
//           id="numClasses"
//           value={numClasses}
//           onChange={handleNumClassesChange}
//           min="1"
//           max="10"
//         />
//       </div>

//       {/* Dynamic Subject and Teacher Input Fields */}
//       <div>
//         <h2>Subjects & Teachers</h2>
//         {subjects.map((subject, index) => (
//           <div key={index}>
//             <h3>Subject {index + 1}</h3>
//             <label>Subject Name:</label>
//             <input
//               type="text"
//               value={subject.subjectName}
//               onChange={(e) => handleSubjectChange(index, 'subjectName', e.target.value)} // Handle subject name
//             />
//             <br />
//             <label>Teacher for Subject:</label>
//             <input
//               type="text"
//               value={subject.teacherName}
//               onChange={(e) => handleSubjectChange(index, 'teacherName', e.target.value)} // Handle teacher name
//             />
//             <br />
//           </div>
//         ))}
//       </div>

//       {/* Generate Timetable Button */}
//       <button onClick={handleGenerateTimetable}>Generate Timetable</button>
//     </div>
//   );
// }

// export default TimetableGenerator;
