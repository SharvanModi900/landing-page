"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Shield, Users, FileCheck } from "lucide-react";

const impactAreas = [
  {
    icon: <MapPin className="w-6 h-6 text-cyan-400" />,
    title: "Civic Infrastructure",
    desc: "Road hazards, water contamination, and public safety issues — verified and escalated through PoPP to drive real-world repairs.",
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: "Anti-Corruption",
    desc: "Bribery reports and governance failures become immutable records that cannot be silently suppressed or ignored.",
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: "Community Empowerment",
    desc: "Communities gain a verifiable voice. Problems are no longer lost in bureaucracy — they become provable facts demanding action.",
  },
  {
    icon: <FileCheck className="w-6 h-6 text-purple-400" />,
    title: "Research & Data",
    desc: "Open, anonymized datasets enable researchers and policymakers to study problem patterns and design evidence-based solutions.",
  },
];

const metrics = [
  { label: "Problems Verified", value: "On-chain", sub: "Every ticket is cryptographically provable" },
  { label: "Validators Active", value: "Growing", sub: "Community-driven validation network" },
  { label: "Escalation Tiers", value: "3 levels", sub: "Local → Regional → Global" },
  { label: "Data Integrity", value: "Immutable", sub: "Anchored on Cosmos SDK blockchain" },
];

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* Hero */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4">
              Real-World{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Impact
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              PoPP turns verified problems into action. See how the protocol creates
              measurable impact across communities and domains.
            </p>
          </motion.div>
        </section>

        {/* Metrics */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
              >
                <div className="text-2xl font-bold text-cyan-400 mb-1">{m.value}</div>
                <div className="text-sm font-semibold text-white">{m.label}</div>
                <div className="text-xs text-gray-500 mt-1">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Impact Areas */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">Where PoPP Makes a Difference</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {impactAreas.map((area, i) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10">
                      {area.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{area.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{area.desc}</p>
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
                See PoPP in Action
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-6">
                Explore real case studies or join the community making impact happen.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/case-studies"
                  className="px-6 py-3 rounded-lg bg-white text-cyan-600 font-semibold hover:bg-white/90 transition-colors"
                >
                  View Case Studies
                </Link>
                <Link
                  href="/community"
                  className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Join Community
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
