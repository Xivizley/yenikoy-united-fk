'use client';

import React, { useState, useMemo } from 'react';
import { Player } from '@/types';
import { Users, Search, Heart, UserX } from 'lucide-react';

interface SquadSectionProps {
  players: Player[];
  onSelectPlayerForPitch: (playerId: string) => void;
}

export const SquadSection: React.FC<SquadSectionProps> = ({
  players,
  onSelectPlayerForPitch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [squadFilter, setSquadFilter] = useState<'all' | 'starting' | 'subs' | 'special'>('all');

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchPos = (p.positionName || p.positionCategory).toLowerCase().includes(query);
        const matchNotes = (p.notes || '').toLowerCase().includes(query);
        if (!matchName && !matchPos && !matchNotes) return false;
      }

      // Role filter
      if (squadFilter === 'starting') return p.roleType === 'starting' || p.isStarting;
      if (squadFilter === 'subs') return p.roleType === 'sub' || !p.isStarting;
      if (squadFilter === 'special') return p.roleType === 'special';
      return true;
    });
  }, [players, searchQuery, squadFilter]);

  return (
    <section id="kadro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-club-gold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" /> Yeniköy United FK Kadro & Roller
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">
            Resmi Oyuncu Listesi
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Ana kadro ilk 8, kritik yedekler, kiralık yıldız, gelecek sezon transferi ve kurucu admin tam listesi.
          </p>
        </div>

        {/* Squad Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              id="playerSearchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Oyuncu veya mevki ara..."
              className="w-full sm:w-56 bg-club-navy border border-club-gold/30 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-club-gold transition-all"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-club-navy p-1 rounded-xl border border-club-gold/20 overflow-x-auto">
            <button
              onClick={() => setSquadFilter('all')}
              id="filter-btn-all"
              className={`squad-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                squadFilter === 'all'
                  ? 'bg-club-gold text-club-navy-deep'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setSquadFilter('starting')}
              id="filter-btn-starting"
              className={`squad-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                squadFilter === 'starting'
                  ? 'bg-club-gold text-club-navy-deep font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              İlk 8 (As)
            </button>
            <button
              onClick={() => setSquadFilter('subs')}
              id="filter-btn-subs"
              className={`squad-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                squadFilter === 'subs'
                  ? 'bg-club-gold text-club-navy-deep font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Yedekler
            </button>
            <button
              onClick={() => setSquadFilter('special')}
              id="filter-btn-special"
              className={`squad-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                squadFilter === 'special'
                  ? 'bg-club-gold text-club-navy-deep font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Özel Roller
            </button>
          </div>
        </div>
      </div>

      {/* Player Cards Grid */}
      <div
        id="squadGrid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {filteredPlayers.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 glass-panel rounded-3xl p-8">
            <UserX className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-base font-bold text-white">Aramanıza Uygun Oyuncu Bulunamadı</p>
            <p className="text-xs text-slate-400 mt-1">
              Lütfen farklı bir isim veya mevki ile tekrar deneyin.
            </p>
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="glass-card-interactive p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between group"
            >
              {/* Top Row: Jersey Number & Role Badges */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-b ${player.avatarGradient} flex items-center justify-center font-jersey text-2xl text-white border border-club-gold/30 shadow-md group-hover:scale-105 transition-transform`}
                  >
                    {player.number}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {player.specialBadge ? (
                      <span
                        className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md border ${player.specialBadgeClass} shadow-sm`}
                      >
                        {player.specialBadge}
                      </span>
                    ) : player.isStarting ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-club-gold/20 text-club-gold border border-club-gold/30">
                        AS İLK 8
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-700/50 text-slate-300 border border-slate-600/40">
                        YEDEK
                      </span>
                    )}

                    {player.hasHeartIcon && (
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                        <Heart className="w-2.5 h-2.5 fill-rose-400 text-rose-400 inline" /> Kalpli
                      </span>
                    )}
                  </div>
                </div>

                {/* Player Name & Position */}
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-lg text-white group-hover:text-club-gold transition-colors">
                    {player.name}
                  </h3>
                  <p className="text-xs font-semibold text-club-gold-light uppercase tracking-wider">
                    {player.positionName || player.positionCategory}
                  </p>
                  {player.notes && (
                    <p className="text-[11px] text-slate-400 line-clamp-2 pt-1">{player.notes}</p>
                  )}
                </div>
              </div>

              {/* Bottom: Skills Bars & Action */}
              <div className="mt-5 pt-4 border-t border-club-gold/10 space-y-2">
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Hücum & Hız:</span>
                    <span className="text-white font-bold">{player.stats.pac}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-club-navy-deep overflow-hidden">
                    <div
                      className="h-full bg-club-gold rounded-full transition-all duration-500"
                      style={{ width: `${player.stats.pac}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Mücadele & Güç:</span>
                    <span className="text-white font-bold">{player.stats.phy}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-club-navy-deep overflow-hidden">
                    <div
                      className="h-full bg-club-blue-light rounded-full transition-all duration-500"
                      style={{ width: `${player.stats.phy}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectPlayerForPitch(player.id);
                    const el = document.getElementById('taktik');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full mt-3 py-2 rounded-xl bg-club-navy hover:bg-club-gold text-slate-300 hover:text-club-navy-deep font-display font-bold text-xs transition-all border border-club-gold/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>⚽</span>
                  <span>Tahtada İncele</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
