"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Users, TrendingUp, Award, Crown, Shield, Zap } from "lucide-react";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface LeaderboardEntry {
  id: string;
  wallet_address: string;
  display_name: string;
  r_score: number;
  tickets_submitted: number;
  tickets_resolved: number;
  validations_done: number;
  validator_level: number;
  avatar?: string;
}

interface MyScore {
  r_score: number;
  rank: number;
  total_users: number;
  badges: string[];
}

const LEVEL_LABELS = ["Candidate", "Community", "Domain Expert", "Institutional", "Autonomous", "Emergency"];

export default function LeaderboardPage() {
  const { connected, connect, getAuthHeaders, user } = useWallet();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [myScore, setMyScore] = useState<MyScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"leaderboard" | "myreputation" | "badges" | "nfts" | "insights">("leaderboard");
  const [syncLoading, setSyncLoading] = useState<string | null>(null);
  const [syncMsg, setSyncMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const lbRes = await fetch(`${BACKEND_API}/api/reputation/leaderboard`);
      if (lbRes.ok) {
        const data = await lbRes.json();
        setLeaderboard(Array.isArray(data) ? data : data.leaderboard || []);
      }
      if (connected) {
        const [scoreRes, badgesRes, nftsRes, insightsRes] = await Promise.allSettled([
          fetch(`${BACKEND_API}/api/reputation/my-score`, { headers: getAuthHeaders() }),
          fetch(`${BACKEND_API}/api/reputation/badges`, { headers: getAuthHeaders() }),
          fetch(`${BACKEND_API}/api/reputation/nfts`, { headers: getAuthHeaders() }),
          fetch(`${BACKEND_API}/api/reputation/insights`, { headers: getAuthHeaders() }),
        ]);
        if (scoreRes.status === "fulfilled" && scoreRes.value.ok) setMyScore(await scoreRes.value.json());
        if (badgesRes.status === "fulfilled" && badgesRes.value.ok) {
          const d = await badgesRes.value.json();
          setBadges(Array.isArray(d) ? d : d.badges || []);
        }
        if (nftsRes.status === "fulfilled" && nftsRes.value.ok) {
          const d = await nftsRes.value.json();
          setNfts(Array.isArray(d) ? d : d.nfts || []);
        }
        if (insightsRes.status === "fulfilled" && insightsRes.value.ok) setInsights(await insightsRes.value.json());
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSync = async (type: "reputation" | "badges" | "nfts") => {
    setSyncLoading(type); setSyncMsg(null);
    try {
      const url = type === "reputation" ? `${BACKEND_API}/api/reputation/sync`
        : type === "badges" ? `${BACKEND_API}/api/reputation/badges/sync`
        : `${BACKEND_API}/api/reputation/nfts/mint`;
      const res = await fetch(url, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({}),
      });
      if (res.ok) { setSyncMsg({ text: `${type} synced!`, ok: true }); fetchData(); }
      else { const err = await res.text(); setSyncMsg({ text: err || "Failed", ok: false }); }
    } catch (e: any) { setSyncMsg({ text: e.message || "Failed", ok: false }); }
    finally { setSyncLoading(null); }
  };

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-600/20 ring-1 ring-yellow-500/30">
              <Trophy className="h-4 w-4 text-yellow-400" />
            </div>
            <h1 className="text-xl font-bold">Reputation Leaderboard</h1>
          </div>
          <p className="text-gray-400 text-sm">Top contributors ranked by R-Score</p>
        </motion.div>

        {/* My Score Card */}
        {connected && myScore && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border border-yellow-500/20 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-gray-400 uppercase mb-0.5">Your R-Score</div>
                <div className="text-2xl font-bold text-yellow-400">{myScore.r_score}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-400 uppercase mb-0.5">Rank</div>
                <div className="text-2xl font-bold">#{myScore.rank} <span className="text-xs text-gray-500">/ {myScore.total_users}</span></div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase mb-0.5">Your Score</div>
                <div className="text-lg font-bold text-emerald-400">{user?.r_score ?? 0}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(["leaderboard", "myreputation", "badges", "nfts", "insights"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${activeTab === tab ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
              {tab === "myreputation" ? "My Reputation" : tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Leaderboard Tab */}
            {activeTab === "leaderboard" && (
              <>
                {/* Top 3 Podium */}
                {top3.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {top3.map((entry, i) => {
                      const medals = [<Crown key="c" size={16} className="text-yellow-400" />, <Medal key="m" size={16} className="text-gray-300" />, <Medal key="b" size={16} className="text-orange-400" />];
                      const colors = ["from-yellow-500/20 to-orange-600/20 border-yellow-500/30", "from-gray-400/20 to-gray-500/20 border-gray-400/30", "from-orange-500/20 to-red-600/20 border-orange-500/30"];
                      return (
                        <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                          className={`bg-gradient-to-br ${colors[i]} border rounded-xl p-3 text-center ${i === 0 ? "scale-105" : ""}`}>
                          <div className="flex justify-center mb-1">{medals[i]}</div>
                          <div className="text-xs font-mono text-cyan-400 truncate mb-0.5">{entry.display_name || `${entry.wallet_address?.slice(0, 8)}...`}</div>
                          <div className="text-lg font-bold text-yellow-400">{entry.r_score}</div>
                          <div className="text-[9px] text-gray-400">R-Score</div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Rest of Leaderboard */}
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-6 gap-2 px-3 py-2 bg-white/[0.03] border-b border-white/10 text-[10px] font-semibold text-gray-400 uppercase">
                    <div>#</div><div>Name</div><div className="text-right">R-Score</div><div className="text-right">Resolved</div><div className="text-right">Validations</div><div className="text-right">Level</div>
                  </div>
                  {rest.length === 0 && top3.length === 0 ? (
                    <div className="text-center py-8"><Users className="w-8 h-8 text-gray-700 mx-auto mb-2" /><p className="text-xs text-gray-500">No users ranked yet</p></div>
                  ) : (
                    rest.map((entry, i) => (
                      <motion.div key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                        className="grid grid-cols-6 gap-2 px-3 py-2 border-b border-white/5 hover:bg-white/[0.03] transition">
                        <div className="text-[11px] font-bold text-gray-500">{i + 4}</div>
                        <div className="text-[11px] font-mono text-cyan-400 truncate">{entry.display_name || `${entry.wallet_address?.slice(0, 8)}...`}</div>
                        <div className="text-[11px] text-right font-semibold text-yellow-400">{entry.r_score}</div>
                        <div className="text-[11px] text-right text-emerald-400">{entry.tickets_resolved}</div>
                        <div className="text-[11px] text-right text-gray-400">{entry.validations_done}</div>
                        <div className="text-[11px] text-right"><span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-semibold">{LEVEL_LABELS[entry.validator_level] || "Candidate"}</span></div>
                      </motion.div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* My Reputation Tab */}
            {activeTab === "myreputation" && (
              !connected ? (
                <div className="text-center py-16">
                  <Star className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                  <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                  <p className="text-sm text-gray-400 mb-4">View your reputation score and badges.</p>
                  <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {syncMsg && <div className={`p-2 rounded-lg text-xs font-semibold ${syncMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{syncMsg.text}</div>}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Award size={14} className="text-yellow-400" /> My Stats</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500">R-Score</div>
                        <div className="text-base font-bold text-yellow-400">{user?.r_score ?? 0}</div>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500">Tickets Submitted</div>
                        <div className="text-base font-bold">{user?.tickets_submitted ?? 0}</div>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500">Resolved</div>
                        <div className="text-base font-bold text-emerald-400">{user?.tickets_resolved ?? 0}</div>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500">Validations</div>
                        <div className="text-base font-bold">{user?.validations_done ?? 0}</div>
                      </div>
                    </div>
                  </div>
                  {/* Sync Actions */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Zap size={14} className="text-cyan-400" /> Sync & Mint</h3>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => handleSync("reputation")} disabled={syncLoading !== null}
                        className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-xs font-semibold disabled:opacity-50">{syncLoading === "reputation" ? "Syncing..." : "Sync Reputation"}</button>
                      <button onClick={() => handleSync("badges")} disabled={syncLoading !== null}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-xs font-semibold disabled:opacity-50">{syncLoading === "badges" ? "Syncing..." : "Sync Badges"}</button>
                      <button onClick={() => handleSync("nfts")} disabled={syncLoading !== null}
                        className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">{syncLoading === "nfts" ? "Minting..." : "Mint NFT"}</button>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Shield size={14} className="text-cyan-400" /> How to Earn R-Score</h3>
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex items-center gap-2"><Zap size={11} className="text-yellow-400" /> Submit valid problems: +10-50 per ticket</div>
                      <div className="flex items-center gap-2"><Zap size={11} className="text-cyan-400" /> Validate others&apos; tickets: +5-20 per validation</div>
                      <div className="flex items-center gap-2"><Zap size={11} className="text-emerald-400" /> Accurate validations: bonus multiplier</div>
                      <div className="flex items-center gap-2"><Zap size={11} className="text-purple-400" /> Resolve escalations: +25-100 per resolution</div>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Badges Tab */}
            {activeTab === "badges" && (
              !connected ? (
                <div className="text-center py-16">
                  <Award className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                  <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                  <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Award size={14} className="text-yellow-400" /> My Badges</h3>
                  {badges.length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-6">No badges earned yet</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {badges.map((b: any, i: number) => (
                        <motion.div key={b.id || i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                          className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border border-yellow-500/20 rounded-xl p-3 text-center">
                          <div className="text-2xl mb-1">{b.icon || b.emoji || "🏅"}</div>
                          <div className="text-xs font-bold">{b.name || b.badge_name || "Badge"}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{b.description || ""}</div>
                          {b.earned_at && <div className="text-[9px] text-gray-500 mt-1">{new Date(b.earned_at).toLocaleDateString()}</div>}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}

            {/* NFTs Tab */}
            {activeTab === "nfts" && (
              !connected ? (
                <div className="text-center py-16">
                  <Star className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                  <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                  <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Star size={14} className="text-purple-400" /> My Reputation NFTs</h3>
                  {nfts.length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-6">No reputation NFTs yet</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {nfts.map((n: any, i: number) => (
                        <motion.div key={n.id || i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                          className="bg-gradient-to-br from-purple-500/10 to-indigo-600/10 border border-purple-500/20 rounded-xl p-3">
                          <div className="text-lg font-bold text-purple-400">{n.name || n.token_name || "NFT"}</div>
                          <div className="text-[10px] text-gray-400 mt-1">{n.description || ""}</div>
                          {n.token_id && <div className="text-[9px] text-gray-500 mt-1 font-mono">#{n.token_id}</div>}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}

            {/* Insights Tab */}
            {activeTab === "insights" && (
              !connected ? (
                <div className="text-center py-16">
                  <TrendingUp className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                  <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                  <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><TrendingUp size={14} className="text-cyan-400" /> Reputation Insights</h3>
                  {insights ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(insights).map(([key, val]) => (
                        <div key={key} className="bg-white/[0.03] rounded-lg p-2.5">
                          <div className="text-[10px] text-gray-500 capitalize">{key.replace(/_/g, " ")}</div>
                          <div className="text-base font-bold">{typeof val === "number" ? val.toLocaleString() : String(val)}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 text-center py-6">No insights available yet</p>
                  )}
                </div>
              )
            )}
          </>
        )}
      </div>
    </main>
  );
}
