"use client";
import { useState, useEffect, useMemo } from "react";
import { Activity, TrendingUp, Users, Clock } from "lucide-react";

const BACKEND_API = "https://popp.thharko.com";

interface HourData {
  hour: string;
  visitors: number;
}

export default function VisitorChart() {
  const [data, setData] = useState<HourData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_API}/api/visitors/analytics`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setData(Array.isArray(d) ? d : []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  // Summary stats
  const stats = useMemo(() => {
    if (data.length === 0) return { total: 0, peak: 0, peakHour: "--", avg: 0 };
    const total = data.reduce((s, d) => s + d.visitors, 0);
    const peak = Math.max(...data.map((d) => d.visitors));
    const peakEntry = data.find((d) => d.visitors === peak);
    const avg = total > 0 ? Math.round((total / data.filter((d) => d.visitors > 0).length) * 10) / 10 : 0;
    return { total, peak, peakHour: peakEntry?.hour || "--", avg };
  }, [data]);

  // SVG chart dimensions
  const W = 600;
  const H = 120;
  const PAD = 4;

  const { pathD, areaD, points } = useMemo(() => {
    if (data.length === 0) return { pathD: "", areaD: "", points: [] };
    const max = Math.max(...data.map((d) => d.visitors), 1);
    const stepX = (W - PAD * 2) / (data.length - 1 || 1);

    const pts = data.map((d, i) => ({
      x: PAD + i * stepX,
      y: H - PAD - ((d.visitors / max) * (H - PAD * 2)),
      visitors: d.visitors,
      hour: d.hour,
    }));

    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    const area = `${line} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;

    return { pathD: line, areaD: area, points: pts };
  }, [data]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-white/[0.06] rounded animate-pulse" />
          </div>
          <div className="h-[120px] bg-white/[0.03] rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Visitor Activity</h3>
              <p className="text-[11px] text-gray-500">Last 24 hours</p>
            </div>
          </div>

          {/* Mini stats */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-emerald-400" />
              <span className="text-gray-400">Total: <span className="text-white font-semibold">{stats.total}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-cyan-400" />
              <span className="text-gray-400">Peak: <span className="text-white font-semibold">{stats.peak}</span></span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-purple-400" />
              <span className="text-gray-400">@ <span className="text-white font-semibold">{stats.peakHour}:00</span></span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        {data.length > 0 ? (
          <div className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path d={areaD} fill="url(#chartGrad)" />
              {/* Line */}
              <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Data points */}
              {points.filter((p) => p.visitors > 0).map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3" fill="#06b6d4" stroke="#030712" strokeWidth="1.5" />
              ))}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-1 px-1">
              {data.length > 0 && (
                <>
                  <span className="text-[9px] text-gray-400">{data[0]?.hour}:00</span>
                  <span className="text-[9px] text-gray-400">{data[Math.floor(data.length / 2)]?.hour}:00</span>
                  <span className="text-[9px] text-gray-400">{data[data.length - 1]?.hour}:00</span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="h-[120px] flex items-center justify-center bg-white/[0.02] rounded-lg border border-dashed border-white/[0.06]">
            <p className="text-xs text-gray-400">No visitor data yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
