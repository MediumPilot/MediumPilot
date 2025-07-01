# MediumPilot 🚀 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MediumPilot is a free, open-source tool that lets you automatically share your latest Medium articles to your LinkedIn profile — all without writing any code. Just sign in with Google, paste your Medium RSS feed and LinkedIn API credentials, and you're done!

🔗 **Live Demo**: [https://mediumpilot.vercel.app](https://mediumpilot.vercel.app)

---

## ✨ Features

- 🔐 Google Sign-in for secure user access
- 📰 Auto-detects your latest Medium post
- 💬 Formats a smart LinkedIn post using title, excerpt, hashtags, and image
- 📤 Posts it to your LinkedIn feed
- 💾 User credentials are safely stored
- 🌍 Supports multiple users independently

---

## ⚙️ How it works

1. You log in with Google.
2. You enter your:
   - Medium RSS URL
   - LinkedIn Access Token
   - LinkedIn Actor URN (your user ID from LinkedIn)
3. This data is saved and used by a background serverless function.
4. Every 30 minutes, a cron job runs and:
   - Fetches the latest article from your RSS feed
   - If it's new, formats and posts it to your LinkedIn profile

---

## 🛠️ Tech Stack

- [React + Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Auth (Google Sign-in)](https://firebase.google.com/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [LinkedIn API](https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/ugc-post-api)

---

## 🧠 Want to contribute? <a name="contributing"></a>

Yes! Contributions are welcome. Follow the steps below:

### 📦 Local Setup

```bash
git clone https://github.com/YOUR_USERNAME/MediumPilot.git
cd MediumPilot
npm install
npm run dev
```
### 🔐 Setup your .env.local

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 🤝 Contributing Guidelines

1. Fork this repo

2. Make your changes on a new branch

3. Test your code and functionlaity once!

4. Create a pull request with a meaningful description

5. We will review and merge if it looks good!

## 👥 Contributors

<a href="https://github.com/Prajwal18-MD/MediumPilot/graphs/contributors"> <img src="https://contrib.rocks/image?repo=Prajwal18-MD/MediumPilot" /> </a>

## 📄 License

This project is licensed under the MIT [License](LICENSE) - see the LICENSE file for details.

### ✍️ Author

Made with ❤️ by Prajwal M D