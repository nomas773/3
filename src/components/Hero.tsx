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
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#916f39]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Frame */}
      <div className="relative w-full max-w-4xl mx-auto text-center z-10">
        
        {/* Subtle royal badge */}
        <div className="inline-flex items-center justify-center p-2.5 mb-6 rounded-full border border-[#d4af37]/30 bg-[#161722]/80 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-2 px-3 text-xs tracking-widest text-[#d4af37] font-semibold uppercase">
            <span>✤</span>
            <span>Engagement Celebration</span>
            <span>✤</span>
          </div>
        </div>

        {/* Sacred Quranic Verse in Arabic */}
        <div className="max-w-3xl mx-auto mb-8 px-4" dir="rtl">
          <p className="text-xs sm:text-sm text-[#d4af37] font-semibold mb-2 tracking-widest text-center">
            بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </p>
          <p className="font-serif text-lg sm:text-2xl lg:text-3xl text-[#faedd0] font-normal leading-loose tracking-wide text-center drop-shadow-sm">
            «وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ»
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 text-[#d4af37]/60">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
            <span className="text-xs tracking-wider text-[#d4af37] font-medium">سورة الروم • الآية 21</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
          </div>
        </div>

        {/* Family Greeting */}
        <p className="text-xs sm:text-sm text-[#cfc7b8] mb-4 max-w-xl mx-auto uppercase tracking-wider">
          Together with their families <br />
          <span className="text-[#f7e1b5] font-semibold">{wedding.groomFamily}</span> &amp; <span className="text-[#f7e1b5] font-semibold">{wedding.brideFamily}</span>
        </p>

        {/* Groom & Bride Names */}
        <div className="my-6 sm:my-8 relative">
          <h1 className="font-calligraphy text-5xl sm:text-7xl lg:text-8xl font-bold text-gold-gradient tracking-wide py-2 drop-shadow-md">
            {wedding.groomName} <span className="text-3xl sm:text-5xl text-[#d4af37] font-light mx-2">&amp;</span> {wedding.brideName}
          </h1>
          <p className="font-editorial text-xs sm:text-sm text-[#c59d5f] tracking-[0.3em] uppercase mt-2">
            Engagement Celebration • Together Forever
          </p>
        </div>

        {/* Date and Venue Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#e8e4dc] mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181924]/70 border border-[#d4af37]/20">
            <span className="text-[#d4af37]">📅</span>
            <span>{wedding.dateFormattedArabic}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181924]/70 border border-[#d4af37]/20">
            <span className="text-[#d4af37]">⏰</span>
            <span>Starting at {wedding.startTime}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181924]/70 border border-[#d4af37]/20">
            <span className="text-[#d4af37]">📍</span>
            <span>{wedding.venueName}</span>
          </div>
        </div>

        {/* Countdown Timer with Tabular Numbers */}
        <div className="my-10">
          <p className="text-xs uppercase tracking-widest text-[#a89e8e] mb-4 font-semibold">
            Countdown to the Celebrated Day
          </p>
          
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#1c1e2b] to-[#12131b] border border-[#d4af37]/30 shadow-lg flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-gold-gradient tabular-nums font-mono">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#a89e8e] mt-1 font-medium uppercase tracking-wider">Days</span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-[#1c1e2b] to-[#12131b] border border-[#d4af37]/30 shadow-lg flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-gold-gradient tabular-nums font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#a89e8e] mt-1 font-medium uppercase tracking-wider">Hours</span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-[#1c1e2b] to-[#12131b] border border-[#d4af37]/30 shadow-lg flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-gold-gradient tabular-nums font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#a89e8e] mt-1 font-medium uppercase tracking-wider">Mins</span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-[#1c1e2b] to-[#12131b] border border-[#d4af37]/30 shadow-lg flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-gold-gradient tabular-nums font-mono">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#a89e8e] mt-1 font-medium uppercase tracking-wider">Secs</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Wishes & Calendar & Share */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <a
            href="#blessings"
            className="px-6 py-3 text-sm font-semibold text-[#0c0d12] bg-gradient-to-r from-[#e8d0a9] via-[#d4af37] to-[#c59d5f] rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#d4af37]/25 flex items-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>Send Wishes &amp; Blessings</span>
          </a>

          <a
            href={getGoogleCalendarUrl(wedding)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 text-xs sm:text-sm font-medium text-[#faedd0] bg-[#1a1c27] hover:bg-[#232635] border border-[#d4af37]/35 rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={() => downloadIcsFile(wedding)}
            className="px-4 py-3 text-xs sm:text-sm font-medium text-[#d1c7b7] bg-[#151620] hover:bg-[#1f212f] border border-[#d4af37]/20 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            title="Download .ics file for Apple or Outlook Calendar"
          >
            <Download className="w-4 h-4 text-[#d4af37]" />
            <span>Download .ics</span>
          </button>

          <a
            href={getWhatsAppShareUrl(wedding)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-[#25D366] bg-[#1a1c27] hover:bg-[#232635] border border-[#25D366]/30 rounded-xl transition-all flex items-center justify-center shadow-sm"
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 flex flex-col items-center justify-center text-[#8f887b] animate-bounce">
          <span className="text-[11px] mb-1 uppercase tracking-widest">Discover Event Details</span>
          <ArrowDown className="w-4 h-4 text-[#d4af37]" />
        </div>
      </div>
    </section>
  );
};
