import React from 'react';
import ImageCard from './ImageCard';
import Gifshot from './playshot.gif'
import Gifshot1 from './playshot1.gif'
import useTheme from '../../context/theme';




const Shotcontent = () => {

  
    const { theme } = useTheme();
    const Shot = theme === "light" ? Gifshot : Gifshot1;
  return (
    <div className="flex min-h-screen items-center justify-center m-auto bg-gray-100 dark:bg-black">
        <div  className="max-w-screen-xl px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#286753] mb-4 p-2">
        Different Types of Cricket Shots
        </h1>
        
         <p className="text-lg dark:text-gray-300 text-black mb-8">
         Let’s explore all the shots found in the cricket book, along with some innovative 
         or unorthodox shots played by some of the geniuses of the sport.
        </p>

       
        
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 sm:mr-2">
        <ImageCard
          title="Defensive Shots"
          description="A deliberate shot that aims to prevent the ball from hitting the wicket or the player's pads."
          imageSrc="https://im.rediff.com/cricket/2022/jan/11kohli1.jpg?w=670&h=900"
          linkTo='/Defense'
        />
        <ImageCard
          title="Drives"
          description="Drives are straight-batted shots, played by swinging the bat in a vertical arc through the line of the ball."
          imageSrc="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/06/19/980550-20210619174624.jpg"
          linkTo='/Drive'
        />
        <ImageCard
          title="Leg Glance"
          description="When a ball is flicked towards the leg side with the straight bat and some wrist work."
          imageSrc="https://cdn4.theroar.com.au/wp-content/uploads/2019/06/Virat-Kohli-World-Cup-755x515.jpg"
          linkTo='/Legglance'
        />
        <ImageCard
          title="Sweep Shot"
          description="The sweep shots are cross-batted shots played on the front foot, usually by kneeling on one knee."
          imageSrc="https://admin.thecricketer.com/weblab/sites/96c8b790-b593-bfda-0ba4-ecd3a9fdefc2/resources/images/site/googly201118-3.jpg"
          linkTo='/Sweep'
        />
        <ImageCard
          title="Cut Shot"
          description="Cuts shots are basically cross-batted shots played at a short delivery."
          imageSrc="https://qph.cf2.quoracdn.net/main-qimg-de5fb587ab683f23f14ea970ddf6a04e-lq"
          linkTo='/Cut'
        />
        <ImageCard
          title="Pulls & Hooks"
          description="Stunning back foot shots played on the leg side on short-pitched deliveries."
          imageSrc="https://images.hindustantimes.com/img/2022/07/13/1600x900/CRICKET-ODI-ENG-IND-2_1657715125934_1657715125934_1657715136858_1657715136858.JPG"
          linkTo='/Pull'
        />
        <ImageCard
          title="Innovative and Unorthodox"
          description="Special shots in cricket played with innovation and unorthodox nature of the player."
          imageSrc="https://staticg.sportskeeda.com/wp-content/uploads/2016/01/til-1452142402-800.jpg"
          linkTo='/Inno'
        />
       
    
       </div>

       <div className="text-center">
        <img src={Shot} alt="Centered GIF" className="mx-auto max-w-sm p-8" />
      </div>
       
      
      </div>
      
    </div>
  );
};

export default Shotcontent;
