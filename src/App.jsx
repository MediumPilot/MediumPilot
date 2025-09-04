/**
 * Main Application Component
 *
 * This component serves as the root component of the MediumPilot application.
 * It handles authentication state, protected routes, and application routing.
 *
 * @fileoverview Main application component with authentication and routing
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Import page components
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import { initAuthListener } from './store/actions/user.actions';

/**
 * Main App component that handles authentication and routing
 *
 * This component manages the authentication state using Firebase Auth
 * and provides protected routes for authenticated users.
 *
 * @returns {JSX.Element} The main application component
 */
export default function App() {
  // State for current authenticated user and to track if authentication check is in progress
  const { user, checkingAuth } = useSelector((state) => state.userModule);

  /**
   * Effect to listen for authentication state changes
   *
   * Sets up a Firebase Auth listener to track user authentication status.
   * Updates the user state when authentication changes and stops checking
   * once the initial auth state is determined.
   */
  useEffect(() => {
    initAuthListener();
  }, []);

  /**
   * Protected Route Component
   *
   * Wraps components that require authentication. If user is not authenticated,
   * redirects to sign-in page. Shows nothing while checking authentication.
   *
   * @param {Object} props - Component props
   * @param {React.ReactNode} props.children - Child components to render if authenticated
   * @returns {JSX.Element|null} Protected component or redirect
   */
  function ProtectedRoute({ children }) {
    // Show nothing while checking authentication status
    if (checkingAuth) return null; // or spinner
    // If user is authenticated, render children, otherwise redirect to signin
    return user ? children : <Navigate to="/signin" />;
  }

  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<Landing />} />
      {/* Sign-in page */}
      <Route path="/signin" element={<SignIn />} />
      {/* Protected dashboard - only accessible when authenticated */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard user={user} />
          </ProtectedRoute>
        }
      />
      {/* Catch-all route - redirect to home page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
