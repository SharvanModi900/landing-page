"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Calendar, MapPin, Shield, CheckCircle, Clock,
  AlertTriangle, Globe, Activity, ChevronDown, X, ExternalLink,
  Layers, ArrowRight, Hash, Zap, Eye, ChevronRight, ChevronLeft,
  ArrowUpDown, TrendingUp, Map, List, Menu,
  FileText, Blocks, Vote, ArrowLeftRight, BarChart3, PieChart,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import DarkSelect from "@/components/DarkSelect";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPages from "@/components/RelatedPages";
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
  if (c === "road") return "️";
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

type SidebarSection = "problems" | "validators" | "blocks" | "transactions" | "proposals" | "map" | "stats";

export default function ExplorerPage() {
  const [tickets, setTickets] = useState<ChainTicket[]>([]);
  const [submissions, setSubmissions] = useState<BackendSubmission[]>([]);
  const [totalTickets, setTotalTickets] = useState("0");
  const [searchQ, setSearchQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "chain" | "backend" | "map">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "severity" | "consensus">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  // Nearby submissions
  const [nearbyLat, setNearbyLat] = useState("");
  const [nearbyLng, setNearbyLng] = useState("");
  const [nearbyResults, setNearbyResults] = useState<any[]>([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  // Sidebar
  const [activeSection, setActiveSection] = useState<SidebarSection>("problems");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [vizOpen, setVizOpen] = useState(true);

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

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchQ, categoryFilter, statusFilter, activeTab, sortBy]);

  const chainCount = tickets.length;
  const backendCount = submissions.length;
  const resolvedCount = unifiedList.filter((i) => i.status?.toUpperCase() === "RESOLVED").length;
  const activeCount = unifiedList.filter((i) => !["RESOLVED", "REJECTED"].includes(i.status?.toUpperCase())).length;
  const categoryBreakdown = CATEGORIES.filter((c) => c !== "All").map((cat) => ({
    name: cat,
    count: unifiedList.filter((i) => i.category?.toLowerCase() === cat.toLowerCase()).length,
  })).filter((c) => c.count > 0);

  // ─── Sidebar nav items ───
  const explorerItems: { key: SidebarSection; label: string; icon: React.ReactNode; href?: string }[] = [
    { key: "problems", label: "Problems", icon: <FileText size={15} /> },
    { key: "validators", label: "Validators", icon: <Shield size={15} /> },
    { key: "blocks", label: "Blocks", icon: <Blocks size={15} /> },
    { key: "transactions", label: "Transactions", icon: <ArrowLeftRight size={15} /> },
    { key: "proposals", label: "Proposals", icon: <Vote size={15} /> },
  ];

  const vizItems: { key: SidebarSection; label: string; icon: React.ReactNode }[] = [
    { key: "map", label: "Map View", icon: <Map size={15} /> },
    { key: "stats", label: "Category Stats", icon: <PieChart size={15} /> },
  ];

  const handleNavClick = (key: SidebarSection) => {
    setActiveSection(key);
    if (key === "map") setActiveTab("map");
    else if (activeTab === "map") setActiveTab("all");
    setSidebarOpen(false);
  };

  // ─── Placeholder for non-functional sections ───
  const renderPlaceholder = (title: string, desc: string) => (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
        <Globe className="w-8 h-8 text-gray-600" />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Explorer" }]} />

      {/* ═══════════════════════════════════════════════════════════
          SIDEBAR
          ═══════════════════════════════════════════════════════════ */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-full w-[220px] bg-[#0a0e1a] border-r border-white/[0.06] flex flex-col transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo area */}
        <div className="px-4 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white">PoPP Explorer</span>
          </div>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {/* EXPLORER section */}
          <div>
            <button
              onClick={() => setExplorerOpen(!explorerOpen)}
              className="flex items-center justify-between w-full px-2 mb-1"
            >
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Explorer</span>
              <ChevronDown size={12} className={`text-gray-600 transition-transform ${explorerOpen ? "" : "-rotate-90"}`} />
            </button>
            <AnimatePresence>
              {explorerOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-0.5">
                  {explorerItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleNavClick(item.key)}
                      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeSection === item.key
                          ? "text-cyan-400 bg-cyan-500/10 border-r-2 border-cyan-400"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* VISUALIZATIONS section */}
          <div>
            <button
              onClick={() => setVizOpen(!vizOpen)}
              className="flex items-center justify-between w-full px-2 mb-1"
            >
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Visualizations</span>
              <ChevronDown size={12} className={`text-gray-600 transition-transform ${vizOpen ? "" : "-rotate-90"}`} />
            </button>
            <AnimatePresence>
              {vizOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-0.5">
                  {vizItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleNavClick(item.key)}
                      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeSection === item.key
                          ? "text-cyan-400 bg-cyan-500/10 border-r-2 border-cyan-400"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 py-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-[10px] text-gray-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            PoPP Chain · Live
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════
          MAIN AREA
          ═══════════════════════════════════════════════════════════ */}
      <div className="flex-1 md:ml-[220px] flex flex-col min-h-screen">

        {/* ─── Top bar (mobile hamburger + breadcrumb) ─── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#0a0e1a]/50 backdrop-blur-sm sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06]">
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-300 transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gray-300 font-medium">Explorer</span>
            {activeSection !== "problems" && (
              <>
                <ChevronRight size={12} />
                <span className="text-cyan-400 capitalize">{activeSection}</span>
              </>
            )}
          </div>
        </div>

        {/* ─── Tab bar ─── */}
        {activeSection === "problems" && (
          <div className="border-b border-white/[0.06] bg-[#0a0e1a]/30">
            <div className="flex items-center gap-0 overflow-x-auto px-4 scrollbar-hide">
              {[
                { key: "all" as const, label: "All", count: unifiedList.length },
                { key: "chain" as const, label: "Chain", count: chainCount },
                { key: "backend" as const, label: "Backend", count: backendCount },
                { key: "map" as const, label: "Map", icon: <Map size={12} /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); if (tab.key === "map") setActiveSection("map"); else setActiveSection("problems"); }}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.key
                      ? "text-white border-cyan-400"
                      : "text-gray-500 border-transparent hover:text-gray-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-cyan-500/20 text-cyan-300" : "bg-white/5 text-gray-600"}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── Content ─── */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">

          {/* ─── Non-problems sections (placeholders) ─── */}
          {activeSection === "validators" && renderPlaceholder("Validators", "View all PoPP network validators, their stake, uptime, and performance metrics.")}
          {activeSection === "blocks" && renderPlaceholder("Blocks", "Browse all blocks produced on the PoPP chain with timestamps and proposer info.")}
          {activeSection === "transactions" && renderPlaceholder("Transactions", "Track all on-chain transactions including submissions, validations, and rewards.")}
          {activeSection === "proposals" && renderPlaceholder("Proposals", "View DAO governance proposals, voting status, and outcomes.")}
          {activeSection === "stats" && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-cyan-400" /> Category Statistics</h2>
              {categoryBreakdown.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categoryBreakdown.map((cat) => (
                    <div key={cat.name} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">{getCategoryIcon(cat.name)}</div>
                      <div className="text-sm font-semibold text-white capitalize">{cat.name}</div>
                      <div className="text-lg font-bold text-cyan-400">{cat.count}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No category data yet.</p>
              )}
            </div>
          )}

          {/* ── Problems section ─── */}
          {activeSection === "problems" && activeTab !== "map" && (
            <div className="max-w-7xl mx-auto space-y-4">

              {/* Search bar */}
              <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 gap-2">
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

              {/* Filter row */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.08] flex items-center gap-2 transition"
                >
                  <Filter size={13} />
                  Filters
                  <ChevronDown size={11} className={`transition ${showFilters ? "rotate-180" : ""}`} />
                </button>

                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5">
                  <ArrowUpDown size={13} className="text-gray-500" />
                  <DarkSelect
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    compact
                    options={[
                      { value: 'newest', label: 'Newest' },
                      { value: 'oldest', label: 'Oldest' },
                      { value: 'severity', label: 'Severity' },
                      { value: 'consensus', label: 'Consensus' },
                    ]}
                  />
                </div>

                {/* Quick category chips */}
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {["All", "road", "water", "electricity", "environment"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition border ${
                        categoryFilter === cat
                          ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                          : "bg-white/[0.03] text-gray-500 hover:text-gray-300 border-white/[0.06]"
                      }`}
                    >
                      {cat === "All" ? "All" : `${getCategoryIcon(cat)} ${cat}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expanded filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-4">
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
                      <div>
                        <label className="text-xs text-gray-400 mb-2 block font-medium">Status</label>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Submitted", "Validating", "Validated", "Proven", "Escalated", "Resolved", "Rejected"].map((status) => (
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
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "On-Chain", value: chainCount, icon: <Layers className="h-4 w-4 text-cyan-400" />, gradient: "from-cyan-500/10 to-blue-600/10", border: "border-cyan-500/20" },
                  { label: "Submissions", value: backendCount, icon: <Hash className="h-4 w-4 text-purple-400" />, gradient: "from-purple-500/10 to-pink-600/10", border: "border-purple-500/20" },
                  { label: "Active", value: activeCount, icon: <Activity className="h-4 w-4 text-yellow-400" />, gradient: "from-yellow-500/10 to-orange-600/10", border: "border-yellow-500/20" },
                  { label: "Resolved", value: resolvedCount, icon: <CheckCircle className="h-4 w-4 text-emerald-400" />, gradient: "from-emerald-500/10 to-teal-600/10", border: "border-emerald-500/20" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-gradient-to-br ${stat.gradient} border ${stat.border} rounded-xl p-3.5`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">{stat.icon}<span className="text-[11px] text-gray-400">{stat.label}</span></div>
                    <div className="text-xl font-bold">{loading ? "—" : stat.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Results */}
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
                  {/* Results header */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {filtered.length} {filtered.length === 1 ? "Problem" : "Problems"}
                      {totalPages > 1 && <span className="text-xs text-gray-600 ml-2">Page {currentPage} of {totalPages}</span>}
                    </span>
                  </div>

                  {/* List */}
                  <div className="space-y-2">
                    {paginatedItems.map((item, i) => {
                      const statusStyle = getStatusStyle(item.status);
                      const detailHref = `/explorer/detail?id=${encodeURIComponent(item.id)}`;
                      return (
                        <motion.div
                          key={`${item.source}-${item.id}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(i * 0.02, 0.2) }}
                        >
                          <Link href={detailHref}>
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all cursor-pointer group">
                              <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-base overflow-hidden">
                                  {item.media_url ? (
                                    <img src={item.media_url} alt={`Media for ${item.title || 'problem report'}`} className="w-full h-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.textContent = getCategoryIcon(item.category); }} />
                                  ) : getCategoryIcon(item.category)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
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
                                  <h3 className="font-semibold text-sm mb-1 truncate group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500">
                                    {item.location && <span className="flex items-center gap-1"><MapPin size={10} /> {item.location}</span>}
                                    {item.region && <span className="flex items-center gap-1"><Globe size={10} /> {item.region}</span>}
                                    <span className="flex items-center gap-1"><Calendar size={10} /> {timeAgo(item.timestamp)}</span>
                                    {item.source === "chain" && item.id && <span className="font-mono text-cyan-600">{shortHash(item.id)}</span>}
                                  </div>
                                </div>

                                {/* Right */}
                                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                                  <ChevronRight size={14} className="text-gray-600 group-hover:text-cyan-400 transition" />
                                  {item.severity && (
                                    <span className={`text-[10px] font-semibold ${item.severity === "High" ? "text-red-400" : item.severity === "Medium" ? "text-yellow-400" : "text-green-400"}`}>{item.severity}</span>
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
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition">
                        <ChevronLeft size={16} />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${currentPage === page ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"}`}>
                          {page}
                        </button>
                      ))}
                      <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Nearby submissions */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 mt-4">
                <button onClick={() => setShowNearby(!showNearby)} className="text-sm font-bold flex items-center gap-1.5 text-green-400 mb-2">
                  <MapPin size={14} /> {showNearby ? "Hide" : "Find"} Nearby Submissions
                </button>
                {showNearby && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input value={nearbyLat} onChange={e => setNearbyLat(e.target.value)} placeholder="Latitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                      <input value={nearbyLng} onChange={e => setNearbyLng(e.target.value)} placeholder="Longitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    </div>
                    <button onClick={async () => {
                      if (!nearbyLat || !nearbyLng) return;
                      setNearbyLoading(true);
                      try {
                        const params = new URLSearchParams({ latitude: nearbyLat, longitude: nearbyLng });
                        const res = await fetch(`${BACKEND_API}/api/submissions/nearby?${params}`);
                        if (res.ok) { const d = await res.json(); setNearbyResults(Array.isArray(d) ? d : d.submissions || []); }
                      } catch { /* ignore */ }
                      setNearbyLoading(false);
                    }} disabled={nearbyLoading || !nearbyLat || !nearbyLng} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-xs font-semibold disabled:opacity-50">{nearbyLoading ? "Searching..." : "Search Nearby"}</button>
                    {nearbyResults.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {nearbyResults.map((s: any, i: number) => (
                          <div key={i} className="bg-white/[0.03] rounded-lg p-2.5 flex items-center gap-2">
                            <MapPin size={12} className="text-green-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold truncate">{s.title || s.id?.slice(0, 8) || `Submission ${i + 1}`}</div>
                              <div className="text-[10px] text-gray-500">{s.status} {s.distance ? `— ${Number(s.distance).toFixed(0)}m away` : ""}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-white/[0.06] rounded-xl p-5 text-center mt-4">
                <h2 className="text-lg font-bold mb-1.5">Have a Problem to Report?</h2>
                <p className="text-gray-400 text-xs mb-3 max-w-md mx-auto">Submit your problem to the PoPP network and get it anchored on the blockchain permanently.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link href="/report">
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition flex items-center gap-2">
                      Submit a Problem <ArrowRight size={13} />
                    </button>
                  </Link>
                  <Link href="/validators">
                    <button className="px-4 py-2 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-xs font-semibold text-gray-300 transition">
                      Become a Validator
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ─── Map tab / section ─── */}
          {(activeSection === "map" || activeTab === "map") && (
            <div className="max-w-7xl mx-auto">
              <div className="h-[400px] sm:h-[600px]">
                <ProblemMap
                  visible={true}
                  markers={filtered.map((item) => {
                    const lat = item.source === "backend" ? parseFloat(item.location.split(",")[0]) : null;
                    const lng = item.source === "backend" ? parseFloat(item.location.split(",")[1]) : null;
                    const itemStatusStyle = getStatusStyle(item.status);
                    const colorMap: Record<string, string> = {
                      "text-blue-400": "#3b82f6", "text-yellow-400": "#f59e0b", "text-emerald-400": "#22c55e",
                      "text-purple-400": "#a855f7", "text-orange-400": "#f97316", "text-cyan-400": "#06b6d4",
                      "text-red-400": "#ef4444", "text-gray-400": "#6b7280",
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
            </div>
          )}
        </div>
      </div>

      <RelatedPages pages={[
        { label: "Report a Problem", href: "/report", description: "Submit a civic issue with evidence" },
        { label: "Case Studies", href: "/case-studies", description: "Real-world impact stories" },
        { label: "Resolutions", href: "/resolutions", description: "View resolved problems" },
        { label: "Validators", href: "/validators", description: "How problems get verified" },
      ]} />
    </div>
  );
}
