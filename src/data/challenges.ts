import { Challenge } from '@/types';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    team: 'Canbalı City SK',
    captain: 'Melih Kaya',
    pitch: 'Karacabey Belediye Halı Sahası',
    date: '29 Eylül 2026',
    time: '21:00',
    stake: 'Baklavasına Halı Saha Maçı',
    message: 'Haftaya cuma için hazırız, Yeniköy United unvanını test edeceğiz!',
    status: 'Onay Bekliyor',
    timeAgo: '15 dk önce'
  },
  {
    id: 'ch_2',
    team: 'Gazi Mahallesi FK',
    captain: 'Burak Demir',
    pitch: 'Gölecik Arena',
    date: '2 Ekim 2026',
    time: '22:00',
    stake: 'Saha Parasını Kaybeden Öder',
    message: 'Kadromuzu kurduk, Karacabey derbisine davetlisiniz.',
    status: 'Görüşülüyor',
    timeAgo: '2 saat önce'
  }
];
