import { PLAYERS } from '@/data/players';

interface SquadPitchProps {
  className?: string;
}

const PITCH_POSITIONS: { id: string; top: string; left: string }[] = [
  { id: 'renzi', top: '14%', left: '34%' },
  { id: 'efe_kaan', top: '14%', left: '66%' },
  { id: 'mert_ferruh', top: '38%', left: '14%' },
  { id: 'yusuf_kagan', top: '38%', left: '86%' },
  { id: 'eg_ozruf', top: '64%', left: '20%' },
  { id: 'oguzhan_t', top: '64%', left: '50%' },
  { id: 'ege_bayir', top: '64%', left: '80%' },
  { id: 'g_calik', top: '86%', left: '50%' },
];

export function SquadPitch({ className = '' }: SquadPitchProps) {
  const starters = PLAYERS.filter((p) => p.role === 'starter');

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <h3 className="text-navy font-bold text-base sm:text-lg">
          İlk 8 — Taktik Saha Dizilişi
        </h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
          Formasyon: 3-2-2 (Halı Saha)
        </span>
      </div>

      <div
        className="pitch-field rounded-lg mx-auto overflow-hidden relative shadow-inner select-none"
        style={{ maxWidth: 380, aspectRatio: '3 / 4' }}
      >
        {/* Field markings */}
        <div className="pitch-center-line" />
        <div className="pitch-center-circle" />
        <div className="pitch-penalty-top" />
        <div className="pitch-penalty-bottom" />

        {/* Players on Pitch */}
        {PITCH_POSITIONS.map((pos) => {
          const player = starters.find((p) => p.id === pos.id);
          if (!player) return null;
          return (
            <div
              key={pos.id}
              className="absolute flex flex-col items-center pointer-events-none"
              style={{
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-navy rounded-full flex items-center justify-center border-2 border-gold shadow-md">
                <span className="text-white font-bold text-xs sm:text-sm">
                  {player.number}
                </span>
              </div>
              <span className="text-white text-[10px] sm:text-xs font-semibold mt-1 bg-navy/90 px-2 py-0.5 rounded border border-navy/40 shadow-sm whitespace-nowrap">
                {player.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
