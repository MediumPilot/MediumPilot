// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Title */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              MediumPilot
            </Link>
          </div>

          {/* Center: nav links */}
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a
              href="https://github.com/Prajwal18-MD/MediumPilot"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a href="#community" className="hover:underline">
              Community
            </a>
          </div>

          {/* Right: Star button */}
          <div>
            <a
              href="https://github.com/Prajwal18-MD/MediumPilot"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-3 rounded-lg shadow"
            >
              ★ Star us on GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
