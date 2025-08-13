// pages/case-studies.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Case Studies - Domain Focused Page
 * - Put this file in `pages/case-studies.tsx` (pages router)
 *   or in `app/case-studies/page.tsx` (app router)
 * - Requires Tailwind CSS.
 * - Optional: framer-motion for small animations (npm i framer-motion)
 */

/* --- Sample domain data --- */
const DOMAINS = [
  {
    id: "tech",
    name: "Technology & Innovation",
    short: "Scaling systems, platform design, developer tooling",
    problems: [
      "High-latency data pipelines",
      "Interoperability across protocols",
      "Reliable upgradeable on-chain infra",
    ],
    submissions: 124,
    resolvedRate: 0.85,
  },
  {
    id: "health",
    name: "Healthcare & Medicine",
    short: "Clinical workflows, data privacy, patient outreach",
    problems: [
      "Secure medical-data sharing",
      "Remote diagnostics accuracy",
      "Clinical trial recruitment",
    ],
    submissions: 87,
    resolvedRate: 0.72,
  },
  {
    id: "env",
    name: "Environment & Climate",
    short: "Carbon accounting, monitoring, remediation tech",
    problems: [
      "Low-cost air quality sensing",
      "Transparent carbon credits",
      "Community-driven restoration projects",
    ],
    submissions: 63,
    resolvedRate: 0.78,
  },
  {
    id: "edu",
    name: "Education & Learning",
    short: "Remote learning, credentialing, curriculum design",
    problems: [
      "Micro-credential interoperability",
      "Adaptive learning models",
      "Access for low-bandwidth regions",
    ],
    submissions: 95,
    resolvedRate: 0.88,
  },
  {
    id: "infra",
    name: "Infrastructure & Urban",
    short: "Utilities, mobility, civic services",
    problems: [
      "Decentralized transit payment",
      "Citizen reporting workflows",
      "Edge resilience for utilities",
    ],
    submissions: 53,
    resolvedRate: 0.65,
  },
  {
    id: "gov",
    name: "Social Impact & Governance",
    short: "Policy tooling, transparency, participatory gov",
    problems: [
      "Voter verifiability",
      "Budget transparency pipelines",
      "Community prioritization systems",
    ],
    submissions: 142,
    resolvedRate: 0.92,
  },
  {
    id: "space",
    name: "Space & Aerospace",
    short: "Telemetry, mission ops, distributed sensors",
    problems: [
      "Low-latency telemetry network",
      "Crowdsourced anomaly detection",
      "Inter-satellite coordination",
    ],
    submissions: 21,
    resolvedRate: 0.6,
  },
];

const FEATURED = [
  {
    title: "Reducing Hospital Wait Times with Tele-Triage",
    domain: "Healthcare",
    impact: "40% faster triage",
    summary:
      "Pilot integrated tele-triage + community volunteers to prioritize urgent cases, reducing onsite wait times and unnecessary ER visits.",
  },
  {
    title: "Community Carbon Credits Marketplace",
    domain: "Environment",
    impact: "$2.6M value created",
    summary:
      "Local restoration projects tokenized into verifiable credits with community governance and on-chain transparency.",
  },
  {
    title: "Decentralized Research Collaboration",
    domain: "Education",
    impact: "5x faster data sharing",
    summary:
      "A federated research platform enabled reproducible pipelines across universities while preserving data privacy.",
  },
];

/* --- Small helper components --- */
function DomainPill({
  name,
  onHover,
  onLeave,
  onClick,
  active,
}: {
  name: string;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm border transition ${
        active
          ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-black shadow-lg border-transparent"
          : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/6"
      }`}
    >
      {name}
    </button>
  );
}

/* --- Page --- */
export default function CaseStudiesDomainsPage() {
  const [activeDomain, setActiveDomain] = useState(DOMAINS[0]);
  const [modalDomain, setModalDomain] = useState<typeof DOMAINS[0] | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

  const totals = DOMAINS.reduce(
    (acc, d) => {
      acc.submissions += d.submissions;
      acc.resolved += d.resolvedRate * d.submissions;
      return acc;
    },
    { submissions: 0, resolved: 0 }
  );
  const overallResolvedRate = totals.submissions
    ? Math.round((totals.resolved / totals.submissions) * 100)
    : 0;

  const filteredDomains = DOMAINS.filter((d) =>
    d.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-10">
        <div className="absolute -left-32 -top-24 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/20 to-pink-500/10 blur-3xl" />
        <div className="absolute right-0 top-8 w-72 h-72 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-400/6 blur-2xl" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Real Problems. Real Solutions.
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                Submit problems across any domain — technology, healthcare,
                environment, governance and more. See how our community prioritizes,
                builds, and validates solutions with measurable impact.
              </p>

              {/* search + quick filters */}
              <div className="mt-6 flex flex-wrap gap-3 items-center">
                <div className="flex items-center bg-white/6 border border-white/10 rounded-full px-3 py-2 gap-2">
                  <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <input
                    placeholder="Search domains or problems (e.g. 'carbon', 'telemetry')"
                    className="bg-transparent outline-none text-sm placeholder:text-gray-400 text-gray-100 w-72"
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                  />
                </div>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-white/6 border border-white/10 text-sm rounded-full px-3 py-2"
                >
                  <option>All</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>

                <a
                  href="#submit"
                  className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-black font-semibold shadow-lg"
                >
                  Submit a Problem
                </a>
              </div>

              {/* domain pills row */}
              <div className="mt-6 flex flex-wrap gap-3">
                {DOMAINS.map((d) => (
                  <DomainPill
                    key={d.id}
                    name={d.name.split(" ")[0]}
                    onHover={() => setActiveDomain(d)}
                    onLeave={() => {}}
                    onClick={() => setModalDomain(d)}
                    active={activeDomain.id === d.id}
                  />
                ))}
              </div>

              {/* impact strip */}
              <div className="mt-8 flex gap-4 items-center">
                <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10 flex items-center gap-4">
                  <div className="text-sm text-gray-300">Total Submissions</div>
                  <div className="text-2xl font-bold">{totals.submissions}</div>
                </div>
                <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10 flex items-center gap-4">
                  <div className="text-sm text-gray-300">Avg Resolved Rate</div>
                  <div className="text-2xl font-bold">{overallResolvedRate}%</div>
                </div>
                <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-sm text-gray-300">Active Domains</div>
                  <div className="text-2xl font-bold">{DOMAINS.length}</div>
                </div>
              </div>
            </div>

            {/* radial domain map & details */}
            <div className="md:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                {/* Radial interactive map (SVG with domain icons around circle) */}
                <div className="bg-white/6 rounded-2xl p-6 border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-gray-300">Domain Map</div>
                      <div className="font-semibold">Explore by Domain</div>
                    </div>
                    <div className="text-sm text-gray-300">Hover to preview • Click to open</div>
                  </div>

                  <div className="flex items-center justify-center">
                    <svg viewBox="0 0 320 320" className="w-72 h-72">
                      <defs>
                        <linearGradient id="g1" x1="0" x2="1">
                          <stop offset="0" stopColor="#7c3aed" />
                          <stop offset="1" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>

                      <g transform="translate(160,160)">
                        {/* central circle */}
                        <circle r="70" fill="url(#g1)" opacity="0.12" />
                        <text x="0" y="6" textAnchor="middle" className="text-sm fill-white" style={{fontSize:12}} >
                          Submit a Problem
                        </text>

                        {/* domain nodes positioned around circle */}
                        {DOMAINS.map((d, i) => {
                          const angle = (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
                          const x = Math.cos(angle) * 110;
                          const y = Math.sin(angle) * 110;
                          const isActive = activeDomain.id === d.id;
                          return (
                            <g
                              key={d.id}
                              transform={`translate(${x}, ${y})`}
                              onMouseEnter={() => setActiveDomain(d)}
                              onClick={() => setModalDomain(d)}
                              style={{ cursor: "pointer" }}
                            >
                              <circle r={isActive ? 20 : 16} fill={isActive ? "#7c3aed" : "#ffffff10"} stroke={isActive ? "#ec4899" : "#ffffff20"} strokeWidth={isActive ? 3 : 1} />
                              <text x={0} y={4} textAnchor="middle" style={{ fontSize: 9, fill: isActive ? "#fff" : "#ddd" }}>
                                {d.id.toUpperCase()}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    </svg>
                  </div>

                  {/* small domain preview */}
                  <div className="mt-4 bg-white/4 p-3 rounded-lg border border-white/6">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 mt-1" />
                      <div>
                        <div className="text-sm font-semibold">{activeDomain.name}</div>
                        <div className="text-xs text-gray-300">{activeDomain.short}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          Submissions: <span className="font-medium">{activeDomain.submissions}</span>{" "}
                          • Resolved: <span className="font-medium">{Math.round(activeDomain.resolvedRate * 100)}%</span>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => setModalDomain(activeDomain)}
                            className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-black text-sm font-semibold"
                          >
                            View Examples
                          </button>
                          <a
                            href="#submit"
                            className="px-3 py-1 rounded-full bg-white/5 text-sm border border-white/10"
                          >
                            Submit Problem
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HUD style mini-chart below radial */}
                <div className="mt-4 bg-black/60 rounded-xl p-4 border border-white/6 shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-300">Domain Activity (this year)</div>
                    <div className="text-xs text-gray-400">Updates • Resolutions</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {DOMAINS.slice(0, 6).map((d) => (
                      <div key={d.id} className="text-xs">
                        <div className="text-gray-300">{d.name.split(" ")[0]}</div>
                        <div className="mt-2 h-2 bg-white/6 rounded-full">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                            style={{ width: `${Math.min(100, (d.submissions / 2) || 10)}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{d.submissions} subs</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED IMPACT SLIDER */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-4">Featured Impact Stories</h2>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {FEATURED.map((f, i) => (
                <motion.article
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="min-w-[360px] bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg flex-shrink-0"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-gray-300">Impact • {f.domain}</div>
                      <h3 className="text-xl font-semibold mt-2">{f.title}</h3>
                      <p className="text-gray-300 mt-3">{f.summary}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-300">Outcome</div>
                      <div className="text-xl font-bold text-indigo-300 mt-2">{f.impact}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a className="px-3 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-black font-semibold">Read Story</a>
                    <a className="px-3 py-2 rounded-full bg-white/5">Share</a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DATA VISUALIZATION (HUD style) */}
      <section className="py-10 bg-gradient-to-b from-transparent to-white/2">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Domain Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/8">
              <div className="text-sm text-gray-300">Submission distribution</div>
              <div className="mt-4 space-y-3">
                {DOMAINS.map((d) => (
                  <div key={d.id} className="flex items-center justify-between">
                    <div className="text-sm">{d.name}</div>
                    <div className="ml-4 flex-1 mx-4 bg-white/6 h-3 rounded-full relative">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                        style={{ width: `${Math.min(100, (d.submissions / totals.submissions) * 100)}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-300 w-12 text-right">{d.submissions}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/8">
              <div className="text-sm text-gray-300">Resolution rate</div>
              <div className="mt-4 grid gap-3">
                {DOMAINS.map((d) => (
                  <div key={d.id} className="flex items-center gap-3">
                    <div className="text-sm w-28">{d.name.split(" ")[0]}</div>
                    <div className="flex-1 bg-white/6 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-green-400 to-teal-400"
                        style={{ width: `${Math.round(d.resolvedRate * 100)}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-300 w-12 text-right">{Math.round(d.resolvedRate * 100)}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/8">
              <div className="text-sm text-gray-300">Quick Stats</div>
              <div className="mt-4 grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300">Total submissions</div>
                  <div className="font-semibold">{totals.submissions}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300">Avg resolution</div>
                  <div className="font-semibold">{overallResolvedRate}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300">Active domains</div>
                  <div className="font-semibold">{DOMAINS.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="submit" className="py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Have a real problem that needs solving?</h3>
            <p className="text-gray-300 max-w-xl mt-2">
              Submit the problem across any domain. Our community will review, prioritize,
              and propose validated solutions — with measurable impact tracking.
            </p>
          </div>
          <div className="flex gap-3">
            <a className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-black font-semibold">Submit Problem</a>
            <a className="px-6 py-3 rounded-full bg-white/6 border">Talk to an Expert</a>
          </div>
        </div>
      </section>

      {/* Modal for domain examples */}
      {modalDomain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setModalDomain(null)} />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 max-w-3xl w-full bg-slate-900 rounded-2xl p-6 border border-white/10 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{modalDomain.name}</h3>
                <div className="text-sm text-gray-300 mt-1">{modalDomain.short}</div>
              </div>
              <button className="text-gray-300" onClick={() => setModalDomain(null)}>Close</button>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-300 mb-2">Representative Problems</div>
                <ul className="list-disc ml-4 text-gray-300">
                  {modalDomain.problems.map((p, i) => (
                    <li key={i} className="mb-1">{p}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a className="px-3 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-black">Submit Similar Problem</a>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-2">Example Case Studies</div>
                <div className="space-y-3">
                  {/* for demo - reuse FEATURED or generate stub */}
                  {FEATURED.filter((f) => f.domain.toLowerCase().includes(modalDomain.name.split(" ")[0].toLowerCase())).length ? (
                    FEATURED.filter((f) => f.domain.toLowerCase().includes(modalDomain.name.split(" ")[0].toLowerCase())).map((f, idx) => (
                      <div key={idx} className="bg-white/4 p-3 rounded-lg">
                        <div className="text-sm font-semibold">{f.title}</div>
                        <div className="text-xs text-gray-300 mt-1">{f.summary}</div>
                        <div className="mt-2 text-sm text-indigo-300">{f.impact}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400">No public case studies available. Be the first to submit!</div>
                  )}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </main>
  );
}
