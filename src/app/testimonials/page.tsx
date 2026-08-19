"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PenLine, Star, Quote, CheckCircle, Clock, AlertCircle,
  Wallet, Copy, Check, TrendingUp, Award, Ticket,
  Shield, ChevronDown, ChevronUp, ExternalLink, Trophy
} from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet";

const BACKEND_API = "https://popp.thharko.com";

const ROLES = [
  "Community Member", "Validator", "Domain Expert",
  "DAO Governance Lead", "Early Adopter", "Developer", "Researcher",
];

const GRADIENTS = [
  { value: "cyan", label: "Cyan → Blue" },
  { value: "emerald", label: "Emerald → Teal" },
  { value: "purple", label: "Purple → Indigo" },
  { value: "orange", label: "Orange → Red" },
  { value: "pink", label: "Pink → Rose" },
  { value: "yellow", label: "Yellow → Amber" },
];

const GRADIENT_MAP: Record<string, string> = {
  cyan: "from-cyan-500 to-blue-600",
  emerald: "from-emerald-500 to-teal-600",
  purple: "from-purple-500 to-indigo-600",
  orange: "from-orange-500 to-red-600",
  pink: "from-pink-500 to-rose-600",
  yellow: "from-yellow-500 to-amber-600",
};

interface MyTestimonial {
  id: string;
  display_name: string;
  role: string;
  quote: string;
  stars: number;
  status: string;
  contribution_label: string | null;
  created_at: string;
}

interface PublicTestimonial {
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

interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: "bronze" | "silver" | "gold" | "platinum";
  earned_at?: string;
}

const BADGE_COLORS: Record<string, string> = {
  bronze: "#e8a04c",
  silver: "#c0c0c0",
  gold: "#ffd700",
  platinum: "#b8d4e3",
};

const BADGE_BG: Record<string, string> = {
  bronze: "rgba(232,160,76,0.12)",
  silver: "rgba(192,192,192,0.12)",
  gold: "rgba(255,215,0,0.12)",
  platinum: "rgba(184,212,227,0.12)",
};

const BADGE_BORDER: Record<string, string> = {
  bronze: "rgba(232,160,76,0.25)",
  silver: "rgba(192,192,192,0.25)",
  gold: "rgba(255,215,0,0.25)",
  platinum: "rgba(184,212,227,0.25)",
};

// Map Ionicon names to Lucide icons (fallback to Award)
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "paper-plane": Ticket,
  "eye": Shield,
  "megaphone-outline": Award,
  "school-outline": TrendingUp,
  "alert-circle-outline": AlertCircle,
  "checkmark-done-circle-outline": CheckCircle,
  "business-outline": Shield,
  "shield-checkmark-outline": Shield,
  "star": Star,
  "trophy": Trophy,
};

function getBadgeIcon(name: string) {
  return ICON_MAP[name] || Award;
}

const LEVEL_LABELS = ["Candidate", "Community", "Domain Expert", "Institutional", "Autonomous", "Emergency"];

export default function TestimonialsPage() {
  const { connected, connect, getAuthHeaders, user, address } = useWallet();

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("Community Member");
  const [quote, setQuote] = useState("");
  const [stars, setStars] = useState(5);
  const [gradientFrom, setGradientFrom] = useState("cyan");

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [myTestimonials, setMyTestimonials] = useState<MyTestimonial[]>([]);
  const [hoverStar, setHoverStar] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Public testimonials
  const [publicTestimonials, setPublicTestimonials] = useState<PublicTestimonial[]>([]);
  const [publicLoading, setPublicLoading] = useState(true);

  // User badges (same as mobile app)
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [badgesLoading, setBadgesLoading] = useState(true);

  // Fetch public testimonials
  useEffect(() => {
    fetch(`${BACKEND_API}/api/testimonials`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPublicTestimonials(Array.isArray(data) ? data : []))
      .catch(() => setPublicTestimonials([]))
      .finally(() => setPublicLoading(false));
  }, []);

  // Fetch user's testimonials when connected
  useEffect(() => {
    if (!connected) return;
    fetch(`${BACKEND_API}/api/testimonials/mine`, { headers: getAuthHeaders() })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setMyTestimonials(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [connected, getAuthHeaders]);

  // Fetch user badges (same endpoint as mobile app)
  useEffect(() => {
    if (!connected) return;
    setBadgesLoading(true);
    fetch(`${BACKEND_API}/api/users/me/badges`, { headers: getAuthHeaders() })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setUserBadges(Array.isArray(data) ? data : data?.badges || []))
      .catch(() => setUserBadges([]))
      .finally(() => setBadgesLoading(false));
  }, [connected, getAuthHeaders]);

  // Pre-fill display name from wallet user
  useEffect(() => {
    if (user?.display_name) setDisplayName(user.display_name);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch(`${BACKEND_API}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          display_name: displayName || undefined,
          role, quote: quote.trim(), stars,
          contribution_label: autoBadge || undefined,
          gradient_from: gradientFrom,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || "Testimonial submitted! It will appear after admin approval.");
        setQuote("");
        fetch(`${BACKEND_API}/api/testimonials/mine`, { headers: getAuthHeaders() })
          .then((r) => (r.ok ? r.json() : []))
          .then((d) => setMyTestimonials(Array.isArray(d) ? d : []))
          .catch(() => {});
      } else {
        setErrorMsg(data.error || "Failed to submit testimonial");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortAddr = address ? `${address.slice(0, 10)}...${address.slice(-6)}` : null;
  const avatarInitial = user?.display_name?.[0]?.toUpperCase() || address?.[4]?.toUpperCase() || "?";
  const levelLabel = LEVEL_LABELS[user?.validator_level ?? 0] || "Candidate";

  // Auto-generate contribution label from earned badges + stats (matches mobile app)
  const autoBadge = (() => {
    if (!user) return "";
    const parts: string[] = [];
    // Show earned badge names first (same as mobile)
    if (userBadges.length > 0) {
      parts.push(userBadges.map(b => b.name).join(", "));
    }
    if (user.r_score) parts.push(`R-Score ${user.r_score.toLocaleString()}`);
    if (user.validations_done) parts.push(`${user.validations_done.toLocaleString()} validations`);
    if (user.tickets_resolved) parts.push(`${user.tickets_resolved.toLocaleString()} resolved`);
    return parts.join(" · ");
  })();

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* ─── Header ─── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-600/20 ring-1 ring-yellow-500/30">
              <PenLine className="h-4 w-4 text-yellow-400" />
            </div>
            <h1 className="text-xl font-bold">Share Your Story</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Tell the community how PoPP has impacted you. Your testimonial helps others understand the protocol&apos;s real-world value.
          </p>
        </motion.div>

        {/* ─── Not Connected ─── */}
        {!connected ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Star className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-base font-bold mb-1">Connect Your Wallet</h3>
            <p className="text-sm text-gray-400 mb-4">You need to connect your wallet to submit a testimonial.</p>
            <button onClick={() => connect()} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-sm font-semibold">
              Connect Wallet
            </button>
          </motion.div>
        ) : (
          <>
            {/* ═══════════════════════════════════════════════════════════
                USER PROFILE CARD
                ═══════════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="relative mb-6 overflow-hidden rounded-2xl"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-cyan-600/10" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
              <div className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl" />

              <div className="relative z-10 p-5">
                {/* Top row: avatar + info */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg shadow-violet-500/20">
                    {avatarInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="text-base font-bold text-white truncate">
                        {user?.display_name || "Wallet User"}
                      </h2>
                      <Link href="/profile" className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-0.5">
                        <ExternalLink className="w-3 h-3" /> Profile
                      </Link>
                    </div>
                    {/* Address pill */}
                    <button
                      onClick={copyAddress}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.06] border border-white/[0.08] rounded-full text-xs text-gray-400 hover:bg-white/[0.1] transition-colors"
                    >
                      <Wallet className="w-3 h-3" />
                      <span className="font-mono">{shortAddr}</span>
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-gray-600" />}
                    </button>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "R-Score", value: user?.r_score ?? 0, icon: <TrendingUp className="w-3 h-3" />, color: "text-violet-400" },
                    { label: "Level", value: levelLabel, icon: <Award className="w-3 h-3" />, color: "text-cyan-400" },
                    { label: "Submitted", value: user?.tickets_submitted ?? 0, icon: <Ticket className="w-3 h-3" />, color: "text-emerald-400" },
                    { label: "Validations", value: user?.validations_done ?? 0, icon: <Shield className="w-3 h-3" />, color: "text-yellow-400" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-center">
                      <div className={`flex items-center justify-center gap-1 mb-0.5 ${stat.color}`}>
                        {stat.icon}
                        <span className="text-sm font-bold">{stat.value}</span>
                      </div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════
                SUBMISSION FORM (gated by badges)
                ═══════════════════════════════════════════════════════════ */}
            <div className="mb-8">
              {badgesLoading ? (
                /* Loading state */
                <div className="flex items-center justify-center py-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-3" />
                  <span className="text-sm text-gray-500">Checking your badges...</span>
                </div>
              ) : userBadges.length === 0 ? (
                /* Locked — no badges earned yet */
                <div className="text-center py-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <Award className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Earn a Badge to Unlock</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                    You need at least one badge to submit a testimonial. Start by submitting a problem or validating proofs to earn your first badge.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link href="/report" className="px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 rounded-lg text-xs font-semibold text-yellow-300 hover:border-yellow-500/50 transition-colors">
                      Submit a Problem
                    </Link>
                    <Link href="/validator-panel" className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-colors">
                      Become a Validator
                    </Link>
                  </div>
                </div>
              ) : (
                /* Unlocked — has badges, show form */
                <>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-between w-full mb-3"
                  >
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <PenLine className="w-4 h-4 text-yellow-400" />
                      Write Your Testimonial
                    </h3>
                    {showForm ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </button>

                  {showForm && (
                <motion.form
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4"
                >
                  {/* Messages */}
                  {successMsg && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm text-emerald-400">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      {successMsg}
                    </div>
                  )}
                  {errorMsg && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  {/* Display Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="How should we call you?"
                      className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-yellow-500/40 focus:border-yellow-500/40 outline-none transition"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Your Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white appearance-none cursor-pointer focus:ring-1 focus:ring-yellow-500/40 focus:border-yellow-500/40 outline-none transition"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r} className="bg-gray-900">{r}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quote */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                      Your Testimonial <span className="text-gray-600">(20–500 characters)</span>
                    </label>
                    <textarea
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Share your experience with PoPP — what impact has it had on you or your community?"
                      rows={4}
                      maxLength={500}
                      className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-yellow-500/40 focus:border-yellow-500/40 outline-none transition resize-none"
                    />
                    <div className="text-right text-[10px] text-gray-600 mt-1">{quote.length}/500</div>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStars(s)}
                          onMouseEnter={() => setHoverStar(s)}
                          onMouseLeave={() => setHoverStar(0)}
                          className="p-0.5 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              s <= (hoverStar || stars) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs text-gray-500 self-center">{stars} / 5</span>
                    </div>
                  </div>

                  {/* Earned Badges (same as mobile app) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                      Contribution Badges <span className="text-gray-600">(earned from your profile)</span>
                    </label>
                    {userBadges.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {userBadges.map((badge) => {
                          const color = BADGE_COLORS[badge.level] || "#ffd700";
                          const bg = BADGE_BG[badge.level] || BADGE_BG.gold;
                          const border = BADGE_BORDER[badge.level] || BADGE_BORDER.gold;
                          const Icon = getBadgeIcon(badge.icon);
                          return (
                            <div
                              key={badge.id}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-colors"
                              style={{ backgroundColor: bg, borderColor: border }}
                              title={badge.description}
                            >
                              <Icon className="w-3.5 h-3.5" style={{ color }} />
                              <span className="text-xs font-semibold" style={{ color }}>{badge.name}</span>
                              <span
                                className="text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded"
                                style={{ backgroundColor: color + "20", color }}
                              >
                                {badge.level}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-gray-500">
                        No badges earned yet. Submit problems and validate to earn badges!
                      </div>
                    )}
                  </div>

                  {/* Gradient Color */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Avatar Color</label>
                    <div className="flex flex-wrap gap-2">
                      {GRADIENTS.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          onClick={() => setGradientFrom(g.value)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition ${
                            gradientFrom === g.value
                              ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-300"
                              : "border-white/[0.08] bg-white/[0.04] text-gray-400 hover:text-white"
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting || quote.trim().length < 20}
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-yellow-500/20 active:scale-[0.98] transition-all"
                  >
                    {submitting ? "Submitting..." : "Submit Testimonial"}
                  </button>
                </motion.form>
              )}
                </>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════════
                MY TESTIMONIALS
                ═══════════════════════════════════════════════════════════ */}
            {myTestimonials.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Quote className="w-4 h-4 text-yellow-400" />
                  My Testimonials
                </h3>
                <div className="space-y-3">
                  {myTestimonials.map((t) => (
                    <div key={t.id} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm text-gray-300 italic">&ldquo;{t.quote}&rdquo;</p>
                        <span
                          className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            t.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : t.status === "rejected" ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          }`}
                        >
                          {t.status === "approved" ? <CheckCircle className="w-3 h-3" /> : t.status === "rejected" ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {t.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-500">{t.role}</span>
                        {t.contribution_label && (
                          <span className="text-[10px] text-gray-600">· {t.contribution_label}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════
                COMMUNITY TESTIMONIALS FEED
                ═══════════════════════════════════════════════════════════ */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                Community Voices
              </h3>

              {publicLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : publicTestimonials.length === 0 ? (
                <div className="text-center py-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                  <Quote className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No testimonials yet. Be the first to share your story!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {publicTestimonials.map((t, idx) => {
                    const gradient = GRADIENT_MAP[t.gradient_from] || GRADIENT_MAP.cyan;
                    return (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:border-white/[0.12] transition-colors"
                      >
                        {/* Quote */}
                        <div className="flex items-start gap-3 mb-3">
                          <Quote className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-300 leading-relaxed">{t.quote}</p>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-0.5 mb-3">
                          {Array.from({ length: t.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                            {t.avatar_initials || t.display_name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-white truncate">{t.display_name}</div>
                            <div className="text-[10px] text-gray-500">{t.role}</div>
                          </div>
                          {t.contribution_label && (
                            <span className="text-[10px] text-gray-500 bg-white/[0.04] px-2 py-0.5 rounded-full">{t.contribution_label}</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
