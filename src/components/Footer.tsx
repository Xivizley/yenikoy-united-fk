import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-navy text-white mt-12 border-t-2 border-gold/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          {/* Club info & Badge */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Yeniköy United FK Arması"
              width={44}
              height={44}
              className="rounded-full shrink-0 drop-shadow"
            />
            <div>
              <p className="font-bold text-lg leading-tight">Yeniköy United FK</p>
              <p className="text-gray-400 text-xs">Karacabey, Bursa</p>
            </div>
          </div>

          {/* Established */}
          <div>
            <p className="text-gold font-semibold text-sm">Est. 2025</p>
            <p className="text-gray-400 text-xs">Mahalle Futbol Kulübü</p>
          </div>

          {/* Founder */}
          <div>
            <p className="text-gray-400 text-sm">
              Kurucu:{' '}
              <span className="text-white font-medium">Enes Kalan</span>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-xs">
            © 2025 Yeniköy United FK. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
