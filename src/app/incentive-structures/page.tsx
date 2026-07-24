'use client';
import React from 'react';

export default function IncentiveStructuresPage() {
  const incentiveTypes = [
    {
      title: "Direct Rewards",
      desc: "Token incentives for validators and contributors upon successful problem validation.",
      icon: "💰",
    },
    {
      title: "Reputation & Governance",
      desc: "Reputation points build influence in PoPP DAO governance and voting.",
      icon: "🛡️",
    },
    {
      title: "Social Incentives",
      desc: "Recognition badges, leaderboard positions, and community prestige.",
      icon: "🏆",
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
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                PoPP Incentive Structures
              </span>
            </h1>
            <p className="text-gray-400 text-lg mt-4">
              Explore how PoPP motivates problem submission, validation, and governance through transparent, cryptographically-secured incentives.
            </p>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Join PoPP
              </button>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Types of Incentives */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Types of Incentives</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {incentiveTypes.map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-4xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-lg mb-1">{t.title}</h3>
                <p className="text-gray-400 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reward Distribution */}
        <div className="bg-white/[0.03] border-y border-white/[0.06] py-10 px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Reward Distribution</h2>
          <div className="max-w-3xl mx-auto grid gap-4">
            {rewardDistribution.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                <span className="font-semibold">{r.label}</span>
                <span className="font-bold text-cyan-400">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Escalation & Multipliers */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-4 text-center">Escalation & Multiplier System</h2>
          <p className="text-gray-400 max-w-4xl mx-auto mb-6 text-center">
            High-priority problems that are escalated to media, authorities, or community amplifications gain multiplier rewards, incentivizing timely and impactful validations.
          </p>
        </div>

        {/* Governance & DAO Voting */}
        <div className="bg-white/[0.03] border-y border-white/[0.06] py-10 px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Governance & DAO Voting Incentives</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {daoProposals.map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{p.desc}</p>
                <p className="text-cyan-400 font-semibold">{p.votes} Votes</p>
              </div>
            ))}
          </div>
        </div>

        {/* Penalties & Security */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-4 text-center">Penalties & Security Measures</h2>
          <p className="text-gray-400 max-w-4xl mx-auto mb-6 text-center">
            Validators and contributors are held accountable. Misconduct or false validations incur penalties to maintain a trust-aligned ecosystem.
          </p>
          <div className="flex justify-center gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-1">Slashing</h3>
              <p className="text-gray-400 text-sm">Token penalties for malicious validations.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-1">Security Audits</h3>
              <p className="text-gray-400 text-sm">Routine checks to ensure protocol integrity.</p>
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl py-10 px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Start Participating in PoPP Incentives</h2>
            <p className="text-white/90 mb-6">
              Turn your contributions into rewards, reputation, and influence in the PoPP ecosystem.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 bg-white/20 rounded-xl font-semibold">Join as Validator</button>
              <button className="px-4 py-2 bg-white/20 rounded-xl font-semibold">Submit a Problem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
