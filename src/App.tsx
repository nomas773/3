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

export default function App() {
  // Envelope opening state
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(() => {
    return sessionStorage.getItem('envelope_opened') === 'true';
  });

  // Engagement data state (v7 - Itsa, 20 Khalid Basha location)
  const [wedding, setWedding] = useState<WeddingData>(() => {
    const saved = localStorage.getItem('ahmed_sama_engagement_en_v7');
    return saved ? JSON.parse(saved) : initialWeddingData;
  });

  // Photos state (v9 - Ahmed & Sama Original Photo with Luxury Floral Fallback)
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('ahmed_sama_photos_en_v9');
    return saved ? JSON.parse(saved) : initialPhotos;
  });

  // Blessings state
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    const saved = localStorage.getItem('ahmed_sama_blessings_en_v3');
    return saved ? JSON.parse(saved) : initialBlessings;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('ahmed_sama_engagement_en_v7', JSON.stringify(wedding));
  }, [wedding]);

  useEffect(() => {
    localStorage.setItem('ahmed_sama_photos_en_v9', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('ahmed_sama_blessings_en_v3', JSON.stringify(blessings));
  }, [blessings]);

  const handleOpenEnvelope = () => {
    setHasOpenedEnvelope(true);
    sessionStorage.setItem('envelope_opened', 'true');
  };

  const handleAddBlessing = (newBlessing: Blessing) => {
    setBlessings([newBlessing, ...blessings]);
  };

  const handleLikeBlessing = (id: string) => {
    setBlessings(
      blessings.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3efe6] flex flex-col selection:bg-[#c59d5f]/30 selection:text-[#faedd0]">
      {/* Interactive Royal Wax Seal Envelope Entry */}
      {!hasOpenedEnvelope && (
        <EnvelopeModal
          groomName={wedding.groomName}
          brideName={wedding.brideName}
          dateArabic={wedding.dateFormattedArabic}
          onOpen={handleOpenEnvelope}
        />
      )}

      {/* Top Bar Navigation */}
      <Navbar
        groomName={wedding.groomName}
        brideName={wedding.brideName}
        onOpenSettings={() => setIsSettingsOpen(true)}
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
