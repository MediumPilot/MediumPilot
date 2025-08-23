// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Usage: make sure you have the repo values below replaced.
 * Optionally set VITE_GITHUB_TOKEN (Vite) or REACT_APP_GITHUB_TOKEN (CRA)
 * to increase rate limit.
 */
const GITHUB_OWNER = 'Prajwal18-MD';
const GITHUB_REPO = 'MediumPilot';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState(null);
  const [loadingStars, setLoadingStars] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchStars() {
      setLoadingStars(true);
      try {
        // Support Vite token (import.meta.env) OR CRA token (process.env)
        const token =
          (typeof import.meta !== 'undefined' &&
            import.meta.env &&
            import.meta.env.VITE_GITHUB_TOKEN) ||
          (typeof process !== 'undefined' &&
            process.env.REACT_APP_GITHUB_TOKEN) ||
          null;

        const headers = token ? { Authorization: `token ${token}` } : {};
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
          {
            headers,
          }
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

    fetchStars();
    const interval = setInterval(fetchStars, 1000 * 60 * 5); // refresh every 5 minutes (optional)
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // scroll helper (called from nav items)
  const scrollToId = (id) => {
    setOpen(false); // close mobile menu if open
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="w-full bg-white/60 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <Link to="/" className="text-xl font-extrabold tracking-tight">
                MediumPilot
              </Link>
            </div>

            {/* Center (desktop): links */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToId('features')}
                className="text-sm font-medium hover:text-indigo-600 transition"
              >
                Features
              </button>

              <button
                onClick={() => scrollToId('community')}
                className="text-sm font-medium hover:text-indigo-600 transition"
              >
                Community
              </button>

              <a
                href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium hover:text-indigo-600 transition"
              >
                GitHub
              </a>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Stars */}
              <a
                href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg font-semibold bg-gradient-to-r from-yellow-300 to-yellow-400 shadow-md"
                title="Star us on GitHub"
              >
                <span className="text-black">★ Star</span>
                <span className="text-sm text-black/80">
                  {loadingStars
                    ? '…'
                    : stars !== null
                      ? stars.toLocaleString()
                      : '—'}
                </span>
              </a>

              {/* Desktop CTA */}
              <Link
                to="/signin"
                className="hidden md:inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="inline-flex items-center justify-center p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {open ? (
                  <svg
                    className="h-6 w-6"
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
                  <svg
                    className="h-6 w-6"
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

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-max-h duration-300 ${
            open ? 'max-h-[360px]' : 'max-h-0'
          }`}
        >
          <div className="px-4 pb-4 pt-2 space-y-2 bg-white">
            <button
              onClick={() => scrollToId('features')}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Features
            </button>
            <button
              onClick={() => scrollToId('community')}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Community
            </button>

            <a
              href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
            >
              GitHub Repository
            </a>

            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-md text-indigo-600 font-semibold hover:bg-gray-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
