import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioPlayer } from '../utils/audioPlayer';

export const MusicWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = audioPlayer.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    audioPlayer.toggle();
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <div className="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-full bg-[#121420]/90 backdrop-blur-md border border-[#d4af37]/35 shadow-xl transition-all hover:border-[#d4af37]/60">
        <button
          type="button"
          onClick={handleToggle}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#0c0d12] shadow-md shadow-[#d4af37]/40'
              : 'bg-[#1e2133] text-[#a89e8e] hover:text-[#faedd0]'
          }`}
          title={isPlaying ? 'Pause Ambient Melody' : 'Play Celebration Melody'}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold text-[#faedd0] flex items-center gap-1">
            <Music className="w-3 h-3 text-[#d4af37]" />
            <span>Celebration Notes</span>
          </span>
          <span className="text-[9px] text-[#a89e8e]">
            {isPlaying ? 'Playing Ambient Sound' : 'Tap to Play'}
          </span>
        </div>
      </div>
    </div>
  );
};
