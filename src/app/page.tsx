import React from 'react';
import Image from 'next/image';
import LiveTrackingStudioWidget from '@/components/widgets/LiveTrackingStudioWidget';
import CatalogSyncWidget from '@/components/widgets/CatalogSyncWidget';
import AudiophilePlayer from '@/components/AudiophilePlayer';
import { VINYL_RELEASES } from '@/data/mockData';
import { Disc, Mic2, Radio, ShieldCheck, Waves, Sliders, ArrowRight, Award, Compass, Sparkles } from 'lucide-react';

export default function RecordsPage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-white selection:bg-[#c5a059] selection:text-[#08080a] selection:bg-[#c5a059] selection:text-[#08080a]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* Hero Section */}
        <section className="relative pt-8 pb-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] text-xs font-semibold uppercase tracking-widest">
            <Disc className="w-3.5 h-3.5" />
            YALINIZ Records • Studio Music Recording & Vinyl Imprint
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Studio Music Recording & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3e7c4] via-[#d4af37] to-[#b88c3a]">Heavyweight Vinyl</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            From 24-track 2-inch analog tape tracking through historic tube microphones to half-speed cut 180g virgin wax. YALINIZ Records unites acoustic purity, physical vinyl pressing, and 100% one-stop sync licensing for global cinema directors.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#tracking-studio"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88c3a] text-black font-semibold text-xs tracking-wider uppercase hover:brightness-110 transition shadow-lg shadow-[#c5a059]/20 flex items-center gap-2"
            >
              <Mic2 className="w-4 h-4" /> Live Tracking Console
            </a>
            <a
              href="#turntable-player"
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-medium text-xs tracking-wider uppercase transition flex items-center gap-2"
            >
              <Radio className="w-4 h-4 text-[#c5a059]" /> Virtual Turntable
            </a>
            <a
              href="#vinyl-releases"
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-medium text-xs tracking-wider uppercase transition flex items-center gap-2"
            >
              <Disc className="w-4 h-4 text-[#c5a059]" /> 180g Vinyl Releases
            </a>
          </div>
        </section>

        {/* Live Studio Tracking Console (Interactive Studer A800 24-Track) */}
        <section>
          <LiveTrackingStudioWidget />
        </section>

        {/* Interactive Virtual Turntable & Sync Suite */}
        <section>
          <CatalogSyncWidget />
        </section>

        {/* Physical Vinyl Editions Showcase */}
        <section id="vinyl-releases" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-semibold text-[#c5a059] uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Disc className="w-4 h-4" /> Numbered Physical Editions
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                180g Heavyweight Vinyl Releases
              </h2>
            </div>
            <span className="text-xs text-zinc-400 font-mono">
              HALF-SPEED DIRECT METAL MASTERING (DMM) • NEUMANN VMS 80 LATHE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VINYL_RELEASES.map((release) => (
              <div
                key={release.id}
                className="group rounded-2xl bg-zinc-950 border border-white/10 hover:border-[#c5a059]/40 transition-all overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Album Artwork with Hover Zoom & Matrix Badges */}
                  <div className="relative aspect-square overflow-hidden bg-zinc-900">
                    <img
                      src={release.coverImage}
                      alt={release.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-[#c5a059]">
                      {release.catalogNumber}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-white">
                      {release.rpm} RPM • {release.format.split(' ')[0]}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs text-[#c5a059] font-medium">{release.genre}</div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#e5c07b] transition">
                      {release.title}
                    </h3>
                    <p className="text-sm text-zinc-300">{release.artist}</p>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{release.description}</p>
                    <div className="pt-3 text-xs text-zinc-400 border-t border-white/5 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Pressing:</span>
                        <span className="text-zinc-300 text-right font-medium">{release.vinylEdition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Vault Inventory:</span>
                        <span className="text-[#c5a059] font-mono font-semibold">{release.availableStock} / {release.pressingUnits}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#turntable-player"
                    className="w-full py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#c5a059]/40 text-xs font-semibold text-zinc-300 hover:text-white transition text-center flex items-center justify-center gap-1.5"
                  >
                    Spin on Turntable <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 180g Audiophile Vinyl & Master Tape Interactive Turntable */}
        <AudiophilePlayer />

        {/* Executive Vision & Fiduciary Leadership Statement */}
        <section className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founder Portrait */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#c5a059]/30 shadow-2xl bg-zinc-900">
                <img
                  src="/photos/Kurucu.jpeg"
                  alt="Taha Furkan YALINIZ"
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest block">Executive Producer & Founder</span>
                  <span className="font-serif text-lg font-bold text-white block">Taha Furkan YALINIZ</span>
                  <span className="text-[11px] text-zinc-400">YALINIZ Medya Group</span>
                </div>
              </div>
            </div>

            {/* Vision Copy */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-xs font-semibold uppercase tracking-widest">
                <Award className="w-3.5 h-3.5" /> Institutional Music Manifesto
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-snug">
                "In an era of hyper-compressed algorithms, acoustic truth and analog friction remain sacred."
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                YALINIZ Records was founded on a singular conviction: genuine cultural resonance cannot be faked through digital shortcuts or detached AI prompts. We record real performers playing real instruments in acoustically pure soundstages, captured on 2-inch analog tape with historic vacuum tube microphones.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Every release cut onto our 180g vinyl records and licensed for cinematic synchronization carries absolute artistic dignity, transparent royalty structures, and 100% pre-cleared copyright authority.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 border-t border-white/5">
                <div>
                  <span className="text-zinc-500 uppercase block">RECORDING STANDARD</span>
                  <span className="text-white font-bold">Studer A800 24-Track 2"</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block">CUTTING LATHE</span>
                  <span className="text-white font-bold">Neumann VMS 80 (DMM)</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block">CLEARANCE SPEED</span>
                  <span className="text-[#c5a059] font-bold">&lt; 24 Hours Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sync Licensing One-Stop Charter */}
        <section id="sync-licensing" className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-xs font-semibold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct Clearance Covenant
            </div>
            <h2 className="font-serif text-3xl font-bold text-white leading-tight">
              Why Premier Film Directors License Directly from YALINIZ Records
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Traditional sync licensing is broken by fractured publishing splits, missing co-writer approvals, and multi-week publisher bureaucracy. Every master in the YALINIZ Records catalog is 100% owned and administered directly by our in-house legal and publishing office. We execute synchronization licenses, stems delivery, and worldwide cue-sheet approvals within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5 text-xs">
            <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
              <div className="text-[#c5a059] font-serif font-bold text-base">Zero Clearance Friction</div>
              <p className="text-zinc-400 leading-relaxed">Both sound recording (Master) and underlying composition (Publishing) are controlled in-house.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
              <div className="text-[#c5a059] font-serif font-bold text-base">Dolby Atmos Spatial Stems</div>
              <p className="text-zinc-400 leading-relaxed">Delivered in discrete 24-bit 96kHz multi-channel stems ready for theatrical re-recording mixing.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
              <div className="text-[#c5a059] font-serif font-bold text-base">Worldwide Legal Indemnity</div>
              <p className="text-zinc-400 leading-relaxed">Comprehensive copyright warranty protecting your feature film in all territories and festivals.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
