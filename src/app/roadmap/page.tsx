"use client";

import { motion } from "framer-motion";
import { Rocket, Sparkles, Shield, Globe, Layers, Users } from "lucide-react";

// --- Inline Futuristic Illustration (no external image needed) ---
function RoadmapHeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 480"
      className={className}
      role="img"
      aria-label="Futuristic roadmap illustration"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff7a18" stopOpacity="0.65" />
          <stop offset="45%" stopColor="#ff7a18" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff7a18" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="ring" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* soft glow */}
      <circle cx="300" cy="240" r="220" fill="url(#glow)" />

      {/* orbit rings */}
      <g opacity="0.55">
        <ellipse cx="300" cy="240" rx="210" ry="110" fill="none" stroke="url(#ring)" strokeWidth="1.5" />
        <ellipse cx="300" cy="240" rx="160" ry="80" fill="none" stroke="url(#ring)" strokeWidth="1.2" opacity="0.8" />
        <ellipse cx="300" cy="240" rx="110" ry="55" fill="none" stroke="url(#ring)" strokeWidth="1" opacity="0.6" />
      </g>

      {/* vertical roadmap line */}
      <path d="M300 40 L300 440" stroke="url(#line)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

      {/* milestones */}
      {[90, 170, 250, 330, 410].map((y, i) => (
        <g key={y}>
          <circle cx="300" cy={y} r="9" fill="#0b0e11" stroke="url(#line)" strokeWidth="3" />
          <circle cx={300 + (i % 2 ? 120 : -120)} cy={y} r="4" fill="#22d3ee" />
          <path
            d={`M300 ${y} L ${300 + (i % 2 ? 120 : -120)} ${y}`}
            stroke="url(#line)"
            strokeWidth="1.5"
            opacity="0.7"
          />
        </g>
      ))}

      {/* floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <circle
          key={i}
          cx={60 + (i * 500) % 520}
          cy={60 + ((i * 137) % 360)}
          r={Math.random() * 2 + 0.6}
          fill={i % 2 ? "#a78bfa" : "#22d3ee"}
          opacity="0.8"
        />
      ))}
    </svg>
  );
}

type Step = {
  quarter: string;
  title: string;
  description: string;
  icon: JSX.Element;
  tag: string;
};

const roadmap: Step[] = [
  {
    quarter: "Q1 2025",
    title: "Protocol Foundation",
    description:
      "PoPP core, decentralized submissions, and verifiable problem schema on testnet.",
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    tag: "Foundation",
  },
  {
    quarter: "Q2 2025",
    title: "Community Governance",
    description:
      "DAO voting, staking for validators, and transparent reward distribution.",
    icon: <Users className="w-6 h-6 text-cyan-400" />,
    tag: "Governance",
  },
  {
    quarter: "Q3 2025",
    title: "Trust & Security",
    description:
      "Fraud detection, identity attestations, and reputation-weighted validation.",
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    tag: "Security",
  },
  {
    quarter: "Q4 2025",
    title: "Global Expansion",
    description:
      "Regional pilots, NGO & gov partnerships, multilingual & multi-chain support.",
    icon: <Globe className="w-6 h-6 text-pink-400" />,
    tag: "Expansion",
  },
  {
    quarter: "2026+",
    title: "Intelligence Layer",
    description:
      "AI-assisted triage, predictive analytics, and autonomous validation agents.",
    icon: <Sparkles className="w-6 h-6 text-amber-300" />,
    tag: "Intelligence",
  },
];

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b0e11] via-[#10151c] to-[#14181d] text-white overflow-hidden">
      {/* HERO — split left/right */}
      <section className="relative px-6 lg:px-20 py-20 lg:py-28">
        {/* background accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
              <Rocket className="h-4 w-4 text-orange-400" />
              PoPP Roadmap
            </div>

            <h1 className="mt-4 text-4xl leading-[1.1] font-extrabold md:text-6xl bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
              Our Journey to a Verified Future
            </h1>

            <p className="mt-6 max-w-xl text-gray-300 text-lg">
              Step-by-step milestones as we evolve PoPP from a verifiable problem protocol
              into a global, community-governed infrastructure for truth and action.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#timeline"
                className="rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-5 py-3 font-semibold shadow-lg shadow-orange-500/25 hover:opacity-95 transition"
              >
                Explore Timeline
              </a>
              <a
                href="/whitepapers"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
              >
                Read Whitepaper
              </a>
            </div>
          </motion.div>

          {/* Right: illustration (inline SVG) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-8 -z-10 rounded-[32px] bg-gradient-to-tr from-orange-500/15 via-purple-500/10 to-cyan-400/15 blur-2xl" />
            <RoadmapHeroArt className="w-full max-w-[640px] drop-shadow-[0_0_40px_rgba(253,186,116,0.25)]" />
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="px-6 lg:px-20 pb-28">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-7xl text-center text-3xl md:text-4xl font-bold"
        >
          Milestones & Phases
        </motion.h2>

        <div className="relative mx-auto max-w-6xl">
          {/* glowing center line */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-orange-400 via-rose-400 to-transparent opacity-80" />

          <div className="space-y-24">
            {roadmap.map((step, index) => {
              const left = index % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: left ? -70 : 70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                  className={`relative flex items-center ${left ? "justify-start" : "justify-end"}`}
                >
                  {/* node dot */}
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className="h-6 w-6 rounded-full border-4 border-[#0b0e11] bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_16px_rgba(168,85,247,0.6)]" />
                  </div>

                  {/* card */}
                  <article
                    className={`w-full max-w-[44%] rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl hover:shadow-orange-500/30 transition ${
                      left ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <div className={`mb-3 flex items-center ${left ? "justify-end" : "justify-start"} gap-2`}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                        {step.icon}
                        {step.tag}
                      </span>
                      <span className="text-sm font-semibold text-orange-300">{step.quarter}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-gray-300">{step.description}</p>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 lg:px-20 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#14181d] via-[#121621] to-[#0f1319] p-10 md:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="relative z-10 grid items-center gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                Be part of the journey.
              </h3>
              <p className="mt-2 text-gray-300">
                Contribute to the protocol, validate problems, or integrate PoPP into your ecosystem.
              </p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <a
                href="/contribute"
                className="rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold shadow-lg shadow-orange-500/25 hover:opacity-95 transition"
              >
                Contribute
              </a>
              <a
                href="/docs"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                Read Docs
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
