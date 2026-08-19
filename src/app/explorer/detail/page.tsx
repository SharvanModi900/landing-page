"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Globe, Calendar, Shield, Copy, Check,
  AlertTriangle, Zap, FileText, Image as ImageIcon, ExternalLink,
  MessageSquare, Send, Upload, ThumbsUp, Link as LinkIcon, Activity, Clock, Flag, Archive,
  Coins, CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWallet } from "@/lib/wallet";

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

interface Comment {
  id: string;
  user_id?: string;
  author_address?: string;
  content: string;
  created_at: string;
}

interface EvidenceItem {
  id: string;
  evidence_type: string;
  ipfs_hash?: string;
  url?: string;
  description?: string;
  created_at: string;
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
  const { connected, connect, getAuthHeaders } = useWallet();

  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [backend, setBackend] = useState<BackendDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  // Evidence state
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [evidenceDesc, setEvidenceDesc] = useState("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [evidenceLoading, setEvidenceLoading] = useState(false);

  // Support state
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportMsg, setSupportMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Activity state
  const [activity, setActivity] = useState<any[]>([]);

  // Submission updates state
  const [updates, setUpdates] = useState<any[]>([]);

  // Proof chain state
  const [proofChain, setProofChain] = useState<any>(null);

  // Chain ticket state
  const [chainTicket, setChainTicket] = useState<any>(null);

  // Community voice state
  const [voiceText, setVoiceText] = useState("");
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceMsg, setVoiceMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [communityVoices, setCommunityVoices] = useState<any[]>([]);

  // Flag state
  const [flagReason, setFlagReason] = useState("");
  const [flagLoading, setFlagLoading] = useState(false);
  const [flagMsg, setFlagMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Archive state
  const [archiveMsg, setArchiveMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Additional data state
  const [votes, setVotes] = useState<any[]>([]);
  const [rewardBreakdown, setRewardBreakdown] = useState<any>(null);
  const [stateHistory, setStateHistory] = useState<any[]>([]);
  const [escalationInfo, setEscalationInfo] = useState<any>(null);
  const [proofData, setProofData] = useState<any>(null);
  const [archiveData, setArchiveData] = useState<any>(null);
  const [ipfsData, setIpfsData] = useState<any>(null);

  // Direct chain lookup data
  const [chainValidations, setChainValidations] = useState<any>(null);
  const [chainConsensus, setChainConsensus] = useState<any>(null);
  const [chainProof, setChainProof] = useState<any>(null);

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
          // First try chain
          let foundOnChain = false;
          try {
            const res = await fetch(`${CHAIN_API}/popp/ticket/tickets`);
            if (res.ok) {
              const data = await res.json();
              const found = data.tickets?.find((t: TicketDetail) => t.id === ticketId);
              if (found) {
                setTicket(found);
                foundOnChain = true;
                // Try to find matching backend submission
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
                  console.warn("Backend API not accessible, showing chain data only");
                }
              }
            }
          } catch {
            console.warn("Chain API not accessible");
          }

          // Fallback: try backend directly (handles UUID IDs from explorer)
          if (!foundOnChain) {
            try {
              const res = await fetch(`${BACKEND_API}/api/submissions/${ticketId}`);
              if (res.ok) {
                const data = await res.json();
                setBackend(data);
              } else {
                setError("Ticket not found on chain or in backend");
              }
            } catch {
              setError("Ticket not found on chain and backend is unavailable");
            }
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

  // ─── Fetch Comments & Evidence ─────────────────────────────────────────

  const submissionId = backendId || ticketId;

  const fetchComments = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      }
    } catch { /* non-critical */ }
  };

  const fetchEvidence = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/evidence`);
      if (res.ok) {
        const data = await res.json();
        setEvidence(Array.isArray(data) ? data : []);
      }
    } catch { /* non-critical */ }
  };

  const fetchActivity = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/activity`);
      if (res.ok) {
        const data = await res.json();
        setActivity(Array.isArray(data) ? data : data.activities || []);
      }
    } catch { /* non-critical */ }
  };

  const fetchUpdates = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/updates`);
      if (res.ok) {
        const data = await res.json();
        setUpdates(Array.isArray(data) ? data : data.updates || []);
      }
    } catch { /* non-critical */ }
  };

  const fetchProofChain = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/proof-chain`);
      if (res.ok) {
        const data = await res.json();
        setProofChain(data);
      }
    } catch { /* non-critical */ }
  };

  const fetchChainTicket = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/chain-ticket`);
      if (res.ok) {
        const data = await res.json();
        setChainTicket(data);
      }
    } catch { /* non-critical */ }
  };

  const fetchVotes = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/votes`);
      if (res.ok) { const d = await res.json(); setVotes(Array.isArray(d) ? d : d.votes || []); }
    } catch { /* non-critical */ }
  };

  const fetchRewardBreakdown = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/reward-breakdown`);
      if (res.ok) setRewardBreakdown(await res.json());
    } catch { /* non-critical */ }
  };

  const fetchStateHistory = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/state-history`);
      if (res.ok) { const d = await res.json(); setStateHistory(Array.isArray(d) ? d : d.history || []); }
    } catch { /* non-critical */ }
  };

  const fetchEscalationInfo = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/escalation-info`);
      if (res.ok) setEscalationInfo(await res.json());
    } catch { /* non-critical */ }
  };

  const fetchProofData = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/proof`);
      if (res.ok) setProofData(await res.json());
    } catch { /* non-critical */ }
  };

  const fetchArchiveData = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/archive`);
      if (res.ok) setArchiveData(await res.json());
    } catch { /* non-critical */ }
  };

  const fetchIpfsData = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/ipfs`);
      if (res.ok) setIpfsData(await res.json());
    } catch { /* non-critical */ }
  };

  const fetchChainLookupData = async () => {
    const lookupId = backend?.chain_ticket_id || (ticket ? ticketId : null);
    if (!lookupId) return;
    try {
      const [valRes, consRes, proofRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/chain/validations/${lookupId}`),
        fetch(`${BACKEND_API}/api/chain/consensus/${lookupId}`),
        fetch(`${BACKEND_API}/api/chain/proof/${lookupId}`),
      ]);
      if (valRes.status === 'fulfilled' && valRes.value.ok) setChainValidations(await valRes.value.json());
      if (consRes.status === 'fulfilled' && consRes.value.ok) setChainConsensus(await consRes.value.json());
      if (proofRes.status === 'fulfilled' && proofRes.value.ok) setChainProof(await proofRes.value.json());
    } catch { /* non-critical */ }
  };

  const fetchCommunityVoices = async () => {
    if (!submissionId) return;
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/community-voice`);
      if (res.ok) { const d = await res.json(); setCommunityVoices(Array.isArray(d) ? d : d.voices || []); }
    } catch { /* non-critical */ }
  };

  useEffect(() => {
    if (submissionId) {
      fetchComments();
      fetchEvidence();
      fetchActivity();
      fetchUpdates();
      fetchProofChain();
      fetchChainTicket();
      fetchVotes();
      fetchRewardBreakdown();
      fetchStateHistory();
      fetchEscalationInfo();
      fetchProofData();
      fetchArchiveData();
      fetchIpfsData();
      fetchCommunityVoices();
      fetchChainLookupData();
    }
  }, [submissionId]);

  // ─── Submit Comment ────────────────────────────────────────────────────

  const handleSubmitComment = async () => {
    if (!connected) { await connect(); return; }
    if (!newComment.trim()) return;
    setCommentLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      if (res.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch { /* ignore */ }
    finally { setCommentLoading(false); }
  };

  // ─── Upload Evidence ───────────────────────────────────────────────────

  const handleUploadEvidence = async () => {
    if (!connected) { await connect(); return; }
    if (!evidenceFile) return;
    setEvidenceLoading(true);
    try {
      // Upload file first
      const formData = new FormData();
      formData.append("file", evidenceFile);
      const uploadRes = await fetch(`${BACKEND_API}/api/upload/image`, { method: "POST", body: formData });
      let hash = "";
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        hash = uploadData.hash || uploadData.ipfs_hash || "";
      }
      // Add evidence record
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/evidence`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ evidence_type: "image", ipfs_hash: hash, description: evidenceDesc || undefined }),
      });
      if (res.ok) {
        setEvidenceDesc("");
        setEvidenceFile(null);
        fetchEvidence();
      }
    } catch { /* ignore */ }
    finally { setEvidenceLoading(false); }
  };

  // ─── Support Submission ────────────────────────────────────────────────

  const handleSupport = async () => {
    if (!connected) { await connect(); return; }
    setSupportLoading(true);
    setSupportMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/support`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setSupportMsg({ text: "You supported this submission!", ok: true });
      } else {
        const err = await res.text();
        setSupportMsg({ text: err || "Failed to support", ok: false });
      }
    } catch (e: any) {
      setSupportMsg({ text: e.message || "Failed", ok: false });
    } finally {
      setSupportLoading(false);
    }
  };

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
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-2xl ring-1 ring-white/10">
            {getCategoryIcon(category)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
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
            <h1 className="text-xl sm:text-2xl font-bold mb-1 break-words">{backend?.title || description}</h1>
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

          {/* Evidence Upload */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Upload size={14} className="text-cyan-400" /> Additional Evidence
            </h2>
            {/* Existing evidence list */}
            {evidence.length > 0 && (
              <div className="space-y-2 mb-3">
                {evidence.map((ev) => (
                  <div key={ev.id} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                    <LinkIcon size={12} className="text-cyan-400 flex-shrink-0" />
                    <span className="text-[11px] text-gray-300 flex-1 truncate">{ev.description || ev.evidence_type}</span>
                    <span className="text-[10px] text-gray-500">{new Date(ev.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Upload form */}
            <div className="space-y-2">
              <input value={evidenceDesc} onChange={e => setEvidenceDesc(e.target.value)}
                placeholder="Describe this evidence..." className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500" />
              <input type="file" accept="image/*,video/*" onChange={e => setEvidenceFile(e.target.files?.[0] || null)}
                className="text-xs text-gray-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30" />
              <button onClick={handleUploadEvidence} disabled={evidenceLoading || !evidenceFile}
                className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center gap-1.5">
                <Upload size={11} /> {evidenceLoading ? "Uploading..." : "Upload Evidence"}
              </button>
              {!connected && <p className="text-[10px] text-gray-500">Connect wallet to upload evidence</p>}
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <MessageSquare size={14} className="text-cyan-400" /> Comments ({comments.length})
            </h2>
            {/* Comment list */}
            {comments.length > 0 ? (
              <div className="space-y-2 mb-4">
                {comments.map((c) => (
                  <div key={c.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-cyan-400">{(c.author_address || c.user_id || "anon").slice(0, 12)}...</span>
                      <span className="text-[10px] text-gray-500">{new Date(c.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-300">{c.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 mb-3">No comments yet. Be the first to comment.</p>
            )}
            {/* Add comment */}
            <div className="flex gap-2">
              <input value={newComment} onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmitComment()}
                placeholder={connected ? "Add a comment..." : "Connect wallet to comment"}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <button onClick={handleSubmitComment} disabled={commentLoading || !newComment.trim()}
                className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center gap-1">
                <Send size={11} /> {commentLoading ? "..." : "Post"}
              </button>
            </div>
          </motion.div>

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

          {/* Activity Timeline */}
          {activity.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Activity size={14} className="text-cyan-400" /> Activity Timeline
              </h2>
              <div className="space-y-2">
                {activity.map((act: any, i: number) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0 pb-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-400 capitalize">{act.action || act.type || "update"}</span>
                        <span className="text-[10px] text-gray-500">{act.created_at ? new Date(act.created_at).toLocaleString() : ""}</span>
                      </div>
                      <p className="text-xs text-gray-300">{act.description || act.message || ""}</p>
                      {act.actor && <span className="text-[10px] text-gray-500 mt-0.5">by {act.actor}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Submission Updates */}
          {updates.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <MessageSquare size={14} className="text-blue-400" /> Submission Updates
              </h2>
              <div className="space-y-2">
                {updates.map((upd: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border-l-2 border-blue-500/50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded capitalize">{upd.update_type || upd.action || "update"}</span>
                      <span className="text-[10px] text-gray-500">{upd.created_at ? new Date(upd.created_at).toLocaleString() : ""}</span>
                    </div>
                    <p className="text-xs text-gray-300">{upd.content || upd.description || upd.message || ""}</p>
                    {upd.author && <span className="text-[10px] text-gray-500 mt-0.5 block">by {upd.author}</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Proof Chain */}
          {proofChain && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.19 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Shield size={14} className="text-purple-400" /> Proof Chain
              </h2>
              <div className="space-y-2">
                {proofChain.pop_id && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">PoP-ID</span>
                    <span className="text-xs font-mono text-purple-400 break-all max-w-[200px]">{proofChain.pop_id}</span>
                  </div>
                )}
                {proofChain.proof_hash && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Proof Hash</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-mono text-gray-300 truncate max-w-[150px]">{proofChain.proof_hash}</span>
                      <CopyButton text={proofChain.proof_hash} />
                    </div>
                  </div>
                )}
                {proofChain.proof_level != null && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Proof Level</span>
                    <span className="text-xs font-semibold text-purple-400">Level {proofChain.proof_level}</span>
                  </div>
                )}
                {proofChain.chain_tx_hash && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Chain TX</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-mono text-emerald-400 truncate max-w-[150px]">{proofChain.chain_tx_hash}</span>
                      <CopyButton text={proofChain.chain_tx_hash} />
                    </div>
                  </div>
                )}
                {proofChain.status && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Status</span>
                    <span className={`text-xs font-semibold ${proofChain.status === "signed" ? "text-emerald-400" : proofChain.status === "challenged" ? "text-orange-400" : "text-gray-400"}`}>{proofChain.status}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Chain Ticket (Backend-linked) */}
          {chainTicket && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.195 }}
              className="bg-gradient-to-br from-cyan-500/5 to-blue-600/5 border border-cyan-500/20 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <LinkIcon size={14} /> Linked Chain Ticket
              </h2>
              <div className="space-y-2">
                {chainTicket.ticket_id && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Ticket ID</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-mono text-cyan-400 break-all max-w-[200px]">{chainTicket.ticket_id}</span>
                      <CopyButton text={chainTicket.ticket_id} />
                    </div>
                  </div>
                )}
                {chainTicket.chain_tx_hash && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">TX Hash</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-mono text-gray-300 truncate max-w-[150px]">{chainTicket.chain_tx_hash}</span>
                      <CopyButton text={chainTicket.chain_tx_hash} />
                    </div>
                  </div>
                )}
                {chainTicket.status && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Status</span>
                    <span className="text-xs font-semibold text-cyan-400">{chainTicket.status}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Votes */}
          {votes.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <ThumbsUp size={14} className="text-emerald-400" /> Votes ({votes.length})
              </h2>
              <div className="space-y-2">
                {votes.slice(0, 10).map((v: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                    <ThumbsUp size={10} className="text-emerald-400" />
                    <span className="text-[10px] font-mono text-gray-400 flex-1">{v.voter || v.user_id || v.address || "anon"}</span>
                    <span className={`text-[10px] font-semibold ${v.vote === "approve" || v.value > 0 ? "text-emerald-400" : "text-red-400"}`}>{v.vote || (v.value > 0 ? "+" : "") + v.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reward Breakdown */}
          {rewardBreakdown && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Coins size={14} className="text-yellow-400" /> Reward Breakdown
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {rewardBreakdown.submitter_reward != null && (
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Submitter</div>
                    <div className="text-sm font-bold text-emerald-400">{rewardBreakdown.submitter_reward}</div>
                  </div>
                )}
                {rewardBreakdown.validator_reward != null && (
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Validators</div>
                    <div className="text-sm font-bold text-cyan-400">{rewardBreakdown.validator_reward}</div>
                  </div>
                )}
                {rewardBreakdown.platform_fee != null && (
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Platform Fee</div>
                    <div className="text-sm font-bold text-gray-400">{rewardBreakdown.platform_fee}</div>
                  </div>
                )}
                {rewardBreakdown.total_reward != null && (
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">Total</div>
                    <div className="text-sm font-bold text-yellow-400">{rewardBreakdown.total_reward}</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* State History */}
          {stateHistory.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Clock size={14} className="text-blue-400" /> State History
              </h2>
              <div className="space-y-2">
                {stateHistory.map((s: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                    <Clock size={10} className="text-blue-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-gray-400">
                        <span className="font-semibold text-gray-300">{s.from_state || s.old_status || "?"}</span>
                        {" → "}
                        <span className="font-semibold text-blue-400">{s.to_state || s.new_status || "?"}</span>
                      </div>
                      {s.reason && <div className="text-[9px] text-gray-500 mt-0.5">{s.reason}</div>}
                    </div>
                    {s.changed_at && <span className="text-[9px] text-gray-500">{new Date(s.changed_at).toLocaleString()}</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Escalation Info */}
          {escalationInfo && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.23 }}
              className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
                <AlertTriangle size={14} /> Escalation Info
              </h2>
              <div className="space-y-2">
                {escalationInfo.status && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Status</span>
                    <span className="text-xs font-semibold text-orange-400">{escalationInfo.status}</span>
                  </div>
                )}
                {escalationInfo.tier != null && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Tier</span>
                    <span className="text-xs font-semibold">{escalationInfo.tier}</span>
                  </div>
                )}
                {escalationInfo.reason && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Reason</span>
                    <span className="text-xs text-gray-300">{escalationInfo.reason}</span>
                  </div>
                )}
                {escalationInfo.escalated_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Escalated At</span>
                    <span className="text-xs text-gray-300">{new Date(escalationInfo.escalated_at).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Proof Data */}
          {proofData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Shield size={14} className="text-purple-400" /> Proof Details
              </h2>
              <div className="space-y-2">
                {proofData.proof_hash && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Proof Hash</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-purple-400 truncate max-w-[150px]">{proofData.proof_hash}</span>
                      <CopyButton text={proofData.proof_hash} />
                    </div>
                  </div>
                )}
                {proofData.proof_level != null && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Level</span>
                    <span className="text-xs font-semibold text-purple-400">{proofData.proof_level}</span>
                  </div>
                )}
                {proofData.status && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Status</span>
                    <span className={`text-xs font-semibold ${proofData.status === "valid" ? "text-emerald-400" : proofData.status === "challenged" ? "text-orange-400" : "text-gray-400"}`}>{proofData.status}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Archive Data */}
          {archiveData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.245 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Archive size={14} className="text-purple-400" /> Archive Status
              </h2>
              <div className="space-y-2">
                {archiveData.arweave_tx && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Arweave TX</span>
                    <span className="text-[10px] font-mono text-purple-400">{archiveData.arweave_tx}</span>
                  </div>
                )}
                {archiveData.archived_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Archived</span>
                    <span className="text-[10px] text-gray-300">{new Date(archiveData.archived_at).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* IPFS Data */}
          {ipfsData && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <LinkIcon size={14} className="text-teal-400" /> IPFS Status
              </h2>
              <div className="space-y-2">
                {ipfsData.ipfs_hash && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">IPFS Hash</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-teal-400 truncate max-w-[150px]">{ipfsData.ipfs_hash}</span>
                      <CopyButton text={ipfsData.ipfs_hash} />
                    </div>
                  </div>
                )}
                {ipfsData.pinned_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Pinned</span>
                    <span className="text-[10px] text-gray-300">{new Date(ipfsData.pinned_at).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Direct Chain Lookup Data */}
          {(chainValidations || chainConsensus || chainProof) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              className="bg-gradient-to-br from-indigo-500/5 to-purple-600/5 border border-indigo-500/20 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                <Shield size={14} /> On-Chain Verification Data
              </h2>
              <div className="space-y-4">
                {/* Chain Validations */}
                {chainValidations && (
                  <div className="bg-white/5 rounded-lg p-3">
                    <h3 className="text-xs font-bold text-cyan-400 mb-2">Validations</h3>
                    <div className="space-y-1.5">
                      {Array.isArray(chainValidations) ? chainValidations.map((v: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded p-2">
                          <CheckCircle size={10} className="text-emerald-400" />
                          <span className="text-[10px] font-mono text-gray-400 flex-1">{v.validator || v.address || 'anon'}</span>
                          <span className="text-[10px] font-semibold text-cyan-400">{v.verdict || v.vote || ''}</span>
                        </div>
                      )) : (
                        <pre className="text-[10px] text-gray-400 overflow-x-auto">{JSON.stringify(chainValidations, null, 2)}</pre>
                      )}
                    </div>
                  </div>
                )}
                {/* Chain Consensus */}
                {chainConsensus && (
                  <div className="bg-white/5 rounded-lg p-3">
                    <h3 className="text-xs font-bold text-yellow-400 mb-2">Consensus</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(chainConsensus).slice(0, 6).map(([k, v]) => (
                        <div key={k} className="bg-white/[0.03] rounded p-2">
                          <div className="text-[9px] text-gray-500">{k.replace(/_/g, ' ')}</div>
                          <div className="text-xs font-bold">{typeof v === 'number' ? v.toLocaleString() : String(v)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Chain Proof */}
                {chainProof && (
                  <div className="bg-white/5 rounded-lg p-3">
                    <h3 className="text-xs font-bold text-purple-400 mb-2">Chain Proof</h3>
                    <div className="space-y-1.5">
                      {Object.entries(chainProof).slice(0, 6).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-400">{k.replace(/_/g, ' ')}</span>
                          <span className="text-[10px] font-mono text-purple-400 truncate max-w-[180px]">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
                    <span className="text-xs font-mono text-cyan-400 break-all max-w-[150px] sm:max-w-[200px]">{ticket.id}</span>
                    <CopyButton text={ticket.id} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Submitter</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-300 break-all max-w-[150px] sm:max-w-[200px]">{ticket.submitter}</span>
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

          {/* Community Voice */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MessageSquare size={14} className="text-blue-400" /> Community Voice {communityVoices.length > 0 && `(${communityVoices.length})`}
            </h2>
            {voiceMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${voiceMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{voiceMsg.text}</div>}
            {communityVoices.length > 0 && (
              <div className="space-y-2 mb-3">
                {communityVoices.slice(0, 10).map((v: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-lg p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-blue-400">{(v.author || v.user_id || "anon").slice(0, 12)}</span>
                      <span className="text-[9px] text-gray-500">{v.created_at ? new Date(v.created_at).toLocaleDateString() : ""}</span>
                    </div>
                    <p className="text-xs text-gray-300">{v.text || v.content || ""}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input value={voiceText} onChange={e => setVoiceText(e.target.value)} placeholder="Share your voice on this submission..."
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <button onClick={async () => {
                if (!voiceText || !submissionId) return;
                setVoiceLoading(true); setVoiceMsg(null);
                try {
                  const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/community-voice`, {
                    method: "POST", headers: { "Content-Type": "application/json", ...(connected ? getAuthHeaders() : {}) },
                    body: JSON.stringify({ text: voiceText }),
                  });
                  if (res.ok) { setVoiceMsg({ text: "Voice added!", ok: true }); setVoiceText(""); fetchCommunityVoices(); }
                  else { const err = await res.text(); setVoiceMsg({ text: err || "Failed", ok: false }); }
                } catch (e: any) { setVoiceMsg({ text: e.message || "Failed", ok: false }); }
                finally { setVoiceLoading(false); }
              }} disabled={voiceLoading || !voiceText} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                {voiceLoading ? "Sending..." : "Add Voice"}
              </button>
            </div>
          </motion.div>

          {/* Flag Submission */}
          {connected && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Flag size={14} className="text-orange-400" /> Flag This Submission
              </h2>
              {flagMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${flagMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{flagMsg.text}</div>}
              <div className="flex gap-2">
                <input value={flagReason} onChange={e => setFlagReason(e.target.value)} placeholder="Reason for flagging..."
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={async () => {
                  if (!flagReason || !submissionId) return;
                  setFlagLoading(true); setFlagMsg(null);
                  try {
                    const res = await fetch(`${BACKEND_API}/api/submissions/${submissionId}/flag`, {
                      method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                      body: JSON.stringify({ reason: flagReason }),
                    });
                    if (res.ok) { setFlagMsg({ text: "Flagged!", ok: true }); setFlagReason(""); }
                    else { const err = await res.text(); setFlagMsg({ text: err || "Failed", ok: false }); }
                  } catch (e: any) { setFlagMsg({ text: e.message || "Failed", ok: false }); }
                  finally { setFlagLoading(false); }
                }} disabled={flagLoading || !flagReason} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                  {flagLoading ? "Flagging..." : "Flag"}
                </button>
              </div>
            </motion.div>
          )}

          {/* Archive to Arweave / IPFS */}
          {connected && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Archive size={14} className="text-purple-400" /> Archive Submission
              </h2>
              {archiveMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${archiveMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{archiveMsg.text}</div>}
              <div className="flex flex-wrap gap-2">
                <button onClick={async () => {
                  if (!submissionId) return;
                  setArchiveMsg(null);
                  try {
                    const res = await fetch(`${BACKEND_API}/api/arweave/archive`, {
                      method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                      body: JSON.stringify({ submission_id: submissionId }),
                    });
                    if (res.ok) setArchiveMsg({ text: "Archived to Arweave!", ok: true });
                    else { const err = await res.text(); setArchiveMsg({ text: err || "Failed", ok: false }); }
                  } catch (e: any) { setArchiveMsg({ text: e.message || "Failed", ok: false }); }
                }} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-xs font-semibold">Archive to Arweave</button>
                <button onClick={async () => {
                  if (!submissionId) return;
                  setArchiveMsg(null);
                  try {
                    const res = await fetch(`${BACKEND_API}/api/ipfs/pin`, {
                      method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                      body: JSON.stringify({ submission_id: submissionId }),
                    });
                    if (res.ok) setArchiveMsg({ text: "Pinned to IPFS!", ok: true });
                    else { const err = await res.text(); setArchiveMsg({ text: err || "Failed", ok: false }); }
                  } catch (e: any) { setArchiveMsg({ text: e.message || "Failed", ok: false }); }
                }} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg text-xs font-semibold">Pin to IPFS</button>
              </div>
            </motion.div>
          )}
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

            {/* Support Button */}
            <button onClick={handleSupport} disabled={supportLoading}
              className="w-full px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/20 rounded-lg text-xs font-semibold text-emerald-400 transition flex items-center justify-center gap-1.5 disabled:opacity-50">
              <ThumbsUp size={12} /> {supportLoading ? "Supporting..." : "Support This Problem"}
            </button>
            {supportMsg && (
              <div className={`text-[10px] font-semibold p-1.5 rounded text-center ${supportMsg.ok ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
                {supportMsg.text}
              </div>
            )}
            {!connected && <p className="text-[10px] text-gray-500 text-center">Connect wallet to interact</p>}

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
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
