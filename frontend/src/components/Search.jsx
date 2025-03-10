import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-yellow-400 to-orange-500">
      <motion.button
        onClick={() => navigate("/search-timetable")} // Navigate to SearchTimeTable page
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255, 165, 0, 0.7)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        className="px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:from-red-400 hover:to-pink-400 hover:shadow-2xl"
      >
        🔍 Search Your Class Timetable 😊
      </motion.button>
    </div>
  );
};

export default Search;
