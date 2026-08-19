"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Copy, Coins, TrendingUp, BarChart3, Award, Clock, AlertTriangle } from "lucide-react";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface ResolutionStats {
  total_resolutions: number;
  fixed_count: number;
  rejected_count: number;
  duplicate_count: number;
  total_submitter_rewards: number;
  total_platform_fees: number;
  total_rewards: number;
}

interface RewardEntry {
  id: string;
  reward_type: string;
  amount: number;
  description?: string;
  created_at: string;
}

export default function ResolutionsPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [stats, setStats] = useState<ResolutionStats | null>(null);
  const [rewards, setRewards] = useState<RewardEntry[]>([]);
  const [slashing, setSlashing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"stats" | "rewards" | "slashing">("stats");

  const fetchData = useCallback(async () => {
    try {
      const statsRes = await fetch(`${BACKEND_API}/api/resolutions/stats`);
      if (statsRes.ok) setStats(await statsRes.json());

      if (connected) {
        const [rewRes, slashRes] = await Promise.allSettled([
          fetch(`${BACKEND_API}/api/rewards/history`, { headers: getAuthHeaders() }).then(r => r.ok ? r.json() : []),
          fetch(`${BACKEND_API}/api/rewards/my-slashing`, { headers: getAuthHeaders() }).then(r => r.ok ? r.json() : null),
        ]);
        if (rewRes.status === "fulfilled" && Array.isArray(rewRes.value)) setRewards(rewRes.value);
        if (slashRes.status === "fulfilled" && slashRes.value) setSlashing(slashRes.value);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 ring-1 ring-emerald-500/30">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </div>
          <h1 className="text-xl font-bold">Resolutions & Rewards</h1>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><CheckCircle size={12} className="text-emerald-400" /><span className="text-[10px] text-gray-400">Resolved</span></div>
                <div className="text-lg font-bold">{stats?.total_resolutions ?? 0}</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><TrendingUp size={12} className="text-cyan-400" /><span className="text-[10px] text-gray-400">Fixed</span></div>
                <div className="text-lg font-bold text-emerald-400">{stats?.fixed_count ?? 0}</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><XCircle size={12} className="text-red-400" /><span className="text-[10px] text-gray-400">Rejected</span></div>
                <div className="text-lg font-bold text-red-400">{stats?.rejected_count ?? 0}</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><Copy size={12} className="text-gray-400" /><span className="text-[10px] text-gray-400">Duplicates</span></div>
                <div className="text-lg font-bold text-gray-400">{stats?.duplicate_count ?? 0}</div>
              </motion.div>
            </div>

            {/* Reward Stats */}
            {(stats?.total_rewards ?? 0) > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Coins size={14} className="text-yellow-400" /> Network Rewards Distributed</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Total Rewards</div>
                    <div className="text-sm font-bold text-emerald-400">{(stats?.total_rewards ?? 0).toLocaleString()}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Submitter Rewards</div>
                    <div className="text-sm font-bold text-cyan-400">{(stats?.total_submitter_rewards ?? 0).toLocaleString()}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Platform Fees</div>
                    <div className="text-sm font-bold text-gray-400">{(stats?.total_platform_fees ?? 0).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            {connected && (
              <>
                <div className="flex gap-1.5 mb-4">
                  {(["stats", "rewards", "slashing"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${activeTab === tab ? "bg-gradient-to-r from-emerald-500 to-cyan-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
                      {tab === "slashing" ? "My Slashing" : tab}
                    </button>
                  ))}
                </div>

                {activeTab === "rewards" && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Award size={14} className="text-yellow-400" /> My Reward History</h3>
                    {rewards.length === 0 ? (
                      <p className="text-xs text-gray-500 text-center py-6">No rewards earned yet</p>
                    ) : (
                      <div className="space-y-2">
                        {rewards.map(r => (
                          <div key={r.id} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                            <Coins size={12} className="text-yellow-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold capitalize">{r.reward_type?.replace(/_/g, " ")}</div>
                              <div className="text-[10px] text-gray-500">{r.description || ""}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold text-emerald-400">+{r.amount?.toLocaleString()}</div>
                              <div className="text-[10px] text-gray-500">{new Date(r.created_at).toLocaleDateString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "slashing" && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><AlertTriangle size={14} className="text-red-400" /> My Slashing History</h3>
                    {!slashing ? (
                      <p className="text-xs text-gray-500 text-center py-6">No slashing records</p>
                    ) : (
                      <div className="space-y-2">
                        {Array.isArray(slashing) ? slashing.map((s: any, i: number) => (
                          <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                            <AlertTriangle size={12} className="text-red-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold">{s.reason || "Penalty"}</div>
                              <div className="text-[10px] text-gray-500">{s.description || ""}</div>
                            </div>
                            <div className="text-xs font-bold text-red-400">-{s.amount?.toLocaleString()}</div>
                          </div>
                        )) : (
                          <p className="text-xs text-gray-500 text-center py-6">No slashing records</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "stats" && (
                  <div className="text-center py-8 bg-white/5 border border-white/10 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Network resolution stats shown above</p>
                  </div>
                )}
              </>
            )}

            {!connected && (
              <div className="text-center py-8 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm text-gray-400 mb-3">Connect wallet to view your personal rewards and slashing history.</p>
                <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
