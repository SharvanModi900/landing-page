"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OriginMissionPage() {
  const missionPoints = [
    {
      icon: "🔍",
      title: "Surface Truth",
      description: "Transform complaints into verifiable data points that reveal systemic issues and opportunities for improvement."
    },
    {
      icon: "🛡️",
      title: "Validate Facts",
      description: "Use decentralized consensus, AI verification, and cryptographic proof to establish irrefutable truth."
    },
    {
      icon: "⚡",
      title: "Enable Action",
      description: "Create transparent pathways for problems to be addressed through smart contracts and community governance."
    },
    {
      icon: "🏆",
      title: "Reward Integrity",
      description: "Incentivize truth-telling and validation through token economics and reputation systems."
    }
  ];

  const coreValues = [
    {
      title: "Transparency",
      description: "Every step of problem validation is publicly auditable on the blockchain"
    },
    {
      title: "Decentralization",
      description: "No central authority controls the validation process — truth emerges through consensus"
    },
    {
      title: "Accountability",
      description: "All validators and submitters are pseudonymously accountable for their contributions"
    },
    {
      title: "Inclusivity",
      description: "Anyone can participate in the truth validation process regardless of technical expertise"
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 mb-6">
                Core Mission
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Mission
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                To make every problem a verified proof and every voice count in building a better world
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Empowering Truth Through Decentralization
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
                PoPP exists to empower individuals and communities to surface, validate, and solve real-world problems.
                Our mission is to create a decentralized, transparent, and accountable system for truth validation —
                where every problem is an opportunity for progress.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Pillars */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                The <span className="text-cyan-400">Four Pillars</span> of Our Mission
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                How we transform problems into provable truths
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="text-3xl mb-4">{point.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Our <span className="text-cyan-400">Core Values</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                    <span className="text-lg">✨</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Looking <span className="text-cyan-400">Forward</span>
              </h2>
              <blockquote className="text-xl text-gray-300 italic leading-relaxed max-w-3xl mx-auto mb-8">
                &ldquo;We envision a world where truth is computable, problems are provable, and progress is perpetual.
                Where every voice matters and every issue can find its path to resolution through decentralized consensus.&rdquo;
              </blockquote>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                  <div className="text-3xl mb-3">🌍</div>
                  <h3 className="text-lg font-bold text-white mb-2">Global Impact</h3>
                  <p className="text-sm text-gray-400">Scaling truth validation across cultures and communities</p>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-lg font-bold text-white mb-2">Continuous Evolution</h3>
                  <p className="text-sm text-gray-400">Adapting to new challenges and opportunities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
