"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "The Spark",
    title: "A Broken Internet Line",
    desc: "Repeated complaints about a disconnected wire went unanswered. Every promise was polite — and hollow. The question emerged: why do complaints vanish into bureaucracy?",
  },
  {
    year: "The Insight",
    title: "Complaints Are Data",
    desc: "The realization that complaints are not noise — they are evidence that something is broken. But there was no protocol to protect the truth of a problem.",
  },
  {
    year: "The Protocol",
    title: "Proof-of-Problem Born",
    desc: "PoPP was conceived: a decentralized framework where problems are cryptographically verified, validated by the community, and escalated with full transparency.",
  },
  {
    year: "Testnet",
    title: "Cosmos SDK Chain Live",
    desc: "The PoPP testnet launched on Cosmos SDK, enabling decentralized ticket submissions, validator staking, and on-chain proof verification.",
  },
  {
    year: "Today",
    title: "Building the Movement",
    desc: "Growing the community of validators, researchers, and civic partners committed to turning verified problems into real-world action.",
  },
];

const values = [
  { title: "Truth", desc: "Every problem is cryptographically provable — not just claimed, but verified with evidence." },
  { title: "Transparency", desc: "All validations, proofs, and escalations are visible and auditable on-chain." },
  { title: "Decentralization", desc: "No single authority controls what gets reported or resolved — the community governs." },
  { title: "Accountability", desc: "Validators stake reputation and tokens. Problems cannot be silently suppressed." },
];

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* HERO */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              Our Story
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
              From a Broken Wire to a{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Global Protocol
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              PoPP was born from a simple frustration — complaints that vanish into silence.
              Today it&apos;s a decentralized protocol that ensures problems are heard,
              verified, and acted upon.
            </p>
          </motion.div>
        </section>

        {/* ORIGIN NARRATIVE */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">How It Started</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                For weeks, an internet line was mysteriously cut — again and again.
                Support calls were met with polite but hollow promises. The pattern was clear:
                complaints were being heard but never acted upon.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                That frustration led to a deeper question: <strong className="text-white">why does truth need repetition to be noticed?</strong>
              </p>
              <p className="text-gray-400 leading-relaxed">
                The answer became PoPP — a protocol where complaints are not lost in bureaucracy
                but become immutable, verifiable facts that demand resolution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Journey</h2>
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#030712] z-10 mt-2" />
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <span className="text-sm font-semibold text-cyan-400">{event.year}</span>
                      <h3 className="text-lg font-bold text-white mt-1 mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-cyan-400 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-400">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Be Part of the Protocol
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-6">
                Help us build a world where problems are verified, not silenced.
                Join as a validator, contributor, or community member.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contribute"
                  className="px-6 py-3 rounded-lg bg-white text-cyan-600 font-semibold hover:bg-white/90 transition-colors"
                >
                  Contribute
                </Link>
                <Link
                  href="/validators"
                  className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Become a Validator
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
