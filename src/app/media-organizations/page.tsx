'use client';
import React from 'react';

export default function MediaOrganizationsPage() {
  const features = [
    {
      title: "Verified Story Sources",
      desc: "Access problems validated by PoPP to ensure authenticity before publishing.",
      icon: "📰",
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      title: "Real-Time Updates",
      desc: "Receive live notifications when new problems are verified and escalated.",
      icon: "⚡",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      title: "Collaborative Investigations",
      desc: "Work with activists, NGOs, and authorities to uncover deeper insights.",
      icon: "🤝",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Impact Metrics",
      desc: "Track the reach, engagement, and resolution of published reports.",
      icon: "📊",
      gradient: "from-green-400 to-teal-400",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Receive Verified Problems",
      desc: "Media organizations get reports vetted by PoPP’s validation protocol.",
      icon: "📩",
    },
    {
      step: "2",
      title: "Investigate & Collaborate",
      desc: "Coordinate with sources, NGOs, and civic activists for deep dives.",
      icon: "🔍",
    },
    {
      step: "3",
      title: "Publish Responsibly",
      desc: "Share stories with verified facts and proper citations.",
      icon: "📝",
    },
    {
      step: "4",
      title: "Amplify Impact",
      desc: "Reach audiences effectively and track engagement metrics.",
      icon: "📈",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
            Empower Media Organizations
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            PoPP helps journalists and media outlets access verified problems, collaborate with credible sources, and amplify stories responsibly.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
              Get Verified Reports
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 400 400" className="w-96 h-96">
            <circle cx="200" cy="200" r="150" fill="url(#grad1)" opacity="0.2" />
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffcd3c" />
                <stop offset="100%" stopColor="#ff6a00" />
              </linearGradient>
              <radialGradient id="gradGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffcd3c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200"
              stroke="#ffcd3c"
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
          PoPP Process Flow for Media
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
