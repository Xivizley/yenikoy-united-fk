'use client';

import React, { useState } from 'react';
import { Player, ActivePitchPlayer } from '@/types';
import { IdCard, Users, ArrowRightLeft, Heart, CheckSquare, LogIn } from 'lucide-react';

interface SubstitutesPanelProps {
  selectedPlayer: Player | null;
  activePitchPlayers: ActivePitchPlayer[];
  substitutes: Player[];
  isOnPitch: boolean;
  onSwap: (onPitchId: string, subId: string) => void;
  onSubstituteInBench: (benchId: string, targetOnPitchId: string) => void;
}

export const SubstitutesPanel: React.FC<SubstitutesPanelProps> = ({
  selectedPlayer,
  activePitchPlayers,
  substitutes,
  isOnPitch,
  onSwap,
  onSubstituteInBench,
}) => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    activePitchPlayers.length > 0 ? activePitchPlayers[0].id : ''
  );

  return (
    <div className="space-y-6">
      {/* Selected Player & Substitutes Interactive Card */}
      <div
        id="selectedPlayerCard"
        className="glass-panel-accent p-5 sm:p-6 rounded-3xl border-club-gold/30"
      >
        <div className="flex items-center justify-between border-b border-club-gold/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <IdCard className="w-4 h-4 text-club-gold" />
            <h3 className="font-display font-extrabold text-base text-white">
              Mevki & Yedek Paneli
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-club-gold bg-club-gold/15 px-2 py-0.5 rounded border border-club-gold/30">
            İnteraktif
          </span>
        </div>

        <div id="playerDetailContent" className="space-y-4">
          {!selectedPlayer ? (
            <div className="text-center py-6 text-slate-400 text-sm space-y-2">
              <span className="text-3xl block mb-2">👕</span>
              <p>
                Sahadaki herhangi bir oyuncuya tıklayarak o mevkinin{' '}
                <strong className="text-club-gold">yedeklerini</strong> görüntüleyin ve hızlıca
                oyuncu değişikliği yapın.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Selected Player Summary */}
              <div className="p-3.5 rounded-2xl bg-club-navy-deep/90 border border-club-gold/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-b ${selectedPlayer.avatarGradient} flex items-center justify-center font-jersey text-2xl text-white border border-club-gold/40 shadow`}
                  >
                    {selectedPlayer.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-extrabold text-base text-white">
                        {selectedPlayer.name}
                      </h4>
                      {selectedPlayer.hasHeartIcon && (
                        <span title="Takımın Kalbi">
                          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-club-gold font-medium">
                      {selectedPlayer.positionName || selectedPlayer.positionCategory}
                    </div>
                    {selectedPlayer.specialBadge && (
                      <div className="mt-1">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold rounded ${selectedPlayer.specialBadgeClass}`}
                        >
                          {selectedPlayer.specialBadge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {isOnPitch ? (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    SAHADA
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                    YEDEKLERDE
                  </span>
                )}
              </div>

              {/* Player Skills Matrix */}
              <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                <div className="bg-club-navy p-1.5 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400 font-semibold">HIZ</div>
                  <div className="font-bold text-white">{selectedPlayer.stats.pac}</div>
                </div>
                <div className="bg-club-navy p-1.5 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400 font-semibold">ŞUT</div>
                  <div className="font-bold text-white">{selectedPlayer.stats.sho}</div>
                </div>
                <div className="bg-club-navy p-1.5 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400 font-semibold">PAS</div>
                  <div className="font-bold text-white">{selectedPlayer.stats.pas}</div>
                </div>
                <div className="bg-club-navy p-1.5 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400 font-semibold">DEF</div>
                  <div className="font-bold text-white">{selectedPlayer.stats.def}</div>
                </div>
                <div className="bg-club-navy p-1.5 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-400 font-semibold">GÜÇ</div>
                  <div className="font-bold text-white">{selectedPlayer.stats.phy}</div>
                </div>
              </div>

              {isOnPitch ? (
                /* On Pitch: Substitutes Section */
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5 text-club-gold">
                      <Users className="w-3.5 h-3.5" /> Mevki Yedekleri:
                    </span>
                    <span className="text-slate-400 text-[11px]">{substitutes.length} Oyuncu</span>
                  </div>

                  {substitutes.length === 0 ? (
                    <div className="text-xs text-slate-400 italic p-3 rounded-xl bg-club-navy/50 text-center">
                      Bu mevkide direkt yedek atanmamış. Kiralık yıldız Efe Can&apos;ı takviye olarak
                      kullanabilirsiniz.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {substitutes.map((sub) => (
                        <div
                          key={sub.id}
                          className={`p-2.5 rounded-xl bg-club-navy/80 border ${
                            sub.hasHeartIcon
                              ? 'border-rose-500/50 bg-rose-950/20'
                              : 'border-slate-700/80'
                          } flex items-center justify-between hover:border-club-gold/50 transition-all`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-b ${sub.avatarGradient} flex items-center justify-center font-jersey text-sm text-white`}
                            >
                              {sub.number}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                <span>{sub.name}</span>
                                {sub.hasHeartIcon && (
                                  <span title="Takımın Kalbi">
                                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline" />
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {sub.positionName || sub.positionCategory}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => onSwap(selectedPlayer.id, sub.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-club-gold/20 hover:bg-club-gold text-club-gold hover:text-club-navy-deep font-display font-bold text-[11px] transition-all flex items-center gap-1 shadow cursor-pointer"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                            <span>Oyuna Al</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Super-sub / Joker Efe Can Quick Option */}
                  {selectedPlayer.id !== 'efe_can' && (
                    <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-400/30 flex items-center justify-between text-xs mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">⭐ Efe Can (Kiralık)</span>
                        <span className="text-[10px] text-slate-400">Hücum Jokeri</span>
                      </div>
                      <button
                        onClick={() => onSwap(selectedPlayer.id, 'efe_can')}
                        className="px-2 py-1 rounded bg-amber-400 text-club-navy-deep font-bold text-[10px] hover:bg-amber-300 transition-colors cursor-pointer"
                      >
                        Jokerle Değiştir
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* On Bench: Workflow to sub this player ONTO pitch */
                <div className="space-y-3 pt-1">
                  <div className="p-3 rounded-xl bg-club-navy/90 border border-club-gold/30 text-xs space-y-2">
                    <div className="font-bold text-club-gold flex items-center gap-1.5">
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sahaya Sür / Oyuna Al</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      {selectedPlayer.name} şu anda yedek kulübesinde. Sahadaki oyunculardan birinin yerine oyuna dahil edebilirsiniz.
                    </p>
                    <div className="pt-2 flex flex-col gap-2">
                      <label className="text-[10px] text-slate-400 font-semibold" htmlFor="subTargetSelect">
                        Hangi oyuncu yerine oyuna girsin?
                      </label>
                      <div className="flex gap-2">
                        <select
                          id="subTargetSelect"
                          value={selectedTargetId}
                          onChange={(e) => setSelectedTargetId(e.target.value)}
                          className="flex-1 bg-club-navy-deep border border-club-gold/40 text-xs text-white rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-club-gold cursor-pointer"
                        >
                          {activePitchPlayers.map((item) => (
                            <option key={item.id} value={item.id}>
                              #{item.player.number} {item.player.name} ({item.player.positionCategory})
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const target = selectedTargetId || (activePitchPlayers[0] && activePitchPlayers[0].id);
                            if (target) {
                              onSubstituteInBench(selectedPlayer.id, target);
                            }
                          }}
                          className="px-3 py-2 rounded-lg bg-club-gold hover:bg-club-gold-light text-club-navy-deep font-display font-black text-xs transition-all shadow cursor-pointer"
                        >
                          Oyuna Al
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Squad Roles Reminder Box (Resmi Notlara Tam Uyum) */}
      <div className="glass-panel p-5 rounded-3xl border-club-gold/20 space-y-3">
        <h4 className="font-display font-bold text-sm text-club-gold flex items-center gap-2">
          <CheckSquare className="w-4 h-4" /> Resmi Notlar Kural Tablosu
        </h4>
        <div className="text-xs text-slate-300 space-y-2.5">
          <div className="p-2.5 rounded-xl bg-club-navy-deep/80 border border-club-gold/30 flex items-center justify-between">
            <div>
              <strong className="text-white">Efe Can (Kiralık)</strong>
              <div className="text-[10px] text-club-gold font-semibold">En Önemli Yedek Rozetli</div>
            </div>
            <span className="px-2 py-1 rounded bg-club-gold/20 text-club-gold font-bold text-[10px]">
              ⭐ KİRALIK
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-club-navy-deep/80 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <strong className="text-white">Egemen Gıryıke</strong>
              <div className="text-[10px] text-emerald-400 font-semibold">Gelecek Sezon Transferi</div>
            </div>
            <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
              🚀 2026/27
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-club-navy-deep/80 border border-sky-500/30 flex items-center justify-between">
            <div>
              <strong className="text-white">Enes Kaplan</strong>
              <div className="text-[10px] text-sky-400 font-semibold">Admin / Kulüp Kurucusu</div>
            </div>
            <span className="px-2 py-1 rounded bg-sky-500/20 text-sky-300 font-bold text-[10px]">
              👑 ADMIN
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-club-navy-deep/80 border border-rose-500/30 flex items-center justify-between">
            <div>
              <strong className="text-white">Ramazan Işık</strong>
              <div className="text-[10px] text-rose-400 font-semibold">
                Sol Bek Yedeği (Takımın Kalbi)
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px] flex items-center gap-1">
              <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500 inline" /> KALPLİ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
