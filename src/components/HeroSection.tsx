import Image from 'next/image';
import { Shield, ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-navy text-white border-b-4 border-gold">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          {/* Official Club Crest */}
          <div className="shrink-0 relative group">
            <div className="absolute -inset-1 rounded-full bg-gold/30 blur-sm group-hover:bg-gold/50 transition-colors" />
            <Image
              src="/logo.png"
              alt="Yeniköy United FK Resmi Kulüp Arması"
              width={170}
              height={170}
              className="relative rounded-full drop-shadow-2xl border-2 border-gold/60 p-0.5 bg-navy sm:w-[180px] sm:h-[180px]"
              priority
            />
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
