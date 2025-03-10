// import React, { useEffect } from "react";
// import gsap from "gsap";

// const Footer = () => {
//   useEffect(() => {
//     // Animation for sliding the footer in from the bottom
//     gsap.fromTo(
//       ".footer-container",
//       {
//         y: 100, // Start below the viewport
//         opacity: 0,
//       },
//       {
//         y: 0, // Slide to its original position
//         opacity: 1,
//         duration: 1.5,
//         ease: "power3.out",
//       }
//     );

//     // Animation for the footer text with stagger effect
//     gsap.fromTo(
//       ".footer-text",
//       {
//         opacity: 0,
//         y: 30, // Start below
//       },
//       {
//         opacity: 1,
//         y: 0, // Move to original position
//         duration: 1,
//         ease: "power3.out",
//         delay: 0.5,
//         stagger: 0.3, // Animate lines one by one
//       }
//     );

//     // Glowing animation for the footer border
//     gsap.fromTo(
//       ".footer-border",
//       {
//         width: "0%",
//       },
//       {
//         width: "100%",
//         duration: 2,
//         ease: "power3.out",
//         delay: 0.5,
//       }
//     );
//   }, []);

//   return (
//     <footer
//       className="footer-container relative w-full bg-gray-900 text-white py-10 px-6 text-center"
//       style={{
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <div className="max-w-4xl mx-auto">
//         <div
//           className="footer-border absolute left-0 bottom-0 h-1 bg-yellow-400"
//           style={{ position: "absolute" }}
//         ></div>

//         <h2 className="footer-text text-3xl font-bold mb-4">
//           Thank you for visiting!
//         </h2>
//         <p className="footer-text text-lg mb-3">
//           SchedulifyX - Your AI-Powered Timetable Solution
//         </p>
//         <p className="footer-text text-sm">
//           © {new Date().getFullYear()} SchedulifyX. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { useEffect } from "react";
import gsap from "gsap";

const Footer = () => {
  useEffect(() => {
    // Slide-in animation for the footer
    gsap.fromTo(
      ".footer-container",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    // Staggered text animation
    gsap.fromTo(
      ".footer-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5, stagger: 0.3 }
    );

    // Animated glowing border effect
    gsap.fromTo(
      ".footer-border",
      { width: "0%" },
      { width: "100%", duration: 2, ease: "power3.out", delay: 0.5 }
    );

    // Title pulse effect
    gsap.to(".footer-title", {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });

    // Hover glow effect for text
    gsap.fromTo(
      ".footer-text-hover",
      { color: "#ffffff" },
      {
        color: "#ffdd57",
        duration: 0.3,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
        paused: true,
      }
    );

    document.querySelectorAll(".footer-text-hover").forEach((text) => {
      text.addEventListener("mouseenter", () => gsap.to(text, { color: "#ffdd57" }));
      text.addEventListener("mouseleave", () => gsap.to(text, { color: "#ffffff" }));
    });
  }, []);

  return (
    <footer className="footer-container relative w-full bg-gray-900 text-white py-10 px-6 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Glowing Animated Border */}
        <div className="footer-border absolute left-0 bottom-0 h-1 bg-yellow-400"></div>

        {/* Title with a subtle pulsing effect */}
        <h2 className="footer-text footer-title text-3xl font-bold mb-4">
          Thank You for Visiting!
        </h2>

        {/* Description with hover effect */}
        <p className="footer-text footer-text-hover text-lg mb-3 transition duration-300 ease-in-out">
          SchedulifyX - Your AI-Powered Timetable Solution
        </p>

        {/* Copyright Text */}
        <p className="footer-text text-sm opacity-75">
          © {new Date().getFullYear()} SchedulifyX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
