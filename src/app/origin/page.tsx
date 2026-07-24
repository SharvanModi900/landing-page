"use client";

import React from "react";
import Link from "next/link";

const sections = [
  { name: "Our Story", desc: "How PoPP began", icon: "📖", href: "/origin/story" },
  { name: "Mission", desc: "Our core mission", icon: "💡", href: "/origin/mission" },
  { name: "Team", desc: "Meet the team", icon: "👥", href: "/origin/team" },
];

export default function OriginPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Origin</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover the roots, mission, and people behind PoPP.
          </p>
        </section>

        {/* Sections */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
            {sections.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="bg-white/5 border border-white/10 rounded-xl w-64 h-48 flex flex-col items-center justify-center p-6 hover:bg-white/[0.07] transition-colors"
              >
                <span className="text-4xl mb-3">{s.icon}</span>
                <h2 className="text-xl font-bold text-white mb-2">{s.name}</h2>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
