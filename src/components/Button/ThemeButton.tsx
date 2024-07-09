import { useState, useEffect } from 'react';
import { IoSunny } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

interface ThemeButtonProps {
  backgroundColor: string; // Prop para el color de fondo del botón
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ backgroundColor }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [isDark]);

  const handleClick = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 rounded-full text-4xl transition-colors duration-300 
        ${backgroundColor} text-white dark:${backgroundColor === 'bg-black' ? 'bg-white' : 'bg-black'}`}
    >
      {isDark ? <IoSunny /> : <IoMoonOutline className={isDark ? "text-white" : "text-black"} />}
    </button>
  );
};

export default ThemeButton;