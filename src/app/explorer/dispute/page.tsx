'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, ArrowLeft, Scale, Vote, Eye, Clock, FileText, ThumbsUp, ThumbsDown, Search, Upload } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@/lib/wallet';
import DarkSelect from '@/components/DarkSelect';

const BACKEND_API = 'https://popp.thharko.com';

interface Dispute {
  id: string;
  submission_id: string;
  raised_by: string;
  reason: string;
  evidence_urls: string[];
  status: string;
  created_at: string;
  submission?: { title?: string; description?: string };
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function DisputePage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [voteLoading, setVoteLoading] = useState<string | null>(null);
  const [voteMsg, setVoteMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newSubmissionId, setNewSubmissionId] = useState("");
  const [newReason, setNewReason] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createMsg, setCreateMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [resolveId, setResolveId] = useState("");
  const [resolveAction, setResolveAction] = useState("uphold");
  const [resolveLoading, setResolveLoading] = useState(false);
  const [resolveMsg, setResolveMsg] = useState<{ text: string; ok: boolean } | null>(null);
  // Dispute detail
  const [detailId, setDetailId] = useState("");
  const [detailData, setDetailData] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  // Escalate to DAO
  const [escalateId, setEscalateId] = useState("");
  const [escalateLoading, setEscalateLoading] = useState(false);
  const [escalateMsg, setEscalateMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const fetchDisputes = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_API}/api/disputes`);
      if (res.ok) {
        const data = await res.json();
        setDisputes(Array.isArray(data) ? data : data.disputes || []);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchDisputes(); }, [fetchDisputes]);

  const handleVote = async (disputeId: string, vote: string) => {
    if (!connected) { await connect(); return; }
    setVoteLoading(`${disputeId}-${vote}`);
    setVoteMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/disputes/${disputeId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ vote }),
      });
      if (res.ok) {
        setVoteMsg({ text: 'Vote recorded!', ok: true });
        fetchDisputes();
      } else {
        const err = await res.text();
        setVoteMsg({ text: err || 'Vote failed', ok: false });
      }
    } catch (e: any) { setVoteMsg({ text: e.message || 'Failed', ok: false }); }
    finally { setVoteLoading(null); }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/explorer" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6">
          <ArrowLeft size={14} /> Back to Explorer
        </Link>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-red-600/20 ring-1 ring-orange-500/30">
              <Scale className="h-4 w-4 text-orange-400" />
            </div>
            <h1 className="text-xl font-bold">Disputes & Appeals</h1>
            {disputes.length > 0 && <span className="px-2 py-0.5 text-[10px] font-bold bg-orange-500/20 text-orange-400 rounded-full">{disputes.length}</span>}
          </div>
        </motion.div>

        {voteMsg && (
          <div className={`mb-4 p-2 rounded-lg text-xs font-semibold ${voteMsg.ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{voteMsg.text}</div>
        )}

        {/* Create Dispute */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <button onClick={() => setShowCreate(!showCreate)} className="text-sm font-bold flex items-center gap-1.5 text-orange-400">
            <AlertTriangle size={14} /> {showCreate ? "Cancel" : "Raise New Dispute"}
          </button>
          {showCreate && (
            <div className="mt-3 space-y-2">
              {createMsg && <div className={`p-2 rounded-lg text-xs font-semibold ${createMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{createMsg.text}</div>}
              {!connected ? (
                <p className="text-xs text-gray-400">Connect wallet to raise a dispute</p>
              ) : (
                <>
                  <input value={newSubmissionId} onChange={e => setNewSubmissionId(e.target.value)} placeholder="Submission ID" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <textarea value={newReason} onChange={e => setNewReason(e.target.value)} placeholder="Reason for dispute" rows={2} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <button onClick={async () => {
                    if (!newSubmissionId || !newReason) return;
                    setCreateLoading(true); setCreateMsg(null);
                    try {
                      const res = await fetch(`${BACKEND_API}/api/disputes`, {
                        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                        body: JSON.stringify({ submission_id: newSubmissionId, reason: newReason }),
                      });
                      if (res.ok) { setCreateMsg({ text: "Dispute raised!", ok: true }); setNewSubmissionId(""); setNewReason(""); fetchDisputes(); }
                      else { const err = await res.text(); setCreateMsg({ text: err || "Failed", ok: false }); }
                    } catch (e: any) { setCreateMsg({ text: e.message || "Failed", ok: false }); }
                    finally { setCreateLoading(false); }
                  }} disabled={createLoading || !newSubmissionId || !newReason} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                    {createLoading ? "Creating..." : "Raise Dispute"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Resolve Dispute */}
        {connected && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Scale size={14} className="text-emerald-400" /> Resolve Dispute</h3>
            {resolveMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${resolveMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{resolveMsg.text}</div>}
            <div className="space-y-2">
              <input value={resolveId} onChange={e => setResolveId(e.target.value)} placeholder="Dispute ID" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <DarkSelect value={resolveAction} onChange={e => setResolveAction(e.target.value)}
                options={[
                  { value: 'uphold', label: 'Uphold' },
                  { value: 'overturn', label: 'Overturn' },
                  { value: 'escalate_to_dao', label: 'Escalate to DAO' },
                ]}
              />
              <button onClick={async () => {
                if (!resolveId) return;
                setResolveLoading(true); setResolveMsg(null);
                try {
                  const res = await fetch(`${BACKEND_API}/api/disputes/${resolveId}/resolve`, {
                    method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                    body: JSON.stringify({ action: resolveAction }),
                  });
                  if (res.ok) { setResolveMsg({ text: "Dispute resolved!", ok: true }); fetchDisputes(); }
                  else { const err = await res.text(); setResolveMsg({ text: err || "Failed", ok: false }); }
                } catch (e: any) { setResolveMsg({ text: e.message || "Failed", ok: false }); }
                finally { setResolveLoading(false); }
              }} disabled={resolveLoading || !resolveId} className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                {resolveLoading ? "Resolving..." : "Resolve"}
              </button>
            </div>
          </div>
        )}

        {/* Dispute Detail */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Search size={14} className="text-orange-400" /> Dispute Detail</h3>
          <div className="flex gap-2 mb-3">
            <input value={detailId} onChange={e => setDetailId(e.target.value)} placeholder="Dispute ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
            <button onClick={async () => {
              if (!detailId) return;
              setDetailLoading(true);
              try {
                const res = await fetch(`${BACKEND_API}/api/disputes/${detailId}`);
                if (res.ok) setDetailData(await res.json());
              } catch { /* ignore */ }
              setDetailLoading(false);
            }} disabled={detailLoading || !detailId} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold disabled:opacity-50">{detailLoading ? "Loading..." : "Load"}</button>
          </div>
          {detailData && (
            <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
              {Object.entries(detailData).map(([k, v]) => (
                <div key={k} className="flex gap-2 text-[10px]"><span className="text-gray-500 w-28 flex-shrink-0">{k}:</span><span className="text-gray-300 break-all">{typeof v === 'object' ? JSON.stringify(v) : String(v ?? "")}</span></div>
              ))}
            </div>
          )}
        </div>

        {/* Escalate to DAO */}
        {connected && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Upload size={14} className="text-purple-400" /> Escalate to DAO</h3>
            {escalateMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${escalateMsg.ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{escalateMsg.text}</div>}
            <div className="flex gap-2">
              <input value={escalateId} onChange={e => setEscalateId(e.target.value)} placeholder="Dispute ID to escalate" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <button onClick={async () => {
                if (!escalateId) return;
                setEscalateLoading(true); setEscalateMsg(null);
                try {
                  const res = await fetch(`${BACKEND_API}/api/disputes/${escalateId}/escalate-to-dao`, {
                    method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                  });
                  if (res.ok) { setEscalateMsg({ text: "Escalated to DAO!", ok: true }); setEscalateId(""); fetchDisputes(); }
                  else { setEscalateMsg({ text: await res.text() || "Failed", ok: false }); }
                } catch (e: any) { setEscalateMsg({ text: e.message || "Failed", ok: false }); }
                finally { setEscalateLoading(false); }
              }} disabled={escalateLoading || !escalateId} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                {escalateLoading ? "Escalating..." : "Escalate"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : disputes.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
            <Shield className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">No Active Disputes</h3>
            <p className="text-sm text-gray-400 mb-4">No disputes have been raised yet. When validations are challenged, they appear here for community resolution.</p>
            <div className="max-w-md mx-auto bg-white/[0.03] border border-white/10 rounded-lg p-4 text-left">
              <h4 className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1.5"><AlertTriangle size={12} /> How Disputes Work</h4>
              <ol className="text-[11px] text-gray-400 space-y-1.5">
                <li className="flex gap-2"><span className="text-orange-400 font-bold">1.</span> A validator or community member challenges a validation</li>
                <li className="flex gap-2"><span className="text-orange-400 font-bold">2.</span> The dispute is posted with evidence and reasoning</li>
                <li className="flex gap-2"><span className="text-orange-400 font-bold">3.</span> Community votes to uphold or overturn the validation</li>
                <li className="flex gap-2"><span className="text-orange-400 font-bold">4.</span> If unresolved, the dispute escalates to DAO governance</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {disputes.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${d.status === 'open' ? 'bg-orange-500/20 text-orange-400' : d.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>{d.status}</span>
                      <span className="text-[10px] text-gray-500 flex items-center gap-0.5"><Clock size={9} /> {timeAgo(d.created_at)}</span>
                    </div>
                    <h3 className="text-sm font-bold">{d.submission?.title || `Dispute #${d.id.slice(0, 8)}`}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{d.reason}</p>
                  </div>
                </div>
                {d.evidence_urls?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {d.evidence_urls.map((url, j) => (
                      <a key={j} href={url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5">
                        <FileText size={9} /> Evidence {j + 1}
                      </a>
                    ))}
                  </div>
                )}
                {d.status === 'open' && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleVote(d.id, 'uphold')} disabled={voteLoading !== null}
                      className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded text-[11px] font-semibold transition disabled:opacity-50">
                      <ThumbsUp size={10} /> Uphold
                    </button>
                    <button onClick={() => handleVote(d.id, 'overturn')} disabled={voteLoading !== null}
                      className="flex items-center gap-1 px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-[11px] font-semibold transition disabled:opacity-50">
                      <ThumbsDown size={10} /> Overturn
                    </button>
                    <button onClick={() => handleVote(d.id, 'escalate')} disabled={voteLoading !== null}
                      className="flex items-center gap-1 px-2.5 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-[11px] font-semibold transition disabled:opacity-50">
                      <Vote size={10} /> Escalate to DAO
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
