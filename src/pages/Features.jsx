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

// Import SVG icons
import AutoShareIcon from '../assets/icons/autoshare.svg';
import LockIcon from '../assets/icons/lock.svg';
import TeamsIcon from '../assets/icons/teams.svg';
import AiIcon from '../assets/icons/ai.svg';
import AnalyticsIcon from '../assets/icons/analytics.svg';
import XIcon from '../assets/icons/x.svg';

/**
 * Features data array
 *
 * Contains all the features to be displayed in the features section.
 * Each feature has an icon, title, and description.
 *
 * @type {Array<Object>}
 * @property {string} icon - SVG icon path representing the feature
 * @property {string} title - Feature title
 * @property {string} desc - Feature description
 */
const FEATURES = [
  {
    icon: AutoShareIcon,
    title: 'Auto-Share',
    desc: 'Automatically share each new Medium post to LinkedIn.',
  },
  {
    icon: LockIcon,
    title: 'Secure Tokens',
    desc: 'Tokens are stored only for your account and used securely.',
  },
  {
    icon: TeamsIcon,
    title: 'Team & Community',
    desc: 'Invite collaborators, developers and share best practices.',
  },
  {
    icon: AiIcon,
    title: 'AI Agent',
    desc: 'AI generates title, intro, summary, excerpt, tags.',
  },
  {
    icon: AnalyticsIcon,
    title: 'Analytics (coming soon)',
    desc: 'Track clicks & impressions for shared posts.',
  },
  {
    icon: XIcon,
    title: 'X/Twitter (coming soon)',
    desc: 'Auto share to X/Twitter same as LinkedIn.',
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
