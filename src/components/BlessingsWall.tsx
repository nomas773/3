import React, { useState } from 'react';
import { Heart, Send, MessageSquareHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Blessing } from '../types/wedding';

interface BlessingsWallProps {
  blessings: Blessing[];
  onAddBlessing: (blessing: Blessing) => void;
  onLikeBlessing: (id: string) => void;
  groomName: string;
  brideName: string;
}

export const BlessingsWall: React.FC<BlessingsWallProps> = ({
  blessings,
  onAddBlessing,
  onLikeBlessing,
  groomName,
  brideName,
}) => {
  const [senderName, setSenderName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    const newBlessing: Blessing = {
      id: `bless_${Date.now()}`,
      senderName: senderName.trim(),
      relation: relation.trim() || 'Dear Friend & Well-wisher',
      message: message.trim(),
      timestamp: 'Just now',
      likes: 1,
    };

    onAddBlessing(newBlessing);
    setSenderName('');
    setRelation('');
    setMessage('');

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#c59d5f', '#d4af37', '#ffffff'],
    });
  };

  return (
    <section id="blessings" className="py-20 px-4 bg-[#0c0e16] relative border-t border-[#d4af37]/15">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181a25] border border-[#d4af37]/30 text-xs text-[#d4af37] mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">Wishes &amp; Prayers</span>
          </div>
          <h2 className="font-calligraphy text-4xl sm:text-5xl font-bold text-gold-gradient">
            Wishes &amp; Warm Blessings
          </h2>
          <p className="text-sm sm:text-base text-[#bfb5a3] mt-2">
            Leave a heartfelt prayer and congratulations for {groomName} &amp; {brideName} as they celebrate their engagement.
          </p>
        </div>

        {/* Input Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#141624] border border-[#d4af37]/30 shadow-xl mb-14 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#faedd0] mb-1.5 uppercase tracking-wider">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ibrahim Youssef"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-xs text-[#faedd0] placeholder-[#6b7280] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#faedd0] mb-1.5 uppercase tracking-wider">
                  Relationship / Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Friend of Groom / Cousin"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-xs text-[#faedd0] placeholder-[#6b7280] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#faedd0] mb-1.5 uppercase tracking-wider">
                Your Congratulatory Message *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write your loving prayers and warm wishes for Ahmed & Sama..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1017] border border-[#d4af37]/30 text-xs text-[#faedd0] placeholder-[#6b7280] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-bold text-[#0c0d12] bg-gradient-to-r from-[#e8d0a9] via-[#d4af37] to-[#c59d5f] rounded-xl hover:brightness-110 active:scale-[0.99] transition-all shadow-md shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Your Warm Wishes</span>
            </button>
          </form>
        </div>

        {/* Blessings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blessings.map((blessing) => (
            <div
              key={blessing.id}
              className="p-6 rounded-2xl bg-[#131522] border border-[#d4af37]/20 hover:border-[#d4af37]/40 shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-calligraphy text-lg font-bold text-[#faedd0]">
                      {blessing.senderName}
                    </h4>
                    <span className="text-[11px] text-[#d4af37] block font-medium">
                      {blessing.relation}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#6b7280]">{blessing.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#cfc7b8] leading-relaxed mb-4">
                  &ldquo;{blessing.message}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between text-xs text-[#a89e8e]">
                <span className="text-[11px] text-[#8c8272]">Heartfelt Blessing</span>
                <button
                  type="button"
                  onClick={() => onLikeBlessing(blessing.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1c1f30] text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span className="tabular-nums font-mono text-[11px]">{blessing.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
