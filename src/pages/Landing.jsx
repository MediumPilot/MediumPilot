// src/pages/Landing.jsx
import React from 'react';
import Navbar from '../Components/Navbar';
import logo from '../assets/mediumpilot.svg';

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 mb-4">
        <div className="text-indigo-600 font-bold text-lg">{icon}</div>
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img src={logo} alt="MediumPilot" className="w-24 mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Auto share your Medium posts — grow reach, save time.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              MediumPilot automatically shares your Medium articles to LinkedIn when new posts appear. Secure tokens, flexible settings and built for creators.
            </p>

            <div className="flex gap-4">
              <a href="#features" className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition" >
                Explore Features
              </a>

              <a href="/signin" className="px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 font-semibold">
                Get Demo
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
              <div className="text-center">
                <h4 className="font-semibold">Quick preview</h4>
                <p className="text-sm text-gray-500">A single place to connect Medium and LinkedIn</p>
              </div>

              <div className="mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2"><strong>Connect Medium</strong></p>
                  <p className="text-xs text-gray-500">Paste your Medium RSS URL and your LinkedIn token — we handle the rest.</p>
                </div>
                <div className="mt-4 bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-1">Auto share</p>
                  <p className="text-xs text-gray-500">Every new post is shared as a LinkedIn post (with excerpt).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="text-gray-600 mt-2">Everything you need to automate and control your sharing workflow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon="🔁" title="Auto-Share" desc="Automatically share each new Medium post to LinkedIn." />
            <FeatureCard icon="🔒" title="Secure Tokens" desc="Tokens are stored only for your account and used securely." />
            <FeatureCard icon="⚙️" title="Customizable" desc="Choose what to include in the LinkedIn post: title, excerpt, tags." />
            <FeatureCard icon="📈" title="Analytics (coming soon)" desc="Track clicks & impressions for shared posts." />
            <FeatureCard icon="🧑‍🤝‍🧑" title="Team & Community" desc="Invite collaborators and share best practices." />
            <FeatureCard icon="📅" title="Control" desc="Optional scheduling & post templates (roadmap)." />
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Community</h2>
            <p className="text-gray-600 mt-2">Contribute, chat, and stay updated.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="font-semibold mb-2">Contribute on GitHub</h3>
              <p className="text-sm text-gray-600 mb-4">Open issues, suggest features or submit PRs. We welcome contributors.</p>
              <a
                href="https://github.com/Prajwal18-MD/MediumPilot"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold"
              >
                View on GitHub
              </a>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="font-semibold mb-2">Join our Discord</h3>
              <p className="text-sm text-gray-600 mb-4">Quick help, community discussion and roadmap chat.</p>
              <a
                href="https://discord.gg/pZJ8dJspQu" 
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
              >
                Join Discord
              </a>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow">
              <h3 className="font-semibold mb-2">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Get updates on features, roadmap and community highlights.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.elements.email.value;
                  // replace with your subscribe logic
                  alert(`Thanks! We'll add ${email} to the newsletter (demo).`);
                  e.target.reset();
                }}
                className="flex gap-2"
              >
                <input name="email" type="email" placeholder="Your email" required className="flex-1 px-3 py-2 border rounded-lg" />
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} MediumPilot — Built with ❤️</div>
          <div className="flex gap-4">
            <a href="https://github.com/Prajwal18-MD/MediumPilot" target="_blank" rel="noreferrer" className="text-sm text-gray-700 hover:underline">GitHub</a>
            <a href="https://discord.gg/pZJ8dJspQu" target="_blank" rel="noreferrer" className="text-sm text-gray-700 hover:underline">Discord</a>
            <a href="/privacy" className="text-sm text-gray-700 hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
