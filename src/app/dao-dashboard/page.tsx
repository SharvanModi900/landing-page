"use client";
import React from "react";
import { Vote } from "lucide-react";
import Link from "next/link";

export default function DAODashboardPage() {
  const proposals = [
    { title: "Increase Validator Rewards", status: "Active", votes: 1247 },
    { title: "Reduce Staking Requirements", status: "Active", votes: 892 },
    { title: "Add New Problem Categories", status: "Passed", votes: 2156 },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Vote className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Proposal & DAO Dashboard</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Participate in governance, vote on proposals, and shape the future of PoPP protocol.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-4">
          {proposals.map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  p.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-cyan-500/20 text-cyan-400"
                }`}>
                  {p.status}
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-3">{p.votes.toLocaleString()} votes</div>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
