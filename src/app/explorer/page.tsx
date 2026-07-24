"use client";
import React from "react";
import { Search, Filter, TrendingUp, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function ProblemExplorerPage() {
  const recentProblems = [
    {
      title: "Water Contamination in Rural Area",
      category: "Environment",
      status: "Validated",
      location: "Rajasthan, India",
      date: "2 days ago",
      severity: "High",
    },
    {
      title: "Road Infrastructure Damage",
      category: "Infrastructure",
      status: "Under Review",
      location: "Mumbai, India",
      date: "5 days ago",
      severity: "Medium",
    },
    {
      title: "Educational Resource Shortage",
      category: "Education",
      status: "Escalated",
      location: "Delhi, India",
      date: "1 week ago",
      severity: "High",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Search className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Problem Explorer</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Browse and search through all problems submitted to the PoPP network. Filter by category, status, location, and severity.
        </p>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search problems..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold flex items-center gap-2">
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">12,458</div>
            <div className="text-sm text-gray-400">Total Problems</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">8,923</div>
            <div className="text-sm text-gray-400">Validated</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">2,156</div>
            <div className="text-sm text-gray-400">In Progress</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-cyan-400">1,379</div>
            <div className="text-sm text-gray-400">Resolved</div>
          </div>
        </div>
      </section>

      {/* Recent Problems */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-xl font-bold mb-6">Recent Problems</h2>
        <div className="space-y-4">
          {recentProblems.map((problem, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{problem.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {problem.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {problem.date}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-400">
                    {problem.status}
                  </span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    problem.severity === "High" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {problem.severity}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{problem.category}</span>
                <Link href={`/problem/${i}`} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Have a Problem to Report?</h2>
          <p className="text-gray-400 mb-6">Submit your problem to the PoPP network and help create positive change.</p>
          <Link href="/submit">
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
              Submit a Problem
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
