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
      colors: ['#c59d5f', '#d4af37', '#faedd0', '#ffffff', '#e8d0a9'],
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07080b]/90 backdrop-blur-md transition-opacity duration-700 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-full max-w-lg transition-transform duration-700 transform scale-100">
        {/* Glow behind envelope */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 via-[#c59d5f]/15 to-[#aa771c]/20 rounded-2xl blur-xl" />

        {/* Envelope Container */}
        <div className="relative bg-[#161722] border border-[#d4af37]/40 rounded-2xl p-8 sm:p-10 shadow-2xl text-center overflow-hidden">
          {/* Subtle Arabesque Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Golden Corner Ornaments */}
          <div className="absolute top-3 left-3 text-[#d4af37]/40 font-calligraphy text-xl">✤</div>
          <div className="absolute top-3 right-3 text-[#d4af37]/40 font-calligraphy text-xl">✤</div>
          <div className="absolute bottom-3 left-3 text-[#d4af37]/40 font-calligraphy text-xl">✤</div>
          <div className="absolute bottom-3 right-3 text-[#d4af37]/40 font-calligraphy text-xl">✤</div>

          {/* Header */}
          <div className="mb-6">
            <p className="font-calligraphy text-lg sm:text-xl text-[#d4af37] tracking-wider uppercase font-semibold">
              In The Name Of God
            </p>
            <p className="text-xs text-[#a89e8e] mt-1 tracking-widest uppercase">
              Exclusive Engagement Invitation
            </p>
          </div>

          {/* Envelope Body */}
          <div className="relative my-8 py-8 px-4 rounded-xl border border-[#d4af37]/25 bg-gradient-to-b from-[#1b1c28] to-[#12131b] shadow-inner">
            <div className="text-center space-y-2">
              <span className="text-xs text-[#c59d5f] font-semibold tracking-widest uppercase">
                Engagement Celebration
              </span>
              <h2 className="font-calligraphy text-3xl sm:text-4xl text-gold-gradient font-bold">
                {groomName} &amp; {brideName}
              </h2>
              <p className="text-sm text-[#d1c7b7] pt-1">{dateArabic} • At Home</p>
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
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#aa2b2b] via-[#851818] to-[#590e0e] shadow-xl border-2 border-[#d4af37]/60 flex items-center justify-center p-1 relative">
                  <div className="w-16 h-16 rounded-full border border-[#f5b3b3]/30 flex flex-col items-center justify-center bg-[#721515]">
                    <span className="font-calligraphy text-xl text-[#faedd0] font-bold tracking-tight">
                      A &amp; S
                    </span>
                    <Heart className="w-3 h-3 text-[#e8b584] mt-0.5 fill-current" />
                  </div>
                </div>

                {/* Pulsing ring indicator */}
                <span className="absolute -inset-2 rounded-full border border-[#d4af37]/40 animate-ping opacity-75 pointer-events-none" />
              </button>

              <p className="text-xs text-[#c59d5f] mt-4 flex items-center gap-1.5 animate-pulse font-medium">
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
              className="text-xs text-[#8f887b] hover:text-[#d4af37] transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Skip and enter directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
