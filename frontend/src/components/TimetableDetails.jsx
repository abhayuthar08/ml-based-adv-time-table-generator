// // TimetableDetails.js
// import { useLocation, useNavigate } from "react-router-dom";
// import styled from "styled-components";

// const Container = styled.div`
//   padding: 50px;
//   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
//   min-height: 100vh;
// `;

// const Title = styled.h1`
//   color: #fff;
//   font-size: 3rem;
//   text-align: center;
//   margin-bottom: 30px;
// `;

// const DetailsContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.9);
//   padding: 30px;
//   border-radius: 10px;
//   max-width: 1000px;
//   margin: 0 auto;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// `;

// const TimetableMeta = styled.div`
//   margin-bottom: 20px;
//   padding-bottom: 20px;
//   border-bottom: 1px solid #ddd;
// `;

// const MetaTitle = styled.h2`
//   color: #333;
//   margin: 0 0 10px 0;
// `;

// const MetaText = styled.p`
//   color: #666;
//   margin: 5px 0;
// `;

// const DaySection = styled.div`
//   margin-bottom: 30px;
// `;

// const DayTitle = styled.h3`
//   color: #fda085;
//   margin: 20px 0 10px 0;
// `;

// const ClassRow = styled.div`
//   display: flex;
//   border-bottom: 1px solid #eee;
//   padding: 8px 0;
// `;

// const TimeCell = styled.div`
//   width: 100px;
//   font-weight: bold;
// `;

// const ClassCell = styled.div`
//   flex: 1;
// `;

// const BackButton = styled.button`
//   padding: 10px 20px;
//   background-color: #fda085;
//   border: none;
//   border-radius: 5px;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   margin-top: 20px;
  
//   &:hover {
//     background-color: #f6d365;
//   }
// `;

// const TimetableDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
  
//   if (!state?.timetables || state.timetables.length === 0) {
//     return (
//       <Container>
//         <Title>No Timetable Data Found</Title>
//         <BackButton onClick={() => navigate("/timetable-history")}>Back to History</BackButton>
//       </Container>
//     );
//   }

//   // For now, we'll just show the most recent timetable
//   const timetable = state.timetables[0];
//   const metadata = timetable.metadata || {};

//   return (
//     <Container>
//       <Title>Timetable Details</Title>
//       <DetailsContainer>
//         <TimetableMeta>
//           <MetaTitle>{metadata.collegeName || "Unknown College"} - {metadata.branchName || "Unknown Branch"}</MetaTitle>
//           <MetaText>Generated on: {metadata.generatedAt || "Unknown date"}</MetaText>
//         </TimetableMeta>

//         {timetable.timetable && Object.entries(timetable.timetable).map(([day, classes]) => (
//           <DaySection key={day}>
//             <DayTitle>{day}</DayTitle>
//             {classes.map((cls, index) => (
//               <ClassRow key={index}>
//                 <TimeCell>{cls.time}</TimeCell>
//                 <ClassCell>
//                   {cls.subject} ({cls.teacher}) - {cls.class} - {cls.room}
//                 </ClassCell>
//               </ClassRow>
//             ))}
//           </DaySection>
//         ))}

//         {timetable.labTimings && (
//           <DaySection>
//             <DayTitle>Lab Sessions</DayTitle>
//             {timetable.labTimings.map((lab, index) => (
//               <ClassRow key={index}>
//                 <TimeCell>{lab.time}</TimeCell>
//                 <ClassCell>
//                   {lab.subject} - {lab.batch} - {lab.location}
//                 </ClassCell>
//               </ClassRow>
//             ))}
//           </DaySection>
//         )}

//         <BackButton onClick={() => navigate(-1)}>Back to History</BackButton>
//       </DetailsContainer>
//     </Container>
//   );
// };

// export default TimetableDetails;

import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

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

const DetailsContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const TimetableMeta = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const MetaTitle = styled.h2`
  color: #333;
  margin: 0 0 10px 0;
`;

const MetaText = styled.p`
  color: #666;
  margin: 5px 0;
`;

const DaySection = styled.div`
  margin-bottom: 30px;
`;

const DayTitle = styled.h3`
  color: #fda085;
  margin: 20px 0 10px 0;
`;

const ClassRow = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 8px 0;
`;

const TimeCell = styled.div`
  width: 100px;
  font-weight: bold;
`;

const ClassCell = styled.div`
  flex: 1;
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

const ErrorMessage = styled.div`
  color: #ff4d4d;
  background-color: #ffecec;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  text-align: center;
`;

const TimetableDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    if (!state) {
      setError("No timetable data provided");
      return;
    }

    try {
      // Handle both single timetable and array of timetables
      const timetables = state.timetables || (state.timetable ? [state] : []);
      
      if (timetables.length === 0) {
        setError("No timetable data found");
        return;
      }

      // Use the first timetable if array, or the single timetable
      const selectedTimetable = Array.isArray(timetables) ? timetables[0] : timetables;
      
      // Ensure timetable data is properly formatted
      if (!selectedTimetable.timetable && !selectedTimetable.labTimings) {
        setError("Invalid timetable format");
        return;
      }

      // Ensure classes is an array for each day
      const formattedTimetable = { ...selectedTimetable };
      if (formattedTimetable.timetable) {
        Object.keys(formattedTimetable.timetable).forEach(day => {
          if (!Array.isArray(formattedTimetable.timetable[day])) {
            formattedTimetable.timetable[day] = [];
          }
        });
      }

      if (formattedTimetable.labTimings && !Array.isArray(formattedTimetable.labTimings)) {
        formattedTimetable.labTimings = [];
      }

      setTimetable(formattedTimetable);
      setMetadata(formattedTimetable.metadata || {});
    } catch (err) {
      console.error("Error processing timetable data:", err);
      setError("Failed to process timetable data");
    }
  }, [state]);

  if (error) {
    return (
      <Container>
        <Title>Timetable Error</Title>
        <DetailsContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton onClick={() => navigate("/timetable-history")}>Back to History</BackButton>
        </DetailsContainer>
      </Container>
    );
  }

  if (!timetable) {
    return (
      <Container>
        <Title>Loading Timetable...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Timetable Details</Title>
      <DetailsContainer>
        <TimetableMeta>
          <MetaTitle>{metadata.collegeName || "Unknown College"} - {metadata.branchName || "Unknown Branch"}</MetaTitle>
          <MetaText>Generated on: {metadata.generatedAt || "Unknown date"}</MetaText>
          {metadata.id && <MetaText>ID: {metadata.id}</MetaText>}
        </TimetableMeta>

        {timetable.timetable && Object.entries(timetable.timetable).map(([day, classes]) => (
          <DaySection key={day}>
            <DayTitle>{day}</DayTitle>
            {Array.isArray(classes) && classes.length > 0 ? (
              classes.map((cls, index) => (
                <ClassRow key={index}>
                  <TimeCell>{cls.time || "N/A"}</TimeCell>
                  <ClassCell>
                    {cls.subject || "No subject"} ({cls.teacher || "No teacher"}) - {cls.class || "No class"} - {cls.room || "No room"}
                  </ClassCell>
                </ClassRow>
              ))
            ) : (
              <ClassRow>
                <ClassCell>No classes scheduled for this day</ClassCell>
              </ClassRow>
            )}
          </DaySection>
        ))}

        {timetable.labTimings && timetable.labTimings.length > 0 && (
          <DaySection>
            <DayTitle>Lab Sessions</DayTitle>
            {timetable.labTimings.map((lab, index) => (
              <ClassRow key={index}>
                <TimeCell>{lab.time || "N/A"}</TimeCell>
                <ClassCell>
                  {lab.subject || "No subject"} - {lab.batch || "No batch"} - {lab.location || "No location"}
                </ClassCell>
              </ClassRow>
            ))}
          </DaySection>
        )}

        <BackButton onClick={() => navigate(-1)}>Back to History</BackButton>
      </DetailsContainer>
    </Container>
  );
};

export default TimetableDetails;