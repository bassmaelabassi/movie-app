import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <nav className="bg-red-950 shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">
        MovieApp
      </Link>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full transition-colors hover:bg-red-900"
        aria-label={darkMode ? 'Light mode' : 'Dark mode'}
      >
        {darkMode ? (
          <Sun className="text-yellow-300" size={20} />
        ) : (
          <Moon className="text-white" size={20} />
        )}
      </button>
    </nav>
  );
};

export default Navbar;