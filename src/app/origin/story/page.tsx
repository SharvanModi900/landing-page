"use client";

import React from "react";

export default function OriginStoryPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center">
      <section className="w-full flex flex-col items-center justify-center pt-24 pb-16 relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center z-10 drop-shadow-lg mb-4">Our Story</h1>
        <p className="text-xl md:text-2xl text-gray-200 text-center z-10 max-w-2xl mb-6">How PoPP began: from a simple frustration to a global protocol for truth validation.</p>
      </section>
      <section className="w-full max-w-3xl px-6 pb-24 z-10">
        <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 border border-gray-700/40">
          <h2 className="text-2xl font-bold text-white mb-4">The Origin of PoPP</h2>
          <p className="text-lg text-gray-300 mb-4">Every great invention begins with a simple inconvenience. PoPP was born from frustration with ignored complaints and the realization that complaints are not just noise—they are data points of broken systems.</p>
          <p className="text-lg text-gray-300 mb-4">Our founders saw that problems, when validated and elevated, could become the foundation for real change. PoPP is the protocol that transforms complaints into civilization's building blocks.</p>
        </div>
      </section>
    </main>
  );
} 