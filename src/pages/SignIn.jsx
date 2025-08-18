// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, githubProvider, googleProvider } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import google from '../assets/icons/google.png';
import github from '../assets/icons/github.png';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) navigate('/dashboard');
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleGithubSignIn = async () => {
    setGithubLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      if (result?.user) navigate('/dashboard');
    } catch (e) {
      if (e.code === 'auth/account-exists-with-different-credential') {
        const email = e.customData?.email;
        if (!email) {
          toast.error(
            'Account exists with a different provider. Please sign in with the original method.'
          );
          return;
        }
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          const providerName =
            methods[0] === 'password'
              ? 'Email/Password'
              : methods[0] === 'google.com'
                ? 'Google'
                : methods[0];
          toast.error(
            `Account exists with ${providerName}. Please sign in with that method.`
          );
        } catch {
          toast.error('Failed to check sign-in method.');
        }
      } else {
        toast.error(e.message || 'GitHub sign-in failed.');
      }
    } finally {
      setGithubLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    setSignInLoading(true);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length && !methods.includes('password')) {
        const provider = methods[0] === 'google.com' ? 'Google' : methods[0];
        toast.error(
          `Account exists with ${provider}. Please sign in with that instead.`
        );
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
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
      navigate('/dashboard');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setRegisterLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ToastContainer position="top-center" />
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Sign in to MediumPilot</h1>

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
          className="mb-2 w-full bg-blue-500 hover:bg-blue-600 font-semibold text-white py-3 rounded-lg transition"
          disabled={signInLoading}
        >
          {signInLoading ? 'Signing In...' : 'Sign In'}
        </button>

        <button
          onClick={handleEmailRegister}
          disabled={registerLoading}
          className="w-full bg-green-500 hover:bg-green-600 font-semibold text-white py-3 mb-2 rounded-lg transition"
        >
          {registerLoading ? 'Registering...' : 'Register'}
        </button>

        <button
          onClick={handleGithubSignIn}
          disabled={githubLoading}
          className="flex justify-center items-center font-semibold gap-2 w-full mb-3 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          <img className="w-6" src={github} alt="github_logo" />
          <span>{githubLoading ? 'Signing in...' : 'Sign in with GitHub'}</span>
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full mb-3 py-2 text-black border rounded-lg hover:bg-blue-400 hover:border-blue-400 hover:text-white font-semibold transition"
        >
          <img className=" w-6" src={google} alt="google_logo" />
          <span>Sign in with Google</span>
        </button>

        <p className="text-sm text-gray-600 mt-3">
          Back to{' '}
          <Link to="/" className="text-indigo-600 hover:underline">
            Landing
          </Link>
        </p>
      </div>
    </div>
  );
}
