"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Plus, Radio, Shield, Search, Layers } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

interface Sensor {
  id: string;
  name?: string;
  sensor_type?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
  created_at: string;
}

export default function SensorsPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"list" | "register" | "report" | "history" | "detail" | "batch">("list");
  const [regName, setRegName] = useState("");
  const [regType, setRegType] = useState("");
  const [regLat, setRegLat] = useState("");
  const [regLng, setRegLng] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regMsg, setRegMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [reportSensorId, setReportSensorId] = useState("");
  const [reportData, setReportData] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportMsg, setReportMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [historySensorId, setHistorySensorId] = useState("");
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  // Sensor detail
  const [sensorDetailId, setSensorDetailId] = useState("");
  const [sensorDetail, setSensorDetail] = useState<any>(null);
  // Batch report
  const [batchData, setBatchData] = useState("");
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchMsg, setBatchMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const fetchSensors = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_API}/api/sensors`);
      if (res.ok) {
        const data = await res.json();
        setSensors(Array.isArray(data) ? data : data.sensors || []);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchSensors(); }, [fetchSensors]);

  const handleRegister = async () => {
    if (!regName || !regType) return;
    setRegLoading(true); setRegMsg(null);
    try {
      const body: any = { name: regName, sensor_type: regType };
      if (regLat) body.latitude = parseFloat(regLat);
      if (regLng) body.longitude = parseFloat(regLng);
      const res = await fetch(`${BACKEND_API}/api/sensors/register`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setRegMsg({ text: "Sensor registered!", ok: true });
        setRegName(""); setRegType(""); setRegLat(""); setRegLng("");
        fetchSensors();
      } else {
        const err = await res.text();
        setRegMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: any) { setRegMsg({ text: e.message || "Failed", ok: false }); }
    finally { setRegLoading(false); }
  };

  const handleReport = async () => {
    if (!reportSensorId || !reportData) return;
    setReportLoading(true); setReportMsg(null);
    try {
      let parsed;
      try { parsed = JSON.parse(reportData); } catch { parsed = { value: reportData }; }
      const res = await fetch(`${BACKEND_API}/api/sensors/${reportSensorId}/report`, {
        method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ data: parsed }),
      });
      if (res.ok) {
        setReportMsg({ text: "Report submitted!", ok: true });
        setReportData("");
      } else {
        const err = await res.text();
        setReportMsg({ text: err || "Failed", ok: false });
      }
    } catch (e: any) { setReportMsg({ text: e.message || "Failed", ok: false }); }
    finally { setReportLoading(false); }
  };

  const handleHistory = async () => {
    if (!historySensorId) return;
    setHistoryLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/api/sensors/${historySensorId}/history`);
      if (res.ok) {
        const data = await res.json();
        setHistoryData(Array.isArray(data) ? data : data.readings || data.history || []);
      }
    } catch { /* ignore */ }
    setHistoryLoading(false);
  };

  const handleValidate = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_API}/api/sensors/${id}/validate`, {
        method: "POST", headers: { ...getAuthHeaders() },
      });
      if (res.ok) fetchSensors();
    } catch { /* ignore */ }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-600/20 ring-1 ring-indigo-500/30">
            <Cpu className="h-4 w-4 text-indigo-400" />
          </div>
          <h1 className="text-xl font-bold">IoT Sensors</h1>
        </motion.div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(["list", "register", "report", "history", "detail", "batch"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${activeTab === tab ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "list" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">Registered Sensors</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8"><div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
            ) : sensors.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-6">No sensors registered</p>
            ) : (
              <div className="space-y-2">
                {sensors.map(s => (
                  <div key={s.id} className="flex items-center gap-2 bg-white/[0.03] rounded-lg p-3">
                    <Radio size={14} className="text-indigo-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold">{s.name || "Unnamed"}</div>
                      <div className="text-[10px] text-gray-500">
                        {s.sensor_type && <span className="capitalize mr-2">{s.sensor_type}</span>}
                        {s.status && <span className={`ml-2 ${s.status === "active" ? "text-emerald-400" : "text-gray-500"}`}>({s.status})</span>}
                      </div>
                    </div>
                    {connected && (
                      <button onClick={() => handleValidate(s.id)} className="px-2 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg text-[10px] text-indigo-400 font-semibold transition">Validate</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "register" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Plus size={14} className="text-indigo-400" /> Register Sensor</h3>
            {regMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${regMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{regMsg.text}</div>}
            {!connected ? (
              <p className="text-xs text-gray-400 text-center py-4">Connect wallet to register sensors</p>
            ) : (
              <div className="space-y-2">
                <input value={regName} onChange={e => setRegName(e.target.value)} placeholder="Sensor name" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <input value={regType} onChange={e => setRegType(e.target.value)} placeholder="Sensor type (e.g. air_quality, noise, temperature)" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={regLat} onChange={e => setRegLat(e.target.value)} placeholder="Latitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                  <input value={regLng} onChange={e => setRegLng(e.target.value)} placeholder="Longitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                </div>
                <button onClick={handleRegister} disabled={regLoading || !regName || !regType} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">{regLoading ? "Registering..." : "Register Sensor"}</button>
              </div>
            )}
          </div>
        )}

        {activeTab === "report" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">Report Sensor Data</h3>
            {reportMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${reportMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{reportMsg.text}</div>}
            {!connected ? (
              <p className="text-xs text-gray-400 text-center py-4">Connect wallet to report data</p>
            ) : (
              <div className="space-y-2">
                <input value={reportSensorId} onChange={e => setReportSensorId(e.target.value)} placeholder="Sensor ID" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <textarea value={reportData} onChange={e => setReportData(e.target.value)} placeholder='Sensor data (JSON, e.g. {"pm25": 35, "temp": 28.5})' rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={handleReport} disabled={reportLoading || !reportSensorId || !reportData} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">{reportLoading ? "Submitting..." : "Submit Report"}</button>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">Sensor History</h3>
            <div className="flex gap-2 mb-3">
              <input value={historySensorId} onChange={e => setHistorySensorId(e.target.value)} placeholder="Sensor ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <button onClick={handleHistory} disabled={historyLoading || !historySensorId} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">{historyLoading ? "Loading..." : "Load"}</button>
            </div>
            {historyData.length > 0 && (
              <div className="space-y-2">
                {historyData.map((r: any, i: number) => (
                  <div key={i} className="bg-white/[0.03] rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500">{r.timestamp ? new Date(r.timestamp).toLocaleString() : ""}</div>
                    <pre className="text-[10px] text-gray-300 overflow-x-auto mt-1">{JSON.stringify(r.data || r, null, 2)}</pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "detail" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Search size={14} className="text-indigo-400" /> Sensor Detail</h3>
            <div className="flex gap-2 mb-3">
              <input value={sensorDetailId} onChange={e => setSensorDetailId(e.target.value)} placeholder="Sensor ID" className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <button onClick={async () => {
                if (!sensorDetailId) return;
                try { const res = await fetch(`${BACKEND_API}/api/sensors/${sensorDetailId}`); if (res.ok) setSensorDetail(await res.json()); }
                catch { /* ignore */ }
              }} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-xs font-semibold">Load</button>
            </div>
            {sensorDetail && (
              <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
                {Object.entries(sensorDetail).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-[10px]"><span className="text-gray-500 w-28 flex-shrink-0">{k}:</span><span className="text-gray-300 break-all">{String(v ?? "")}</span></div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "batch" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Layers size={14} className="text-indigo-400" /> Batch Sensor Report</h3>
            {batchMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${batchMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{batchMsg.text}</div>}
            {!connected ? <p className="text-xs text-gray-400 text-center py-4">Connect wallet to submit batch reports</p> : (
              <div className="space-y-2">
                <textarea value={batchData} onChange={e => setBatchData(e.target.value)} placeholder='JSON array of readings, e.g. [{"sensor_id": "...", "data": {"pm25": 35}}, ...]' rows={4} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
                <button onClick={async () => {
                  if (!batchData) return;
                  setBatchLoading(true); setBatchMsg(null);
                  try {
                    let parsed;
                    try { parsed = JSON.parse(batchData); } catch { setBatchMsg({ text: "Invalid JSON", ok: false }); setBatchLoading(false); return; }
                    const res = await fetch(`${BACKEND_API}/api/sensors/report-batch`, { method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() }, body: JSON.stringify({ readings: parsed }) });
                    if (res.ok) { setBatchMsg({ text: "Batch report submitted!", ok: true }); setBatchData(""); }
                    else { setBatchMsg({ text: await res.text() || "Failed", ok: false }); }
                  } catch (e: any) { setBatchMsg({ text: e.message || "Failed", ok: false }); }
                  finally { setBatchLoading(false); }
                }} disabled={batchLoading || !batchData} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">{batchLoading ? "Submitting..." : "Submit Batch"}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
