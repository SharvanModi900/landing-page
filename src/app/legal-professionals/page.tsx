'use client';
import React from 'react';

export default function LegalProfessionalsPage() {
  const features = [
    {
      title: "Verified Case Evidence",
      desc: "Access problems and disputes validated through PoPP's protocol for legal accuracy.",
      icon: "⚖️",
    },
    {
      title: "Compliance Insights",
      desc: "Get actionable recommendations for regulatory and data compliance.",
      icon: "📜",
    },
    {
      title: "Efficient Documentation",
      desc: "Organize problem reports, proofs, and legal notes securely and systematically.",
      icon: "🗂️",
    },
    {
      title: "Collaboration & Advisory",
      desc: "Work with civic activists, NGOs, and government agencies to provide guidance.",
      icon: "🤝",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Receive Verified Problems",
      desc: "Access issues verified by PoPP's decentralized protocol, ready for legal review.",
      icon: "📩",
    },
    {
      step: "2",
      title: "Analyze & Advise",
      desc: "Evaluate legal implications and provide guidance to stakeholders.",
      icon: "🔍",
    },
    {
      step: "3",
      title: "Document & Resolve",
      desc: "Log case documentation and coordinate resolutions with authorities.",
      icon: "📝",
    },
    {
      step: "4",
      title: "Ensure Compliance",
      desc: "Track legal compliance and generate reports for audits.",
      icon: "✅",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Empower Legal Professionals
            </h1>
            <p className="text-gray-400 text-lg">
              PoPP equips lawyers, compliance officers, and legal teams with verified problem reports,
              secure documentation, and insights to ensure lawful resolution and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Access Verified Cases
              </button>
              <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 border-4 border-cyan-500/30 rounded-full flex items-center justify-center text-5xl">
              ⚖️
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white/[0.03] border-y border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-cyan-400">
            PoPP Process Flow for Legal Teams
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
    </div>
  );
}
