export interface WeddingData {
  groomName: string;
  brideName: string;
  groomFamily: string;
  brideFamily: string;
  dateIso: string; // "2026-11-20T19:00:00"
  dateFormattedArabic: string;
  hijriDate: string;
  startTime: string;
  endTime: string;
  venueName: string;
  hallName: string;
  venueAddress: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  dressCode: string;
  contactPhone: string;
}

export interface PhotoComment {
  id: string;
  authorName: string;
  text: string;
  timestamp: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'engagement' | 'photoshoot' | 'memories' | 'family';
  imageUrl: string;
  fallbackUrl?: string;
  date: string;
  likes: number;
  comments: PhotoComment[];
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: 'welcome' | 'zaffa' | 'banquet' | 'cake' | 'celebration';
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface RsvpEntry {
  id: string;
  name: string;
  phone: string;
  attending: boolean;
  guestsCount: number;
  dietaryPreference?: string;
  notes?: string;
  submittedAt: string;
}

export interface Blessing {
  id: string;
  senderName: string;
  relation: string;
  message: string;
  timestamp: string;
  likes: number;
}
