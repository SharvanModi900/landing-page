"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Instagram } from "lucide-react";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

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
  { name: "AJit Singh", role: "", initials: "SM" },
   { name: "Sachine", role: "", initials: "SM" },
    { name: "Lalan Kumar", role: "", initials: "LK" },
  
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

        {/* ---- CONNECT WITH US ---- */}
        <section className="py-16 px-6 bg-white/[0.03]">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Connect With Us</h3>
            <p className="text-gray-400 mb-8">Follow us on social media for the latest updates, announcements, and community highlights.</p>
            <div className="flex justify-center gap-4">
              <a href="https://x.com/ShravanModi8" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-sky-400 transition" />
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition">X (Twitter)</span>
              </a>
              <a href="https://discord.gg/u6GqfJBsm" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
                <DiscordIcon className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition" />
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition">Discord</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition" />
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition">Instagram</span>
              </a>
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
