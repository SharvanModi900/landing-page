"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Eye, Users, Scale } from "lucide-react";

const pillars = [
  {
    icon: <Shield className="w-6 h-6 text-cyan-400" />,
    title: "Verify Every Problem",
    desc: "Ensure that no legitimate problem goes unheard. PoPP provides cryptographic proof that makes complaints verifiable and immutable.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Empower Communities",
    desc: "Give communities the tools to validate, escalate, and resolve problems collectively — without relying on centralized gatekeepers.",
  },
  {
    icon: <Scale className="w-6 h-6 text-emerald-400" />,
    title: "Ensure Accountability",
    desc: "Validators stake reputation and tokens. Every action is auditable. Problems cannot be silently suppressed or manipulated.",
  },
  {
    icon: <Eye className="w-6 h-6 text-purple-400" />,
    title: "Transparent Governance",
    desc: "DAO-driven decisions, open proposals, and community voting ensure the protocol evolves with the people it serves.",
  },
];

const commitments = [
  "Decentralized verification — no single point of control",
  "Open-source protocol — auditable by anyone, anytime",
  "Incentivized validators — stake-based reputation and rewards",
  "Privacy-preserving — zero-knowledge proofs and selective disclosure",
  "Community-first governance — token-weighted voting and proposals",
];

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              Our Mission
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              A World Where Problems{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cannot Be Silenced
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              PoPP exists to ensure that every real-world problem is cryptographically
              verified, transparently validated, and escalated to those who can act —
              without censorship, without silence.
            </p>
          </motion.div>
        </section>

        {/* Pillars */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Pillars</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/5 border border-white/10">
                    {p.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Our Commitments</h2>
              <ul className="space-y-4">
                {commitments.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-cyan-400 shrink-0" />
                    <span className="text-gray-400">{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join the Mission
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-6">
                Whether you validate problems, build the protocol, or report issues —
                every contribution strengthens the network of truth.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/whitepapers"
                  className="px-6 py-3 rounded-lg bg-white text-cyan-600 font-semibold hover:bg-white/90 transition-colors"
                >
                  Read Whitepaper
                </Link>
                <Link
                  href="/contribute"
                  className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Contribute
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
