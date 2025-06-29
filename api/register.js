// api/register.js
import { kv } from "./kv";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { uid, rssUrl, liToken, liActor } = req.body;
  if (!uid) {
    return res.status(401).json({ error: "Missing user UID" });
  }
  if (!rssUrl || !liToken || !liActor) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const key = `user:${uid}`;
  // Store the triple plus an empty lastUrl
  await kv.hset(key, {
    rssUrl,
    liToken,
    liActor,
    lastUrl: "", 
  });

  // Keep track of all active users
  await kv.sadd("users", uid);

  return res.status(200).json({ userId: uid });
}
