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
  ThumbsUp,
  ThumbsDown,
  FileX,
  Copy,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

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

interface Assignment {
  id: string;
  submission_id: string;
  title?: string;
  description?: string;
  category?: string;
  assigned_at: string;
  status: string;
}

interface ValidatorStatus {
  id: string;
  level: number;
  is_active: boolean;
  total_validations: number;
  reputation_score: number;
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
  const { connected, address, connect, getAuthHeaders, user } = useWallet();
  const [validators, setValidators] = useState<ChainValidator[]>([]);
  const [validations, setValidations] = useState<BackendValidation[]>([]);
  const [loading, setLoading] = useState(true);
  const [myStatus, setMyStatus] = useState<ValidatorStatus | null>(null);
  const [myAssignments, setMyAssignments] = useState<Assignment[]>([]);
  const [voteLoading, setVoteLoading] = useState<string | null>(null);
  const [voteMsg, setVoteMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [valDashboard, setValDashboard] = useState<any>(null);
  const [valHistory, setValHistory] = useState<any[]>([]);
  const [valLevelInfo, setValLevelInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "leaderboard" | "activity" | "mywork" | "dashboard" | "history">("overview");

  // Additional validator actions state
  const [validatorMe, setValidatorMe] = useState<any>(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyMsg, setApplyMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMsg, setRegisterMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [assignId, setAssignId] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignMsg, setAssignMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [assignmentsData, setAssignmentsData] = useState<any>(null);
  const [reassignLoading, setReassignLoading] = useState(false);
  const [sensitivityId, setSensitivityId] = useState("");
  const [sensitivityValue, setSensitivityValue] = useState("");
  const [sensitivityLoading, setSensitivityLoading] = useState(false);

  // ─── Fetch ──────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    try {
      const [validatorsRes] = await Promise.allSettled([
        fetch(`${CHAIN_API}/popp/validation/validators?pagination.limit=50`).then((r) => r.json()),
      ]);

      if (validatorsRes.status === "fulfilled" && validatorsRes.value?.validators) {
        setValidators(validatorsRes.value.validators);
      }
    } catch {
      // Silent fail
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Fetch My Validator Data ──────────────────────────────────────────

  const fetchMyData = useCallback(async () => {
    if (!connected) return;
    const headers = getAuthHeaders();
    try {
      const [statusRes, assignRes, dashRes, histRes, levelRes, meRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/validators/status`, { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BACKEND_API}/api/validators/my-assignment`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${BACKEND_API}/api/validators/dashboard`, { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BACKEND_API}/api/validators/history`, { headers }).then(r => r.ok ? r.json() : []),
        fetch(`${BACKEND_API}/api/validators/level-info`, { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BACKEND_API}/api/validators/me`, { headers }).then(r => r.ok ? r.json() : null),
      ]);
      if (statusRes.status === "fulfilled" && statusRes.value) setMyStatus(statusRes.value);
      if (assignRes.status === "fulfilled" && Array.isArray(assignRes.value)) setMyAssignments(assignRes.value);
      if (dashRes.status === "fulfilled" && dashRes.value) setValDashboard(dashRes.value);
      if (histRes.status === "fulfilled" && Array.isArray(histRes.value)) setValHistory(histRes.value);
      if (levelRes.status === "fulfilled" && levelRes.value) setValLevelInfo(levelRes.value);
      if (meRes.status === "fulfilled" && meRes.value) setValidatorMe(meRes.value);
    } catch { /* non-critical */ }
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchMyData(); }, [fetchMyData]);

  // ─── Submit Vote ──────────────────────────────────────────────────────

  const handleVote = async (submissionId: string, voteType: string) => {
    setVoteLoading(`${submissionId}-${voteType}`);
    setVoteMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/validators/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ submission_id: submissionId, vote_type: voteType, confidence: 80 }),
      });
      if (res.ok) {
        setVoteMsg({ text: "Vote submitted successfully!", ok: true });
        fetchMyData();
      } else {
        const err = await res.text();
        setVoteMsg({ text: err || "Vote failed", ok: false });
      }
    } catch (e: any) {
      setVoteMsg({ text: e.message || "Vote failed", ok: false });
    } finally {
      setVoteLoading(null);
    }
  };

  // ─── Self-Assign ──────────────────────────────────────────────────────

  const handleSelfAssign = async (submissionId: string) => {
    setVoteLoading(`assign-${submissionId}`);
    try {
      const res = await fetch(`${BACKEND_API}/api/validators/self-assign/${submissionId}`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setVoteMsg({ text: "Submission assigned to you!", ok: true });
        fetchMyData();
      } else {
        const err = await res.text();
        setVoteMsg({ text: err || "Assignment failed", ok: false });
      }
    } catch (e: any) {
      setVoteMsg({ text: e.message || "Assignment failed", ok: false });
    } finally {
      setVoteLoading(null);
    }
  };

  const handleApply = async () => {
    setApplyLoading(true); setApplyMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/validators/apply`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({}),
      });
      if (res.ok) setApplyMsg({ text: "Application submitted!", ok: true });
      else { const err = await res.text(); setApplyMsg({ text: err || "Failed", ok: false }); }
    } catch (e: any) { setApplyMsg({ text: e.message || "Failed", ok: false }); }
    finally { setApplyLoading(false); }
  };

  const handleRegister = async () => {
    setRegisterLoading(true); setRegisterMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/validators/register`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({}),
      });
      if (res.ok) { setRegisterMsg({ text: "Registered as validator!", ok: true }); fetchMyData(); }
      else { const err = await res.text(); setRegisterMsg({ text: err || "Failed", ok: false }); }
    } catch (e: any) { setRegisterMsg({ text: e.message || "Failed", ok: false }); }
    finally { setRegisterLoading(false); }
  };

  const handleAssign = async () => {
    if (!assignId) return;
    setAssignLoading(true); setAssignMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/validators/assign/${assignId}`, {
        method: "POST", headers: getAuthHeaders(),
      });
      if (res.ok) { setAssignMsg({ text: "Assigned!", ok: true }); setAssignId(""); fetchMyData(); }
      else { const err = await res.text(); setAssignMsg({ text: err || "Failed", ok: false }); }
    } catch (e: any) { setAssignMsg({ text: e.message || "Failed", ok: false }); }
    finally { setAssignLoading(false); }
  };

  const handleFetchAssignments = async () => {
    if (!assignId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/validators/assignments/${assignId}`, { headers: getAuthHeaders() });
      if (res.ok) setAssignmentsData(await res.json());
    } catch { /* ignore */ }
  };

  const handleReassign = async () => {
    if (!assignId) return;
    setReassignLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/api/validators/reassign/${assignId}`, {
        method: "POST", headers: getAuthHeaders(),
      });
      if (res.ok) { setAssignMsg({ text: "Reassigned!", ok: true }); fetchMyData(); }
      else { const err = await res.text(); setAssignMsg({ text: err || "Failed", ok: false }); }
    } catch (e: any) { setAssignMsg({ text: e.message || "Failed", ok: false }); }
    finally { setReassignLoading(false); }
  };

  const handleSensitivity = async () => {
    if (!sensitivityId || !sensitivityValue) return;
    setSensitivityLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/api/validators/set-sensitivity/${sensitivityId}`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ sensitivity: parseFloat(sensitivityValue) }),
      });
      if (res.ok) { setAssignMsg({ text: "Sensitivity updated!", ok: true }); setSensitivityId(""); setSensitivityValue(""); }
      else { const err = await res.text(); setAssignMsg({ text: err || "Failed", ok: false }); }
    } catch (e: any) { setAssignMsg({ text: e.message || "Failed", ok: false }); }
    finally { setSensitivityLoading(false); }
  };

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
            {(["overview", "leaderboard", "activity", "mywork", "dashboard", "history"] as const).map((tab) => (
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

        {/* ─── My Work Tab ──────────────────────────────────────────────── */}
        {activeTab === "mywork" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            {!connected ? (
              <div className="text-center py-12">
                <LogIn className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                <p className="text-sm text-gray-400 mb-4">Connect your wallet to access validator tools.</p>
                <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
              </div>
            ) : (
              <>
                {/* Validator Status Card */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Shield size={14} className="text-cyan-400" /> My Validator Status</h3>
                  {myStatus ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500">Level</div>
                        <div className="text-base font-bold">{VALIDATOR_LEVELS[myStatus.level]?.label || "Unknown"}</div>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500">Status</div>
                        <div className={`text-base font-bold ${myStatus.is_active ? "text-emerald-400" : "text-gray-500"}`}>{myStatus.is_active ? "Active" : "Inactive"}</div>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500">Validations</div>
                        <div className="text-base font-bold">{myStatus.total_validations}</div>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500">Reputation</div>
                        <div className="text-base font-bold text-yellow-400">{myStatus.reputation_score}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-400 mb-3">You are not registered as a validator yet.</p>
                      <Link href="/validators/exam"><button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Take Validator Exam</button></Link>
                    </div>
                  )}
                </div>

                {/* Vote Message */}
                {voteMsg && (
                  <div className={`mb-4 p-3 rounded-lg text-sm font-semibold ${voteMsg.ok ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                    {voteMsg.text}
                  </div>
                )}

                {/* My Assignments */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Target size={14} className="text-yellow-400" /> My Assignments ({myAssignments.length})</h3>
                  {myAssignments.length === 0 ? (
                    <div className="text-center py-6">
                      <Eye className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">No pending assignments. Browse the explorer to self-assign submissions.</p>
                      <Link href="/explorer"><button className="mt-3 px-3 py-1.5 bg-white/5 border border-white/15 rounded-lg text-xs font-semibold">Browse Explorer</button></Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myAssignments.map((a) => (
                        <div key={a.id} className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold truncate">{a.title || `Submission #${a.submission_id.slice(0, 8)}`}</h4>
                              <p className="text-[11px] text-gray-400 line-clamp-2">{a.description || "No description"}</p>
                              {a.category && <span className="inline-block mt-1 text-[10px] bg-white/10 rounded px-1.5 py-0.5 text-gray-300">{a.category}</span>}
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${a.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"}`}>{a.status}</span>
                          </div>
                          {a.status === "pending" && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              <button onClick={() => handleVote(a.submission_id, "valid")} disabled={voteLoading !== null}
                                className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded text-[11px] font-semibold transition disabled:opacity-50">
                                <ThumbsUp size={10} /> Valid {voteLoading === `${a.submission_id}-valid` && "..."}
                              </button>
                              <button onClick={() => handleVote(a.submission_id, "invalid")} disabled={voteLoading !== null}
                                className="flex items-center gap-1 px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-[11px] font-semibold transition disabled:opacity-50">
                                <ThumbsDown size={10} /> Invalid {voteLoading === `${a.submission_id}-invalid` && "..."}
                              </button>
                              <button onClick={() => handleVote(a.submission_id, "spam")} disabled={voteLoading !== null}
                                className="flex items-center gap-1 px-2.5 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded text-[11px] font-semibold transition disabled:opacity-50">
                                <FileX size={10} /> Spam {voteLoading === `${a.submission_id}-spam` && "..."}
                              </button>
                              <button onClick={() => handleVote(a.submission_id, "duplicate")} disabled={voteLoading !== null}
                                className="flex items-center gap-1 px-2.5 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-[11px] font-semibold transition disabled:opacity-50">
                                <Copy size={10} /> Duplicate {voteLoading === `${a.submission_id}-duplicate` && "..."}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Validator Actions */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Zap size={14} className="text-cyan-400" /> Validator Actions</h3>
                  {assignMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${assignMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{assignMsg.text}</div>}

                  {/* Apply / Register */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={handleApply} disabled={applyLoading} className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">{applyLoading ? "Applying..." : "Apply"}</button>
                    <button onClick={handleRegister} disabled={registerLoading} className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-lg text-xs font-semibold disabled:opacity-50">{registerLoading ? "Registering..." : "Register"}</button>
                  </div>
                  {applyMsg && <div className={`mb-2 p-1.5 rounded text-[10px] font-semibold ${applyMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{applyMsg.text}</div>}
                  {registerMsg && <div className={`mb-2 p-1.5 rounded text-[10px] font-semibold ${registerMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{registerMsg.text}</div>}

                  {/* Assign / Reassign / View Assignments */}
                  <div className="space-y-2 mb-4">
                    <div className="text-[10px] text-gray-400 font-semibold uppercase">Assign / Reassign</div>
                    <div className="flex gap-2">
                      <input value={assignId} onChange={e => setAssignId(e.target.value)} placeholder="Submission ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                      <button onClick={handleAssign} disabled={assignLoading || !assignId} className="px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-semibold disabled:opacity-50">{assignLoading ? "..." : "Assign"}</button>
                      <button onClick={handleReassign} disabled={reassignLoading || !assignId} className="px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-xs font-semibold disabled:opacity-50">{reassignLoading ? "..." : "Reassign"}</button>
                      <button onClick={handleFetchAssignments} disabled={!assignId} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-400">View</button>
                    </div>
                    {assignmentsData && (
                      <div className="bg-white/[0.03] rounded-lg p-2.5">
                        <pre className="text-[10px] text-gray-400 overflow-x-auto">{JSON.stringify(assignmentsData, null, 2)}</pre>
                      </div>
                    )}
                  </div>

                  {/* Sensitivity */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-gray-400 font-semibold uppercase">Set Sensitivity</div>
                    <div className="flex gap-2">
                      <input value={sensitivityId} onChange={e => setSensitivityId(e.target.value)} placeholder="Submission ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                      <input value={sensitivityValue} onChange={e => setSensitivityValue(e.target.value)} placeholder="Value (0-1)" type="number" step="0.1" min="0" max="1" className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                      <button onClick={handleSensitivity} disabled={sensitivityLoading || !sensitivityId || !sensitivityValue} className="px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-semibold disabled:opacity-50">{sensitivityLoading ? "..." : "Set"}</button>
                    </div>
                  </div>

                  {/* Validator Me Data */}
                  {validatorMe && (
                    <div className="mt-4 bg-white/[0.03] rounded-lg p-3">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2">My Validator Profile</div>
                      <pre className="text-[10px] text-gray-400 overflow-x-auto">{JSON.stringify(validatorMe, null, 2)}</pre>
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        )}

        {/* ─── Dashboard Tab ─────────────────────────────────────────────── */}
        {activeTab === "dashboard" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            {!connected ? (
              <div className="text-center py-16">
                <Shield className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
              </div>
            ) : valDashboard ? (
              <div className="space-y-4">
                {valLevelInfo && (
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-4">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Star size={14} className="text-cyan-400" /> Level Info</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {valLevelInfo.current_level != null && (
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <div className="text-[10px] text-gray-500">Current Level</div>
                          <div className="text-base font-bold">{VALIDATOR_LEVELS[valLevelInfo.current_level]?.label || valLevelInfo.current_level}</div>
                        </div>
                      )}
                      {valLevelInfo.required_score != null && (
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <div className="text-[10px] text-gray-500">Required Score</div>
                          <div className="text-base font-bold">{valLevelInfo.required_score}</div>
                        </div>
                      )}
                      {valLevelInfo.next_level && (
                        <div className="bg-white/5 rounded-lg p-2.5">
                          <div className="text-[10px] text-gray-500">Next Level</div>
                          <div className="text-base font-bold">{valLevelInfo.next_level}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><BarChart3 size={14} className="text-cyan-400" /> My Validator Dashboard</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(valDashboard).map(([key, val]) => (
                      <div key={key} className="bg-white/[0.03] rounded-lg p-2.5">
                        <div className="text-[10px] text-gray-500 capitalize">{key.replace(/_/g, " ")}</div>
                        <div className="text-sm font-bold">{typeof val === "number" ? val.toLocaleString() : String(val)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-gray-400">No dashboard data available</p>
              </div>
            )}
          </section>
        )}

        {/* ─── History Tab ─────────────────────────────────────────────── */}
        {activeTab === "history" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            {!connected ? (
              <div className="text-center py-16">
                <Shield className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Clock size={14} className="text-cyan-400" /> Validation History</h3>
                {valHistory.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-6">No validation history</p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {valHistory.map((h: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                        <CheckCircle size={12} className="text-emerald-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold">{h.submission_id ? `Submission #${h.submission_id.slice(0, 8)}` : "Validation"}</div>
                          <div className="text-[10px] text-gray-500">{h.vote_type || h.result || ""} {h.consensus != null ? `— ${h.consensus}% consensus` : ""}</div>
                        </div>
                        {h.created_at && <div className="text-[9px] text-gray-500">{new Date(h.created_at).toLocaleDateString()}</div>}
                      </div>
                    ))}
                  </div>
                )}
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
