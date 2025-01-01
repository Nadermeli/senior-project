import React from "react";
import { FaFacebook, FaInstagram, FaLeaf, FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="py-8 text-sm lg:text-base w-full  flex flex-col items-center pt-10">
      <div className="flex flex-col md:flex-row  w-full px-6 gap-8 md:items-center justify-evenly">
        {/* Logo and Description */}
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl lg:text-2xl ">
            <FaLeaf />
          </span>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
            Furniture
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="text-center">
          <ul className="space-y-2 text-gray-600">
            <li>
              <a
                href="#about"
                className="hover:text-gray-800 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-gray-800 transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-gray-800 transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-gray-800 transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media and Contact */}
        <div>
          <p className="text-gray-600 mb-4">
            Follow us on social media or reach out via email.
          </p>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaWhatsapp className="text-xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaFacebook className="text-xl" />
            </a>
          </div>
          <p className="text-gray-600 text-sm">
            Email:{" "}
            <a
              href="mailto:info@mywebsite.com"
              className="hover:text-gray-800 transition-colors"
            >
              info@mywebsite.com
            </a>
          </p>
        </div>
      </div>

      <div className=" text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
