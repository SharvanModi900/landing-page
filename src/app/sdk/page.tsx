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
    <div className="bg-[#030712] text-white min-h-screen">
      <div className="pt-16">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            PoPP SDK{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              for Developers
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Build decentralized applications powered by Proof of Problem
            Protocol. Easy integration with popular languages and frameworks.
          </p>
          <div className="flex justify-center gap-3">
            <a href="#install" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold">
              Get Started
            </a>
            <a href="/docs" className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition font-semibold">
              Read Docs
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Use the PoPP SDK?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Multi-language Support", desc: "Available for JavaScript, Rust, and Python developers." },
              { title: "Simple APIs", desc: "Minimal boilerplate, intuitive function calls." },
              { title: "Testnet Ready", desc: "Experiment safely with Sandbox / Testnet before deploying." },
              { title: "Secure", desc: "Cryptographic signatures ensure data authenticity." },
              { title: "Interoperable", desc: "Integrates with EVM, Cosmos, and WASM chains." },
              { title: "Open Source", desc: "MIT licensed — community-driven development." },
            ].map((f) => (
              <div key={f.title} className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-base font-semibold text-cyan-400 mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Installation */}
        <section id="install" className="bg-white/[0.03] border-y border-white/[0.06] py-10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-4">Installation</h2>
            <p className="text-gray-400 mb-4">
              Choose your preferred language and install the PoPP SDK with a single command.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {["javascript", "rust", "python"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                    activeLang === lang
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <pre className="bg-white/5 border border-white/10 p-5 rounded-xl text-sm text-green-400 overflow-x-auto">
              {codeExamples[activeLang]}
            </pre>
          </div>
        </section>

        {/* Example Use Cases */}
        <section className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold mb-6 text-center">What Can You Build?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Citizen DApps", desc: "Enable users to submit and track real-world problems." },
              { title: "NGO Dashboards", desc: "Integrate problem data into NGO workflows." },
              { title: "Validator Tools", desc: "Build tools for validation, staking, and rewards." },
              { title: "Research Analytics", desc: "Analyze decentralized datasets for impact studies." },
              { title: "Mobile Integrations", desc: "Use SDK in cross-platform apps like React Native or Flutter." },
              { title: "Governance Portals", desc: "Implement voting and escalation features." },
            ].map((uc) => (
              <div key={uc.title} className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-base font-semibold text-cyan-400 mb-1">{uc.title}</h3>
                <p className="text-gray-400 text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="max-w-5xl mx-auto px-6 py-10 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">SDK Roadmap</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="p-5 rounded-xl bg-white/5 border-l-4 border-cyan-500">
              <h4 className="text-base font-semibold text-cyan-400">v1.0 — Testnet Release</h4>
              <p className="text-gray-400 text-sm">Core functions: problem submission, validation, incentives.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border-l-4 border-blue-500">
              <h4 className="text-base font-semibold text-blue-400">v2.0 — Multi-Chain SDK</h4>
              <p className="text-gray-400 text-sm">CosmWasm, Ethereum, and Substrate integrations.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border-l-4 border-cyan-400">
              <h4 className="text-base font-semibold text-cyan-400">v3.0 — Privacy Features</h4>
              <p className="text-gray-400 text-sm">zk-SNARK and encrypted submissions for sensitive data.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
