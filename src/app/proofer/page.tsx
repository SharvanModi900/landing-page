"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Hash, Fingerprint, Link2, Users, Award, TrendingUp, FileCheck, Search, XCircle } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface ProoferData {
  id: string;
  user_id: string;
  validator_id?: string;
  level: number;
  total_proofs: number;
  reputation_score: number;
  is_active: boolean;
  last_proof_at?: string;
  registered_at: string;
  display_name?: string;
}

interface ProofData {
  id: string;
  submission_id: string;
  proofer_id: string;
  proofer_name?: string;
  proof_level: number;
  pop_id?: string;
  proof_hash: string;
  proof_data?: Record<string, unknown>;
  signatures?: string;
  consensus_score: number;
  chain_tx_hash?: string;
  status: string;
  created_at: string;
  verified_at?: string;
  challenged_at?: string;
  challenge_reason?: string;
}

interface ProoferStats {
  total_proofs: number;
  active_proofers: number;
  avg_proof_level: number;
  challenged_proofs: number;
  total_pop_ids: number;
}

interface VerifyResult {
  verified: boolean;
  pop_id?: string;
  proof_hash: string;
  recomputed_hash: string;
  hash_matches: boolean;
  proof_level: number;
  consensus_score: number;
  status: string;
  signatures_count: number;
  message: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ProoferPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [activeTab, setActiveTab] = useState<"overview" | "verify" | "stats">("overview");
  const [myProofer, setMyProofer] = useState<ProoferData | null>(null);
  const [stats, setStats] = useState<ProoferStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyMsg, setApplyMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Verify state
  const [verifyPopId, setVerifyPopId] = useState("");
  const [verifySubmissionId, setVerifySubmissionId] = useState("");
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Generate proof state
  const [genSubmissionId, setGenSubmissionId] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [genResult, setGenResult] = useState<Record<string, unknown> | null>(null);
  const [genMsg, setGenMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const fetchMyProofer = useCallback(async () => {
    if (!connected) { setLoading(false); return; }
    try {
      const res = await fetch(`${BACKEND_API}/api/proofers/me`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setMyProofer(data);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_API}/api/proofers/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    Promise.all([fetchMyProofer(), fetchStats()]);
  }, [fetchMyProofer, fetchStats]);

  const handleApply = async () => {
    setApplyLoading(true);
    setApplyMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/proofers/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        setApplyMsg({ text: "Successfully registered as proofer!", ok: true });
        fetchMyProofer();
      } else {
        const err = await res.text();
        setApplyMsg({ text: err || "Failed to apply", ok: false });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed";
      setApplyMsg({ text: msg, ok: false });
    }
    setApplyLoading(false);
  };

  const handleVerifyByPopId = async () => {
    if (!verifyPopId) return;
    setVerifyLoading(true);
    setVerifyResult(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/proofs/verify/${encodeURIComponent(verifyPopId)}`);
      if (res.ok) {
        const data = await res.json();
        setVerifyResult(data);
      } else {
        setVerifyResult({ verified: false, proof_hash: "", recomputed_hash: "", hash_matches: false, proof_level: 0, consensus_score: 0, status: "not_found", signatures_count: 0, message: "No proof found with this PoP-ID" });
      }
    } catch {
      setVerifyResult({ verified: false, proof_hash: "", recomputed_hash: "", hash_matches: false, proof_level: 0, consensus_score: 0, status: "error", signatures_count: 0, message: "Verification failed" });
    }
    setVerifyLoading(false);
  };

  const handleVerifyBySubmission = async () => {
    if (!verifySubmissionId) return;
    setVerifyLoading(true);
    setVerifyResult(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/submissions/${verifySubmissionId}/proof/verify`);
      if (res.ok) {
        const data = await res.json();
        setVerifyResult(data);
      } else {
        setVerifyResult({ verified: false, proof_hash: "", recomputed_hash: "", hash_matches: false, proof_level: 0, consensus_score: 0, status: "not_found", signatures_count: 0, message: "No proof found for this submission" });
      }
    } catch {
      setVerifyResult({ verified: false, proof_hash: "", recomputed_hash: "", hash_matches: false, proof_level: 0, consensus_score: 0, status: "error", signatures_count: 0, message: "Verification failed" });
    }
    setVerifyLoading(false);
  };

  const handleGenerateProof = async () => {
    if (!genSubmissionId) return;
    setGenLoading(true);
    setGenResult(null);
    setGenMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/proofers/generate/${genSubmissionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ proof_data: {} }),
      });
      if (res.ok) {
        const data = await res.json();
        setGenResult(data);
        setGenMsg({ text: "Proof generated successfully!", ok: true });
      } else {
        const err = await res.text();
        setGenMsg({ text: err || "Failed to generate proof", ok: false });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed";
      setGenMsg({ text: msg, ok: false });
    }
    setGenLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-600/20 ring-1 ring-purple-500/30">
              <Fingerprint className="h-4 w-4 text-purple-400" />
            </div>
            <h1 className="text-xl font-bold">Proofer System</h1>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-white/5 p-1 rounded-lg border border-white/10">
          {[
            { key: "overview", label: "Overview", icon: Shield },
            { key: "verify", label: "Verify Proof", icon: Search },
            { key: "stats", label: "Network Stats", icon: TrendingUp },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition ${activeTab === tab.key ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}>
              <tab.icon size={13} /> {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {!connected ? (
              <div className="text-center py-16">
                <Shield className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                <p className="text-sm text-gray-400 mb-4">Connect to access proofer features.</p>
                <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : myProofer ? (
              <>
                {/* My Proofer Status */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Fingerprint size={18} className="text-purple-400" />
                      <span className="text-sm font-bold">My Proofer Status</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${myProofer.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {myProofer.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400 mb-0.5">Level</div>
                      <div className="text-lg font-bold">{myProofer.level}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400 mb-0.5">Total Proofs</div>
                      <div className="text-lg font-bold">{myProofer.total_proofs}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400 mb-0.5">Reputation</div>
                      <div className="text-lg font-bold">{myProofer.reputation_score}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <div className="text-[10px] text-gray-400 mb-0.5">Registered</div>
                      <div className="text-sm font-bold">{timeAgo(myProofer.registered_at)}</div>
                    </div>
                  </div>
                  {myProofer.last_proof_at && (
                    <div className="mt-2 text-[10px] text-gray-400">Last proof: {timeAgo(myProofer.last_proof_at)}</div>
                  )}
                </motion.div>

                {/* Generate Proof */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5"><FileCheck size={14} className="text-purple-400" /> Generate Proof</h3>
                  <p className="text-xs text-gray-400 mb-3">Generate cryptographic proof for a validated submission (requires consensus &gt;= 75%)</p>
                  <div className="flex gap-2">
                    <input value={genSubmissionId} onChange={e => setGenSubmissionId(e.target.value)}
                      placeholder="Submission ID (UUID)" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    <button onClick={handleGenerateProof} disabled={genLoading || !genSubmissionId}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                      {genLoading ? "Generating..." : "Generate"}
                    </button>
                  </div>
                  {genMsg && (
                    <div className={`mt-2 p-2 rounded-lg text-xs font-semibold ${genMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {genMsg.text}
                    </div>
                  )}
                  {genResult && (
                    <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 space-y-1.5">
                      <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1"><CheckCircle size={12} /> Proof Generated</div>
                      <div className="text-[10px] text-gray-400">PoP-ID: <span className="text-white font-mono">{String(genResult.pop_id || "")}</span></div>
                      <div className="text-[10px] text-gray-400">Proof Level: <span className="text-white">{String(genResult.proof_level || "")}</span></div>
                      <div className="text-[10px] text-gray-400">Consensus: <span className="text-white">{String(genResult.consensus_score || "")}%</span></div>
                      <div className="text-[10px] text-gray-400">Hash: <span className="text-white font-mono truncate">{String(genResult.proof_hash || "")}</span></div>
                    </div>
                  )}
                </motion.div>
              </>
            ) : (
              <>
                {/* Apply to become proofer */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <Fingerprint className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold mb-1">Become a Proofer</h3>
                  <p className="text-sm text-gray-400 mb-4">Generate cryptographic proofs for validated submissions. Requires active validator status with reputation &gt;= 80.</p>
                  <button onClick={handleApply} disabled={applyLoading}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-sm font-semibold disabled:opacity-50">
                    {applyLoading ? "Applying..." : "Apply Now"}
                  </button>
                  {applyMsg && (
                    <div className={`mt-3 p-2 rounded-lg text-xs font-semibold ${applyMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {applyMsg.text}
                    </div>
                  )}
                </motion.div>

                {/* Requirements */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5"><AlertTriangle size={14} className="text-yellow-400" /> Requirements</h3>
                  <ul className="text-xs text-gray-400 space-y-1.5">
                    <li className="flex items-start gap-2"><span className="text-purple-400">•</span> Must be an active validator</li>
                    <li className="flex items-start gap-2"><span className="text-purple-400">•</span> Reputation score &gt;= 80</li>
                    <li className="flex items-start gap-2"><span className="text-purple-400">•</span> Generate proofs for submissions with consensus &gt;= 75%</li>
                    <li className="flex items-start gap-2"><span className="text-purple-400">•</span> Earn 15 Satmudra + 3 R-Score per proof generated</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        )}

        {/* VERIFY TAB */}
        {activeTab === "verify" && (
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Search size={14} className="text-purple-400" /> Verify Proof</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-gray-400 mb-1 block">By PoP-ID</label>
                  <div className="flex gap-2">
                    <input value={verifyPopId} onChange={e => setVerifyPopId(e.target.value)}
                      placeholder="pop://..." className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    <button onClick={handleVerifyByPopId} disabled={verifyLoading || !verifyPopId}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                      Verify
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <label className="text-[10px] text-gray-400 mb-1 block">By Submission ID</label>
                  <div className="flex gap-2">
                    <input value={verifySubmissionId} onChange={e => setVerifySubmissionId(e.target.value)}
                      placeholder="Submission UUID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    <button onClick={handleVerifyBySubmission} disabled={verifyLoading || !verifySubmissionId}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                      Verify
                    </button>
                  </div>
                </div>
              </div>

              {verifyLoading && (
                <div className="flex items-center justify-center py-4">
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {verifyResult && !verifyLoading && (
                <div className={`mt-4 rounded-lg p-3 border ${verifyResult.verified ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                  <div className={`flex items-center gap-1.5 text-sm font-semibold mb-2 ${verifyResult.verified ? "text-emerald-400" : "text-red-400"}`}>
                    {verifyResult.verified ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {verifyResult.verified ? "Proof Verified" : "Verification Failed"}
                  </div>
                  <div className="text-xs text-gray-400 mb-2">{verifyResult.message}</div>
                  <div className="space-y-1 text-[10px]">
                    {verifyResult.pop_id && <div>PoP-ID: <span className="text-white font-mono">{verifyResult.pop_id}</span></div>}
                    <div>Proof Hash: <span className="text-white font-mono truncate">{verifyResult.proof_hash}</span></div>
                    <div>Recomputed: <span className="text-white font-mono truncate">{verifyResult.recomputed_hash}</span></div>
                    <div className="flex gap-3">
                      <span>Level: <span className="text-white">{verifyResult.proof_level}</span></span>
                      <span>Consensus: <span className="text-white">{verifyResult.consensus_score}%</span></span>
                      <span>Sigs: <span className="text-white">{verifyResult.signatures_count}</span></span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><Hash size={12} className="text-purple-400" /><span className="text-[10px] text-gray-400">Total Proofs</span></div>
                <div className="text-lg font-bold">{stats?.total_proofs || 0}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><Users size={12} className="text-blue-400" /><span className="text-[10px] text-gray-400">Active Proofers</span></div>
                <div className="text-lg font-bold">{stats?.active_proofers || 0}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><Award size={12} className="text-yellow-400" /><span className="text-[10px] text-gray-400">Avg Level</span></div>
                <div className="text-lg font-bold">{stats?.avg_proof_level.toFixed(1) || "0.0"}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><AlertTriangle size={12} className="text-orange-400" /><span className="text-[10px] text-gray-400">Challenged</span></div>
                <div className="text-lg font-bold">{stats?.challenged_proofs || 0}</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1"><Link2 size={12} className="text-emerald-400" /><span className="text-[10px] text-gray-400">PoP-IDs</span></div>
                <div className="text-lg font-bold">{stats?.total_pop_ids || 0}</div>
              </div>
            </motion.div>

            {/* How it works */}
            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5"><Fingerprint size={14} className="text-purple-400" /> How Proofs Work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-400">
                <div className="flex gap-2"><span className="text-purple-400 font-bold text-sm">1.</span> When a submission reaches 75% consensus, a proofer can generate a cryptographic proof</div>
                <div className="flex gap-2"><span className="text-purple-400 font-bold text-sm">2.</span> The proof includes a unique PoP-ID (Proof-of-Problem-ID), hash, and validator signatures</div>
                <div className="flex gap-2"><span className="text-purple-400 font-bold text-sm">3.</span> Proofs are anchored to the PoPP chain and can be verified by anyone</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
