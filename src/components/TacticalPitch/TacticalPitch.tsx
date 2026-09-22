'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Player, ActivePitchPlayer } from '@/types';
import { FORMATIONS } from '@/data/formations';
import { PlayerToken } from './PlayerToken';
import { TacticalPopover } from './TacticalPopover';
import { SubstitutesPanel } from './SubstitutesPanel';
import { SubstitutesModal } from '../SubstitutesModal';
import { ChevronDown, RotateCcw, Heart, ArrowRightLeft, MousePointer, LayoutGrid } from 'lucide-react';

interface TacticalPitchProps {
  allPlayers: Player[];
  onOpenSubstitutesModal?: (playerId: string) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const TacticalPitch: React.FC<TacticalPitchProps> = ({
  allPlayers,
  onOpenSubstitutesModal,
  showToast,
}) => {
  const [currentFormation, setCurrentFormation] = useState<string>('3-2-2');
  const [activePitchPlayers, setActivePitchPlayers] = useState<ActivePitchPlayer[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('renzi');
  const [popoverPlayerId, setPopoverPlayerId] = useState<string | null>(null);
  const [subModalPlayerId, setSubModalPlayerId] = useState<string | null>(null);
  const [animatePosition, setAnimatePosition] = useState<boolean>(true);
  const [movingPlayerId, setMovingPlayerId] = useState<string | null>(null);

  const pitchRef = useRef<HTMLDivElement>(null);
  const dragInfoRef = useRef<{
    activeId: string | null;
    isDragging: boolean;
    startX: number;
    startY: number;
  }>({
    activeId: null,
    isDragging: false,
    startX: 0,
    startY: 0,
  });

  // Initialize pitch players from default 3-2-2 formation
  useEffect(() => {
    const formDef = FORMATIONS['3-2-2'];
    const initial = formDef.positions.map((pos, idx) => {
      const player = allPlayers.find((p) => p.id === pos.id) || allPlayers[0];
      return {
        slotIndex: idx,
        id: pos.id,
        x: pos.x,
        y: pos.y,
        player,
      };
    });
    setActivePitchPlayers(initial);
  }, [allPlayers]);

  // Handle formation change
  const handleChangeFormation = (formationKey: string) => {
    const formDef = FORMATIONS[formationKey];
    if (!formDef) return;

    setCurrentFormation(formationKey);
    setAnimatePosition(true);
    setPopoverPlayerId(null);

    setActivePitchPlayers((prev) =>
      prev.map((item, idx) => {
        const targetPos = formDef.positions[idx];
        if (targetPos) {
          return {
            ...item,
            x: targetPos.x,
            y: targetPos.y,
          };
        }
        return item;
      })
    );

    showToast('Dizilim Güncellendi', `${formDef.name} aktif edildi.`, 'info');
  };

  // Reset positions to default of current formation
  const handleResetPositions = () => {
    const formDef = FORMATIONS[currentFormation] || FORMATIONS['3-2-2'];
    setAnimatePosition(true);
    setPopoverPlayerId(null);

    setActivePitchPlayers((prev) =>
      prev.map((item, idx) => {
        const targetPos = formDef.positions[idx];
        if (targetPos) {
          return {
            ...item,
            x: targetPos.x,
            y: targetPos.y,
          };
        }
        return item;
      })
    );

    showToast(
      'Dizilim Sıfırlandı',
      `${formDef.name} koordinatları standart pozisyona getirildi.`,
      'info'
    );
  };

  // Swap player on pitch with a substitute
  const handleSwapPlayer = useCallback(
    (onPitchId: string, subId: string) => {
      const newPlayer = allPlayers.find((p) => p.id === subId);
      if (!newPlayer) return;

      let oldPlayerName = '';
      setActivePitchPlayers((prev) => {
        const activeIdx = prev.findIndex((item) => item.id === onPitchId);
        if (activeIdx === -1) return prev;

        const oldPlayer = prev[activeIdx].player;
        oldPlayerName = oldPlayer.name;

        // Maintain reciprocal substitute relationship without duplicates
        if (!newPlayer.substituteIds) {
          newPlayer.substituteIds = [oldPlayer.id];
        } else if (!newPlayer.substituteIds.includes(oldPlayer.id)) {
          newPlayer.substituteIds.push(oldPlayer.id);
        }

        const updated = [...prev];
        updated[activeIdx] = {
          ...updated[activeIdx],
          id: newPlayer.id,
          player: newPlayer,
        };
        return updated;
      });

      setSelectedPlayerId(newPlayer.id);
      setPopoverPlayerId(null);

      showToast(
        'Oyuncu Değişikliği Yapıldı!',
        `${oldPlayerName} çıktı, ${newPlayer.name} oyuna dahil oldu.`,
        'success'
      );

      // Confetti burst for super-sub Efe Can
      if (newPlayer.id === 'efe_can') {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    },
    [allPlayers, showToast]
  );

  // Substitute bench player onto pitch replacing target
  const handleSubstituteInBench = useCallback(
    (benchId: string, targetOnPitchId: string) => {
      handleSwapPlayer(targetOnPitchId, benchId);
    },
    [handleSwapPlayer]
  );

  // Select player on pitch
  const handleSelectPlayer = (playerId: string) => {
    setSelectedPlayerId(playerId);
    setPopoverPlayerId(playerId);
  };

  // Long press handler
  const handleLongPress = (playerId: string) => {
    setSelectedPlayerId(playerId);
    setPopoverPlayerId(playerId);
    showToast('Taktik Pop-up Açıldı', 'Mevki yedekleri görüntülendi (Uzun Basma).', 'info');
  };

  // Drag and drop pointer handlers
  const handleTokenPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    playerId: string
  ) => {
    dragInfoRef.current = {
      activeId: playerId,
      isDragging: false,
      startX: e.clientX,
      startY: e.clientY,
    };
    setMovingPlayerId(playerId);
    setAnimatePosition(false);

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);
  };

  const handleWindowPointerMove = (e: PointerEvent) => {
    const { activeId, startX, startY, isDragging } = dragInfoRef.current;
    if (!activeId || !pitchRef.current) return;

    const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
    if (dist > 6 && !isDragging) {
      dragInfoRef.current.isDragging = true;
      setPopoverPlayerId(null);
    }

    if (dragInfoRef.current.isDragging) {
      const rect = pitchRef.current.getBoundingClientRect();
      let posX = ((e.clientX - rect.left) / rect.width) * 100;
      let posY = ((e.clientY - rect.top) / rect.height) * 100;

      // Clamp within pitch margins
      posX = Math.max(8, Math.min(92, posX));
      posY = Math.max(10, Math.min(90, posY));

      setActivePitchPlayers((prev) =>
        prev.map((item) =>
          item.id === activeId
            ? { ...item, x: Math.round(posX), y: Math.round(posY) }
            : item
        )
      );
    }
  };

  const handleWindowPointerUp = () => {
    dragInfoRef.current = {
      activeId: null,
      isDragging: false,
      startX: 0,
      startY: 0,
    };
    setMovingPlayerId(null);
    window.removeEventListener('pointermove', handleWindowPointerMove);
    window.removeEventListener('pointerup', handleWindowPointerUp);
    window.removeEventListener('pointercancel', handleWindowPointerUp);
  };

  // Close popover on pitch click
  const handlePitchClick = () => {
    setPopoverPlayerId(null);
  };

  // Find active popover player details
  const popoverItem = activePitchPlayers.find((item) => item.id === popoverPlayerId);
  const popoverPlayer = popoverItem ? popoverItem.player : null;
  const popoverSubstitutes = popoverPlayer
    ? (popoverPlayer.substituteIds || [])
        .map((id) => allPlayers.find((p) => p.id === id))
        .filter((p): p is Player => Boolean(p))
    : [];

  // Selected player for sidebar
  const selectedPlayer =
    allPlayers.find((p) => p.id === selectedPlayerId) ||
    (activePitchPlayers[0] && activePitchPlayers[0].player) ||
    null;
  const isSelectedOnPitch = activePitchPlayers.some((item) => item.id === selectedPlayerId);
  const selectedSubstitutes = selectedPlayer
    ? (selectedPlayer.substituteIds || [])
        .map((id) => allPlayers.find((p) => p.id === id))
        .filter((p): p is Player => Boolean(p))
    : [];

  return (
    <section id="taktik" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-club-gold uppercase tracking-widest">
            <LayoutGrid className="w-3.5 h-3.5" /> Saha Taktik Tahtası & İlk 8
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">
            İnteraktif 2D Halı Saha Dizilimi
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Resmi notlara göre mevki bazlı ana ilk 8 oyuncusu. Oyuncuları{' '}
            <span className="text-club-gold font-medium">sürükleyip bırakabilir</span>, üzerine
            tıklayarak <span className="text-club-gold font-medium">mevki yedeklerini</span> görebilir
            ve tek dokunuşla oyuna alabilirsiniz.
          </p>
        </div>

        {/* Controls: Formation Dropdown & Reset Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Formation Selector */}
          <div className="relative">
            <label
              htmlFor="formationSelect"
              className="block text-[11px] font-semibold text-slate-400 mb-1"
            >
              Dizilim / Formasyon:
            </label>
            <div className="relative">
              <select
                id="formationSelect"
                value={currentFormation}
                onChange={(e) => handleChangeFormation(e.target.value)}
                className="appearance-none bg-club-navy border border-club-gold/40 text-club-gold-light font-display font-bold text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-club-gold cursor-pointer shadow-lg"
              >
                <option value="3-2-2">3 - 2 - 2 (Resmi İlk 8 / Klasik Hücum)</option>
                <option value="2-4-1">2 - 4 - 1 (Dengeli Halı Saha & Kanat Baskısı)</option>
                <option value="3-3-1">3 - 3 - 1 (Kaya Defans & Kontra Atak)</option>
                <option value="2-3-2">2 - 3 - 2 (Yüksek Pres & Çift Forvet)</option>
                <option value="3-2-1">3 - 2 - 1 (Piramit Halı Saha Dizilimi)</option>
                <option value="4-3-3">4 - 3 - 3 (Geniş Alan / Total Futbol)</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-club-gold pointer-events-none" />
            </div>
          </div>

          {/* Reset Formation Positions Button */}
          <div className="self-end">
            <button
              onClick={handleResetPositions}
              className="px-3.5 py-2.5 rounded-xl bg-club-navy-light/60 hover:bg-club-navy border border-slate-700 hover:border-club-gold/40 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2 shadow cursor-pointer"
              title="Varsayılan Koordinatlara Dön"
            >
              <RotateCcw className="w-3.5 h-3.5 text-club-gold" />
              <span className="hidden sm:inline">Dizilimi Sıfırla</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Pitch & Bench Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pitch Column (8 Cols on Desktop) */}
        <div className="lg:col-span-8">
          <div className="relative w-full rounded-3xl p-3 sm:p-5 bg-club-navy border border-club-gold/30 shadow-2xl overflow-hidden">
            {/* Pitch Top Info Bar */}
            <div className="flex items-center justify-between text-xs text-slate-300 mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider">
                  Halı Saha 8v8 Taktik Alanı
                </span>
                <span className="text-slate-500">•</span>
                <span id="activeFormationLabel" className="text-club-gold font-bold">
                  {FORMATIONS[currentFormation]?.name || currentFormation}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <MousePointer className="w-3.5 h-3.5 text-club-gold" />
                <span className="hidden sm:inline">Sürükle & Bırak veya Tıkla</span>
              </div>
            </div>

            {/* Pitch Surface */}
            <div
              ref={pitchRef}
              id="tacticalPitch"
              onClick={handlePitchClick}
              className="pitch-container pitch-stripes relative w-full h-[540px] sm:h-[620px] rounded-2xl overflow-hidden shadow-inner"
            >
              {/* GOAL AREA TOP (Opponent Goal) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-8 border-x-2 border-b-2 pitch-line bg-white/5 flex items-center justify-center">
                <span className="text-[10px] uppercase font-jersey tracking-widest text-white/50">
                  RAKİP KALE
                </span>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-3.5 border-x-2 border-b-2 pitch-line bg-emerald-300/10"></div>
              {/* Top Penalty Spot */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/80 shadow"></div>

              {/* HALFWAY LINE & CENTER CIRCLE */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/40 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-36 h-28 sm:h-36 rounded-full border-2 pitch-line"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-club-gold shadow-gold-glow"></div>

              {/* GOAL AREA BOTTOM (Our Goal / Yeniköy United) */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/80 shadow"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-8 border-x-2 border-t-2 pitch-line bg-white/5 flex items-center justify-center">
                <span className="text-[10px] uppercase font-jersey tracking-widest text-club-gold/70">
                  YENİKÖY UNITED KALE
                </span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-3.5 border-x-2 border-t-2 pitch-line bg-club-gold/20"></div>

              {/* CORNER ARCS */}
              <div className="absolute top-0 left-0 w-6 h-6 border-b-2 border-r-2 pitch-line rounded-br-full"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-b-2 border-l-2 pitch-line rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-t-2 border-r-2 pitch-line rounded-tr-full"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-t-2 border-l-2 pitch-line rounded-tl-full"></div>

              {/* DYNAMIC PLAYERS MARKERS */}
              <div id="pitchPlayersLayer" className="absolute inset-0">
                {activePitchPlayers.map((item) => (
                  <PlayerToken
                    key={item.slotIndex}
                    player={item.player}
                    x={item.x}
                    y={item.y}
                    isSelected={selectedPlayerId === item.id}
                    isMoving={movingPlayerId === item.id}
                    animatePosition={animatePosition}
                    onSelect={handleSelectPlayer}
                    onLongPress={handleLongPress}
                    onPointerDown={handleTokenPointerDown}
                  />
                ))}
              </div>

              {/* TACTICAL ON-PITCH POPOVER / TOOLTIP */}
              {popoverPlayer && popoverItem && (
                <TacticalPopover
                  player={popoverPlayer}
                  posX={popoverItem.x}
                  posY={popoverItem.y}
                  substitutes={popoverSubstitutes}
                  onSwap={handleSwapPlayer}
                  onOpenModal={(id) => {
                    setSubModalPlayerId(id);
                    if (onOpenSubstitutesModal) onOpenSubstitutesModal(id);
                  }}
                  onClose={() => setPopoverPlayerId(null)}
                />
              )}
            </div>

            {/* Pitch Bottom Status */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 px-1 pt-1 gap-2">
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-club-gold border border-white/60"></span> Sahadaki İlk 8
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3 h-3 fill-red-400 text-red-400" /> Ramazan Işık (Kalp İkonlu)
                </span>
                <span className="flex items-center gap-1.5">
                  <ArrowRightLeft className="w-3 h-3 text-sky-400" /> Tıkla Yedekle Değiştir
                </span>
              </div>
              <span className="text-[11px] text-club-gold font-semibold">Taktik: Enes Kaplan</span>
            </div>
          </div>
        </div>

        {/* Sidebar Column: Substitutes Quick Drawer & Formation Info (4 Cols) */}
        <div className="lg:col-span-4">
          <SubstitutesPanel
            selectedPlayer={selectedPlayer}
            activePitchPlayers={activePitchPlayers}
            substitutes={selectedSubstitutes}
            isOnPitch={isSelectedOnPitch}
            onSwap={handleSwapPlayer}
            onSubstituteInBench={handleSubstituteInBench}
          />
        </div>
      </div>

      {/* Substitutes Modal for on-pitch and bench swaps */}
      {subModalPlayerId && (
        <SubstitutesModal
          isOpen={Boolean(subModalPlayerId)}
          player={allPlayers.find((p) => p.id === subModalPlayerId) || null}
          isOnPitch={activePitchPlayers.some((item) => item.id === subModalPlayerId)}
          substitutes={
            (allPlayers.find((p) => p.id === subModalPlayerId)?.substituteIds || [])
              .map((id) => allPlayers.find((p) => p.id === id))
              .filter((p): p is Player => Boolean(p))
          }
          onSwap={(onPitchId, subId) => {
            handleSwapPlayer(onPitchId, subId);
            setSubModalPlayerId(null);
          }}
          onClose={() => setSubModalPlayerId(null)}
        />
      )}
    </section>
  );
};
