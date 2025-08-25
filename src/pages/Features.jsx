import React from 'react';
import FeatureCard from './FeatureCard';

const FEATURES = [
  {
    icon: '🔁',
    title: 'Auto-Share',
    desc: 'Automatically share each new Medium post to LinkedIn.',
  },
  {
    icon: '🔒',
    title: 'Secure Tokens',
    desc: 'Tokens are stored only for your account and used securely.',
  },
  {
    icon: '⚙️',
    title: 'Customizable',
    desc: 'Choose what to include in the LinkedIn post: title, excerpt, tags.',
  },
  {
    icon: '📈',
    title: 'Analytics (coming soon)',
    desc: 'Track clicks & impressions for shared posts.',
  },
  {
    icon: '🧑‍🤝‍🧑',
    title: 'Team & Community',
    desc: 'Invite collaborators and share best practices.',
  },
  {
    icon: '📅',
    title: 'Control',
    desc: 'Optional scheduling & post templates (roadmap).',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="text-gray-600 mt-2">
            Everything you need to automate and control your sharing workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
