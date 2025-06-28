import { useState } from "react";

export default function App() {
  // 1. State for the three inputs
  const [rssUrl, setRssUrl] = useState("");
  const [liToken, setLiToken] = useState("");
  const [liActor, setLiActor] = useState("");

  // 2. State for feedback messages
  const [status, setStatus] = useState(null);

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rssUrl, liToken, liActor }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();

      setStatus(`✅ All set! Your userId is ${data.userId}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong. Check the console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          MediumPilot
        </h1>

        {/* RSS URL */}
        <label className="block mb-2 font-medium" htmlFor="rss">
          Medium RSS URL
        </label>
        <input
          id="rss"
          type="url"
          required
          value={rssUrl}
          onChange={(e) => setRssUrl(e.target.value)}
          placeholder="https://api.rss.example"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* LinkedIn Token */}
        <label className="block mb-2 font-medium" htmlFor="token">
          LinkedIn Access Token
        </label>
        <input
          id="token"
          type="text"
          required
          value={liToken}
          onChange={(e) => setLiToken(e.target.value)}
          placeholder="Bearer abc123..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* LinkedIn Actor URN */}
        <label className="block mb-2 font-medium" htmlFor="actor">
          LinkedIn Actor URN
        </label>
        <input
          id="actor"
          type="text"
          required
          value={liActor}
          onChange={(e) => setLiActor(e.target.value)}
          placeholder="urn:li:person:XXXXXX"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition"
        >
          {status === "loading" ? "Saving..." : "Enable Auto‑Share"}
        </button>

        {/* Status Message */}
        {status && status !== "loading" && (
          <p className="mt-4 text-center">{status}</p>
        )}
      </form>
    </div>
  );
}
