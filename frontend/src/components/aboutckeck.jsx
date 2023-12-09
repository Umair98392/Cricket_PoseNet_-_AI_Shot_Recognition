import React , { useEffect } from 'react';
import Vid from '../assets/aboutvid.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Aboutcheck() {
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
        data-aos-duration="1000">
          <h2 className='text-3xl md:text-4xl font-semibold text-center md:text-left text-gray-800 dark:text-white '>
            Cricket Posenet : AI Shot Recognition
          </h2>
          <p className='mt-6 text-gray-600 lg:text-lg dark:text-white text-center md:text-left'>
            Upload an image of a batsman in action, and our advanced AI algorithms will instantly analyze it to determine the precise shot played - whether it's a cover drive, square cut, or a powerful hook shot. Explore the artistry of cricketing shots like never before.
          </p>
        </div>
        <div className='md:w-1/2'
        data-aos="fade-left" // Existing animation direction
        data-aos-duration="1000">
          <video controls className='w-full rounded-lg shadow-md' muted>
            <source src={Vid} type='video/mp4'  />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

export default Aboutcheck;
