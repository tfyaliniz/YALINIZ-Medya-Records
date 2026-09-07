export interface VinylRelease {
  id: string;
  catalogNumber: string;
  title: string;
  artist: string;
  genre: string;
  releaseYear: number;
  rpm: number;
  format: string;
  vinylEdition: string;
  pressingUnits: number;
  availableStock: number;
  coverImage: string;
  description: string;
  tracks: {
    number: string;
    title: string;
    duration: string;
    bpm: number;
    key: string;
    mood: string;
    previewUrl?: string;
  }[];
}

export interface StudioChannel {
  id: string;
  name: string;
  source: string;
  mic: string;
  preamp: string;
  gain: number;
  pan: number;
  peakDb: number;
  isArmed: boolean;
  isMuted: boolean;
  isSolo: boolean;
}

export const STUDIO_CHANNELS: StudioChannel[] = [
  {
    id: 'ch-1',
    name: 'Lead Vocals',
    source: 'Acoustic Isolation Booth A',
    mic: 'Telefunken ELA M 251E Tube',
    preamp: 'Neve 1073 Channel Strip',
    gain: 68,
    pan: 0,
    peakDb: -3.2,
    isArmed: true,
    isMuted: false,
    isSolo: false
  },
  {
    id: 'ch-2',
    name: 'Concert Grand',
    source: 'Live Hall 01 (Steinway D-274)',
    mic: 'Matched Pair Neumann U87 Ai',
    preamp: 'Gordon Model 5 Discrete Pre',
    gain: 74,
    pan: -15,
    peakDb: -5.8,
    isArmed: true,
    isMuted: false,
    isSolo: false
  },
  {
    id: 'ch-3',
    name: 'Orchestral Cello',
    source: 'Wood Chamber 02',
    mic: 'RCA 44-BX Ribbon (1953)',
    preamp: 'Telefunken V72 Vintage Tube',
    gain: 82,
    pan: 20,
    peakDb: -4.1,
    isArmed: true,
    isMuted: false,
    isSolo: false
  },
  {
    id: 'ch-4',
    name: 'Drum Room Ambience',
    source: 'Cathedral Acoustic Shell',
    mic: 'Coles 4038 Blumlein Array',
    preamp: 'API 512c Discrete Pre',
    gain: 60,
    pan: 0,
    peakDb: -6.4,
    isArmed: false,
    isMuted: false,
    isSolo: false
  },
  {
    id: 'ch-5',
    name: 'Analog Synthesizer',
    source: 'Modular Synth Rig / Line DI',
    mic: 'Direct Injection (Jensen Transformer)',
    preamp: 'Tube-Tech MP2A Preamp',
    gain: 55,
    pan: -25,
    peakDb: -2.9,
    isArmed: false,
    isMuted: false,
    isSolo: false
  },
  {
    id: 'ch-6',
    name: 'Tape Return 1-2',
    source: 'Studer A800 2" 24-Track',
    mic: 'Direct Tape Head Monitoring',
    preamp: 'Studer Discrete Line Amp',
    gain: 70,
    pan: 0,
    peakDb: -1.8,
    isArmed: true,
    isMuted: false,
    isSolo: false
  }
];

export const VINYL_RELEASES: VinylRelease[] = [
  {
    id: 'ymr-001',
    catalogNumber: 'YMR-001',
    title: 'Aethelgard Overture',
    artist: 'Valen Vance & The Istanbul Chamber Soloists',
    genre: 'Cinematic Orchestral / Neoclassical',
    releaseYear: 2026,
    rpm: 33,
    format: '180g Virgin Black Wax',
    vinylEdition: 'Numbered First Pressing (Deluxe Gatefold)',
    pressingUnits: 500,
    availableStock: 84,
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    description: 'Recorded live on 2-inch tape at Levent Soundstage 01. Cut at half-speed on our Neumann VMS 80 lathe directly from the uncompressed analog stereo master.',
    tracks: [
      { number: 'A1', title: 'Prelude to the Forgotten Crown', duration: '05:42', bpm: 64, key: 'D Minor', mood: 'Somber, Majestic, Reverent' },
      { number: 'A2', title: 'The Iron Citadel', duration: '04:18', bpm: 88, key: 'G Minor', mood: 'Tense, Propulsive, Threatening' },
      { number: 'B1', title: 'Embers Over the Bosphorus', duration: '06:05', bpm: 72, key: 'A Minor', mood: 'Melancholic, Expansive, Nostalgic' },
      { number: 'B2', title: 'Ascendance', duration: '04:55', bpm: 110, key: 'F Major', mood: 'Triumphant, Cathartic, Radiant' }
    ]
  },
  {
    id: 'ymr-002',
    catalogNumber: 'YMR-002',
    title: 'Monolith Nocturne',
    artist: 'Kaelen Morse',
    genre: 'Dark Ambient / Modular Drone',
    releaseYear: 2026,
    rpm: 45,
    format: '2x180g Heavyweight Clear Smoke Vinyl',
    vinylEdition: 'Collector Audiophile Box Set with Art Book',
    pressingUnits: 300,
    availableStock: 42,
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
    description: 'A subterranean exploration of acoustic resonance and tape loop decay. Mastered with bespoke vacuum tube EQ curves specifically tailored for deep bass extension without phase smearing.',
    tracks: [
      { number: 'A1', title: 'Subsurface Transmission', duration: '07:12', bpm: 52, key: 'C Minor', mood: 'Hypnotic, Deep, Ominous' },
      { number: 'A2', title: 'Fractured Monolith', duration: '05:30', bpm: 58, key: 'Eb Minor', mood: 'Textural, Atmospheric, Cold' },
      { number: 'B1', title: 'Resonance at 30 IPS', duration: '08:44', bpm: 48, key: 'Bb Minor', mood: 'Meditative, Organic, Enveloping' }
    ]
  },
  {
    id: 'ymr-003',
    catalogNumber: 'YMR-003',
    title: 'Hyperion Solitude',
    artist: 'Elena Rostova',
    genre: 'Solo Cello & Analog Tape Saturation',
    releaseYear: 2026,
    rpm: 33,
    format: '180g White Marble Wax',
    vinylEdition: 'Limited Edition of 400 with Signed Foil Lithograph',
    pressingUnits: 400,
    availableStock: 119,
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1000&auto=format&fit=crop',
    description: 'Captured with a single vintage RCA 44-BX ribbon microphone in our floating chamber. Pure harmonic purity that exposes every breath and string friction.',
    tracks: [
      { number: 'A1', title: 'Elegy for an Absent Sun', duration: '04:36', bpm: 60, key: 'E Minor', mood: 'Intimate, Heartbreaking, Solitary' },
      { number: 'A2', title: 'Chamber Reverb Study No. 4', duration: '03:52', bpm: 66, key: 'B Minor', mood: 'Spatial, Pure, Contemplative' },
      { number: 'B1', title: 'Passing the Threshold', duration: '06:21', bpm: 74, key: 'D Major', mood: 'Luminous, Peaceful, Serene' }
    ]
  }
];

export const SYNC_CATEGORIES = [
  { id: 'film_feature', name: 'Theatrical Feature Film (Worldwide Festival & Distribution)', baseQuoteMultiplier: 2.2 },
  { id: 'prestige_tv', name: 'Prestige Television Series / VOD Streaming Original', baseQuoteMultiplier: 1.8 },
  { id: 'aaa_game', name: 'AAA Video Game Global OST & Trailer Campaign', baseQuoteMultiplier: 1.6 },
  { id: 'luxury_commercial', name: 'High-Fashion / Luxury Global Brand Campaign (1 Year)', baseQuoteMultiplier: 1.4 },
  { id: 'indie_documentary', name: 'Independent Film / Film Festival Debut Package', baseQuoteMultiplier: 0.8 }
];\n