// // import React, { useState } from "react";
// // import axios from "axios";

// // const SearchTimetable = () => {
// //   const [collegeName, setCollegeName] = useState("");
// //   const [branchName, setBranchName] = useState("");
// //   const [className, setClassName] = useState("");
// //   const [timetable, setTimetable] = useState(null);
// //   const [error, setError] = useState("");

// //   const handleSearch = async () => {
// //     try {
// //       const response = await axios.get("/api/timetable/search", {
// //         params: { collegeName, branchName, className },
// //       });
// //       setTimetable(response.data.timetable);
// //       setError("");
// //     } catch (err) {
// //       setError("❌ Failed to fetch timetable. Please check your inputs.");
// //       setTimetable(null);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Search Timetable</h1>
// //       <div>
// //         <input
// //           type="text"
// //           placeholder="College Name"
// //           value={collegeName}
// //           onChange={(e) => setCollegeName(e.target.value)}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Branch Name"
// //           value={branchName}
// //           onChange={(e) => setBranchName(e.target.value)}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Class Name"
// //           value={className}
// //           onChange={(e) => setClassName(e.target.value)}
// //         />
// //         <button onClick={handleSearch}>Search</button>
// //       </div>
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       {timetable && (
// //         <div>
// //           <h2>Timetable for {className}</h2>
// //           {/* Render the timetable here */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchTimetable;

// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const SearchTimetable = () => {
//   const [collegeName, setCollegeName] = useState("");
//   const [branchName, setBranchName] = useState("");
//   const [className, setClassName] = useState("");
//   const [timetable, setTimetable] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     setLoading(true);
//     setError("");
//     setTimetable(null);

//     try {
//       const response = await axios.get("/api/timetable/search", {
//         params: { collegeName, branchName, className },
//       });

//       setTimetable(response.data.timetable);
//       setError("");
//     } catch (err) {
//       setError("❌ Failed to fetch timetable. Please check your inputs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-6">
//       {/* Page Title */}
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
//         className="text-white text-4xl font-bold mb-6"
//       >
//         🔍 Search Your Timetable
//       </motion.h1>

//       {/* Search Input Fields */}
//       <motion.div
//         className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
//       >
//         <motion.input
//           type="text"
//           placeholder="College Name"
//           value={collegeName}
//           onChange={(e) => setCollegeName(e.target.value)}
//           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.input
//           type="text"
//           placeholder="Branch Name"
//           value={branchName}
//           onChange={(e) => setBranchName(e.target.value)}
//           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//           whileFocus={{ scale: 1.05 }}
//         />
//         <motion.input
//           type="text"
//           placeholder="Class Name"
//           value={className}
//           onChange={(e) => setClassName(e.target.value)}
//           className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//           whileFocus={{ scale: 1.05 }}
//         />

//         {/* Animated Search Button */}
//         <motion.button
//           onClick={handleSearch}
//           whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 105, 180, 0.8)" }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-lg shadow-md transition-all duration-300 ease-in-out"
//         >
//           🚀 Search Timetable
//         </motion.button>
//       </motion.div>

//       {/* Loading Animation */}
//       {loading && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, transition: { duration: 0.5 } }}
//           className="mt-4 text-white text-lg font-semibold animate-pulse"
//         >
//           ⏳ Fetching Timetable...
//         </motion.div>
//       )}

//       {/* Error Message Animation */}
//       {error && (
//         <motion.p
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
//           className="mt-4 text-red-500 font-semibold"
//         >
//           {error}
//         </motion.p>
//       )}

//       {/* Timetable Display */}
//       {timetable && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
//           className="bg-white mt-6 p-6 rounded-lg shadow-xl w-full max-w-md text-center"
//         >
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Timetable for {className}</h2>
//           <p className="text-gray-700">{JSON.stringify(timetable, null, 2)}</p>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default SearchTimetable;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const SearchTimetable = () => {
  const [collegeName, setCollegeName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [className, setClassName] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);
  const [classes, setClasses] = useState([]);

  // Fetch available colleges from API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("/api/colleges");
        setColleges(response.data.colleges || []);
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      }
    };
    fetchColleges();
  }, []);

  // Fetch branches based on selected college
  useEffect(() => {
    if (collegeName) {
      const fetchBranches = async () => {
        try {
          const response = await axios.get(`/api/branches?college=${collegeName}`);
          setBranches(response.data.branches || []);
        } catch (error) {
          console.error("Failed to fetch branches:", error);
        }
      };
      fetchBranches();
    } else {
      setBranches([]);
    }
  }, [collegeName]);

  // Fetch classes based on selected branch
  useEffect(() => {
    if (branchName) {
      const fetchClasses = async () => {
        try {
          const response = await axios.get(`/api/classes?branch=${branchName}`);
          setClasses(response.data.classes || []);
        } catch (error) {
          console.error("Failed to fetch classes:", error);
        }
      };
      fetchClasses();
    } else {
      setClasses([]);
    }
  }, [branchName]);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setTimetable(null);

    try {
      const response = await axios.get("/api/timetable/search", {
        params: { collegeName, branchName, className },
      });

      setTimetable(response.data.timetable);
      setError("");
    } catch (err) {
      setError("❌ Failed to fetch timetable. Please check your selections.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 p-6">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        className="text-white text-4xl font-bold mb-6"
      >
        📅 Search Your Timetable
      </motion.h1>

      {/* Search Input Fields */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
      >
        {/* College Dropdown */}
        <motion.select
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          whileFocus={{ scale: 1.05 }}
        >
          <option value="">Select College</option>
          {colleges.map((college, index) => (
            <option key={index} value={college}>
              {college}
            </option>
          ))}
        </motion.select>

        {/* Branch Dropdown */}
        <motion.select
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          disabled={!collegeName}
          whileFocus={{ scale: 1.05 }}
        >
          <option value="">Select Branch</option>
          {branches.map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </motion.select>

        {/* Class Dropdown */}
        <motion.select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="w-full px-4 py-3 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          disabled={!branchName}
          whileFocus={{ scale: 1.05 }}
        >
          <option value="">Select Class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls}>
              {cls}
            </option>
          ))}
        </motion.select>

        {/* Animated Search Button */}
        <motion.button
          onClick={handleSearch}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(75, 0, 130, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg rounded-lg shadow-md transition-all duration-300 ease-in-out"
          disabled={!className}
        >
          🔍 Search Timetable
        </motion.button>
      </motion.div>

      {/* Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          className="mt-4 text-white text-lg font-semibold animate-pulse"
        >
          ⏳ Fetching Timetable...
        </motion.div>
      )}

      {/* Error Message Animation */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="mt-4 text-red-500 font-semibold"
        >
          {error}
        </motion.p>
      )}

      {/* Timetable Display */}
      {timetable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          className="bg-white mt-6 p-6 rounded-lg shadow-xl w-full max-w-md text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Timetable for {className}</h2>
          <p className="text-gray-700">{JSON.stringify(timetable, null, 2)}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchTimetable;
