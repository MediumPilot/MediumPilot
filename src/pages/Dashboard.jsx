// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import logo from '../assets/mediumpilot.svg';

export default function Dashboard({ user }) {
  const [rssUrl, setRssUrl] = useState('');
  const [liToken, setLiToken] = useState('');
  const [liActor, setLiActor] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
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

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold"
          >
            Enable Auto-Share
          </button>

          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
}
