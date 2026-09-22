# 🏆 Yeniköy United FK - Resmi Kulüp Portalı (Next.js & Vercel Ready)
**Karacabey, Bursa • Est. 2025**

Mahalle ruhunu, taktiksel disiplini ve şampiyonluk karakterini halı sahalarda temsil eden **Yeniköy United FK** için geliştirilmiş, **Next.js (App Router, TypeScript, Tailwind CSS)** mimarisine sahip, **Vercel** dağıtımına tam uyumlu modern web uygulaması.

---

## 🚀 1. Hızlı Başlangıç & Yerel Geliştirme

```bash
# Bağımlılıkları yükleyin
npm install

# Yerel geliştirme sunucusunu başlatın
npm run dev
# Tarayıcınızda açın: http://localhost:3000

# Üretim (Production) derlemesi
npm run build

# Üretim sunucusunu başlatın
npm run start
```

---

## ☁️ 2. Vercel'e Dağıtım (Deployment) Kılavuzu

Proje Vercel için sıfır yapılandırma (`zero-config`) ile optimize edilmiştir.

### Yöntem A: GitHub ile Otomatik Dağıtım (Önerilen)
1. Projeyi GitHub reponuza push edin:
   ```bash
   git add .
   git commit -m "feat: Yeniköy United FK Next.js production ready"
   git branch -M main
   git remote add origin https://github.com/<kullanici-adiniz>/yenikoy-united-fk.git
   git push -u origin main
   ```
2. [Vercel Dashboard](https://vercel.com/new)'a gidin.
3. Reponuzu seçin ve **"Deploy"** butonuna tıklayın.
4. Vercel Next.js App Router yapısını otomatik algılar ve saniyeler içinde SSL sertifikalı canlı URL'inizi yayına alır.

### Yöntem B: Vercel CLI ile Doğrudan Terminalden
```bash
# Vercel CLI'ı çalıştırın
npx vercel

# Üretime (Production) canlı dağıtmak için:
npx vercel --prod
```

---

## 📁 3. Proje Mimarisi

```text
yenikoy-united-fk/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── challenges/route.ts   # Meydan okuma API uç noktası (GET, POST)
│   │   │   └── mvp/route.ts          # Haftanın MVP'si canlı oylama API'si
│   │   ├── favicon.ico
│   │   ├── globals.css               # Tailwind CSS v4 tema & glassmorphism
│   │   ├── layout.tsx                # Google Fonts (Outfit, Plus Jakarta Sans, Bebas Neue) & SEO Metadata
│   │   └── page.tsx                  # Ana portal sayfası (Client & Server entegrasyonu)
│   ├── components/
│   │   ├── ClubCrest.tsx             # Resmi Vektörel SVG Kulüp Arması
│   │   ├── Navbar.tsx                # Glassmorphic yapışkan üst menü & mobil çekmece
│   │   ├── HeroSection.tsx           # Canlı rozetler, kulüp istatistikleri ve maç randevusu
│   │   ├── TacticalPitch/
│   │   │   ├── TacticalPitch.tsx     # 2D Halı saha tahtası, sürükle-bırak & taktik motoru
│   │   │   ├── PlayerToken.tsx       # Oyuncu forma pulu (Touch, Mouse, Long-Press haptic)
│   │   │   ├── TacticalPopover.tsx   # Saha üzeri doğrudan mevki yedekleri pop-up'ı
│   │   │   └── SubstitutesPanel.tsx  # Yan panel oyuncu özellikleri (FIFA/FM radarı) & kurallar
│   │   ├── SquadSection.tsx          # 26 kişilik resmi kadro, arama motoru & kategori filtreleri
│   │   ├── FixturesSection.tsx       # Tamamlanan maçlar (skor, gol atanlar, MVP) & gelecek fikstür
│   │   ├── MvpVotingSection.tsx      # Anlık yüzdeli taraftar oylaması, localStorage & konfeti
│   │   ├── ChallengesSection.tsx     # Karacabey meydan okuma akışı & başvuru daveti
│   │   ├── ChallengeModal.tsx        # Detaylı maç teklifi gönderme modalı & validasyon
│   │   ├── SubstitutesModal.tsx      # Genişletilmiş mevki değişiklik modalı
│   │   ├── ToastContainer.tsx        # Bildirim toast sistemi
│   │   └── Footer.tsx                # Kulüp kurucusu Enes Kaplan, mahalle bilgisi & telif
│   ├── data/
│   │   ├── players.ts                # Resmi el yazısı notlara tam uyumlu oyuncu veritabanı
│   │   ├── formations.ts             # 6 farklı 8v8 halı saha dizilimi (3-2-2, 2-4-1, 3-3-1 vb.)
│   │   ├── fixtures.ts               # Oynanan lig maçları ve yaklaşan randevular
│   │   ├── challenges.ts             # Gelen meydan okumalar akışı
│   │   └── mvpCandidates.ts          # Haftanın oyuncusu aday listesi ve canlı oylar
│   └── types/
│       └── index.ts                  # TypeScript arayüz ve tip tanımları
├── test_nextjs_cdp.js                # 17 adımlı tam kapsamlı Headless Chrome CDP & API test paketi
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## ⚽ 4. Kadro & Saha Taktik Kuralları (Resmi Notlara Tam Uyum)

- **Joker / Süper Yedek:** `Efe Can (Kiralık)` — ⭐ Altın ışıltılı rozet ve tek tıkla hücum joker takası.
- **Gelecek Sezon Transferi:** `Egemen Gıryıke` — 🚀 Transfer rozeti.
- **Admin / Kurucu:** `Enes Kaplan (Admin)` — 👑 Kaptan & Kurucu rozeti.
- **Takımın Kalbi:** `Ramazan Işık` — ❤️ Kalp ikonlu Sol Bek yedeği.
- **Mevki Yedek Eşleşmeleri:**
  - *Yusuf Kağan:* Emir Özruf, Eymen Efe
  - *E.G. Özruf:* Çınar Güzeroğlu, Kadir Hetel, Ramazan Işık ❤️
  - *Oğuzhan T.:* Poyraz Ak., Çağan T.
  - *G. Çalık:* Berat Çalık
  - *Ege Bayır:* Doruk Akşat
- **Akıllı Formasyon Geçişi:** Oyuncu değişikliği yapılmış olsa dahi, formasyon değiştirildiğinde yeni giren oyuncu kendi taktik slot koordinatlarına pürüzsüz animasyonla taşınır.

---

## 🧪 5. Otomatik Testleri Çalıştırma

Projede hem API hem de headless Chrome üzerinde gerçek tarayıcı ortamında koşan 17 testlik bir doğrulama paketi mevcuttur:

```bash
# 1. Önce projeyi derleyin
npm run build

# 2. Testleri çalıştırın
node test_nextjs_cdp.js
```
