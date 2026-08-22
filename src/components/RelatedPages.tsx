import Link from "next/link";

interface RelatedPage {
  label: string;
  href: string;
  description?: string;
}

export default function RelatedPages({ pages }: { pages: RelatedPage[] }) {
  return (
    <section className="py-12 px-4 sm:px-6 bg-white/[0.02] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-lg font-bold text-white mb-6">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all"
            >
              <div className="text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 mb-1">
                {page.label}
              </div>
              {page.description && (
                <div className="text-xs text-gray-500 leading-relaxed">
                  {page.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
