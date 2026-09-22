'use client';

import React from 'react';
import { ClubCrest } from './ClubCrest';
import { Crown, Star, Rocket, Shield, MapPin, Bell } from 'lucide-react';

interface HeroSectionProps {
  onOpenChallengeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChallengeModal }) => {
  return (
    <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Status Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-club-navy-light/80 border border-club-gold/30 text-xs font-semibold text-club-gold shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Karacabey Halı Saha Ligi Aktif Dönemi</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">2025-2026 Sezonu</span>
            </div>

            {/* Title & Slogan */}
            <div className="space-y-3">
              <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight leading-[1.08] uppercase">
                <span className="text-white">YENİKÖY UNITED</span>
                <br />
                <span className="gold-gradient-text">FUTBOL KULÜBÜ</span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Karacabey&apos;in sokaklarından halı sahaların zirvesine. Mahalle kardeşliği, teknik zeka ve şampiyonluk ruhu tek armada buluşuyor.
              </p>
            </div>

            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-medium">
              <span className="px-3 py-1.5 rounded-lg bg-club-blue-dark/50 border border-club-blue-light/40 text-blue-200 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-club-gold" /> Kurucu: <strong className="font-bold">Enes Kaplan</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-club-gold/15 border border-club-gold/30 text-club-gold-light flex items-center gap-1.5 badge-shimmer">
                <Star className="w-3.5 h-3.5 text-club-gold fill-club-gold" /> Kiralık Yıldız: <strong className="font-bold">Efe Can</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-emerald-400" /> Gelecek Transfer: <strong className="font-bold">Egemen Gıryıke</strong>
              </span>
            </div>

            {/* Primary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenChallengeModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-club-gold via-amber-400 to-club-gold-dark text-club-navy-deep font-display font-extrabold text-base tracking-wide shadow-gold-glow hover:shadow-gold-lg hover:scale-105 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Shield className="w-5 h-5" />
                <span>MAÇ TEKLİFİ ET (MEYDAN OKU)</span>
              </button>
              <a
                href="#taktik"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel text-white hover:text-club-gold hover:border-club-gold/50 font-display font-bold text-base transition-all flex items-center justify-center gap-2"
              >
                <span>⚽</span>
                <span>Taktik Tahtasını Aç</span>
              </a>
            </div>

            {/* Quick Club Stats Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0">
              <div className="glass-panel p-3.5 rounded-xl text-center border-club-gold/20">
                <div className="font-jersey text-3xl sm:text-4xl text-white tracking-wider">18</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Oynanan Maç</div>
              </div>

              <div className="glass-panel p-3.5 rounded-xl text-center border-club-gold/20">
                <div className="font-jersey text-3xl sm:text-4xl text-emerald-400 tracking-wider">15</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Galibiyet</div>
              </div>

              <div className="glass-panel p-3.5 rounded-xl text-center border-club-gold/20">
                <div className="font-jersey text-3xl sm:text-4xl text-club-gold tracking-wider">74</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Atılan Gol</div>
              </div>

              <div className="glass-panel p-3.5 rounded-xl text-center border-club-gold/20">
                <div className="font-jersey text-3xl sm:text-4xl text-sky-400 tracking-wider">4.1</div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Gol / Maç</div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md glass-panel-accent p-6 sm:p-8 rounded-3xl relative overflow-hidden text-center group">
              {/* Glow background orb */}
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-club-gold/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>

              {/* Big Visual Crest */}
              <div className="mx-auto my-2 flex justify-center transform group-hover:scale-105 transition-transform duration-500">
                <ClubCrest size="xl" />
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="font-display font-extrabold text-2xl text-white">KARACABEY ŞAMPİYONLUĞU</h3>
                <p className="text-xs text-club-gold font-semibold uppercase tracking-widest">Resmi Halı Saha Temsilcisi</p>
              </div>

              {/* Next Match Mini Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-club-navy-deep/80 border border-club-gold/20 text-left space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-club-gold font-bold">
                    <Bell className="w-3 h-3 text-club-gold" /> SIRADAKİ HALI SAHA MAÇI
                  </span>
                  <span className="bg-club-blue-dark/60 text-sky-200 px-2 py-0.5 rounded text-[10px]">Cuma 21:00</span>
                </div>
                <div className="flex items-center justify-between font-display font-bold text-sm">
                  <span className="text-white">Yeniköy United</span>
                  <span className="text-club-gold text-xs px-2">VS</span>
                  <span className="text-slate-300">Bakırköy İdman Yurdu</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-club-gold" /> Karacabey Spor Parkı
                  </span>
                  <span className="text-emerald-400 font-semibold">Kadro Hazır</span>
                </div>
              </div>

              {/* Status bullets */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-club-navy-light/40 border border-white/5">
                  <div className="text-club-gold font-bold">1. Sırada</div>
                  <div className="text-[10px] text-slate-400">Lig Durumu</div>
                </div>
                <div className="p-2 rounded-xl bg-club-navy-light/40 border border-white/5">
                  <div className="text-emerald-400 font-bold">5 Maç</div>
                  <div className="text-[10px] text-slate-400">Galibiyet Serisi</div>
                </div>
                <div className="p-2 rounded-xl bg-club-navy-light/40 border border-white/5">
                  <div className="text-sky-400 font-bold">%83</div>
                  <div className="text-[11px] text-slate-400">Kazanma Oranı</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
