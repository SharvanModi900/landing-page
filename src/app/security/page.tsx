"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SecurityPage() {
  const securityLayers = [
    { id: 1, title: "Identity Verification", description: "Robust identity systems ensuring authentic participation", features: ["Decentralized ID verification", "Biometric authentication", "Multi-factor authentication", "Reputation scoring system"], icon: "👤" },
    { id: 2, title: "Data Encryption", description: "End-to-end encryption protecting all communications", features: ["AES-256 encryption standard", "Quantum-resistant algorithms", "Zero-knowledge architecture", "Encrypted storage solutions"], icon: "🔐" },
    { id: 3, title: "Consensus Security", description: "Proof of Validation consensus mechanism with stake-weighted security", features: ["Stake-based validator selection", "Sybil attack resistance", "Adaptive consensus protocols", "Validator reputation tracking"], icon: "⚖️" },
    { id: 4, title: "Blockchain Anchoring", description: "Immutable proof storage on decentralized ledger", features: ["Cosmos SDK blockchain integration", "Timestamped proof anchoring", "Merkle tree verification", "Cross-chain proof validation"], icon: "🔗" },
    { id: 5, title: "Privacy Protection", description: "Advanced privacy mechanisms preserving user confidentiality", features: ["Zero-knowledge proofs", "Differential privacy techniques", "Selective disclosure controls", "Anonymization protocols"], icon: "👻" },
  ];

  const securityPrinciples = [
    { title: "Decentralization", description: "No single point of failure with distributed validation and storage", icon: "🌐" },
    { title: "Transparency", description: "All processes are publicly auditable on the blockchain", icon: "🔍" },
    { title: "Immutability", description: "Once validated, problems become tamper-proof records", icon: "🔒" },
    { title: "Privacy by Design", description: "Privacy-preserving mechanisms built into every component", icon: "🛡️" },
  ];

  const threatMitigations = [
    { threat: "Sybil Attacks", mitigation: "Stake-weighted validation and reputation scoring", effectiveness: "99.8%" },
    { threat: "Data Tampering", mitigation: "Blockchain anchoring and cryptographic hashing", effectiveness: "100%" },
    { threat: "Privacy Breaches", mitigation: "Zero-knowledge proofs and encryption", effectiveness: "99.9%" },
    { threat: "Consensus Manipulation", mitigation: "Multi-layer validation and stake requirements", effectiveness: "99.5%" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 mb-6">
                Security Framework
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Uncompromising <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Security</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Military-grade security architecture protecting truth validation through decentralized trust
              </p>
            </motion.div>
          </div>
        </section>

        {/* Security Overview */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Multi-Layered Security Architecture</h2>
                <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  PoPP employs a comprehensive security framework that protects every aspect of the validation process,
                  from identity verification to immutable proof storage, ensuring trust in decentralized truth validation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {securityLayers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                      <span className="text-lg">{layer.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{layer.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{layer.description}</p>
                    <ul className="space-y-2">
                      {layer.features.map((f, fi) => (
                        <li key={fi} className="flex items-start text-sm">
                          <span className="text-cyan-400 mr-2 mt-0.5">•</span>
                          <span className="text-gray-400">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security Principles */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Core <span className="text-cyan-400">Security Principles</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Foundational concepts that guide our security architecture
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityPrinciples.map((p, index) => (
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

        {/* Threat Mitigation */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Threat <span className="text-cyan-400">Mitigation</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  Proactive protection against potential security vulnerabilities
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 text-sm text-gray-400 font-semibold">Threat Type</th>
                      <th className="pb-4 text-sm text-gray-400 font-semibold">Mitigation Strategy</th>
                      <th className="pb-4 text-sm text-gray-400 font-semibold">Effectiveness</th>
                    </tr>
                  </thead>
                  <tbody>
                    {threatMitigations.map((m, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="border-b border-white/[0.06] last:border-0"
                      >
                        <td className="py-5 text-white font-medium text-sm">{m.threat}</td>
                        <td className="py-5 text-gray-400 text-sm">{m.mitigation}</td>
                        <td className="py-5">
                          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-medium text-sm">
                            {m.effectiveness}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technical Security */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Technical <span className="text-cyan-400">Security Measures</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Advanced technologies ensuring the highest security standards
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Cryptographic Security", icon: "🔑", items: ["Elliptic Curve Digital Signature Algorithm (ECDSA) for transaction signing", "SHA-256 hashing for data integrity verification", "Secure Multi-Party Computation (SMPC) for key management", "Post-quantum cryptographic algorithms for future-proofing"] },
                { title: "Network Security", icon: "🌐", items: ["DDoS protection through distributed validator network", "Firewall and intrusion detection systems", "Regular penetration testing and security audits", "Secure API endpoints with rate limiting"] },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-3 text-sm">{s.icon}</span>
                    {s.title}
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    {s.items.map((item, ii) => (
                      <li key={ii} className="flex items-start">
                        <span className="text-cyan-400 mr-2 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance & Auditing */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-8">
                Compliance & <span className="text-cyan-400">Auditing</span>
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {[
                    { icon: "📜", title: "Regulatory Compliance", desc: "GDPR, CCPA, and other data protection regulations" },
                    { icon: "🔍", title: "Third-Party Audits", desc: "Regular security assessments by leading firms" },
                    { icon: "📊", title: "Continuous Monitoring", desc: "24/7 security monitoring and incident response" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                      <div className="text-2xl mb-2">{s.icon}</div>
                      <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                      <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-300 italic leading-relaxed max-w-3xl mx-auto">
                  &ldquo;Security is not a product, but a process. It&apos;s more about how you manage risk.&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
