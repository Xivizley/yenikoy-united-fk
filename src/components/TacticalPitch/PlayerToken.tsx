'use client';

import React, { useRef } from 'react';
import { Player } from '@/types';
import { Heart } from 'lucide-react';

interface PlayerTokenProps {
  player: Player;
  x: number;
  y: number;
  isSelected: boolean;
  isMoving: boolean;
  animatePosition: boolean;
  onSelect: (playerId: string) => void;
  onLongPress: (playerId: string) => void;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>, playerId: string) => void;
}

export const PlayerToken: React.FC<PlayerTokenProps> = ({
  player,
  x,
  y,
  isSelected,
  isMoving,
  animatePosition,
  onSelect,
  onLongPress,
  onPointerDown,
}) => {
  const tokenRef = useRef<HTMLDivElement>(null);
  const subsCount = player.substituteIds ? player.substituteIds.length : 0;
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragOccurredRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragOccurredRef.current = false;

    // Trigger long press detection
    longPressTimerRef.current = setTimeout(() => {
      if (!dragOccurredRef.current) {
        if (navigator.vibrate) {
          try {
            navigator.vibrate(50);
          } catch {}
        }
        onLongPress(player.id);
      }
    }, 400);

    onPointerDown(e, player.id);
  };

  const handlePointerUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dragOccurredRef.current) {
      onSelect(player.id);
    }
  };

  return (
    <div
      ref={tokenRef}
      id={`token-${player.id}`}
      data-id={player.id}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`player-token ${
        animatePosition && !isMoving ? 'animated-position' : ''
      } ${isMoving ? 'is-moving' : ''}`}
    >
      <div className="relative group flex flex-col items-center select-none">
        {/* Jersey Badge (Hexagon/Circle Token) */}
        <div
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-jersey text-xl sm:text-2xl text-white shadow-xl transition-all duration-200 border-2 ${
            isSelected
              ? 'border-club-gold shadow-gold-glow scale-110'
              : 'border-white/80 group-hover:border-club-gold group-hover:scale-105'
          } bg-gradient-to-b ${player.avatarGradient || 'from-club-blue to-club-navy'}`}
        >
          {/* Number */}
          <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider">
            {player.number}
          </span>

          {/* Substitute Badge Indicator (If any subs exist) */}
          {subsCount > 0 && (
            <div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-club-gold text-club-navy-deep font-display font-extrabold text-[10px] flex items-center justify-center shadow border border-white"
              title={`${subsCount} Yedek Oyuncu Mevcut`}
            >
              {subsCount}
            </div>
          )}

          {/* Heart icon for Ramazan if on pitch */}
          {player.hasHeartIcon && (
            <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center shadow border border-white">
              <Heart className="w-3 h-3 fill-white text-white" />
            </div>
          )}
        </div>

        {/* Player Name Tag (Glassmorphic) */}
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-club-navy-deep/90 border border-club-gold/30 text-[10px] sm:text-xs font-bold text-white shadow whitespace-nowrap backdrop-blur-md flex items-center gap-1 group-hover:border-club-gold transition-colors">
          <span>{player.name}</span>
        </div>

        {/* Position Small Tag */}
        <span className="text-[9px] font-semibold text-club-gold-light uppercase tracking-wider -mt-0.5">
          {player.positionCategory}
        </span>
      </div>
    </div>
  );
};
