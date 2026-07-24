"use client";
import React from "react";
import { Wrench, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ValidatorToolsPage() {
  const tools = [
    {
      title: "Validator Dashboard",
      desc: "Monitor your validation performance, rewards, and accuracy metrics.",
      href: "/validator-panel",
    },
    {
      title: "Verification Toolkit",
      desc: "Command-line tools for batch verification and evidence validation.",
      href: "/cli",
    },
    {
      title: "Staking Calculator",
      desc: "Calculate potential rewards and staking requirements.",
      href: "/staking-mechanics",
    },
    {
      title: "Performance Analytics",
      desc: "Detailed analytics on validation history and performance trends.",
      href: "/validator-leaderboards",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Wrench className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Validator Tools</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Essential tools and utilities for validators to manage validations, track performance, and optimize rewards.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tools.map((tool, i) => (
            <Link key={i} href={tool.href}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition">
                <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{tool.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                  Access Tool <ExternalLink size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
