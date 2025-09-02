/**
 * Firebase Configuration and Authentication Setup
 *
 * This file configures Firebase for the MediumPilot application.
 * It sets up authentication providers and exports Firebase services.
 *
 * @fileoverview Firebase configuration and authentication setup
 * @author MediumPilot Team
 * @version 1.0.0
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
} from 'firebase/auth';

/**
 * Firebase configuration object
 *
 * Contains all necessary Firebase configuration values loaded from environment variables.
 * These values are injected by Vercel in production or loaded from .env.local in development.
 *
 * @type {Object}
 * @property {string} apiKey - Firebase API key for authentication
 * @property {string} authDomain - Firebase auth domain
 * @property {string} projectId - Firebase project identifier
 * @property {string} storageBucket - Firebase storage bucket URL
 * @property {string} messagingSenderId - Firebase messaging sender ID
 * @property {string} appId - Firebase application ID
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app with configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize authentication providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/**
 * Export Firebase services and authentication methods
 *
 * These exports provide access to Firebase authentication services
 * and methods throughout the application.
 */
export {
  auth, // Firebase Auth instance
  googleProvider, // Google authentication provider
  signInWithEmailAndPassword, // Email/password sign-in method
  createUserWithEmailAndPassword, // Email/password registration method
  githubProvider, // GitHub authentication provider
};
