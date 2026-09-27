import React from 'react';
import { SlidersHorizontal, Mail } from 'lucide-react';

interface NavbarProps {
  groomName: string;
  brideName: string;
  onOpenSettings: () => void;
  onOpenEnvelope?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  groomName,
  brideName,
  onOpenSettings,
  onOpenEnvelope,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/92 border-b border-pink-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="font-calligraphy text-2xl sm:text-3xl font-bold text-pink-gradient whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          {groomName} &amp; {brideName}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#6b4657]">
          <a
            href="#details"
            className="hover:text-pink-600 transition-colors py-1 hover:border-b-2 border-pink-500"
          >
            Event Details
          </a>
          <a
            href="#location"
            className="hover:text-pink-600 transition-colors py-1 hover:border-b-2 border-pink-500"
          >
            Location
          </a>
          <a
            href="#gallery"
            className="hover:text-pink-600 transition-colors py-1 hover:border-b-2 border-pink-500"
          >
            Photo Gallery
          </a>
          <a
            href="#blessings"
            className="hover:text-pink-600 transition-colors py-1 hover:border-b-2 border-pink-500"
          >
            Wishes &amp; Blessings
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5">
          {onOpenEnvelope && (
            <button
              type="button"
              onClick={onOpenEnvelope}
              className="p-2 text-[#6b4657] hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Open Royal Envelope Invitation"
              aria-label="Open Royal Envelope Invitation"
            >
              <Mail className="w-4 h-4 text-pink-500" />
              <span className="hidden sm:inline">Envelope</span>
            </button>
          )}

          <a
            href="#blessings"
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-lg hover:brightness-105 active:scale-95 transition-all shadow-md shadow-pink-200/60 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Send Wishes
          </a>

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 text-[#6b4657] hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors cursor-pointer"
            title="Edit event details or export guest list"
            aria-label="Edit event details"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
