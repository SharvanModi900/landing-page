"use client";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PoPPLifecycle from "@/components/PoPPLifecycle";
import { motion } from "framer-motion";
import ValidatorSection from "@/components/validators/validators";
import IntegrationModularity from "@/components/IntegrationModularity/IntegrationModularity";
import PhilosophyVision from "@/components/PhilosophyAndVision/Philosophy-and-vision";
import WhoNeedsPoPP from "@/components/WhoNeedsPoPP/WhoNeedsPoPP";
import EconomicModelCosmicScale from "@/components/EconomicModel/EconomicModel";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="pt-20">
        <HeroSection />
      </div>

      {/* Platform vs Protocol Section 
      <section className="py-16 px-6 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 flex items-start gap-6">
            <div className="text-4xl">🧠</div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Platform vs Protocol</h2>
              <p className="text-gray-300 text-lg">
                <span className="text-red-400 font-semibold">Platforms</span> have central control. 
                <span className="text-green-400 font-semibold"> PoPP</span> has distributed trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Layer Architecture Section */}
      {/* <section className="py-20 px-6">
        <img src="./popp-architecture.png" alt="5-Layer Architecture" className="w-full max-w-6xl mx-auto" />
           
            
      </section> */}

    {/* PoPP vs Traditional Systems Comparison */}
<section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
        PoPP vs <span className="text-purple-400">Traditional Systems</span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        A side-by-side comparison of trust, transparency, and transformation
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-lg">
      <div className="grid md:grid-cols-3 gap-6 mb-6 text-center">
        <h3 className="text-lg font-bold text-blue-400 border-b-2 border-blue-400 pb-2">Feature</h3>
        <h3 className="text-lg font-bold text-green-400 border-b-2 border-green-400 pb-2">PoPP</h3>
        <h3 className="text-lg font-bold text-red-400 border-b-2 border-red-400 pb-2">Traditional Systems</h3>
      </div>

      <div className="space-y-3">
        {[
          { feature: "Trust Source", popp: "Distributed Validators", traditional: "Centralized Authorities" },
          { feature: "Openness", popp: "Anyone can submit", traditional: "Limited to official channels" },
          { feature: "Verification", popp: "Community + AI + IoT", traditional: "Manual or bureaucratic" },
          { feature: "Ledger", popp: "Public, Immutable", traditional: "Private, Editable" },
          { feature: "Escalation", popp: "Smart Contracts + DAO", traditional: "Manual, Delayed" },
          { feature: "Incentives", popp: "Tokens, PRS, Credits", traditional: "Rare, sometimes punishment" },
          { feature: "Transparency", popp: "Open to audit", traditional: "Behind closed doors" },
          { feature: "Data Provenance", popp: "Timestamped, Signed", traditional: "Editable, Unverified" },
        ].map((row, idx) => (
          <div
            key={idx}
            className={`grid md:grid-cols-3 gap-6 py-4 px-6 rounded-xl transition-all duration-300
              ${idx % 2 === 0 ? "bg-white/5" : "bg-white/10"}
              hover:bg-purple-900/30 hover:shadow-lg cursor-pointer`}
          >
            <div className="text-gray-300 font-semibold flex items-center">
              <svg
                className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {row.feature}
            </div>
            <div className="text-green-400 font-medium">{row.popp}</div>
            <div className="text-red-400 font-medium">{row.traditional}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  
<ValidatorSection />
<IntegrationModularity />
     
      {/* Case Studies Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Real-World <span className="text-blue-400">Case Studies</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how PoPP transforms problems into provable facts across different domains
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Contaminated Water Crisis",
                location: "Rajasthan, India",
                issue: "Water contamination in village wells",
                evidence: "Video evidence + IoT sensor data",
                outcome: "Emergency response + district reforms",
                icon: "🚰",
                color: "blue"
              },
              {
                title: "Infrastructure Hazard", 
                location: "Bengaluru, India",
                issue: "Dangerous pothole on busy road",
                evidence: "Photo + GPS + traffic camera data",
                outcome: "Civic repair funded + reputation gains",
                icon: "🛣️",
                color: "green"
              },
              {
                title: "Corruption Report",
                location: "Lucknow, India", 
                issue: "Bribery in vehicle licensing office",
                evidence: "Audio recording + document scan",
                outcome: "Legal alert + audit flag + media escalation",
                icon: "🕵️‍♂️",
                color: "purple"
              }
            ].map((caseStudy, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-4">{caseStudy.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{caseStudy.title}</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-400">Location:</span> <span className="text-white ml-2">{caseStudy.location}</span></div>
                  <div><span className="text-gray-400">Issue:</span> <span className="text-white ml-2">{caseStudy.issue}</span></div>
                  <div><span className="text-gray-400">Evidence:</span> <span className="text-white ml-2">{caseStudy.evidence}</span></div>
                  <div><span className="text-gray-400">Outcome:</span> <span className="text-white ml-2">{caseStudy.outcome}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Security <span className="text-purple-400">Guarantees</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trust is engineered into every layer of the PoPP protocol
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Data Integrity",
                desc: "All submissions are cryptographically signed",
                icon: "🔐"
              },
              {
                title: "Validator Privacy", 
                desc: "Validators can operate pseudonymously",
                icon: "👤"
              },
              {
                title: "Tamper Resistance",
                desc: "Ledger entries are immutable",
                icon: "🛡️"
              },
              {
                title: "Sybil Protection",
                desc: "Reputation and stake-based validator gating",
                icon: "🔄"
              },
              {
                title: "Dispute Protocols",
                desc: "Prevents manipulation and collusion",
                icon: "⚖️"
              },
              {
                title: "System Resilience",
                desc: "Backup validators and auto-rotation",
                icon: "🛠️"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
     <PhilosophyVision />

   
<WhoNeedsPoPP />
      {/* Technical Architecture Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Technical <span className="text-blue-400">Architecture</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for resilience, scalability, and long-term preservation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                layer: "Application Layer",
                components: ["Web Interface", "Mobile Apps", "API Gateways", "Plugin System"],
                features: "User-friendly interfaces for submission, validation, and monitoring"
              },
              {
                layer: "Protocol Layer", 
                components: ["Smart Contracts", "Consensus Engine", "Token Economics", "Governance"],
                features: "Core protocol logic, validator coordination, and incentive mechanisms"
              },
              {
                layer: "Infrastructure Layer",
                components: ["Blockchain Network", "IPFS Storage", "Oracle Networks", "IoT Integration"],
                features: "Decentralized storage, data availability, and real-world connectivity"
              }
            ].map((layer, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">{layer.layer}</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">Components</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {layer.components.map((component, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-medium mb-1">Features</h4>
                    <p className="text-sm text-gray-300">{layer.features}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
<EconomicModelCosmicScale />
    

{/* Governance Model Section */}
<section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  {/* Decorative background */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl"></div>

  <div className="max-w-6xl mx-auto relative z-10">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Governance <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Model</span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Decentralized decision-making that evolves with the community
      </p>
    </div>

    {/* Two Columns */}
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Decision-Making Process */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Process</span>
          Decision-Making
        </h3>
        <div className="space-y-5">
          {[
            { stage: "Proposal Submission", desc: "Any staked participant can submit governance proposals", requirements: "Minimum stake threshold and community support" },
            { stage: "Community Discussion", desc: "Open forum for debate, feedback, and refinement", duration: "7-30 days depending on proposal complexity" },
            { stage: "Validator Review", desc: "Technical and economic impact assessment by validators", criteria: "Security, scalability, alignment with protocol values" },
            { stage: "Token Holder Vote", desc: "Weighted voting based on stake and reputation", threshold: "Super-majority required for protocol changes" }
          ].map((stage, index) => (
            <div
              key={index}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-lg hover:shadow-blue-500/20 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-white text-lg">{stage.stage}</h4>
              </div>
              <p className="text-sm text-gray-300 mb-2">{stage.desc}</p>
              <div className="text-xs text-blue-400">
                {stage.requirements || stage.duration || stage.criteria || stage.threshold}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Governance Principles */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">Principles</span>
          Governance
        </h3>
        <div className="space-y-5">
          {[
            { principle: "Transparency", desc: "All governance activities are publicly recorded and auditable" },
            { principle: "Inclusivity", desc: "Multiple pathways for participation regardless of technical expertise" },
            { principle: "Meritocracy", desc: "Decisions weighted by contribution, not just token holdings" },
            { principle: "Evolution", desc: "Governance structures can adapt as the protocol matures" },
            { principle: "Alignment", desc: "Incentives structured to align individual and collective interests" }
          ].map((principle, index) => (
            <div
              key={index}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-lg hover:shadow-purple-500/20 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-white text-lg">{principle.principle}</h4>
              </div>
              <p className="text-sm text-gray-300">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Whitepaper CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
            <div className="text-6xl mb-6">📄</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Read the Complete <span className="text-blue-400">Whitepaper</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Dive deep into the technical architecture, cryptographic primitives, and comprehensive framework of the Proof-of-Problem Protocol.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
              <div className="text-center">
                <div className="text-2xl mb-2">🔐</div>
                <h3 className="font-semibold text-white mb-2">Cryptographic Primitives</h3>
                <p className="text-sm text-gray-300">Zero-knowledge proofs, timestamping, and validator security</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚙️</div>
                <h3 className="font-semibold text-white mb-2">Protocol Phases</h3>
                <p className="text-sm text-gray-300">Complete workflow from submission to resolution</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <h3 className="font-semibold text-white mb-2">Security Model</h3>
                <p className="text-sm text-gray-300">Sybil resistance, collusion prevention, and censorship resistance</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                Download Whitepaper (PDF)
              </button>
              <button className="border-2 border-blue-400/30 text-blue-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400/10 transition-colors">
                Read Online
              </button>
            </div>
            
            <div className="mt-6 text-sm text-gray-400">
              <p>By Sharvan Kumar • Version v1.0 • June 26, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Validate Truth?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the protocol that transforms complaints into cryptographically proven facts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              Start Validating
            </button>
            <button className="border-2 border-blue-400/30 text-blue-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400/10 transition-colors">
              Read Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}