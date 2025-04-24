// TimetableHistory.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 50px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 30px;
`;

const HistoryContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const TimetableItem = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f8f8;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TimetableTitle = styled.h3`
  color: #333;
  margin: 0 0 5px 0;
`;

const TimetableMeta = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #fda085;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background-color: #f6d365;
  }
`;

const TimetableHistory = () => {
  const [timetables, setTimetables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allTimetablesHistory = JSON.parse(localStorage.getItem("allTimetablesHistory")) || [];
    setTimetables(allTimetablesHistory);
  }, []);

//   const handleTimetableClick = (key) => {
//     const timetableData = JSON.parse(localStorage.getItem(key));
//     if (timetableData && timetableData.length > 0) {
//       navigate("/timetable-details", { state: { timetables: timetableData } });
//     }
//   };

  return (
    <Container>
      <Title>Saved Timetables</Title>
      <HistoryContainer>
        {timetables.length === 0 ? (
          <p>No saved timetables found.</p>
        ) : (
          timetables.map((item, index) => (
            <TimetableItem key={index} onClick={() => handleTimetableClick(item.key)}>
              <TimetableTitle>{item.collegeName} - {item.branchName}</TimetableTitle>
              <TimetableMeta>Generated: {item.timestamp}</TimetableMeta>
            </TimetableItem>
          ))
        )}
        {/* <BackButton onClick={() => navigate("/generate-time-table")}>Back to Generator</BackButton> */}
      </HistoryContainer>
    </Container>
  );
};

export default TimetableHistory;