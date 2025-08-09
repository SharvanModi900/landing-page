"use client";

import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Protocol Design",
    description: "Core architecture, consensus, and cryptography.",
    icon: "🔗",
  },
  {
    name: "Governance",
    description: "Decision-making, upgrades, and community roles.",
    icon: "🏛️",
  },
  {
    name: "Use Cases",
    description: "Applications, integrations, and real-world impact.",
    icon: "🚀",
  },
  {
    name: "Security",
    description: "Threat models, audits, and resilience.",
    icon: "🛡️",
  },
  {
    name: "Economics",
    description: "Tokenomics, incentives, and sustainability.",
    icon: "💸",
  },
];

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const WhitepaperPage: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center">
      {/* Hero Section - VIBE FOCUSED */}
      <section className="w-full flex flex-col items-center justify-center pt-32 pb-24 relative overflow-hidden min-h-[520px]">
        {/* Layered gradients and floating glassy shapes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/30 via-fuchsia-400/20 to-yellow-300/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-0 w-[320px] h-[320px] bg-gradient-to-br from-fuchsia-400/30 to-indigo-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-0 left-1/4 w-[180px] h-[180px] bg-gradient-to-br from-yellow-300/30 to-fuchsia-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.5s' }} />
        </div>
        {/* Glassy floating cards */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex gap-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 0.18, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="w-64 h-40 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 rotate-[-8deg]" />
          <div className="w-64 h-40 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 rotate-[8deg]" />
        </motion.div>
        {/* Main headline and subheadline */}
        <motion.div
          className="relative z-20 flex flex-col items-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white text-center drop-shadow-2xl tracking-tight leading-tight mb-6">
            The PoPP Whitepaper
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 text-center max-w-3xl mb-8 font-medium drop-shadow-lg">
            A new protocol for decentralized truth. <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-yellow-300 bg-clip-text text-transparent font-bold">Dive deep into the architecture, vision, and future of PoPP.</span>
          </p>
        </motion.div>
      </section>
      {/* Categories Section */}
      <section className="w-full max-w-5xl flex flex-wrap justify-center gap-8 px-4 pb-24 z-10">
        {categories.map((cat, i) => (
          <div
            key={cat.name}
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/40 rounded-2xl shadow-xl w-64 h-56 flex flex-col items-center justify-center p-6 transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
            style={{ zIndex: 2 + i }}
          >
            <span className="text-4xl mb-3 drop-shadow-lg">{cat.icon}</span>
            <h2 className="text-2xl font-bold text-white mb-2 text-center drop-shadow-sm">
              {cat.name}
            </h2>
            <p className="text-base text-gray-300 text-center mb-2">
              {cat.description}
            </p>
            {/* Decorative floating effect */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-indigo-400/10 blur-2xl group-hover:opacity-60 opacity-30 transition-opacity" />
            <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-yellow-400/10 blur-2xl group-hover:opacity-60 opacity-30 transition-opacity" />
          </div>
        ))}
      </section>
    </main>
  );
};

export default WhitepaperPage; 