'use client';
import React from 'react';

export default function MediaOrganizationsPage() {
  const features = [
    {
      title: "Verified Story Sources",
      desc: "Access problems validated by PoPP to ensure authenticity before publishing.",
      icon: "📰",
    },
    {
      title: "Real-Time Updates",
      desc: "Receive live notifications when new problems are verified and escalated.",
      icon: "⚡",
    },
    {
      title: "Collaborative Investigations",
      desc: "Work with activists, NGOs, and authorities to uncover deeper insights.",
      icon: "🤝",
    },
    {
      title: "Impact Metrics",
      desc: "Track the reach, engagement, and resolution of published reports.",
      icon: "📊",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Receive Verified Problems",
      desc: "Media organizations get reports vetted by PoPP's validation protocol.",
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
    <div className="min-h-screen bg-[#030712] text-white pt-16 overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Empower Media Organizations
            </h1>
            <p className="text-gray-400 text-lg">
              PoPP helps journalists and media outlets access verified problems, collaborate with credible sources, and amplify stories responsibly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Get Verified Reports
              </button>
              <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 border-4 border-cyan-500/30 rounded-full flex items-center justify-center text-5xl">
              📰
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white/[0.03] border-y border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-cyan-400">
            PoPP Process Flow for Media
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
