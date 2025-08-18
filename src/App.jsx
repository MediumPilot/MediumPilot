// src/App.jsx
import React, { useEffect, useState } from 'react';
import logo from './assets/mediumpilot.svg';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, githubProvider, googleProvider } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import google from './assets/icons/google.png';
import github from './assets/icons/github.png';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [rssUrl, setRssUrl] = useState('');
  const [liToken, setLiToken] = useState('');
  const [liActor, setLiActor] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  // 2. Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email,
        });
        // Track login in backend
        fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: firebaseUser.uid }),
        }).catch(console.error);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;

      if (email) {
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.length > 0 && !methods.includes('google.com')) {
          const provider =
            methods[0] === 'password'
              ? 'Email/Password'
              : methods[0] === 'github.com'
                ? 'GitHub'
                : methods[0];

          toast.error(
            `Account already exists with ${provider}. Please use that method to sign in.`
          );
          await signOut(auth);
          return;
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleSignOut = () => signOut(auth).catch((e) => setError(e.message));

  const handleEmailSignIn = async () => {
    setSignInLoading(true);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      // Check if account exists with a different provider
      if (methods.length && !methods.includes('password')) {
        const provider = methods[0] === 'google.com' ? 'Google' : methods[0];
        toast.error(
          `Account exists with ${provider}. Please sign in with that instead.`
        );
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSignInLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleEmailRegister = async () => {
    setRegisterLoading(true);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length > 0) {
        const provider =
          methods[0] === 'google.com'
            ? 'Google'
            : methods[0] === 'github.com'
              ? 'GitHub'
              : methods[0];
        toast.error(
          `Account already exists with ${provider}. Use that to sign in.`
        );
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setRegisterLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleGithubSignIn = async () => {
    setGithubLoading(true);
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (e) {
      if (e.code === 'auth/account-exists-with-different-credential') {
        const email = e.customData?.email;

        if (!email) {
          toast.error(
            'Account exists with a different provider. Please sign in using the method you originally used.'
          );
          return;
        }

        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);

          let providerName = 'another method';
          if (methods.length > 0) {
            if (methods[0] === 'password') {
              providerName = 'Email & Password';
            } else if (methods[0] === 'google.com') {
              providerName = 'Google';
            } else if (methods[0] === 'github.com') {
              providerName = 'GitHub';
            } else {
              providerName = methods[0].replace('.com', '');
            }
          }

          toast.error(
            `Account already exists with ${providerName}. Please sign in with that method.`
          );
        } catch (fetchErr) {
          toast.error('Failed to check sign-in method. Try another provider.');
          console.error(fetchErr);
        }
      } else {
        toast.error(e.message || 'Something went wrong during GitHub sign-in.');
      }
    } finally {
      setGithubLoading(false);
    }
  };

  // 4. Form submission
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

  // 5. Render login screen if not authenticated
  if (!user) {
    return (
      <>
        <ToastContainer position="top-center" />

        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
            <img
              src={logo}
              alt="MediumPilot Logo"
              className="w-24 h-auto mx-auto mb-6"
            />
            <h1 className="text-2xl font-bold mb-4">Welcome to MediumPilot</h1>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 w-full border rounded p-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full border rounded p-2"
            />
            <button
              onClick={handleEmailSignIn}
              className="mb-2 w-full bg-blue-500 hover:bg-blue-600 font-semibold text-white py-3 rounded-lg transition cursor-pointer shadow-sm"
              disabled={signInLoading}
            >
              {signInLoading ? 'Signing In...' : 'Sign In'}{' '}
            </button>

            <button
              onClick={handleEmailRegister}
              disabled={registerLoading}
              className="w-full bg-green-500 hover:bg-green-600 font-semibold text-white py-3 mb-2 rounded-lg transition cursor-pointer shadow-sm"
            >
              {registerLoading ? 'Registering...' : 'Register'}
            </button>

            <button
              onClick={handleGithubSignIn}
              disabled={githubLoading}
              className="flex justify-center items-center font-semibold gap-2 w-full mb-3 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition cursor-pointer shadow-sm"
            >
              <img className="w-7 max-w-md" src={github} alt="github_logo" />
              <span>
                {githubLoading ? 'Signing in...' : 'Sign in with GitHub'}
              </span>
            </button>

            {/* Google login button  */}
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 w-full mb-3 py-2  text-black border rounded-lg transition hover:bg-blue-400 hover:border-blue-400 hover:text-white font-semibold cursor-pointer shadow-sm"
            >
              <img className=" w-7 max-w-md" src={google} alt="google_logo" />
              <span>Sign in with Google</span>
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      </>
    );
  }

  // 6. Authenticated: show form
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
            {status === 'loading' ? 'Saving...' : 'Enable Auto‑Share'}
          </button>

          {/* Status Message */}
          {status && status !== 'loading' && (
            <p className="mt-4 text-center text-gray-700">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
}
