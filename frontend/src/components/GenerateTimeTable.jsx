
// // // // // export default GenerateTimetable;
// // // // import React, { useState } from "react";
// // // // import styled from "styled-components";

// // // // // Styled Components for Clean Design
// // // // const Container = styled.div`
// // // //   padding: 50px;
// // // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // // //   min-height: 100vh;
// // // //   display: flex;
// // // //   justify-content: center;
// // // //   align-items: center;
// // // //   flex-direction: column;
// // // // `;

// // // // const Title = styled.h1`
// // // //   color: #fff;
// // // //   font-size: 3rem;
// // // //   text-align: center;
// // // //   animation: fadeIn 2s ease-in;
// // // // `;

// // // // const FormContainer = styled.form`
// // // //   background-color: rgba(255, 255, 255, 0.9);
// // // //   padding: 30px;
// // // //   border-radius: 10px;
// // // //   width: 100%;
// // // //   max-width: 600px;
// // // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // // //   animation: slideUp 1s ease-in-out;
// // // // `;

// // // // const InputField = styled.input`
// // // //   width: 100%;
// // // //   padding: 12px;
// // // //   margin: 10px 0;
// // // //   border-radius: 5px;
// // // //   border: 1px solid #ddd;
// // // //   transition: all 0.3s ease-in-out;
// // // //   &:focus {
// // // //     border-color: #fda085;
// // // //     outline: none;
// // // //   }
// // // // `;

// // // // const Button = styled.button`
// // // //   width: 100%;
// // // //   padding: 14px;
// // // //   background-color: #fda085;
// // // //   border: none;
// // // //   border-radius: 5px;
// // // //   font-size: 1.2rem;
// // // //   cursor: pointer;
// // // //   transition: all 0.3s ease-in-out;
// // // //   &:hover {
// // // //     background-color: #f6d365;
// // // //   }
// // // // `;

// // // // const SectionTitle = styled.h3`
// // // //   color: #333;
// // // //   margin-bottom: 15px;
// // // //   font-size: 1.5rem;
// // // //   font-weight: bold;
// // // // `;

// // // // const List = styled.ul`
// // // //   margin: 10px 0;
// // // // `;

// // // // const ListItem = styled.li`
// // // //   display: flex;
// // // //   justify-content: space-between;
// // // //   align-items: center;
// // // //   padding: 8px 0;
// // // //   border-bottom: 1px solid #ddd;
// // // // `;

// // // // const RemoveButton = styled.button`
// // // //   color: red;
// // // //   background: none;
// // // //   border: none;
// // // //   cursor: pointer;
// // // //   transition: all 0.3s ease-in-out;
// // // //   &:hover {
// // // //     color: #ff4d4d;
// // // //   }
// // // // `;

// // // // // Animations
// // // // const fadeIn = `
// // // //   @keyframes fadeIn {
// // // //     0% { opacity: 0; }
// // // //     100% { opacity: 1; }
// // // //   }
// // // // `;

// // // // const slideUp = `
// // // //   @keyframes slideUp {
// // // //     0% { transform: translateY(20px); opacity: 0; }
// // // //     100% { transform: translateY(0); opacity: 1; }
// // // //   }
// // // // `;

// // // // const GenerateTimetable = () => {
// // // //   const [formData, setFormData] = useState({
// // // //     collegeName: "",
// // // //     branchName: "",
// // // //     workingDays: [],
// // // //     classTimes: [],
// // // //     totalClasses: [],
// // // //     subjects: [],
// // // //     teachers: [],
// // // //     rooms: [],
// // // //     classDuration: "",
// // // //     totalClassesPerDay: "",
// // // //   });

// // // //   const [response, setResponse] = useState(null);
// // // //   const [error, setError] = useState(null);
// // // //   const [teacherInput, setTeacherInput] = useState({ name: "", subject: "" });
// // // //   const [classTimeInput, setClassTimeInput] = useState("");
// // // //   const [classInput, setClassInput] = useState("");
// // // //   const [roomInput, setRoomInput] = useState(""); // State for room input

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData({ ...formData, [name]: value });
// // // //   };

// // // //   const addClassTime = () => {
// // // //     if (!classTimeInput.trim()) {
// // // //       setError("Class time cannot be empty.");
// // // //       return;
// // // //     }
// // // //     setFormData({
// // // //       ...formData,
// // // //       classTimes: [...formData.classTimes, classTimeInput.trim()],
// // // //     });
// // // //     setClassTimeInput(""); // Clear input field
// // // //     setError(null);
// // // //   };

// // // //   const removeClassTime = (index) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       classTimes: formData.classTimes.filter((_, idx) => idx !== index),
// // // //     });
// // // //   };

// // // //   const addClass = () => {
// // // //     if (!classInput.trim()) {
// // // //       setError("Class name cannot be empty.");
// // // //       return;
// // // //     }
// // // //     setFormData({
// // // //       ...formData,
// // // //       totalClasses: [...formData.totalClasses, classInput.trim()],
// // // //     });
// // // //     setClassInput(""); // Clear input field
// // // //     setError(null);
// // // //   };

// // // //   const removeClass = (index) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       totalClasses: formData.totalClasses.filter((_, idx) => idx !== index),
// // // //     });
// // // //   };

// // // //   const addTeacher = () => {
// // // //     const { name, subject } = teacherInput;
// // // //     if (!name || !subject) {
// // // //       setError("Teacher name and subject cannot be empty.");
// // // //       return;
// // // //     }
// // // //     setFormData({
// // // //       ...formData,
// // // //       teachers: [...formData.teachers, { name, subject }],
// // // //     });
// // // //     setTeacherInput({ name: "", subject: "" });
// // // //     setError(null);
// // // //   };

// // // //   const removeTeacher = (index) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       teachers: formData.teachers.filter((_, idx) => idx !== index),
// // // //     });
// // // //   };

// // // //   const addRoom = () => {
// // // //     if (!roomInput.trim()) {
// // // //       setError("Room name cannot be empty.");
// // // //       return;
// // // //     }
// // // //     setFormData({
// // // //       ...formData,
// // // //       rooms: [...formData.rooms, roomInput.trim()],
// // // //     });
// // // //     setRoomInput(""); // Clear input field
// // // //     setError(null);
// // // //   };

// // // //   const removeRoom = (index) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       rooms: formData.rooms.filter((_, idx) => idx !== index),
// // // //     });
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!formData.collegeName || !formData.branchName) {
// // // //       setError("Please fill in all required fields.");
// // // //       return;
// // // //     }
// // // //     try {
// // // //       const res = await fetch("http://localhost:5000/generate-time-table", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(formData),
// // // //       });
// // // //       if (!res.ok) throw new Error("Failed to generate timetable");
// // // //       const data = await res.json();
// // // //       setResponse(data);
// // // //       setError(null);
// // // //     } catch (err) {
// // // //       setError(err.message);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Container>
// // // //       <Title>Generate Timetable</Title>
// // // //       <FormContainer onSubmit={handleSubmit}>
// // // //         <SectionTitle>General Information</SectionTitle>
// // // //         <InputField
// // // //           type="text"
// // // //           name="collegeName"
// // // //           value={formData.collegeName}
// // // //           onChange={handleChange}
// // // //           placeholder="College Name"
// // // //           required
// // // //         />
// // // //         <InputField
// // // //           type="text"
// // // //           name="branchName"
// // // //           value={formData.branchName}
// // // //           onChange={handleChange}
// // // //           placeholder="Branch Name"
// // // //           required
// // // //         />

// // // //         <SectionTitle>Working Days</SectionTitle>
// // // //         <InputField
// // // //           type="text"
// // // //           name="workingDays"
// // // //           value={formData.workingDays.join(", ")}
// // // //           onChange={(e) =>
// // // //             setFormData({
// // // //               ...formData,
// // // //               workingDays: e.target.value
// // // //                 .split(",")
// // // //                 .map((day) => day.trim())
// // // //                 .filter(Boolean),
// // // //             })
// // // //           }
// // // //           placeholder="e.g., Monday, Tuesday"
// // // //           required
// // // //         />

// // // //         <SectionTitle>Class Times</SectionTitle>
// // // //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// // // //           <InputField
// // // //             type="text"
// // // //             placeholder="Add class time (e.g., 9:00-10:00)"
// // // //             value={classTimeInput}
// // // //             onChange={(e) => setClassTimeInput(e.target.value)}
// // // //           />
// // // //           <Button type="button" onClick={addClassTime}>
// // // //             Add Class Time
// // // //           </Button>
// // // //         </div>
// // // //         <List>
// // // //           {formData.classTimes.map((time, index) => (
// // // //             <ListItem key={index}>
// // // //               {time}
// // // //               <RemoveButton type="button" onClick={() => removeClassTime(index)}>
// // // //                 Remove
// // // //               </RemoveButton>
// // // //             </ListItem>
// // // //           ))}
// // // //         </List>

// // // //         <SectionTitle>Total Classes</SectionTitle>
// // // //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// // // //           <InputField
// // // //             type="text"
// // // //             placeholder="Add class (e.g., CS-I)"
// // // //             value={classInput}
// // // //             onChange={(e) => setClassInput(e.target.value)}
// // // //           />
// // // //           <Button type="button" onClick={addClass}>
// // // //             Add Class
// // // //           </Button>
// // // //         </div>
// // // //         <List>
// // // //           {formData.totalClasses.map((className, index) => (
// // // //             <ListItem key={index}>
// // // //               {className}
// // // //               <RemoveButton type="button" onClick={() => removeClass(index)}>
// // // //                 Remove
// // // //               </RemoveButton>
// // // //             </ListItem>
// // // //           ))}
// // // //         </List>

// // // //         <SectionTitle>Teachers</SectionTitle>
// // // //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// // // //           <InputField
// // // //             type="text"
// // // //             placeholder="Teacher Name"
// // // //             value={teacherInput.name}
// // // //             onChange={(e) =>
// // // //               setTeacherInput({ ...teacherInput, name: e.target.value })
// // // //             }
// // // //           />
// // // //           <InputField
// // // //             type="text"
// // // //             placeholder="Subject"
// // // //             value={teacherInput.subject}
// // // //             onChange={(e) =>
// // // //               setTeacherInput({ ...teacherInput, subject: e.target.value })
// // // //             }
// // // //           />
// // // //           <Button type="button" onClick={addTeacher}>
// // // //             Add Teacher
// // // //           </Button>
// // // //         </div>
// // // //         <List>
// // // //           {formData.teachers.map((teacher, index) => (
// // // //             <ListItem key={index}>
// // // //               {teacher.name} - {teacher.subject}
// // // //               <RemoveButton type="button" onClick={() => removeTeacher(index)}>
// // // //                 Remove
// // // //               </RemoveButton>
// // // //             </ListItem>
// // // //           ))}
// // // //         </List>

// // // //         {/* Add Rooms Section */}
// // // //         <SectionTitle>Rooms</SectionTitle>
// // // //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// // // //           <InputField
// // // //             type="text"
// // // //             placeholder="Room Name"
// // // //             value={roomInput}
// // // //             onChange={(e) => setRoomInput(e.target.value)}
// // // //           />
// // // //           <Button type="button" onClick={addRoom}>
// // // //             Add Room
// // // //           </Button>
// // // //         </div>
// // // //         <List>
// // // //           {formData.rooms.map((room, index) => (
// // // //             <ListItem key={index}>
// // // //               {room}
// // // //               <RemoveButton type="button" onClick={() => removeRoom(index)}>
// // // //                 Remove
// // // //               </RemoveButton>
// // // //             </ListItem>
// // // //           ))}
// // // //         </List>

// // // //         <SectionTitle>Additional Information</SectionTitle>
// // // //         <InputField
// // // //           type="number"
// // // //           name="classDuration"
// // // //           value={formData.classDuration}
// // // //           onChange={handleChange}
// // // //           placeholder="Class Duration (minutes)"
// // // //           required
// // // //         />
// // // //         <InputField
// // // //           type="number"
// // // //           name="totalClassesPerDay"
// // // //           value={formData.totalClassesPerDay}
// // // //           onChange={handleChange}
// // // //           placeholder="Total Classes per Day"
// // // //           required
// // // //         />

// // // //         <Button type="submit">Generate Timetable</Button>
// // // //       </FormContainer>
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default GenerateTimetable;







































// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import styled from "styled-components";

// // // // Styled Components for Clean Design
// // // const Container = styled.div`
// // //   padding: 50px;
// // //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// // //   min-height: 100vh;
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   flex-direction: column;
// // // `;

// // // const Title = styled.h1`
// // //   color: #fff;
// // //   font-size: 3rem;
// // //   text-align: center;
// // //   animation: fadeIn 2s ease-in;
// // // `;

// // // const FormContainer = styled.form`
// // //   background-color: rgba(255, 255, 255, 0.9);
// // //   padding: 30px;
// // //   border-radius: 10px;
// // //   width: 100%;
// // //   max-width: 600px;
// // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // //   animation: slideUp 1s ease-in-out;
// // // `;

// // // const InputField = styled.input`
// // //   width: 100%;
// // //   padding: 12px;
// // //   margin: 10px 0;
// // //   border-radius: 5px;
// // //   border: 1px solid #ddd;
// // //   transition: all 0.3s ease-in-out;
// // //   &:focus {
// // //     border-color: #fda085;
// // //     outline: none;
// // //   }
// // // `;

// // // const Button = styled.button`
// // //   width: 100%;
// // //   padding: 14px;
// // //   background-color: #fda085;
// // //   border: none;
// // //   border-radius: 5px;
// // //   font-size: 1.2rem;
// // //   cursor: pointer;
// // //   transition: all 0.3s ease-in-out;
// // //   &:hover {
// // //     background-color: #f6d365;
// // //   }
// // // `;

// // // const SectionTitle = styled.h3`
// // //   color: #333;
// // //   margin-bottom: 15px;
// // //   font-size: 1.5rem;
// // //   font-weight: bold;
// // // `;

// // // const List = styled.ul`
// // //   margin: 10px 0;
// // // `;

// // // const ListItem = styled.li`
// // //   display: flex;
// // //   justify-content: space-between;
// // //   align-items: center;
// // //   padding: 8px 0;
// // //   border-bottom: 1px solid #ddd;
// // // `;

// // // const RemoveButton = styled.button`
// // //   color: red;
// // //   background: none;
// // //   border: none;
// // //   cursor: pointer;
// // //   transition: all 0.3s ease-in-out;
// // //   &:hover {
// // //     color: #ff4d4d;
// // //   }
// // // `;

// // // // Animations
// // // const fadeIn = `
// // //   @keyframes fadeIn {
// // //     0% { opacity: 0; }
// // //     100% { opacity: 1; }
// // //   }
// // // `;

// // // const slideUp = `
// // //   @keyframes slideUp {
// // //     0% { transform: translateY(20px); opacity: 0; }
// // //     100% { transform: translateY(0); opacity: 1; }
// // //   }
// // // `;

// // // const GenerateTimetable = () => {
// // //   const navigate = useNavigate();
// // //   const [formData, setFormData] = useState({
// // //     collegeName: "",
// // //     branchName: "",
// // //     workingDays: [],
// // //     classTimes: [],
// // //     totalClasses: [],
// // //     subjects: [],
// // //     teachers: [],
// // //     rooms: [],
// // //     classDuration: "",
// // //     totalClassesPerDay: "",
// // //   });

// // //   const [response, setResponse] = useState(null);
// // //   const [error, setError] = useState(null);
// // //   const [teacherInput, setTeacherInput] = useState({ name: "", subject: "" });
// // //   const [classTimeInput, setClassTimeInput] = useState("");
// // //   const [classInput, setClassInput] = useState("");
// // //   const [roomInput, setRoomInput] = useState(""); // State for room input

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //   };

// // //   const addClassTime = () => {
// // //     if (!classTimeInput.trim()) {
// // //       setError("Class time cannot be empty.");
// // //       return;
// // //     }
// // //     setFormData({
// // //       ...formData,
// // //       classTimes: [...formData.classTimes, classTimeInput.trim()],
// // //     });
// // //     setClassTimeInput(""); // Clear input field
// // //     setError(null);
// // //   };

// // //   const removeClassTime = (index) => {
// // //     setFormData({
// // //       ...formData,
// // //       classTimes: formData.classTimes.filter((_, idx) => idx !== index),
// // //     });
// // //   };

// // //   const addClass = () => {
// // //     if (!classInput.trim()) {
// // //       setError("Class name cannot be empty.");
// // //       return;
// // //     }
// // //     setFormData({
// // //       ...formData,
// // //       totalClasses: [...formData.totalClasses, classInput.trim()],
// // //     });
// // //     setClassInput(""); // Clear input field
// // //     setError(null);
// // //   };

// // //   const removeClass = (index) => {
// // //     setFormData({
// // //       ...formData,
// // //       totalClasses: formData.totalClasses.filter((_, idx) => idx !== index),
// // //     });
// // //   };

// // //   const addTeacher = () => {
// // //     const { name, subject } = teacherInput;
// // //     if (!name || !subject) {
// // //       setError("Teacher name and subject cannot be empty.");
// // //       return;
// // //     }
// // //     setFormData({
// // //       ...formData,
// // //       teachers: [...formData.teachers, { name, subject }],
// // //     });
// // //     setTeacherInput({ name: "", subject: "" });
// // //     setError(null);
// // //   };

// // //   const removeTeacher = (index) => {
// // //     setFormData({
// // //       ...formData,
// // //       teachers: formData.teachers.filter((_, idx) => idx !== index),
// // //     });
// // //   };

// // //   const addRoom = () => {
// // //     if (!roomInput.trim()) {
// // //       setError("Room name cannot be empty.");
// // //       return;
// // //     }
// // //     setFormData({
// // //       ...formData,
// // //       rooms: [...formData.rooms, roomInput.trim()],
// // //     });
// // //     setRoomInput(""); // Clear input field
// // //     setError(null);
// // //   };

// // //   const removeRoom = (index) => {
// // //     setFormData({
// // //       ...formData,
// // //       rooms: formData.rooms.filter((_, idx) => idx !== index),
// // //     });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!formData.collegeName || !formData.branchName) {
// // //       setError("Please fill in all required fields.");
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch("http://localhost:5000/generate-time-table", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(formData),
// // //       });

// // //       if (!res.ok) throw new Error("Failed to generate timetable");

// // //       const data = await res.json();
// // //       setResponse(data);
// // //       setError(null);

// // //       // Redirect to the /result-time-table page with the generated timetable
// // //       navigate("/result-time-table", { state: { timetable: data.timetable } });
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   return (
// // //     <Container>
// // //       <Title>Generate Timetable</Title>
// // //       <FormContainer onSubmit={handleSubmit}>
// // //         <SectionTitle>General Information</SectionTitle>
// // //         <InputField
// // //           type="text"
// // //           name="collegeName"
// // //           value={formData.collegeName}
// // //           onChange={handleChange}
// // //           placeholder="College Name"
// // //           required
// // //         />
// // //         <InputField
// // //           type="text"
// // //           name="branchName"
// // //           value={formData.branchName}
// // //           onChange={handleChange}
// // //           placeholder="Branch Name"
// // //           required
// // //         />

// // //         <SectionTitle>Working Days</SectionTitle>
// // //         <InputField
// // //           type="text"
// // //           name="workingDays"
// // //           value={formData.workingDays.join(", ")}
// // //           onChange={(e) =>
// // //             setFormData({
// // //               ...formData,
// // //               workingDays: e.target.value
// // //                 .split(",")
// // //                 .map((day) => day.trim())
// // //                 .filter(Boolean),
// // //             })
// // //           }
// // //           placeholder="e.g., Monday, Tuesday"
// // //           required
// // //         />

// // //         <SectionTitle>Class Times</SectionTitle>
// // //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// // //           <InputField
// // //             type="text"
// // //             placeholder="Add class time (e.g., 9:00-10:00)"
// // //             value={classTimeInput}
// // //             onChange={(e) => setClassTimeInput(e.target.value)}
// // //           />
// // //           <Button type="button" onClick={addClassTime}>
// // //             Add Class Time
// // //           </Button>
// // //         </div>
// // //         <List>
// // //           {formData.classTimes.map((time, index) => (
// // //             <ListItem key={index}>
// // //               {time}
// // //               <RemoveButton type="button" onClick={() => removeClassTime(index)}>
// // //                 Remove
// // //               </RemoveButton>
// // //             </ListItem>
// // //           ))}
// // //         </List>

// // //         <SectionTitle>Total Classes</SectionTitle>
// // //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// // //           <InputField
// // //             type="text"
// // //             placeholder="Add class (e.g., CS-I)"
// // //             value={classInput}
// // //             onChange={(e) => setClassInput(e.target.value)}
// // //           />
// // //           <Button type="button" onClick={addClass}>
// // //             Add Class
// // //           </Button>
// // //         </div>
// // //         <List>
// // //           {formData.totalClasses.map((className, index) => (
// // //             <ListItem key={index}>
// // //               {className}
// // //               <RemoveButton type="button" onClick={() => removeClass(index)}>
// // //                 Remove
// // //               </RemoveButton>
// // //             </ListItem>
// // //           ))}
// // //         </List>

// // //         <SectionTitle>Class Duration & Classes per Day</SectionTitle>
// // //         <InputField
// // //           type="text"
// // //           name="classDuration"
// // //           value={formData.classDuration}
// // //           onChange={handleChange}
// // //           placeholder="Class Duration (e.g., 60 minutes)"
// // //           required
// // //         />
// // //         <InputField
// // //           type="text"
// // //           name="totalClassesPerDay"
// // //           value={formData.totalClassesPerDay}
// // //           onChange={handleChange}
// // //           placeholder="Total Classes per Day (e.g., 6)"
// // //           required
// // //         />

// // //         <SectionTitle>Teachers</SectionTitle>
// // //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// // //           <InputField
// // //             type="text"
// // //             placeholder="Teacher Name"
// // //             value={teacherInput.name}
// // //             onChange={(e) =>
// // //               setTeacherInput({ ...teacherInput, name: e.target.value })
// // //             }
// // //           />
// // //           <InputField
// // //             type="text"
// // //             placeholder="Subject"
// // //             value={teacherInput.subject}
// // //             onChange={(e) =>
// // //               setTeacherInput({ ...teacherInput, subject: e.target.value })
// // //             }
// // //           />
// // //           <Button type="button" onClick={addTeacher}>
// // //             Add Teacher
// // //           </Button>
// // //         </div>
// // //         <List>
// // //           {formData.teachers.map((teacher, index) => (
// // //             <ListItem key={index}>
// // //               {teacher.name} - {teacher.subject}
// // //               <RemoveButton type="button" onClick={() => removeTeacher(index)}>
// // //                 Remove
// // //               </RemoveButton>
// // //             </ListItem>
// // //           ))}
// // //         </List>

// // //         <SectionTitle>Rooms</SectionTitle>
// // //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// // //           <InputField
// // //             type="text"
// // //             placeholder="Add room (e.g., Room 101)"
// // //             value={roomInput}
// // //             onChange={(e) => setRoomInput(e.target.value)}
// // //           />
// // //           <Button type="button" onClick={addRoom}>
// // //             Add Room
// // //           </Button>
// // //         </div>
// // //         <List>
// // //           {formData.rooms.map((room, index) => (
// // //             <ListItem key={index}>
// // //               {room}
// // //               <RemoveButton type="button" onClick={() => removeRoom(index)}>
// // //                 Remove
// // //               </RemoveButton>
// // //             </ListItem>
// // //           ))}
// // //         </List>

// // //         {error && <p style={{ color: "red" }}>{error}</p>}

// // //         <Button type="submit">Generate Timetable</Button>
// // //       </FormContainer>
// // //     </Container>
// // //   );
// // // };

// // // export default GenerateTimetable;











// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import styled from "styled-components";

// // // Styled Components for Clean Design
// // const Container = styled.div`
// //   padding: 50px;
// //   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
// //   min-height: 100vh;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   flex-direction: column;
// // `;

// // const Title = styled.h1`
// //   color: #fff;
// //   font-size: 3rem;
// //   text-align: center;
// //   animation: fadeIn 2s ease-in;
// // `;

// // const FormContainer = styled.form`
// //   background-color: rgba(255, 255, 255, 0.9);
// //   padding: 30px;
// //   border-radius: 10px;
// //   width: 100%;
// //   max-width: 600px;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// //   animation: slideUp 1s ease-in-out;
// // `;

// // const InputField = styled.input`
// //   width: 100%;
// //   padding: 12px;
// //   margin: 10px 0;
// //   border-radius: 5px;
// //   border: 1px solid #ddd;
// //   transition: all 0.3s ease-in-out;
// //   &:focus {
// //     border-color: #fda085;
// //     outline: none;
// //   }
// // `;

// // const Button = styled.button`
// //   width: 100%;
// //   padding: 14px;
// //   background-color: #fda085;
// //   border: none;
// //   border-radius: 5px;
// //   font-size: 1.2rem;
// //   cursor: pointer;
// //   transition: all 0.3s ease-in-out;
// //   &:hover {
// //     background-color: #f6d365;
// //   }
// // `;

// // const SectionTitle = styled.h3`
// //   color: #333;
// //   margin-bottom: 15px;
// //   font-size: 1.5rem;
// //   font-weight: bold;
// // `;

// // const List = styled.ul`
// //   margin: 10px 0;
// // `;

// // const ListItem = styled.li`
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   padding: 8px 0;
// //   border-bottom: 1px solid #ddd;
// // `;

// // const RemoveButton = styled.button`
// //   color: red;
// //   background: none;
// //   border: none;
// //   cursor: pointer;
// //   transition: all 0.3s ease-in-out;
// //   &:hover {
// //     color: #ff4d4d;
// //   }
// // `;

// // // Animations
// // const fadeIn = `
// //   @keyframes fadeIn {
// //     0% { opacity: 0; }
// //     100% { opacity: 1; }
// //   }
// // `;

// // const slideUp = `
// //   @keyframes slideUp {
// //     0% { transform: translateY(20px); opacity: 0; }
// //     100% { transform: translateY(0); opacity: 1; }
// //   }
// // `;

// // const GenerateTimetable = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     collegeName: "",
// //     branchName: "",
// //     workingDays: [],
// //     classTimes: [],
// //     totalClasses: [],
// //     subjects: [], // Added subjects field
// //     teachers: [],
// //     rooms: [],
// //     classDuration: "",
// //     totalClassesPerDay: "",
// //   });

// //   const [response, setResponse] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [teacherInput, setTeacherInput] = useState({ name: "", subject: "" });
// //   const [classTimeInput, setClassTimeInput] = useState("");
// //   const [classInput, setClassInput] = useState("");
// //   const [roomInput, setRoomInput] = useState("");
// //   const [subjectInput, setSubjectInput] = useState(""); // Added subject input state

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const addClassTime = () => {
// //     if (!classTimeInput.trim()) {
// //       setError("Class time cannot be empty.");
// //       return;
// //     }
// //     setFormData({
// //       ...formData,
// //       classTimes: [...formData.classTimes, classTimeInput.trim()],
// //     });
// //     setClassTimeInput(""); // Clear input field
// //     setError(null);
// //   };

// //   const removeClassTime = (index) => {
// //     setFormData({
// //       ...formData,
// //       classTimes: formData.classTimes.filter((_, idx) => idx !== index),
// //     });
// //   };

// //   const addClass = () => {
// //     if (!classInput.trim()) {
// //       setError("Class name cannot be empty.");
// //       return;
// //     }
// //     setFormData({
// //       ...formData,
// //       totalClasses: [...formData.totalClasses, classInput.trim()],
// //     });
// //     setClassInput(""); // Clear input field
// //     setError(null);
// //   };

// //   const removeClass = (index) => {
// //     setFormData({
// //       ...formData,
// //       totalClasses: formData.totalClasses.filter((_, idx) => idx !== index),
// //     });
// //   };

// //   const addTeacher = () => {
// //     const { name, subject } = teacherInput;
// //     if (!name || !subject) {
// //       setError("Teacher name and subject cannot be empty.");
// //       return;
// //     }
// //     setFormData({
// //       ...formData,
// //       teachers: [...formData.teachers, { name, subject }],
// //     });
// //     setTeacherInput({ name: "", subject: "" });
// //     setError(null);
// //   };

// //   const removeTeacher = (index) => {
// //     setFormData({
// //       ...formData,
// //       teachers: formData.teachers.filter((_, idx) => idx !== index),
// //     });
// //   };

// //   const addRoom = () => {
// //     if (!roomInput.trim()) {
// //       setError("Room name cannot be empty.");
// //       return;
// //     }
// //     setFormData({
// //       ...formData,
// //       rooms: [...formData.rooms, roomInput.trim()],
// //     });
// //     setRoomInput(""); // Clear input field
// //     setError(null);
// //   };

// //   const removeRoom = (index) => {
// //     setFormData({
// //       ...formData,
// //       rooms: formData.rooms.filter((_, idx) => idx !== index),
// //     });
// //   };

// //   const addSubject = () => {
// //     if (!subjectInput.trim()) {
// //       setError("Subject name cannot be empty.");
// //       return;
// //     }
// //     setFormData({
// //       ...formData,
// //       subjects: [...formData.subjects, subjectInput.trim()],
// //     });
// //     setSubjectInput(""); // Clear input field
// //     setError(null);
// //   };

// //   const removeSubject = (index) => {
// //     setFormData({
// //       ...formData,
// //       subjects: formData.subjects.filter((_, idx) => idx !== index),
// //     });
// //   };

// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();
// //   //   if (!formData.collegeName || !formData.branchName) {
// //   //     setError("Please fill in all required fields.");
// //   //     return;
// //   //   }

// //   //   try {
// //   //     const res = await fetch("http://localhost:5000/generate-time-table", {
// //   //       method: "POST",
// //   //       headers: { "Content-Type": "application/json" },
// //   //       body: JSON.stringify(formData),
// //   //     });

// //   //     if (!res.ok) throw new Error("Failed to generate timetable");

// //   //     const data = await res.json();
// //   //     setResponse(data);
// //   //     setError(null);

// //   //     // Redirect to the /result-time-table page with the generated timetable
// //   //     navigate("/result-time-table", { state: { timetable: data.timetable } });
// //   //   } catch (err) {
// //   //     setError(err.message);
// //   //   }
// //   // };


// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
  
// //     // Log the formData to verify its structure
// //     console.log("📤 Form Data Being Sent:", JSON.stringify(formData, null, 2));
  
// //     if (!formData.collegeName || !formData.branchName || !formData.subjects?.length) {
// //       setError("Please fill in all required fields, including subjects.");
// //       return;
// //     }
  
// //     try {
// //       const res = await fetch("http://localhost:5000/generate-time-table", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });
  
// //       if (!res.ok) {
// //         const errorData = await res.json();
// //         throw new Error(errorData.error || "Failed to generate timetable");
// //       }
  
// //       const data = await res.json();
// //       console.log("🛠 Full API Response:", JSON.stringify(data, null, 2));
  
// //       setResponse(data);
// //       setError(null);
  
// //       navigate("/result-time-table", {
// //         state: {
// //           timetable: data.timetable,
// //           workingDays: data.workingDays,
// //           classTimes: data.classTimes,
// //         },
// //       });
// //     } catch (err) {
// //       setError(err.message);
// //       console.error("❌ Error:", err.message);
// //     }
// //   };


// //   return (
// //     <Container>
// //       <Title>Generate Timetable</Title>
// //       <FormContainer onSubmit={handleSubmit}>
// //         <SectionTitle>General Information</SectionTitle>
// //         <InputField
// //           type="text"
// //           name="collegeName"
// //           value={formData.collegeName}
// //           onChange={handleChange}
// //           placeholder="College Name"
// //           required
// //         />
// //         <InputField
// //           type="text"
// //           name="branchName"
// //           value={formData.branchName}
// //           onChange={handleChange}
// //           placeholder="Branch Name"
// //           required
// //         />

// //         <SectionTitle>Working Days</SectionTitle>
// //         <InputField
// //           type="text"
// //           name="workingDays"
// //           value={formData.workingDays.join(", ")}
// //           onChange={(e) =>
// //             setFormData({
// //               ...formData,
// //               workingDays: e.target.value
// //                 .split(",")
// //                 .map((day) => day.trim())
// //                 .filter(Boolean),
// //             })
// //           }
// //           placeholder="e.g., Monday, Tuesday"
// //           required
// //         />

// //         <SectionTitle>Class Times</SectionTitle>
// //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// //           <InputField
// //             type="text"
// //             placeholder="Add class time (e.g., 9:00-10:00)"
// //             value={classTimeInput}
// //             onChange={(e) => setClassTimeInput(e.target.value)}
// //           />
// //           <Button type="button" onClick={addClassTime}>
// //             Add Class Time
// //           </Button>
// //         </div>
// //         <List>
// //           {formData.classTimes.map((time, index) => (
// //             <ListItem key={index}>
// //               {time}
// //               <RemoveButton type="button" onClick={() => removeClassTime(index)}>
// //                 Remove
// //               </RemoveButton>
// //             </ListItem>
// //           ))}
// //         </List>

// //         <SectionTitle>Total Classes</SectionTitle>
// //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// //           <InputField
// //             type="text"
// //             placeholder="Add class (e.g., CS-I)"
// //             value={classInput}
// //             onChange={(e) => setClassInput(e.target.value)}
// //           />
// //           <Button type="button" onClick={addClass}>
// //             Add Class
// //           </Button>
// //         </div>
// //         <List>
// //           {formData.totalClasses.map((className, index) => (
// //             <ListItem key={index}>
// //               {className}
// //               <RemoveButton type="button" onClick={() => removeClass(index)}>
// //                 Remove
// //               </RemoveButton>
// //             </ListItem>
// //           ))}
// //         </List>

// //         <SectionTitle>Subjects</SectionTitle>
// //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// //           <InputField
// //             type="text"
// //             placeholder="Add subject (e.g., Mathematics)"
// //             value={subjectInput}
// //             onChange={(e) => setSubjectInput(e.target.value)}
// //           />
// //           <Button type="button" onClick={addSubject}>
// //             Add Subject
// //           </Button>
// //         </div>
// //         <List>
// //           {formData.subjects.map((subject, index) => (
// //             <ListItem key={index}>
// //               {subject}
// //               <RemoveButton type="button" onClick={() => removeSubject(index)}>
// //                 Remove
// //               </RemoveButton>
// //             </ListItem>
// //           ))}
// //         </List>

// //         <SectionTitle>Class Duration & Classes per Day</SectionTitle>
// //         <InputField
// //           type="text"
// //           name="classDuration"
// //           value={formData.classDuration}
// //           onChange={handleChange}
// //           placeholder="Class Duration (e.g., 60 minutes)"
// //           required
// //         />
// //         <InputField
// //           type="text"
// //           name="totalClassesPerDay"
// //           value={formData.totalClassesPerDay}
// //           onChange={handleChange}
// //           placeholder="Total Classes per Day (e.g., 6)"
// //           required
// //         />

// //         <SectionTitle>Teachers</SectionTitle>
// //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// //           <InputField
// //             type="text"
// //             placeholder="Teacher Name"
// //             value={teacherInput.name}
// //             onChange={(e) =>
// //               setTeacherInput({ ...teacherInput, name: e.target.value })
// //             }
// //           />
// //           <InputField
// //             type="text"
// //             placeholder="Subject"
// //             value={teacherInput.subject}
// //             onChange={(e) =>
// //               setTeacherInput({ ...teacherInput, subject: e.target.value })
// //             }
// //           />
// //           <Button type="button" onClick={addTeacher}>
// //             Add Teacher
// //           </Button>
// //         </div>
// //         <List>
// //           {formData.teachers.map((teacher, index) => (
// //             <ListItem key={index}>
// //               {teacher.name} - {teacher.subject}
// //               <RemoveButton type="button" onClick={() => removeTeacher(index)}>
// //                 Remove
// //               </RemoveButton>
// //             </ListItem>
// //           ))}
// //         </List>

// //         <SectionTitle>Rooms</SectionTitle>
// //         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
// //           <InputField
// //             type="text"
// //             placeholder="Add room (e.g., Room 101)"
// //             value={roomInput}
// //             onChange={(e) => setRoomInput(e.target.value)}
// //           />
// //           <Button type="button" onClick={addRoom}>
// //             Add Room
// //           </Button>
// //         </div>
// //         <List>
// //           {formData.rooms.map((room, index) => (
// //             <ListItem key={index}>
// //               {room}
// //               <RemoveButton type="button" onClick={() => removeRoom(index)}>
// //                 Remove
// //               </RemoveButton>
// //             </ListItem>
// //           ))}
// //         </List>

// //         {error && <p style={{ color: "red" }}>{error}</p>}

// //         <Button type="submit">Generate Timetable</Button>
// //       </FormContainer>
// //     </Container>
// //   );
// // };

// // export default GenerateTimetable;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// // Styled Components
// const Container = styled.div`
//   padding: 50px;
//   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const Title = styled.h1`
//   color: #fff;
//   font-size: 3rem;
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
//     teachers: [],
//     rooms: [],
//     classDuration: "",
//     totalClassesPerDay: "",
//   });

//   const [error, setError] = useState(null);
//   const [teacherInput, setTeacherInput] = useState({ name: "", subject: "" });
//   const [classTimeInput, setClassTimeInput] = useState("");
//   const [classInput, setClassInput] = useState("");
//   const [roomInput, setRoomInput] = useState("");
//   const [subjectInput, setSubjectInput] = useState("");

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

//   const addTeacher = () => {
//     const { name, subject } = teacherInput;
//     if (!name || !subject) {
//       setError("Teacher name and subject cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       teachers: [...formData.teachers, { name, subject }],
//     });
//     setTeacherInput({ name: "", subject: "" });
//     setError(null);
//   };

//   const removeTeacher = (index) => {
//     setFormData({
//       ...formData,
//       teachers: formData.teachers.filter((_, idx) => idx !== index),
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

//   const addSubject = () => {
//     if (!subjectInput.trim()) {
//       setError("Subject name cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       subjects: [...formData.subjects, { name: subjectInput.trim() }],
//     });
//     setSubjectInput("");
//     setError(null);
//   };

//   const removeSubject = (index) => {
//     setFormData({
//       ...formData,
//       subjects: formData.subjects.filter((_, idx) => idx !== index),
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

//       navigate("/result-time-table", {
//         state: {
//           timetable: data.timetable,
//           workingDays: data.workingDays,
//           classTimes: data.classTimes,
//         },
//       });
//     } catch (err) {
//       setError(err.message);
//       console.error("❌ Error:", err.message);
//     }
//   };

//   return (
//     <Container>
//       <Title>Generate Timetable</Title>
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
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Add subject (e.g., Mathematics)"
//             value={subjectInput}
//             onChange={(e) => setSubjectInput(e.target.value)}
//           />
//           <Button type="button" onClick={addSubject}>
//             Add Subject
//           </Button>
//         </div>
//         <List>
//           {formData.subjects.map((subject, index) => (
//             <ListItem key={index}>
//               {subject.name}
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

//         <SectionTitle>Teachers</SectionTitle>
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Teacher Name"
//             value={teacherInput.name}
//             onChange={(e) =>
//               setTeacherInput({ ...teacherInput, name: e.target.value })
//             }
//           />
//           <InputField
//             type="text"
//             placeholder="Subject"
//             value={teacherInput.subject}
//             onChange={(e) =>
//               setTeacherInput({ ...teacherInput, subject: e.target.value })
//             }
//           />
//           <Button type="button" onClick={addTeacher}>
//             Add Teacher
//           </Button>
//         </div>
//         <List>
//           {formData.teachers.map((teacher, index) => (
//             <ListItem key={index}>
//               {teacher.name} - {teacher.subject}
//               <RemoveButton type="button" onClick={() => removeTeacher(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

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

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <Button type="submit">Generate Timetable</Button>
//       </FormContainer>
//     </Container>
//   );
// };

// export default GenerateTimetable;





// // import React, { useState } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// // Styled Components
// const Container = styled.div`
//   padding: 50px;
//   background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const Title = styled.h1`
//   color: #fff;
//   font-size: 3rem;
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
//     teachers: [],
//     rooms: [],
//     classDuration: "",
//     totalClassesPerDay: "",
//   });

//   const [error, setError] = useState(null);
//   const [teacherInput, setTeacherInput] = useState({ name: "", subject: "" });
//   const [classTimeInput, setClassTimeInput] = useState("");
//   const [classInput, setClassInput] = useState("");
//   const [roomInput, setRoomInput] = useState("");
//   const [subjectInput, setSubjectInput] = useState("");

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

//   const addTeacher = () => {
//     const { name, subject } = teacherInput;
//     if (!name || !subject) {
//       setError("Teacher name and subject cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       teachers: [...formData.teachers, { name, subject }],
//     });
//     setTeacherInput({ name: "", subject: "" });
//     setError(null);
//   };

//   const removeTeacher = (index) => {
//     setFormData({
//       ...formData,
//       teachers: formData.teachers.filter((_, idx) => idx !== index),
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

//   const addSubject = () => {
//     if (!subjectInput.trim()) {
//       setError("Subject name cannot be empty.");
//       return;
//     }
//     setFormData({
//       ...formData,
//       subjects: [...formData.subjects, { name: subjectInput.trim() }],
//     });
//     setSubjectInput("");
//     setError(null);
//   };

//   const removeSubject = (index) => {
//     setFormData({
//       ...formData,
//       subjects: formData.subjects.filter((_, idx) => idx !== index),
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

//       navigate("/result-time-table", {
//         state: {
//           timetable: data.timetable,
//           workingDays: data.workingDays,
//           classTimes: data.classTimes,
//         },
//       });
//     } catch (err) {
//       setError(err.message);
//       console.error("❌ Error:", err.message);
//     }
//   };


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   if (!formData.collegeName || !formData.branchName || !formData.subjects?.length) {
//   //     setError("Please fill in all required fields, including subjects.");
//   //     return;
//   //   }
  
//   //   try {
//   //     const res = await fetch("http://localhost:5000/generate-time-table", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(formData),
//   //     });
  
//   //     if (!res.ok) {
//   //       const errorData = await res.json();
//   //       throw new Error(errorData.error || "Failed to generate timetable");
//   //     }
  
//   //     const data = await res.json();
//   //     console.log("🛠 Full API Response:", JSON.stringify(data, null, 2));
  
//   //     if (!data.workingDays || !data.classTimes) {
//   //       throw new Error("Missing workingDays or classTimes in API response.");
//   //     }
  
//   //     navigate("/result-time-table", {
//   //       state: {
//   //         timetable: data.timetable ?? {}, 
//   //         workingDays: data.workingDays ?? [], 
//   //         classTimes: data.classTimes ?? [], 
//   //       },
//   //     });
//   //   } catch (err) {
//   //     setError(err.message);
//   //     console.error("❌ Error:", err.message);
//   //   }
//   // };
  
//   return (
//     <Container>
//       <Title>Generate Timetable</Title>
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
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Add subject (e.g., Mathematics)"
//             value={subjectInput}
//             onChange={(e) => setSubjectInput(e.target.value)}
//           />
//           <Button type="button" onClick={addSubject}>
//             Add Subject
//           </Button>
//         </div>
//         <List>
//           {formData.subjects.map((subject, index) => (
//             <ListItem key={index}>
//               {subject.name}
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

//         <SectionTitle>Teachers</SectionTitle>
//         <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//           <InputField
//             type="text"
//             placeholder="Teacher Name"
//             value={teacherInput.name}
//             onChange={(e) =>
//               setTeacherInput({ ...teacherInput, name: e.target.value })
//             }
//           />
//           <InputField
//             type="text"
//             placeholder="Subject"
//             value={teacherInput.subject}
//             onChange={(e) =>
//               setTeacherInput({ ...teacherInput, subject: e.target.value })
//             }
//           />
//           <Button type="button" onClick={addTeacher}>
//             Add Teacher
//           </Button>
//         </div>
//         <List>
//           {formData.teachers.map((teacher, index) => (
//             <ListItem key={index}>
//               {teacher.name} - {teacher.subject}
//               <RemoveButton type="button" onClick={() => removeTeacher(index)}>
//                 Remove
//               </RemoveButton>
//             </ListItem>
//           ))}
//         </List>

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

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <Button type="submit">Generate Timetable</Button>
//       </FormContainer>
//     </Container>
//   );
// };

// export default GenerateTimetable;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 50px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3rem;
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
    classDuration: "",
    totalClassesPerDay: "",
  });

  const [error, setError] = useState(null);
  const [classTimeInput, setClassTimeInput] = useState("");
  const [classInput, setClassInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [subjectTeachersInput, setSubjectTeachersInput] = useState("");
  const [weeklyClassesInput, setWeeklyClassesInput] = useState("");

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

      navigate("/result-time-table", {
        state: {
          timetable: data.timetable ?? {},
          workingDays: data.workingDays ?? [],
          classTimes: data.classTimes ?? [],
        },
      });
    } catch (err) {
      setError(err.message);
      console.error("❌ Error:", err.message);
    }
  };

  return (
    <Container>
      <Title>Generate Timetable</Title>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit">Generate Timetable</Button>
      </FormContainer>
    </Container>
  );
};

export default GenerateTimetable;