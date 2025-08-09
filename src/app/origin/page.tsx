"use client";

import React from "react";

const sections = [
  { name: "Our Story", desc: "How PoPP began", icon: "📖", anchor: "story" },
  { name: "Mission", desc: "Our core mission", icon: "💡", anchor: "mission" },
  { name: "Team", desc: "Meet the team", icon: "👥", anchor: "team" },
];

export default function OriginPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center">
      {/* Hero */}
      <section className="w-full flex flex-col items-center justify-center pt-24 pb-16 relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center z-10 drop-shadow-lg mb-4">Origin</h1>
        <p className="text-xl md:text-2xl text-gray-200 text-center z-10 max-w-2xl mb-6">Discover the roots, mission, and people behind PoPP.</p>
      </section>
      {/* Sections */}
      <section className="w-full max-w-4xl flex flex-wrap justify-center gap-8 px-4 pb-24 z-10">
        {sections.map((s) => (
          <a key={s.name} href={`#${s.anchor}`} className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/40 rounded-2xl shadow-xl w-64 h-48 flex flex-col items-center justify-center p-6 transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden">
            <span className="text-4xl mb-3 drop-shadow-lg">{s.icon}</span>
            <h2 className="text-2xl font-bold text-white mb-2 text-center drop-shadow-sm">{s.name}</h2>
            <p className="text-base text-gray-300 text-center mb-2">{s.desc}</p>
          </a>
        ))}
      </section>
    </main>
  );
} 