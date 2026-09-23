import { NEWS_ITEMS } from '@/data/news';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function categoryStyle(category: string): { bg: string; text: string; border: string } {
  switch (category) {
    case 'Kadro':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
      };
    case 'Forma':
      return {
        bg: 'bg-blue-50',
        text: 'text-navy',
        border: 'border-blue-200',
      };
    case 'Yönetim':
      return {
        bg: 'bg-red-50',
        text: 'text-red-800',
        border: 'border-red-200',
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-200',
      };
  }
}

export function NewsSection() {
  return (
    <section id="haberler" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
      <div className="border-b border-gray-200 pb-4 mb-8 flex items-baseline justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">
            Resmi Kulüp Haberleri
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Yönetim Kurulu ve Teknik Heyetten Resmi Açıklamalar
          </p>
        </div>
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider hidden sm:block">
          Duyurular &amp; Bülten
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {NEWS_ITEMS.map((item) => {
          const style = categoryStyle(item.category);
          return (
            <article
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between hover:border-gray-300 transition-colors"
            >
              <div>
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded border mb-3 ${style.bg} ${style.text} ${style.border}`}
                >
                  {item.category}
                </span>
                <h3 className="text-navy font-bold text-base mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.summary}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Yeniköy Medya</span>
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
