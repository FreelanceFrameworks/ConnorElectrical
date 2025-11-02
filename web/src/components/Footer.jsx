import React from "react";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* --- Company Info --- */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Connor Electrical
          </h2>
          <p className="text-sm">
            Reliable electrical services for homes and businesses across South Australia.  
            Fully licensed, insured, and committed to safety and quality.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="hover:text-white">
                Book a Job
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Contact & Social --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
          <p className="text-sm mb-3">
            Email:{" "}
            <a
              href="mailto:info@connorelectrical.com"
              className="hover:text-white"
            >
              info@connorelectrical.com
            </a>
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
            <a href="mailto:info@connorelectrical.com" className="hover:text-white">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Line --- */}
      <div className="text-center border-t border-gray-700 mt-8 pt-4 text-sm text-gray-500">
        © {currentYear} Connor Electrical. All rights reserved. | ABN 12 345 678 901
      </div>
    </footer>
  );
};

export default Footer;
