import React,{useEffect}  from "react";
import Gif from './sweepshot.gif';
import Gif2 from './reversesweep.gif';
import Gif3 from './paddle.gif';
import Gif4 from './slogsweep.gif';

import Shotcard from "./Shotcard";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Sweep = () =>  {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);
  return (
    <div className="dark:bg-black bg-gray-100 min-h-screen">
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#286753]" data-aos="fade-right">Sweeps</h1>
      <p className="py-4 dark:text-gray-300 mb-4 md:text-lg text-center" data-aos="fade-left">
      Primarily used against spinners, the sweep shots are cross-batted shots played on the front foot, usually by kneeling on one knee.
      There are a few variations of sweep shots.
      </p>

      
    <Shotcard
      title="1. Sweep"
      text="The sweep shot is intended to dispatch the ball on the leg side between the mid-wicket to the fine leg. The shot can be played against good to full-length deliveries.

      It is more suitable if the ball is pitched at the middle or leg stump. It is not advisable to play sweep shots against the deliveries turning away from you as it will conflict with the bat-swing direction and yield unwanted results."
      gifSrc={Gif}
    />

    
    
    <Shotcard
      title="2. Reverse Sweep"
      text="The reverse sweep is an innovative sweep played with a reversed bat. The shot has become extremely popular in modern cricket. When the captain or the spinner sets fielders on the leg side to counter the sweep shots, it leaves some gaps on the off-side.

      In such a scenario, instead of the sweep, the batsman can go for the reverse sweep shot and exploit the off-side area by dispatching the ball in the opposite direction compared to the regular sweep shot i.e. behind the square on the off-side"
      gifSrc={Gif2}
    />

    <Shotcard
      title="3. Paddle Sweep"
      text="The paddle sweep is played to a ball fuller and quicker ball. Unlike the regular sweep shot, there is no full-fledged bat swing here. The goal here is to hit ball finer i.e. as close to the wicketkeeper as possible."
      gifSrc={Gif3}
    />
    <Shotcard
      title="4. Slog Sweep"
      text="It was an extension to the standard sweep shot because the batsman plays this shot in almost the same position that we have seen in the regular sweep. But the batsman’s bat swing is steered towards the mid-wicket rather than the fine-leg. The slog-sweep is mainly used for hitting a boundary of good-length or full-length balls. It was one of the most aggressive cricket shots."
      gifSrc={Gif4}
    />
    </div>
    </div>
  
  );
}

export default Sweep;
