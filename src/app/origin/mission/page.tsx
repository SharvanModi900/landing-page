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
      description: "Every step of problem validation is publicly auditable on the blockchain",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Decentralization",
      description: "No central authority controls the validation process—truth emerges through consensus",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Accountability",
      description: "All validators and submitters are pseudonymously accountable for their contributions",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Inclusivity",
      description: "Anyone can participate in the truth validation process regardless of technical expertise",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-indigo-950 via-purple-900 to-gray-950 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-purple-900/10"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl px-6"
        >
          <div className="inline-block px-4 py-1 bg-indigo-800/30 border border-indigo-600/50 rounded-full text-sm text-indigo-300 mb-6">
            Core Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            To make every problem a verified proof and every voice count in building a better world
          </p>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="w-full max-w-4xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-gray-700/40"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Empowering Truth Through Decentralization
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              PoPP exists to empower individuals and communities to surface, validate, and solve real-world problems. 
              Our mission is to create a decentralized, transparent, and accountable system for truth validation—
              where every problem is an opportunity for progress.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission Pillars */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Four Pillars</span> of Our Mission
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            How we transform problems into provable truths
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{point.title}</h3>
              <p className="text-gray-400 leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Core Values</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6`}>
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Statement */}
      <section className="w-full max-w-4xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-indigo-700/30 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Looking <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Forward</span>
          </h2>
          <blockquote className="text-2xl text-gray-200 italic leading-relaxed max-w-3xl mx-auto mb-8">
            "We envision a world where truth is computable, problems are provable, and progress is perpetual. 
            Where every voice matters and every issue can find its path to resolution through decentralized consensus."
          </blockquote>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-xl font-bold text-white mb-2">Global Impact</h3>
              <p className="text-gray-400">Scaling truth validation across cultures and communities</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Continuous Evolution</h3>
              <p className="text-gray-400">Adapting to new challenges and opportunities</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}