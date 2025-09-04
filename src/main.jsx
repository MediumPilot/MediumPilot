/**
 * Main Application Entry Point
 *
 * This file serves as the entry point for the MediumPilot React application.
 * It sets up the React root, router, and renders the main App component.
 *
 * @fileoverview Application bootstrap and initialization
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// Import global styles including Tailwind CSS
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

/**
 * Initialize and render the React application
 *
 * Creates a React root, wraps the app with BrowserRouter for navigation,
 * and renders the main App component in strict mode for development checks.
 */
createRoot(document.getElementById('root')).render(
  // Strict mode helps identify potential problems during development
  <React.StrictMode>
    {/* Provider makes the Redux store available to all components */}
    <Provider store={store}>
      {/* BrowserRouter provides routing functionality for the entire app */}
      <BrowserRouter>
        {/* Main application component */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
