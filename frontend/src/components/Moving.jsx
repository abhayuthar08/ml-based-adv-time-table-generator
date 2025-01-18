import React from 'react';

const Moving = () => {
  return (
    <div id="page2" className="relative min-h-screen w-screen bg-whitesmoke py-[8vw] mb-[-20vh]">
      <div
        id="moving-text"
        className="whitespace-nowrap overflow-x-hidden scrollbar-none" // Hide the scrollbar
      >
        <div className="con inline-block animate-[move_10s_linear_infinite]">
          {/* All elements inside a single line */}
          <span className="text-[9vw] inline-block">For School</span>
          <div
            id="gola"
            className="h-[70px] w-[70px] bg-[#FE320A] rounded-full inline-block mx-[2vw]"
          ></div>

          <span className="text-[9vw] inline-block">For College</span>
          <div
            id="gola"
            className="h-[70px] w-[70px] bg-[#FE320A] rounded-full inline-block mx-[2vw]"
          ></div>

          <span className="text-[9vw] inline-block">For UniversityS</span>
          <div
            id="gola"
            className="h-[70px] w-[70px] bg-[#FE320A] rounded-full inline-block mx-[2vw]"
          ></div>

<span className="text-[9vw] inline-block">The Scheduler</span>
          <div
            id="gola"
            className="h-[70px] w-[70px] bg-[#FE320A] rounded-full inline-block mx-[2vw]"
          ></div>
        </div>
      </div>

      {/* <div id="page2-bottom" className="h-[80vh] flex items-center justify-between mx-[40px] relative z-9">
        <h1 className="text-[7vh]">Your Content Here</h1>
      </div> */}
    </div>
  );
};

export default Moving;
