/**
 * Quick Preview Card Component
 *
 * This component displays a preview card in the hero section showing
 * how MediumPilot works. It provides a visual representation of the
 * product interface and workflow.
 *
 * @fileoverview Product preview card for hero section
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * Quick Preview Card Component
 *
 * Renders a preview card that shows the MediumPilot interface and workflow.
 * Displays information about connecting Medium RSS and LinkedIn tokens,
 * and the auto-sharing functionality.
 *
 * @returns {JSX.Element} The quick preview card component
 */
export default function QuickPreviewCard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
      {/* Card header */}
      <div className="text-center">
        <h4 className="font-semibold">Quick preview</h4>
        <p className="text-sm text-gray-500">
          A single place to connect Medium and LinkedIn
        </p>
      </div>

      {/* Card content */}
      <div className="mt-6">
        {/* Medium connection section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Connect Medium</strong>
          </p>
          <p className="text-xs text-gray-500">
            Paste your Medium RSS URL and your LinkedIn token — we handle the
            rest.
          </p>
        </div>

        {/* Auto-share section */}
        <div className="mt-4 bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-1">Auto share</p>
          <p className="text-xs text-gray-500">
            Every new post is shared as a LinkedIn post (with excerpt).
          </p>
        </div>
      </div>
    </div>
  );
}
