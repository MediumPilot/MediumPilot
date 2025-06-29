// api/register.js
import { kv } from "./kv.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { uid, rssUrl, liToken, liActor } = req.body || {};

    if (!uid) {
      return res.status(401).json({ error: "Missing user UID" });
    }
    if (!rssUrl || !liToken || !liActor) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const key = `user:${uid}`;
    console.log("Storing data in Redis for", uid);

    await kv.hset(key, {
      rssUrl,
      liToken,
      liActor,
      lastUrl: "",
    });
    await kv.sadd("users", uid);

    return res.status(200).json({ userId: uid });
  } catch (err) {
    console.error("🔥 REGISTER API ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
