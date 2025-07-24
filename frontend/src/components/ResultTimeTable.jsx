import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaFilePdf, FaDownload } from "react-icons/fa";

// Styled Components (unchanged)
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

const ResultTimeTable = () => {
  const location = useLocation();
  const {
    timetable = {},
    workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    classTimes = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
    labTimings = ["2:00 PM - 4:00 PM"],
    classRoomAssignment = {},
  } = location.state || {};

  if (!timetable || Object.keys(timetable).length === 0) {
    return (
      <Container>
        <NoDataMessage>No timetable data found.</NoDataMessage>
      </Container>
    );
  }

  // Format time slot with AM/PM
  const formatTimeSlot = (timeString) => {
    if (!timeString) return "";
    
    // If already formatted, return as is
    if (timeString.includes("AM") || timeString.includes("PM")) {
      return timeString;
    }
    
    // Format simple time strings (e.g., "9-10")
    if (timeString.includes("-")) {
      const [start, end] = timeString.split("-").map(Number);
      const startPeriod = start < 12 ? "AM" : "PM";
      const endPeriod = end < 12 ? "AM" : "PM";
      return `${start % 12 || 12}:00 ${startPeriod} - ${end % 12 || 12}:00 ${endPeriod}`;
    }
    
    return timeString;
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    const input = document.getElementById("timetable-container");

    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("timetable.pdf");
    });
  };

  const classNames = Object.keys(timetable);

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
          const classRoom = classRoomAssignment[className] || 
                          classData?.room || 
                          `Room ${classIndex + 101}`;

          return (
            <TableContainer key={classIndex}>
              <SubTitle>{className} - Timetable</SubTitle>
              <RoomInfo>📌 Class Room: {classRoom}</RoomInfo>
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
                  {classTimes.map((timeSlot, timeIndex) => {
                    const formattedTime = formatTimeSlot(timeSlot);
                    return (
                      <tr key={timeIndex}>
                        <Td>{formattedTime}</Td>
                        {workingDays.map((day, dayIndex) => {
                          const dayClasses = classData?.[day]?.classes || [];
                          const matchedClass = dayClasses.find((cls) => 
                            cls.time === timeSlot || 
                            cls.time === formattedTime
                          );

                          return (
                            <Td key={dayIndex}>
                              {matchedClass ? (
                                <>
                                  <strong>Subject: {matchedClass.subject}</strong> <br />
                                  <span>👨‍🏫 {matchedClass.teacher}</span> <br />
                                  {/* {matchedClass.room && (
                                    // <span>🏫 Room: {matchedClass.room}</span>
                                  )} */}
                                </>
                              ) : (
                                "No Class"
                              )}
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
                  )}
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