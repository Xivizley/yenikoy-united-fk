'use client';

import React, { useState } from 'react';
import { ClubCrest } from './ClubCrest';
import { MapPin, Users, CalendarDays, Award, Swords, Menu, X, LayoutGrid } from 'lucide-react';

interface NavbarProps {
  onOpenChallengeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChallengeModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-club-gold/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <a href="#" className="flex items-center gap-3.5 group">
          <ClubCrest size="md" className="transition-transform duration-300 group-hover:scale-105" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-club-gold transition-colors">
                YENİKÖY UNITED <span className="text-club-gold">FK</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest bg-club-gold/15 text-club-gold border border-club-gold/30 rounded">
                EST. 2025
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3 h-3 text-club-gold" /> Karacabey, Bursa
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <a
            href="#taktik"
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-club-gold hover:bg-club-navy-light/40 rounded-lg transition-all flex items-center gap-2"
          >
            <LayoutGrid className="w-4 h-4 text-club-gold" /> Taktik Tahtası
          </a>
          <a
            href="#kadro"
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-club-gold hover:bg-club-navy-light/40 rounded-lg transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-club-gold" /> Kadro
          </a>
          <a
            href="#fikstur"
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-club-gold hover:bg-club-navy-light/40 rounded-lg transition-all flex items-center gap-2"
          >
            <CalendarDays className="w-4 h-4 text-club-gold" /> Fikstür & Skorlar
          </a>
          <a
            href="#mvp"
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-club-gold hover:bg-club-navy-light/40 rounded-lg transition-all flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-club-gold" /> Haftanın MVP&apos;si
          </a>
        </nav>

        {/* Action Button (Meydan Oku) & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenChallengeModal}
            className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-club-gold via-amber-400 to-club-gold-dark text-club-navy-deep font-display font-extrabold text-xs sm:text-sm tracking-wide shadow-gold-glow hover:shadow-gold-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Swords className="w-4 h-4" />
            <span>MEYDAN OKU</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-white/20 skew-x-12"></div>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-club-navy-light/60 border border-club-gold/20 text-slate-200 hover:text-club-gold focus:outline-none cursor-pointer"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-club-gold/15 bg-club-navy-deep/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#taktik"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-slate-200 font-medium hover:bg-club-navy hover:text-club-gold transition-colors flex items-center gap-3"
          >
            <LayoutGrid className="w-5 h-5 text-club-gold" /> 2D Taktik Tahtası (İlk 8)
          </a>
          <a
            href="#kadro"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-slate-200 font-medium hover:bg-club-navy hover:text-club-gold transition-colors flex items-center gap-3"
          >
            <Users className="w-5 h-5 text-club-gold" /> Oyuncu Kadrosu & Roller
          </a>
          <a
            href="#fikstur"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-slate-200 font-medium hover:bg-club-navy hover:text-club-gold transition-colors flex items-center gap-3"
          >
            <CalendarDays className="w-5 h-5 text-club-gold" /> Maç Takvimi & Skortabela
          </a>
          <a
            href="#mvp"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-slate-200 font-medium hover:bg-club-navy hover:text-club-gold transition-colors flex items-center gap-3"
          >
            <Award className="w-5 h-5 text-club-gold" /> Haftanın MVP Oylaması
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChallengeModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-club-gold to-club-gold-dark text-club-navy-deep font-display font-extrabold text-center tracking-wide shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              <Swords className="w-4 h-4" /> Rakip Takım Başvurusu Yap
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
