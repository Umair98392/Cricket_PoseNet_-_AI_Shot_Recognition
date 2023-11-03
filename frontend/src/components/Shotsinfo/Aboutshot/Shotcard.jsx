import React from 'react';

const Shotcard = ({ title, text, gifSrc }) => {
  return (
    <div className="flex justify-center items-center p-2 ">
    <div className="bg-white p-4 rounded shadow-lg dark:bg-[#1E1E1E]">
      <h2 className="text-2xl dark:text-blue-100 text-center font-bold mb-4">{title}</h2>
      <div className="md:flex md:items-center">
        <p className="text-gray-600 md:text-lg dark:text-white md:flex-1">{text}</p>
        <img src={gifSrc} alt="GIF" className="w-64 h-64 object-cover rounded-lg mx-auto  mt-0 md:mt-0 md:w-1/5 sm:w-1/2 md:ml-4 sm:max-w-sm" />
      </div>
    </div>
    </div>
  );
};

export default Shotcard;
