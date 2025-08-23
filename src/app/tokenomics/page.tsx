'use client';
import React from 'react';

export default function TokenomicsPage() {
  const tokenomics = [
    {
      token: "PoPP Tokens",
      purpose: "Staking, governance, validator rewards",
      distribution: "Validators, contributors, ecosystem fund",
      color: "from-purple-500 to-pink-500",
    },
    {
      token: "PRS Credits",
      purpose: "Reputation scoring, validator ranking",
      distribution: "Earned through successful validations",
      color: "from-blue-400 to-cyan-400",
    },
    {
      token: "Escalation Tokens",
      purpose: "Priority processing, media amplification",
      distribution: "Purchased or earned through community contribution",
      color: "from-green-400 to-teal-400",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            PoPP Tokenomics
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Understand how the Proof-of-Problem Protocol incentivizes truth, validates problems, and sustains the ecosystem with a carefully designed token model.
          </p>
        </div>

        {/* Right SVG Animated Token Flow */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 400 200" className="w-full max-w-4xl h-48">
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7f5fff" />
                <stop offset="100%" stopColor="#ff6a88" />
              </linearGradient>
              <radialGradient id="tokenGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6a88" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7f5fff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Flow path */}
            <path
              id="tokenPath"
              d="M20 100 L100 100 L180 50 L260 150 L340 100"
              stroke="url(#flowGrad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Moving tokens */}
            {[0, 1, 2].map((i) => (
              <circle key={i} r="10" fill="url(#tokenGlow)">
                <animateMotion dur="5s" repeatCount="indefinite" begin={`${i * 1.5}s`}>
                  <mpath href="#tokenPath" />
                </animateMotion>
              </circle>
            ))}
          </svg>
        </div>
      </div>

      {/* Token Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tokenomics.map((t, idx) => (
          <div key={idx} className={`p-6 rounded-2xl bg-gradient-to-br ${t.color} shadow-xl hover:scale-105 transition-transform`}>
            <h3 className="text-xl font-bold mb-2">{t.token}</h3>
            <p className="text-gray-100 text-sm mb-1">
              <span className="font-semibold">Purpose:</span> {t.purpose}
            </p>
            <p className="text-gray-100 text-sm">
              <span className="font-semibold">Distribution:</span> {t.distribution}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Token Flow Info */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 space-y-6">
        <h2 className="text-3xl font-bold">How Tokens Move in PoPP</h2>
        <p className="text-gray-300 text-lg">
          Each submitted problem generates PRS credits for validators and contributors. Escalation tokens allow priority processing and media amplification. The PoPP token ensures governance participation and sustainable ecosystem growth.
        </p>

        {/* Flow Illustration */}
        <svg viewBox="0 0 600 200" className="w-full h-48">
          <defs>
            <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7f5fff"/>
              <stop offset="100%" stopColor="#ff6a88"/>
            </linearGradient>
          </defs>
          <path d="M50 150 L150 50 L300 150 L450 50 L550 150" stroke="url(#flowGradient)" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    </section>
  );
}
