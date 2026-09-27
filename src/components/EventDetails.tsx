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
    <section id="details" className="py-20 px-4 bg-gradient-to-b from-white via-pink-50/30 to-white relative border-t border-pink-100">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-600 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest font-semibold">Celebration Details</span>
          </div>
          <h2 className="font-calligraphy text-4xl sm:text-5xl font-bold text-pink-gradient">
            Date, Time &amp; Location
          </h2>
          <p className="text-sm sm:text-base text-[#7a4e63] mt-3">
            We are honored to have you celebrate the engagement of Ahmed &amp; Sama at home in Itsa, Faiyum Governorate with family and closest friends.
          </p>
        </div>

        {/* 3 Core Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Exact Date */}
          <div className="p-6 rounded-2xl bg-white border border-pink-200 shadow-md shadow-pink-100/50 relative overflow-hidden group hover:border-pink-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 mb-5 shadow-xs">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#8a5770] font-medium">Celebration Date</span>
            <h3 className="font-calligraphy text-2xl font-bold text-[#3d1324] mt-1 mb-2">
              {wedding.dateFormattedArabic}
            </h3>
            <p className="text-xs text-pink-600 font-semibold">
              Friday, October 2, 2026
            </p>
            <div className="mt-4 pt-4 border-t border-pink-100 text-xs text-[#7a4e63] leading-relaxed">
              We look forward to sharing this warm, joyful evening with you from start to finish.
            </div>
          </div>

          {/* Card 2: Exact Time */}
          <div className="p-6 rounded-2xl bg-white border border-pink-200 shadow-md shadow-pink-100/50 relative overflow-hidden group hover:border-pink-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 mb-5 shadow-xs">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#8a5770] font-medium">Schedule &amp; Hours</span>
            <h3 className="font-calligraphy text-2xl font-bold text-[#3d1324] mt-1 mb-2">
              {wedding.startTime} – {wedding.endTime}
            </h3>
            <p className="text-xs text-pink-600 font-semibold">
              Reception begins promptly at {wedding.startTime}
            </p>
            <div className="mt-4 pt-4 border-t border-pink-100 text-xs text-[#7a4e63] leading-relaxed">
              Please arrive on time to join the exchange of engagement rings and celebratory toasts.
            </div>
          </div>

          {/* Card 3: Exact Location */}
          <div className="p-6 rounded-2xl bg-white border border-pink-200 shadow-md shadow-pink-100/50 relative overflow-hidden group hover:border-pink-400 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 mb-5 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-wider text-[#8a5770] font-medium">Venue &amp; Setting</span>
            <h3 className="font-calligraphy text-2xl font-bold text-[#3d1324] mt-1 mb-1">
              {wedding.venueName}
            </h3>
            <p className="text-xs text-pink-600 font-semibold mb-2">
              {wedding.hallName}
            </p>
            <p className="text-xs text-[#5a2139] leading-relaxed">
              {wedding.venueAddress}
            </p>
            <div className="mt-4 pt-4 border-t border-pink-100 flex items-center justify-between text-xs">
              <span className="text-[#8a5770]">Atmosphere:</span>
              <span className="text-pink-600 font-medium">Cozy &amp; Celebratory at Home</span>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div id="location" className="p-6 sm:p-8 rounded-3xl bg-white border border-pink-200 shadow-xl shadow-pink-100/50 mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-pink-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-pink-600 font-medium mb-1">
                <Navigation className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider font-semibold">Interactive Map &amp; Directions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#3d1324]">
                Home Location on Map
              </h3>
              <p className="text-xs sm:text-sm text-[#7a4e63] mt-1">
                {wedding.venueName} • {wedding.venueAddress}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="px-3.5 py-2 text-xs font-medium text-[#4a1528] bg-pink-50 hover:bg-pink-100/80 border border-pink-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-pink-600" />}
                <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
              </button>

              <a
                href={wedding.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-xl hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-pink-200/60"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-pink-200 relative shadow-inner bg-pink-50/40">
            <div className="bg-pink-50/90 px-4 py-2 border-b border-pink-200 flex items-center justify-between text-xs text-[#7a4e63]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-[#3d1324] font-semibold">{wedding.venueName}</span>
                <span className="text-pink-300">·</span>
                <span>Coordinates: {wedding.latitude.toFixed(4)}, {wedding.longitude.toFixed(4)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMapType(mapType === 'embed' ? 'satellite' : 'embed')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-pink-200 hover:bg-pink-100 text-[#4a1528] flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                >
                  <Layers className="w-3 h-3 text-pink-600" />
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
                className="w-full h-full filter saturate-95 contrast-100"
              />
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-pink-200 px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-pink-600 animate-bounce" />
                <div>
                  <p className="font-bold text-[#3d1324]">{wedding.venueName}</p>
                  <p className="text-[11px] text-[#7a4e63]">Home Celebration</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-pink-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5a2139]">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Street parking readily available nearby</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Location: At Home among family &amp; friends</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Dress Code: {wedding.dressCode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Program Schedule */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-calligraphy text-3xl font-bold text-pink-gradient">
              Celebration Program &amp; Itinerary
            </h3>
            <p className="text-xs sm:text-sm text-[#7a4e63] mt-2">
              A timeline of the evening&apos;s joyful moments so we can celebrate every minute together
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute top-4 bottom-4 left-6 sm:left-1/2 w-0.5 bg-gradient-to-b from-pink-400 via-rose-300 to-pink-200 -translate-x-1/2" />

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
                    <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 border-4 border-white shadow-md shadow-pink-300 z-20 group-hover:scale-125 transition-transform" />

                    <div
                      className={`ml-14 sm:ml-0 w-full sm:w-[calc(50%-2rem)] p-5 rounded-2xl bg-white border border-pink-200 hover:border-pink-400 shadow-md shadow-pink-100/40 transition-all ${
                        isEven ? 'sm:text-right' : 'sm:text-left'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-pink-600 mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="tabular-nums font-mono">{item.time}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#3d1324] mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#7a4e63] leading-relaxed">
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
