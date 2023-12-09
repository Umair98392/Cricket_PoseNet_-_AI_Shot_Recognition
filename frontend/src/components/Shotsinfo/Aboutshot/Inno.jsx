import React,{useEffect}  from "react";
import Gif from './ramp.webp';
import Gif2 from './switchhit.gif';
import Gif3 from './dilscoop.webp';
import Gif4 from './paddlescoop.gif';
import Gif5 from './reversescoop.gif';
import Gif6 from './helicopter.gif';
import Shotcard from "./Shotcard";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Inno = () =>  {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease',
    });
  }, []);
  return (

    <div className="dark:bg-black bg-gray-100 min-h-screen">
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#286753]" data-aos="fade-right">Unorthodox or Non Conventional Cricket Shots</h1>
      <p className="py-4 dark:text-gray-300 mb-4 md:text-lg text-center" data-aos="fade-left">
      We already covered a few innovative shots earlier in this article, like Reverse Sweep or Upper Cut. Let’s take a look at some more unorthodox or innovative shots.
      </p>

      
    <Shotcard
      title="1. Ramp Shot"
      text=" The batsman touches the ball softly by pointing his bat face towards the sky to play this ramp shot. So the batsmen rock onto his back foot and pick short-of-length chest hight deliveries which travel on the off-stump line.

      However, there is another type of ramp shot. Batsman picks off-side full-length balls and lai down on one knee to hit it over a square or fine leg. Mr. 360 AB de Villiers mostly play these kinds of unorthodox cricket shots. Therefore these two shots are also called ramp shots."
      gifSrc={Gif}
    />

    
    
    <Shotcard
      title="2. Switch Hit "
      text="In switch hit, a right-hander changes the stance as well as the grip to temporarily turn in to a left-hander, and vice versa. 
      Switch hit is played by making pre-meditated movements right before the bowler releases the ball. It can be played against any kind of deliveries and depending on the batsman’s strike, the ball can be sent anywhere in the field. Lots and lots of practice is needed to play such shots confidently in the match. "
      gifSrc={Gif2}
    />

<Shotcard
      title="3. Dilscoop"
      text="During the 2009 ICC World Twenty20 tournament, Sri Lankan batsman Tillakaratne Dilshan exhibited a special scoop shot which is now commonly known as Dilscoop. It is different from the paddle scoop because Dilshan’s scoop is played straight over the head of the wicketkeeper. "
      gifSrc={Gif3}
    />

<Shotcard
      title="4. Paddle Scoop"
      text="The regular scoop shot is sometimes also referred to as paddle scoop, Marillier shot, or ramp shot. It is played behind the square on both sides of the wicket, to a good to full-length delivery. It can also be played to a full toss or a yorker ball, by intercepting it before the bounce. "
      gifSrc={Gif4}
    />

<Shotcard
      title="5. Reverse Scoop"
      text="The reverse scoop is played just like reverse sweep but here ball scoops beside the wicket-keeper.This is another innovative scoop shot. We have seen many times AB de Villiers playing the reverse scoop with which he hits a six over the wicket keepers head."
      gifSrc={Gif5}
    />

<Shotcard
      title="6. Helicopter Shot"
      text="There is no need for a comprehensive introduction to this fascinating cricket shot. The most incredible shot invented by captain cool MS Dhoni used to hit sixes for yorker-length deliveries. Accordingly, when the bowler pitches the yorker-length ball, the batter extends his arms and, well over the back foot, swings his bat almost from ground level. However, the bat swing is on the same line from start to finish. Hence it is named Helicopter Shot. "
      gifSrc={Gif6}
    />

      
    </div>
  </div>
    
    
  );
}

export default Inno;
