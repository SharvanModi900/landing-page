"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Rocket, Sparkles, Shield, Globe, Layers, Users } from "lucide-react";
import Link from "next/link";

type Step = {
  quarter: string;
  title: string;
  description: string;
  icon: ReactNode;
  tag: string;
};

const roadmap: Step[] = [
  {
    quarter: "Q1 2025",
    title: "Protocol Foundation",
    description: "PoPP core, decentralized submissions, and verifiable problem schema on testnet.",
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    tag: "Foundation",
  },
  {
    quarter: "Q2 2025",
    title: "Community Governance",
    description: "DAO voting, staking for validators, and transparent reward distribution.",
    icon: <Users className="w-5 h-5 text-blue-400" />,
    tag: "Governance",
  },
  {
    quarter: "Q3 2025",
    title: "Trust & Security",
    description: "Fraud detection, identity attestations, and reputation-weighted validation.",
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    tag: "Security",
  },
  {
    quarter: "Q4 2025",
    title: "Global Expansion",
    description: "Regional pilots, NGO & gov partnerships, multilingual & multi-chain support.",
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
    tag: "Expansion",
  },
  {
    quarter: "2026+",
    title: "Intelligence Layer",
    description: "AI-assisted triage, predictive analytics, and autonomous validation agents.",
    icon: <Sparkles className="w-5 h-5 text-blue-400" />,
    tag: "Intelligence",
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* HERO */}
        <section className="px-4 sm:px-6 lg:px-20 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                <Rocket className="h-4 w-4 text-cyan-400" />
                PoPP Roadmap
              </div>

              <h1 className="mt-4 text-2xl sm:text-4xl leading-[1.1] font-extrabold md:text-5xl text-white">
                Our Journey to a{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Verified Future
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-gray-400 text-lg">
                Step-by-step milestones as we evolve PoPP from a verifiable problem protocol
                into a global, community-governed infrastructure for truth and action.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#timeline"
                  className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition"
                >
                  Explore Timeline
                </Link>
                <Link
                  href="/whitepapers"
                  className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
                >
                  Read Whitepaper
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="px-4 sm:px-6 lg:px-20 pb-20">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-7xl text-center text-2xl sm:text-3xl font-bold"
          >
            Milestones & Phases
          </motion.h2>

          <div className="relative mx-auto max-w-6xl">
            {/* center line */}
            <div className="pointer-events-none absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />

            <div className="space-y-12">
              {roadmap.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative flex items-start gap-8 md:gap-16 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node dot */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2">
                    <div className="h-3 w-3 rounded-full bg-cyan-500 border-2 border-[#030712] z-10 mt-6" />
                  </div>

                  {/* card */}
                  <div className="w-full md:w-5/12 pl-14 md:pl-0">
                    <article className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                          {step.icon}
                          {step.tag}
                        </span>
                        <span className="text-sm font-semibold text-cyan-400">{step.quarter}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-gray-400">{step.description}</p>
                    </article>
                  </div>

                  {/* spacer */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-20 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl md:text-3xl font-bold">Be part of the journey.</h3>
                  <p className="mt-2 text-gray-400">
                    Contribute to the protocol, validate problems, or integrate PoPP into your ecosystem.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                  <Link
                    href="/contribute"
                    className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition"
                  >
                    Contribute
                  </Link>
                  <Link
                    href="/docs"
                    className="rounded-lg border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10 transition"
                  >
                    Read Docs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
