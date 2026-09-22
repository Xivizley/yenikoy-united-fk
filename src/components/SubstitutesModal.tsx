'use client';

import React, { useEffect } from 'react';
import { Player } from '@/types';
import { X, ArrowRightLeft, Heart, Star, Users } from 'lucide-react';

interface SubstitutesModalProps {
  isOpen: boolean;
  player: Player | null;
  isOnPitch: boolean;
  substitutes: Player[];
  onSwap: (onPitchId: string, subId: string) => void;
  onClose: () => void;
}

export const SubstitutesModal: React.FC<SubstitutesModalProps> = ({
  isOpen,
  player,
  isOnPitch,
  substitutes,
  onSwap,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !player) return null;

  return (
    <div
      id="substitutesModal"
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onClose}
      />
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-md glass-panel-accent p-6 rounded-3xl border-club-gold/40 text-left shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-club-gold/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-club-gold" />
              <h3 className="font-display font-extrabold text-lg text-white">
                Mevki Yedekleri & Değişiklik
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg glass-panel flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div id="substitutesModalBody" className="space-y-3">
            {/* Player Card */}
            <div className="p-3.5 rounded-2xl bg-club-navy-deep/90 border border-club-gold/30 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-b ${player.avatarGradient} flex items-center justify-center font-jersey text-2xl text-white border border-club-gold/40 shadow`}
                >
                  {player.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-extrabold text-base text-white">
                      {player.name}
                    </h4>
                    {player.hasHeartIcon && (
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline" />
                    )}
                  </div>
                  <div className="text-xs text-club-gold">
                    {player.positionName || player.positionCategory}
                  </div>
                </div>
              </div>
              {isOnPitch ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                  SAHADA
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                  YEDEK
                </span>
              )}
            </div>

            {/* Substitutes List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-club-gold">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Mevki Yedekleri (Resmi Notlar):
                </span>
                <span className="text-slate-400 text-[11px]">{substitutes.length} Oyuncu</span>
              </div>

              {substitutes.length === 0 ? (
                <div className="text-xs text-slate-400 italic p-4 rounded-xl bg-club-navy/50 text-center border border-slate-800">
                  Bu mevkide direkt yedek atanmamış. Kiralık yıldız Efe Can&apos;ı takviye olarak
                  kullanabilirsiniz.
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {substitutes.map((sub) => (
                    <div
                      key={sub.id}
                      className={`p-3 rounded-xl bg-club-navy/90 border ${
                        sub.hasHeartIcon
                          ? 'border-rose-500/60 bg-rose-950/25'
                          : 'border-slate-700/80'
                      } flex items-center justify-between hover:border-club-gold/50 transition-all`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-lg bg-gradient-to-b ${sub.avatarGradient} flex items-center justify-center font-jersey text-base text-white`}
                        >
                          {sub.number}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{sub.name}</span>
                            {sub.hasHeartIcon && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold flex items-center gap-1">
                                <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500 inline" />{' '}
                                Kalpli
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {sub.positionName || sub.positionCategory}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onSwap(player.id, sub.id);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-club-gold hover:bg-club-gold-light text-club-navy-deep font-display font-extrabold text-xs transition-all flex items-center gap-1 shadow cursor-pointer"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        <span>Oyuna Al</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {player.id !== 'efe_can' && (
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-400/40 flex items-center justify-between text-xs mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Efe Can (Kiralık)
                    </span>
                    <span className="text-[10px] text-slate-400">En Önemli Yedek</span>
                  </div>
                  <button
                    onClick={() => {
                      onSwap(player.id, 'efe_can');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded bg-amber-400 text-club-navy-deep font-extrabold text-[10px] hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Jokerle Değiştir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
