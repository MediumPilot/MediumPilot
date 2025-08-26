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

import React from 'react';
import githubLogo from '../assets/icons/github.png';
import discordLogo from '../assets/icons/discord.png';
import mediumLogo from '../assets/icons/medium.png';

/**
 * Opens a centered popup window
 *
 * Opens a new window with specified dimensions centered on the screen.
 * On mobile devices, opens in a new tab instead of a popup.
 *
 * @param {string} url - The URL to open in the popup
 */
function openCenteredPopup(url) {
  // Check if device is mobile
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // On mobile, open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  // Desktop popup configuration
  const w = 1000; // Window width
  const h = 800; // Window height

  // Calculate center position
  const left = Math.max(0, (window.screen.width - w) / 2);
  const top = Math.max(0, (window.screen.height - h) / 2);

  // Popup features string
  const features = `toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1,width=${w},height=${h},top=${top},left=${left}`;

  // Open centered popup
  window.open(url, '_blank', features);
}

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

  return (
    <section id="community" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Community</h2>
          <p className="text-gray-600 mt-2">
            Contribute, chat, and stay updated.
          </p>
        </div>

        {/* Community cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GitHub Card */}
          <div className="p-6 bg-white rounded-2xl shadow">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-900 mb-4">
              <img
                alt="Github logo"
                className="w-10 h-auto md:w-12"
                src={githubLogo}
              />
            </div>
            <h3 className="font-semibold mb-2">Contribute on GitHub</h3>
            <p className="text-sm text-gray-600 mb-4">
              Open issues, suggest features or submit PRs. We welcome
              contributors.
            </p>
            <a
              href="https://github.com/Prajwal18-MD/MediumPilot"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold"
            >
              View on GitHub
            </a>
          </div>

          {/* Discord Card */}
          <div className="p-6 bg-white rounded-2xl shadow">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 mb-4">
              <img
                alt="Discord logo"
                className="w-10 h-auto md:w-12"
                src={discordLogo}
              />
            </div>
            <h3 className="font-semibold mb-2">Join our Discord</h3>
            <p className="text-sm text-gray-600 mb-4">
              Quick help, community discussion and roadmap chat.
            </p>
            <a
              href="https://discord.gg/pZJ8dJspQu"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
            >
              Join Discord
            </a>
          </div>

          {/* Medium Card */}
          <div className="p-6 bg-white rounded-2xl shadow">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 mb-4">
              <img
                alt="Medium logo"
                className="w-10 h-auto md:w-12"
                src={mediumLogo}
              />
            </div>
            <h3 className="font-semibold mb-2">Subscribe on Medium</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to my Medium to receive the latest posts and updates
              directly from Medium.
            </p>

            {/* Medium action buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openCenteredPopup(mediumUrl);
                  alert(
                    'We opened your Medium profile — click Follow to get updates.'
                  );
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              >
                Subscribe
              </button>

              <a
                href={mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 font-semibold"
              >
                Open Medium
              </a>
            </div>

            {/* Medium subscription note */}
            <p className="text-xs text-gray-500 mt-3">
              Note: you'll need to sign in to Medium (if not already) and click{' '}
              <strong>Follow</strong> on my profile — Medium will send email
              updates to followers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
