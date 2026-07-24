'use client';
import React from 'react';

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
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Staking Mechanics
              </span>
            </h1>
            <p className="text-gray-400 text-lg mt-4">
              Understand how PoPP staking works, from delegation to rewards. Boost validator performance
              and maximize your token benefits securely and transparently.
            </p>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
                Start Staking
              </button>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-semibold">
                Learn More
              </button>
            </div>

            {/* Steps */}
            <div className="mt-8 space-y-3">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-2xl font-bold text-cyan-400">{idx + 1}.</div>
                  <div>
                    <h3 className="font-semibold">{step.label}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Validator Roles */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Validator Roles
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {validators.map((v, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{v.title}</h3>
                <p className="text-gray-400 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reward Mechanics */}
        <section className="bg-white/[0.03] border-y border-white/[0.06] py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Reward Mechanics
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {rewards.map((r, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-semibold text-lg mb-1">{r.title}</h3>
                  <p className="text-cyan-400 font-bold text-2xl">{r.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Guarantees */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Protocol Security
            </span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🔒", label: "End-to-End Encryption" },
              { icon: "🛡️", label: "Zero-Trust Protocol" },
              { icon: "📜", label: "Blockchain Audit" },
              { icon: "⚡", label: "Secure Validator Operations" },
            ].map((s, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="font-semibold">{s.label}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 py-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ready to Stake Your PoPP?
            </span>
          </h2>
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
            Start Staking Now
          </button>
        </section>
      </div>
    </div>
  );
}
