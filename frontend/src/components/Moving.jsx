// import React from 'react';

// const Moving = () => {
//   return (
//     <div id="page2" className="relative min-h-screen w-screen bg-whitesmoke py-[8vw] mb-[-20vh]">
//       <div
//         id="moving-text"
//         className="whitespace-nowrap overflow-x-hidden scrollbar-none" // Hide the scrollbar
//       >
//         <div className="con inline-block animate-[move_10s_linear_infinite]">
//           {/* All elements inside a single line */}
//           <span className="text-[9vw] inline-block">For School</span>
//           <div
//             id="gola"
//             className="h-[70px] w-[70px] bg-[#FE320A] rounded-full inline-block mx-[2vw]"
//           ></div>

//           <span className="text-[9vw] inline-block">For College</span>
//           <div
//             id="gola"
//             className="h-[70px] w-[70px] bg-[#FE320A] rounded-full inline-block mx-[2vw]"
//           ></div>

//           <span className="text-[9vw] inline-block">For UniversityS</span>
//           <div
//             id="gola"
//             className="h-[70px] w-[70px] bg-[#FE320A] rounded-full inline-block mx-[2vw]"
//           ></div>

// <span className="text-[9vw] inline-block">The Scheduler</span>
//           <div
//             id="gola"
//             className="h-[70px] w-[70px] bg-[#FE320A] rounded-full inline-block mx-[2vw]"
//           ></div>
//         </div>
//       </div>

//       {/* <div id="page2-bottom" className="h-[80vh] flex items-center justify-between mx-[40px] relative z-9">
//         <h1 className="text-[7vh]">Your Content Here</h1>
//       </div> */}
//     </div>
//   );
// };

// export default Moving;


// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// const Moving = () => {
//   const movingTextRef = useRef(null);

//   useEffect(() => {
//     gsap.to(movingTextRef.current, {
//       x: "-50%", // Moves the text continuously to the left
//       duration: 15, // Speed of animation
//       ease: "linear",
//       repeat: -1, // Infinite loop
//     });
//   }, []);

//   return (
//     <div id="page2" className="relative min-h-screen w-screen bg-gray-900 flex items-center overflow-hidden">
//       <div id="moving-text" className="whitespace-nowrap overflow-hidden w-full flex">
//         <div ref={movingTextRef} className="flex items-center">
//           {/* Scrolling text with glowing effect */}
//           <span className="text-[9vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-lg">
//             AI Scheduling
//           </span>
//           <div className="h-[70px] w-[70px] bg-gradient-to-r from-orange-400 to-red-500 rounded-full mx-[2vw] animate-bounce shadow-xl"></div>

//           <span className="text-[9vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 drop-shadow-lg">
//             Smart Timetables
//           </span>
//           <div className="h-[70px] w-[70px] bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-[2vw] animate-pulse shadow-xl"></div>

//           <span className="text-[9vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-lg">
//             University Planner
//           </span>
//           <div className="h-[70px] w-[70px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mx-[2vw] animate-spin shadow-xl"></div>

//           <span className="text-[9vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-600 drop-shadow-lg">
//             The Future of Scheduling
//           </span>
//           <div className="h-[70px] w-[70px] bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-[2vw] animate-ping shadow-xl"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Moving;


import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Moving = () => {
  const movingTextRef = useRef(null);

  useEffect(() => {
    gsap.to(movingTextRef.current, {
      x: "-50%", // Moves text continuously to the left
      duration: 15, // Speed of animation
      ease: "linear",
      repeat: -1, // Infinite loop
    });
  }, []);

  return (
    <div id="page2" className="relative min-h-screen w-screen bg-black flex items-center overflow-hidden">
      <div id="moving-text" className="whitespace-nowrap overflow-hidden w-full flex">
        <div ref={movingTextRef} className="flex items-center">
          {/* Scrolling text with a futuristic neon glow effect */}
          <span className="text-[8vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-lg">
            AI-Powered Solutions
          </span>
          <div className="h-[70px] w-[70px] bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full mx-[2vw] animate-bounce shadow-xl"></div>

          <span className="text-[8vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 drop-shadow-lg">
            Next-Gen Scheduling
          </span>
          <div className="h-[70px] w-[70px] bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-[2vw] animate-pulse shadow-xl"></div>

          <span className="text-[8vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-lg">
            Seamless Planning
          </span>
          <div className="h-[70px] w-[70px] bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mx-[2vw] animate-spin shadow-xl"></div>

          <span className="text-[8vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 drop-shadow-lg">
            Future of Timetables
          </span>
          <div className="h-[70px] w-[70px] bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-[2vw] animate-ping shadow-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Moving;
