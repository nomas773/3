import { WeddingData } from '../types/wedding';

export function getGoogleCalendarUrl(wedding: WeddingData): string {
  const startIso = wedding.dateIso.replace(/[-:]/g, '');
  const startDate = new Date(wedding.dateIso);
  const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);
  const endIso = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const title = encodeURIComponent(`${wedding.groomName} & ${wedding.brideName}'s Engagement Celebration`);
  const details = encodeURIComponent(
    `You are cordially invited to celebrate the engagement of ${wedding.groomName} & ${wedding.brideName}.\nLocation: ${wedding.venueName} (${wedding.venueAddress})\nDate & Time: ${wedding.dateFormattedArabic} at ${wedding.startTime}`
  );
  const location = encodeURIComponent(`${wedding.venueName}, ${wedding.venueAddress}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}Z/${endIso}&details=${details}&location=${location}`;
}

export function downloadIcsFile(wedding: WeddingData) {
  const startDate = new Date(wedding.dateIso);
  const endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);

  const formatUtc = (date: Date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ahmed and Sama Engagement//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:engagement-${Date.now()}@ahmedandsama.wedding`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(startDate)}`,
    `DTEND:${formatUtc(endDate)}`,
    `SUMMARY:${wedding.groomName} & ${wedding.brideName}'s Engagement Celebration`,
    `DESCRIPTION:You are cordially invited to celebrate the engagement of ${wedding.groomName} & ${wedding.brideName} at home.`,
    `LOCATION:${wedding.venueName}, ${wedding.venueAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `engagement-${wedding.groomName.toLowerCase()}-${wedding.brideName.toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getWhatsAppShareUrl(wedding: WeddingData): string {
  const text = encodeURIComponent(
    `In the Name of God, the Most Gracious, the Most Merciful\n\n💍 ${wedding.groomName} & ${wedding.brideName} 💍\n\nWe are delighted to invite you to our Engagement Celebration!\n\n📅 Date: ${wedding.dateFormattedArabic}\n⏰ Time: Starting at ${wedding.startTime}\n📍 Location: ${wedding.venueName} (${wedding.venueAddress})\n\nView details and RSVP here:\n${window.location.href}`
  );
  return `https://api.whatsapp.com/send?text=${text}`;
}
