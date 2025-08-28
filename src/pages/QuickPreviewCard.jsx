/**
 * Quick Preview Card Component
 *
 * This component displays a preview card in the hero section showing
 * how MediumPilot works. It provides a visual representation of the
 * product interface and workflow.
 *
 * @fileoverview Product preview card for hero section
 * @author MediumPilot Team
 * @version 1.1.0
 */

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function QuickPreviewCard() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 20; // tilt range
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    setRotate({ x, y });
  };

  const resetRotation = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md cursor-pointer
                 transition-shadow duration-300 hover:shadow-indigo-300/40"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      {/* Subtle glowing gradient border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 opacity-30 blur-xl -z-10" />

      {/* Card header */}
      <div className="text-center">
        <h4 className="font-semibold text-lg text-gray-800">Quick preview</h4>
        <p className="text-sm text-gray-500">
          A single place to connect Medium and LinkedIn
        </p>
      </div>

      {/* Card content */}
      <div className="mt-6 space-y-4">
        {/* Medium connection section */}
        <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-xl shadow-inner">
          <p className="text-sm text-gray-700 mb-2 font-medium">
            Connect Medium
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Paste your Medium RSS URL and your LinkedIn token — we handle the
            rest.
          </p>
        </div>

        {/* Auto-share section */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-colors p-4 rounded-xl shadow-inner">
          <p className="text-sm text-gray-700 mb-1 font-medium">Auto share</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every new post is shared as a LinkedIn post (with excerpt).
          </p>
        </div>
      </div>
    </motion.div>
  );
}

