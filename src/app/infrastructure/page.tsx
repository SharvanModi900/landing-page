"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Layers, AlertTriangle, Zap, Globe, ArrowLeft, Clock, Route, Building } from "lucide-react";
import Link from "next/link";

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
  const [activeTab, setActiveTab] = useState<"segments" | "zones" | "alerts">("segments");

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
          {(["segments", "zones", "alerts"] as const).map(tab => (
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
      </div>
    </main>
  );
}
