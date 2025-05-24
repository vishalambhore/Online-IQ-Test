import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-6">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Navigation Links */}
          <ul className="flex flex-wrap gap-6 text-sm md:text-base mb-6 md:mb-0">
            <li>
              <NavLink to="/" className="hover:text-blue-400 transition-colors">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/test" className="hover:text-blue-400 transition-colors">
                Test
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="hover:text-blue-400 transition-colors">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="hover:text-blue-400 transition-colors">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <NavLink to="#" className="text-lg text-blue-600 hover:opacity-80 transition-opacity">
              <FaFacebookF />
            </NavLink>
            <NavLink to="#" className="text-lg text-pink-500 hover:opacity-80 transition-opacity">
              <FaInstagram />
            </NavLink>
            <NavLink to="#" className="text-lg text-sky-400 hover:opacity-80 transition-opacity">
              <FaTwitter />
            </NavLink>
            <NavLink to="#" className="text-lg text-red-600 hover:opacity-80 transition-opacity">
              <FaYoutube />
            </NavLink>
            <NavLink to="#" className="text-lg text-blue-800 hover:opacity-80 transition-opacity">
              <FaLinkedin />
            </NavLink>
            <NavLink to="#" className="text-lg text-green-500 hover:opacity-80 transition-opacity">
              <FaWhatsapp />
            </NavLink>
          </div>
        </div>

        {/* Bottom copyright text */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">CODINGWALE</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
