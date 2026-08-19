"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Layers, AlertTriangle, Zap, Globe, ArrowLeft, Clock, Route, Building, Activity, Eye, Plus, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";
import DarkSelect from "@/components/DarkSelect";

const BACKEND_API = "https://popp.thharko.com";

interface Segment {
  id: string;
  name?: string;
  type: string;
  status: string;
  condition?: string;
  zone_id?: string;
  start_lat?: number;
  start_lng?: number;
  end_lat?: number;
  end_lng?: number;
  created_at: string;
}

interface Zone {
  id: string;
  name: string;
  type: string;
  status: string;
  priority?: string;
  lat?: number;
  lng?: number;
  created_at: string;
}

interface NearbyAlert {
  id: string;
  type: string;
  severity: string;
  message: string;
  distance?: number;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  good: "text-emerald-400 bg-emerald-500/20",
  fair: "text-yellow-400 bg-yellow-500/20",
  poor: "text-orange-400 bg-orange-500/20",
  critical: "text-red-400 bg-red-500/20",
  active: "text-cyan-400 bg-cyan-500/20",
  inactive: "text-gray-400 bg-gray-500/20",
};

export default function InfrastructurePage() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [alerts, setAlerts] = useState<NearbyAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const { connected, connect, getAuthHeaders } = useWallet();
  const [activeTab, setActiveTab] = useState<"segments" | "zones" | "alerts" | "health" | "manage">("segments");
  const [routeHealth, setRouteHealth] = useState<any[]>([]);
  const [nearestProblems, setNearestProblems] = useState<any[]>([]);
  const [matchProblemId, setMatchProblemId] = useState("");
  const [matchResult, setMatchResult] = useState<any>(null);

  // Create segment
  const [csName, setCsName] = useState("");
  const [csType, setCsType] = useState("");
  const [csCondition, setCsCondition] = useState("");
  const [csZoneId, setCsZoneId] = useState("");
  const [csLoading, setCsLoading] = useState(false);
  const [csMsg, setCsMsg] = useState<{ text: string; ok: boolean } | null>(null);
  // Segment detail
  const [segDetailId, setSegDetailId] = useState("");
  const [segDetail, setSegDetail] = useState<any>(null);
  // Zone detail
  const [zoneDetailId, setZoneDetailId] = useState("");
  const [zoneDetail, setZoneDetail] = useState<any>(null);
  // Create zone
  const [czName, setCzName] = useState("");
  const [czType, setCzType] = useState("");
  const [czStatus, setCzStatus] = useState("active");
  const [czPriority, setCzPriority] = useState("");
  const [czLat, setCzLat] = useState("");
  const [czLng, setCzLng] = useState("");
  const [czLoading, setCzLoading] = useState(false);
  const [czMsg, setCzMsg] = useState<{ text: string; ok: boolean } | null>(null);
  // Recalculate
  const [recalcLoading, setRecalcLoading] = useState(false);
  const [recalcMsg, setRecalcMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [segRes, zoneRes, alertRes] = await Promise.allSettled([
        fetch(`${BACKEND_API}/api/infrastructure/segments`).then(r => r.ok ? r.json() : []),
        fetch(`${BACKEND_API}/api/infrastructure/zones`).then(r => r.ok ? r.json() : []),
        fetch(`${BACKEND_API}/api/infrastructure/nearby-alerts`).then(r => r.ok ? r.json() : []),
      ]);
      if (segRes.status === "fulfilled" && Array.isArray(segRes.value)) setSegments(segRes.value);
      if (zoneRes.status === "fulfilled" && Array.isArray(zoneRes.value)) setZones(zoneRes.value);
      if (alertRes.status === "fulfilled" && Array.isArray(alertRes.value)) setAlerts(alertRes.value);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/30">
            <Building className="h-4 w-4 text-cyan-400" />
          </div>
          <h1 className="text-xl font-bold">Infrastructure Monitor</h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1"><Route size={12} className="text-cyan-400" /><span className="text-[10px] text-gray-400">Segments</span></div>
            <div className="text-lg font-bold">{loading ? "—" : segments.length}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1"><Globe size={12} className="text-purple-400" /><span className="text-[10px] text-gray-400">Zones</span></div>
            <div className="text-lg font-bold">{loading ? "—" : zones.length}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1"><AlertTriangle size={12} className="text-orange-400" /><span className="text-[10px] text-gray-400">Alerts</span></div>
            <div className="text-lg font-bold">{loading ? "—" : alerts.length}</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-4">
          {(["segments", "zones", "alerts", "health", "manage"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${activeTab === tab ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Segments Tab */}
            {activeTab === "segments" && (
              <div className="space-y-2">
                {segments.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
                    <Route className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">No infrastructure segments registered</p>
                  </div>
                ) : (
                  segments.map((seg, i) => (
                    <motion.div key={seg.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <Route size={14} className="text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-semibold truncate">{seg.name || `Segment #${seg.id.slice(0, 8)}`}</h3>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${STATUS_COLORS[seg.status] || STATUS_COLORS.inactive}`}>{seg.status}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-gray-500">
                          <span className="capitalize">{seg.type}</span>
                          {seg.condition && <span>Condition: {seg.condition}</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {/* Zones Tab */}
            {activeTab === "zones" && (
              <div className="space-y-2">
                {zones.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
                    <Globe className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">No zones registered</p>
                  </div>
                ) : (
                  zones.map((zone, i) => (
                    <motion.div key={zone.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Globe size={14} className="text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-semibold truncate">{zone.name || `Zone #${zone.id.slice(0, 8)}`}</h3>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${STATUS_COLORS[zone.status] || STATUS_COLORS.inactive}`}>{zone.status}</span>
                          {zone.priority && <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${zone.priority === "high" ? "bg-red-500/20 text-red-400" : zone.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"}`}>{zone.priority}</span>}
                        </div>
                        <div className="text-[10px] text-gray-500 capitalize">{zone.type}</div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {/* Alerts Tab */}
            {activeTab === "alerts" && (
              <div className="space-y-2">
                {alerts.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
                    <Zap className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">No nearby alerts</p>
                  </div>
                ) : (
                  alerts.map((alert, i) => (
                    <motion.div key={alert.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-3">
                      <AlertTriangle size={14} className={`flex-shrink-0 mt-0.5 ${alert.severity === "critical" ? "text-red-400" : alert.severity === "high" ? "text-orange-400" : "text-yellow-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${alert.severity === "critical" ? "bg-red-500/20 text-red-400" : alert.severity === "high" ? "bg-orange-500/20 text-orange-400" : "bg-yellow-500/20 text-yellow-400"}`}>{alert.severity}</span>
                          <span className="text-[10px] text-gray-500 capitalize">{alert.type}</span>
                        </div>
                        <p className="text-xs text-gray-300">{alert.message}</p>
                        {alert.distance != null && <span className="text-[10px] text-gray-500 mt-0.5">{alert.distance.toFixed(1)} km away</span>}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {/* Health Tab */}
        {activeTab === "health" && (
          <>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Activity size={14} className="text-emerald-400" /> Route Health</h3>
              <button onClick={async () => {
                try {
                  const res = await fetch(`${BACKEND_API}/api/infrastructure/route-health`);
                  if (res.ok) {
                    const d = await res.json();
                    setRouteHealth(Array.isArray(d) ? d : d.routes || []);
                  }
                } catch { /* ignore */ }
              }} className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-lg text-xs font-semibold mb-3">Load Route Health</button>
              {routeHealth.length > 0 && (
                <div className="space-y-2">
                  {routeHealth.map((r: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                      <div className="flex-1">
                        <div className="text-xs font-semibold">{r.segment_id || r.route || `Route ${i + 1}`}</div>
                        <div className="text-[10px] text-gray-500">Status: {r.status || "—"} | Score: {r.health_score || r.score || "—"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Eye size={14} className="text-cyan-400" /> Match Problem to Infrastructure</h3>
              <div className="flex gap-2 mb-3">
                <input value={matchProblemId} onChange={e => setMatchProblemId(e.target.value)} placeholder="Submission ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={async () => {
                  if (!matchProblemId) return;
                  try {
                    const res = await fetch(`${BACKEND_API}/api/infrastructure/match-problem/${matchProblemId}`);
                    if (res.ok) setMatchResult(await res.json());
                  } catch { /* ignore */ }
                }} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold">Match</button>
              </div>
              {matchResult && (
                <div className="bg-white/[0.03] rounded-lg p-3">
                  <div className="text-xs">Matched: <span className="font-bold text-cyan-400">{matchResult.segment_id || matchResult.match || "No match"}</span></div>
                  {matchResult.distance != null && <div className="text-[10px] text-gray-500">Distance: {matchResult.distance}m</div>}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><AlertTriangle size={14} className="text-orange-400" /> Nearest Problems</h3>
              <button onClick={async () => {
                try {
                  const res = await fetch(`${BACKEND_API}/api/infrastructure/nearest-problems`);
                  if (res.ok) {
                    const d = await res.json();
                    setNearestProblems(Array.isArray(d) ? d : d.problems || []);
                  }
                } catch { /* ignore */ }
              }} className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold mb-3">Load Nearest Problems</button>
              {nearestProblems.length > 0 && (
                <div className="space-y-2">
                  {nearestProblems.map((p: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-2.5">
                      <div className="flex-1">
                        <div className="text-xs font-semibold">{p.title || p.submission_id || `Problem ${i + 1}`}</div>
                        <div className="text-[10px] text-gray-500">{p.distance != null ? `${p.distance}m away` : ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        {/* Manage Tab */}
        {activeTab === "manage" && (
          <div className="space-y-4">
            {/* Create Segment */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Plus size={14} className="text-cyan-400" /> Create Segment</h3>
              {csMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${csMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{csMsg.text}</div>}
              {!connected ? <p className="text-xs text-gray-400">Connect wallet to create segments</p> : (
                <div className="space-y-2">
                  <input value={csName} onChange={e => setCsName(e.target.value)} placeholder="Segment name" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={csType} onChange={e => setCsType(e.target.value)} placeholder="Type (road, bridge, etc.)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    <input value={csCondition} onChange={e => setCsCondition(e.target.value)} placeholder="Condition (good, fair, poor)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  </div>
                  <input value={csZoneId} onChange={e => setCsZoneId(e.target.value)} placeholder="Zone ID (optional)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <button onClick={async () => {
                    if (!csName || !csType) return;
                    setCsLoading(true); setCsMsg(null);
                    try {
                      const body: any = { name: csName, type: csType };
                      if (csCondition) body.condition = csCondition;
                      if (csZoneId) body.zone_id = csZoneId;
                      const res = await fetch(`${BACKEND_API}/api/infrastructure/segments`, { method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() }, body: JSON.stringify(body) });
                      if (res.ok) { setCsMsg({ text: "Segment created!", ok: true }); setCsName(""); setCsType(""); setCsCondition(""); setCsZoneId(""); fetchData(); }
                      else { setCsMsg({ text: await res.text() || "Failed", ok: false }); }
                    } catch (e: any) { setCsMsg({ text: e.message || "Failed", ok: false }); }
                    finally { setCsLoading(false); }
                  }} disabled={csLoading || !csName || !csType} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">{csLoading ? "Creating..." : "Create Segment"}</button>
                </div>
              )}
            </div>

            {/* Segment Detail */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Search size={14} className="text-cyan-400" /> Segment Detail</h3>
              <div className="flex gap-2 mb-3">
                <input value={segDetailId} onChange={e => setSegDetailId(e.target.value)} placeholder="Segment ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={async () => {
                  if (!segDetailId) return;
                  try { const res = await fetch(`${BACKEND_API}/api/infrastructure/segments/${segDetailId}`); if (res.ok) setSegDetail(await res.json()); } catch { /* ignore */ }
                }} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold">Load</button>
              </div>
              {segDetail && (
                <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
                  {Object.entries(segDetail).map(([k, v]) => (
                    <div key={k} className="flex gap-2 text-[10px]"><span className="text-gray-500 w-28 flex-shrink-0">{k}:</span><span className="text-gray-300 break-all">{String(v ?? "")}</span></div>
                  ))}
                </div>
              )}
            </div>

            {/* Zone Detail */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Globe size={14} className="text-purple-400" /> Zone Detail</h3>
              <div className="flex gap-2 mb-3">
                <input value={zoneDetailId} onChange={e => setZoneDetailId(e.target.value)} placeholder="Zone ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={async () => {
                  if (!zoneDetailId) return;
                  try { const res = await fetch(`${BACKEND_API}/api/infrastructure/zones/${zoneDetailId}`); if (res.ok) setZoneDetail(await res.json()); } catch { /* ignore */ }
                }} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-xs font-semibold">Load</button>
              </div>
              {zoneDetail && (
                <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
                  {Object.entries(zoneDetail).map(([k, v]) => (
                    <div key={k} className="flex gap-2 text-[10px]"><span className="text-gray-500 w-28 flex-shrink-0">{k}:</span><span className="text-gray-300 break-all">{String(v ?? "")}</span></div>
                  ))}
                </div>
              )}
            </div>

            {/* Create Zone */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Plus size={14} className="text-purple-400" /> Create Zone</h3>
              {czMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${czMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{czMsg.text}</div>}
              {!connected ? <p className="text-xs text-gray-400">Connect wallet to create zones</p> : (
                <div className="space-y-2">
                  <input value={czName} onChange={e => setCzName(e.target.value)} placeholder="Zone name" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={czType} onChange={e => setCzType(e.target.value)} placeholder="Type" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    <DarkSelect value={czStatus} onChange={e => setCzStatus(e.target.value)}
                      options={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                      ]}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={czPriority} onChange={e => setCzPriority(e.target.value)} placeholder="Priority (high/medium/low)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                    <input value={czLat} onChange={e => setCzLat(e.target.value)} placeholder="Latitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  </div>
                  <input value={czLng} onChange={e => setCzLng(e.target.value)} placeholder="Longitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <button onClick={async () => {
                    if (!czName) return;
                    setCzLoading(true); setCzMsg(null);
                    try {
                      const body: any = { name: czName, type: czType || "general", status: czStatus };
                      if (czPriority) body.priority = czPriority;
                      if (czLat) body.lat = parseFloat(czLat);
                      if (czLng) body.lng = parseFloat(czLng);
                      const res = await fetch(`${BACKEND_API}/api/infrastructure/zones`, { method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() }, body: JSON.stringify(body) });
                      if (res.ok) { setCzMsg({ text: "Zone created!", ok: true }); setCzName(""); setCzType(""); setCzPriority(""); setCzLat(""); setCzLng(""); fetchData(); }
                      else { setCzMsg({ text: await res.text() || "Failed", ok: false }); }
                    } catch (e: any) { setCzMsg({ text: e.message || "Failed", ok: false }); }
                    finally { setCzLoading(false); }
                  }} disabled={czLoading || !czName} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-xs font-semibold disabled:opacity-50">{czLoading ? "Creating..." : "Create Zone"}</button>
                </div>
              )}
            </div>

            {/* Recalculate */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><RefreshCw size={14} className="text-orange-400" /> Recalculate Infrastructure Scores</h3>
              {recalcMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${recalcMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{recalcMsg.text}</div>}
              {!connected ? <p className="text-xs text-gray-400">Connect wallet to recalculate</p> : (
                <button onClick={async () => {
                  setRecalcLoading(true); setRecalcMsg(null);
                  try {
                    const res = await fetch(`${BACKEND_API}/api/infrastructure/recalculate`, { method: "POST", headers: { ...getAuthHeaders() } });
                    if (res.ok) { const d = await res.json(); setRecalcMsg({ text: `Recalculated! ${d.updated || 0} items updated.`, ok: true }); fetchData(); }
                    else { setRecalcMsg({ text: await res.text() || "Failed", ok: false }); }
                  } catch (e: any) { setRecalcMsg({ text: e.message || "Failed", ok: false }); }
                  finally { setRecalcLoading(false); }
                }} disabled={recalcLoading} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-xs font-semibold disabled:opacity-50">{recalcLoading ? "Recalculating..." : "Recalculate All"}</button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
