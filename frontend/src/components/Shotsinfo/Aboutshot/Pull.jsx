import React,{useEffect}  from "react";
import Gif from './pull.gif';
import Gif2 from './hook.gif';

import Shotcard from "./Shotcard";
import AOS from 'aos';
import 'aos/dist/aos.css';



const Pull = () =>  {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);
  return (
    <div className="dark:bg-black bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#286753]" data-aos="fade-right">Pulls and Hooks</h1>
        <p className="py-4 dark:text-gray-300 mb-4 md:text-lg text-center" data-aos="fade-left">
        Usually, the cut shot is played from point to third man region. The batter is always intended to rock back on his back foot and slaps the ball very hard. However, to play the cut shot, the batsman has to free his arms, indicating only the balls that travel away from the off-stump are picked to play the cut shot. Also, batters mostly choose the back of length and short of length deliveries to play this cut shot.  Let’s explore the cut shots.
        </p>

        
      <Shotcard
        title="1. Pull Shot"
        text="With the Pull Shot, you can dispatch the ball on the leg side, between the mid-wicket and the fine leg. This shot can be played against short or back of length deliveries that are in line with the stumps. It’s played with better control if the ball is more towards the leg side.
        This shot can be comfortably played if the ball’s bounce is between the waist and the shoulder. "
        gifSrc={Gif}
      />

      
      
      <Shotcard
        title="2. Hook Shot"
        text="This Hook Shot is played if the bounce of the ball is around or over the shoulder. So, the short length is the ideal length for the hook shot, while the line of the ball should be in line with the stumps or preferably more towards the leg side. You can target the area between the mid-wicket and fine leg with the hook shot.

        The shot is played similar to the pull shot and involves the rotation of the torso and bat swing. Here, the power is generated from the speed of the rotation and the hand speed."
        gifSrc={Gif2}
      />

      </div>
      </div>
    
  );
}

export default Pull;
