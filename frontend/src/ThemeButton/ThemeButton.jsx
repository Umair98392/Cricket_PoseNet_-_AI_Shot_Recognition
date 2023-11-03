import React from 'react';
import useTheme from '../context/theme';
import { FaSun } from 'react-icons/fa';
import { BsMoonStars} from 'react-icons/bs';

function ThemeButton() {
  const { theme, darkMode, lightMode } = useTheme();

  const onToggleTheme = () => {
    if (theme === 'dark') {
      lightMode();
    } else {
      darkMode();
    }
  };

  return (
    <button
      className={`relative inline-flex items-center cursor-pointer px-0 py-0 focus:outline-none ${
        theme === 'dark' ? ' text-white mt-2 mr-1' : ' text-gray-900 dark:text-white mt-2 mr-1'
      }`}
      onClick={onToggleTheme}
    >
      {theme === 'dark' ? (
        <BsMoonStars className="h-6 w-6 ml-2" />
      ) : (
        <FaSun className="h-6 w-6 ml-2" />
      )}
    </button>
  );
}

export default ThemeButton;
