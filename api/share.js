/**
 * Auto-Share API Handler
 *
 * This API endpoint handles automatic sharing of Medium posts to LinkedIn.
 * It fetches RSS feeds, processes content, sends the full blog text (up to
 * a character limit) to an external summarizer, and posts the resulting
 * summary to LinkedIn. If the summarizer fails or times out (10s), the
 * handler will use a plain 50-word trimmed excerpt of the post instead.
 *
 * - Sends plain-text (HTML stripped) up to CHAR_LIMIT (190000) to the summarizer.
 * - POSTs to the summarizer endpoint (default: https://summarizer-u8mc.onrender.com/summarize)
 *   with JSON { text, char_limit } and waits up to 10 seconds.
 * - If the summarizer returns a JSON with a "summary" field, that text is
 *   used verbatim in the LinkedIn post.
 * - If the summarizer fails, times out, or does not return "summary", we
 *   always use a trimmed 50-word plain-text excerpt as the fallback.
 *
 * @fileoverview API endpoint for automatic Medium to LinkedIn sharing
 * @author MediumPilot Team
 * @version 1.1.0
 */

// api/share.js
import Parser from 'rss-parser';
import fetch from 'node-fetch';
import { kv } from './kv.js';

// 1. Initialize RSS parser
const parser = new Parser();

// -------------------- Configuration --------------------
const SUMMARIZER_URL =
  process.env.SUMMARIZER_URL ||
  'https://summarizer-u8mc.onrender.com/summarize';
// char limit the user specified
const CHAR_LIMIT = 190000;
// 10 second timeout for the summarizer request
const SUMMARIZER_TIMEOUT_MS = 10_000;

// -------------------- Category / Weekday Helpers --------------------

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
 * Weekday introduction phrases (Monday to Sunday)
 *
 * Used to add variety to LinkedIn posts based on the current day.
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
 * Comment prompts to encourage engagement
 *
 * Selected deterministically per title using a hash so posts vary but are
 * repeatable for a given title.
 *
 * @type {string[]}
 */
const COMMENT_PROMPTS = [
  "What's your experience with this?",
  'Drop your thoughts below 👇',
  'Have questions? Ask away!',
  'How will you apply this?',
];

// -------------------- Helper Functions --------------------

/**
 * Detect content category based on title
 *
 * @param {string} title - Post title to categorize
 * @returns {string} Detected category name
 */
function detectCategory(title) {
  const t = title ? title.toLowerCase() : '';
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    if (kws.some((kw) => t.includes(kw))) return cat;
  }
  return 'General';
}

/**
 * Generate hash code from string (simple deterministic hash)
 *
 * Used to pick a comment prompt deterministically from the title.
 *
 * @param {string} str
 * @returns {number}
 */
function hashCode(str) {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Compose LinkedIn post text
 *
 * Creates the complete LinkedIn post text by combining weekday intro,
 * category intro, post title, excerpt (either summarizer output or 50-word
 * trimmed excerpt), URL, comment prompt, and hashtags.
 *
 * @param {string} title
 * @param {string} url
 * @param {string} excerpt - Plain text excerpt or summarizer output
 * @param {string[]} hashtags
 * @returns {string}
 */
function composePost(title, url, excerpt, hashtags) {
  // Fix weekday shift: JS getDay() 0=Sun…6=Sat, our WEEKDAY_INTROS is 0=Mon…6=Sun
  const wd = new Date().getDay();
  const shifted = (wd + 6) % 7;
  const weekIntro = WEEKDAY_INTROS[shifted] || 'Check out';
  const cat = detectCategory(title);
  const catIntro = CATEGORY_INTROS[cat] || CATEGORY_INTROS['General'];
  const comment =
    COMMENT_PROMPTS[Math.abs(hashCode(title || '')) % COMMENT_PROMPTS.length];

  // excerpt is expected to be plain text already (either summary or trimmed 50 words)
  let text = `${weekIntro} ${catIntro} "${title}"? 🚀\n\n${excerpt}...\n\n${url}\n\n${comment}`;
  if (hashtags && hashtags.length) text += `\n\n${hashtags.join(' ')}`;
  return text;
}

/**
 * Extract first N words from text content (strips HTML)
 *
 * Returns a plain-text excerpt containing up to maxWords words.
 *
 * @param {string} text - Text content possibly containing HTML tags
 * @param {number} maxWords - Maximum number of words to extract (default 50)
 * @returns {string} Plain text excerpt (no trailing ellipses)
 */
function getFirstWords(text, maxWords = 50) {
  if (!text) return '';
  const plain = text.replace(/<[^>]+>/g, '');
  const words = plain.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(' ');
}

// -------------------- Summarizer Integration --------------------

/**
 * Summarize text via the external summarizer API with timeout.
 *
 * - Sends JSON body { text, char_limit } to SUMMARIZER_URL.
 * - Waits up to SUMMARIZER_TIMEOUT_MS (10s) using an AbortController.
 * - On success: returns json.summary (string) if present.
 * - On any failure, timeout, or missing "summary" field: returns null.
 *
 * @param {string} text Plain text to summarize (already stripped of HTML)
 * @returns {Promise<string|null>} summary string or null on failure
 */
async function summarizeTextWithTimeout(text) {
  if (!text) return null;

  // Use global AbortController if available, otherwise dynamically import a polyfill.
  let AbortControllerLocal;
  if (typeof AbortController !== 'undefined') {
    AbortControllerLocal = AbortController;
  } else {
    // dynamic import as fallback; ensure "abort-controller" is installed in older Node envs
    try {
      const mod = await import('abort-controller');
      AbortControllerLocal = mod.default || mod;
    } catch (e) {
      console.warn(
        'AbortController not available and abort-controller import failed:',
        e
      );
      // If no AbortController is available, we'll proceed without timeout protection.
      AbortControllerLocal = null;
    }
  }

  const controller = AbortControllerLocal ? new AbortControllerLocal() : null;
  const signal = controller ? controller.signal : undefined;

  let timeoutId;
  if (controller) {
    timeoutId = setTimeout(() => controller.abort(), SUMMARIZER_TIMEOUT_MS);
  }

  try {
    const res = await fetch(SUMMARIZER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        text,
        char_limit: CHAR_LIMIT,
      }),
    });

    if (controller) clearTimeout(timeoutId);

    if (!res.ok) {
      // Non-2xx from summarizer; log and return null to trigger fallback
      const body = await res.text().catch(() => '');
      console.warn('Summarizer returned non-OK:', res.status, body);
      return null;
    }

    const json = await res.json().catch(() => null);
    if (!json) {
      console.warn('Summarizer returned invalid JSON');
      return null;
    }

    if (typeof json.summary === 'string' && json.summary.trim().length > 0) {
      return json.summary.trim();
    }

    // No "summary" field or empty -> treat as failure to get summary
    console.warn(
      'Summarizer did not return "summary" field or it was empty',
      json
    );
    return null;
  } catch (err) {
    // If the fetch was aborted because of timeout, err.name === 'AbortError'
    if (err && err.name === 'AbortError') {
      console.warn(
        'Summarizer request timed out after',
        SUMMARIZER_TIMEOUT_MS,
        'ms'
      );
    } else {
      console.warn('Summarizer request failed:', err && err.message);
    }
    return null;
  } finally {
    if (controller) clearTimeout(timeoutId);
  }
}

// -------------------- Main Handler --------------------

/**
 * Auto-Share API Handler
 *
 * Main function that processes all registered users, fetches their RSS feeds,
 * summarizes the latest post (or falls back to 50 words), and posts to LinkedIn.
 *
 * Expected to be mapped to an HTTP POST endpoint.
 *
 * @param {Object} req - HTTP request object (expects POST)
 * @param {Object} res - HTTP response object
 */
export default async function handler(req, res) {
  // Validate HTTP method
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  try {
    // 4.1 Get all registered users (from kv store)
    const userIds = await kv.smembers('users');

    // Process each user
    for (const uid of userIds) {
      // Get user configuration from Redis-like KV
      const cfg = await kv.hgetall(`user:${uid}`);
      if (!cfg || !cfg.rssUrl) continue;

      // 4.2 Fetch latest RSS feed
      const feed = await parser.parseURL(cfg.rssUrl);
      if (!feed.items || feed.items.length === 0) continue;

      const entry = feed.items[0];
      // skip if already posted
      if (!entry || entry.link === cfg.lastUrl) continue;

      // 4.3 Extract raw content and metadata
      const rawContent =
        entry['content:encoded'] || entry.contentSnippet || entry.content || '';

      // Prepare plain text for summarization: strip HTML tags
      const plainText = rawContent.replace(/<[^>]+>/g, '').trim();

      // Trim to CHAR_LIMIT so we don't send excessively large payloads
      const toSummarize =
        plainText.length > CHAR_LIMIT
          ? plainText.slice(0, CHAR_LIMIT)
          : plainText;

      // 4.4 Attempt to get summary from the external summarizer
      // If summarizer fails or times out, summary will be null.
      let summary = null;
      if (toSummarize && toSummarize.length > 0) {
        summary = await summarizeTextWithTimeout(toSummarize);
      }

      // IMPORTANT BEHAVIOR (per your request):
      // - If summarizer returns a summary (string), use it verbatim (trimmed).
      // - If summarizer fails (null), ALWAYS use a trimmed 50-word plain-text excerpt.
      const excerpt =
        summary !== null
          ? summary.trim()
          : getFirstWords(rawContent, 50).trim();

      // 4.5 Prepare hashtags and cover image (same logic as before)
      const hashtags = (entry.categories || [])
        .slice(0, 6)
        .map((t) => '#' + t.replace(/\s+/g, '').replace(/[^\w]/g, ''));

      const coverImage = entry.enclosure?.url || null;

      // 4.6 Compose LinkedIn post text using the summary or fallback excerpt
      const postText = composePost(entry.title, entry.link, excerpt, hashtags);

      // 4.7 Build payload expected by LinkedIn UGC API
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

      // 4.8 Post to LinkedIn API
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

      // 4.9 Update last shared URL to prevent duplicates
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
