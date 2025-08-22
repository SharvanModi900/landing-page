

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Globe, Brain } from "lucide-react";
import Image from "next/image";

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b0e11] via-[#10151c] to-[#14181d] text-white relative overflow-hidden">
      {/* Gradient Orbs Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* HERO */}
      <section className="relative px-8 lg:px-20 py-24 lg:py-36 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
            <Sparkles className="w-4 h-4 text-orange-400" />
            PoPP Vision
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
            Shaping a Transparent & Decentralized Future
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
            We are building a world where problems are not just identified but
            transparently validated, solved, and scaled through collective
            intelligence, blockchain integrity, and global trust.
          </p>

          <div className="mt-8 flex gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#approach"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg shadow-orange-500/30 text-lg font-semibold transition"
            >
              Discover Approach <ArrowRight className="w-5 h-5" />
            </motion.a>
            <a
              href="/whitepapers"
              className="px-6 py-3 border border-white/15 bg-white/5 rounded-xl text-lg font-medium hover:bg-white/10 transition"
            >
              Whitepaper
            </a>
          </div>
        </motion.div>

       {/* Right Illustration - Futuristic Hologram */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  className="flex-1 flex justify-center relative items-center"
>
  {/* Glowing background halo */}
  <div className="absolute -inset-20 bg-gradient-to-tr from-orange-500/30 via-pink-500/20 to-purple-600/30 blur-[120px] rounded-full" />

  {/* Animated floating orb */}
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
    className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 opacity-80 blur-md shadow-2xl shadow-orange-500/40"
  />

  {/* Holographic rotating ring */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    className="absolute w-96 h-96 border border-dashed border-orange-400/50 rounded-full"
  />

  {/* Inner glowing core */}
  <motion.div
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-300 via-orange-400 to-pink-500 blur-xl opacity-70"
  />

  {/* Sci-fi hex grid overlay */}
  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
</motion.div>

      </section>

      {/* Vision Manifesto */}
      <section className="relative text-center px-8 lg:px-20 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-10"
        >
          A World Built on{" "}
          <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
            Trust & Transparency
          </span>
        </motion.h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed relative">
          <p>
            Our vision is a future where communities validate challenges,
            collaborate on solutions, and scale impact globally. Blockchain
            ensures integrity, while AI and collective intelligence transform
            trust into real-world action.
          </p>
        </div>
        {/* glowing divider */}
        <div className="mt-12 h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-red-500" />
      </section>

      {/* APPROACH */}
      <section
        id="approach"
        className="relative px-8 lg:px-20 py-24 bg-gradient-to-b from-[#14181d] to-[#0b0e11]"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl font-bold mb-16"
        >
          Our Approach
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Shield className="w-8 h-8 text-orange-400" />,
              title: "Decentralized Verification",
              desc: "Problems are validated transparently on-chain, ensuring authenticity and fairness.",
            },
            {
              icon: <Brain className="w-8 h-8 text-purple-400" />,
              title: "Collective Intelligence",
              desc: "Harnessing community knowledge & AI-driven insights to generate actionable solutions.",
            },
            {
              icon: <Globe className="w-8 h-8 text-cyan-400" />,
              title: "Scalable Transparency",
              desc: "A global system where every step is visible, auditable, and trusted without borders.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="relative group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-2 transition transform"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-gradient-to-tr from-orange-500/20 to-purple-500/20">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* CLOSING CTA */}
<section className="relative py-24 bg-gradient-to-b from-[#0b0e11] to-[#14181d] text-center overflow-hidden">
  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-r from-orange-500/30 via-pink-500/20 to-purple-600/30 rounded-full blur-3xl opacity-60 animate-pulse" />
  </div>

  <div className="relative container mx-auto px-6">
    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
    >
      🚀 Join the{" "}
      <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
        Movement
      </span>
    </motion.h2>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      viewport={{ once: true }}
      className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
    >
      Be a part of the Proof-of-Problem Protocol (PoPP) revolution.  
      Together we can shape a transparent, decentralized, and intelligent future.
    </motion.p>

    {/* Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      viewport={{ once: true }}
      className="flex justify-center gap-6"
    >
      <a
        href="/whitepapers"
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-600 hover:shadow-lg hover:shadow-orange-500/40 transition-all text-lg font-semibold"
      >
        Explore Whitepapers
      </a>
      <a
        href="/join"
        className="px-8 py-4 rounded-2xl border border-white/20 hover:border-orange-400 text-lg font-semibold hover:text-orange-400 transition-all"
      >
        Join Community
      </a>
    </motion.div>
  </div>
</section>

    </main>
  );
}
