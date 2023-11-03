import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import ThemeButton from '../../ThemeButton/ThemeButton';
import { ImMenu } from 'react-icons/im';
import useTheme from '../../context/theme';

function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const handleLinkClick = () => {
    if (click) {
      setClick(false);
    }
  };

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 dark:text-white text-black lg:py-4 px-8 sm:px-20 py-3 border-b dark:bg-black bg-white dark:border-slate-800 border-[#00df9a]">
        <div className="flex items-center flex-1">
          <div className="text-white text-3xl font-bold flex items-center">
            <Link to="">
              <img src={logo} alt="Logo" className="h-12 w-12 mr-2 inline" />
              <h3 className="text-[18px] text-green-800 dark:text-white hidden md:inline">cricshotAI</h3>
            </Link>
          </div>
        </div>
        <div className="lg:flex md:flex lg: flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <Link to="" onClick={handleLinkClick}>
                <li className="hover:text-[#00df9a] dark:hover:text-[#00df9a] transition border-b-2 border-slate-900 hover:rounded dark:text-white text-black">Home</li>
              </Link>
              <Link to="Checkshot" onClick={handleLinkClick}>
                <li className="hover:text-[#00df9a] dark:hover:text-[#00df9a] transition border-b-2 border-slate-900 dark:text-white text-black hover:rounded">Check Shot</li>
              </Link>
              <Link to="Shotcontent" onClick={handleLinkClick}>
                <li className="hover:text-[#00df9a] dark:hover:text-[#00df9a] transition border-b-2 border-slate-900 dark:text-white text-black hover:rounded">About Shots</li>
              </Link>
            </ul>
          </div>
        </div>
        <div>
          <button className="block md:hidden transition" onClick={handleClick}>
            {click ? <FaTimes className="h-6 w-6 mr-2 mt-2" /> : <ImMenu className="h-6 w-6 mr-2 mt-2" />}
          </button>
        </div>
        <div>
          <ThemeButton />
        </div>
      </div>

      {/* Responsive menu */}
      {click && (
        <div className="md:hidden block absolute top-16 w-full left-0 right-0 z-10 bg-white dark:bg-black dark:bg-opacity-85 bg-opacity-95">
          <ul className="text-center text-xl p-5">
            <Link to="" onClick={handleLinkClick}>
              <li className="dark:hover:text-[#00df9a] hover:text-[#00df9a] transition dark:text-white dark:bg-black my-4 py-4 border-b border-slate-800 hover:rounded bg-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 dark:transition-all ease-out duration-300">
                Home
              </li>
            </Link>
            <Link to="Checkshot" onClick={handleLinkClick}>
              <li className="dark:hover:text-[#00df9a] hover:text-[#00df9a] transition dark:text-white dark:bg-black my-4 py-4 border-b border-slate-800 hover:rounded bg-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 dark:transition-all ease-out duration-300">
                Check Shots
              </li>
            </Link>
            <Link to="Shotcontent" onClick={handleLinkClick}>
              <li className="dark:hover-text-[#00df9a] hover:text-[#00df9a] my-4 py-4 border-b dark:text-white dark:bg-black border-slate-800 hover:rounded bg-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-green-400 dark:transition-all ease-out duration-300">
                About Shots
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
