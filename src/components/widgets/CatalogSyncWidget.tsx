'use client';

import React, { useState } from 'react';
import { Disc, Radio, ShieldCheck, Download, Check, Volume2, Sparkles } from 'lucide-react';
import { VINYL_RELEASES, SYNC_CATEGORIES } from '@/data/mockData';

export default function CatalogSyncWidget() {
  const [selectedRelease, setSelectedRelease] = useState(VINYL_RELEASES[0]);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rpm, setRpm] = useState<33 | 45>(33);
  const [selectedCategory, setSelectedCategory] = useState(SYNC_CATEGORIES[0].id);
  const [territory, setTerritory] = useState<'worldwide' | 'regional'>('worldwide');
  const [quoteDownloaded, setQuoteDownloaded] = useState(false);

  const activeTrack = selectedRelease.tracks[activeTrackIndex] || selectedRelease.tracks[0];
  const cat = SYNC_CATEGORIES.find((c) => c.id === selectedCategory) || SYNC_CATEGORIES[0];
  const basePrice = 2500;
  const territoryMultiplier = territory === 'worldwide' ? 1.5 : 1.0;
  const estimatedFee = Math.round(basePrice * cat.baseQuoteMultiplier * territoryMultiplier);

  const handleGenerateQuote = () => {
    const cueSheet = {
      licensee_request: 'Direct Master & Publishing Synchronization Quote',
      record_label: 'YALINIZ Records / YALINIZ Medya Group',
      catalog_id: selectedRelease.catalogNumber,
      track_title: activeTrack.title,
      artist: selectedRelease.artist,
      duration: activeTrack.duration,
      usage_tier: cat.name,
      territory: territory === 'worldwide' ? 'Worldwide in Perpetuity' : 'Single Region (Europe / North America)',
      estimated_sync_fee_usd: estimatedFee,
      clearance_guarantee: '100% One-Stop Master & Publishing Clearance Guaranteed in 24 Hours',
      issued_at: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(cueSheet, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedRelease.catalogNumber}-${activeTrack.title.replace(/\s+/g, '_')}-Sync_Clearance_Quote.json`;
    a.click();
    URL.revokeObjectURL(url);
    setQuoteDownloaded(true);
    setTimeout(() => setQuoteDownloaded(false), 5000);
  };

  return (
    <div id="turntable-player" className="rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-10 space-y-10">
      {/* Widget Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-1.5">
            <Radio className="w-4 h-4" /> Audiophile Vinyl Player & Instant Clearance Engine
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Virtual 180g Turntable & Sync Suite
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Listen to master acetates directly cut at half-speed and calculate one-stop synchronization licenses.
          </p>
        </div>

        {/* Release Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {VINYL_RELEASES.map((rel) => (
            <button
              key={rel.id}
              onClick={() => {
                setSelectedRelease(rel);
                setActiveTrackIndex(0);
                setRpm(rel.rpm as 33 | 45);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition border ${
                selectedRelease.id === rel.id
                  ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e5c07b] font-semibold'
                  : 'bg-zinc-900/80 border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {rel.catalogNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Turntable & Control Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Virtual Turntable Deck (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-zinc-900/60 border border-white/5 relative overflow-hidden">
          {/* RPM & Power Switches */}
          <div className="w-full flex items-center justify-between mb-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRpm(33)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                  rpm === 33 ? 'bg-[#c5a059] text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                33⅓ RPM
              </button>
              <button
                onClick={() => setRpm(45)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                  rpm === 45 ? 'bg-[#c5a059] text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                45 RPM
              </button>
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-[#c5a059] hover:text-[#e5c07b] font-bold uppercase tracking-wider text-[11px]"
            >
              {isPlaying ? 'Motor: RUNNING' : 'Motor: STOPPED'}
            </button>
          </div>

          {/* Turntable Platter & Vinyl Disc */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-black border-4 border-zinc-800 shadow-2xl flex items-center justify-center p-2">
            {/* Spinning Grooved Vinyl */}
            <div
              className={`w-full h-full rounded-full bg-gradient-to-tr from-zinc-900 via-black to-zinc-900 border-2 border-zinc-700 flex items-center justify-center shadow-inner relative ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: rpm === 33 ? '2.5s' : '1.8s' }}
            >
              {/* Concentric Vinyl Grooves */}
              <div className="absolute inset-4 rounded-full border border-zinc-800/80 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-zinc-800/80 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-zinc-800/60 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-zinc-800/60 pointer-events-none" />
              <div className="absolute inset-20 rounded-full border border-zinc-800/40 pointer-events-none" />

              {/* Center Label */}
              <div className="w-24 h-24 rounded-full bg-[#c5a059]/90 border-4 border-zinc-900 flex flex-col items-center justify-center p-2 text-center text-black shadow-lg">
                <span className="text-[9px] font-bold tracking-widest uppercase">YALINIZ</span>
                <span className="text-[8px] font-mono font-semibold">{selectedRelease.catalogNumber}</span>
                <span className="text-[7px] font-mono uppercase">{rpm} RPM</span>
                <div className="w-2 h-2 rounded-full bg-zinc-900 mt-0.5" />
              </div>
            </div>

            {/* Tonearm Simulation */}
            <div
              className={`absolute top-2 right-2 w-24 h-32 pointer-events-none transition-transform duration-1000 origin-top-right ${
                isPlaying ? 'rotate-6' : '-rotate-12'
              }`}
            >
              <div className="w-1.5 h-28 bg-gradient-to-b from-zinc-400 via-zinc-200 to-amber-400 mx-auto rounded-full shadow-lg" />
              <div className="w-3.5 h-5 bg-black border border-[#c5a059] rounded-sm -mt-1 mx-auto" />
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs font-serif font-bold text-white block">{selectedRelease.title}</span>
            <span className="text-[11px] text-zinc-400">{selectedRelease.vinylEdition}</span>
          </div>
        </div>

        {/* Middle Column: Active Tracklist & Stems (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Master Stems / Cue List</span>
            <span className="text-[11px] font-mono text-[#c5a059]">Half-Speed DMM</span>
          </div>

          <div className="space-y-2">
            {selectedRelease.tracks.map((tr, idx) => (
              <div
                key={tr.number}
                onClick={() => setActiveTrackIndex(idx)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeTrackIndex === idx
                    ? 'bg-[#c5a059]/10 border-[#c5a059]/40 text-white shadow-md'
                    : 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#c5a059]">{tr.number}</span>
                  <div>
                    <h5 className="font-serif text-sm font-semibold">{tr.title}</h5>
                    <p className="text-[10px] text-zinc-500">{tr.key} • {tr.bpm} BPM • {tr.mood}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-zinc-400 block">{tr.duration}</span>
                  {activeTrackIndex === idx && (
                    <span className="text-[9px] text-[#c5a059] font-mono font-bold uppercase tracking-wider">ON TURNTABLE</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-400 space-y-1">
            <div className="flex justify-between">
              <span>Catalog Pressing:</span>
              <span className="text-white font-medium">{selectedRelease.pressingUnits} Units Worldwide</span>
            </div>
            <div className="flex justify-between">
              <span>Vault Inventory Remaining:</span>
              <span className="text-[#c5a059] font-mono font-semibold">{selectedRelease.availableStock} Copies</span>
            </div>
          </div>
        </div>

        {/* Right Column: One-Stop Sync License Generator (3 cols) */}
        <div className="lg:col-span-3 p-6 rounded-2xl bg-zinc-900/80 border border-[#c5a059]/30 space-y-5 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[#c5a059] text-xs font-semibold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> 100% One-Stop
            </div>
            <h4 className="font-serif text-lg font-bold text-white">Instant Sync Clearance</h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              YALINIZ Records directly controls 100% of master recording and publishing rights. No external clearance delays.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-300 mb-1">Production Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
            >
              {SYNC_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-300 mb-1">Territory</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTerritory('worldwide')}
                className={`py-1.5 rounded-lg border text-center transition ${
                  territory === 'worldwide'
                    ? 'bg-[#c5a059] text-black font-bold border-[#c5a059]'
                    : 'bg-zinc-950 text-zinc-400 border-white/5 hover:text-white'
                }`}
              >
                Worldwide
              </button>
              <button
                type="button"
                onClick={() => setTerritory('regional')}
                className={`py-1.5 rounded-lg border text-center transition ${
                  territory === 'regional'
                    ? 'bg-[#c5a059] text-black font-bold border-[#c5a059]'
                    : 'bg-zinc-950 text-zinc-400 border-white/5 hover:text-white'
                }`}
              >
                Regional
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-xs space-y-1">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px] block">Estimated License Fee:</span>
            <div className="text-2xl font-serif font-bold text-[#c5a059] font-mono">
              ${estimatedFee.toLocaleString()} <span className="text-xs font-normal text-zinc-400">USD</span>
            </div>
            <p className="text-[10px] text-zinc-500">Includes 24/96 WAV stereo stems + Dolby Atmos 7.1.4 multi-tracks.</p>
          </div>

          <button
            onClick={handleGenerateQuote}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88c3a] text-black font-semibold text-xs tracking-wider uppercase hover:brightness-110 transition shadow-lg shadow-[#c5a059]/20 flex items-center justify-center gap-1.5"
          >
            {quoteDownloaded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Quote Generated
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" /> Download Clearance PDF/JSON
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
