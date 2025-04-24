// // // // // import React, { useState } from "react";
// // // // // import axios from "axios";

// // // // // const SearchTimetable = () => {
// // // // //   const [collegeName, setCollegeName] = useState("");
// // // // //   const [branchName, setBranchName] = useState("");
// // // // //   const [className, setClassName] = useState("");
// // // // //   const [timetable, setTimetable] = useState(null);
// // // // //   const [error, setError] = useState("");

// // // // //   const handleSearch = async () => {
// // // // //     try {
// // // // //       const response = await axios.get("/api/timetable/search", {
// // // // //         params: { collegeName, branchName, className },
// // // // //       });
// // // // //       setTimetable(response.data.timetable);
// // // // //       setError("");
// // // // //     } catch (err) {
// // // // //       setError("❌ Failed to fetch timetable. Please check your inputs.");
// // // // //       setTimetable(null);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h1>Search Timetable</h1>
// // // // //       <div>
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="College Name"
// // // // //           value={collegeName}
// // // // //           onChange={(e) => setCollegeName(e.target.value)}
// // // // //         />
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Branch Name"
// // // // //           value={branchName}
// // // // //           onChange={(e) => setBranchName(e.target.value)}
// // // // //         />
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Class Name"
// // // // //           value={className}
// // // // //           onChange={(e) => setClassName(e.target.value)}
// // // // //         />
// // // // //         <button onClick={handleSearch}>Search</button>
// // // // //       </div>
// // // // //       {error && <p style={{ color: "red" }}>{error}</p>}
// // // // //       {timetable && (
// // // // //         <div>
// // // // //           <h2>Timetable for {className}</h2>
// // // // //           {/* Render the timetable here */}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SearchTimetable;

// // // // import React, { useState } from "react";
// // // // import axios from "axios";
// // // // import { motion } from "framer-motion";

// // // // const SearchTimetable = () => {
// // // //   const [collegeName, setCollegeName] = useState("");
// // // //   const [branchName, setBranchName] = useState("");
// // // //   const [className, setClassName] = useState("");
// // // //   const [timetable, setTimetable] = useState(null);
// // // //   const [error, setError] = useState("");
// // // //   const [loading, setLoading] = useState(false);

// // // //   const handleSearch = async () => {
// // // //     setLoading(true);
// // // //     setError("");
// // // //     setTimetable(null);

// // // //     try {
// // // //       const response = await axios.get("/api/timetable/search", {
// // // //         params: { collegeName, branchName, className },
// // // //       });

// // // //       setTimetable(response.data.timetable);
// // // //       setError("");
// // // //     } catch (err) {
// // // //       setError("❌ Failed to fetch timetable. Please check your inputs.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-6">
// // // //       {/* Page Title */}
// // // //       <motion.h1
// // // //         initial={{ opacity: 0, y: -20 }}
// // // //         animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
// // // //         className="text-white text-4xl font-bold mb-6"
// // // //       >
// // // //         🔍 Search Your Timetable
// // // //       </motion.h1>

// // // //       {/* Search Input Fields */}
// // // //       <motion.div
// // // //         className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
// // // //         initial={{ opacity: 0, scale: 0.9 }}
// // // //         animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
// // // //       >
// // // //         <motion.input
// // // //           type="text"
// // // //           placeholder="College Name"
// // // //           value={collegeName}
// // // //           onChange={(e) => setCollegeName(e.target.value)}
// // // //           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
// // // //           whileFocus={{ scale: 1.05 }}
// // // //         />
// // // //         <motion.input
// // // //           type="text"
// // // //           placeholder="Branch Name"
// // // //           value={branchName}
// // // //           onChange={(e) => setBranchName(e.target.value)}
// // // //           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
// // // //           whileFocus={{ scale: 1.05 }}
// // // //         />
// // // //         <motion.input
// // // //           type="text"
// // // //           placeholder="Class Name"
// // // //           value={className}
// // // //           onChange={(e) => setClassName(e.target.value)}
// // // //           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
// // // //           whileFocus={{ scale: 1.05 }}
// // // //         />

// // // //         {/* Animated Search Button */}
// // // //         <motion.button
// // // //           onClick={handleSearch}
// // // //           whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 105, 180, 0.8)" }}
// // // //           whileTap={{ scale: 0.95 }}
// // // //           className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-lg shadow-md transition-all duration-300 ease-in-out"
// // // //         >
// // // //           🚀 Search Timetable
// // // //         </motion.button>
// // // //       </motion.div>

// // // //       {/* Loading Animation */}
// // // //       {loading && (
// // // //         <motion.div
// // // //           initial={{ opacity: 0 }}
// // // //           animate={{ opacity: 1, transition: { duration: 0.5 } }}
// // // //           className="mt-4 text-white text-lg font-semibold animate-pulse"
// // // //         >
// // // //           ⏳ Fetching Timetable...
// // // //         </motion.div>
// // // //       )}

// // // //       {/* Error Message Animation */}
// // // //       {error && (
// // // //         <motion.p
// // // //           initial={{ opacity: 0, y: -10 }}
// // // //           animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
// // // //           className="mt-4 text-red-500 font-semibold"
// // // //         >
// // // //           {error}
// // // //         </motion.p>
// // // //       )}

// // // //       {/* Timetable Display */}
// // // //       {timetable && (
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: 20 }}
// // // //           animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
// // // //           className="bg-white mt-6 p-6 rounded-lg shadow-xl w-full max-w-md text-center"
// // // //         >
// // // //           <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Timetable for {className}</h2>
// // // //           <p className="text-gray-700">{JSON.stringify(timetable, null, 2)}</p>
// // // //         </motion.div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SearchTimetable;


// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { motion } from "framer-motion";

// // // const SearchTimetable = () => {
// // //   const [collegeName, setCollegeName] = useState("");
// // //   const [branchName, setBranchName] = useState("");
// // //   const [className, setClassName] = useState("");
// // //   const [timetable, setTimetable] = useState(null);
// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const [colleges, setColleges] = useState([]);
// // //   const [branches, setBranches] = useState([]);
// // //   const [classes, setClasses] = useState([]);

// // //   // Fetch available colleges from API
// // //   useEffect(() => {
// // //     const fetchColleges = async () => {
// // //       try {
// // //         const response = await axios.get("/api/colleges");
// // //         setColleges(response.data.colleges || []);
// // //       } catch (error) {
// // //         console.error("Failed to fetch colleges:", error);
// // //       }
// // //     };
// // //     fetchColleges();
// // //   }, []);

// // //   // Fetch branches based on selected college
// // //   useEffect(() => {
// // //     if (collegeName) {
// // //       const fetchBranches = async () => {
// // //         try {
// // //           const response = await axios.get(`/api/branches?college=${collegeName}`);
// // //           setBranches(response.data.branches || []);
// // //         } catch (error) {
// // //           console.error("Failed to fetch branches:", error);
// // //         }
// // //       };
// // //       fetchBranches();
// // //     } else {
// // //       setBranches([]);
// // //     }
// // //   }, [collegeName]);

// // //   // Fetch classes based on selected branch
// // //   useEffect(() => {
// // //     if (branchName) {
// // //       const fetchClasses = async () => {
// // //         try {
// // //           const response = await axios.get(`/api/classes?branch=${branchName}`);
// // //           setClasses(response.data.classes || []);
// // //         } catch (error) {
// // //           console.error("Failed to fetch classes:", error);
// // //         }
// // //       };
// // //       fetchClasses();
// // //     } else {
// // //       setClasses([]);
// // //     }
// // //   }, [branchName]);

// // //   const handleSearch = async () => {
// // //     setLoading(true);
// // //     setError("");
// // //     setTimetable(null);

// // //     try {
// // //       const response = await axios.get("/api/timetable/search", {
// // //         params: { collegeName, branchName, className },
// // //       });

// // //       setTimetable(response.data.timetable);
// // //       setError("");
// // //     } catch (err) {
// // //       setError("❌ Failed to fetch timetable. Please check your selections.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 p-6">
// // //       {/* Page Title */}
// // //       <motion.h1
// // //         initial={{ opacity: 0, y: -20 }}
// // //         animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
// // //         className="text-white text-4xl font-bold mb-6"
// // //       >
// // //         📅 Search Your Timetable
// // //       </motion.h1>

// // //       {/* Search Input Fields */}
// // //       <motion.div
// // //         className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
// // //         initial={{ opacity: 0, scale: 0.9 }}
// // //         animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
// // //       >
// // //         {/* College Dropdown */}
// // //         <motion.select
// // //           value={collegeName}
// // //           onChange={(e) => setCollegeName(e.target.value)}
// // //           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
// // //           whileFocus={{ scale: 1.05 }}
// // //         >
// // //           <option value="">Select College</option>
// // //           {colleges.map((college, index) => (
// // //             <option key={index} value={college}>
// // //               {college}
// // //             </option>
// // //           ))}
// // //         </motion.select>

// // //         {/* Branch Dropdown */}
// // //         <motion.select
// // //           value={branchName}
// // //           onChange={(e) => setBranchName(e.target.value)}
// // //           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
// // //           disabled={!collegeName}
// // //           whileFocus={{ scale: 1.05 }}
// // //         >
// // //           <option value="">Select Branch</option>
// // //           {branches.map((branch, index) => (
// // //             <option key={index} value={branch}>
// // //               {branch}
// // //             </option>
// // //           ))}
// // //         </motion.select>

// // //         {/* Class Dropdown */}
// // //         <motion.select
// // //           value={className}
// // //           onChange={(e) => setClassName(e.target.value)}
// // //           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
// // //           disabled={!branchName}
// // //           whileFocus={{ scale: 1.05 }}
// // //         >
// // //           <option value="">Select Class</option>
// // //           {classes.map((cls, index) => (
// // //             <option key={index} value={cls}>
// // //               {cls}
// // //             </option>
// // //           ))}
// // //         </motion.select>

// // //         {/* Animated Search Button */}
// // //         <motion.button
// // //           onClick={handleSearch}
// // //           whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(75, 0, 130, 0.8)" }}
// // //           whileTap={{ scale: 0.95 }}
// // //           className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg rounded-lg shadow-md transition-all duration-300 ease-in-out"
// // //           disabled={!className}
// // //         >
// // //           🔍 Search Timetable
// // //         </motion.button>
// // //       </motion.div>

// // //       {/* Loading Animation */}
// // //       {loading && (
// // //         <motion.div
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1, transition: { duration: 0.5 } }}
// // //           className="mt-4 text-white text-lg font-semibold animate-pulse"
// // //         >
// // //           ⏳ Fetching Timetable...
// // //         </motion.div>
// // //       )}

// // //       {/* Error Message Animation */}
// // //       {error && (
// // //         <motion.p
// // //           initial={{ opacity: 0, y: -10 }}
// // //           animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
// // //           className="mt-4 text-red-500 font-semibold"
// // //         >
// // //           {error}
// // //         </motion.p>
// // //       )}

// // //       {/* Timetable Display */}
// // //       {timetable && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
// // //           className="bg-white mt-6 p-6 rounded-lg shadow-xl w-full max-w-md text-center"
// // //         >
// // //           <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Timetable for {className}</h2>
// // //           <p className="text-gray-700">{JSON.stringify(timetable, null, 2)}</p>
// // //         </motion.div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default SearchTimetable;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";
// // import styled from "styled-components";

// // // Styled Components
// // const Container = styled.div`
// //   padding: 50px;
// //   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
// //   margin-bottom: 2rem;
// // `;

// // const SearchContainer = styled.div`
// //   background-color: rgba(255, 255, 255, 0.9);
// //   padding: 30px;
// //   border-radius: 10px;
// //   width: 100%;
// //   max-width: 600px;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // `;

// // const SelectField = styled.select`
// //   width: 100%;
// //   padding: 12px;
// //   margin: 10px 0;
// //   border-radius: 5px;
// //   border: 1px solid #ddd;
// //   transition: all 0.3s ease-in-out;
// //   &:focus {
// //     border-color: #667eea;
// //     outline: none;
// //     box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
// //   }
// // `;

// // const Button = styled.button`
// //   width: 100%;
// //   padding: 14px;
// //   background-color: #667eea;
// //   color: white;
// //   border: none;
// //   border-radius: 5px;
// //   font-size: 1.2rem;
// //   cursor: pointer;
// //   transition: all 0.3s ease-in-out;
// //   margin-top: 10px;
// //   &:hover {
// //     background-color: #5a6fd1;
// //   }
// // `;

// // const TimetableContainer = styled.div`
// //   background-color: white;
// //   margin-top: 30px;
// //   padding: 20px;
// //   border-radius: 10px;
// //   width: 100%;
// //   max-width: 900px;
// //   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// // `;

// // const TimetableTitle = styled.h2`
// //   color: #333;
// //   text-align: center;
// //   margin-bottom: 20px;
// // `;

// // const TimetableTable = styled.table`
// //   width: 100%;
// //   border-collapse: collapse;
// // `;

// // const TableHeader = styled.th`
// //   background-color: #667eea;
// //   color: white;
// //   padding: 12px;
// //   text-align: center;
// // `;

// // const TableCell = styled.td`
// //   border: 1px solid #ddd;
// //   padding: 10px;
// //   text-align: center;
// //   vertical-align: middle;
// // `;

// // const TimeCell = styled(TableCell)`
// //   background-color: #f8f9fa;
// //   font-weight: bold;
// // `;

// // const ErrorMessage = styled.p`
// //   color: #ff4d4d;
// //   text-align: center;
// //   margin-top: 10px;
// // `;

// // const LoadingMessage = styled.p`
// //   color: #667eea;
// //   text-align: center;
// //   margin-top: 10px;
// //   font-size: 1.2rem;
// // `;

// // const SearchTimetable = () => {
// //   const navigate = useNavigate();
// //   const [collegeName, setCollegeName] = useState("");
// //   const [branchName, setBranchName] = useState("");
// //   const [className, setClassName] = useState("");
// //   const [timetable, setTimetable] = useState(null);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const [colleges, setColleges] = useState([]);
// //   const [branches, setBranches] = useState([]);
// //   const [classes, setClasses] = useState([]);
// //   const [availableTimetables, setAvailableTimetables] = useState([]);

// //   // Fetch available colleges from localStorage
// //   useEffect(() => {
// //     const allTimetablesHistory = JSON.parse(localStorage.getItem("allTimetablesHistory")) || [];
// //     const uniqueColleges = [...new Set(allTimetablesHistory.map(item => item.collegeName))];
// //     setColleges(uniqueColleges);
// //   }, []);

// //   // Fetch branches based on selected college
// //   useEffect(() => {
// //     if (collegeName) {
// //       const allTimetablesHistory = JSON.parse(localStorage.getItem("allTimetablesHistory")) || [];
// //       const collegeBranches = allTimetablesHistory
// //         .filter(item => item.collegeName === collegeName)
// //         .map(item => item.branchName);
// //       const uniqueBranches = [...new Set(collegeBranches)];
// //       setBranches(uniqueBranches);
// //     } else {
// //       setBranches([]);
// //       setBranchName("");
// //       setClasses([]);
// //       setClassName("");
// //     }
// //   }, [collegeName]);

// //   // Fetch classes based on selected branch
// //   useEffect(() => {
// //     if (branchName) {
// //       const historyKey = `timetableHistory_${collegeName}_${branchName}`;
// //       const branchTimetables = JSON.parse(localStorage.getItem(historyKey)) || [];
// //       const uniqueClasses = [...new Set(branchTimetables.map(t => t.metadata?.branchName))];
// //       setClasses(uniqueClasses);
// //       setAvailableTimetables(branchTimetables);
// //     } else {
// //       setClasses([]);
// //       setClassName("");
// //       setAvailableTimetables([]);
// //     }
// //   }, [collegeName, branchName]);

// //   const handleSearch = async () => {
// //     if (!collegeName || !branchName) {
// //       setError("Please select both college and branch");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");
// //     setTimetable(null);

// //     try {
// //       const historyKey = `timetableHistory_${collegeName}_${branchName}`;
// //       const timetables = JSON.parse(localStorage.getItem(historyKey)) || [];
      
// //       if (timetables.length === 0) {
// //         throw new Error("No timetables found for the selected college and branch");
// //       }

// //       // Get the most recent timetable
// //       const mostRecentTimetable = timetables[0];
// //       setTimetable(mostRecentTimetable);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderTimetable = () => {
// //     if (!timetable) return null;

// //     const days = timetable.metadata?.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// //     const classTimes = timetable.metadata?.classTimes || [];
// //     const labTimings = timetable.metadata?.labTimings || [];

// //     return (
// //       <TimetableContainer>
// //         <TimetableTitle>
// //           Timetable for {timetable.metadata?.branchName} - {timetable.metadata?.collegeName}
// //         </TimetableTitle>
// //         <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
// //           Generated on: {timetable.metadata?.generatedAt || "Unknown date"}
// //         </p>

// //         <TimetableTable>
// //           <thead>
// //             <tr>
// //               <TableHeader>Time/Day</TableHeader>
// //               {days.map(day => (
// //                 <TableHeader key={day}>{day}</TableHeader>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {classTimes.map((time, index) => (
// //               <tr key={`period-${index}`}>
// //                 <TimeCell>{time}</TimeCell>
// //                 {days.map(day => {
// //                   const dayKey = day.toLowerCase();
// //                   const period = timetable.timetable[dayKey]?.find(
// //                     p => p.time === time
// //                   );
// //                   return (
// //                     <TableCell key={`${day}-${time}`}>
// //                       {period ? (
// //                         <div>
// //                           <strong>{period.subject}</strong>
// //                           <br />
// //                           {period.teacher && <span>{period.teacher}</span>}
// //                           {period.room && (
// //                             <>
// //                               <br />
// //                               <small>{period.room}</small>
// //                             </>
// //                           )}
// //                         </div>
// //                       ) : (
// //                         "-"
// //                       )}
// //                     </TableCell>
// //                   );
// //                 })}
// //               </tr>
// //             ))}

// //             {/* Lab Sessions */}
// //             {labTimings.length > 0 && (
// //               <tr>
// //                 <TimeCell>Lab Sessions</TimeCell>
// //                 {days.map(day => {
// //                   const dayKey = day.toLowerCase();
// //                   const lab = timetable.timetable[dayKey]?.find(
// //                     p => p.type === "lab"
// //                   );
// //                   return (
// //                     <TableCell key={`lab-${day}`}>
// //                       {lab ? (
// //                         <div style={{ backgroundColor: "#f0f7ff", padding: "5px" }}>
// //                           <strong>{lab.subject}</strong>
// //                           <br />
// //                           {lab.teacher && <span>{lab.teacher}</span>}
// //                           {lab.location && (
// //                             <>
// //                               <br />
// //                               <small>{lab.location}</small>
// //                             </>
// //                           )}
// //                           <br />
// //                           <small>{lab.time}</small>
// //                         </div>
// //                       ) : (
// //                         "-"
// //                       )}
// //                     </TableCell>
// //                   );
// //                 })}
// //               </tr>
// //             )}
// //           </tbody>
// //         </TimetableTable>

// //         <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
// //           <Button 
// //             onClick={() => navigate("/generate-time-table")}
// //             style={{ backgroundColor: "#4CAF50" }}
// //           >
// //             Generate New Timetable
// //           </Button>
// //           <Button 
// //             onClick={() => navigate("/timetable-history")}
// //             style={{ backgroundColor: "#764ba2" }}
// //           >
// //             View All Timetables
// //           </Button>
// //         </div>
// //       </TimetableContainer>
// //     );
// //   };

// //   return (
// //     <Container>
// //       <Title>Search Timetable</Title>
      
// //       <SearchContainer>
// //         <SelectField
// //           value={collegeName}
// //           onChange={(e) => setCollegeName(e.target.value)}
// //         >
// //           <option value="">Select College</option>
// //           {colleges.map((college, index) => (
// //             <option key={index} value={college}>
// //               {college}
// //             </option>
// //           ))}
// //         </SelectField>

// //         <SelectField
// //           value={branchName}
// //           onChange={(e) => setBranchName(e.target.value)}
// //           disabled={!collegeName}
// //         >
// //           <option value="">Select Branch</option>
// //           {branches.map((branch, index) => (
// //             <option key={index} value={branch}>
// //               {branch}
// //             </option>
// //           ))}
// //         </SelectField>

// //         <SelectField
// //           value={className}
// //           onChange={(e) => setClassName(e.target.value)}
// //           disabled={!branchName}
// //         >
// //           <option value="">Select Class (Optional)</option>
// //           {classes.map((cls, index) => (
// //             <option key={index} value={cls}>
// //               {cls}
// //             </option>
// //           ))}
// //         </SelectField>

// //         <Button onClick={handleSearch}>
// //           {loading ? "Searching..." : "Search Timetable"}
// //         </Button>

// //         {loading && <LoadingMessage>Loading timetable...</LoadingMessage>}
// //         {error && <ErrorMessage>{error}</ErrorMessage>}
// //       </SearchContainer>

// //       {renderTimetable()}
// //     </Container>
// //   );
// // };

// // export default SearchTimetable;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { FaFilePdf, FaDownload } from "react-icons/fa";

// // Styled Components (Combined from both components)
// const Container = styled.div`
//   padding: 40px;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

// const SearchContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.95);
//   padding: 30px;
//   border-radius: 15px;
//   width: 100%;
//   max-width: 600px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
//   margin-bottom: 30px;
// `;

// const SelectField = styled.select`
//   width: 100%;
//   padding: 12px;
//   margin: 10px 0;
//   border-radius: 5px;
//   border: 1px solid #ddd;
//   font-family: "Poppins", sans-serif;
//   transition: all 0.3s ease-in-out;
//   &:focus {
//     border-color: #667eea;
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 14px;
//   background-color: #667eea;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 1.2rem;
//   cursor: pointer;
//   transition: all 0.3s ease-in-out;
//   margin-top: 10px;
//   font-family: "Poppins", sans-serif;
//   &:hover {
//     background-color: #5a6fd1;
//     transform: translateY(-2px);
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
//   }
// `;

// const TimetableContainer = styled.div`
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
//   background-color: #ff785a;
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
//   background-color: #ff785a;
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
//   background-color: #fffaf2;
//   transition: all 0.3s ease-in-out;
//   font-family: "Poppins", sans-serif;
//   &:hover {
//     background-color: #ffdac1;
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

// const LabSlot = styled.div`
//   background-color: #e6f7ff;
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

// const ErrorMessage = styled.p`
//   color: #ff4d4d;
//   text-align: center;
//   margin-top: 10px;
//   font-family: "Poppins", sans-serif;
// `;

// const LoadingMessage = styled.p`
//   color: #667eea;
//   text-align: center;
//   margin-top: 10px;
//   font-size: 1.2rem;
//   font-family: "Poppins", sans-serif;
// `;

// const SearchTimetable = () => {
//   const navigate = useNavigate();
//   const [collegeName, setCollegeName] = useState("");
//   const [branchName, setBranchName] = useState("");
//   const [className, setClassName] = useState("");
//   const [timetable, setTimetable] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [colleges, setColleges] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [availableTimetables, setAvailableTimetables] = useState([]);

//   // Fetch available colleges from localStorage
//   useEffect(() => {
//     const allTimetablesHistory = JSON.parse(localStorage.getItem("allTimetablesHistory")) || [];
//     const uniqueColleges = [...new Set(allTimetablesHistory.map(item => item.collegeName))];
//     setColleges(uniqueColleges);
//   }, []);

//   // Fetch branches based on selected college
//   useEffect(() => {
//     if (collegeName) {
//       const allTimetablesHistory = JSON.parse(localStorage.getItem("allTimetablesHistory")) || [];
//       const collegeBranches = allTimetablesHistory
//         .filter(item => item.collegeName === collegeName)
//         .map(item => item.branchName);
//       const uniqueBranches = [...new Set(collegeBranches)];
//       setBranches(uniqueBranches);
//     } else {
//       setBranches([]);
//       setBranchName("");
//       setClasses([]);
//       setClassName("");
//     }
//   }, [collegeName]);

//   // Fetch classes based on selected branch
//   useEffect(() => {
//     if (branchName) {
//       const historyKey = `timetableHistory_${collegeName}_${branchName}`;
//       const branchTimetables = JSON.parse(localStorage.getItem(historyKey)) || [];
//       const uniqueClasses = [...new Set(branchTimetables.map(t => t.metadata?.className))];
//       setClasses(uniqueClasses);
//       setAvailableTimetables(branchTimetables);
//     } else {
//       setClasses([]);
//       setClassName("");
//       setAvailableTimetables([]);
//     }
//   }, [collegeName, branchName]);

//   const handleSearch = async () => {
//     if (!collegeName || !branchName) {
//       setError("Please select both college and branch");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setTimetable(null);

//     try {
//       const historyKey = `timetableHistory_${collegeName}_${branchName}`;
//       const timetables = JSON.parse(localStorage.getItem(historyKey)) || [];
      
//       if (timetables.length === 0) {
//         throw new Error("No timetables found for the selected college and branch");
//       }

//       // Filter by class if selected
//       let filteredTimetables = timetables;
//       if (className) {
//         filteredTimetables = timetables.filter(t => t.metadata?.className === className);
//       }

//       if (filteredTimetables.length === 0) {
//         throw new Error("No timetables found for the selected class");
//       }

//       // Get the most recent timetable
//       const mostRecentTimetable = filteredTimetables[0];
//       setTimetable(mostRecentTimetable);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownloadPDF = () => {
//     const input = document.getElementById("timetable-container");

//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgWidth = 210; // A4 width in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       pdf.save(`timetable_${collegeName}_${branchName}.pdf`);
//     });
//   };

//   const renderTimetable = () => {
//     if (!timetable) return null;

//     const workingDays = timetable.metadata?.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//     const classTimes = timetable.metadata?.classTimes || ["9-10", "10-11", "11-12"];
//     const labTimings = timetable.metadata?.labTimings || ["14-16"];
//     const classRoomAssignment = timetable.metadata?.classRoomAssignment || {
//       cs1: "101",
//       cs2: "102",
//       cs3: "103",
//     };

//     return (
//       <div id="timetable-container">
//         <TimetableContainer>
//           <SubTitle>
//             {timetable.metadata?.collegeName} - {timetable.metadata?.branchName}
//             {className && ` - ${className}`}
//           </SubTitle>
//           <RoomInfo>Generated on: {timetable.metadata?.generatedAt || "Unknown date"}</RoomInfo>

//           {Object.keys(timetable.timetable).map((className, classIndex) => {
//             const classData = timetable.timetable[className];

//             return (
//               <div key={classIndex}>
//                 {timetable.metadata?.className && (
//                   <RoomInfo>📌 Class Room: {classRoomAssignment[className] || "Not Assigned"}</RoomInfo>
//                 )}
//                 <Table>
//                   <thead>
//                     <tr>
//                       <TimeColumn>Time</TimeColumn>
//                       {workingDays.map((day, index) => (
//                         <Th key={index}>{day}</Th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {/* Class Rows with Auto-Filled Slots */}
//                     {classTimes.map((time, timeIndex) => (
//                       <tr key={timeIndex}>
//                         <Td>{time}</Td>
//                         {workingDays.map((day, dayIndex) => {
//                           const dayKey = day.toLowerCase();
//                           const dayClasses = classData?.[dayKey]?.classes || [];
//                           const matchedClass = dayClasses.find((cls) => cls.time === time);

//                           let subjectToShow = matchedClass
//                             ? matchedClass
//                             : dayClasses.find((cls) => cls.time !== time);

//                           return (
//                             <Td key={dayIndex}>
//                               {subjectToShow ? (
//                                 <>
//                                   <strong>{subjectToShow.subject}</strong> <br />
//                                   <span>👨‍🏫 {subjectToShow.teacher}</span>
//                                   {subjectToShow.room && (
//                                     <>
//                                       <br />
//                                       <span>🏫 {subjectToShow.room}</span>
//                                     </>
//                                   )}
//                                 </>
//                               ) : (
//                                 "No Class"
//                               )}
//                             </Td>
//                           );
//                         })}
//                       </tr>
//                     ))}

//                     {/* Lab Row */}
//                     {labTimings.length > 0 && (
//                       <tr>
//                         <Td>
//                           <strong>Lab - {labTimings[0]}</strong>
//                         </Td>
//                         {workingDays.map((day, dayIndex) => {
//                           const dayKey = day.toLowerCase();
//                           const labData = classData?.[dayKey]?.lab;
//                           const slots = Array.isArray(labData?.slots) ? labData.slots : [];

//                           return (
//                             <Td key={dayIndex}>
//                               {slots.length > 0 ? (
//                                 <LabSlot>
//                                   {slots.map((labSlot, labIndex) => (
//                                     <React.Fragment key={labIndex}>
//                                       <div>
//                                         {labSlot.batch && <span>Batch: {labSlot.batch}</span>}
//                                         {labSlot.batch && <br />}
//                                         <span>Subject: {labSlot.subject}</span> <br />
//                                         <span>👨‍🏫 {labSlot.teacher}</span> <br />
//                                         <span>
//                                           🏫 <LabLocation>{labSlot.lab || labSlot.room || labSlot.location}</LabLocation>
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
//               </div>
//             );
//           })}

//           <DownloadButton onClick={handleDownloadPDF}>
//             <IconWrapper>
//               <FaFilePdf />
//             </IconWrapper>
//             Download as PDF
//             <IconWrapper>
//               <FaDownload />
//             </IconWrapper>
//           </DownloadButton>

//           <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//             <Button 
//               onClick={() => navigate("/generate-time-table")}
//               style={{ backgroundColor: "#4CAF50" }}
//             >
//               Generate New Timetable
//             </Button>
//             <Button 
//               onClick={() => navigate("/timetable-history")}
//               style={{ backgroundColor: "#764ba2" }}
//             >
//               View All Timetables
//             </Button>
//           </div>
//         </TimetableContainer>
//       </div>
//     );
//   };

//   return (
//     <Container>
//       <Title>Search Timetable</Title>
      
//       <SearchContainer>
//         <SelectField
//           value={collegeName}
//           onChange={(e) => setCollegeName(e.target.value)}
//         >
//           <option value="">Select College</option>
//           {colleges.map((college, index) => (
//             <option key={index} value={college}>
//               {college}
//             </option>
//           ))}
//         </SelectField>

//         <SelectField
//           value={branchName}
//           onChange={(e) => setBranchName(e.target.value)}
//           disabled={!collegeName}
//         >
//           <option value="">Select Branch</option>
//           {branches.map((branch, index) => (
//             <option key={index} value={branch}>
//               {branch}
//             </option>
//           ))}
//         </SelectField>

//         <SelectField
//           value={className}
//           onChange={(e) => setClassName(e.target.value)}
//           disabled={!branchName}
//         >
//           <option value="">Select Class (Optional)</option>
//           {classes.map((cls, index) => (
//             <option key={index} value={cls}>
//               {cls}
//             </option>
//           ))}
//         </SelectField>

//         <Button onClick={handleSearch}>
//           {loading ? "Searching..." : "Search Timetable"}
//         </Button>

//         {loading && <LoadingMessage>Loading timetable...</LoadingMessage>}
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//       </SearchContainer>

//       {renderTimetable()}
//     </Container>
//   );
// };

// export default SearchTimetable;

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