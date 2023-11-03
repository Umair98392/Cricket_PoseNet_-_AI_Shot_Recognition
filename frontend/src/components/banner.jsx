import React, { useState } from "react";
import Typed from "react-typed"
import heroVid from '../assets/bannervideo.mp4'
import Vid from '../assets/bannervideo_21_compressed.mp4'
import { Link } from 'react-router-dom'
import useTheme from "../context/theme";


const Banner = () => {
    const { theme } = useTheme();
    const videoSource = theme === "light" ? Vid : heroVid;
     
    return (
        <section className='w-full h-[90vh] top-[90px] py-2e flex p-6 justify-center items-center text-center border-b-2 dark:border-slate-800 border-[#00df9a]'>
        <video
        className='object-cover h-full w—full absolute -z-10'
        src={videoSource }
        autoPlay
        loop
        muted
        />
    <div className="container mx-auto text-black dark:text-white bg-[#1E1E1E] p-20  lg:w-1/2 backdrop-filter backdrop-blur-lg bg-opacity-30">
    
    <p className="lg:text-4xl font-bold mb-2 py-2">Discover the Innovation</p>

    <div>
    <p className="mb-6 lg:p-5 text-2xl font-bold md:pl-4 pl-2">Check the shot</p>
    <Typed className="mb-6 lg:p-5 lg:text-4xl text-[#00df9a] font—bold md:pl-4 pl—2" strings={['DRIVE','SWEEP','FLICK','PULL','CUT' ]} typeSpeed={120} backSpeed={130} loop />
    
    </div>
    <Link  to="/Checkshot" className="flex justify-center">
    <button href="#" className=' bg-[#00df9a] w-[200px]  rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300'>Check the shot</button>
    </Link>
    </div>
    </section>
    );
};
    export default Banner;
    