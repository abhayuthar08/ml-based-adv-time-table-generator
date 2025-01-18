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

  // State to track whether the next component should be rendered
  const [showNextComponent, setShowNextComponent] = useState(false);

  useEffect(() => {
    // Listen to scroll progress changes
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      // Determine how many images should be active based on scroll progress
      const activeImages = images.map((item, index) => ({
        ...item,
        isActive: progress > index / (images.length - 1),
      }));

      // Set active images
      setImages(activeImages);

      // Show next component when scrolling reaches the end
      if (progress > 0.95) {
        setShowNextComponent(true);
      } else {
        setShowNextComponent(false);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [scrollYProgress, images.length]);

  // Interpolate color based on scroll progress
  const interpolateColor = (progress) => {
    const red = Math.min(255, Math.floor(progress * 255));
    const green = Math.min(255, Math.floor((1 - progress) * 255));
    const blue = 255 - red;
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <div className="w-full mt-[100px] min-h-[200vh] mb-[-130vh] text-white">
      <div className="max-w-[70vw] relative w-full bg-zinc-900 mx-auto text-center">
        {/* Motion div with scale transition on scroll */}
        <motion.h1
          className="text-[10vw] leading-none font-bold tracking-tighter select-none"
          style={{
            scale: scrollYProgress.get() * 2 + 1, // Dynamically scale based on scroll position
            color: interpolateColor(scrollYProgress.get()), // Dynamic color based on scroll position
            textShadow: `0px 0px ${scrollYProgress.get() * 10}px rgba(255, 255, 255, 0.8)`, // Optional text shadow effect
            transform: `skewY(${scrollYProgress.get() * 15}deg)`, // Skew the text as you scroll for distortion effect
          }}
          whileHover={{
            scale: 1.8, // Scale up when hovered
            textShadow: "0px 0px 30px rgba(255, 255, 255, 0.8)", // Enhance text shadow on hover
            transition: { duration: 0.3 }, // Smooth transition on hover
          }}
        >
          CREATE YOUR TIME TABLE
        </motion.h1>

        <div className="absolute w-full top-0 h-full">
          {images.map(
            (elem, index) =>
              elem.isActive && (
                <img
                  key={index}
                  className="w-60 absolute rounded-lg -translate-x-[50%] -translate-y-[50%]"
                  src={elem.url}
                  style={{ top: elem.top, left: elem.left }}
                  alt=""
                />
              )
          )}
        </div>
      </div>

      {/* Conditionally render the next component */}
      {showNextComponent && (
        <div className="w-full bg-blue-500 text-white text-center py-12">
          <h2 className="text-3xl font-bold">Next Component Appears!</h2>
        </div>
      )}
    </div>
  );
}

export default Work;
