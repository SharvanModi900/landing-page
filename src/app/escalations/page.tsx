"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, AlertTriangle, Shield, Clock, CheckCircle, XCircle, ArrowLeft, Zap, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface Escalation {
  id: string;
  submission_id: string;
  from_tier: number;
  to_tier: number;
  reason: string;
  escalated_at: string;
  status?: string;
  resolution?: string;
  resolved_at?: string;
  title?: string;
  description?: string;
  ai_severity?: string;
  ai_urgency?: string;
  consensus_score?: number;
}

const TIER_LABELS = ["Community", "Domain Expert", "Institutional", "Autonomous", "Emergency"];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function EscalationsPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [escalations, setEscalations] = useState<Escalation[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolveTarget, setResolveTarget] = useState<string | null>(null);
  const [resolution, setResolution] = useState("");
  const [action, setAction] = useState("");
  const [resolveLoading, setResolveLoading] = useState(false);
  const [resolveMsg, setResolveMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");

  const fetchEscalations = useCallback(async () => {
    if (!connected) { setLoading(false); return; }
    try {
      const res = await fetch(`${BACKEND_API}/api/escalations/pending`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setEscalations(Array.isArray(data) ? data : data.escalations || []);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchEscalations(); }, [fetchEscalations]);

  const handleResolve = async (id: string) => {
    if (!resolution || !action) return;
    setResolveLoading(true);
    setResolveMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/escalations/${id}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ resolution, action }),
      });
      if (res.ok) {
        setResolveMsg({ text: "Escalation resolved!", ok: true });
        setResolveTarget(null);
        setResolution("");
        setAction("");
        fetchEscalations();
      } else {
        const err = await res.text();
        setResolveMsg({ text: err || "Resolve failed", ok: false });
      }
    } catch (e: any) { setResolveMsg({ text: e.message || "Failed", ok: false }); }
    finally { setResolveLoading(false); }
  };

  const pendingCount = escalations.filter(e => e.status === "pending" || !e.status).length;

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-red-600/20 ring-1 ring-orange-500/30">
              <ArrowUpRight className="h-4 w-4 text-orange-400" />
            </div>
            <h1 className="text-xl font-bold">Escalation Center</h1>
            {pendingCount > 0 && <span className="px-2 py-0.5 text-[10px] font-bold bg-orange-500/20 text-orange-400 rounded-full">{pendingCount} pending</span>}
          </div>
        </motion.div>

        {!connected ? (
          <div className="text-center py-16">
            <Shield className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
            <p className="text-sm text-gray-400 mb-4">Connect to view and resolve escalations.</p>
            <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><AlertTriangle size={12} className="text-orange-400" /><span className="text-[10px] text-gray-400">Pending</span></div>
                <div className="text-lg font-bold">{pendingCount}</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><TrendingUp size={12} className="text-cyan-400" /><span className="text-[10px] text-gray-400">Total</span></div>
                <div className="text-lg font-bold">{escalations.length}</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><Zap size={12} className="text-yellow-400" /><span className="text-[10px] text-gray-400">High Severity</span></div>
                <div className="text-lg font-bold">{escalations.filter(e => e.ai_severity === "High").length}</div>
              </motion.div>
            </div>

            {/* Resolve Message */}
            {resolveMsg && (
              <div className={`mb-4 p-2 rounded-lg text-xs font-semibold ${resolveMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{resolveMsg.text}</div>
            )}

            {/* Escalation List */}
            {escalations.length === 0 ? (
              <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
                <CheckCircle className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">No Pending Escalations</h3>
                <p className="text-sm text-gray-400">All escalations have been resolved or none are pending.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {escalations.map((esc, i) => (
                  <motion.div key={esc.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${esc.status === "resolved" ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"}`}>
                            {esc.status || "pending"}
                          </span>
                          <span className="text-[10px] text-gray-500 flex items-center gap-0.5"><Clock size={9} /> {timeAgo(esc.escalated_at)}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-400">
                            {TIER_LABELS[esc.from_tier] || `Tier ${esc.from_tier}`} → {TIER_LABELS[esc.to_tier] || `Tier ${esc.to_tier}`}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold">{esc.title || `Escalation #${esc.id.slice(0, 8)}`}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{esc.reason}</p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 mb-2 text-[10px] text-gray-500">
                      {esc.ai_severity && (
                        <span className={`px-1.5 py-0.5 rounded font-semibold ${esc.ai_severity === "High" ? "bg-red-500/20 text-red-400" : esc.ai_severity === "Medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"}`}>
                          Severity: {esc.ai_severity}
                        </span>
                      )}
                      {esc.ai_urgency && (
                        <span className={`px-1.5 py-0.5 rounded font-semibold ${esc.ai_urgency === "Immediate" ? "bg-red-500/20 text-red-400" : esc.ai_urgency === "Soon" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"}`}>
                          Urgency: {esc.ai_urgency}
                        </span>
                      )}
                      {esc.consensus_score != null && <span>Consensus: {esc.consensus_score}%</span>}
                    </div>

                    {/* Resolved info */}
                    {esc.status === "resolved" && esc.resolution && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 mb-2">
                        <div className="text-[10px] text-emerald-400 font-semibold mb-0.5">Resolution</div>
                        <div className="text-xs text-gray-300">{esc.resolution}</div>
                        {esc.resolved_at && <div className="text-[10px] text-gray-500 mt-0.5">Resolved {timeAgo(esc.resolved_at)}</div>}
                      </div>
                    )}

                    {/* Actions */}
                    {(!esc.status || esc.status === "pending") && (
                      <div className="flex gap-2 mt-2">
                        {resolveTarget === esc.id ? (
                          <div className="w-full space-y-2">
                            <input value={resolution} onChange={e => setResolution(e.target.value)}
                              placeholder="Describe your resolution..." className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                            <div className="flex gap-1.5">
                              {["approve", "reject", "escalate_further"].map(a => (
                                <button key={a} onClick={() => setAction(a)}
                                  className={`px-2 py-1 rounded text-[10px] font-semibold transition ${action === a ? "bg-orange-500/30 text-orange-400 border border-orange-500/30" : "bg-white/5 text-gray-400 border border-white/10"}`}>
                                  {a === "escalate_further" ? "Escalate Further" : a.charAt(0).toUpperCase() + a.slice(1)}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleResolve(esc.id)} disabled={resolveLoading || !resolution || !action}
                                className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-[11px] font-semibold disabled:opacity-50">
                                {resolveLoading ? "Resolving..." : "Submit Resolution"}
                              </button>
                              <button onClick={() => { setResolveTarget(null); setResolveMsg(null); }}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] text-gray-400">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={() => { setResolveTarget(esc.id); setResolution(""); setAction(""); setResolveMsg(null); }}
                            className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                            <CheckCircle size={11} /> Resolve
                          </button>
                        )}
                        <Link href={`/explorer/detail?id=backend-${esc.submission_id}`}>
                          <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] text-gray-400 flex items-center gap-1">
                            <Eye size={11} /> View Submission
                          </button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* How it works */}
            <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5"><AlertTriangle size={14} className="text-orange-400" /> How Escalations Work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-400">
                <div className="flex gap-2"><span className="text-orange-400 font-bold text-sm">1.</span> When a submission can&apos;t be validated at its current tier, it escalates to a higher tier</div>
                <div className="flex gap-2"><span className="text-orange-400 font-bold text-sm">2.</span> Higher-tier validators with more expertise review the escalated submission</div>
                <div className="flex gap-2"><span className="text-orange-400 font-bold text-sm">3.</span> Resolutions can approve, reject, or escalate further up the chain</div>
              </div>
            </div>

            {/* Check Escalation */}
            {connected && (
              <EscalationExtras connected={connected} getAuthHeaders={getAuthHeaders} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

function EscalationExtras({ connected, getAuthHeaders }: { connected: boolean; getAuthHeaders: () => Record<string, string> }) {
  const [checkId, setCheckId] = useState("");
  const [checkResult, setCheckResult] = useState<any>(null);
  const [checkLoading, setCheckLoading] = useState(false);
  const [detailId, setDetailId] = useState("");
  const [detail, setDetail] = useState<any>(null);
  const [stateHistory, setStateHistory] = useState<any[]>([]);

  const handleCheck = async () => {
    if (!checkId) return;
    setCheckLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/api/escalations/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ submission_id: checkId }),
      });
      if (res.ok) setCheckResult(await res.json());
      else setCheckResult(null);
    } catch { /* ignore */ }
    setCheckLoading(false);
  };

  const handleGetDetail = async () => {
    if (!detailId) return;
    try {
      const [detailRes, histRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/escalations/${detailId}`, { headers: getAuthHeaders() }),
        fetch(`${BACKEND_API}/api/escalations/${detailId}/state-history`, { headers: getAuthHeaders() }),
      ]);
      if (detailRes.status === "fulfilled" && detailRes.value.ok) setDetail(await detailRes.value.json());
      if (histRes.status === "fulfilled" && histRes.value.ok) {
        const d = await histRes.value.json();
        setStateHistory(Array.isArray(d) ? d : d.history || []);
      }
    } catch { /* ignore */ }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-bold mb-3">Check Escalation Status</h3>
        <div className="flex gap-2">
          <input value={checkId} onChange={e => setCheckId(e.target.value)} placeholder="Submission ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
          <button onClick={handleCheck} disabled={checkLoading} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold disabled:opacity-50">{checkLoading ? "Checking..." : "Check"}</button>
        </div>
        {checkResult && (
          <div className="mt-3 bg-white/[0.03] rounded-lg p-3">
            <div className="text-xs text-gray-300">Status: <span className="font-bold text-orange-400">{checkResult.status || checkResult.escalation_status || "Unknown"}</span></div>
            {checkResult.tier != null && <div className="text-[10px] text-gray-500">Current tier: {TIER_LABELS[checkResult.tier] || checkResult.tier}</div>}
          </div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-bold mb-3">Escalation Detail & History</h3>
        <div className="flex gap-2 mb-3">
          <input value={detailId} onChange={e => setDetailId(e.target.value)} placeholder="Escalation ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
          <button onClick={handleGetDetail} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold">Load</button>
        </div>
        {detail && (
          <div className="bg-white/[0.03] rounded-lg p-3 mb-3">
            <div className="text-xs font-semibold">{detail.reason || detail.title || "Escalation"}</div>
            <div className="text-[10px] text-gray-500 mt-1">Tier: {TIER_LABELS[detail.to_tier] || detail.to_tier} | Status: {detail.status || "—"}</div>
          </div>
        )}
        {stateHistory.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] text-gray-400 font-semibold">State History</div>
            {stateHistory.map((s: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2">
                <Clock size={10} className="text-gray-500" />
                <div className="text-[10px] text-gray-400">{s.from_state || s.action || "State change"} → {s.to_state || ""}</div>
                {s.changed_at && <div className="text-[9px] text-gray-500 ml-auto">{new Date(s.changed_at).toLocaleString()}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
