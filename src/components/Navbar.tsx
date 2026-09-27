import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  groomName: string;
  brideName: string;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  groomName,
  brideName,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0c0d12]/85 border-b border-[#d4af37]/20 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="font-calligraphy text-2xl sm:text-3xl font-bold text-gold-gradient whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          {groomName} &amp; {brideName}
        </a>

        {/* Zone 2: 4-6 clean text navigation links (Story section removed as requested) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#d1c7b7]">
          <a
            href="#details"
            className="hover:text-[#d4af37] transition-colors py-1 hover:border-b-2 border-[#d4af37]"
          >
            Event Details
          </a>
          <a
            href="#location"
            className="hover:text-[#d4af37] transition-colors py-1 hover:border-b-2 border-[#d4af37]"
          >
            Location
          </a>
          <a
            href="#gallery"
            className="hover:text-[#d4af37] transition-colors py-1 hover:border-b-2 border-[#d4af37]"
          >
            Photo Gallery
          </a>
          <a
            href="#blessings"
            className="hover:text-[#d4af37] transition-colors py-1 hover:border-b-2 border-[#d4af37]"
          >
            Wishes &amp; Blessings
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="#blessings"
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#0c0d12] bg-gradient-to-r from-[#e8d0a9] via-[#d4af37] to-[#c59d5f] rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#d4af37]/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Send Wishes
          </a>

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 text-[#a89e8e] hover:text-[#d4af37] hover:bg-[#1a1c26] rounded-lg transition-colors cursor-pointer"
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
