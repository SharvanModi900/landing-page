"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin, Upload, Navigation, Loader2, Eye, EyeOff,
  CheckCircle, AlertCircle, Camera, Video, Image as ImageIcon,
  RefreshCw, Shield, Fingerprint, ChevronRight, ChevronLeft, Send,
  Sparkles, Globe, Lock,
} from "lucide-react";

// ─── Dynamic Leaflet import (avoids SSR issues) ─────────────────────────────
function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  const useMap = require("react-leaflet").useMap;
  const map = useMap();
  useEffect(() => {
    const handler = (e: any) => onClick(e.latlng.lat, e.latlng.lng);
    map.on("click", handler);
    return () => map.off("click", handler);
  }, [map, onClick]);
  return null;
}

function LocationMapPicker({
  lat, lng, onPick,
}: {
  lat: number; lng: number; onPick: (lat: number, lng: number) => void;
}) {
  const [ready, setReady] = useState(false);
  const [mapLib, setMapLib] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    (async () => {
      const leaflet = await import("leaflet");
      const rl = await import("react-leaflet");
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setMapLib({ ...rl, L: leaflet.default });
      setReady(true);
    })();
  }, []);

  const handleMapClick = useCallback((lat: number, lng: number) => onPick(lat, lng), [onPick]);

  if (!ready || !mapLib) {
    return (
      <div className="h-52 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
        <span className="text-sm text-gray-500 ml-2">Loading map...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, useMap: UM, L } = mapLib;
  const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41],
  });

  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06]" style={{ height: 240 }}>
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OSM" />
        <Marker position={[lat, lng]} icon={icon} />
        <MapClickHandler onClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}

// ─── Utilities ───────────────────────────────────────────────────────────────
async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const BACKEND_URL = "https://popp.thharko.com";

const CATEGORIES: Record<string, { label: string; icon: string; color: string }> = {
  infrastructure: { label: "Infrastructure", icon: "🏗️", color: "#f59e0b" },
  health:         { label: "Public Health",  icon: "🏥", color: "#ef4444" },
  corruption:     { label: "Corruption",     icon: "🛡️", color: "#8b5cf6" },
  environment:    { label: "Environment",    icon: "🌿", color: "#22c55e" },
  education:      { label: "Education",      icon: "🏫", color: "#3b82f6" },
  legal:          { label: "Legal",          icon: "⚖️", color: "#ec4899" },
  other:          { label: "Other",          icon: "⚪", color: "#6b7280" },
};

type Category = keyof typeof CATEGORIES;

// ─── Shared styles ───────────────────────────────────────────────────────────
const inputCls = "w-full rounded-xl px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-gray-600 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/10 transition-all";
const labelCls = "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block";
const cardCls = "bg-white/[0.02] border border-white/[0.06] rounded-xl";

// ─── Main Component ─────────────────────────────────────────────────────────
export default function SubmissionForm({ onSuccess }: { onSuccess: (data: any) => void }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "detecting" | "denied" | "success">("idle");

  useEffect(() => { detectLocation(); }, []);

  const detectLocation = () => {
    if (!("geolocation" in navigator)) { setLocationStatus("denied"); return; }
    setLocationStatus("detecting");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude, lng = pos.coords.longitude;
        let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        try { const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`); if (r.ok) { const d = await r.json(); address = d.display_name || address; } } catch {}
        setLocation({ lat, lng, address });
        setLocationStatus("success");
      },
      () => {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude, lng = pos.coords.longitude;
            let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            try { const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`); if (r.ok) { const d = await r.json(); address = d.display_name || address; } } catch {}
            setLocation({ lat, lng, address });
            setLocationStatus("success");
          },
          () => setLocationStatus("denied"),
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 0 }
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleMapPick = async (lat: number, lng: number) => {
    let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    try { const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`); if (r.ok) { const d = await r.json(); address = d.display_name || address; } } catch {}
    setLocation({ lat, lng, address });
    setLocationStatus("success");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        setFilePreviews((prev) => [...prev, URL.createObjectURL(file)]);
      }
    });
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  };

  const canProceed = () => title.trim() && description.trim() && category && location;

  const handleSubmit = async () => {
    if (!title || !description || !category || !location) { setError("Please fill in all required fields"); return; }
    setLoading(true); setError("");
    try {
      let media_hash = ""; let media: string[] = [];
      if (files.length > 0) {
        media_hash = await hashFile(files[0]);
        media = [await fileToBase64(files[0])];
      }
      const res = await fetch(`${BACKEND_URL}/api/submissions`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, description, latitude: location.lat, longitude: location.lng,
          landmark_name: location.address, category,
          media_hash: media_hash || undefined, media: media.length > 0 ? media : undefined,
          anonymous: isAnonymous,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      const data = await res.json();
      onSuccess(data);
      setTitle(""); setDescription(""); setCategory(null); setIsAnonymous(true);
      setFiles([]); setFilePreviews([]); setStep(1);
    } catch (err: any) { setError(err.message || "Unknown error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── Step Indicator ── */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {[
            { n: 1, label: "Details", icon: Sparkles },
            { n: 2, label: "Evidence", icon: Camera },
            { n: 3, label: "Review", icon: Lock },
          ].map((s, i) => {
            const active = s.n <= step;
            const current = s.n === step;
            return (
              <React.Fragment key={s.n}>
                {i > 0 && <div className={`w-8 sm:w-12 h-px ${s.n <= step ? "bg-cyan-500/40" : "bg-white/[0.06]"}`} />}
                <button onClick={() => s.n < step && setStep(s.n)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                    current ? "bg-cyan-500/10 border border-cyan-500/20" : "border border-transparent"
                  } ${s.n < step ? "cursor-pointer hover:bg-white/[0.03]" : ""}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                    active ? "bg-cyan-500 text-white" : "bg-white/[0.04] text-gray-600"
                  }`}>
                    {s.n < step ? "✓" : s.n}
                  </div>
                  <span className={`text-xs font-medium hidden sm:inline ${current ? "text-cyan-400" : active ? "text-gray-400" : "text-gray-600"}`}>{s.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
        <div className="text-[10px] text-gray-600">Step {step}/3</div>
      </div>

      {/* ═══════════════════ STEP 1: DETAILS ═══════════════════ */}
      {step === 1 && (
        <div className="flex flex-col gap-5">
          {/* Category */}
          <div>
            <label className={labelCls}>Category</label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(([key, cat]) => {
                const active = category === key;
                return (
                  <button key={key} type="button" onClick={() => setCategory(key)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                      active
                        ? "border-2 shadow-lg scale-[1.02]"
                        : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]"
                    }`}
                    style={active ? { borderColor: cat.color, backgroundColor: cat.color + "12", boxShadow: `0 8px 20px ${cat.color}10` } : {}}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className={`text-[10px] font-medium leading-tight text-center ${active ? "text-white" : "text-gray-500"}`}>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={labelCls}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls}
              placeholder="Brief description of the problem" maxLength={100} />
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-gray-700">Be specific and factual</span>
              <span className="text-[10px] text-gray-600">{title.length}/100</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${inputCls} resize-none`}
              placeholder="Provide details: what happened, where, when, who is affected..." maxLength={1000} />
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-gray-700">Include context and impact</span>
              <span className="text-[10px] text-gray-600">{description.length}/1000</span>
            </div>
          </div>

          {/* Anonymous Toggle */}
          <div>
            <label className={labelCls}>Identity</label>
            <button type="button" onClick={() => setIsAnonymous(!isAnonymous)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${cardCls} hover:bg-white/[0.03] group`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isAnonymous ? "bg-cyan-500/10" : "bg-white/[0.04]"}`}>
                  {isAnonymous ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{isAnonymous ? "Anonymous Submission" : "Verified Identity"}</div>
                  <div className="text-[10px] text-gray-600">{isAnonymous ? "Your identity will be cryptographically hidden" : "Your identity will be visible to validators"}</div>
                </div>
              </div>
              <div className={`w-11 h-[24px] rounded-full transition-all ${isAnonymous ? "bg-cyan-500" : "bg-white/10"}`}>
                <div className={`w-[20px] h-[20px] rounded-full bg-white transition-transform shadow-sm ${isAnonymous ? "translate-x-[22px]" : "translate-x-[2px]"} mt-[2px]`} />
              </div>
            </button>
          </div>

          {/* Location */}
          <div>
            <label className={labelCls}>Location</label>
            <div className={`flex items-center gap-3 p-4 rounded-xl ${cardCls} mb-3`}>
              {locationStatus === "detecting" ? (
                <><Loader2 className="w-5 h-5 text-cyan-400 animate-spin" /><span className="text-sm text-gray-500">Detecting your location...</span></>
              ) : locationStatus === "success" && location ? (
                <>
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-sm text-gray-300 flex-1 truncate">{location.address}</span>
                  <button type="button" onClick={detectLocation} className="p-2 rounded-lg hover:bg-white/[0.04] transition-colors text-cyan-400 hover:text-cyan-300">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600 flex-1">Location unavailable</span>
                  <button type="button" onClick={detectLocation} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">Retry</button>
                </>
              )}
            </div>
            {locationStatus === "denied" && (
              <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10 text-xs text-amber-400">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> Location access denied — enable in browser settings or click the map below
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-600">Click anywhere on the map to adjust</span>
              {location && <span className="text-[10px] text-gray-700 font-mono">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>}
            </div>
            {location ? (
              <LocationMapPicker lat={location.lat} lng={location.lng} onPick={handleMapPick} />
            ) : (
              <LocationMapPicker lat={20.5937} lng={78.9629} onPick={handleMapPick} />
            )}
          </div>

          {/* Next */}
          <button type="button" onClick={() => setStep(2)} disabled={!canProceed()}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-lg shadow-cyan-500/15">
            Continue to Evidence <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ═══════════════════ STEP 2: EVIDENCE ═══════════════════ */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div>
            <label className={labelCls}>Evidence (Optional)</label>
            <p className="text-xs text-gray-500 mb-4">Photos with GPS metadata will auto-verify location. Image date, camera info & coordinates are extracted automatically.</p>

            {/* Evidence Preview Grid */}
            {files.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    {filePreviews[index] ? (
                      <img src={filePreviews[index]} alt={`Uploaded evidence: ${file.name}`} className="w-full h-24 object-cover rounded-xl border border-white/[0.06]" loading="lazy" width={120} height={96} />
                    ) : (
                      <div className="w-full h-24 flex items-center justify-center bg-white/[0.03] rounded-xl border border-white/[0.06]">
                        <Upload className="w-6 h-6 text-cyan-400/40" />
                      </div>
                    )}
                    <button type="button" onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <span className="text-white text-xs">×</span>
                    </button>
                    <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded-md text-[10px] text-white">
                      {file.type.startsWith("image/") ? "📷 Photo" : file.type.startsWith("video/") ? "🎥 Video" : "📄 File"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload buttons */}
            <div className="grid grid-cols-3 gap-3">
              <label className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-500/10 group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Photo</span>
                <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
              </label>
              <label className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Video</span>
                <input type="file" accept="video/*" capture="environment" onChange={handleFileChange} className="hidden" />
              </label>
              <label className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Gallery</span>
                <input type="file" accept="image/*,video/*" multiple onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Nav */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setStep(1)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-gray-400 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button type="button" onClick={() => setStep(3)}
              className="flex-[2] flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-all shadow-lg shadow-cyan-500/15">
              Review Submission <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════ STEP 3: REVIEW ═══════════════════ */}
      {step === 3 && (
        <div className="flex flex-col gap-5">
          <div>
            <label className={labelCls}>Review Your Submission</label>
            <p className="text-xs text-gray-500 -mt-1 mb-4">Verify all details before submitting to the network.</p>
          </div>

          <div className={`${cardCls} divide-y divide-white/[0.04]`}>
            {/* Category */}
            <div className="flex items-center justify-between p-4">
              <span className="text-xs text-gray-600">Category</span>
              {category && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: CATEGORIES[category].color + "12" }}>
                  <span className="text-base">{CATEGORIES[category].icon}</span>
                  <span className="text-xs font-semibold" style={{ color: CATEGORIES[category].color }}>{CATEGORIES[category].label}</span>
                </div>
              )}
            </div>
            {/* Title */}
            <div className="p-4">
              <div className="text-xs text-gray-600 mb-1">Title</div>
              <div className="text-sm text-white font-medium">{title}</div>
            </div>
            {/* Description */}
            <div className="p-4">
              <div className="text-xs text-gray-600 mb-1">Description</div>
              <div className="text-sm text-gray-400 leading-relaxed">{description}</div>
            </div>
            {/* Identity */}
            <div className="flex items-center justify-between p-4">
              <span className="text-xs text-gray-600">Identity</span>
              <div className="flex items-center gap-2">
                {isAnonymous ? <EyeOff className="w-3.5 h-3.5 text-cyan-400" /> : <Eye className="w-3.5 h-3.5 text-gray-400" />}
                <span className="text-xs text-white font-medium">{isAnonymous ? "Anonymous" : "Verified"}</span>
              </div>
            </div>
            {/* Location */}
            <div className="p-4">
              <div className="text-xs text-gray-600 mb-1">Location</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="text-xs text-gray-400 truncate">{location ? location.address : "Not available"}</span>
              </div>
            </div>
            {/* Evidence */}
            {files.length > 0 && (
              <div className="flex items-center justify-between p-4">
                <span className="text-xs text-gray-600">Evidence</span>
                <span className="text-xs text-white font-medium">{files.length} file(s) attached</span>
              </div>
            )}
          </div>

          {/* PoP-ID Preview */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/[0.05] to-blue-500/[0.03] border border-cyan-500/10">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <Fingerprint className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="text-[10px] text-gray-600 uppercase tracking-wider">PoP-ID Preview</div>
              <div className="text-xs text-cyan-400/70 font-mono">pop://.../{category || "category"}/hash</div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/15 text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          {/* Nav */}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-gray-400 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button type="button" onClick={handleSubmit} disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-sm text-white disabled:opacity-30 hover:opacity-90 transition-all shadow-lg shadow-cyan-500/15">
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>) : (<><Send className="w-4 h-4" /> Submit to Network</>)}
            </button>
          </div>

          <p className="text-[10px] text-gray-700 text-center flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            By submitting, you agree to the PoPP Protocol terms. All submissions are cryptographically hashed.
          </p>
        </div>
      )}
    </div>
  );
}
