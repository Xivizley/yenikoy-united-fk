# ⚽ Yeniköy United FK — Resmi Kulüp Web Sitesi
**Karacabey, Bursa • Est. 2025**

Yeniköy United FK için geliştirilmiş; Real Madrid, Fenerbahçe veya Arsenal gibi köklü kulüplerin resmi web portalları ciddiyetinde, düz renklerin (solid), keskin hatların ve resmi tipografinin kullanıldığı kurumsal web sitesi.

---

## 🛠️ Teknoloji Yığını

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Kütüphanesi:** [React 19](https://react.dev/)
- **Dil:** [TypeScript 5](https://www.typescriptlang.org/)
- **Stil:** [Tailwind CSS v4](https://tailwindcss.com/)
- **İkonlar:** [Lucide React](https://lucide.dev/)
- **Dağıtım:** [Vercel](https://vercel.com/)

---

## 🚀 Başlangıç & Yerel Geliştirme

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
# Tarayıcınızda açın: http://localhost:3000

# Kod kalitesi kontrolü (Lint)
npm run lint

# Üretim (Production) derlemesi
npm run build

# Üretim sunucusunu çalıştırın
npm run start
```

---

## 📁 Proje Mimarisi

```text
src/
├── app/
│   ├── globals.css         # Tailwind CSS v4, Inter font, kurumsal palet & saha çizgileri
│   ├── layout.tsx          # Root layout, Inter font, SEO & OpenGraph metadataları
│   └── page.tsx            # Ana sayfa modüler kompozisyonu
├── components/
│   ├── Navbar.tsx          # Yapışkan kurumsal menü & SVG kulüp arması
│   ├── HeroSection.tsx     # Kurumsal banner, istatistikler ve yönlendirmeler
│   ├── NewsSection.tsx     # Resmi kulüp bülteni & haber kartları
│   ├── SquadPitch.tsx      # Statik 2D halı saha taktik çizimi (İlk 8)
│   ├── SquadList.tsx       # İlk 8, yedekler hiyerarşisi tablosu & yönetim notları
│   ├── KitsSection.tsx     # SVG forma çizimleri & renk kombinasyonları
│   ├── FixturesSection.tsx # Resmi maç takvimi ve bilgilendirme
│   └── Footer.tsx          # Kurumsal footer
├── data/
│   ├── news.ts             # Kulüp duyuru verileri
│   └── players.ts          # 19 kişilik resmi kadro, hiyerarşi ve özel rozetler
└── types/
    └── index.ts            # Player ve NewsItem TypeScript tipleri
```

---

## 🎨 Renk Paleti

| Kullanım Alanı | Renk Kodu | Renk Adı |
|---|---|---|
| Ana Zemin & Header | `#0A1128` | Gece Laciverti (Kurumsal) |
| Vurgu & Arma | `#D4AF37` | Şampiyonluk Altın Sarısı |
| İkincil Başlıklar | `#1C3F60` | Okyanus Mavisi |
| Sayfa Zemin | `#F3F4F6` | Temiz Açık Gri |
| Kartlar & Tablolar | `#FFFFFF` | Saf Beyaz (Bordürlü) |
| Halı Saha Çizimi | `#2D8B4E` | Saha Yeşili |

---

## 📄 Lisans & Telif Hakkı

© 2025 **Yeniköy United FK** — Kurucu: **Enes Kalan**. Tüm hakları saklıdır.
