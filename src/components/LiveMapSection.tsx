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
const OSRM_API = "https://router.project-osrm.org";

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

export interface RoadSegment {
  id: string;
  coordinates: [number, number][]; // [lat, lng][]
  color: string;
  status: string;
  problemIds: string[];
}

/* Haversine distance in km */
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* Offset a point by ~distKm in a given bearing direction */
function offsetPoint(lat: number, lng: number, bearingDeg: number, distKm: number): [number, number] {
  const R = 6371;
  const brng = (bearingDeg * Math.PI) / 180;
  const lat1 = (lat * Math.PI) / 180;
  const lng1 = (lng * Math.PI) / 180;
  const d = distKm / R;
  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng));
  const lng2 = lng1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
  return [(lat2 * 180) / Math.PI, (lng2 * 180) / Math.PI];
}

/* Snap a single point to the nearest road via OSRM */
async function snapToRoad(lat: number, lng: number): Promise<{ lat: number; lng: number } | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(
      `${OSRM_API}/nearest/v1/driving/${lng},${lat}?number=2`,
      { signal: ctrl.signal }
    );
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.waypoints || data.waypoints.length < 2) return null;
    const wp = data.waypoints[0];
    return { lat: wp.location[1], lng: wp.location[0] };
  } catch {
    return null;
  }
}

/* Build road segments by snapping markers to roads via OSRM */
async function buildRoadSegments(markers: MapMarker[]): Promise<RoadSegment[]> {
  const SEGMENT_LENGTH_KM = 0.15; // 150m visible road segment
  const MERGE_DISTANCE_KM = 0.25; // merge snapped points within 250m

  // Limit OSRM calls to avoid rate limiting
  const toSnap = markers.slice(0, 60);
  const snapped: { lat: number; lng: number; marker: MapMarker }[] = [];

  // Process sequentially to be gentle on the free demo server
  for (const m of toSnap) {
    const result = await snapToRoad(m.latitude, m.longitude);
    if (result) {
      snapped.push({ ...result, marker: m });
    }
  }

  if (snapped.length === 0) return [];

  // Group nearby snapped points (same road segment)
  const groups: { lat: number; lng: number; color: string; status: string; ids: string[] }[] = [];
  for (const s of snapped) {
    let merged = false;
    for (const g of groups) {
      if (haversine(s.lat, s.lng, g.lat, g.lng) < MERGE_DISTANCE_KM) {
        g.ids.push(s.marker.id);
        // Average the position
        g.lat = (g.lat * (g.ids.length - 1) + s.lat) / g.ids.length;
        g.lng = (g.lng * (g.ids.length - 1) + s.lng) / g.ids.length;
        merged = true;
        break;
      }
    }
    if (!merged) {
      groups.push({
        lat: s.lat,
        lng: s.lng,
        color: s.marker.color,
        status: s.marker.status,
        ids: [s.marker.id],
      });
    }
  }

  // Create road segments with bearing estimates
  return groups.map((g, i) => {
    // Estimate bearing from nearby points or use varied angles
    let bearing = 45 + (i * 37) % 180; // Spread bearings to look natural
    // If we have multiple nearby original points, estimate road direction
    if (g.ids.length >= 2) {
      const origPts = markers.filter((m) => g.ids.includes(m.id));
      if (origPts.length >= 2) {
        const dLng = origPts[1].longitude - origPts[0].longitude;
        const dLat = origPts[1].latitude - origPts[0].latitude;
        bearing = (Math.atan2(dLng, dLat) * 180) / Math.PI;
      }
    }

    const halfDist = SEGMENT_LENGTH_KM / 2;
    const p1 = offsetPoint(g.lat, g.lng, bearing, halfDist);
    const p2 = offsetPoint(g.lat, g.lng, bearing + 180, halfDist);

    return {
      id: `road-${i}`,
      coordinates: [p1, [g.lat, g.lng], p2] as [number, number][],
      color: g.color,
      status: g.status,
      problemIds: g.ids,
    };
  });
}

export default function LiveMapSection() {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [roadSegments, setRoadSegments] = useState<RoadSegment[]>([]);
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
        const seenLocations = new Set<string>();

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

        // Build road segments in background — only for road-related problems
        const ROAD_CATEGORIES = ["road", "infrastructure", "transport"];
        const roadMarkers = allMarkers.filter((m) =>
          ROAD_CATEGORIES.includes(m.category?.toLowerCase())
        );
        if (roadMarkers.length > 0) {
          buildRoadSegments(roadMarkers).then((segments) => {
            setRoadSegments(segments);
          });
        }
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
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0e1a] relative overflow-hidden">
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
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Problems Being <span className="text-cyan-400">Proven</span> in Real-Time
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
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
          className="relative rounded-2xl overflow-hidden border border-white/[0.06] h-[300px] sm:h-[400px] lg:h-[480px]"
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
            <ProblemMap markers={markers} roadSegments={roadSegments} />
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
