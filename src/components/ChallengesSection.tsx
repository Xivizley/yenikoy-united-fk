'use client';

import React from 'react';
import { Challenge } from '@/types';
import { Swords, Check, Send, Shield, MapPin } from 'lucide-react';

interface ChallengesSectionProps {
  challenges: Challenge[];
  onOpenChallengeModal: () => void;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  challenges,
  onOpenChallengeModal,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Big CTA Card (Left - 7 Cols) */}
        <div className="lg:col-span-7 glass-panel-accent p-6 sm:p-10 rounded-3xl border-club-gold/30 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-club-gold uppercase tracking-widest">
              <Swords className="w-3.5 h-3.5" /> Karacabey Halı Saha Meydan Okuma
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
              Yeniköy United&apos;a <span className="gold-gradient-text">Kafa Tutmaya</span> Hazır
              Mısınız?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Mahallenizin takımını toplayın, sahayı ve saati seçin, bize meydan okuyun! Dostluk maçı, baklavasına veya lig puanı; sahada centilmence kapışalım.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-club-gold" /> Hızlı WhatsApp & SMS Onayı
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-club-gold" /> Hakemli & Kayıtlı Maç Seçeneği
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-club-gold" /> Karacabey İçi ve Dışı Takımlar
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={onOpenChallengeModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-club-gold via-amber-400 to-club-gold-dark text-club-navy-deep font-display font-extrabold text-base tracking-wide shadow-gold-glow hover:shadow-gold-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>HEMEN MAÇ BAŞVURUSU YAP</span>
            </button>
          </div>
        </div>

        {/* Recent Challenges List (Right - 5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border-club-gold/20 flex flex-col">
          <div className="flex items-center justify-between border-b border-club-gold/20 pb-4 mb-4">
            <div>
              <h4 className="font-display font-extrabold text-lg text-white">
                Gelen Meydan Okumalar
              </h4>
              <p className="text-[11px] text-slate-400">Son gelen rakip maç teklifleri</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-club-blue-dark/50 text-sky-300 text-[10px] font-bold border border-sky-400/30">
              CANLI
            </span>
          </div>

          {/* List Container */}
          <div id="challengesFeed" className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-1">
            {challenges.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-club-navy-deep/70 border border-club-gold/20 space-y-1.5 hover:border-club-gold/40 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-display font-extrabold text-white flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-club-gold" />
                    {item.team}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.timeAgo}</span>
                </div>
                <div className="text-[11px] text-club-gold-light flex items-center justify-between">
                  <span>
                    Kaptan: <strong>{item.captain}</strong>
                  </span>
                  <span className="text-[10px] bg-club-gold/15 px-2 py-0.5 rounded text-club-gold">
                    {item.stake}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 italic line-clamp-1">
                  &ldquo;{item.message}&rdquo;
                </p>
                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-club-gold" /> {item.pitch}
                  </span>
                  <span className="text-amber-400 font-semibold">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
