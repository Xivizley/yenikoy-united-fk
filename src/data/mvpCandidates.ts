import { MvpCandidate } from '@/types';

export const MVP_CANDIDATES: MvpCandidate[] = [
  {
    id: 'renzi',
    name: 'Renzi M.',
    pos: 'Forvet',
    highlight: 'Hat-Trick & 2 Asist ile Galibiyet Mimarı',
    avatar: 'from-club-gold to-amber-600'
  },
  {
    id: 'oguzhan_t',
    name: 'Oğuzhan T.',
    pos: 'Stoper / Merkez',
    highlight: '%92 İkili Mücadele Kazanma & Kaya Savunma',
    avatar: 'from-blue-600 to-slate-800'
  },
  {
    id: 'efe_can',
    name: 'Efe Can (Kiralık)',
    pos: 'Hücum Jokeri',
    highlight: 'Oyuna Sonradan Girip 2 Golle Maçı Çözdü',
    avatar: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'eg_ozruf',
    name: 'E.G. Özruf',
    pos: 'Sol Bek',
    highlight: 'Kalesini Canla Başla Savundu, Hatasız Maç',
    avatar: 'from-amber-400 to-club-navy-light'
  },
  {
    id: 'mert_ferruh',
    name: 'Mert Ferruh',
    pos: 'Sol Kanat',
    highlight: 'Sol Çizgiyi Felç Etti, 7 Başarılı Çalım',
    avatar: 'from-blue-400 to-indigo-600'
  }
];

export const INITIAL_MVP_VOTES: Record<string, number> = {
  renzi: 68,
  oguzhan_t: 45,
  efe_can: 38,
  eg_ozruf: 22,
  mert_ferruh: 13
};
