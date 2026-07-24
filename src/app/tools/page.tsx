"use client";

import { Wrench, Code2, Search, Shield, Cpu, Activity } from "lucide-react";

export default function ToolsPage() {
  const tools = [
    { icon: <Wrench className="w-7 h-7 text-cyan-400" />, title: "Problem Explorer", desc: "Browse, filter, and analyze real-world problems submitted to PoPP.", link: "/explorer" },
    { icon: <Search className="w-7 h-7 text-cyan-400" />, title: "Validator Dashboard", desc: "Track validation tasks, staking rewards, and governance activity.", link: "/validators" },
    { icon: <Shield className="w-7 h-7 text-cyan-400" />, title: "Security Scanner", desc: "Run vulnerability scans on smart contracts and integrations.", link: "/security" },
    { icon: <Code2 className="w-7 h-7 text-cyan-400" />, title: "Code Playground", desc: "Experiment with the PoPP SDK using live code snippets.", link: "/playground" },
    { icon: <Cpu className="w-7 h-7 text-cyan-400" />, title: "Node Monitor", desc: "Monitor network health, validator uptime, and testnet performance.", link: "/monitor" },
    { icon: <Activity className="w-7 h-7 text-cyan-400" />, title: "Analytics Hub", desc: "Visualize problem trends, validator activity, and governance metrics.", link: "/analytics" },
  ];

  return (
    <div className="bg-[#030712] text-white min-h-screen">
      <div className="pt-16">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            PoPP{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Tools
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A unified toolbox for developers, validators, and researchers in the Proof of Problem Protocol ecosystem.
          </p>
        </section>

        {/* Tools Grid */}
        <section className="max-w-5xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Available Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <a
                key={tool.title}
                href={tool.link}
                className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition"
              >
                <div className="mb-3">{tool.icon}</div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-cyan-400 transition">
                  {tool.title}
                </h3>
                <p className="text-gray-400 text-sm">{tool.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="bg-white/[0.03] border-y border-white/[0.06] py-10 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">More Tools Coming Soon</h2>
            <p className="text-gray-400 mb-4">
              We are actively building new utilities for developers, problem submitters, and validators. Stay tuned for:
            </p>
            <ul className="text-gray-400 space-y-2 text-sm max-w-xl mx-auto">
              <li>Problem Simulation Lab — test how a problem flows through PoPP consensus.</li>
              <li>Governance Voting Interface — vote on escalations and problem prioritization.</li>
              <li>Advanced Analytics Dashboard — deep dive into ecosystem data.</li>
              <li>SDK Auto-Generator — bootstrap code in your favorite language.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
