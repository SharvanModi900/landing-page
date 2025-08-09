"use client";

import React from "react";

export default function OriginMissionPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center">
      <section className="w-full flex flex-col items-center justify-center pt-24 pb-16 relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center z-10 drop-shadow-lg mb-4">Our Mission</h1>
        <p className="text-xl md:text-2xl text-gray-200 text-center z-10 max-w-2xl mb-6">Our core mission: to make every problem a verified proof and every voice count in building a better world.</p>
      </section>
      <section className="w-full max-w-3xl px-6 pb-24 z-10">
        <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 border border-gray-700/40">
          <h2 className="text-2xl font-bold text-white mb-4">The Mission of PoPP</h2>
          <p className="text-lg text-gray-300 mb-4">PoPP exists to empower individuals and communities to surface, validate, and solve real-world problems. Our mission is to create a decentralized, transparent, and accountable system for truth validation—where every problem is an opportunity for progress.</p>
        </div>
      </section>
    </main>
  );
} 