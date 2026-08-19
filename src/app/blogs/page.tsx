"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, ArrowRight } from "lucide-react";

const blogs = [
  {
    title: "Why Decentralized Problem Verification Matters",
    excerpt:
      "Current complaint systems let problems vanish into bureaucracy. PoPP changes that by making every problem cryptographically provable and auditable.",
    category: "Protocol",
    date: "2025-07-15",
    readTime: "8 min read",
    icon: "🔐",
  },
  {
    title: "Understanding the Validator Role in PoPP",
    excerpt:
      "Validators are the backbone of PoPP. Learn how they stake tokens, review evidence, and earn rewards for accurate problem validation.",
    category: "Validators",
    date: "2025-07-08",
    readTime: "6 min read",
    icon: "🛡️",
  },
  {
    title: "From Complaint to Protocol: The Origin of PoPP",
    excerpt:
      "How a broken internet line and repeated unanswered complaints led to the creation of a decentralized truth verification protocol.",
    category: "Story",
    date: "2025-06-28",
    readTime: "5 min read",
    icon: "📖",
  },
  {
    title: "How PoPP Integrates with Cosmos SDK",
    excerpt:
      "A technical deep-dive into how PoPP leverages the Cosmos SDK for its Layer-3 blockchain, including ticket submissions and on-chain proofs.",
    category: "Technical",
    date: "2025-06-20",
    readTime: "10 min read",
    icon: "⚙️",
  },
  {
    title: "DAO Governance: Shaping PoPP Together",
    excerpt:
      "PoPP is community-governed. Learn how proposals are submitted, discussed, and voted on by token holders in the PoPP DAO.",
    category: "Governance",
    date: "2025-06-12",
    readTime: "7 min read",
    icon: "🏛️",
  },
  {
    title: "Civic Tech and PoPP: Real-World Impact",
    excerpt:
      "From water contamination reports to infrastructure hazards — how communities are using PoPP to turn verified problems into action.",
    category: "Impact",
    date: "2025-06-01",
    readTime: "6 min read",
    icon: "🌍",
  },
];

const categories = ["All", "Protocol", "Validators", "Story", "Technical", "Governance", "Impact", "News"];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PoPP Blog
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Insights, technical deep-dives, and updates from the Proof-of-Problem Protocol ecosystem.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors flex flex-col"
            >
              {/* Icon header instead of broken images */}
              <div className="w-full h-32 bg-gradient-to-br from-cyan-600/20 to-blue-700/20 flex items-center justify-center">
                <span className="text-4xl">{blog.icon}</span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-400">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {blog.date}
                  </div>
                </div>

                <h2 className="text-base font-semibold mb-2 text-white leading-snug">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-400 flex-1 mb-4">{blog.excerpt}</p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-500">{blog.readTime}</span>
                  <button className="inline-flex items-center gap-1 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
                    Read <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-4">
            Follow the PoPP blog for protocol updates, technical guides, and community stories.
          </p>
          <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition">
            Subscribe to Updates
          </button>
        </div>

        {/* News & Announcements */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              News & Announcements
            </span>
          </h2>
          <div className="space-y-4">
            {[
              { title: "PoPP Protocol V2 Launch Announcement", excerpt: "Enhanced validation mechanisms and improved performance.", date: "Dec 15, 2025", tag: "Announcement" },
              { title: "Partnership with IIT Delhi for Research", excerpt: "Collaborating with IIT Delhi's Blockchain Governance Lab for protocol validation.", date: "Dec 10, 2025", tag: "Partnership" },
              { title: "Validator Network Reaches 500 Members", excerpt: "Over 500 certified validators across 30 countries.", date: "Dec 5, 2025", tag: "Milestone" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-xs font-semibold text-cyan-400">{item.tag}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Calendar className="w-3 h-3" />{item.date}</span>
                </div>
                <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
