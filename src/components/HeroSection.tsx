import { Shield, ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-navy text-white border-b-4 border-gold">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          {/* Club Crest */}
          <div className="shrink-0">
            <svg
              width="130"
              height="130"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="sm:w-[160px] sm:h-[160px] drop-shadow-md"
            >
              <path
                d="M32 4L8 16V36C8 48 18 58 32 62C46 58 56 48 56 36V16L32 4Z"
                fill="#0A1128"
                stroke="#D4AF37"
                strokeWidth="2.2"
              />
              <path
                d="M32 8L12 18V35C12 45.5 20.5 54 32 58C43.5 54 52 45.5 52 35V18L32 8Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <text
                x="32"
                y="34"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#D4AF37"
                fontFamily="Inter, sans-serif"
                fontWeight="800"
                fontSize="18"
              >
                YU
              </text>
              <text
                x="32"
                y="48"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#D4AF37"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
                fontSize="7"
                opacity="0.85"
              >
                2025
              </text>
              <circle cx="32" cy="17" r="4" fill="none" stroke="#D4AF37" strokeWidth="1" />
              <path
                d="M30 15L34 15M32 13L32 17M29.5 16.5L34.5 17.5"
                stroke="#D4AF37"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-gold text-xs font-semibold mb-3 tracking-wide">
              <Shield size={14} />
              <span>Resmi Kulüp Portalı</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Yeniköy United FK
            </h1>
            <p className="text-gold text-lg sm:text-xl font-semibold mt-1">
              Karacabey | Est. 2025
            </p>
            <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-xl">
              Yeniköy United FK - Karacabey | Resmi Web Sitesi. Mahalle futbol kulübümüzün resmi kadro, fikstür, forma ve yönetim duyuruları merkezi.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <a
                href="#kadro"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold text-sm px-5 py-2.5 rounded shadow-sm transition-colors"
              >
                <span>Resmi Kadro &amp; Taktik</span>
                <ChevronRight size={16} />
              </a>
              <a
                href="#formalar"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-5 py-2.5 rounded border border-white/20 transition-colors"
              >
                <span>Yeni Sezon Formaları</span>
              </a>
              <a
                href="#haberler"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-5 py-2.5 rounded border border-white/20 transition-colors"
              >
                <span>Duyurular</span>
              </a>
            </div>

            {/* Quick Stats Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-8 justify-center sm:justify-start text-sm">
              <div>
                <span className="text-gold font-bold text-2xl block">19</span>
                <span className="text-gray-400 text-xs uppercase tracking-wider">Kayıtlı Oyuncu</span>
              </div>
              <div>
                <span className="text-gold font-bold text-2xl block">8</span>
                <span className="text-gray-400 text-xs uppercase tracking-wider">İlk 8 Formasyonu</span>
              </div>
              <div>
                <span className="text-gold font-bold text-2xl block">2025</span>
                <span className="text-gray-400 text-xs uppercase tracking-wider">Kuruluş Yılı</span>
              </div>
              <div>
                <span className="text-gold font-bold text-2xl block">Karacabey</span>
                <span className="text-gray-400 text-xs uppercase tracking-wider">Bursa / Merkez</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
