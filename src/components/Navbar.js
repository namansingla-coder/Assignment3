import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSearch, FiBell, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="h-16 bg-white dark:bg-gray-800 shadow px-6 flex items-center justify-between sticky top-0 z-10 ml-64 transition-colors">
      {/* Search bar */}
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiBell size={18} />
            <span className="absolute top-0 right-0 h-4 w-4 text-xs rounded-full bg-red-500 text-white flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
              <div className="p-3 font-semibold border-b border-gray-200 dark:border-gray-700 dark:text-gray-200">
                Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto">
                <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">🔔 You have a new message</li>
                <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">📢 System update available</li>
                <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">✅ Task completed</li>
              </ul>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
              A
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-200 hidden sm:inline">
              Admin
            </span>
            <FiChevronDown className="text-gray-500 dark:text-gray-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 z-50">
              <a href="#profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">Your Profile</a>
              <a href="#settings" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">Settings</a>
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
              <a href="#logout" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;