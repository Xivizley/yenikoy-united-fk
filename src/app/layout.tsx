import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans, Bebas_Neue } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yeniköy United FK - Karacabey | Resmi Kulüp Portalı',
  description:
    'Yeniköy United FK - Karacabey (Est. 2025). Mahalle futbol kulübü resmi web sitesi, interaktif 2D halı saha taktik tahtası, kadro, fikstür, MVP oylaması ve meydan okuma modülü.',
  keywords: [
    'Yeniköy United FK',
    'Karacabey Halı Saha',
    'Yeniköy Futbol',
    'Bursa Halı Saha Ligi',
    'Enes Kaplan',
    'Halı Saha Taktik Tahtası',
    'Meydan Okuma',
  ],
  authors: [{ name: 'Enes Kaplan' }, { name: 'Yeniköy United FK' }],
  creator: 'Yeniköy United FK',
  openGraph: {
    title: 'Yeniköy United FK - Karacabey | Resmi Kulüp Portalı',
    description:
      'Mahalle ruhunu ve şampiyonluk karakterini halı sahalarda temsil eden Yeniköy United FK resmi web portalı.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Yeniköy United FK',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#071326',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} ${bebasNeue.variable} font-sans bg-club-navy-deep text-slate-100 min-h-screen selection:bg-club-gold selection:text-club-navy-deep antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
