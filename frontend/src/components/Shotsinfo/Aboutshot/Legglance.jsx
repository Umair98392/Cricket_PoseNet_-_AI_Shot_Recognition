import React,{useEffect}  from "react";
import Gif from './frontleg.gif';
import Gif2 from './backleg.gif';
import Gif3 from './flick.gif';

import Shotcard from "./Shotcard";
import AOS from 'aos';
import 'aos/dist/aos.css';




const Legglance = () =>  {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);

  return (
    <div className="dark:bg-black bg-gray-100 min-h-screen">
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#286753]" data-aos="fade-right">Leg glance / Flick</h1>
      <p className="py-4 dark:text-gray-300 mb-4 md:text-lg text-center" data-aos="fade-left">
      Usually, the cut shot is played from point to third man region. The batter is always intended to rock back on his back foot and slaps the ball very hard. However, to play the cut shot, the batsman has to free his arms, indicating only the balls that travel away from the off-stump are picked to play the cut shot. Also, batters mostly choose the back of length and short of length deliveries to play this cut shot.  Let’s explore the cut shots.
      </p>

      
    <Shotcard
      title="1. Front foot Leg glance"
      text="When a ball is flicked towards the leg side with the straight bat and some wrist work, it is called the leg glance.

      With this shot, the ball is deflected towards the square leg or fine leg area. You can play the Leg Glance on the front foot or back foot depending on the length of the ball. The leg glance is all about deflecting the ball and making use of the pace of the ball."
      gifSrc={Gif}
    />

    
    
    <Shotcard
      title="2. Back foot Leg glance"
      text="Similar to the front foot glance, in case of the back foot glance, the flick is executed on the back foot. It can be played to short or back of the length deliveries, providedit reaches you at a comfortable height for the straight batted flick shot. It should be played only if the delivery is either in line with the stumps (or the body) or when it’s going down the leg side."
      gifSrc={Gif2}
    />

    <Shotcard
      title="3. Flick"
      text="The flick is a shot where the batsman uses the wrists to turn the ball from the leg side to the leg side or the on side.
      The flick is often played to deliveries that are on the middle or leg stump, and it involves a more pronounced and forceful movement of the wrists to change the direction of the ball.
      While the leg glance is more about controlled deflection, the flick is a more assertive shot that aims to score runs by directing the ball into the leg side."
      gifSrc={Gif3}
    />
    </div>
    </div>
  
    
  );
}

export default Legglance;
