'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Challenge } from '@/types';
import { X, Swords, Send } from 'lucide-react';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newChallenge: Challenge) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  showToast,
}) => {
  const [team, setTeam] = useState('');
  const [captain, setCaptain] = useState('');
  const [phone, setPhone] = useState('');
  const [pitch, setPitch] = useState('Karacabey Belediye Halı Sahası');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('21:00 - 22:00');
  const [stake, setStake] = useState('Baklavasına Halı Saha Maçı');
  const [note, setNote] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!team.trim() || !captain.trim() || !phone.trim() || !date) {
      showToast('Eksik Bilgi', 'Lütfen tüm zorunlu alanları doldurun.', 'error');
      return;
    }

    const newChallenge: Challenge = {
      id: `ch_${Date.now()}`,
      team: team.trim(),
      captain: captain.trim(),
      phone: phone.trim(),
      pitch,
      date,
      time,
      stake,
      message: note.trim() || 'Halı saha maçı için teklif gönderildi!',
      status: 'Admin Onayında',
      timeAgo: 'Az önce',
    };

    onSubmit(newChallenge);

    // Confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });

    showToast(
      'Meydan Okuma İletildi!',
      `${team.trim()} takımının teklifi Admin Enes Kaplan'a ulaştı. En kısa sürede WhatsApp üzerinden dönüş yapılacaktır.`,
      'success'
    );

    // Reset and close
    setTeam('');
    setCaptain('');
    setPhone('');
    setNote('');
    onClose();
  };

  return (
    <div
      id="challengeModal"
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="challengeModalTitle"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-xl glass-panel-accent p-6 sm:p-8 rounded-3xl border-club-gold/40 text-left shadow-2xl overflow-hidden transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-club-gold/20 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-club-gold/20 border border-club-gold/40 flex items-center justify-center text-club-gold">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <h3 id="challengeModalTitle" className="font-display font-extrabold text-xl text-white">
                  Yeniköy United&apos;a Meydan Oku
                </h3>
                <p className="text-xs text-slate-300">
                  Karacabey & Çevre Mahalle Takımları İçin Maç Teklifi Formu
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form id="challengeForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Opponent Team Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="challengerTeam">
                  Rakip Takım Adı <span className="text-club-gold">*</span>
                </label>
                <input
                  type="text"
                  id="challengerTeam"
                  required
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  placeholder="Örn: Canbalı City SK"
                  className="w-full bg-club-navy-deep border border-club-gold/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-club-gold"
                />
              </div>

              {/* Captain Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="challengerCaptain">
                  Kaptan / Temsilci Adı <span className="text-club-gold">*</span>
                </label>
                <input
                  type="text"
                  id="challengerCaptain"
                  required
                  value={captain}
                  onChange={(e) => setCaptain(e.target.value)}
                  placeholder="Örn: Ahmet Yılmaz"
                  className="w-full bg-club-navy-deep border border-club-gold/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-club-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="challengerPhone">
                  İletişim Numarası (WhatsApp) <span className="text-club-gold">*</span>
                </label>
                <input
                  type="tel"
                  id="challengerPhone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="w-full bg-club-navy-deep border border-club-gold/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-club-gold"
                />
              </div>

              {/* Pitch Location Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="pitchPreference">
                  Saha Tercihi <span className="text-club-gold">*</span>
                </label>
                <select
                  id="pitchPreference"
                  required
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="w-full bg-club-navy-deep border border-club-gold/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-club-gold cursor-pointer"
                >
                  <option value="Karacabey Belediye Halı Sahası">Karacabey Belediye Halı Sahası</option>
                  <option value="Gölecik Arena Halı Saha">Gölecik Arena Halı Saha</option>
                  <option value="Yeniköy Sahil Spor Tesisleri">Yeniköy Sahil Spor Tesisleri</option>
                  <option value="Karacabey Gençlik Parkı Sahası">Karacabey Gençlik Parkı Sahası</option>
                  <option value="Fark etmez / Ortak Belirleyelim">Fark etmez / Ortak Belirleyelim</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="matchDate">
                  Tarih <span className="text-club-gold">*</span>
                </label>
                <input
                  type="date"
                  id="matchDate"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-club-navy-deep border border-club-gold/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-club-gold"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="matchTime">
                  Saat Dilimi <span className="text-club-gold">*</span>
                </label>
                <select
                  id="matchTime"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-club-navy-deep border border-club-gold/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-club-gold cursor-pointer"
                >
                  <option value="20:00 - 21:00">20:00 - 21:00</option>
                  <option value="21:00 - 22:00">21:00 - 22:00</option>
                  <option value="22:00 - 23:00">22:00 - 23:00</option>
                  <option value="23:00 - 00:00">23:00 - 00:00</option>
                </select>
              </div>

              {/* Match Stake / Type */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="matchStake">
                  İddia Türü
                </label>
                <select
                  id="matchStake"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="w-full bg-club-navy-deep border border-club-gold/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-club-gold cursor-pointer"
                >
                  <option value="Baklavasına Halı Saha Maçı">Baklavasına Halı Saha</option>
                  <option value="Kaybeden Saha Ücretini Öder">Saha Parasına</option>
                  <option value="Dostluk Maçı (Centilmence)">Dostluk Maçı</option>
                  <option value="Karacabey Prestij Derbisi">Prestij Derbisi</option>
                </select>
              </div>
            </div>

            {/* Challenge Message / Note */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1" htmlFor="challengeNote">
                Meydan Okuma Mesajı / Notunuz
              </label>
              <textarea
                id="challengeNote"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Örn: Kadromuz hazır, cuma akşamı sahada görüşmek üzere!"
                className="w-full bg-club-navy-deep border border-club-gold/30 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-club-gold resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-club-gold to-club-gold-dark text-club-navy-deep font-display font-extrabold text-xs sm:text-sm tracking-wide shadow-gold-glow hover:shadow-gold-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>MEYDAN OKUMAYI GÖNDER</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
