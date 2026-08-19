"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Webhook, Plus, Trash2, Zap, Shield, Search, Edit, FlaskConical } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface WebhookItem {
  id: string;
  url: string;
  event_type?: string;
  events?: string[];
  active?: boolean;
  secret?: string;
  created_at: string;
}

export default function WebhooksPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [hooks, setHooks] = useState<WebhookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [newEvents, setNewEvents] = useState("");
  const [newSecret, setNewSecret] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createMsg, setCreateMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [testMsg, setTestMsg] = useState<{ id: string; text: string; ok: boolean } | null>(null);
  // Webhook detail
  const [detailId, setDetailId] = useState("");
  const [detailData, setDetailData] = useState<any>(null);
  // Update webhook
  const [updId, setUpdId] = useState("");
  const [updUrl, setUpdUrl] = useState("");
  const [updEvents, setUpdEvents] = useState("");
  const [updActive, setUpdActive] = useState(true);
  const [updLoading, setUpdLoading] = useState(false);
  const [updMsg, setUpdMsg] = useState<{ text: string; ok: boolean } | null>(null);
  // Generic test
  const [genericTestUrl, setGenericTestUrl] = useState("");
  const [genericTestPayload, setGenericTestPayload] = useState("");
  const [genericTestLoading, setGenericTestLoading] = useState(false);
  const [genericTestMsg, setGenericTestMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const fetchHooks = useCallback(async () => {
    if (!connected) { setLoading(false); return; }
    try {
      const res = await fetch(`${BACKEND_API}/api/webhooks`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setHooks(Array.isArray(data) ? data : data.webhooks || []);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [connected, getAuthHeaders]);

  useEffect(() => { fetchHooks(); }, [fetchHooks]);

  const handleCreate = async () => {
    if (!newUrl) return;
    setCreateLoading(true); setCreateMsg(null);
    try {
      const body: any = { url: newUrl };
      if (newEvents) body.events = newEvents.split(",").map(e => e.trim());
      if (newSecret) body.secret = newSecret;
      const res = await fetch(`${BACKEND_API}/api/webhooks`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setCreateMsg({ text: "Webhook created!", ok: true });
        setNewUrl(""); setNewEvents(""); setNewSecret("");
        fetchHooks();
      } else {
        const err = await res.text();
        setCreateMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: any) { setCreateMsg({ text: e.message || "Failed", ok: false }); }
    finally { setCreateLoading(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_API}/api/webhooks/${id}`, { method: "DELETE", headers: { ...getAuthHeaders() } });
      if (res.ok) fetchHooks();
    } catch { /* ignore */ }
  };

  const handleTest = async (id: string) => {
    setTestMsg({ id, text: "Testing...", ok: true });
    try {
      const res = await fetch(`${BACKEND_API}/api/webhooks/${id}/test`, {
        method: "POST", headers: { ...getAuthHeaders() },
      });
      if (res.ok) setTestMsg({ id, text: "Test sent!", ok: true });
      else setTestMsg({ id, text: "Test failed", ok: false });
    } catch { setTestMsg({ id, text: "Test failed", ok: false }); }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-600/20 ring-1 ring-teal-500/30">
            <Webhook className="h-4 w-4 text-teal-400" />
          </div>
          <h1 className="text-xl font-bold">Webhooks</h1>
        </motion.div>

        {!connected ? (
          <div className="text-center py-16">
            <Shield className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
            <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg text-sm font-semibold">Connect Wallet</button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {createMsg && <div className={`p-2 rounded-lg text-xs font-semibold ${createMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{createMsg.text}</div>}

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Plus size={14} className="text-teal-400" /> Create Webhook</h3>
              <div className="space-y-2">
                <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://your-server.com/webhook" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={newEvents} onChange={e => setNewEvents(e.target.value)} placeholder="Events (comma-separated, e.g. submission.created,validation.completed)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={newSecret} onChange={e => setNewSecret(e.target.value)} placeholder="Secret (optional)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={handleCreate} disabled={createLoading || !newUrl} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg text-xs font-semibold disabled:opacity-50">{createLoading ? "Creating..." : "Create Webhook"}</button>
              </div>
            </motion.div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3">Active Webhooks</h3>
              {hooks.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-6">No webhooks configured</p>
              ) : (
                <div className="space-y-2">
                  {hooks.map(h => (
                    <div key={h.id} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-3">
                      <Webhook size={14} className="text-teal-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold truncate">{h.url}</div>
                        <div className="text-[10px] text-gray-500">
                          {h.events ? h.events.join(", ") : h.event_type || "all events"}
                          {h.active === false && <span className="ml-2 text-red-400">(inactive)</span>}
                        </div>
                        <div className="text-[10px] text-gray-500">Created {new Date(h.created_at).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleTest(h.id)} className="px-2 py-1 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg text-[10px] text-teal-400 font-semibold transition flex items-center gap-1">
                          <Zap size={10} /> Test
                        </button>
                        <button onClick={() => handleDelete(h.id)} className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-[10px] text-red-400 font-semibold transition">
                          <Trash2 size={10} />
                        </button>
                      </div>
                      {testMsg && testMsg.id === h.id && (
                        <span className={`text-[10px] ${testMsg.ok ? "text-emerald-400" : "text-red-400"}`}>{testMsg.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Webhook Detail */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Search size={14} className="text-teal-400" /> Webhook Detail</h3>
              <div className="flex gap-2 mb-3">
                <input value={detailId} onChange={e => setDetailId(e.target.value)} placeholder="Webhook ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={async () => {
                  if (!detailId) return;
                  try { const res = await fetch(`${BACKEND_API}/api/webhooks/${detailId}`, { headers: getAuthHeaders() }); if (res.ok) setDetailData(await res.json()); }
                  catch { /* ignore */ }
                }} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg text-xs font-semibold">Load</button>
              </div>
              {detailData && (
                <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
                  {Object.entries(detailData).map(([k, v]) => (
                    <div key={k} className="flex gap-2 text-[10px]"><span className="text-gray-500 w-20 flex-shrink-0">{k}:</span><span className="text-gray-300 break-all">{typeof v === 'object' ? JSON.stringify(v) : String(v ?? "")}</span></div>
                  ))}
                </div>
              )}
            </div>

            {/* Update Webhook */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Edit size={14} className="text-teal-400" /> Update Webhook</h3>
              {updMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${updMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{updMsg.text}</div>}
              <div className="space-y-2">
                <input value={updId} onChange={e => setUpdId(e.target.value)} placeholder="Webhook ID" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={updUrl} onChange={e => setUpdUrl(e.target.value)} placeholder="New URL (optional)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={updEvents} onChange={e => setUpdEvents(e.target.value)} placeholder="New events (comma-separated, optional)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <label className="flex items-center gap-2 text-xs text-gray-400">
                  <input type="checkbox" checked={updActive} onChange={e => setUpdActive(e.target.checked)} className="rounded" /> Active
                </label>
                <button onClick={async () => {
                  if (!updId) return;
                  setUpdLoading(true); setUpdMsg(null);
                  try {
                    const body: any = { active: updActive };
                    if (updUrl) body.url = updUrl;
                    if (updEvents) body.events = updEvents.split(",").map(e => e.trim());
                    const res = await fetch(`${BACKEND_API}/api/webhooks/${updId}`, { method: "PUT", headers: { "Content-Type": "application/json", ...getAuthHeaders() }, body: JSON.stringify(body) });
                    if (res.ok) { setUpdMsg({ text: "Webhook updated!", ok: true }); fetchHooks(); }
                    else { setUpdMsg({ text: await res.text() || "Failed", ok: false }); }
                  } catch (e: any) { setUpdMsg({ text: e.message || "Failed", ok: false }); }
                  finally { setUpdLoading(false); }
                }} disabled={updLoading || !updId} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg text-xs font-semibold disabled:opacity-50">{updLoading ? "Updating..." : "Update Webhook"}</button>
              </div>
            </div>

            {/* Generic Test */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><FlaskConical size={14} className="text-teal-400" /> Generic Webhook Test</h3>
              {genericTestMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${genericTestMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{genericTestMsg.text}</div>}
              <div className="space-y-2">
                <input value={genericTestUrl} onChange={e => setGenericTestUrl(e.target.value)} placeholder="Target URL to test" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <textarea value={genericTestPayload} onChange={e => setGenericTestPayload(e.target.value)} placeholder='Payload (JSON, optional)' rows={2} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={async () => {
                  if (!genericTestUrl) return;
                  setGenericTestLoading(true); setGenericTestMsg(null);
                  try {
                    const body: any = { url: genericTestUrl };
                    if (genericTestPayload) { try { body.payload = JSON.parse(genericTestPayload); } catch { body.payload = genericTestPayload; } }
                    const res = await fetch(`${BACKEND_API}/api/webhooks/test`, { method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() }, body: JSON.stringify(body) });
                    if (res.ok) setGenericTestMsg({ text: "Test sent!", ok: true });
                    else setGenericTestMsg({ text: await res.text() || "Failed", ok: false });
                  } catch (e: any) { setGenericTestMsg({ text: e.message || "Failed", ok: false }); }
                  finally { setGenericTestLoading(false); }
                }} disabled={genericTestLoading || !genericTestUrl} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg text-xs font-semibold disabled:opacity-50">{genericTestLoading ? "Testing..." : "Send Test"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
