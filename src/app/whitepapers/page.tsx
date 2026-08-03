"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "Core Protocol", description: "Technical architecture & cryptography details", count: 4, icon: "🌐" },
  { title: "Governance & DAO", description: "Voting rules, proposals, tokenomics", count: 3, icon: "⚖️" },
  { title: "Security & Privacy", description: "Threat models, zk-proof research", count: 2, icon: "🔒" },
];

const news = [
  { title: "PoPP Launches v1.0", date: "2025-08-01" },
  { title: "DAO approves new validator rules", date: "2025-08-15" },
];

const blogs = [
  { title: "Why Decentralization Matters", author: "Alice" },
  { title: "The Future of Proof Protocols", author: "Bob" },
];

const events = [
  { title: "PoPP Summit 2025", location: "Bangalore" },
  { title: "DAO Hackathon", location: "Berlin" },
];

export default function KnowledgeHub() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("whitepapers");

  const filtered = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </h1>
          <p className="text-gray-400 max-w-lg">
            Discover PoPP's research papers, governance updates, community blogs, 
            and upcoming events — all in one place.
          </p>
        </section>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Tabs */}
          <div className="flex gap-6 border-b border-white/10 mb-6 relative">
            {["whitepapers", "news", "blogs", "events"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 capitalize transition text-sm ${
                  activeTab === tab
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          {activeTab === "whitepapers" && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Whitepapers */}
          {activeTab === "whitepapers" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition"
                >
                  <div className="text-2xl mb-3">{cat.icon}</div>
                  <h3 className="text-base font-semibold mb-1">{cat.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{cat.description}</p>
                  <Link href={`/whitepapers/${cat.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <span className="text-cyan-400 text-xs font-medium cursor-pointer hover:underline">
                      View Papers
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* News */}
          {activeTab === "news" && (
            <div className="space-y-3">
              {news.map((n, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-base font-semibold">{n.title}</h3>
                  <p className="text-gray-500 text-sm">{n.date}</p>
                </div>
              ))}
            </div>
          )}

          {/* Blogs */}
          {activeTab === "blogs" && (
            <div className="grid sm:grid-cols-2 gap-5">
              {blogs.map((b, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition">
                  <h3 className="text-base font-semibold mb-1">{b.title}</h3>
                  <p className="text-gray-500 text-sm">By {b.author}</p>
                </div>
              ))}
            </div>
          )}

          {/* Events */}
          {activeTab === "events" && (
            <div className="space-y-3">
              {events.map((e, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-base font-semibold">{e.title}</h3>
                  <p className="text-gray-500 text-sm">{e.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
