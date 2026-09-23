'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface Kit {
  name: string;
  type: string;
  bodyColor: string;
  borderColor: string;
  collarColor: string;
  trimColor: string;
  shortsColor: string;
  shortsBorder: string;
  socksColor: string;
  socksBorder: string;
  textColor: string;
  description: string;
  details: string;
  image?: string;
}

const KITS: Kit[] = [
  {
    name: 'İç Saha Forması',
    type: '1. Takım Resmi (Özel Seri)',
    bodyColor: '#0A1128',
    borderColor: '#1C3F60',
    collarColor: '#FFFFFF',
    trimColor: '#D4AF37',
    shortsColor: '#0A1128',
    shortsBorder: '#1C3F60',
    socksColor: '#0A1128',
    socksBorder: '#1C3F60',
    textColor: '#FFFFFF',
    description: 'Marmara Dalgası & Asimetrik Barok',
    details:
      'Özel dalga desenli gece mavisi kumaş, asimetrik barok desenli kollar, ay-yıldız ve çubuklu geçiş.',
    image: '/forma-on-crop.png',
  },
  {
    name: 'Deplasman Forması',
    type: 'Deplasman',
    bodyColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    collarColor: '#0A1128',
    trimColor: '#0A1128',
    shortsColor: '#FFFFFF',
    shortsBorder: '#CBD5E1',
    socksColor: '#FFFFFF',
    socksBorder: '#CBD5E1',
    textColor: '#0A1128',
    description: 'Saf Beyaz & Lacivert',
    details:
      'Klasik beyaz forma kumaşı, lacivert yaka detayları, kulüp arması ve temiz kurumsal hatlar.',
  },
  {
    name: 'Kaleci Forması',
    type: 'Özel Kaleci Kiti',
    bodyColor: '#D4AF37',
    borderColor: '#B8960F',
    collarColor: '#111827',
    trimColor: '#111827',
    shortsColor: '#111827',
    shortsBorder: '#1F2937',
    socksColor: '#111827',
    socksBorder: '#1F2937',
    textColor: '#111827',
    description: 'Altın Sarısı & Siyah',
    details:
      'Kaleciler için özel tasarlanmış dikkat çekici altın sarısı forma gövdesi ve siyah şort kombinasyonu.',
  },
];

function JerseySvg({ kit }: { kit: Kit }) {
  return (
    <svg
      width="144"
      height="144"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
      aria-label={`${kit.name} illüstrasyonu`}
    >
      <path
        d="M36 20 L16 38 L28 54 L36 44 L36 102 C36 104.2 37.8 106 40 106 L80 106 C82.2 106 84 104.2 84 102 L84 44 L92 54 L104 38 L84 20 Z"
        fill={kit.bodyColor}
        stroke={kit.borderColor}
        strokeWidth="1.5"
      />
      <line
        x1="17"
        y1="38"
        x2="27.5"
        y2="53"
        stroke={kit.trimColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="103"
        y1="38"
        x2="92.5"
        y2="53"
        stroke={kit.trimColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M48 20 C48 30 72 30 72 20"
        stroke={kit.collarColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <image
        href="/logo.png"
        x="49"
        y="35"
        width="22"
        height="22"
        preserveAspectRatio="xMidYMid meet"
      />
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fill={kit.textColor}
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="1"
      >
        YENİKÖY
      </text>
      <text
        x="60"
        y="83"
        textAnchor="middle"
        fill={kit.textColor}
        opacity="0.8"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="6"
        letterSpacing="2"
      >
        UNITED FK
      </text>
    </svg>
  );
}

export function KitsSection() {
  const [viewMode, setViewMode] = useState<'front' | 'back' | 'both'>('front');

  return (
    <section id="formalar" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
      <div className="border-b border-gray-200 pb-4 mb-8 flex items-baseline justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">
            Resmi Kulüp Formaları
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            2025/2026 Sezonunda Takımımızın Sahada Giyeceği Onaylı Kombinasyonlar
          </p>
        </div>
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider hidden sm:block">
          Sezon 25/26 Koleksiyonu
        </span>
      </div>

      {/* 1. FLAGSHIP HERO: OFFICIAL MATCH KIT SHOWCASE */}
      <div className="bg-white border-2 border-gold/40 rounded-xl shadow-md overflow-hidden mb-10">
        <div className="bg-navy px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <span className="bg-gold text-navy font-bold text-xs uppercase px-2.5 py-1 rounded tracking-wider flex items-center gap-1">
              <Sparkles size={13} />
              Özel Seri
            </span>
            <h3 className="font-bold text-lg sm:text-xl">
              2025/2026 Resmi İç Saha Maç Forması
            </h3>
          </div>
          {/* View Toggles */}
          <div className="flex items-center bg-white/10 p-1 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('front')}
              className={`px-3 py-1.5 rounded transition-all ${
                viewMode === 'front'
                  ? 'bg-gold text-navy shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Ön Görünüm
            </button>
            <button
              type="button"
              onClick={() => setViewMode('back')}
              className={`px-3 py-1.5 rounded transition-all ${
                viewMode === 'back'
                  ? 'bg-gold text-navy shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Arka Görünüm (#10 DORUK)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded transition-all hidden sm:block ${
                viewMode === 'both'
                  ? 'bg-gold text-navy shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Yan Yana
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-gray-50/60 to-white">
          {/* Jersey Image Display */}
          <div className="lg:col-span-7 flex justify-center">
            {viewMode === 'both' ? (
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-navy/5 shadow-inner group">
                  <Image
                    src="/forma-on-crop.png"
                    alt="Yeniköy United 25/26 Forması - Ön Görünüm"
                    width={704}
                    height={559}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <span className="absolute bottom-2 left-2 bg-navy/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    Ön Yüz
                  </span>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-navy/5 shadow-inner group">
                  <Image
                    src="/forma-arka-crop.png"
                    alt="Yeniköy United 25/26 Forması - Arka Görünüm"
                    width={704}
                    height={559}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 bg-navy/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                    Sırt / #10 DORUK
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative max-w-md w-full rounded-lg overflow-hidden border border-gray-200 bg-navy/5 shadow-md group">
                <Image
                  src={viewMode === 'front' ? '/forma-on-crop.png' : '/forma-arka-crop.png'}
                  alt={
                    viewMode === 'front'
                      ? 'Yeniköy United FK 25/26 Resmi İç Saha Forması - Ön'
                      : 'Yeniköy United FK 25/26 Resmi Forması - Sırt #10 DORUK'
                  }
                  width={704}
                  height={559}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute bottom-3 left-3 bg-navy/90 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded shadow">
                  {viewMode === 'front' ? 'Ön Yüz • Ay-Yıldız & Kulüp Arması' : 'Sırt • #10 DORUK'}
                </div>
              </div>
            )}
          </div>

          {/* Jersey Specifications & Details */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-wider block">
                Marmara &amp; Karacabey Dalgası Özel Konsepti
              </span>
              <h4 className="text-2xl font-extrabold text-navy mt-1">
                Yeniköy United FK İç Saha
              </h4>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                Kulübümüzün resmi 2025/2026 sezonu iç saha forması; Marmara Denizi ve Karacabey
                Boğazı&apos;nın fırtınalı dalgalarını, Türk bayrağının asaletini ve geleneksel
                çubuklu futbol mirasını bir araya getiren özgün bir sanat eseri niteliğindedir.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-semibold">
                    Ebru &amp; Dalga Üst Gövde Dokusu
                  </strong>
                  <span className="text-gray-500 text-xs">
                    Marmara sularının hırçın dalgalarını simgeleyen gece mavisi ebru girdap deseni.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-semibold">
                    Asimetrik Barok / Saray Kollar
                  </strong>
                  <span className="text-gray-500 text-xs">
                    Sol kolda gök mavisi üzerine gümüş damask, sağ kolda saf beyaz üzerine altın varak işlemeler.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-semibold">
                    Şanlı Ay-Yıldız &amp; Resmi Kulüp Arması
                  </strong>
                  <span className="text-gray-500 text-xs">
                    Göğüs merkezinde şanlı Türk bayrağı brövesi, sol göğüste Yeniköy United nakış arması.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-semibold">
                    Alt Gövde Beyaz Çubuklu Geçişi
                  </strong>
                  <span className="text-gray-500 text-xs">
                    Futbolun köklü çubuklu geleneğini yansıtan dikey beyaz degradeler.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-semibold">
                    Sırtta 10 Numara &amp; &quot;DORUK&quot; Baskısı
                  </strong>
                  <span className="text-gray-500 text-xs">
                    Metalik gümüş gölgeli 10 numara ve resmi takım oyuncumuz Doruk Akşat sırt baskısı.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CREST BADGE SHOWCASE */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-8 shadow-sm flex flex-col sm:flex-row items-center gap-5">
        <Image
          src="/logo.png"
          alt="Yeniköy United FK Resmi Arması"
          width={72}
          height={72}
          className="rounded-full shrink-0 drop-shadow-md border border-gold/40"
        />
        <div className="text-center sm:text-left flex-1">
          <div className="inline-block bg-gold/15 text-gold-dark text-xs font-bold px-2 py-0.5 rounded mb-1">
            Resmi Göğüs Arması
          </div>
          <h3 className="text-navy font-bold text-base">
            Kulüp Arması Tüm Resmi Formalarda Göğüste Yer Almaktadır
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
            Karacabey Boğazı deniz fenerleri, Karadeniz/Marmara dalgası, ay-yıldız ve altın defne
            yapraklarıyla donatılmış resmi Yeniköy United nakış arması formalarımızın kalbidir.
          </p>
        </div>
      </div>

      {/* 3. THREE KITS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KITS.map((kit) => (
          <div
            key={kit.name}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col justify-between hover:border-gray-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {kit.type}
                </span>
                <span className="text-xs text-gray-400">Sezon 25/26</span>
              </div>

              {/* Jersey Display Area */}
              <div className="bg-gray-50/80 border border-gray-100 rounded-lg p-4 mb-6 flex items-center justify-center min-h-[170px]">
                {kit.image ? (
                  <div className="relative w-40 h-40 rounded overflow-hidden shadow-sm">
                    <Image
                      src={kit.image}
                      alt={kit.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ) : (
                  <JerseySvg kit={kit} />
                )}
              </div>

              <h3 className="text-navy font-bold text-lg mb-1">{kit.name}</h3>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {kit.description}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {kit.details}
              </p>
            </div>

            {/* Color Swatches */}
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded-full shadow-inner"
                    style={{
                      backgroundColor: kit.bodyColor,
                      border: `1px solid ${kit.borderColor}`,
                    }}
                  />
                  <span className="text-[11px] font-medium text-gray-500">Forma</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded-full shadow-inner"
                    style={{
                      backgroundColor: kit.shortsColor,
                      border: `1px solid ${kit.shortsBorder}`,
                    }}
                  />
                  <span className="text-[11px] font-medium text-gray-500">Şort</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded-full shadow-inner"
                    style={{
                      backgroundColor: kit.socksColor,
                      border: `1px solid ${kit.socksBorder}`,
                    }}
                  />
                  <span className="text-[11px] font-medium text-gray-500">Çorap</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
