"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import PipelineSection from "@/components/PipelineSection";
import ValidatorSection from "@/components/validators/validators";
import WhoNeedsPoPP from "@/components/WhoNeedsPoPP/WhoNeedsPoPP";

/* ------------------------------------------------------------------ */
/*  Case Studies data                                                 */
/* ------------------------------------------------------------------ */
const caseStudies = [
  {
    title: "Contaminated Water Crisis",
    location: "Rajasthan, India",
    issue: "Water contamination in village wells",
    evidence: "Video evidence + IoT sensor data",
    outcome: "Emergency response + district reforms",
    icon: "🚰",
    color: "#22d3ee",
  },
  {
    title: "Infrastructure Hazard",
    location: "Bengaluru, India",
    issue: "Dangerous pothole on busy road",
    evidence: "Photo + GPS + traffic camera data",
    outcome: "Civic repair funded + reputation gains",
    icon: "🛣️",
    color: "#10b981",
  },
  {
    title: "Corruption Report",
    location: "Lucknow, India",
    issue: "Bribery in vehicle licensing office",
    evidence: "Audio recording + document scan",
    outcome: "Legal alert + audit flag + media escalation",
    icon: "🕵️‍♂️",
    color: "#a855f7",
  },
];

/* ------------------------------------------------------------------ */
/*  Security guarantees                                               */
/* ------------------------------------------------------------------ */
const securityItems = [
  { title: "Data Integrity", desc: "All submissions are cryptographically signed", icon: "🔐" },
  { title: "Validator Privacy", desc: "Validators can operate pseudonymously", icon: "👤" },
  { title: "Tamper Resistance", desc: "Ledger entries are immutable", icon: "🛡️" },
  { title: "Sybil Protection", desc: "Reputation and stake-based validator gating", icon: "🔄" },
  { title: "Dispute Protocols", desc: "Prevents manipulation and collusion", icon: "⚖️" },
  { title: "System Resilience", desc: "Backup validators and auto-rotation", icon: "🛠️" },
];

/* ------------------------------------------------------------------ */
/*  Governance steps                                                  */
/* ------------------------------------------------------------------ */
const governanceSteps = [
  { stage: "Proposal Submission", desc: "Any staked participant can submit governance proposals" },
  { stage: "Community Discussion", desc: "Open forum for debate, feedback, and refinement" },
  { stage: "Validator Review", desc: "Technical and economic impact assessment by validators" },
  { stage: "Token Holder Vote", desc: "Weighted voting based on stake and reputation" },
];

/* ================================================================== */
/*  PAGE                                                              */
/* ================================================================== */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* 1. Hero */}
      <div className="pt-16">
        <HeroSection />
      </div>

      {/* 2. Pipeline */}
      <PipelineSection />

      {/* 3. Validators */}
      <ValidatorSection />

      {/* 4. Case Studies */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Real-World <span className="text-cyan-400">Impact</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              See how PoPP transforms problems into provable facts across different domains.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="text-3xl mb-4">{cs.icon}</div>
                <h4 className="text-lg font-bold text-white mb-3">{cs.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-400">
                    <span className="text-gray-500">Location:</span>{" "}
                    <span className="text-gray-300 ml-1">{cs.location}</span>
                  </div>
                  <div className="text-gray-400">
                    <span className="text-gray-500">Issue:</span>{" "}
                    <span className="text-gray-300 ml-1">{cs.issue}</span>
                  </div>
                  <div className="text-gray-400">
                    <span className="text-gray-500">Evidence:</span>{" "}
                    <span className="text-gray-300 ml-1">{cs.evidence}</span>
                  </div>
                  <div
                    className="pt-2 mt-2 border-t border-white/5 font-medium"
                    style={{ color: cs.color }}
                  >
                    {cs.outcome}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition-colors"
            >
              See All Case Studies
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Who Needs PoPP */}
      <WhoNeedsPoPP />

      {/* 6. Trust & Governance (merged) */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Trust & <span className="text-green-400">Governance</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Security is engineered into every layer. Governance evolves with the community.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Security grid */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Security Guarantees</h3>
              <div className="grid grid-cols-2 gap-4">
                {securityItems.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance steps */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Governance Process</h3>
              <div className="space-y-4">
                {governanceSteps.map((step, idx) => (
                  <div
                    key={step.stage}
                    className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{step.stage}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Join the Protocol That{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Proves Truth
            </span>
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Transform complaints into cryptographically proven facts. Earn rewards. Shape governance.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/submit"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Submit Problem
            </Link>
            <Link
              href="/whitepapers"
              className="px-8 py-4 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg font-semibold text-gray-300 transition-colors"
            >
              Read Whitepaper
            </Link>
            <Link
              href="/community"
              className="px-8 py-4 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg font-semibold text-gray-300 transition-colors"
            >
              Join Community
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>Open Source</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Audited</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Community-Governed</span>
          </div>
        </div>
      </section>
    </div>
  );
}
