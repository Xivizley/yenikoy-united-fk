'use client';

import React from 'react';
import { ClubCrest } from './ClubCrest';
import { MapPin } from 'lucide-react';

interface FooterProps {
  onOpenChallengeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChallengeModal }) => {
  return (
    <footer className="border-t border-club-gold/20 bg-club-navy-deep/90 relative z-10 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ClubCrest size="sm" />
              <span className="font-display font-black text-xl text-white tracking-wider">
                YENİKÖY UNITED <span className="text-club-gold">FK</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Karacabey Yeniköy Mahallesinin halı sahalardaki gururu. Mahalle dayanışmasını ve sporun centilmenliğini yaşatmak için 2025 yılında Enes Kaplan ve arkadaşları tarafından kurulmuştur.
            </p>
            <div className="text-xs text-club-gold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Yeniköy Sahil Kordonu & Karacabey Merkez Halı Sahaları, Bursa
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm text-club-gold uppercase tracking-wider">
              Kulüp Bağlantıları
            </h5>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>
                <a href="#taktik" className="hover:text-club-gold transition-colors">
                  2D Taktik Tahtası (İlk 8)
                </a>
              </li>
              <li>
                <a href="#kadro" className="hover:text-club-gold transition-colors">
                  Oyuncu Kadrosu & İstatistikler
                </a>
              </li>
              <li>
                <a href="#fikstur" className="hover:text-club-gold transition-colors">
                  Maç Fikstürü & Skorlar
                </a>
              </li>
              <li>
                <a href="#mvp" className="hover:text-club-gold transition-colors">
                  Haftanın MVP Oylaması
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenChallengeModal}
                  className="hover:text-club-gold transition-colors text-left cursor-pointer"
                >
                  Maç Başvurusu Yap
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Club Contact */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm text-club-gold uppercase tracking-wider">
              Yönetim & İletişim
            </h5>
            <div className="text-xs text-slate-300 space-y-2">
              <p>
                <strong className="text-white">Admin / Kurucu:</strong> Enes Kaplan
              </p>
              <p>
                <strong className="text-white">En Önemli Yedek:</strong> Efe Can (Kiralık)
              </p>
              <p>
                <strong className="text-white">Gelecek Transfer:</strong> Egemen Gıryıke
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-club-gold hover:border-club-gold transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-400 transition-all"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-400 transition-all"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2025 - 2026 Yeniköy United Futbol Kulübü. Tüm hakları saklıdır. Karacabey / Bursa.</p>
          <p className="text-[11px]">Modernize Edilmiş Premium Arayüz • Next.js & Vercel Sürümü</p>
        </div>
      </div>
    </footer>
  );
};
