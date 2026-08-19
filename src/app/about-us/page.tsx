"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const coreValues = [
  { title: "Transparency", desc: "Open and auditable records for every problem and proof" },
  { title: "Decentralization", desc: "No single point of control — community-governed" },
  { title: "Collaboration", desc: "Communities solve problems together with verifiable data" },
  { title: "Security", desc: "Cryptographic data integrity by design" },
];

const teamMembers = [
  { name: "Sharvan Modi", role: "R & D Reseacher", initials: "SM" },
  
];



/* ================================================================== */
/*  PAGE                                                              */
/* ================================================================== */
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* ---- HERO ---- */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#030712] via-[#050a15] to-[#030712]">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Empowering Problem Solvers{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Worldwide
                </span>
              </h1>
              <p className="mt-6 text-gray-300 max-w-2xl leading-relaxed text-lg">
                PoPP — the Proof-of-Problem Protocol — is a decentralized framework that verifies, validates, and
                escalates real-world problems with transparency and traceability. We connect communities, validators
                and partners to direct resources to what truly matters.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/mission"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                >
                  Learn Our Mission
                </Link>
                <Link
                  href="/whitepapers"
                  className="px-6 py-3 rounded-lg bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] font-semibold text-gray-200 transition-colors"
                >
                  Explore Whitepaper
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Testnet Live
                </div>
                <div>Active Validators: <strong className="text-white ml-1">—</strong></div>
                <div>Verified Today: <strong className="text-white ml-1">—</strong></div>
              </div>
            </div>

            {/* Globe visual */}
            <div className="w-full max-w-md flex-1">
              <div className="relative w-full aspect-square rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6">
                <svg viewBox="0 0 240 240" className="w-full h-full">
                  <defs>
                    <linearGradient id="globe-grad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(120,120)">
                    <circle r="68" fill="none" stroke="url(#globe-grad)" strokeWidth="1.6" opacity="0.9" />
                    <g stroke="#06b6d4" strokeWidth="1.2" opacity="0.7">
                      <path d="M-68 0a68 68 0 0 0 136 0" strokeLinecap="round" />
                      <path d="M0-68a68 68 0 0 1 0 136" strokeLinecap="round" transform="rotate(30)" />
                    </g>
                    <circle cx="-20" cy="-50" r="3" fill="#06b6d4" />
                    <circle cx="40" cy="-10" r="3" fill="#3b82f6" />
                    <circle cx="10" cy="50" r="3" fill="#06b6d4" />
                    <circle cx="-42" cy="18" r="3" fill="#3b82f6" />
                    <line x1="-20" y1="-50" x2="40" y2="-10" stroke="#06b6d4" strokeOpacity="0.4" strokeWidth="0.8" />
                    <line x1="40" y1="-10" x2="10" y2="50" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="0.8" />
                    <line x1="-42" y1="18" x2="-20" y2="-50" stroke="#06b6d4" strokeOpacity="0.25" strokeWidth="0.8" />
                  </g>
                </svg>
                <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                  Network: 0.9s latency &bull; PoPP Testnet
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- MISSION, VISION & STORY LINKS ---- */}
        <section className="py-16 px-6 bg-white/[0.03]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Our Mission", desc: "A world where problems cannot be silenced — cryptographically verified and transparently validated.", link: "/mission", label: "Read Mission" },
              { title: "Our Vision", desc: "Shaping a transparent & decentralized future through collective intelligence.", link: "/vision", label: "Explore Vision" },
              { title: "Our Story", desc: "From a broken internet line to a global protocol — the origin of PoPP.", link: "/our-story", label: "Read Story" },
            ].map((item) => (
              <Link key={item.title} href={item.link}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 hover:border-white/[0.13] transition-colors group">
                <h3 className="text-lg font-bold text-cyan-400">{item.title}</h3>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-400 font-medium group-hover:gap-2 transition-all">
                  {item.label} →
                </span>
              </Link>
            ))}
          </div>
        </section>



        {/* ---- CORE VALUES ---- */}
        <section className="py-16 px-6 bg-white/[0.03]">
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
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.13] transition-colors"
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
        <section className="py-16 px-6 bg-white/[0.02]">
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
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.13] transition-colors"
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
        <section className="py-16 px-6 bg-white/[0.03]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Join the Mission</h3>
                <p className="text-gray-300 mt-2">
                  Help us verify and solve the problems that matter. Become a validator or contribute to the ecosystem.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/validators"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                >
                  Become a Validator
                </Link>
                <Link
                  href="/whitepapers"
                  className="px-6 py-3 rounded-lg bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] font-semibold text-gray-200 transition-colors"
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
