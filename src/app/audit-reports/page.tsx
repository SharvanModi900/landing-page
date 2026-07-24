'use client';
import React, { useState } from 'react';
import { FileText, ShieldCheck, Search, Download } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Audit Reports
              </span>
            </h1>
            <p className="text-gray-400 mt-4">
              Independent audits ensure PoPP remains secure, fair, and transparent.
              Explore completed reports covering protocol security, tokenomics, governance, and infrastructure.
            </p>
          </div>
          <div className="relative flex justify-center">
            <ShieldCheck className="w-32 h-32 text-cyan-500/30" strokeWidth={1.5} />
          </div>
        </div>

        {/* Search */}
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
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
        <div className="max-w-6xl mx-auto px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((r, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <FileText className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{r.summary}</p>
              <p className="text-xs text-gray-500 mb-1">Auditor: <span className="text-gray-300">{r.auditor}</span></p>
              <p className="text-xs text-gray-500 mb-3">Date: {r.date}</p>
              <a href={r.link} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">
                <Download className="w-4 h-4" /> Download Report
              </a>
            </div>
          ))}
        </div>

        {/* Workflow Diagram */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Audit Lifecycle</h2>
          <div className="relative">
            <svg viewBox="0 0 800 200" className="w-full h-48">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
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
                  <circle cx={50 + i * 180} cy={100} r="25" fill="#030712" stroke="#06b6d4" strokeWidth="2" />
                  <text x={50 + i * 180} y={105} textAnchor="middle" className="fill-white text-sm font-semibold">{step}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Transparency Note */}
        <div className="text-center py-12 border-t border-white/10">
          <h3 className="text-2xl font-bold mb-3">Commitment to Transparency</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4">
            Audit reports are published to keep the ecosystem open and accountable.
            Every critical component of PoPP is subject to independent review, ensuring trust and resilience.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
            Subscribe for Audit Updates
          </button>
        </div>
      </div>
    </div>
  );
}
