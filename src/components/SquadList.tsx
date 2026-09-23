import { PLAYERS } from '@/data/players';
import { SquadPitch } from '@/components/SquadPitch';

export function SquadList() {
  const starters = PLAYERS.filter((p) => p.role === 'starter');
  const substitutes = PLAYERS.filter((p) => p.role === 'substitute');
  const staff = PLAYERS.filter((p) => p.role === 'staff');

  function getStarterName(id: string): string {
    const starter = starters.find((s) => s.id === id);
    return starter?.name ?? id;
  }

  return (
    <section id="kadro" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy">Kadro &amp; Taktik Sistemi</h2>
        <p className="text-sm text-gray-500 mt-1">
          2025/2026 Sezonu Resmi Maç Kadrosu ve Yedekler Hiyerarşisi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: 2D Pitch Diagram */}
        <div className="lg:col-span-5">
          <SquadPitch />
        </div>

        {/* Right columns: Tables & Club Notes */}
        <div className="lg:col-span-7 space-y-6">
          {/* Starting 8 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-navy px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-white font-bold text-base">İlk 8 (Ana Kadro)</h3>
              <span className="text-xs text-gold font-semibold uppercase tracking-wider">
                8 Oyuncu
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase">
                      No
                    </th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase">
                      Oyuncu
                    </th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase">
                      Mevki
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {starters.map((player, i) => (
                    <tr
                      key={player.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/70 transition-colors ${
                        i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                      }`}
                    >
                      <td className="px-5 py-3 font-bold text-navy">
                        #{player.number}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {player.name}
                        {player.fullName && (
                          <span className="text-gray-400 text-xs ml-1.5 font-normal">
                            ({player.fullName})
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-600 font-medium">
                        {player.position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Substitutes */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-navy-light px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-white font-bold text-base">
                Yedek Oyuncular (Rotasyon &amp; Hiyerarşi)
              </h3>
              <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
                {substitutes.length} Yedek
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase">
                      No
                    </th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase">
                      Oyuncu
                    </th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase">
                      Mevki
                    </th>
                    <th className="text-left px-5 py-3 text-gray-500 font-semibold text-xs uppercase">
                      Kimin Yedeği?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {substitutes.map((player, i) => (
                    <tr
                      key={player.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/70 transition-colors ${
                        i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                      }`}
                    >
                      <td className="px-5 py-3 font-bold text-navy">
                        #{player.number}
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">
                        <span>{player.name}</span>
                        {player.hasHeartIcon && (
                          <span className="ml-1 text-red-500" title="Takımın Kalbi">
                            ❤️
                          </span>
                        )}
                        {player.badge && (
                          <span className="ml-2 inline-block text-[11px] bg-amber-100 text-amber-800 border border-amber-300 font-semibold px-2 py-0.5 rounded">
                            {player.badge}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {player.position}
                      </td>
                      <td className="px-5 py-3 text-gray-700 font-medium text-xs">
                        {player.substituteFor ? (
                          <span className="inline-flex items-center gap-1 text-navy font-semibold bg-gray-100 px-2 py-1 rounded">
                            ↳ {getStarterName(player.substituteFor)}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Club Notes */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gold px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-navy font-bold text-base">Kulüp &amp; Yönetim Notları</h3>
              <span className="text-xs text-navy/80 font-bold uppercase tracking-wider">
                Resmi Notlar
              </span>
            </div>
            <div className="p-5 space-y-3 divide-y divide-gray-100">
              {staff.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between pt-3 first:pt-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {person.number}
                    </span>
                    <div>
                      <span className="font-bold text-gray-900 text-sm">
                        {person.name}
                      </span>
                      <span className="text-gray-500 text-xs block">
                        {person.position}
                      </span>
                    </div>
                  </div>
                  {person.badge && (
                    <span className="text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 px-2.5 py-1 rounded">
                      {person.badge}
                    </span>
                  )}
                </div>
              ))}
              {/* Eymen Efe note */}
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                    18
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 text-sm">
                      Eymen Efe Keleş
                    </span>
                    <span className="text-gray-500 text-xs block">
                      Sağ Kanat
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-amber-100 border border-amber-300 text-amber-800 px-2.5 py-1 rounded">
                  En Önemli Yedek (Kiralık)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
