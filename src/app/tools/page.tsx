// src/app/tools/page.tsx
"use client";

import { Wrench, Code2, Search, Shield, Cpu, Activity, BarChart3, AlertTriangle, Upload, MapPin } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/lib/wallet";
import DarkSelect from "@/components/DarkSelect";

const BACKEND_API = "https://popp.thharko.com";

export default function ToolsPage() {
  const { connected, connect, getAuthHeaders } = useWallet();
  // Insights
  const [insights, setInsights] = useState<any>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  // Emergency
  const [emergSubId, setEmergSubId] = useState("");
  const [emergUrgency, setEmergUrgency] = useState("high");
  const [emergReason, setEmergReason] = useState("");
  const [emergLoading, setEmergLoading] = useState(false);
  const [emergMsg, setEmergMsg] = useState<{ text: string; ok: boolean } | null>(null);
  // Upload
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"image" | "video">("image");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ text: string; ok: boolean } | null>(null);
  // Nearby
  const [nearbyLat, setNearbyLat] = useState("");
  const [nearbyLng, setNearbyLng] = useState("");
  const [nearbyRadius, setNearbyRadius] = useState("");
  const [nearbyResults, setNearbyResults] = useState<any[]>([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const tools = [
    {
      icon: <Wrench className="w-8 h-8 text-blue-400" />,
      title: "Problem Explorer",
      desc: "Browse, filter, and analyze real-world problems submitted to PoPP.",
      link: "/explorer",
    },
    {
      icon: <Search className="w-8 h-8 text-purple-400" />,
      title: "Validator Dashboard",
      desc: "Track validation tasks, staking rewards, and governance activity.",
      link: "/validators",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Security Scanner",
      desc: "Run vulnerability scans on smart contracts and integrations.",
      link: "/security",
    },
    {
      icon: <Code2 className="w-8 h-8 text-yellow-400" />,
      title: "Code Playground",
      desc: "Experiment with the PoPP SDK using live code snippets.",
      link: "/playground",
    },
    {
      icon: <Cpu className="w-8 h-8 text-pink-400" />,
      title: "Node Monitor",
      desc: "Monitor network health, validator uptime, and testnet performance.",
      link: "/monitor",
    },
    {
      icon: <Activity className="w-8 h-8 text-red-400" />,
      title: "Analytics Hub",
      desc: "Visualize problem trends, validator activity, and governance metrics.",
      link: "/analytics",
    },
  ];

  return (
    <div className="bg-[#030712] text-white min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-blue-900/40 to-purple-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            PoPP <span className="text-blue-400">Tools</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A unified toolbox for developers, validators, and researchers in the Proof of Problem Protocol ecosystem.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center">
          🧰 Available Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {tools.map((tool) => (
            <a
              key={tool.title}
              href={tool.link}
              className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition"
            >
              <div className="mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition">
                {tool.title}
              </h3>
              <p className="text-gray-400 text-sm">{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Interactive API Tools</h2>

        {/* Dashboard Insights */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><BarChart3 size={14} className="text-blue-400" /> Dashboard Insights</h3>
          <button onClick={async () => {
            setInsightsLoading(true);
            try { const res = await fetch(`${BACKEND_API}/api/dashboard/insights`); if (res.ok) setInsights(await res.json()); }
            catch { /* ignore */ }
            setInsightsLoading(false);
          }} disabled={insightsLoading} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-xs font-semibold disabled:opacity-50 mb-3">{insightsLoading ? "Loading..." : "Load Insights"}</button>
          {insights && (
            <div className="bg-white/[0.03] rounded-lg p-3 space-y-1">
              {Object.entries(insights).map(([k, v]) => (
                <div key={k} className="flex gap-2 text-[10px]"><span className="text-gray-500 w-32 flex-shrink-0">{k}:</span><span className="text-gray-300 break-all">{typeof v === 'object' ? JSON.stringify(v) : String(v ?? "")}</span></div>
              ))}
            </div>
          )}
        </div>

        {/* Emergency Activate */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><AlertTriangle size={14} className="text-red-400" /> Emergency Activate</h3>
          {emergMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${emergMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{emergMsg.text}</div>}
          {!connected ? <p className="text-xs text-gray-400">Connect wallet to activate emergency</p> : (
            <div className="space-y-2">
              <input value={emergSubId} onChange={e => setEmergSubId(e.target.value)} placeholder="Submission ID" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <div className="grid grid-cols-2 gap-2">
                <DarkSelect value={emergUrgency} onChange={e => setEmergUrgency(e.target.value)}
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                    { value: 'critical', label: 'Critical' },
                  ]}
                />
                <input value={emergReason} onChange={e => setEmergReason(e.target.value)} placeholder="Reason" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              </div>
              <button onClick={async () => {
                if (!emergSubId) return;
                setEmergLoading(true); setEmergMsg(null);
                try {
                  const res = await fetch(`${BACKEND_API}/api/emergency/activate`, { method: "POST", headers: { "Content-Type": "application/json", ...getAuthHeaders() }, body: JSON.stringify({ submission_id: emergSubId, urgency: emergUrgency, reason: emergReason }) });
                  if (res.ok) { setEmergMsg({ text: "Emergency activated!", ok: true }); setEmergSubId(""); setEmergReason(""); }
                  else { setEmergMsg({ text: await res.text() || "Failed", ok: false }); }
                } catch (e: any) { setEmergMsg({ text: e.message || "Failed", ok: false }); }
                finally { setEmergLoading(false); }
              }} disabled={emergLoading || !emergSubId} className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg text-xs font-semibold disabled:opacity-50">{emergLoading ? "Activating..." : "Activate Emergency"}</button>
            </div>
          )}
        </div>

        {/* Upload Image/Video */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Upload size={14} className="text-cyan-400" /> Upload Media</h3>
          {uploadMsg && <div className={`mb-3 p-2 rounded-lg text-xs font-semibold ${uploadMsg.ok ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>{uploadMsg.text}</div>}
          {!connected ? <p className="text-xs text-gray-400">Connect wallet to upload</p> : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <button onClick={() => setUploadType("image")} className={`px-3 py-1.5 rounded-md text-xs font-semibold ${uploadType === "image" ? "bg-cyan-500 text-white" : "bg-white/5 text-gray-400 border border-white/10"}`}>Image</button>
                <button onClick={() => setUploadType("video")} className={`px-3 py-1.5 rounded-md text-xs font-semibold ${uploadType === "video" ? "bg-cyan-500 text-white" : "bg-white/5 text-gray-400 border border-white/10"}`}>Video</button>
              </div>
              <input type="file" accept={uploadType === "image" ? "image/*" : "video/*"} onChange={e => setUploadFile(e.target.files?.[0] || null)} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-cyan-500/20 file:text-cyan-400" />
              <button onClick={async () => {
                if (!uploadFile) return;
                setUploadLoading(true); setUploadMsg(null);
                try {
                  const formData = new FormData();
                  formData.append("file", uploadFile);
                  const res = await fetch(`${BACKEND_API}/api/upload/${uploadType}`, { method: "POST", headers: { ...getAuthHeaders() }, body: formData });
                  if (res.ok) { const d = await res.json(); setUploadMsg({ text: `Uploaded! URL: ${d.url || d.ipfs_url || "see response"}`, ok: true }); setUploadFile(null); }
                  else { setUploadMsg({ text: await res.text() || "Failed", ok: false }); }
                } catch (e: any) { setUploadMsg({ text: e.message || "Failed", ok: false }); }
                finally { setUploadLoading(false); }
              }} disabled={uploadLoading || !uploadFile} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-xs font-semibold disabled:opacity-50">{uploadLoading ? "Uploading..." : `Upload ${uploadType === "image" ? "Image" : "Video"}`}</button>
            </div>
          )}
        </div>

        {/* Nearby Submissions */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><MapPin size={14} className="text-green-400" /> Nearby Submissions</h3>
          <div className="space-y-2 mb-3">
            <div className="grid grid-cols-2 gap-2">
              <input value={nearbyLat} onChange={e => setNearbyLat(e.target.value)} placeholder="Latitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
              <input value={nearbyLng} onChange={e => setNearbyLng(e.target.value)} placeholder="Longitude" type="number" step="any" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
            </div>
            <input value={nearbyRadius} onChange={e => setNearbyRadius(e.target.value)} placeholder="Radius (meters, optional)" type="number" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-gray-500" />
            <button onClick={async () => {
              if (!nearbyLat || !nearbyLng) return;
              setNearbyLoading(true);
              try {
                const params = new URLSearchParams({ latitude: nearbyLat, longitude: nearbyLng });
                if (nearbyRadius) params.set("radius", nearbyRadius);
                const res = await fetch(`${BACKEND_API}/api/submissions/nearby?${params}`);
                if (res.ok) { const d = await res.json(); setNearbyResults(Array.isArray(d) ? d : d.submissions || []); }
              } catch { /* ignore */ }
              setNearbyLoading(false);
            }} disabled={nearbyLoading || !nearbyLat || !nearbyLng} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-xs font-semibold disabled:opacity-50">{nearbyLoading ? "Searching..." : "Find Nearby"}</button>
          </div>
          {nearbyResults.length > 0 && (
            <div className="space-y-2">
              {nearbyResults.map((s: any, i: number) => (
                <div key={i} className="bg-white/[0.03] rounded-lg p-2.5">
                  <div className="text-xs font-semibold">{s.title || s.id?.slice(0, 8) || `Submission ${i + 1}`}</div>
                  <div className="text-[10px] text-gray-500">{s.status} — {s.distance ? `${Number(s.distance).toFixed(0)}m away` : ""} {s.description?.slice(0, 60) || ""}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-white/[0.02] py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
            🚀 More Tools Coming Soon
          </h2>
          <p className="text-gray-300 mb-6">
            We are actively building new utilities for developers, problem submitters, and validators. Stay tuned for:
          </p>
          <ul className="text-gray-400 space-y-3 text-sm max-w-xl mx-auto">
            <li>🔮 Problem Simulation Lab — test how a problem flows through PoPP consensus.</li>
            <li>🛡️ Governance Voting Interface — vote on escalations and problem prioritization.</li>
            <li>📊 Advanced Analytics Dashboard — deep dive into ecosystem data.</li>
            <li>⚡ SDK Auto-Generator — bootstrap code in your favorite language.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
