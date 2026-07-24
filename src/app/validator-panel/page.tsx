"use client";
import React from "react";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function ValidatorPanelPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <LayoutDashboard className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">Validator Panel</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Manage your validations, track performance, and monitor rewards in real-time.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-2xl font-bold text-cyan-400">1,247</div>
            <div className="text-sm text-gray-400">Total Validations</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-2xl font-bold text-cyan-400">98.5%</div>
            <div className="text-sm text-gray-400">Accuracy Score</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-2xl font-bold text-cyan-400">12,450</div>
            <div className="text-sm text-gray-400">PRS Earned</div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold mb-3">Validator Dashboard</h2>
          <p className="text-gray-400 mb-6">Access your complete validator dashboard with advanced analytics and management tools.</p>
          <Link href="/validator-tools">
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold">
              Open Dashboard
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
