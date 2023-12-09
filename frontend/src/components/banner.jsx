import React, { useState, useEffect } from "react";
import heroVid from '../assets/bannervideo.mp4';
import Vid from '../assets/bannervideo_21_compressed.mp4';
import { Link } from 'react-router-dom';
import useTheme from "../context/theme";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  const { theme } = useTheme();
  const videoSource = theme === "light" ? Vid : heroVid;

  const [text, setText] = useState("");
  const textArray = ['DRIVE', 'PULL', 'SWEEP', 'FLICK', 'CUT'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);

  useEffect(() => {
    if (startTyping) {
      const currentText = textArray[currentTextIndex];

      if (textIndex < currentText.length) {
        setText((prevText) => prevText + currentText[textIndex]);
        const timeoutId = setTimeout(() => {
          setTextIndex((prevIndex) => prevIndex + 1);
        }, 300); // Typing speed in milliseconds

        return () => clearTimeout(timeoutId);
      } else {
        setStartTyping(false);
        setTimeout(() => setStartTyping(true), 300); // Delay before starting to backspace
      }
    } else {
      if (text.length > 0) {
        const timeoutId = setTimeout(() => {
          setText((prevText) => prevText.slice(0, -1));
        }, 300); // Backspacing speed in milliseconds

        return () => clearTimeout(timeoutId);
      } else {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
        setTextIndex(0);
      }
    }
  }, [currentTextIndex, textIndex, startTyping]);

  useEffect(() => {
    // Start the typing animation when the component mounts
    setStartTyping(true);
  }, []);

  return (
    <section className='w-full h-[90vh] top-[90px] py-2e flex p-6 justify-center items-center text-center border-b-2 dark:border-slate-800 border-[#00df9a]'>
      <video
        className='object-cover h-full w—full absolute -z-10'
        src={videoSource}
        autoPlay
        loop
        muted
      />
      <div className="container mx-auto text-black dark:text-white bg-[#1E1E1E] p-20 lg:w-1/2 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <p className="lg:text-4xl font-bold mb-2 py-2 " data-aos="fade-right">Discover the Innovation</p>
        <div>
          <p className="mb-6 lg:p-5  dark:text-white text-2xl font-bold md:pl-4 pl-2" data-aos="fade-left">
            Check the shot
          </p>
        </div>
        <div style={{ height: "50px", overflow: "hidden" }}>
          <p className="lg:text-4xl  text-[#00df9a] md:pl-4 pl-2">
            {text}
          </p>
        </div>
        <Link to="/Checkshot" className="flex justify-center">
          <button href="#" data-aos="zoom-in        " className='bg-[#00df9a] w-[200px]  rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'>
            Check the shot
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
