'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, ShieldCheck, UserCheck, Key, ExternalLink, ChevronDown, Check, Sparkles, LogOut, Lock } from 'lucide-react';

export interface SSOProfile {
  id: 'founder' | 'artist' | 'manager' | 'guest';
  name: string;
  roleTitle: string;
  badge: string;
  avatar: string;
  clearanceLevel: string;
  clearanceText: string;
  allowedNodes: string;
}

export const SSO_PROFILES: SSOProfile[] = [
  {
    id: 'founder',
    name: 'Taha Furkan YALINIZ',
    roleTitle: 'Kurucu & Yönetim Kurulu Başkanı',
    badge: 'Holding Kurucusu',
    avatar: '/photos/Kurucu.jpeg',
    clearanceLevel: 'LEVEL_5_EXECUTIVE',
    clearanceText: 'Tam Yönetişim & Tüm Düğümler (16/16)',
    allowedNodes: '16 / 16 Platform'
  },
  {
    id: 'artist',
    name: 'YALINIZ Resident Artist',
    roleTitle: 'Baş Sanatçı & Müzik Prodüktörü',
    badge: 'Kreatif Prodüktör',
    avatar: '/images/logo/logo-transparent.png',
    clearanceLevel: 'LEVEL_3_CREATIVE',
    clearanceText: 'Stüdyo, Plak, Dağıtım & Telif',
    allowedNodes: 'Records, Studio, Music, Casting'
  },
  {
    id: 'manager',
    name: 'YALINIZ Operasyon Direktörü',
    roleTitle: 'İdari Yönetici & Ajans Direktörü',
    badge: 'Operasyon Yöneticisi',
    avatar: '/images/logo/logo-transparent.png',
    clearanceLevel: 'LEVEL_4_OPERATIONS',
    clearanceText: 'Yetenek Havuzu & Finans Raporları',
    allowedNodes: 'Admin, Talent, Management, Career'
  },
  {
    id: 'guest',
    name: 'Misafir Kullanıcı',
    roleTitle: 'Dijital Keşifçi & Ziyaretçi',
    badge: 'Açık Erişim',
    avatar: '',
    clearanceLevel: 'LEVEL_1_PUBLIC',
    clearanceText: 'Genel Kamu Önizleme',
    allowedNodes: 'Genel Vitrinler'
  }
];

const STORAGE_KEY = 'yaliniz_sso_profile_id';
const COOKIE_NAME = 'yaliniz_sso_id';

export const EcosystemAuthBridge: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<SSOProfile>(SSO_PROFILES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read stored profile
  useEffect(() => {
    const readProfile = () => {
      try {
        let profileId = localStorage.getItem(STORAGE_KEY);
        if (!profileId) {
          const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
          if (match) profileId = match[2];
        }
        if (profileId) {
          const found = SSO_PROFILES.find((p) => p.id === profileId);
          if (found) setActiveProfile(found);
        }
      } catch {
        // Fallback to founder default
      }
    };

    readProfile();

    // BroadcastChannel for cross-tab sync
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('yaliniz_ecosystem_sso');
        channel.onmessage = (event) => {
          if (event.data?.profileId) {
            const found = SSO_PROFILES.find((p) => p.id === event.data.profileId);
            if (found) setActiveProfile(found);
          }
        };
      }
    } catch {
      // Ignored
    }

    // Storage event for fallback cross-tab sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const found = SSO_PROFILES.find((p) => p.id === e.newValue);
        if (found) setActiveProfile(found);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchProfile = (profile: SSOProfile) => {
    setActiveProfile(profile);
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, profile.id);
      document.cookie = `${COOKIE_NAME}=${profile.id}; path=/; max-age=2592000; SameSite=Lax`;
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('yaliniz_ecosystem_sso');
        channel.postMessage({ profileId: profile.id });
        channel.close();
      }
    } catch {
      // Local storage fallback
    }
  };

  const getAdminUrl = () => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocal) return 'http://localhost:3001';
    }
    return 'https://admin.yalinizmedya.com';
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button (Sleek Luxury SSO Pill) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-[#c5a059]/40 hover:border-[#c5a059] transition-all shadow-sm group"
        title="Merkezi Kimlik Doğrulama (SSO) Durumu"
      >
        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#c5a059]/60 flex items-center justify-center bg-black/60 flex-shrink-0">
          {activeProfile.avatar ? (
            <img
              src={activeProfile.avatar}
              alt={activeProfile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
          )}
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black" />
        </div>

        <div className="hidden sm:flex flex-col text-left leading-none">
          <span className="text-[11px] font-serif font-bold text-white group-hover:text-[#c5a059] transition-colors truncate max-w-[110px]">
            {activeProfile.name.split(' ')[0]} {activeProfile.name.split(' ')[1] || ''}
          </span>
          <span className="text-[9px] font-mono text-zinc-400">
            {activeProfile.badge}
          </span>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-[#c5a059] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0e0e13] border border-white/10 shadow-2xl shadow-black/80 backdrop-blur-2xl z-50 p-4 text-[#f2efe9] animate-in fade-in zoom-in-95 duration-150">
          {/* Header info */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span className="font-mono text-[10px] text-[#c5a059] uppercase tracking-widest font-bold">
                Ecosystem SSO Bridge
              </span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              16 Düğüm Senkronize
            </span>
          </div>

          {/* Active Profile Card */}
          <div className="p-3 rounded-xl bg-black/50 border border-[#c5a059]/30 mb-3.5 flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#c5a059]/50 bg-black flex-shrink-0">
              {activeProfile.avatar ? (
                <img
                  src={activeProfile.avatar}
                  alt={activeProfile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-[#c5a059]">
                  <Shield className="w-6 h-6" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-serif text-sm font-bold text-white truncate">
                  {activeProfile.name}
                </h4>
                {activeProfile.id === 'founder' && (
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059] flex-shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-[#c5a059] font-medium leading-tight mb-1">
                {activeProfile.roleTitle}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                  {activeProfile.allowedNodes}
                </span>
                <span>{activeProfile.clearanceLevel}</span>
              </div>
            </div>
          </div>

          {/* Switch Profile Section */}
          <div className="mb-3">
            <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Kimlik / Rol Simülatörü</span>
              <span className="text-[9px] text-zinc-500">Tüm sekmeler güncellenir</span>
            </p>

            <div className="space-y-1.5">
              {SSO_PROFILES.map((profile) => {
                const isSelected = activeProfile.id === profile.id;
                return (
                  <button
                    key={profile.id}
                    onClick={() => switchProfile(profile)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#1a1a24] border-[#c5a059]/60 shadow-sm'
                        : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center flex-shrink-0">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-[#c5a059] transition-colors">
                          {profile.name}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          {profile.badge} • {profile.clearanceText}
                        </div>
                      </div>
                    </div>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-[#c5a059]" />
                    ) : (
                      <Key className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick links & Security Note */}
          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Lock className="w-3 h-3" /> mTLS + JWT Token
            </span>
            <a
              href={getAdminUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Admin Kokpiti</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcosystemAuthBridge;
