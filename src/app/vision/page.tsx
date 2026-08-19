"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Globe, Brain } from "lucide-react";
import Link from "next/link";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* HERO */}
        <section className="px-4 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                PoPP Vision
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                Shaping a Transparent &{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Decentralized Future
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed">
                We are building a world where problems are not just identified but
                transparently validated, solved, and scaled through collective
                intelligence, blockchain integrity, and global trust.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#approach"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold transition hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  Discover Approach <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/whitepapers"
                  className="px-6 py-3 border border-white/15 bg-white/5 rounded-lg font-medium hover:bg-white/10 transition"
                >
                  Whitepaper
                </Link>
              </div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex justify-center relative items-center"
            >
              <div className="absolute -inset-20 bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-cyan-400/10 blur-[120px] rounded-full" />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-56 h-56 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-cyan-400/30 blur-md"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute w-72 h-72 border border-dashed border-cyan-500/30 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400/40 to-blue-500/40 blur-xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Vision Manifesto */}
        <section className="text-center px-4 sm:px-6 lg:px-20 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8"
          >
            A World Built on{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Trust & Transparency
            </span>
          </motion.h2>
          <div className="max-w-3xl mx-auto text-gray-400 leading-relaxed">
            <p>
              Our vision is a future where communities validate challenges,
              collaborate on solutions, and scale impact globally. Blockchain
              ensures integrity, while AI and collective intelligence transform
              trust into real-world action.
            </p>
          </div>
          <div className="mt-10 h-0.5 w-24 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
        </section>

        {/* APPROACH */}
        <section id="approach" className="px-4 sm:px-6 lg:px-20 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-2xl sm:text-3xl font-bold mb-8 sm:mb-12"
          >
            Our Approach
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                title: "Decentralized Verification",
                desc: "Problems are validated transparently on-chain, ensuring authenticity and fairness.",
              },
              {
                icon: <Brain className="w-6 h-6 text-blue-400" />,
                title: "Collective Intelligence",
                desc: "Harnessing community knowledge & AI-driven insights to generate actionable solutions.",
              },
              {
                icon: <Globe className="w-6 h-6 text-cyan-400" />,
                title: "Scalable Transparency",
                desc: "A global system where every step is visible, auditable, and trusted without borders.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-white/5 border border-white/10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="px-4 sm:px-6 lg:px-20 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Join the{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Movement
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                Be a part of the Proof-of-Problem Protocol (PoPP) revolution.
                Together we can shape a transparent, decentralized, and intelligent future.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/whitepapers"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                  Explore Whitepapers
                </Link>
                <Link
                  href="/community"
                  className="px-8 py-3 rounded-lg border border-white/15 bg-white/5 font-semibold hover:bg-white/10 transition-all"
                >
                  Join Community
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
