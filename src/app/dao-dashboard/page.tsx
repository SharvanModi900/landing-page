"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Vote,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Globe,
  Activity,
  BarChart3,
  Coins,
  Landmark,
  FileText,
  ArrowUpRight,
  Shield,
  Layers,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

// ─── Constants ──────────────────────────────────────────────────────────────

const CHAIN_API = "https://chain.thharko.com";
const BACKEND_API = "https://popp.thharko.com";

const PROPOSAL_STATUSES: Record<string, { label: string; color: string; bg: string }> = {
  PROPOSAL_STATUS_DEPOSIT_PERIOD: { label: "Deposit", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  PROPOSAL_STATUS_VOTING_PERIOD: { label: "Voting", color: "text-blue-400", bg: "bg-blue-500/20" },
  PROPOSAL_STATUS_PASSED: { label: "Passed", color: "text-emerald-400", bg: "bg-emerald-500/20" },
  PROPOSAL_STATUS_REJECTED: { label: "Rejected", color: "text-red-400", bg: "bg-red-500/20" },
  PROPOSAL_STATUS_FAILED: { label: "Failed", color: "text-gray-400", bg: "bg-gray-500/20" },
};

const VOTE_OPTIONS = [
  { label: "Yes", color: "text-emerald-400", bg: "bg-emerald-500/20" },
  { label: "No", color: "text-red-400", bg: "bg-red-500/20" },
  { label: "No With Veto", color: "text-orange-400", bg: "bg-orange-500/20" },
  { label: "Abstain", color: "text-gray-400", bg: "bg-gray-500/20" },
];

// ─── Types ──────────────────────────────────────────────────────────────────

interface Proposal {
  proposal_id: string;
  content: { "@type": string; title?: string; description?: string; summary?: string };
  status: string;
  final_tally_result?: { yes: string; no: string; no_with_veto: string; abstain: string };
  submit_time: string;
  voting_start_time: string;
  voting_end_time: string;
  total_deposit: { denom: string; amount: string }[];
}

interface StakingPool {
  bonded_tokens: string;
  not_bonded_tokens: string;
}

interface Supply {
  denom: string;
  amount: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatTokens(amount: string): string {
  const n = parseInt(amount, 10);
  if (isNaN(n)) return "—";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function timeUntil(dateStr: string): string {
  if (!dateStr) return "—";
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24) return `${hrs}h left`;
  return `${Math.floor(hrs / 24)}d left`;
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function DAODashboardPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [backendProposals, setBackendProposals] = useState<any[]>([]);
  const [stakingPool, setStakingPool] = useState<StakingPool | null>(null);
  const [supply, setSupply] = useState<Supply | null>(null);
  const [treasury, setTreasury] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [voteTarget, setVoteTarget] = useState<string | null>(null);
  const [voteOption, setVoteOption] = useState<string>("");
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteMsg, setVoteMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // ─── Fetch ──────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    try {
      const [proposalsRes, poolRes, supplyRes, treasuryRes, backendProposalsRes] = await Promise.allSettled([
        fetch(`${CHAIN_API}/cosmos/gov/v1beta1/proposals?pagination.limit=50`).then((r) => r.json()),
        fetch(`${CHAIN_API}/cosmos/staking/v1beta1/pool`).then((r) => r.json()),
        fetch(`${CHAIN_API}/cosmos/bank/v1beta1/supply`).then((r) => r.json()),
        fetch(`${BACKEND_API}/api/governance/treasury`).then((r) => r.ok ? r.json() : null),
        fetch(`${BACKEND_API}/api/governance/proposals`).then((r) => r.ok ? r.json() : []),
      ]);

      if (proposalsRes.status === "fulfilled" && proposalsRes.value?.proposals) {
        setProposals(proposalsRes.value.proposals);
      }
      if (poolRes.status === "fulfilled" && poolRes.value?.pool) {
        setStakingPool(poolRes.value.pool);
      }
      if (supplyRes.status === "fulfilled" && supplyRes.value?.supply) {
        const stakeSupply = supplyRes.value.supply.find((s: Supply) => s.denom === "stake");
        if (stakeSupply) setSupply(stakeSupply);
      }
      if (treasuryRes.status === "fulfilled" && treasuryRes.value) {
        setTreasury(treasuryRes.value);
      }
      if (backendProposalsRes.status === "fulfilled" && Array.isArray(backendProposalsRes.value)) {
        setBackendProposals(backendProposalsRes.value);
      }
    } catch {
      // Silent
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Cast Vote ────────────────────────────────────────────────────────

  const handleVote = async (proposalId: string) => {
    if (!connected) { await connect(); return; }
    if (!voteOption) return;
    setVoteLoading(true);
    setVoteMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/governance/proposals/${proposalId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ vote: voteOption }),
      });
      if (res.ok) {
        setVoteMsg({ text: "Vote cast successfully!", ok: true });
        setVoteTarget(null);
        fetchData();
      } else {
        const err = await res.text();
        setVoteMsg({ text: err || "Vote failed", ok: false });
      }
    } catch (e: any) {
      setVoteMsg({ text: e.message || "Vote failed", ok: false });
    } finally {
      setVoteLoading(false);
    }
  };

  // ─── Create Proposal ──────────────────────────────────────────────────

  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [newProposal, setNewProposal] = useState({ title: "", description: "" });
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreateProposal = async () => {
    if (!connected) { await connect(); return; }
    if (!newProposal.title || !newProposal.description) return;
    setCreateLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/api/governance/proposals`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ title: newProposal.title, description: newProposal.description, proposal_type: "text" }),
      });
      if (res.ok) {
        setNewProposal({ title: "", description: "" });
        setShowCreateProposal(false);
        fetchData();
      }
    } catch { /* ignore */ }
    finally { setCreateLoading(false); }
  };

  // ─── Derived ────────────────────────────────────────────────────────────

  const bondedTokens = parseInt(stakingPool?.bonded_tokens || "0", 10);
  const notBondedTokens = parseInt(stakingPool?.not_bonded_tokens || "0", 10);
  const totalSupply = parseInt(supply?.amount || "0", 10);
  const bondedPct = totalSupply > 0 ? (bondedTokens / totalSupply) * 100 : 0;

  const statusCounts = proposals.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const activeProposals = proposals.filter((p) => p.status === "PROPOSAL_STATUS_VOTING_PERIOD" || p.status === "PROPOSAL_STATUS_DEPOSIT_PERIOD");
  const passedProposals = proposals.filter((p) => p.status === "PROPOSAL_STATUS_PASSED");
  const rejectedProposals = proposals.filter((p) => p.status === "PROPOSAL_STATUS_REJECTED");

  const filteredProposals = statusFilter === "all" ? proposals : proposals.filter((p) => p.status === statusFilter);

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative py-6 px-4 sm:px-6 text-center overflow-hidden">
          <div className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-3xl" />

          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 ring-1 ring-blue-500/30">
                <Landmark className="h-4 w-4 text-blue-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">DAO Dashboard</span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Participate in governance, vote on proposals, and shape the future of PoPP protocol.
            </p>
          </motion.div>
        </section>

        {/* ─── Stats ────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><Vote className="h-3.5 w-3.5 text-blue-400" /><span className="text-[11px] text-gray-400">Proposals</span></div>
              <div className="text-lg font-bold">{loading ? "—" : proposals.length}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><Clock className="h-3.5 w-3.5 text-yellow-400" /><span className="text-[11px] text-gray-400">Active</span></div>
              <div className="text-lg font-bold">{loading ? "—" : activeProposals.length}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><CheckCircle className="h-3.5 w-3.5 text-emerald-400" /><span className="text-[11px] text-gray-400">Passed</span></div>
              <div className="text-lg font-bold">{loading ? "—" : passedProposals.length}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><Coins className="h-3.5 w-3.5 text-cyan-400" /><span className="text-[11px] text-gray-400">Bonded</span></div>
              <div className="text-lg font-bold">{loading ? "—" : formatTokens(bondedTokens.toString())}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><Wallet className="h-3.5 w-3.5 text-purple-400" /><span className="text-[11px] text-gray-400">Total Supply</span></div>
              <div className="text-lg font-bold">{loading ? "—" : formatTokens(totalSupply.toString())}</div>
            </motion.div>
          </div>
        </section>

        {/* ─── Treasury & Staking ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Staking Overview */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Layers size={14} className="text-cyan-400" /> Staking Overview</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-gray-400">Bonded Ratio</span>
                    <span className="font-semibold text-emerald-400">{bondedPct.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all" style={{ width: `${bondedPct}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/[0.03] rounded-lg p-2">
                    <div className="text-[10px] text-gray-500">Bonded</div>
                    <div className="text-sm font-bold">{formatTokens(bondedTokens.toString())}</div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg p-2">
                    <div className="text-[10px] text-gray-500">Not Bonded</div>
                    <div className="text-sm font-bold">{formatTokens(notBondedTokens.toString())}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Governance Status */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><BarChart3 size={14} className="text-purple-400" /> Proposal Breakdown</h3>
              {proposals.length === 0 ? (
                <div className="text-center py-4">
                  <FileText className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">No proposals submitted yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {Object.entries(PROPOSAL_STATUSES).map(([key, info]) => {
                    const count = statusCounts[key] || 0;
                    const pct = proposals.length > 0 ? (count / proposals.length) * 100 : 0;
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <span className={`${info.bg} ${info.color} rounded-full px-2 py-0.5 text-[10px] font-semibold w-16 text-center`}>{info.label}</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${info.bg.replace("/20", "/60")}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[11px] text-gray-400 w-4 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── Proposals ────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-2">
            <h2 className="text-sm font-bold flex items-center gap-1.5"><FileText size={14} className="text-blue-400" /> Proposals</h2>
            <div className="flex flex-wrap gap-1">
              {["all", "PROPOSAL_STATUS_DEPOSIT_PERIOD", "PROPOSAL_STATUS_VOTING_PERIOD", "PROPOSAL_STATUS_PASSED", "PROPOSAL_STATUS_REJECTED"].map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition ${statusFilter === s ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
                  {s === "all" ? "All" : PROPOSAL_STATUSES[s]?.label || s}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-gray-400">Loading proposals...</span>
              </div>
            </div>
          ) : filteredProposals.length === 0 ? (
            <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
              <Vote className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">
                {statusFilter === "all" ? "No Proposals Yet" : `No ${PROPOSAL_STATUSES[statusFilter]?.label || ""} Proposals`}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {statusFilter === "all"
                  ? "The governance module is active. Submit a proposal to start the democratic process."
                  : "No proposals match this filter."}
              </p>
              {statusFilter === "all" && (
                <div className="max-w-md mx-auto bg-white/[0.03] border border-white/10 rounded-lg p-4 text-left">
                  <h4 className="text-xs font-semibold text-blue-400 mb-2 flex items-center gap-1.5"><Shield size={12} /> How Governance Works</h4>
                  <ol className="text-[11px] text-gray-400 space-y-1.5">
                    <li className="flex gap-2"><span className="text-cyan-400 font-bold">1.</span> Submit a proposal with a deposit</li>
                    <li className="flex gap-2"><span className="text-cyan-400 font-bold">2.</span> Deposit period: gather minimum deposit from community</li>
                    <li className="flex gap-2"><span className="text-cyan-400 font-bold">3.</span> Voting period: all stakers vote Yes / No / NoWithVeto / Abstain</li>
                    <li className="flex gap-2"><span className="text-cyan-400 font-bold">4.</span> If majority votes Yes and no veto, the proposal passes</li>
                  </ol>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProposals.map((proposal, i) => {
                const statusInfo = PROPOSAL_STATUSES[proposal.status] || PROPOSAL_STATUSES.PROPOSAL_STATUS_DEPOSIT_PERIOD;
                const title = proposal.content?.title || proposal.content?.summary || `Proposal #${proposal.proposal_id}`;
                const tally = proposal.final_tally_result;
                const totalVotes = tally ? parseInt(tally.yes) + parseInt(tally.no) + parseInt(tally.no_with_veto) + parseInt(tally.abstain) : 0;

                return (
                  <motion.div key={proposal.proposal_id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/[0.07] transition">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono text-gray-500">#{proposal.proposal_id}</span>
                          <span className={`${statusInfo.bg} ${statusInfo.color} rounded-full px-2 py-px text-[9px] font-semibold`}>{statusInfo.label}</span>
                        </div>
                        <h3 className="font-semibold text-sm truncate">{title}</h3>
                      </div>
                      {(proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD" || proposal.status === "PROPOSAL_STATUS_DEPOSIT_PERIOD") && (
                        <span className="text-[10px] text-yellow-400 flex items-center gap-0.5 ml-2 flex-shrink-0">
                          <Clock size={10} /> {timeUntil(proposal.voting_end_time)}
                        </span>
                      )}
                    </div>

                    {/* Tally Bar */}
                    {tally && totalVotes > 0 && (
                      <div className="mb-2">
                        <div className="flex h-1.5 rounded-full overflow-hidden bg-white/5">
                          <div className="bg-emerald-500/60" style={{ width: `${(parseInt(tally.yes) / totalVotes) * 100}%` }} />
                          <div className="bg-red-500/60" style={{ width: `${(parseInt(tally.no) / totalVotes) * 100}%` }} />
                          <div className="bg-orange-500/60" style={{ width: `${(parseInt(tally.no_with_veto) / totalVotes) * 100}%` }} />
                          <div className="bg-gray-500/60" style={{ width: `${(parseInt(tally.abstain) / totalVotes) * 100}%` }} />
                        </div>
                        <div className="flex gap-3 mt-1 text-[9px] text-gray-500">
                          <span className="text-emerald-400">Yes {((parseInt(tally.yes) / totalVotes) * 100).toFixed(0)}%</span>
                          <span className="text-red-400">No {((parseInt(tally.no) / totalVotes) * 100).toFixed(0)}%</span>
                          <span className="text-orange-400">Veto {((parseInt(tally.no_with_veto) / totalVotes) * 100).toFixed(0)}%</span>
                          <span className="text-gray-400">Abstain {((parseInt(tally.abstain) / totalVotes) * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[10px] text-gray-500">
                        <span className="flex items-center gap-0.5"><Clock size={10} /> {timeAgo(proposal.submit_time)}</span>
                        {proposal.total_deposit?.[0] && (
                          <span className="flex items-center gap-0.5"><Coins size={10} /> {formatTokens(proposal.total_deposit[0].amount)} deposit</span>
                        )}
                      </div>
                      {(proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD") && (
                        <button onClick={() => { setVoteTarget(proposal.proposal_id); setVoteOption(""); setVoteMsg(null); }}
                          className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-[10px] font-semibold flex items-center gap-0.5">
                          Vote <ArrowUpRight size={10} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ─── Vote Modal ────────────────────────────────────────────────── */}
        {voteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 max-w-sm w-full">
              <h3 className="text-base font-bold mb-3">Vote on Proposal #{voteTarget}</h3>
              {voteMsg && (
                <div className={`mb-3 p-2 rounded text-xs font-semibold ${voteMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{voteMsg.text}</div>
              )}
              <div className="space-y-2 mb-4">
                {VOTE_OPTIONS.map((opt) => (
                  <button key={opt.label} onClick={() => setVoteOption(opt.label.toLowerCase().replace(/ /g, "_"))}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition ${voteOption === opt.label.toLowerCase().replace(/ /g, "_") ? `${opt.bg} ${opt.color} border border-white/20` : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleVote(voteTarget)} disabled={!voteOption || voteLoading}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-semibold disabled:opacity-50">
                  {voteLoading ? "Submitting..." : "Submit Vote"}
                </button>
                <button onClick={() => setVoteTarget(null)} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ─── Create Proposal Modal ──────────────────────────────────────── */}
        {showCreateProposal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 max-w-md w-full">
              <h3 className="text-base font-bold mb-3">Create Proposal</h3>
              <input value={newProposal.title} onChange={e => setNewProposal(p => ({ ...p, title: e.target.value }))}
                placeholder="Proposal title" className="w-full mb-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500" />
              <textarea value={newProposal.description} onChange={e => setNewProposal(p => ({ ...p, description: e.target.value }))}
                placeholder="Describe your proposal..." rows={4} className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 resize-none" />
              <div className="flex gap-2">
                <button onClick={handleCreateProposal} disabled={createLoading || !newProposal.title || !newProposal.description}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-semibold disabled:opacity-50">
                  {createLoading ? "Submitting..." : "Submit Proposal"}
                </button>
                <button onClick={() => setShowCreateProposal(false)} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ─── Backend Proposals ───────────────────────────────────────────── */}
        {backendProposals.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
            <h2 className="text-sm font-bold flex items-center gap-1.5 mb-3"><Activity size={14} className="text-cyan-400" /> Backend Governance Proposals</h2>
            <div className="space-y-2">
              {backendProposals.map((bp: any, i: number) => (
                <div key={bp.id || i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-gray-500">#{(bp.id || "").slice(0, 8)}</span>
                    <span className={`rounded-full px-2 py-px text-[9px] font-semibold ${bp.status === "active" ? "bg-blue-500/20 text-blue-400" : bp.status === "passed" ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-400"}`}>{bp.status || "pending"}</span>
                  </div>
                  <h3 className="text-sm font-semibold">{bp.title || "Untitled Proposal"}</h3>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5">{bp.description || ""}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Treasury (Backend) ──────────────────────────────────────────── */}
        {treasury && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5"><Coins size={14} className="text-yellow-400" /> DAO Treasury</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {treasury.balance != null && (
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Balance</div>
                    <div className="text-sm font-bold">{typeof treasury.balance === "number" ? treasury.balance.toLocaleString() : treasury.balance}</div>
                  </div>
                )}
                {treasury.total_rewards != null && (
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Total Rewards</div>
                    <div className="text-sm font-bold">{typeof treasury.total_rewards === "number" ? treasury.total_rewards.toLocaleString() : treasury.total_rewards}</div>
                  </div>
                )}
                {treasury.total_slashed != null && (
                  <div className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Total Slashed</div>
                    <div className="text-sm font-bold">{typeof treasury.total_slashed === "number" ? treasury.total_slashed.toLocaleString() : treasury.total_slashed}</div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-5 text-center">
            <h2 className="text-lg font-bold mb-1">Shape the Future of PoPP</h2>
            <p className="text-gray-400 text-sm mb-4">Stake tokens, submit proposals, and vote on governance decisions.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => { if (!connected) connect(); else setShowCreateProposal(true); }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-semibold">
                {connected ? "Create Proposal" : "Connect Wallet to Propose"}
              </button>
              <Link href="/validators"><button className="px-4 py-2 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">Become a Validator</button></Link>
              <Link href="/explorer"><button className="px-4 py-2 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">Explore Network</button></Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
