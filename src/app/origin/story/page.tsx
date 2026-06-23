"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OriginStoryPage() {
  const storyPoints = [
    {
      year: "2023",
      title: "The Spark",
      description: "A simple pothole complaint in Bengaluru sparked a realization - ignored civic issues are not just annoyances, but data points of systemic failures. What if these complaints could be transformed into verifiable truth?",
      icon: "💡"
    },
    {
      year: "2024",
      title: "The Vision",
      description: "Our founders envisioned a decentralized protocol where problems become provable facts. They recognized that complaints, when validated and elevated, could become the foundation for real societal change.",
      icon: "👁️"
    },
    {
      year: "2025",
      title: "The Protocol",
      description: "PoPP was born - a protocol that transforms civic complaints into cryptographic proof through AI validation, decentralized verification, and blockchain immutability. Truth became computable.",
      icon: "🔗"
    }
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-indigo-950 via-purple-900 to-gray-950 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCBMIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDAsMTAwLDEwMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" opacity-20></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl px-6"
        >
          <div className="inline-block px-4 py-1 bg-indigo-800/30 border border-indigo-600/50 rounded-full text-sm text-indigo-300 mb-6">
            Origin Story
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            Our Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            From a simple frustration to a global protocol for decentralized truth validation
          </p>
        </motion.div>
      </section>

      {/* Story Timeline */}
      <section className="w-full max-w-6xl px-6 pb-32 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-full"></div>
        
        <div className="space-y-24">
          {storyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-gray-900 shadow-lg z-10 flex items-center justify-center">
                <span className="text-lg">{point.icon}</span>
              </div>
              
              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="text-cyan-400 font-bold text-lg mb-2">{point.year}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{point.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{point.description}</p>
                </div>
              </div>
              
              {/* Spacer */}
              <div className="w-2/12"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founding Vision Section */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-indigo-700/30"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Core Insight</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Complaints are not noise—they are the raw data of broken systems. When validated and elevated through decentralized consensus, they become the foundation for real societal change.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xl">🔍</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Validation Through Consensus</h4>
                  <p className="text-gray-400">Truth emerges when multiple validators agree on a problem's existence and characteristics</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl absolute inset-0"></div>
                <div className="relative w-64 h-64 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center shadow-2xl">
                  <div className="text-center p-6">
                    <div className="text-5xl mb-4">🌐</div>
                    <h3 className="text-xl font-bold text-white mb-2">Decentralized Truth</h3>
                    <p className="text-gray-400 text-sm">Proof of Problem Protocol</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="w-full max-w-4xl px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Mission</span>
          </h2>
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-gray-700/40">
            <blockquote className="text-2xl md:text-3xl text-gray-200 italic leading-relaxed max-w-3xl mx-auto">
              "To transform complaints into civilization's building blocks through cryptographic proof, decentralized validation, and incentivized truth."
            </blockquote>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}