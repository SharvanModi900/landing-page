'use client';
import React, { useState } from 'react';
import { FileText, ShieldCheck, Search, Download, Layers, Server, Users } from 'lucide-react';

export default function AuditReportsPage() {
  const [query, setQuery] = useState("");

  const reports = [
    {
      title: "Core Protocol Security Audit",
      category: "Security",
      summary: "Independent audit of PoPP consensus and validator node safety.",
      auditor: "CertiK",
      date: "2025-05-14",
      link: "/reports/core-security.pdf"
    },
    {
      title: "Tokenomics Sustainability Review",
      category: "Tokenomics",
      summary: "Evaluation of staking rewards, inflation models, and incentive stability.",
      auditor: "Delphi Research",
      date: "2025-04-02",
      link: "/reports/tokenomics-review.pdf"
    },
    {
      title: "Governance Process Audit",
      category: "Governance",
      summary: "Assessment of voting processes, quorum thresholds, and proposal lifecycle.",
      auditor: "OpenGov Labs",
      date: "2025-03-10",
      link: "/reports/governance-audit.pdf"
    },
    {
      title: "Infrastructure & Node Reliability",
      category: "Infrastructure",
      summary: "Resilience check of validator nodes, APIs, and load balancing.",
      auditor: "Trail of Bits",
      date: "2025-02-21",
      link: "/reports/infrastructure.pdf"
    },
  ];

  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase()) ||
    r.auditor.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white min-h-screen">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Audit Reports
          </h1>
          <p className="text-lg text-gray-300 mt-6">
            Independent audits ensure PoPP remains secure, fair, and transparent.  
            Explore completed reports covering protocol security, tokenomics, governance, and infrastructure.
          </p>
        </div>
        {/* Illustration */}
        <div className="relative flex justify-center">
          <div className="w-72 h-72 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl absolute animate-pulse-slow"></div>
          <ShieldCheck className="w-44 h-44 relative text-blue-400" strokeWidth={1.5} />
        </div>
      </div>

      {/* Search */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search reports by title, category, or auditor..."
            className="bg-transparent w-full focus:outline-none text-gray-200"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReports.map((r, idx) => (
          <div key={idx} className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl shadow hover:shadow-lg transition group">
            <FileText className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">{r.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{r.summary}</p>
            <p className="text-xs text-gray-500 mb-2">Auditor: <span className="text-gray-300">{r.auditor}</span></p>
            <p className="text-xs text-gray-500 mb-4">Date: {r.date}</p>
            <a href={r.link} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-sm font-semibold hover:scale-105 transition">
              <Download className="w-4 h-4" /> Download Report
            </a>
          </div>
        ))}
      </div>

      {/* Workflow Diagram */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Audit Lifecycle</h2>
        <div className="relative">
          <svg viewBox="0 0 800 200" className="w-full h-48">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path
              d="M50 100 Q200 20, 400 100 T750 100"
              stroke="url(#lineGrad)"
              strokeWidth="4"
              fill="none"
            />
            {["Initiate", "Audit", "Verify", "Publish", "Monitor"].map((step, i) => (
              <g key={i}>
                <circle cx={50 + i * 180} cy={100} r="25" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x={50 + i * 180} y={105} textAnchor="middle" className="fill-white text-sm font-semibold">{step}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Transparency Note */}
      <div className="text-center py-20 bg-slate-900/50 border-t border-slate-800">
        <h3 className="text-2xl font-bold mb-4">Commitment to Transparency</h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Audit reports are published to keep the ecosystem open and accountable.  
          Every critical component of PoPP is subject to independent review, ensuring trust and resilience.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg hover:scale-105 transition font-semibold">
          Subscribe for Audit Updates
        </button>
      </div>
    </section>
  );
}
