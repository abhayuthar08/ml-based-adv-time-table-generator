import React, { useEffect, useState } from 'react';

function Slides() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('features-title');
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Check if the element is in the viewport
        if (rect.top <= windowHeight - 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-[100vh] mb-[-30vh] flex flex-col justify-center items-center">
      <div
        id="features-title"
        className={`relative text-8xl font-bold underline-offset-1 mb-16 transition-all duration-1000 ${
          isVisible ? 'border-b-[5px] border-yellow-400 w-full' : 'border-b-[5px] border-transparent w-0'
        }`}
        style={{
          transition: 'width 1s ease-in-out',
        }}
      >
        *Features ***
      </div>

      <div className="text-center text-2xl text-gray-600">
        <p>Scroll down to see more features...</p>
      </div>
    </div>
  );
}

export default Slides;
