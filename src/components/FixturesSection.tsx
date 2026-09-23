import { Calendar, AlertCircle } from 'lucide-react';

export function FixturesSection() {
  return (
    <section id="fikstur" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
      <div className="border-b border-gray-200 pb-4 mb-8 flex items-baseline justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">
            Fikstür &amp; Maç Sonuçları
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            2025/2026 Sezonu Resmi Karşılaşma Takvimi
          </p>
        </div>
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider hidden sm:block">
          Sezon Takvimi
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 sm:p-14 text-center">
        <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-5 text-navy">
          <Calendar size={32} strokeWidth={1.8} />
        </div>

        <h3 className="text-gray-900 font-bold text-xl sm:text-2xl mb-3">
          Henüz resmi veya hazırlık maçı oynanmadı.
        </h3>

        <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6">
          Fikstür henüz belli değil. Kulübümüzün yeni sezon halı saha turnuva ve hazırlık
          müsabaka takvimi kesinleştiğinde tüm maç programı resmi olarak bu sayfada ilan edilecektir.
        </p>

        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium px-4 py-2 rounded-md">
          <AlertCircle size={16} className="text-amber-700 shrink-0" />
          <span>Yeni sezon fikstür çekimi için kulüp yönetiminin duyurusu beklenmektedir.</span>
        </div>
      </div>
    </section>
  );
}
