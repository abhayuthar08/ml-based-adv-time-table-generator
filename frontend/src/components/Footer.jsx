import React, { useEffect } from "react";
import gsap from "gsap";

const Footer = () => {
  useEffect(() => {
    // Animation for sliding the footer in from the bottom
    gsap.fromTo(
      ".footer-container",
      {
        y: 100, // Start below the viewport
        opacity: 0,
      },
      {
        y: 0, // Slide to its original position
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }
    );

    // Animation for the footer text with stagger effect
    gsap.fromTo(
      ".footer-text",
      {
        opacity: 0,
        y: 30, // Start below
      },
      {
        opacity: 1,
        y: 0, // Move to original position
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
        stagger: 0.3, // Animate lines one by one
      }
    );

    // Glowing animation for the footer border
    gsap.fromTo(
      ".footer-border",
      {
        width: "0%",
      },
      {
        width: "100%",
        duration: 2,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <footer
      className="footer-container relative w-full bg-gray-900 text-white py-10 px-6 text-center"
      style={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="footer-border absolute left-0 bottom-0 h-1 bg-yellow-400"
          style={{ position: "absolute" }}
        ></div>

        <h2 className="footer-text text-3xl font-bold mb-4">
          Thank you for visiting!
        </h2>
        <p className="footer-text text-lg mb-3">
          SchedulifyX - Your AI-Powered Timetable Solution
        </p>
        <p className="footer-text text-sm">
          © {new Date().getFullYear()} SchedulifyX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
