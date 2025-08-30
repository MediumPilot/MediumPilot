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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuickPreviewCard from './QuickPreviewCard';
import flow from '../assets/flow.png';

export default function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    setRotate({ x, y });
  };

  const resetRotation = () => setRotate({ x: 0, y: 0 });

  return (
    <section className="py-6 md:py-14">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-8 md:gap-10">
        <blockquote
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-xl"
          style={{ transform: 'translateY(-10px)' }}
        >
          Auto share your Medium posts — grow reach, save time.
        </blockquote>

        <p className="text-base md:text-lg text-gray-600 max-w-3xl">
          MediumPilot automatically shares your Medium articles to LinkedIn when
          new posts appear. Secure tokens, flexible settings and built for
          creators.
        </p>

        {/* Tight card: inline-block so its width hugs the inner image */}
        <motion.div
          className="relative inline-block rounded-3xl bg-white shadow-lg cursor-pointer transition-shadow hover:shadow-indigo-300/30 p-2"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            width: 'fit-content', // let wrapper size itself to content
          }}
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetRotation}
        >
          {/* subtle backdrop that matches the tight size */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 opacity-20 blur-md -z-10" />

          {/* Fixed-but-responsive width for the image so card doesn't stretch */}
          <img
            src={flow}
            alt="Flow diagram showing MediumPilot workflow"
            className="h-auto object-contain rounded-2xl block"
            style={{
              width: '560px', // keep the size you liked
              maxWidth: '70vw', // but allow it to shrink on small screens
              display: 'block',
            }}
          />
        </motion.div>

        {/* CTA buttons */}
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

        <div className="w-full flex justify-center mt-6">
          <QuickPreviewCard />
        </div>
      </div>
    </section>
  );
}
