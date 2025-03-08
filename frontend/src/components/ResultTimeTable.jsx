

// // // export default ResultTimeTable;
// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import styled from "styled-components";

// // // Styled Components (unchanged)
// // const Container = styled.div`
// //   padding: 20px;
// //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// //   min-height: 100vh;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   flex-direction: column;
// // `;

// // const Title = styled.h1`
// //   color: #fff;
// //   font-size: 2.5rem;
// //   text-align: center;
// //   margin-bottom: 20px;
// // `;

// // const TableContainer = styled.div`
// //   background-color: rgba(255, 255, 255, 0.9);
// //   padding: 20px;
// //   border-radius: 10px;
// //   width: 100%;
// //   max-width: 1200px;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// //   margin-bottom: 30px;
// //   overflow-x: auto;
// // `;

// // const SubTitle = styled.h2`
// //   text-align: center;
// //   color: #333;
// //   background-color: #ff785a;
// //   padding: 10px;
// //   border-radius: 10px;
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   margin-bottom: 15px;
// //   color: white;
// // `;

// // const RoomInfo = styled.div`
// //   text-align: center;
// //   font-size: 1.2rem;
// //   color: #333;
// //   margin-bottom: 10px;
// //   font-weight: bold;
// // `;

// // const Table = styled.table`
// //   width: 100%;
// //   border-collapse: collapse;
// //   text-align: center;
// //   background-color: white;
// //   border-radius: 10px;
// //   overflow: hidden;
// // `;

// // const Th = styled.th`
// //   background-color: #ff785a;
// //   color: white;
// //   font-size: 1.1rem;
// //   padding: 12px;
// //   border: 1px solid #ddd;
// // `;

// // const Td = styled.td`
// //   border: 1px solid #ddd;
// //   padding: 10px;
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
// //   font-size: 1.1rem;
// //   padding: 12px;
// //   border: 1px solid #ddd;
// // `;

// // const LabSlot = styled.div`
// //   background-color: #e6f7ff;
// //   padding: 10px;
// //   border-radius: 5px;
// //   margin: 5px 0;
// //   text-align: left;
// // `;

// // const NoDataMessage = styled.p`
// //   text-align: center;
// //   font-size: 1.5rem;
// //   color: red;
// //   margin-top: 20px;
// // `;

// // const ResultTimeTable = () => {
// //   const location = useLocation();
// //   const {
// //     timetable,
// //     workingDays = [],
// //     classTimes = [],
// //     classRoomAssignment = {},
// //     labRoomAssignment = {},
// //   } = location.state || {};

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
// //           <SubTitle>{className} - Timetable</SubTitle>
// //           <RoomInfo>Class Room: {classRoomAssignment[className] || "Not Assigned"}</RoomInfo>
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
// //               {times.map((time, timeIndex) => {
// //                 const isLabTime = timetable[className]?.[days[0]]?.some(
// //                   (slot) => slot.time === time && slot.type === "Lab"
// //                 );

// //                 return (
// //                   <React.Fragment key={timeIndex}>
// //                     {/* Regular Class Slot */}
// //                     <tr>
// //                       <Td><strong>{time}</strong></Td>
// //                       {days.map((day, dayIndex) => {
// //                         const slots = timetable[className]?.[day] || [];
// //                         const matchedSlot = slots.find((slot) => slot.time === time && slot.type !== "Lab");

// //                         return (
// //                           <Td key={dayIndex}>
// //                             {matchedSlot ? (
// //                               <>
// //                                 <strong>Subject: {matchedSlot.subject}</strong> <br />
// //                                 <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
// //                               </>
// //                             ) : (
// //                               "No Class"
// //                             )}
// //                           </Td>
// //                         );
// //                       })}
// //                     </tr>

// //                     {/* Lab Slot */}
// //                     {isLabTime && (
// //                       <tr>
// //                         <Td><strong>Lab</strong></Td>
// //                         {days.map((day, dayIndex) => {
// //                           const slots = timetable[className]?.[day] || [];
// //                           const matchedLabSlot = slots.find((slot) => slot.time === time && slot.type === "Lab");

// //                           return (
// //                             <Td key={dayIndex}>
// //                               {matchedLabSlot ? (
// //                                 <LabSlot>
// //                                   <strong>Lab Session</strong> <br />
// //                                   {matchedLabSlot.slots.map((labSlot, labIndex) => (
// //                                     <div key={labIndex}>
// //                                       <span>Batch: {labSlot.batch}</span> <br />
// //                                       <span>Subject: {labSlot.subject}</span> <br />
// //                                       <span>🏫 Lab: {labSlot.lab}</span>
// //                                     </div>
// //                                   ))}
// //                                 </LabSlot>
// //                               ) : (
// //                                 "No Lab"
// //                               )}
// //                             </Td>
// //                           );
// //                         })}
// //                       </tr>
// //                     )}
// //                   </React.Fragment>
// //                 );
// //               })}
// //             </tbody>
// //           </Table>
// //         </TableContainer>
// //       ))}
// //     </Container>
// //   );
// // };

// // export default ResultTimeTable;
// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import styled from "styled-components";

// // // Styled Components (unchanged)
// // const Container = styled.div`
// //   padding: 20px;
// //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// //   min-height: 100vh;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   flex-direction: column;
// // `;

// // const Title = styled.h1`
// //   color: #fff;
// //   font-size: 2.5rem;
// //   text-align: center;
// //   margin-bottom: 20px;
// // `;

// // const TableContainer = styled.div`
// //   background-color: rgba(255, 255, 255, 0.9);
// //   padding: 20px;
// //   border-radius: 10px;
// //   width: 100%;
// //   max-width: 1200px;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// //   margin-bottom: 30px;
// //   overflow-x: auto;
// // `;

// // const SubTitle = styled.h2`
// //   text-align: center;
// //   color: #333;
// //   background-color: #ff785a;
// //   padding: 10px;
// //   border-radius: 10px;
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   margin-bottom: 15px;
// //   color: white;
// // `;

// // const RoomInfo = styled.div`
// //   text-align: center;
// //   font-size: 1.2rem;
// //   color: #333;
// //   margin-bottom: 10px;
// //   font-weight: bold;
// // `;

// // const Table = styled.table`
// //   width: 100%;
// //   border-collapse: collapse;
// //   text-align: center;
// //   background-color: white;
// //   border-radius: 10px;
// //   overflow: hidden;
// // `;

// // const Th = styled.th`
// //   background-color: #ff785a;
// //   color: white;
// //   font-size: 1.1rem;
// //   padding: 12px;
// //   border: 1px solid #ddd;
// // `;

// // const Td = styled.td`
// //   border: 1px solid #ddd;
// //   padding: 10px;
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
// //   font-size: 1.1rem;
// //   padding: 12px;
// //   border: 1px solid #ddd;
// // `;

// // const LabSlot = styled.div`
// //   background-color: #e6f7ff;
// //   padding: 10px;
// //   border-radius: 5px;
// //   margin: 5px 0;
// //   text-align: left;
// // `;

// // const NoDataMessage = styled.p`
// //   text-align: center;
// //   font-size: 1.5rem;
// //   color: red;
// //   margin-top: 20px;
// // `;

// // const ResultTimeTable = () => {
// //   const location = useLocation();
// //   const {
// //     timetable,
// //     workingDays = [],
// //     classTimes = [],
// //     classRoomAssignment = {},
// //   } = location.state || {};

// //   console.log("Timetable Data:", timetable);
// //   console.log("Working Days:", workingDays);
// //   console.log("Class Times:", classTimes);
// //   console.log("Class Room Assignment:", classRoomAssignment);

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
// //           <SubTitle>{className} - Timetable</SubTitle>
// //           <RoomInfo>Class Room: {classRoomAssignment[className] || "Not Assigned"}</RoomInfo>
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
// //               {/* Regular Class Rows */}
// //               {times.map((time, timeIndex) => (
// //                 <tr key={timeIndex}>
// //                   <Td><strong>{time}</strong></Td>
// //                   {days.map((day, dayIndex) => {
// //                     const slots = timetable[className]?.[day] || [];
// //                     const matchedSlot = slots.find((slot) => slot.time === time && slot.type === "Class");

// //                     return (
// //                       <Td key={dayIndex}>
// //                         {matchedSlot ? (
// //                           <>
// //                             <strong>Subject: {matchedSlot.subject}</strong> <br />
// //                             <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
// //                           </>
// //                         ) : (
// //                           "No Class"
// //                         )}
// //                       </Td>
// //                     );
// //                   })}
// //                 </tr>
// //               ))}

// //               {/* Lab Row */}
// //               <tr>
// //                 <Td><strong>Lab Timing</strong></Td>
// //                 {days.map((day, dayIndex) => {
// //                   const slots = timetable[className]?.[day] || [];
// //                   const matchedLabSlot = slots.find((slot) => slot.type === "Lab");

// //                   return (
// //                     <Td key={dayIndex}>
// //                       {matchedLabSlot ? (
// //                         <LabSlot>
// //                           {/* <strong>Lab Session</strong> <br /> */}
// //                           {matchedLabSlot.slots.map((labSlot, labIndex) => (
// //                             <div key={labIndex}>
// //                               <span> {labSlot.batch}</span> <br />
// //                               <span>Subject: {labSlot.subject}</span> <br />
// //                               <span>🏫 Lab: {labSlot.lab}</span>
// //                             </div>
// //                           ))}
// //                         </LabSlot>
// //                       ) : (
// //                         "No Lab"
// //                       )}
// //                     </Td>
// //                   );
// //                 })}
// //               </tr>
// //             </tbody>
// //           </Table>
// //         </TableContainer>
// //       ))}
// //     </Container>
// //   );
// // };

// // export default ResultTimeTable;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";

// // Styled Components (unchanged)
// const Container = styled.div`
//   padding: 20px;
//   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const Title = styled.h1`
//   color: #fff;
//   font-size: 2.5rem;
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const TableContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.9);
//   padding: 20px;
//   border-radius: 10px;
//   width: 100%;
//   max-width: 1200px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   margin-bottom: 30px;
//   overflow-x: auto;
// `;

// const SubTitle = styled.h2`
//   text-align: center;
//   color: #333;
//   background-color: #ff785a;
//   padding: 10px;
//   border-radius: 10px;
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin-bottom: 15px;
//   color: white;
// `;

// const RoomInfo = styled.div`
//   text-align: center;
//   font-size: 1.2rem;
//   color: #333;
//   margin-bottom: 10px;
//   font-weight: bold;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   text-align: center;
//   background-color: white;
//   border-radius: 10px;
//   overflow: hidden;
// `;

// const Th = styled.th`
//   background-color: #ff785a;
//   color: white;
//   font-size: 1.1rem;
//   padding: 12px;
//   border: 1px solid #ddd;
// `;

// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 10px;
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
//   font-size: 1.1rem;
//   padding: 12px;
//   border: 1px solid #ddd;
// `;

// const LabSlot = styled.div`
//   background-color: #e6f7ff;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px 0;
//   text-align: left;
// `;

// const NoDataMessage = styled.p`
//   text-align: center;
//   font-size: 1.5rem;
//   color: red;
//   margin-top: 20px;
// `;

// const ResultTimeTable = () => {
//   const location = useLocation();
//   const {
//     timetable,
//     workingDays = [],
//     classTimes = [],
//     classRoomAssignment = {},
//   } = location.state || {};

//   console.log("Timetable Data:", timetable);
//   console.log("Working Days:", workingDays);
//   console.log("Class Times:", classTimes);
//   console.log("Class Room Assignment:", classRoomAssignment);

//   if (!timetable || Object.keys(timetable).length === 0) {
//     return <NoDataMessage>No timetable data found.</NoDataMessage>;
//   }

//   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday", "Wednesday"];
//   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9-10", "10-11", "11-12"];

//   const classNames = Object.keys(timetable);

//   // Function to assign a global room to each class
//   const assignGlobalRooms = (classNames, rooms) => {
//     const globalRoomAssignment = {};
//     classNames.forEach((className, index) => {
//       globalRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
//     });
//     return globalRoomAssignment;
//   };

//   // Get the list of available rooms from the timetable data or use a default list
//   const availableRooms = ["101", "102", "103"]; // Replace with actual rooms if available in the data
//   const globalRoomAssignment = assignGlobalRooms(classNames, availableRooms);

//   return (
//     <Container>
//       <Title>Generated Timetable</Title>

//       {classNames.map((className, classIndex) => (
//         <TableContainer key={classIndex}>
//           <SubTitle>{className} - Timetable</SubTitle>
//           <RoomInfo>Class Room: {globalRoomAssignment[className] || "Not Assigned"}</RoomInfo>
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
//               {/* Regular Class Rows */}
//               {times.map((time, timeIndex) => (
//                 <tr key={timeIndex}>
//                   <Td><strong>{time}</strong></Td>
//                   {days.map((day, dayIndex) => {
//                     const slots = timetable[className]?.[day] || [];
//                     const matchedSlot = slots.find((slot) => slot.time === time && slot.type === "Class");

//                     return (
//                       <Td key={dayIndex}>
//                         {matchedSlot ? (
//                           <>
//                             <strong>Subject: {matchedSlot.subject}</strong> <br />
//                             <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
//                           </>
//                         ) : (
//                           "No Class"
//                         )}
//                       </Td>
//                     );
//                   })}
//                 </tr>
//               ))}

//               {/* Lab Row */}
//               {/* <tr>
//                 <Td><strong>Lab Timing</strong></Td>
//                 {days.map((day, dayIndex) => {
//                   const slots = timetable[className]?.[day] || [];
//                   const matchedLabSlot = slots.find((slot) => slot.type === "Lab");

//                   return (
//                     <Td key={dayIndex}>
//                       {matchedLabSlot ? (
//                         <LabSlot>
//                           {matchedLabSlot.slots.map((labSlot, labIndex) => (
//                             <div key={labIndex}>
//                               <span> {labSlot.batch}</span> <br />
//                               <span>Subject: {labSlot.subject}</span> <br />
//                               <span>🏫 Lab: {labSlot.lab}</span>
//                             </div>
//                           ))}
//                         </LabSlot>
//                       ) : (
//                         "No Lab"
//                       )}
//                     </Td>
//                   );
//                 })}
//               </tr> */}
//               <tr>
//   <td style={{ textAlign: "center", fontWeight: "bold", padding: "10px", backgroundColor: "#f0f0f0" }}>
//     <strong>Lab Timing</strong>
//   </td>
//   {days.map((day, dayIndex) => {
//     const slots = timetable[className]?.[day] || [];
//     const matchedLabSlot = slots.find((slot) => slot.type === "Lab");

//     return (
//       <td
//         key={dayIndex}
//         style={{
//           textAlign: "center",
//           padding: "10px",
//           border: "1px solid #ddd",
//           backgroundColor: matchedLabSlot ? "#e8f5e9" : "#ffebee",
//         }}
//       >
//         {matchedLabSlot ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "8px",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {matchedLabSlot.slots.map((labSlot, labIndex) => (
//               <div
//                 key={labIndex}
//                 style={{
//                   padding: "8px",
//                   borderRadius: "4px",
//                   backgroundColor: "#ffffff",
//                   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                   width: "100%",
//                   maxWidth: "200px",
//                 }}
//               >
//                 <span style={{ fontWeight: "500", color: "#2e7d32" }}>Batch: {labSlot.batch}</span> <br />
//                 <span style={{ color: "#555" }}>Subject: {labSlot.subject}</span> <br />
//                 <span style={{ color: "#1976d2" }}>🏫 Lab: {labSlot.lab}</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <span style={{ color: "#d32f2f", fontStyle: "italic" }}>No Lab</span>
//         )}
//       </td>
//     );
//   })}
// </tr>
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

// Styled Components
const Container = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  overflow-x: auto;
`;

const SubTitle = styled.h2`
  text-align: center;
  color: #333;
  background-color: #ff785a;
  padding: 10px;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: white;
`;

const RoomInfo = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
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
  font-size: 1.1rem;
  padding: 12px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
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
  font-size: 1.1rem;
  padding: 12px;
  border: 1px solid #ddd;
`;

const LabSlot = styled.div`
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  text-align: center; /* Center-align text */
`;

const BatchDivider = styled.div`
  border-bottom: 1px solid #ccc;
  margin: 8px 0;
`;

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: red;
  margin-top: 20px;
`;

const ResultTimeTable = () => {
  const location = useLocation();
  const {
    timetable,
    workingDays = [],
    classTimes = [],
    classRoomAssignment = {},
  } = location.state || {};

  console.log("Timetable Data:", timetable);
  console.log("Working Days:", workingDays);
  console.log("Class Times:", classTimes);
  console.log("Class Room Assignment:", classRoomAssignment);

  if (!timetable || Object.keys(timetable).length === 0) {
    return <NoDataMessage>No timetable data found.</NoDataMessage>;
  }

  const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday", "Wednesday"];
  const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9-10", "10-11", "11-12"];

  const classNames = Object.keys(timetable);

  // Function to assign a global room to each class
  const assignGlobalRooms = (classNames, rooms) => {
    const globalRoomAssignment = {};
    classNames.forEach((className, index) => {
      globalRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
    });
    return globalRoomAssignment;
  };

  // Get the list of available rooms from the timetable data or use a default list
  const availableRooms = ["101", "102", "103"]; // Replace with actual rooms if available in the data
  const globalRoomAssignment = assignGlobalRooms(classNames, availableRooms);

  return (
    <Container>
      <Title>Generated Timetable</Title>

      {classNames.map((className, classIndex) => (
        <TableContainer key={classIndex}>
          <SubTitle>{className} - Timetable</SubTitle>
          <RoomInfo>Class Room: {globalRoomAssignment[className] || "Not Assigned"}</RoomInfo>
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
              {/* Regular Class Rows */}
              {times.map((time, timeIndex) => (
                <tr key={timeIndex}>
                  <Td><strong>{time}</strong></Td>
                  {days.map((day, dayIndex) => {
                    const slots = timetable[className]?.[day] || [];
                    const matchedSlot = slots.find((slot) => slot.time === time && slot.type === "Class");

                    return (
                      <Td key={dayIndex}>
                        {matchedSlot ? (
                          <>
                            <strong>Subject: {matchedSlot.subject}</strong> <br />
                            <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
                          </>
                        ) : (
                          "No Class"
                        )}
                      </Td>
                    );
                  })}
                </tr>
              ))}

              {/* Lab Row */}
              <tr>
                <Td><strong>Lab</strong></Td>
                {days.map((day, dayIndex) => {
                  const slots = timetable[className]?.[day] || [];
                  const matchedLabSlot = slots.find((slot) => slot.type === "Lab");

                  return (
                    <Td key={dayIndex}>
                      {matchedLabSlot ? (
                        <LabSlot>
                          {matchedLabSlot.slots.map((labSlot, labIndex) => (
                            <React.Fragment key={labIndex}>
                              <div>
                                <span>Batch: {labSlot.batch}</span> <br />
                                <span>Subject: {labSlot.subject}</span> <br />
                                <span>👨‍🏫 Teacher: {labSlot.teacher}</span> <br />
                                <span>🏫 Lab: {labSlot.lab}</span>
                              </div>
                              {labIndex < matchedLabSlot.slots.length - 1 && <BatchDivider />} {/* Add divider between batches */}
                            </React.Fragment>
                          ))}
                        </LabSlot>
                      ) : (
                        "No Lab"
                      )}
                    </Td>
                  );
                })}
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      ))}
    </Container>
  );
};

export default ResultTimeTable;