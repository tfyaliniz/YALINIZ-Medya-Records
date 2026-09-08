'use client';

import React, { useState } from 'react';
import { EcosystemSwitcher } from './EcosystemSwitcher';
import { EcosystemAuthBridge } from './EcosystemAuthBridge';
import Link from 'next/link';
import { Disc, Mic2, Radio, Send, X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsEcosystemOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoData, setDemoData] = useState({
    artistName: '',
    email: '',
    genre: 'ambient',
    trackLink: '',
    notes: ''
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#12141a] border border-[#c5a059]/40 flex items-center justify-center p-1.5 shadow-lg shadow-[#c5a059]/10 group-hover:border-[#c5a059] group-hover:scale-105 transition-all">
                <img
                  src="/images/logo/logo-transparent.png"
                  alt="YALINIZ Medya"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                />
              </div>
              <div>
                <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-white group-hover:text-[#c5a059] transition-colors block">
                  YALINIZ MEDYA
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059]/80 block -mt-0.5">
                  ANALOG VINYL IMPRINT • MASTER SYNC
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-zinc-300">
            <a href="#tracking-studio" className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5">
              <Mic2 className="w-3.5 h-3.5 text-[#c5a059]" /> Live Tracking
            </a>
            <a href="#turntable-player" className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#c5a059]" /> Virtual Turntable
            </a>
            <a href="#vinyl-releases" className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5">
              <Disc className="w-3.5 h-3.5 text-[#c5a059]" /> 180g Vinyl
            </a>
            <a href="#sync-licensing" className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" /> One-Stop Sync
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEcosystemOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-[#c5a059]/50 text-zinc-300 hover:text-white hover:bg-white/[0.06] text-[11px] font-mono transition-all duration-300 group"
              title="Global Ekosistem (⌘K)"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Ekosistem</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-[9px] text-zinc-400 font-mono">
                ⌘K
              </kbd>
            </button>
            <EcosystemAuthBridge />
            <button
              onClick={() => { setIsDemoModalOpen(true); setDemoSubmitted(false); }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.16em] font-bold transition-all duration-300 group shadow-md bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88c3a] text-[#08080a] shadow-[0_2px_16px_rgba(197,160,89,0.25)] hover:shadow-[0_4px_24px_rgba(197,160,89,0.45)] hover:scale-[1.02] hover:brightness-110"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit A&R Demo</span>
            </button>
            <a href="https://yalinizmedya.com" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-[#c5a059]/40 hover:bg-white/[0.06] text-[11px] font-mono transition-all hidden sm:inline-flex">Corporate Hub</a>
          </div>
        </div>
      </header>

      {/* A&R Demo Drop Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {demoSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 mx-auto flex items-center justify-center text-[#c5a059]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Master Transmitted to A&R</h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{demoData.artistName}</span>. Our A&R committee reviews all acoustic and analog submissions in our calibrated mastering room. We will respond within 7 business days if your work aligns with our release schedule.
                </p>
                <button
                  onClick={() => setIsDemoModalOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition"
                >
                  Return to Records Portal
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2.5 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-2">
                  <Disc className="w-4 h-4" /> A&R Unreleased Submissions
                </div>
                <h2 className="font-serif text-2xl font-bold text-white mb-2">Submit Master Recording to YALINIZ Records</h2>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
                  We sign auteur composers, acoustic artists, and avant-garde producers for multi-track studio recording, heavyweight vinyl pressings, and premier cinema sync licensing.
                </p>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Artist / Act Name</label>
                      <input
                        type="text"
                        required
                        value={demoData.artistName}
                        onChange={(e) => setDemoData({ ...demoData, artistName: e.target.value })}
                        placeholder="e.g. Sylvan Drift"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Contact Email</label>
                      <input
                        type="email"
                        required
                        value={demoData.email}
                        onChange={(e) => setDemoData({ ...demoData, email: e.target.value })}
                        placeholder="artist@label.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Sonic Discipline</label>
                      <select
                        value={demoData.genre}
                        onChange={(e) => setDemoData({ ...demoData, genre: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                      >
                        <option value="ambient">Neoclassical / Ambient Cinematic</option>
                        <option value="acoustic">Acoustic Multi-Track / Live Ensemble</option>
                        <option value="ost">Film & Interactive Media Score</option>
                        <option value="analog_synth">Modular / Analog Tape Drone</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Unreleased Audio Link (WAV/FLAC)</label>
                      <input
                        type="url"
                        required
                        value={demoData.trackLink}
                        onChange={(e) => setDemoData({ ...demoData, trackLink: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Master Specifications & Artistic Context</label>
                    <textarea
                      rows={3}
                      value={demoData.notes}
                      onChange={(e) => setDemoData({ ...demoData, notes: e.target.value })}
                      placeholder="Detail tracking environment, microphone chain, whether stems exist, and publishing status..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Fiduciary Protection: 100% Unreleased Audio NDA Covenant</span>
                    <span className="text-[#c5a059] font-mono font-semibold">24-Bit / 96kHz Preferred</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88c3a] text-[#08080a] font-bold text-xs tracking-[0.16em] uppercase hover:brightness-110 hover:shadow-[0_4px_24px_rgba(197,160,89,0.45)] transition-all shadow-lg rounded-full"
                  >
                    Transmit Secure Submission
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Global Ecosystem Switcher */}
      <EcosystemSwitcher
        isOpen={isEcosystemOpen}
        onClose={() => setIsEcosystemOpen(false)}
        currentNodeId="records"
      />
    </>
  );
}
