"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OriginTeamPage() {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "Former blockchain architect at leading tech firms, Alex brings 10+ years of experience in decentralized systems and cryptographic protocols.",
      image: "/placeholder-team-1.jpg",
      social: ["twitter", "linkedin"]
    },
    {
      name: "Dr. Sarah Chen",
      role: "Chief Research Officer",
      bio: "PhD in Distributed Systems from MIT, Sarah leads our research initiatives on consensus mechanisms and truth validation algorithms.",
      image: "/placeholder-team-2.jpg",
      social: ["twitter", "linkedin", "researchgate"]
    },
    {
      name: "Marcus Johnson",
      role: "Lead Protocol Engineer",
      bio: "Former core developer at Ethereum Foundation, Marcus specializes in smart contract architecture and blockchain scalability.",
      image: "/placeholder-team-3.jpg",
      social: ["github", "linkedin"]
    },
    {
      name: "Priya Sharma",
      role: "Head of Product",
      bio: "Product design expert with a focus on user-centered blockchain applications and community engagement platforms.",
      image: "/placeholder-team-4.jpg",
      social: ["twitter", "dribbble"]
    },
    {
      name: "David Kim",
      role: "AI & Validation Systems",
      bio: "Machine learning specialist focused on automated problem detection and validation algorithms for decentralized networks.",
      image: "/placeholder-team-5.jpg",
      social: ["twitter", "github"]
    },
    {
      name: "Elena Rodriguez",
      role: "Community & Governance",
      bio: "Expert in decentralized governance models and community building for Web3 protocols with global reach.",
      image: "/placeholder-team-6.jpg",
      social: ["twitter", "linkedin"]
    }
  ];

  const advisors = [
    {
      name: "Prof. Michael Roberts",
      role: "Blockchain Ethics Advisor",
      bio: "Professor of Computer Science and Ethics, specializing in responsible technology development.",
      image: "/placeholder-advisor-1.jpg"
    },
    {
      name: "Jennifer Walsh",
      role: "Civic Tech Strategist",
      bio: "Former municipal CTO with expertise in government technology adoption and public sector innovation.",
      image: "/placeholder-advisor-2.jpg"
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
            The People Behind PoPP
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            Our Team
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Visionaries, builders, and truth-seekers united by a shared mission
          </p>
        </motion.div>
      </section>

      {/* Team Introduction */}
      <section className="w-full max-w-4xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-gray-700/40 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">👥</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            United by a Shared Vision
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Our team brings together expertise in cryptography, governance, product design, and community building. 
            We are united by a shared belief: that every problem, when validated, can become a catalyst for positive change.
          </p>
        </motion.div>
      </section>

      {/* Core Team */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Core Team</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The minds building the future of decentralized truth validation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mr-4">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-indigo-400">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6">{member.bio}</p>
                <div className="flex space-x-3">
                  <button className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <span className="text-sm">🐦</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <span className="text-sm">💼</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <span className="text-sm">🐙</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advisors */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Advisors</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Guided by experts in technology, ethics, and civic innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {advisors.map((advisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                  <span className="text-xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{advisor.name}</h3>
                  <p className="text-purple-400">{advisor.role}</p>
                </div>
              </div>
              <p className="text-gray-400">{advisor.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="w-full max-w-4xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-indigo-700/30 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Culture</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-xl font-bold text-white mb-2">Global Mindset</h3>
              <p className="text-gray-400">Distributed team with diverse perspectives</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Innovation First</h3>
              <p className="text-gray-400">Encouraging bold ideas and experimentation</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Collaborative</h3>
              <p className="text-gray-400">Open communication and knowledge sharing</p>
            </div>
          </div>
          <blockquote className="text-2xl text-gray-200 italic leading-relaxed max-w-3xl mx-auto">
            "We believe that the most powerful innovations come from diverse minds working together toward a common purpose."
          </blockquote>
        </motion.div>
      </section>

      {/* Join Us CTA */}
      <section className="w-full max-w-4xl px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Interested in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Joining Us</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            We're always looking for talented individuals who share our vision for decentralized truth validation.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            View Open Positions
          </button>
        </motion.div>
      </section>
    </main>
  );
}