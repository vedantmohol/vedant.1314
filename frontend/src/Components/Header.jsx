import React from 'react'
import { useState } from 'react';
import {Link, useLocation} from 'react-router-dom'

function Header() {
    const path = useLocation().pathname;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='border-b-2 flex flex-wrap justify-between items-center p-4'>
        <div className='flex font-semibold'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Portfolio</span>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`w-full mt-4 sm:mt-0 sm:flex sm:w-auto ${isMenuOpen ? 'block' : 'hidden'} sm:inline`}>
            <ul className='flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm font-medium'>
                <li>
                    <Link to="/" className={`${path==='/' ? 'text-blue-500' : 'text-gray-700'} hover: text-blue-400`}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className={`${path==='/about' ? 'text-blue-500' : 'text-gray-700'} hover: text-blue-400`}>About</Link>
                </li>
                <li>
                    <Link to="/skills" className={`${path==='/skills' ? 'text-blue-500' : 'text-gray-700'} hover: text-blue-400`}>Skills</Link>
                </li>
                <li>
                    <Link to="/projects" className={`${path==='/projects' ? 'text-blue-500' : 'text-gray-700'} hover: text-blue-400`}>Projects</Link>
                </li>
                <li>
                    <Link to="/contact" className={`${path==='/contact' ? 'text-blue-500' : 'text-gray-700'} hover: text-blue-400`}>Contact</Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Header