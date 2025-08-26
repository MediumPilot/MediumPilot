/**
 * Features Section Component
 *
 * This component displays the features section of the landing page.
 * It showcases the key capabilities and benefits of MediumPilot
 * using a grid of feature cards.
 *
 * @fileoverview Features section with product capabilities showcase
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React from 'react';
import FeatureCard from './FeatureCard';

/**
 * Features data array
 *
 * Contains all the features to be displayed in the features section.
 * Each feature has an icon, title, and description.
 *
 * @type {Array<Object>}
 * @property {string} icon - Emoji icon representing the feature
 * @property {string} title - Feature title
 * @property {string} desc - Feature description
 */
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

/**
 * Features Section Component
 *
 * Renders the features section with a grid of feature cards.
 * Each card displays an icon, title, and description for a product feature.
 * Uses responsive grid layout that adapts to different screen sizes.
 *
 * @returns {JSX.Element} The features section component
 */
export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="text-gray-600 mt-2">
            Everything you need to automate and control your sharing workflow.
          </p>
        </div>

        {/* Features grid */}
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
