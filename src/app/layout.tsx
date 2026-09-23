import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yeniköy United FK | Resmi Web Sitesi',
  description:
    'Yeniköy United FK - Karacabey, Bursa. Est. 2025. Resmi kulüp web sitesi. Kadro, haberler, fikstür ve forma bilgileri.',
  keywords: [
    'Yeniköy United FK',
    'Karacabey',
    'Bursa',
    'Futbol Kulübü',
    'Halı Saha',
  ],
  authors: [{ name: 'Enes Kalan' }, { name: 'Yeniköy United FK' }],
  creator: 'Yeniköy United FK',
  openGraph: {
    title: 'Yeniköy United FK | Resmi Web Sitesi',
    description:
      'Karacabey, Bursa merkezli Yeniköy United FK resmi web sitesi.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Yeniköy United FK',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A1128',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-gray-bg text-gray-800 min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
