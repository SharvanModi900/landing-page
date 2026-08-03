"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Shield, Users, FileCheck, ArrowRight } from "lucide-react";

const layers = [
  {
    icon: <FileCheck className="w-6 h-6 text-cyan-400" />,
    title: "Submission Layer",
    desc: "Anyone can submit a problem with evidence — photos, documents, GPS data. Each submission creates an on-chain ticket with a unique hash.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Validation Layer",
    desc: "Staked validators review evidence, verify claims, and vote on the validity of each ticket. Reputation and stake are at risk for dishonest validation.",
  },
  {
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    title: "Proof Layer",
    desc: "Validated problems receive cryptographic proof anchored on the Cosmos SDK chain. Proofs are immutable and publicly auditable.",
  },
  {
    icon: <ArrowRight className="w-6 h-6 text-purple-400" />,
    title: "Escalation Layer",
    desc: "Unresolved problems escalate through tiers — local, regional, global — with each level requiring additional validation consensus.",
  },
  {
    icon: <Layers className="w-6 h-6 text-amber-400" />,
    title: "Governance Layer",
    desc: "The PoPP DAO governs protocol parameters, fund allocation, and upgrades through on-chain proposals and token-weighted voting.",
  },
];

const flowSteps = [
  { step: "1", title: "Report", desc: "A community member submits a problem with evidence." },
  { step: "2", title: "Validate", desc: "Validators review the evidence and vote on validity." },
  { step: "3", title: "Prove", desc: "Validated problems receive immutable on-chain proof." },
  { step: "4", title: "Escalate", desc: "Unresolved problems escalate to higher attention tiers." },
  { step: "5", title: "Resolve", desc: "Authorities or partners act on verified problems." },
];

export default function HowItWorksPage() {
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
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              How{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                PoPP Works
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A 5-layer protocol that turns real-world problems into cryptographically
              verified, actionable facts.
            </p>
          </motion.div>
        </section>

        {/* Protocol Flow */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">The Problem Flow</h2>
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-6">
                {flowSteps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-5 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold border-2 border-[#030712] z-10">
                      {item.step}
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 ml-4">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5 Layers */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">The 5 Protocol Layers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/5 border border-white/10">
                    {layer.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{layer.title}</h3>
                  <p className="text-sm text-gray-400">{layer.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to explore deeper?
              </h2>
              <p className="text-gray-400 mb-6">
                Dive into the protocol architecture, security model, or start building with PoPP.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/docs"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition"
                >
                  Developer Docs
                </Link>
                <Link
                  href="/security"
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/15 font-semibold text-gray-300 hover:bg-white/10 transition"
                >
                  Security Model
                </Link>
                <Link
                  href="/whitepapers"
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/15 font-semibold text-gray-300 hover:bg-white/10 transition"
                >
                  Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
