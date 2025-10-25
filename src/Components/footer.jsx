import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 mt-26">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

        {/* Left Section - Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-semibold text-white">ContactManager</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your contacts easily and efficiently.
          </p>
        </div>

        {/* Middle Section - Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <button
            onClick={() => navigate("/home")}
            className="hover:text-white transition duration-300"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/create")}
            className="hover:text-white transition duration-300"
          >
            Add Contact
          </button>
          <button
            onClick={() => navigate("/about")}
            className="hover:text-white transition duration-300"
          >
            About
          </button>
          <button
            onClick={() => navigate("/login")}
            className="hover:text-white transition duration-300"
          >
            Login
          </button>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex justify-center gap-5 text-lg">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <TwitterIcon />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ContactManager. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
