"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function OriginTeamPage() {
  const teamMembers = [
    {
      name: "Sharvan Modi",
      role: "Researcher",
      bio: "Blockchain architect with 3+ years of experience in decentralized systems and cryptographic protocols.",
    },
  ];

  const advisors = [
    {
      name: "Prof. Michael Roberts",
      role: "Blockchain Ethics Advisor",
      bio: "Professor of Computer Science and Ethics, specializing in responsible technology development.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="w-full py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-cyan-400 mb-4">
              The People Behind PoPP
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Our Team
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Visionaries, builders, and truth-seekers united by a shared mission
            </p>
          </motion.div>
        </section>

        {/* Team Introduction */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              United by a Shared Vision
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our team brings together expertise in cryptography, governance, product design, and community building.
              We are united by a shared belief: that every problem, when validated, can become a catalyst for positive change.
            </p>
          </motion.div>
        </section>

        {/* Core Team */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-3">
              The <span className="text-cyan-400">Core Team</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The minds building the future of decentralized truth validation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-3">
                    <span className="text-lg font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-cyan-400 text-sm">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Advisors */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-3">
              Our <span className="text-cyan-400">Advisors</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Guided by experts in technology, ethics, and civic innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {advisors.map((advisor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                    <span className="text-lg font-bold text-white">
                      {advisor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{advisor.name}</h3>
                    <p className="text-cyan-400 text-sm">{advisor.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{advisor.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Culture Section */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Our <span className="text-cyan-400">Culture</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="text-lg font-bold text-white mb-1">Global Mindset</h3>
                <p className="text-gray-400 text-sm">Distributed team with diverse perspectives</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="text-lg font-bold text-white mb-1">Innovation First</h3>
                <p className="text-gray-400 text-sm">Encouraging bold ideas and experimentation</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-2">🤝</div>
                <h3 className="text-lg font-bold text-white mb-1">Collaborative</h3>
                <p className="text-gray-400 text-sm">Open communication and knowledge sharing</p>
              </div>
            </div>
            <blockquote className="text-xl text-gray-300 italic max-w-3xl mx-auto">
              "We believe that the most powerful innovations come from diverse minds working together toward a common purpose."
            </blockquote>
          </motion.div>
        </section>

        {/* Join Us CTA */}
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Interested in <span className="text-cyan-400">Joining Us</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              We're always looking for talented individuals who share our vision for decentralized truth validation.
            </p>
            <Link href="/community">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl">
                View Open Positions
              </button>
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
