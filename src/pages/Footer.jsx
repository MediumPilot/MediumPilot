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

import React, { useEffect, useRef } from 'react';
import MediumPilotIcon from '../assets/mediumpilot.svg';

/**
 * Footer Component
 *
 * Renders the footer section with copyright information and navigation links.
 * Uses responsive design to adapt to different screen sizes.
 *
 * @returns {JSX.Element} The footer component
 */
export default function Footer() {
  // ref for animation
  const footerRef = useRef(null);

  useEffect(() => {
    // Dynamically import the GSAP ScrollTrigger animation module to enable
    // scroll-triggered animations only when this component is mounted.
    // This approach uses code-splitting to avoid loading extra JS for small devices.
    import('../animations/useGsapAnimation').then((mod) => {
      mod.initAnimation().then((applyGsap) => {
        applyGsap(
          footerRef,
          {
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0 },
          },
          0,
          'top 100%'
        );
      });
    });
  }, []);

  return (
    <footer className="border-t bg-white/90 backdrop-blur-sm py-8">
      <div
        ref={footerRef}
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        {/* Copyright information */}
        <div className="text-sm text-slate-600">
          © {new Date().getFullYear()} MediumPilot — Built with ❤️
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Prajwal18-MD/MediumPilot"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-sm font-medium text-slate-700"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/pZJ8dJspQu"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-sm font-medium text-slate-700"
          >
            Discord
          </a>
          {/* MediumPilot Logo */}
          <a
            href="https://mediumpilot.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link flex items-center"
          >
            <img
              src={MediumPilotIcon}
              alt="MediumPilot"
              className="h-6 w-auto" // Adjust size as needed
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
