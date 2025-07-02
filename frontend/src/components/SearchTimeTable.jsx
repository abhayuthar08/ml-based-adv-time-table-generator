
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaFilePdf, FaDownload, FaSearch, FaPlus, FaHistory } from "react-icons/fa";
import { RotateLoader } from "react-spinners";

// Styled Components
const Container = styled.div`
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
`;

const SearchContainer = styled(motion.div)`
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
`;

const SelectField = styled.select`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const TimetableContainer = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  overflow-x: auto;
`;

const SubTitle = styled.h2`
  text-align: center;
  color: white;
  background-color: #3498db;
  padding: 12px;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
`;

const RoomInfo = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  padding: 12px;
  border: 1px solid #dfe6e9;
  font-family: "Poppins", sans-serif;
`;

const Td = styled.td`
  border: 1px solid #dfe6e9;
  padding: 10px;
  font-size: 0.95rem;
  background-color: ${props => props.highlight ? '#e3f2fd' : '#fff'};
  transition: all 0.2s ease;
  font-family: "Poppins", sans-serif;
  &:hover {
    background-color: #f1f8fe;
  }
`;

const TimeColumn = styled.th`
  background-color: #b3e0ff;
  color: #2c3e50;
  font-size: 1rem;
  padding: 12px;
  border: 1px solid #dfe6e9;
  font-family: "Poppins", sans-serif;
`;

const LabSlot = styled.div`
  background-color: #e3f2fd;
  padding: 8px;
  border-radius: 6px;
  margin: 4px 0;
  text-align: center;
  font-family: "Poppins", sans-serif;
`;

const BatchDivider = styled.div`
  border-bottom: 1px dashed #3498db;
  margin: 6px 0;
`;

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #e74c3c;
  margin: 20px 0;
  font-family: "Poppins", sans-serif;
`;

const LabLocation = styled.span`
  font-weight: 600;
  color: #2c3e50;
  font-family: "Poppins", sans-serif;
`;

const DownloadButton = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin: 20px auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
  &:hover {
    background-color: #27ae60;
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.span`
  font-size: 1.1rem;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-top: 10px;
  font-family: "Poppins", sans-serif;
  padding: 8px;
  background-color: #fdecea;
  border-radius: 6px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    transform: translateY(-2px);
  }
`;

const SearchTimetable = () => {
  const navigate = useNavigate();
  const [collegeName, setCollegeName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [className, setClassName] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [classes, setClasses] = useState([]);
  const [availableTimetables, setAvailableTimetables] = useState([]);

  useEffect(() => {
    const allTimetablesHistory = JSON.parse(localStorage.getItem("allTimetablesHistory")) || [];
    const uniqueColleges = [...new Set(allTimetablesHistory.map(item => item.collegeName))];
    setColleges(uniqueColleges.sort());
  }, []);

  useEffect(() => {
    if (collegeName) {
      const allTimetablesHistory = JSON.parse(localStorage.getItem("allTimetablesHistory")) || [];
      const collegeBranches = allTimetablesHistory
        .filter(item => item.collegeName === collegeName)
        .map(item => item.branchName);
      const uniqueBranches = [...new Set(collegeBranches)].sort();
      setBranches(uniqueBranches);
    } else {
      setBranches([]);
      setBranchName("");
      setClasses([]);
      setClassName("");
    }
  }, [collegeName]);

  useEffect(() => {
    if (branchName) {
      const historyKey = `timetableHistory_${collegeName}_${branchName}`;
      const branchTimetables = JSON.parse(localStorage.getItem(historyKey)) || [];
      const uniqueClasses = [...new Set(branchTimetables.map(t => t.metadata?.className || "All Classes"))].sort();
      setClasses(uniqueClasses);
      setAvailableTimetables(branchTimetables);
    } else {
      setClasses([]);
      setClassName("");
      setAvailableTimetables([]);
    }
  }, [collegeName, branchName]);

  const handleSearch = async () => {
    if (!collegeName || !branchName) {
      setError("Please select both college and branch");
      return;
    }

    setLoading(true);
    setError("");
    setTimetable(null);

    try {
      const historyKey = `timetableHistory_${collegeName}_${branchName}`;
      const timetables = JSON.parse(localStorage.getItem(historyKey)) || [];
      
      if (timetables.length === 0) {
        throw new Error("No timetables found for the selected college and branch");
      }

      let filteredTimetables = timetables;
      if (className && className !== "All Classes") {
        filteredTimetables = timetables.filter(t => t.metadata?.className === className);
      }

      if (filteredTimetables.length === 0) {
        throw new Error("No timetables found for the selected criteria");
      }

      // Sort by most recent first
      filteredTimetables.sort((a, b) => 
        new Date(b.metadata?.generatedAt) - new Date(a.metadata?.generatedAt)
      );

      setTimetable(filteredTimetables[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("timetable-container");
    const timestamp = new Date().toISOString().slice(0, 10);

    html2canvas(input, { 
      scale: 2,
      logging: false,
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm"
      });
      
      const imgWidth = 280; // Landscape width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);
      pdf.save(`Timetable_${collegeName}_${branchName}_${timestamp}.pdf`);
    });
  };

  const renderTimetable = () => {
    if (!timetable) return null;

    const workingDays = timetable.metadata?.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const classTimes = timetable.metadata?.classTimes || ["9:00-10:00", "10:00-11:00", "11:00-12:00"];
    const labTimings = timetable.metadata?.labTimings || ["14:00-16:00"];
    const rooms = timetable.metadata?.rooms || ["101", "102", "103"];

    return (
      <div id="timetable-container">
        <TimetableContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SubTitle>
            {timetable.metadata?.collegeName} - {timetable.metadata?.branchName}
            {className && className !== "All Classes" && ` - ${className}`}
          </SubTitle>
          
          <RoomInfo>
            <span>📅 Generated on: {new Date(timetable.metadata?.generatedAt).toLocaleString() || "Unknown date"}</span>
          </RoomInfo>

          {Object.keys(timetable.timetable || {}).map((classKey, classIndex) => {
            const classData = timetable.timetable[classKey];
            const roomAssignment = timetable.metadata?.classRoomAssignment?.[classKey] || 
                                 rooms[classIndex % rooms.length];

            return (
              <div key={classIndex} style={{ marginBottom: '30px' }}>
                {timetable.metadata?.className && (
                  <RoomInfo>
                    <span>🏛️ Class: {classKey}</span>
                    <span>🚪 Room: {roomAssignment}</span>
                  </RoomInfo>
                )}
                
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
                    {classTimes.map((time, timeIndex) => (
                      <tr key={timeIndex}>
                        <Td highlight={timeIndex % 2 === 0}>{time}</Td>
                        {workingDays.map((day, dayIndex) => {
                          const dayKey = day.toLowerCase();
                          const daySchedule = classData?.[dayKey] || {};
                          const classSlot = daySchedule.classes?.find(cls => cls.time === time);

                          return (
                            <Td key={dayIndex} highlight={timeIndex % 2 === 0}>
                              {classSlot ? (
                                <>
                                  <strong>{classSlot.subject || "Not Assigned"}</strong>
                                  <br />
                                  <span>👨‍🏫 {classSlot.teacher || "Staff"}</span>
                                  {classSlot.room && (
                                    <>
                                      <br />
                                      <span>🏫 {classSlot.room}</span>
                                    </>
                                  )}
                                </>
                              ) : (
                                "No Class"
                              )}
                            </Td>
                          );
                        })}
                      </tr>
                    ))}

                    {labTimings.map((labTime, labIndex) => (
                      <tr key={`lab-${labIndex}`}>
                        <Td>🔬 Lab: {labTime}</Td>
                        {workingDays.map((day, dayIndex) => {
                          const dayKey = day.toLowerCase();
                          const labSlot = classData?.[dayKey]?.lab;

                          return (
                            <Td key={dayIndex}>
                              {labSlot ? (
                                <LabSlot>
                                  {labSlot.subject && (
                                    <>
                                      <strong>{labSlot.subject}</strong>
                                      <br />
                                    </>
                                  )}
                                  {labSlot.teacher && (
                                    <>
                                      <span>👨‍🏫 {labSlot.teacher}</span>
                                      <br />
                                    </>
                                  )}
                                  {labSlot.labLocation && (
                                    <>
                                      <span>📍 <LabLocation>{labSlot.labLocation}</LabLocation></span>
                                      <br />
                                    </>
                                  )}
                                  {labSlot.batch && (
                                    <span>👥 Batch: {labSlot.batch}</span>
                                  )}
                                </LabSlot>
                              ) : (
                                "No Lab"
                              )}
                            </Td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          })}

          <div style={{ textAlign: 'center' }}>
            <DownloadButton onClick={handleDownloadPDF}>
              <IconWrapper>
                <FaFilePdf />
              </IconWrapper>
              Download as PDF
            </DownloadButton>
          </div>

          <ButtonGroup>
            <ActionButton 
              onClick={() => navigate("/generate-time-table")}
              style={{ backgroundColor: "#2ecc71", color: "white" }}
            >
              <FaPlus /> New Timetable
            </ActionButton>
            <ActionButton 
              onClick={() => navigate("/timetable-history")}
              style={{ backgroundColor: "#9b59b6", color: "white" }}
            >
              <FaHistory /> View History
            </ActionButton>
          </ButtonGroup>
        </TimetableContainer>
      </div>
    );
  };

  return (
    <Container>
      <Title>Search Timetable</Title>
      
      <SearchContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SelectField
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        >
          <option value="">Select College</option>
          {colleges.map((college, index) => (
            <option key={index} value={college}>
              {college}
            </option>
          ))}
        </SelectField>

        <SelectField
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          disabled={!collegeName}
        >
          <option value="">Select Branch</option>
          {branches.map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </SelectField>

        <SelectField
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          disabled={!branchName}
        >
          <option value="All Classes">All Classes</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls}>
              {cls}
            </option>
          ))}
        </SelectField>

        <Button 
          onClick={handleSearch} 
          disabled={!collegeName || !branchName || loading}
        >
          {loading ? (
            <>
              <RotateLoader color="#ffffff" size={8} />
              Searching...
            </>
          ) : (
            <>
              <FaSearch /> Search Timetable
            </>
          )}
        </Button>

        {loading && (
          <LoadingContainer>
            <RotateLoader color="#3498db" size={15} />
          </LoadingContainer>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SearchContainer>

      {renderTimetable()}
    </Container>
  );
};

export default SearchTimetable;