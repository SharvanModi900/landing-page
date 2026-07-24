"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OriginStoryPage() {
  const storyPoints = [
    {
      year: "2023",
      title: "The Spark",
      description:
        "A simple pothole complaint in Bengaluru sparked a realization — ignored civic issues are not just annoyances, but data points of systemic failures. What if these complaints could be transformed into verifiable truth?",
      icon: "💡",
    },
    {
      year: "2024",
      title: "The Vision",
      description:
        "Our founders envisioned a decentralized protocol where problems become provable facts. They recognized that complaints, when validated and elevated, could become the foundation for real societal change.",
      icon: "👁️",
    },
    {
      year: "2025",
      title: "The Protocol",
      description:
        "PoPP was born — a protocol that transforms civic complaints into cryptographic proof through AI validation, decentralized verification, and blockchain immutability. Truth became computable.",
      icon: "🔗",
    },
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
                Origin Story
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                From a simple frustration to a global protocol for decentralized truth validation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Timeline */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />

            <div className="space-y-16">
              {storyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-8 md:gap-16 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#030712] z-10 mt-6" />

                  {/* Content */}
                  <div className="w-full md:w-5/12 pl-14 md:pl-0">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="text-sm font-semibold text-cyan-400 mb-2">
                        {point.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <span className="text-lg">{point.icon}</span>
                        {point.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        {point.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founding Vision Section */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    The{" "}
                    <span className="text-cyan-400">Core Insight</span>
                  </h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Complaints are not noise — they are the raw data of broken systems. When validated and elevated through decentralized consensus, they become the foundation for real societal change.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <span className="text-lg">🔍</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        Validation Through Consensus
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Truth emerges when multiple validators agree on a problem&apos;s existence
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-56 h-56 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-4xl mb-3">🌐</div>
                      <h3 className="text-base font-bold text-white mb-1">
                        Decentralized Truth
                      </h3>
                      <p className="text-xs text-gray-500">
                        Proof of Problem Protocol
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Our{" "}
                <span className="text-cyan-400">Mission</span>
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10">
                <blockquote className="text-xl md:text-2xl text-gray-300 italic leading-relaxed">
                  &ldquo;To transform complaints into civilization&apos;s building blocks through cryptographic proof, decentralized validation, and incentivized truth.&rdquo;
                </blockquote>
                <div className="mt-8 w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Be Part of the Story
            </h3>
            <p className="text-gray-400 mb-8">
              Join the protocol that turns every problem into provable truth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/submit"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Submit a Problem
              </Link>
              <Link
                href="/validators"
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 font-semibold text-gray-300 transition-colors"
              >
                Become a Validator
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
