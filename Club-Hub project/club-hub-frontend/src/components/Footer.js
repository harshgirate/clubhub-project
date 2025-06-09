import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#001f3f] to-[#00152b] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Club
                </span>
                <span className="text-3xl font-bold ml-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">
                  Hub
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Your gateway to campus life. Join clubs, attend events, and build lasting connections.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/clubs" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Clubs
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Register
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white relative inline-block">
              Contact
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-center hover:text-white transition-colors duration-300">
                <i className="fas fa-envelope mr-3 text-blue-400"></i>
                support@clubhub.com
              </li>
              <li className="text-gray-400 flex items-center hover:text-white transition-colors duration-300">
                <i className="fas fa-phone mr-3 text-blue-400"></i>
                +91 1234567890
              </li>
              <li className="text-gray-400 flex items-center hover:text-white transition-colors duration-300">
                <i className="fas fa-map-marker-alt mr-3 text-blue-400"></i>
                SVVV, Indore
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ClubHub. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 