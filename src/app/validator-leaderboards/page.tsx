"use client";
import React from "react";
import { Shield, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ValidatorLeaderboardsPage() {
  const topValidators = [
    { rank: 1, name: "Validator Alpha", score: 98.5, validations: 1247, rewards: "12,450 PRS" },
    { rank: 2, name: "Validator Beta", score: 97.2, validations: 1189, rewards: "11,890 PRS" },
    { rank: 3, name: "Validator Gamma", score: 96.8, validations: 1156, rewards: "11,560 PRS" },
    { rank: 4, name: "Validator Delta", score: 95.4, validations: 1098, rewards: "10,980 PRS" },
    { rank: 5, name: "Validator Epsilon", score: 94.9, validations: 1067, rewards: "10,670 PRS" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Validator Leaderboards</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Top-performing validators ranked by accuracy, validation count, and community contribution.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 bg-white/[0.03] border-b border-white/10 font-semibold text-sm">
            <div>Rank</div>
            <div>Validator</div>
            <div>Score</div>
            <div>Validations</div>
            <div>Rewards</div>
          </div>
          {topValidators.map((v) => (
            <div key={v.rank} className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 hover:bg-white/[0.03] transition">
              <div className="flex items-center gap-2">
                {v.rank <= 3 ? (
                  <Award className={`h-5 w-5 ${v.rank === 1 ? 'text-yellow-400' : v.rank === 2 ? 'text-gray-400' : 'text-amber-600'}`} />
                ) : (
                  <span className="text-gray-400 font-semibold">#{v.rank}</span>
                )}
              </div>
              <div className="font-semibold">{v.name}</div>
              <div className="text-cyan-400 font-semibold">{v.score}%</div>
              <div className="text-gray-400">{v.validations.toLocaleString()}</div>
              <div className="text-cyan-400 font-semibold">{v.rewards}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Become a Top Validator</h2>
          <p className="text-gray-400 mb-6">Start validating problems and earn your place on the leaderboard.</p>
          <Link href="/validators/exam">
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
              Take the Exam
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
