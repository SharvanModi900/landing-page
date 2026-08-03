'use client';
import React from 'react';
import { Shield, Users, Scale, CheckCircle, Book, FileCheck, Workflow, Lock } from 'lucide-react';
import Link from 'next/link';

export default function BestPracticesPage() {
  const principles = [
    { icon: Shield, title: "Security First", desc: "Always encrypt sensitive data (PGP, HTTPS) and use secure channels." },
    { icon: FileCheck, title: "Accuracy", desc: "Verify facts and sources before submitting problems or disclosures." },
    { icon: Users, title: "Collaboration", desc: "Work respectfully with NGOs, citizens, and authorities." },
    { icon: Scale, title: "Legal Compliance", desc: "Respect local and international laws when reporting issues." },
    { icon: Workflow, title: "Transparency", desc: "Keep processes open, traceable, and auditable where possible." },
    { icon: Book, title: "Minimal Disruption", desc: "Ensure reporting avoids unintended harm or misinformation." },
  ];

  const contributorChecklist = [
    "Use GitHub Issues only for reproducible, verifiable problems.",
    "Always provide PoPP IDs or reference links in reports.",
    "Respect responsible disclosure timelines (90 days standard).",
    "Test fixes locally before submitting pull requests.",
    "Coordinate with community moderators before escalating sensitive cases.",
  ];

  const communityGuidelines = [
    "Critique problems, not people.",
    "Respect diverse backgrounds, languages, and contexts.",
    "Avoid spam, duplicate reports, or irrelevant commentary.",
    "Uphold open knowledge sharing, but protect personal data.",
    "Promote constructive dialogue and collaboration.",
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Best Practices for PoPP
              </span>
            </h1>
            <p className="text-gray-400 mt-4">
              PoPP thrives on secure, ethical, and transparent participation.
              These best practices guide contributors, civic activists, NGOs, media, and researchers
              to responsibly document, validate, and escalate problems.
            </p>
            <div className="flex gap-3 mt-4">
              <Link href="/security">
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-sm">
                  View Security Guidelines
                </button>
              </Link>
              <Link href="/community">
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm">
                  Join Community
                </button>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <Shield className="w-32 h-32 text-cyan-500/30" strokeWidth={1.5} />
          </div>
        </div>

        {/* Principles */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Core Principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p.icon className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contributor Best Practices */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-4">Contributor Best Practices</h2>
          <ul className="space-y-3">
            {contributorChecklist.map((c, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                <span className="text-gray-400">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Security Reporting Practices */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-3">Security Reporting Practices</h2>
          <p className="text-gray-400 mb-4">
            Vulnerabilities must be reported responsibly. Use our{" "}
            <span className="text-cyan-400">PGP key</span> for encrypted submissions
            and follow the disclosure guidelines outlined in our{" "}
            <Link href="/vulnerability-disclosures" className="underline text-blue-400">Vulnerability Disclosures</Link> page.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <code className="block text-sm text-gray-300 whitespace-pre-wrap">
              -----BEGIN PGP PUBLIC KEY BLOCK-----{"\n"}
              (example truncated key){"\n"}
              -----END PGP PUBLIC KEY BLOCK-----
            </code>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Responsible Workflow</h2>
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
              {["Report", "Validate", "Escalate", "Resolve", "Publish"].map((step, i) => (
                <g key={i}>
                  <circle cx={50 + i * 180} cy={100} r="25" fill="#030712" stroke="#06b6d4" strokeWidth="2" />
                  <text x={50 + i * 180} y={105} textAnchor="middle" className="fill-white text-sm font-semibold">{step}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-4">Community Interaction Guidelines</h2>
          <ul className="space-y-3">
            {communityGuidelines.map((c, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
                <span className="text-gray-400">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing */}
        <div className="text-center py-12 border-t border-white/10">
          <h3 className="text-2xl font-bold mb-3">Contribute Responsibly</h3>
          <p className="text-gray-400 mb-4">Together, we ensure PoPP remains secure, ethical, and effective.</p>
          <div className="flex justify-center gap-3">
            <Link href="/contribute">
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Start Contributing
              </button>
            </Link>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
              Download Handbook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
