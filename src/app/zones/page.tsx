"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Plus, Trash2, Shield, Search, Edit, List } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface Zone {
  id: string;
  name: string;
  zone_type?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  created_at: string;
}

export default function ZonesPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"list" | "create" | "nearest" | "detail" | "update" | "tickets">("list");
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [newLat, setNewLat] = useState("");
  const [newLng, setNewLng] = useState("");
  const [newRadius, setNewRadius] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createMsg, setCreateMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [nearLat, setNearLat] = useState("");
  const [nearLng, setNearLng] = useState("");
  const [nearRadius, setNearRadius] = useState("");
  const [nearResults, setNearResults] = useState<any[]>([]);
  const [nearLoading, setNearLoading] = useState(false);
  // Zone detail
  const [zoneDetailId, setZoneDetailId] = useState("");
  const [zoneDetail, setZoneDetail] = useState<any>(null);
  // Update zone
  const [updZoneId, setUpdZoneId] = useState("");
  const [updName, setUpdName] = useState("");
  const [updType, setUpdType] = useState("");
  const [updLat, setUpdLat] = useState("");
  const [updLng, setUpdLng] = useState("");
  const [updRadius, setUpdRadius] = useState("");
  const [updLoading, setUpdLoading] = useState(false);
  const [updMsg, setUpdMsg] = useState<{ text: string; ok: boolean } | null>(null);
  // Zone tickets
  const [ticketsZoneId, setTicketsZoneId] = useState("");
  const [tickets, setTickets] = useState<any[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);

  const fetchZones = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_API}/api/zones`);
      if (res.ok) {
        const data = await res.json();
        setZones(Array.isArray(data) ? data : data.zones || []);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchZones(); }, [fetchZones]);

  const handleCreate = async () => {
    if (!newName || !newLat || !newLng) return;
    setCreateLoading(true); setCreateMsg(null);
    try {
      const body: any = { name: newName, latitude: parseFloat(newLat), longitude: parseFloat(newLng) };
      if (newType) body.zone_type = newType;
      if (newRadius) body.radius = parseFloat(newRadius);
      const res = await fetch(`${BACKEND_API}/api/zones`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setCreateMsg({ text: "Zone created!", ok: true });
        setNewName(""); setNewType(""); setNewLat(""); setNewLng(""); setNewRadius("");
        fetchZones();
      } else {
        const err = await res.text();
        setCreateMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: any) { setCreateMsg({ text: e.message || "Failed", ok: false }); }
    finally { setCreateLoading(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_API}/api/zones/${id}`, { method: "DELETE", headers: { ...getAuthHeaders() } });
      if (res.ok) fetchZones();
    } catch { /* ignore */ }
  };

  const handleNearest = async () => {
    if (!nearLat || !nearLng) return;
    setNearLoading(true);
    try {
      const params = new URLSearchParams();
      if (nearRadius) params.set("radius", nearRadius);
      const res = await fetch(`${BACKEND_API}/api/zones/nearest/${nearLat}/${nearLng}${nearRadius ? `?radius=${nearRadius}` : ""}`);
      if (res.ok) {
        const data = await res.json();
        setNearResults(Array.isArray(data) ? data : data.zones || []);
      }
    } catch { /* ignore */ }
    setNearLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 ring-1 ring-green-500/30">
            <MapPin className="h-4 w-4 text-green-400" />
          </div>
          <h1 className="text-xl font-bold">Zones</h1>
        </motion.div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(["list", "create", "nearest", "detail", "update", "tickets"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${activeTab === tab ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "list" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">All Zones</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8"><div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
            ) : zones.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-6">No zones found</p>
            ) : (
              <div className="space-y-2">
                {zones.map(z => (
                  <div key={z.id} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-3">
                    <MapPin size={14} className="text-green-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold">{z.name}</div>
                      <div className="text-[10px] text-gray-500">
                        {z.zone_type && <span className="capitalize mr-2">{z.zone_type}</span>}
                        {z.latitude != null && z.longitude != null && `(${Number(z.latitude).toFixed(4)}, ${Number(z.longitude).toFixed(4)})`}
                        {z.radius != null && ` — ${z.radius}m radius`}
                      </div>
                    </div>
                    {connected && (
                      <button onClick={() => handleDelete(z.id)} className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-[10px] text-red-400 font-semibold transition">
                        <Trash2 size={10} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "create" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Plus size={14} className="text-green-400" /> Create Zone</h3>
            {createMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${createMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{createMsg.text}</div>}
            {!connected ? (
              <p className="text-xs text-gray-400 text-center py-4">Connect wallet to create zones</p>
            ) : (
              <div className="space-y-2">
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Zone name" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={newType} onChange={e => setNewType(e.target.value)} placeholder="Zone type (e.g. urban, rural, industrial)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={newLat} onChange={e => setNewLat(e.target.value)} placeholder="Latitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <input value={newLng} onChange={e => setNewLng(e.target.value)} placeholder="Longitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                </div>
                <input value={newRadius} onChange={e => setNewRadius(e.target.value)} placeholder="Radius (meters, optional)" type="number" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={handleCreate} disabled={createLoading || !newName || !newLat || !newLng} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-xs font-semibold disabled:opacity-50">{createLoading ? "Creating..." : "Create Zone"}</button>
              </div>
            )}
          </div>
        )}

        {activeTab === "nearest" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">Find Nearest Zones</h3>
            <div className="space-y-2 mb-3">
              <div className="grid grid-cols-2 gap-2">
                <input value={nearLat} onChange={e => setNearLat(e.target.value)} placeholder="Latitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={nearLng} onChange={e => setNearLng(e.target.value)} placeholder="Longitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              </div>
              <input value={nearRadius} onChange={e => setNearRadius(e.target.value)} placeholder="Search radius (meters, optional)" type="number" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <button onClick={handleNearest} disabled={nearLoading || !nearLat || !nearLng} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-xs font-semibold disabled:opacity-50">{nearLoading ? "Searching..." : "Find Nearest"}</button>
            </div>
            {nearResults.length > 0 && (
              <div className="space-y-2">
                {nearResults.map((z: any, i: number) => (
                  <div key={z.id || i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                    <MapPin size={12} className="text-green-400" />
                    <div className="flex-1">
                      <div className="text-xs font-semibold">{z.name}</div>
                      <div className="text-[10px] text-gray-500">{z.zone_type} — {z.distance ? `${Number(z.distance).toFixed(0)}m away` : ""}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "detail" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Search size={14} className="text-green-400" /> Zone Detail</h3>
            <div className="flex gap-2 mb-3">
              <input value={zoneDetailId} onChange={e => setZoneDetailId(e.target.value)} placeholder="Zone ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <button onClick={async () => {
                if (!zoneDetailId) return;
                try { const res = await fetch(`${BACKEND_API}/api/zones/${zoneDetailId}`); if (res.ok) setZoneDetail(await res.json()); }
                catch { /* ignore */ }
              }} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-xs font-semibold">Load</button>
            </div>
            {zoneDetail && (
              <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
                {Object.entries(zoneDetail).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-[10px]"><span className="text-gray-500 w-28 flex-shrink-0">{k}:</span><span className="text-gray-300 break-all">{String(v ?? "")}</span></div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "update" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Edit size={14} className="text-green-400" /> Update Zone</h3>
            {updMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${updMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{updMsg.text}</div>}
            {!connected ? <p className="text-xs text-gray-400">Connect wallet to update zones</p> : (
              <div className="space-y-2">
                <input value={updZoneId} onChange={e => setUpdZoneId(e.target.value)} placeholder="Zone ID" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={updName} onChange={e => setUpdName(e.target.value)} placeholder="New name (optional)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={updType} onChange={e => setUpdType(e.target.value)} placeholder="New type (optional)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={updLat} onChange={e => setUpdLat(e.target.value)} placeholder="Latitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <input value={updLng} onChange={e => setUpdLng(e.target.value)} placeholder="Longitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                </div>
                <input value={updRadius} onChange={e => setUpdRadius(e.target.value)} placeholder="Radius (optional)" type="number" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={async () => {
                  if (!updZoneId) return;
                  setUpdLoading(true); setUpdMsg(null);
                  try {
                    const body: any = {};
                    if (updName) body.name = updName;
                    if (updType) body.zone_type = updType;
                    if (updLat) body.latitude = parseFloat(updLat);
                    if (updLng) body.longitude = parseFloat(updLng);
                    if (updRadius) body.radius = parseFloat(updRadius);
                    const res = await fetch(`${BACKEND_API}/api/zones/${updZoneId}`, { method: "PUT", headers: { "Content-Type": "application/json", ...getAuthHeaders() }, body: JSON.stringify(body) });
                    if (res.ok) { setUpdMsg({ text: "Zone updated!", ok: true }); fetchZones(); }
                    else { setUpdMsg({ text: await res.text() || "Failed", ok: false }); }
                  } catch (e: any) { setUpdMsg({ text: e.message || "Failed", ok: false }); }
                  finally { setUpdLoading(false); }
                }} disabled={updLoading || !updZoneId} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-xs font-semibold disabled:opacity-50">{updLoading ? "Updating..." : "Update Zone"}</button>
              </div>
            )}
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><List size={14} className="text-green-400" /> Zone Tickets</h3>
            <div className="flex gap-2 mb-3">
              <input value={ticketsZoneId} onChange={e => setTicketsZoneId(e.target.value)} placeholder="Zone ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <button onClick={async () => {
                if (!ticketsZoneId) return;
                setTicketsLoading(true);
                try { const res = await fetch(`${BACKEND_API}/api/zones/${ticketsZoneId}/tickets`); if (res.ok) { const d = await res.json(); setTickets(Array.isArray(d) ? d : d.tickets || []); } }
                catch { /* ignore */ }
                setTicketsLoading(false);
              }} disabled={ticketsLoading || !ticketsZoneId} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-xs font-semibold disabled:opacity-50">{ticketsLoading ? "Loading..." : "Load Tickets"}</button>
            </div>
            {tickets.length > 0 && (
              <div className="space-y-2">
                {tickets.map((t: any, i: number) => (
                  <div key={i} className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-xs font-semibold">{t.title || t.id?.slice(0, 8) || `Ticket ${i + 1}`}</div>
                    <div className="text-[10px] text-gray-500">{t.status} — {t.description?.slice(0, 80) || ""}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
