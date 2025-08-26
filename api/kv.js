/**
 * Redis Key-Value Store Configuration
 *
 * This file configures the Redis client for the MediumPilot application.
 * It sets up the connection to Upstash Redis for storing user data and
 * application state.
 *
 * @fileoverview Redis client configuration for data persistence
 * @author MediumPilot Team
 * @version 1.0.0
 */

import { Redis } from '@upstash/redis';

/**
 * Redis client instance
 *
 * Configured to connect to Upstash Redis using environment variables.
 * Vercel injects process.env for serverless functions in production.
 * For local development, these values must be provided in .env.local file.
 *
 * @type {Redis}
 * @property {string} url - Redis REST URL from environment variables
 * @property {string} token - Redis REST token from environment variables
 */
// Vercel injects process.env for serverless functions.
// Locally, .env.local must contain these two keys.
export const kv = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
