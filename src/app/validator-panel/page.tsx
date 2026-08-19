"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Globe,
  Activity,
  BarChart3,
  Target,
  Star,
  Zap,
  Eye,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import Link from "next/link";

// ─── Constants ──────────────────────────────────────────────────────────────

const CHAIN_API = "https://chain.thharko.com";
const BACKEND_API = "https://popp.thharko.com";

const VALIDATOR_LEVELS = [
  { label: "Candidate", color: "text-gray-400", bg: "bg-gray-500/20", icon: <Star size={11} /> },
  { label: "Community", color: "text-blue-400", bg: "bg-blue-500/20", icon: <Users size={11} /> },
  { label: "Domain Expert", color: "text-cyan-400", bg: "bg-cyan-500/20", icon: <Target size={11} /> },
  { label: "Institutional", color: "text-purple-400", bg: "bg-purple-500/20", icon: <Shield size={11} /> },
  { label: "Autonomous", color: "text-yellow-400", bg: "bg-yellow-500/20", icon: <Zap size={11} /> },
  { label: "Emergency", color: "text-red-400", bg: "bg-red-500/20", icon: <AlertTriangle size={11} /> },
];

// ─── Types ──────────────────────────────────────────────────────────────────

interface ChainValidator {
  address: string;
  level: number;
  domain: string;
  reputation: number;
  stake: number;
  active: boolean;
  validations_count: number;
  accuracy_score: number;
  registered_at: number;
  region: string;
}

interface BackendValidation {
  id: string;
  validator_address?: string;
  ticket_id?: string;
  verdict?: string;
  confidence?: number;
  created_at: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function truncateAddr(addr: string): string {
  if (!addr || addr.length < 16) return addr || "—";
  return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
}

function timeAgo(ts: number): string {
  if (!ts || ts <= 0) return "—";
  const diff = Date.now() - ts * 1000;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ValidatorPanelPage() {
  const [validators, setValidators] = useState<ChainValidator[]>([]);
  const [validations, setValidations] = useState<BackendValidation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "leaderboard" | "activity">("overview");

  // ─── Fetch ──────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    try {
      const [validatorsRes, validationsRes] = await Promise.allSettled([
        fetch(`${CHAIN_API}/popp/validation/validators?pagination.limit=50`).then((r) => r.json()),
        fetch(`${BACKEND_API}/api/validations`).then((r) => r.ok ? r.json() : []),
      ]);

      if (validatorsRes.status === "fulfilled" && validatorsRes.value?.validators) {
        setValidators(validatorsRes.value.validators);
      }

      if (validationsRes.status === "fulfilled" && Array.isArray(validationsRes.value)) {
        setValidations(validationsRes.value.slice(0, 20));
      }
    } catch {
      // Silent fail
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Stats ──────────────────────────────────────────────────────────────

  const activeValidators = validators.filter((v) => v.active).length;
  const totalValidations = validators.reduce((sum, v) => sum + (v.validations_count || 0), 0);
  const avgAccuracy = validators.length > 0
    ? validators.reduce((sum, v) => sum + (v.accuracy_score || 0), 0) / validators.length
    : 0;
  const totalStake = validators.reduce((sum, v) => sum + (v.stake || 0), 0);

  const levelCounts = validators.reduce((acc, v) => {
    if (v.level != null) acc[v.level] = (acc[v.level] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const topValidators = [...validators].sort((a, b) => (b.reputation || 0) - (a.reputation || 0)).slice(0, 10);

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative py-6 px-4 sm:px-6 text-center overflow-hidden">
          <div className="absolute -top-40 left-0 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-3xl" />

          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
                <Shield className="h-4 w-4 text-cyan-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Validator Panel</span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Monitor validator network performance, track validations, and view reputation rankings.
            </p>
          </motion.div>
        </section>

        {/* ─── Stats ────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><Users className="h-3.5 w-3.5 text-cyan-400" /><span className="text-[11px] text-gray-400">Active</span></div>
              <div className="text-lg font-bold">{loading ? "—" : activeValidators}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><CheckCircle className="h-3.5 w-3.5 text-emerald-400" /><span className="text-[11px] text-gray-400">Validations</span></div>
              <div className="text-lg font-bold">{loading ? "—" : totalValidations.toLocaleString()}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><Target className="h-3.5 w-3.5 text-yellow-400" /><span className="text-[11px] text-gray-400">Avg Accuracy</span></div>
              <div className="text-lg font-bold">{loading ? "—" : `${avgAccuracy.toFixed(1)}%`}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><Layers className="h-3.5 w-3.5 text-purple-400" /><span className="text-[11px] text-gray-400">Total Stake</span></div>
              <div className="text-lg font-bold">{loading ? "—" : totalStake > 0 ? totalStake.toLocaleString() : "—"}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><TrendingUp className="h-3.5 w-3.5 text-emerald-400" /><span className="text-[11px] text-gray-400">Validators</span></div>
              <div className="text-lg font-bold">{loading ? "—" : validators.length}</div>
            </motion.div>
          </div>
        </section>

        {/* ─── Tabs ─────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <div className="flex flex-wrap gap-1.5">
            {(["overview", "leaderboard", "activity"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${
                  activeTab === tab ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* ─── Overview Tab ─────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Level Distribution */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><BarChart3 size={14} className="text-cyan-400" /> Validator Levels</h3>
                <div className="space-y-2">
                  {VALIDATOR_LEVELS.map((lvl, i) => {
                    const count = levelCounts[i] || 0;
                    const pct = validators.length > 0 ? (count / validators.length) * 100 : 0;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`${lvl.bg} ${lvl.color} rounded-full px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1 w-28`}>
                          {lvl.icon} {lvl.label}
                        </span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${lvl.bg.replace("/20", "/60")} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[11px] text-gray-400 w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Validators */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Award size={14} className="text-yellow-400" /> Top Validators</h3>
                {topValidators.length === 0 ? (
                  <div className="text-center py-6">
                    <Shield className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">No validators registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {topValidators.map((v, i) => (
                      <div key={v.address} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2">
                        <span className="text-[10px] font-bold text-gray-500 w-4">#{i + 1}</span>
                        <span className="text-[11px] font-mono text-cyan-400 flex-1 truncate">{truncateAddr(v.address)}</span>
                        <span className="text-[10px] text-gray-400">{v.validations_count || 0} val</span>
                        <span className="text-[10px] font-semibold text-emerald-400">{v.accuracy_score?.toFixed(1) || "0"}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Network Health */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Activity size={14} className="text-emerald-400" /> Network Health</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500 mb-0.5">Active Rate</div>
                    <div className="text-base font-bold text-emerald-400">
                      {validators.length > 0 ? `${((activeValidators / validators.length) * 100).toFixed(0)}%` : "—"}
                    </div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500 mb-0.5">Avg Stake</div>
                    <div className="text-base font-bold">
                      {validators.length > 0 ? (totalStake / validators.length).toFixed(0) : "—"}
                    </div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500 mb-0.5">Regions</div>
                    <div className="text-base font-bold">{new Set(validators.map((v) => v.region).filter(Boolean)).size || "—"}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500 mb-0.5">Domains</div>
                    <div className="text-base font-bold">{new Set(validators.map((v) => v.domain).filter(Boolean)).size || "—"}</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Clock size={14} className="text-yellow-400" /> Recent Activity</h3>
                {validations.length === 0 ? (
                  <div className="text-center py-6">
                    <Eye className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">No validation activity yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {validations.slice(0, 5).map((val) => (
                      <div key={val.id} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2">
                        <CheckCircle size={12} className="text-emerald-400 flex-shrink-0" />
                        <span className="text-[11px] font-mono text-gray-400 flex-1 truncate">{val.validator_address ? truncateAddr(val.validator_address) : "—"}</span>
                        <span className="text-[10px] text-gray-500">{val.verdict || "—"}</span>
                        <span className="text-[10px] text-gray-500">{timeAgo(new Date(val.created_at).getTime() / 1000)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── Leaderboard Tab ──────────────────────────────────────────── */}
        {activeTab === "leaderboard" && (
          <section className="max-w-7xl mx-auto px-6 pb-6">
            {validators.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">No Validators Yet</h3>
                <p className="text-sm text-gray-400 mb-4">The validator network is forming. Be among the first to join.</p>
                <Link href="/validators">
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Learn About Validators</button>
                </Link>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-x-auto">
                <div className="grid grid-cols-2 md:grid-cols-7 gap-3 px-3 py-2 bg-white/[0.03] border-b border-white/10 text-[10px] font-semibold text-gray-400 uppercase tracking-wider min-w-[600px]">
                  <div>#</div>
                  <div>Address</div>
                  <div>Level</div>
                  <div>Domain</div>
                  <div className="text-right">Reputation</div>
                  <div className="text-right">Validations</div>
                  <div className="text-right">Accuracy</div>
                </div>
                {topValidators.map((v, i) => {
                  const lvl = VALIDATOR_LEVELS[v.level] || VALIDATOR_LEVELS[0];
                  return (
                    <motion.div key={v.address} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className="grid grid-cols-2 md:grid-cols-7 gap-3 px-3 py-2 border-b border-white/10 hover:bg-white/[0.03] transition min-w-[600px]">
                      <div className="text-[11px] font-bold text-gray-500">#{i + 1}</div>
                      <div className="font-mono text-[11px] text-cyan-400 truncate" title={v.address}>{truncateAddr(v.address)}</div>
                      <div>
                        <span className={`${lvl.bg} ${lvl.color} rounded-full px-1.5 py-px text-[9px] font-semibold flex items-center gap-0.5 w-fit`}>
                          {lvl.icon} {lvl.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400">{v.domain || "—"}</div>
                      <div className="text-[11px] text-right font-semibold">{v.reputation?.toFixed(1) || "—"}</div>
                      <div className="text-[11px] text-right text-gray-400">{v.validations_count || 0}</div>
                      <div className="text-[11px] text-right font-semibold text-emerald-400">{v.accuracy_score ? `${v.accuracy_score.toFixed(1)}%` : "—"}</div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ─── Activity Tab ─────────────────────────────────────────────── */}
        {activeTab === "activity" && (
          <section className="max-w-7xl mx-auto px-6 pb-6">
            {validations.length === 0 ? (
              <div className="text-center py-12">
                <Eye className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">No Validation Activity</h3>
                <p className="text-sm text-gray-400">Validation records will appear here as validators review problems.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {validations.map((val, i) => (
                  <motion.div key={val.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                    <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-mono text-cyan-400">{val.validator_address ? truncateAddr(val.validator_address) : "—"}</span>
                        <span className="text-[10px] text-gray-500">validated</span>
                        <span className="text-[11px] font-mono text-gray-400">{val.ticket_id ? `#${val.ticket_id.slice(0, 8)}` : "—"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>Verdict: {val.verdict || "—"}</span>
                        {val.confidence != null && <span>Confidence: {val.confidence.toFixed(1)}%</span>}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 flex-shrink-0">{timeAgo(new Date(val.created_at).getTime() / 1000)}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-5 text-center">
            <h2 className="text-lg font-bold mb-1">Become a Validator</h2>
            <p className="text-gray-400 text-sm mb-4">Join the network and help validate real-world problems.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/validators"><button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Learn More</button></Link>
              <Link href="/explorer"><button className="px-4 py-2 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">Explore Problems</button></Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
