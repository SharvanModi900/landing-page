'use client';
import React from 'react';

export default function LegalProfessionalsPage() {
  const features = [
    {
      title: "Verified Case Evidence",
      desc: "Access problems and disputes validated through PoPP's protocol for legal accuracy.",
      icon: "⚖️",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Compliance Insights",
      desc: "Get actionable recommendations for regulatory and data compliance.",
      icon: "📜",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Efficient Documentation",
      desc: "Organize problem reports, proofs, and legal notes securely and systematically.",
      icon: "🗂️",
      gradient: "from-green-400 to-teal-400",
    },
    {
      title: "Collaboration & Advisory",
      desc: "Work with civic activists, NGOs, and government agencies to provide guidance.",
      icon: "🤝",
      gradient: "from-yellow-400 to-orange-400",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Receive Verified Problems",
      desc: "Access issues verified by PoPP’s decentralized protocol, ready for legal review.",
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
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Empower Legal Professionals
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            PoPP equips lawyers, compliance officers, and legal teams with verified problem reports,
            secure documentation, and insights to ensure lawful resolution and compliance.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
              Access Verified Cases
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side SVG Process */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 400 400" className="w-96 h-96">
            <circle cx="200" cy="200" r="150" fill="url(#grad1)" opacity="0.2" />
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <radialGradient id="gradGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200"
              stroke="#8b5cf6"
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          PoPP Process Flow for Legal Teams
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
    </div>
  );
}
