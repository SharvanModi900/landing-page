'use client';
import React from 'react';

export default function TokenomicsPage() {
  const tokenomics = [
    {
      token: "PoPP Tokens",
      purpose: "Staking, governance, validator rewards",
      distribution: "Validators, contributors, ecosystem fund",
    },
    {
      token: "PRS Credits",
      purpose: "Reputation scoring, validator ranking",
      distribution: "Earned through successful validations",
    },
    {
      token: "Escalation Tokens",
      purpose: "Priority processing, media amplification",
      distribution: "Purchased or earned through community contribution",
    },
  ];

  return (
    <div className="bg-[#030712] text-white min-h-screen overflow-x-hidden">
      <div className="pt-16">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PoPP Tokenomics
            </span>
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl">
            Understand how the Proof-of-Problem Protocol incentivizes truth, validates problems, and sustains the ecosystem with a carefully designed token model.
          </p>
        </div>

        {/* Token Flow SVG */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <svg viewBox="0 0 600 120" className="w-full h-32">
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path d="M30 80 L150 40 L300 80 L450 40 L570 80" stroke="url(#flowGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
              <circle key={i} r="6" fill="#06b6d4" cx={150 + i * 150} cy={40 + (i % 2 === 0 ? 40 : 0)}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin={`${i * 1}s`} />
              </circle>
            ))}
          </svg>
        </div>

        {/* Token Cards */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tokenomics.map((t, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-2 text-cyan-400">{t.token}</h3>
              <p className="text-gray-400 text-sm mb-1">
                <span className="font-semibold text-gray-300">Purpose:</span> {t.purpose}
              </p>
              <p className="text-gray-400 text-sm">
                <span className="font-semibold text-gray-300">Distribution:</span> {t.distribution}
              </p>
            </div>
          ))}
        </div>

        {/* How Tokens Move */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">How Tokens Move in PoPP</h2>
          <p className="text-gray-400">
            Each submitted problem generates PRS credits for validators and contributors. Escalation tokens allow priority processing and media amplification. The PoPP token ensures governance participation and sustainable ecosystem growth.
          </p>
        </div>

        {/* Incentive Structures */}
        <div className="bg-white/[0.03] border-y border-white/[0.06] py-10 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Incentive Structures</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: "💰", title: "Direct Rewards", desc: "Token incentives for validators and contributors upon successful validation." },
                { icon: "🛡️", title: "Reputation & Governance", desc: "Reputation points build influence in PoPP DAO governance and voting." },
                { icon: "🏆", title: "Social Incentives", desc: "Recognition badges, leaderboard positions, and community prestige." },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-4 text-center">Reward Distribution</h3>
            <div className="max-w-md mx-auto space-y-3">
              {[
                { label: "Validators", percent: 50 },
                { label: "Contributors", percent: 30 },
                { label: "Ecosystem Fund", percent: 20 },
              ].map((r, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                  <span className="font-semibold text-sm">{r.label}</span>
                  <span className="font-bold text-cyan-400">{r.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
