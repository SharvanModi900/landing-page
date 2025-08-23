// src/app/sdk/page.tsx
"use client";

import { useState } from "react";

export default function SDKPage() {
  const [activeLang, setActiveLang] = useState("javascript");

  const codeExamples: Record<string, string> = {
    javascript: `// Install
npm install @popp/sdk

// Import
import { PoPP } from "@popp/sdk";

// Init
const client = new PoPP({ network: "testnet" });

// Submit problem
await client.submitProblem("Water pollution in River Ganga");`,
    rust: `// Cargo.toml
popp-sdk = "0.1"

// Import
use popp_sdk::Client;

fn main() {
    let client = Client::new("testnet");
    client.submit_problem("Lack of electricity in Village X");
}`,
    python: `# Install
pip install popp-sdk

# Import
from popp import Client

client = Client(network="testnet")

client.submit_problem("Poor internet connectivity in Region Y")`,
  };

  return (
    <div className="bg-[#0a0e23] text-gray-200 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-blue-900/40 to-purple-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            PoPP SDK <span className="text-blue-400">for Developers</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Build decentralized applications powered by Proof of Problem
            Protocol. Easy integration with popular languages and frameworks.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#install"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition shadow-lg font-semibold"
            >
              Get Started
            </a>
            <a
              href="/docs"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-lg font-semibold"
            >
              Read Docs
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          ⚡ Why Use the PoPP SDK?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Multi-language Support",
              desc: "Available for JavaScript, Rust, and Python developers.",
            },
            {
              title: "Simple APIs",
              desc: "Minimal boilerplate, intuitive function calls.",
            },
            {
              title: "Testnet Ready",
              desc: "Experiment safely with Sandbox / Testnet before deploying.",
            },
            {
              title: "Secure",
              desc: "Cryptographic signatures ensure data authenticity.",
            },
            {
              title: "Interoperable",
              desc: "Integrates with EVM, Cosmos, and WASM chains.",
            },
            {
              title: "Open Source",
              desc: "MIT licensed — community-driven development.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-[#1a213d] border border-blue-400/20 hover:border-blue-400/50 transition"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Installation */}
      <section id="install" className="bg-[#11172e] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">📦 Installation</h2>
          <p className="text-gray-300 mb-6">
            Choose your preferred language and install the PoPP SDK with a single
            command.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {["javascript", "rust", "python"].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  activeLang === lang
                    ? "bg-blue-600 text-white"
                    : "bg-[#1a213d] text-gray-300 hover:bg-blue-500/30"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <pre className="bg-[#0d1224] p-6 rounded-xl text-sm text-green-400 overflow-x-auto">
            {codeExamples[activeLang]}
          </pre>
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          🛠️ What Can You Build?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Citizen DApps",
              desc: "Enable users to submit and track real-world problems.",
            },
            {
              title: "NGO Dashboards",
              desc: "Integrate problem data into NGO workflows.",
            },
            {
              title: "Validator Tools",
              desc: "Build tools for validation, staking, and rewards.",
            },
            {
              title: "Research Analytics",
              desc: "Analyze decentralized datasets for impact studies.",
            },
            {
              title: "Mobile Integrations",
              desc: "Use SDK in cross-platform apps like React Native or Flutter.",
            },
            {
              title: "Governance Portals",
              desc: "Implement voting and escalation features.",
            },
          ].map((uc) => (
            <div
              key={uc.title}
              className="p-6 rounded-2xl bg-[#1a213d] border border-purple-400/20 hover:border-purple-400/50 transition"
            >
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                {uc.title}
              </h3>
              <p className="text-gray-300">{uc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-[#0e1328] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            🚀 SDK Roadmap
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-[#161d35] border-l-4 border-blue-500">
              <h4 className="text-lg font-semibold text-blue-400">
                v1.0 — Testnet Release
              </h4>
              <p>Core functions: problem submission, validation, incentives.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#161d35] border-l-4 border-purple-500">
              <h4 className="text-lg font-semibold text-purple-400">
                v2.0 — Multi-Chain SDK
              </h4>
              <p>CosmWasm, Ethereum, and Substrate integrations.</p>
            </div>
            <div className="p-6 rounded-xl bg-[#161d35] border-l-4 border-green-500">
              <h4 className="text-lg font-semibold text-green-400">
                v3.0 — Privacy Features
              </h4>
              <p>zk-SNARK and encrypted submissions for sensitive data.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
