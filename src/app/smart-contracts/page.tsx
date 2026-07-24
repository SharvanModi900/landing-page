"use client";

import { useState } from "react";
import Link from "next/link";

export default function SmartContractsPage() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-[#030712] text-gray-200 min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Smart Contracts{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Trust Layer of PoPP
            </span>
          </h1>
          <p className="text-gray-400 mb-6 max-w-2xl">
            Transparent, automated, and immutable logic powering the Proof of
            Problem Protocol. These contracts ensure fairness, security, and
            accountability at every step.
          </p>
          <div className="flex gap-3">
            <Link
              href="/audit-reports"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold"
            >
              View Audit Reports
            </Link>
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold"
            >
              {showCode ? "Hide Code" : "View Example Code"}
            </button>
          </div>
        </section>

        {/* Contract Flow */}
        <section className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-cyan-400 mb-3">
              Contract Flow
            </h3>
            <ol className="space-y-2 text-gray-400">
              <li>1. Problem Submitted</li>
              <li>2. Validation Contract verifies</li>
              <li>3. Staking ensures honesty</li>
              <li>4. Incentives are distributed</li>
              <li>5. Escalation (NGOs / Media / Gov)</li>
            </ol>
          </div>
        </section>

        {/* Overview */}
        <section className="max-w-5xl mx-auto px-6 py-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
          <p className="text-gray-400 leading-relaxed">
            Smart contracts in PoPP act as the backbone of trust. They automate
            processes like problem submission, validation, and rewards
            distribution. Their immutability ensures that no actor—be it validator,
            proofer, or external authority—can manipulate the system once
            deployed.
          </p>
        </section>

        {/* Core Contracts */}
        <section className="bg-white/[0.03] border-y border-white/[0.06] py-10">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Core Contracts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Problem Registry", desc: "Immutable log of all submitted problems." },
                { title: "Validation Mechanism", desc: "Consensus-based contract for verifying authenticity." },
                { title: "Staking & Incentives", desc: "Ensures validators/proofers stay honest." },
                { title: "Governance Contracts", desc: "Community-driven upgrades & voting." },
                { title: "Escalation Contracts", desc: "Escalates issues to NGOs, media, or authorities." },
                { title: "Oracles", desc: "Integrates external data feeds into validation." },
              ].map((c) => (
                <div
                  key={c.title}
                  className="p-5 rounded-xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                    {c.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Code */}
        {showCode && (
          <section className="max-w-5xl mx-auto px-6 py-10">
            <h2 className="text-xl font-bold text-white mb-4">
              Solidity Example
            </h2>
            <pre className="bg-white/5 border border-white/10 p-5 rounded-xl text-sm text-green-400 overflow-x-auto">
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
        <section className="max-w-5xl mx-auto px-6 py-10 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Security & Audits
              </h2>
              <p className="text-gray-400 leading-relaxed">
                All PoPP contracts undergo rigorous external audits and community
                reviews. We maintain a{" "}
                <Link
                  href="/vulnerability-disclosures"
                  className="text-cyan-400 underline"
                >
                  vulnerability disclosure program
                </Link>{" "}
                and bug bounty incentives to encourage responsible reporting.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                Current Status
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Audit Report Published (v1)</li>
                <li>Ongoing Bug Bounty Program</li>
                <li>zk-SNARK privacy layer in research</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="max-w-5xl mx-auto px-6 py-10 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Roadmap</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/5 border-l-4 border-cyan-500">
              <h4 className="text-lg font-semibold text-cyan-400">Phase 1</h4>
              <p className="text-gray-400">Ethereum smart contracts deployed for problem registry.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-blue-400">Phase 2</h4>
              <p className="text-gray-400">Cosmos SDK + CosmWasm integration for interoperability.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border-l-4 border-cyan-400">
              <h4 className="text-lg font-semibold text-cyan-400">Phase 3</h4>
              <p className="text-gray-400">zk-SNARK privacy-preserving problem validation contracts.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
