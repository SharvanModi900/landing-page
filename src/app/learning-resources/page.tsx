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
import DarkSelect from "@/components/DarkSelect";

type Resource = {
  id: string;
  title: string;
  desc: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  format: "Article" | "Video" | "Tutorial" | "PDF";
  tags?: string[];
  progress?: number;
  featured?: boolean;
  author?: string;
  rating?: number;
  link?: string;
};

const ALL_CATEGORIES = ["All", "Protocol Basics", "Validators", "Governance", "Dev Tools", "Research"];
const FORMATS = ["All", "Article", "Video", "Tutorial", "PDF"];

const sampleResources: Resource[] = [
  {
    id: "r1",
    title: "Understanding PoPP Protocol",
    desc: "Deep dive into the Proof-of-Problem Protocol framework with diagrams and examples.",
    category: "Protocol Basics",
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
    desc: "Video course: architecture, Cosmos SDK chain setup, and real-world integrations.",
    category: "Dev Tools",
    difficulty: "Advanced",
    format: "Video",
    tags: ["course", "video"],
    progress: 10,
    featured: true,
    author: "Core Team",
    rating: 4.8,
    link: "#",
  },
  {
    id: "r3",
    title: "Beginner Guide to Decentralized Governance",
    desc: "A step-by-step beginner path to learn governance for PoPP.",
    category: "Governance",
    difficulty: "Beginner",
    format: "Tutorial",
    tags: ["guide", "beginner"],
    progress: 0,
    author: "Community",
    rating: 4.2,
    link: "#",
  },
  {
    id: "r4",
    title: "Validator Security Best Practices (PDF)",
    desc: "Checklist and best practices to secure your validator node.",
    category: "Validators",
    difficulty: "Intermediate",
    format: "PDF",
    tags: ["security", "validator"],
    progress: 0,
    author: "Security Team",
    rating: 4.7,
    link: "#",
  },
];

export default function LearningResourcesPage() {
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
        if (sortBy === "Popular") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "Progress") return (b.progress || 0) - (a.progress || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [query, category, format, sortBy, showOnlyIncomplete]);

  const featured = filtered.find((r) => r.featured) ?? filtered[0] ?? null;
  const progressTotal = Math.round(
    sampleResources.reduce((s, r) => s + (r.progress ?? 0), 0) / sampleResources.length
  );

  const scrollVideo = (dir: "left" | "right") => {
    if (!videoCarouselRef.current) return;
    const el = videoCarouselRef.current;
    el.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* HERO / SEARCH */}
        <section className="px-4 sm:px-6 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold">
                  Master the Future —{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Learn, Build, Contribute
                  </span>
                </h1>
                <p className="mt-3 text-gray-400 max-w-3xl">
                  Curated resources, hands-on tutorials, and live workshops to
                  help you become a contributor to PoPP and the broader
                  decentralized ecosystem.
                </p>

                <div className="mt-6 flex gap-2 flex-wrap items-center">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search topics, tags, or authors"
                      className="bg-transparent outline-none text-sm text-gray-100 placeholder:text-gray-400"
                    />
                  </div>

                  <DarkSelect
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-full"
                    options={ALL_CATEGORIES.map((c) => ({ value: c, label: c }))}
                  />

                  <DarkSelect
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="rounded-full"
                    options={FORMATS.map((f) => ({ value: f, label: f }))}
                  />

                  <DarkSelect
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-full"
                    options={["Recommended", "Newest", "Popular", "Progress"].map((s) => ({ value: s, label: s }))}
                  />

                  <label className="ml-2 flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={showOnlyIncomplete}
                      onChange={(e) => setShowOnlyIncomplete(e.target.checked)}
                      className="accent-cyan-500"
                    />
                    Only incomplete
                  </label>
                </div>

                <div className="mt-4 flex gap-4 items-center flex-wrap">
                  <div className="bg-white/5 rounded-xl px-3 py-2 border border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {progressTotal}%
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Learning Progress</div>
                      <div className="text-xs font-semibold">All modules</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl px-3 py-2 border border-white/10 flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="text-xs text-gray-400">Badges</div>
                      <div className="text-xs font-semibold">3 earned</div>
                    </div>
                  </div>

                  <a
                    href="#path"
                    className="ml-2 inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-sm"
                  >
                    Explore Learning Path
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-lg font-bold">
                      ★
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-400">Featured</div>
                      <h3 className="text-lg font-bold">
                        {featured?.title ?? "Featured Resource"}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {featured?.desc ?? "Highlight resource description goes here."}
                      </p>

                      <div className="mt-3 flex gap-2">
                        <a
                          href={featured?.link ?? "#"}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-xs"
                        >
                          Start Learning
                        </a>
                        <a
                          href="#"
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs"
                        >
                          Save
                        </a>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
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

        {/* LEARNING PATH */}
        <section id="path" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Learning Path</h2>
          <div className="relative overflow-x-auto">
            <div className="flex gap-4 py-4 min-w-[900px]">
              {[
                { title: "Intro: Concepts", sub: "Foundations & Glossary", badge: "Beginner" },
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
                  className="min-w-[200px] bg-white/5 rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-gray-400">{step.sub}</div>
                      <h4 className="text-base font-semibold mt-1">{step.title}</h4>
                    </div>
                    <div className="text-xs bg-gradient-to-r from-cyan-500 to-blue-600 px-2 py-0.5 rounded-full">
                      {step.badge}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                        style={{ width: `${Math.min(100, (i + 1) * 14)}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-400">Estimated 2-6 hours</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEO CAROUSEL */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Video Tutorials</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => scrollVideo("left")} className="rounded-full bg-white/5 p-2">◀</button>
              <button onClick={() => scrollVideo("right")} className="rounded-full bg-white/5 p-2">▶</button>
            </div>
          </div>

          <div ref={videoCarouselRef} className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {sampleResources
              .filter((r) => r.format === "Video")
              .concat([
                { id: "v1", title: "Intro to PoPP — Quick Start", desc: "10 min overview", format: "Video" } as Resource,
                { id: "v2", title: "Security Roundtable - 45 min", desc: "Recorded session", format: "Video" } as Resource,
              ])
              .map((v) => (
                <div key={v.id} className="min-w-[280px] bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="w-full h-40 bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center">
                    <div className="text-sm text-white/90">Video thumbnail</div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm">{v.title}</h4>
                    <p className="text-xs text-gray-400">{v.desc}</p>
                    <div className="mt-2 flex gap-2">
                      <a className="px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-semibold">Watch</a>
                      <a className="px-2 py-1 rounded-full bg-white/5 text-xs">Save</a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* RESOURCE GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold">All Resources</h2>
            <div className="text-sm text-gray-400">Showing {filtered.length} results</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((res) => (
              <motion.article
                key={res.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-sm">
                      {res.format[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{res.title}</h3>
                      <div className="text-xs text-gray-400">
                        {res.category} • {res.difficulty}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{res.rating ? res.rating.toFixed(1) : "—"}</div>
                </div>

                <p className="text-xs text-gray-400 mt-2 flex-1">{res.desc}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="w-24 bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                      style={{ width: `${res.progress ?? 0}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      onClick={() => setActiveResource(res)}
                      className="px-2 py-1 rounded-full bg-white/5 text-xs cursor-pointer"
                    >
                      Preview
                    </a>
                    <a
                      href={res.link ?? "#"}
                      className="px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xs"
                    >
                      Open
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* DOWNLOADS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Downloadables</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "Security Checklist", size: "120KB", href: "/downloads/security-checklist.pdf" },
              { name: "PoPP Whitepaper", size: "2.4MB", href: "/downloads/whitepaper.pdf" },
              { name: "Quickstart Repo (zip)", size: "6.8MB", href: "/downloads/quickstart.zip" },
            ].map((d) => (
              <a key={d.name} href={d.href} className="bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/10">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-400 text-black">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{d.name}</div>
                  <div className="text-xs text-gray-400">{d.size}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* COMMUNITY + Leaderboard */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-lg font-bold mb-2">Community Discussions</h3>
            <p className="text-xs text-gray-400 mb-3">Ask questions, share resources, and get help from peers.</p>
            <div className="h-[200px] rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-center text-gray-400 text-sm">
              Community embed placeholder (Discord/Forum)
            </div>
            <div className="mt-3 flex gap-2">
              <a className="px-2 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-sm">Join Discord</a>
              <a className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-sm">Visit Forum</a>
            </div>
          </div>

          <aside className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-lg font-bold mb-2">Top Learners</h3>
            <ol className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center font-bold text-xs">V1</div>
                  <div>
                    <div className="font-semibold text-xs">Validator #1</div>
                    <div className="text-xs text-gray-400">420 pts</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">82%</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center font-bold text-xs">V2</div>
                  <div>
                    <div className="font-semibold text-xs">Validator #2</div>
                    <div className="text-xs text-gray-400">380 pts</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">75%</div>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center font-bold text-xs">V3</div>
                  <div>
                    <div className="font-semibold text-xs">Validator #3</div>
                    <div className="text-xs text-gray-400">310 pts</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">69%</div>
              </li>
            </ol>
          </aside>
        </section>

        {/* UPCOMING WORKSHOPS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-2xl font-bold mb-3">Upcoming Workshops & Live Events</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { title: "Hackathon Kickoff", date: "2025-08-20", time: "10:00 UTC" },
              { title: "Governance Deep-dive", date: "2025-09-02", time: "15:00 UTC" },
              { title: "Security AMA", date: "2025-09-15", time: "18:00 UTC" },
            ].map((ev) => (
              <div key={ev.title} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="text-xs text-gray-400">{ev.date} • {ev.time}</div>
                <h4 className="font-semibold text-sm mt-1">{ev.title}</h4>
                <p className="text-xs text-gray-400 mt-1">Register to secure your seat. Limited spots.</p>
                <div className="mt-2">
                  <a className="px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xs">Register</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-10 px-4 sm:px-6 bg-gradient-to-r from-cyan-500 to-blue-600">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold">Ready to level up?</h3>
              <p className="text-white/90">
                Start a learning path, join a workshop, or contribute a resource.
              </p>
            </div>
            <div className="flex gap-2">
              <a className="px-4 py-2 rounded-full bg-black/20 border border-white/10 font-semibold">Start Free</a>
              <a className="px-4 py-2 rounded-full bg-white/10 font-semibold">Explore Courses</a>
            </div>
          </div>
        </section>
      </div>

      {/* RESOURCE PREVIEW MODAL */}
      {activeResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setActiveResource(null)} />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 bg-[#030712] max-w-3xl w-full rounded-xl p-5 border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{activeResource.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{activeResource.desc}</p>
                <div className="mt-2 text-xs text-gray-400">
                  {activeResource.category} • {activeResource.difficulty} • {activeResource.format}
                </div>
              </div>
              <button onClick={() => setActiveResource(null)} className="text-gray-400 text-sm">Close</button>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 min-h-[100px]">
                <div className="text-sm text-gray-400">Preview content area</div>
                <div className="mt-2 text-xs text-gray-400">
                  This can embed a video player, code sandbox, or article excerpt.
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 min-h-[100px]">
                <div className="text-sm text-gray-400">Resources</div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <a className="px-2 py-1 rounded-full bg-white/[0.06] text-xs">Download</a>
                  <a className="px-2 py-1 rounded-full bg-white/[0.06] text-xs">Open</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
