/**
 * Feature Card Component
 *
 * This component displays a single feature card in the features section.
 * It shows an icon, title, and description for a product feature
 * with hover effects and consistent styling.
 *
 * @fileoverview Individual feature card component
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import useHandleMouseMove from '../hooks/useHandleMouseMove';

/**
 * Feature Card Component
 *
 * Renders a card displaying a single feature with an icon, title, and description.
 * Includes hover effects for better user interaction and visual appeal.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The feature title
 * @param {string} props.desc - The feature description
 * @param {string} props.icon - The SVG icon path for the feature
 * @returns {JSX.Element} The feature card component
 */
export default function FeatureCard({ title, desc, icon }) {
  const {
    mousePosition,
    handleMouseMove,
    handleMouseLeave,
    isHovered,
    setIsHovered,
  } = useHandleMouseMove();

  return (
    <div
      className="relative group perspective-[1000px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Multiple glow layers for depth */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
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
        className={`absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${
          isHovered ? 'animate-gradient-border' : ''
        }`}
        style={{
          background:
            'linear-gradient(45deg, #ff6ec4, #7873f5, #4ade80, #fbbf24, #ff6ec4)',
          backgroundSize: '300% 300%',
          zIndex: -1,
        }}
      />

      {/* Main card with 3D transform */}
      <div
        className="relative p-7 bg-white/95 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20
                   transition-all duration-500 ease-out overflow-hidden"
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
            : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
          background: isHovered
            ? `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.98) 0%, 
                rgba(249, 250, 255, 0.95) 50%, 
                rgba(245, 247, 255, 0.92) 100%)`
            : 'rgba(255, 255, 255, 0.95)',
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

        {/* Icon container with float animation */}
        <div
          className="relative w-16 h-16 flex items-center justify-center rounded-2xl mb-6 overflow-hidden
                     transform transition-all duration-500 group-hover:scale-110"
          style={{
            transform: isHovered
              ? `translateZ(40px) rotateZ(${mousePosition.x * 10}deg) scale(1.1)`
              : 'translateZ(0px) rotateZ(0deg) scale(1)',
            transformStyle: 'preserve-3d',
            background: isHovered
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            boxShadow: isHovered
              ? '0 10px 30px rgba(102, 126, 234, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
              : '0 4px 10px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Inner glow for icon */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
            }}
          />

          {/* Rotating shimmer effect */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${
              isHovered ? 'animate-rotate-shimmer' : ''
            }`}
            style={{
              background:
                'conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              filter: 'blur(10px)',
            }}
          />

          <img
            src={icon}
            alt={title}
            className="w-8 h-8 transition-all duration-500 relative z-10"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              filter: isHovered
                ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) brightness(0) invert(1)'
                : 'brightness(0) saturate(100%) invert(39%) sepia(57%) saturate(1739%) hue-rotate(217deg) brightness(94%) contrast(86%)',
            }}
          />
        </div>

        {/* Feature title with animated gradient */}
        <h3
          className="font-bold text-xl mb-3 transition-all duration-500 relative"
          style={{
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            background: isHovered
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ec4899 100%)'
              : 'none',
            WebkitBackgroundClip: isHovered ? 'text' : 'none',
            WebkitTextFillColor: isHovered ? 'transparent' : '#1f2937',
            backgroundClip: isHovered ? 'text' : 'none',
            textShadow: isHovered ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          {title}
        </h3>

        {/* Feature description with enhanced typography */}
        <p
          className="text-sm leading-relaxed transition-all duration-500 relative"
          style={{
            color: isHovered ? '#4b5563' : '#6b7280',
            transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {desc}
        </p>

        {/* Interactive light beam */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-3xl"
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
              transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
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

        @keyframes rotate-shimmer {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
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
          20% {
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

        .animate-rotate-shimmer {
          animation: rotate-shimmer 3s linear infinite;
        }

        .animate-float-particle {
          animation: float-particle 2s ease-out infinite;
        }

        .animate-float-particle-delayed {
          animation: float-particle-delayed 2.5s ease-out infinite;
          animation-delay: 0.5s;
        }

        .animate-float-particle-slow {
          animation: float-particle-slow 3s ease-out infinite;
          animation-delay: 1s;
        }

        .perspective-\\[1000px\\] {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
