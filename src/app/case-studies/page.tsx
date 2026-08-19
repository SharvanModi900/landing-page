"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Users,
  Shield,
  ArrowRight,
  Filter,
  ChevronDown,
} from "lucide-react";

// ─── Case Studies ────────────────────────────────────────────────────────────

interface CaseStudy {
  id: string;
  title: string;
  domain: string;
  location: string;
  status: "Resolved" | "In Validation" | "Escalated";
  severity: "High" | "Medium" | "Critical";
  submitted: string;
  resolved?: string;
  validators: number;
  summary: string;
  problem: string;
  evidence: string[];
  outcome: string;
  impact: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "water-contamination-bangalore",
    title: "Water Contamination in Koramangala",
    domain: "Water & Sanitation",
    location: "Bangalore, India",
    status: "Resolved",
    severity: "Critical",
    submitted: "Nov 12, 2025",
    resolved: "Nov 28, 2025",
    validators: 7,
    summary:
      "Residents reported discolored water and gastrointestinal illness. PoPP validators verified water samples with photographic evidence and GPS-tagged test results.",
    problem:
      "Municipal water supply in Koramangala Layout showed signs of contamination affecting 200+ households. Initial complaints to local authorities were ignored for 3 weeks.",
    evidence: [
      "Photographs of discolored water from 12 households",
      "GPS-tagged water quality test reports (E. coli > 50 CFU/100ml)",
      "Medical records from 3 local clinics showing GI illness spike",
      "Video evidence of pipe corrosion at junction point",
    ],
    outcome:
      "Validated by 7 independent validators. Escalated to Bangalore Water Supply Board. Pipe replacement completed within 16 days. 200+ households now have clean water supply restored.",
    impact: "200+ households served, 16-day resolution",
  },
  {
    id: "road-damage-lagos",
    title: "Critical Road Damage on Third Mainland Bridge",
    domain: "Infrastructure",
    location: "Lagos, Nigeria",
    status: "Resolved",
    severity: "High",
    submitted: "Oct 5, 2025",
    resolved: "Oct 22, 2025",
    validators: 5,
    summary:
      "Large pothole causing accidents on Third Mainland Bridge. Multiple submissions consolidated into one verified problem ticket.",
    problem:
      "A 2-meter pothole on Third Mainland Bridge approach caused 3 accidents in one week. Individual reports were filed but never tracked or resolved.",
    evidence: [
      "Time-stamped photos from 8 different submitters",
      "Dashcam footage of near-miss incidents",
      "GPS coordinates with road surface measurements",
      "Traffic authority response records showing no action",
    ],
    outcome:
      "5 validators confirmed severity. Emergency repair request escalated through PoPP governance. Lagos State Works Department deployed repair crew within 17 days.",
    impact: "3 accidents prevented weekly, 17-day repair",
  },
  {
    id: "air-quality-delhi",
    title: "Industrial Emissions Violating Air Quality Standards",
    domain: "Environment",
    location: "Delhi, India",
    status: "In Validation",
    severity: "Critical",
    submitted: "Dec 1, 2025",
    validators: 3,
    summary:
      "Factory emissions in industrial zone consistently exceeding permissible limits. Low-cost sensor network deployed by community.",
    problem:
      "Residential area adjacent to industrial zone experiencing persistent chemical odor and respiratory issues. PM2.5 readings 4x above WHO guidelines.",
    evidence: [
      "Low-cost sensor readings over 30-day period",
      "Photographic evidence of unfiltered exhaust discharge",
      "Health survey data from 50+ affected families",
      "Wind direction analysis correlating emissions source",
    ],
    outcome: "Under active validation. 3 validators reviewing evidence. Expected escalation to Delhi Pollution Control Committee.",
    impact: "50+ families affected, ongoing monitoring",
  },
  {
    id: "waste-dumping-mumbai",
    title: "Illegal Waste Dumping in Mithi River",
    domain: "Environment",
    location: "Mumbai, India",
    status: "Escalated",
    severity: "High",
    submitted: "Sep 18, 2025",
    validators: 6,
    summary:
      "Construction debris and medical waste being illegally dumped into Mithi River, affecting water flow and public health.",
    problem:
      "Systematic dumping of construction waste into Mithi River by nearby contractors. Blocking natural water flow and creating flooding risk during monsoon.",
    evidence: [
      "Drone footage of dumping sites along 2km stretch",
      "Photographs of medical waste (syringes, bandages) on riverbank",
      "Water quality tests showing heavy metal contamination",
      "Historical satellite imagery showing progressive degradation",
    ],
    outcome:
      "Validated and escalated to Maharashtra Pollution Control Board. FIR filed against 2 contractors. Cleanup operation initiated by municipal corporation.",
    impact: "2km river stretch identified, cleanup initiated",
  },
  {
    id: "electricity-failure-nairobi",
    title: "Recurring Power Grid Failures in Kibera",
    domain: "Utilities",
    location: "Nairobi, Kenya",
    status: "Resolved",
    severity: "Medium",
    submitted: "Aug 22, 2025",
    resolved: "Sep 10, 2025",
    validators: 4,
    summary:
      "Frequent power outages affecting 10,000+ residents. Transformer failures reported multiple times without permanent repair.",
    problem:
      "Kibera settlement experiencing daily 6-8 hour power outages due to overloaded transformer. Kenya Power was replacing fuses instead of upgrading capacity.",
    evidence: [
      "Power outage logs maintained by community over 60 days",
      "Photographs of overloaded transformer and exposed wiring",
      "Petition signatures from 500+ affected residents",
      "Previous complaint tickets to Kenya Power showing no resolution",
    ],
    outcome:
      "4 validators verified the systemic issue. PoPP governance proposal funded transformer upgrade. Kenya Power installed 500kVA transformer replacing 200kVA unit.",
    impact: "10,000+ residents with stable power, permanent fix",
  },
  {
    id: "school-safety-jaipur",
    title: "Unsafe School Building Structure",
    domain: "Education & Safety",
    location: "Jaipur, India",
    status: "Resolved",
    severity: "Critical",
    submitted: "Jul 8, 2025",
    resolved: "Aug 5, 2025",
    validators: 8,
    summary:
      "Government school building showing structural cracks. Parents' complaints dismissed by education department.",
    problem:
      "Primary school building constructed in 1990 showing major structural cracks. 300+ students at risk. Parents' petitions for structural audit were ignored.",
    evidence: [
      "Photographs of cracks in load-bearing walls and ceiling",
      "Structural assessment from independent civil engineer",
      "Video walkthrough of affected classrooms",
      "Enrollment records showing 300+ students at risk",
    ],
    outcome:
      "8 validators including 2 structural engineers confirmed critical risk. Escalated to District Education Officer. School relocated temporarily. New building construction sanctioned.",
    impact: "300+ students safe, new building sanctioned",
  },
];

const DOMAINS = [
  "All",
  "Water & Sanitation",
  "Infrastructure",
  "Environment",
  "Utilities",
  "Education & Safety",
];

const STATUS_COLORS: Record<string, string> = {
  Resolved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "In Validation": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Escalated: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

const SEVERITY_COLORS: Record<string, string> = {
  Critical: "text-red-400 bg-red-400/10",
  High: "text-orange-400 bg-orange-400/10",
  Medium: "text-yellow-400 bg-yellow-400/10",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CaseStudiesPage() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    selectedDomain === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.domain === selectedDomain);

  const stats = {
    total: CASE_STUDIES.length,
    resolved: CASE_STUDIES.filter((c) => c.status === "Resolved").length,
    validators: CASE_STUDIES.reduce((a, c) => a + c.validators, 0),
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Real Problems. Verified Solutions.
              </span>
            </h1>
            <p className="mt-3 text-gray-400 max-w-2xl text-sm">
              Every case study below was submitted by a real person, validated by
              independent PoPP validators, and tracked to resolution. No problem
              disappears into silence.
            </p>

            {/* Stats strip */}
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { label: "Case Studies", value: stats.total },
                { label: "Resolved", value: stats.resolved },
                { label: "Validator Reviews", value: stats.validators },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── Filter bar ───────────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            {DOMAINS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  selectedDomain === d
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                    : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </section>

        {/* ─── Case Study Cards ─────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-10">
          <div className="space-y-4">
            {filtered.map((cs, i) => {
              const expanded = expandedId === cs.id;
              return (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
                >
                  {/* Header row */}
                  <button
                    onClick={() => setExpandedId(expanded ? null : cs.id)}
                    className="w-full text-left px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    {/* Left: title + meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[cs.status]}`}
                        >
                          {cs.status === "Resolved" && (
                            <CheckCircle2 size={10} className="mr-1" />
                          )}
                          {cs.status === "In Validation" && (
                            <Eye size={10} className="mr-1" />
                          )}
                          {cs.status === "Escalated" && (
                            <AlertTriangle size={10} className="mr-1" />
                          )}
                          {cs.status}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${SEVERITY_COLORS[cs.severity]}`}
                        >
                          {cs.severity}
                        </span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <MapPin size={10} />
                          {cs.location}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white truncate">
                        {cs.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
                        <span>{cs.domain}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {cs.submitted}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield size={10} />
                          {cs.validators} validators
                        </span>
                      </div>
                    </div>

                    {/* Right: impact + expand */}
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-gray-500">Impact</div>
                        <div className="text-xs font-semibold text-cyan-400">
                          {cs.impact}
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Expanded details */}
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 border-t border-white/[0.06]"
                    >
                      <div className="grid md:grid-cols-2 gap-5 pt-4">
                        {/* Left column */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-300 mb-1">
                              The Problem
                            </h4>
                            <p className="text-sm text-gray-400">
                              {cs.problem}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-300 mb-2">
                              Evidence Collected
                            </h4>
                            <ul className="space-y-1.5">
                              {cs.evidence.map((e, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-xs text-gray-400"
                                >
                                  <CheckCircle2
                                    size={12}
                                    className="text-cyan-400 mt-0.5 flex-shrink-0"
                                  />
                                  {e}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right column */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-300 mb-1">
                              Summary
                            </h4>
                            <p className="text-sm text-gray-400">
                              {cs.summary}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-300 mb-1">
                              Outcome
                            </h4>
                            <p className="text-sm text-gray-400">{cs.outcome}</p>
                          </div>
                          {cs.resolved && (
                            <div className="flex items-center gap-2 text-xs text-emerald-400">
                              <CheckCircle2 size={14} />
                              Resolved in{" "}
                              {Math.ceil(
                                (new Date(cs.resolved).getTime() -
                                  new Date(cs.submitted).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No case studies found for this domain.
            </div>
          )}
        </section>

        {/* ─── How It Works ─────────────────────────────────────────────── */}
        <section className="bg-white/[0.02] border-y border-white/[0.06] py-10">
          <div className="mx-auto w-full max-w-7xl px-6">
            <h2 className="text-xl font-bold mb-6 text-center">
              From Problem to Resolution
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <MapPin size={20} className="text-cyan-400" />,
                  step: "01",
                  title: "Submit",
                  desc: "Anyone submits a problem with evidence — photos, GPS, documents.",
                },
                {
                  icon: <Shield size={20} className="text-blue-400" />,
                  step: "02",
                  title: "Validate",
                  desc: "Independent validators review evidence and verify the problem.",
                },
                {
                  icon: <Users size={20} className="text-purple-400" />,
                  step: "03",
                  title: "Escalate",
                  desc: "Validated problems are escalated to authorities or governance.",
                },
                {
                  icon: <CheckCircle2 size={20} className="text-emerald-400" />,
                  step: "04",
                  title: "Resolve",
                  desc: "Resolution tracked on-chain with transparent accountability.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
                >
                  <div className="flex justify-center mb-2">{s.icon}</div>
                  <div className="text-[10px] text-gray-500 mb-1">
                    Step {s.step}
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-7xl px-6 py-10">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <h2 className="text-xl font-bold mb-2">
              Have a Problem That Needs Solving?
            </h2>
            <p className="text-sm text-gray-400 max-w-lg mx-auto mb-4">
              Submit your problem to the PoPP network. Independent validators will
              verify it, and the community will track it to resolution.
            </p>
            <div className="flex justify-center gap-3">
              <a
                href="/report"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold"
              >
                Submit a Problem <ArrowRight size={14} />
              </a>
              <a
                href="/validators"
                className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold"
              >
                Become a Validator
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
