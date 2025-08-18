// src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import logo from '../assets/mediumpilot.svg';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <header className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6 py-20">
          <img src={logo} alt="MediumPilot" className="w-28 mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold mb-4">
            Automate sharing your Medium posts
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            MediumPilot helps you auto-share Medium posts to LinkedIn. Quick to
            set up. Secure tokens.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/signin"
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              Get Demo
            </Link>

            <a
              href="https://github.com/Prajwal18-MD/MediumPilot"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 font-semibold"
            >
              View on GitHub
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2">Auto Share</h3>
              <p className="text-sm text-gray-600">
                Share every new Medium post automatically.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2">Secure Tokens</h3>
              <p className="text-sm text-gray-600">
                Store your LinkedIn access tokens safely.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                Join the community to suggest features.
              </p>
            </div>
          </div>
        </div>
      </header>

      <footer className="bg-white border-t py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} MediumPilot — Built with ❤️
        </div>
      </footer>
    </div>
  );
}
