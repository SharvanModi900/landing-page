'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function StakingPage() {
  const steps = [
    { label: "Stake Tokens", desc: "Lock PoPP tokens into the staking pool." },
    { label: "Validator Assignment", desc: "Tokens delegated to trusted validators." },
    { label: "Rewards Accumulation", desc: "Earn rewards over time based on performance." },
    { label: "Claim or Re-stake", desc: "Claim rewards or reinvest for compounding." },
  ];

  const validators = [
    { title: "Validate Problems", desc: "Confirm the authenticity of submitted problems.", icon: "🛡️" },
    { title: "Maintain Network", desc: "Ensure protocol uptime and consistency.", icon: "⚙️" },
    { title: "Distribute Rewards", desc: "Handle reward payouts to stakers.", icon: "💎" },
  ];

  const rewards = [
    { title: "Base APY", value: "8%" },
    { title: "Performance Bonus", value: "2-5%" },
    { title: "Compounding", value: "Flexible Re-stake" },
  ];

  return (
    <div className="bg-[#01030F] text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center min-h-screen px-6 md:px-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="flex-1 space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Staking Mechanics
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Understand how PoPP staking works, from delegation to rewards. Boost validator performance
              and maximize your token benefits securely and transparently.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
                Start Staking
              </button>
              <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold">
                Learn More
              </button>
            </div>

            {/* Steps */}
            <div className="mt-10 space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="text-3xl font-bold text-purple-400">{idx + 1}.</div>
                  <div>
                    <h3 className="font-semibold text-lg">{step.label}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 relative w-full h-[450px]">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF6A88" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#7F5FFF" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7F5FFF" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#FF6A88" stopOpacity="0.2"/>
                </linearGradient>
              </defs>

              {/* Connecting Lines */}
              <line x1="50" y1="350" x2="150" y2="250" stroke="url(#lineGlow)" strokeWidth="3" />
              <line x1="150" y1="250" x2="250" y2="300" stroke="url(#lineGlow)" strokeWidth="3" />
              <line x1="250" y1="300" x2="350" y2="200" stroke="url(#lineGlow)" strokeWidth="3" />

              {/* Nodes */}
              {[50, 150, 250, 350].map((cx, idx) => (
                <circle key={idx} cx={cx} cy={idx % 2 === 0 ? 350 : 250} r="15" fill="url(#nodeGlow)">
                  <animate 
                    attributeName="r" 
                    values="15;20;15" 
                    dur="2s" 
                    repeatCount="indefinite" 
                    begin={`${idx * 0.5}s`} 
                  />
                </circle>
              ))}
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,106,136,0.1),transparent_70%)] pointer-events-none"/>
          </div>
        </div>
      </section>

      {/* Validator Roles */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Validator Roles
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {validators.map((v, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0A0E1A] border border-purple-500/20 shadow-lg hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reward Mechanics */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 bg-[#050718] rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Reward Mechanics
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {rewards.map((r, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0A0E1A] border border-pink-500/20 shadow-lg hover:scale-105 transition-transform">
              <h3 className="font-semibold text-xl mb-2">{r.title}</h3>
              <p className="text-purple-400 font-bold text-2xl">{r.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Guarantees */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Protocol Security
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🔒", label: "End-to-End Encryption" },
            { icon: "🛡️", label: "Zero-Trust Protocol" },
            { icon: "📜", label: "Blockchain Audit" },
            { icon: "⚡", label: "Secure Validator Operations" },
          ].map((s, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0A0E1A] border border-cyan-500/20 shadow-lg hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-semibold text-lg">{s.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Ready to Stake Your PoPP?
        </h2>
        <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg hover:scale-105 transition-transform font-semibold">
          Start Staking Now
        </button>
      </section>
    </div>
  );
}
