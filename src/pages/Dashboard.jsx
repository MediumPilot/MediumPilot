/**
 * Dashboard Page Component
 *
 * This component provides the main dashboard interface for authenticated users.
 * It allows users to configure their Medium RSS URL and LinkedIn tokens
 * for automatic sharing functionality.
 *
 * @fileoverview User dashboard for configuring auto-sharing settings
 * @author MediumPilot Team
 * @version 1.0.0
 */

// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import logo from '../assets/mediumpilot.svg';

/**
 * Dashboard Page Component
 *
 * Renders the main dashboard interface where users can configure their
 * Medium RSS URL and LinkedIn tokens for automatic sharing. Handles form
 * submission and displays status messages.
 *
 * @param {Object} props - Component props
 * @param {Object} props.user - Current authenticated user object
 * @param {string} props.user.uid - User's unique identifier
 * @returns {JSX.Element} The dashboard component
 */
export default function Dashboard({ user }) {
  // Form state for configuration inputs
  const [rssUrl, setRssUrl] = useState(() => {
    return localStorage.getItem('rssUrl') || '';
  });
  const [liToken, setLiToken] = useState(() => {
    return localStorage.getItem('liToken') || '';
  });
  const [liActor, setLiActor] = useState(() => {
    return localStorage.getItem('liActor') || '';
  });

  // Status state for form submission feedback
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (rssUrl) localStorage.setItem('rssUrl', rssUrl);
    if (liToken) localStorage.setItem('liToken', liToken);
    if (liActor) localStorage.setItem('liActor', liActor);
  }, [rssUrl, liToken, liActor]);

  /**
   * Handle form submission for user configuration
   *
   * Submits user's Medium RSS URL and LinkedIn tokens to the backend API.
   * Updates status state to provide user feedback on success or failure.
   *
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Send configuration data to backend API
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rssUrl, liToken, liActor, uid: user.uid }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const data = await res.json();
      setStatus(`✅ All set! Your userId is ${data.userId}`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Something went wrong. Check the console.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full h-96 flex">
        {/* Left Side  */}
        <div className="w-1/2 h-full bg-gray-50 flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            {/* Sign In Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              DashBoard
            </h2>

            {/* Username Field */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1 tracking-wide">
                Medium RSS URL
              </label>
              <input
                value={rssUrl}
                onChange={(e) => setRssUrl(e.target.value)}
                required
                placeholder="https://api.rss.example"
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-indigo-600 outline-none placeholder-gray-500 text-sm"
              />
            </div>
            {/* access token */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1 tracking-wide">
                LinkedIn Access Token
              </label>
              <input
                value={liToken}
                onChange={(e) => setLiToken(e.target.value)}
                required
                placeholder="Bearer abc123..."
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-indigo-600 outline-none placeholder-gray-500 text-sm"
              />
            </div>
            {/* Actor */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1 tracking-wide">
                LinkedIn Actor URN
              </label>
              <input
                value={liActor}
                onChange={(e) => setLiActor(e.target.value)}
                required
                placeholder="urn:li:person:XXXXXX"
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-indigo-600 outline-none placeholder-gray-500 text-sm"
              />
            </div>

            {/* submit button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-medium py-2 rounded-md transition-colors mb-4"
            >
              Enable Auto-Share
            </button>
          </div>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="w-1/2 h-full bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 flex items-center justify-center text-white">
          <div className="text-center px-8">
            <h1 className="text-4xl font-bold mb-4">MediumPilot</h1>
            <button
              onClick={() => signOut(auth)}
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-medium py-3 px-8 rounded-full transition-colors"
            >
              Sign Out
            </button>
            {/* Status message */}
            {status && (
              <p className="mt-4 text-center text-gray-700">{status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
