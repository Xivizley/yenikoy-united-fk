'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Haberler', href: '#haberler' },
  { label: 'Kadro', href: '#kadro' },
  { label: 'Formalar', href: '#formalar' },
  { label: 'Fikstür', href: '#fikstur' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Club Name */}
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Yeniköy United FK Resmi Arması"
              width={42}
              height={42}
              className="rounded-full drop-shadow-sm transition-transform group-hover:scale-105"
              priority
            />
            <div>
              <span className="text-navy font-bold text-lg leading-tight block tracking-tight">
                Yeniköy United FK
              </span>
              <span className="text-xs text-gray-500 leading-tight hidden sm:block">
                Karacabey, Bursa • Est. 2025
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
