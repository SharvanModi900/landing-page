'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function IncentiveStructuresPage() {
  const incentiveTypes = [
    {
      title: "Direct Rewards",
      desc: "Token incentives for validators and contributors upon successful problem validation.",
      icon: "💰",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Reputation & Governance",
      desc: "Reputation points build influence in PoPP DAO governance and voting.",
      icon: "🛡️",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      title: "Social Incentives",
      desc: "Recognition badges, leaderboard positions, and community prestige.",
      icon: "🏆",
      gradient: "from-green-400 to-teal-400",
    },
  ];

  const rewardDistribution = [
    { label: "Validators", percent: 50 },
    { label: "Contributors", percent: 30 },
    { label: "Ecosystem Fund", percent: 20 },
  ];

  const daoProposals = [
    { title: "Proposal 1", desc: "Upgrade validation protocol", votes: 120 },
    { title: "Proposal 2", desc: "Allocate ecosystem grants", votes: 98 },
    { title: "Proposal 3", desc: "Introduce new token metrics", votes: 76 },
  ];

  return (
    <section className="bg-[#050B16] text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-28 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            PoPP Incentive Structures
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Explore how PoPP motivates problem submission, validation, and governance through transparent, cryptographically-secured incentives.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
              Join PoPP
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content – PoPP Flow Animation */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 400 400" className="w-96 h-96">
            <defs>
              <radialGradient id="gradGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6a88" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#7f5fff" stopOpacity="0"/>
              </radialGradient>
            </defs>
            {/* Flow Path */}
            <path d="M50 200 C120 100, 280 100, 350 200 C280 300, 120 300, 50 200"
              stroke="#7f5fff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Moving Problems */}
            {[0,1,2,3].map(i=>(
              <circle key={i} cx={50+i*75} cy={200} r="12" fill="url(#gradGlow)"
                className="animate-[moveProblem_6s_linear_infinite]"
                style={{ animationDelay: `${i*1.5}s` }}
              />
            ))}
            <style jsx>{`
              @keyframes moveProblem {
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
      </div>

      {/* Section 2 – Types of Incentives */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Types of Incentives</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {incentiveTypes.map((t,i)=>(
            <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br ${t.gradient} shadow-lg hover:scale-105 transition-transform`}>
              <div className="text-5xl mb-4">{t.icon}</div>
              <h3 className="font-bold text-xl mb-2">{t.title}</h3>
              <p className="text-gray-100">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 – Reward Distribution */}
      <div className="bg-[#0A1225] py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Reward Distribution</h2>
        <div className="max-w-3xl mx-auto grid gap-6">
          {rewardDistribution.map((r,i)=>(
            <div key={i} className="bg-[#0D1B2A] p-6 rounded-xl border border-cyan-500/30 flex justify-between items-center">
              <span className="font-semibold">{r.label}</span>
              <span className="font-bold">{r.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 – Escalation & Multipliers */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Escalation & Multiplier System</h2>
        <p className="text-gray-300 max-w-4xl mx-auto mb-8 text-center">
          High-priority problems that are escalated to media, authorities, or community amplifications gain multiplier rewards, incentivizing timely and impactful validations.
        </p>
        <div className="relative h-64">
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
      </div>

      {/* Section 5 – Governance & DAO Voting */}
      <div className="bg-[#0A1225] py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Governance & DAO Voting Incentives</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {daoProposals.map((p,i)=>(
            <div key={i} className="bg-[#0D1B2A] p-6 rounded-2xl border border-cyan-500/30 hover:scale-105 transition-transform">
              <h3 className="font-bold text-xl mb-2">{p.title}</h3>
              <p className="text-gray-300 mb-2">{p.desc}</p>
              <p className="text-cyan-400 font-semibold">{p.votes} Votes</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6 – Penalties & Security */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Penalties & Security Measures</h2>
        <p className="text-gray-300 max-w-4xl mx-auto mb-8 text-center">
          Validators and contributors are held accountable. Misconduct or false validations incur penalties to maintain a trust-aligned ecosystem.
        </p>
        <div className="flex justify-center gap-8">
          <div className="p-6 rounded-xl bg-red-700/30 border border-red-500/30 shadow-lg">
            <h3 className="font-bold text-lg mb-2">Slashing</h3>
            <p className="text-gray-200 text-sm">Token penalties for malicious validations.</p>
          </div>
          <div className="p-6 rounded-xl bg-red-700/30 border border-red-500/30 shadow-lg">
            <h3 className="font-bold text-lg mb-2">Security Audits</h3>
            <p className="text-gray-200 text-sm">Routine checks to ensure protocol integrity.</p>
          </div>
        </div>
      </div>

      {/* Section 7 – Call-to-Action */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-20 px-6 md:px-16 text-center rounded-3xl mx-6 md:mx-16 my-12">
        <h2 className="text-4xl font-bold mb-6">Start Participating in PoPP Incentives</h2>
        <p className="text-gray-100 mb-8">
          Turn your contributions into rewards, reputation, and influence in the PoPP ecosystem.
        </p>
        <div className="flex justify-center gap-6">
          <button className="px-6 py-3 bg-black/30 rounded-xl font-semibold hover:scale-105 transition-transform">Join as Validator</button>
          <button className="px-6 py-3 bg-black/30 rounded-xl font-semibold hover:scale-105 transition-transform">Submit a Problem</button>
        </div>
      </div>
    </section>
  );
}
