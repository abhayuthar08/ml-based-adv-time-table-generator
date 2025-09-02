import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { 
  FaFilePdf, 
  FaDownload, 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaCode, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaBug
} from "react-icons/fa";

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
  background-color: ${props => {
    if (props.$isTeacher) return '#4a6fa5';
    if (props.$isJson) return '#6a4a8c';
    return '#ff785a';
  }};
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
  background-color: ${props => {
    if (props.$isTeacher) return '#4a6fa5';
    if (props.$isJson) return '#6a4a8c';
    return '#ff785a';
  }};
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
  background-color: ${props => props.$isFree ? '#f8f8f8' : '#fffaf2'};
  transition: all 0.3s ease-in-out;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: ${props => {
      if (props.$isTeacher) return '#d4e6ff';
      if (props.$isJson) return '#e6d4ff';
      return '#ffdac1';
    }};
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
  background-color: ${props => props.$isTeacher ? '#ffe6e6' : '#e6f7ff'};
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
  background-color: ${props => {
    if (!props.$active) return '#dddddd';
    if (props.$mode === 'student') return '#ff785a';
    if (props.$mode === 'teacher') return '#4a6fa5';
    return '#6a4a8c';
  }};
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

const DebugInfo = styled.div`
  background-color: #f0f8ff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-family: monospace;
  font-size: 0.9rem;
  text-align: left;
  border: 1px solid #ccc;
  max-height: 300px;
  overflow-y: auto;
`;

const StatsContainer = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const DebugSteps = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: left;
  font-family: monospace;
`;

const DebugStep = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const ResultTimeTable = () => {
  const location = useLocation();
  
  const defaultWorkingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const defaultClassTimes = ["9-10", "10-11", "11-12"];
  const defaultLabTimings = ["16-18"];

  const [viewMode, setViewMode] = useState('student');
  const [debugMode, setDebugMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [debugSteps, setDebugSteps] = useState([]);
  const [missingClasses, setMissingClasses] = useState([]);
  const [teacherTimetables, setTeacherTimetables] = useState(null);
  
  const { 
    timetable = {}, 
    workingDays = defaultWorkingDays,
    classTimes = defaultClassTimes,
    labTimings = defaultLabTimings,
    classRoomAssignment = {},
    metadata = {}
  } = location.state || {};

  const formatTimeSlot = useCallback((timeString) => {
    if (!timeString) return "";
    if (timeString.includes("AM") || timeString.includes("PM")) return timeString;
    if (timeString.includes("-")) {
      const [start, end] = timeString.split("-").map(t => parseInt(t.trim()));
      const startPeriod = start < 12 ? "AM" : "PM";
      const endPeriod = end < 12 ? "AM" : "PM";
      return `${start % 12 || 12}:00 ${startPeriod} - ${end % 12 || 12}:00 ${endPeriod}`;
    }
    return timeString;
  }, []);

  useEffect(() => {
    if (location.state) {
      setIsLoading(false);
      
      const extractedTeacherData = {};
      
      Object.values(timetable).forEach(classData => {
        Object.entries(classData).forEach(([day, dayData]) => {
          if (dayData.classes) {
            dayData.classes.forEach(classItem => {
              if (!classItem.teacher) return;
              
              if (!extractedTeacherData[classItem.teacher]) {
                extractedTeacherData[classItem.teacher] = {};
              }
              
              if (!extractedTeacherData[classItem.teacher][day]) {
                extractedTeacherData[classItem.teacher][day] = [];
              }
              
              extractedTeacherData[classItem.teacher][day].push({
                ...classItem,
                isFree: false,
                type: 'CLASS'
              });
            });
          }
          
          if (dayData.lab?.slots) {
            dayData.lab.slots.forEach(labItem => {
              if (!labItem.teacher) return;
              
              if (!extractedTeacherData[labItem.teacher]) {
                extractedTeacherData[labItem.teacher] = {};
              }
              
              if (!extractedTeacherData[labItem.teacher][day]) {
                extractedTeacherData[labItem.teacher][day] = [];
              }
              
              extractedTeacherData[labItem.teacher][day].push({
                ...labItem,
                isFree: false,
                type: 'LAB'
              });
            });
          }
        });
      });
      
      Object.keys(extractedTeacherData).forEach(teacher => {
        workingDays.forEach(day => {
          if (!extractedTeacherData[teacher][day]) {
            extractedTeacherData[teacher][day] = [];
          }
          
          classTimes.forEach(timeSlot => {
            const hasClass = extractedTeacherData[teacher][day].some(
              item => item.time === timeSlot || item.rawTime === timeSlot
            );
            
            if (!hasClass) {
              extractedTeacherData[teacher][day].push({
                isFree: true,
                time: timeSlot,
                rawTime: timeSlot,
                type: 'FREE'
              });
            }
          });
          
          labTimings.forEach(labTime => {
            const hasLab = extractedTeacherData[teacher][day].some(
              item => item.time === labTime || item.rawTime === labTime
            );
            
            if (!hasLab) {
              extractedTeacherData[teacher][day].push({
                isFree: true,
                time: labTime,
                rawTime: labTime,
                type: 'FREE'
              });
            }
          });
        });
      });
      
      setTeacherTimetables(extractedTeacherData);
      
      setDebugSteps(prev => [
        ...prev,
        {
          step: 1,
          description: 'Data loaded and teacher data extracted',
          data: {
            timetableKeys: Object.keys(timetable),
            extractedTeachers: Object.keys(extractedTeacherData),
            workingDays,
            classTimes,
            labTimings
          }
        }
      ]);
    }
  }, [location.state, timetable, workingDays, classTimes, labTimings]);

  const findTeacherSlot = (daySchedule, timeSlot) => {
    if (!daySchedule || !Array.isArray(daySchedule)) return null;
    
    return daySchedule.find(slot => 
      slot && 
      (slot.rawTime === timeSlot || 
       slot.time === formatTimeSlot(timeSlot) ||
       slot.time === timeSlot)
    );
  };

  const renderTeacherStats = () => {
    if (!teacherTimetables || Object.keys(teacherTimetables).length === 0) return null;

    const teacherNames = Object.keys(teacherTimetables);
    const stats = teacherNames.map(teacher => {
      const teacherData = teacherTimetables[teacher];
      let classCount = 0;
      let labCount = 0;
      let freeCount = 0;

      Object.values(teacherData).forEach(daySchedule => {
        daySchedule.forEach(slot => {
          if (slot?.isFree) {
            freeCount++;
          } else if (slot?.type === 'CLASS' || slot?.type === 'class') {
            classCount++;
          } else if (slot?.type === 'LAB' || slot?.type === 'lab') {
            labCount++;
          }
        });
      });

      return {
        teacher,
        classes: classCount,
        labs: labCount,
        free: freeCount,
        total: classCount + labCount + freeCount
      };
    });

    return (
      <StatsContainer>
        <h3 style={{gridColumn: '1 / -1', textAlign: 'center', margin: '0 0 10px 0'}}>
          Teacher Statistics
        </h3>
        {stats.map(stat => (
          <StatCard key={stat.teacher}>
            <strong>{stat.teacher}</strong><br/>
            Classes: {stat.classes}<br/>
            Labs: {stat.labs}<br/>
            Free: {stat.free}<br/>
            <small>Total: {stat.total} periods</small>
          </StatCard>
        ))}
      </StatsContainer>
    );
  };

  const renderTeacherTimetables = useCallback(() => {
    if (isLoading) return <div>Loading teacher data...</div>;

    if (!teacherTimetables || Object.keys(teacherTimetables).length === 0) {
      return (
        <TableContainer>
          <SubTitle $isTeacher={true}>
            <FaChalkboardTeacher /> Teacher Timetable
          </SubTitle>
          <NoDataMessage>
            <FaExclamationTriangle /> No teacher data available in the timetable
          </NoDataMessage>
        </TableContainer>
      );
    }

    return Object.entries(teacherTimetables).map(([teacherName, teacherSchedule]) => (
      <TableContainer key={teacherName}>
        <SubTitle $isTeacher={true}>
          <FaChalkboardTeacher /> {teacherName}'s Schedule
        </SubTitle>
        
        <Table>
          <thead>
            <tr>
              <TimeColumn>Time</TimeColumn>
              {workingDays.map(day => (
                <Th key={day} $isTeacher={true}>{day}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classTimes.map(timeSlot => (
              <tr key={timeSlot}>
                <Td>{formatTimeSlot(timeSlot)}</Td>
                {workingDays.map(day => {
                  const daySchedule = teacherSchedule[day] || [];
                  const slot = findTeacherSlot(daySchedule, timeSlot);
                  
                  return (
                    <Td key={`${day}-${timeSlot}`} $isFree={!slot || slot.isFree} $isTeacher={true}>
                      {slot && !slot.isFree ? (
                        <ClassSlot>
                          <strong>{slot.subject || 'No subject'}</strong><br/>
                          {slot.className && `Class: ${slot.className}`}<br/>
                          {slot.room && `Room: ${slot.room}`}<br/>
                          {slot.location && `Location: ${slot.location}`}
                        </ClassSlot>
                      ) : 'Free'}
                    </Td>
                  );
                })}
              </tr>
            ))}
            
            {labTimings.map(labTime => (
              <tr key={`lab-${labTime}`}>
                <Td>Lab - {formatTimeSlot(labTime)}</Td>
                {workingDays.map(day => {
                  const daySchedule = teacherSchedule[day] || [];
                  const slot = findTeacherSlot(daySchedule, labTime);
                  
                  return (
                    <Td key={`${day}-lab-${labTime}`} $isFree={!slot || slot.isFree} $isTeacher={true}>
                      {slot && !slot.isFree ? (
                        <LabSlot $isTeacher={true}>
                          <strong>{slot.subject || 'No subject'} Lab</strong><br/>
                          {slot.batch && `Batch: ${slot.batch}`}<br/>
                          {slot.location && `Location: ${slot.location}`}<br/>
                          {slot.className && `Class: ${slot.className}`}
                        </LabSlot>
                      ) : 'Free'}
                    </Td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    ));
  }, [teacherTimetables, isLoading, classTimes, labTimings, workingDays, formatTimeSlot]);

  const renderTeacherView = () => {
    return (
      <>
        <TableContainer>
          <SubTitle $isTeacher={true}>
            <FaChalkboardTeacher /> Teacher Statistics
          </SubTitle>
          {renderTeacherStats()}
        </TableContainer>
        {renderTeacherTimetables()}
      </>
    );
  };

  const renderStudentTimetable = () => {
    const classNames = Object.keys(timetable);
    
    return classNames.map((className) => {
      const classData = timetable[className];
      const classRoom = classRoomAssignment[className] || `Room ${classNames.indexOf(className) + 101}`;

      return (
        <TableContainer key={className}>
          <SubTitle>
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
                  <Th key={day}>{day}</Th>
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
                        cls?.time === timeSlot || 
                        cls?.time === formattedTime ||
                        cls?.rawTime === timeSlot
                      );
                      return (
                        <Td key={day} $isFree={!matchedClass}>
                          {matchedClass ? (
                            <>
                              <strong>Subject: {matchedClass.subject}</strong> <br />
                              <span>👨‍🏫 Teacher: {matchedClass.teacher}</span> <br />
                              {/* {matchedClass.room && <span>🏫 Room: {matchedClass.room}</span>} */}
                            </>
                          ) : "Free"}
                        </Td>
                      );
                    })}
                  </tr>
                );
              })}

              {labTimings.map((labTime) => (
                <tr key={`lab-${labTime}`}>
                  <Td>
                    <strong>Lab - {formatTimeSlot(labTime)}</strong>
                  </Td>
                  {workingDays.map((day) => {
                    const labData = classData[day]?.lab;
                    const slots = Array.isArray(labData?.slots) ? labData.slots : [];
                    return (
                      <Td key={day} $isFree={slots.length === 0}>
                        {slots.length > 0 ? (
                          <LabSlot>
                            {slots.map((labSlot, index) => (
                              <React.Fragment key={index}>
                                <div>
                                  <span>Batch: {labSlot.batch}</span> <br />
                                  <span>Subject: {labSlot.subject}</span> <br />
                                  <span>👨‍🏫 Teacher: {labSlot.teacher}</span> <br />
                                  <span>🏫 <LabLocation>{labSlot.location}</LabLocation></span>
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
              ))}
            </tbody>
          </Table>
        </TableContainer>
      );
    });
  };

  const renderJsonView = () => (
    <TableContainer>
      <SubTitle $isJson={true}>
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

  if (isLoading) {
    return (
      <Container>
        <NoDataMessage>
          <FaExclamationTriangle /> Loading timetable data...
        </NoDataMessage>
      </Container>
    );
  }

  if (!timetable || Object.keys(timetable).length === 0) {
    return (
      <Container>
        <NoDataMessage>
          <FaExclamationTriangle /> No timetable data found.
        </NoDataMessage>
      </Container>
    );
  }

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
            <FaCode /> Timetable Data
          </>
        )}
      </Title>

      <ButtonContainer>
        <ToggleButton
          $active={viewMode === 'student'}
          onClick={() => setViewMode('student')}
          $mode="student"
        >
          <FaUserGraduate /> Student View
        </ToggleButton>
        <ToggleButton
          $active={viewMode === 'teacher'}
          onClick={() => setViewMode('teacher')}
          $mode="teacher"
        >
          <FaChalkboardTeacher /> Teacher View
        </ToggleButton>
        <ToggleButton
          $active={viewMode === 'json'}
          onClick={() => setViewMode('json')}
          $mode="json"
        >
          <FaCode /> JSON View
        </ToggleButton>
        {viewMode === 'teacher' && (
          <ToggleButton
            $active={debugMode}
            onClick={() => setDebugMode(!debugMode)}
            $mode="teacher"
          >
            <FaBug /> Debug {debugMode ? 'ON' : 'OFF'}
          </ToggleButton>
        )}
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
         viewMode === 'teacher' ? renderTeacherView() : 
         renderJsonView()}
      </div>
    </Container>
  );
};

export default ResultTimeTable;