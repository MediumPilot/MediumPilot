/**
 * Hero Section Component
 *
 * This component displays the main hero section of the landing page.
 * It contains the primary value proposition, call-to-action buttons,
 * a centered quote and supporting lines, the flow diagram, and a preview card showing the product interface.
 *
 * @fileoverview Main hero section with value proposition, centered quote, flow image and CTAs
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import QuickPreviewCard from './QuickPreviewCard';
import flow from '../assets/flow.png';

/**
 * Hero Section Component
 *
 * Renders the main hero section with a centered quote, two supporting lines (kept as a single line),
 * the flow image (centered below the text), call-to-action buttons, and the preview card.
 * Uses responsive design to adapt to different screen sizes.
 *
 * @returns {JSX.Element} The hero section component
 */
export default function Hero() {
  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-10">
        {/* Centered quote */}
        <blockquote className="text-3xl md:text-4xl font-extrabold  tracking-wide leading-snug bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-xl">
          Auto share your Medium posts — grow reach, save time.
        </blockquote>

        {/* Two supporting sentences kept in one line */}
        <p
          className="text-lg text-gray-600 max-w-3xl"
          // If you absolutely must keep them on one visual line even on very small screens,
          // add `whitespace-nowrap` (but that may create horizontal overflow). Currently left responsive.
        >
          MediumPilot automatically shares your Medium articles to LinkedIn when
          new posts appear. Secure tokens, flexible settings and built for
          creators.
        </p>

        {/* Flow image centered below the text (covers at least 70% width, preserves aspect ratio) */}
        <div className="w-full flex justify-center mt-2">
          <img
            src={flow}
            alt="Flow diagram showing MediumPilot workflow"
            className="w-[70%] max-w-full h-auto object-contain"
          />
        </div>

        {/* Call-to-action buttons (after image as requested) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="#features"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Explore Features
          </a>

          <Link
            to="/signin"
            className="px-6 py-3 rounded-lg border border-gray-300 font-semibold bg-white hover:bg-gray-100 transition"
          >
            Get Demo
          </Link>
        </div>

        {/* Quick preview card below the CTAs */}
        <div className="w-full flex justify-center mt-6">
          <QuickPreviewCard />
        </div>
      </div>
    </section>
  );
}
