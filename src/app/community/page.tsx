"use client";

import { motion } from "framer-motion";
import { Users, Globe2, Sparkles } from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e11] to-[#14181d] text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-16">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight">
  Continuum
</h1>
<p className="mt-6 text-lg text-gray-300 max-w-lg">
  PoPP is built by the community, for the community.  
  Our roadmap reflects collective growth — from early adopters  
  to a global movement of decentralized problem solvers.
</p>

        </motion.div>

        {/* Right Abstract Illusion */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1 flex justify-center relative"
        >
          {/* Glowing Illusion Shapes */}
          <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute w-56 h-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 top-10 right-10 animate-ping" />
          <div className="absolute w-44 h-44 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 rounded-full blur-2xl opacity-40 bottom-10 left-10 animate-pulse" />

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative z-10 p-20 rounded-full bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-white/10 shadow-2xl backdrop-blur-xl"
          >
            <Sparkles className="w-20 h-20 text-orange-300 animate-spin-slow" />
          </motion.div>
        </motion.div>
      </section>

      {/* Roadmap Cards */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            icon: <Users className="w-8 h-8 text-pink-400" />,
            title: "Phase 1 – Community Formation",
            desc: "Bring together early adopters, innovators, and builders to shape the PoPP ecosystem.",
          },
          {
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            title: "Phase 2 – Collaborative Validation",
            desc: "Launch problem validation through collective participation, reputation, and transparency.",
          },
          {
            icon: <Globe2 className="w-8 h-8 text-orange-400" />,
            title: "Phase 3 – Global Network",
            desc: "Scale to a worldwide decentralized community solving real-world problems together.",
          },
        ].map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="p-8 rounded-2xl bg-gradient-to-b from-[#1a1f25] to-[#0f1317] border border-white/10 hover:border-purple-400/30 transition group shadow-lg shadow-black/40"
          >
            <div className="mb-4">{phase.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
            <p className="text-gray-400 text-sm">{phase.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Closing CTA */}
      <section className="relative bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-orange-600/20 py-24 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-orange-500/10 blur-3xl" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative text-4xl md:text-5xl font-extrabold mb-6"
        >
          Join the Community
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative text-gray-300 max-w-2xl mx-auto mb-8"
        >
          The future of decentralized problem validation is built by people like you. 
          Be part of the collective force shaping tomorrow.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/30 transition"
        >
          Join Us
        </motion.button>
      </section>
    </div>
  );
}
