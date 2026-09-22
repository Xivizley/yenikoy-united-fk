import { Fixture } from '@/types';

export const INITIAL_FIXTURES: Fixture[] = [
  {
    id: 1,
    type: 'completed',
    date: '18 Eylül 2026',
    time: '21:00',
    pitch: 'Gölecik Arena Halı Saha',
    homeTeam: 'Yeniköy United FK',
    awayTeam: 'Ovaazatlı Gücü',
    homeScore: 8,
    awayScore: 4,
    statusText: 'GALİBİYET',
    statusClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    goals: 'Renzi M. (3), Efe Kaan (2), Yusuf Kağan (2), Mert Ferruh',
    mvp: 'Renzi M. (Hat-Trick & 2 Asist)'
  },
  {
    id: 2,
    type: 'completed',
    date: '12 Eylül 2026',
    time: '22:00',
    pitch: 'Karacabey Belediye Tesisleri',
    homeTeam: 'Karacabey Birlik',
    awayTeam: 'Yeniköy United FK',
    homeScore: 3,
    awayScore: 6,
    statusText: 'GALİBİYET',
    statusClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    goals: 'Oğuzhan T., G. Çalık, Ege Bayır, Renzi M. (2), Efe Kaan',
    mvp: 'Oğuzhan T. (Kaya Savunma & 1 Gol)'
  },
  {
    id: 3,
    type: 'completed',
    date: '5 Eylül 2026',
    time: '20:30',
    pitch: 'Yeniköy Sahil Halı Sahası',
    homeTeam: 'Yeniköy United FK',
    awayTeam: 'Mustafakemalpaşa FC',
    homeScore: 5,
    awayScore: 5,
    statusText: 'BERABERLİK',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    goals: 'Efe Can (2 - Son Dakika!), Mert Ferruh (2), Yusuf Kağan',
    mvp: 'Efe Can (Kiralık Yıldız)'
  },
  {
    id: 4,
    type: 'completed',
    date: '28 Ağustos 2026',
    time: '21:30',
    pitch: 'Gölecik Arena Halı Saha',
    homeTeam: 'Saadet Mahallesi Gençlik',
    awayTeam: 'Yeniköy United FK',
    homeScore: 2,
    awayScore: 9,
    statusText: 'EZİCİ GALİBİYET',
    statusClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    goals: 'Renzi M. (4), Efe Kaan (3), E.G. Özruf, Oğuzhan T.',
    mvp: 'Efe Kaan & Renzi M.'
  },
  // Gelecek Randevular
  {
    id: 5,
    type: 'upcoming',
    date: '25 Eylül 2026',
    dayName: 'Cuma',
    time: '21:00',
    pitch: 'Karacabey Spor Parkı Sahası',
    homeTeam: 'Yeniköy United FK',
    awayTeam: 'Bakırköy İdman Yurdu',
    statusText: 'YAKLAŞAN RANDEVU',
    statusClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    notes: 'Karacabey derbisi, kadro eksiksiz toplanıyor.'
  },
  {
    id: 6,
    type: 'upcoming',
    date: '28 Eylül 2026',
    dayName: 'Pazartesi',
    time: '22:00',
    pitch: 'Yeniköy Sahil Spor Tesisleri',
    homeTeam: 'Yeniköy United FK',
    awayTeam: 'Taşlık Köyü SK',
    statusText: 'DOSTLUK MAÇI',
    statusClass: 'bg-club-gold/20 text-club-gold border-club-gold/30',
    notes: 'Baklavasına mahalleler arası rövanş mücadelesi.'
  }
];
