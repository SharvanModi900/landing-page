"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Key, Plus, XCircle, Copy, Check, Shield } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface ApiKey {
  id: string;
  name?: string;
  key?: string;
  key_prefix?: string;
  created_at: string;
  revoked_at?: string;
  last_used_at?: string;
}

export default function ApiKeysPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createMsg, setCreateMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [newKeyValue, setNewKeyValue] = useState("");
  const [copied, setCopied] = useState("");

  const fetchKeys = useCallback(async () => {
    if (!connected) { setLoading(false); return; }
    try {
      const res = await fetch(`${BACKEND_API}/api/api-keys`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setKeys(Array.isArray(data) ? data : data.api_keys || []);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchKeys(); }, [fetchKeys]);

  const handleCreate = async () => {
    setCreateLoading(true); setCreateMsg(null);
    try {
      const res = await fetch(`${BACKEND_API}/api/api-keys`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ name: newName || "My API Key" }),
      });
      if (res.ok) {
        const data = await res.json();
        setNewKeyValue(data.key || data.api_key || "");
        setCreateMsg({ text: "API key created! Copy it now — it won't be shown again.", ok: true });
        setNewName("");
        fetchKeys();
      } else {
        const err = await res.text();
        setCreateMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: any) { setCreateMsg({ text: e.message || "Failed", ok: false }); }
    finally { setCreateLoading(false); }
  };

  const handleRevoke = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_API}/api/api-keys/${id}/revoke`, {
        method: "POST", headers: { ...getAuthHeaders() },
      });
      if (res.ok) fetchKeys();
    } catch { /* ignore */ }
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/20 ring-1 ring-amber-500/30">
            <Key className="h-4 w-4 text-amber-400" />
          </div>
          <h1 className="text-xl font-bold">API Keys</h1>
        </motion.div>

        {!connected ? (
          <div className="text-center py-16">
            <Shield className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
            <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {createMsg && <div className={`p-2 rounded-lg text-xs font-semibold ${createMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{createMsg.text}</div>}
            {newKeyValue && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <div className="text-[10px] text-emerald-400 font-semibold mb-1">Your New API Key</div>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-white break-all flex-1">{newKeyValue}</code>
                  <button onClick={() => copyKey(newKeyValue)} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition">
                    {copied === newKeyValue ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-gray-400" />}
                  </button>
                </div>
              </div>
            )}

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Plus size={14} className="text-amber-400" /> Create New Key</h3>
              <div className="flex gap-2">
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Key name (optional)" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={handleCreate} disabled={createLoading} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-xs font-semibold disabled:opacity-50">{createLoading ? "Creating..." : "Create"}</button>
              </div>
            </motion.div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3">Your API Keys</h3>
              {keys.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-6">No API keys yet</p>
              ) : (
                <div className="space-y-2">
                  {keys.map(k => (
                    <div key={k.id} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-3">
                      <Key size={14} className="text-amber-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold">{k.name || "Unnamed"}</div>
                        <div className="text-[10px] text-gray-500 font-mono">{k.key_prefix ? `${k.key_prefix}...` : k.key ? `${k.key.slice(0, 12)}...` : ""}</div>
                        <div className="text-[10px] text-gray-500">Created {new Date(k.created_at).toLocaleDateString()}</div>
                      </div>
                      {k.revoked_at ? (
                        <span className="px-2 py-0.5 text-[10px] bg-red-500/20 text-red-400 rounded-full">Revoked</span>
                      ) : (
                        <button onClick={() => handleRevoke(k.id)} className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-[10px] text-red-400 font-semibold transition">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
