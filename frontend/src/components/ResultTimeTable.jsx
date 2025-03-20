

// // // // // import React from "react";
// // // // // import { useLocation } from "react-router-dom";
// // // // // import styled from "styled-components";

// // // // // // Styled Components
// // // // // const Container = styled.div`
// // // // //   padding: 20px;
// // // // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // // // //   min-height: 100vh;
// // // // //   display: flex;
// // // // //   justify-content: center;
// // // // //   align-items: center;
// // // // //   flex-direction: column;
// // // // // `;

// // // // // const Title = styled.h1`
// // // // //   color: #fff;
// // // // //   font-size: 2.5rem;
// // // // //   text-align: center;
// // // // //   margin-bottom: 20px;
// // // // // `;

// // // // // const TableContainer = styled.div`
// // // // //   background-color: rgba(255, 255, 255, 0.9);
// // // // //   padding: 20px;
// // // // //   border-radius: 10px;
// // // // //   width: 100%;
// // // // //   max-width: 1200px;
// // // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // // //   margin-bottom: 30px;
// // // // //   overflow-x: auto;
// // // // // `;

// // // // // const SubTitle = styled.h2`
// // // // //   text-align: center;
// // // // //   color: #333;
// // // // //   background-color: #ff785a;
// // // // //   padding: 10px;
// // // // //   border-radius: 10px;
// // // // //   font-size: 1.5rem;
// // // // //   font-weight: bold;
// // // // //   margin-bottom: 15px;
// // // // //   color: white;
// // // // // `;

// // // // // const RoomInfo = styled.div`
// // // // //   text-align: center;
// // // // //   font-size: 1.2rem;
// // // // //   color: #333;
// // // // //   margin-bottom: 10px;
// // // // //   font-weight: bold;
// // // // // `;

// // // // // const Table = styled.table`
// // // // //   width: 100%;
// // // // //   border-collapse: collapse;
// // // // //   text-align: center;
// // // // //   background-color: white;
// // // // //   border-radius: 10px;
// // // // //   overflow: hidden;
// // // // // `;

// // // // // const Th = styled.th`
// // // // //   background-color: #ff785a;
// // // // //   color: white;
// // // // //   font-size: 1.1rem;
// // // // //   padding: 12px;
// // // // //   border: 1px solid #ddd;
// // // // // `;

// // // // // const Td = styled.td`
// // // // //   border: 1px solid #ddd;
// // // // //   padding: 10px;
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
// // // // //   font-size: 1.1rem;
// // // // //   padding: 12px;
// // // // //   border: 1px solid #ddd;
// // // // // `;

// // // // // const LabSlot = styled.div`
// // // // //   background-color: #e6f7ff;
// // // // //   padding: 10px;
// // // // //   border-radius: 5px;
// // // // //   margin: 5px 0;
// // // // //   text-align: center; /* Center-align text */
// // // // // `;

// // // // // const BatchDivider = styled.div`
// // // // //   border-bottom: 1px solid #ccc;
// // // // //   margin: 8px 0;
// // // // // `;

// // // // // const NoDataMessage = styled.p`
// // // // //   text-align: center;
// // // // //   font-size: 1.5rem;
// // // // //   color: red;
// // // // //   margin-top: 20px;
// // // // // `;

// // // // // const ResultTimeTable = () => {
// // // // //   const location = useLocation();
// // // // //   const {
// // // // //     timetable,
// // // // //     workingDays = [],
// // // // //     classTimes = [],
// // // // //     classRoomAssignment = {},
// // // // //   } = location.state || {};

// // // // //   console.log("Timetable Data:", timetable);
// // // // //   console.log("Working Days:", workingDays);
// // // // //   console.log("Class Times:", classTimes);
// // // // //   console.log("Class Room Assignment:", classRoomAssignment);

// // // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // // //   }

// // // // //   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday", "Wednesday"];
// // // // //   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9-10", "10-11", "11-12"];

// // // // //   const classNames = Object.keys(timetable);

// // // // //   // Function to assign a global room to each class
// // // // //   const assignGlobalRooms = (classNames, rooms) => {
// // // // //     const globalRoomAssignment = {};
// // // // //     classNames.forEach((className, index) => {
// // // // //       globalRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
// // // // //     });
// // // // //     return globalRoomAssignment;
// // // // //   };

// // // // //   // Get the list of available rooms from the timetable data or use a default list
// // // // //   const availableRooms = ["101", "102", "103"]; // Replace with actual rooms if available in the data
// // // // //   const globalRoomAssignment = assignGlobalRooms(classNames, availableRooms);

// // // // //   return (
// // // // //     <Container>
// // // // //       <Title>Generated Timetable</Title>

// // // // //       {classNames.map((className, classIndex) => (
// // // // //         <TableContainer key={classIndex}>
// // // // //           <SubTitle>{className} - Timetable</SubTitle>
// // // // //           <RoomInfo>Class Room: {globalRoomAssignment[className] || "Not Assigned"}</RoomInfo>
// // // // //           <Table>
// // // // //             <thead>
// // // // //               <tr>
// // // // //                 <TimeColumn>Time</TimeColumn>
// // // // //                 {days.map((day, index) => (
// // // // //                   <Th key={index}>{day}</Th>
// // // // //                 ))}
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {/* Regular Class Rows */}
// // // // //               {times.map((time, timeIndex) => (
// // // // //                 <tr key={timeIndex}>
// // // // //                   <Td><strong>{time}</strong></Td>
// // // // //                   {days.map((day, dayIndex) => {
// // // // //                     const slots = Array.isArray(timetable[className]?.[day]?.classes) ? timetable[className][day].classes : [];
// // // // //                     const matchedSlot = slots.find((slot) => slot.time === time && slot.type === "Class");

// // // // //                     return (
// // // // //                       <Td key={dayIndex}>
// // // // //                         {matchedSlot ? (
// // // // //                           <>
// // // // //                             <strong>Subject: {matchedSlot.subject}</strong> <br />
// // // // //                             <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
// // // // //                           </>
// // // // //                         ) : (
// // // // //                           "No Class"
// // // // //                         )}
// // // // //                       </Td>
// // // // //                     );
// // // // //                   })}
// // // // //                 </tr>
// // // // //               ))}

// // // // //               {/* Lab Row */}
// // // // //               <tr>
// // // // //                 <Td><strong>Lab</strong></Td>
// // // // //                 {days.map((day, dayIndex) => {
// // // // //                   const labData = timetable[className]?.[day]?.lab;
// // // // //                   const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// // // // //                   return (
// // // // //                     <Td key={dayIndex}>
// // // // //                       {slots.length > 0 ? (
// // // // //                         <LabSlot>
// // // // //                           {slots.map((labSlot, labIndex) => (
// // // // //                             <React.Fragment key={labIndex}>
// // // // //                               <div>
// // // // //                                 <span>Batch: {labSlot.batch}</span> <br />
// // // // //                                 <span>Subject: {labSlot.subject}</span> <br />
// // // // //                                 <span>👨‍🏫 Teacher: {labSlot.teacher}</span> <br />
// // // // //                                 <span>🏫 Lab: {labSlot.lab}</span>
// // // // //                               </div>
// // // // //                               {labIndex < slots.length - 1 && <BatchDivider />} {/* Add divider between batches */}
// // // // //                             </React.Fragment>
// // // // //                           ))}
// // // // //                         </LabSlot>
// // // // //                       ) : (
// // // // //                         "No Lab"
// // // // //                       )}
// // // // //                     </Td>
// // // // //                   );
// // // // //                 })}
// // // // //               </tr>
// // // // //             </tbody>
// // // // //           </Table>
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
// // // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // // //   min-height: 100vh;
// // // //   display: flex;
// // // //   justify-content: center;
// // // //   align-items: center;
// // // //   flex-direction: column;
// // // // `;

// // // // const Title = styled.h1`
// // // //   color: #fff;
// // // //   font-size: 2.5rem;
// // // //   text-align: center;
// // // //   margin-bottom: 20px;
// // // // `;

// // // // const TableContainer = styled.div`
// // // //   background-color: rgba(255, 255, 255, 0.9);
// // // //   padding: 20px;
// // // //   border-radius: 10px;
// // // //   width: 100%;
// // // //   max-width: 1200px;
// // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // //   margin-bottom: 30px;
// // // //   overflow-x: auto;
// // // // `;

// // // // const SubTitle = styled.h2`
// // // //   text-align: center;
// // // //   color: #333;
// // // //   background-color: #ff785a;
// // // //   padding: 10px;
// // // //   border-radius: 10px;
// // // //   font-size: 1.5rem;
// // // //   font-weight: bold;
// // // //   margin-bottom: 15px;
// // // //   color: white;
// // // // `;

// // // // const RoomInfo = styled.div`
// // // //   text-align: center;
// // // //   font-size: 1.2rem;
// // // //   color: #333;
// // // //   margin-bottom: 10px;
// // // //   font-weight: bold;
// // // // `;

// // // // const Table = styled.table`
// // // //   width: 100%;
// // // //   border-collapse: collapse;
// // // //   text-align: center;
// // // //   background-color: white;
// // // //   border-radius: 10px;
// // // //   overflow: hidden;
// // // // `;

// // // // const Th = styled.th`
// // // //   background-color: #ff785a;
// // // //   color: white;
// // // //   font-size: 1.1rem;
// // // //   padding: 12px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const Td = styled.td`
// // // //   border: 1px solid #ddd;
// // // //   padding: 10px;
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
// // // //   font-size: 1.1rem;
// // // //   padding: 12px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const LabSlot = styled.div`
// // // //   background-color: #e6f7ff;
// // // //   padding: 10px;
// // // //   border-radius: 5px;
// // // //   margin: 5px 0;
// // // //   text-align: center;
// // // // `;

// // // // const BatchDivider = styled.div`
// // // //   border-bottom: 1px solid #ccc;
// // // //   margin: 8px 0;
// // // // `;

// // // // const NoDataMessage = styled.p`
// // // //   text-align: center;
// // // //   font-size: 1.5rem;
// // // //   color: red;
// // // //   margin-top: 20px;
// // // // `;

// // // // const ResultTimeTable = () => {
// // // //   const location = useLocation();
// // // //   const {
// // // //     timetable,
// // // //     workingDays = [],
// // // //     classTimes = [],
// // // //     classRoomAssignment = {},
// // // //   } = location.state || {};

// // // //   console.log("Timetable Data:", timetable);
// // // //   console.log("Working Days:", workingDays);
// // // //   console.log("Class Times:", classTimes);
// // // //   console.log("Class Room Assignment:", classRoomAssignment);

// // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // //   }

// // // //   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday", "Wednesday"];
// // // //   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9-10", "10-11", "11-12"];

// // // //   const classNames = Object.keys(timetable);

// // // //   // Function to assign a global room to each class
// // // //   const assignGlobalRooms = (classNames, rooms) => {
// // // //     const globalRoomAssignment = {};
// // // //     classNames.forEach((className, index) => {
// // // //       globalRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
// // // //     });
// // // //     return globalRoomAssignment;
// // // //   };

// // // //   // Get the list of available rooms from the timetable data or use a default list
// // // //   const availableRooms = ["101", "102", "103"]; // Replace with actual rooms if available in the data
// // // //   const globalRoomAssignment = assignGlobalRooms(classNames, availableRooms);

// // // //   return (
// // // //     <Container>
// // // //       <Title>Generated Timetable</Title>

// // // //       {classNames.map((className, classIndex) => (
// // // //         <TableContainer key={classIndex}>
// // // //           <SubTitle>{className} - Timetable</SubTitle>
// // // //           <RoomInfo>Class Room: {globalRoomAssignment[className] || "Not Assigned"}</RoomInfo>
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
// // // //               {/* Regular Class Rows */}
// // // //               {times.map((time, timeIndex) => (
// // // //                 <tr key={timeIndex}>
// // // //                   <Td><strong>{time}</strong></Td>
// // // //                   {days.map((day, dayIndex) => {
// // // //                     const dayData = timetable[className]?.[day];
// // // //                     const slots = Array.isArray(dayData?.classes) ? dayData.classes : [];
// // // //                     const matchedSlot = slots.find((slot) => slot.time === time);

// // // //                     console.log(`Class: ${className}, Day: ${day}, Time: ${time}, Matched Slot:`, matchedSlot); // Debugging

// // // //                     return (
// // // //                       <Td key={dayIndex}>
// // // //                         {matchedSlot ? (
// // // //                           <>
// // // //                             <strong>Subject: {matchedSlot.subject}</strong> <br />
// // // //                             <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
// // // //                           </>
// // // //                         ) : (
// // // //                           "No Class"
// // // //                         )}
// // // //                       </Td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}

// // // //               {/* Lab Row */}
// // // //               <tr>
// // // //                 <Td><strong>Lab</strong></Td>
// // // //                 {days.map((day, dayIndex) => {
// // // //                   const labData = timetable[className]?.[day]?.lab;
// // // //                   const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// // // //                   return (
// // // //                     <Td key={dayIndex}>
// // // //                       {slots.length > 0 ? (
// // // //                         <LabSlot>
// // // //                           {slots.map((labSlot, labIndex) => (
// // // //                             <React.Fragment key={labIndex}>
// // // //                               <div>
// // // //                                 <span>Batch: {labSlot.batch}</span> <br />
// // // //                                 <span>Subject: {labSlot.subject}</span> <br />
// // // //                                 <span>👨‍🏫 Teacher: {labSlot.teacher}</span> <br />
// // // //                                 <span>🏫 Lab: {labSlot.lab}</span>
// // // //                               </div>
// // // //                               {labIndex < slots.length - 1 && <BatchDivider />} {/* Add divider between batches */}
// // // //                             </React.Fragment>
// // // //                           ))}
// // // //                         </LabSlot>
// // // //                       ) : (
// // // //                         "No Lab"
// // // //                       )}
// // // //                     </Td>
// // // //                   );
// // // //                 })}
// // // //               </tr>
// // // //             </tbody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //       ))}
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default ResultTimeTable;

// // // // import React from "react";
// // // // import { useLocation } from "react-router-dom";
// // // // import styled from "styled-components";

// // // // // Styled Components
// // // // const Container = styled.div`
// // // //   padding: 20px;
// // // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // // //   min-height: 100vh;
// // // //   display: flex;
// // // //   justify-content: center;
// // // //   align-items: center;
// // // //   flex-direction: column;
// // // // `;

// // // // const Title = styled.h1`
// // // //   color: #fff;
// // // //   font-size: 2.5rem;
// // // //   text-align: center;
// // // //   margin-bottom: 20px;
// // // // `;

// // // // const TableContainer = styled.div`
// // // //   background-color: rgba(255, 255, 255, 0.9);
// // // //   padding: 20px;
// // // //   border-radius: 10px;
// // // //   width: 100%;
// // // //   max-width: 1200px;
// // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // //   margin-bottom: 30px;
// // // //   overflow-x: auto;
// // // // `;

// // // // const SubTitle = styled.h2`
// // // //   text-align: center;
// // // //   color: #333;
// // // //   background-color: #ff785a;
// // // //   padding: 10px;
// // // //   border-radius: 10px;
// // // //   font-size: 1.5rem;
// // // //   font-weight: bold;
// // // //   margin-bottom: 15px;
// // // //   color: white;
// // // // `;

// // // // const RoomInfo = styled.div`
// // // //   text-align: center;
// // // //   font-size: 1.2rem;
// // // //   color: #333;
// // // //   margin-bottom: 10px;
// // // //   font-weight: bold;
// // // // `;

// // // // const Table = styled.table`
// // // //   width: 100%;
// // // //   border-collapse: collapse;
// // // //   text-align: center;
// // // //   background-color: white;
// // // //   border-radius: 10px;
// // // //   overflow: hidden;
// // // // `;

// // // // const Th = styled.th`
// // // //   background-color: #ff785a;
// // // //   color: white;
// // // //   font-size: 1.1rem;
// // // //   padding: 12px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const Td = styled.td`
// // // //   border: 1px solid #ddd;
// // // //   padding: 10px;
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
// // // //   font-size: 1.1rem;
// // // //   padding: 12px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const LabSlot = styled.div`
// // // //   background-color: #e6f7ff;
// // // //   padding: 10px;
// // // //   border-radius: 5px;
// // // //   margin: 5px 0;
// // // //   text-align: center;
// // // // `;

// // // // const BatchDivider = styled.div`
// // // //   border-bottom: 1px solid #ccc;
// // // //   margin: 8px 0;
// // // // `;

// // // // const NoDataMessage = styled.p`
// // // //   text-align: center;
// // // //   font-size: 1.5rem;
// // // //   color: red;
// // // //   margin-top: 20px;
// // // // `;

// // // // const ResultTimeTable = () => {
// // // //   const location = useLocation();
// // // //   const {
// // // //     timetable,
// // // //     workingDays = [],
// // // //     classTimes = [],
// // // //     classRoomAssignment = {},
// // // //   } = location.state || {};

// // // //   console.log("Timetable Data:", timetable);
// // // //   console.log("Working Days:", workingDays);
// // // //   console.log("Class Times:", classTimes);
// // // //   console.log("Class Room Assignment:", classRoomAssignment);

// // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // //   }

// // // //   const days = Array.isArray(workingDays) && workingDays.length > 0 ? workingDays : ["Monday", "Tuesday", "Wednesday"];
// // // //   const times = Array.isArray(classTimes) && classTimes.length > 0 ? classTimes : ["9-10", "10-11", "11-12"];

// // // //   const classNames = Object.keys(timetable);

// // // //   // Function to assign a global room to each class
// // // //   const assignGlobalRooms = (classNames, rooms) => {
// // // //     const globalRoomAssignment = {};
// // // //     classNames.forEach((className, index) => {
// // // //       globalRoomAssignment[className] = rooms[index % rooms.length]; // Assign rooms in a round-robin fashion
// // // //     });
// // // //     return globalRoomAssignment;
// // // //   };

// // // //   // Get the list of available rooms from the timetable data or use a default list
// // // //   const availableRooms = ["101", "102", "103"]; // Replace with actual rooms if available in the data
// // // //   const globalRoomAssignment = assignGlobalRooms(classNames, availableRooms);

// // // //   return (
// // // //     <Container>
// // // //       <Title>Generated Timetable</Title>

// // // //       {classNames.map((className, classIndex) => (
// // // //         <TableContainer key={classIndex}>
// // // //           <SubTitle>{className} - Timetable</SubTitle>
// // // //           <RoomInfo>Class Room: {globalRoomAssignment[className] || "Not Assigned"}</RoomInfo>
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
// // // //               {/* Regular Class Rows */}
// // // //               {times.map((time, timeIndex) => (
// // // //                 <tr key={timeIndex}>
// // // //                   <Td><strong>{time}</strong></Td>
// // // //                   {days.map((day, dayIndex) => {
// // // //                     const dayData = timetable[className]?.[day];
// // // //                     const slots = Array.isArray(dayData?.classes) ? dayData.classes : [];
// // // //                     const matchedSlot = slots.find((slot) => slot.time === time);

// // // //                     console.log(`Class: ${className}, Day: ${day}, Time: ${time}, Matched Slot:`, matchedSlot); // Debugging

// // // //                     return (
// // // //                       <Td key={dayIndex}>
// // // //                         {matchedSlot ? (
// // // //                           <>
// // // //                             <strong>Subject: {matchedSlot.subject}</strong> <br />
// // // //                             <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
// // // //                           </>
// // // //                         ) : (
// // // //                           "No Class"
// // // //                         )}
// // // //                       </Td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}

// // // //               {/* Lab Row */}
// // // //               <tr>
// // // //                 <Td><strong>Lab - {times[times.length - 1]}</strong></Td> {/* Display the last time slot as lab timing */}
// // // //                 {days.map((day, dayIndex) => {
// // // //                   const labData = timetable[className]?.[day]?.lab;
// // // //                   const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// // // //                   return (
// // // //                     <Td key={dayIndex}>
// // // //                       {slots.length > 0 ? (
// // // //                         <LabSlot>
// // // //                           {slots.map((labSlot, labIndex) => (
// // // //                             <React.Fragment key={labIndex}>
// // // //                               <div>
// // // //                                 <span>Batch: {labSlot.batch}</span> <br />
// // // //                                 <span>Subject: {labSlot.subject}</span> <br />
// // // //                                 <span>👨‍🏫 Teacher: {labSlot.teacher}</span> <br />
// // // //                                 <span>🏫 Lab: {labSlot.lab}</span>
// // // //                               </div>
// // // //                               {labIndex < slots.length - 1 && <BatchDivider />} {/* Add divider between batches */}
// // // //                             </React.Fragment>
// // // //                           ))}
// // // //                         </LabSlot>
// // // //                       ) : (
// // // //                         "No Lab"
// // // //                       )}
// // // //                     </Td>
// // // //                   );
// // // //                 })}
// // // //               </tr>
// // // //             </tbody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //       ))}
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default ResultTimeTable;

// // // // import React from "react";
// // // // import { useLocation } from "react-router-dom";
// // // // import styled from "styled-components";

// // // // // Styled Components
// // // // const Container = styled.div`
// // // //   padding: 20px;
// // // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // // //   min-height: 100vh;
// // // //   display: flex;
// // // //   justify-content: center;
// // // //   align-items: center;
// // // //   flex-direction: column;
// // // // `;

// // // // const Title = styled.h1`
// // // //   color: #fff;
// // // //   font-size: 2.5rem;
// // // //   text-align: center;
// // // //   margin-bottom: 20px;
// // // // `;

// // // // const TableContainer = styled.div`
// // // //   background-color: rgba(255, 255, 255, 0.9);
// // // //   padding: 20px;
// // // //   border-radius: 10px;
// // // //   width: 100%;
// // // //   max-width: 1200px;
// // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // //   margin-bottom: 30px;
// // // //   overflow-x: auto;
// // // // `;

// // // // const SubTitle = styled.h2`
// // // //   text-align: center;
// // // //   color: #333;
// // // //   background-color: #ff785a;
// // // //   padding: 10px;
// // // //   border-radius: 10px;
// // // //   font-size: 1.5rem;
// // // //   font-weight: bold;
// // // //   margin-bottom: 15px;
// // // //   color: white;
// // // // `;

// // // // const RoomInfo = styled.div`
// // // //   text-align: center;
// // // //   font-size: 1.2rem;
// // // //   color: #333;
// // // //   margin-bottom: 10px;
// // // //   font-weight: bold;
// // // // `;

// // // // const Table = styled.table`
// // // //   width: 100%;
// // // //   border-collapse: collapse;
// // // //   text-align: center;
// // // //   background-color: white;
// // // //   border-radius: 10px;
// // // //   overflow: hidden;
// // // // `;

// // // // const Th = styled.th`
// // // //   background-color: #ff785a;
// // // //   color: white;
// // // //   font-size: 1.1rem;
// // // //   padding: 12px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const Td = styled.td`
// // // //   border: 1px solid #ddd;
// // // //   padding: 10px;
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
// // // //   font-size: 1.1rem;
// // // //   padding: 12px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const LabSlot = styled.div`
// // // //   background-color: #e6f7ff;
// // // //   padding: 10px;
// // // //   border-radius: 5px;
// // // //   margin: 5px 0;
// // // //   text-align: center;
// // // // `;

// // // // const BatchDivider = styled.div`
// // // //   border-bottom: 1px solid #ccc;
// // // //   margin: 8px 0;
// // // // `;

// // // // const NoDataMessage = styled.p`
// // // //   text-align: center;
// // // //   font-size: 1.5rem;
// // // //   color: red;
// // // //   margin-top: 20px;
// // // // `;

// // // // const ResultTimeTable = () => {
// // // //   const location = useLocation();
// // // //   const {
// // // //     timetable = {},
// // // //     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
// // // //     classTimes = ["9-10", "10-11", "11-12", "12-1", "1-2"],
// // // //     classRoomAssignment = {},
// // // //   } = location.state || {};

// // // //   console.log("Timetable Data:", timetable);
// // // //   console.log("Working Days:", workingDays);
// // // //   console.log("Class Times:", classTimes);
// // // //   console.log("Class Room Assignment:", classRoomAssignment);

// // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // //   }

// // // //   const classNames = Object.keys(timetable);

// // // //   // Function to assign rooms dynamically
// // // //   const assignRooms = (classNames, rooms) => {
// // // //     const roomAssignment = {};
// // // //     classNames.forEach((className, index) => {
// // // //       roomAssignment[className] = rooms[index % rooms.length];
// // // //     });
// // // //     return roomAssignment;
// // // //   };

// // // //   const availableRooms = Object.values(classRoomAssignment).length > 0
// // // //     ? Object.values(classRoomAssignment)
// // // //     : ["101", "102", "103"]; // Fallback rooms
// // // //   const globalRoomAssignment = assignRooms(classNames, availableRooms);

// // // //   return (
// // // //     <Container>
// // // //       <Title>Generated Timetable</Title>

// // // //       {classNames.map((className, classIndex) => (
// // // //         <TableContainer key={classIndex}>
// // // //           <SubTitle>{className} - Timetable</SubTitle>
// // // //           <RoomInfo>Class Room: {globalRoomAssignment[className] || "Not Assigned"}</RoomInfo>
// // // //           <Table>
// // // //             <thead>
// // // //               <tr>
// // // //                 <TimeColumn>Time</TimeColumn>
// // // //                 {workingDays.map((day, index) => (
// // // //                   <Th key={index}>{day}</Th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {/* Regular Class Rows */}
// // // //               {classTimes.map((time, timeIndex) => (
// // // //                 <tr key={timeIndex}>
// // // //                   <Td><strong>{time}</strong></Td>
// // // //                   {workingDays.map((day, dayIndex) => {
// // // //                     const dayData = timetable[className]?.[day];
// // // //                     const slots = Array.isArray(dayData?.classes) ? dayData.classes : [];
// // // //                     const matchedSlot = slots.find((slot) => slot.time === time);

// // // //                     return (
// // // //                       <Td key={dayIndex}>
// // // //                         {matchedSlot ? (
// // // //                           <>
// // // //                             <strong>Subject: {matchedSlot.subject}</strong> <br />
// // // //                             <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
// // // //                           </>
// // // //                         ) : (
// // // //                           "No Class"
// // // //                         )}
// // // //                       </Td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}

// // // //               {/* Lab Row */}
// // // //               <tr>
// // // //                 <Td><strong>Lab - {classTimes[classTimes.length - 1]}</strong></Td>
// // // //                 {workingDays.map((day, dayIndex) => {
// // // //                   const labData = timetable[className]?.[day]?.lab;
// // // //                   const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// // // //                   return (
// // // //                     <Td key={dayIndex}>
// // // //                       {slots.length > 0 ? (
// // // //                         <LabSlot>
// // // //                           {slots.map((labSlot, labIndex) => (
// // // //                             <React.Fragment key={labIndex}>
// // // //                               <div>
// // // //                                 <span>Batch: {labSlot.batch}</span> <br />
// // // //                                 <span>Subject: {labSlot.subject}</span> <br />
// // // //                                 <span>👨‍🏫 Teacher: {labSlot.teacher}</span> <br />
// // // //                                 <span>🏫 Lab: {labSlot.lab}</span>
// // // //                               </div>
// // // //                               {labIndex < slots.length - 1 && <BatchDivider />}
// // // //                             </React.Fragment>
// // // //                           ))}
// // // //                         </LabSlot>
// // // //                       ) : (
// // // //                         "No Lab"
// // // //                       )}
// // // //                     </Td>
// // // //                   );
// // // //                 })}
// // // //               </tr>
// // // //             </tbody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //       ))}
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default ResultTimeTable;

// // // // import React from "react";
// // // // import { useLocation } from "react-router-dom";
// // // // import styled from "styled-components";

// // // // // Styled Components
// // // // const Container = styled.div`
// // // //   padding: 20px;
// // // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // // //   min-height: 100vh;
// // // //   display: flex;
// // // //   justify-content: center;
// // // //   align-items: center;
// // // //   flex-direction: column;
// // // // `;

// // // // const Title = styled.h1`
// // // //   color: #fff;
// // // //   font-size: 2.5rem;
// // // //   text-align: center;
// // // //   margin-bottom: 20px;
// // // // `;

// // // // const TableContainer = styled.div`
// // // //   background-color: rgba(255, 255, 255, 0.9);
// // // //   padding: 20px;
// // // //   border-radius: 10px;
// // // //   width: 100%;
// // // //   max-width: 1200px;
// // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // //   margin-bottom: 30px;
// // // //   overflow-x: auto;
// // // // `;

// // // // const SubTitle = styled.h2`
// // // //   text-align: center;
// // // //   color: #333;
// // // //   background-color: #ff785a;
// // // //   padding: 10px;
// // // //   border-radius: 10px;
// // // //   font-size: 1.5rem;
// // // //   font-weight: bold;
// // // //   margin-bottom: 15px;
// // // //   color: white;
// // // // `;

// // // // const RoomInfo = styled.div`
// // // //   text-align: center;
// // // //   font-size: 1.2rem;
// // // //   color: #333;
// // // //   margin-bottom: 10px;
// // // //   font-weight: bold;
// // // // `;

// // // // const Table = styled.table`
// // // //   width: 100%;
// // // //   border-collapse: collapse;
// // // //   text-align: center;
// // // //   background-color: white;
// // // //   border-radius: 10px;
// // // //   overflow: hidden;
// // // // `;

// // // // const Th = styled.th`
// // // //   background-color: #ff785a;
// // // //   color: white;
// // // //   font-size: 1.1rem;
// // // //   padding: 12px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const Td = styled.td`
// // // //   border: 1px solid #ddd;
// // // //   padding: 10px;
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
// // // //   font-size: 1.1rem;
// // // //   padding: 12px;
// // // //   border: 1px solid #ddd;
// // // // `;

// // // // const LabSlot = styled.div`
// // // //   background-color: #e6f7ff;
// // // //   padding: 10px;
// // // //   border-radius: 5px;
// // // //   margin: 5px 0;
// // // //   text-align: center;
// // // // `;

// // // // const BatchDivider = styled.div`
// // // //   border-bottom: 1px solid #ccc;
// // // //   margin: 8px 0;
// // // // `;

// // // // const NoDataMessage = styled.p`
// // // //   text-align: center;
// // // //   font-size: 1.5rem;
// // // //   color: red;
// // // //   margin-top: 20px;
// // // // `;

// // // // const LabLocation = styled.span`
// // // //   font-weight: bold;
// // // //   color: #2c3e50;
// // // // `;

// // // // const ResultTimeTable = () => {
// // // //   const location = useLocation();
// // // //   const {
// // // //     timetable = {},
// // // //     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
// // // //     classTimes = ["9-10", "10-11", "11-12", "12-1", "1-2"],
// // // //     labTimings = ["15-17"], // Use labTimings from location.state
// // // //     classRoomAssignment = {},
// // // //   } = location.state || {};

// // // //   console.log("Timetable Data:", timetable);
// // // //   console.log("Working Days:", workingDays);
// // // //   console.log("Class Times:", classTimes);
// // // //   console.log("Lab Timings:", labTimings);
// // // //   console.log("Class Room Assignment:", classRoomAssignment);

// // // //   if (!timetable || Object.keys(timetable).length === 0) {
// // // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // // //   }

// // // //   const classNames = Object.keys(timetable);

// // // //   // Function to assign rooms dynamically
// // // //   const assignRooms = (classNames, rooms) => {
// // // //     const roomAssignment = {};
// // // //     classNames.forEach((className, index) => {
// // // //       roomAssignment[className] = rooms[index % rooms.length];
// // // //     });
// // // //     return roomAssignment;
// // // //   };

// // // //   const availableRooms = Object.values(classRoomAssignment).length > 0
// // // //     ? Object.values(classRoomAssignment)
// // // //     : ["101", "102", "103"]; // Fallback rooms
// // // //   const globalRoomAssignment = assignRooms(classNames, availableRooms);

// // // //   return (
// // // //     <Container>
// // // //       <Title>Generated Timetable</Title>

// // // //       {classNames.map((className, classIndex) => (
// // // //         <TableContainer key={classIndex}>
// // // //           <SubTitle>{className} - Timetable</SubTitle>
// // // //           <RoomInfo>Class Room: {globalRoomAssignment[className] || "Not Assigned"}</RoomInfo>
// // // //           <Table>
// // // //             <thead>
// // // //               <tr>
// // // //                 <TimeColumn>Time</TimeColumn>
// // // //                 {workingDays.map((day, index) => (
// // // //                   <Th key={index}>{day}</Th>
// // // //                 ))}
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {/* Regular Class Rows */}
// // // //               {classTimes.map((time, timeIndex) => (
// // // //                 <tr key={timeIndex}>
// // // //                   <Td><strong>{time}</strong></Td>
// // // //                   {workingDays.map((day, dayIndex) => {
// // // //                     const dayData = timetable[className]?.[day];
// // // //                     const slots = Array.isArray(dayData?.classes) ? dayData.classes : [];
// // // //                     const matchedSlot = slots.find((slot) => slot.time === time);

// // // //                     return (
// // // //                       <Td key={dayIndex}>
// // // //                         {matchedSlot ? (
// // // //                           <>
// // // //                             <strong>Subject: {matchedSlot.subject}</strong> <br />
// // // //                             <span>👨‍🏫 Teacher: {matchedSlot.teacher}</span>
// // // //                           </>
// // // //                         ) : (
// // // //                           "No Class"
// // // //                         )}
// // // //                       </Td>
// // // //                     );
// // // //                   })}
// // // //                 </tr>
// // // //               ))}

// // // //               {/* Lab Row */}
// // // //               <tr>
// // // //                 <Td><strong>Lab - {labTimings[0]}</strong></Td> {/* Use labTimings from state */}
// // // //                 {workingDays.map((day, dayIndex) => {
// // // //                   const labData = timetable[className]?.[day]?.lab;
// // // //                   const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// // // //                   return (
// // // //                     <Td key={dayIndex}>
// // // //                       {slots.length > 0 ? (
// // // //                         <LabSlot>
// // // //                           {slots.map((labSlot, labIndex) => (
// // // //                             <React.Fragment key={labIndex}>
// // // //                               <div>
// // // //                                 <span>Batch: {labSlot.batch}</span> <br />
// // // //                                 <span>Subject: {labSlot.subject}</span> <br />
// // // //                                 <span>👨‍🏫 Teacher: {labSlot.teacher}</span> <br />
// // // //                                 <span>
// // // //                                   🏫 Lab: <LabLocation>{labSlot.lab}</LabLocation>
// // // //                                 </span>
// // // //                               </div>
// // // //                               {labIndex < slots.length - 1 && <BatchDivider />}
// // // //                             </React.Fragment>
// // // //                           ))}
// // // //                         </LabSlot>
// // // //                       ) : (
// // // //                         "No Lab"
// // // //                       )}
// // // //                     </Td>
// // // //                   );
// // // //                 })}
// // // //               </tr>
// // // //             </tbody>
// // // //           </Table>
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
// // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // //   min-height: 100vh;
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   flex-direction: column;
// // // `;

// // // const Title = styled.h1`
// // //   color: #fff;
// // //   font-size: 2.5rem;
// // //   text-align: center;
// // //   margin-bottom: 20px;
// // // `;

// // // const TableContainer = styled.div`
// // //   background-color: rgba(255, 255, 255, 0.9);
// // //   padding: 20px;
// // //   border-radius: 10px;
// // //   width: 100%;
// // //   max-width: 1200px;
// // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // //   margin-bottom: 30px;
// // //   overflow-x: auto;
// // // `;

// // // const SubTitle = styled.h2`
// // //   text-align: center;
// // //   color: white;
// // //   background-color: #ff785a;
// // //   padding: 10px;
// // //   border-radius: 10px;
// // //   font-size: 1.5rem;
// // //   font-weight: bold;
// // //   margin-bottom: 15px;
// // // `;

// // // const RoomInfo = styled.div`
// // //   text-align: center;
// // //   font-size: 1.2rem;
// // //   color: #333;
// // //   margin-bottom: 10px;
// // //   font-weight: bold;
// // // `;

// // // const Table = styled.table`
// // //   width: 100%;
// // //   border-collapse: collapse;
// // //   text-align: center;
// // //   background-color: white;
// // //   border-radius: 10px;
// // //   overflow: hidden;
// // // `;

// // // const Th = styled.th`
// // //   background-color: #ff785a;
// // //   color: white;
// // //   font-size: 1.1rem;
// // //   padding: 12px;
// // //   border: 1px solid #ddd;
// // // `;

// // // const Td = styled.td`
// // //   border: 1px solid #ddd;
// // //   padding: 10px;
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
// // //   font-size: 1.1rem;
// // //   padding: 12px;
// // //   border: 1px solid #ddd;
// // // `;

// // // const LabSlot = styled.div`
// // //   background-color: #e6f7ff;
// // //   padding: 10px;
// // //   border-radius: 5px;
// // //   margin: 5px 0;
// // //   text-align: center;
// // // `;

// // // const BatchDivider = styled.div`
// // //   border-bottom: 1px solid #ccc;
// // //   margin: 8px 0;
// // // `;

// // // const NoDataMessage = styled.p`
// // //   text-align: center;
// // //   font-size: 1.5rem;
// // //   color: red;
// // //   margin-top: 20px;
// // // `;

// // // const LabLocation = styled.span`
// // //   font-weight: bold;
// // //   color: #2c3e50;
// // // `;

// // // const ResultTimeTable = () => {
// // //   const location = useLocation();
// // //   const {
// // //     timetable = {},
// // //     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
// // //     classTimes = ["9-10", "10-11", "11-12", "12-1", "1-2"],
// // //     labTimings = ["15-17"], // Use labTimings from location.state
// // //     classRoomAssignment = {},
// // //   } = location.state || {};

// // //   console.log("Timetable Data:", timetable);
// // //   console.log("Working Days:", workingDays);
// // //   console.log("Class Times:", classTimes);
// // //   console.log("Lab Timings:", labTimings);
// // //   console.log("Class Room Assignment:", classRoomAssignment);

// // //   if (!timetable || Object.keys(timetable).length === 0) {
// // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // //   }

// // //   const classNames = Object.keys(timetable);

// // //   // Function to assign rooms dynamically
// // //   const assignRooms = (classNames, rooms) => {
// // //     const roomAssignment = {};
// // //     classNames.forEach((className, index) => {
// // //       roomAssignment[className] = rooms[index % rooms.length];
// // //     });
// // //     return roomAssignment;
// // //   };

// // //   const availableRooms =
// // //     Object.values(classRoomAssignment).length > 0
// // //       ? Object.values(classRoomAssignment)
// // //       : ["101", "102", "103"]; // Fallback rooms
// // //   const globalRoomAssignment = assignRooms(classNames, availableRooms);

// // //   return (
// // //     <Container>
// // //       <Title>Generated Timetable</Title>

// // //       {classNames.map((className, classIndex) => (
// // //         <TableContainer key={classIndex}>
// // //           <SubTitle>{className} - Timetable</SubTitle>
// // //           <RoomInfo>Class Room: {globalRoomAssignment[className] || "Not Assigned"}</RoomInfo>
// // //           <Table>
// // //             <thead>
// // //               <tr>
// // //                 <TimeColumn>Time</TimeColumn>
// // //                 {workingDays.map((day, index) => (
// // //                   <Th key={index}>{day}</Th>
// // //                 ))}
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {/* Regular Class Rows */}
// // //               {classTimes.map((time, timeIndex) => (
// // //                 <tr key={timeIndex}>
// // //                   <Td>{time}</Td>
// // //                   {workingDays.map((day, dayIndex) => {
// // //                     const dayData = timetable[className]?.[day];
// // //                     const slots = Array.isArray(dayData?.classes) ? dayData.classes : [];
// // //                     const matchedSlot = slots.find((slot) => slot.time === time);

// // //                     return (
// // //                       <Td key={dayIndex}>
// // //                         {matchedSlot ? (
// // //                           <>
// // //                             <strong>{matchedSlot.subject}</strong> <br />
// // //                             <span>👨‍🏫 {matchedSlot.teacher}</span>
// // //                           </>
// // //                         ) : (
// // //                           "No Class"
// // //                         )}
// // //                       </Td>
// // //                     );
// // //                   })}
// // //                 </tr>
// // //               ))}

// // //               {/* Lab Row */}
// // //               <tr>
// // //                 <Td><strong>Lab - {labTimings[0]}</strong></Td>
// // //                 {workingDays.map((day, dayIndex) => {
// // //                   const labData = timetable[className]?.[day]?.lab;
// // //                   const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// // //                   return (
// // //                     <Td key={dayIndex}>
// // //                       {slots.length > 0 ? (
// // //                         <LabSlot>
// // //                           {slots.map((labSlot, labIndex) => (
// // //                             <React.Fragment key={labIndex}>
// // //                               <div>
// // //                                 <span>Batch: {labSlot.batch}</span> <br />
// // //                                 <span>{labSlot.subject}</span> <br />
// // //                                 <span>👨‍🏫 {labSlot.teacher}</span> <br />
// // //                                 <span>🏫 <LabLocation>{labSlot.lab}</LabLocation></span>
// // //                               </div>
// // //                               {labIndex < slots.length - 1 && <BatchDivider />}
// // //                             </React.Fragment>
// // //                           ))}
// // //                         </LabSlot>
// // //                       ) : (
// // //                         "No Lab"
// // //                       )}
// // //                     </Td>
// // //                   );
// // //                 })}
// // //               </tr>
// // //             </tbody>
// // //           </Table>
// // //         </TableContainer>
// // //       ))}
// // //     </Container>
// // //   );
// // // };

// // // export default ResultTimeTable;











// // // import React from "react";
// // // import { useLocation } from "react-router-dom";
// // // import styled from "styled-components";

// // // // Styled Components
// // // const Container = styled.div`
// // //   padding: 20px;
// // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // //   min-height: 100vh;
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   flex-direction: column;
// // // `;

// // // const Title = styled.h1`
// // //   color: #fff;
// // //   font-size: 2.5rem;
// // //   text-align: center;
// // //   margin-bottom: 20px;
// // // `;

// // // const TableContainer = styled.div`
// // //   background-color: rgba(255, 255, 255, 0.9);
// // //   padding: 20px;
// // //   border-radius: 10px;
// // //   width: 100%;
// // //   max-width: 1200px;
// // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // //   margin-bottom: 30px;
// // //   overflow-x: auto;
// // // `;

// // // const SubTitle = styled.h2`
// // //   text-align: center;
// // //   color: white;
// // //   background-color: #ff785a;
// // //   padding: 10px;
// // //   border-radius: 10px;
// // //   font-size: 1.5rem;
// // //   font-weight: bold;
// // //   margin-bottom: 15px;
// // // `;

// // // const Table = styled.table`
// // //   width: 100%;
// // //   border-collapse: collapse;
// // //   text-align: center;
// // //   background-color: white;
// // //   border-radius: 10px;
// // //   overflow: hidden;
// // // `;

// // // const Th = styled.th`
// // //   background-color: #ff785a;
// // //   color: white;
// // //   font-size: 1.1rem;
// // //   padding: 12px;
// // //   border: 1px solid #ddd;
// // // `;

// // // const Td = styled.td`
// // //   border: 1px solid #ddd;
// // //   padding: 10px;
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
// // //   font-size: 1.1rem;
// // //   padding: 12px;
// // //   border: 1px solid #ddd;
// // // `;

// // // const NoDataMessage = styled.p`
// // //   text-align: center;
// // //   font-size: 1.5rem;
// // //   color: red;
// // //   margin-top: 20px;
// // // `;

// // // const ResultTimeTable = () => {
// // //   const location = useLocation();
// // //   const {
// // //     timetable = {},
// // //     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
// // //     classTimes = ["9-10", "10-11", "11-12"],
// // //   } = location.state || {};

// // //   if (!timetable || Object.keys(timetable).length === 0) {
// // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // //   }

// // //   const classNames = Object.keys(timetable);

// // //   return (
// // //     <Container>
// // //       <Title>Generated Timetable</Title>

// // //       {classNames.map((className, classIndex) => {
// // //         const classData = timetable[className];

// // //         return (
// // //           <TableContainer key={classIndex}>
// // //             <SubTitle>{className} - Timetable</SubTitle>

// // //             <Table>
// // //               <thead>
// // //                 <tr>
// // //                   <TimeColumn>Time</TimeColumn>
// // //                   {workingDays.map((day, index) => (
// // //                     <Th key={index}>{day}</Th>
// // //                   ))}
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {/* Class Rows with Auto-Filled Slots */}
// // //                 {classTimes.map((time, timeIndex) => (
// // //                   <tr key={timeIndex}>
// // //                     <Td>{time}</Td>
// // //                     {workingDays.map((day, dayIndex) => {
// // //                       const dayClasses = classData?.[day]?.classes || [];
// // //                       const matchedClass = dayClasses.find((cls) => cls.time === time);

// // //                       // Check if we have a class, otherwise find a backup class
// // //                       let subjectToShow = matchedClass
// // //                         ? matchedClass
// // //                         : dayClasses.find((cls) => cls.time !== time);

// // //                       return (
// // //                         <Td key={dayIndex}>
// // //                           {subjectToShow ? (
// // //                             <>
// // //                               <strong>{subjectToShow.subject}</strong> <br />
// // //                               <span>👨‍🏫 {subjectToShow.teacher}</span>
// // //                             </>
// // //                           ) : (
// // //                             "No Class"
// // //                           )}
// // //                         </Td>
// // //                       );
// // //                     })}
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </Table>
// // //           </TableContainer>
// // //         );
// // //       })}
// // //     </Container>
// // //   );
// // // };

// // // export default ResultTimeTable;


// // // import React from "react";
// // // import { useLocation } from "react-router-dom";
// // // import styled from "styled-components";

// // // // Styled Components
// // // const Container = styled.div`
// // //   padding: 20px;
// // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // //   min-height: 100vh;
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   flex-direction: column;
// // // `;

// // // const Title = styled.h1`
// // //   color: #fff;
// // //   font-size: 2.5rem;
// // //   text-align: center;
// // //   margin-bottom: 20px;
// // // `;

// // // const TableContainer = styled.div`
// // //   background-color: rgba(255, 255, 255, 0.9);
// // //   padding: 20px;
// // //   border-radius: 10px;
// // //   width: 100%;
// // //   max-width: 1200px;
// // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // //   margin-bottom: 30px;
// // //   overflow-x: auto;
// // // `;

// // // const SubTitle = styled.h2`
// // //   text-align: center;
// // //   color: white;
// // //   background-color: #ff785a;
// // //   padding: 10px;
// // //   border-radius: 10px;
// // //   font-size: 1.5rem;
// // //   font-weight: bold;
// // //   margin-bottom: 15px;
// // // `;

// // // const Table = styled.table`
// // //   width: 100%;
// // //   border-collapse: collapse;
// // //   text-align: center;
// // //   background-color: white;
// // //   border-radius: 10px;
// // //   overflow: hidden;
// // // `;

// // // const Th = styled.th`
// // //   background-color: #ff785a;
// // //   color: white;
// // //   font-size: 1.1rem;
// // //   padding: 12px;
// // //   border: 1px solid #ddd;
// // // `;

// // // const Td = styled.td`
// // //   border: 1px solid #ddd;
// // //   padding: 10px;
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
// // //   font-size: 1.1rem;
// // //   padding: 12px;
// // //   border: 1px solid #ddd;
// // // `;

// // // const LabSlot = styled.div`
// // //   background-color: #e6f7ff;
// // //   padding: 10px;
// // //   border-radius: 5px;
// // //   margin: 5px 0;
// // //   text-align: center;
// // // `;

// // // const BatchDivider = styled.div`
// // //   border-bottom: 1px solid #ccc;
// // //   margin: 8px 0;
// // // `;

// // // const NoDataMessage = styled.p`
// // //   text-align: center;
// // //   font-size: 1.5rem;
// // //   color: red;
// // //   margin-top: 20px;
// // // `;

// // // const LabLocation = styled.span`
// // //   font-weight: bold;
// // //   color: #2c3e50;
// // // `;

// // // const ResultTimeTable = () => {
// // //   const location = useLocation();
// // //   const {
// // //     timetable = {},
// // //     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
// // //     classTimes = ["9-10", "10-11", "11-12"],
// // //     labTimings = ["16-18"],
// // //   } = location.state || {};

// // //   if (!timetable || Object.keys(timetable).length === 0) {
// // //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// // //   }

// // //   const classNames = Object.keys(timetable);

// // //   return (
// // //     <Container>
// // //       <Title>Generated Timetable</Title>

// // //       {classNames.map((className, classIndex) => {
// // //         const classData = timetable[className];

// // //         return (
// // //           <TableContainer key={classIndex}>
// // //             <SubTitle>{className} - Timetable</SubTitle>

// // //             <Table>
// // //               <thead>
// // //                 <tr>
// // //                   <TimeColumn>Time</TimeColumn>
// // //                   {workingDays.map((day, index) => (
// // //                     <Th key={index}>{day}</Th>
// // //                   ))}
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {/* Class Rows with Auto-Filled Slots */}
// // //                 {classTimes.map((time, timeIndex) => (
// // //                   <tr key={timeIndex}>
// // //                     <Td>{time}</Td>
// // //                     {workingDays.map((day, dayIndex) => {
// // //                       const dayClasses = classData?.[day]?.classes || [];
// // //                       const matchedClass = dayClasses.find((cls) => cls.time === time);

// // //                       // Check if we have a class, otherwise find a backup class
// // //                       let subjectToShow = matchedClass
// // //                         ? matchedClass
// // //                         : dayClasses.find((cls) => cls.time !== time);

// // //                       return (
// // //                         <Td key={dayIndex}>
// // //                           {subjectToShow ? (
// // //                             <>
// // //                               <strong>{subjectToShow.subject}</strong> <br />
// // //                               <span>👨‍🏫 {subjectToShow.teacher}</span>
// // //                             </>
// // //                           ) : (
// // //                             "No Class"
// // //                           )}
// // //                         </Td>
// // //                       );
// // //                     })}
// // //                   </tr>
// // //                 ))}

// // //                 {/* Lab Row */}
// // //                 <tr>
// // //                   <Td><strong>Lab - {labTimings[0]}</strong></Td>
// // //                   {workingDays.map((day, dayIndex) => {
// // //                     const labData = classData?.[day]?.lab;
// // //                     const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// // //                     return (
// // //                       <Td key={dayIndex}>
// // //                         {slots.length > 0 ? (
// // //                           <LabSlot>
// // //                             {slots.map((labSlot, labIndex) => (
// // //                               <React.Fragment key={labIndex}>
// // //                                 <div>
// // //                                   <span>Batch: {labSlot.batch}</span> <br />
// // //                                   <span>Subject: {labSlot.subject}</span> <br />
// // //                                   <span>👨‍🏫 {labSlot.teacher}</span> <br />
// // //                                   <span>🏫 <LabLocation>{labSlot.lab}</LabLocation></span>
// // //                                 </div>
// // //                                 {labIndex < slots.length - 1 && <BatchDivider />}
// // //                               </React.Fragment>
// // //                             ))}
// // //                           </LabSlot>
// // //                         ) : (
// // //                           "No Lab"
// // //                         )}
// // //                       </Td>
// // //                     );
// // //                   })}
// // //                 </tr>
// // //               </tbody>
// // //             </Table>
// // //           </TableContainer>
// // //         );
// // //       })}
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
// //   color: white;
// //   background-color: #ff785a;
// //   padding: 10px;
// //   border-radius: 10px;
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   margin-bottom: 10px;
// // `;

// // const RoomInfo = styled.p`
// //   text-align: center;
// //   font-size: 1.2rem;
// //   font-weight: bold;
// //   color: #2c3e50;
// //   margin-bottom: 15px;
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
// //   text-align: center;
// // `;

// // const BatchDivider = styled.div`
// //   border-bottom: 1px solid #ccc;
// //   margin: 8px 0;
// // `;

// // const NoDataMessage = styled.p`
// //   text-align: center;
// //   font-size: 1.5rem;
// //   color: red;
// //   margin-top: 20px;
// // `;

// // const LabLocation = styled.span`
// //   font-weight: bold;
// //   color: #2c3e50;
// // `;

// // const ResultTimeTable = () => {
// //   const location = useLocation();
// //   const {
// //     timetable = {},
// //     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
// //     classTimes = ["9-10", "10-11", "11-12"],
// //     labTimings = ["16-18"],
// //     classRoomAssignment = {
// //       cs1: "101",
// //       cs2: "102",
// //       cs3: "103",
// //     }, // Example global room assignment
// //   } = location.state || {};

// //   if (!timetable || Object.keys(timetable).length === 0) {
// //     return <NoDataMessage>No timetable data found.</NoDataMessage>;
// //   }

// //   const classNames = Object.keys(timetable);

// //   return (
// //     <Container>
// //       <Title>Generated Timetable</Title>

// //       {classNames.map((className, classIndex) => {
// //         const classData = timetable[className];

// //         return (
// //           <TableContainer key={classIndex}>
// //             <SubTitle>{className} - Timetable</SubTitle>
// //             <RoomInfo>📌 Class Room: {classRoomAssignment[className] || "Not Assigned"}</RoomInfo>

// //             <Table>
// //               <thead>
// //                 <tr>
// //                   <TimeColumn>Time</TimeColumn>
// //                   {workingDays.map((day, index) => (
// //                     <Th key={index}>{day}</Th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {/* Class Rows with Auto-Filled Slots */}
// //                 {classTimes.map((time, timeIndex) => (
// //                   <tr key={timeIndex}>
// //                     <Td>{time}</Td>
// //                     {workingDays.map((day, dayIndex) => {
// //                       const dayClasses = classData?.[day]?.classes || [];
// //                       const matchedClass = dayClasses.find((cls) => cls.time === time);

// //                       let subjectToShow = matchedClass
// //                         ? matchedClass
// //                         : dayClasses.find((cls) => cls.time !== time);

// //                       return (
// //                         <Td key={dayIndex}>
// //                           {subjectToShow ? (
// //                             <>
// //                               <strong>Subject: {subjectToShow.subject}</strong> <br />
// //                               <span>👨‍🏫 {subjectToShow.teacher}</span>
// //                             </>
// //                           ) : (
// //                             "No Class"
// //                           )}
// //                         </Td>
// //                       );
// //                     })}
// //                   </tr>
// //                 ))}

// //                 {/* Lab Row */}
// //                 <tr>
// //                   <Td><strong>Lab - {labTimings[0]}</strong></Td>
// //                   {workingDays.map((day, dayIndex) => {
// //                     const labData = classData?.[day]?.lab;
// //                     const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// //                     return (
// //                       <Td key={dayIndex}>
// //                         {slots.length > 0 ? (
// //                           <LabSlot>
// //                             {slots.map((labSlot, labIndex) => (
// //                               <React.Fragment key={labIndex}>
// //                                 <div>
// //                                   <span>Batch: {labSlot.batch}</span> <br />
// //                                   <span>Subject: {labSlot.subject}</span> <br />
// //                                   <span>👨‍🏫 {labSlot.teacher}</span> <br />
// //                                   <span>🏫 <LabLocation>{labSlot.lab}</LabLocation></span>
// //                                 </div>
// //                                 {labIndex < slots.length - 1 && <BatchDivider />}
// //                               </React.Fragment>
// //                             ))}
// //                           </LabSlot>
// //                         ) : (
// //                           "No Lab"
// //                         )}
// //                       </Td>
// //                     );
// //                   })}
// //                 </tr>
// //               </tbody>
// //             </Table>
// //           </TableContainer>
// //         );
// //       })}
// //     </Container>
// //   );
// // };

// // export default ResultTimeTable;


// import React from "react";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

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
//   color: white;
//   background-color: #ff785a;
//   padding: 10px;
//   border-radius: 10px;
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// const RoomInfo = styled.p`
//   text-align: center;
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: #2c3e50;
//   margin-bottom: 15px;
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
//   text-align: center;
// `;

// const BatchDivider = styled.div`
//   border-bottom: 1px solid #ccc;
//   margin: 8px 0;
// `;

// const NoDataMessage = styled.p`
//   text-align: center;
//   font-size: 1.5rem;
//   color: red;
//   margin-top: 20px;
// `;

// const LabLocation = styled.span`
//   font-weight: bold;
//   color: #2c3e50;
// `;

// const DownloadButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   font-size: 1rem;
//   cursor: pointer;
//   margin-top: 20px;
//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const ResultTimeTable = () => {
//   const location = useLocation();
//   const {
//     timetable = {},
//     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//     classTimes = ["9-10", "10-11", "11-12"],
//     labTimings = ["16-18"],
//     classRoomAssignment = {
//       cs1: "101",
//       cs2: "102",
//       cs3: "103",
//     }, // Example global room assignment
//   } = location.state || {};

//   if (!timetable || Object.keys(timetable).length === 0) {
//     return <NoDataMessage>No timetable data found.</NoDataMessage>;
//   }

//   const classNames = Object.keys(timetable);

//   // Function to handle PDF download
//   const handleDownloadPDF = () => {
//     const input = document.getElementById("timetable-container");

//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgWidth = 210; // A4 width in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       pdf.save("timetable.pdf");
//     });
//   };

//   return (
//     <Container>
//       <Title>Generated Timetable</Title>
//       <DownloadButton onClick={handleDownloadPDF}>Download as PDF</DownloadButton>

//       <div id="timetable-container">
//         {classNames.map((className, classIndex) => {
//           const classData = timetable[className];

//           return (
//             <TableContainer key={classIndex}>
//               <SubTitle>{className} - Timetable</SubTitle>
//               <RoomInfo>📌 Class Room: {classRoomAssignment[className] || "Not Assigned"}</RoomInfo>

//               <Table>
//                 <thead>
//                   <tr>
//                     <TimeColumn>Time</TimeColumn>
//                     {workingDays.map((day, index) => (
//                       <Th key={index}>{day}</Th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Class Rows with Auto-Filled Slots */}
//                   {classTimes.map((time, timeIndex) => (
//                     <tr key={timeIndex}>
//                       <Td>{time}</Td>
//                       {workingDays.map((day, dayIndex) => {
//                         const dayClasses = classData?.[day]?.classes || [];
//                         const matchedClass = dayClasses.find((cls) => cls.time === time);

//                         let subjectToShow = matchedClass
//                           ? matchedClass
//                           : dayClasses.find((cls) => cls.time !== time);

//                         return (
//                           <Td key={dayIndex}>
//                             {subjectToShow ? (
//                               <>
//                                 <strong>Subject: {subjectToShow.subject}</strong> <br />
//                                 <span>👨‍🏫 {subjectToShow.teacher}</span>
//                               </>
//                             ) : (
//                               "No Class"
//                             )}
//                           </Td>
//                         );
//                       })}
//                     </tr>
//                   ))}

//                   {/* Lab Row */}
//                   <tr>
//                     <Td><strong>Lab - {labTimings[0]}</strong></Td>
//                     {workingDays.map((day, dayIndex) => {
//                       const labData = classData?.[day]?.lab;
//                       const slots = Array.isArray(labData?.slots) ? labData.slots : [];

//                       return (
//                         <Td key={dayIndex}>
//                           {slots.length > 0 ? (
//                             <LabSlot>
//                               {slots.map((labSlot, labIndex) => (
//                                 <React.Fragment key={labIndex}>
//                                   <div>
//                                     <span>Batch: {labSlot.batch}</span> <br />
//                                     <span>Subject: {labSlot.subject}</span> <br />
//                                     <span>👨‍🏫 {labSlot.teacher}</span> <br />
//                                     <span>🏫 <LabLocation>{labSlot.lab}</LabLocation></span>
//                                   </div>
//                                   {labIndex < slots.length - 1 && <BatchDivider />}
//                                 </React.Fragment>
//                               ))}
//                             </LabSlot>
//                           ) : (
//                             "No Lab"
//                           )}
//                         </Td>
//                       );
//                     })}
//                   </tr>
//                 </tbody>
//               </Table>
//             </TableContainer>
//           );
//         })}
//       </div>
//     </Container>
//   );
// };

// export default ResultTimeTable;

import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaFilePdf, FaDownload } from "react-icons/fa"; // Icons for PDF and download

// Styled Components
const Container = styled.div`
  padding: 40px;
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
  margin-bottom: 30px;
  font-family: "Poppins", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const TableContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 15px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 30px;
  overflow-x: auto;
`;

const SubTitle = styled.h2`
  text-align: center;
  color: white;
  background-color: #ff785a;
  padding: 12px;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
`;

const RoomInfo = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: #ff785a;
  color: white;
  font-size: 1.1rem;
  padding: 15px;
  border: 1px solid #ddd;
  font-family: "Poppins", sans-serif;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #fffaf2;
  transition: all 0.3s ease-in-out;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: #ffdac1;
    transform: scale(1.02);
  }
`;

const TimeColumn = styled.th`
  background-color: #add8e6;
  color: black;
  font-size: 1.1rem;
  padding: 15px;
  border: 1px solid #ddd;
  font-family: "Poppins", sans-serif;
`;

const LabSlot = styled.div`
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  text-align: center;
  font-family: "Poppins", sans-serif;
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
  font-family: "Poppins", sans-serif;
`;

const LabLocation = styled.span`
  font-weight: bold;
  color: #2c3e50;
  font-family: "Poppins", sans-serif;
`;

const DownloadButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Poppins", sans-serif;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.span`
  font-size: 1.2rem;
`;

const ResultTimeTable = () => {
  const location = useLocation();
  const {
    timetable = {},
    workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    classTimes = ["9-10", "10-11", "11-12"],
    labTimings = ["16-18"],
    classRoomAssignment = {
      cs1: "101",
      cs2: "102",
      cs3: "103",
    }, // Example global room assignment
  } = location.state || {};

  if (!timetable || Object.keys(timetable).length === 0) {
    return <NoDataMessage>No timetable data found.</NoDataMessage>;
  }

  const classNames = Object.keys(timetable);

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const input = document.getElementById("timetable-container");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("timetable.pdf");
    });
  };

  return (
    <Container>
      <Title>Generated Timetable</Title>
      <DownloadButton onClick={handleDownloadPDF}>
        <IconWrapper>
          <FaFilePdf />
        </IconWrapper>
        Download as PDF
        <IconWrapper>
          <FaDownload />
        </IconWrapper>
      </DownloadButton>

      <div id="timetable-container">
        {classNames.map((className, classIndex) => {
          const classData = timetable[className];

          return (
            <TableContainer key={classIndex}>
              <SubTitle>{className} - Timetable</SubTitle>
              <RoomInfo>📌 Class Room: {classRoomAssignment[className] || "Not Assigned"}</RoomInfo>

              <Table>
                <thead>
                  <tr>
                    <TimeColumn>Time</TimeColumn>
                    {workingDays.map((day, index) => (
                      <Th key={index}>{day}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Class Rows with Auto-Filled Slots */}
                  {classTimes.map((time, timeIndex) => (
                    <tr key={timeIndex}>
                      <Td>{time}</Td>
                      {workingDays.map((day, dayIndex) => {
                        const dayClasses = classData?.[day]?.classes || [];
                        const matchedClass = dayClasses.find((cls) => cls.time === time);

                        let subjectToShow = matchedClass
                          ? matchedClass
                          : dayClasses.find((cls) => cls.time !== time);

                        return (
                          <Td key={dayIndex}>
                            {subjectToShow ? (
                              <>
                                <strong>Subject: {subjectToShow.subject}</strong> <br />
                                <span>👨‍🏫 {subjectToShow.teacher}</span>
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
                    <Td>
                      <strong>Lab - {labTimings[0]}</strong>
                    </Td>
                    {workingDays.map((day, dayIndex) => {
                      const labData = classData?.[day]?.lab;
                      const slots = Array.isArray(labData?.slots) ? labData.slots : [];

                      return (
                        <Td key={dayIndex}>
                          {slots.length > 0 ? (
                            <LabSlot>
                              {slots.map((labSlot, labIndex) => (
                                <React.Fragment key={labIndex}>
                                  <div>
                                    <span>Batch: {labSlot.batch}</span> <br />
                                    <span>Subject: {labSlot.subject}</span> <br />
                                    <span>👨‍🏫 {labSlot.teacher}</span> <br />
                                    <span>
                                      🏫 <LabLocation>{labSlot.lab}</LabLocation>
                                    </span>
                                  </div>
                                  {labIndex < slots.length - 1 && <BatchDivider />}
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
          );
        })}
      </div>
    </Container>
  );
};

export default ResultTimeTable;