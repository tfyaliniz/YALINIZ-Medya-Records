'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  Sparkles,
  Building2,
  Disc,
  Video,
  Users2,
  ArrowRight,
  Lock,
  Compass,
  CheckCircle2
} from 'lucide-react';

export interface ExecutiveProfile {
  id: 'founder' | 'creative' | 'operations' | 'guest';
  name: string;
  title: string;
  roleBadge: string;
  avatar: string;
  clearanceCode: string;
  governanceScope: string;
}

export const EXECUTIVE_PROFILES: ExecutiveProfile[] = [
  {
    id: 'founder',
    name: 'Taha Furkan YALINIZ',
    title: 'Kurucu & Yönetim Kurulu Başkanı',
    roleBadge: 'Holding İcra Kurulu',
    avatar: '/photos/Kurucu.jpeg',
    clearanceCode: 'EXECUTIVE SOVEREIGN • LEVEL 5',
    governanceScope: '16 / 16 Platform • Tam Yetki'
  },
  {
    id: 'creative',
    name: 'Kreatif Direktörlük',
    title: 'Baş Sanatçı & Prodüktör Masası',
    roleBadge: 'Müzik & Sinema İdaresi',
    avatar: '/images/logo/logo-transparent.png',
    clearanceCode: 'CREATIVE MASTERS • LEVEL 3',
    governanceScope: 'Records, Studio, Music, Casting'
  },
  {
    id: 'guest',
    name: 'Misafir Delegasyon',
    title: 'Kurumsal Ziyaretçi & İnceleme',
    roleBadge: 'Açık İnceleme',
    avatar: '',
    clearanceCode: 'PUBLIC ACCESS • LEVEL 1',
    governanceScope: 'Genel Vitrinler & Portfolyo'
  }
];

const STORAGE_KEY = 'yaliniz_executive_profile_id';
const COOKIE_NAME = 'yaliniz_executive_id';

export const EcosystemAuthBridge: React.FC = () => {
  const [profile, setProfile] = useState<ExecutiveProfile>(EXECUTIVE_PROFILES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read stored profile
  useEffect(() => {
    try {
      let storedId = localStorage.getItem(STORAGE_KEY);
      if (!storedId) {
        const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
        if (match) storedId = match[2];
      }
      if (storedId) {
        const found = EXECUTIVE_PROFILES.find((p) => p.id === storedId);
        if (found) setProfile(found);
      }
    } catch {
      // Default to founder
    }

    // BroadcastChannel sync
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('yaliniz_executive_portal');
        channel.onmessage = (e) => {
          if (e.data?.profileId) {
            const found = EXECUTIVE_PROFILES.find((p) => p.id === e.data.profileId);
            if (found) setProfile(found);
          }
        };
      }
    } catch {}

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const found = EXECUTIVE_PROFILES.find((p) => p.id === e.newValue);
        if (found) setProfile(found);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const selectProfile = (newProfile: ExecutiveProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY, newProfile.id);
      document.cookie = `${COOKIE_NAME}=${newProfile.id}; path=/; max-age=2592000; SameSite=Lax`;
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('yaliniz_executive_portal');
        channel.postMessage({ profileId: newProfile.id });
        channel.close();
      }
    } catch {}
  };

  const getUrl = (port: number, subdomain: string) => {
    return "https://" + subdomain;
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Refined Executive Pill Button in Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full border transition-all duration-300 group ${
          isOpen
            ? 'bg-[#14141a] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.25)] ring-1 ring-[#c5a059]/40'
            : 'bg-[#0b0b0f]/90 hover:bg-[#121217] border-[#c5a059]/35 hover:border-[#c5a059] shadow-[0_2px_12px_rgba(0,0,0,0.5)]'
        }`}
        title="YALINIZ Medya Group — Kurumsal İdare & Yönetici Geçidi"
        aria-label="Executive Portal"
      >
        {/* Crisp Face-Focused Portrait */}
        <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#c5a059]/60 shadow-[0_0_8px_rgba(197,160,89,0.3)] bg-black flex-shrink-0 flex items-center justify-center">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover object-[center_16%] scale-[1.7] transform"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
          )}
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black animate-pulse" />
        </div>

        {/* Text Details */}
        <div className="hidden md:flex flex-col text-left leading-tight">
          <span className="text-[11px] font-serif font-bold text-white group-hover:text-[#c5a059] transition-colors tracking-wide truncate max-w-[140px]">
            {profile.name}
          </span>
          <span className="text-[8.5px] font-mono uppercase tracking-widest text-[#c5a059]/90 font-medium">
            {profile.roleBadge}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#c5a059]/80 group-hover:text-[#c5a059] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Luxury Institutional Executive Portal Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-[390px] sm:w-[440px] max-w-[94vw] rounded-3xl bg-[#08080c]/95 border border-[#c5a059]/35 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_35px_rgba(197,160,89,0.12)] backdrop-blur-3xl z-50 p-5 sm:p-6 text-[#f2efe9] animate-in fade-in zoom-in-95 duration-200">
          {/* Top Bar / Crest */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#c5a059]/20 to-transparent border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[9.5px] text-[#c5a059] uppercase tracking-[0.2em] font-bold block">
                  YALINIZ MEDYA GROUP
                </span>
                <span className="text-[10.5px] text-zinc-400 font-light block">
                  Kurumsal İdare & Yetkili Geçit Portalı
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Doğrulanmış Oturum
            </span>
          </div>

          {/* Prestigious Founder Showcase Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-black/80 via-[#101017]/80 to-black/90 border border-[#c5a059]/40 shadow-xl mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c5a059]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10">
              {/* High-Resolution Portrait with Gold Backlight */}
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-[#c5a059]/70 shadow-[0_0_20px_rgba(197,160,89,0.25)] bg-black flex-shrink-0">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover object-[center_16%] scale-[1.7] transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-[#c5a059]">
                    <Shield className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              </div>

              {/* Title & Institutional Credential */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-white tracking-tight truncate">
                    {profile.name}
                  </h3>
                  {profile.id === 'founder' && (
                    <Sparkles className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                  )}
                </div>

                <p className="text-xs text-[#c5a059] font-medium mt-0.5 leading-snug">
                  {profile.title}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[9.5px] font-mono text-zinc-300">
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-white font-medium">
                    {profile.governanceScope}
                  </span>
                  <span className="text-zinc-500 font-medium">
                    {profile.clearanceCode}
                  </span>
                </div>
              </div>
            </div>

            {profile.id === 'founder' && (
              <p className="mt-3 pt-2.5 border-t border-white/[0.06] text-[11px] text-zinc-400 font-light italic leading-relaxed">
                &ldquo;Bağımsız sinema, akustik mükemmeliyet ve ileri teknolojinin kesişiminde küresel bir vizyon.&rdquo;
              </p>
            )}
          </div>

          {/* Direct Institutional Command Desks */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
                Stratejik Yönetim Masaları
              </span>
              <span className="text-[9.5px] font-mono text-[#c5a059]">16 Düğüm Aktif</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Admin Cockpit */}
              <a
                href={getUrl(3001, 'admin.yalinizmedya.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/40 hover:bg-[#14141e] border border-white/[0.07] hover:border-[#c5a059]/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#c5a059] transition-colors">
                      Holding Cockpit
                    </h4>
                    <span className="text-[9.5px] font-mono text-zinc-500 block">
                      Finans & İdare (:3001)
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#c5a059] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Records & Vinyl */}
              <a
                href={getUrl(3015, 'records.yalinizmedya.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/40 hover:bg-[#14141e] border border-white/[0.07] hover:border-[#c5a059]/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Disc className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#c5a059] transition-colors">
                      YALINIZ Records
                    </h4>
                    <span className="text-[9.5px] font-mono text-zinc-500 block">
                      Bant & Vinil (:3015)
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#c5a059] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Studio Volume */}
              <a
                href={getUrl(3013, 'studio.yalinizmedya.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/40 hover:bg-[#14141e] border border-white/[0.07] hover:border-[#c5a059]/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#c5a059] transition-colors">
                      Plato & LED Volume
                    </h4>
                    <span className="text-[9.5px] font-mono text-zinc-500 block">
                      Sanal Film (:3013)
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#c5a059] group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Talent Roster */}
              <a
                href={getUrl(3014, 'talent.yalinizmedya.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/40 hover:bg-[#14141e] border border-white/[0.07] hover:border-[#c5a059]/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#c5a059] transition-colors">
                      Yetenek & Kast
                    </h4>
                    <span className="text-[9.5px] font-mono text-zinc-500 block">
                      Haute Couture (:3014)
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#c5a059] group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Minimalist Executive Clearance Level Switcher */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
              <Lock className="w-3 h-3 text-[#c5a059]" />
              <span className="hidden sm:inline">Erişim Düzeyi:</span>
            </div>

            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/[0.07]">
              {EXECUTIVE_PROFILES.map((p) => {
                const isSelected = profile.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => selectProfile(p)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                      isSelected
                        ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p.id === 'founder' ? 'Kurucu' : p.id === 'creative' ? 'Kreatif' : 'Misafir'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcosystemAuthBridge;
