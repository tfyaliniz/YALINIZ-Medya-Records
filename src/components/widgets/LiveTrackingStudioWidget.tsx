'use client';

import React, { useState, useEffect } from 'react';
import { Play, Square, Circle, Rewind, FastForward, Sliders, Volume2, Mic2, Disc, Waves, ShieldCheck, Calendar, Check, ArrowRight } from 'lucide-react';
import { STUDIO_CHANNELS, StudioChannel } from '@/data/mockData';

export default function LiveTrackingStudioWidget() {
  const [channels, setChannels] = useState<StudioChannel[]>(STUDIO_CHANNELS);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [tapeSpeed, setTapeSpeed] = useState<15 | 30>(30);
  const [tapeSaturation, setTapeSaturation] = useState<number>(4.2);
  const [selectedRoom, setSelectedRoom] = useState<'soundstage_01' | 'live_chamber'>('soundstage_01');
  const [sessionReserved, setSessionReserved] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [reserveForm, setReserveForm] = useState({
    clientName: '',
    projectTitle: '',
    targetDate: '2026-10-15',
    tapeFormat: '2-inch 24-Track Studer A800',
    engineer: 'Taha Furkan YALINIZ (Executive Supervision)'
  });

  // Animated VU meters simulation
  const [vuLevels, setVuLevels] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying || isRecording) {
      interval = setInterval(() => {
        const next: { [key: string]: number } = {};
        channels.forEach((ch) => {
          if (ch.isMuted) {
            next[ch.id] = 0;
          } else {
            // Natural human dynamic variance
            const variance = (Math.random() * 25 - 12);
            const baseLevel = (ch.gain / 100) * 85;
            next[ch.id] = Math.max(5, Math.min(100, Math.round(baseLevel + variance)));
          }
        });
        setVuLevels(next);
      }, 120);
    } else {
      const zero: { [key: string]: number } = {};
      channels.forEach((ch) => { zero[ch.id] = 0; });
      setVuLevels(zero);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isRecording, channels]);

  const toggleMute = (id: string) => {
    setChannels(channels.map(ch => ch.id === id ? { ...ch, isMuted: !ch.isMuted } : ch));
  };

  const toggleSolo = (id: string) => {
    setChannels(channels.map(ch => ch.id === id ? { ...ch, isSolo: !ch.isSolo } : ch));
  };

  const toggleArm = (id: string) => {
    setChannels(channels.map(ch => ch.id === id ? { ...ch, isArmed: !ch.isArmed } : ch));
  };

  const updateGain = (id: string, gain: number) => {
    setChannels(channels.map(ch => ch.id === id ? { ...ch, gain } : ch));
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSessionReserved(true);
    setShowReserveModal(false);
  };

  return (
    <div id="tracking-studio" className="rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-10 space-y-8">
      {/* Studio Header & Telemetry Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-1.5">
            <Mic2 className="w-4 h-4" /> Multi-Track Analog Studio Tracking
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Studer A800 24-Track 2-Inch Tape Console
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Real-time live session monitoring • Class-A vintage transformers • Pristine acoustic chamber capture
          </p>
        </div>

        {/* Tape Machine Status Box */}
        <div className="flex flex-wrap items-center gap-4 bg-black/60 border border-white/10 p-3.5 rounded-2xl">
          {/* Animated Tape Reels */}
          <div className="flex items-center gap-3 pr-4 border-r border-white/10">
            <div className={`w-8 h-8 rounded-full border-2 border-[#c5a059]/60 flex items-center justify-center ${isPlaying || isRecording ? 'animate-spin' : ''}`} style={{ animationDuration: tapeSpeed === 30 ? '1.5s' : '3s' }}>
              <div className="w-2 h-2 rounded-full bg-[#c5a059]" />
            </div>
            <div className={`w-8 h-8 rounded-full border-2 border-[#c5a059]/60 flex items-center justify-center ${isPlaying || isRecording ? 'animate-spin' : ''}`} style={{ animationDuration: tapeSpeed === 30 ? '1.5s' : '3s' }}>
              <div className="w-2 h-2 rounded-full bg-[#c5a059]" />
            </div>
            <div className="text-[11px] font-mono">
              <span className="text-zinc-500 block uppercase">IPS SPEED</span>
              <span className="text-[#c5a059] font-bold">{tapeSpeed} IPS</span>
            </div>
          </div>

          {/* Speed & Saturation Selectors */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTapeSpeed(15)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${tapeSpeed === 15 ? 'bg-[#c5a059] text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
            >
              15 IPS
            </button>
            <button
              onClick={() => setTapeSpeed(30)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${tapeSpeed === 30 ? 'bg-[#c5a059] text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
            >
              30 IPS
            </button>
          </div>

          <div className="hidden sm:block pl-2 text-[11px] font-mono text-zinc-400">
            Tape Flux: <span className="text-emerald-400 font-bold">+6 dB / 355 nWb/m</span>
          </div>
        </div>
      </div>

      {/* Tape Deck Transport Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/60 border border-white/5 p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(true)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition ${isPlaying && !isRecording ? 'bg-[#c5a059] text-black' : 'bg-zinc-800 text-zinc-300 hover:text-white'}`}
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Tape Play
          </button>
          <button
            onClick={() => { setIsPlaying(false); setIsRecording(false); }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition ${!isPlaying && !isRecording ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300 hover:text-white'}`}
          >
            <Square className="w-3.5 h-3.5 fill-current" /> Stop
          </button>
          <button
            onClick={() => { setIsPlaying(true); setIsRecording(true); }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition ${isRecording ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' : 'bg-zinc-800 text-red-400 hover:bg-zinc-700'}`}
          >
            <Circle className="w-3.5 h-3.5 fill-current" /> Record Arm
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-zinc-400">
            Timecode: <span className="text-white font-bold">01:14:28:16</span>
          </div>
          <button
            onClick={() => setShowReserveModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88c3a] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-md flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" /> Book Tape Session
          </button>
        </div>
      </div>

      {sessionReserved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Studio Session Confirmed for <strong>{reserveForm.projectTitle || 'Auteur Project'}</strong> ({reserveForm.targetDate}) with 2" Studer A800 reel reservation.</span>
          </div>
          <button onClick={() => setSessionReserved(false)} className="text-emerald-400 hover:underline text-[11px]">Dismiss</button>
        </div>
      )}

      {/* 6-Channel Live Tracking Console Strips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {channels.map((ch) => {
          const currentVu = vuLevels[ch.id] || 0;
          return (
            <div
              key={ch.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${ch.isArmed ? 'bg-zinc-900/90 border-[#c5a059]/40' : 'bg-zinc-900/40 border-white/5'}`}
            >
              {/* Channel Header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#c5a059] font-bold uppercase">{ch.id.toUpperCase()}</span>
                  <span className={`w-2 h-2 rounded-full ${ch.isArmed ? 'bg-red-500 shadow-sm shadow-red-500/50 animate-pulse' : 'bg-zinc-700'}`} />
                </div>
                <h4 className="font-serif text-sm font-bold text-white truncate">{ch.name}</h4>
                <div className="text-[9px] text-zinc-400 truncate" title={ch.mic}>{ch.mic}</div>
                <div className="text-[9px] text-zinc-500 truncate" title={ch.preamp}>{ch.preamp}</div>
              </div>

              {/* Hardware VU Meter Simulation */}
              <div className="bg-black/80 rounded-xl p-2.5 border border-white/10 space-y-2">
                <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                  <span>-20</span>
                  <span>-7</span>
                  <span className="text-red-400">+3</span>
                </div>
                <div className="h-28 w-full bg-zinc-950 rounded-lg p-1 flex flex-col-reverse gap-0.5 overflow-hidden">
                  {Array.from({ length: 24 }).map((_, idx) => {
                    const stepPercentage = (idx / 24) * 100;
                    const isActive = currentVu >= stepPercentage;
                    let color = 'bg-emerald-500';
                    if (idx > 16) color = 'bg-[#c5a059]';
                    if (idx > 20) color = 'bg-red-500';

                    return (
                      <div
                        key={idx}
                        className={`w-full h-1 rounded-sm transition-all duration-75 ${isActive ? color : 'bg-zinc-900'}`}
                      />
                    );
                  })}
                </div>
                <div className="text-center text-[10px] font-mono text-zinc-300">
                  {ch.isMuted ? 'MUTED' : `${(ch.peakDb + ((currentVu - 70) / 20)).toFixed(1)} dB`}
                </div>
              </div>

              {/* Fader & Gain Trim */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>GAIN</span>
                  <span className="text-[#c5a059] font-bold">{ch.gain}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ch.gain}
                  onChange={(e) => updateGain(ch.id, Number(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Channel Action Buttons */}
              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/5">
                <button
                  onClick={() => toggleArm(ch.id)}
                  className={`py-1 rounded text-[10px] font-bold font-mono uppercase transition ${ch.isArmed ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                >
                  ARM
                </button>
                <button
                  onClick={() => toggleSolo(ch.id)}
                  className={`py-1 rounded text-[10px] font-bold font-mono uppercase transition ${ch.isSolo ? 'bg-[#c5a059] text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                >
                  SOLO
                </button>
                <button
                  onClick={() => toggleMute(ch.id)}
                  className={`py-1 rounded text-[10px] font-bold font-mono uppercase transition ${ch.isMuted ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                >
                  MUTE
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Session Reservation Modal */}
      {showReserveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-widest block mb-1">
                  YALINIZ Records Live Tracking
                </span>
                <h3 className="font-serif text-xl font-bold text-white">Reserve Acoustic Soundstage & 2" Tape</h3>
              </div>
              <button onClick={() => setShowReserveModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleReserveSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Artist / Ensemble / Production</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Istanbul Chamber Orchestra"
                  value={reserveForm.clientName}
                  onChange={(e) => setReserveForm({ ...reserveForm, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Symphony in Tape"
                    value={reserveForm.projectTitle}
                    onChange={(e) => setReserveForm({ ...reserveForm, projectTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Session Date</label>
                  <input
                    type="date"
                    required
                    value={reserveForm.targetDate}
                    onChange={(e) => setReserveForm({ ...reserveForm, targetDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Tape Machine & Reel Stock</label>
                <select
                  value={reserveForm.tapeFormat}
                  onChange={(e) => setReserveForm({ ...reserveForm, tapeFormat: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                >
                  <option value="2-inch 24-Track Studer A800">Studer A800 24-Track 2" Tape (SM900 +6dB)</option>
                  <option value="1/2-inch Half-Track Studer A820">Studer A820 1/2" Stereo Master Tape (30 IPS)</option>
                  <option value="Direct to Lathe Acetate Cut">Direct-to-Disc Live Cutting Lathe Session</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-[11px] text-zinc-400 space-y-1">
                <div className="text-white font-medium">Session Inclusions:</div>
                <p>Full access to Telefunken 251 & Neumann U47 tube mics, 32-channel vintage Neve console, acoustic isolation booths, and calibrated Meyer Sound monitoring.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88c3a] text-black font-semibold text-xs tracking-wider uppercase hover:brightness-110 transition shadow-lg shadow-[#c5a059]/20"
              >
                Confirm Soundstage & Tape Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
