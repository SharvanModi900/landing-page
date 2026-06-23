"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ValidationPage() {
  const validationSteps = [
    {
      id: 1,
      title: "Problem Submission",
      description: "Users submit problems through web interfaces, mobile apps, or API integrations with geolocation and media evidence",
      icon: "📝",
      details: [
        "Complaint details with structured metadata",
        "Geolocation tagging for context",
        "Media attachments (photos, videos, documents)",
        "Initial categorization and tagging"
      ]
    },
    {
      id: 2,
      title: "AI Pre-Validation",
      description: "Automated systems analyze submissions for completeness, duplicates, and initial credibility assessment",
      icon: "🤖",
      details: [
        "Duplicate detection algorithms",
        "Natural language processing for content analysis",
        "Image/video verification for authenticity",
        "Spam and bot filtering mechanisms"
      ]
    },
    {
      id: 3,
      title: "Community Validation",
      description: "Verified community members review and validate problems in their domain of expertise",
      icon: "👥",
      details: [
        "Reputation-weighted validation system",
        "Domain-specific validator pools",
        "Evidence corroboration requirements",
        "Collaborative review workflows"
      ]
    },
    {
      id: 4,
      title: "Validator Consensus",
      description: "Decentralized network of validators reaches consensus on problem validity through stake-weighted voting",
      icon: "⚖️",
      details: [
        "Proof of Validation consensus mechanism",
        "Stake and reputation-based weighting",
        "Dispute resolution protocols",
        "Threshold requirements for approval"
      ]
    },
    {
      id: 5,
      title: "Proof Generation",
      description: "Cryptographically signed proof documents are generated and stored immutably on the blockchain",
      icon: "🔐",
      details: [
        "Multi-signature validation certificates",
        "Timestamped blockchain anchoring",
        "Zero-knowledge proof generation",
        "Immutable evidence storage"
      ]
    },
    {
      id: 6,
      title: "Escalation Routing",
      description: "Validated problems are automatically routed to appropriate action tracks based on category and severity",
      icon: "↗️",
      details: [
        "Smart contract-based routing rules",
        "Severity classification algorithms",
        "Stakeholder notification systems",
        "Integration with external systems"
      ]
    }
  ];

  const validationTypes = [
    {
      title: "Citizen Reports",
      description: "Civic complaints and community issues verified through collective validation",
      examples: ["Infrastructure problems", "Environmental hazards", "Public safety concerns"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Professional Audits",
      description: "Technical and compliance issues validated by domain experts",
      examples: ["Security vulnerabilities", "Regulatory violations", "Quality control failures"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Automated Detection",
      description: "System-generated alerts from IoT sensors and monitoring systems",
      examples: ["Equipment malfunctions", "Network anomalies", "Performance degradation"],
      color: "from-indigo-500 to-purple-500"
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
            Validation Process
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            Truth Validation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            From problem submission to cryptographic proof through decentralized consensus
          </p>
        </motion.div>
      </section>

      {/* Process Overview */}
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
              <span className="text-3xl">🔍</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The Validation Journey
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Every problem submitted to PoPP goes through a rigorous multi-stage validation process 
              that combines human intelligence, AI analysis, and decentralized consensus to establish 
              irrefutable truth.
            </p>
          </div>

          {/* Validation Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500/30 to-pink-500/30 rounded-full"></div>
            
            <div className="space-y-12">
              {validationSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
                >
                  {/* Step Node */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-gray-900 shadow-lg z-10 flex items-center justify-center">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  
                  {/* Step Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} mt-24 md:mt-0`}>
                    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50">
                      <div className="inline-block px-3 py-1 bg-indigo-800/30 rounded-full text-sm text-indigo-300 mb-4">
                        Step {step.id}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-gray-400 mb-6">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <span className="text-cyan-400 mr-2">•</span>
                            <span className="text-gray-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Validation Types */}
      <section className="w-full max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Types of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Validation</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Different problem types require specialized validation approaches
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {validationTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mb-6`}>
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
              <p className="text-gray-400 mb-6">{type.description}</p>
              <ul className="space-y-2">
                {type.examples.map((example, exampleIndex) => (
                  <li key={exampleIndex} className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <span className="text-gray-300">{example}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Validation */}
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
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Validation</span> Mechanisms
          </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced technologies that ensure the integrity and authenticity of validated problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700/40">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-3">🛡️</span>
                Cryptographic Assurance
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Multi-signature validation by decentralized validators</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Blockchain anchoring for immutable timestamping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Zero-knowledge proofs for privacy preservation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Hash chaining for evidence integrity</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700/40">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">🤖</span>
                AI Validation
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Computer vision for image/video authenticity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Natural language processing for content analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Anomaly detection for pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Automated duplicate and spam detection</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700/40">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-3">👥</span>
                Community Validation
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Reputation-weighted validator scoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Domain-specific expertise verification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Collaborative evidence corroboration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Dispute resolution through community voting</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700/40">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3">⚖️</span>
                Consensus Protocols
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Proof of Validation (PoV) consensus mechanism</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Stake and reputation-based weighting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Threshold requirements for approval</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Adaptive consensus for different problem types</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quality Assurance */}
      <section className="w-full max-w-4xl px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Assurance</span>
          </h2>
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-gray-700/40">
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Accuracy</h3>
                <p className="text-gray-400">99.7% validation accuracy through multi-layer verification</p>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
                <div className="text-3xl mb-3">⏱️</div>
                <h3 className="text-xl font-bold text-white mb-2">Speed</h3>
                <p className="text-gray-400">Average 15-minute validation for simple problems</p>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="text-xl font-bold text-white mb-2">Security</h3>
                <p className="text-gray-400">Zero successful tampering attempts in 2 years</p>
              </div>
            </div>
            <blockquote className="text-2xl text-gray-200 italic leading-relaxed max-w-3xl mx-auto">
              "Trust is not given, it is earned through rigorous validation and transparent processes"
            </blockquote>
          </div>
        </motion.div>
      </section>
    </main>
  );
}