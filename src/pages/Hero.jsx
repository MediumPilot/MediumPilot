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
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section className="py-6 md:py-14">
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
          <div
            className="relative group perspective-[1000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            {/* Multiple glow layers for depth */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(600px circle at ${50 + mousePosition.x * 30}% ${
                  50 + mousePosition.y * 30
                }%, rgba(120, 119, 198, 0.15), transparent 40%), 
                            radial-gradient(400px circle at ${70 - mousePosition.x * 20}% ${
                              30 - mousePosition.y * 20
                            }%, rgba(255, 119, 198, 0.1), transparent 40%),
                            radial-gradient(300px circle at ${30 + mousePosition.x * 25}% ${
                              70 + mousePosition.y * 25
                            }%, rgba(120, 219, 255, 0.1), transparent 40%)`,
                filter: 'blur(40px)',
                transform: `translateZ(-10px) scale(1.1)`,
              }}
            />

            {/* Animated gradient border */}
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

            {/* Main image container with 3D transform */}
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
                boxShadow: isHovered
                  ? `0 25px 50px -12px rgba(0, 0, 0, 0.25),
                     0 0 25px rgba(120, 119, 198, 0.1),
                     inset 0 1px 0 rgba(255, 255, 255, 0.5)`
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                background: isHovered
                  ? `linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.98) 0%, 
                      rgba(249, 250, 255, 0.95) 50%, 
                      rgba(245, 247, 255, 0.92) 100%)`
                  : 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {/* Holographic overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `linear-gradient(105deg, 
                    transparent 40%, 
                    rgba(255, 255, 255, 0.7) 45%, 
                    rgba(132, 119, 198, 0.3) 50%, 
                    transparent 60%)`,
                  transform: isHovered
                    ? `translateX(${mousePosition.x * 100}px)`
                    : 'translateX(-100%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Image with 3D effect */}
              <img
                src={flow}
                alt="Flow diagram showing MediumPilot workflow"
                className="w-full h-auto object-contain rounded-lg transition-all duration-500 relative"
                style={{
                  transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                  transformStyle: 'preserve-3d',
                }}
              />

              {/* Interactive light beam */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl"
                style={{
                  transform: 'translateZ(50px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="h-full transition-all duration-700 ease-out"
                  style={{
                    background:
                      'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #ec4899 50%, #f59e0b 75%, #667eea 100%)',
                    transform: isHovered
                      ? 'translateX(0)'
                      : 'translateX(-100%)',
                    backgroundSize: '200% 100%',
                    animation: isHovered ? 'slide 2s linear infinite' : 'none',
                  }}
                />
              </div>

              {/* Corner shine effect */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
                  transform: `translateZ(60px) rotate(${mousePosition.x * 30}deg)`,
                  transformStyle: 'preserve-3d',
                  filter: 'blur(20px)',
                }}
              />

              {/* Particle effects */}
              {isHovered && (
                <>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-float-particle opacity-60" />
                  <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float-particle-delayed opacity-50" />
                  <div className="absolute top-12 left-8 w-1 h-1 bg-blue-400 rounded-full animate-float-particle-slow opacity-40" />
                </>
              )}
            </div>

            {/* Enhanced CSS animations */}
            <style jsx>{`
              @keyframes gradient-border {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }

              @keyframes slide {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }

              @keyframes float-particle {
                0% {
                  transform: translateY(0) translateX(0);
                  opacity: 0;
                }
                10% {
                  opacity: 0.6;
                }
                100% {
                  transform: translateY(-30px) translateX(10px);
                  opacity: 0;
                }
              }

              @keyframes float-particle-delayed {
                0% {
                  transform: translateY(0) translateX(0);
                  opacity: 0;
                }
                25% {
                  opacity: 0.5;
                }
                100% {
                  transform: translateY(-25px) translateX(-8px);
                  opacity: 0;
                }
              }

              @keyframes float-particle-slow {
                0% {
                  transform: translateY(0) translateX(0);
                  opacity: 0;
                }
                50% {
                  opacity: 0.4;
                }
                100% {
                  transform: translateY(-20px) translateX(5px);
                  opacity: 0;
                }
              }

              .animate-gradient-border {
                animation: gradient-border 3s ease infinite;
              }

              .animate-float-particle {
                animation: float-particle 2s ease-out infinite;
              }

              .animate-float-particle-delayed {
                animation: float-particle-delayed 2.5s ease-out infinite;
              }

              .animate-float-particle-slow {
                animation: float-particle-slow 3s ease-out infinite;
              }
            `}</style>
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
