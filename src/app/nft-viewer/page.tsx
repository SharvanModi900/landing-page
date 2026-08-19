"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Shield,
  Hash,
  Clock,
  Globe,
  Eye,
  Layers,
  CheckCircle,
  AlertTriangle,
  Fingerprint,
  Link2,
  Sparkles,
  Zap,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

// ─── Constants ──────────────────────────────────────────────────────────────

const CHAIN_API = "https://chain.thharko.com";
const BACKEND_API = "https://popp.thharko.com";

const PROOF_LEVELS = [
  { label: "Simple Hash", icon: <Hash size={12} />, color: "text-blue-400", bg: "bg-blue-500/20" },
  { label: "AI Assured", icon: <Sparkles size={12} />, color: "text-purple-400", bg: "bg-purple-500/20" },
  { label: "Multi-Source", icon: <Layers size={12} />, color: "text-cyan-400", bg: "bg-cyan-500/20" },
  { label: "VDF Witness", icon: <Zap size={12} />, color: "text-yellow-400", bg: "bg-yellow-500/20" },
];

const CATEGORIES = ["All", "Environment", "Infrastructure", "Education", "Healthcare", "Governance", "Technology", "Social", "Other"];

// ─── Types ──────────────────────────────────────────────────────────────────

interface ChainProof {
  pop_id: string;
  ticket_id: string;
  content_hash: string;
  zk_proof: string;
  validators: string[];
  timestamp: number;
  level: number;
  public_inputs: string;
  region: string;
  category: string;
  validation_score: number;
}

interface BackendProof {
  id: string;
  submission_id: string;
  proof_level?: number;
  content_hash?: string;
  zk_proof?: string;
  validators?: string[];
  created_at: string;
  validation_score?: number;
  category?: string;
  region?: string;
}

interface UnifiedProof {
  id?: string;
  pop_id?: string;
  ticket_id?: string;
  submission_id?: string;
  content_hash?: string;
  zk_proof?: string;
  validators?: string[];
  timestamp?: number;
  level?: number;
  public_inputs?: string;
  region?: string;
  category?: string;
  validation_score?: number;
  created_at?: string;
  source: "chain" | "backend";
}

interface BackendSubmission {
  id: string;
  title?: string;
  description: string;
  category?: string;
  ai_summary?: string;
  ai_severity?: string;
  consensus_score?: number;
  created_at: string;
  latitude: number;
  longitude: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function truncate(s: string, n = 12): string {
  if (!s) return "—";
  return s.length > n ? `${s.slice(0, n)}...` : s;
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

export default function NFTViewerPage() {
  const [chainProofs, setChainProofs] = useState<ChainProof[]>([]);
  const [backendProofs, setBackendProofs] = useState<BackendProof[]>([]);
  const [submissions, setSubmissions] = useState<BackendSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState(-1);
  const [selectedProof, setSelectedProof] = useState<UnifiedProof | null>(null);
  const [searchQ, setSearchQ] = useState("");

  // ─── Fetch ──────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    try {
      const [proofsRes, submissionsRes] = await Promise.allSettled([
        fetch(`${CHAIN_API}/popp/proof/proofs?pagination.limit=50`).then((r) => r.json()),
        fetch(`${BACKEND_API}/api/submissions`).then((r) => r.json()),
      ]);

      if (proofsRes.status === "fulfilled" && proofsRes.value?.proofs) {
        setChainProofs(proofsRes.value.proofs);
      }

      if (submissionsRes.status === "fulfilled" && Array.isArray(submissionsRes.value)) {
        setSubmissions(submissionsRes.value);
        // Fetch proofs for submissions that have them
        const subsWithProofs = submissionsRes.value.filter((s: BackendSubmission) => s.id);
        if (subsWithProofs.length > 0) {
          const proofResults = await Promise.allSettled(
            subsWithProofs.slice(0, 10).map((s: BackendSubmission) =>
              fetch(`${BACKEND_API}/api/submissions/${s.id}/proof`).then((r) => r.ok ? r.json() : null)
            )
          );
          const validProofs = proofResults
            .filter((r): r is PromiseFulfilledResult<BackendProof> => r.status === "fulfilled" && r.value != null)
            .map((r) => r.value);
          setBackendProofs(validProofs);
        }
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Filtered ───────────────────────────────────────────────────────────

  const allProofs: UnifiedProof[] = [
    ...chainProofs.map((p) => ({ ...p, source: "chain" as const })),
    ...backendProofs.map((p) => ({ ...p, level: p.proof_level, source: "backend" as const })),
  ];

  const filteredProofs = allProofs.filter((p) => {
    if (levelFilter >= 0 && p.level != null && p.level !== levelFilter) return false;
    if (categoryFilter !== "All" && p.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return (
        p.pop_id?.toLowerCase().includes(q) ||
        p.ticket_id?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.region?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ─── Stats ──────────────────────────────────────────────────────────────

  const totalProofs = chainProofs.length + backendProofs.length;
  const levelCounts = allProofs.reduce((acc, p) => {
    if (p.level != null) acc[p.level] = (acc[p.level] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative py-6 px-4 sm:px-6 text-center overflow-hidden">
          <div className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-3xl" />

          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-600/20 ring-1 ring-purple-500/30">
                <Fingerprint className="h-4 w-4 text-purple-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Truth NFT Viewer</span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              View and verify Truth NFTs minted from validated problems on the PoPP network.
            </p>
          </motion.div>
        </section>

        {/* ─── Stats ────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-purple-500/20 to-cyan-600/20 border border-white/10 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1"><Fingerprint className="h-3.5 w-3.5 text-purple-400" /><span className="text-[11px] text-gray-400">Total NFTs</span></div>
              <div className="text-lg font-bold">{loading ? "—" : totalProofs}</div>
            </motion.div>
            {PROOF_LEVELS.map((lvl, i) => (
              <motion.div key={lvl.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i + 1) * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                <div className={`flex items-center gap-1.5 mb-1 ${lvl.color}`}>{lvl.icon}<span className="text-[11px] text-gray-400">{lvl.label}</span></div>
                <div className="text-lg font-bold">{loading ? "—" : (levelCounts[i] || 0)}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Search & Filters ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search */}
              <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 gap-1.5">
                <Eye className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <input type="text" placeholder="Search by proof ID, ticket, category..."
                  className="bg-transparent outline-none text-xs text-white placeholder:text-gray-500 w-full"
                  value={searchQ} onChange={(e) => setSearchQ(e.target.value)} />
                {searchQ && (
                  <button onClick={() => setSearchQ("")} className="text-gray-500 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                )}
              </div>

              {/* Level Filter */}
              <div className="flex gap-1.5 flex-wrap">
                <button onClick={() => setLevelFilter(-1)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${levelFilter === -1 ? "bg-gradient-to-r from-purple-500 to-cyan-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
                  All Levels
                </button>
                {PROOF_LEVELS.map((lvl, i) => (
                  <button key={i} onClick={() => setLevelFilter(i)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition flex items-center gap-1 ${levelFilter === i ? "bg-gradient-to-r from-purple-500 to-cyan-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
                    {lvl.icon} {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition ${categoryFilter === cat ? "bg-gradient-to-r from-purple-500 to-cyan-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Gallery ──────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-gray-400">Loading Truth NFTs...</span>
              </div>
            </div>
          ) : filteredProofs.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">No Truth NFTs Found</h3>
              <p className="text-sm text-gray-400 mb-4">
                {searchQ || categoryFilter !== "All" || levelFilter >= 0
                  ? "Try adjusting your filters."
                  : "No proofs have been minted into Truth NFTs yet. Validated problems will appear here."}
              </p>
              {!totalProofs && (
                <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-lg p-4 text-left">
                  <h4 className="text-xs font-semibold text-purple-400 mb-2 flex items-center gap-1.5"><Sparkles size={12} /> How Truth NFTs Work</h4>
                  <ol className="text-[11px] text-gray-400 space-y-1.5">
                    <li className="flex gap-2"><span className="text-cyan-400 font-bold">1.</span> A problem is submitted to the PoPP network</li>
                    <li className="flex gap-2"><span className="text-cyan-400 font-bold">2.</span> Validators review and validate the problem</li>
                    <li className="flex gap-2"><span className="text-cyan-400 font-bold">3.</span> A cryptographic proof is generated (Simple Hash → AI Assured → Multi-Source → VDF Witness)</li>
                    <li className="flex gap-2"><span className="text-cyan-400 font-bold">4.</span> The proof is minted as a Truth NFT — immutable, verifiable, on-chain</li>
                  </ol>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredProofs.map((proof, i) => {
                const lvl = PROOF_LEVELS[proof.level ?? 0] || PROOF_LEVELS[0];
                const isChain = proof.source === "chain";
                const proofId = proof.pop_id || proof.id || "";
                return (
                  <motion.div
                    key={proofId || i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedProof(proof)}
                    className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/[0.07] transition cursor-pointer group"
                  >
                    {/* NFT Visual */}
                    <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-cyan-900/20 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_60%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.1),transparent_50%)]" />
                      <div className="relative flex flex-col items-center gap-2">
                        <Fingerprint className="w-10 h-10 text-purple-400/60" />
                        <span className="text-[10px] text-gray-500 font-mono">{truncate(proofId, 16)}</span>
                      </div>
                      {/* Level badge */}
                      <div className={`absolute top-2 right-2 ${lvl.bg} rounded-full px-2 py-0.5 flex items-center gap-1`}>
                        {lvl.icon}
                        <span className={`text-[9px] font-bold ${lvl.color}`}>L{proof.level ?? 0}</span>
                      </div>
                      {/* Source badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`px-1.5 py-px text-[8px] font-bold rounded uppercase tracking-wider ${isChain ? "bg-cyan-500/20 text-cyan-400" : "bg-purple-500/20 text-purple-400"}`}>
                          {isChain ? "Chain" : "Backend"}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        {proof.category && <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-px rounded">{proof.category}</span>}
                        {proof.region && <span className="text-[10px] text-gray-500 flex items-center gap-0.5"><Globe size={9} /> {proof.region}</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                          <Hash size={10} /> {truncate(proof.content_hash || "", 10)}
                        </div>
                        {proof.validation_score != null && proof.validation_score > 0 && (
                          <span className="text-[10px] text-emerald-400 font-semibold">{proof.validation_score.toFixed(1)}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                          <Users size={10} /> {proof.validators?.length || 0} validators
                        </span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                          <Clock size={10} /> {proof.timestamp ? timeAgo(proof.timestamp) : proof.created_at ? timeAgo(new Date(proof.created_at).getTime() / 1000) : "—"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-5 text-center">
            <h2 className="text-lg font-bold mb-1">Validate Problems to Mint Truth NFTs</h2>
            <p className="text-gray-400 text-sm mb-4">Become a validator and help create immutable proof of real-world problems.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/explorer"><button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-lg text-sm font-semibold">Explore Problems</button></Link>
              <Link href="/validators"><button className="px-4 py-2 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg text-sm font-semibold text-gray-300 transition">Become a Validator</button></Link>
            </div>
          </motion.div>
        </section>
      </div>

      {/* ─── Detail Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProof && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedProof(null)} />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="relative z-10 max-w-lg w-full bg-[#030712] rounded-xl border border-white/10 overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/20 p-4 flex items-start justify-between relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_60%)]" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <Fingerprint className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-bold">Truth NFT</span>
                    <span className={`px-1.5 py-px text-[9px] font-bold rounded uppercase ${(selectedProof as any).source === "chain" ? "bg-cyan-500/20 text-cyan-400" : "bg-purple-500/20 text-purple-400"}`}>
                      {(selectedProof as any).source || "chain"}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">{selectedProof.pop_id || selectedProof.id}</span>
                </div>
                <button onClick={() => setSelectedProof(null)} className="relative text-gray-400 hover:text-white text-sm">Close</button>
              </div>

              {/* Modal Body */}
              <div className="p-4 space-y-3">
                {/* Level & Category */}
                <div className="flex items-center gap-2">
                  {(() => { const lvl = PROOF_LEVELS[selectedProof.level ?? 0] || PROOF_LEVELS[0]; return (
                    <span className={`${lvl.bg} ${lvl.color} rounded-full px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1`}>{lvl.icon} {lvl.label}</span>
                  ); })()}
                  {selectedProof.category && <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded">{selectedProof.category}</span>}
                  {selectedProof.region && <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded flex items-center gap-0.5"><Globe size={9} /> {selectedProof.region}</span>}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <DetailRow label="Ticket ID" value={truncate(selectedProof.ticket_id || selectedProof.submission_id || "", 16)} />
                  <DetailRow label="Validators" value={(selectedProof.validators?.length || 0).toString()} />
                  <DetailRow label="Validation Score" value={selectedProof.validation_score ? selectedProof.validation_score.toFixed(2) : "—"} />
                  <DetailRow label="Created" value={selectedProof.timestamp ? timeAgo(selectedProof.timestamp) : selectedProof.created_at ? timeAgo(new Date(selectedProof.created_at).getTime() / 1000) : "—"} />
                </div>

                {/* Hashes */}
                <div className="space-y-2">
                  <HashRow label="Content Hash" value={selectedProof.content_hash || ""} />
                  {selectedProof.zk_proof && <HashRow label="ZK Proof" value={selectedProof.zk_proof} />}
                  {selectedProof.public_inputs && <HashRow label="Public Inputs" value={selectedProof.public_inputs} />}
                </div>

                {/* Validator List */}
                {selectedProof.validators && selectedProof.validators.length > 0 && (
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-semibold">Validators</div>
                    <div className="space-y-1">
                      {selectedProof.validators.map((v, i) => (
                        <div key={i} className="text-[10px] font-mono text-cyan-400 bg-white/5 px-2 py-1 rounded">{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-2">
      <div className="text-[9px] text-gray-500 uppercase tracking-wider">{label}</div>
      <div className="text-[11px] font-semibold mt-0.5 truncate">{value}</div>
    </div>
  );
}

function HashRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="bg-white/[0.03] rounded-lg p-2">
      <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5 flex items-center gap-1"><Link2 size={8} /> {label}</div>
      <div className="text-[10px] font-mono text-gray-300 break-all">{value}</div>
    </div>
  );
}
