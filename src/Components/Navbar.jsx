/**
 * Navigation Bar Component
 *
 * This component provides the main navigation for the MediumPilot application.
 * It includes the logo, navigation links, GitHub star count, and mobile menu functionality.
 *
 * @fileoverview Main navigation component with responsive design and GitHub integration
 * @author MediumPilot Team
 * @version 1.0.0
 */

// src/components/Navbar.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mediumpilot.svg';

// GitHub repository information for star count and links
const GITHUB_OWNER = 'MediumPilot';
const GITHUB_REPO = 'MediumPilot';

/**
 * Navigation Bar Component
 *
 * Provides responsive navigation with logo, links, GitHub star count,
 * and mobile menu functionality. Fetches GitHub star count and handles
 * smooth scrolling to page sections.
 *
 * @returns {JSX.Element} The navigation bar component
 */
export default function Navbar() {
  // State for mobile menu open/close
  const [open, setOpen] = useState(false);
  // State for GitHub star count
  const [stars, setStars] = useState(null);
  // State for loading GitHub stars
  const [loadingStars, setLoadingStars] = useState(false);

  /**
   * Effect to fetch and update GitHub star count
   *
   * Fetches the current star count from GitHub API and updates it every 5 minutes.
   * Handles authentication with GitHub token if available.
   */
  useEffect(() => {
    let mounted = true;

    /**
     * Fetch GitHub repository star count
     *
     * Makes API call to GitHub to get current star count for the repository.
     * Uses GitHub token if available for higher rate limits.
     */
    async function fetchStars() {
      setLoadingStars(true);
      try {
        // Get GitHub token from environment variables (Vite or Create React App)
        const token =
          (typeof import.meta !== 'undefined' &&
            import.meta.env &&
            import.meta.env.VITE_GITHUB_TOKEN) ||
          (typeof process !== 'undefined' &&
            process.env.REACT_APP_GITHUB_TOKEN) ||
          null;

        // Set authorization headers if token is available
        const headers = token ? { Authorization: `token ${token}` } : {};

        // Fetch repository data from GitHub API
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
          { headers }
        );

        if (!res.ok) throw new Error('Failed to fetch GitHub repo');

        const json = await res.json();
        if (mounted) setStars(json.stargazers_count ?? 0);
      } catch (err) {
        console.error('GitHub stars fetch failed', err);
        if (mounted) setStars(null);
      } finally {
        if (mounted) setLoadingStars(false);
      }
    }

    // Initial fetch
    fetchStars();

    // Set up interval to refresh stars every 5 minutes
    const id = setInterval(fetchStars, 1000 * 60 * 5);

    // Cleanup function
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  /**
   * Effect to handle Escape key for closing mobile menu
   *
   * Adds event listener for Escape key to close mobile menu when pressed.
   */
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /**
   * Effect to prevent background scroll when mobile menu is open
   *
   * Sets body overflow to hidden when mobile menu is open to prevent
   * background scrolling and improve user experience.
   */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  /**
   * Smooth scroll to page section
   *
   * Closes mobile menu and smoothly scrolls to the specified section ID.
   * Falls back to scrolling to top if element is not found.
   *
   * @param {string} id - The ID of the element to scroll to
   */
  const scrollToId = useCallback((id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* LEFT - logo + title */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setOpen(false)}
              >
                <img
                  src={logo}
                  alt="MediumPilot logo"
                  className="w-10 h-auto md:w-12"
                />
                <span
                  className="brand-title font-extrabold md:text-2xl"
                  style={{ lineHeight: 1 }}
                >
                  MediumPilot
                </span>
              </Link>
            </div>

            {/* CENTER - desktop navigation links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToId('features')}
                className="nav-link text-base font-medium text-slate-700"
                aria-label="Go to Features"
              >
                Features
              </button>

              <button
                onClick={() => scrollToId('community')}
                className="nav-link text-base font-medium text-slate-700"
                aria-label="Go to Community"
              >
                Community
              </button>

              <a
                href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
                target="_blank"
                rel="noreferrer"
                className="nav-link text-base font-medium text-slate-700"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </div>

            {/* RIGHT actions */}
            <div className="flex items-center gap-3">
              {/* GitHub star pill: gold gradient (visible on sm+) + lift (orange glow) */}
              <a
                href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex gap-2 lift-star bg-gradient-to-r from-yellow-300 to-yellow-400 shadow-md cta-pill"
                aria-label="Star on GitHub"
                role="button"
              >
                <span style={{ fontWeight: 600 }}>
                  {loadingStars
                    ? '…'
                    : stars !== null
                      ? stars.toLocaleString()
                      : '—'}
                </span>
                <span style={{ fontWeight: 700 }}>★ on Github</span>
              </a>

              {/* CTA Get Demo - indigo button with subtle 3D lift+blue glow */}
              <Link
                to="/signin"
                className="lift-getdemo cta-pill inline-flex items-center justify-center bg-indigo-600 text-white"
                aria-label="Get Demo"
              >
                Get Demo
              </Link>

              {/* Hamburger menu button for mobile */}
              <button
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="inline-flex items-center justify-center p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
              >
                {open ? (
                  // Close icon (X)
                  <svg
                    className="h-6 w-6 text-slate-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon (three lines)
                  <svg
                    className="h-6 w-6 text-slate-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE PANEL */}
        <div
          className={`md:hidden bg-white border-t border-gray-200 transition-all duration-250 ${open ? 'max-h-[420px] py-4' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="px-4 space-y-3">
            <button
              onClick={() => scrollToId('features')}
              className="w-full text-left text-base font-medium px-3 py-3 rounded-md nav-link-mobile"
            >
              Features
            </button>

            <button
              onClick={() => scrollToId('community')}
              className="w-full text-left text-base font-medium px-3 py-3 rounded-md nav-link-mobile"
            >
              Community
            </button>

            <a
              href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-left text-base font-medium px-3 py-3 rounded-md nav-link-mobile"
            >
              GitHub
            </a>

            <div className="pt-2 border-t border-gray-100">
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="block w-full text-left text-base font-semibold px-3 py-3 rounded-md bg-indigo-600 text-white"
              >
                Get Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
