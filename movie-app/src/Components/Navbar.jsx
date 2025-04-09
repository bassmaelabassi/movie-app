import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="bg-red-950 shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-black dark:text-white">
        MovieApp
      </Link>

      <div className="flex items-center gap-4">
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition duration-300"
          onClick={() => window.location.href = '/'}
        >
          Home
        </button>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 text-white w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-transparent border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-black p-2 rounded-full"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
