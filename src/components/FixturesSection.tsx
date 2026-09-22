'use client';

import React, { useState } from 'react';
import { Fixture } from '@/types';
import { Trophy, CalendarDays, Clock, MapPin, Star, Info } from 'lucide-react';

interface FixturesSectionProps {
  fixtures: Fixture[];
  onOpenChallengeModal: () => void;
}

export const FixturesSection: React.FC<FixturesSectionProps> = ({
  fixtures,
  onOpenChallengeModal,
}) => {
  const [activeTab, setActiveTab] = useState<'completed' | 'upcoming'>('completed');

  const filteredFixtures = fixtures.filter((f) => f.type === activeTab);

  return (
    <section id="fikstur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-club-gold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" /> Maç Takvimi & Skortabela
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">
            Sonuçlar ve Randevular
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Karacabey halı saha liginde oynadığımız son karşılaşmalar ve sıradaki maç takvimimiz.
          </p>
        </div>

        {/* Toggle Completed vs Upcoming */}
        <div className="inline-flex bg-club-navy p-1 rounded-xl border border-club-gold/20">
          <button
            onClick={() => setActiveTab('completed')}
            id="tab-completed-btn"
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-club-gold text-club-navy-deep'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Son Maçlar (Skorlar)
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            id="tab-upcoming-btn"
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-club-gold text-club-navy-deep font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Gelecek Randevular
          </button>
        </div>
      </div>

      {/* Fixtures Cards Container */}
      <div id="fixturesList" className="space-y-4">
        {filteredFixtures.map((fix) => (
          <div
            key={fix.id}
            className="glass-card-interactive p-5 sm:p-6 rounded-3xl border-club-gold/20 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-club-gold/10 pb-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-club-gold" />
                <span className="text-white font-medium">
                  {fix.date} {fix.dayName ? `(${fix.dayName})` : ''}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> {fix.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-club-gold" /> {fix.pitch}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${fix.statusClass}`}
                >
                  {fix.statusText}
                </span>
              </div>
            </div>

            {/* Teams & Score Matchup */}
            <div className="py-2 flex items-center justify-between">
              {/* Home */}
              <div className="flex-1 text-left">
                <div
                  className={`font-display font-extrabold text-base sm:text-xl ${
                    fix.homeTeam.includes('Yeniköy') ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {fix.homeTeam}
                </div>
                <div className="text-[11px] text-slate-400">Ev Sahibi</div>
              </div>

              {/* Score or VS Banner */}
              <div className="px-4 sm:px-8 text-center flex-shrink-0">
                {fix.type === 'completed' ? (
                  <>
                    <div className="font-jersey text-3xl sm:text-5xl tracking-widest text-club-gold bg-club-navy-deep/80 px-4 py-1.5 rounded-2xl border border-club-gold/30 shadow-inner">
                      {fix.homeScore} - {fix.awayScore}
                    </div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">
                      Tamamlandı
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-jersey text-2xl sm:text-3xl tracking-wider text-slate-300 bg-club-navy-deep px-4 py-1.5 rounded-2xl border border-slate-700">
                      VS
                    </div>
                    <div className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mt-1">
                      Halı Saha Randevusu
                    </div>
                  </>
                )}
              </div>

              {/* Away */}
              <div className="flex-1 text-right">
                <div
                  className={`font-display font-extrabold text-base sm:text-xl ${
                    fix.awayTeam.includes('Yeniköy') ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {fix.awayTeam}
                </div>
                <div className="text-[11px] text-slate-400">Deplasman</div>
              </div>
            </div>

            {/* Bottom Details */}
            {fix.goals ? (
              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-1">
                <div>
                  <strong className="text-slate-300">Goller:</strong> {fix.goals}
                </div>
                <div className="text-club-gold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-club-gold text-club-gold" />
                  <strong>Maçın Adamı:</strong> {fix.mvp}
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-400" /> {fix.notes}
                </div>
                <button
                  onClick={onOpenChallengeModal}
                  className="text-club-gold font-bold hover:underline cursor-pointer"
                >
                  Sen de Meydan Oku →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
