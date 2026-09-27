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
      colors: ['#f472b6', '#e11d48', '#ffffff', '#fda4af', '#fb7185'],
    });
  };

  return (
    <section id="blessings" className="py-20 px-4 bg-gradient-to-b from-white via-pink-50/30 to-white relative border-t border-pink-100">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-600 mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest font-semibold">Wishes &amp; Prayers</span>
          </div>
          <h2 className="font-calligraphy text-4xl sm:text-5xl font-bold text-pink-gradient">
            Wishes &amp; Warm Blessings
          </h2>
          <p className="text-sm sm:text-base text-[#7a4e63] mt-2">
            Leave a heartfelt prayer and congratulations for {groomName} &amp; {brideName} as they celebrate their engagement.
          </p>
        </div>

        {/* Input Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-pink-200 shadow-xl shadow-pink-100/50 mb-14 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1.5 uppercase tracking-wider">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ibrahim Youssef"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pink-50/40 border border-pink-200 text-xs text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d1324] mb-1.5 uppercase tracking-wider">
                  Relationship / Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Friend of Groom / Cousin"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-pink-50/40 border border-pink-200 text-xs text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3d1324] mb-1.5 uppercase tracking-wider">
                Your Congratulatory Message *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write your loving prayers and warm wishes for Ahmed & Sama..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-pink-50/40 border border-pink-200 text-xs text-[#3d1324] placeholder-pink-300 focus:outline-none focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-xl hover:brightness-105 active:scale-[0.99] transition-all shadow-md shadow-pink-200/60 flex items-center justify-center gap-2 cursor-pointer"
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
              className="p-6 rounded-2xl bg-white border border-pink-200 hover:border-pink-400 shadow-md shadow-pink-100/40 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-calligraphy text-lg font-bold text-[#3d1324]">
                      {blessing.senderName}
                    </h4>
                    <span className="text-[11px] text-pink-600 block font-semibold">
                      {blessing.relation}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8a5770]">{blessing.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#5a2139] leading-relaxed mb-4">
                  &ldquo;{blessing.message}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-pink-100 flex items-center justify-between text-xs text-[#8a5770]">
                <span className="text-[11px] text-pink-700 font-medium">Heartfelt Blessing</span>
                <button
                  type="button"
                  onClick={() => onLikeBlessing(blessing.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span className="tabular-nums font-mono text-[11px] font-semibold">{blessing.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
