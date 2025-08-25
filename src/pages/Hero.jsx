import React from 'react';
import logo from '../assets/mediumpilot.svg';
import QuickPreviewCard from './QuickPreviewCard';

export default function Hero() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img src={logo} alt="MediumPilot" className="w-24 mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Auto share your Medium posts — grow reach, save time.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            MediumPilot automatically shares your Medium articles to LinkedIn
            when new posts appear. Secure tokens, flexible settings and built
            for creators.
          </p>

          <div className="flex gap-4">
            <a
              href="#features"
              className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Explore Features
            </a>

            
            <Link
                to="/signin"
                className="px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 font-semibold"
                aria-label="Get Demo"
            >
                Get Demo
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <QuickPreviewCard />
        </div>
      </div>
    </section>
  );
}
