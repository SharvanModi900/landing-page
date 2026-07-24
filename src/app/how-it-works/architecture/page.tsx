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
    },
    {
      id: 2,
      title: "Validation Layer",
      description: "Decentralized network of validators that verify and authenticate problems",
      components: ["Validator Nodes", "AI Verification", "Community Validation", "Reputation System"],
    },
    {
      id: 3,
      title: "Protocol Layer",
      description: "Core protocol logic, consensus mechanisms, and smart contracts",
      components: ["Consensus Engine", "Smart Contracts", "Token Economics", "Governance"],
    },
    {
      id: 4,
      title: "Storage Layer",
      description: "Decentralized storage solutions for immutable problem records",
      components: ["IPFS Network", "Blockchain Ledger", "Oracle Integration", "Data Provenance"],
    },
    {
      id: 5,
      title: "Infrastructure Layer",
      description: "Foundational infrastructure providing network connectivity and security",
      components: ["Blockchain Network", "Edge Nodes", "IoT Integration", "Security Protocols"],
    },
  ];

  const architecturePrinciples = [
    { title: "Decentralization", description: "No single point of failure with distributed validation and storage", icon: "🌐" },
    { title: "Transparency", description: "All processes are publicly auditable on the blockchain", icon: "🔍" },
    { title: "Immutability", description: "Once validated, problems become tamper-proof records", icon: "🔒" },
    { title: "Scalability", description: "Designed to handle millions of problems across global networks", icon: "📈" },
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
                Technical Architecture
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                5-Layer{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Architecture
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                A decentralized system that transforms problems into immutable truth through layered validation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Layered for Security and Scalability
                </h2>
                <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  Each layer of the PoPP architecture adds security, transparency, and validation,
                  ensuring every issue is resolved with trust and clarity. The modular design allows
                  for independent evolution of each layer while maintaining system integrity.
                </p>
              </div>

              {/* Layers */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/[0.06]" />

                {layers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} mb-12 relative`}
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#030712] z-10" />

                    <div className={`w-5/12 ${index % 2 === 0 ? "pr-10 text-right" : "pl-10 text-left"}`}>
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                        <h3 className="text-xl font-bold text-white mb-2">{layer.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">{layer.description}</p>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {layer.components.map((component, ci) => (
                            <span key={ci} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                              {component}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Architecture Principles */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Core <span className="text-cyan-400">Principles</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The foundational concepts that guide our architectural decisions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architecturePrinciples.map((p, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">{p.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Technical <span className="text-cyan-400">Specifications</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  Detailed technical overview of the PoPP architecture components
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Consensus Mechanism",
                    icon: "🔗",
                    items: [
                      "Proof of Validation (PoV) - Validators stake reputation and tokens",
                      "Multi-layer validation with AI assistance",
                      "Dispute resolution through community voting",
                    ],
                  },
                  {
                    title: "Security Model",
                    icon: "🛡️",
                    items: [
                      "Cryptographic signing of all submissions",
                      "Sybil resistance through stake and reputation",
                      "Zero-knowledge proofs for privacy preservation",
                    ],
                  },
                  {
                    title: "Data Storage",
                    icon: "💾",
                    items: [
                      "IPFS for decentralized media storage",
                      "Cosmos SDK blockchain for ledger records",
                      "Oracle networks for real-world data integration",
                    ],
                  },
                  {
                    title: "Performance",
                    icon: "⚡",
                    items: [
                      "Sub-second validation for simple problems",
                      "Horizontal scaling through validator network",
                      "Edge computing for geographic optimization",
                    ],
                  },
                ].map((section, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-3 text-sm">
                        {section.icon}
                      </span>
                      {section.title}
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex items-start">
                          <span className="text-cyan-400 mr-2 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interoperability */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Built for <span className="text-cyan-400">Interoperability</span>
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Cross-Chain Integration</h3>
                    <p className="text-sm text-gray-400">Connect with other blockchain ecosystems through IBC and bridge protocols</p>
                  </div>
                  <div className="text-3xl text-gray-600">+</div>
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Legacy System APIs</h3>
                    <p className="text-sm text-gray-400">Integrate with existing civic and enterprise systems through REST/GraphQL APIs</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-300 italic leading-relaxed max-w-3xl mx-auto">
                  &ldquo;Designed to be the truth validation layer for any system that needs to verify problems and solutions&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
