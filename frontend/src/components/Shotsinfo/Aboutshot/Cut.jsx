import React,{useEffect}  from "react";
import Gif from './square.gif';
import Gif2 from './upper.gif';
import Gif3 from './late.gif';

import Shotcard from "./Shotcard";
import AOS from 'aos';
import 'aos/dist/aos.css';





const Cut = () =>  {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);
  return (
    <div className="dark:bg-black bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#286753]" data-aos="fade-right">Cuts</h1>
        <p className="py-4 dark:text-gray-300 mb-4 md:text-lg text-center" data-aos="fade-left">
        Usually, the cut shot is played from point to third man region. The batter is always intended to rock back on his back foot and slaps the ball very hard. However, to play the cut shot, the batsman has to free his arms, indicating only the balls that travel away from the off-stump are picked to play the cut shot. Also, batters mostly choose the back of length and short of length deliveries to play this cut shot.  Let’s explore the cut shots.
        </p>

        
      <Shotcard
        title="1. Square Cut"
        text="The Square Cut means the ball is slapped hard to entrust it into the point region. Whenever the bowler bowls wide to the batsman, he is struck with a horizontal bat. That means that the bat is swung horizontally, parallel to the ground. But all drives we mentioned above are played with the vertical bat. "
        gifSrc={Gif}
      />

      
      
      <Shotcard
        title="2. Upper Cut"
        text="The Uppercut is one of the fascinating cricket shots. The batsman cuts the ball very hard when bowlers bump bouncers away from the batsman’s body."
        gifSrc={Gif2}
      />

      <Shotcard
        title="3. Late Cut"
        text="Late Cut is one of the sensible cricket shots. The batsman is intended to touch the ball with soft hands to glide it towards the third man."
        gifSrc={Gif3}
      />
      </div>
      </div>
    
  );
}

export default Cut;
