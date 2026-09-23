interface Kit {
  name: string;
  type: string;
  bodyColor: string;
  borderColor: string;
  collarColor: string;
  trimColor: string;
  shortsColor: string;
  shortsBorder: string;
  socksColor: string;
  socksBorder: string;
  textColor: string;
  description: string;
  details: string;
}

const KITS: Kit[] = [
  {
    name: 'İç Saha Forması',
    type: '1. Takım Resmi',
    bodyColor: '#0A1128',
    borderColor: '#1C3F60',
    collarColor: '#D4AF37',
    trimColor: '#D4AF37',
    shortsColor: '#0A1128',
    shortsBorder: '#1C3F60',
    socksColor: '#0A1128',
    socksBorder: '#1C3F60',
    textColor: '#D4AF37',
    description: 'Resmi Kulüp Renkleri',
    details: 'Gece laciverti gövde üzerine şampiyonluk altın sarısı yaka ve kol şeritleri.',
  },
  {
    name: 'Deplasman Forması',
    type: 'Deplasman',
    bodyColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    collarColor: '#0A1128',
    trimColor: '#0A1128',
    shortsColor: '#FFFFFF',
    shortsBorder: '#CBD5E1',
    socksColor: '#FFFFFF',
    socksBorder: '#CBD5E1',
    textColor: '#0A1128',
    description: 'Saf Beyaz & Lacivert',
    details: 'Klasik beyaz forma kumaşı, lacivert yaka detayları ve temiz kurumsal hatlar.',
  },
  {
    name: 'Kaleci Forması',
    type: 'Özel Kaleci Kiti',
    bodyColor: '#D4AF37',
    borderColor: '#B8960F',
    collarColor: '#111827',
    trimColor: '#111827',
    shortsColor: '#111827',
    shortsBorder: '#1F2937',
    socksColor: '#111827',
    socksBorder: '#1F2937',
    textColor: '#111827',
    description: 'Altın Sarısı & Siyah',
    details: 'Kaleciler için özel tasarlanmış dikkat çekici altın sarısı forma ve siyah şort kombinasyonu.',
  },
];

function JerseySvg({ kit }: { kit: Kit }) {
  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
      aria-label={`${kit.name} illüstrasyonu`}
    >
      {/* Jersey Silhouette (Body + Sleeves) */}
      <path
        d="M36 20 L16 38 L28 54 L36 44 L36 102 C36 104.2 37.8 106 40 106 L80 106 C82.2 106 84 104.2 84 102 L84 44 L92 54 L104 38 L84 20 Z"
        fill={kit.bodyColor}
        stroke={kit.borderColor}
        strokeWidth="1.5"
      />
      {/* Sleeve Trim Left */}
      <line
        x1="17"
        y1="38"
        x2="27.5"
        y2="53"
        stroke={kit.trimColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Sleeve Trim Right */}
      <line
        x1="103"
        y1="38"
        x2="92.5"
        y2="53"
        stroke={kit.trimColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* V/Crew Collar */}
      <path
        d="M48 20 C48 30 72 30 72 20"
        stroke={kit.collarColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Crest Symbol on Chest */}
      <circle cx="60" cy="48" r="7" fill={kit.bodyColor} stroke={kit.textColor} strokeWidth="1" />
      <text
        x="60"
        y="50.5"
        textAnchor="middle"
        dominantBaseline="central"
        fill={kit.textColor}
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="6"
      >
        YU
      </text>
      {/* Sponsor / Club Print */}
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fill={kit.textColor}
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="1"
      >
        YENİKÖY
      </text>
      <text
        x="60"
        y="83"
        textAnchor="middle"
        fill={kit.textColor}
        opacity="0.75"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="6"
        letterSpacing="2"
      >
        UNITED FK
      </text>
    </svg>
  );
}

export function KitsSection() {
  return (
    <section id="formalar" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
      <div className="border-b border-gray-200 pb-4 mb-8 flex items-baseline justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">
            Resmi Kulüp Formaları
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            2025/2026 Sezonunda Takımımızın Sahada Giyeceği Onaylı Kombinasyonlar
          </p>
        </div>
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider hidden sm:block">
          3 Resmi Kit
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KITS.map((kit) => (
          <div
            key={kit.name}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col justify-between hover:border-gray-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {kit.type}
                </span>
                <span className="text-xs text-gray-400">Sezon 25/26</span>
              </div>

              {/* Jersey Display Area */}
              <div className="bg-gray-50/80 border border-gray-100 rounded-lg py-6 mb-6 flex items-center justify-center">
                <JerseySvg kit={kit} />
              </div>

              <h3 className="text-navy font-bold text-lg mb-1">{kit.name}</h3>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {kit.description}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {kit.details}
              </p>
            </div>

            {/* Color Swatches */}
            <div className="pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded-full shadow-inner"
                    style={{
                      backgroundColor: kit.bodyColor,
                      border: `1px solid ${kit.borderColor}`,
                    }}
                  />
                  <span className="text-[11px] font-medium text-gray-500">Forma</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded-full shadow-inner"
                    style={{
                      backgroundColor: kit.shortsColor,
                      border: `1px solid ${kit.shortsBorder}`,
                    }}
                  />
                  <span className="text-[11px] font-medium text-gray-500">Şort</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded-full shadow-inner"
                    style={{
                      backgroundColor: kit.socksColor,
                      border: `1px solid ${kit.socksBorder}`,
                    }}
                  />
                  <span className="text-[11px] font-medium text-gray-500">Çorap</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
