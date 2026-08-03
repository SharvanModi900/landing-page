"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Globe,
  Activity,
  ChevronDown,
  X,
  ExternalLink,
  Layers,
} from "lucide-react";
import Link from "next/link";

// ─── Constants ──────────────────────────────────────────────────────────────

const CHAIN_API = "https://chain.thharko.com";
const BACKEND_API = "https://popp.thharko.com";

const TICKET_STATUSES: Record<number, { label: string; color: string; bg: string }> = {
  0: { label: "Submitted", color: "text-blue-400", bg: "bg-blue-500/20" },
  1: { label: "Validating", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  2: { label: "Validated", color: "text-emerald-400", bg: "bg-emerald-500/20" },
  3: { label: "Rejected", color: "text-red-400", bg: "bg-red-500/20" },
  4: { label: "Proven", color: "text-purple-400", bg: "bg-purple-500/20" },
  5: { label: "Escalated", color: "text-orange-400", bg: "bg-orange-500/20" },
  6: { label: "Resolved", color: "text-cyan-400", bg: "bg-cyan-500/20" },
};

const CATEGORIES = [
  "All",
  "Environment",
  "Infrastructure",
  "Education",
  "Healthcare",
  "Governance",
  "Technology",
  "Social",
  "Other",
];

const STATUS_FILTERS = [
  { label: "All", value: -1 },
  { label: "Submitted", value: 0 },
  { label: "Validating", value: 1 },
  { label: "Validated", value: 2 },
  { label: "Rejected", value: 3 },
  { label: "Proven", value: 4 },
  { label: "Escalated", value: 5 },
  { label: "Resolved", value: 6 },
];

// ─── Types ──────────────────────────────────────────────────────────────────

interface ChainTicket {
  id: string;
  description: string;
  location: string;
  category: string;
  evidence_hash: string;
  submitter: string;
  status: number;
  timestamp: number;
  region: string;
  validation_score: number;
  proof_id: string;
}

interface BackendSubmission {
  id: string;
  title?: string;
  description: string;
  latitude: number;
  longitude: number;
  category?: string;
  status?: string;
  escalation_level?: string;
  consensus_score?: number;
  created_at: string;
  ai_summary?: string;
  ai_category?: string;
  ai_severity?: string;
  ai_urgency?: string;
}

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

interface ChainNodeStatus {
  result: {
    node_info: { network: string; version: string };
    sync_info: {
      latest_block_height: string;
      latest_block_time: string;
      catching_up: boolean;
    };
    validator_info: { address: string; voting_power: string };
  };
}

// ─── Helper ─────────────────────────────────────────────────────────────────

function timeAgo(ts: number): string {
  const now = Date.now();
  const diff = now - ts * 1000;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function truncateAddr(addr: string): string {
  if (!addr || addr.length < 16) return addr || "—";
  return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
}

const VALIDATOR_LEVELS = ["Candidate", "Community", "Domain Expert", "Institutional", "Autonomous", "Emergency"];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ProblemExplorerPage() {
  // Data
  const [tickets, setTickets] = useState<ChainTicket[]>([]);
  const [submissions, setSubmissions] = useState<BackendSubmission[]>([]);
  const [validators, setValidators] = useState<ChainValidator[]>([]);
  const [nodeStatus, setNodeStatus] = useState<ChainNodeStatus | null>(null);
  const [totalTickets, setTotalTickets] = useState("0");

  // UI state
  const [searchQ, setSearchQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState(-1);
  const [activeView, setActiveView] = useState<"problems" | "validators">("problems");
  const [loading, setLoading] = useState(true);
  const [chainError, setChainError] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // ─── Data Fetching ──────────────────────────────────────────────────────

  const fetchChainData = useCallback(async () => {
    try {
      const [ticketsRes, nodeRes, validatorsRes] = await Promise.allSettled([
        fetch(`${CHAIN_API}/popp/ticket/tickets?pagination.limit=50`).then((r) => r.json()),
        fetch(`${CHAIN_API}/cosmos/base/tendermint/v1beta1/node_info`).then((r) => r.json()),
        fetch(`${CHAIN_API}/popp/validation/validators?pagination.limit=20`).then((r) => r.json()),
      ]);

      if (ticketsRes.status === "fulfilled" && ticketsRes.value?.tickets) {
        setTickets(ticketsRes.value.tickets);
        setTotalTickets(ticketsRes.value.pagination?.total || ticketsRes.value.tickets.length.toString());
      } else {
        setChainError(true);
      }

      if (nodeRes.status === "fulfilled" && nodeRes.value) {
        setNodeStatus(nodeRes.value);
      }

      if (validatorsRes.status === "fulfilled" && validatorsRes.value?.validators) {
        setValidators(validatorsRes.value.validators);
      }
    } catch {
      setChainError(true);
    }
  }, []);

  const fetchBackendData = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(Array.isArray(data) ? data : []);
      }
    } catch {
      // Backend might be unavailable, that's ok
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchChainData(), fetchBackendData()]);
      setLoading(false);
    };
    load();
  }, [fetchChainData, fetchBackendData]);

  // ─── Filtered Data ─────────────────────────────────────────────────────

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter >= 0 && t.status !== statusFilter) return false;
    if (categoryFilter !== "All" && t.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return (
        t.description?.toLowerCase().includes(q) ||
        t.location?.toLowerCase().includes(q) ||
        t.id?.toLowerCase().includes(q) ||
        t.region?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredSubmissions = submissions.filter((s) => {
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return (
        s.title?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.id?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ─── Stats ─────────────────────────────────────────────────────────────

  const statusCounts = tickets.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  const validatedCount = (statusCounts[2] || 0) + (statusCounts[4] || 0);
  const inProgressCount = (statusCounts[1] || 0) + (statusCounts[5] || 0);
  const resolvedCount = statusCounts[6] || 0;

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative py-6 px-6 text-center overflow-hidden">
          <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-3xl animate-pulse-slow" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
                <Globe className="h-4 w-4 text-cyan-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Problem Explorer
                </span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Browse live problems on the PoPP network. Filter by category, status, and location.
            </p>

            {nodeStatus && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-400">{nodeStatus.result?.node_info?.network || "popp-mainnet-1"}</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">#{nodeStatus.result?.sync_info?.latest_block_height || "—"}</span>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* ─── Stats ────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 mb-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Total", value: totalTickets, icon: <Layers className="h-3.5 w-3.5 text-cyan-400" />, gradient: "from-cyan-500/20 to-blue-600/20" },
              { label: "Validated", value: validatedCount.toString(), icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />, gradient: "from-emerald-500/20 to-teal-600/20" },
              { label: "In Progress", value: inProgressCount.toString(), icon: <Clock className="h-3.5 w-3.5 text-yellow-400" />, gradient: "from-yellow-500/20 to-orange-600/20" },
              { label: "Resolved", value: resolvedCount.toString(), icon: <Activity className="h-3.5 w-3.5 text-purple-400" />, gradient: "from-purple-500/20 to-pink-600/20" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-gradient-to-br ${stat.gradient} border border-white/10 rounded-lg p-2.5`}
              >
                <div className="flex items-center gap-1.5 mb-1">{stat.icon}<span className="text-[11px] text-gray-400">{stat.label}</span></div>
                <div className="text-lg font-bold">{loading ? "—" : stat.value}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Search & Filters ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search */}
              <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 gap-1.5">
                <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search description, location, ID..."
                  className="bg-transparent outline-none text-xs text-white placeholder:text-gray-500 w-full"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                />
                {searchQ && (
                  <button onClick={() => setSearchQ("")} className="text-gray-500 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveView("problems")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    activeView === "problems"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                >
                  Problems
                </button>
                <button
                  onClick={() => setActiveView("validators")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    activeView === "validators"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                >
                  Validators
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white/5 text-gray-400 hover:text-white border border-white/10 flex items-center gap-1.5"
                >
                  <Filter size={13} />
                  Filters
                  <ChevronDown size={12} className={`transition ${showFilters ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 flex flex-col md:flex-row gap-3">
                    {/* Category Filter */}
                    <div className="flex-1">
                      <label className="text-[11px] text-gray-400 mb-1.5 block">Category</label>
                      <div className="flex flex-wrap gap-1.5">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition ${
                              categoryFilter === cat
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="text-[11px] text-gray-400 mb-1.5 block">Status</label>
                      <div className="flex flex-wrap gap-1.5">
                        {STATUS_FILTERS.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => setStatusFilter(s.value)}
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition ${
                              statusFilter === s.value
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Problems View ────────────────────────────────────────────── */}
        {activeView === "problems" && (
          <section className="max-w-7xl mx-auto px-6 pb-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-gray-400">Loading from chain...</span>
                </div>
              </div>
            ) : chainError && tickets.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">Chain Unavailable</h3>
                <p className="text-gray-400 text-sm mb-3">Could not connect to the PoPP chain.</p>
                <button
                  onClick={() => { setLoading(true); fetchChainData().then(() => setLoading(false)); }}
                  className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold"
                >
                  Retry
                </button>
              </div>
            ) : filteredTickets.length === 0 && filteredSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">No Problems Found</h3>
                <p className="text-sm text-gray-400">
                  {searchQ || categoryFilter !== "All" || statusFilter >= 0
                    ? "Try adjusting your filters."
                    : "No problems have been submitted yet."}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Chain Tickets */}
                {filteredTickets.map((ticket, i) => {
                  const statusInfo = TICKET_STATUSES[ticket.status] || TICKET_STATUSES[0];
                  return (
                    <motion.div
                      key={`chain-${ticket.id || i}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/[0.07] transition group"
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="px-1.5 py-px text-[9px] font-bold rounded bg-cyan-500/20 text-cyan-400 uppercase tracking-wider">Chain</span>
                            <span className="text-[11px] text-gray-500 font-mono">{ticket.id ? `#${ticket.id.slice(0, 8)}` : "—"}</span>
                          </div>
                          <h3 className="font-semibold text-sm mb-0.5 truncate">{ticket.description || "Untitled Problem"}</h3>
                          <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
                            {ticket.location && <span className="flex items-center gap-0.5"><MapPin size={11} /> {ticket.location}</span>}
                            {ticket.timestamp > 0 && <span className="flex items-center gap-0.5"><Calendar size={11} /> {timeAgo(ticket.timestamp)}</span>}
                            {ticket.region && <span className="flex items-center gap-0.5"><Globe size={11} /> {ticket.region}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-3">
                          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${statusInfo.bg} ${statusInfo.color}`}>{statusInfo.label}</span>
                          {ticket.validation_score > 0 && <span className="text-[10px] text-gray-500">Score: {ticket.validation_score.toFixed(1)}</span>}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {ticket.category && <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-px rounded">{ticket.category}</span>}
                          {ticket.submitter && <span className="text-[10px] text-gray-600 font-mono">{truncateAddr(ticket.submitter)}</span>}
                        </div>
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
                          {ticket.evidence_hash && <span className="text-[10px] text-gray-500">{ticket.evidence_hash.slice(0, 10)}...</span>}
                          <Eye size={12} className="text-cyan-400" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Backend Submissions (if no chain tickets or showing both) */}
                {filteredSubmissions.length > 0 && tickets.length === 0 && (
                  <>
                    <div className="flex items-center gap-3 pt-2 pb-1">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Backend Submissions</span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    {filteredSubmissions.slice(0, 20).map((sub, i) => (
                      <motion.div
                        key={`sub-${sub.id}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/[0.07] transition group"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="px-1.5 py-px text-[9px] font-bold rounded bg-purple-500/20 text-purple-400 uppercase tracking-wider">Backend</span>
                              <span className="text-[11px] text-gray-500 font-mono">#{sub.id.slice(0, 8)}</span>
                            </div>
                            <h3 className="font-semibold text-sm mb-0.5 truncate">{sub.title || sub.description?.slice(0, 80) || "Untitled"}</h3>
                            <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
                              <span className="flex items-center gap-0.5"><MapPin size={11} /> {sub.latitude.toFixed(4)}, {sub.longitude.toFixed(4)}</span>
                              <span className="flex items-center gap-0.5"><Calendar size={11} /> {new Date(sub.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-3">
                            {sub.status && <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-500/20 text-blue-400">{sub.status}</span>}
                            {sub.ai_severity && (
                              <span className={`text-[10px] font-semibold ${
                                sub.ai_severity === "high" || sub.ai_severity === "critical" ? "text-red-400" : sub.ai_severity === "medium" ? "text-yellow-400" : "text-green-400"
                              }`}>{sub.ai_severity}</span>
                            )}
                          </div>
                        </div>
                        {sub.ai_summary && <p className="text-[11px] text-gray-400 line-clamp-1 mb-1">{sub.ai_summary}</p>}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {sub.category && <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-px rounded">{sub.category}</span>}
                            {sub.consensus_score != null && <span className="text-[10px] text-gray-500">Consensus: {sub.consensus_score.toFixed(1)}</span>}
                          </div>
                          <Link href={`/explorer/${sub.id}`} className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                            Details <ExternalLink size={10} />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            )}
          </section>
        )}

        {/* ─── Validators View ──────────────────────────────────────────── */}
        {activeView === "validators" && (
          <section className="max-w-7xl mx-auto px-6 pb-6">
            {validators.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">No Validators Found</h3>
                <p className="text-sm text-gray-400">No validators registered on the chain yet.</p>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 px-3 py-2 bg-white/[0.03] border-b border-white/10 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  <div>Address</div>
                  <div>Level</div>
                  <div>Domain</div>
                  <div className="text-right">Reputation</div>
                  <div className="text-right">Validations</div>
                  <div className="text-right">Accuracy</div>
                </div>

                {validators.map((v, i) => (
                  <motion.div
                    key={v.address || i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="grid grid-cols-2 md:grid-cols-6 gap-3 px-3 py-2 border-b border-white/10 hover:bg-white/[0.03] transition"
                  >
                    <div className="font-mono text-[11px] text-cyan-400 truncate" title={v.address}>{truncateAddr(v.address)}</div>
                    <div>
                      <span className="px-1.5 py-px text-[10px] font-semibold rounded-full bg-purple-500/20 text-purple-400">
                        {VALIDATOR_LEVELS[v.level] || `L${v.level}`}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400">{v.domain || "—"}</div>
                    <div className="text-[11px] text-right font-semibold">{v.reputation?.toFixed(1) || "—"}</div>
                    <div className="text-[11px] text-right text-gray-400">{v.validations_count || 0}</div>
                    <div className="text-[11px] text-right font-semibold text-emerald-400">{v.accuracy_score ? `${v.accuracy_score.toFixed(1)}%` : "—"}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-5 text-center"
          >
            <h2 className="text-lg font-bold mb-1">Have a Problem to Report?</h2>
            <p className="text-gray-400 text-sm mb-4 max-w-lg mx-auto">Submit your problem to the PoPP network.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/report">
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition">
                  Submit a Problem
                </button>
              </Link>
              <Link href="/validators">
                <button className="px-4 py-2 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">
                  Become a Validator
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
