// //the finallllllllll
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// // Styled Components (unchanged)
// const Container = styled.div`
//   padding: 50px;
//   // background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
//   background: linear-gradient(135deg, #76b5c5 0%, #063970 100%);
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const Title = styled.h1`
//   color: #fff;
//   font-size: 4rem;
//   text-align: center;
// `;

// const FormContainer = styled.form`
//   background-color: rgba(255, 255, 255, 0.9);
//   padding: 30px;
//   border-radius: 10px;
//   width: 100%;
//   max-width: 600px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// `;

// const InputField = styled.input`
//   width: 100%;
//   padding: 12px;
//   margin: 10px 0;
//   border-radius: 5px;
//   border: 1px solid #ddd;
//   transition: all 0.3s ease-in-out;
//   &:focus {
//     border-color: #fda085;
//     outline: none;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 14px;
//   background-color: #fda085;
//   border: none;
//   border-radius: 5px;
//   font-size: 1.2rem;
//   cursor: pointer;
//   transition: all 0.3s ease-in-out;
//   &:hover {
//     background-color: #f6d365;
//   }
// `;

// const SectionTitle = styled.h3`
//   color: #333;
//   margin-bottom: 15px;
//   font-size: 1.5rem;
//   font-weight: bold;
// `;

// const List = styled.ul`
//   margin: 10px 0;
// `;

// const ListItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 8px 0;
//   border-bottom: 1px solid #ddd;
// `;

// const RemoveButton = styled.button`
//   color: red;
//   background: none;
//   border: none;
//   cursor: pointer;
//   transition: all 0.3s ease-in-out;
//   &:hover {
//     color: #ff4d4d;
//   }
// `;

// const GenerateTimetable = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     collegeName: "",
//     branchName: "",
//     workingDays: [],
//     classTimes: [],
//     totalClasses: [],
//     subjects: [],
//     rooms: [],
//     labLocations: [],
//     batches: [],
//     classDuration: "",
//     totalClassesPerDay: "",
//     labTimings: [],
//   });

//   const [error, setError] = useState(null);
//   const [classTimeInput, setClassTimeInput] = useState("");
//   const [classInput, setClassInput] = useState("");
//   const [roomInput, setRoomInput] = useState("");
//   const [labLocationInput, setLabLocationInput] = useState("");
//   const [batchInput, setBatchInput] = useState("");
//   const [subjectInput, setSubjectInput] = useState("");
//   const [subjectTeachersInput, setSubjectTeachersInput] = useState("");
//   const [weeklyClassesInput, setWeeklyClassesInput] = useState("");
//   const [labTimingInput, setLabTimingInput] = useState("");

//   // Load saved data from localStorage on component mount
//   useEffect(() => {
//     const savedData = localStorage.getItem("timetableFormData");
//     if (savedData) {
//       setFormData(JSON.parse(savedData));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const addClassTime = () => {
//     if (!classTimeInput.trim()) {
//       setError("Class time cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       classTimes: [...formData.classTimes, classTimeInput.trim()],
//     });
//     setClassTimeInput("");
//     setError(null);
//   };

//   const removeClassTime = (index) => {
//     setFormData({
//       ...formData,
//       classTimes: formData.classTimes.filter((_, idx) => idx !== index),
//     });
//   };

//   const addClass = () => {
//     if (!classInput.trim()) {
//       setError("Class name cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       totalClasses: [...formData.totalClasses, classInput.trim()],
//     });
//     setClassInput("");
//     setError(null);
//   };

//   const removeClass = (index) => {
//     setFormData({
//       ...formData,
//       totalClasses: formData.totalClasses.filter((_, idx) => idx !== index),
//     });
//   };

//   const addSubject = () => {
//     if (!subjectInput.trim() || !subjectTeachersInput.trim() || !weeklyClassesInput.trim()) {
//       setError("Subject name, teachers, and weekly classes cannot be empty.");
//       return;
//     }

//     const teachers = subjectTeachersInput
//       .split(",")
//       .map((teacher) => teacher.trim())
//       .filter(Boolean);

//     if (teachers.length === 0) {
//       setError("At least one teacher must be provided.");
//       return;
//     }

//     const weeklyClasses = parseInt(weeklyClassesInput, 10);
//     if (isNaN(weeklyClasses)) {
//       setError("Weekly classes must be a valid number.");
//       return;
//     }

//     setFormData({
//       ...formData,
//       subjects: [
//         ...formData.subjects,
//         {
//           name: subjectInput.trim(),
//           teachers,
//           weeklyClasses,
//         },
//       ],
//     });

//     setSubjectInput("");
//     setSubjectTeachersInput("");
//     setWeeklyClassesInput("");
//     setError(null);
//   };

//   const removeSubject = (index) => {
//     setFormData({
//       ...formData,
//       subjects: formData.subjects.filter((_, idx) => idx !== index),
//     });
//   };

//   const addRoom = () => {
//     if (!roomInput.trim()) {
//       setError("Room name cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       rooms: [...formData.rooms, roomInput.trim()],
//     });
//     setRoomInput("");
//     setError(null);
//   };

//   const removeRoom = (index) => {
//     setFormData({
//       ...formData,
//       rooms: formData.rooms.filter((_, idx) => idx !== index),
//     });
//   };

//   const addLabLocation = () => {
//     if (!labLocationInput.trim()) {
//       setError("Lab location cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       labLocations: [...formData.labLocations, labLocationInput.trim()],
//     });
//     setLabLocationInput("");
//     setError(null);
//   };

//   const removeLabLocation = (index) => {
//     setFormData({
//       ...formData,
//       labLocations: formData.labLocations.filter((_, idx) => idx !== index),
//     });
//   };

//   const addBatch = () => {
//     if (!batchInput.trim()) {
//       setError("Batch name cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       batches: [...formData.batches, batchInput.trim()],
//     });
//     setBatchInput("");
//     setError(null);
//   };

//   const removeBatch = (index) => {
//     setFormData({
//       ...formData,
//       batches: formData.batches.filter((_, idx) => idx !== index),
//     });
//   };

//   const addLabTiming = () => {
//     if (!labTimingInput.trim()) {
//       setError("Lab timing cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       labTimings: [...formData.labTimings, labTimingInput.trim()],
//     });
//     setLabTimingInput("");
//     setError(null);
//   };

//   const removeLabTiming = (index) => {
//     setFormData({
//       ...formData,
//       labTimings: formData.labTimings.filter((_, idx) => idx !== index),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.collegeName || !formData.branchName || !formData.subjects?.length) {
//       setError("Please fill in all required fields, including subjects.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/generate-time-table", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to generate timetable");
//       }

//       const data = await res.json();
//       console.log("🛠 Full API Response:", JSON.stringify(data, null, 2));

//       // Save form data to localStorage
//       localStorage.setItem("timetableFormData", JSON.stringify(formData));

//       navigate("/result-time-table", {
//         state: {
//           timetable: data.timetable ?? {},
//           workingDays: data.workingDays ?? [],
//           classTimes: data.classTimes ?? [],
//           labTimings: data.labTimings, // Ensure this is passed
//     classRoomAssignment: data.classRoomAssignment,
//         },
//       });
//     } catch (err) {
//       setError(err.message);
//       console.error("❌ Error:", err.message);
//     }
//   };

//   const clearSavedData = () => {
//     localStorage.removeItem("timetableFormData");
//     setFormData({
//       collegeName: "",
//       branchName: "",
//       workingDays: [],
//       classTimes: [],
//       totalClasses: [],
//       subjects: [],
//       rooms: [],
//       labLocations: [],
//       batches: [],
//       classDuration: "",
//       totalClassesPerDay: "",
//       labTimings: [],
//     });
//   };

//   return (
//     <Container>
//       <Title className="font-xl text-black">Generate Timetable</Title>
//       <FormContainer onSubmit={handleSubmit}>
//         <SectionTitle>General Information</SectionTitle>
//         <InputField
//           type="text"
//           name="collegeName"
//           value={formData.collegeName}
//           onChange={handleChange}
//           placeholder="College Name"
//           required
//         />
//         <InputField
//           type="text"
//           name="branchName"
//           value={formData.branchName}
//           onChange={handleChange}
//           placeholder="Branch Name"
//           required
//         />

//         <SectionTitle>Working Days</SectionTitle>
//         <InputField
//           type="text"
//           name="workingDays"
//           value={formData.workingDays.join(", ")}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               workingDays: e.target.value
//                 .split(",")
//                 .map((day) => day.trim())
//                 .filter(Boolean),
//             })
//           }
//           placeholder="e.g., Monday, Tuesday"
//           required
//         />

//         <SectionTitle>Class Times</SectionTitle>
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Add class time (e.g., 9:00-10:00)"
//             value={classTimeInput}
//             onChange={(e) => setClassTimeInput(e.target.value)}
//           />
//           <Button type="button" onClick={addClassTime}>
//             Add Class Time
//           </Button>
//         </div>
//         <List>
//           {formData.classTimes.map((time, index) => (
//             <ListItem key={index}>
//               {time}
//               <RemoveButton type="button" onClick={() => removeClassTime(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

//         <SectionTitle>Lab Timings</SectionTitle>
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Add lab timing (e.g., 2:00-4:00)"
//             value={labTimingInput}
//             onChange={(e) => setLabTimingInput(e.target.value)}
//           />
//           <Button type="button" onClick={addLabTiming}>
//             Add Lab Timing
//           </Button>
//         </div>
//         <List>
//           {formData.labTimings.map((timing, index) => (
//             <ListItem key={index}>
//               {timing}
//               <RemoveButton type="button" onClick={() => removeLabTiming(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

//         <SectionTitle>Total Classes</SectionTitle>
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Add class (e.g., CS-I)"
//             value={classInput}
//             onChange={(e) => setClassInput(e.target.value)}
//           />
//           <Button type="button" onClick={addClass}>
//             Add Class
//           </Button>
//         </div>
//         <List>
//           {formData.totalClasses.map((className, index) => (
//             <ListItem key={index}>
//               {className}
//               <RemoveButton type="button" onClick={() => removeClass(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

//         <SectionTitle>Subjects</SectionTitle>
//         <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Subject Name"
//             value={subjectInput}
//             onChange={(e) => setSubjectInput(e.target.value)}
//           />
//           <InputField
//             type="text"
//             placeholder="Teachers (comma-separated)"
//             value={subjectTeachersInput}
//             onChange={(e) => setSubjectTeachersInput(e.target.value)}
//           />
//           <InputField
//             type="number"
//             placeholder="Weekly Classes"
//             value={weeklyClassesInput}
//             onChange={(e) => setWeeklyClassesInput(e.target.value)}
//           />
//           <Button type="button" onClick={addSubject}>
//             Add Subject
//           </Button>
//         </div>
//         <List>
//           {formData.subjects.map((subject, index) => (
//             <ListItem key={index}>
//               <div>
//                 <strong>{subject.name}</strong> - {subject.teachers.join(", ")} (Weekly Classes: {subject.weeklyClasses})
//               </div>
//               <RemoveButton type="button" onClick={() => removeSubject(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

//         <SectionTitle>Class Duration & Classes per Day</SectionTitle>
//         <InputField
//           type="text"
//           name="classDuration"
//           value={formData.classDuration}
//           onChange={handleChange}
//           placeholder="Class Duration (e.g., 60 minutes)"
//           required
//         />
//         <InputField
//           type="text"
//           name="totalClassesPerDay"
//           value={formData.totalClassesPerDay}
//           onChange={handleChange}
//           placeholder="Total Classes per Day (e.g., 6)"
//           required
//         />

//         <SectionTitle>Rooms</SectionTitle>
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Add room (e.g., Room 101)"
//             value={roomInput}
//             onChange={(e) => setRoomInput(e.target.value)}
//           />
//           <Button type="button" onClick={addRoom}>
//             Add Room
//           </Button>
//         </div>
//         <List>
//           {formData.rooms.map((room, index) => (
//             <ListItem key={index}>
//               {room}
//               <RemoveButton type="button" onClick={() => removeRoom(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

//         <SectionTitle>Lab Locations</SectionTitle>
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Add lab location (e.g., Lab 101)"
//             value={labLocationInput}
//             onChange={(e) => setLabLocationInput(e.target.value)}
//           />
//           <Button type="button" onClick={addLabLocation}>
//             Add Lab Location
//           </Button>
//         </div>
//         <List>
//           {formData.labLocations.map((labLocation, index) => (
//             <ListItem key={index}>
//               {labLocation}
//               <RemoveButton type="button" onClick={() => removeLabLocation(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

//         <SectionTitle>Batches</SectionTitle>
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Add batch (e.g., Batch A)"
//             value={batchInput}
//             onChange={(e) => setBatchInput(e.target.value)}
//           />
//           <Button type="button" onClick={addBatch}>
//             Add Batch
//           </Button>
//         </div>
//         <List>
//           {formData.batches.map((batch, index) => (
//             <ListItem key={index}>
//               {batch}
//               <RemoveButton type="button" onClick={() => removeBatch(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <Button type="submit">Generate Timetable</Button>
//         <Button type="button" onClick={clearSavedData} style={{ marginTop: "10px", backgroundColor: "#ff4d4d" }}>
//           Clear Saved Data
//         </Button>
//       {/* </Form> */}
//       </FormContainer>
//     </Container>
//   );
// };

// export default GenerateTimetable;








import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components (unchanged)
const Container = styled.div`
  padding: 50px;
  background: linear-gradient(135deg, #76b5c5 0%, #063970 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 4rem;
  text-align: center;
`;

const FormContainer = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: all 0.3s ease-in-out;
  &:focus {
    border-color: #fda085;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #fda085;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #f6d365;
  }
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const List = styled.ul`
  margin: 10px 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
`;

const RemoveButton = styled.button`
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #ff4d4d;
  }
`;

const LabSessionContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const TimeInputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const TimeSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const GenerateTimetable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collegeName: "",
    branchName: "",
    workingDays: [],
    classTimes: [],
    totalClasses: [],
    subjects: [],
    rooms: [],
    labLocations: [],
    batches: [],
    classDuration: "",
    totalClassesPerDay: "",
    labTimings: [],
  });

  const [error, setError] = useState(null);
  const [classInput, setClassInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [batchInput, setBatchInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjectTeachersInput, setSubjectTeachersInput] = useState("");
  const [weeklyClassesInput, setWeeklyClassesInput] = useState("");
  const [labLocationInput, setLabLocationInput] = useState("");
  const [includeLabs, setIncludeLabs] = useState(false);

  // Time inputs state
  const [timeInputs, setTimeInputs] = useState({
    startHour: "9",
    startMinute: "00",
    startAmPm: "AM",
    endHour: "10",
    endMinute: "00",
    endAmPm: "AM",
    labStartHour: "2",
    labStartMinute: "00",
    labStartAmPm: "PM",
    labEndHour: "4",
    labEndMinute: "00",
    labEndAmPm: "PM"
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Convert time string to minutes for comparison
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let total = hours % 12 * 60 + minutes;
    if (period === "PM") total += 12 * 60;
    return total;
  };

  // Check for time conflicts
  const hasTimeConflict = (newStart, newEnd, existingTimes = []) => {
    const newStartMin = timeToMinutes(newStart);
    const newEndMin = timeToMinutes(newEnd);
    
    for (const timeRange of existingTimes) {
      if (!timeRange) continue;
      const [existingStart, existingEnd] = timeRange.split(" - ");
      const existingStartMin = timeToMinutes(existingStart);
      const existingEndMin = timeToMinutes(existingEnd);
      
      if ((newStartMin >= existingStartMin && newStartMin < existingEndMin) ||
          (newEndMin > existingStartMin && newEndMin <= existingEndMin) ||
          (newStartMin <= existingStartMin && newEndMin >= existingEndMin)) {
        return true;
      }
    }
    return false;
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("timetableFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const safeData = {
          collegeName: parsedData.collegeName || "",
          branchName: parsedData.branchName || "",
          workingDays: parsedData.workingDays || [],
          classTimes: parsedData.classTimes || [],
          totalClasses: parsedData.totalClasses || [],
          subjects: parsedData.subjects || [],
          rooms: parsedData.rooms || [],
          labLocations: parsedData.labLocations || [],
          batches: parsedData.batches || [],
          classDuration: parsedData.classDuration || "",
          totalClassesPerDay: parsedData.totalClassesPerDay || "",
          labTimings: parsedData.labTimings || [],
        };
        setFormData(safeData);
        setIncludeLabs((parsedData.labTimings?.length || 0) > 0);
      } catch (err) {
        console.error("Error parsing saved data:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDaySelection = (day) => {
    setFormData(prev => {
      if (prev.workingDays.includes(day)) {
        return {
          ...prev,
          workingDays: prev.workingDays.filter(d => d !== day)
        };
      } else {
        return {
          ...prev,
          workingDays: [...prev.workingDays, day]
        };
      }
    });
  };

  const addClassTime = () => {
    const startTime = `${timeInputs.startHour}:${timeInputs.startMinute} ${timeInputs.startAmPm}`;
    const endTime = `${timeInputs.endHour}:${timeInputs.endMinute} ${timeInputs.endAmPm}`;
    const timeSlot = `${startTime} - ${endTime}`;

    // Validate time slot
    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
      setError("End time must be after start time");
      return;
    }

    // Check for overlapping times
    if (hasTimeConflict(startTime, endTime, formData.classTimes)) {
      setError("This time slot overlaps with an existing class time");
      return;
    }

    if (includeLabs && hasTimeConflict(startTime, endTime, formData.labTimings)) {
      setError("This time slot overlaps with an existing lab time");
      return;
    }

    setFormData({
      ...formData,
      classTimes: [...formData.classTimes, timeSlot],
    });
    setError(null);
  };

  const removeClassTime = (index) => {
    setFormData({
      ...formData,
      classTimes: formData.classTimes.filter((_, idx) => idx !== index),
    });
  };

  const addClass = () => {
    if (!classInput.trim()) {
      setError("Class name cannot be empty.");
      return;
    }
    setFormData({
      ...formData,
      totalClasses: [...formData.totalClasses, classInput.trim()],
    });
    setClassInput("");
    setError(null);
  };

  const removeClass = (index) => {
    setFormData({
      ...formData,
      totalClasses: formData.totalClasses.filter((_, idx) => idx !== index),
    });
  };

  const addSubject = () => {
    if (!subjectInput.trim() || !subjectTeachersInput.trim() || !weeklyClassesInput.trim()) {
      setError("Subject name, teachers, and weekly classes cannot be empty.");
      return;
    }

    const teachers = subjectTeachersInput
      .split(",")
      .map((teacher) => teacher.trim())
      .filter(Boolean);

    if (teachers.length === 0) {
      setError("At least one teacher must be provided.");
      return;
    }

    const weeklyClasses = parseInt(weeklyClassesInput, 10);
    if (isNaN(weeklyClasses)) {
      setError("Weekly classes must be a valid number.");
      return;
    }

    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        {
          name: subjectInput.trim(),
          teachers,
          weeklyClasses,
        },
      ],
    });

    setSubjectInput("");
    setSubjectTeachersInput("");
    setWeeklyClassesInput("");
    setError(null);
  };

  const removeSubject = (index) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((_, idx) => idx !== index),
    });
  };

  const addRoom = () => {
    if (!roomInput.trim()) {
      setError("Room name cannot be empty.");
      return;
    }
    setFormData({
      ...formData,
      rooms: [...formData.rooms, roomInput.trim()],
    });
    setRoomInput("");
    setError(null);
  };

  const removeRoom = (index) => {
    setFormData({
      ...formData,
      rooms: formData.rooms.filter((_, idx) => idx !== index),
    });
  };

  const addLabLocation = () => {
    if (!labLocationInput.trim()) {
      setError("Lab location cannot be empty.");
      return;
    }
    setFormData({
      ...formData,
      labLocations: [...formData.labLocations, labLocationInput.trim()],
    });
    setLabLocationInput("");
    setError(null);
  };

  const removeLabLocation = (index) => {
    setFormData({
      ...formData,
      labLocations: formData.labLocations.filter((_, idx) => idx !== index),
    });
  };

  const addBatch = () => {
    if (!batchInput.trim()) {
      setError("Batch name cannot be empty.");
      return;
    }
    setFormData({
      ...formData,
      batches: [...formData.batches, batchInput.trim()],
    });
    setBatchInput("");
    setError(null);
  };

  const removeBatch = (index) => {
    setFormData({
      ...formData,
      batches: formData.batches.filter((_, idx) => idx !== index),
    });
  };

  const addLabTiming = () => {
    const startTime = `${timeInputs.labStartHour}:${timeInputs.labStartMinute} ${timeInputs.labStartAmPm}`;
    const endTime = `${timeInputs.labEndHour}:${timeInputs.labEndMinute} ${timeInputs.labEndAmPm}`;
    const timeSlot = `${startTime} - ${endTime}`;

    // Validate time slot
    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
      setError("Lab end time must be after start time");
      return;
    }

    // Check for overlapping times with regular classes
    if (hasTimeConflict(startTime, endTime, formData.classTimes)) {
      setError("This lab time slot overlaps with existing class times");
      return;
    }

    // Check for overlapping times with other lab sessions
    if (hasTimeConflict(startTime, endTime, formData.labTimings)) {
      setError("This lab time slot overlaps with existing lab times");
      return;
    }

    setFormData({
      ...formData,
      labTimings: [...formData.labTimings, timeSlot],
    });
    setError(null);
  };

  const removeLabTiming = (index) => {
    setFormData({
      ...formData,
      labTimings: formData.labTimings.filter((_, idx) => idx !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.collegeName || !formData.branchName || !formData.subjects?.length) {
      setError("Please fill in all required fields, including subjects.");
      return;
    }

    if (formData.workingDays.length === 0) {
      setError("Please select at least one working day");
      return;
    }

    if (formData.classTimes.length === 0) {
      setError("Please add at least one class time");
      return;
    }

    // Validate teacher availability
    const teacherCounts = {};
    formData.subjects.forEach(subject => {
      subject.teachers.forEach(teacher => {
        teacherCounts[teacher] = (teacherCounts[teacher] || 0) + subject.weeklyClasses;
      });
    });

    const totalWeeklyClasses = formData.workingDays.length * formData.classTimes.length * formData.totalClasses.length;
    const requiredTeachers = Math.ceil(totalWeeklyClasses / 5);

    if (Object.keys(teacherCounts).length < requiredTeachers) {
      setError(`Insufficient teachers. You have ${Object.keys(teacherCounts).length} teachers but approximately ${requiredTeachers} are needed.`);
      return;
    }

    // Validate lab requirements if lab section is enabled
    if (includeLabs) {
      if (formData.batches.length === 0) {
        setError("Please add at least one batch for lab sessions.");
        return;
      }

      if (formData.labLocations.length < formData.batches.length) {
        setError(`You need at least ${formData.batches.length} lab locations to accommodate all batches simultaneously.`);
        return;
      }

      if (formData.labTimings.length === 0) {
        setError("Please add at least one lab timing.");
        return;
      }
    }

    try {
      const res = await fetch("http://localhost:5000/generate-time-table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          includeLabs
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate timetable");
      }

      const data = await res.json();
      console.log("🛠 Full API Response:", JSON.stringify(data, null, 2));

      localStorage.setItem("timetableFormData", JSON.stringify(formData));

      navigate("/result-time-table", {
        state: {
          timetable: data.timetable ?? {},
          workingDays: data.workingDays ?? [],
          classTimes: data.classTimes ?? [],
          labTimings: data.labTimings ?? [],
          classRoomAssignment: data.classRoomAssignment ?? {},
        },
      });
    } catch (err) {
      setError(err.message);
      console.error("❌ Error:", err.message);
    }
  };

  const clearSavedData = () => {
    localStorage.removeItem("timetableFormData");
    setFormData({
      collegeName: "",
      branchName: "",
      workingDays: [],
      classTimes: [],
      totalClasses: [],
      subjects: [],
      rooms: [],
      labLocations: [],
      batches: [],
      classDuration: "",
      totalClassesPerDay: "",
      labTimings: [],
    });
    setIncludeLabs(false);
  };

  return (
    <Container>
      <Title className="font-xl text-black">Generate Timetable</Title>
      <FormContainer onSubmit={handleSubmit}>
        <SectionTitle>General Information</SectionTitle>
        <InputField
          type="text"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
          placeholder="College Name"
          required
        />
        <InputField
          type="text"
          name="branchName"
          value={formData.branchName}
          onChange={handleChange}
          placeholder="Branch Name"
          required
        />

        <SectionTitle>Working Days</SectionTitle>
        <CheckboxContainer>
          {daysOfWeek.map(day => (
            <CheckboxLabel key={day}>
              <input
                type="checkbox"
                checked={formData.workingDays.includes(day)}
                onChange={() => toggleDaySelection(day)}
              />
              {day}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>

        <SectionTitle>Class Times</SectionTitle>
        <div style={{ marginBottom: "15px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <TimeInputContainer>
              <span>From:</span>
              <TimeSelect 
                value={timeInputs.startHour} 
                onChange={(e) => setTimeInputs({...timeInputs, startHour: e.target.value})}
              >
                {Array.from({length: 12}, (_, i) => i + 1).map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </TimeSelect>
              <span>:</span>
              <TimeSelect 
                value={timeInputs.startMinute} 
                onChange={(e) => setTimeInputs({...timeInputs, startMinute: e.target.value})}
              >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </TimeSelect>
              <TimeSelect 
                value={timeInputs.startAmPm} 
                onChange={(e) => setTimeInputs({...timeInputs, startAmPm: e.target.value})}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </TimeSelect>
            </TimeInputContainer>

            <TimeInputContainer>
              <span>To:</span>
              <TimeSelect 
                value={timeInputs.endHour} 
                onChange={(e) => setTimeInputs({...timeInputs, endHour: e.target.value})}
              >
                {Array.from({length: 12}, (_, i) => i + 1).map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </TimeSelect>
              <span>:</span>
              <TimeSelect 
                value={timeInputs.endMinute} 
                onChange={(e) => setTimeInputs({...timeInputs, endMinute: e.target.value})}
              >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </TimeSelect>
              <TimeSelect 
                value={timeInputs.endAmPm} 
                onChange={(e) => setTimeInputs({...timeInputs, endAmPm: e.target.value})}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </TimeSelect>
            </TimeInputContainer>
          </div>
          <Button type="button" onClick={addClassTime}>
            Add Class Time
          </Button>
        </div>
        <List>
          {formData.classTimes.map((time, index) => (
            <ListItem key={index}>
              {time}
              <RemoveButton type="button" onClick={() => removeClassTime(index)}>
                Remove
              </RemoveButton>
            </ListItem>
          ))}
        </List>

        <SectionTitle>Total Classes</SectionTitle>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <InputField
            type="text"
            placeholder="Add class (e.g., CS-I)"
            value={classInput}
            onChange={(e) => setClassInput(e.target.value)}
          />
          <Button type="button" onClick={addClass}>
            Add Class
          </Button>
        </div>
        <List>
          {formData.totalClasses.map((className, index) => (
            <ListItem key={index}>
              {className}
              <RemoveButton type="button" onClick={() => removeClass(index)}>
                Remove
              </RemoveButton>
            </ListItem>
          ))}
        </List>

        <SectionTitle>Subjects</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
          <InputField
            type="text"
            placeholder="Subject Name"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Teachers (comma-separated)"
            value={subjectTeachersInput}
            onChange={(e) => setSubjectTeachersInput(e.target.value)}
          />
          <InputField
            type="number"
            placeholder="Weekly Classes"
            value={weeklyClassesInput}
            onChange={(e) => setWeeklyClassesInput(e.target.value)}
          />
          <Button type="button" onClick={addSubject}>
            Add Subject
          </Button>
        </div>
        <List>
          {formData.subjects.map((subject, index) => (
            <ListItem key={index}>
              <div>
                <strong>{subject.name}</strong> - {subject.teachers.join(", ")} (Weekly Classes: {subject.weeklyClasses})
              </div>
              <RemoveButton type="button" onClick={() => removeSubject(index)}>
                Remove
              </RemoveButton>
            </ListItem>
          ))}
        </List>

        <SectionTitle>Class Duration & Classes per Day</SectionTitle>
        <InputField
          type="text"
          name="classDuration"
          value={formData.classDuration}
          onChange={handleChange}
          placeholder="Class Duration (e.g., 60 minutes)"
          required
        />
        <InputField
          type="text"
          name="totalClassesPerDay"
          value={formData.totalClassesPerDay}
          onChange={handleChange}
          placeholder="Total Classes per Day (e.g., 6)"
          required
        />

        <SectionTitle>Rooms</SectionTitle>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <InputField
            type="text"
            placeholder="Add room (e.g., Room 101)"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
          />
          <Button type="button" onClick={addRoom}>
            Add Room
          </Button>
        </div>
        <List>
          {formData.rooms.map((room, index) => (
            <ListItem key={index}>
              {room}
              <RemoveButton type="button" onClick={() => removeRoom(index)}>
                Remove
              </RemoveButton>
            </ListItem>
          ))}
        </List>

        <SectionTitle>Lab Sessions</SectionTitle>
        <div style={{ marginBottom: "15px" }}>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={includeLabs}
              onChange={() => setIncludeLabs(!includeLabs)}
            />
            Include Lab Sessions in Timetable
          </CheckboxLabel>
        </div>

        {includeLabs && (
          <LabSessionContainer>
            <SectionTitle>Lab Timings</SectionTitle>
            <div style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <TimeInputContainer>
                  <span>From:</span>
                  <TimeSelect 
                    value={timeInputs.labStartHour} 
                    onChange={(e) => setTimeInputs({...timeInputs, labStartHour: e.target.value})}
                  >
                    {Array.from({length: 12}, (_, i) => i + 1).map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </TimeSelect>
                  <span>:</span>
                  <TimeSelect 
                    value={timeInputs.labStartMinute} 
                    onChange={(e) => setTimeInputs({...timeInputs, labStartMinute: e.target.value})}
                  >
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </TimeSelect>
                  <TimeSelect 
                    value={timeInputs.labStartAmPm} 
                    onChange={(e) => setTimeInputs({...timeInputs, labStartAmPm: e.target.value})}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </TimeSelect>
                </TimeInputContainer>

                <TimeInputContainer>
                  <span>To:</span>
                  <TimeSelect 
                    value={timeInputs.labEndHour} 
                    onChange={(e) => setTimeInputs({...timeInputs, labEndHour: e.target.value})}
                  >
                    {Array.from({length: 12}, (_, i) => i + 1).map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </TimeSelect>
                  <span>:</span>
                  <TimeSelect 
                    value={timeInputs.labEndMinute} 
                    onChange={(e) => setTimeInputs({...timeInputs, labEndMinute: e.target.value})}
                  >
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </TimeSelect>
                  <TimeSelect 
                    value={timeInputs.labEndAmPm} 
                    onChange={(e) => setTimeInputs({...timeInputs, labEndAmPm: e.target.value})}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </TimeSelect>
                </TimeInputContainer>
              </div>
              <Button type="button" onClick={addLabTiming}>
                Add Lab Timing
              </Button>
            </div>
            <List>
              {formData.labTimings.map((timing, index) => (
                <ListItem key={index}>
                  {timing}
                  <RemoveButton type="button" onClick={() => removeLabTiming(index)}>
                    Remove
                  </RemoveButton>
                </ListItem>
              ))}
            </List>

            <SectionTitle>Batches</SectionTitle>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <InputField
                type="text"
                placeholder="Add batch (e.g., Batch A)"
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
              />
              <Button type="button" onClick={addBatch}>
                Add Batch
              </Button>
            </div>
            <List>
              {formData.batches.map((batch, index) => (
                <ListItem key={index}>
                  {batch}
                  <RemoveButton type="button" onClick={() => removeBatch(index)}>
                    Remove
                  </RemoveButton>
                </ListItem>
              ))}
            </List>

            <SectionTitle>Lab Locations</SectionTitle>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <InputField
                type="text"
                placeholder="Add lab location (e.g., Lab 101)"
                value={labLocationInput}
                onChange={(e) => setLabLocationInput(e.target.value)}
              />
              <Button type="button" onClick={addLabLocation}>
                Add Lab Location
              </Button>
            </div>
            <List>
              {formData.labLocations.map((labLocation, index) => (
                <ListItem key={index}>
                  {labLocation}
                  <RemoveButton type="button" onClick={() => removeLabLocation(index)}>
                    Remove
                  </RemoveButton>
                </ListItem>
              ))}
            </List>
          </LabSessionContainer>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit">Generate Timetable</Button>
        <Button type="button" onClick={clearSavedData} style={{ marginTop: "10px", backgroundColor: "#ff4d4d" }}>
          Clear Saved Data
        </Button>
      </FormContainer>
    </Container>
  );
};

export default GenerateTimetable;