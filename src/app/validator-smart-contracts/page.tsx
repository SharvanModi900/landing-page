"use client";
import React from "react";
import { FileCode, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ValidatorSmartContractsPage() {
  const contracts = [
    {
      name: "ValidatorRegistry",
      address: "0x1234...5678",
      desc: "Manages validator registration, staking, and status.",
    },
    {
      name: "ValidationPool",
      address: "0x2345...6789",
      desc: "Handles validation assignments and reward distribution.",
    },
    {
      name: "SlashingConditions",
      address: "0x3456...7890",
      desc: "Defines slashing conditions and penalty enforcement.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <FileCode className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Validator Smart Contracts</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Smart contracts powering the validator network. View contract addresses, ABIs, and source code.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-4">
          {contracts.map((c, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{c.name}</h3>
                  <p className="text-gray-400 text-sm">{c.desc}</p>
                </div>
                <code className="text-xs text-cyan-400 bg-white/5 px-2 py-1 rounded">{c.address}</code>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold flex items-center gap-2">
                  View Source <ExternalLink size={14} />
                </button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold flex items-center gap-2">
                  View ABI <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
