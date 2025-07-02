// src/App.jsx
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// 1. Initialize Firebase (env variables in .env.local)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function App() {
  const [user, setUser] = useState(null);
  const [rssUrl, setRssUrl] = useState("");
  const [liToken, setLiToken] = useState("");
  const [liActor, setLiActor] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  // 2. Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email,
        });
        // Track login in backend
        fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: firebaseUser.uid }),
        }).catch(console.error);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 3. Sign-in & Sign-out handlers
  const handleGoogleSignIn = () =>
    signInWithPopup(auth, googleProvider).catch((e) => setError(e.message));
  const handleSignOut = () => signOut(auth).catch((e) => setError(e.message));

  // 4. Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rssUrl, liToken, liActor, uid: user.uid }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setStatus(`✅ All set! Your userId is ${data.userId}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong. Check the console.");
    }
  };

  // 5. Render login screen if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
          <img
            src="src\assets\mediumpilot.svg"
            alt="MediumPilot Logo"
            className="w-24 h-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold mb-4">Welcome to MediumPilot</h1>
          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Sign in with Google
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  // 6. Authenticated: show form
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <img
              src="src\assets\mediumpilot.svg"
              alt="MediumPilot Logo"
              className="w-16 h-auto mr-3"
            />
            <h1 className="text-2xl font-bold">MediumPilot</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="text-red-500 hover:text-red-600 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* RSS URL */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="rss">
              Medium RSS URL
            </label>
            <input
              id="rss"
              type="url"
              required
              value={rssUrl}
              onChange={(e) => setRssUrl(e.target.value)}
              placeholder="https://api.rss.example"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* LinkedIn Token */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="token">
              LinkedIn Access Token
            </label>
            <input
              id="token"
              type="text"
              required
              value={liToken}
              onChange={(e) => setLiToken(e.target.value)}
              placeholder="Bearer abc123..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* LinkedIn Actor URN */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="actor">
              LinkedIn Actor URN
            </label>
            <input
              id="actor"
              type="text"
              required
              value={liActor}
              onChange={(e) => setLiActor(e.target.value)}
              placeholder="urn:li:person:XXXXXX"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition cursor-pointer"
          >
            {status === "loading" ? "Saving..." : "Enable Auto‑Share"}
          </button>

          {/* Status Message */}
          {status && status !== "loading" && (
            <p className="mt-4 text-center text-gray-700">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
}
