

// // // // // // // // // import React from "react";
// // // // // // // // // import { useLocation } from "react-router-dom"; // To access the state passed via navigate

// // // // // // // // // const ResultTimeTable = () => {
// // // // // // // // //   const { state } = useLocation(); // Get the state (timetable) passed from GenerateTimetable
// // // // // // // // //   const { timetable } = state || {};

// // // // // // // // //   if (!timetable) {
// // // // // // // // //     return <p>No timetable data found.</p>;
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <h1>Generated Timetable</h1>
// // // // // // // // //       <pre>{JSON.stringify(timetable, null, 2)}</pre> {/* Display timetable in JSON format */}
// // // // // // // // //       {/* You can replace the <pre> tag with a more structured timetable display */}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default ResultTimeTable;




// // // // // // // // // import React from "react";
// // // // // // // // // import { useLocation } from "react-router-dom";
// // // // // // // // // import styled from "styled-components"; // For styling

// // // // // // // // // const Container = styled.div`
// // // // // // // // //   padding: 20px;
// // // // // // // // //   max-width: 900px;
// // // // // // // // //   margin: auto;
// // // // // // // // // `;

// // // // // // // // // const Title = styled.h1`
// // // // // // // // //   text-align: center;
// // // // // // // // //   color: #333;
// // // // // // // // // `;

// // // // // // // // // const Table = styled.table`
// // // // // // // // //   width: 100%;
// // // // // // // // //   border-collapse: collapse;
// // // // // // // // //   margin-top: 20px;
// // // // // // // // // `;

// // // // // // // // // const Th = styled.th`
// // // // // // // // //   background-color: #fda085;
// // // // // // // // //   color: white;
// // // // // // // // //   padding: 10px;
// // // // // // // // //   border: 1px solid #ddd;
// // // // // // // // // `;

// // // // // // // // // const Td = styled.td`
// // // // // // // // //   padding: 10px;
// // // // // // // // //   border: 1px solid #ddd;
// // // // // // // // //   text-align: center;
// // // // // // // // // `;

// // // // // // // // // const NoDataMessage = styled.p`
// // // // // // // // //   text-align: center;
// // // // // // // // //   font-size: 1.2rem;
// // // // // // // // //   color: red;
// // // // // // // // //   margin-top: 20px;
// // // // // // // // // `;

// // // // // // // // // const ResultTimeTable = () => {
// // // // // // // // //   const { state } = useLocation();
// // // // // // // // //   const { timetable } = state || {};

// // // // // // // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // // // // // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // // // // // // //   }

// // // // // // // // //   // Extract class names dynamically
// // // // // // // // //   const classNames = Object.keys(timetable);
// // // // // // // // //   const days = Object.keys(timetable[classNames[0]] || {});

// // // // // // // // //   return (
// // // // // // // // //     <Container>
// // // // // // // // //       <Title>Generated Timetable</Title>
// // // // // // // // //       <Table>
// // // // // // // // //         <thead>
// // // // // // // // //           <tr>
// // // // // // // // //             <Th>Day</Th>
// // // // // // // // //             {classNames.map((className, index) => (
// // // // // // // // //               <Th key={index}>{className}</Th>
// // // // // // // // //             ))}
// // // // // // // // //           </tr>
// // // // // // // // //         </thead>
// // // // // // // // //         <tbody>
// // // // // // // // //           {days.map((day, dayIndex) => (
// // // // // // // // //             <tr key={dayIndex}>
// // // // // // // // //               <Td>{day}</Td>
// // // // // // // // //               {classNames.map((className, classIndex) => (
// // // // // // // // //                 <Td key={classIndex}>
// // // // // // // // //                   {timetable[className][day].length > 0 ? (
// // // // // // // // //                     timetable[className][day].map((entry, entryIndex) => (
// // // // // // // // //                       <div key={entryIndex}>
// // // // // // // // //                         <strong>{entry.subject}</strong> <br />
// // // // // // // // //                         Teacher: {entry.teacher} <br />
// // // // // // // // //                         Room: {entry.room} <br />
// // // // // // // // //                         Time: {entry.time}
// // // // // // // // //                       </div>
// // // // // // // // //                     ))
// // // // // // // // //                   ) : (
// // // // // // // // //                     <span>No class</span>
// // // // // // // // //                   )}
// // // // // // // // //                 </Td>
// // // // // // // // //               ))}
// // // // // // // // //             </tr>
// // // // // // // // //           ))}
// // // // // // // // //         </tbody>
// // // // // // // // //       </Table>
// // // // // // // // //     </Container>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default ResultTimeTable;











// // // // // // // // // import React from "react";
// // // // // // // // // import { useLocation } from "react-router-dom";
// // // // // // // // // import styled from "styled-components"; // For styling

// // // // // // // // // const Container = styled.div`
// // // // // // // // //   padding: 20px;
// // // // // // // // //   max-width: 900px;
// // // // // // // // //   margin: auto;
// // // // // // // // // `;

// // // // // // // // // const Title = styled.h1`
// // // // // // // // //   text-align: center;
// // // // // // // // //   color: #333;
// // // // // // // // // `;

// // // // // // // // // const Subtitle = styled.h2`
// // // // // // // // //   text-align: center;
// // // // // // // // //   color: #666;
// // // // // // // // //   margin-bottom: 20px;
// // // // // // // // // `;

// // // // // // // // // const Table = styled.table`
// // // // // // // // //   width: 100%;
// // // // // // // // //   border-collapse: collapse;
// // // // // // // // //   margin-top: 20px;
// // // // // // // // // `;

// // // // // // // // // const Th = styled.th`
// // // // // // // // //   background-color: #fda085;
// // // // // // // // //   color: white;
// // // // // // // // //   padding: 10px;
// // // // // // // // //   border: 1px solid #ddd;
// // // // // // // // // `;

// // // // // // // // // const Td = styled.td`
// // // // // // // // //   padding: 10px;
// // // // // // // // //   border: 1px solid #ddd;
// // // // // // // // //   text-align: center;
// // // // // // // // // `;

// // // // // // // // // const NoDataMessage = styled.p`
// // // // // // // // //   text-align: center;
// // // // // // // // //   font-size: 1.2rem;
// // // // // // // // //   color: red;
// // // // // // // // //   margin-top: 20px;
// // // // // // // // // `;

// // // // // // // // // const ResultTimeTable = () => {
// // // // // // // // //   const { state } = useLocation();
// // // // // // // // //   const { timetable } = state || {};

// // // // // // // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // // // // // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // // // // // // //   }

// // // // // // // // //   // Extract class names dynamically
// // // // // // // // //   const classNames = Object.keys(timetable);
// // // // // // // // //   const firstClassName = classNames.length > 0 ? classNames[0] : "Unknown Class"; // Pick the first class name
// // // // // // // // //   const days = Object.keys(timetable[firstClassName] || {});

// // // // // // // // //   return (
// // // // // // // // //     <Container>
// // // // // // // // //       <Title>Generated Timetable</Title>
// // // // // // // // //       <Subtitle>Class: {firstClassName}</Subtitle> {/* ✅ Class Name Displayed at the Top */}

// // // // // // // // //       <Table>
// // // // // // // // //         <thead>
// // // // // // // // //           <tr>
// // // // // // // // //             <Th>Day</Th>
// // // // // // // // //             {classNames.map((className, index) => (
// // // // // // // // //               <Th key={index}>{className}</Th>
// // // // // // // // //             ))}
// // // // // // // // //           </tr>
// // // // // // // // //         </thead>
// // // // // // // // //         <tbody>
// // // // // // // // //           {days.map((day, dayIndex) => (
// // // // // // // // //             <tr key={dayIndex}>
// // // // // // // // //               <Td>{day}</Td>
// // // // // // // // //               {classNames.map((className, classIndex) => (
// // // // // // // // //                 <Td key={classIndex}>
// // // // // // // // //                   {timetable[className][day].length > 0 ? (
// // // // // // // // //                     timetable[className][day].map((entry, entryIndex) => (
// // // // // // // // //                       <div key={entryIndex}>
// // // // // // // // //                         <strong>{entry.subject}</strong> <br />
// // // // // // // // //                         Teacher: {entry.teacher} <br />
// // // // // // // // //                         Room: {entry.room} <br />
// // // // // // // // //                         Time: {entry.time}
// // // // // // // // //                       </div>
// // // // // // // // //                     ))
// // // // // // // // //                   ) : (
// // // // // // // // //                     <span>No class</span>
// // // // // // // // //                   )}
// // // // // // // // //                 </Td>
// // // // // // // // //               ))}
// // // // // // // // //             </tr>
// // // // // // // // //           ))}
// // // // // // // // //         </tbody>
// // // // // // // // //       </Table>
// // // // // // // // //     </Container>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default ResultTimeTable;


// // // // // // // // // // import React from "react";
// // // // // // // // // // import { useLocation } from "react-router-dom";
// // // // // // // // // // import styled from "styled-components"; // For styling

// // // // // // // // // // // Styled Components
// // // // // // // // // // const Container = styled.div`
// // // // // // // // // //   padding: 20px;
// // // // // // // // // //   max-width: 1000px;
// // // // // // // // // //   margin: auto;
// // // // // // // // // //   background-color: #f7c873; /* Yellow Background */
// // // // // // // // // //   min-height: 100vh;
// // // // // // // // // //   border-radius: 10px;
// // // // // // // // // // `;

// // // // // // // // // // const Title = styled.h1`
// // // // // // // // // //   text-align: center;
// // // // // // // // // //   color: white;
// // // // // // // // // //   background-color: #e69a2a;
// // // // // // // // // //   padding: 10px;
// // // // // // // // // //   border-radius: 10px;
// // // // // // // // // // `;

// // // // // // // // // // const TableContainer = styled.div`
// // // // // // // // // //   background-color: white;
// // // // // // // // // //   padding: 20px;
// // // // // // // // // //   border-radius: 10px;
// // // // // // // // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // // // // // // // //   margin-top: 20px;
// // // // // // // // // // `;

// // // // // // // // // // const Table = styled.table`
// // // // // // // // // //   width: 100%;
// // // // // // // // // //   border-collapse: collapse;
// // // // // // // // // //   text-align: center;
// // // // // // // // // // `;

// // // // // // // // // // const Th = styled.th`
// // // // // // // // // //   background-color: #ff785a; /* Light Orange */
// // // // // // // // // //   color: white;
// // // // // // // // // //   font-size: 1.2rem;
// // // // // // // // // //   padding: 15px;
// // // // // // // // // //   border: 1px solid #ddd;
// // // // // // // // // // `;

// // // // // // // // // // const Td = styled.td`
// // // // // // // // // //   border: 1px solid #ddd;
// // // // // // // // // //   padding: 15px;
// // // // // // // // // //   font-size: 1rem;
// // // // // // // // // //   font-weight: bold;
// // // // // // // // // //   background-color: #fffaf2;
// // // // // // // // // //   transition: all 0.3s ease-in-out;
// // // // // // // // // //   &:hover {
// // // // // // // // // //     background-color: #ffdac1; /* Light Red */
// // // // // // // // // //     transform: scale(1.05);
// // // // // // // // // //   }
// // // // // // // // // // `;

// // // // // // // // // // const TimeColumn = styled.th`
// // // // // // // // // //   background-color: #add8e6; /* Light Blue */
// // // // // // // // // //   color: black;
// // // // // // // // // //   font-size: 1.2rem;
// // // // // // // // // //   padding: 15px;
// // // // // // // // // //   border: 1px solid #ddd;
// // // // // // // // // // `;

// // // // // // // // // // const NoDataMessage = styled.p`
// // // // // // // // // //   text-align: center;
// // // // // // // // // //   font-size: 1.5rem;
// // // // // // // // // //   color: red;
// // // // // // // // // //   margin-top: 20px;
// // // // // // // // // // `;

// // // // // // // // // // const JsonOutput = styled.pre`
// // // // // // // // // //   background-color: black;
// // // // // // // // // //   color: limegreen;
// // // // // // // // // //   padding: 10px;
// // // // // // // // // //   margin-top: 20px;
// // // // // // // // // //   border-radius: 5px;
// // // // // // // // // //   overflow-x: auto;
// // // // // // // // // // `;

// // // // // // // // // // const ResultTimeTable = () => {
// // // // // // // // // //   const { state } = useLocation();
// // // // // // // // // //   const { timetable, workingDays, classTimes } = state || {};

// // // // // // // // // //   console.log("✅ Received Timetable Data:", timetable);
// // // // // // // // // //   console.log("✅ Working Days:", workingDays);
// // // // // // // // // //   console.log("✅ Class Times:", classTimes);

// // // // // // // // // //   // ✅ Prevent Errors If workingDays or classTimes are Undefined
// // // // // // // // // //   const days = workingDays && Array.isArray(workingDays) ? workingDays : [];
// // // // // // // // // //   const times = classTimes && Array.isArray(classTimes) ? classTimes : [];

// // // // // // // // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // // // // // // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // // // // // // // //   }

// // // // // // // // // //   const classNames = Object.keys(timetable);

// // // // // // // // // //   return (
// // // // // // // // // //     <Container>
// // // // // // // // // //       {classNames.map((className, classIndex) => (
// // // // // // // // // //         <TableContainer key={classIndex}>
// // // // // // // // // //           <Title>Timetable for {className}</Title>
// // // // // // // // // //           <Table>
// // // // // // // // // //             <thead>
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <TimeColumn>Time</TimeColumn>
// // // // // // // // // //                 {days.map((day, index) => (
// // // // // // // // // //                   <Th key={index}>{day}</Th>
// // // // // // // // // //                 ))}
// // // // // // // // // //               </tr>
// // // // // // // // // //             </thead>
// // // // // // // // // //             <tbody>
// // // // // // // // // //               {times.map((time, timeIndex) => (
// // // // // // // // // //                 <tr key={timeIndex}>
// // // // // // // // // //                   <TimeColumn>{time}</TimeColumn>
// // // // // // // // // //                   {days.map((day, dayIndex) => (
// // // // // // // // // //                     <Td key={dayIndex}>
// // // // // // // // // //                       {timetable[className] &&
// // // // // // // // // //                       timetable[className][day] &&
// // // // // // // // // //                       timetable[className][day][timeIndex] ? (
// // // // // // // // // //                         <>
// // // // // // // // // //                           <strong>Subject: {timetable[className][day][timeIndex].subject}</strong> <br />
// // // // // // // // // //                           Teacher: {timetable[className][day][timeIndex].teacher} <br />
// // // // // // // // // //                           Room: {timetable[className][day][timeIndex].room}
// // // // // // // // // //                         </>
// // // // // // // // // //                       ) : (
// // // // // // // // // //                         "No Class"
// // // // // // // // // //                       )}
// // // // // // // // // //                     </Td>
// // // // // // // // // //                   ))}
// // // // // // // // // //                 </tr>
// // // // // // // // // //               ))}
// // // // // // // // // //             </tbody>
// // // // // // // // // //           </Table>

// // // // // // // // // //           {/* ✅ Display Raw JSON Data for Debugging */}
// // // // // // // // // //           <JsonOutput>
// // // // // // // // // //             <strong>JSON Output:</strong>
// // // // // // // // // //             {JSON.stringify(timetable[className], null, 2)}
// // // // // // // // // //           </JsonOutput>
// // // // // // // // // //         </TableContainer>
// // // // // // // // // //       ))}
// // // // // // // // // //     </Container>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default ResultTimeTable;


// // // // // // // import React from "react";
// // // // // // // import { useLocation } from "react-router-dom";
// // // // // // // import styled from "styled-components"; // For styling

// // // // // // // // Styled Components
// // // // // // // const Container = styled.div`
// // // // // // //   padding: 20px;
// // // // // // //   max-width: 1000px;
// // // // // // //   margin: auto;
// // // // // // //   background-color: #f7c873; /* Yellow Background */
// // // // // // //   min-height: 100vh;
// // // // // // //   border-radius: 10px;
// // // // // // // `;

// // // // // // // const Title = styled.h1`
// // // // // // //   text-align: center;
// // // // // // //   color: white;
// // // // // // //   background-color: #e69a2a;
// // // // // // //   padding: 10px;
// // // // // // //   border-radius: 10px;
// // // // // // // `;

// // // // // // // const TableContainer = styled.div`
// // // // // // //   background-color: white;
// // // // // // //   padding: 20px;
// // // // // // //   border-radius: 10px;
// // // // // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // // // // //   margin-top: 20px;
// // // // // // // `;

// // // // // // // const Table = styled.table`
// // // // // // //   width: 100%;
// // // // // // //   border-collapse: collapse;
// // // // // // //   text-align: center;
// // // // // // // `;

// // // // // // // const Th = styled.th`
// // // // // // //   background-color: #ff785a; /* Light Orange */
// // // // // // //   color: white;
// // // // // // //   font-size: 1.2rem;
// // // // // // //   padding: 15px;
// // // // // // //   border: 1px solid #ddd;
// // // // // // // `;

// // // // // // // const Td = styled.td`
// // // // // // //   border: 1px solid #ddd;
// // // // // // //   padding: 15px;
// // // // // // //   font-size: 1rem;
// // // // // // //   font-weight: bold;
// // // // // // //   background-color: #fffaf2;
// // // // // // //   transition: all 0.3s ease-in-out;
// // // // // // //   &:hover {
// // // // // // //     background-color: #ffdac1; /* Light Red */
// // // // // // //     transform: scale(1.05);
// // // // // // //   }
// // // // // // // `;

// // // // // // // const TimeColumn = styled.th`
// // // // // // //   background-color: #add8e6; /* Light Blue */
// // // // // // //   color: black;
// // // // // // //   font-size: 1.2rem;
// // // // // // //   padding: 15px;
// // // // // // //   border: 1px solid #ddd;
// // // // // // // `;

// // // // // // // const NoDataMessage = styled.p`
// // // // // // //   text-align: center;
// // // // // // //   font-size: 1.5rem;
// // // // // // //   color: red;
// // // // // // //   margin-top: 20px;
// // // // // // // `;

// // // // // // // const JsonOutput = styled.pre`
// // // // // // //   background-color: black;
// // // // // // //   color: limegreen;
// // // // // // //   padding: 10px;
// // // // // // //   margin-top: 20px;
// // // // // // //   border-radius: 5px;
// // // // // // //   overflow-x: auto;
// // // // // // // `;

// // // // // // // const ResultTimeTable = () => {
// // // // // // //   const { state } = useLocation();

// // // // // // //   // Debug: Log the entire state object
// // // // // // //   console.log("✅ State Object:", state);

// // // // // // //   // Destructure with fallback values
// // // // // // //   const { timetable = {}, workingDays = [], classTimes = [] } = state || {};

// // // // // // //   // Debug: Log the extracted data
// // // // // // //   console.log("✅ Received Timetable Data:", timetable);
// // // // // // //   console.log("✅ User Working Days:", workingDays);
// // // // // // //   console.log("✅ User Class Times:", classTimes);

// // // // // // //   // Ensure workingDays and classTimes are correctly defined
// // // // // // //   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday"];
// // // // // // //   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9:00-10:00", "10:00-11:00"];

// // // // // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // // // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // // // // //   }

// // // // // // //   const classNames = Object.keys(timetable);

// // // // // // //   return (
// // // // // // //     <Container>
// // // // // // //       {classNames.map((className, classIndex) => (
// // // // // // //         <TableContainer key={classIndex}>
// // // // // // //           <Title>Timetable for {className}</Title>
// // // // // // //           <Table>
// // // // // // //             <thead>
// // // // // // //               <tr>
// // // // // // //                 <TimeColumn>Time</TimeColumn>
// // // // // // //                 {days.map((day, index) => (
// // // // // // //                   <Th key={index}>{day}</Th>
// // // // // // //                 ))}
// // // // // // //               </tr>
// // // // // // //             </thead>
// // // // // // //             <tbody>
// // // // // // //               {times.map((time, timeIndex) => (
// // // // // // //                 <tr key={timeIndex}>
// // // // // // //                   <TimeColumn>{time}</TimeColumn>
// // // // // // //                   {days.map((day, dayIndex) => {
// // // // // // //                     const entry = timetable[className]?.[day]?.find(slot => slot.time === time);

// // // // // // //                     return (
// // // // // // //                       <Td key={dayIndex}>
// // // // // // //                         {entry ? (
// // // // // // //                           <>
// // // // // // //                             <strong>Subject: {entry.subject}</strong> <br />
// // // // // // //                             Teacher: {entry.teacher} <br />
// // // // // // //                             Room: {entry.room}
// // // // // // //                           </>
// // // // // // //                         ) : (
// // // // // // //                           "No Class"
// // // // // // //                         )}
// // // // // // //                       </Td>
// // // // // // //                     );
// // // // // // //                   })}
// // // // // // //                 </tr>
// // // // // // //               ))}
// // // // // // //             </tbody>
// // // // // // //           </Table>

// // // // // // //           {/* ✅ Display Well-Structured JSON Output */}
// // // // // // //           <JsonOutput>
// // // // // // //             <strong>JSON Output:</strong>
// // // // // // //             {JSON.stringify({ [className]: timetable[className] }, null, 2)}
// // // // // // //           </JsonOutput>
// // // // // // //         </TableContainer>
// // // // // // //       ))}
// // // // // // //     </Container>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default ResultTimeTable;



// // // // // // // import React from "react";
// // // // // // import { useLocation } from "react-router-dom";
// // // // // // import styled from "styled-components";

// // // // // // // Styled Component for JSON Output Display
// // // // // // const JsonOutput = styled.pre`
// // // // // //   background-color: black;
// // // // // //   color: limegreen;
// // // // // //   padding: 20px;
// // // // // //   margin-top: 20px;
// // // // // //   border-radius: 5px;
// // // // // //   overflow-x: auto;
// // // // // //   white-space: pre-wrap;
// // // // // //   word-wrap: break-word;
// // // // // //   font-size: 1rem;
// // // // // // `;

// // // // // // const Title = styled.h1`
// // // // // //   text-align: center;
// // // // // //   color: white;
// // // // // //   background-color: #e69a2a;
// // // // // //   padding: 10px;
// // // // // //   border-radius: 10px;
// // // // // //   margin: 20px 0;
// // // // // // `;

// // // // // // const Container = styled.div`
// // // // // //   padding: 20px;
// // // // // //   max-width: 1000px;
// // // // // //   margin: auto;
// // // // // //   background-color: #f7c873;
// // // // // //   min-height: 100vh;
// // // // // //   border-radius: 10px;
// // // // // // `;

// // // // // // const NoDataMessage = styled.p`
// // // // // //   text-align: center;
// // // // // //   font-size: 1.5rem;
// // // // // //   color: red;
// // // // // //   margin-top: 20px;
// // // // // // `;

// // // // // // const ResultTimeTable = () => {
// // // // // //   const { state } = useLocation();

// // // // // //   console.log("✅ Received State:", state);

// // // // // //   // Extracting timetable data with fallbacks
// // // // // //   const { timetable = {}, message = "✅ Timetable generated successfully!" } = state || {};

// // // // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <Container>
// // // // // //       <Title>Generated Timetable (JSON Format)</Title>

// // // // // //       {/* ✅ Display Well-Structured JSON Output */}
// // // // // //       <JsonOutput>{JSON.stringify({ message, timetable }, null, 2)}</JsonOutput>
// // // // // //     </Container>
// // // // // //   );
// // // // // // };

// // // // // // export default ResultTimeTable;


// // // // // // import React from "react";
// // // // // // import { useLocation } from "react-router-dom";
// // // // // // import styled from "styled-components";

// // // // // // // Styled Components
// // // // // // const Container = styled.div`
// // // // // //   padding: 20px;
// // // // // //   max-width: 1000px;
// // // // // //   margin: auto;
// // // // // //   background-color: #f7c873;
// // // // // //   min-height: 100vh;
// // // // // //   border-radius: 10px;
// // // // // //   display: flex;
// // // // // //   flex-direction: column;
// // // // // //   align-items: center;
// // // // // // `;

// // // // // // const Title = styled.h1`
// // // // // //   text-align: center;
// // // // // //   color: white;
// // // // // //   background-color: #e69a2a;
// // // // // //   padding: 10px;
// // // // // //   border-radius: 10px;
// // // // // //   width: 100%;
// // // // // // `;

// // // // // // const JsonOutput = styled.pre`
// // // // // //   background-color: black;
// // // // // //   color: limegreen;
// // // // // //   padding: 15px;
// // // // // //   margin-top: 20px;
// // // // // //   border-radius: 5px;
// // // // // //   overflow-x: auto;
// // // // // //   width: 90%;
// // // // // //   max-width: 800px;
// // // // // //   text-align: left;
// // // // // // `;

// // // // // // const NoDataMessage = styled.p`
// // // // // //   text-align: center;
// // // // // //   font-size: 1.5rem;
// // // // // //   color: red;
// // // // // //   margin-top: 20px;
// // // // // // `;

// // // // // // const ResultTimeTable = () => {
// // // // // //   const location = useLocation();
// // // // // //   console.log("✅ State Object:", location.state);

// // // // // //   // Ensure we properly extract timetable data from state
// // // // // //   const timetableData = location.state?.timetable;
  
// // // // // //   if (!timetableData || Object.keys(timetableData).length === 0) {
// // // // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // // // //   }

// // // // // //   console.log("✅ Received Timetable JSON:", JSON.stringify(timetableData, null, 2));

// // // // // //   return (
// // // // // //     <Container>
// // // // // //       <Title>Generated Timetable JSON Output</Title>

// // // // // //       {/* ✅ Display Well-Formatted JSON */}
// // // // // //       <JsonOutput>
// // // // // //         {JSON.stringify(timetableData, null, 2)}
// // // // // //       </JsonOutput>
// // // // // //     </Container>
// // // // // //   );
// // // // // // };

// // // // // // export default ResultTimeTable;






// // // // // // import React from "react";
// // // // // // import { useLocation } from "react-router-dom";
// // // // // // import styled from "styled-components";

// // // // // // // Styled Components
// // // // // // const Container = styled.div`
// // // // // //   padding: 20px;
// // // // // //   max-width: 1000px;
// // // // // //   margin: auto;
// // // // // //   background-color: #f7c873;
// // // // // //   min-height: 100vh;
// // // // // // `;

// // // // // // const Title = styled.h1`
// // // // // //   text-align: center;
// // // // // //   color: white;
// // // // // //   background-color: #e69a2a;
// // // // // //   padding: 10px;
// // // // // //   border-radius: 10px;
// // // // // // `;

// // // // // // const JsonOutput = styled.pre`
// // // // // //   background-color: black;
// // // // // //   color: limegreen;
// // // // // //   padding: 15px;
// // // // // //   overflow-x: auto;
// // // // // // `;

// // // // // // const ResultTimeTable = () => {
// // // // // //   const location = useLocation();
// // // // // //   const timetableData = location.state?.timetable;

// // // // // //   return (
// // // // // //     <Container>
// // // // // //       <Title>Generated Timetable JSON Output</Title>
// // // // // //       <JsonOutput>{JSON.stringify(timetableData, null, 2)}</JsonOutput>
// // // // // //     </Container>
// // // // // //   );
// // // // // // };

// // // // // // export default ResultTimeTable;



















// // // // // import React from "react";
// // // // // import { useLocation } from "react-router-dom";
// // // // // import styled from "styled-components";

// // // // // // Styled Components
// // // // // const Container = styled.div`
// // // // //   padding: 20px;
// // // // //   max-width: 1000px;
// // // // //   margin: auto;
// // // // //   background-color: #f7c873;
// // // // //   min-height: 100vh;
// // // // //   border-radius: 10px;
// // // // //   display: flex;
// // // // //   flex-direction: column;
// // // // //   align-items: center;
// // // // // `;

// // // // // const Title = styled.h1`
// // // // //   text-align: center;
// // // // //   color: white;
// // // // //   background-color: #e69a2a;
// // // // //   padding: 10px;
// // // // //   border-radius: 10px;
// // // // //   width: 100%;
// // // // // `;

// // // // // const TableContainer = styled.div`
// // // // //   background-color: white;
// // // // //   padding: 20px;
// // // // //   border-radius: 10px;
// // // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // // //   margin-top: 20px;
// // // // //   width: 100%;
// // // // // `;

// // // // // const Table = styled.table`
// // // // //   width: 100%;
// // // // //   border-collapse: collapse;
// // // // //   text-align: center;
// // // // // `;

// // // // // const Th = styled.th`
// // // // //   background-color: #ff785a;
// // // // //   color: white;
// // // // //   font-size: 1.2rem;
// // // // //   padding: 15px;
// // // // //   border: 1px solid #ddd;
// // // // // `;

// // // // // const Td = styled.td`
// // // // //   border: 1px solid #ddd;
// // // // //   padding: 15px;
// // // // //   font-size: 1rem;
// // // // //   font-weight: bold;
// // // // //   background-color: #fffaf2;
// // // // //   transition: all 0.3s ease-in-out;
// // // // //   &:hover {
// // // // //     background-color: #ffdac1;
// // // // //     transform: scale(1.05);
// // // // //   }
// // // // // `;

// // // // // const TimeColumn = styled.th`
// // // // //   background-color: #add8e6;
// // // // //   color: black;
// // // // //   font-size: 1.2rem;
// // // // //   padding: 15px;
// // // // //   border: 1px solid #ddd;
// // // // // `;

// // // // // const NoDataMessage = styled.p`
// // // // //   text-align: center;
// // // // //   font-size: 1.5rem;
// // // // //   color: red;
// // // // //   margin-top: 20px;
// // // // // `;

// // // // // const JsonOutput = styled.pre`
// // // // //   background-color: black;
// // // // //   color: limegreen;
// // // // //   padding: 15px;
// // // // //   overflow-x: auto;
// // // // //   width: 90%;
// // // // //   max-width: 800px;
// // // // //   text-align: left;
// // // // // `;

// // // // // const ResultTimeTable = () => {
// // // // //   const location = useLocation();
// // // // //   console.log("✅ State Object:", location.state);

// // // // //   // Ensure we properly extract timetable data from state
// // // // //   const timetableData = location.state?.timetable;
// // // // //   const workingDays = location.state?.workingDays || [];
// // // // //   const classTimes = location.state?.classTimes || [];

// // // // //   if (!timetableData || Object.keys(timetableData).length === 0) {
// // // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // // //   }

// // // // //   console.log("✅ Received Timetable JSON:", JSON.stringify(timetableData, null, 2));

// // // // //   const classNames = Object.keys(timetableData);

// // // // //   return (
// // // // //     <Container>
// // // // //       <Title>Generated Timetable</Title>

// // // // //       {classNames.map((className, classIndex) => (
// // // // //         <TableContainer key={classIndex}>
// // // // //           <Title>Timetable for {className}</Title>
// // // // //           <Table>
// // // // //             <thead>
// // // // //               <tr>
// // // // //                 <TimeColumn>Time</TimeColumn>
// // // // //                 {workingDays.map((day, index) => (
// // // // //                   <Th key={index}>{day}</Th>
// // // // //                 ))}
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {classTimes.map((time, timeIndex) => (
// // // // //                 <tr key={timeIndex}>
// // // // //                   <TimeColumn>{time}</TimeColumn>
// // // // //                   {workingDays.map((day, dayIndex) => (
// // // // //                     <Td key={dayIndex}>
// // // // //                       {timetableData[className] &&
// // // // //                       timetableData[className][day] &&
// // // // //                       timetableData[className][day][timeIndex] ? (
// // // // //                         <>
// // // // //                           <strong>Subject: {timetableData[className][day][timeIndex].subject}</strong> <br />
// // // // //                           Teacher: {timetableData[className][day][timeIndex].teacher} <br />
// // // // //                           Room: {timetableData[className][day][timeIndex].room}
// // // // //                         </>
// // // // //                       ) : (
// // // // //                         "No Class"
// // // // //                       )}
// // // // //                     </Td>
// // // // //                   ))}
// // // // //                 </tr>
// // // // //               ))}
// // // // //             </tbody>
// // // // //           </Table>

// // // // //           {/* ✅ Display Raw JSON Data for Debugging */}
// // // // //           <JsonOutput>
// // // // //             <strong>JSON Output:</strong>
// // // // //             {JSON.stringify(timetableData[className], null, 2)}
// // // // //           </JsonOutput>
// // // // //         </TableContainer>
// // // // //       ))}
// // // // //     </Container>
// // // // //   );
// // // // // };

// // // // // export default ResultTimeTable;


// // // // import React from "react";
// // // // import { useLocation } from "react-router-dom";
// // // // import styled from "styled-components";

// // // // // Styled Components
// // // // const Container = styled.div`
// // // //   padding: 20px;
// // // //   max-width: 1200px;
// // // //   margin: auto;
// // // //   background-color: #f7c873;
// // // //   min-height: 100vh;
// // // //   border-radius: 10px;
// // // //   display: flex;
// // // //   flex-direction: column;
// // // //   align-items: center;
// // // // `;

// // // // const Title = styled.h1`
// // // //   text-align: center;
// // // //   color: white;
// // // //   background-color: #e69a2a;
// // // //   padding: 10px;
// // // //   border-radius: 10px;
// // // //   width: 100%;
// // // // `;

// // // // const TableContainer = styled.div`
// // // //   background-color: white;
// // // //   padding: 20px;
// // // //   border-radius: 10px;
// // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // //   margin-top: 20px;
// // // //   width: 100%;
// // // //   overflow-x: auto;
// // // // `;

// // // // const Table = styled.table`
// // // //   width: 100%;
// // // //   border-collapse: collapse;
// // // //   text-align: center;
// // // // `;

// // // // const Th = styled.th`
// // // //   background-color: #ff785a;
// // // //   color: white;
// // // //   font-size: 1.2rem;
// // // //   padding: 15px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const Td = styled.td`
// // // //   border: 1px solid #ddd;
// // // //   padding: 12px;
// // // //   font-size: 1rem;
// // // //   font-weight: bold;
// // // //   background-color: #fffaf2;
// // // //   transition: all 0.3s ease-in-out;
// // // //   &:hover {
// // // //     background-color: #ffdac1;
// // // //     transform: scale(1.05);
// // // //   }
// // // // `;

// // // // const TimeColumn = styled.th`
// // // //   background-color: #add8e6;
// // // //   color: black;
// // // //   font-size: 1.2rem;
// // // //   padding: 15px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const NoDataMessage = styled.p`
// // // //   text-align: center;
// // // //   font-size: 1.5rem;
// // // //   color: red;
// // // //   margin-top: 20px;
// // // // `;

// // // // const JsonOutput = styled.pre`
// // // //   background-color: black;
// // // //   color: limegreen;
// // // //   padding: 15px;
// // // //   overflow-x: auto;
// // // //   width: 90%;
// // // //   max-width: 800px;
// // // //   text-align: left;
// // // // `;

// // // // const ResultTimeTable = () => {
// // // //   const location = useLocation();
// // // //   const { timetable, workingDays, classTimes } = location.state || {};

// // // //   console.log("✅ State Object:", location.state);

// // // //   // Ensure `workingDays` and `classTimes` are properly extracted
// // // //   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday"];
// // // //   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9:00-10:00", "10:00-11:00"];

// // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // //   }

// // // //   console.log("✅ Received Timetable JSON:", JSON.stringify(timetable, null, 2));
// // // //   console.log("✅ Working Days:", days);
// // // //   console.log("✅ Class Times:", times);

// // // //   const classNames = Object.keys(timetable);

// // // //   return (
// // // //     <Container>
// // // //       <Title>Generated Timetable</Title>

// // // //       {classNames.map((className, classIndex) => (
// // // //         <TableContainer key={classIndex}>
// // // //           <Title>Timetable for {className}</Title>
// // // //           <Table>
// // // //             <thead>
// // // //               <tr>
// // // //                 <TimeColumn>Time</TimeColumn>
// // // //                 {days.map((day, index) => (
// // // //                   <Th key={index}>{day}</Th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {times.map((time, timeIndex) => (
// // // //                 <tr key={timeIndex}>
// // // //                   <Td><strong>{time}</strong></Td> {/* Time Column */}
// // // //                   {days.map((day, dayIndex) => {
// // // //                     const slot = timetable[className]?.[day]?.find(entry => entry.time === time);
// // // //                     return (
// // // //                       <Td key={dayIndex}>
// // // //                         {slot ? (
// // // //                           <>
// // // //                             <strong>Subject:</strong> {slot.subject} <br />
// // // //                             <strong>Teacher:</strong> {slot.teacher} <br />
// // // //                             <strong>Room:</strong> {slot.room}
// // // //                           </>
// // // //                         ) : (
// // // //                           "No Class"
// // // //                         )}
// // // //                       </Td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </Table>

// // // //           {/* ✅ Display JSON Data for Debugging */}
// // // //           <JsonOutput>
// // // //             <strong>JSON Output:</strong>
// // // //             {JSON.stringify(timetable[className], null, 2)}
// // // //           </JsonOutput>
// // // //         </TableContainer>
// // // //       ))}
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default ResultTimeTable;


// // // import React from "react";
// // // import { useLocation } from "react-router-dom";
// // // import styled from "styled-components";

// // // // Styled Components
// // // const Container = styled.div`
// // //   padding: 20px;
// // //   max-width: 1200px;
// // //   margin: auto;
// // //   background-color: #f7c873;
// // //   min-height: 100vh;
// // //   border-radius: 10px;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // // `;

// // // const Title = styled.h1`
// // //   text-align: center;
// // //   color: white;
// // //   background-color: #e69a2a;
// // //   padding: 10px;
// // //   border-radius: 10px;
// // //   width: 100%;
// // // `;

// // // const TableContainer = styled.div`
// // //   background-color: white;
// // //   padding: 20px;
// // //   border-radius: 10px;
// // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // //   margin-top: 20px;
// // //   width: 100%;
// // //   overflow-x: auto;
// // // `;

// // // const Table = styled.table`
// // //   width: 100%;
// // //   border-collapse: collapse;
// // //   text-align: center;
// // // `;

// // // const Th = styled.th`
// // //   background-color: #ff785a;
// // //   color: white;
// // //   font-size: 1.2rem;
// // //   padding: 15px;
// // //   border: 1px solid #ddd;
// // // `;

// // // const Td = styled.td`
// // //   border: 1px solid #ddd;
// // //   padding: 12px;
// // //   font-size: 1rem;
// // //   font-weight: bold;
// // //   background-color: #fffaf2;
// // //   transition: all 0.3s ease-in-out;
// // //   &:hover {
// // //     background-color: #ffdac1;
// // //     transform: scale(1.05);
// // //   }
// // // `;

// // // const TimeColumn = styled.th`
// // //   background-color: #add8e6;
// // //   color: black;
// // //   font-size: 1.2rem;
// // //   padding: 15px;
// // //   border: 1px solid #ddd;
// // // `;

// // // const NoDataMessage = styled.p`
// // //   text-align: center;
// // //   font-size: 1.5rem;
// // //   color: red;
// // //   margin-top: 20px;
// // // `;

// // // const JsonOutput = styled.pre`
// // //   background-color: black;
// // //   color: limegreen;
// // //   padding: 15px;
// // //   overflow-x: auto;
// // //   width: 90%;
// // //   max-width: 800px;
// // //   text-align: left;
// // // `;

// // // const ResultTimeTable = () => {
// // //   const location = useLocation();
// // //   const { timetable, workingDays, classTimes } = location.state || {};

// // //   console.log("✅ State Object:", location.state);

// // //   // Ensure `workingDays` and `classTimes` are properly extracted
// // //   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday"];
// // //   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9:00-10:00", "10:00-11:00"];

// // //   if (!timetable || Object.keys(timetable).length === 0) {
// // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // //   }

// // //   console.log("✅ Received Timetable JSON:", JSON.stringify(timetable, null, 2));
// // //   console.log("✅ Working Days:", days);
// // //   console.log("✅ Class Times:", times);

// // //   const classNames = Object.keys(timetable);

// // //   return (
// // //     <Container>
// // //       <Title>Generated Timetable</Title>

// // //       {classNames.map((className, classIndex) => (
// // //         <TableContainer key={classIndex}>
// // //           <Title>Timetable for {className}</Title>
// // //           <Table>
// // //             <thead>
// // //               <tr>
// // //                 <TimeColumn>Time</TimeColumn>
// // //                 {days.map((day, index) => (
// // //                   <Th key={index}>{day}</Th>
// // //                 ))}
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {times.map((time, timeIndex) => (
// // //                 <tr key={timeIndex}>
// // //                   <Td><strong>{time}</strong></Td> {/* Time Column */}
// // //                   {days.map((day, dayIndex) => {
// // //                     const slot = timetable[className]?.[day]?.find(entry => entry.time === time);
// // //                     return (
// // //                       <Td key={dayIndex}>
// // //                         {slot ? (
// // //                           <>
// // //                             <strong>Subject:</strong> {slot.subject} <br />
// // //                             <strong>Teacher:</strong> {slot.teacher} <br />
// // //                             <strong>Room:</strong> {slot.room}
// // //                           </>
// // //                         ) : (
// // //                           "No Class"
// // //                         )}
// // //                       </Td>
// // //                     );
// // //                   })}
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </Table>

// // //           {/* ✅ Display JSON Data for Debugging */}
// // //           <JsonOutput>
// // //             <strong>JSON Output:</strong>
// // //             {JSON.stringify(timetable[className], null, 2)}
// // //           </JsonOutput>
// // //         </TableContainer>
// // //       ))}
// // //     </Container>
// // //   );
// // // };

// // // export default ResultTimeTable;


// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import styled from "styled-components";

// // // Styled Components
// // const Container = styled.div`
// //   padding: 20px;
// //   max-width: 1200px;
// //   margin: auto;
// //   background-color: #f7c873;
// //   min-height: 100vh;
// //   border-radius: 10px;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// // `;

// // const Title = styled.h1`
// //   text-align: center;
// //   color: white;
// //   background-color: #e69a2a;
// //   padding: 10px;
// //   border-radius: 10px;
// //   width: 100%;
// // `;

// // const TableContainer = styled.div`
// //   background-color: white;
// //   padding: 20px;
// //   border-radius: 10px;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// //   margin-top: 20px;
// //   width: 100%;
// //   overflow-x: auto;
// // `;

// // const Table = styled.table`
// //   width: 100%;
// //   border-collapse: collapse;
// //   text-align: center;
// // `;

// // const Th = styled.th`
// //   background-color: #ff785a;
// //   color: white;
// //   font-size: 1.2rem;
// //   padding: 15px;
// //   border: 1px solid #ddd;
// // `;

// // const Td = styled.td`
// //   border: 1px solid #ddd;
// //   padding: 12px;
// //   font-size: 1rem;
// //   font-weight: bold;
// //   background-color: #fffaf2;
// //   transition: all 0.3s ease-in-out;
// //   &:hover {
// //     background-color: #ffdac1;
// //     transform: scale(1.05);
// //   }
// // `;

// // const TimeColumn = styled.th`
// //   background-color: #add8e6;
// //   color: black;
// //   font-size: 1.2rem;
// //   padding: 15px;
// //   border: 1px solid #ddd;
// // `;

// // const NoDataMessage = styled.p`
// //   text-align: center;
// //   font-size: 1.5rem;
// //   color: red;
// //   margin-top: 20px;
// // `;

// // const JsonOutput = styled.pre`
// //   background-color: black;
// //   color: limegreen;
// //   padding: 15px;
// //   overflow-x: auto;
// //   width: 90%;
// //   max-width: 800px;
// //   text-align: left;
// // `;

// // const ResultTimeTable = () => {
// //   const location = useLocation();
// //   const { timetable, workingDays = [], classTimes = [] } = location.state || {};

// //   console.log("✅ Received Timetable JSON:", JSON.stringify(timetable, null, 2));
// //   console.log("✅ Working Days:", workingDays.length > 0 ? workingDays : "❌ No working days provided!");
// //   console.log("✅ Class Times:", classTimes.length > 0 ? classTimes : "❌ No class times provided!");

// //   if (!timetable || Object.keys(timetable).length === 0) {
// //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// //   }

// //   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday", "Wednesday"];
// //   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9-10", "10-11", "11-12"];

// //   const classNames = Object.keys(timetable);

// //   return (
// //     <Container>
// //       <Title>Generated Timetable</Title>

// //       {classNames.map((className, classIndex) => (
// //         <TableContainer key={classIndex}>
// //           <Title>Timetable for {className}</Title>
// //           <Table>
// //             <thead>
// //               <tr>
// //                 <TimeColumn>Time</TimeColumn>
// //                 {days.map((day, index) => (
// //                   <Th key={index}>{day}</Th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {times.map((time, timeIndex) => (
// //                 <tr key={timeIndex}>
// //                   <Td><strong>{time}</strong></Td> {/* Time Column */}
// //                   {days.map((day, dayIndex) => {
// //                     const slots = timetable[className]?.[day] || [];
// //                     const matchedSlot = slots.find(slot => slot.time === time);

// //                     return (
// //                       <Td key={dayIndex}>
// //                         {matchedSlot ? (
// //                           <>
// //                             <strong>Subject:</strong> {matchedSlot.subject} <br />
// //                             <strong>Teacher:</strong> {matchedSlot.teacher} <br />
// //                             <strong>Room:</strong> {matchedSlot.room}
// //                           </>
// //                         ) : (
// //                           "No Class"
// //                         )}
// //                       </Td>
// //                     );
// //                   })}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>

// //           {/* ✅ Display JSON Data for Debugging */}
// //           <JsonOutput>
// //             <strong>JSON Output:</strong>
// //             {JSON.stringify(timetable[className], null, 2)}
// //           </JsonOutput>
// //         </TableContainer>
// //       ))}
// //     </Container>
// //   );
// // };

// // export default ResultTimeTable;
// //this is final 1

// import React from "react";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";

// // Styled Components
// const Container = styled.div`
//   padding: 20px;
//   max-width: 1200px;
//   margin: auto;
//   background-color: #f7c873;
//   min-height: 100vh;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h1`
//   text-align: center;
//   color: white;
//   background-color: #e69a2a;
//   padding: 10px;
//   border-radius: 10px;
//   width: 100%;
// `;

// const TableContainer = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   margin-top: 20px;
//   width: 100%;
//   overflow-x: auto;
//   margin-bottom: 30px; /* Adds space between tables */
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   text-align: center;
// `;

// const Th = styled.th`
//   background-color: #ff785a;
//   color: white;
//   font-size: 1.2rem;
//   padding: 15px;
//   border: 1px solid #ddd;
// `;

// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 12px;
//   font-size: 1rem;
//   font-weight: bold;
//   background-color: #fffaf2;
//   transition: all 0.3s ease-in-out;
//   &:hover {
//     background-color: #ffdac1;
//     transform: scale(1.05);
//   }
// `;

// const TimeColumn = styled.th`
//   background-color: #add8e6;
//   color: black;
//   font-size: 1.2rem;
//   padding: 15px;
//   border: 1px solid #ddd;
// `;

// const NoDataMessage = styled.p`
//   text-align: center;
//   font-size: 1.5rem;
//   color: red;
//   margin-top: 20px;
// `;

// const ResultTimeTable = () => {
//   const location = useLocation();
//   const { timetable, workingDays = [], classTimes = [] } = location.state || {};

//   console.log("✅ Received Timetable JSON:", JSON.stringify(timetable, null, 2));
//   console.log("✅ Working Days:", workingDays.length > 0 ? workingDays : "❌ No working days provided!");
//   console.log("✅ Class Times:", classTimes.length > 0 ? classTimes : "❌ No class times provided!");

//   if (!timetable || Object.keys(timetable).length === 0) {
//     return <NoDataMessage>No timetable data found.</NoDataMessage>;
//   }

//   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday", "Wednesday"];
//   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9-10", "10-11", "11-12"];

//   const classNames = Object.keys(timetable);

//   return (
//     <Container>
//       <Title>Generated Timetable</Title>

//       {classNames.map((className, classIndex) => (
//         <TableContainer key={classIndex}>
//           <Title>Timetable for {className}</Title>
//           <Table>
//             <thead>
//               <tr>
//                 <TimeColumn>Time</TimeColumn>
//                 {days.map((day, index) => (
//                   <Th key={index}>{day}</Th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {times.map((time, timeIndex) => (
//                 <tr key={timeIndex}>
//                   <Td><strong>{time}</strong></Td> {/* Time Column */}
//                   {days.map((day, dayIndex) => {
//                     const slots = timetable[className]?.[day] || [];
//                     const matchedSlot = slots.find(slot => slot.time === time);

//                     return (
//                       <Td key={dayIndex}>
//                         {matchedSlot ? (
//                           <>
//                             <strong>Subject:</strong> {matchedSlot.subject} <br />
//                             <strong>Teacher:</strong> {matchedSlot.teacher} <br />
//                             <strong>Room:</strong> {matchedSlot.room}
//                           </>
//                         ) : (
//                           "No Class"
//                         )}
//                       </Td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </TableContainer>
//       ))}
//     </Container>
//   );
// };

// export default ResultTimeTable;


import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled Components for Clean and Modern UI
const Container = styled.div`
  padding: 50px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  overflow-x: auto;
`;

const SubTitle = styled.h2`
  text-align: center;
  color: #333;
  background-color: #ff785a;
  padding: 10px;
  border-radius: 10px;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #ff785a;
  color: white;
  font-size: 1.2rem;
  padding: 12px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 15px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #fffaf2;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ffdac1;
    transform: scale(1.05);
  }
`;

const TimeColumn = styled.th`
  background-color: #add8e6;
  color: black;
  font-size: 1.2rem;
  padding: 12px;
  border: 1px solid #ddd;
`;

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: red;
  margin-top: 20px;
`;

const ResultTimeTable = () => {
  const location = useLocation();
  const { timetable, workingDays = [], classTimes = [] } = location.state || {};

  console.log("✅ Received Timetable JSON:", JSON.stringify(timetable, null, 2));
  console.log("✅ Working Days:", workingDays.length > 0 ? workingDays : "❌ No working days provided!");
  console.log("✅ Class Times:", classTimes.length > 0 ? classTimes : "❌ No class times provided!");

  if (!timetable || Object.keys(timetable).length === 0) {
    return <NoDataMessage>No timetable data found.</NoDataMessage>;
  }

  const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday", "Wednesday"];
  const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9-10", "10-11", "11-12"];

  const classNames = Object.keys(timetable);

  return (
    <Container>
      <Title>Generated Timetable</Title>

      {classNames.map((className, classIndex) => (
        <TableContainer key={classIndex}>
          <SubTitle>{className} - Timetable</SubTitle>
          <Table>
            <thead>
              <tr>
                <TimeColumn>Time</TimeColumn>
                {days.map((day, index) => (
                  <Th key={index}>{day}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, timeIndex) => (
                <tr key={timeIndex}>
                  <Td><strong>{time}</strong></Td> {/* Time Column */}
                  {days.map((day, dayIndex) => {
                    const slots = timetable[className]?.[day] || [];
                    const matchedSlot = slots.find(slot => slot.time === time);

                    return (
                      <Td key={dayIndex}>
                        {matchedSlot ? (
                          <>
                            <strong>Subject : {matchedSlot.subject}</strong> <br />
                            <span style={{ color: "#000" }}>👨‍🏫 Teacher : {matchedSlot.teacher}</span> <br />
                            <span style={{ color: "#000" }}>🏫 Room : {matchedSlot.room}</span>
                          </>
                        ) : (
                          "No Class"
                        )}
                      </Td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      ))}
    </Container>
  );
};

export default ResultTimeTable;
