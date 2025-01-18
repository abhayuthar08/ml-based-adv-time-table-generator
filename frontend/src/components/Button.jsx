// import React from "react";
// import { IoIosReturnRight } from "react-icons/io";


// function Button({title='Get Started'}) {
//   return (
//     <div className="min-w-40 justify-between px-4  flex py-1.45 h-[1.8vw] items-center justify-center  bg-zinc-100 text-black rounded-full">
//         <span className="text-sm font-medium">{title}</span>
//         <IoIosReturnRight/>
   
//     </div>
//   );
// }

// export default Button;





import React from "react";
import { motion } from "framer-motion";

function Button() {
  return (
    <motion.button
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 10px rgba(0, 255, 0, 0.8)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      Get Started
    </motion.button>
  );
}

export default Button;
