"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, Users, Ticket, Shield, TrendingUp, ExternalLink, PenLine } from "lucide-react";
import Link from "next/link";

const BACKEND_API = "https://popp.thharko.com";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
interface Testimonial {
  id: string;
  display_name: string;
  role: string;
  quote: string;
  stars: number;
  contribution_label: string | null;
  avatar_initials: string;
  gradient_from: string;
  created_at: string;
}

/* ------------------------------------------------------------------ */
/*  Gradient map                                                      */
/* ------------------------------------------------------------------ */
const GRADIENTS: Record<string, string> = {
  cyan: "from-cyan-500 to-blue-600",
  emerald: "from-emerald-500 to-teal-600",
  purple: "from-purple-500 to-indigo-600",
  orange: "from-orange-500 to-red-600",
  pink: "from-pink-500 to-rose-600",
  yellow: "from-yellow-500 to-amber-600",
};

/* ------------------------------------------------------------------ */
/*  Stats (fetched from API)                                          */
/* ------------------------------------------------------------------ */
interface LiveStats {
  problemsSubmitted: number;
  activeValidators: number;
  communityMembers: number;
  validationAccuracy: number;
}

const DEFAULT_STATS: LiveStats = {
  problemsSubmitted: 0,
  activeValidators: 0,
  communityMembers: 0,
  validationAccuracy: 0,
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveStats, setLiveStats] = useState<LiveStats>(DEFAULT_STATS);

  useEffect(() => {
    // Fetch testimonials
    fetch(`${BACKEND_API}/api/testimonials`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));

    // Fetch live stats
    Promise.allSettled([
      fetch(`${BACKEND_API}/api/submissions`).then((r) => r.ok ? r.json() : []),
      fetch(`${BACKEND_API}/api/validators/status`).then((r) => r.ok ? r.json() : null),
    ]).then(([subsResult, valResult]) => {
      const submissions = subsResult.status === "fulfilled" ? (Array.isArray(subsResult.value) ? subsResult.value : []) : [];
      const validators = valResult.status === "fulfilled" ? (valResult.value ? (Array.isArray(valResult.value) ? valResult.value : [valResult.value]) : []) : [];

      // Unique submitters for community count
      const uniqueSubmitters = new Set(submissions.map((s: any) => s.submitter || s.user_id || s.chain_tx_hash).filter(Boolean));

      // Validation accuracy: avg consensus_score from submissions that have been validated
      const validated = submissions.filter((s: any) => s.consensus_score != null && s.consensus_score > 0);
      const avgAccuracy = validated.length > 0
        ? validated.reduce((sum: number, s: any) => sum + (s.consensus_score || 0), 0) / validated.length
        : 0;

      setLiveStats({
        problemsSubmitted: submissions.length,
        activeValidators: Array.isArray(validators) ? validators.length : 0,
        communityMembers: uniqueSubmitters.size,
        validationAccuracy: Math.round(avgAccuracy * 10) / 10,
      });
    }).catch(() => {});
  }, []);

  const formatNum = (n: number) => n.toLocaleString();

  const statsDisplay = [
    { icon: Ticket, value: liveStats.problemsSubmitted > 0 ? `${formatNum(liveStats.problemsSubmitted)}+` : "—", label: "Problems Submitted", color: "text-cyan-400" },
    { icon: Shield, value: liveStats.activeValidators > 0 ? `${formatNum(liveStats.activeValidators)}+` : "—", label: "Active Validators", color: "text-blue-400" },
    { icon: Users, value: liveStats.communityMembers > 0 ? `${formatNum(liveStats.communityMembers)}+` : "—", label: "Community Members", color: "text-emerald-400" },
    { icon: TrendingUp, value: liveStats.validationAccuracy > 0 ? `${liveStats.validationAccuracy}%` : "—", label: "Validation Accuracy", color: "text-purple-400" },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#030712] via-[#050a18] to-[#030712]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
            <Star className="w-4 h-4 text-yellow-400" />
            Community Voices
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Contributors
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real stories from validators, contributors, and governance participants building transparent systems with PoPP.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {statsDisplay.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-center hover:border-white/[0.13] transition-colors"
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <Quote className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Be the First to Share</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
              No testimonials yet. Share your experience with PoPP and help others understand the impact.
            </p>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-sm font-semibold text-white"
            >
              <PenLine className="w-4 h-4" />
              Write a Testimonial
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, idx) => {
                const gradient = GRADIENTS[t.gradient_from] || GRADIENTS.cyan;
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.15] hover:bg-white/[0.05] transition-all"
                  >
                    {/* Quote */}
                    <div className="flex items-start gap-3 mb-4">
                      <Quote className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300 leading-relaxed">{t.quote}</p>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                      <div
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                      >
                        {t.avatar_initials || t.display_name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-white truncate">{t.display_name}</div>
                        <div className="text-[11px] text-gray-500">{t.role}</div>
                      </div>
                    </div>

                    {/* Contribution badge */}
                    {t.contribution_label && (
                      <div className="mt-3 px-2.5 py-1 bg-white/[0.04] rounded-md">
                        <span className="text-[10px] text-gray-400 font-medium">{t.contribution_label}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mt-10"
            >
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 hover:border-yellow-500/50 rounded-lg text-sm font-semibold text-yellow-300 transition-colors"
              >
                <PenLine className="w-4 h-4" />
                Share Your Story
              </Link>
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] rounded-lg text-sm font-semibold text-gray-200 transition-colors"
              >
                View Leaderboard
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
