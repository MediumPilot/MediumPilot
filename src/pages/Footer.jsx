import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} MediumPilot — Built with ❤️
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/Prajwal18-MD/MediumPilot"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-700 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/pZJ8dJspQu"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-700 hover:underline"
          >
            Discord
          </a>
          <a href="/privacy" className="text-sm text-gray-700 hover:underline">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
