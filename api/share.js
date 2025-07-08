// api/share.js
import Parser from 'rss-parser';
import fetch from 'node-fetch';
import { kv } from './kv.js';

// 1. Initialize RSS parser
const parser = new Parser();

// 2. Category/weekday helpers
const CATEGORY_KEYWORDS = {
  AI: ['ai', 'machine learning', 'deep learning'],
  Programming: ['programming', 'code', 'development', 'python', 'java', 'c'],
  'Web Dev': ['web', 'html', 'css', 'javascript', 'react', 'node'],
  Career: ['career', 'job', 'interview', 'resume'],
};
const WEEKDAY_INTROS = [
  'Kickstart your week with', // Monday
  'Take your Tuesday further with',
  'Midweek read:',
  'Almost Friday! Check out',
  'Wrap your week with',
  'Perfect weekend read:',
  'Sunday insights:',
];
const CATEGORY_INTROS = {
  AI: 'Explore cutting-edge AI insights',
  Programming: 'Sharpen your programming skills',
  'Web Dev': 'Dive into web development',
  Career: 'Boost your career journey',
  General: 'Check out this post',
};
const COMMENT_PROMPTS = [
  'What’s your experience with this?',
  'Drop your thoughts below 👇',
  'Have questions? Ask away!',
  'How will you apply this?',
];

// 3. Helpers
function detectCategory(title) {
  const t = title.toLowerCase();
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    if (kws.some((kw) => t.includes(kw))) return cat;
  }
  return 'General';
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

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

// New helper: get first N words (strip HTML tags)
function getFirstWords(text, maxWords = 200) {
  const plain = text.replace(/<[^>]+>/g, '');
  const words = plain.trim().split(/\s+/);
  return words.slice(0, maxWords).join(' ');
}

// 4. Main handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  try {
    // 4.1 Get all users
    const userIds = await kv.smembers('users');
    for (const uid of userIds) {
      const cfg = await kv.hgetall(`user:${uid}`);
      if (!cfg || !cfg.rssUrl) continue;

      // 4.2 Fetch latest
      const feed = await parser.parseURL(cfg.rssUrl);
      if (!feed.items || feed.items.length === 0) continue;
      const entry = feed.items[0];
      if (!entry || entry.link === cfg.lastUrl) continue;

      // 4.3 Extract excerpt & hashtags & image
      const rawContent =
        entry['content:encoded'] || entry.contentSnippet || entry.content || '';
      const excerpt = getFirstWords(rawContent, 50);
      const hashtags = (entry.categories || [])
        .slice(0, 6)
        .map((t) => '#' + t.replace(/\s+/g, '').replace(/[^\w]/g, ''));
      const coverImage = entry.enclosure?.url || null;

      // 4.4 Compose post text
      const postText = composePost(entry.title, entry.link, excerpt, hashtags);

      // 4.5 Post to LinkedIn
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

      // 4.6 Update lastUrl
      await kv.hset(`user:${uid}`, { lastUrl: entry.link });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('🔥 SHARE API ERROR:', err);
    res.status(500).json({ error: err.message });
  }
}
