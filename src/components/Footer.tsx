import React from 'react';
import { Heart } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface FooterProps {
  wedding: WeddingData;
}

export const Footer: React.FC<FooterProps> = ({ wedding }) => {
  return (
    <footer className="py-14 px-4 bg-gradient-to-b from-white via-pink-50/60 to-pink-100/50 border-t border-pink-200 text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-pink-300 bg-white text-pink-600 font-calligraphy text-xl font-bold shadow-xs">
          {wedding.groomName[0]} &amp; {wedding.brideName[0]}
        </div>

        <h3 className="font-calligraphy text-3xl font-bold text-pink-gradient">
          {wedding.groomName} &amp; {wedding.brideName}
        </h3>

        <p className="text-xs sm:text-sm text-[#7a4e63] max-w-md mx-auto leading-relaxed">
          We thank God for blessing our union, and we thank each and every one of you for your love, support, and presence in our lives.
        </p>

        <div className="pt-6 border-t border-pink-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9d6d82]">
          <span className="font-medium">{wedding.dateFormattedArabic} • {wedding.venueName}</span>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for Ahmed &amp; Sama&apos;s Engagement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
