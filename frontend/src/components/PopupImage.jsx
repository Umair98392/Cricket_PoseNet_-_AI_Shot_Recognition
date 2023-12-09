import React, { useState } from 'react';

function PopupImage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <a href="javascript:void(0)" onClick={openPopup} className=' font-bold  text-center p-0.5  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 rounded-md dark:text-white  '>Click to open image</a>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={closePopup}></div>
          <div className="bg-white p-4 rounded-lg shadow-lg z-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cricket_fielding_positions2.svg/574px-Cricket_fielding_positions2.svg.png" alt="Popup" />
            <button onClick={closePopup} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupImage;
