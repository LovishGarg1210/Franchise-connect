import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-red-500 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {/* Logo and Title */}
          <div className="flex items-center" >
            <Building2 className="h-8 w-8 text-white animate-pulse" />
            <span className="ml-2 text-xl font-bold text-white">FranchiseConnect</span>
          </div>

          {/* Menu items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/home" className="text-white text-lg hover:text-black transition-colors">
              Home
            </Link>
            <Link to="/franchise" className="text-white text-lg hover:text-black transition-colors">
              Franchise
            </Link>
            <button
              className="text-white mt-1 text-lg px-6  hover:text-blacktransition-colors "
              onClick={() => navigate('/login')}
            >
              Login
            </button>
         
          </div>

          {/* Hamburger menu for smaller screens */}
          <div className="md:hidden" >
            <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render the mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="flex flex-col items-center space-y-2">
            <Link to="/home" className="text-white text-lg hover:text-black transition-colors">
              Home
            </Link>
            <Link to="/franchise" className="text-white text-lg hover:text-black transition-colors">
              Franchise
            </Link>
            <button
              className="text-white text-lg px-6  hover:text-black transition-colors "
              onClick={() => navigate('/login')}
            >
              Login
            </button>
         
          </div>
        </div>
      )}
    </nav>
  );
}
