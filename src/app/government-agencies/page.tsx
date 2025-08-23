'use client';
import React from 'react';

export default function GovernmentAgenciesPage() {
  const features = [
    {
      title: "Centralized Oversight",
      desc: "Monitor and track verified problems across regions with transparency.",
      icon: "🏛️",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "Automated Proof Verification",
      desc: "Leverage cryptographic proofs for accurate and tamper-proof validation.",
      icon: "🔒",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Policy & Compliance",
      desc: "Ensure submitted reports meet legal and regulatory requirements.",
      icon: "📜",
      gradient: "from-green-400 to-teal-400",
    },
    {
      title: "Data Analytics & Insights",
      desc: "Extract actionable insights from validated problem reports.",
      icon: "📊",
      gradient: "from-yellow-400 to-orange-400",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Receive Problem Reports",
      desc: "Government agencies get verified issues directly from PoPP.",
      icon: "📩",
    },
    {
      step: "2",
      title: "Validate & Audit",
      desc: "Ensure compliance with laws and verify problem authenticity.",
      icon: "🛡️",
    },
    {
      step: "3",
      title: "Assign & Escalate",
      desc: "Delegate problems to the relevant department or authority.",
      icon: "⚡",
    },
    {
      step: "4",
      title: "Track Impact",
      desc: "Monitor resolution and impact metrics in real time.",
      icon: "📈",
    },
  ];

  const stats = [
    { value: "500+", label: "Agencies Using PoPP" },
    { value: "50K+", label: "Problems Verified" },
    { value: "200+", label: "Policy Changes Implemented" },
  ];

  const partners = ["🏛️ Gov Agency One", "🏢 Department X", "🌐 Civic Office", "🛡️ Compliance Board"];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
            Empower Government Agencies
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            PoPP equips government agencies with tools to receive, validate, and act on reported problems securely, efficiently, and transparently.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
              View Dashboard
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 400 400" className="w-96 h-96">
            <circle cx="200" cy="200" r="150" fill="url(#grad1)" opacity="0.2" />
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
              <radialGradient id="gradGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00c6ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0072ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200"
              stroke="#00c6ff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {[0, 1, 2, 3].map((i) => (
              <circle
                key={i}
                cx={50 + i * 75}
                cy={200}
                r="12"
                fill="url(#gradGlow)"
                className={`animate-[moveProblem_6s_linear_infinite]`}
                style={{ animationDelay: `${i * 1.5}s` }}
              />
            ))}
            <style jsx>{`
              @keyframes moveProblem_6s_linear_infinite {
                0% { offset-distance: 0%; }
                100% { offset-distance: 100%; }
              }
              circle {
                offset-path: path("M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200");
                offset-rotate: auto;
              }
            `}</style>
          </svg>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          PoPP Process Flow for Agencies
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {processSteps.map((s, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F1E]/80 p-6 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-300 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg hover:scale-105 transition-transform`}
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-bold text-xl mb-2">{f.title}</h3>
            <p className="text-gray-100 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-black py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F1E]/70 p-8 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform"
            >
              <h3 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                {stat.value}
              </h3>
              <p className="text-gray-300 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 text-center bg-[#050B16] rounded-3xl mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          Join the PoPP Government Network
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Leverage PoPP for secure problem reporting, validation, and actionable insights at scale.
        </p>
        <div className="flex justify-center gap-6">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
            Request Access
          </button>
          <button className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
            Contact Sales
          </button>
        </div>
      </section>

      {/* Partners Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          Trusted by Government Agencies
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((org, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F1E]/70 p-6 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform text-white font-semibold"
            >
              {org}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
