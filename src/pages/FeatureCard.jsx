import React from 'react';

export default function FeatureCard({ title, desc, icon }) {
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
