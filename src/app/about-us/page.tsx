"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const timelineMilestones = [
  { year: "2024", title: "Whitepaper Released" },
  { year: "2025 Q1", title: "Testnet Launched" },
  { year: "2025 Q3", title: "Validator Program" },
  { year: "2026", title: "Mainnet Pilot" },
  { year: "Future", title: "Global Adoption" },
];

const coreValues = [
  { title: "Transparency", desc: "Open and auditable records for every problem and proof" },
  { title: "Decentralization", desc: "No single point of control  community-governed" },
  { title: "Collaboration", desc: "Communities solve problems together with verifiable data" },
  { title: "Security", desc: "Cryptographic data integrity by design" },
  { title: "Impact", desc: "Focus on real outcomes and accountability" },
  { title: "Innovation", desc: "Continuous improvement through open protocol design" },
];

const teamMembers = [
  { name: "Sharvan Modi", role: "Founder & CEO", initials: "SM" },
  { name: "Asha Rao", role: "Head of Research", initials: "AR" },
  { name: "Liam Chen", role: "Protocol Lead", initials: "LC" },
  { name: "Maya Singh", role: "Community Manager", initials: "MS" },
];

const missionPoints = [
  "Decentralized verification",
  "Transparent records",
  "Community governance",
  "Incentivized validators",
];

const visionPillars = ["Accessibility", "Scalability", "Integrity"];

/* ================================================================== */
/*  PAGE                                                              */
/* ================================================================== */
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* ---- HERO ---- */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Empowering Problem Solvers{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Worldwide
                </span>
              </h1>
              <p className="mt-6 text-gray-400 max-w-2xl leading-relaxed text-lg">
                PoPP the Proof-of-Problem Protocol  is a decentralized framework that verifies, validates, and
                escalates real-world problems with transparency and traceability. We connect communities, validators
                and partners to direct resources to what truly matters.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/mission"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                  Learn Our Mission
                </Link>
                <Link
                  href="/whitepapers"
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 font-semibold text-gray-300 transition-colors"
                >
                  Explore Whitepaper
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Live Network
                </div>
                <div>Active Validators: <strong className="text-white ml-1">3,217</strong></div>
                <div>Verified Today: <strong className="text-white ml-1">327</strong></div>
              </div>
            </div>

            {/* Globe visual */}
            <div className="w-full max-w-md flex-1">
              <div className="relative w-full aspect-square rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
                <svg viewBox="0 0 240 240" className="w-full h-full">
                  <defs>
                    <linearGradient id="globe-grad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(120,120)">
                    <circle r="68" fill="none" stroke="url(#globe-grad)" strokeWidth="1.6" opacity="0.9" />
                    <g stroke="#22d3ee" strokeWidth="1.2" opacity="0.7">
                      <path d="M-68 0a68 68 0 0 0 136 0" strokeLinecap="round" />
                      <path d="M0-68a68 68 0 0 1 0 136" strokeLinecap="round" transform="rotate(30)" />
                    </g>
                    <circle cx="-20" cy="-50" r="3" fill="#22d3ee" />
                    <circle cx="40" cy="-10" r="3" fill="#3b82f6" />
                    <circle cx="10" cy="50" r="3" fill="#22d3ee" />
                    <circle cx="-42" cy="18" r="3" fill="#3b82f6" />
                    <line x1="-20" y1="-50" x2="40" y2="-10" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="0.8" />
                    <line x1="40" y1="-10" x2="10" y2="50" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="0.8" />
                    <line x1="-42" y1="18" x2="-20" y2="-50" stroke="#22d3ee" strokeOpacity="0.25" strokeWidth="0.8" />
                  </g>
                </svg>
                <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                  Network: 0.9s latency &bull; PoPP Testnet
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- MISSION & VISION ---- */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-cyan-400">Our Mission</h3>
              <p className="mt-4 text-gray-400 leading-relaxed">
                To empower communities, organizations, and innovators with a transparent and decentralized way to
                verify problems — ensuring that attention and resources are directed where they truly matter.
              </p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
                {missionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-cyan-400 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-blue-400">Our Vision</h3>
              <p className="mt-4 text-gray-400 leading-relaxed">
                A world where decision-makers, communities and organizations rely on verified facts before deploying
                solutions — reducing waste, improving outcomes and building trust.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {visionPillars.map((pillar) => (
                  <div
                    key={pillar}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"
                  >
                    {pillar}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---- TIMELINE ---- */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8">The PoPP Journey</h3>
            <div className="relative overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-[900px]">
                {timelineMilestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="min-w-[200px] p-5 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="text-sm font-semibold text-cyan-400">{m.year}</div>
                    <div className="text-white font-bold mt-2">{m.title}</div>
                    <div className="mt-3 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      {i + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- CORE VALUES ---- */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8">Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {coreValues.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {v.title[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{v.title}</div>
                      <div className="text-sm text-gray-400 mt-1">{v.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- TEAM ---- */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8">Meet the Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {teamMembers.map((p) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {p.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{p.name}</div>
                      <div className="text-sm text-gray-400">{p.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Join the Mission</h3>
                <p className="text-gray-400 mt-2">
                  Help us verify and solve the problems that matter. Become a validator or contribute to the ecosystem.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/validators"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                  Become a Validator
                </Link>
                <Link
                  href="/whitepapers"
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 font-semibold text-gray-300 transition-colors"
                >
                  Read Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
