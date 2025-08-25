import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../pages/Hero';
import Features from '../pages/Features';
import Community from '../pages/Commmunity';
import Footer from '../pages/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <Community />
      <Footer />
    </div>
  );
}
