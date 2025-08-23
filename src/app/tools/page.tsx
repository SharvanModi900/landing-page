// src/app/tools/page.tsx
"use client";

import { Wrench, Code2, Search, Shield, Cpu, Activity } from "lucide-react";

export default function ToolsPage() {
  const tools = [
    {
      icon: <Wrench className="w-8 h-8 text-blue-400" />,
      title: "Problem Explorer",
      desc: "Browse, filter, and analyze real-world problems submitted to PoPP.",
      link: "/explorer",
    },
    {
      icon: <Search className="w-8 h-8 text-purple-400" />,
      title: "Validator Dashboard",
      desc: "Track validation tasks, staking rewards, and governance activity.",
      link: "/validators",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Security Scanner",
      desc: "Run vulnerability scans on smart contracts and integrations.",
      link: "/security",
    },
    {
      icon: <Code2 className="w-8 h-8 text-yellow-400" />,
      title: "Code Playground",
      desc: "Experiment with the PoPP SDK using live code snippets.",
      link: "/playground",
    },
    {
      icon: <Cpu className="w-8 h-8 text-pink-400" />,
      title: "Node Monitor",
      desc: "Monitor network health, validator uptime, and testnet performance.",
      link: "/monitor",
    },
    {
      icon: <Activity className="w-8 h-8 text-red-400" />,
      title: "Analytics Hub",
      desc: "Visualize problem trends, validator activity, and governance metrics.",
      link: "/analytics",
    },
  ];

  return (
    <div className="bg-[#0a0e23] text-gray-200 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-blue-900/40 to-purple-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            PoPP <span className="text-blue-400">Tools</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A unified toolbox for developers, validators, and researchers in the Proof of Problem Protocol ecosystem.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          🧰 Available Tools
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tools.map((tool) => (
            <a
              key={tool.title}
              href={tool.link}
              className="group p-8 rounded-2xl bg-[#1a213d] border border-gray-700/50 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition"
            >
              <div className="mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition">
                {tool.title}
              </h3>
              <p className="text-gray-400 text-sm">{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-[#11172e] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            🚀 More Tools Coming Soon
          </h2>
          <p className="text-gray-300 mb-6">
            We are actively building new utilities for developers, problem submitters, and validators. Stay tuned for:
          </p>
          <ul className="text-gray-400 space-y-3 text-sm max-w-xl mx-auto">
            <li>🔮 Problem Simulation Lab — test how a problem flows through PoPP consensus.</li>
            <li>🛡️ Governance Voting Interface — vote on escalations and problem prioritization.</li>
            <li>📊 Advanced Analytics Dashboard — deep dive into ecosystem data.</li>
            <li>⚡ SDK Auto-Generator — bootstrap code in your favorite language.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
