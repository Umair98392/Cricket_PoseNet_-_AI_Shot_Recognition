import React, { useState } from 'react';
import Pic from './logo_3.png';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Regular expression to validate email format
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (emailRegex.test(email)) {
      // Email is in the correct format
      setMessage('Thanks for subscribing!');
    } else {
      // Email is not in the correct format
      setMessage('Please enter a valid email address.');
    }

    // Clear the message after 2 seconds
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  return (
    <footer className="bg-grey-100 dark:bg-black text-black dark:text-white p-4 border-t dark:border-slate-800 border-[#00df9a]">
      <div className="max-w-screen-lg mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col lg:flex-row items-center space-x-4">
          <img
            src={Pic} // Replace with your logo path
            alt="Website Logo"
            className="h-28"
          />
          <div className="space-x-4">
            <a href="/">Home</a>
            <a href="/Checkshot">CheckShot</a>
            <a href="/Shotcontent">AboutShot</a>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 mt-4 lg:mt-0 ">
          <p>Subscribe to our newsletter for updates :</p>
          <form onSubmit={handleFormSubmit} className="text-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-grey-150 dark:bg-[#1E1E1E] dark:text-white border rounded py-2 px-4 focus:outline-none mr-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-500 text-white rounded py-2 px-4 hover:bg-[#00df9a] transition"
            >
              Subscribe
            </button>
          </form>
          {message && <div>{message}</div>}
        </div>
      </div>
      <div className="mt-4 text-center">
        <p>&copy; {new Date().getFullYear()} cricshotAI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
