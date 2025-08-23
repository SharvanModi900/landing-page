'use client';
import React from 'react';
import { Shield, Users, Scale, CheckCircle, Book, FileCheck, Workflow, Lock } from 'lucide-react';

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
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white min-h-screen">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Best Practices for PoPP
          </h1>
          <p className="text-lg text-gray-300">
            PoPP thrives on secure, ethical, and transparent participation.  
            These best practices guide contributors, civic activists, NGOs, media, and researchers  
            to responsibly document, validate, and escalate problems.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:scale-105 transition font-semibold">
              View Security Guidelines
            </button>
            <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold">
              Join Community
            </button>
          </div>
        </div>
        {/* Illustration */}
        <div className="relative flex justify-center">
          <div className="w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl absolute animate-pulse-slow"></div>
          <Shield className="w-48 h-48 relative text-purple-400" strokeWidth={1.5} />
        </div>
      </div>

      {/* Principles */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Core Principles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((p, idx) => (
            <div key={idx} className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl shadow hover:shadow-lg hover:scale-105 transition">
              <p.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contributor Best Practices */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-bold mb-8">Contributor Best Practices</h2>
        <ul className="space-y-4">
          {contributorChecklist.map((c, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
              <span className="text-gray-200">{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Security Reporting Practices */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-bold mb-6">Security Reporting Practices</h2>
        <p className="text-gray-300 mb-6">
          Vulnerabilities must be reported responsibly. Use our{" "}
          <span className="text-purple-400">PGP key</span> for encrypted submissions  
          and follow the disclosure guidelines outlined in our{" "}
          <a href="/vulnerability-disclosures" className="underline text-blue-400">Vulnerability Disclosures</a> page.
        </p>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <code className="block text-sm text-gray-300 whitespace-pre-wrap">
            -----BEGIN PGP PUBLIC KEY BLOCK-----  
            (example truncated key)  
            -----END PGP PUBLIC KEY BLOCK-----
          </code>
        </div>
      </div>

      {/* Workflow Diagram */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Responsible Workflow</h2>
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
            {["Report", "Validate", "Escalate", "Resolve", "Publish"].map((step, i) => (
              <g key={i}>
                <circle cx={50 + i * 180} cy={100} r="25" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x={50 + i * 180} y={105} textAnchor="middle" className="fill-white text-sm font-semibold">{step}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-bold mb-8">Community Interaction Guidelines</h2>
        <ul className="space-y-4">
          {communityGuidelines.map((c, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-blue-400 mt-1" />
              <span className="text-gray-200">{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Closing */}
      <div className="text-center py-20 bg-slate-900/50 border-t border-slate-800">
        <h3 className="text-2xl font-bold mb-4">Contribute Responsibly</h3>
        <p className="text-gray-400 mb-6">Together, we ensure PoPP remains secure, ethical, and effective.</p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg hover:scale-105 transition font-semibold">
            Start Contributing
          </button>
          <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
            Download Handbook
          </button>
        </div>
      </div>
    </section>
  );
}
