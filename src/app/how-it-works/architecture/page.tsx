"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ArchitecturePage() {
  const layers = [
    {
      id: 1,
      title: "Application Layer",
      description: "User interfaces and client applications that interact with the PoPP protocol",
      components: ["Web Portal", "Mobile Apps", "API Gateways", "Plugin System"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 2,
      title: "Validation Layer",
      description: "Decentralized network of validators that verify and authenticate problems",
      components: ["Validator Nodes", "AI Verification", "Community Validation", "Reputation System"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 3,
      title: "Protocol Layer",
      description: "Core protocol logic, consensus mechanisms, and smart contracts",
      components: ["Consensus Engine", "Smart Contracts", "Token Economics", "Governance"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 4,
      title: "Storage Layer",
      description: "Decentralized storage solutions for immutable problem records",
      components: ["IPFS Network", "Blockchain Ledger", "Oracle Integration", "Data Provenance"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      title: "Infrastructure Layer",
      description: "Foundational infrastructure providing network connectivity and security",
      components: ["Blockchain Network", "Edge Nodes", "IoT Integration", "Security Protocols"],
      color: "from-pink-500 to-rose-500"
    }
  ];

  const architecturePrinciples = [
    {
      title: "Decentralization",
      description: "No single point of failure with distributed validation and storage",
      icon: "🌐"
    },
    {
      title: "Transparency",
      description: "All processes are publicly auditable on the blockchain",
      icon: "🔍"
    },
    {
      title: "Immutability",
      description: "Once validated, problems become tamper-proof records",
      icon: "🔒"
    },
    {
      title: "Scalability",
      description: "Designed to handle millions of problems across global networks",
      icon: "📈"
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
            Technical Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            5-Layer Architecture
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            A decentralized system that transforms problems into immutable truth through layered validation
          </p>
        </motion.div>
      </section>

      {/* Architecture Overview */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-gray-700/40"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏗️</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Layered for Security and Scalability
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Each layer of the PoPP architecture adds security, transparency, and validation, 
              ensuring every issue is resolved with trust and clarity. The modular design allows 
              for independent evolution of each layer while maintaining system integrity.
            </p>
          </div>

          {/* Architecture Visualization */}
          <div className="flex flex-col items-center my-16">
            <div className="relative w-full max-w-2xl">
              {/* Connecting lines */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/30 to-rose-500/30 rounded-full"></div>
              
              {/* Layers */}
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-16 relative`}
                >
                  {/* Layer Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-gray-900 shadow-lg z-10"></div>
                  
                  {/* Layer Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700/50`}>
                      <h3 className="text-2xl font-bold text-white mb-2">{layer.title}</h3>
                      <p className="text-gray-400 mb-4">{layer.description}</p>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {layer.components.map((component, compIndex) => (
                          <span 
                            key={compIndex} 
                            className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                          >
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Architecture Principles */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Principles</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The foundational concepts that guide our architectural decisions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {architecturePrinciples.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50 text-center group hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{principle.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{principle.title}</h3>
              <p className="text-gray-400">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-indigo-700/30"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Specifications</span>
          </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Detailed technical overview of the PoPP architecture components
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700/40">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-3">🔗</span>
                Consensus Mechanism
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Proof of Validation (PoV) - Validators stake reputation and tokens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Multi-layer validation with AI assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Dispute resolution through community voting</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700/40">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">🛡️</span>
                Security Model
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Cryptographic signing of all submissions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Sybil resistance through stake and reputation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Zero-knowledge proofs for privacy preservation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700/40">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-3">💾</span>
                Data Storage
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>IPFS for decentralized media storage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Cosmos SDK blockchain for ledger records</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Oracle networks for real-world data integration</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700/40">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3">⚡</span>
                Performance
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Sub-second validation for simple problems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Horizontal scaling through validator network</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Edge computing for geographic optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interoperability */}
      <section className="w-full max-w-4xl px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Interoperability</span>
          </h2>
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-gray-700/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
              <div className="flex-1">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔗</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Cross-Chain Integration</h3>
                <p className="text-gray-400">Connect with other blockchain ecosystems through IBC and bridge protocols</p>
              </div>
              <div className="text-4xl text-gray-500">+</div>
              <div className="flex-1">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Legacy System APIs</h3>
                <p className="text-gray-400">Integrate with existing civic and enterprise systems through REST/GraphQL APIs</p>
              </div>
            </div>
            <blockquote className="text-2xl text-gray-200 italic leading-relaxed max-w-3xl mx-auto">
              "Designed to be the truth validation layer for any system that needs to verify problems and solutions"
            </blockquote>
          </div>
        </motion.div>
      </section>
    </main>
  );
}