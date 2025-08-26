/**
 * ESLint Configuration File
 *
 * This file configures ESLint for the MediumPilot React application.
 * ESLint provides code linting, style checking, and error detection.
 *
 * @fileoverview Code quality and style configuration for the MediumPilot project
 * @author MediumPilot Team
 * @version 1.0.0
 */

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

/**
 * ESLint configuration object
 *
 * Configures linting rules for JavaScript and React development.
 * The configuration includes:
 * - Recommended JavaScript rules
 * - React Hooks rules for proper hook usage
 * - React Refresh rules for development
 * - Custom rules for unused variables
 *
 * @type {import('eslint').Linter.Config}
 */
export default defineConfig([
  // Ignore the dist directory globally
  globalIgnores(['dist']),
  {
    // Apply to all JavaScript and JSX files
    files: ['**/*.{js,jsx}'],
    // Extend from recommended configurations
    extends: [
      // Recommended JavaScript rules
      js.configs.recommended,
      // Latest recommended React Hooks rules
      reactHooks.configs['recommended-latest'],
      // React Refresh rules for Vite development
      reactRefresh.configs.vite,
    ],
    // Language options for parsing
    languageOptions: {
      // Use ECMAScript 2020 features
      ecmaVersion: 2020,
      // Browser globals for client-side code
      globals: globals.browser,
      // Parser options for modern JavaScript
      parserOptions: {
        // Latest ECMAScript version
        ecmaVersion: 'latest',
        // Enable JSX parsing
        ecmaFeatures: { jsx: true },
        // Use ES modules
        sourceType: 'module',
      },
    },
    // Custom rules configuration
    rules: {
      // Error on unused variables, but ignore variables starting with uppercase or underscore
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]);
