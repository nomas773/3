import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { audioPlayer, CURRENT_TRACK } from '../utils/audioPlayer';

export const MusicWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(75);

  useEffect(() => {
    // Ensure YouTube player is loaded in background
    audioPlayer.initPlayer();

    const unsub = audioPlayer.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    audioPlayer.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    audioPlayer.setVolume(val);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-[calc(100vw-2.5rem)]">
      {/* Expanded Mini-Player Card */}
      {isExpanded && (
        <div className="mb-2 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-pink-200 shadow-2xl shadow-pink-200/50 w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-pink-100 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>أغنية الحفل الموسيقية</span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-1 text-[#7a4e63] hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors cursor-pointer"
              title="إغلاق اللوحة"
              aria-label="إغلاق اللوحة"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail & Track Details */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-pink-100 border border-pink-200 shrink-0 shadow-xs">
              <img
                src={CURRENT_TRACK.thumbnailUrl}
                alt={CURRENT_TRACK.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80';
                }}
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-pink-900/30 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-white rounded-full animate-bounce h-2" />
                    <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.2s] h-3.5" />
                    <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.4s] h-2.5" />
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-hidden flex-1 text-right" dir="rtl">
              <h4 className="text-xs font-bold text-[#3d1324] truncate">
                {CURRENT_TRACK.title}
              </h4>
              <p className="text-[11px] text-pink-600 truncate mt-0.5 font-medium">
                {CURRENT_TRACK.artist}
              </p>
              <span className="inline-block text-[10px] text-[#8a5770] mt-1 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                من يوتيوب • YouTube
              </span>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <VolumeX className="w-3.5 h-3.5 text-[#8a5770] shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-pink-500 h-1.5 bg-pink-100 rounded-lg cursor-pointer"
              title="مستوى الصوت"
            />
            <Volume2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
          </div>

          {/* Quick External Link */}
          <a
            href={CURRENT_TRACK.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 text-xs font-medium text-pink-700 bg-pink-50 hover:bg-pink-100/80 border border-pink-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>فتح في تطبيق YouTube</span>
            <ExternalLink className="w-3 h-3 text-pink-600" />
          </a>
        </div>
      )}

      {/* Floating Compact Bar */}
      <div className="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-full bg-white/95 backdrop-blur-md border border-pink-200 shadow-xl shadow-pink-100/60 transition-all hover:border-pink-300">
        <button
          type="button"
          onClick={handleToggle}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-md shadow-pink-200'
              : 'bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-700'
          }`}
          title={isPlaying ? 'إيقاف الأغنية مؤقتاً' : `تشغيل أغنية الحفل (${CURRENT_TRACK.artist})`}
          aria-label={isPlaying ? 'إيقاف الأغنية' : 'تشغيل الأغنية'}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-col text-left cursor-pointer select-none max-w-[170px] sm:max-w-[210px]"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#3d1324] truncate">
              {CURRENT_TRACK.title}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-pink-500 rounded-full animate-bounce h-2" />
                <span className="w-0.5 bg-pink-500 rounded-full animate-bounce [animation-delay:0.15s] h-3" />
                <span className="w-0.5 bg-pink-500 rounded-full animate-bounce [animation-delay:0.3s] h-1.5" />
              </span>
            )}
          </div>
          <span className="text-[9px] text-[#8a5770] flex items-center gap-1">
            <Music className="w-2.5 h-2.5 text-pink-500" />
            <span className="truncate">{CURRENT_TRACK.artist} • {isPlaying ? 'يعمل الآن' : 'انقر للتشغيل'}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-[#8a5770] hover:text-pink-600 transition-colors cursor-pointer"
          title={isExpanded ? 'طي الخيارات' : 'تفاصيل الأغنية'}
          aria-label="تفاصيل الأغنية"
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
