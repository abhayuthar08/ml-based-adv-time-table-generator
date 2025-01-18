import React, { useState } from 'react';

const Page3 = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isImageVisible, setIsImageVisible] = useState(false);

  const handleMouseEnter = (image) => {
    setImageUrl(image);
    setIsImageVisible(true);
  };

  const handleMouseLeave = () => {
    setIsImageVisible(false);
  };

  return (
    <div id="page3" className="min-h-screen py-[4vw]">
      <div id="elem-container" className="relative">

        {/* Overlay Fixed Image */}
        {isImageVisible && (
          <div
            id="fixed-image"
            className="h-[30vw] w-[23vw] bg-red-500 rounded-lg fixed z-50 left-1/2 transform -translate-x-1/2 top-[25%] bg-cover"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        )}

        {/* Elements */}
        <div
          className="elem absolute flex items-center justify-start pl-[2vw] w-full h-[150px] relative group"
          onMouseEnter={() =>
            handleMouseEnter(
              'https://images.unsplash.com/photo-1682687220305-ce8a9ab237b1?w=500&auto=format&fit=crop&q=60'
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full bg-zinc-900 opacity-60 group-hover:bg-yellow-400 transition-all duration-1000 ease-in-out"></div>
          <h2 className="text-[3vw] relative z-10 text-white translate-x-0 group-hover:translate-x-full transition-transform duration-[1s] ease-in-out">
            Conflict - Free
          </h2>
        </div>
        <div className="border-b border-zinc-400"></div> {/* Border after the element */}

        <div
          className="elem absolute flex items-center justify-start pl-[2vw] w-full h-[150px] relative group"
          onMouseEnter={() =>
            handleMouseEnter(
              'https://images.unsplash.com/photo-1705323111671-8bb38301d9f9?w=500&auto=format&fit=crop&q=60'
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full border-b-2 border-zinc-200 bg-zinc-900 opacity-60 group-hover:bg-yellow-400 transition-all duration-1000 ease-in-out"></div>
          <h2 className="text-[3vw] relative z-10 text-white translate-x-0 group-hover:translate-x-full transition-transform duration-[1s] ease-in-out">
            Time Saver
          </h2>
        </div>
        <div className="border-b border-zinc-400"></div> {/* Border after the element */}

        <div
          className="elem absolute flex items-center justify-start pl-[2vw] w-full h-[150px] relative group"
          onMouseEnter={() =>
            handleMouseEnter(
              'https://images.unsplash.com/photo-1705179910581-7f3465999f05?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8fGVufDB8fHx8fA%3D%3D'
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full border-b-2 border-zinc-200 bg-zinc-900 opacity-60 group-hover:bg-yellow-400 transition-all duration-1000 ease-in-out"></div>
          <h2 className="text-[3vw] relative z-10 text-white translate-x-0 group-hover:translate-x-full transition-transform duration-[1s] ease-in-out">
            Effortlessly
          </h2>
        </div>
        <div className="border-b border-zinc-400"></div> {/* Border after the element */}

        <div
          className="elem absolute flex items-center justify-start pl-[2vw] w-full h-[150px] relative group"
          onMouseEnter={() =>
            handleMouseEnter(
              'https://images.unsplash.com/photo-1682686580433-2af05ee670ad?w=500&auto=format&fit=crop&q=60'
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full border-b-2 border-zinc-200 bg-zinc-900 opacity-60 group-hover:bg-yellow-400 transition-all duration-1000 ease-in-out"></div>
          <h2 className="text-[3vw] relative z-10 text-white translate-x-0 group-hover:translate-x-full transition-transform duration-[1s] ease-in-out">
            ML Based Generator
          </h2>
        </div>
        <div className="border-b border-zinc-400"></div> {/* Border after the element */}

        <div
          className="elem absolute flex items-center justify-start pl-[2vw] w-full h-[150px] relative group"
          onMouseEnter={() =>
            handleMouseEnter(
              'https://plus.unsplash.com/premium_photo-1704477658211-c6520095a5c4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full bg-zinc-900 opacity-60 group-hover:bg-yellow-400 transition-all duration-1000 ease-in-out"></div>
          <h2 className="text-[3vw] relative z-10 text-white translate-x-0 group-hover:translate-x-full transition-transform duration-[1s] ease-in-out">
            Customizable Parameters
          </h2>
        </div>
        <div className="border-b border-zinc-400"></div> {/* Border after the element */}

        <div
          className="elem absolute flex items-center justify-start pl-[2vw] w-full h-[150px] relative group"
          onMouseEnter={() =>
            handleMouseEnter(
              'https://images.unsplash.com/photo-1705260527801-0bfd739f8c57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full bg-zinc-900 opacity-60 group-hover:bg-yellow-400 transition-all duration-1000 ease-in-out"></div>
          <h2 className="text-[3vw] relative z-10 text-white translate-x-0 group-hover:translate-x-full transition-transform duration-[1s] ease-in-out">
            Multi-Class Generator
          </h2>
        </div>
        <div className="border-b border-zinc-400"></div> {/* Border after the element */}
      </div>
    </div>
  );
};

export default Page3;
