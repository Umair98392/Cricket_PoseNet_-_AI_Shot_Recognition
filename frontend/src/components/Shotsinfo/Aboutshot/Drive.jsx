import React from "react";
import Gif from './straightd.gif';
import Gif2 from './offdrive.gif';
import Gif3 from './ondrive.gif';
import Gif4 from './cd.gif';
import Gif5 from './squaredrive.gif';
import Gif6 from './backfootd.gif';
import Shotcard from "./Shotcard";

const Defense = () => {
  return (
    <div className="dark:bg-black bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#286753]">Drives</h1>
        <p className="py-4 dark:text-gray-300 mb-4 md:text-lg text-center">
        Drives are straight-batted shots, played by swinging the bat in a vertical arc through the line of the ball. Let’s explore the drive shots.
        </p>

        
      <Shotcard
        title="1.Straight Drive"
        text=" It is one of the most classical and graceful shots from the repertoire.
        The straight drive is usually played if the delivery is good to full length and the line is around the middle stump or off stump. To play the shot, you should make the forward stride to bring the front foot close to the pitch of the ball.You need to bend your front leg slightly, while your head should be above your front knee. The bat face should be facing straight towards the bowler while striking the ball and a high front elbow is recommended."
        gifSrc={Gif}
      />

      
      
      <Shotcard
        title="2. Off Drive"
        text="It is one of the most classical and graceful shots from the repertoire.
        The straight drive is usually played if the delivery is good to full length and the line is around the middle stump or off stump. To play the shot, you should make the forward stride to bring the front foot close to the pitch of the ball.You need to bend your front leg slightly, while your head should be above your front knee. The bat face should be facing straight towards the bowler while striking the ball and a high front elbow is recommended. "
        gifSrc={Gif2}
      />

      <Shotcard
        title="3. On Drive"
        text="As the name suggests, on drive is played towards mid-on and long-on fielding position. Generally, this shot is offered for a full-length delivery bowled at the leg stump.
        It is played similar to the straight drive, except the target direction is towards the mid-on fielding position. The shot is played on the front foot, with the direction and follow-through intended towards the mid-on. The batsman must bring his bat down towards the pitch of the ball to play the On Drive shot. "
        gifSrc={Gif3}
      />

<Shotcard
        title="4. Cover Drive"
        text=" Cover Drive is one of the elegant cricket shots. When a batter plays a shot with his bat pointing towards the cover region, it is called a cover drive.
        This shot is played to a good to full-length delivery that is around the off-stump line or wider. This is played in a similar fashion as the off drive shot, just that the front foot needs to be brought forward and slightly wider towards the line of the ball. Also, the bat’s face and the follow-through should be in the direction of the cover area. "
        gifSrc={Gif4}
      />

<Shotcard
        title="5. Square Drive"
        text="The square drive can be played against good to full-length deliveries that are wide outside the off stump.
        To play the square drive, move your front foot towards the pitch and the line of the ball with. Ensure that the front leg is bent, the head should be over the front knee. You should be in balance while playing the shot. While playing such a shot, the timing must be perfect. "
        gifSrc={Gif5}
      />

<Shotcard
        title="6. Back Foot Drive"
        text="It was one of the gorgeous shots among all cricket shots. When the bowler hits good length or back of a length, batters transfer their weight onto the back foot and penetrate the ball towards the cover or cover-point region. It looks too beautiful. It was only the conventional shot that batters play on their back foot in front of the wicket on the off-side area. However, this shot also has an extension to play on the back-foot lofted drive, but it was complicated to execute. "
        gifSrc={Gif6}
      />



      
      
    
    

        
      </div>
    </div>
  );
}

export default Defense;
