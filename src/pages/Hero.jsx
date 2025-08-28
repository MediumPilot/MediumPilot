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
    <section className="py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-8 md:gap-10">
        {/* Centered quote */}
        <blockquote className="text-3xl md:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-xl">
          Auto share your Medium posts — grow reach, save time.
        </blockquote>

        {/* Two supporting sentences kept in one line */}
        <p
          className="text-base md:text-lg text-gray-600 max-w-3xl"
          // If you absolutely must keep them on one visual line even on very small screens,
          // add `whitespace-nowrap` (but that may create horizontal overflow). Currently left responsive.
        >
          MediumPilot automatically shares your Medium articles to LinkedIn when
          new posts appear. Secure tokens, flexible settings and built for
          creators.
        </p>

        {/* Flow image centered below the text, inside a subtle card to match UI */}
        <div className="w-full flex justify-center mt-2">
          <div className="w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-3 shadow-sm hover:shadow-md transition">
            <img
              src={flow}
              alt="Flow diagram showing MediumPilot workflow"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Call-to-action buttons (after image as requested) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a href="#features" className="cta-pill lift-getdemo">
            Explore Features
          </a>

          <Link
            to="/signin"
            className="cta-pill bg-white text-slate-800 hover:bg-slate-50"
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
