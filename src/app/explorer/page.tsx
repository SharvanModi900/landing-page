"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Calendar, MapPin, Shield, CheckCircle, Clock,
  AlertTriangle, Globe, Activity, ChevronDown, X, ExternalLink,
  Layers, ArrowRight, Hash, Zap, Eye, ChevronRight, ChevronLeft,
  ArrowUpDown, TrendingUp, Map, List,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
const ProblemMap = dynamic(() => import("@/components/ProblemMap"), { ssr: false });

const CHAIN_API = "https://chain.thharko.com";
const BACKEND_API = "https://popp.thharko.com";

interface ChainTicket {
  id: string;
  description: string;
  location: string;
  category: string;
  evidence_hash: string;
  submitter: string;
  status: string;
  timestamp: string;
  region: string;
  validation_score: string;
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
  ai_severity?: string;
  ai_urgency?: string;
  chain_tx_hash?: string;
  chain_ticket_id?: string;
  media_hash?: string;
  media_url?: string;
}

function timeAgo(ts: string | number): string {
  const now = Date.now();
  const t = typeof ts === "string" ? parseInt(ts) : ts;
  const diff = now - t * 1000;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function shortAddr(addr: string): string {
  if (!addr || addr.length < 16) return addr || "—";
  return `${addr.slice(0, 12)}...${addr.slice(-8)}`;
}

function shortHash(hash: string): string {
  if (!hash || hash.length < 12) return hash || "—";
  return `${hash.slice(0, 10)}...`;
}

function getCategoryIcon(cat: string) {
  const c = cat?.toLowerCase();
  if (c === "road") return "🛣️";
  if (c === "water") return "💧";
  if (c === "electricity") return "⚡";
  if (c === "environment") return "🌿";
  if (c === "health") return "🏥";
  if (c === "education") return "📚";
  if (c === "governance") return "🏛️";
  return "📋";
}

function getStatusStyle(status: string): { label: string; color: string; bg: string; dot: string } {
  const s = status?.toUpperCase();
  if (s === "SUBMITTED") return { label: "Submitted", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/20", dot: "bg-blue-400" };
  if (s === "VALIDATING") return { label: "Validating", color: "text-yellow-400", bg: "bg-yellow-500/15 border-yellow-500/20", dot: "bg-yellow-400" };
  if (s === "VALIDATED") return { label: "Validated", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/20", dot: "bg-emerald-400" };
  if (s === "PROVEN") return { label: "Proven", color: "text-purple-400", bg: "bg-purple-500/15 border-purple-500/20", dot: "bg-purple-400" };
  if (s === "ESCALATED") return { label: "Escalated", color: "text-orange-400", bg: "bg-orange-500/15 border-orange-500/20", dot: "bg-orange-400" };
  if (s === "RESOLVED") return { label: "Resolved", color: "text-cyan-400", bg: "bg-cyan-500/15 border-cyan-500/20", dot: "bg-cyan-400" };
  if (s === "REJECTED") return { label: "Rejected", color: "text-red-400", bg: "bg-red-500/15 border-red-500/20", dot: "bg-red-400" };
  return { label: status || "Unknown", color: "text-gray-400", bg: "bg-gray-500/15 border-gray-500/20", dot: "bg-gray-400" };
}

const CATEGORIES = ["All", "road", "water", "electricity", "environment", "health", "education", "governance", "other"];

export default function ExplorerPage() {
  const [tickets, setTickets] = useState<ChainTicket[]>([]);
  const [submissions, setSubmissions] = useState<BackendSubmission[]>([]);
  const [totalTickets, setTotalTickets] = useState("0");
  const [searchQ, setSearchQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "chain" | "backend">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "severity" | "consensus">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [chainRes, backendRes] = await Promise.allSettled([
      fetch(`${CHAIN_API}/popp/ticket/tickets?pagination.limit=100`).then((r) => r.json()),
      fetch(`${BACKEND_API}/api/submissions`).then((r) => r.json()),
    ]);
    if (chainRes.status === "fulfilled" && chainRes.value?.tickets) {
      setTickets(chainRes.value.tickets);
      setTotalTickets(chainRes.value.pagination?.total || chainRes.value.tickets.length.toString());
    }
    if (backendRes.status === "fulfilled") {
      setSubmissions(Array.isArray(backendRes.value) ? backendRes.value : []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Combine chain tickets + backend submissions into unified list
  const unifiedList = (() => {
    const items: Array<{
      id: string;
      title: string;
      description: string;
      category: string;
      location: string;
      region: string;
      timestamp: string;
      status: string;
      submitter: string;
      evidence_hash: string;
      proof_id: string;
      validation_score: string;
      source: "chain" | "backend";
      chain_ticket_id?: string;
      tx_hash?: string;
      severity?: string;
      consensus?: number;
      media_url?: string;
    }> = [];

    // Add chain tickets
    tickets.forEach((t) => {
      items.push({
        id: t.id,
        title: t.description || "Untitled Problem",
        description: t.description || "",
        category: t.category || "other",
        location: t.location || "",
        region: t.region || "",
        timestamp: t.timestamp || "0",
        status: t.status || "SUBMITTED",
        submitter: t.submitter || "",
        evidence_hash: t.evidence_hash || "",
        proof_id: t.proof_id || "",
        validation_score: t.validation_score || "0",
        source: "chain",
        chain_ticket_id: t.id,
      });
    });

    // Add backend submissions not already on chain
    const chainEvidence = new Set(tickets.map((t) => t.evidence_hash));
    submissions.forEach((s) => {
      if (!chainEvidence.has(s.id) && !chainEvidence.has(s.media_hash || "")) {
        items.push({
          id: s.id,
          title: s.title || s.description?.slice(0, 60) || "Untitled",
          description: s.description || "",
          category: s.category || "other",
          location: `${s.latitude},${s.longitude}`,
          region: "india",
          timestamp: Math.floor(new Date(s.created_at).getTime() / 1000).toString(),
          status: s.status || "submitted",
          submitter: s.chain_tx_hash ? "cosmos14nu3...3q49twp" : "",
          evidence_hash: "",
          proof_id: "",
          validation_score: "0",
          source: "backend",
          chain_ticket_id: s.chain_ticket_id,
          tx_hash: s.chain_tx_hash,
          severity: s.ai_severity,
          consensus: s.consensus_score,
          media_url: s.media_url,
        });
      }
    });

    // Sort by selected criteria
    const severityOrder: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
    items.sort((a, b) => {
      if (sortBy === "newest") return parseInt(b.timestamp) - parseInt(a.timestamp);
      if (sortBy === "oldest") return parseInt(a.timestamp) - parseInt(b.timestamp);
      if (sortBy === "severity") {
        const aSev = severityOrder[a.severity || ""] || 0;
        const bSev = severityOrder[b.severity || ""] || 0;
        return bSev - aSev;
      }
      if (sortBy === "consensus") return (b.consensus || 0) - (a.consensus || 0);
      return 0;
    });
    return items;
  })();

  const filtered = unifiedList.filter((item) => {
    if (activeTab === "chain" && item.source !== "chain") return false;
    if (activeTab === "backend" && item.source !== "backend") return false;
    if (categoryFilter !== "All" && item.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (statusFilter !== "All" && item.status?.toUpperCase() !== statusFilter.toUpperCase()) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return (
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.id?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.region?.toLowerCase().includes(q) ||
        item.submitter?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [searchQ, categoryFilter, statusFilter, activeTab, sortBy]);

  const chainCount = tickets.length;
  const backendCount = submissions.length;

  // Computed stats
  const resolvedCount = unifiedList.filter((i) => i.status?.toUpperCase() === "RESOLVED").length;
  const activeCount = unifiedList.filter((i) => !["RESOLVED", "REJECTED"].includes(i.status?.toUpperCase())).length;
  const categoryBreakdown = CATEGORIES.filter((c) => c !== "All").map((cat) => ({
    name: cat,
    count: unifiedList.filter((i) => i.category?.toLowerCase() === cat.toLowerCase()).length,
  })).filter((c) => c.count > 0);

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* Hero */}
        <section className="relative py-8 px-4 sm:px-6 text-center overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyan-600/8 blur-3xl" />
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
                <Globe className="h-5 w-5 text-cyan-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Problem Explorer
              </h1>
            </div>
            <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
              Browse live problems anchored on the PoPP blockchain. Every ticket is immutable, verifiable, and transparent.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "On-Chain Tickets", value: chainCount, icon: <Layers className="h-4 w-4 text-cyan-400" />, gradient: "from-cyan-500/10 to-blue-600/10", border: "border-cyan-500/20" },
              { label: "Total Submissions", value: backendCount, icon: <Hash className="h-4 w-4 text-purple-400" />, gradient: "from-purple-500/10 to-pink-600/10", border: "border-purple-500/20" },
              { label: "Active Tickets", value: activeCount, icon: <Activity className="h-4 w-4 text-yellow-400" />, gradient: "from-yellow-500/10 to-orange-600/10", border: "border-yellow-500/20" },
              { label: "Resolved", value: resolvedCount, icon: <CheckCircle className="h-4 w-4 text-emerald-400" />, gradient: "from-emerald-500/10 to-teal-600/10", border: "border-emerald-500/20" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${stat.gradient} border ${stat.border} rounded-xl p-4`}
              >
                <div className="flex items-center gap-2 mb-2">{stat.icon}<span className="text-xs text-gray-400">{stat.label}</span></div>
                <div className="text-2xl font-bold">{loading ? "—" : stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Category Breakdown */}
          {categoryBreakdown.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-3 bg-white/[0.03] border border-white/10 rounded-xl p-4"
            >
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
                <TrendingUp size={12} /> Category Distribution
              </h3>
              <div className="flex flex-wrap gap-2">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 border border-white/5">
                    <span className="text-sm">{getCategoryIcon(cat.name)}</span>
                    <span className="text-xs font-medium text-gray-300 capitalize">{cat.name}</span>
                    <span className="text-xs font-bold text-cyan-400">{cat.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </section>

        {/* Search & Filters */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 gap-2">
                <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by description, ID, category, region, address..."
                  className="bg-transparent outline-none text-sm text-white placeholder:text-gray-500 w-full"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                />
                {searchQ && (
                  <button onClick={() => setSearchQ("")} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
                {[
                  { key: "all" as const, label: "All", count: unifiedList.length },
                  { key: "chain" as const, label: "Chain", count: chainCount },
                  { key: "backend" as const, label: "Backend", count: backendCount },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center gap-1.5 ${
                      activeTab === tab.key
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/10"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-white/20" : "bg-white/5"}`}>{tab.count}</span>
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <ArrowUpDown size={14} className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent outline-none text-xs text-gray-300 cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="severity">Severity</option>
                  <option value="consensus">Consensus</option>
                </select>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-white/5 text-gray-400 hover:text-white border border-white/10 flex items-center gap-2"
              >
                <Filter size={14} />
                Filters
                <ChevronDown size={12} className={`transition ${showFilters ? "rotate-180" : ""}`} />
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pt-4 space-y-4">
                    {/* Category Filter */}
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block font-medium">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition border ${
                              categoryFilter === cat
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent"
                                : "bg-white/5 text-gray-400 hover:text-white border-white/10"
                            }`}
                          >
                            {cat === "All" ? "All" : `${getCategoryIcon(cat)} ${cat}`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block font-medium">Status</label>
                      <div className="flex flex-wrap gap-2">
                        {["All", "Submitted", "Validating", "Validated", "Proven", "Escalated", "Resolved", "Rejected"].map((status) => {
                          const style = status !== "All" ? getStatusStyle(status) : null;
                          return (
                            <button
                              key={status}
                              onClick={() => setStatusFilter(status)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold transition border ${
                                statusFilter === status
                                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent"
                                  : "bg-white/5 text-gray-400 hover:text-white border-white/10"
                              }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Results */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
          {/* Stats Badge - Mobile App Style */}
          {!loading && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <Activity size={14} className="text-cyan-400" />
                <span className="text-sm font-semibold text-gray-200">
                  {chainCount} chain · {backendCount} submissions · {filtered.length} problems
                </span>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-400">Loading from PoPP chain...</span>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-1">No Problems Found</h3>
              <p className="text-sm text-gray-400">
                {searchQ || categoryFilter !== "All" || statusFilter !== "All" ? "Try adjusting your search or filters." : "No problems have been submitted yet."}
              </p>
            </div>
          ) : (
            <>
              {/* Results Header with View Toggle */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 font-medium">
                    {filtered.length} {filtered.length === 1 ? "Problem" : "Problems"}
                  </span>
                  {totalPages > 1 && (
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                      Page {currentPage} of {totalPages}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        viewMode === "list"
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <List size={13} />
                      <span>List</span>
                    </button>
                    <button
                      onClick={() => setViewMode("map")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        viewMode === "map"
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <Map size={13} />
                      <span>Map</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Map View — always mounted, hidden via display:none, invalidateSize on show */}
              <div className={viewMode === "map" ? "h-[350px] sm:h-[550px] mb-6" : "hidden"}>
                <ProblemMap
                  visible={viewMode === "map"}
                  markers={filtered.map((item) => {
                    const lat = item.source === "backend" 
                      ? parseFloat(item.location.split(",")[0]) 
                      : null;
                    const lng = item.source === "backend"
                      ? parseFloat(item.location.split(",")[1])
                      : null;
                    const itemStatusStyle = getStatusStyle(item.status);
                    const colorMap: Record<string, string> = {
                      "text-blue-400": "#3b82f6",
                      "text-yellow-400": "#f59e0b",
                      "text-emerald-400": "#22c55e",
                      "text-purple-400": "#a855f7",
                      "text-orange-400": "#f97316",
                      "text-cyan-400": "#06b6d4",
                      "text-red-400": "#ef4444",
                      "text-gray-400": "#6b7280",
                    };
                    return {
                      id: `${item.source}-${item.id}`,
                      latitude: lat || 0,
                      longitude: lng || 0,
                      title: item.title,
                      description: item.description?.slice(0, 100) || "",
                      category: item.category,
                      status: item.status,
                      color: colorMap[itemStatusStyle.color] || "#6b7280",
                      source: item.source,
                      media_url: item.media_url,
                    };
                  }).filter((m) => m.latitude && m.longitude && Math.abs(m.latitude) > 0.001 && Math.abs(m.longitude) > 0.001)}
                />
              </div>

              {/* List View — always mounted, just hidden */}
              <div className={viewMode === "list" ? "block space-y-3" : "hidden"}>
                {paginatedItems.map((item, i) => {
                  const statusStyle = getStatusStyle(item.status);
                  const detailHref = `/explorer/detail?id=${encodeURIComponent(item.id)}`;

                  return (
                    <motion.div
                      key={`${item.source}-${item.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.3) }}
                    >
                      <Link href={detailHref}>
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] hover:border-white/15 transition-all cursor-pointer group">
                          <div className="flex items-start gap-4">
                            {/* Category Icon or Image Thumbnail */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg overflow-hidden">
                              {item.media_url ? (
                                <img
                                  src={item.media_url}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.textContent = getCategoryIcon(item.category);
                                  }}
                                />
                              ) : (
                                getCategoryIcon(item.category)
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider border ${statusStyle.bg} ${statusStyle.color}`}>
                                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                                  {statusStyle.label}
                                </span>
                                <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider ${
                                  item.source === "chain" ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" : "bg-purple-500/15 text-purple-400 border border-purple-500/20"
                                }`}>
                                  {item.source}
                                </span>
                                <span className="text-[10px] text-gray-600">{item.category}</span>
                              </div>

                              <h3 className="font-semibold text-sm mb-1.5 truncate group-hover:text-cyan-400 transition-colors">
                                {item.title}
                              </h3>

                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                                {item.location && (
                                  <span className="flex items-center gap-1"><MapPin size={11} /> {item.location}</span>
                                )}
                                {item.region && (
                                  <span className="flex items-center gap-1"><Globe size={11} /> {item.region}</span>
                                )}
                                <span className="flex items-center gap-1"><Calendar size={11} /> {timeAgo(item.timestamp)}</span>
                                {item.source === "chain" && item.id && (
                                  <span className="font-mono text-cyan-600">{shortHash(item.id)}</span>
                                )}
                              </div>
                            </div>

                            {/* Right side */}
                            <div className="flex-shrink-0 flex flex-col items-end gap-1">
                              <ChevronRight size={16} className="text-gray-600 group-hover:text-cyan-400 transition" />
                              {item.severity && (
                                <span className={`text-[10px] font-semibold ${
                                  item.severity === "High" ? "text-red-400" : item.severity === "Medium" ? "text-yellow-400" : "text-green-400"
                                }`}>{item.severity}</span>
                              )}
                              {item.consensus != null && item.consensus > 0 && (
                                <span className="text-[10px] text-gray-500">Consensus: {item.consensus}%</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                          currentPage === page
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-white/10 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Have a Problem to Report?</h2>
            <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">
              Submit your problem to the PoPP network and get it anchored on the blockchain permanently.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/report">
                <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition flex items-center gap-2">
                  Submit a Problem <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/validators">
                <button className="px-5 py-2.5 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">
                  Become a Validator
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
