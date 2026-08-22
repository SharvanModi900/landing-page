"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ProblemMarker {
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

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "#3b82f6",
  VALIDATING: "#f59e0b",
  VALIDATED: "#22c55e",
  PROVEN: "#a855f7",
  ESCALATED: "#f97316",
  RESOLVED: "#06b6d4",
  REJECTED: "#ef4444",
};

const CATEGORY_ICONS: Record<string, string> = {
  road: "🛣️",
  water: "💧",
  electricity: "⚡",
  environment: "🌿",
  health: "🏥",
  education: "📚",
  governance: "🏛️",
  other: "📋",
};

function FitBounds({ markers }: { markers: ProblemMarker[] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const validMarkers = markers.filter(
        (m) => m.latitude && m.longitude && Math.abs(m.latitude) > 0.001 && Math.abs(m.longitude) > 0.001
      );
      if (validMarkers.length > 0) {
        const bounds = L.latLngBounds(
          validMarkers.map((m) => [m.latitude, m.longitude] as [number, number])
        );
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
      }
    }
  }, [markers, map]);
  return null;
}

/** Captures the map instance for parent-level cleanup */
function MapInstanceCapture({ onCreated }: { onCreated: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onCreated(map);
  }, [map, onCreated]);
  return null;
}

interface RoadSegment {
  id: string;
  coordinates: [number, number][];
  color: string;
  status: string;
  problemIds: string[];
}

interface ProblemMapProps {
  markers: ProblemMarker[];
  roadSegments?: RoadSegment[];
  onMarkerClick?: (id: string) => void;
  visible?: boolean;
}

export default function ProblemMap({ markers, roadSegments = [], onMarkerClick, visible = true }: ProblemMapProps) {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showSettings, setShowSettings] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // When map becomes visible, tell Leaflet to recalculate dimensions
  useEffect(() => {
    if (visible && mapRef.current) {
      // Delay slightly to ensure the container has fully transitioned to visible
      const timer = setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const validMarkers = markers.filter(
    (m) => m.latitude && m.longitude && Math.abs(m.latitude) > 0.001 && Math.abs(m.longitude) > 0.001
  );

  // IDs of problems already shown as road segments (no need for teardrop)
  const roadSnappedIds = useMemo(() => {
    const ids = new Set<string>();
    roadSegments.forEach((seg) => seg.problemIds.forEach((id) => ids.add(id)));
    return ids;
  }, [roadSegments]);

  // Filter markers by category
  const filteredMarkers = useMemo(() => {
    if (activeFilter === "all") return validMarkers;
    return validMarkers.filter((m) => m.category?.toLowerCase() === activeFilter.toLowerCase());
  }, [validMarkers, activeFilter]);

  // Count by status
  const statusCounts = useMemo(() => {
    return filteredMarkers.reduce((acc, m) => {
      const status = m.status?.toUpperCase() || "UNKNOWN";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredMarkers]);

  // Count by category
  const categoryCounts = useMemo(() => {
    return validMarkers.reduce((acc, m) => {
      const cat = m.category?.toLowerCase() || "other";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [validMarkers]);

  // Get unique categories with markers
  const availableCategories = useMemo(() => {
    return Object.keys(categoryCounts).filter((cat) => categoryCounts[cat] > 0);
  }, [categoryCounts]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0f1a]">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%", background: "#0a0f1a" }}
        zoomControl={false}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <MapInstanceCapture onCreated={(map) => { mapRef.current = map; }} />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <FitBounds markers={filteredMarkers} />

        {/* Road segments — colored polylines snapped to actual roads */}
        {roadSegments.map((seg) => (
          <React.Fragment key={seg.id}>
            {/* Glow layer */}
            <Polyline
              positions={seg.coordinates}
              pathOptions={{
                color: seg.color,
                weight: 10,
                opacity: 0.15,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
            {/* Main road line */}
            <Polyline
              positions={seg.coordinates}
              pathOptions={{
                color: seg.color,
                weight: 4,
                opacity: 0.85,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
            {/* Snapped position dot */}
            <CircleMarker
              center={seg.coordinates[1] || seg.coordinates[0]}
              radius={5}
              pathOptions={{
                color: "#fff",
                weight: 2,
                fillColor: seg.color,
                fillOpacity: 0.9,
              }}
            >
              <Popup className="popp-popup">
                <div className="p-1 min-w-[180px]">
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider"
                    style={{
                      backgroundColor: seg.color + "25",
                      color: seg.color,
                      border: `1.5px solid ${seg.color}50`,
                    }}
                  >
                    {seg.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{seg.problemIds.length} problem(s) on this road segment</p>
                </div>
              </Popup>
            </CircleMarker>
          </React.Fragment>
        ))}

        {filteredMarkers
          .filter((m) => !roadSnappedIds.has(m.id)) // hide teardrops for road-snapped problems
          .map((marker) => {
          const pinIcon = L.divIcon({
            className: 'popp-pin-wrapper',
            html: `<div class="popp-pin-marker"><div class="popp-pin-body" style="background:${marker.color};"></div><div class="popp-pin-icon">!</div></div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
          });
          return (
            <Marker
              key={marker.id}
              position={[marker.latitude, marker.longitude]}
              icon={pinIcon}
              eventHandlers={{
                click: () => onMarkerClick?.(marker.id),
              }}
            >
              <Popup className="popp-popup">
                <div className="p-1 min-w-[220px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider"
                      style={{
                        backgroundColor: marker.color + "25",
                        color: marker.color,
                        border: `1.5px solid ${marker.color}50`,
                      }}
                    >
                      {marker.status}
                    </span>
                    <span className="text-[9px] text-gray-400 uppercase font-medium bg-gray-100 px-1.5 py-0.5 rounded">
                      {marker.source}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mb-1 text-gray-900 leading-tight">{marker.title}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{marker.description}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 capitalize flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: marker.color }}></span>
                      {CATEGORY_ICONS[marker.category?.toLowerCase()] || "📋"} {marker.category}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Top Stats Badge */}
      <div className="absolute top-4 left-4 z-[1000] bg-black/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
          <span className="text-sm font-semibold text-gray-200">
            {filteredMarkers.length} problems
          </span>
        </div>
      </div>

      {/* Settings Menu Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`absolute top-4 right-14 z-[1000] w-10 h-10 flex items-center justify-center rounded-xl transition-all backdrop-blur-md ${
          showSettings
            ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
            : "bg-black/70 border border-white/10 text-gray-400 hover:text-gray-200"
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-1">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="w-10 h-10 bg-black/70 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/90 transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="w-10 h-10 bg-black/70 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/90 transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 z-[1000] w-[calc(100%-2rem)] sm:w-72 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Map Settings</h3>
            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {/* Heatmap Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                  <path d="M12 2c.5 3.5-1.5 6-1.5 9a4.5 4.5 0 0 0 9 0c0-3-2-5.5-1.5-9"></path>
                </svg>
                <span className="text-sm text-gray-200">Heatmap Mode</span>
              </div>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`w-11 h-6 rounded-full transition-all ${
                  showHeatmap ? "bg-cyan-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    showHeatmap ? "translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Legend Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                <span className="text-sm text-gray-200">Show Legend</span>
              </div>
              <button
                onClick={() => setShowLegend(!showLegend)}
                className={`w-11 h-6 rounded-full transition-all ${
                  showLegend ? "bg-cyan-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    showLegend ? "translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Category Filter */}
            {availableCategories.length > 1 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span className="text-sm text-gray-200">Filter by Category</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      activeFilter === "all"
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:text-gray-200"
                    }`}
                  >
                    All ({validMarkers.length})
                  </button>
                  {availableCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                        activeFilter === cat
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                          : "bg-white/5 text-gray-400 border border-white/10 hover:text-gray-200"
                      }`}
                    >
                      {CATEGORY_ICONS[cat] || "📋"} {cat} ({categoryCounts[cat]})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Status Legend (inline) */}
            {showLegend && Object.keys(statusCounts).length > 0 && (
              <div className="pt-3 border-t border-white/10">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Status Legend</div>
                <div className="space-y-1.5">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-white/30"
                          style={{ backgroundColor: STATUS_COLORS[status] || "#6b7280" }}
                        ></span>
                        <span className="text-xs text-gray-300 capitalize">{status.toLowerCase()}</span>
                      </div>
                      <span className="text-xs text-gray-500">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Legend (if enabled) */}
      {showLegend && Object.keys(statusCounts).length > 0 && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-black/80 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/10 max-w-[280px]">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-medium">Status</div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: STATUS_COLORS[status] || "#6b7280" }}
                ></span>
                <span className="text-[10px] text-gray-300 capitalize">
                  {status.toLowerCase()} ({count})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        .popp-pin-wrapper {
          background: none !important;
          border: none !important;
        }
        .popp-pin-marker {
          position: relative;
          width: 30px;
          height: 42px;
          filter: drop-shadow(0 3px 5px rgba(0,0,0,0.4));
          transition: transform 0.15s ease;
        }
        .popp-pin-marker:hover {
          transform: scale(1.15);
        }
        .popp-pin-body {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          position: absolute;
          top: 0;
          left: 0;
          border: 2.5px solid #fff;
        }
        .popp-pin-icon {
          position: absolute;
          top: 4px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 15px;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
          z-index: 2;
          line-height: 1;
        }
        .popp-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .popp-popup .leaflet-popup-content {
          margin: 8px;
        }
        .popp-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
}
