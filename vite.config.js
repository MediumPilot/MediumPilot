/**
 * Vite Configuration File
 *
 * This file configures the Vite build tool for the MediumPilot React application.
 * Vite provides fast development server, hot module replacement, and optimized builds.
 *
 * @fileoverview Main build configuration for the MediumPilot project
 * @author MediumPilot Team
 * @version 1.0.0
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Vite configuration object
 *
 * Configures the build tool with React and Tailwind CSS support.
 * The configuration includes:
 * - React plugin for JSX support and fast refresh
 * - Tailwind CSS plugin for utility-first styling
 *
 * @type {import('vite').UserConfig}
 */
// https://vite.dev/config/
export default defineConfig({
  // Array of plugins to use during build and development
  plugins: [
    // React plugin for JSX transformation and fast refresh
    react(),
    // Tailwind CSS plugin for utility-first CSS framework
    tailwindcss(),
  ],
});
