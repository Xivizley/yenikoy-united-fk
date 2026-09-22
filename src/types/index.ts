export interface PlayerStats {
  pac: number;
  sho: number;
  pas: number;
  def: number;
  phy: number;
}

export interface Player {
  id: string;
  name: string;
  fullName?: string;
  number: number;
  positionCategory: string;
  positionName: string;
  roleType: 'starting' | 'sub' | 'special';
  specialBadge?: string;
  specialBadgeClass?: string;
  stats: PlayerStats;
  avatarGradient: string;
  isStarting: boolean;
  substituteIds?: string[];
  hasHeartIcon?: boolean;
  notes?: string;
}

export interface TacticalPosition {
  slot: number;
  role: string;
  id: string;
  x: number;
  y: number;
}

export interface Formation {
  name: string;
  positions: TacticalPosition[];
}

export interface ActivePitchPlayer {
  slotIndex: number;
  id: string;
  x: number;
  y: number;
  player: Player;
}

export interface Fixture {
  id: number;
  type: 'completed' | 'upcoming';
  date: string;
  dayName?: string;
  time: string;
  pitch: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  statusText: string;
  statusClass: string;
  goals?: string;
  mvp?: string;
  notes?: string;
}

export interface Challenge {
  id: string;
  team: string;
  captain: string;
  phone?: string;
  pitch: string;
  date: string;
  time: string;
  stake: string;
  message: string;
  status: string;
  timeAgo: string;
}

export interface MvpCandidate {
  id: string;
  name: string;
  pos: string;
  highlight: string;
  avatar: string;
}

export type ToastType = 'success' | 'info' | 'error';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: ToastType;
}
