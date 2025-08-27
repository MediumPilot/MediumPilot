/**
 * Community Section Component
 *
 * This component displays the community section of the landing page.
 * It provides links to GitHub, Discord, and Medium for community engagement
 * and includes a helper function for opening centered popups.
 *
 * @fileoverview Community section with social links and engagement
 * @author MediumPilot Team
 * @version 1.0.0
 */

import React, { useEffect, useRef } from 'react';
import githubLogo from '../assets/icons/github.png';
import discordLogo from '../assets/icons/discord.png';
import mediumLogo from '../assets/icons/medium.png';
import CommunityCard from './CommunityCard';

/**
 * Opens a centered popup window
 *
 * Opens a new window with specified dimensions centered on the screen.
 * On mobile devices, opens in a new tab instead of a popup.
 *
 * @param {string} url - The URL to open in the popup
 */

/**
 * Community Section Component
 *
 * Renders the community section with three cards for different community platforms:
 * GitHub for contributions, Discord for discussions, and Medium for updates.
 * Each card includes an icon, description, and action buttons.
 *
 * @returns {JSX.Element} The community section component
 */
export default function Community() {
  // Medium profile URL
  const mediumUrl = 'https://medium.com/@prajju.18gryphon';
  // ref for animation
  const communityRef = useRef(null)

  useEffect(() => {
      // Dynamically import the GSAP ScrollTrigger animation module to enable
      // scroll-triggered animations only when this component is mounted.
      // This approach uses code-splitting to avoid loading extra JS for small devices.
      import('../animations/useGsapAnimation').then((mod) => {
        mod.initAnimation().then((applyGsap) => {
          applyGsap(communityRef, {
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0 },
          });
        });
      });
    }, []);

  return (
    <section ref={communityRef} id="community" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold  tracking-wide leading-snug bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-xl">Community</h2>
          <p className="text-gray-600 mt-2">
            Contribute, chat, and stay updated.
          </p>
        </div>

        {/* Community cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CommunityCard
            key="Contribute On Github"
            img={githubLogo}
            title="Contribute on GitHub"
            desc="Open issues, suggest features or submit PRs. We welcome contributors."
            btndesc="View on GitHub"
            btnlink="https://github.com/Prajwal18-MD/MediumPilot"
            btncolor="#111827"
          />

          <CommunityCard
            key="Join Our Discord"
            img={discordLogo}
            title="Join our Discord"
            desc="Quick help, community discussion and roadmap chat."
            btndesc="Join Discord"
            btnlink="https://discord.gg/pZJ8dJspQu"
            btncolor="#4F46E5"
          />

          <CommunityCard
            key="Subscribe on Medium"
            img={mediumLogo}
            title="Subscribe on Medium"
            desc="Subscribe to my Medium to receive the latest posts and updates directly from Medium."
            btndesc="Subscribe"
            btncolor="#4F46E5"
            note={true}
          />
        </div>
      </div>
    </section>
  );
}
