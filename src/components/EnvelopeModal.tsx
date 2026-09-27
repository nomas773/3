import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioPlayer } from '../utils/audioPlayer';

interface EnvelopeModalProps {
  groomName: string;
  brideName: string;
  dateArabic: string;
  onOpen: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  groomName,
  brideName,
  dateArabic,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Celebratory confetti burst
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#e11d48', '#ffffff', '#fda4af', '#fb7185'],
    });

    try {
      audioPlayer.play();
    } catch {
      // Audio autoplay handled
    }

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/70 backdrop-blur-md transition-opacity duration-700 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-full max-w-lg transition-transform duration-700 transform scale-100">
        {/* Glow behind envelope */}
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-300/30 via-rose-200/20 to-pink-400/30 rounded-3xl blur-xl" />

        {/* Envelope Container */}
        <div className="relative bg-white border border-pink-200 rounded-3xl p-8 sm:p-10 shadow-2xl text-center overflow-hidden">
          {/* Subtle Arabesque Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Corner Ornaments */}
          <div className="absolute top-3 left-3 text-pink-300 font-calligraphy text-xl">✤</div>
          <div className="absolute top-3 right-3 text-pink-300 font-calligraphy text-xl">✤</div>
          <div className="absolute bottom-3 left-3 text-pink-300 font-calligraphy text-xl">✤</div>
          <div className="absolute bottom-3 right-3 text-pink-300 font-calligraphy text-xl">✤</div>

          {/* Header */}
          <div className="mb-6">
            <p className="font-calligraphy text-lg sm:text-xl text-pink-600 tracking-wider uppercase font-semibold">
              In The Name Of God
            </p>
            <p className="text-xs text-[#7a4e63] mt-1 tracking-widest uppercase">
              Exclusive Engagement Invitation
            </p>
          </div>

          {/* Envelope Body */}
          <div className="relative my-8 py-8 px-4 rounded-2xl border border-pink-200 bg-gradient-to-b from-[#fffbfd] to-[#fff0f4] shadow-xs">
            <div className="text-center space-y-2">
              <span className="text-xs text-pink-600 font-semibold tracking-widest uppercase">
                Engagement Celebration
              </span>
              <h2 className="font-calligraphy text-3xl sm:text-4xl text-pink-gradient font-bold">
                {groomName} &amp; {brideName}
              </h2>
              <p className="text-sm text-[#5a2139] pt-1">{dateArabic} • At Home</p>
            </div>

            {/* Interactive Wax Seal */}
            <div className="relative mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={handleSealClick}
                className="group relative cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
                title="Click to break wax seal and open invitation"
              >
                {/* Wax seal outer */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#db2777] via-[#be185d] to-[#9d174d] shadow-xl border-2 border-pink-300 flex items-center justify-center p-1 relative">
                  <div className="w-16 h-16 rounded-full border border-pink-200/50 flex flex-col items-center justify-center bg-[#be185d]">
                    <span className="font-calligraphy text-xl text-white font-bold tracking-tight">
                      A &amp; S
                    </span>
                    <Heart className="w-3 h-3 text-pink-200 mt-0.5 fill-current" />
                  </div>
                </div>

                {/* Pulsing ring indicator */}
                <span className="absolute -inset-2 rounded-full border border-pink-400 animate-ping opacity-75 pointer-events-none" />
              </button>

              <p className="text-xs text-pink-600 mt-4 flex items-center gap-1.5 animate-pulse font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Tap wax seal to open invitation
              </p>
            </div>
          </div>

          {/* Skip direct button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={onOpen}
              className="text-xs text-[#7a4e63] hover:text-pink-600 transition-colors underline-offset-4 hover:underline cursor-pointer font-medium"
            >
              Skip and enter directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
