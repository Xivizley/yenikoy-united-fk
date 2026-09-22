'use client';

import React, { useState, useCallback } from 'react';
import { INITIAL_PLAYERS } from '@/data/players';
import { INITIAL_FIXTURES } from '@/data/fixtures';
import { INITIAL_CHALLENGES } from '@/data/challenges';
import { Player, Challenge, ToastMessage } from '@/types';

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TacticalPitch } from '@/components/TacticalPitch/TacticalPitch';
import { SquadSection } from '@/components/SquadSection';
import { FixturesSection } from '@/components/FixturesSection';
import { MvpVotingSection } from '@/components/MvpVotingSection';
import { ChallengesSection } from '@/components/ChallengesSection';
import { Footer } from '@/components/Footer';
import { ChallengeModal } from '@/components/ChallengeModal';
import { ToastContainer } from '@/components/ToastContainer';

export default function HomePage() {
  const [players] = useState<Player[]>(INITIAL_PLAYERS);
  const [fixtures] = useState(INITIAL_FIXTURES);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);

  // Modals state
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (title: string, message: string, type: 'success' | 'info' | 'error' = 'info') => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, title, message, type }]);

      // Auto dismiss after 5s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddChallenge = (newChallenge: Challenge) => {
    setChallenges((prev) => [newChallenge, ...prev]);
  };

  return (
    <div className="relative min-h-screen bg-club-navy-deep text-slate-100">
      {/* Ambient Light Effects in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-club-blue-dark/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-club-gold/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/3 w-[700px] h-[700px] bg-club-blue/15 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* STICKY TOP NAVIGATION BAR */}
      <Navbar onOpenChallengeModal={() => setIsChallengeModalOpen(true)} />

      {/* MAIN CONTAINER */}
      <main className="relative z-10 space-y-16 sm:space-y-24 pb-20">
        {/* HERO SECTION */}
        <HeroSection onOpenChallengeModal={() => setIsChallengeModalOpen(true)} />

        {/* SECTION 2: 2D INTERACTIVE HALI SAHA TACTICS BOARD */}
        <TacticalPitch
          allPlayers={players}
          showToast={showToast}
        />

        {/* SECTION 3: FULL SQUAD LIST & PLAYER PROFILES */}
        <SquadSection
          players={players}
          onSelectPlayerForPitch={(id) => {
            const el = document.getElementById(`token-${id}`);
            if (el) el.click();
          }}
        />

        {/* SECTION 4: MATCH FIXTURES & RESULTS */}
        <FixturesSection
          fixtures={fixtures}
          onOpenChallengeModal={() => setIsChallengeModalOpen(true)}
        />

        {/* SECTION 5: MVP OF THE WEEK VOTING */}
        <MvpVotingSection showToast={showToast} />

        {/* SECTION 6: RAKİP TAKIM BAŞVURULARI & GELEN MEYDAN OKUMALAR */}
        <ChallengesSection
          challenges={challenges}
          onOpenChallengeModal={() => setIsChallengeModalOpen(true)}
        />
      </main>

      {/* FOOTER */}
      <Footer onOpenChallengeModal={() => setIsChallengeModalOpen(true)} />

      {/* 1. MEYDAN OKUMA (CHALLENGE) MODAL */}
      <ChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        onSubmit={handleAddChallenge}
        showToast={showToast}
      />

      {/* 2. TOAST NOTIFICATION CONTAINER */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
