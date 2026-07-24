"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ValidationPage() {
  const validationSteps = [
    {
      id: 1, title: "Problem Submission",
      description: "Users submit problems through web interfaces, mobile apps, or API integrations with geolocation and media evidence",
      icon: "📝",
      details: ["Complaint details with structured metadata", "Geolocation tagging for context", "Media attachments (photos, videos, documents)", "Initial categorization and tagging"],
    },
    {
      id: 2, title: "AI Pre-Validation",
      description: "Automated systems analyze submissions for completeness, duplicates, and initial credibility assessment",
      icon: "🤖",
      details: ["Duplicate detection algorithms", "Natural language processing for content analysis", "Image/video verification for authenticity", "Spam and bot filtering mechanisms"],
    },
    {
      id: 3, title: "Community Validation",
      description: "Verified community members review and validate problems in their domain of expertise",
      icon: "👥",
      details: ["Reputation-weighted validation system", "Domain-specific validator pools", "Evidence corroboration requirements", "Collaborative review workflows"],
    },
    {
      id: 4, title: "Validator Consensus",
      description: "Decentralized network of validators reaches consensus on problem validity through stake-weighted voting",
      icon: "⚖️",
      details: ["Proof of Validation consensus mechanism", "Stake and reputation-based weighting", "Dispute resolution protocols", "Threshold requirements for approval"],
    },
    {
      id: 5, title: "Proof Generation",
      description: "Cryptographically signed proof documents are generated and stored immutably on the blockchain",
      icon: "🔐",
      details: ["Multi-signature validation certificates", "Timestamped blockchain anchoring", "Zero-knowledge proof generation", "Immutable evidence storage"],
    },
    {
      id: 6, title: "Escalation Routing",
      description: "Validated problems are automatically routed to appropriate action tracks based on category and severity",
      icon: "↗️",
      details: ["Smart contract-based routing rules", "Severity classification algorithms", "Stakeholder notification systems", "Integration with external systems"],
    },
  ];

  const validationTypes = [
    { title: "Citizen Reports", description: "Civic complaints and community issues verified through collective validation", examples: ["Infrastructure problems", "Environmental hazards", "Public safety concerns"] },
    { title: "Professional Audits", description: "Technical and compliance issues validated by domain experts", examples: ["Security vulnerabilities", "Regulatory violations", "Quality control failures"] },
    { title: "Automated Detection", description: "System-generated alerts from IoT sensors and monitoring systems", examples: ["Equipment malfunctions", "Network anomalies", "Performance degradation"] },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 mb-6">
                Validation Process
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Truth <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Validation</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                From problem submission to cryptographic proof through decentralized consensus
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔍</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">The Validation Journey</h2>
                <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  Every problem submitted to PoPP goes through a rigorous multi-stage validation process
                  that combines human intelligence, AI analysis, and decentralized consensus to establish
                  irrefutable truth.
                </p>
              </div>

              {/* Steps */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />
                <div className="space-y-12">
                  {validationSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      viewport={{ once: true }}
                      className={`relative flex items-start gap-8 md:gap-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#030712] z-10 mt-6" />
                      <div className="w-full md:w-5/12 pl-14 md:pl-0">
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 mb-3">
                            Step {step.id}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                          <p className="text-sm text-gray-400 mb-4">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail, di) => (
                              <li key={di} className="flex items-start text-sm">
                                <span className="text-cyan-400 mr-2 mt-0.5">•</span>
                                <span className="text-gray-400">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="hidden md:block w-5/12" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Validation Types */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Types of <span className="text-cyan-400">Validation</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Different problem types require specialized validation approaches
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {validationTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                    <span className="text-lg">🔍</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.examples.map((ex, ei) => (
                      <li key={ei} className="flex items-start text-sm">
                        <span className="text-cyan-400 mr-2 mt-0.5">•</span>
                        <span className="text-gray-400">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Validation */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Technical <span className="text-cyan-400">Validation</span> Mechanisms
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  Advanced technologies that ensure the integrity and authenticity of validated problems
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Cryptographic Assurance", icon: "🛡️", items: ["Multi-signature validation by decentralized validators", "Blockchain anchoring for immutable timestamping", "Zero-knowledge proofs for privacy preservation", "Hash chaining for evidence integrity"] },
                  { title: "AI Validation", icon: "🤖", items: ["Computer vision for image/video authenticity", "Natural language processing for content analysis", "Anomaly detection for pattern recognition", "Automated duplicate and spam detection"] },
                  { title: "Community Validation", icon: "👥", items: ["Reputation-weighted validator scoring", "Domain-specific expertise verification", "Collaborative evidence corroboration", "Dispute resolution through community voting"] },
                  { title: "Consensus Protocols", icon: "⚖️", items: ["Proof of Validation (PoV) consensus mechanism", "Stake and reputation-based weighting", "Threshold requirements for approval", "Adaptive consensus for different problem types"] },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
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
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-8">
                Quality <span className="text-cyan-400">Assurance</span>
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {[
                    { icon: "✅", title: "Accuracy", desc: "99.7% validation accuracy through multi-layer verification" },
                    { icon: "⏱️", title: "Speed", desc: "Average 15-minute validation for simple problems" },
                    { icon: "🛡️", title: "Security", desc: "Zero successful tampering attempts in 2 years" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                      <div className="text-2xl mb-2">{s.icon}</div>
                      <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                      <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-300 italic leading-relaxed max-w-3xl mx-auto">
                  &ldquo;Trust is not given, it is earned through rigorous validation and transparent processes&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
