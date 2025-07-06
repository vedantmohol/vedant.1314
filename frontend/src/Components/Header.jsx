import React, { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false); 
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 flex flex-wrap justify-between items-center p-4 shadow-md">
      <div className="flex font-semibold">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Portfolio
        </span>
      </div>

      <button
        className="sm:hidden ml-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <div
        className={`w-full mt-4 sm:mt-0 sm:flex sm:w-auto ${
          isMenuOpen ? 'block' : 'hidden'
        } sm:inline`}
      >
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm font-medium">
          <li>
            <a
              href="#home"
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-blue-500"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-blue-500"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-blue-500"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-blue-500"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-blue-500"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
