import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PoPPLifecycle from "@/components/PoPPLifecycle";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      <HeroSection />

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

      {/* Validator Types Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Who Can Be a <span className="text-blue-400">Validator?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              PoPP allows any qualified participant to become a validator—as long as they earn it
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                type: "Human Validators",
                requirements: "Must stake PoPP tokens, pass onboarding quiz, build reputation",
                benefits: "Higher rewards, governance voting rights, access to critical cases",
                icon: "👥"
              },
              {
                type: "AI Validators", 
                requirements: "Open-source or audit-verified, run in trusted enclaves",
                benefits: "Pattern detection, 24/7 availability, objective analysis",
                icon: "🤖"
              },
              {
                type: "IoT/Sensor Validators",
                requirements: "Registered devices with metadata & calibration data",
                benefits: "Real-world signals, objective measurements, continuous monitoring",
                icon: "📡"
              }
            ].map((validator, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl mb-4">{validator.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{validator.type}</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">Requirements</h4>
                    <p className="text-sm text-gray-300">{validator.requirements}</p>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-medium mb-1">Benefits</h4>
                    <p className="text-sm text-gray-300">{validator.benefits}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & Modularity Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Integration & <span className="text-purple-400">Modularity</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              PoPP is a composable infrastructure layer meant to be extended and embedded
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Integration Components</h3>
              <div className="space-y-4">
                {[
                  { name: "Webhook Support", desc: "Real-time alerts for institutions and civic organizations", icon: "🔗" },
                  { name: "Public Data Feeds", desc: "Live feed of validated issues via GraphQL/REST APIs", icon: "📊" },
                  { name: "Plugin Architecture", desc: "Embed PoPP modules directly into dApps and DAOs", icon: "🧩" },
                  { name: "Industry Modules", desc: "Sector-focused plugins for healthcare, education, environment", icon: "🏭" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Built For</h3>
              <div className="space-y-4">
                {[
                  { target: "Governments & City Councils", icon: "🏛️" },
                  { target: "NGOs & Humanitarian Groups", icon: "🤝" },
                  { target: "Civic Tech Developers", icon: "👨‍💻" },
                  { target: "Media Watchdogs", icon: "📢" },
                  { target: "Transparency Activists", icon: "🔍" },
                  { target: "Startups & Enterprises", icon: "🚀" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <span className="text-gray-300">{item.target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Philosophy & <span className="text-blue-400">Vision</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              PoPP is more than a protocol—it's a civilization-layer storytelling engine
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">The Four Pillars</h3>
              <div className="space-y-4">
                {[
                  { name: "Courage", desc: "Truth is dangerous. It takes courage to escalate it.", color: "red" },
                  { name: "Compassion", desc: "Problems are painful. The protocol must protect the weak.", color: "green" },
                  { name: "Humility", desc: "Validators can be wrong. The system must be self-healing.", color: "yellow" },
                  { name: "Duty", desc: "Memory is not optional. Remembering is a civic responsibility.", color: "blue" }
                ].map((pillar, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-8 h-8 bg-${pillar.color}-500 rounded-full flex-shrink-0 mt-1`}></div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{pillar.name}</h4>
                      <p className="text-gray-300">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Designing for 1,000 Years</h3>
              <p className="text-gray-300 mb-6">
                PoPP is not meant to be upgraded endlessly. It is meant to survive collapse, 
                outlive obsolescence, and transmit truth across centuries.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "📜", text: "Plaintext scroll format for libraries" },
                  { icon: "🪵", text: "Woodcut and ceramic records" },
                  { icon: "🧬", text: "DNA data encoding" },
                  { icon: "🛰️", text: "Orbital memory satellites" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Who <span className="text-purple-400">Needs</span> PoPP?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From grassroots activists to government institutions, PoPP serves diverse stakeholders
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Primary Users</h3>
              <div className="space-y-4">
                {[
                  { 
                    group: "Civic Activists & NGOs", 
                    needs: "Document issues, build evidence trails, escalate problems",
                    benefits: "Cryptographic proof, community validation, media amplification"
                  },
                  { 
                    group: "Government Agencies", 
                    needs: "Transparent issue tracking, public accountability, data-driven decisions",
                    benefits: "Real-time monitoring, automated reporting, public trust"
                  },
                  { 
                    group: "Media Organizations", 
                    needs: "Verified stories, fact-checking, investigative leads",
                    benefits: "Pre-validated content, source verification, community insights"
                  },
                  { 
                    group: "Legal Professionals", 
                    needs: "Evidence collection, case building, witness protection",
                    benefits: "Immutable records, anonymous submissions, chain of custody"
                  }
                ].map((user, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-white mb-2">{user.group}</h4>
                    <div className="text-sm space-y-1">
                      <div><span className="text-blue-400">Needs:</span> <span className="text-gray-300">{user.needs}</span></div>
                      <div><span className="text-green-400">Benefits:</span> <span className="text-gray-300">{user.benefits}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Secondary Stakeholders</h3>
              <div className="space-y-4">
                {[
                  { 
                    group: "Academic Researchers", 
                    desc: "Study civic engagement patterns and governance effectiveness"
                  },
                  { 
                    group: "Policy Makers", 
                    desc: "Data-driven policy formulation and impact assessment"
                  },
                  { 
                    group: "International Organizations", 
                    desc: "Cross-border transparency and human rights monitoring"
                  },
                  { 
                    group: "Private Sector", 
                    desc: "ESG compliance, stakeholder engagement, risk management"
                  },
                  { 
                    group: "Individual Citizens", 
                    desc: "Personal issue reporting and community participation"
                  },
                  { 
                    group: "Technology Developers", 
                    desc: "Build applications and integrations on PoPP infrastructure"
                  }
                ].map((stakeholder, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-white">{stakeholder.group}</h4>
                      <p className="text-sm text-gray-300">{stakeholder.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Economic Model Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Economic <span className="text-purple-400">Model</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Aligned incentives that reward truth, punish falsehood, and sustain the ecosystem
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Token Economics</h3>
              <div className="space-y-4">
                {[
                  { 
                    token: "PoPP Tokens", 
                    purpose: "Staking, governance, validator rewards",
                    distribution: "Validators, contributors, ecosystem fund"
                  },
                  { 
                    token: "PRS Credits", 
                    purpose: "Reputation scoring, validator ranking",
                    distribution: "Earned through successful validations"
                  },
                  { 
                    token: "Escalation Tokens", 
                    purpose: "Priority processing, media amplification",
                    distribution: "Purchased or earned through community contribution"
                  }
                ].map((token, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-white mb-2">{token.token}</h4>
                    <div className="text-sm space-y-1">
                      <div><span className="text-blue-400">Purpose:</span> <span className="text-gray-300">{token.purpose}</span></div>
                      <div><span className="text-green-400">Distribution:</span> <span className="text-gray-300">{token.distribution}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Incentive Mechanisms</h3>
              <div className="space-y-4">
                {[
                  { 
                    mechanism: "Validator Rewards", 
                    desc: "Tokens for successful validations, penalties for false positives"
                  },
                  { 
                    mechanism: "Reputation System", 
                    desc: "PRS credits build validator authority and influence"
                  },
                  { 
                    mechanism: "Escalation Funding", 
                    desc: "Community-funded amplification for critical issues"
                  },
                  { 
                    mechanism: "Governance Participation", 
                    desc: "Voting rights and proposal submission for active participants"
                  },
                  { 
                    mechanism: "Ecosystem Grants", 
                    desc: "Funding for developers, researchers, and community initiatives"
                  }
                ].map((incentive, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-white">{incentive.mechanism}</h4>
                      <p className="text-sm text-gray-300">{incentive.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
