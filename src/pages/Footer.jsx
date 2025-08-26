/**
 * Footer Component
 * 
 * This component displays the footer section of the landing page.
 * It contains copyright information and links to GitHub, Discord, and privacy policy.
 * 
 * @fileoverview Footer section with copyright and links
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * Footer Component
 * 
 * Renders the footer section with copyright information and navigation links.
 * Uses responsive design to adapt to different screen sizes.
 * 
 * @returns {JSX.Element} The footer component
 */
export default function Footer() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright information */}
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} MediumPilot — Built with ❤️
        </div>
        
        {/* Footer links */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Prajwal18-MD/MediumPilot"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-700 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/pZJ8dJspQu"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-700 hover:underline"
          >
            Discord
          </a>
          <a href="/privacy" className="text-sm text-gray-700 hover:underline">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
