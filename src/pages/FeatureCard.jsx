/**
 * Feature Card Component
 * 
 * This component displays a single feature card in the features section.
 * It shows an icon, title, and description for a product feature
 * with hover effects and consistent styling.
 * 
 * @fileoverview Individual feature card component
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * Feature Card Component
 * 
 * Renders a card displaying a single feature with an icon, title, and description.
 * Includes hover effects for better user interaction and visual appeal.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The feature title
 * @param {string} props.desc - The feature description
 * @param {string} props.icon - The emoji icon for the feature
 * @returns {JSX.Element} The feature card component
 */
export default function FeatureCard({ title, desc, icon }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 transition">
      {/* Icon container with background */}
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 mb-4">
        <div className="text-indigo-600 font-bold text-lg">{icon}</div>
      </div>
      
      {/* Feature title */}
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      
      {/* Feature description */}
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
