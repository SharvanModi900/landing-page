"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Globe, Calendar, Shield, Copy, Check,
  AlertTriangle, Zap, FileText, Image as ImageIcon, ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CHAIN_API = "https://chain.thharko.com";
const BACKEND_API = "https://popp.thharko.com";

interface TicketDetail {
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

interface BackendDetail {
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
  ai_keywords?: string[];
  chain_tx_hash?: string;
  chain_ticket_id?: string;
  media_hash?: string;
  media_url?: string;
}

function formatDate(ts: string | number): string {
  const t = typeof ts === "string" ? parseInt(ts) : ts;
  return new Date(t * 1000).toLocaleString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function getStatusStyle(status: string) {
  const s = status?.toUpperCase();
  if (s === "SUBMITTED") return { label: "Submitted", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/20", dot: "bg-blue-400" };
  if (s === "VALIDATING") return { label: "Validating", color: "text-yellow-400", bg: "bg-yellow-500/15 border-yellow-500/20", dot: "bg-yellow-400" };
  if (s === "VALIDATED") return { label: "Validated", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/20", dot: "bg-emerald-400" };
  if (s === "PROVEN") return { label: "Proven", color: "text-purple-400", bg: "bg-purple-500/15 border-purple-500/20", dot: "bg-purple-400" };
  if (s === "ESCALATED") return { label: "Escalated", color: "text-orange-400", bg: "bg-orange-500/15 border-orange-500/20", dot: "bg-orange-400" };
  if (s === "RESOLVED") return { label: "Resolved", color: "text-cyan-400", bg: "bg-cyan-500/15 border-cyan-500/20", dot: "bg-cyan-400" };
  return { label: status || "Unknown", color: "text-gray-400", bg: "bg-gray-500/15 border-gray-500/20", dot: "bg-gray-400" };
}

function getCategoryIcon(cat: string) {
  const c = cat?.toLowerCase();
  if (c === "road") return "🛣️";
  if (c === "water") return "💧";
  if (c === "electricity") return "⚡";
  if (c === "environment") return "🌿";
  if (c === "health") return "🏥";
  if (c === "education") return "📚";
  return "📋";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-gray-500 hover:text-cyan-400 transition"
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  );
}

function DetailContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("id") || "";
  const isBackend = ticketId.startsWith("backend-");
  const backendId = isBackend ? ticketId.replace("backend-", "") : null;

  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [backend, setBackend] = useState<BackendDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ticketId) {
      setError("No ticket ID provided");
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      try {
        if (isBackend && backendId) {
          const res = await fetch(`${BACKEND_API}/api/submissions/${backendId}`);
          if (res.ok) {
            const data = await res.json();
            setBackend(data);
          } else {
            setError("Submission not found");
          }
        } else {
          const res = await fetch(`${CHAIN_API}/popp/ticket/tickets`);
          if (res.ok) {
            const data = await res.json();
            const found = data.tickets?.find((t: TicketDetail) => t.id === ticketId);
            if (found) {
              setTicket(found);
              // Try to find matching backend submission (may fail due to CORS)
              try {
                const backendRes = await fetch(`${BACKEND_API}/api/submissions`);
                if (backendRes.ok) {
                  const subs = await backendRes.json();
                  const match = Array.isArray(subs) ? subs.find((s: BackendDetail) =>
                    s.media_hash === found.evidence_hash
                  ) : null;
                  if (match) setBackend(match);
                }
              } catch {
                // CORS or network error - continue with chain data only
                console.warn("Backend API not accessible, showing chain data only");
              }
            } else {
              setError("Ticket not found on chain");
            }
          } else {
            setError("Failed to fetch from chain");
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`Network error: ${err instanceof Error ? err.message : "Failed to connect to APIs"}`);
      }
      setLoading(false);
    };
    fetchDetail();
  }, [ticketId, isBackend, backendId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Loading ticket details...</span>
        </div>
      </div>
    );
  }

  if (error || (!ticket && !backend)) {
    return (
      <div className="text-center py-20">
        <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">{error || "Not Found"}</h2>
        <p className="text-gray-400 mb-4">The ticket you're looking for doesn't exist or is unavailable.</p>
        <Link href="/explorer">
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold flex items-center gap-2 mx-auto">
            <ArrowLeft size={14} /> Back to Explorer
          </button>
        </Link>
      </div>
    );
  }

  const statusStyle = getStatusStyle(ticket?.status || backend?.status || "");
  const category = ticket?.category || backend?.category || "other";
  const description = ticket?.description || backend?.description || "";
  const location = ticket?.location || (backend ? `${backend.latitude},${backend.longitude}` : "");

  return (
    <>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-2xl ring-1 ring-white/10">
            {getCategoryIcon(category)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs font-bold rounded-lg border ${statusStyle.bg} ${statusStyle.color}`}>
                <span className={`inline-block w-2 h-2 rounded-full ${statusStyle.dot} mr-1.5`} />
                {statusStyle.label}
              </span>
              {ticket && (
                <span className="px-2 py-1 text-xs font-bold rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 uppercase">
                  On-Chain
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold mb-1">{backend?.title || description}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1"><MapPin size={14} /> {location}</span>
              {ticket?.region && <span className="flex items-center gap-1"><Globe size={14} /> {ticket.region}</span>}
              {ticket?.timestamp && <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(ticket.timestamp)}</span>}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ticket Lifecycle Visualization */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Ticket Lifecycle</h2>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {['Submitted', 'Validating', 'Validated', 'Proven', 'Escalated', 'Resolved'].map((stage, i) => {
            const currentStatus = (ticket?.status || backend?.status || '').toLowerCase();
            const stageMap: Record<string, number> = { submitted: 0, pending_validation: 1, validating: 1, validated: 2, proven: 3, escalated: 4, resolved: 5 };
            const currentIdx = stageMap[currentStatus] ?? 0;
            const isActive = i <= currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <React.Fragment key={stage}>
                <div className={`flex flex-col items-center min-w-[80px] ${isCurrent ? 'scale-110' : ''} transition-transform`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white' : 'bg-white/5 text-gray-500 border border-white/10'
                  } ${isCurrent ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#030712] animate-pulse' : ''}`}>
                    {i + 1}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-cyan-400' : 'text-gray-500'}`}>{stage}</span>
                </div>
                {i < 5 && <div className={`flex-1 h-0.5 min-w-[20px] ${isActive && i < currentIdx ? 'bg-cyan-500' : 'bg-white/10'}`} />}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-4">
          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <FileText size={14} className="text-cyan-400" /> Description
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">{description || "No description available."}</p>
          </motion.div>

          {/* Evidence Image */}
          {backend?.media_url && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <ImageIcon size={14} className="text-cyan-400" /> Evidence Image
              </h2>
              <div className="rounded-lg overflow-hidden border border-white/10 bg-black/20">
                <img
                  src={backend.media_url}
                  alt="Evidence"
                  className="w-full max-h-80 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="p-8 text-center text-gray-500 text-sm">Image could not be loaded</div>';
                  }}
                />
              </div>
              <a
                href={backend.media_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition"
              >
                Open full image <ExternalLink size={11} />
              </a>
            </motion.div>
          )}

          {/* Location Map */}
          {(backend?.latitude || ticket?.location) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <MapPin size={14} className="text-cyan-400" /> Location
              </h2>
              <div className="rounded-lg overflow-hidden border border-white/10 bg-black/20 h-48">
                {(() => {
                  const lat = backend?.latitude;
                  const lng = backend?.longitude;
                  if (lat && lng) {
                    return (
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`}
                      />
                    );
                  }
                  // Fallback for chain tickets with location string
                  const loc = ticket?.location?.split(',');
                  if (loc && loc.length === 2) {
                    const cLat = parseFloat(loc[0]);
                    const cLng = parseFloat(loc[1]);
                    if (!isNaN(cLat) && !isNaN(cLng)) {
                      return (
                        <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${cLng - 0.01},${cLat - 0.01},${cLng + 0.01},${cLat + 0.01}&layer=mapnik&marker=${cLat},${cLng}`}
                        />
                      );
                    }
                  }
                  return <div className="flex items-center justify-center h-full text-gray-500 text-sm">Map unavailable</div>;
                })()}
              </div>
              <div className="mt-2 text-xs text-gray-400">
                {backend?.latitude && backend?.longitude
                  ? `${backend.latitude.toFixed(6)}, ${backend.longitude.toFixed(6)}`
                  : ticket?.location || "Unknown"}
              </div>
            </motion.div>
          )}

          {/* AI Analysis */}
          {backend?.ai_summary && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" /> AI Analysis
              </h2>
              <p className="text-sm text-gray-300 mb-3">{backend.ai_summary}</p>
              <div className="grid grid-cols-2 gap-3">
                {backend.ai_severity && (
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[10px] text-gray-500 uppercase mb-1">Severity</div>
                    <div className={`text-sm font-bold ${
                      backend.ai_severity === "High" ? "text-red-400" : backend.ai_severity === "Medium" ? "text-yellow-400" : "text-green-400"
                    }`}>{backend.ai_severity}</div>
                  </div>
                )}
                {backend.ai_urgency && (
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-[10px] text-gray-500 uppercase mb-1">Urgency</div>
                    <div className={`text-sm font-bold ${
                      backend.ai_urgency === "Immediate" ? "text-red-400" : backend.ai_urgency === "Soon" ? "text-yellow-400" : "text-green-400"
                    }`}>{backend.ai_urgency}</div>
                  </div>
                )}
              </div>
              {backend.ai_keywords && backend.ai_keywords.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] text-gray-500 uppercase mb-1.5">Keywords</div>
                  <div className="flex flex-wrap gap-1.5">
                    {backend.ai_keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 text-[11px] bg-white/5 text-gray-400 rounded-full border border-white/5">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Chain Info */}
          {ticket && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-cyan-500/20 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <Shield size={14} /> Blockchain Verification
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Ticket ID</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 break-all max-w-[200px]">{ticket.id}</span>
                    <CopyButton text={ticket.id} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Submitter</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-300 break-all max-w-[200px]">{ticket.submitter}</span>
                    <CopyButton text={ticket.submitter} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Evidence Hash</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-300">{ticket.evidence_hash}</span>
                    <CopyButton text={ticket.evidence_hash} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Block Timestamp</span>
                  <span className="text-xs text-gray-300">{formatDate(ticket.timestamp)}</span>
                </div>
                {ticket.proof_id && ticket.proof_id !== "" && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Proof ID</span>
                    <span className="text-xs font-mono text-emerald-400">{ticket.proof_id}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Raw Data */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <FileText size={14} className="text-gray-400" /> Raw Data
            </h2>
            <div className="bg-black/30 rounded-lg p-3 overflow-x-auto">
              <pre className="text-[10px] text-gray-400 font-mono whitespace-pre-wrap break-all">
                {JSON.stringify({ ticket, backend }, null, 2)}
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Status</h3>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${statusStyle.bg}`}>
              <span className={`w-2 h-2 rounded-full ${statusStyle.dot} animate-pulse`} />
              <span className={`text-sm font-bold ${statusStyle.color}`}>{statusStyle.label}</span>
            </div>
          </motion.div>

          {/* Details Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Details</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Category</span>
              <span className="text-xs font-semibold text-gray-300">{category}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Region</span>
              <span className="text-xs font-semibold text-gray-300">{ticket?.region || "India"}</span>
            </div>
            {ticket?.validation_score && ticket.validation_score !== "0" && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Validation Score</span>
                <span className="text-xs font-semibold text-emerald-400">{ticket.validation_score}</span>
              </div>
            )}
            {backend?.consensus_score != null && backend.consensus_score > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Consensus</span>
                <span className="text-xs font-semibold text-emerald-400">{backend.consensus_score}%</span>
              </div>
            )}
            {backend?.escalation_level && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Escalation</span>
                <span className="text-xs font-semibold text-orange-400">{backend.escalation_level}</span>
              </div>
            )}
          </motion.div>

          {/* TX Hash */}
          {backend?.chain_tx_hash && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Transaction</h3>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-mono text-gray-400 break-all">{backend.chain_tx_hash}</span>
                <CopyButton text={backend.chain_tx_hash} />
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Actions</h3>
            <Link href="/report">
              <button className="w-full px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold hover:shadow-lg hover:shadow-cyan-500/10 transition text-center">
                Submit Similar Problem
              </button>
            </Link>
            <Link href="/validators">
              <button className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300 hover:bg-white/10 transition text-center">
                Become a Validator
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function TicketDetailPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-4xl mx-auto px-6 py-8">
        {/* Back button */}
        <Link href="/explorer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6">
          <ArrowLeft size={14} /> Back to Explorer
        </Link>

        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <DetailContent />
        </Suspense>
      </div>
    </main>
  );
}
