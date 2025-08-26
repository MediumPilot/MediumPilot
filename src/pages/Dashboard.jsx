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
  const [rssUrl, setRssUrl] = useState(()=>{
    return localStorage.getItem('rssUrl') || '';
  });
  const [liToken, setLiToken] = useState(()=>{
    return localStorage.getItem('liToken') || '';
  });
  const [liActor, setLiActor] = useState(()=>{
    return localStorage.getItem('liActor') || '';
  });

  // Status state for form submission feedback
  const [status, setStatus] = useState(null);

  useEffect(()=>{
    if(rssUrl) localStorage.setItem('rssUrl', rssUrl);
    if(liToken) localStorage.setItem('liToken', liToken);
    if(liActor) localStorage.setItem('liActor', liActor);
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
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-lg">
        {/* Header with logo and sign out */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              src={logo}
              alt="MediumPilot Logo"
              className="w-16 h-auto mr-3"
            />
            <h1 className="text-2xl font-bold">MediumPilot</h1>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="text-red-500 hover:text-red-600 cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        {/* Configuration form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Medium RSS URL input */}
          <div>
            <label className="block mb-1 font-medium">Medium RSS URL</label>
            <input
              value={rssUrl}
              onChange={(e) => setRssUrl(e.target.value)}
              required
              placeholder="https://api.rss.example"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* LinkedIn Access Token input */}
          <div>
            <label className="block mb-1 font-medium">
              LinkedIn Access Token
            </label>
            <input
              value={liToken}
              onChange={(e) => setLiToken(e.target.value)}
              required
              placeholder="Bearer abc123..."
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* LinkedIn Actor URN input */}
          <div>
            <label className="block mb-1 font-medium">LinkedIn Actor URN</label>
            <input
              value={liActor}
              onChange={(e) => setLiActor(e.target.value)}
              required
              placeholder="urn:li:person:XXXXXX"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold"
          >
            Enable Auto-Share
          </button>

          {/* Status message */}
          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
}
