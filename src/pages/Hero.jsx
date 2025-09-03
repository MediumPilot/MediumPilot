/**
 * Hero Section Component
 *
 * Main hero section with headline, supporting text, flow diagram, CTAs, and preview card.
 * Includes animated gradients, 3D hover effects, and scroll-triggered animations.
 *
 * @fileoverview Enhanced hero section with motion and accessibility improvements
 * @version 1.1.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuickPreviewCard from './QuickPreviewCard';
import flow from '../assets/flow.png';
import useHandleMouseMove from '../hooks/useHandleMouseMove';

export default function Hero() {
  const {
    mousePosition,
    isHovered,
    setIsHovered,
    handleMouseMove,
    handleMouseLeave,
  } = useHandleMouseMove();

  return (
    <section className="py-8 md:py-16">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-8 md:gap-12">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-xl"
        >
          Auto share your Medium posts — grow reach, save time.
        </motion.h1>

        {/* Supporting paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative w-full max-w-3xl"
        >
          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-prose mx-auto px-5 py-4 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm border border-slate-200 transition-all duration-500 hover:shadow-md hover:bg-white/90">
            <span className="font-medium bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              MediumPilot
            </span>{' '}
            automatically shares your Medium articles to LinkedIn whenever you
            publish. It’s built with{' '}
            <span className="underline decoration-pink-400 decoration-2 underline-offset-2">
              secure tokens
            </span>
            , offers{' '}
            <span className="italic text-slate-800">flexible settings</span>,
            and is designed to save time for{' '}
            <span className="font-semibold text-purple-600">
              creators like you
            </span>
            .
          </p>
        </motion.div>

        {/* Flow diagram with hover depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="w-full flex justify-center mt-2"
        >
          <div
            className="relative group perspective-[1000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            {/* Glow layers */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(600px circle at ${
                  50 + mousePosition.x * 30
                }% ${50 + mousePosition.y * 30}%, rgba(120, 119, 198, 0.15), transparent 40%), 
                            radial-gradient(400px circle at ${
                              70 - mousePosition.x * 20
                            }% ${30 - mousePosition.y * 20}%, rgba(255, 119, 198, 0.1), transparent 40%),
                            radial-gradient(300px circle at ${
                              30 + mousePosition.x * 25
                            }% ${70 + mousePosition.y * 25}%, rgba(120, 219, 255, 0.1), transparent 40%)`,
                filter: 'blur(40px)',
                transform: `translateZ(-10px) scale(1.1)`,
              }}
            />

            {/* Gradient border */}
            <div
              className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                isHovered ? 'animate-gradient-border' : ''
              }`}
              style={{
                background:
                  'linear-gradient(45deg, #ff6ec4, #7873f5, #4ade80, #fbbf24, #ff6ec4)',
                backgroundSize: '300% 300%',
                zIndex: -1,
              }}
            />

            {/* Flow image */}
            <div
              className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-3 shadow-sm hover:shadow-md transition-all duration-500 ease-out overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered
                  ? `perspective(1000px) 
                     rotateX(${mousePosition.y * -5}deg) 
                     rotateY(${mousePosition.x * 5}deg) 
                     translateZ(20px) 
                     scale(1.02)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
              }}
            >
              <img
                src={flow}
                alt="Flow diagram showing MediumPilot workflow"
                className="w-full h-auto object-contain rounded-lg transition-all duration-500 relative"
                style={{
                  transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                  transformStyle: 'preserve-3d',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <a
            href="#features"
            aria-label="Explore product features"
            className="cta-pill lift-getdemo hover:scale-105 transition-transform"
          >
            Explore Features
          </a>
          <Link
            to="/signin"
            aria-label="Sign in and get demo"
            className="cta-pill bg-white text-slate-800 hover:bg-slate-50 hover:scale-105 transition-transform"
          >
            Get Demo
          </Link>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="w-full flex justify-center mt-6"
        >
          <QuickPreviewCard />
        </motion.div>
      </div>
    </section>
  );
}
