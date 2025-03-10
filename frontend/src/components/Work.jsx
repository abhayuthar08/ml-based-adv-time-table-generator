// import React, { useState, useEffect } from "react";
// import { motion, useScroll } from "framer-motion";

// function Work() {
//   const [images, setImages] = useState([
//     {
//       url: "https://i.pinimg.com/564x/28/bd/19/28bd191b7ff2e9fc1f6923a9f953db82.jpg",
//       left: "50%",
//       top: "50%",
//       isActive: false,
//     },
//     {
//       url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0acbc45cb2f4fc5c6b2_Yahoo.png",
//       left: "56%",
//       top: "44%",
//       isActive: false,
//     },
//     {
//       url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef092455ce2cf591e52d1_Rainfall.png",
//       left: "45%",
//       top: "56%",
//       isActive: false,
//     },
//     {
//       url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0accfe1b3e66bc55462_Refokus%20Tools.png",
//       left: "60%",
//       top: "53%",
//       isActive: false,
//     },
//     {
//       url: "https://i.pinimg.com/564x/78/19/e8/7819e8797424eb54391a3cc2f4ec7853.jpg",
//       left: "43%",
//       top: "40%",
//       isActive: false,
//     },
//     {
//       url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0af108a465002975acd_Showcase%20Websites%20(1).png",
//       left: "65%",
//       top: "55%",
//       isActive: false,
//     },
//   ]);

//   const { scrollYProgress } = useScroll();
//   const [showNextComponent, setShowNextComponent] = useState(false);

//   useEffect(() => {
//     const unsubscribe = scrollYProgress.on("change", (progress) => {
//       const activeImages = images.map((item, index) => ({
//         ...item,
//         isActive: progress > index / (images.length - 1),
//       }));

//       setImages(activeImages);

//       if (progress > 0.95) {
//         setShowNextComponent(true);
//       } else {
//         setShowNextComponent(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [scrollYProgress, images.length]);

//   return (
//     <div className="w-full mt-[100px] min-h-[200vh] mb-[-130vh] text-white">
//       <div className="max-w-[70vw] relative w-full bg-zinc-900 mx-auto text-center">
//         <motion.h1
//           className="text-[8vw] leading-none font-extrabold tracking-tighter select-none"
//           style={{
//             scale: scrollYProgress.get() * 1.8 + 1,
//             background: `linear-gradient(to right, #ffcc33, #ff6666, #ff33ff, #6633ff)`,
//             WebkitBackgroundClip: "text",
//             color: "transparent",
//             textShadow: `0px 0px ${scrollYProgress.get() * 15}px rgba(255, 255, 255, 0.8)`,
//             transform: `skewY(${scrollYProgress.get() * 8}deg)`,
//           }}
//           whileHover={{
//             scale: 1.3,
//             textShadow: "0px 0px 50px rgba(255, 255, 255, 0.9)",
//             transition: { duration: 0.3 },
//           }}
//         >
//           PLAN. CREATE. OPTIMIZE.
//         </motion.h1>
//         <motion.p
//           className="text-lg mt-4 text-gray-300"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
//         >
//           Build the perfect schedule effortlessly. <br /> Stay organized, save time, and focus on what matters. 🚀
//         </motion.p>

//         <div className="absolute w-full top-0 h-full">
//           {images.map(
//             (elem, index) =>
//               elem.isActive && (
//                 <motion.img
//                   key={index}
//                   className="w-60 absolute rounded-lg -translate-x-[50%] -translate-y-[50%]"
//                   src={elem.url}
//                   style={{ top: elem.top, left: elem.left }}
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
//                   exit={{ opacity: 0, scale: 0.5 }}
//                   alt=""
//                 />
//               )
//           )}
//         </div>
//       </div>

//       {showNextComponent && (
//         <motion.div
//           className="w-full bg-blue-500 text-white text-center py-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
//         >
//           <h2 className="text-3xl font-bold">🚀 Your Journey Begins Here!</h2>
//           <p className="text-lg mt-2 text-gray-200">
//             Scroll further to unlock more exciting features.
//           </p>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// export default Work;


import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

function Work() {
  const [images, setImages] = useState([
    {
      url: "https://i.pinimg.com/564x/28/bd/19/28bd191b7ff2e9fc1f6923a9f953db82.jpg",
      left: "50%",
      top: "50%",
      isActive: false,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0acbc45cb2f4fc5c6b2_Yahoo.png",
      left: "56%",
      top: "44%",
      isActive: false,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef092455ce2cf591e52d1_Rainfall.png",
      left: "45%",
      top: "56%",
      isActive: false,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0accfe1b3e66bc55462_Refokus%20Tools.png",
      left: "60%",
      top: "53%",
      isActive: false,
    },
    {
      url: "https://i.pinimg.com/564x/78/19/e8/7819e8797424eb54391a3cc2f4ec7853.jpg",
      left: "43%",
      top: "40%",
      isActive: false,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0af108a465002975acd_Showcase%20Websites%20(1).png",
      left: "65%",
      top: "55%",
      isActive: false,
    },
  ]);

  const { scrollYProgress } = useScroll();
  const [showNextComponent, setShowNextComponent] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const activeImages = images.map((item, index) => ({
        ...item,
        isActive: progress > index / (images.length - 1),
      }));

      setImages(activeImages);

      if (progress > 0.95) {
        setShowNextComponent(true);
      } else {
        setShowNextComponent(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, images.length]);

  return (
    <div className="w-full mt-[100px] min-h-[200vh] mb-[-130vh] text-white">
      <div className="max-w-[70vw] relative w-full bg-zinc-900 mx-auto text-center">
        <motion.h1
          className="text-[8vw] leading-none font-extrabold tracking-tighter select-none"
          style={{
            scale: scrollYProgress.get() * 1.8 + 1,
            background: `linear-gradient(to right, #ffcc33, #ff6666, #ff33ff, #6633ff)`,
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: `0px 0px ${scrollYProgress.get() * 15}px rgba(255, 255, 255, 0.8)`,
            transform: `skewY(${scrollYProgress.get() * 8}deg)`,
          }}
          whileHover={{
            scale: 1.3,
            textShadow: "0px 0px 50px rgba(255, 255, 255, 0.9)",
            transition: { duration: 0.3 },
          }}
        >
          PLAN. CREATE. OPTIMIZE.
        </motion.h1>
        <motion.p
          className="text-lg mt-4 text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        >
          Build the perfect schedule effortlessly. <br /> Stay organized, save time, and focus on what matters. 🚀
        </motion.p>

        <div className="absolute w-full top-0 h-full">
          {images.map(
            (elem, index) =>
              elem.isActive && (
                <motion.img
                  key={index}
                  className="w-60 absolute rounded-lg -translate-x-[50%] -translate-y-[50%]"
                  src={elem.url}
                  style={{ top: elem.top, left: elem.left }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  alt=""
                />
              )
          )}
        </div>
      </div>

      {showNextComponent && (
        <motion.div
          className="w-full bg-blue-500 text-white text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <h2 className="text-3xl font-bold">🚀 Your Journey Begins Here!</h2>
          <p className="text-lg mt-2 text-gray-200">
            Scroll further to unlock more exciting features.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Work;
