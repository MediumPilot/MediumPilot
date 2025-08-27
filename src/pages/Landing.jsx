/**
 * Landing Page Component
 *
 * This component serves as the main landing page for the MediumPilot application.
 * It combines all the main sections of the landing page including hero, features,
 * community, and footer components.
 *
 * @fileoverview Main landing page that combines all sections
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React, { lazy, Suspense } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../pages/Hero';
import { LazySection } from '../Components/LazySection';

// Lazy loaded components
const Features = lazy(() => import('./Features'));
const Community = lazy(() => import('./Commmunity'));
const Footer = lazy(() => import('./Footer'));

/**
 * Landing Page Component
 *
 * Renders the complete landing page with all sections including navigation,
 * hero section, features, community, and footer. Uses a gradient background
 * for visual appeal.
 *
 * @returns {JSX.Element} The complete landing page
 */
export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-gray-50">
      {/* Navigation bar */}
      <Navbar />
      {/* Hero section with main value proposition */}
      <Hero />
      {/* Features section showcasing product capabilities */}
      <LazySection>
        <Suspense fallback={null}>
          <Features />
        </Suspense>
      </LazySection>
      {/* Community section with links to GitHub, Discord, and Medium */}
      <LazySection>
        <Suspense fallback={null}>
          <Community />
        </Suspense>
      </LazySection>
      {/* Footer with copyright and additional links */}
      <LazySection>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </LazySection>
    </div>
  );
}
