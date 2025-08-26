/**
 * User Registration API Handler
 *
 * This API endpoint handles user registration and configuration storage.
 * It validates user input and stores Medium RSS URL and LinkedIn tokens
 * in Redis for automatic sharing functionality.
 *
 * @fileoverview API endpoint for user registration and configuration storage
 * @author MediumPilot Team
 * @version 1.0.0
 */

// api/register.js
import { kv } from './kv.js';

/**
 * User Registration API Handler
 *
 * Handles POST requests to register users and store their configuration.
 * Validates required fields and stores data in Redis for later use by
 * the sharing service.
 *
 * @param {Object} req - HTTP request object
 * @param {string} req.method - HTTP method (must be POST)
 * @param {Object} req.body - Request body containing user configuration
 * @param {string} req.body.uid - User's unique identifier
 * @param {string} req.body.rssUrl - Medium RSS feed URL
 * @param {string} req.body.liToken - LinkedIn access token
 * @param {string} req.body.liActor - LinkedIn actor URN
 * @param {Object} res - HTTP response object
 * @returns {Promise<Object>} JSON response with success status or error
 */
export default async function handler(req, res) {
  try {
    // Validate HTTP method
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Extract and validate request body
    const { uid, rssUrl, liToken, liActor } = req.body || {};

    // Validate user ID
    if (!uid) {
      return res.status(401).json({ error: 'Missing user UID' });
    }

    // Validate required configuration fields
    if (!rssUrl || !liToken || !liActor) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create Redis key for user data
    const key = `user:${uid}`;
    console.log('Storing data in Redis for', uid);

    // Store user configuration in Redis
    await kv.hset(key, {
      rssUrl, // Medium RSS feed URL
      liToken, // LinkedIn access token
      liActor, // LinkedIn actor URN
      lastUrl: '', // Track last shared URL to avoid duplicates
    });

    // Add user to active users set
    await kv.sadd('users', uid);

    // Return success response with user ID
    return res.status(200).json({ userId: uid });
  } catch (err) {
    // Log error and return internal server error
    console.error('🔥 REGISTER API ERROR:', err);
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: err.message });
  }
}
