"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Coins, CheckCircle2, TrendingUp, ArrowRight, Clock, Sparkles } from "lucide-react";

const BACKEND_API = "https://popp.thharko.com";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
interface RecentSubmission {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  landmark_name?: string;
}

interface ResolutionStats {
  total_resolutions: number;
  fixed_count: number;
  total_rewards: number;
  total_submitter_rewards: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const CATEGORY_COLORS: Record<string, string> = {
  infrastructure: "text-orange-400 bg-orange-500/10",
  governance: "text-purple-400 bg-purple-500/10",
  environment: "text-emerald-400 bg-emerald-500/10",
  safety: "text-red-400 bg-red-500/10",
  transport: "text-blue-400 bg-blue-500/10",
  water: "text-cyan-400 bg-cyan-500/10",
  other: "text-gray-400 bg-white/5",
};

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function LiveActivityFeed() {
  const [submissions, setSubmissions] = useState<RecentSubmission[]>([]);
  const [stats, setStats] = useState<ResolutionStats | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      fetch(`${BACKEND_API}/api/submissions`).then((r) => r.ok ? r.json() : []),
      fetch(`${BACKEND_API}/api/resolutions/stats`).then((r) => r.ok ? r.json() : null),
    ]).then(([subsResult, statsResult]) => {
      const subs = subsResult.status === "fulfilled" && Array.isArray(subsResult.value)
        ? subsResult.value.slice(0, 10).map((s: any) => ({
            id: s.id,
            title: s.title || s.description?.slice(0, 60) || "Untitled problem",
            category: (s.category || "other").toLowerCase(),
            status: (s.status || "submitted").toLowerCase(),
            created_at: s.created_at,
            landmark_name: s.landmark_name,
          }))
        : [];
      setSubmissions(subs);

      if (statsResult.status === "fulfilled" && statsResult.value) {
        setStats(statsResult.value);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Auto-rotate ticker
  const rotateTicker = useCallback(() => {
    if (submissions.length <= 1) return;
    setActiveIdx((prev) => (prev + 1) % submissions.length);
  }, [submissions.length]);

  useEffect(() => {
    if (submissions.length === 0) return;
    const timer = setInterval(rotateTicker, 4000);
    return () => clearInterval(timer);
  }, [submissions.length, rotateTicker]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 h-36 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-xs text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Live Protocol Pulse
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Real-Time <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Impact</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Live Activity Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="md:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
            <span className="ml-auto text-[10px] text-gray-600 flex items-center gap-1">
              <Clock className="w-3 h-3" /> auto-refreshing
            </span>
          </div>

          {submissions.length > 0 ? (
            <div className="relative h-20 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  {/* Status dot */}
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    submissions[activeIdx]?.status === "resolved" ? "bg-emerald-400" :
                    submissions[activeIdx]?.status === "validated" ? "bg-blue-400" :
                    "bg-amber-400 animate-pulse"
                  }`} />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white font-medium truncate">
                      {submissions[activeIdx]?.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                        CATEGORY_COLORS[submissions[activeIdx]?.category] || CATEGORY_COLORS.other
                      }`}>
                        {submissions[activeIdx]?.category}
                      </span>
                      {submissions[activeIdx]?.landmark_name && (
                        <span className="text-[10px] text-gray-500 truncate">
                          near {submissions[activeIdx]?.landmark_name}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-600 ml-auto flex-shrink-0">
                        {timeAgo(submissions[activeIdx]?.created_at || "")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1">
                {submissions.slice(0, 6).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === activeIdx ? "bg-cyan-400 w-3" : "bg-white/10 hover:bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center">
              <p className="text-xs text-gray-600">Waiting for first submission...</p>
            </div>
          )}
        </motion.div>

        {/* 2. Sat Mudra Distributed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-gradient-to-br from-amber-500/[0.06] to-orange-500/[0.03] border border-amber-500/[0.1] rounded-2xl p-5 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Sat Mudra Earned</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {stats && stats.total_rewards > 0 ? formatNum(stats.total_rewards) : "—"}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              {stats && stats.total_submitter_rewards > 0
                ? `${formatNum(stats.total_submitter_rewards)} to submitters`
                : "distributed to contributors"}
            </p>
          </div>
        </motion.div>

        {/* 3. Problems Resolved */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-gradient-to-br from-emerald-500/[0.06] to-teal-500/[0.03] border border-emerald-500/[0.1] rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Problems Resolved</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats && stats.fixed_count > 0 ? stats.fixed_count : "—"}
          </div>
          <div className="flex items-center gap-3 mt-2">
            {stats && stats.total_resolutions > 0 && (
              <>
                <span className="text-[11px] text-emerald-400/70">
                  {stats.fixed_count} fixed
                </span>
                <span className="text-[11px] text-gray-600">·</span>
                <span className="text-[11px] text-gray-500">
                  {stats.total_resolutions} total actions
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* 4. Network Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="md:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Protocol Stats</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-lg font-bold text-white">{submissions.length}</div>
              <div className="text-[10px] text-gray-500">Total Submissions</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {submissions.filter((s) => s.status === "resolved").length}
              </div>
              <div className="text-[10px] text-gray-500">Resolved</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {new Set(submissions.map((s) => s.category)).size}
              </div>
              <div className="text-[10px] text-gray-500">Categories</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
