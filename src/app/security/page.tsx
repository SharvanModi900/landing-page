"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SecurityPage() {
  const securityLayers = [
    {
      id: 1,
      title: "Identity Verification",
      description: "Robust identity systems ensuring authentic participation",
      features: [
        "Decentralized ID verification",
        "Biometric authentication",
        "Multi-factor authentication",
        "Reputation scoring system"
      ],
      icon: "👤"
    },
    {
      id: 2,
      title: "Data Encryption",
      description: "End-to-end encryption protecting all communications",
      features: [
        "AES-256 encryption standard",
        "Quantum-resistant algorithms",
        "Zero-knowledge architecture",
        "Encrypted storage solutions"
      ],
      icon: "🔐"
    },
    {
      id: 3,
      title: "Consensus Security",
      description: "Proof of Validation consensus mechanism with stake-weighted security",
      features: [
        "Stake-based validator selection",
        "Sybil attack resistance",
        "Adaptive consensus protocols",
        "Validator reputation tracking"
      ],
      icon: "⚖️"
    },
    {
      id: 4,
      title: "Blockchain Anchoring",
      description: "Immutable proof storage on decentralized ledger",
      features: [
        "Cosmos SDK blockchain integration",
        "Timestamped proof anchoring",
        "Merkle tree verification",
        "Cross-chain proof validation"
      ],
      icon: "🔗"
    },
    {
      id: 5,
      title: "Privacy Protection",
      description: "Advanced privacy mechanisms preserving user confidentiality",
      features: [
        "Zero-knowledge proofs",
        "Differential privacy techniques",
        "Selective disclosure controls",
        "Anonymization protocols"
      ],
      icon: "👻"
    }
  ];

  const securityPrinciples = [
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
      title: "Privacy by Design",
      description: "Privacy-preserving mechanisms built into every component",
      icon: "🛡️"
    }
  ];

  const threatMitigations = [
    {
      threat: "Sybil Attacks",
      mitigation: "Stake-weighted validation and reputation scoring",
      effectiveness: "99.8%"
    },
    {
      threat: "Data Tampering",
      mitigation: "Blockchain anchoring and cryptographic hashing",
      effectiveness: "100%"
    },
    {
      threat: "Privacy Breaches",
      mitigation: "Zero-knowledge proofs and encryption",
      effectiveness: "99.9%"
    },
    {
      threat: "Consensus Manipulation",
      mitigation: "Multi-layer validation and stake requirements",
      effectiveness: "99.5%"
    }
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-indigo-950 to-purple-950 flex flex-col items-center">
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
            Security Framework
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            Uncompromising Security
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Military-grade security architecture protecting truth validation through decentralized trust
          </p>
        </motion.div>
      </section>

      {/* Security Overview */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-gray-700/40"
        >
          <div className="text-center mb-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🛡️</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Multi-Layered Security Architecture
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              PoPP employs a comprehensive security framework that protects every aspect of the validation process, 
              from identity verification to immutable proof storage, ensuring trust in decentralized truth validation.
            </p>
          </div>

          {/* Security Layers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {securityLayers.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{layer.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{layer.title}</h3>
                <p className="text-gray-400 mb-6">{layer.description}</p>
                <ul className="space-y-3">
                  {layer.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Security Principles */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Security Principles</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Foundational concepts that guide our security architecture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityPrinciples.map((principle, index) => (
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

      {/* Threat Mitigation */}
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
              Threat <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Mitigation</span>
          </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Proactive protection against potential security vulnerabilities
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-4 text-gray-300 font-semibold">Threat Type</th>
                  <th className="pb-4 text-gray-300 font-semibold">Mitigation Strategy</th>
                  <th className="pb-4 text-gray-300 font-semibold">Effectiveness</th>
                </tr>
              </thead>
              <tbody>
                {threatMitigations.map((mitigation, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30"
                  >
                    <td className="py-6 text-white font-medium">{mitigation.threat}</td>
                    <td className="py-6 text-gray-400">{mitigation.mitigation}</td>
                    <td className="py-6">
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-medium">
                        {mitigation.effectiveness}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Technical Security */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Security Measures</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced technologies ensuring the highest security standards
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-3">🔑</span>
              Cryptographic Security
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Elliptic Curve Digital Signature Algorithm (ECDSA) for transaction signing</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>SHA-256 hashing for data integrity verification</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Secure Multi-Party Computation (SMPC) for key management</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>Post-quantum cryptographic algorithms for future-proofing</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">🌐</span>
              Network Security
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>DDoS protection through distributed validator network</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Firewall and intrusion detection systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Regular penetration testing and security audits</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Secure API endpoints with rate limiting</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Compliance & Auditing */}
      <section className="w-full max-w-4xl px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Compliance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Auditing</span>
          </h2>
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-gray-700/40">
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
                <div className="text-3xl mb-3">📜</div>
                <h3 className="text-xl font-bold text-white mb-2">Regulatory Compliance</h3>
                <p className="text-gray-400">GDPR, CCPA, and other data protection regulations</p>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">Third-Party Audits</h3>
                <p className="text-gray-400">Regular security assessments by leading firms</p>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-xl font-bold text-white mb-2">Continuous Monitoring</h3>
                <p className="text-gray-400">24/7 security monitoring and incident response</p>
              </div>
            </div>
            <blockquote className="text-2xl text-gray-200 italic leading-relaxed max-w-3xl mx-auto">
              "Security is not a product, but a process. It's more about how you manage risk."
            </blockquote>
          </div>
        </motion.div>
      </section>
    </main>
  );
}