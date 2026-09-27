import { WeddingData, GalleryPhoto, ScheduleEvent, Blessing } from '../types/wedding';

export const initialWeddingData: WeddingData = {
  groomName: 'Ahmed',
  brideName: 'Sama',
  groomFamily: 'The Family of El-Gabalawy',
  brideFamily: 'The Family of Mr. Adel',
  dateIso: '2026-10-02T19:00:00',
  dateFormattedArabic: 'Friday, October 2, 2026',
  hijriDate: 'October 2, 2026',
  startTime: '7:00 PM',
  endTime: '11:30 PM',
  venueName: 'At Home - Itsa',
  hallName: 'The Family Residence',
  venueAddress: '20 Khalid Basha, Qesm El Faiyum, Itsa, Al Fayyum, Egypt',
  city: 'Itsa, Faiyum',
  country: 'Egypt',
  latitude: 29.3084,
  longitude: 30.8428,
  googleMapsUrl: 'https://maps.google.com/?q=20+Khalid+Basha,+Qesm+El+Faiyum,+Al+Fayyum,+Egypt',
  dressCode: 'Cocktail & Elegant Evening Attire',
  contactPhone: '+20 100 123 4567',
};

// Rich, floral, romantic high-detail vector artworks brimming with roses, blossoms, golden glow and love
const floralRingsArtwork = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="100%" height="100%">
<defs>
  <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
    <stop offset="0%" stop-color="%23381a29"/>
    <stop offset="45%" stop-color="%2322121c"/>
    <stop offset="100%" stop-color="%230d070b"/>
  </radialGradient>
  <radialGradient id="roseRed" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ff5e7e"/>
    <stop offset="50%" stop-color="%23c2185b"/>
    <stop offset="100%" stop-color="%23600028"/>
  </radialGradient>
  <radialGradient id="roseBlush" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ffe4ea"/>
    <stop offset="50%" stop-color="%23f48fb1"/>
    <stop offset="100%" stop-color="%23ad1457"/>
  </radialGradient>
  <radialGradient id="rosePeach" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ffeedb"/>
    <stop offset="50%" stop-color="%23ffab91"/>
    <stop offset="100%" stop-color="%23d84315"/>
  </radialGradient>
  <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="%23ffffff"/>
    <stop offset="25%" stop-color="%23fff2cc"/>
    <stop offset="60%" stop-color="%23d4af37"/>
    <stop offset="100%" stop-color="%238c6418"/>
  </linearGradient>
  <filter id="softGlow">
    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
<rect width="900" height="650" fill="url(%23bgGlow)"/>
<!-- Scattered Soft Rose Petals & Golden Bokeh -->
<g opacity="0.35">
  <circle cx="150" cy="120" r="80" fill="%23f48fb1" filter="blur(30px)"/>
  <circle cx="750" cy="140" r="90" fill="%23ffab91" filter="blur(30px)"/>
  <circle cx="450" cy="500" r="110" fill="%23c2185b" filter="blur(40px)"/>
</g>
<!-- Twinkling fairy dust -->
<g fill="%23fff4db" opacity="0.8">
  <circle cx="220" cy="180" r="2.5"/><circle cx="280" cy="130" r="3"/><circle cx="620" cy="160" r="2.5"/>
  <circle cx="680" cy="220" r="3.5"/><circle cx="180" cy="380" r="2"/><circle cx="740" cy="390" r="3"/>
  <polygon points="450,110 453,117 460,120 453,123 450,130 447,123 440,120 447,117" fill="%23ffd54f"/>
  <polygon points="250,260 252,265 258,267 252,269 250,275 248,269 242,267 248,265" fill="%23ffd54f"/>
  <polygon points="650,270 652,275 658,277 652,279 650,285 648,279 642,277 648,275" fill="%23ffd54f"/>
</g>
<!-- Lush Blooming Floral Bed -->
<g transform="translate(0, 80)">
  <!-- Greenery leaves -->
  <path d="M120,420 Q160,370 210,400 Q160,430 120,420 Z" fill="%232e4d34"/>
  <path d="M780,420 Q740,370 690,400 Q740,430 780,420 Z" fill="%232e4d34"/>
  <path d="M260,480 Q300,430 350,460 Q300,490 260,480 Z" fill="%233b5e43"/>
  <path d="M640,480 Q600,430 550,460 Q600,490 640,480 Z" fill="%233b5e43"/>
  <!-- Rich blooming roses at bottom -->
  <!-- Left rose bouquet cluster -->
  <circle cx="180" cy="460" r="50" fill="url(%23roseRed)"/>
  <circle cx="180" cy="460" r="38" fill="none" stroke="%23ffe4ea" stroke-width="2.5" opacity="0.4"/>
  <circle cx="180" cy="460" r="24" fill="none" stroke="%23ff80ab" stroke-width="3" opacity="0.6"/>
  <circle cx="180" cy="460" r="10" fill="%23ff4081"/>

  <circle cx="260" cy="420" r="60" fill="url(%23rosePeach)"/>
  <circle cx="260" cy="420" r="45" fill="none" stroke="%23fff" stroke-width="2.5" opacity="0.4"/>
  <circle cx="260" cy="420" r="28" fill="none" stroke="%23ffab91" stroke-width="3" opacity="0.6"/>
  <circle cx="260" cy="420" r="12" fill="%23ff7043"/>

  <!-- Right rose bouquet cluster -->
  <circle cx="720" cy="460" r="50" fill="url(%23roseRed)"/>
  <circle cx="720" cy="460" r="38" fill="none" stroke="%23ffe4ea" stroke-width="2.5" opacity="0.4"/>
  <circle cx="720" cy="460" r="24" fill="none" stroke="%23ff80ab" stroke-width="3" opacity="0.6"/>
  <circle cx="720" cy="460" r="10" fill="%23ff4081"/>

  <circle cx="640" cy="420" r="60" fill="url(%23roseBlush)"/>
  <circle cx="640" cy="420" r="45" fill="none" stroke="%23fff" stroke-width="2.5" opacity="0.4"/>
  <circle cx="640" cy="420" r="28" fill="none" stroke="%23f48fb1" stroke-width="3" opacity="0.6"/>
  <circle cx="640" cy="420" r="12" fill="%23ec407a"/>

  <!-- Center rich rose bed -->
  <circle cx="370" cy="470" r="55" fill="url(%23roseRed)"/>
  <circle cx="530" cy="470" r="55" fill="url(%23rosePeach)"/>
  <circle cx="450" cy="480" r="65" fill="url(%23roseBlush)"/>
  <circle cx="450" cy="480" r="48" fill="none" stroke="%23fff" stroke-width="3" opacity="0.5"/>
  <circle cx="450" cy="480" r="30" fill="none" stroke="%23f48fb1" stroke-width="3.5" opacity="0.7"/>
  <circle cx="450" cy="480" r="14" fill="%23e91e63"/>
</g>
<!-- Intertwined Brilliant Gold Engagement Rings with Diamond Sparkle -->
<g transform="translate(450, 240)" filter="url(%23softGlow)">
  <!-- Glow Behind Rings -->
  <circle cx="0" cy="0" r="130" fill="%23ffd54f" opacity="0.12" filter="blur(20px)"/>
  <!-- Left Ring -->
  <circle cx="-50" cy="10" r="85" fill="none" stroke="url(%23goldRing)" stroke-width="15"/>
  <circle cx="-50" cy="10" r="85" fill="none" stroke="%23ffffff" stroke-width="2.5" opacity="0.7"/>
  <!-- Right Ring (Engagement Solitaire) -->
  <circle cx="50" cy="10" r="85" fill="none" stroke="url(%23goldRing)" stroke-width="15"/>
  <circle cx="50" cy="10" r="85" fill="none" stroke="%23ffffff" stroke-width="2.5" opacity="0.7"/>
  <!-- Diamond Setting on Right Ring -->
  <polygon points="50,-85 58,-70 74,-70 60,-58 66,-42 50,-53 34,-42 40,-58 26,-70 42,-70" fill="%23ffffff"/>
  <polygon points="50,-85 58,-70 50,-62 42,-70" fill="%23e0f7fa"/>
  <!-- Heart Icon Center -->
  <path d="M0,-10 C-15,-30 -40,-20 -40,5 C-40,25 0,45 0,55 C0,45 40,25 40,5 C40,-20 15,-30 0,-10 Z" fill="%23e91e63" opacity="0.85"/>
</g>
<!-- Elegant Typography -->
<text x="450" y="475" font-family="serif" font-size="34" fill="%23faeed7" text-anchor="middle" font-weight="bold" letter-spacing="2">Rings of Love &amp; Roses</text>
<text x="450" y="515" font-family="sans-serif" font-size="16" fill="%23ffd54f" text-anchor="middle" letter-spacing="4">AHMED &amp; SAMA • ENGAGEMENT</text>
</svg>`;

const floralHeartArchArtwork = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="100%" height="100%">
<defs>
  <radialGradient id="nightRoseBg" cx="50%" cy="40%" r="70%">
    <stop offset="0%" stop-color="%233a1e2d"/>
    <stop offset="50%" stop-color="%2322101b"/>
    <stop offset="100%" stop-color="%230b0509"/>
  </radialGradient>
  <radialGradient id="crimsonBloom" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ff5252"/>
    <stop offset="60%" stop-color="%23c2185b"/>
    <stop offset="100%" stop-color="%234a001d"/>
  </radialGradient>
  <radialGradient id="pinkBloom" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ffcdd2"/>
    <stop offset="60%" stop-color="%23f06292"/>
    <stop offset="100%" stop-color="%23880e4f"/>
  </radialGradient>
  <radialGradient id="whiteRose" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ffffff"/>
    <stop offset="60%" stop-color="%23fce4ec"/>
    <stop offset="100%" stop-color="%23f48fb1"/>
  </radialGradient>
  <linearGradient id="goldBranch" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="%23fff3b0"/>
    <stop offset="50%" stop-color="%23e5a93c"/>
    <stop offset="100%" stop-color="%239c6515"/>
  </linearGradient>
</defs>
<rect width="900" height="650" fill="url(%23nightRoseBg)"/>
<!-- Romantic Heart Wreath Arch of Blooming Roses -->
<g transform="translate(450, 270)">
  <!-- Heart Guide with Gold Ribbons -->
  <path d="M0,80 C-180,-100 -260,10 -150,140 C-80,210 0,250 0,260 C0,250 80,210 150,140 C260,10 180,-100 0,80 Z" fill="none" stroke="url(%23goldBranch)" stroke-width="8" opacity="0.6"/>
  <!-- Glowing center heart aura -->
  <path d="M0,70 C-150,-80 -220,10 -120,120 C-60,180 0,220 0,230 C0,220 60,180 120,120 C220,10 150,-80 0,70 Z" fill="%23ad1457" opacity="0.18" filter="blur(25px)"/>
  
  <!-- Roses Along the Heart Arc -->
  <!-- Top Center Crest -->
  <circle cx="0" cy="55" r="38" fill="url(%23crimsonBloom)"/>
  <circle cx="0" cy="55" r="26" fill="none" stroke="%23fff" stroke-width="2" opacity="0.5"/>
  <circle cx="0" cy="55" r="10" fill="%23ff1744"/>

  <!-- Left arch roses -->
  <circle cx="-70" cy="10" r="35" fill="url(%23pinkBloom)"/>
  <circle cx="-130" cy="-20" r="42" fill="url(%23crimsonBloom)"/>
  <circle cx="-190" cy="20" r="45" fill="url(%23whiteRose)"/>
  <circle cx="-210" cy="90" r="40" fill="url(%23pinkBloom)"/>
  <circle cx="-160" cy="160" r="38" fill="url(%23crimsonBloom)"/>
  <circle cx="-90" cy="210" r="32" fill="url(%23whiteRose)"/>

  <!-- Right arch roses -->
  <circle cx="70" cy="10" r="35" fill="url(%23pinkBloom)"/>
  <circle cx="130" cy="-20" r="42" fill="url(%23crimsonBloom)"/>
  <circle cx="190" cy="20" r="45" fill="url(%23whiteRose)"/>
  <circle cx="210" cy="90" r="40" fill="url(%23pinkBloom)"/>
  <circle cx="160" cy="160" r="38" fill="url(%23crimsonBloom)"/>
  <circle cx="90" cy="210" r="32" fill="url(%23whiteRose)"/>

  <!-- Heart Tip Rose -->
  <circle cx="0" cy="260" r="35" fill="url(%23crimsonBloom)"/>
  
  <!-- Center Inscription Inside Heart -->
  <text x="0" y="125" font-family="serif" font-size="44" fill="%23faeed7" text-anchor="middle" font-weight="bold">A &amp; S</text>
  <text x="0" y="165" font-family="serif" font-size="22" fill="%23ffd54f" text-anchor="middle" font-style="italic">Bound in Love &amp; Grace</text>
</g>
<!-- Footer Text -->
<text x="450" y="580" font-family="serif" font-size="28" fill="%23faeed7" text-anchor="middle" font-weight="bold">Wreath of Everlasting Love</text>
<text x="450" y="615" font-family="sans-serif" font-size="14" fill="%23f48fb1" text-anchor="middle" letter-spacing="3">FAIYUM • OCTOBER 2, 2026</text>
</svg>`;

const floralCandleLanternArtwork = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="100%" height="100%">
<defs>
  <radialGradient id="nightGarden" cx="50%" cy="50%" r="70%">
    <stop offset="0%" stop-color="%232c1c28"/>
    <stop offset="50%" stop-color="%231a101b"/>
    <stop offset="100%" stop-color="%230b060d"/>
  </radialGradient>
  <radialGradient id="candleFlame" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="%23ffffff"/>
    <stop offset="30%" stop-color="%23ffe082"/>
    <stop offset="70%" stop-color="%23ff9800"/>
    <stop offset="100%" stop-color="%23ff5722" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="crimsonRose" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ff5252"/>
    <stop offset="60%" stop-color="%23c2185b"/>
    <stop offset="100%" stop-color="%234a001d"/>
  </radialGradient>
  <radialGradient id="coralRose" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ffe0b2"/>
    <stop offset="60%" stop-color="%23ff7043"/>
    <stop offset="100%" stop-color="%23bf360c"/>
  </radialGradient>
  <radialGradient id="pastelRose" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23fff0f5"/>
    <stop offset="60%" stop-color="%23f8bbd0"/>
    <stop offset="100%" stop-color="%23c2185b"/>
  </radialGradient>
</defs>
<rect width="900" height="650" fill="url(%23nightGarden)"/>
<!-- Romantic Candle Lantern & Floral Garden -->
<g transform="translate(450, 240)">
  <!-- Glow Around Lantern -->
  <circle cx="0" cy="30" r="160" fill="%23ffb74d" opacity="0.22" filter="blur(35px)"/>
  
  <!-- Classic Golden Palace Lantern -->
  <path d="M-60,-80 L60,-80 L80,120 L-80,120 Z" fill="%231a1418" stroke="%23d4af37" stroke-width="4"/>
  <polygon points="0,-140 -70,-80 70,-80" fill="%232b2025" stroke="%23d4af37" stroke-width="4"/>
  <circle cx="0" cy="-145" r="16" fill="none" stroke="%23d4af37" stroke-width="4"/>
  <!-- Candle Inside Lantern -->
  <rect x="-22" y="20" width="44" height="90" rx="6" fill="%23fff8e1"/>
  <!-- Glowing Flame -->
  <circle cx="0" cy="0" r="35" fill="url(%23candleFlame)"/>
  <ellipse cx="0" cy="3" rx="10" ry="20" fill="%23ffe082"/>
  <ellipse cx="0" cy="6" rx="5" ry="12" fill="%23ffffff"/>
</g>
<!-- Rich Floral Cascade Surrounding Lantern -->
<g transform="translate(0, 100)">
  <!-- Left Side Flowers -->
  <circle cx="280" cy="320" r="55" fill="url(%23crimsonRose)"/>
  <circle cx="280" cy="320" r="40" fill="none" stroke="%23fff" stroke-width="2.5" opacity="0.4"/>
  <circle cx="280" cy="320" r="15" fill="%23e91e63"/>
  <circle cx="340" cy="380" r="48" fill="url(%23coralRose)"/>
  <circle cx="230" cy="390" r="42" fill="url(%23pastelRose)"/>

  <!-- Right Side Flowers -->
  <circle cx="620" cy="320" r="55" fill="url(%23crimsonRose)"/>
  <circle cx="620" cy="320" r="40" fill="none" stroke="%23fff" stroke-width="2.5" opacity="0.4"/>
  <circle cx="620" cy="320" r="15" fill="%23e91e63"/>
  <circle cx="560" cy="380" r="48" fill="url(%23coralRose)"/>
  <circle cx="670" cy="390" r="42" fill="url(%23pastelRose)"/>

  <!-- Foreground Garland & Fallen Petals -->
  <ellipse cx="450" cy="430" rx="180" ry="40" fill="%232b131f" opacity="0.6"/>
  <!-- Petals -->
  <ellipse cx="380" cy="420" rx="14" ry="7" fill="%23e91e63" transform="rotate(-20 380 420)"/>
  <ellipse cx="510" cy="425" rx="16" ry="8" fill="%23ff5252" transform="rotate(35 510 425)"/>
  <ellipse cx="440" cy="435" rx="12" ry="6" fill="%23f06292" transform="rotate(-10 440 435)"/>
  <ellipse cx="475" cy="440" rx="15" ry="7" fill="%23ff7043" transform="rotate(15 475 440)"/>
</g>
<!-- Romantic Caption -->
<text x="450" y="565" font-family="serif" font-size="30" fill="%23faeed7" text-anchor="middle" font-weight="bold">Candlelight &amp; Rose Blooms</text>
<text x="450" y="605" font-family="sans-serif" font-size="14" fill="%23ffb74d" text-anchor="middle" letter-spacing="3">ROMANTIC HOME SETTING • FAIYUM</text>
</svg>`;

const floralBouquetChampagneArtwork = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650" width="100%" height="100%">
<defs>
  <radialGradient id="festiveGlow" cx="50%" cy="40%" r="70%">
    <stop offset="0%" stop-color="%23381a28"/>
    <stop offset="50%" stop-color="%231e111d"/>
    <stop offset="100%" stop-color="%230c060d"/>
  </radialGradient>
  <radialGradient id="rubyRose" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23ff4081"/>
    <stop offset="60%" stop-color="%23c2185b"/>
    <stop offset="100%" stop-color="%23560027"/>
  </radialGradient>
  <radialGradient id="peachPeony" cx="35%" cy="35%" r="65%">
    <stop offset="0%" stop-color="%23fff3e0"/>
    <stop offset="60%" stop-color="%23ff8a65"/>
    <stop offset="100%" stop-color="%23bf360c"/>
  </radialGradient>
  <linearGradient id="goldGlasses" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="%23ffffff"/>
    <stop offset="40%" stop-color="%23ffe082"/>
    <stop offset="80%" stop-color="%23d4af37"/>
    <stop offset="100%" stop-color="%238d6e63"/>
  </linearGradient>
</defs>
<rect width="900" height="650" fill="url(%23festiveGlow)"/>
<!-- Champagne Toast Clinking Amidst Lush Roses -->
<g transform="translate(450, 220)">
  <!-- Sparkle Burst Behind Glasses -->
  <circle cx="0" cy="0" r="140" fill="%23ffd54f" opacity="0.18" filter="blur(25px)"/>
  
  <!-- Left Flute -->
  <g transform="rotate(-15 -20 0)">
    <path d="M-30,-80 L-10,30 C-10,60 -40,60 -40,30 Z" fill="%23fff9c4" opacity="0.4" stroke="url(%23goldGlasses)" stroke-width="3"/>
    <line x1="-25" y1="60" x2="-25" y2="140" stroke="url(%23goldGlasses)" stroke-width="4"/>
    <ellipse cx="-25" cy="140" rx="30" ry="10" fill="url(%23goldGlasses)"/>
  </g>

  <!-- Right Flute -->
  <g transform="rotate(15 20 0)">
    <path d="M10,30 L30,-80 C40,60 10,60 10,30 Z" fill="%23fff9c4" opacity="0.4" stroke="url(%23goldGlasses)" stroke-width="3"/>
    <line x1="25" y1="60" x2="25" y2="140" stroke="url(%23goldGlasses)" stroke-width="4"/>
    <ellipse cx="25" cy="140" rx="30" ry="10" fill="url(%23goldGlasses)"/>
  </g>

  <!-- Clink Celebration Stars -->
  <polygon points="0,-40 4,-30 14,-30 6,-22 9,-12 0,-18 -9,-12 -6,-22 -14,-30 -4,-30" fill="%23ffffff"/>
  <polygon points="25,-60 28,-52 36,-52 30,-46 32,-38 25,-43 18,-38 20,-46 14,-52 22,-52" fill="%23ffd54f"/>
  <polygon points="-25,-60 -22,-52 -14,-52 -20,-46 -18,-38 -25,-43 -32,-38 -30,-46 -36,-52 -28,-52" fill="%23ffd54f"/>
</g>
<!-- Lavish Floral Centerpiece Base -->
<g transform="translate(450, 430)">
  <circle cx="-160" cy="0" r="55" fill="url(%23rubyRose)"/>
  <circle cx="160" cy="0" r="55" fill="url(%23rubyRose)"/>
  <circle cx="-80" cy="20" r="60" fill="url(%23peachPeony)"/>
  <circle cx="80" cy="20" r="60" fill="url(%23peachPeony)"/>
  <circle cx="0" cy="30" r="70" fill="url(%23rubyRose)"/>
  <circle cx="0" cy="30" r="52" fill="none" stroke="%23fff" stroke-width="3" opacity="0.5"/>
  <circle cx="0" cy="30" r="32" fill="none" stroke="%23ff80ab" stroke-width="3.5" opacity="0.7"/>
  <circle cx="0" cy="30" r="14" fill="%23ff4081"/>
</g>
<!-- Subtitle & Location -->
<text x="450" y="565" font-family="serif" font-size="32" fill="%23faeed7" text-anchor="middle" font-weight="bold">Cheers to Forever Love</text>
<text x="450" y="605" font-family="sans-serif" font-size="14" fill="%23ffd54f" text-anchor="middle" letter-spacing="4">AHMED &amp; SAMA • FAIYUM GOVERNORATE</text>
</svg>`;

export const initialPhotos: GalleryPhoto[] = [
  {
    id: 'photo-ahmed-sama-original',
    title: 'Ahmed & Sama • The Happy Couple',
    caption: 'Ahmed and Sama at their engagement celebration in Itsa, Faiyum, surrounded by roses and warm celebration lights.',
    category: 'engagement',
    imageUrl: '9fc163f2-0a17-407e-b624-b3ef9cdf1b50.jpg',
    fallbackUrl: floralHeartArchArtwork,
    date: 'October 2, 2026',
    likes: 180,
    comments: [
      {
        id: 'c-orig-1',
        authorName: 'Eng. Mahmoud El-Gabalawy',
        text: 'ألف مبروك لأجمل عروسين! بارك الله لكما وبارك عليكما وجمع بينكما في خير ❤️',
        timestamp: 'Just now',
      },
      {
        id: 'c-orig-2',
        authorName: 'Dr. Yasmine Adel',
        text: 'ما شاء الله تبارك الله، منورين يا أحلى أحمد وسما في الدنيا! ربي يسعدكم دائماً 🌸',
        timestamp: '1 hour ago',
      },
    ],
  },
  {
    id: 'photo-1',
    title: 'Blooming Roses & Engagement Rings',
    caption: 'Intertwined golden rings resting on a bed of velvety red and blush roses, symbolizing everlasting devotion and romance.',
    category: 'engagement',
    imageUrl: floralRingsArtwork,
    date: 'Oct 2, 2026',
    likes: 86,
    comments: [
      {
        id: 'c1',
        authorName: 'Noura El-Menshawy',
        text: 'The flowers are absolutely breathtaking! Wishing Ahmed and Sama endless blessings ❤️',
        timestamp: '2 days ago',
      },
      {
        id: 'c2',
        authorName: 'Eng. Karim El-Sherif',
        text: 'So proud and thrilled for you Ahmed! May Allah bless both of you with happiness.',
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'photo-2',
    title: 'Heart Wreath of Everlasting Love',
    caption: 'A magnificent heart-shaped arch crafted with ivory, peach, and deep crimson roses framing our joyous milestone.',
    category: 'photoshoot',
    imageUrl: floralHeartArchArtwork,
    date: 'Oct 2, 2026',
    likes: 94,
    comments: [
      {
        id: 'c3',
        authorName: 'Dr. Yasmine Othman',
        text: 'Pure love and grace! This floral heart represents your warm love story so beautifully.',
        timestamp: '3 days ago',
      },
    ],
  },
  {
    id: 'photo-3',
    title: 'Candlelight & Rose Petals',
    caption: 'Soft golden candlelight glowing inside an antique palace lantern, surrounded by fragrant rose petals and cozy home warmth.',
    category: 'memories',
    imageUrl: floralCandleLanternArtwork,
    date: 'Oct 2, 2026',
    likes: 78,
    comments: [
      {
        id: 'c4',
        authorName: 'Aunt Fatima',
        text: 'Such a cozy and romantic atmosphere in Faiyum! Can not wait to celebrate with you all.',
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'photo-4',
    title: 'Celebration Toast & Floral Centerpiece',
    caption: 'Raising a celebratory toast surrounded by cascading floral garlands, celebration sweets, and family joy.',
    category: 'family',
    imageUrl: floralBouquetChampagneArtwork,
    date: 'Oct 2, 2026',
    likes: 112,
    comments: [
      {
        id: 'c5',
        authorName: 'Ahmed\'s Mother',
        text: 'May Allah fill your days with the sweetness of roses and eternal happiness my beloved children ❤️',
        timestamp: '2 days ago',
      },
    ],
  },
];

export const initialSchedule: ScheduleEvent[] = [
  {
    id: 's1',
    time: '7:00 PM',
    title: 'Warm Welcome & Refreshments at Home',
    description: 'Welcoming our closest family and friends with sparkling drinks, warm tea, and artisanal sweets in Faiyum.',
    iconName: 'welcome',
  },
  {
    id: 's2',
    time: '8:00 PM',
    title: 'Recitation of Al-Fatiha & Formal Blessings',
    description: 'A deeply sacred and cherished family gathering to exchange formal congratulations and blessings.',
    iconName: 'zaffa',
  },
  {
    id: 's3',
    time: '8:30 PM',
    title: 'Exchange of Engagement Rings',
    description: 'Ahmed & Sama put on their engagement rings amidst heartfelt applause and congratulations.',
    iconName: 'cake',
  },
  {
    id: 's4',
    time: '9:30 PM',
    title: 'Celebratory Dinner & Delights',
    description: 'Enjoying an intimate, delightful home-cooked banquet and authentic oriental treats.',
    iconName: 'banquet',
  },
  {
    id: 's5',
    time: '10:30 PM',
    title: 'Engagement Cake Cutting & Keepsake Photos',
    description: 'Cutting the celebration cake together and taking group portraits with our beloved guests.',
    iconName: 'celebration',
  },
];

export const initialBlessings: Blessing[] = [
  {
    id: 'b1',
    senderName: 'Hajj Ibrahim',
    relation: 'Uncle of the Groom',
    message: 'May Allah bless you both and unite you in immense goodness. Congratulations Ahmed and Sama on your beautiful engagement in Faiyum!',
    timestamp: '2 hours ago',
    likes: 21,
  },
  {
    id: 'b2',
    senderName: 'Sarah Khaled',
    relation: 'Close Friend of the Bride',
    message: 'Dearest Sama, you look like an absolute angel! Ahmed is such a gem. Wishing you both a lifetime of bliss and laughter!',
    timestamp: '5 hours ago',
    likes: 27,
  },
  {
    id: 'b3',
    senderName: 'Eng. Mostafa Adel',
    relation: 'Friend of the Groom',
    message: 'Mabrouk ya Ahmed! Truly happy for you my brother. Looking forward to celebrating together in Faiyum!',
    timestamp: '1 day ago',
    likes: 18,
  },
];
