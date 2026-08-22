// app/policy-governance/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Section = { id: string; title: string; summary: string; details: string[] };

const SECTIONS: Section[] = [
  {
    id: "principles",
    title: "Governance Principles",
    summary:
      "Transparency, security-first, inclusivity, and accountability guide every decision in PoPP.",
    details: [
      "Transparency First — all votes and changes are recorded on-chain.",
      "Security by Design — rules prevent manipulation and capture.",
      "Inclusivity — every stakeholder may propose and comment.",
      "Accountability — actions traceable to on-chain reputation.",
    ],
  },
  {
    id: "structure",
    title: "Governance Structure",
    summary: "Problem Council, DAO Assembly, and optional Advisory Board.",
    details: [
      "Problem Council — elected small-team for urgent decisions.",
      "DAO Assembly — main decision body of token/reputation holders.",
      "Advisory Board — experts giving non-binding recommendations.",
    ],
  },
  {
    id: "domains",
    title: "Policy Domains",
    summary: "Submission, validation, incentives, privacy & more.",
    details: [
      "Problem Submission Policy — format, stake, evidence requirements.",
      "Validation & Escalation — checklists, escalation rules, slashing.",
      "Rewards & Penalties — proportional rewards, reputation scoring.",
      "Privacy & Data Handling — metadata on-chain, sensitive data off-chain.",
    ],
  },
  {
    id: "process",
    title: "Decision Process",
    summary: "Proposal → Discussion → Voting → Execution via smart contracts.",
    details: [
      "Open proposal creation by eligible members.",
      "Community discussion period with minimum feedback time.",
      "Voting: token/reputation/hybrid weighted models.",
      "Automated execution where applicable; off-chain ops when needed.",
    ],
  },
  {
    id: "dispute",
    title: "Dispute Resolution",
    summary: "On-chain arbitration with neutral validators and permanent logging.",
    details: [
      "Tiered dispute flow: automated → community vote → council arbitration.",
      "Neutral validators may be appointed for tie-breaks.",
      "All rulings logged and stored immutably.",
    ],
  },
  {
    id: "upgrade",
    title: "Upgrade Management",
    summary: "Audits + DAO votes for upgrades; emergency paths via council.",
    details: [
      "Proposal → technical audit → DAO vote → deployment.",
      "Emergency upgrades allowed with problem-council supermajority.",
      "Post-deploy audits and monitoring required.",
    ],
  },
  {
    id: "enforcement",
    title: "Enforcement & Compliance",
    summary: "Smart contracts enforce rules; audits and blacklists maintain integrity.",
    details: [
      "Code-level enforcement: slashing and automated checks.",
      "Public blacklist for repeat offenders.",
      "Quarterly audits by governance-appointed teams.",
    ],
  },
];

export default function PolicyGovernancePage() {
  const [activeId, setActiveId] = useState<string | null>(SECTIONS[0].id);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggleExpand(id: string) {
    setExpanded((s) => ({ ...s, [id]: !s[id] }));
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white mt-[70px] overflow-x-hidden">
      {/* HERO */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF7E3A] via-[#FFD49A] to-[#8EDFFF]">
            Policy & Governance
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl">
            PoPP’s governance model ensures decisions are secure, transparent,
            and community-driven. Explore the structure, policies, and how you
            can participate.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#principles"
              onClick={() => setActiveId("principles")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/6 hover:bg-white/6 transition"
            >
              📜 Overview
            </a>
            <a
              href="#submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF7E3A] to-[#FF9A4F] text-black font-semibold shadow"
            >
              Submit a Proposal
            </a>
            <a
              href="#diagram"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/20 hover:bg-white/3 transition"
            >
              Governance Diagram
            </a>
          </div>
        </div>

        {/* Governance diagram preview */}
        <div className="w-full lg:w-1/3">
          <div className="relative rounded-2xl p-4 bg-white/3 border border-white/8 shadow-xl">
            <svg viewBox="0 0 360 220" className="w-full h-auto">
              {/* simple node graph */}
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#FF7E3A" />
                  <stop offset="100%" stopColor="#00E5FF" />
                </linearGradient>
              </defs>

              {/* core */}
              <g transform="translate(180,110)">
                <circle r="28" fill="url(#g)" opacity="0.95" />
                <text x="0" y="5" textAnchor="middle" className="text-black font-bold" style={{ fontSize: 12, fontWeight: 700 }}>
                  CORE
                </text>

                {/* branches */}
                <line x1="-80" y1="-40" x2="-28" y2="-10" stroke="#7FFFD4" strokeWidth="1.4" />
                <line x1="80" y1="-40" x2="28" y2="-10" stroke="#FF9A4F" strokeWidth="1.4" />
                <line x1="-80" y1="60" x2="-28" y2="20" stroke="#8EDFFF" strokeWidth="1.4" />
                <line x1="80" y1="60" x2="28" y2="20" stroke="#FFD49A" strokeWidth="1.4" />

                <circle cx="-86" cy="-46" r="12" fill="#0ef" />
                <text x="-86" y="-42" textAnchor="middle" style={{ fontSize: 8 }}>Council</text>

                <circle cx="86" cy="-46" r="12" fill="#ff7e3a" />
                <text x="86" y="-42" textAnchor="middle" style={{ fontSize: 8 }}>DAO</text>

                <circle cx="-86" cy="66" r="12" fill="#8edfff" />
                <text x="-86" y="70" textAnchor="middle" style={{ fontSize: 8 }}>Advisory</text>

                <circle cx="86" cy="66" r="12" fill="#ffd49a" />
                <text x="86" y="70" textAnchor="middle" style={{ fontSize: 8 }}>Audits</text>
              </g>
            </svg>
            <div className="mt-3 text-xs text-gray-200">Interactive governance map — click nodes to learn more</div>
          </div>
        </div>
      </header>

      {/* MAIN: sidebar + content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-28 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT NAV */}
        <nav className="lg:col-span-3 hidden lg:block sticky top-28 h-fit self-start">
          <div className="rounded-2xl p-4 bg-white/3 border border-white/8">
            <div className="text-sm text-gray-300 mb-4">Contents</div>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      setActiveId(s.id);
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center gap-3 ${
                      activeId === s.id ? "bg-gradient-to-r from-[#FF7E3A]/20 via-[#FF9A4F]/10 to-[#00E5FF]/10 border border-white/12" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: activeId === s.id ? "#FF7E3A" : "#6b7280" }} />
                    <div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-xs text-gray-400">{s.summary}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/6 pt-4 text-xs text-gray-300">
              <div className="mb-2">Quick actions</div>
              <div className="flex flex-col gap-2">
                <button className="px-3 py-2 rounded bg-white/5 hover:bg-white/6">Open Proposal</button>
                <button className="px-3 py-2 rounded bg-gradient-to-r from-[#FF7E3A] to-[#FF9A4F] text-black">Vote Now</button>
              </div>
            </div>
          </div>
        </nav>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-9 space-y-8">
          {SECTIONS.map((s, idx) => (
            <section key={s.id} id={s.id}>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl overflow-hidden"
              >
                <div className="p-6 md:p-8 bg-gradient-to-br from-white/3 to-transparent border border-white/8 shadow-xl">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-[#FFF3E6]">{s.title}</h2>
                      <p className="mt-2 text-gray-300">{s.summary}</p>

                      <div className="mt-4 grid gap-3">
                        {s.details.map((d, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-black/30 border border-white/6 hover:translate-x-1 transition transform"
                          >
                            <div className="text-sm text-gray-200">{d}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-48 hidden md:block">
                      <div className="p-4 rounded-lg bg-black/40 border border-white/6">
                        <div className="text-xs text-gray-300">Context</div>
                        <div className="mt-3 text-sm text-gray-200">Click expand to read governance examples, on-chain references, and relevant smart contracts.</div>
                        <div className="mt-4">
                          <button
                            onClick={() => toggleExpand(s.id)}
                            className="w-full px-3 py-2 rounded bg-gradient-to-r from-[#FF7E3A] to-[#FF9A4F] text-black"
                          >
                            {expanded[s.id] ? "Hide Examples" : "Show Examples"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded[s.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-6 overflow-hidden"
                      >
                        <div className="rounded-lg bg-black/40 p-4 border border-white/6">
                          <div className="text-sm text-gray-200">Example & notes</div>
                          <ul className="list-disc list-inside mt-2 text-gray-300">
                            <li>Smart contract reference: <code className="text-xs bg-white/5 px-1 rounded">GovernanceV1</code></li>
                            <li>Minimum discussion window: 7 days</li>
                            <li>Quorum requirement: 20% active stake (example)</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </section>
          ))}

          {/* Timeline / Decision Flow */}
          <section id="flow">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/3 to-transparent border border-white/8">
              <h3 className="text-xl font-semibold text-[#8edfff] mb-4">Decision Flow</h3>
              <div className="overflow-x-auto">
                <div className="min-w-[900px] p-4 bg-black/30 rounded-lg border border-white/6 flex items-center gap-6">
                  {[
                    { title: "Proposal", desc: "Submit idea & rationale" },
                    { title: "Review", desc: "Council/Advisory reviews" },
                    { title: "Discussion", desc: "Community feedback window" },
                    { title: "Vote", desc: "DAO vote & quorum check" },
                    { title: "Execute", desc: "Smart-contract/ops rollout" },
                    { title: "Audit", desc: "Post-deploy audits & monitoring" },
                  ].map((step, i) => (
                    <div key={i} className="flex-none w-56 p-4 rounded-lg bg-gradient-to-b from-white/5 to-transparent border border-white/6">
                      <div className="text-sm text-gray-200 font-semibold">{step.title}</div>
                      <div className="text-xs text-gray-400 mt-2">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50">
        <div className="flex gap-3 items-center bg-black/50 px-4 py-3 rounded-full border border-white/8 shadow-xl">
          <div className="text-sm text-gray-300 mr-4">Want to propose a change?</div>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF7E3A] to-[#FF9A4F] text-black font-semibold">Create Proposal</button>
          <button className="px-3 py-2 rounded-full border border-white/6 ml-2">Read Docs</button>
        </div>
      </div>
    </div>
  );
}
