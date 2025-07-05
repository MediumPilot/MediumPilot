// api/kv.js
import { Redis } from '@upstash/redis';

// Vercel injects process.env for serverless functions.
// Locally, .env.local must contain these two keys.
export const kv = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
