import React, { useState, useEffect } from 'react';
import {
  initialWeddingData,
  initialPhotos,
  initialSchedule,
  initialBlessings,
} from './data/initialData';
import { WeddingData, GalleryPhoto, Blessing } from './types/wedding';
import { EnvelopeModal } from './components/EnvelopeModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventDetails } from './components/EventDetails';
import { Gallery } from './components/Gallery';
import { BlessingsWall } from './components/BlessingsWall';
import { Footer } from './components/Footer';
import { MusicWidget } from './components/MusicWidget';
import { SettingsModal } from './components/SettingsModal';

// Resilient storage helpers preventing crashes in sandboxed iframes and private windows
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // Storage access is restricted; ignore gracefully
  }
}

export default function App() {
  // Envelope modal: false by default so the index page is fully open and interactive immediately!
  const [showEnvelopeModal, setShowEnvelopeModal] = useState<boolean>(false);

  // Engagement data state (v7 - Itsa, 20 Khalid Basha location)
  const [wedding, setWedding] = useState<WeddingData>(() =>
    safeGet('ahmed_sama_engagement_en_v7', initialWeddingData)
  );

  // Photos state (v9 - Ahmed & Sama Original Photo with Luxury Floral Fallback)
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() =>
    safeGet('ahmed_sama_photos_en_v9', initialPhotos)
  );

  // Blessings state
  const [blessings, setBlessings] = useState<Blessing[]>(() =>
    safeGet('ahmed_sama_blessings_en_v3', initialBlessings)
  );

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persistence
  useEffect(() => {
    safeSet('ahmed_sama_engagement_en_v7', wedding);
  }, [wedding]);

  useEffect(() => {
    safeSet('ahmed_sama_photos_en_v9', photos);
  }, [photos]);

  useEffect(() => {
    safeSet('ahmed_sama_blessings_en_v3', blessings);
  }, [blessings]);

  const handleAddBlessing = (newBlessing: Blessing) => {
    setBlessings([newBlessing, ...blessings]);
  };

  const handleLikeBlessing = (id: string) => {
    setBlessings(
      blessings.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#4a1528] flex flex-col selection:bg-pink-200 selection:text-pink-900">
      {/* Optional Interactive Royal Wax Seal Envelope View */}
      {showEnvelopeModal && (
        <EnvelopeModal
          groomName={wedding.groomName}
          brideName={wedding.brideName}
          dateArabic={wedding.dateFormattedArabic}
          onOpen={() => setShowEnvelopeModal(false)}
        />
      )}

      {/* Top Bar Navigation */}
      <Navbar
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenEnvelope={() => setShowEnvelopeModal(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with Countdown & Sacred Arabic Verse */}
        <Hero wedding={wedding} />

        {/* Event Details: Date, Time, Venue (At Home) & Interactive Map */}
        <EventDetails wedding={wedding} schedule={initialSchedule} />

        {/* Curated Photo Gallery with Roses & Warmth */}
        <Gallery photos={photos} onUpdatePhotos={setPhotos} />

        {/* Blessings & Wishes Wall Guestbook */}
        <BlessingsWall
          blessings={blessings}
          onAddBlessing={handleAddBlessing}
          onLikeBlessing={handleLikeBlessing}
          groomName={wedding.groomName}
          brideName={wedding.brideName}
        />
      </main>

      {/* Footer */}
      <Footer wedding={wedding} />

      {/* Floating Ambient Music Controls */}
      <MusicWidget />

      {/* Settings & Admin Modal for Ahmed & Sama */}
      <SettingsModal
        wedding={wedding}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveWedding={(updated) => {
          setWedding(updated);
        }}
      />
    </div>
  );
}
