export interface Player {
  id: string;
  name: string;
  fullName?: string;
  number: number;
  position: string;
  role: 'starter' | 'substitute' | 'staff';
  substituteFor?: string;
  badge?: string;
  hasHeartIcon?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Yönetim' | 'Kadro' | 'Forma' | 'Genel';
}
