'use client';
import React from 'react';

export default function AcademicResearchersPage() {
  const features = [
    {
      title: "Access Verified Data",
      desc: "Researchers can leverage PoPP's verified problem reports for accurate studies.",
      icon: "📊",
    },
    {
      title: "Collaborative Studies",
      desc: "Work with civic organizations and legal professionals to enhance research quality.",
      icon: "🤝",
    },
    {
      title: "Publication Ready",
      desc: "Export findings and proofs in structured, auditable formats for journals.",
      icon: "📝",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Empower Academic Research
            </h1>
            <p className="text-gray-400 text-lg">
              PoPP provides researchers with reliable, validated problem data that can be leveraged
              for studies, analysis, and publications. Ensure your research is grounded in real-world proof.
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
              Explore Verified Data
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 border-4 border-cyan-500/30 rounded-full flex items-center justify-center text-5xl">
              📚
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white/[0.03] border-y border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
