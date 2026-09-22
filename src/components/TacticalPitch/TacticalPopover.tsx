'use client';

import React from 'react';
import { Player } from '@/types';
import { X, Users, ArrowRightLeft, Star, Heart, ExternalLink } from 'lucide-react';

interface TacticalPopoverProps {
  player: Player;
  posX: number;
  posY: number;
  substitutes: Player[];
  onSwap: (onPitchId: string, subId: string) => void;
  onOpenModal: (playerId: string) => void;
  onClose: () => void;
}

export const TacticalPopover: React.FC<TacticalPopoverProps> = ({
  player,
  posX,
  posY,
  substitutes,
  onSwap,
  onOpenModal,
  onClose,
}) => {
  const isTopHalf = posY < 42;
  const clampedX = Math.max(26, Math.min(74, posX));

  return (
    <div
      id="pitchPopover"
      role="dialog"
      aria-label="Mevki Yedekleri Pop-up"
      style={{ left: `${clampedX}%`, top: `${posY}%` }}
      className={`tactical-popover ${isTopHalf ? 'popover-below' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-2.5">
        {/* Popover Header */}
        <div className="flex items-center justify-between border-b border-club-gold/20 pb-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg bg-gradient-to-b ${player.avatarGradient} flex items-center justify-center font-jersey text-sm text-white border border-club-gold/40`}
            >
              {player.number}
            </div>
            <div>
              <div className="text-xs font-display font-black text-white leading-tight">
                {player.name}
              </div>
              <div className="text-[10px] text-club-gold">
                {player.positionName || player.positionCategory}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Substitutes Title */}
        <div className="flex items-center justify-between text-[11px] font-bold text-club-gold">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Mevki Yedekleri:
          </span>
          <span className="text-slate-400 text-[10px]">{substitutes.length} Oyuncu</span>
        </div>

        {/* Substitutes List */}
        {substitutes.length === 0 ? (
          <div className="text-[11px] text-slate-400 italic p-2.5 rounded-xl bg-club-navy-deep/80 text-center">
            Bu mevki için doğrudan yedek atanmamış. Kiralık yıldız Efe Can&apos;ı takviye edebilirsiniz.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-0.5">
            {substitutes.map((sub) => (
              <div
                key={sub.id}
                className={`p-2 rounded-xl bg-club-navy-deep/90 border ${
                  sub.hasHeartIcon ? 'border-rose-500/60 bg-rose-950/25' : 'border-slate-700/70'
                } flex items-center justify-between hover:border-club-gold/50 transition-all`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-md bg-gradient-to-b ${sub.avatarGradient} flex items-center justify-center font-jersey text-xs text-white`}
                  >
                    {sub.number}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{sub.name}</span>
                      {sub.hasHeartIcon && (
                        <span title="Takımın Kalbi">
                          <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500 inline" />
                        </span>
                      )}
                    </div>
                    <div className="text-[9px] text-slate-400">
                      {sub.positionName || sub.positionCategory}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onSwap(player.id, sub.id)}
                  className="px-2 py-1 rounded-lg bg-club-gold hover:bg-club-gold-light text-club-navy-deep font-display font-extrabold text-[10px] transition-all flex items-center gap-1 shadow cursor-pointer"
                >
                  <ArrowRightLeft className="w-2.5 h-2.5" />
                  <span>Oyuna Al</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Super-Sub Efe Can Quick Option */}
        {player.id !== 'efe_can' && (
          <div className="p-1.5 rounded-lg bg-amber-950/40 border border-amber-400/40 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[10px]">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>Efe Can (Kiralık)</span>
            </div>
            <button
              onClick={() => onSwap(player.id, 'efe_can')}
              className="px-2 py-0.5 rounded bg-amber-400 text-club-navy-deep font-extrabold text-[9px] hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Joker Al
            </button>
          </div>
        )}

        {/* View Modal / Hint */}
        <div className="pt-1 flex items-center justify-between text-[10px]">
          <button
            onClick={() => onOpenModal(player.id)}
            className="text-club-gold hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <ExternalLink className="w-2.5 h-2.5" /> Genişletilmiş Modal
          </button>
          <span className="text-slate-500 text-[9px]">Tıkla / Basılı Tut</span>
        </div>
      </div>
    </div>
  );
};
