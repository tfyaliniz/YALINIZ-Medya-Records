import React from 'react';
import { Disc, ShieldCheck, Music, Headphones, Globe, Mic2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/90 py-16 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 p-1 flex items-center justify-center">
                <img src="/images/logo/YALINIZ-Medya-Logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif text-base font-bold text-white tracking-wider">YALINIZ RECORDS</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              The boutique record imprint, multi-track studio music recording, and master catalog division of YALINIZ Medya. Recording analog masters, pressing heavyweight audiophile vinyl records, and providing one-stop sync licensing clearances to world-class cinema directors.
            </p>
            <div className="flex items-center gap-2 text-zinc-500">
              <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Istanbul • Levent Analog Cutting Lathe & Studio 01</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <Mic2 className="w-3.5 h-3.5 text-[#c5a059]" /> Studio Music Recording
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#tracking-studio" className="hover:text-white transition">Studer A800 24-Track 2" Tape Tracking</a></li>
              <li><a href="#tracking-studio" className="hover:text-white transition">Telefunken & Neumann Vintage Tube Mic Locker</a></li>
              <li><a href="#tracking-studio" className="hover:text-white transition">Neve 1073 & API 512c Console Preamps</a></li>
              <li><a href="#tracking-studio" className="hover:text-white transition">Floating Chamber Acoustic Isolation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <Disc className="w-3.5 h-3.5 text-[#c5a059]" /> 180g Vinyl Pressing
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#vinyl-releases" className="hover:text-white transition">180g Virgin Audiophile Wax</a></li>
              <li><a href="#vinyl-releases" className="hover:text-white transition">Half-Speed DMM Direct Metal Mastering</a></li>
              <li><a href="#vinyl-releases" className="hover:text-white transition">Deluxe Gatefold Foil Embossed Sleeves</a></li>
              <li><a href="#vinyl-releases" className="hover:text-white transition">Numbered Limited Collector Editions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" /> One-Stop Sync & Legal
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#sync-licensing" className="hover:text-white transition">100% In-House Master & Publishing</a></li>
              <li><a href="https://yalinizmedya.com/sozlesme" target="_blank" rel="noreferrer" className="hover:text-white transition">Sync Master License Terms</a></li>
              <li><a href="https://yalinizmedya.com/gizlilik" target="_blank" rel="noreferrer" className="hover:text-white transition">Artist Royalty Transparency Code</a></li>
              <li><a href="https://yalinizmedya.com" target="_blank" rel="noreferrer" className="hover:text-white transition">YALINIZ Medya Holding</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} YALINIZ Records. Directed by Taha Furkan YALINIZ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#c5a059] font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
              Direct Metal Mastering: Active
            </span>
            <a href="https://yalinizmedya.com" className="hover:text-zinc-300 transition">Corporate Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
