'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ExternalLink,
  Compass,
  CheckCircle2,
  Terminal,
  Layers,
  Radio,
  Sparkles
} from 'lucide-react';

export interface EcosystemNode {
  id: string;
  name: string;
  subdomain: string;
  port: number;
  division: 'Operations' | 'Creative' | 'Talent' | 'Music' | 'AI' | 'Community' | 'Editorial';
  accent: string;
  badge: string;
  description: string;
  features: string[];
  externalUrl?: string;
}

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: 'hub',
    name: 'YALINIZ Medya Group',
    subdomain: 'yalinizmedya.com',
    port: 3000,
    division: 'Operations',
    accent: '#c5a059',
    externalUrl: 'https://yalinizmedya.com',
    badge: 'Merkezi Karargâh',
    description: 'YALINIZ Medya küresel holding ve kurumsal geçit platformu. 5 ana disiplin ve 16 bağımsız düğümün merkezi operasyon karargâhı.',
    features: ['Merkezi Hub', 'Tek Kimlik (SSO)', 'Kurumsal Yönetişim', 'Stratejik Ortaklıklar']
  },
  {
    id: 'records',
    name: 'YALINIZ Records',
    subdomain: 'records.yalinizmedya.com',
    port: 3015,
    division: 'Music',
    accent: '#c5a059',
    externalUrl: 'https://records.yalinizmedya.com',
    badge: 'Müzik Kaydı & Plak Şirketi',
    description: 'Çok kanallı analog stüdyo müzik kayıtları, Studer A800 24-kanal bant seansları, 180g odyofil vinil plak basımı ve küresel dağıtım.',
    features: ['2" Bant Kayıtları', 'Tüplü Mikrofon Kabini', '180g Odyofil Vinil', 'A&R Demo Kabul']
  },
  {
    id: 'admin',
    name: 'YALINIZ Admin',
    subdomain: 'admin.yalinizmedya.com',
    port: 3001,
    division: 'Operations',
    accent: '#D4AF37',
    externalUrl: 'https://admin.yalinizmedya.com',
    badge: 'Kurumsal Operasyon',
    description: 'Merkezi kurumsal yönetim paneli; yetenek havuzu, kampanya telemetrisi, telif denetimleri ve operasyon kontrolü.',
    features: ['Yönetim Kokpiti', 'Finansal Telemetri', 'Telif & Raporlama', 'Erişim Güvenliği']
  },
  {
    id: 'artist',
    name: 'YALINIZ Artist',
    subdomain: 'artist.yalinizmedya.com',
    port: 3002,
    division: 'Talent',
    accent: '#c5a059',
    externalUrl: 'https://artist.yalinizmedya.com',
    badge: 'Auteur Sanatçı Temsili',
    description: 'Özgün sinemacılar, besteciler ve multimedya icracıları için elit kürasyon, portfolyo ve kariyer yönetimi.',
    features: ['Auteur Temsili', 'Reel Arşivi', 'Ödül Portföyü', 'Küratöryel Seçki']
  },
  {
    id: 'blog',
    name: 'YALINIZ Blog',
    subdomain: 'blog.yalinizmedya.com',
    port: 3003,
    division: 'Editorial',
    accent: '#B89758',
    externalUrl: 'https://blog.yalinizmedya.com',
    badge: 'Sinema & Kültür Monografisi',
    description: 'Sinema kuramı, yapay zeka estetiği, bağımsız film tahlilleri ve derinlikli monografiler.',
    features: ['Sinema Kuramı', 'Estetik Denemeler', 'Kritik Tahliller', 'Sektör Analizleri']
  },
  {
    id: 'career',
    name: 'YALINIZ Career',
    subdomain: 'career.yalinizmedya.com',
    port: 3004,
    division: 'Operations',
    accent: '#e5c158',
    externalUrl: 'https://career.yalinizmedya.com',
    badge: 'Prodüksiyon Loncası',
    description: 'Yönetmenler, post-prodüksiyon uzmanları, ses mühendisleri ve vizyoner yapımcılar için küresel kariyer ağı.',
    features: ['Açık Pozisyonlar', 'Lonca Başvurusu', 'Yetenek Programı', 'Burs & Rezidans']
  },
  {
    id: 'casting',
    name: 'YALINIZ Casting',
    subdomain: 'casting.yalinizmedya.com',
    port: 3005,
    division: 'Creative',
    accent: '#c5a059',
    externalUrl: 'https://casting.yalinizmedya.com',
    badge: 'Sinematik Cast & Audition',
    description: 'Uzun metraj film, dizi ve reklam prodüksiyonları için dijital audition ve karakter havuzu.',
    features: ['Karakter Analizi', 'Online Audition', 'Yönetmen Seçkisi', 'Demo Reel İnceleme']
  },
  {
    id: 'community',
    name: 'YALINIZ Community',
    subdomain: 'community.yalinizmedya.com',
    port: 3006,
    division: 'Community',
    accent: '#D4AF37',
    externalUrl: 'https://community.yalinizmedya.com',
    badge: 'Sinemacılar & Besteciler Loncası',
    description: 'Bağımsız sinemacılar, besteciler ve yaratıcı profesyoneller için özel topluluk ve ustalık sınıfları.',
    features: ['Ustalık Sınıfları', 'Ortak Projeler', 'Geri Bildirim Ağı', 'Özel Gösterimler']
  },
  {
    id: 'forum',
    name: 'YALINIZ Forum',
    subdomain: 'forum.yalinizmedya.com',
    port: 3007,
    division: 'Community',
    accent: '#B89758',
    externalUrl: 'https://forum.yalinizmedya.com',
    badge: 'Teknik & Felsefi Tartışmalar',
    description: 'Kamera teknolojileri, renk derecelendirme (grading), analog mastering ve çağdaş estetik tartışmaları.',
    features: ['Hiyerarşik Tartışma', 'Teknik Sorular', 'Ekipman Tahlili', 'Estetik Manifestolar']
  },
  {
    id: 'lab',
    name: 'YALINIZ Lab',
    subdomain: 'lab.yalinizmedya.com',
    port: 3008,
    division: 'AI',
    accent: '#c5a059',
    externalUrl: 'https://lab.yalinizmedya.com',
    badge: 'Ar-Ge & Hesaplamalı Sinema',
    description: 'Üretken yapay zeka, nöral hareket yakalama, sanal prodüksiyon ve yeni nesil medya teknolojileri laboratuvarı.',
    features: ['Nöral Shader Lab', 'Sanal Prodüksiyon', 'Üretken Sinema', 'Prosedürel İşlem']
  },
  {
    id: 'label',
    name: 'YALINIZ Label',
    subdomain: 'label.yalinizmedya.com',
    port: 3009,
    division: 'Music',
    accent: '#e5c158',
    externalUrl: 'https://label.yalinizmedya.com',
    badge: 'Müzik Dağıtım & Telif',
    description: 'Müzik yayıncılığı, küresel streaming dağıtımı, senkronizasyon lisanslama ve telif hakları yönetimi.',
    features: ['Sync Lisanslama', 'Telif Takibi', 'Dijital Dağıtım', 'Streaming Raporlama']
  },
  {
    id: 'management',
    name: 'YALINIZ Management',
    subdomain: 'management.yalinizmedya.com',
    port: 3010,
    division: 'Talent',
    accent: '#D4AF37',
    externalUrl: 'https://management.yalinizmedya.com',
    badge: '360° Auteur & Sanatçı Temsili',
    description: 'Sanatçıların sözleşme, hukuk, finans, basın ilişkileri ve küresel marka işbirliklerinin 360 derece yönetimi.',
    features: ['360° Menajerlik', 'Sözleşme Müzakeresi', 'Marka İşbirlikleri', 'Kriz İletişimi']
  },
  {
    id: 'music',
    name: 'YALINIZ Music',
    subdomain: 'music.yalinizmedya.com',
    port: 3011,
    division: 'Music',
    accent: '#B89758',
    externalUrl: 'https://music.yalinizmedya.com',
    badge: 'Dolby Atmos 7.1.4 & Mastering',
    description: 'Film müzikleri, özgün dizi besteleri, Dolby Atmos 7.1.4 mekânsal ses miksajı ve analog mastering stüdyosu.',
    features: ['Dolby Atmos 7.1.4', 'Stem Mikseri', 'Analog Mastering', 'Film Skorlama']
  },
  {
    id: 'project',
    name: 'YALINIZ Project',
    subdomain: 'project.yalinizmedya.com',
    port: 3012,
    division: 'Creative',
    accent: '#c5a059',
    externalUrl: 'https://project.yalinizmedya.com',
    badge: 'Sinema Portfolyosu & Ortak Yapımlar',
    description: 'Tamamlanan uzun metraj filmler, belgeseller, ortak yapımlar ve festival seçkileri kataloğu.',
    features: ['Uzun Metraj Yapımlar', 'Belgesel Dizisi', 'Festival Kataloğu', 'Kasa Dağıtım']
  },
  {
    id: 'studio',
    name: 'YALINIZ Studio',
    subdomain: 'studio.yalinizmedya.com',
    port: 3013,
    division: 'Creative',
    accent: '#e5c158',
    externalUrl: 'https://studio.yalinizmedya.com',
    badge: 'Film Platoları & Virtual LED Volume',
    description: 'Akustik ses platoları, virtual production LED volume sahneleri, ARRI/RED kamera parkı ve film ekipmanları kiralama.',
    features: ['LED Volume Sahneleri', '12M Tavan Platoları', 'ARRI Kamera Parkı', '3-Faz Güç Altyapısı']
  },
  {
    id: 'talent',
    name: 'YALINIZ Talent',
    subdomain: 'talent.yalinizmedya.com',
    port: 3014,
    division: 'Talent',
    accent: '#D4AF37',
    externalUrl: 'https://talent.yalinizmedya.com',
    badge: 'Oyuncu & Cast Temsili',
    description: 'Uluslararası sinema ve dizi sektörüne hitap eden elit oyuncu kadrosu, yetenek profilleri ve showreel kataloğu.',
    features: ['Elit Oyuncu Kadrosu', 'Showreel Gösterimi', 'Fiziksel Ölçü & Beceri', 'Uluslararası Temsil']
  }
];

interface EcosystemSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentNodeId?: string;
}

export const EcosystemSwitcher: React.FC<EcosystemSwitcherProps> = ({
  isOpen,
  onClose,
  currentNodeId
}) => {
  const [search, setSearch] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Can be toggled if caller listens or parent passes control
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const divisions = [
    { id: 'All', label: 'Tüm Ağ (16)' },
    { id: 'Music', label: 'Müzik & Plak' },
    { id: 'Creative', label: 'Prodüksiyon & Sinema' },
    { id: 'Talent', label: 'Yetenek & Menajerlik' },
    { id: 'AI', label: 'Yapay Zeka & Ar-Ge' },
    { id: 'Editorial', label: 'Yayın & Monografi' },
    { id: 'Operations', label: 'Yönetim & Konsol' }
  ];

  const filteredNodes = ECOSYSTEM_NODES.filter((node) => {
    const matchesDiv = selectedDivision === 'All' || node.division === selectedDivision;
    const q = search.toLowerCase().trim();
    if (!q) return matchesDiv;
    return (
      matchesDiv &&
      (node.name.toLowerCase().includes(q) ||
        node.subdomain.toLowerCase().includes(q) ||
        node.port.toString().includes(q) ||
        node.badge.toLowerCase().includes(q) ||
        node.description.toLowerCase().includes(q) ||
        node.features.some((f) => f.toLowerCase().includes(q)))
    );
  });

  const getNodeUrl = (node: EcosystemNode) => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocal) {
        return `http://localhost:${node.port}`;
      }
    }
    return node.externalUrl || `https://${node.subdomain}`;
  };

  const getTelemetryUrl = () => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocal) {
        return 'http://localhost:3000/ecosystem';
      }
    }
    return 'https://yalinizmedya.com/ecosystem';
  };


  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl rounded-2xl shadow-2xl border border-white/10 bg-[#0c0c0f] text-[#f2efe9] overflow-hidden flex flex-col max-h-[85vh] z-10">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-[#111116]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c5a059]/20 via-[#d4af37]/10 to-transparent border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#c5a059] uppercase tracking-widest font-bold">
                  YALINIZ MEDYA GROUP
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  16 DÜĞÜM AKTİF
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Global Ekosistem Gezgini
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-zinc-800/80 border border-white/10 text-[10px] font-mono text-zinc-400">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-white/10 bg-[#18181f] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 sm:p-5 border-b border-white/10 space-y-3 bg-[#13131a]">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Platform, port, yetenek veya disiplin ara... (Örn: Records, Atmos, Plato, 3015)"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>

          {/* Division Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {divisions.map((div) => {
              const isSelected = selectedDivision === div.id;
              return (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                    isSelected
                      ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                      : 'bg-[#181820] border border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                  }`}
                >
                  {div.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[55vh] space-y-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pb-2">
            <span>
              {filteredNodes.length} / {ECOSYSTEM_NODES.length} Platform Görüntüleniyor
            </span>
            <span className="hidden sm:inline">
              Port Spektrumu :3000 – :3015 • Sıfır Güven SSO Mesh
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredNodes.map((node) => {
              const isCurrent = currentNodeId === node.id;
              return (
                <a
                  key={node.id}
                  href={getNodeUrl(node)}
                  target={isCurrent ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                    isCurrent
                      ? 'bg-[#181822] border-[#c5a059]/50 shadow-md ring-1 ring-[#c5a059]/30'
                      : 'bg-[#121217] border-white/5 hover:border-[#c5a059]/40 hover:bg-[#15151e]'
                  }`}
                >
                  <div>
                    {/* Top Row: Subdomain + Live Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                      <span className="font-mono text-[11px] text-[#c5a059] font-medium truncate">
                        {node.subdomain}
                      </span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isCurrent ? (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 font-bold uppercase tracking-wider">
                            BURADASINIZ
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            PORT :{node.port}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Name + Accent */}
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: node.accent }}
                      />
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#c5a059] transition-colors">
                        {node.name}
                      </h3>
                    </div>

                    <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                      {node.badge}
                    </p>

                    <p className="text-xs text-zinc-300 font-light line-clamp-2 leading-relaxed mb-3">
                      {node.description}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {node.features.slice(0, 3).map((feat, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[10px] text-zinc-400 font-mono"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 text-[10px]">
                      Dedicated Port {node.port}
                    </span>
                    <span className="text-[#c5a059] group-hover:underline inline-flex items-center gap-1 text-[11px] font-medium uppercase">
                      {isCurrent ? 'Mevcut Sayfa' : 'Platforma Git'}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3.5 sm:p-4 border-t border-white/10 bg-[#0e0e13] flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>16 / 16 Egemen Servis Aktif • TLS 1.3 / mTLS Mesh</span>
          </div>
          <a
            href={getTelemetryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c5a059] hover:underline flex items-center gap-1"
          >
            <span>Canlı Ağ Telemetrisi</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EcosystemSwitcher;
