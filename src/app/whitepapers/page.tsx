
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  {
    title: "Why Decentralization Matters",
    author: "Alice",
    image: "https://cdn.example.com/blogs/decentralization.jpg",
  },
  {
    title: "The Future of Proof Protocols",
    author: "Bob",
    image: "https://cdn.example.com/blogs/proof-future.jpg",
  },
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
    <div className="min-h-screen bg-[#0b0e11] text-white">
      {/* 🔥 Hero Section */}
   <div className="relative overflow-hidden">
  {/* Gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-700/10 to-transparent blur-3xl opacity-50" />

  <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-36">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
      {/* Left side → Text */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"
        >
          Knowledge Hub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-gray-300 text-lg max-w-lg"
        >
          Discover PoPP’s research papers, governance updates, community blogs, 
          and upcoming events — all in one place.
        </motion.p>
      </div>

      {/* Right side → Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="flex justify-center md:justify-end"
      >
        <Image
          src="https://cdn.example.com/illustrations/knowledge-hub.png"
          alt="Knowledge Hub Illustration"
          width={500}
          height={300}
          className="rounded-2xl shadow-lg shadow-orange-500/20"
          unoptimized
        />
      </motion.div>

    </div>
  </div>
</div>


      {/* 🔽 Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-20">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-700 mb-8 relative">
          {["whitepapers", "news", "blogs", "events"].map((tab) => (
            <button
              key={tab}
              type="button" // ✅ prevents text selection/submit
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 capitalize transition select-none ${
                activeTab === tab
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Search only for Whitepapers */}
        {activeTab === "whitepapers" && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#14181d] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Whitepapers */}
        {activeTab === "whitepapers" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-[#14181d] rounded-xl p-6 border border-transparent hover:border-orange-500 transition"
              >
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{cat.description}</p>
                <Link href={`/whitepapers/${cat.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="text-orange-500 text-xs font-medium cursor-pointer hover:underline">
                    View Papers →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* News */}
        {activeTab === "news" && (
          <div className="space-y-4">
            {news.map((n, idx) => (
              <div key={idx} className="bg-[#14181d] p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{n.title}</h3>
                <p className="text-gray-400 text-sm">{n.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Blogs */}
        {activeTab === "blogs" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-[#14181d] rounded-xl border border-transparent hover:border-orange-500 transition overflow-hidden"
              >
                <Image
                  src={b.image}
                  alt={b.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                  unoptimized
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{b.title}</h3>
                  <p className="text-gray-400 text-sm">By {b.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Events */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {events.map((e, idx) => (
              <div key={idx} className="bg-[#14181d] p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="text-gray-400 text-sm">{e.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
