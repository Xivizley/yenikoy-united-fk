import { Formation } from '@/types';

export const FORMATIONS: Record<string, Formation> = {
  '3-2-2': {
    name: '3-2-2 (Klasik Hücum - Resmi İlk 8)',
    positions: [
      { slot: 0, role: 'Forvet Çifti', id: 'renzi', x: 35, y: 16 },
      { slot: 1, role: 'Forvet Çifti', id: 'efe_kaan', x: 65, y: 16 },
      { slot: 2, role: 'Sol Kanat', id: 'mert_ferruh', x: 16, y: 38 },
      { slot: 3, role: 'Sağ Kanat', id: 'yusuf_kagan', x: 84, y: 38 },
      { slot: 4, role: 'Stoper / Merkez', id: 'oguzhan_t', x: 35, y: 58 },
      { slot: 5, role: 'Stoper / Defans', id: 'g_calik', x: 65, y: 58 },
      { slot: 6, role: 'Sol Bek', id: 'eg_ozruf', x: 18, y: 78 },
      { slot: 7, role: 'Sağ Bek', id: 'ege_bayir', x: 82, y: 78 }
    ]
  },
  '2-4-1': {
    name: '2-4-1 (Dengeli Halı Saha & Kanat Baskısı)',
    positions: [
      { slot: 0, role: 'Tek Forvet', id: 'renzi', x: 50, y: 14 },
      { slot: 1, role: 'Ofansif Merkez', id: 'efe_kaan', x: 34, y: 32 },
      { slot: 2, role: 'Sol Kanat', id: 'mert_ferruh', x: 14, y: 44 },
      { slot: 3, role: 'Sağ Kanat', id: 'yusuf_kagan', x: 86, y: 44 },
      { slot: 4, role: 'Merkez Destek', id: 'oguzhan_t', x: 66, y: 32 },
      { slot: 5, role: 'Ön Libero', id: 'g_calik', x: 50, y: 62 },
      { slot: 6, role: 'Sol Bek / Stoper', id: 'eg_ozruf', x: 22, y: 78 },
      { slot: 7, role: 'Sağ Bek / Stoper', id: 'ege_bayir', x: 78, y: 78 }
    ]
  },
  '3-3-1': {
    name: '3-3-1 (Kaya Defans & Kontra Atak)',
    positions: [
      { slot: 0, role: 'Uç Forvet', id: 'renzi', x: 50, y: 15 },
      { slot: 1, role: 'Merkez Hücum', id: 'efe_kaan', x: 50, y: 42 },
      { slot: 2, role: 'Sol Kanat', id: 'mert_ferruh', x: 20, y: 40 },
      { slot: 3, role: 'Sağ Kanat', id: 'yusuf_kagan', x: 80, y: 40 },
      { slot: 4, role: 'Merkez Orta', id: 'oguzhan_t', x: 50, y: 64 },
      { slot: 5, role: 'Merkez Stoper', id: 'g_calik', x: 50, y: 78 },
      { slot: 6, role: 'Sol Bek', id: 'eg_ozruf', x: 18, y: 78 },
      { slot: 7, role: 'Sağ Bek', id: 'ege_bayir', x: 82, y: 78 }
    ]
  },
  '2-3-2': {
    name: '2-3-2 (Yüksek Pres & Çift Forvet)',
    positions: [
      { slot: 0, role: 'Sol Forvet', id: 'renzi', x: 34, y: 15 },
      { slot: 1, role: 'Sağ Forvet', id: 'efe_kaan', x: 66, y: 15 },
      { slot: 2, role: 'Sol Kanat', id: 'mert_ferruh', x: 18, y: 42 },
      { slot: 3, role: 'Sağ Kanat', id: 'yusuf_kagan', x: 82, y: 42 },
      { slot: 4, role: 'Merkez Orta', id: 'oguzhan_t', x: 50, y: 44 },
      { slot: 5, role: 'Merkez Stoper', id: 'g_calik', x: 50, y: 66 },
      { slot: 6, role: 'Sol Bek', id: 'eg_ozruf', x: 24, y: 80 },
      { slot: 7, role: 'Sağ Bek', id: 'ege_bayir', x: 76, y: 80 }
    ]
  },
  '3-2-1': {
    name: '3-2-1 (Piramit Halı Saha Dizilimi)',
    positions: [
      { slot: 0, role: 'Santrafor', id: 'renzi', x: 50, y: 14 },
      { slot: 1, role: 'İkinci Forvet', id: 'efe_kaan', x: 36, y: 34 },
      { slot: 2, role: 'Sol Kanat', id: 'mert_ferruh', x: 18, y: 56 },
      { slot: 3, role: 'Sağ Kanat', id: 'yusuf_kagan', x: 64, y: 34 },
      { slot: 4, role: 'Merkez Orta', id: 'oguzhan_t', x: 82, y: 56 },
      { slot: 5, role: 'Merkez Stoper', id: 'g_calik', x: 50, y: 78 },
      { slot: 6, role: 'Sol Bek', id: 'eg_ozruf', x: 20, y: 78 },
      { slot: 7, role: 'Sağ Bek', id: 'ege_bayir', x: 80, y: 78 }
    ]
  },
  '4-3-3': {
    name: '4-3-3 (Geniş Alan / Total Futbol)',
    positions: [
      { slot: 0, role: 'Santrafor', id: 'renzi', x: 50, y: 14 },
      { slot: 1, role: 'Sağ Kanat Forvet', id: 'efe_kaan', x: 80, y: 18 },
      { slot: 2, role: 'Sol Kanat Forvet', id: 'mert_ferruh', x: 20, y: 18 },
      { slot: 3, role: 'Sağ İç Orta Saha', id: 'yusuf_kagan', x: 65, y: 46 },
      { slot: 4, role: 'Sol İç Orta Saha', id: 'oguzhan_t', x: 35, y: 46 },
      { slot: 5, role: 'Merkez Stoper', id: 'g_calik', x: 50, y: 76 },
      { slot: 6, role: 'Sol Bek', id: 'eg_ozruf', x: 16, y: 76 },
      { slot: 7, role: 'Sağ Bek', id: 'ege_bayir', x: 84, y: 76 }
    ]
  }
};
