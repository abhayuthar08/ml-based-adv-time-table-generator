// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import styled from "styled-components";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import { FaFilePdf, FaDownload } from "react-icons/fa";

// // // Styled Components (unchanged)
// // const Container = styled.div`
// //   padding: 40px;
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
// //   margin-bottom: 30px;
// //   font-family: "Poppins", sans-serif;
// //   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
// // `;

// // const TableContainer = styled.div`
// //   background-color: rgba(255, 255, 255, 0.95);
// //   padding: 25px;
// //   border-radius: 15px;
// //   width: 100%;
// //   max-width: 1200px;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
// //   margin-bottom: 30px;
// //   overflow-x: auto;
// // `;

// // const SubTitle = styled.h2`
// //   text-align: center;
// //   color: white;
// //   background-color: #ff785a;
// //   padding: 12px;
// //   border-radius: 10px;
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   margin-bottom: 20px;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const RoomInfo = styled.p`
// //   text-align: center;
// //   font-size: 1.2rem;
// //   font-weight: bold;
// //   color: #2c3e50;
// //   margin-bottom: 20px;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const Table = styled.table`
// //   width: 100%;
// //   border-collapse: collapse;
// //   text-align: center;
// //   background-color: white;
// //   border-radius: 10px;
// //   overflow: hidden;
// //   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// // `;

// // const Th = styled.th`
// //   background-color: #ff785a;
// //   color: white;
// //   font-size: 1.1rem;
// //   padding: 15px;
// //   border: 1px solid #ddd;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const Td = styled.td`
// //   border: 1px solid #ddd;
// //   padding: 12px;
// //   font-size: 1rem;
// //   font-weight: bold;
// //   background-color: #fffaf2;
// //   transition: all 0.3s ease-in-out;
// //   font-family: "Poppins", sans-serif;
// //   &:hover {
// //     background-color: #ffdac1;
// //     transform: scale(1.02);
// //   }
// // `;

// // const TimeColumn = styled.th`
// //   background-color: #add8e6;
// //   color: black;
// //   font-size: 1.1rem;
// //   padding: 15px;
// //   border: 1px solid #ddd;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const LabSlot = styled.div`
// //   background-color: #e6f7ff;
// //   padding: 10px;
// //   border-radius: 5px;
// //   margin: 5px 0;
// //   text-align: center;
// //   font-family: "Poppins", sans-serif;
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
// //   font-family: "Poppins", sans-serif;
// // `;

// // const LabLocation = styled.span`
// //   font-weight: bold;
// //   color: #2c3e50;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const DownloadButton = styled.button`
// //   margin-bottom: 5px;
// //   background-color: #4caf50;
// //   color: white;
// //   padding: 12px 25px;
// //   border: none;
// //   border-radius: 8px;
// //   font-size: 1rem;
// //   cursor: pointer;
// //   margin-top: 20px;
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// //   font-family: "Poppins", sans-serif;
// //   transition: background-color 0.3s ease;
// //   &:hover {
// //     background-color: #45a049;
// //     transform: translateY(-2px);
// //     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
// //   }
// // `;

// // const IconWrapper = styled.span`
// //   font-size: 1.2rem;
// // `;

// // const ResultTimeTable = () => {
// //   const location = useLocation();
// //   const {
// //     timetable = {},
// //     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
// //     classTimes = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
// //     labTimings = ["2:00 PM - 4:00 PM"],
// //     classRoomAssignment = {},
// //   } = location.state || {};

// //   if (!timetable || Object.keys(timetable).length === 0) {
// //     return (
// //       <Container>
// //         <NoDataMessage>No timetable data found.</NoDataMessage>
// //       </Container>
// //     );
// //   }

// //   // Format time slot with AM/PM
// //   const formatTimeSlot = (timeString) => {
// //     if (!timeString) return "";
    
// //     // If already formatted, return as is
// //     if (timeString.includes("AM") || timeString.includes("PM")) {
// //       return timeString;
// //     }
    
// //     // Format simple time strings (e.g., "9-10")
// //     if (timeString.includes("-")) {
// //       const [start, end] = timeString.split("-").map(Number);
// //       const startPeriod = start < 12 ? "AM" : "PM";
// //       const endPeriod = end < 12 ? "AM" : "PM";
// //       return `${start % 12 || 12}:00 ${startPeriod} - ${end % 12 || 12}:00 ${endPeriod}`;
// //     }
    
// //     return timeString;
// //   };

// //   // Handle PDF download
// //   const handleDownloadPDF = () => {
// //     const input = document.getElementById("timetable-container");

// //     html2canvas(input, { scale: 3 }).then((canvas) => {
// //       const imgData = canvas.toDataURL("image/png");
// //       const pdf = new jsPDF("p", "mm", "a4");

// //       const pageWidth = 210;
// //       const pageHeight = 297;

// //       const imgWidth = pageWidth;
// //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

// //       let heightLeft = imgHeight;
// //       let position = 0;

// //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
// //       heightLeft -= pageHeight;

// //       while (heightLeft > 0) {
// //         position = heightLeft - imgHeight;
// //         pdf.addPage();
// //         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
// //         heightLeft -= pageHeight;
// //       }

// //       pdf.save("timetable.pdf");
// //     });
// //   };

// //   const classNames = Object.keys(timetable);

// //   return (
// //     <Container>
// //       <Title>Generated Timetable</Title>
// //       <DownloadButton onClick={handleDownloadPDF}>
// //         <IconWrapper>
// //           <FaFilePdf />
// //         </IconWrapper>
// //         Download as PDF
// //         <IconWrapper>
// //           <FaDownload />
// //         </IconWrapper>
// //       </DownloadButton>

// //       <div id="timetable-container">
// //         {classNames.map((className, classIndex) => {
// //           const classData = timetable[className];
// //           const classRoom = classRoomAssignment[className] || 
// //                           classData?.room || 
// //                           `Room ${classIndex + 101}`;

// //           return (
// //             <TableContainer key={classIndex}>
// //               <SubTitle>{className} - Timetable</SubTitle>
// //               <RoomInfo>📌 Class Room: {classRoom}</RoomInfo>
// //               <Table>
// //                 <thead>
// //                   <tr>
// //                     <TimeColumn>Time</TimeColumn>
// //                     {workingDays.map((day, index) => (
// //                       <Th key={index}>{day}</Th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {classTimes.map((timeSlot, timeIndex) => {
// //                     const formattedTime = formatTimeSlot(timeSlot);
// //                     return (
// //                       <tr key={timeIndex}>
// //                         <Td>{formattedTime}</Td>
// //                         {workingDays.map((day, dayIndex) => {
// //                           const dayClasses = classData?.[day]?.classes || [];
// //                           const matchedClass = dayClasses.find((cls) => 
// //                             cls.time === timeSlot || 
// //                             cls.time === formattedTime
// //                           );

// //                           return (
// //                             <Td key={dayIndex}>
// //                               {matchedClass ? (
// //                                 <>
// //                                   <strong>Subject: {matchedClass.subject}</strong> <br />
// //                                   <span>👨‍🏫 {matchedClass.teacher}</span> <br />
// //                                   {/* {matchedClass.room && (
// //                                     // <span>🏫 Room: {matchedClass.room}</span>
// //                                   )} */}
// //                                 </>
// //                               ) : (
// //                                 "No Class"
// //                               )}
// //                             </Td>
// //                           );
// //                         })}
// //                       </tr>
// //                     );
// //                   })}

// //                   {labTimings.length > 0 && (
// //                     <tr>
// //                       <Td>
// //                         <strong>Lab - {formatTimeSlot(labTimings[0])}</strong>
// //                       </Td>
// //                       {workingDays.map((day, dayIndex) => {
// //                         const labData = classData?.[day]?.lab;
// //                         const slots = Array.isArray(labData?.slots) ? labData.slots : [];

// //                         return (
// //                           <Td key={dayIndex}>
// //                             {slots.length > 0 ? (
// //                               <LabSlot>
// //                                 {slots.map((labSlot, labIndex) => (
// //                                   <React.Fragment key={labIndex}>
// //                                     <div>
// //                                       <span>Batch: {labSlot.batch}</span> <br />
// //                                       <span>Subject: {labSlot.subject}</span> <br />
// //                                       <span>👨‍🏫 {labSlot.teacher}</span> <br />
// //                                       <span>
// //                                         🏫 <LabLocation>{labSlot.lab}</LabLocation>
// //                                       </span>
// //                                     </div>
// //                                     {labIndex < slots.length - 1 && <BatchDivider />}
// //                                   </React.Fragment>
// //                                 ))}
// //                               </LabSlot>
// //                             ) : (
// //                               "No Lab"
// //                             )}
// //                           </Td>
// //                         );
// //                       })}
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </Table>
// //             </TableContainer>
// //           );
// //         })}
// //       </div>
// //     </Container>
// //   );
// // };

// // export default ResultTimeTable;
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { FaFilePdf, FaDownload, FaChalkboardTeacher, FaUserGraduate, FaCode } from "react-icons/fa";

// // Styled Components
// const Container = styled.div`
//   padding: 40px;
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
//   margin-bottom: 30px;
//   font-family: "Poppins", sans-serif;
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
// `;

// const TableContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.95);
//   padding: 25px;
//   border-radius: 15px;
//   width: 100%;
//   max-width: 1200px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
//   margin-bottom: 30px;
//   overflow-x: auto;
// `;

// const SubTitle = styled.h2`
//   text-align: center;
//   color: white;
//   background-color: ${props => props.isTeacher ? '#4a6fa5' : props.isJson ? '#6a4a8c' : '#ff785a'};
//   padding: 12px;
//   border-radius: 10px;
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin-bottom: 20px;
//   font-family: "Poppins", sans-serif;
// `;

// const RoomInfo = styled.p`
//   text-align: center;
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: #2c3e50;
//   margin-bottom: 20px;
//   font-family: "Poppins", sans-serif;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   text-align: center;
//   background-color: white;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// `;

// const Th = styled.th`
//   background-color: ${props => props.isTeacher ? '#4a6fa5' : props.isJson ? '#6a4a8c' : '#ff785a'};
//   color: white;
//   font-size: 1.1rem;
//   padding: 15px;
//   border: 1px solid #ddd;
//   font-family: "Poppins", sans-serif;
// `;

// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 12px;
//   font-size: 1rem;
//   font-weight: bold;
//   background-color: ${props => props.isFree ? '#f8f8f8' : '#fffaf2'};
//   transition: all 0.3s ease-in-out;
//   font-family: "Poppins", sans-serif;
//   &:hover {
//     background-color: ${props => 
//       props.isTeacher ? '#d4e6ff' : 
//       props.isJson ? '#e6d4ff' : 
//       '#ffdac1'};
//     transform: scale(1.02);
//   }
// `;

// const TimeColumn = styled.th`
//   background-color: #add8e6;
//   color: black;
//   font-size: 1.1rem;
//   padding: 15px;
//   border: 1px solid #ddd;
//   font-family: "Poppins", sans-serif;
// `;

// const ClassSlot = styled.div`
//   background-color: #e6f7ff;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px 0;
//   text-align: center;
//   font-family: "Poppins", sans-serif;
// `;

// const LabSlot = styled.div`
//   background-color: ${props => props.isTeacher ? '#ffe6e6' : '#e6f7ff'};
//   padding: 10px;
//   border-radius: 5px;
//   margin: 5px 0;
//   text-align: center;
//   font-family: "Poppins", sans-serif;
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
//   font-family: "Poppins", sans-serif;
// `;

// const LabLocation = styled.span`
//   font-weight: bold;
//   color: #2c3e50;
//   font-family: "Poppins", sans-serif;
// `;

// const DownloadButton = styled.button`
//   margin-bottom: 5px;
//   background-color: #4caf50;
//   color: white;
//   padding: 12px 25px;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   cursor: pointer;
//   margin-top: 20px;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   font-family: "Poppins", sans-serif;
//   transition: background-color 0.3s ease;
//   &:hover {
//     background-color: #45a049;
//     transform: translateY(-2px);
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
//   }
// `;

// const IconWrapper = styled.span`
//   font-size: 1.2rem;
// `;

// const ToggleButton = styled.button`
//   background-color: ${props => props.active ? 
//     props.mode === 'student' ? '#ff785a' : 
//     props.mode === 'teacher' ? '#4a6fa5' : '#6a4a8c' : '#dddddd'};
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   cursor: pointer;
//   margin: 10px 5px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-family: "Poppins", sans-serif;
//   transition: all 0.3s ease;
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
//   }
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
// `;

// const JsonViewer = styled.pre`
//   background-color: #f8f8f8;
//   padding: 20px;
//   border-radius: 8px;
//   max-width: 100%;
//   overflow-x: auto;
//   white-space: pre-wrap;
//   word-wrap: break-word;
//   font-family: monospace;
//   font-size: 0.9rem;
//   line-height: 1.5;
//   text-align: left;
//   max-height: 500px;
//   overflow-y: auto;
// `;

// const ResultTimeTable = () => {
//   const location = useLocation();
//   const {
//     timetable = {},
//     teacherTimetables = {},
//     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//     classTimes = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
//     labTimings = ["2:00 PM - 4:00 PM"],
//     classRoomAssignment = {},
//   } = location.state || {};

//   const [viewMode, setViewMode] = useState('student'); // 'student', 'teacher', or 'json'

//   if (!timetable || Object.keys(timetable).length === 0) {
//     return (
//       <Container>
//         <NoDataMessage>No timetable data found.</NoDataMessage>
//       </Container>
//     );
//   }

//   // Format time slot with AM/PM
//   const formatTimeSlot = (timeString) => {
//     if (!timeString) return "";
    
//     // If already formatted, return as is
//     if (timeString.includes("AM") || timeString.includes("PM")) {
//       return timeString;
//     }
    
//     // Format simple time strings (e.g., "9-10")
//     if (timeString.includes("-")) {
//       const [start, end] = timeString.split("-").map(Number);
//       const startPeriod = start < 12 ? "AM" : "PM";
//       const endPeriod = end < 12 ? "AM" : "PM";
//       return `${start % 12 || 12}:00 ${startPeriod} - ${end % 12 || 12}:00 ${endPeriod}`;
//     }
    
//     return timeString;
//   };

//   // Handle PDF download
//   const handleDownloadPDF = () => {
//     const input = document.getElementById("timetable-container");

//     html2canvas(input, { scale: 3 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");

//       const pageWidth = 210;
//       const pageHeight = 297;

//       const imgWidth = pageWidth;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(`${viewMode}-timetable.pdf`);
//     });
//   };

//   const classNames = Object.keys(timetable);
//   const teacherNames = Object.keys(teacherTimetables);

//   return (
//     <Container>
//       <Title>
//         {viewMode === 'student' ? (
//           <>
//             <FaUserGraduate /> Student Timetable
//           </>
//         ) : viewMode === 'teacher' ? (
//           <>
//             <FaChalkboardTeacher /> Teacher Timetable
//           </>
//         ) : (
//           <>
//             <FaCode /> Timetable Data (JSON)
//           </>
//         )}
//       </Title>

//       <ButtonContainer>
//         <ToggleButton
//           active={viewMode === 'student'}
//           onClick={() => setViewMode('student')}
//           mode="student"
//         >
//           <FaUserGraduate /> Student View
//         </ToggleButton>
//         <ToggleButton
//           active={viewMode === 'teacher'}
//           onClick={() => setViewMode('teacher')}
//           mode="teacher"
//         >
//           <FaChalkboardTeacher /> Teacher View
//         </ToggleButton>
//         <ToggleButton
//           active={viewMode === 'json'}
//           onClick={() => setViewMode('json')}
//           mode="json"
//         >
//           <FaCode /> JSON View
//         </ToggleButton>
//       </ButtonContainer>

//       {viewMode !== 'json' && (
//         <DownloadButton onClick={handleDownloadPDF}>
//           <IconWrapper>
//             <FaFilePdf />
//           </IconWrapper>
//           Download as PDF
//           <IconWrapper>
//             <FaDownload />
//           </IconWrapper>
//         </DownloadButton>
//       )}

//       <div id="timetable-container">
//         {viewMode === 'student' ? (
//           // Student Timetable View
//           classNames.map((className, classIndex) => {
//             const classData = timetable[className];
//             const classRoom = classRoomAssignment[className] || 
//                             classData?.room || 
//                             `Room ${classIndex + 101}`;

//             return (
//               <TableContainer key={classIndex}>
//                 <SubTitle isTeacher={false} isJson={false}>
//                   <FaUserGraduate /> {className} - Timetable
//                 </SubTitle>
//                 <RoomInfo>📌 Class Room: {classRoom}</RoomInfo>
//                 <Table>
//                   <thead>
//                     <tr>
//                       <TimeColumn>Time</TimeColumn>
//                       {workingDays.map((day, index) => (
//                         <Th key={index} isTeacher={false} isJson={false}>{day}</Th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {classTimes.map((timeSlot, timeIndex) => {
//                       const formattedTime = formatTimeSlot(timeSlot);
//                       return (
//                         <tr key={timeIndex}>
//                           <Td>{formattedTime}</Td>
//                           {workingDays.map((day, dayIndex) => {
//                             const dayClasses = classData?.[day]?.classes || [];
//                             const matchedClass = dayClasses.find((cls) => 
//                               cls.time === timeSlot || 
//                               cls.time === formattedTime
//                             );

//                             return (
//                               <Td key={dayIndex} isFree={!matchedClass} isTeacher={false} isJson={false}>
//                                 {matchedClass ? (
//                                   <>
//                                     <strong>Subject: {matchedClass.subject}</strong> <br />
//                                     <span>👨‍🏫 {matchedClass.teacher}</span> <br />
//                                   </>
//                                 ) : (
//                                   "No Class"
//                                 )}
//                               </Td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}

//                     {labTimings.length > 0 && (
//                       <tr>
//                         <Td>
//                           <strong>Lab - {formatTimeSlot(labTimings[0])}</strong>
//                         </Td>
//                         {workingDays.map((day, dayIndex) => {
//                           const labData = classData?.[day]?.lab;
//                           const slots = Array.isArray(labData?.slots) ? labData.slots : [];

//                           return (
//                             <Td key={dayIndex} isFree={slots.length === 0} isTeacher={false} isJson={false}>
//                               {slots.length > 0 ? (
//                                 <LabSlot isTeacher={false}>
//                                   {slots.map((labSlot, labIndex) => (
//                                     <React.Fragment key={labIndex}>
//                                       <div>
//                                         <span>Batch: {labSlot.batch}</span> <br />
//                                         <span>Subject: {labSlot.subject}</span> <br />
//                                         <span>👨‍🏫 {labSlot.teacher}</span> <br />
//                                         <span>
//                                           🏫 <LabLocation>{labSlot.lab}</LabLocation>
//                                         </span>
//                                       </div>
//                                       {labIndex < slots.length - 1 && <BatchDivider />}
//                                     </React.Fragment>
//                                   ))}
//                                 </LabSlot>
//                               ) : (
//                                 "No Lab"
//                               )}
//                             </Td>
//                           );
//                         })}
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </TableContainer>
//             );
//           })
//         ) : viewMode === 'teacher' ? (
//           // Teacher Timetable View
//           teacherNames.map((teacherName, teacherIndex) => {
//             const teacherData = teacherTimetables[teacherName];

//             return (
//               <TableContainer key={teacherIndex}>
//                 <SubTitle isTeacher={true} isJson={false}>
//                   <FaChalkboardTeacher /> {teacherName}'s Schedule
//                 </SubTitle>
//                 <Table>
//                   <thead>
//                     <tr>
//                       <TimeColumn>Time</TimeColumn>
//                       {workingDays.map((day, index) => (
//                         <Th key={index} isTeacher={true} isJson={false}>{day}</Th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {classTimes.map((timeSlot, timeIndex) => {
//                       const formattedTime = formatTimeSlot(timeSlot);
//                       return (
//                         <tr key={timeIndex}>
//                           <Td>{formattedTime}</Td>
//                           {workingDays.map((day, dayIndex) => {
//                             const slot = teacherData?.[day]?.[timeSlot] || teacherData?.[day]?.[formattedTime];
                            
//                             return (
//                               <Td key={dayIndex} isFree={!slot} isTeacher={true} isJson={false}>
//                                 {slot ? (
//                                   slot.type === "LAB" ? (
//                                     <LabSlot isTeacher={true}>
//                                       <strong>{slot.subject} Lab</strong> <br />
//                                       {slot.batch && <span>Batch: {slot.batch}</span>} <br />
//                                       {slot.location && <span>Location: {slot.location}</span>} <br />
//                                       {slot.className && <span>Class: {slot.className}</span>}
//                                     </LabSlot>
//                                   ) : (
//                                     <ClassSlot>
//                                       <strong>{slot.subject}</strong> <br />
//                                       {slot.className && <span>Class: {slot.className}</span>} <br />
//                                       {slot.room && <span>Room: {slot.room}</span>}
//                                     </ClassSlot>
//                                   )
//                                 ) : (
//                                   "Free"
//                                 )}
//                               </Td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}

//                     {labTimings.length > 0 && (
//                       <tr>
//                         <Td>
//                           <strong>Lab - {formatTimeSlot(labTimings[0])}</strong>
//                         </Td>
//                         {workingDays.map((day, dayIndex) => {
//                           const slot = teacherData?.[day]?.[labTimings[0]];
                          
//                           return (
//                             <Td key={dayIndex} isFree={!slot} isTeacher={true} isJson={false}>
//                               {slot ? (
//                                 <LabSlot isTeacher={true}>
//                                   <strong>{slot.subject} Lab</strong> <br />
//                                   {slot.batch && <span>Batch: {slot.batch}</span>} <br />
//                                   {slot.location && <span>Location: {slot.location}</span>} <br />
//                                   {slot.className && <span>Class: {slot.className}</span>}
//                                 </LabSlot>
//                               ) : (
//                                 "Free"
//                               )}
//                             </Td>
//                           );
//                         })}
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </TableContainer>
//             );
//           })
//         ) : (
//           // JSON View
//           <TableContainer>
//             <SubTitle isTeacher={false} isJson={true}>
//               <FaCode /> Timetable Data (JSON)
//             </SubTitle>
//             <JsonViewer>
//               {JSON.stringify({
//                 timetable,
//                 teacherTimetables,
//                 workingDays,
//                 classTimes,
//                 labTimings,
//                 classRoomAssignment
//               }, null, 2)}
//             </JsonViewer>
//           </TableContainer>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default ResultTimeTable;
// // import React from "react";
// // import { useLocation } from "react-router-dom";
// // import styled from "styled-components";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import { FaFilePdf, FaDownload, FaSearch } from "react-icons/fa";

// // // Styled Components (updated with new styles)
// // const Container = styled.div`
// //   padding: 40px;
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
// //   margin-bottom: 30px;
// //   font-family: "Poppins", sans-serif;
// //   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
// // `;

// // const TableContainer = styled.div`
// //   background-color: rgba(255, 255, 255, 0.95);
// //   padding: 25px;
// //   border-radius: 15px;
// //   width: 100%;
// //   max-width: 1200px;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
// //   margin-bottom: 30px;
// //   overflow-x: auto;
// // `;

// // const SubTitle = styled.h2`
// //   text-align: center;
// //   color: white;
// //   background-color: #ff785a;
// //   padding: 12px;
// //   border-radius: 10px;
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   margin-bottom: 20px;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const TeacherSubTitle = styled(SubTitle)`
// //   background-color: #4a89dc;
// // `;

// // const RoomInfo = styled.p`
// //   text-align: center;
// //   font-size: 1.2rem;
// //   font-weight: bold;
// //   color: #2c3e50;
// //   margin-bottom: 20px;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const Table = styled.table`
// //   width: 100%;
// //   border-collapse: collapse;
// //   text-align: center;
// //   background-color: white;
// //   border-radius: 10px;
// //   overflow: hidden;
// //   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// // `;

// // const Th = styled.th`
// //   background-color: #ff785a;
// //   color: white;
// //   font-size: 1.1rem;
// //   padding: 15px;
// //   border: 1px solid #ddd;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const TeacherTh = styled(Th)`
// //   background-color: #4a89dc;
// // `;

// // const Td = styled.td`
// //   border: 1px solid #ddd;
// //   padding: 12px;
// //   font-size: 1rem;
// //   font-weight: bold;
// //   background-color: #fffaf2;
// //   transition: all 0.3s ease-in-out;
// //   font-family: "Poppins", sans-serif;
// //   &:hover {
// //     background-color: #ffdac1;
// //     transform: scale(1.02);
// //   }
// // `;

// // const TeacherTd = styled(Td)`
// //   background-color: #e8f4fc;
// //   &:hover {
// //     background-color: #c1e1ff;
// //   }
// // `;

// // const TimeColumn = styled.th`
// //   background-color: #add8e6;
// //   color: black;
// //   font-size: 1.1rem;
// //   padding: 15px;
// //   border: 1px solid #ddd;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const LabSlot = styled.div`
// //   background-color: #e6f7ff;
// //   padding: 10px;
// //   border-radius: 5px;
// //   margin: 5px 0;
// //   text-align: center;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const TeacherLabSlot = styled(LabSlot)`
// //   background-color: #d6e9ff;
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
// //   font-family: "Poppins", sans-serif;
// // `;

// // const LabLocation = styled.span`
// //   font-weight: bold;
// //   color: #2c3e50;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const DownloadButton = styled.button`
// //   margin-bottom: 5px;
// //   background-color: #4caf50;
// //   color: white;
// //   padding: 12px 25px;
// //   border: none;
// //   border-radius: 8px;
// //   font-size: 1rem;
// //   cursor: pointer;
// //   margin-top: 20px;
// //   display: flex;
// //   align-items: center;
// //   gap: 10px;
// //   font-family: "Poppins", sans-serif;
// //   transition: background-color 0.3s ease;
// //   &:hover {
// //     background-color: #45a049;
// //     transform: translateY(-2px);
// //     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
// //   }
// // `;

// // const IconWrapper = styled.span`
// //   font-size: 1.2rem;
// // `;

// // const SearchContainer = styled.div`
// //   display: flex;
// //   align-items: center;
// //   margin-bottom: 20px;
// //   width: 100%;
// //   max-width: 500px;
// // `;

// // const SearchInput = styled.input`
// //   padding: 12px 20px;
// //   width: 100%;
// //   border-radius: 25px;
// //   border: none;
// //   font-size: 1rem;
// //   font-family: "Poppins", sans-serif;
// //   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// //   &:focus {
// //     outline: none;
// //     box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
// //   }
// // `;

// // const SearchIcon = styled.span`
// //   position: relative;
// //   right: 35px;
// //   color: #777;
// // `;

// // const ResultTimeTable = () => {
// //   const location = useLocation();
// //   const {
// //     timetable = {},
// //     teacherTimetables = {},
// //     workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
// //     classTimes = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
// //     labTimings = ["2:00 PM - 4:00 PM"],
// //     classRoomAssignment = {},
// //   } = location.state || {};

// //   const [searchTerm, setSearchTerm] = React.useState("");

// //   if (!timetable || Object.keys(timetable).length === 0) {
// //     return (
// //       <Container>
// //         <NoDataMessage>No timetable data found.</NoDataMessage>
// //       </Container>
// //     );
// //   }

// //   // Format time slot with AM/PM
// //   const formatTimeSlot = (timeString) => {
// //     if (!timeString) return "";
    
// //     // If already formatted, return as is
// //     if (timeString.includes("AM") || timeString.includes("PM")) {
// //       return timeString;
// //     }
    
// //     // Format simple time strings (e.g., "9-10")
// //     if (timeString.includes("-")) {
// //       const [start, end] = timeString.split("-").map(Number);
// //       const startPeriod = start < 12 ? "AM" : "PM";
// //       const endPeriod = end < 12 ? "AM" : "PM";
// //       return `${start % 12 || 12}:00 ${startPeriod} - ${end % 12 || 12}:00 ${endPeriod}`;
// //     }
    
// //     return timeString;
// //   };

// //   // Handle PDF download
// //   const handleDownloadPDF = () => {
// //     const input = document.getElementById("timetable-container");

// //     html2canvas(input, { scale: 3 }).then((canvas) => {
// //       const imgData = canvas.toDataURL("image/png");
// //       const pdf = new jsPDF("p", "mm", "a4");

// //       const pageWidth = 210;
// //       const pageHeight = 297;

// //       const imgWidth = pageWidth;
// //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

// //       let heightLeft = imgHeight;
// //       let position = 0;

// //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
// //       heightLeft -= pageHeight;

// //       while (heightLeft > 0) {
// //         position = heightLeft - imgHeight;
// //         pdf.addPage();
// //         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
// //         heightLeft -= pageHeight;
// //       }

// //       pdf.save("timetable.pdf");
// //     });
// //   };

// //   const classNames = Object.keys(timetable);
// //   const teacherNames = Object.keys(teacherTimetables).filter(name =>
// //     name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <Container>
// //       <Title>Generated Timetable</Title>
// //       <DownloadButton onClick={handleDownloadPDF}>
// //         <IconWrapper>
// //           <FaFilePdf />
// //         </IconWrapper>
// //         Download as PDF
// //         <IconWrapper>
// //           <FaDownload />
// //         </IconWrapper>
// //       </DownloadButton>

// //       <div id="timetable-container">
// //         {/* Student Timetables */}
// //         {classNames.map((className, classIndex) => {
// //           const classData = timetable[className];
// //           const classRoom = classRoomAssignment[className] || 
// //                           classData?.room || 
// //                           `Room ${classIndex + 101}`;
// //           return (
// //             <TableContainer key={classIndex}>
// //               <SubTitle>{className} - Timetable</SubTitle>
// //               <RoomInfo>📌 Class Room: {classRoom}</RoomInfo>
// //               <Table>
// //                 <thead>
// //                   <tr>
// //                     <TimeColumn>Time</TimeColumn>
// //                     {workingDays.map((day, index) => (
// //                       <Th key={index}>{day}</Th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {classTimes.map((timeSlot, timeIndex) => {
// //                     const formattedTime = formatTimeSlot(timeSlot);
// //                     return (
// //                       <tr key={timeIndex}>
// //                         <Td>{formattedTime}</Td>
// //                         {workingDays.map((day, dayIndex) => {
// //                           const dayClasses = classData?.[day]?.classes || [];
// //                           const matchedClass = dayClasses.find((cls) => 
// //                             cls.time === timeSlot || 
// //                             cls.time === formattedTime
// //                           );
// //                           return (
// //                             <Td key={dayIndex}>
// //                               {matchedClass ? (
// //                                 <>
// //                                   <strong>Subject: {matchedClass.subject}</strong> <br />
// //                                   <span>👨‍🏫 {matchedClass.teacher}</span> <br />
// //                                   {matchedClass.room && (
// //                                     <span>🏫 Room: {matchedClass.room}</span>
// //                                   )}
// //                                 </>
// //                               ) : (
// //                                 "No Class"
// //                               )}
// //                             </Td>
// //                           );
// //                         })}
// //                       </tr>
// //                     );
// //                   })}
// //                   {labTimings.length > 0 && (
// //                     <tr>
// //                       <Td>
// //                         <strong>Lab - {formatTimeSlot(labTimings[0])}</strong>
// //                       </Td>
// //                       {workingDays.map((day, dayIndex) => {
// //                         const labData = classData?.[day]?.lab;
// //                         const slots = Array.isArray(labData?.slots) ? labData.slots : [];
// //                         return (
// //                           <Td key={dayIndex}>
// //                             {slots.length > 0 ? (
// //                               <LabSlot>
// //                                 {slots.map((labSlot, labIndex) => (
// //                                   <React.Fragment key={labIndex}>
// //                                     <div>
// //                                       <span>Batch: {labSlot.batch}</span> <br />
// //                                       <span>Subject: {labSlot.subject}</span> <br />
// //                                       <span>👨‍🏫 {labSlot.teacher}</span> <br />
// //                                       <span>
// //                                         🏫 <LabLocation>{labSlot.lab}</LabLocation>
// //                                       </span>
// //                                     </div>
// //                                     {labIndex < slots.length - 1 && <BatchDivider />}
// //                                   </React.Fragment>
// //                                 ))}
// //                               </LabSlot>
// //                             ) : (
// //                               "No Lab"
// //                             )}
// //                           </Td>
// //                         );
// //                       })}
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </Table>
// //             </TableContainer>
// //           );
// //         })}
// //         {/* Teacher Timetables */}
// //         {teacherNames.length > 0 && (
// //           <>
// //             <Title>Teacher Timetables</Title>
// //             <SearchContainer>
// //               <SearchInput
// //                 type="text"
// //                 placeholder="Search teachers..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //               <SearchIcon>
// //                 <FaSearch />
// //               </SearchIcon>
// //             </SearchContainer>
// //             {teacherNames.map((teacherName, teacherIndex) => {
// //               const teacherData = teacherTimetables[teacherName];
// //               return (
// //                 <TableContainer key={`teacher-${teacherIndex}`}>
// //                   <TeacherSubTitle>{teacherName} - Timetable</TeacherSubTitle>
// //                   <Table>
// //                     <thead>
// //                       <tr>
// //                         <TimeColumn>Time</TimeColumn>
// //                         {workingDays.map((day, dayIndex) => (
// //                           <TeacherTh key={`teacher-day-${dayIndex}`}>{day}</TeacherTh>
// //                         ))}
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {classTimes.map((timeSlot, timeIndex) => {
// //                         const formattedTime = formatTimeSlot(timeSlot);
// //                         return (
// //                           <tr key={timeIndex}>
// //                             <TeacherTd>{formattedTime}</TeacherTd>
// //                             {workingDays.map((day, dayIndex) => {
// //                               const slot = teacherData?.[day]?.[timeSlot] || teacherData?.[day]?.[formattedTime];
// //                               if (slot) {
// //                                 if (slot.isLab) {
// //                                   return (
// //                                     <TeacherTd key={dayIndex}>
// //                                       <TeacherLabSlot>
// //                                         <strong>Lab: {slot.subject}</strong> <br />
// //                                         <span>Batch: {slot.batch}</span> <br />
// //                                         <span>🏫 Location: {slot.lab || slot.location}</span>
// //                                       </TeacherLabSlot>
// //                                     </TeacherTd>
// //                                   );
// //                                 } else {
// //                                   return (
// //                                     <TeacherTd key={dayIndex}>
// //                                       <strong>Class: {slot.class}</strong><br />
// //                                       <span>Subject: {slot.subject}</span><br />
// //                                       {slot.room && <span>Room: {slot.room}</span>}
// //                                     </TeacherTd>
// //                                   );
// //                                 }
// //                               } else {
// //                                 return <TeacherTd key={dayIndex}>Free</TeacherTd>;
// //                               }
// //                             })}
// //                           </tr>
// //                         );
// //                       })}
// //                     </tbody>
// //                   </Table>
// //                 </TableContainer>
// //               );
// //             })}
// //           </>
// //         )}
// //       </div>
// //     </Container>
// //   );
// // };

// // export default ResultTimeTable;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaFilePdf, FaDownload, FaChalkboardTeacher, FaUserGraduate, FaCode, FaExclamationTriangle } from "react-icons/fa";

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
  background-color: ${props => props.isTeacher ? '#4a6fa5' : props.isJson ? '#6a4a8c' : '#ff785a'};
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
  background-color: ${props => props.isTeacher ? '#4a6fa5' : props.isJson ? '#6a4a8c' : '#ff785a'};
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
  background-color: ${props => props.isFree ? '#f8f8f8' : '#fffaf2'};
  transition: all 0.3s ease-in-out;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: ${props => 
      props.isTeacher ? '#d4e6ff' : 
      props.isJson ? '#e6d4ff' : 
      '#ffdac1'};
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

const ClassSlot = styled.div`
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  text-align: center;
  font-family: "Poppins", sans-serif;
`;

const LabSlot = styled.div`
  background-color: ${props => props.isTeacher ? '#ffe6e6' : '#e6f7ff'};
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const LabLocation = styled.span`
  font-weight: bold;
  color: #2c3e50;
  font-family: "Poppins", sans-serif;
`;

const DownloadButton = styled.button`
  margin-bottom: 5px;
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

const ToggleButton = styled.button`
  background-color: ${props => props.active ? 
    props.mode === 'student' ? '#ff785a' : 
    props.mode === 'teacher' ? '#4a6fa5' : '#6a4a8c' : '#dddddd'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin: 10px 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const JsonViewer = styled.pre`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: left;
  max-height: 500px;
  overflow-y: auto;
`;

const WarningMessage = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Poppins", sans-serif;
`;

const ResultTimeTable = () => {
  const location = useLocation();
  const {
    timetable = {},
    teacherTimetables = {},
    workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    classTimes = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
    labTimings = ["2:00 PM - 4:00 PM"],
    classRoomAssignment = {},
    metadata = {}
  } = location.state || {};

  const [viewMode, setViewMode] = useState('student');
  const [missingClasses, setMissingClasses] = useState([]);

  // Analyze timetable data for missing classes
  useEffect(() => {
    if (viewMode === 'student' && timetable) {
      const missing = [];
      Object.entries(timetable).forEach(([className, classData]) => {
        workingDays.forEach(day => {
          const expectedSlots = classTimes.length;
          const actualSlots = classData[day]?.classes?.length || 0;
          
          if (actualSlots < expectedSlots) {
            missing.push({
              className,
              day,
              missing: expectedSlots - actualSlots
            });
          }
        });
      });
      setMissingClasses(missing);
    }
  }, [timetable, viewMode, classTimes, workingDays]);

  if (!timetable || Object.keys(timetable).length === 0) {
    return (
      <Container>
        <NoDataMessage>
          <FaExclamationTriangle /> No timetable data found.
        </NoDataMessage>
      </Container>
    );
  }

  const formatTimeSlot = (timeString) => {
    if (!timeString) return "";
    if (timeString.includes("AM") || timeString.includes("PM")) return timeString;
    if (timeString.includes("-")) {
      const [start, end] = timeString.split("-").map(Number);
      const startPeriod = start < 12 ? "AM" : "PM";
      const endPeriod = end < 12 ? "AM" : "PM";
      return `${start % 12 || 12}:00 ${startPeriod} - ${end % 12 || 12}:00 ${endPeriod}`;
    }
    return timeString;
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("timetable-container");
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${viewMode}-timetable.pdf`);
    });
  };

  const renderTeacherTimetable = () => {
    const teacherNames = Object.keys(teacherTimetables);
    
    if (teacherNames.length === 0) {
      return (
        <TableContainer>
          <SubTitle isTeacher={true}>
            <FaChalkboardTeacher /> Teacher Timetable
          </SubTitle>
          <NoDataMessage>
            <FaExclamationTriangle /> No teacher schedules generated.
          </NoDataMessage>
          <WarningMessage>
            <FaExclamationTriangle /> 
            Possible reasons:
            <ul>
              <li>No teachers were assigned to subjects</li>
              <li>Schedule conflicts prevented assignments</li>
              <li>Backend generation failed</li>
            </ul>
          </WarningMessage>
        </TableContainer>
      );
    }

    return teacherNames.map((teacherName) => {
      const teacherData = teacherTimetables[teacherName];
      const teacherSlots = Object.values(teacherData).flatMap(day => 
        Object.values(day).filter(slot => slot !== null)
      ).length;

      return (
        <TableContainer key={teacherName}>
          <SubTitle isTeacher={true}>
            <FaChalkboardTeacher /> {teacherName}'s Schedule ({teacherSlots} assigned slots)
          </SubTitle>
          <Table>
            <thead>
              <tr>
                <TimeColumn>Time</TimeColumn>
                {workingDays.map((day) => (
                  <Th key={day} isTeacher={true}>{day}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classTimes.map((timeSlot) => {
                const formattedTime = formatTimeSlot(timeSlot);
                return (
                  <tr key={timeSlot}>
                    <Td>{formattedTime}</Td>
                    {workingDays.map((day) => {
                      const slot = teacherData[day]?.[timeSlot] || teacherData[day]?.[formattedTime];
                      return (
                        <Td key={day} isFree={!slot} isTeacher={true}>
                          {slot ? (
                            slot.type === "LAB" ? (
                              <LabSlot isTeacher={true}>
                                <strong>{slot.subject} Lab</strong> <br />
                                {slot.batch && <span>Batch: {slot.batch}</span>} <br />
                                {slot.location && <span>Location: {slot.location}</span>} <br />
                                {slot.className && <span>Class: {slot.className}</span>}
                              </LabSlot>
                            ) : (
                              <ClassSlot>
                                <strong>{slot.subject}</strong> <br />
                                {slot.className && <span>Class: {slot.className}</span>} <br />
                                {slot.room && <span>Room: {slot.room}</span>}
                              </ClassSlot>
                            )
                          ) : "Free"}
                        </Td>
                      );
                    })}
                  </tr>
                );
              })}

              {labTimings.length > 0 && (
                <tr>
                  <Td>
                    <strong>Lab - {formatTimeSlot(labTimings[0])}</strong>
                  </Td>
                  {workingDays.map((day) => {
                    const slot = teacherData[day]?.[labTimings[0]];
                    return (
                      <Td key={day} isFree={!slot} isTeacher={true}>
                        {slot ? (
                          <LabSlot isTeacher={true}>
                            <strong>{slot.subject} Lab</strong> <br />
                            {slot.batch && <span>Batch: {slot.batch}</span>} <br />
                            {slot.location && <span>Location: {slot.location}</span>} <br />
                            {slot.className && <span>Class: {slot.className}</span>}
                          </LabSlot>
                        ) : "Free"}
                      </Td>
                    );
                  })}
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      );
    });
  };

  const renderStudentTimetable = () => {
    const classNames = Object.keys(timetable);
    
    return classNames.map((className) => {
      const classData = timetable[className];
      const classRoom = classRoomAssignment[className] || `Room ${classNames.indexOf(className) + 101}`;
      const dayStats = workingDays.map(day => ({
        day,
        scheduled: classData[day]?.classes?.length || 0,
        expected: classTimes.length
      }));

      return (
        <TableContainer key={className}>
          <SubTitle isTeacher={false}>
            <FaUserGraduate /> {className} - Timetable
          </SubTitle>
          <RoomInfo>📌 Class Room: {classRoom}</RoomInfo>
          
          {missingClasses.some(m => m.className === className) && (
            <WarningMessage>
              <FaExclamationTriangle /> 
              Missing classes on: 
              {missingClasses
                .filter(m => m.className === className)
                .map(m => ` ${m.day} (${m.missing})`)}
            </WarningMessage>
          )}

          <Table>
            <thead>
              <tr>
                <TimeColumn>Time</TimeColumn>
                {workingDays.map((day) => (
                  <Th key={day} isTeacher={false}>{day}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classTimes.map((timeSlot) => {
                const formattedTime = formatTimeSlot(timeSlot);
                return (
                  <tr key={timeSlot}>
                    <Td>{formattedTime}</Td>
                    {workingDays.map((day) => {
                      const dayClasses = classData[day]?.classes || [];
                      const matchedClass = dayClasses.find(cls => 
                        cls.time === timeSlot || cls.time === formattedTime
                      );
                      return (
                        <Td key={day} isFree={!matchedClass} isTeacher={false}>
                          {matchedClass ? (
                            <>
                              <strong>Subject: {matchedClass.subject}</strong> <br />
                              <span>👨‍🏫 {matchedClass.teacher}</span> <br />
                            </>
                          ) : "No Class"}
                        </Td>
                      );
                    })}
                  </tr>
                );
              })}

              {labTimings.length > 0 && (
                <tr>
                  <Td>
                    <strong>Lab - {formatTimeSlot(labTimings[0])}</strong>
                  </Td>
                  {workingDays.map((day) => {
                    const labData = classData[day]?.lab;
                    const slots = Array.isArray(labData?.slots) ? labData.slots : [];
                    return (
                      <Td key={day} isFree={slots.length === 0} isTeacher={false}>
                        {slots.length > 0 ? (
                          <LabSlot isTeacher={false}>
                            {slots.map((labSlot, index) => (
                              <React.Fragment key={index}>
                                <div>
                                  <span>Batch: {labSlot.batch}</span> <br />
                                  <span>Subject: {labSlot.subject}</span> <br />
                                  <span>👨‍🏫 {labSlot.teacher}</span> <br />
                                  <span>🏫 <LabLocation>{labSlot.lab}</LabLocation></span>
                                </div>
                                {index < slots.length - 1 && <BatchDivider />}
                              </React.Fragment>
                            ))}
                          </LabSlot>
                        ) : "No Lab"}
                      </Td>
                    );
                  })}
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      );
    });
  };

  const renderJsonView = () => (
    <TableContainer>
      <SubTitle isJson={true}>
        <FaCode /> Timetable Data (JSON)
      </SubTitle>
      <JsonViewer>
        {JSON.stringify({
          timetable,
          teacherTimetables,
          workingDays,
          classTimes,
          labTimings,
          classRoomAssignment,
          metadata
        }, null, 2)}
      </JsonViewer>
    </TableContainer>
  );

  return (
    <Container>
      <Title>
        {viewMode === 'student' ? (
          <>
            <FaUserGraduate /> Student Timetable
          </>
        ) : viewMode === 'teacher' ? (
          <>
            <FaChalkboardTeacher /> Teacher Timetable
          </>
        ) : (
          <>
            <FaCode /> Timetable Data (JSON)
          </>
        )}
      </Title>

      <ButtonContainer>
        <ToggleButton
          active={viewMode === 'student'}
          onClick={() => setViewMode('student')}
          mode="student"
        >
          <FaUserGraduate /> Student View
        </ToggleButton>
        <ToggleButton
          active={viewMode === 'teacher'}
          onClick={() => setViewMode('teacher')}
          mode="teacher"
        >
          <FaChalkboardTeacher /> Teacher View
        </ToggleButton>
        <ToggleButton
          active={viewMode === 'json'}
          onClick={() => setViewMode('json')}
          mode="json"
        >
          <FaCode /> JSON View
        </ToggleButton>
      </ButtonContainer>

      {viewMode !== 'json' && (
        <DownloadButton onClick={handleDownloadPDF}>
          <IconWrapper>
            <FaFilePdf />
          </IconWrapper>
          Download as PDF
          <IconWrapper>
            <FaDownload />
          </IconWrapper>
        </DownloadButton>
      )}

      <div id="timetable-container">
        {viewMode === 'student' ? renderStudentTimetable() : 
         viewMode === 'teacher' ? renderTeacherTimetable() : 
         renderJsonView()}
      </div>
    </Container>
  );
};

export default ResultTimeTable;