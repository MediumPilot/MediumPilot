/**
 * Auto-Share API Handler
 * 
 * This API endpoint handles automatic sharing of Medium posts to LinkedIn.
 * It fetches RSS feeds, processes content, and posts to LinkedIn using
 * the LinkedIn API. Includes content categorization and intelligent posting.
 * 
 * @fileoverview API endpoint for automatic Medium to LinkedIn sharing
 * @author MediumPilot Team
 * @version 1.0.0
 */

// api/share.js
import Parser from 'rss-parser';
import fetch from 'node-fetch';
import { kv } from './kv.js';

// 1. Initialize RSS parser
const parser = new Parser();

// 2. Category/weekday helpers

/**
 * Category keywords for content classification
 * 
 * Maps category names to arrays of keywords for automatic content categorization.
 * Used to determine appropriate intro text and hashtags for LinkedIn posts.
 * 
 * @type {Object.<string, string[]>}
 */
const CATEGORY_KEYWORDS = {
  AI: ['ai', 'machine learning', 'deep learning'],
  Programming: ['programming', 'code', 'development', 'python', 'java', 'c'],
  'Web Dev': ['web', 'html', 'css', 'javascript', 'react', 'node'],
  Career: ['career', 'job', 'interview', 'resume'],
};

/**
 * Weekday introduction phrases
 * 
 * Array of introduction phrases for each day of the week (Monday to Sunday).
 * Used to add variety and context to LinkedIn posts based on the current day.
 * 
 * @type {string[]}
 */
const WEEKDAY_INTROS = [
  'Kickstart your week with', // Monday
  'Take your Tuesday further with',
  'Midweek read:',
  'Almost Friday! Check out',
  'Wrap your week with',
  'Perfect weekend read:',
  'Sunday insights:',
];

/**
 * Category-specific introduction phrases
 * 
 * Maps content categories to appropriate introduction phrases for LinkedIn posts.
 * Provides context-specific messaging based on content type.
 * 
 * @type {Object.<string, string>}
 */
const CATEGORY_INTROS = {
  AI: 'Explore cutting-edge AI insights',
  Programming: 'Sharpen your programming skills',
  'Web Dev': 'Dive into web development',
  Career: 'Boost your career journey',
  General: 'Check out this post',
};

/**
 * Comment prompts for engagement
 * 
 * Array of prompts to encourage engagement and comments on LinkedIn posts.
 * Selected randomly based on post title hash for variety.
 * 
 * @type {string[]}
 */
const COMMENT_PROMPTS = [
  'What\'s your experience with this?',
  'Drop your thoughts below 👇',
  'Have questions? Ask away!',
  'How will you apply this?',
];

// 3. Helper functions

/**
 * Detect content category based on title
 * 
 * Analyzes post title to determine the most appropriate category
 * using keyword matching against predefined categories.
 * 
 * @param {string} title - Post title to categorize
 * @returns {string} Detected category name
 */
function detectCategory(title) {
  const t = title.toLowerCase();
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    if (kws.some((kw) => t.includes(kw))) return cat;
  }
  return 'General';
}

/**
 * Generate hash code from string
 * 
 * Creates a simple hash code from a string for consistent random selection.
 * Used to select comment prompts and other randomized elements.
 * 
 * @param {string} str - String to hash
 * @returns {number} Hash code
 */
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/**
 * Compose LinkedIn post text
 * 
 * Creates the complete LinkedIn post text by combining weekday intro,
 * category intro, post title, excerpt, URL, comment prompt, and hashtags.
 * 
 * @param {string} title - Post title
 * @param {string} url - Post URL
 * @param {string} excerpt - Post excerpt
 * @param {string[]} hashtags - Array of hashtags
 * @returns {string} Complete LinkedIn post text
 */
function composePost(title, url, excerpt, hashtags) {
  // Fix weekday shift: JS getDay() 0=Sun…6=Sat, our WEEKDAY_INTROS is 0=Mon…6=Sun
  const wd = new Date().getDay();
  const shifted = (wd + 6) % 7;
  const weekIntro = WEEKDAY_INTROS[shifted] || 'Check out';
  const cat = detectCategory(title);
  const catIntro = CATEGORY_INTROS[cat] || CATEGORY_INTROS['General'];
  const comment =
    COMMENT_PROMPTS[Math.abs(hashCode(title)) % COMMENT_PROMPTS.length];

  let text = `${weekIntro} ${catIntro} "${title}"? 🚀\n\n${excerpt}...\n\n${url}\n\n${comment}`;
  if (hashtags.length) text += `\n\n${hashtags.join(' ')}`;
  return text;
}

/**
 * Extract first N words from text content
 * 
 * Strips HTML tags and extracts the first N words from text content.
 * Used to create excerpts for LinkedIn posts from RSS content.
 * 
 * @param {string} text - Text content with potential HTML tags
 * @param {number} maxWords - Maximum number of words to extract
 * @returns {string} Plain text excerpt
 */
function getFirstWords(text, maxWords = 200) {
  const plain = text.replace(/<[^>]+>/g, '');
  const words = plain.trim().split(/\s+/);
  return words.slice(0, maxWords).join(' ');
}

// 4. Main handler

/**
 * Auto-Share API Handler
 * 
 * Main function that processes all registered users, fetches their RSS feeds,
 * and automatically shares new posts to LinkedIn. Handles content processing,
 * categorization, and LinkedIn API posting.
 * 
 * @param {Object} req - HTTP request object
 * @param {string} req.method - HTTP method (must be POST)
 * @param {Object} res - HTTP response object
 * @returns {Promise<Object>} JSON response with success status or error
 */
export default async function handler(req, res) {
  // Validate HTTP method
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  try {
    // 4.1 Get all registered users
    const userIds = await kv.smembers('users');
    
    // Process each user
    for (const uid of userIds) {
      // Get user configuration from Redis
      const cfg = await kv.hgetall(`user:${uid}`);
      if (!cfg || !cfg.rssUrl) continue;

      // 4.2 Fetch latest RSS feed
      const feed = await parser.parseURL(cfg.rssUrl);
      if (!feed.items || feed.items.length === 0) continue;
      
      const entry = feed.items[0];
      if (!entry || entry.link === cfg.lastUrl) continue;

      // 4.3 Extract content and metadata
      const rawContent =
        entry['content:encoded'] || entry.contentSnippet || entry.content || '';
      const excerpt = getFirstWords(rawContent, 50);
      const hashtags = (entry.categories || [])
        .slice(0, 6)
        .map((t) => '#' + t.replace(/\s+/g, '').replace(/[^\w]/g, ''));
      const coverImage = entry.enclosure?.url || null;

      // 4.4 Compose LinkedIn post text
      const postText = composePost(entry.title, entry.link, excerpt, hashtags);

      // 4.5 Post to LinkedIn API
      const payload = {
        author: cfg.liActor,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: postText },
            shareMediaCategory: 'ARTICLE',
            media: coverImage
              ? [
                  { status: 'READY', originalUrl: entry.link },
                  { status: 'READY', originalUrl: coverImage },
                ]
              : [{ status: 'READY', originalUrl: entry.link }],
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      // Make LinkedIn API request
      const postRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cfg.liToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify(payload),
      });
      
      if (!postRes.ok) {
        const body = await postRes.text();
        throw new Error(`LinkedIn error ${postRes.status}: ${body}`);
      }

      // 4.6 Update last shared URL to prevent duplicates
      await kv.hset(`user:${uid}`, { lastUrl: entry.link });
    }

    // Return success response
    res.status(200).json({ success: true });
  } catch (err) {
    // Log error and return error response
    console.error('🔥 SHARE API ERROR:', err);
    res.status(500).json({ error: err.message });
  }
}
