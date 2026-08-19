"use client";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Globe, Shield, Zap, Loader2 } from "lucide-react";

const ProblemMap = dynamic(() => import("@/components/ProblemMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0f1a] rounded-2xl border border-white/[0.06]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        <span className="text-sm text-gray-500">Loading live map...</span>
      </div>
    </div>
  ),
});

const BACKEND_API = "https://popp.thharko.com";
const CHAIN_API = "https://chain.thharko.com";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "#3b82f6",
  VALIDATING: "#f59e0b",
  VALIDATED: "#22c55e",
  PROVEN: "#a855f7",
  ESCALATED: "#f97316",
  RESOLVED: "#06b6d4",
  REJECTED: "#ef4444",
};

interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  category: string;
  status: string;
  color: string;
  source: "chain" | "backend";
  media_url?: string;
}

export default function LiveMapSection() {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [backendRes, chainRes] = await Promise.allSettled([
          fetch(`${BACKEND_API}/api/submissions`).then((r) => r.json()),
          fetch(`${CHAIN_API}/popp/ticket/tickets?pagination.limit=100`).then((r) => r.json()),
        ]);

        const allMarkers: MapMarker[] = [];
        const seenLocations = new Set<string>(); // dedupe by location proximity

        // Helper to parse lat/lng from chain ticket location string "12.9716,77.5946"
        const parseLocation = (loc: string): { lat: number; lng: number } | null => {
          if (!loc) return null;
          const parts = loc.split(",").map((s: string) => parseFloat(s.trim()));
          if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && Math.abs(parts[0]) > 0.001 && Math.abs(parts[1]) > 0.001) {
            return { lat: parts[0], lng: parts[1] };
          }
          return null;
        };

        // Backend submissions — response shape: { value: [...], Count: N } or direct array
        const backendData = backendRes.status === "fulfilled" ? backendRes.value : null;
        const backendList = Array.isArray(backendData) ? backendData : (backendData?.value || []);
        if (Array.isArray(backendList)) {
          backendList.forEach((s: any) => {
            const lat = parseFloat(s.latitude || s.lat);
            const lng = parseFloat(s.longitude || s.lng || s.lon);
            if (lat && lng && Math.abs(lat) > 0.001 && Math.abs(lng) > 0.001) {
              const locKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
              seenLocations.add(locKey);
              allMarkers.push({
                id: s.id || `backend-${Math.random()}`,
                latitude: lat,
                longitude: lng,
                title: s.title || s.description?.slice(0, 60) || "Untitled Problem",
                description: s.description || "",
                category: (s.category || "other").toLowerCase(),
                status: (s.status || "SUBMITTED").toUpperCase(),
                color: STATUS_COLORS[(s.status || "SUBMITTED").toUpperCase()] || "#3b82f6",
                source: "backend",
                media_url: s.media_url || undefined,
              });
            }
          });
        }

        // Chain tickets — location is a string like "12.9716,77.5946"
        if (chainRes.status === "fulfilled" && chainRes.value?.tickets) {
          chainRes.value.tickets.forEach((t: any) => {
            // Try separate lat/lng fields first, then parse location string
            let lat = parseFloat(t.latitude || t.lat);
            let lng = parseFloat(t.longitude || t.lng || t.lon);
            if ((!lat || !lng) && t.location) {
              const parsed = parseLocation(t.location);
              if (parsed) { lat = parsed.lat; lng = parsed.lng; }
            }
            if (lat && lng && Math.abs(lat) > 0.001 && Math.abs(lng) > 0.001) {
              const locKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
              // Skip if we already have a backend submission at same location
              if (!seenLocations.has(locKey)) {
                seenLocations.add(locKey);
                allMarkers.push({
                  id: t.id,
                  latitude: lat,
                  longitude: lng,
                  title: t.description?.slice(0, 60) || "Untitled Problem",
                  description: t.description || "",
                  category: (t.category || "other").toLowerCase(),
                  status: (t.status || "SUBMITTED").toUpperCase(),
                  color: STATUS_COLORS[(t.status || "SUBMITTED").toUpperCase()] || "#3b82f6",
                  source: "chain",
                });
              }
            }
          });
        }

        setMarkers(allMarkers);
        setError(allMarkers.length === 0 ? "No location data available" : "");
      } catch (err: any) {
        setError(err.message || "Failed to load map data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Stats
  const stats = useMemo(() => {
    const validated = markers.filter((m) => ["VALIDATED", "PROVEN", "RESOLVED"].includes(m.status)).length;
    const categories = new Set(markers.map((m) => m.category)).size;
    return { total: markers.length, validated, categories };
  }, [markers]);

  return (
    <section className="py-24 px-6 bg-[#0a0e1a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/15 rounded-full text-xs text-cyan-400 mb-4">
            <Globe className="w-3.5 h-3.5" />
            Live Protocol Activity
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Problems Being <span className="text-cyan-400">Proven</span> in Real-Time
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Every pin represents a real-world problem submitted, validated, and proven through the PoPP protocol.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {[
            { label: "Total Problems", value: loading ? "..." : stats.total, icon: MapPin, iconBg: "bg-cyan-500/10", iconText: "text-cyan-400" },
            { label: "Validated", value: loading ? "..." : stats.validated, icon: Shield, iconBg: "bg-green-500/10", iconText: "text-green-400" },
            { label: "Categories", value: loading ? "..." : stats.categories, icon: Globe, iconBg: "bg-blue-500/10", iconText: "text-blue-400" },
            { label: "Sources", value: loading ? "..." : (markers.filter(m => m.source === "backend").length > 0 && markers.filter(m => m.source === "chain").length > 0 ? "2" : markers.length > 0 ? "1" : "0"), icon: Zap, iconBg: "bg-amber-500/10", iconText: "text-amber-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                <stat.icon className={`w-4 h-4 ${stat.iconText}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
          style={{ height: "480px" }}
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-[#0a0f1a]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <span className="text-sm text-gray-500">Fetching live problem data...</span>
              </div>
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center bg-[#0a0f1a]">
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <MapPin className="w-8 h-8 text-gray-600" />
                <span className="text-sm text-gray-500">{error}</span>
              </div>
            </div>
          ) : (
            <ProblemMap markers={markers} />
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <a
            href="/report"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-sm text-white shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/25 transition-all"
          >
            <MapPin className="w-4 h-4" />
            Submit a Problem in Your Area
          </a>
        </motion.div>
      </div>
    </section>
  );
}
