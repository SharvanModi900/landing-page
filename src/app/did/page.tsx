"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Fingerprint, Key, Building2, BadgeCheck, Hash, FileCheck, Eye } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";
import DarkSelect from "@/components/DarkSelect";

const BACKEND_API = "https://popp.thharko.com";

interface DIDData {
  did: string;
  did_document_hash: string;
}

interface VerificationLevel {
  has_did: boolean;
  did?: string;
  verification_level: string;
}

export default function DIDPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [activeTab, setActiveTab] = useState<"overview" | "register" | "verify" | "institutional">("overview");
  const [myDID, setMyDID] = useState<DIDData | null>(null);
  const [verLevel, setVerLevel] = useState<VerificationLevel | null>(null);
  const [loading, setLoading] = useState(true);

  // Register state
  const [registerDID, setRegisterDID] = useState("");
  const [registerDoc, setRegisterDoc] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMsg, setRegisterMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [registerResult, setRegisterResult] = useState<DIDData | null>(null);

  // Verify state
  const [verifyDID, setVerifyDID] = useState("");
  const [verifyDoc, setVerifyDoc] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ valid: boolean; did: string; message: string } | null>(null);

  // Institutional verify state
  const [instName, setInstName] = useState("");
  const [instCredId, setInstCredId] = useState("");
  const [instCredType, setInstCredType] = useState("government_id");
  const [instCredData, setInstCredData] = useState("");
  const [instLoading, setInstLoading] = useState(false);
  const [instMsg, setInstMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [instResult, setInstResult] = useState<Record<string, unknown> | null>(null);

  // Auto-generate state
  const [autoGenLoading, setAutoGenLoading] = useState(false);
  const [autoGenMsg, setAutoGenMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [autoGenResult, setAutoGenResult] = useState<{ did: string; did_document: Record<string, unknown>; did_document_hash: string } | null>(null);

  const fetchMyDID = useCallback(async () => {
    if (!connected) { setLoading(false); return; }
    try {
      const [didRes, levelRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/did/my`, { headers: getAuthHeaders() }),
        fetch(`${BACKEND_API}/api/did/verification-level`, { headers: getAuthHeaders() }),
      ]);
      if (didRes.status === "fulfilled" && didRes.value.ok) {
        const data = await didRes.value.json();
        setMyDID(data);
      }
      if (levelRes.status === "fulfilled" && levelRes.value.ok) {
        const data = await levelRes.value.json();
        setVerLevel(data);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchMyDID(); }, [fetchMyDID]);

  const handleAutoGenerate = async () => {
    setAutoGenLoading(true);
    setAutoGenMsg(null);
    setAutoGenResult(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/did/auto-generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      if (res.ok) {
        const data = await res.json();
        setAutoGenResult(data);
        setAutoGenMsg({ text: "DID auto-generated successfully!", ok: true });
        fetchMyDID();
      } else {
        const err = await res.text();
        setAutoGenMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed";
      setAutoGenMsg({ text: msg, ok: false });
    }
    setAutoGenLoading(false);
  };

  const handleRegister = async () => {
    if (!registerDID || !registerDoc) return;
    setRegisterLoading(true);
    setRegisterMsg(null);
    try {
      let doc;
      try { doc = JSON.parse(registerDoc); } catch { setRegisterMsg({ text: "Invalid JSON in DID document", ok: false }); setRegisterLoading(false); return; }
      const res = await fetch(`${BACKEND_API}/api/did/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ did: registerDID, did_document: doc }),
      });
      if (res.ok) {
        const data = await res.json();
        setRegisterResult(data);
        setRegisterMsg({ text: "DID registered successfully!", ok: true });
        fetchMyDID();
      } else {
        const err = await res.text();
        setRegisterMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed";
      setRegisterMsg({ text: msg, ok: false });
    }
    setRegisterLoading(false);
  };

  const handleVerify = async () => {
    if (!verifyDID || !verifyDoc) return;
    setVerifyLoading(true);
    setVerifyResult(null);
    try {
      let doc;
      try { doc = JSON.parse(verifyDoc); } catch { setVerifyResult({ valid: false, did: verifyDID, message: "Invalid JSON in DID document" }); setVerifyLoading(false); return; }
      const res = await fetch(`${BACKEND_API}/api/did/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ did: verifyDID, did_document: doc }),
      });
      if (res.ok) {
        const data = await res.json();
        setVerifyResult(data);
      } else {
        const err = await res.text();
        setVerifyResult({ valid: false, did: verifyDID, message: err || "Verification failed" });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed";
      setVerifyResult({ valid: false, did: verifyDID, message: msg });
    }
    setVerifyLoading(false);
  };

  const handleInstitutionalVerify = async () => {
    if (!instName || !instCredId || !instCredData) return;
    setInstLoading(true);
    setInstMsg(null);
    try {
      let credData;
      try { credData = JSON.parse(instCredData); } catch { setInstMsg({ text: "Invalid JSON in credential data", ok: false }); setInstLoading(false); return; }
      const res = await fetch(`${BACKEND_API}/api/did/institutional-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ institution_name: instName, credential_id: instCredId, credential_type: instCredType, credential_data: credData }),
      });
      if (res.ok) {
        const data = await res.json();
        setInstResult(data);
        setInstMsg({ text: data.status === "verified" ? "Institutional verification approved!" : "Credential submitted for review", ok: true });
      } else {
        const err = await res.text();
        setInstMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed";
      setInstMsg({ text: msg, ok: false });
    }
    setInstLoading(false);
  };

  const LEVEL_COLORS: Record<string, string> = {
    basic: "text-gray-400 bg-gray-500/20",
    did_registered: "text-blue-400 bg-blue-500/20",
    institutional: "text-purple-400 bg-purple-500/20",
    professional: "text-emerald-400 bg-emerald-500/20",
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
              <Key className="h-4 w-4 text-cyan-400" />
            </div>
            <h1 className="text-xl font-bold">Decentralized Identity</h1>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-white/5 p-1 rounded-lg border border-white/10 overflow-x-auto">
          {[
            { key: "overview", label: "Overview", icon: Shield },
            { key: "register", label: "Register", icon: Fingerprint },
            { key: "verify", label: "Verify", icon: Eye },
            { key: "institutional", label: "Institutional", icon: Building2 },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition whitespace-nowrap ${activeTab === tab.key ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}>
              <tab.icon size={13} /> {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {!connected ? (
              <div className="text-center py-16">
                <Key className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                <p className="text-sm text-gray-400 mb-4">Connect to manage your decentralized identity.</p>
                <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Verification Level */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={18} className="text-cyan-400" />
                      <span className="text-sm font-bold">Identity Status</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${LEVEL_COLORS[verLevel?.verification_level || "basic"] || LEVEL_COLORS.basic}`}>
                      {verLevel?.verification_level || "basic"}
                    </span>
                  </div>

                  {myDID ? (
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-[10px] text-gray-400 mb-0.5">Your DID</div>
                        <div className="text-sm font-mono text-cyan-400 break-all">{myDID.did}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-[10px] text-gray-400 mb-0.5">Document Hash</div>
                        <div className="text-xs font-mono text-gray-300 break-all">{myDID.did_document_hash}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-400 mb-3">No DID registered yet</p>
                      <button onClick={handleAutoGenerate} disabled={autoGenLoading}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold disabled:opacity-50">
                        {autoGenLoading ? "Generating..." : "Auto-Generate DID"}
                      </button>
                      {autoGenMsg && (
                        <div className={`mt-2 p-2 rounded-lg text-xs font-semibold ${autoGenMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                          {autoGenMsg.text}
                        </div>
                      )}
                      {autoGenResult && (
                        <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-left">
                          <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1"><CheckCircle size={12} /> DID Generated</div>
                          <div className="text-[10px] text-gray-400">DID: <span className="text-cyan-400 font-mono">{autoGenResult.did}</span></div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* Verification Levels Explainer */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5"><Shield size={14} className="text-cyan-400" /> Verification Levels</h3>
                  <div className="space-y-2">
                    {[
                      { level: "basic", desc: "Wallet connected, no DID registered", icon: Shield },
                      { level: "did_registered", desc: "DID registered with document hash", icon: Fingerprint },
                      { level: "institutional", desc: "Institutional credentials verified", icon: Building2 },
                    ].map(l => (
                      <div key={l.level} className="flex items-center gap-2 text-xs">
                        <l.icon size={12} className="text-gray-400" />
                        <span className={`px-1.5 py-0.5 rounded font-semibold ${LEVEL_COLORS[l.level]}`}>{l.level}</span>
                        <span className="text-gray-400">{l.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* REGISTER TAB */}
        {activeTab === "register" && (
          <div className="space-y-4">
            {!connected ? (
              <div className="text-center py-16">
                <Key className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Fingerprint size={14} className="text-cyan-400" /> Register DID</h3>
                <p className="text-xs text-gray-400 mb-3">Register your own DID with a custom document, or use auto-generate for a quick setup.</p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">DID Identifier</label>
                    <input value={registerDID} onChange={e => setRegisterDID(e.target.value)}
                      placeholder="did:popp:example123" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">DID Document (JSON)</label>
                    <textarea value={registerDoc} onChange={e => setRegisterDoc(e.target.value)}
                      placeholder='{"@context":"https://www.w3.org/ns/did/v1","id":"did:popp:example123",...}'
                      rows={4} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500 font-mono" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleRegister} disabled={registerLoading || !registerDID || !registerDoc}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                      {registerLoading ? "Registering..." : "Register DID"}
                    </button>
                    <button onClick={handleAutoGenerate} disabled={autoGenLoading}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 disabled:opacity-50">
                      {autoGenLoading ? "Generating..." : "Or Auto-Generate"}
                    </button>
                  </div>
                </div>

                {registerMsg && (
                  <div className={`mt-3 p-2 rounded-lg text-xs font-semibold ${registerMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {registerMsg.text}
                  </div>
                )}
                {registerResult && (
                  <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1"><CheckCircle size={12} /> Registered</div>
                    <div className="text-[10px] text-gray-400">DID: <span className="text-cyan-400 font-mono">{registerResult.did}</span></div>
                    <div className="text-[10px] text-gray-400">Hash: <span className="text-white font-mono break-all">{registerResult.did_document_hash}</span></div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* VERIFY TAB */}
        {activeTab === "verify" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Eye size={14} className="text-cyan-400" /> Verify DID</h3>
            <p className="text-xs text-gray-400 mb-3">Verify a DID against its stored document hash. No authentication required.</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-400 mb-1 block">DID Identifier</label>
                <input value={verifyDID} onChange={e => setVerifyDID(e.target.value)}
                  placeholder="did:popp:..." className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 mb-1 block">DID Document (JSON)</label>
                <textarea value={verifyDoc} onChange={e => setVerifyDoc(e.target.value)}
                  placeholder='{"@context":"https://www.w3.org/ns/did/v1",...}'
                  rows={4} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500 font-mono" />
              </div>
              <button onClick={handleVerify} disabled={verifyLoading || !verifyDID || !verifyDoc}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                {verifyLoading ? "Verifying..." : "Verify DID"}
              </button>
            </div>

            {verifyResult && (
              <div className={`mt-4 rounded-lg p-3 border ${verifyResult.valid ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"}`}>
                <div className={`flex items-center gap-1.5 text-sm font-semibold mb-1 ${verifyResult.valid ? "text-emerald-400" : "text-red-400"}`}>
                  {verifyResult.valid ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                  {verifyResult.valid ? "DID Verified" : "Verification Failed"}
                </div>
                <div className="text-xs text-gray-400">{verifyResult.message}</div>
              </div>
            )}
          </motion.div>
        )}

        {/* INSTITUTIONAL TAB */}
        {activeTab === "institutional" && (
          <div className="space-y-4">
            {!connected ? (
              <div className="text-center py-16">
                <Building2 className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
                <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Building2 size={14} className="text-cyan-400" /> Institutional Verification</h3>
                <p className="text-xs text-gray-400 mb-3">Submit institutional credentials to upgrade your verification level.</p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Institution Name</label>
                    <input value={instName} onChange={e => setInstName(e.target.value)}
                      placeholder="e.g. National University" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Credential ID</label>
                    <input value={instCredId} onChange={e => setInstCredId(e.target.value)}
                      placeholder="e.g. GOV-2025-001234" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Credential Type</label>
                    <DarkSelect value={instCredType} onChange={e => setInstCredType(e.target.value)}
                      options={[
                        { value: 'government_id', label: 'Government ID' },
                        { value: 'institutional_badge', label: 'Institutional Badge' },
                        { value: 'professional_license', label: 'Professional License' },
                      ]}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Credential Data (JSON)</label>
                    <textarea value={instCredData} onChange={e => setInstCredData(e.target.value)}
                      placeholder='{"name":"John Doe","issued":"2025-01-01",...}'
                      rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500 font-mono" />
                  </div>
                  <button onClick={handleInstitutionalVerify} disabled={instLoading || !instName || !instCredId || !instCredData}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">
                    {instLoading ? "Submitting..." : "Submit for Verification"}
                  </button>
                </div>

                {instMsg && (
                  <div className={`mt-3 p-2 rounded-lg text-xs font-semibold ${instMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {instMsg.text}
                  </div>
                )}
                {instResult && (
                  <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1"><CheckCircle size={12} /> {String(instResult.status) === "verified" ? "Verified" : "Submitted"}</div>
                    {instResult.verification_level != null && (
                      <div className="text-[10px] text-gray-400">Level: <span className="text-purple-400 font-semibold">{String(instResult.verification_level)}</span></div>
                    )}
                    {instResult.institution != null && (
                      <div className="text-[10px] text-gray-400">Institution: <span className="text-white">{String(instResult.institution)}</span></div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
