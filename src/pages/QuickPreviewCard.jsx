import React from 'react';

export default function QuickPreviewCard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center">
        <h4 className="font-semibold">Quick preview</h4>
        <p className="text-sm text-gray-500">
          A single place to connect Medium and LinkedIn
        </p>
      </div>

      <div className="mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Connect Medium</strong>
          </p>
          <p className="text-xs text-gray-500">
            Paste your Medium RSS URL and your LinkedIn token — we handle the
            rest.
          </p>
        </div>
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
