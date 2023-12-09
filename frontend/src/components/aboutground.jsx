import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopupImage from './PopupImage';
import Img from '../assets/pics/shots/shotdirection.png';
import AOS from 'aos';
import 'aos/dist/aos.css';


function AboutGround() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);
  return (
    <section className='py-20 px-4 md:px-0 bg-gray-100 dark:bg-black'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-10'>
        <div className='md:w-1/2' 
         data-aos="fade-right" // Existing animation direction
         >
          <h2 className='text-3xl md:text-4xl font-semibold text-center md:text-left text-gray-800 dark:text-white'>
            Cricket Shots And Ground Understandings
          </h2>
          <p className='py-6 md:text-lg  text-gray-700 dark:text-white'>
            In cricket, the type of shot a batsman plays depends on the line and length of the ball. Depending on the type of delivery and the field placement, a batsman may have to make adjustments while playing the shot.
          </p>
          <Link to="/Shotcontent">
  <button className='bg-gray-100 dark:bg-black dark:text-white w-[255px] rounded-md font-medium my-6 mx-auto py-1 text-black align-center  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 flex items-center'>
    For More About Cricket Shots
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-6 ml-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
    </svg>
  </button>
</Link>

          <p className='py-6 md:text-lg text-gray-700 dark:text-white'>
            The image showcases the direction in which a typical shot is played by the batsman. The image is for a right-handed batsman. For a left-handed batsman, you can use a mirror image of this image to understand the type of cricket shots.
          </p>
          <div className="card bg-white p-4 rounded-md shadow-lg my-5 md:max-w-[30rem] mx-auto  dark:bg-[#1E1E1E]  ">
            <p className=' md:text-lg text-gray-700 dark:text-white'>
              Fielding positions are an essential part of any cricket match, and if the captain places his or her players in the correct places, it can be key to the final outcome. Cricket is a sport with unique terminology, and many of the fielding positions come with their own idiosyncratic language. Click below to see the fielding positions.
            </p>
          
            <PopupImage />
         
          </div>
        </div>
        <img src={Img} alt="" className='md:w-1/2'  data-aos="fade-left" // Existing animation direction
         />
      </div>
    </section>
  );
}

export default AboutGround;
