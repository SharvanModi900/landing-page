// pages/learning-resources.tsx
"use client";
import React, { useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  Code,
  Calendar,
  Download,
  Award,
  Search,
  Star,
} from "lucide-react";

/**
 * NOTE:
 * - Replace placeholder links & images with your real assets.
 * - If you don't have framer-motion, remove motion imports/usages or install it:
 *    npm i framer-motion
 */

type Resource = {
  id: string;
  title: string;
  desc: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  format: "Article" | "Video" | "Tutorial" | "PDF";
  tags?: string[];
  progress?: number; // 0-100
  featured?: boolean;
  author?: string;
  rating?: number; // 0-5
  link?: string;
};

const ALL_CATEGORIES = [
  "All",
  "Space Tech",
  "Blockchain",
  "AI & Robotics",
  "Dev Tools",
  "Research",
];

const FORMATS = ["All", "Article", "Video", "Tutorial", "PDF"];

const sampleResources: Resource[] = [
  {
    id: "r1",
    title: "Understanding PoPP Protocol",
    desc: "Deep dive into the Proof-of-Problem Protocol framework with diagrams and examples.",
    category: "Blockchain",
    difficulty: "Intermediate",
    format: "Article",
    tags: ["protocol", "governance"],
    progress: 40,
    featured: true,
    author: "Core Team",
    rating: 4.6,
    link: "#",
  },
  {
    id: "r2",
    title: "PoPP Masterclass — Part 1",
    desc: "Video course: architecture, smart contracts and real-world integrations.",
    category: "Dev Tools",
    difficulty: "Advanced",
    format: "Video",
    tags: ["course", "video"],
    progress: 10,
    featured: true,
    author: "Instructor Team",
    rating: 4.8,
    link: "#",
  },
  {
    id: "r3",
    title: "Beginner Guide to Decentralized Governance",
    desc: "A step-by-step beginner path to learn governance for PoPP.",
    category: "Research",
    difficulty: "Beginner",
    format: "Tutorial",
    tags: ["guide", "beginner"],
    progress: 0,
    author: "Community Contributor",
    rating: 4.2,
    link: "#",
  },
  {
    id: "r4",
    title: "Security Best Practices (PDF)",
    desc: "Checklist and best practices to secure your dApp.",
    category: "Dev Tools",
    difficulty: "Intermediate",
    format: "PDF",
    tags: ["security"],
    progress: 0,
    author: "Security Team",
    rating: 4.7,
    link: "/downloads/security-checklist.pdf",
  },
  // add more sample items as needed...
];

export default function LearningResourcesPage() {
  // state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [format, setFormat] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Recommended");
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

  const videoCarouselRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleResources
      .filter((r) => (category === "All" ? true : r.category === category))
      .filter((r) => (format === "All" ? true : r.format === format))
      .filter((r) => (showOnlyIncomplete ? (r.progress ?? 0) < 100 : true))
      .filter(
        (r) =>
          !q ||
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          (r.tags || []).some((t) => t.toLowerCase().includes(q))
      )
      .sort((a, b) => {
        if (sortBy === "Newest") return b.id.localeCompare(a.id);
        if (sortBy === "Popular")
          return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "Progress")
          return (b.progress || 0) - (a.progress || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [query, category, format, sortBy, showOnlyIncomplete]);

  // derived
  const featured = filtered.find((r) => r.featured) ?? filtered[0] ?? null;
  const progressTotal = Math.round(
    sampleResources.reduce((s, r) => s + (r.progress ?? 0), 0) /
      sampleResources.length
  );

  // helpers
  const scrollVideo = (dir: "left" | "right") => {
    if (!videoCarouselRef.current) return;
    const el = videoCarouselRef.current;
    el.scrollBy({
      left: dir === "left" ? -600 : 600,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* HERO / SEARCH */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* layered soft glows */}
          <div className="absolute -left-28 -top-28 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute right-[-6rem] top-20 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-rose-500/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.02),transparent_30%)] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Master the Future —{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-yellow-300">
                  Learn, Build, Contribute
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-3xl">
                Curated resources, hands-on tutorials, and live workshops to
                help you become a contributor to PoPP and the broader
                decentralized ecosystem.
              </p>

              {/* Search bar + filters */}
              <div className="mt-8 flex gap-3 flex-wrap items-center">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 shadow-sm">
                  <Search className="w-5 h-5 text-gray-300" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search topics, tags, or authors"
                    className="bg-transparent outline-none text-sm text-gray-100 placeholder:text-gray-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-full px-3 py-2 text-sm"
                  >
                    {ALL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-full px-3 py-2 text-sm"
                  >
                    {FORMATS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-full px-3 py-2 text-sm"
                  >
                    {["Recommended", "Newest", "Popular", "Progress"].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <label className="ml-2 flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={showOnlyIncomplete}
                    onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
                    className="accent-orange-400"
                  />
                  Only incomplete
                </label>
              </div>

              {/* progress / badges summary */}
              <div className="mt-6 flex gap-6 items-center flex-wrap">
                <div className="bg-white/5 backdrop-blur rounded-xl px-4 py-3 border border-white/10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center text-black font-bold">
                    {progressTotal}%
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Learning Progress</div>
                    <div className="text-sm font-semibold">All modules</div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur rounded-xl px-4 py-3 border border-white/10 flex items-center gap-3">
                  <Award className="w-6 h-6 text-orange-400" />
                  <div>
                    <div className="text-sm text-gray-300">Badges</div>
                    <div className="text-sm font-semibold">3 earned</div>
                  </div>
                </div>

                <a
                  href="#path"
                  className="ml-2 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full font-semibold shadow-lg"
                >
                  Explore Learning Path
                </a>
              </div>
            </div>

            {/* Featured card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/6 border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center text-white text-lg font-bold">
                    ★
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-300">Featured</div>
                    <h3 className="text-xl font-bold">
                      {featured?.title ?? "Featured Resource"}
                    </h3>
                    <p className="text-sm text-gray-300 mt-2">
                      {featured?.desc ?? "Highlight resource description goes here."}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <a
                        href={featured?.link ?? "#"}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 font-semibold text-sm"
                      >
                        Start Learning
                      </a>
                      <a
                        href="#"
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"
                      >
                        Save
                      </a>
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {(featured?.rating || 0).toFixed(1)}
                      </div>
                      <div>• {featured?.difficulty}</div>
                      <div>• {featured?.author}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING PATH (TIMELINE) */}
      <section id="path" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Learning Path</h2>
        <div className="relative overflow-x-auto">
          <div className="flex gap-6 py-6 min-w-[900px]">
            {[
              {
                title: "Intro: Concepts",
                sub: "Foundations & Glossary",
                badge: "Beginner",
              },
              { title: "Build: Tutorials", sub: "Small Projects", badge: "Beginner" },
              { title: "Integrate: SDKs", sub: "Hands-on", badge: "Intermediate" },
              { title: "Secure: Best practices", sub: "Audit checklist", badge: "Intermediate" },
              { title: "Scale: Production", sub: "Ops & Monitoring", badge: "Advanced" },
              { title: "Certify", sub: "Assessment & Badge", badge: "Advanced" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="min-w-[220px] bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-300">{step.sub}</div>
                    <h4 className="text-lg font-semibold mt-2">{step.title}</h4>
                  </div>
                  <div className="text-xs bg-gradient-to-r from-indigo-600 to-pink-500 px-2 py-1 rounded-full">
                    {step.badge}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                      style={{ width: `${Math.min(100, (i + 1) * 14)}%` }}
                    />
                  </div>
                  <div className="mt-3 text-sm text-gray-400">Estimated 2-6 hours</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO CAROUSEL */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Video Tutorials</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollVideo("left")}
              className="rounded-full bg-white/5 p-2"
            >
              ◀
            </button>
            <button
              onClick={() => scrollVideo("right")}
              className="rounded-full bg-white/5 p-2"
            >
              ▶
            </button>
          </div>
        </div>

        <div
          ref={videoCarouselRef}
          className="flex gap-6 overflow-x-auto pb-3 no-scrollbar"
        >
          {/* Create placeholders for videos */}
          {sampleResources
            .filter((r) => r.format === "Video")
            .concat([
              {
                id: "v1",
                title: "Intro to PoPP — Quick Start",
                desc: "10 min overview",
                format: "Video",
              } as Resource,
              {
                id: "v2",
                title: "Security Roundtable - 45 min",
                desc: "Recorded session",
                format: "Video",
              } as Resource,
            ])
            .map((v) => (
              <div
                key={v.id}
                className="min-w-[320px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                  <div className="text-sm text-white/90">Video thumbnail</div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{v.title}</h4>
                  <p className="text-sm text-gray-300">{v.desc}</p>
                  <div className="mt-4 flex gap-2">
                    <a className="px-3 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-sm font-semibold">
                      Watch
                    </a>
                    <a className="px-3 py-2 rounded-full bg-white/5 text-sm">Save</a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* RESOURCE GRID (mixed) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">All Resources</h2>
          <div className="text-sm text-gray-400">Showing {filtered.length} results</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res) => (
            <motion.article
              key={res.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10 shadow-md flex flex-col"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center font-bold">
                    {res.format[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{res.title}</h3>
                    <div className="text-xs text-gray-400">
                      {res.category} • {res.difficulty}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-300">{res.rating ? res.rating.toFixed(1) : "—"}</div>
              </div>

              <p className="text-sm text-gray-300 mt-4 flex-1">{res.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                    style={{ width: `${res.progress ?? 0}%` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <a
                    onClick={() => setActiveResource(res)}
                    className="px-3 py-1 rounded-full bg-white/5 text-sm cursor-pointer"
                  >
                    Preview
                  </a>
                  <a
                    href={res.link ?? "#"}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-sm"
                  >
                    Open
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* DOWNLOADS / ASSETS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">Downloadables</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Security Checklist", size: "120KB", href: "/downloads/security-checklist.pdf" },
            { name: "PoPP Whitepaper", size: "2.4MB", href: "/downloads/whitepaper.pdf" },
            { name: "Quickstart Repo (zip)", size: "6.8MB", href: "/downloads/quickstart.zip" },
          ].map((d) => (
            <a key={d.name} href={d.href} className="bg-white/5 rounded-xl p-4 flex items-center gap-4 border border-white/10">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-400 to-teal-400 text-black">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">{d.name}</div>
                <div className="text-sm text-gray-300">{d.size}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* COMMUNITY / DISCUSSION + Leaderboard */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-3">Community Discussions</h3>
          <p className="text-sm text-gray-300 mb-4">Ask questions, share resources, and get help from peers.</p>
          {/* placeholder for actual embed (Discord/Discourse) */}
          <div className="h-[260px] rounded-lg bg-black/40 border border-white/6 flex items-center justify-center text-gray-400">
            Community embed placeholder (Discord/Forum)
          </div>
          <div className="mt-4 flex gap-3">
            <a className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-pink-500">Join Discord</a>
            <a className="px-3 py-2 rounded-md bg-white/5 border">Visit Forum</a>
          </div>
        </div>

        <aside className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-3">Top Learners</h3>
          <ol className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center font-bold">A</div>
                <div>
                  <div className="font-semibold">Anaya</div>
                  <div className="text-xs text-gray-300">420 pts</div>
                </div>
              </div>
              <div className="text-xs text-gray-300">82%</div>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center font-bold">M</div>
                <div>
                  <div className="font-semibold">Marco</div>
                  <div className="text-xs text-gray-300">380 pts</div>
                </div>
              </div>
              <div className="text-xs text-gray-300">75%</div>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center font-bold">S</div>
                <div>
                  <div className="font-semibold">Sana</div>
                  <div className="text-xs text-gray-300">310 pts</div>
                </div>
              </div>
              <div className="text-xs text-gray-300">69%</div>
            </li>
          </ol>
        </aside>
      </section>

      {/* UPCOMING WORKSHOPS (calendar-like) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">Upcoming Workshops & Live Events</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Hackathon Kickoff", date: "2025-08-20", time: "10:00 UTC" },
            { title: "Governance Deep-dive", date: "2025-09-02", time: "15:00 UTC" },
            { title: "Security AMA", date: "2025-09-15", time: "18:00 UTC" },
          ].map((ev) => (
            <div key={ev.title} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-sm text-gray-300">{ev.date} • {ev.time}</div>
              <h4 className="font-semibold mt-2">{ev.title}</h4>
              <p className="text-sm text-gray-400 mt-1">Register to secure your seat. Limited spots.</p>
              <div className="mt-3">
                <a className="px-3 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-sm">Register</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 px-6 bg-gradient-to-r from-indigo-700 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Ready to level up?</h3>
            <p className="text-gray-100">
              Start a learning path, join a workshop, or contribute a resource.
            </p>
          </div>
          <div className="flex gap-3">
            <a className="px-5 py-3 rounded-full bg-black/80 border border-white/10 font-semibold">Start Free</a>
            <a className="px-5 py-3 rounded-full bg-white/10 font-semibold">Explore Courses</a>
          </div>
        </div>
      </section>

      {/* RESOURCE PREVIEW MODAL */}
      {activeResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setActiveResource(null)}
          />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 bg-slate-900 max-w-3xl w-full rounded-2xl p-6 border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{activeResource.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{activeResource.desc}</p>
                <div className="mt-3 text-xs text-gray-400">
                  {activeResource.category} • {activeResource.difficulty} • {activeResource.format}
                </div>
              </div>
              <button
                onClick={() => setActiveResource(null)}
                className="text-gray-300 text-sm"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 min-h-[120px]">
                <div className="text-sm text-gray-300">Preview content area</div>
                <div className="mt-3 text-xs text-gray-400">
                  This can embed a video player, code sandbox, or article excerpt.
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 min-h-[120px]">
                <div className="text-sm text-gray-300">Resources</div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <a className="px-3 py-1 rounded-full bg-white/6">Download</a>
                  <a className="px-3 py-1 rounded-full bg-white/6">Open</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
