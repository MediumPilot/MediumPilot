// api/share.js
import Parser from 'rss-parser';
import fetch from 'node-fetch';
import { kv } from './kv.js';

// 1. Initialize RSS parser
const parser = new Parser();

// 2. Category/weekday helpers
const CATEGORY_KEYWORDS = {
  AI: ['ai', 'machine learning', 'deep learning'],
  Programming: ['programming', 'code', 'development', 'python', 'java', 'c '],
  'Web Dev': ['web', 'html', 'css', 'javascript', 'react', 'node'],
  Career: ['career', 'job', 'interview', 'resume'],
};
const WEEKDAY_INTROS = [
  'Kickstart your week with',
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

function composePost(title, url, excerpt, hashtags) {
  const wd = new Date().getDay();
  const weekIntro = WEEKDAY_INTROS[wd] || 'Check out';
  const cat = detectCategory(title);
  const catIntro = CATEGORY_INTROS[cat] || CATEGORY_INTROS['General'];
  const comment =
    COMMENT_PROMPTS[Math.abs(hashCode(title)) % COMMENT_PROMPTS.length];

  let text = `${weekIntro} ${catIntro} "${title}"? 🚀\n\n${excerpt}...\n\n${url}\n\n${comment}`;
  if (hashtags.length) text += `\n\n${hashtags.join(' ')}`;
  return text;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
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
      const entry = feed.items[0];
      if (!entry || entry.link === cfg.lastUrl) continue;

      // 4.6 Extract excerpt & hashtags & image
      const excerpt = (entry.contentSnippet || entry.content || '')
        .split('\n')[0]
        .slice(0, 200);
      const hashtags = (entry.categories || [])
        .slice(0, 6)
        .map((t) => '#' + t.replace(/\s+/g, '').replace(/[^\w]/g, ''));
      const coverImage = entry.enclosure?.url || null;

      const postText = composePost(entry.title, entry.link, excerpt, hashtags);

      // 4.4 Post to LinkedIn
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
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
      };
      await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cfg.liToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify(payload),
      });

      // 4.5 Update lastUrl
      await kv.hset(`user:${uid}`, { lastUrl: entry.link });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('🔥 SHARE API ERROR:', err);
    res.status(500).json({ error: err.message });
  }
}
