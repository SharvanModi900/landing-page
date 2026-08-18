"use client";

import React from "react";
import { motion } from "framer-motion";

const stages = [
  {
    number: 1,
    title: "Problem Submission",
    description:
      "Anyone can submit a problem with evidence — photos, videos, audio, documents, or IoT sensor data. Submissions are timestamped and geo-tagged on arrival.",
    details: ["Photo / Video / Audio evidence", "GPS + timestamp on arrival", "IoT sensor data ingestion"],
    color: "#06b6d4",
    accentClass: "from-cyan-500 to-cyan-600",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Cryptographic Proof",
    description:
      "The protocol hashes the submission, creates a Merkle proof, and anchors it to the blockchain. Evidence is sealed — never editable, always verifiable.",
    details: ["SHA-256 content hashing", "Merkle tree anchoring", "Zero-knowledge timestamping"],
    color: "#3b82f6",
    accentClass: "from-blue-500 to-blue-600",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Decentralized Validation",
    description:
      "A rotating quorum of Human, AI, and IoT validators reviews the proof. Consensus requires multi-source agreement — no single point of failure.",
    details: ["Human validator staking", "AI pattern verification", "IoT cross-referencing"],
    color: "#10b981",
    accentClass: "from-emerald-500 to-emerald-600",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 5.016 0 0112 2.944a11.955 5.016 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Resolution & Rewards",
    description:
      "Once validated, smart contracts execute resolution — escalating to authorities, triggering DAO governance, or publishing as immutable public record. Contributors earn tokens.",
    details: ["Smart contract auto-escalation", "Token + PRS credit rewards", "Immutable public record"],
    color: "#f59e0b",
    accentClass: "from-amber-500 to-amber-600",
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function PipelineSection() {
  return (
    <section id="pipeline" className="relative py-24 px-6 bg-[#0a0f1a]">
      {/* Section heading */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
          The <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Protocol Pipeline</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          From raw problem to proven truth — every submission flows through four deterministic stages.
        </p>
      </div>

      {/* Pipeline stages */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical connecting line */}
        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-blue-500/30 via-emerald-500/30 to-amber-500/30" />

        {/* Animated particle on the line */}
        <motion.div
          className="absolute left-[30px] lg:left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {stages.map((stage, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } flex-row`}
            >
              {/* Node circle on the line */}
              <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${stage.accentClass} flex items-center justify-center shadow-lg`}
                  style={{ boxShadow: `0 0 24px ${stage.color}30` }}
                >
                  {stage.icon}
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-24 lg:ml-0 lg:w-[calc(50%-3rem)] ${isEven ? "lg:pr-0" : "lg:pl-0"}`}>
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.14] transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{ color: stage.color, backgroundColor: `${stage.color}15` }}
                    >
                      Stage {stage.number}
                    </span>
                    <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{stage.description}</p>
                  <ul className="space-y-1.5">
                    {stage.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-gray-200">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: stage.color }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
