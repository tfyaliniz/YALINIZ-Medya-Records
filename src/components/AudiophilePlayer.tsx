'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc,
  Radio,
  Sliders,
  Sparkles,
  Layers,
  Gauge
} from 'lucide-react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  bpm: number;
  tapeSpeed: '15 IPS' | '30 IPS';
  format: string;
  chordFreqs: number[];
}

export const TRACKS: Track[] = [
  {
    id: 'trk-1',
    title: 'Kozmik Sessizlik',
    artist: 'Taha Furkan YALINIZ & Ensemble',
    album: 'YALINIZ Master Tape Sessions Vol. 1',
    duration: '06:42',
    bpm: 72,
    tapeSpeed: '30 IPS',
    format: 'Studer 2" 24-Track Analog',
    chordFreqs: [216, 270, 324, 432] // 432Hz tuning harmony
  },
  {
    id: 'trk-2',
    title: 'Analog Rüyalar',
    artist: 'YALINIZ Chamber Orchestra',
    album: 'Direct-to-Disc Series 02',
    duration: '05:18',
    bpm: 84,
    tapeSpeed: '15 IPS',
    format: '180g Audiophile Vinyl',
    chordFreqs: [220, 261.63, 329.63, 392] // A minor 7
  },
  {
    id: 'trk-3',
    title: 'İstanbul Geceleri',
    artist: 'Bosphorus Sound Laboratory',
    album: 'Acoustic Monograph 2026',
    duration: '04:55',
    bpm: 68,
    tapeSpeed: '30 IPS',
    format: 'Vacuum Tube Telefunken ELA M251',
    chordFreqs: [174.61, 220, 261.63, 329.63] // F maj7
  },
  {
    id: 'trk-4',
    title: 'YALINIZ 1984',
    artist: 'Analog Synthesizer Unit',
    album: 'Moog Modular Vault',
    duration: '07:10',
    bpm: 96,
    tapeSpeed: '15 IPS',
    format: 'Studer A800 Master Reel',
    chordFreqs: [130.81, 196, 261.63, 392] // C sus2
  }
];

export const AudiophilePlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [tapeSpeed, setTapeSpeed] = useState<'15 IPS' | '30 IPS'>('30 IPS');
  const [meterLevels, setMeterLevels] = useState<number[]>([40, 65, 55, 78, 90, 82, 60, 45, 70, 85]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const track = TRACKS[currentTrackIndex];

  // Simulated VU meter animation while playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setMeterLevels([
          Math.floor(40 + Math.random() * 50),
          Math.floor(50 + Math.random() * 45),
          Math.floor(35 + Math.random() * 60),
          Math.floor(60 + Math.random() * 38),
          Math.floor(70 + Math.random() * 28),
          Math.floor(55 + Math.random() * 40),
          Math.floor(45 + Math.random() * 50),
          Math.floor(60 + Math.random() * 35),
          Math.floor(65 + Math.random() * 30),
          Math.floor(40 + Math.random() * 55)
        ]);
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.2));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Audio synthesis start/stop
  const stopAudio = () => {
    try {
      oscNodesRef.current.forEach((osc) => {
        osc.stop();
        osc.disconnect();
      });
      oscNodesRef.current = [];
      if (noiseNodeRef.current) {
        noiseNodeRef.current.stop();
        noiseNodeRef.current.disconnect();
        noiseNodeRef.current = null;
      }
    } catch {
      // Ignore
    }
  };

  const startAudio = (tr: Track) => {
    stopAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Generate harmonic warm chord oscillators
      tr.chordFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle tape wow/flutter vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(4.5 + idx * 0.3, ctx.currentTime);
        vibratoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        vibrato.connect(osc.frequency);
        vibrato.start();

        oscGain.gain.setValueAtTime(0.25 / tr.chordFreqs.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscNodesRef.current.push(osc);
      });

      // Subtle warm vinyl crackle emulation
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.006;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
    } catch {
      // Safe fallback if autoplay policies restrict
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio(track);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setProgress(0);
    if (isPlaying) {
      startAudio(TRACKS[nextIdx]);
    }
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    setProgress(0);
    if (isPlaying) {
      startAudio(TRACKS[prevIdx]);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(false);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol * 0.15, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      handleVolumeChange(volume);
    } else {
      setIsMuted(true);
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      }
    }
  };

  return (
    <section id="turntable-player" className="p-6 sm:p-10 rounded-3xl bg-zinc-950 border border-[#c5a059]/30 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Background tape glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#c5a059]/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Studer A800 Virtual Turntable
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            180g Odyofil Vinil & 24-Kanal Master Bant Çalar
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Akustik hakikat, tüplü analog harmonikler ve saf ses mastering odası deneyimi.
          </p>
        </div>

        {/* Tape Speed Selector */}
        <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setTapeSpeed('15 IPS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              tapeSpeed === '15 IPS'
                ? 'bg-[#c5a059] text-black font-bold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            15 IPS (Warm)
          </button>
          <button
            onClick={() => setTapeSpeed('30 IPS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              tapeSpeed === '30 IPS'
                ? 'bg-[#c5a059] text-black font-bold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            30 IPS (Master)
          </button>
        </div>
      </div>

      {/* Main Console: Turntable + Controls + Spectrum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Turntable Graphic & Tonearm */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-zinc-900 border-2 border-white/10 p-4 shadow-inner flex items-center justify-center">
            {/* Platter */}
            <div
              className={`relative w-full h-full rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-black border-4 border-zinc-800 shadow-2xl flex items-center justify-center ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              style={{ animationDuration: tapeSpeed === '30 IPS' ? '2.5s' : '3.8s' }}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-4 rounded-full border border-zinc-800/80" />
              <div className="absolute inset-8 rounded-full border border-zinc-800/60" />
              <div className="absolute inset-12 rounded-full border border-zinc-800/40" />
              <div className="absolute inset-16 rounded-full border border-zinc-800/20" />

              {/* Center Gold Label */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 border-2 border-amber-300 flex flex-col items-center justify-center p-2 text-center shadow-lg">
                <span className="text-[9px] font-mono font-black text-black tracking-widest uppercase">
                  YALINIZ
                </span>
                <span className="text-[7px] font-mono text-zinc-900 uppercase">Records</span>
                <div className="w-2 h-2 rounded-full bg-black mt-1" />
                <span className="text-[6px] font-mono text-zinc-950 mt-1">33⅓ RPM</span>
              </div>
            </div>

            {/* Tonearm Simulation */}
            <div
              className={`absolute top-4 right-4 w-12 h-32 border-r-2 border-t-2 border-[#c5a059]/80 rounded-tr-2xl origin-top-right transition-transform duration-700 pointer-events-none ${
                isPlaying ? 'rotate-12' : '-rotate-12'
              }`}
            >
              <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#c5a059] shadow-glow" />
            </div>
          </div>
        </div>

        {/* Right: Master Control Deck */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Track Metadata */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#c5a059] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Şimdi Çalıyor
              </span>
              <span className="text-zinc-500">{track.format}</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {track.title}
              </h3>
              <p className="text-sm text-zinc-300 font-medium">{track.artist}</p>
              <p className="text-xs text-zinc-500">{track.album}</p>
            </div>

            {/* Spectrum Equalizer Bars */}
            <div className="pt-2 flex items-end gap-1.5 h-12">
              {meterLevels.map((lvl, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t transition-all duration-150 bg-gradient-to-t from-amber-600 via-amber-400 to-emerald-400"
                  style={{ height: isPlaying ? `${lvl}%` : '8%' }}
                />
              ))}
            </div>

            {/* Timeline Progress Bar */}
            <div className="space-y-1 pt-1">
              <div
                className="w-full h-2 rounded-full bg-zinc-800 cursor-pointer overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setProgress((clickX / rect.width) * 100);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>01:42</span>
                <span>{track.duration}</span>
              </div>
            </div>
          </div>

          {/* Transport Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-[#c5a059]/40 transition"
                title="Önceki Kayıt"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88c3a] text-black font-bold text-sm tracking-wider uppercase hover:brightness-110 transition shadow-lg shadow-[#c5a059]/20 flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-black" />
                    <span>Durdur</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black" />
                    <span>Plağı Döndür</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-[#c5a059]/40 transition"
                title="Sonraki Kayıt"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 bg-zinc-900/80 px-4 py-2 rounded-xl border border-white/10">
              <button onClick={toggleMute} className="text-zinc-400 hover:text-white">
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#c5a059]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-24 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vault Tracklist Quick Picker */}
      <div className="pt-4 border-t border-white/10">
        <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
          Arşiv Parça Seçici & Master Seansları
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TRACKS.map((t, idx) => {
            const isSelected = idx === currentTrackIndex;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setCurrentTrackIndex(idx);
                  setProgress(0);
                  if (isPlaying) startAudio(t);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#181822] border-[#c5a059]/60 shadow'
                    : 'bg-black/40 border-white/5 hover:bg-zinc-900 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-xs font-serif font-bold text-white truncate max-w-[150px]">
                    {t.title}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 truncate max-w-[150px]">
                    {t.artist.split('&')[0]}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#c5a059]">
                  {t.duration}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudiophilePlayer;
