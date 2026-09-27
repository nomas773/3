import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Navigation,
  Layers,
} from 'lucide-react';
import { WeddingData, ScheduleEvent } from '../types/wedding';

interface EventDetailsProps {
  wedding: WeddingData;
  schedule: ScheduleEvent[];
}

export const EventDetails: React.FC<EventDetailsProps> = ({ wedding, schedule }) => {
  const [copied, setCopied] = useState(false);
  const [mapType, setMapType] = useState<'embed' | 'satellite'>('embed');

  const handleCopyAddress = () => {
    const fullAddress = `${wedding.venueName} - ${wedding.venueAddress}, ${wedding.city}`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    wedding.longitude - 0.008
  }%2C${wedding.latitude - 0.005}%2C${wedding.longitude + 0.008}%2C${
    wedding.latitude + 0.005
  }&layer=${mapType === 'satellite' ? 'mapnik' : 'mapnik'}&marker=${wedding.latitude}%2C${
    wedding.longitude
  }`;

  return (
    <section id="details" className="py-20 px-4 bg-[#0e0f17] relative border-t border-[#d4af37]/15">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#916f39]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a25] border border-[#d4af37]/30 text-xs text-[#d4af37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">Celebration Details</span>
          </div>
          <h2 className="font-calligraphy text-4xl sm:text-5xl font-bold text-gold-gradient">
            Date, Time &amp; Location
          </h2>
          <p className="text-sm sm:text-base text-[#bfb5a3] mt-3">
            We are honored to have you celebrate the engagement of Ahmed &amp; Sama at home in Faiyum Governorate with family and closest friends.
          </p>
        </div>

        {/* 3 Core Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Exact Date */}
          <div className="p-6 rounded-2xl bg-[#151724] border border-[#d4af37]/25 shadow-lg relative overflow-hidden group hover:border-[#d4af37]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#202336] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-5 shadow-inner">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#a89e8e]">Celebration Date</span>
            <h3 className="font-calligraphy text-2xl font-bold text-[#faedd0] mt-1 mb-2">
              {wedding.dateFormattedArabic}
            </h3>
            <p className="text-xs text-[#d4af37] font-medium">
              October 2, 2026
            </p>
            <div className="mt-4 pt-4 border-t border-[#d4af37]/15 text-xs text-[#a89e8e] leading-relaxed">
              We look forward to sharing this warm, joyful evening with you from start to finish.
            </div>
          </div>

          {/* Card 2: Exact Time */}
          <div className="p-6 rounded-2xl bg-[#151724] border border-[#d4af37]/25 shadow-lg relative overflow-hidden group hover:border-[#d4af37]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#202336] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-5 shadow-inner">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#a89e8e]">Schedule &amp; Hours</span>
            <h3 className="font-calligraphy text-2xl font-bold text-[#faedd0] mt-1 mb-2">
              {wedding.startTime} – {wedding.endTime}
            </h3>
            <p className="text-xs text-[#d4af37] font-medium">
              Reception begins promptly at {wedding.startTime}
            </p>
            <div className="mt-4 pt-4 border-t border-[#d4af37]/15 text-xs text-[#a89e8e] leading-relaxed">
              Please arrive on time to join the exchange of engagement rings and celebratory toasts.
            </div>
          </div>

          {/* Card 3: Exact Location */}
          <div className="p-6 rounded-2xl bg-[#151724] border border-[#d4af37]/25 shadow-lg relative overflow-hidden group hover:border-[#d4af37]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#202336] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-5 shadow-inner">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#a89e8e]">Venue &amp; Setting</span>
            <h3 className="font-calligraphy text-2xl font-bold text-[#faedd0] mt-1 mb-1">
              {wedding.venueName}
            </h3>
            <p className="text-xs text-[#d4af37] font-semibold mb-2">
              {wedding.hallName}
            </p>
            <p className="text-xs text-[#c5bcae] leading-relaxed">
              {wedding.venueAddress}
            </p>
            <div className="mt-4 pt-4 border-t border-[#d4af37]/15 flex items-center justify-between text-xs">
              <span className="text-[#a89e8e]">Atmosphere:</span>
              <span className="text-[#68d391] font-medium">Cozy &amp; Celebratory at Home</span>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div id="location" className="p-6 sm:p-8 rounded-3xl bg-[#131520] border border-[#d4af37]/30 shadow-2xl mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/20">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium mb-1">
                <Navigation className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">Interactive Map &amp; Directions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#faedd0]">
                Home Location on Map
              </h3>
              <p className="text-xs sm:text-sm text-[#a89e8e] mt-1">
                {wedding.venueName} • {wedding.venueAddress}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="px-3.5 py-2 text-xs font-medium text-[#faedd0] bg-[#1d2030] hover:bg-[#272b40] border border-[#d4af37]/30 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
                <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
              </button>

              <a
                href={wedding.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-[#0c0d12] bg-gradient-to-r from-[#e8d0a9] via-[#d4af37] to-[#c59d5f] rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-[#d4af37]/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-[#d4af37]/20 relative shadow-inner bg-[#1a1c29]">
            <div className="bg-[#181a27] px-4 py-2 border-b border-[#d4af37]/15 flex items-center justify-between text-xs text-[#a89e8e]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#faedd0] font-medium">{wedding.venueName}</span>
                <span className="text-[#6b7280]">·</span>
                <span>Coordinates: {wedding.latitude.toFixed(4)}, {wedding.longitude.toFixed(4)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMapType(mapType === 'embed' ? 'satellite' : 'embed')}
                  className="px-2.5 py-1 rounded bg-[#222538] hover:bg-[#2c3047] text-[#faedd0] flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                >
                  <Layers className="w-3 h-3 text-[#d4af37]" />
                  <span>{mapType === 'embed' ? 'Terrain View' : 'Standard View'}</span>
                </button>
              </div>
            </div>

            <div className="relative w-full h-80 sm:h-96">
              <iframe
                title="Ahmed and Sama Engagement Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={osmEmbedUrl}
                className="w-full h-full filter saturate-90 contrast-105"
              />
              <div className="absolute bottom-4 right-4 bg-[#0c0d12]/90 backdrop-blur-md border border-[#d4af37]/40 px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-[#d4af37] animate-bounce" />
                <div>
                  <p className="font-semibold text-[#faedd0]">{wedding.venueName}</p>
                  <p className="text-[11px] text-[#a89e8e]">Home Celebration</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#141622] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#cfc7b8]">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Street parking readily available nearby</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Location: At Home among family &amp; friends</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Dress Code: {wedding.dressCode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Program Schedule */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-calligraphy text-3xl font-bold text-gold-gradient">
              Celebration Program &amp; Itinerary
            </h3>
            <p className="text-xs sm:text-sm text-[#a89e8e] mt-2">
              A timeline of the evening&apos;s joyful moments so we can celebrate every minute together
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute top-4 bottom-4 left-6 sm:left-1/2 w-0.5 bg-gradient-to-b from-[#d4af37] via-[#c59d5f]/60 to-[#d4af37]/20 -translate-x-1/2" />

            <div className="space-y-8">
              {schedule.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    } gap-6 group`}
                  >
                    <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d4af37] border-4 border-[#0c0d12] shadow-md shadow-[#d4af37]/50 z-20 group-hover:scale-125 transition-transform" />

                    <div
                      className={`ml-14 sm:ml-0 w-full sm:w-[calc(50%-2rem)] p-5 rounded-2xl bg-[#161826] border border-[#d4af37]/20 hover:border-[#d4af37]/40 shadow-lg transition-all ${
                        isEven ? 'sm:text-right' : 'sm:text-left'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="tabular-nums font-mono">{item.time}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#faedd0] mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#a89e8e] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
