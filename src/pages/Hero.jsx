/**
 * Hero Section Component
 *
 * This component displays the main hero section of the landing page.
 * It contains the primary value proposition, call-to-action buttons,
 * and a preview card showing the product interface.
 *
 * @fileoverview Main hero section with value proposition and CTAs
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';   // ✅ added this
import logo from '../assets/mediumpilot.svg';
import QuickPreviewCard from './QuickPreviewCard';

/**
 * Hero Section Component
 *
 * Renders the main hero section with the product logo, headline,
 * description, call-to-action buttons, and a preview card.
 * Uses responsive design to adapt to different screen sizes.
 *
 * @returns {JSX.Element} The hero section component
 */
export default function Hero() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left side - Content */}
        <div className="lg:w-1/2">
          {/* Product logo */}
          <img src={logo} alt="MediumPilot" className="w-24 mb-6" />

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Auto share your Medium posts — grow reach, save time.
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            MediumPilot automatically shares your Medium articles to LinkedIn
            when new posts appear. Secure tokens, flexible settings and built
            for creators.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex gap-4">
            {/* Primary CTA - Explore Features */}
            <a
              href="#features"
              className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Explore Features
            </a>

            {/* Secondary CTA - Get Demo (used Link instead of <a>) */}
            <Link
              to="/signin"
              className="px-5 py-3 rounded-lg border border-gray-300 font-semibold bg-white hover:bg-gray-100 transition"
            >
              Get Demo
            </Link>
          </div>
        </div>

        {/* Right side - Preview card */}
        <div className="lg:w-1/2 flex justify-center">
          <QuickPreviewCard />
        </div>
      </div>
    </section>
  );
}
