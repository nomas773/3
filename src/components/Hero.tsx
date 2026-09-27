import React, { useState, useEffect } from 'react';
import { Calendar, Share2, Heart, ArrowDown, Download } from 'lucide-react';
import { WeddingData } from '../types/wedding';
import { getGoogleCalendarUrl, downloadIcsFile, getWhatsAppShareUrl } from '../utils/calendar';

interface HeroProps {
  wedding: WeddingData;
}

export const Hero: React.FC<HeroProps> = ({ wedding }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(wedding.dateIso).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [wedding.dateIso]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 overflow-hidden">
      {/* Background ambient romantic lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-pink-300/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-200/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-pink-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Frame */}
      <div className="relative w-full max-w-4xl mx-auto text-center z-10">
        
        {/* Subtle royal badge */}
        <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full border border-pink-200 bg-white/90 backdrop-blur-sm shadow-xs">
          <div className="flex items-center gap-2 px-3 text-xs tracking-widest text-pink-600 font-semibold uppercase">
            <span>🌸</span>
            <span>Engagement Celebration</span>
            <span>🌸</span>
          </div>
        </div>

        {/* Family Greeting */}
        <p className="text-xs sm:text-sm text-[#7a4e63] mb-4 max-w-xl mx-auto uppercase tracking-wider">
          Together with their families <br />
          <span className="text-pink-700 font-semibold">{wedding.groomFamily}</span> &amp; <span className="text-pink-700 font-semibold">{wedding.brideFamily}</span>
        </p>

        {/* Groom & Bride Names */}
        <div className="my-6 sm:my-8 relative">
          <h1 className="font-calligraphy text-5xl sm:text-7xl lg:text-8xl font-bold text-pink-gradient tracking-wide py-2 drop-shadow-sm">
            {wedding.groomName} <span className="text-3xl sm:text-5xl text-pink-400 font-light mx-2">&amp;</span> {wedding.brideName}
          </h1>
          <p className="font-editorial text-xs sm:text-sm text-pink-600 tracking-[0.3em] uppercase mt-2">
            Engagement Celebration • Together Forever
          </p>
        </div>

        {/* Date and Venue Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#4a1528] mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-pink-200/90 shadow-xs">
            <span className="text-pink-500">📅</span>
            <span className="font-medium">{wedding.dateFormattedArabic}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-pink-200/90 shadow-xs">
            <span className="text-pink-500">⏰</span>
            <span className="font-medium">Starting at {wedding.startTime}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-pink-200/90 shadow-xs">
            <span className="text-pink-500">📍</span>
            <span className="font-medium">{wedding.venueName}</span>
          </div>
        </div>

        {/* Countdown Timer with Tabular Numbers */}
        <div className="my-10">
          <p className="text-xs uppercase tracking-widest text-[#8a5770] mb-4 font-semibold">
            Countdown to the Celebrated Day
          </p>
          
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-pink-200 shadow-md shadow-pink-100/50 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-pink-gradient tabular-nums font-mono">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#8a5770] mt-1 font-medium uppercase tracking-wider">Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-pink-200 shadow-md shadow-pink-100/50 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-pink-gradient tabular-nums font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#8a5770] mt-1 font-medium uppercase tracking-wider">Hours</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-pink-200 shadow-md shadow-pink-100/50 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-pink-gradient tabular-nums font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#8a5770] mt-1 font-medium uppercase tracking-wider">Mins</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-pink-200 shadow-md shadow-pink-100/50 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-pink-gradient tabular-nums font-mono">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#8a5770] mt-1 font-medium uppercase tracking-wider">Secs</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Wishes & Calendar & Share */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <a
            href="#blessings"
            className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-xl hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-pink-300/40 flex items-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Send Wishes &amp; Blessings</span>
          </a>

          <a
            href={getGoogleCalendarUrl(wedding)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 text-xs sm:text-sm font-medium text-[#5a2139] bg-white hover:bg-pink-50 border border-pink-200 rounded-xl transition-all flex items-center gap-2 shadow-xs"
          >
            <Calendar className="w-4 h-4 text-pink-600" />
            <span>Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={() => downloadIcsFile(wedding)}
            className="px-4 py-3 text-xs sm:text-sm font-medium text-[#5a2139] bg-white hover:bg-pink-50 border border-pink-200 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            title="Download .ics file for Apple or Outlook Calendar"
          >
            <Download className="w-4 h-4 text-pink-600" />
            <span>Download .ics</span>
          </button>

          <a
            href={getWhatsAppShareUrl(wedding)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-[#25D366] bg-white hover:bg-emerald-50 border border-emerald-300 rounded-xl transition-all flex items-center justify-center shadow-xs"
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 flex flex-col items-center justify-center text-[#9d6d82] animate-bounce">
          <span className="text-[11px] mb-1 uppercase tracking-widest font-medium">Discover Event Details</span>
          <ArrowDown className="w-4 h-4 text-pink-500" />
        </div>
      </div>
    </section>
  );
};
