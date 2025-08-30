/**
 * Sign In Page Component
 *
 * This component provides the authentication interface for MediumPilot.
 * It supports multiple authentication methods including email/password,
 * Google, and GitHub OAuth. Handles user registration and sign-in flows.
 *
 * @fileoverview Authentication page with multiple sign-in methods
 * @author MediumPilot Team
 * @version 1.0.0
 */

// src/pages/SignIn.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SiGithub, SiReact } from '@icons-pack/react-simple-icons';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, githubProvider, googleProvider } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import github from '../assets/icons/github.svg';
import google from '../assets/icons/google.svg';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Sign In Page Component
 *
 * Renders the authentication interface with multiple sign-in options.
 * Handles email/password authentication, Google OAuth, and GitHub OAuth.
 * Includes error handling and user feedback through toast notifications.
 *
 * @returns {JSX.Element} The sign-in page component
 */
export default function SignIn() {
  // Form state
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('email') || '';
  });
  const [password, setPassword] = useState(() => {
    return localStorage.getItem('password') || '';
  });

  // Loading states for different authentication methods
  const [signInLoading, setSignInLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  useEffect(() => {
    if (email) localStorage.setItem('email', email);
    if (password) localStorage.setItem('password', password);
  }, [email, password]);

  /**
   * Handle Google OAuth sign-in
   *
   * Initiates Google OAuth popup and navigates to dashboard on success.
   * Shows error toast if authentication fails.
   */
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) navigate('/dashboard');
    } catch (e) {
      toast.error(e.message);
    }
  };

  /**
   * Handle GitHub OAuth sign-in
   *
   * Initiates GitHub OAuth popup with error handling for account conflicts.
   * Provides specific error messages for different authentication scenarios.
   */
  const handleGithubSignIn = async () => {
    setGithubLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      if (result?.user) navigate('/dashboard');
    } catch (e) {
      // Handle account exists with different credential error
      if (e.code === 'auth/account-exists-with-different-credential') {
        const email = e.customData?.email;
        if (!email) {
          toast.error(
            'Account exists with a different provider. Please sign in with the original method.'
          );
          return;
        }
        try {
          // Check what sign-in methods are available for this email
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

  /**
   * Handle email/password sign-in
   *
   * Validates existing account methods and signs in with email/password.
   * Clears form on completion and shows appropriate error messages.
   */
  const handleEmailSignIn = async () => {
    setSignInLoading(true);
    try {
      // Check if account exists and what methods are available
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length && !methods.includes('password')) {
        const provider = methods[0] === 'google.com' ? 'Google' : methods[0];
        toast.error(
          `Account exists with ${provider}. Please sign in with that instead.`
        );
        return;
      }

      // Attempt email/password sign-in
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

  /**
   * Handle email/password registration
   *
   * Checks if account already exists and creates new account if not.
   * Validates against existing OAuth accounts and provides clear error messages.
   */
  const handleEmailRegister = async () => {
    setRegisterLoading(true);
    try {
      // Check if account already exists
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

      // Create new account
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
      {/* Toast notifications container */}
      <ToastContainer position="top-center" />

      {/* Sign-in form container */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Sign in to MediumPilot</h1>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 w-full border rounded p-2"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full border rounded p-2"
        />

        {/* Email/password sign-in button */}
        <button
          onClick={handleEmailSignIn}
          className="mb-2 w-full bg-blue-500 hover:bg-blue-600 font-semibold text-white py-3 rounded-lg transition cursor-pointer"
          disabled={signInLoading}
        >
          {signInLoading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Email/password registration button */}
        <button
          onClick={handleEmailRegister}
          disabled={registerLoading}
          className="w-full bg-green-500 hover:bg-green-600 font-semibold text-white py-3 mb-2 rounded-lg transition cursor-pointer"
        >
          {registerLoading ? 'Registering...' : 'Register'}
        </button>

        {/* GitHub OAuth button */}
        <button
          onClick={handleGithubSignIn}
          disabled={githubLoading}
          className="flex justify-center items-center font-semibold gap-2 w-full mb-3 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-900/70 transition cursor-pointer"
        >
          <SiGithub color="white" size={26} />
          <span>{githubLoading ? 'Signing in...' : 'Sign in with GitHub'}</span>
        </button>

        {/* Google OAuth button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full mb-3 py-2 text-black border rounded-lg hover:bg-blue-400 hover:border-blue-400 hover:text-white font-semibold transition cursor-pointer"
        >
          <img className=" w-6" src={google} alt="google_logo" />
          <span>Sign in with Google</span>
        </button>

        {/* Back to landing page link */}
        <Link to="/">
          <button className="mt-4 w-full py-2 px-4 bg-gray-700 hover:bg-gray-700/70 text-white font-medium rounded-lg transition duration-200 ease-in-out flex items-center justify-center gap-2 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
