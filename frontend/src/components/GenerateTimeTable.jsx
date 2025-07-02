//the finallllllllll
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components (unchanged)
const Container = styled.div`
  padding: 50px;
  // background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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
  const [classTimeInput, setClassTimeInput] = useState("");
  const [classInput, setClassInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [labLocationInput, setLabLocationInput] = useState("");
  const [batchInput, setBatchInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjectTeachersInput, setSubjectTeachersInput] = useState("");
  const [weeklyClassesInput, setWeeklyClassesInput] = useState("");
  const [labTimingInput, setLabTimingInput] = useState("");

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("timetableFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addClassTime = () => {
    if (!classTimeInput.trim()) {
      setError("Class time cannot be empty.");
      return;
    }
    setFormData({
      ...formData,
      classTimes: [...formData.classTimes, classTimeInput.trim()],
    });
    setClassTimeInput("");
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
    if (!labTimingInput.trim()) {
      setError("Lab timing cannot be empty.");
      return;
    }
    setFormData({
      ...formData,
      labTimings: [...formData.labTimings, labTimingInput.trim()],
    });
    setLabTimingInput("");
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

    try {
      const res = await fetch("http://localhost:5000/generate-time-table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate timetable");
      }

      const data = await res.json();
      console.log("🛠 Full API Response:", JSON.stringify(data, null, 2));

      // Save form data to localStorage
      localStorage.setItem("timetableFormData", JSON.stringify(formData));

      navigate("/result-time-table", {
        state: {
          timetable: data.timetable ?? {},
          workingDays: data.workingDays ?? [],
          classTimes: data.classTimes ?? [],
          labTimings: data.labTimings, // Ensure this is passed
    classRoomAssignment: data.classRoomAssignment,
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
        <InputField
          type="text"
          name="workingDays"
          value={formData.workingDays.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              workingDays: e.target.value
                .split(",")
                .map((day) => day.trim())
                .filter(Boolean),
            })
          }
          placeholder="e.g., Monday, Tuesday"
          required
        />

        <SectionTitle>Class Times</SectionTitle>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <InputField
            type="text"
            placeholder="Add class time (e.g., 9:00-10:00)"
            value={classTimeInput}
            onChange={(e) => setClassTimeInput(e.target.value)}
          />
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

        <SectionTitle>Lab Timings</SectionTitle>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <InputField
            type="text"
            placeholder="Add lab timing (e.g., 2:00-4:00)"
            value={labTimingInput}
            onChange={(e) => setLabTimingInput(e.target.value)}
          />
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit">Generate Timetable</Button>
        <Button type="button" onClick={clearSavedData} style={{ marginTop: "10px", backgroundColor: "#ff4d4d" }}>
          Clear Saved Data
        </Button>
      {/* </Form> */}
      </FormContainer>
    </Container>
  );
};

export default GenerateTimetable;





