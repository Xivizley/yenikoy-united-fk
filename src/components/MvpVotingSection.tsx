'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MVP_CANDIDATES, INITIAL_MVP_VOTES } from '@/data/mvpCandidates';
import { Award, RotateCcw, Check, CheckCheck, CircleCheck } from 'lucide-react';

interface MvpVotingSectionProps {
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const MvpVotingSection: React.FC<MvpVotingSectionProps> = ({ showToast }) => {
  const [votes, setVotes] = useState<Record<string, number>>(INITIAL_MVP_VOTES);
  const [userVote, setUserVote] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('yenikoy_user_vote');
      } catch {
        return null;
      }
    }
    return null;
  });

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleCastVote = (candidateId: string) => {
    if (userVote === candidateId) {
      showToast('Bilgi', 'Bu adaya zaten oy verdiniz!', 'info');
      return;
    }

    setVotes((prev) => {
      const next = { ...prev };
      if (userVote && next[userVote]) {
        next[userVote] = Math.max(0, next[userVote] - 1);
      }
      next[candidateId] = (next[candidateId] || 0) + 1;
      return next;
    });

    setUserVote(candidateId);
    try {
      localStorage.setItem('yenikoy_user_vote', candidateId);
    } catch {}

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
    });

    showToast(
      'Oyunuz Kaydedildi!',
      'Haftanın MVP oylamasına katıldığınız için teşekkürler.',
      'success'
    );
  };

  const handleResetVote = () => {
    if (!userVote) return;

    setVotes((prev) => {
      const next = { ...prev };
      if (next[userVote]) {
        next[userVote] = Math.max(0, next[userVote] - 1);
      }
      return next;
    });

    setUserVote(null);
    try {
      localStorage.removeItem('yenikoy_user_vote');
    } catch {}

    showToast('Oyunuz Sıfırlandı', 'İstediğiniz yeni adaya oy verebilirsiniz.', 'info');
  };

  const votedCandidate = MVP_CANDIDATES.find((c) => c.id === userVote);

  return (
    <section id="mvp" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="glass-panel-accent p-6 sm:p-10 rounded-3xl border-club-gold/30 relative overflow-hidden">
        {/* Glow Orbs */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-club-gold/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-club-blue/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-club-gold/20 pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-club-gold uppercase tracking-widest mb-1">
                <Award className="w-3.5 h-3.5" /> Ziyaretçi & Taraftar Oylaması
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Haftanın Oyuncusu (MVP) Oylaması
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Son galibiyetimizde sahada fark yaratan yıldızlardan birine oy verin. Sonuçlar anlık olarak güncellenir ve şeffaf şekilde listelenir.
              </p>
            </div>

            {/* Total Votes Badge & Reset */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="glass-panel px-4 py-2.5 rounded-2xl border-club-gold/30 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Toplam Kullanılan Oy
                </div>
                <div
                  id="mvpTotalVotesDisplay"
                  className="font-jersey text-2xl text-club-gold tracking-wider"
                >
                  {totalVotes}
                </div>
              </div>
              <button
                onClick={handleResetVote}
                className="p-2.5 rounded-xl glass-panel text-slate-400 hover:text-club-gold hover:border-club-gold/40 text-xs transition-colors cursor-pointer"
                title="Oyumu Değiştir / Sıfırla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voting Candidates List */}
          <div id="mvpCandidatesGrid" className="space-y-4">
            {MVP_CANDIDATES.map((cand) => {
              const count = votes[cand.id] || 0;
              const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              const isUserChoice = userVote === cand.id;

              return (
                <div
                  key={cand.id}
                  className={`glass-panel p-4 sm:p-5 rounded-2xl border ${
                    isUserChoice
                      ? 'border-club-gold shadow-gold-glow bg-club-navy-light/60'
                      : 'border-club-gold/20'
                  } space-y-3 transition-all`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Candidate Identity */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-b ${cand.avatar} flex items-center justify-center font-display font-black text-lg text-white border border-club-gold/30 shadow`}
                      >
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-extrabold text-base sm:text-lg text-white">
                            {cand.name}
                          </h4>
                          <span className="text-xs text-club-gold font-semibold uppercase tracking-wider">
                            {cand.pos}
                          </span>
                          {isUserChoice && (
                            <span className="px-2 py-0.5 rounded bg-club-gold text-club-navy-deep text-[10px] font-extrabold">
                              SENİN OYUN
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300">{cand.highlight}</p>
                      </div>
                    </div>

                    {/* Vote Button & Count */}
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <div className="font-jersey text-2xl text-club-gold">{percent}%</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{count} Oy</div>
                      </div>

                      <button
                        onClick={() => handleCastVote(cand.id)}
                        className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                          isUserChoice
                            ? 'bg-emerald-500 text-club-navy-deep shadow cursor-default'
                            : 'bg-club-gold/20 hover:bg-club-gold text-club-gold hover:text-club-navy-deep border border-club-gold/40'
                        }`}
                      >
                        {isUserChoice ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Oy Verildi</span>
                          </>
                        ) : (
                          <>
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>Oy Ver</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Animated Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-club-navy-deep overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isUserChoice
                          ? 'bg-gradient-to-r from-club-gold via-amber-300 to-emerald-400'
                          : 'bg-gradient-to-r from-club-blue to-club-gold'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* User vote status notification banner */}
          {userVote && votedCandidate && (
            <div
              id="userVotedBanner"
              className="mt-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in"
            >
              <div className="flex items-center gap-2.5">
                <CircleCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>
                  Oyunuz başarıyla kaydedildi:{' '}
                  <strong id="userVotedPlayerName" className="text-white font-bold">
                    {votedCandidate.name}
                  </strong>
                </span>
              </div>
              <button
                onClick={handleResetVote}
                className="underline text-emerald-300 hover:text-white font-semibold cursor-pointer"
              >
                Oyu Değiştir
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
