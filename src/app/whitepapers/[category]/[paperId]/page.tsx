import { whitepapers } from "@/data/whitepapers";
import { Sparkles } from "lucide-react";

export async function generateStaticParams() {
  return Object.entries(whitepapers).flatMap(([category, data]) =>
    data.papers.map((paper: any) => ({
      category,
      paperId: paper.id,
    }))
  );
}

export default async function WhitepaperPage({
  params,
}: {
  params: { category: string; paperId: string };
}) {
  const categoryData = whitepapers[params.category];
  if (!categoryData) {
    return <div className="p-10 text-center text-gray-400">Category not found.</div>;
  }

  const wp = categoryData.papers.find((p: any) => p.id === params.paperId);
  if (!wp) {
    return <div className="p-10 text-center text-gray-400">Whitepaper not found.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b0e11] via-[#14181d] to-[#0b0e11] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen flex items-center px-10">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/10 to-transparent blur-3xl" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-10 max-w-8xl mx-auto p-20">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-300 to-pink-400">
              {wp.title}
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Authored by <span className="text-white">{wp.author}</span> —{" "}
              <span className="text-gray-400">{wp.version}</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-400">
              <span>📅 {wp.date}</span>
              <span>✉️ {wp.contact}</span>
            </div>
            <div className="mt-8 inline-flex items-center px-6 py-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 backdrop-blur-sm hover:bg-purple-600/30 transition">
              <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-200">Premium Whitepaper</span>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center items-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-blue-400 opacity-30 blur-3xl animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/50 animate-spin-slow" />
              <div className="absolute inset-10 rounded-full border-2 border-blue-400/40 animate-spin-slower" />
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <Sparkles className="w-24 h-24 text-purple-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections (Full width but nicely padded) */}
      <section className="w-full px-10 py-28 space-y-16">
        {wp.sections.map((section: any) => (
          <div
            key={section.id}
           
          >
            <h2 className="text-3xl font-semibold mb-5 text-purple-300">
              {section.heading}
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {section.content}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
