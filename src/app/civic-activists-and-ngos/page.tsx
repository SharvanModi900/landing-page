'use client';
import React from 'react';

export default function CivicActivistsPage() {
  const features = [
    {
      title: "Document Issues",
      desc: "Capture events, evidence, and reports securely and immutably.",
      icon: "📄",
    },
    {
      title: "Escalate Problems",
      desc: "Push verified issues to authorities, media, and community channels.",
      icon: "⚡",
    },
    {
      title: "Community Validation",
      desc: "Engage citizens to verify reports and strengthen credibility.",
      icon: "🤝",
    },
    {
      title: "Media Amplification",
      desc: "Share verified content with press and NGOs for wider impact.",
      icon: "📰",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Report Issues",
      desc: "Submit problems securely with verifiable data.",
      icon: "📝",
    },
    {
      step: "2",
      title: "Generate Proof",
      desc: "Cryptographically secure proofs generated automatically.",
      icon: "🔒",
    },
    {
      step: "3",
      title: "Validate",
      desc: "Community & NGO validation ensures trustworthiness.",
      icon: "✅",
    },
    {
      step: "4",
      title: "Escalate & Reward",
      desc: "Escalate critical problems and earn recognition.",
      icon: "⚡",
    },
  ];

  const stats = [
    { value: "12K+", label: "Problems Documented" },
    { value: "4K+", label: "Validated Reports" },
    { value: "1.2M", label: "People Impacted" },
  ];

  const partners = ["🌐 NGO One", "🤝 Civic Alliance", "📢 Community Org", "🏛️ Policy Group"];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Empower Civic Activists & NGOs
            </h1>
            <p className="text-gray-400 text-lg">
              PoPP provides activists and NGOs with tools to document, validate, and escalate problems
              securely, transparently, and efficiently—turning local issues into global impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Submit a Problem
              </button>
              <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 border-4 border-cyan-500/30 rounded-full flex items-center justify-center text-5xl">
              📢
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white/[0.03] border-y border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-cyan-400">
            How PoPP Helps Civic Activists & NGOs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {processSteps.map((s, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-white/[0.03] border-y border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-3xl font-extrabold text-cyan-400">{stat.value}</h3>
              <p className="text-gray-400 mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Get Involved Today</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join the PoPP ecosystem. Submit problems, validate reports, and help create a transparent, accountable, and safe society.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
              Submit a Problem
            </button>
            <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
              Join as Validator
            </button>
          </div>
        </div>
      </section>

      <div className="bg-white/[0.03] border-y border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">
            Trusted by Civic Organizations
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((org, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 font-semibold text-sm">
                {org}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
