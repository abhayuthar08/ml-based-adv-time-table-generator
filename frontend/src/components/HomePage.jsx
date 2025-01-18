// import AdminTimetableForm from "./components/AdminTimeTableForm";
// import HomePage from "./components/HomePage";


// import React from 'react';

import LocomotiveScroll from 'locomotive-scroll';
import Navbar from './Navbar';
import Work from './Work';
import Slides from './Slides';
import Moving from './Moving';
import Page3 from './Page3';
import Footer from './Footer';
// import Three from './components/Three';




function HomePage() {

  const locomotiveScroll = new LocomotiveScroll();

  // <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>


  return (
    
    <div className='bg-zinc-900'>
      <div className='w-full min-h-screen text-white'>
        <Navbar/>
        {/* <Three/> */}
        <Work/>
        
        <Slides/>

        <Page3/>

        <Moving/>

        <Footer/>

      </div>
      
      
    </div>
  );
}

export default HomePage;
