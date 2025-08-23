// src/app/smart-contracts/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SmartContractsPage() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-[#0a0e23] text-gray-200 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-blue-900/40 to-purple-900/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Smart Contracts <br />
              <span className="text-blue-400">The Trust Layer of PoPP</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Transparent, automated, and immutable logic powering the Proof of
              Problem Protocol. These contracts ensure fairness, security, and
              accountability at every step.
            </p>
            <div className="flex gap-4">
              <Link
                href="/audit-reports"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition shadow-lg font-semibold"
              >
                View Audit Reports
              </Link>
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-lg font-semibold"
              >
                {showCode ? "Hide Code" : "View Example Code"}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative bg-[#101830] p-8 rounded-2xl shadow-xl border border-blue-500/20">
              <h3 className="text-lg font-bold text-blue-400 mb-4">
                Contract Flow
              </h3>
              <ol className="space-y-3 text-gray-300">
                <li>1️⃣ Problem Submitted</li>
                <li>2️⃣ Validation Contract verifies</li>
                <li>3️⃣ Staking ensures honesty</li>
                <li>4️⃣ Incentives are distributed</li>
                <li>5️⃣ Escalation (NGOs / Media / Gov)</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-6">🔍 Overview</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          Smart contracts in PoPP act as the backbone of trust. They automate
          processes like problem submission, validation, and rewards
          distribution. Their immutability ensures that no actor—be it validator,
          proofer, or external authority—can manipulate the system once
          deployed.
        </p>
      </section>

      {/* Core Contracts */}
      <section className="bg-[#11172e] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">
            🧩 Core Contracts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Problem Registry",
                desc: "Immutable log of all submitted problems.",
              },
              {
                title: "Validation Mechanism",
                desc: "Consensus-based contract for verifying authenticity.",
              },
              {
                title: "Staking & Incentives",
                desc: "Ensures validators/proofers stay honest.",
              },
              {
                title: "Governance Contracts",
                desc: "Community-driven upgrades & voting.",
              },
              {
                title: "Escalation Contracts",
                desc: "Escalates issues to NGOs, media, or authorities.",
              },
              {
                title: "Oracles",
                desc: "Integrates external data feeds into validation.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl bg-[#1a213d] border border-blue-400/20 hover:border-blue-400/50 transition"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  {c.title}
                </h3>
                <p className="text-gray-300">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Code */}
      {showCode && (
        <section className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-white mb-6">
            Solidity Example
          </h2>
          <pre className="bg-[#0d1224] p-6 rounded-xl text-sm text-green-400 overflow-x-auto">
{`pragma solidity ^0.8.0;

contract ProblemRegistry {
    struct Problem {
        string description;
        address submitter;
        uint timestamp;
    }

    Problem[] public problems;

    function submitProblem(string memory _desc) external {
        problems.push(Problem(_desc, msg.sender, block.timestamp));
    }
}`}
          </pre>
        </section>
      )}

      {/* Security & Audits */}
      <section className="bg-[#0e1328] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              🔒 Security & Audits
            </h2>
            <p className="text-gray-300 leading-relaxed">
              All PoPP contracts undergo rigorous external audits and community
              reviews. We maintain a{" "}
              <Link
                href="/vulnerability-disclosures"
                className="text-blue-400 underline"
              >
                vulnerability disclosure program
              </Link>{" "}
              and bug bounty incentives to encourage responsible reporting.
            </p>
          </div>
          <div className="bg-[#1a213d] p-6 rounded-2xl border border-purple-400/20">
            <h3 className="text-lg font-bold text-purple-400 mb-3">
              Current Status
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>✅ Audit Report Published (v1)</li>
              <li>✅ Ongoing Bug Bounty Program</li>
              <li>🔄 zk-SNARK privacy layer in research</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-6">🚀 Roadmap</h2>
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-[#161d35] border-l-4 border-blue-500">
            <h4 className="text-lg font-semibold text-blue-400">Phase 1</h4>
            <p>Ethereum smart contracts deployed for problem registry.</p>
          </div>
          <div className="p-6 rounded-xl bg-[#161d35] border-l-4 border-purple-500">
            <h4 className="text-lg font-semibold text-purple-400">Phase 2</h4>
            <p>Cosmos SDK + CosmWasm integration for interoperability.</p>
          </div>
          <div className="p-6 rounded-xl bg-[#161d35] border-l-4 border-green-500">
            <h4 className="text-lg font-semibold text-green-400">Phase 3</h4>
            <p>zk-SNARK privacy-preserving problem validation contracts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
