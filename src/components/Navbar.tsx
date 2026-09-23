'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Haberler', href: '#haberler' },
  { label: 'Kadro', href: '#kadro' },
  { label: 'Formalar', href: '#formalar' },
  { label: 'Fikstür', href: '#fikstur' },
];

function ClubCrest({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Yeniköy United FK Arması"
    >
      {/* Shield shape */}
      <path
        d="M32 4L8 16V36C8 48 18 58 32 62C46 58 56 48 56 36V16L32 4Z"
        fill="#0A1128"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      {/* Inner border */}
      <path
        d="M32 8L12 18V35C12 45.5 20.5 54 32 58C43.5 54 52 45.5 52 35V18L32 8Z"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="0.75"
        opacity="0.6"
      />
      {/* YU monogram */}
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
      {/* Year */}
      <text
        x="32"
        y="48"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#D4AF37"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize="7"
        opacity="0.8"
      >
        2025
      </text>
      {/* Football icon */}
      <circle cx="32" cy="17" r="4" fill="none" stroke="#D4AF37" strokeWidth="1" />
      <path d="M30 15L34 15M32 13L32 17M29.5 16.5L34.5 17.5" stroke="#D4AF37" strokeWidth="0.5" />
    </svg>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Club Name */}
          <a href="#" className="flex items-center gap-3">
            <ClubCrest size={36} />
            <div>
              <span className="text-navy font-bold text-lg leading-tight block">
                Yeniköy United FK
              </span>
              <span className="text-xs text-gray-500 leading-tight hidden sm:block">
                Karacabey, Bursa
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-navy font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-navy"
            aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-md font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
