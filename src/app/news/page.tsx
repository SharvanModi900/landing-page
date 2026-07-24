"use client";
import React from "react";
import { Newspaper, Calendar, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewsPage() {
  const news = [
    {
      title: "PoPP Protocol V2 Launch Announcement",
      excerpt: "We're excited to announce the launch of PoPP Protocol V2 with enhanced validation mechanisms.",
      date: "Dec 15, 2025",
      category: "Announcement",
      href: "/news/popp-v2-launch",
    },
    {
      title: "Partnership with IIT Delhi for Research",
      excerpt: "PoPP partners with IIT Delhi's Blockchain Governance Lab for protocol validation research.",
      date: "Dec 10, 2025",
      category: "Partnership",
      href: "/news/iit-delhi-partnership",
    },
    {
      title: "Validator Network Reaches 500 Members",
      excerpt: "Our global validator network has grown to over 500 certified validators across 30 countries.",
      date: "Dec 5, 2025",
      category: "Milestone",
      href: "/news/500-validators",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-16">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Newspaper className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold">News & Updates</h1>
        </div>
        <p className="text-gray-400 max-w-3xl">
          Stay updated with the latest developments, announcements, and milestones from the PoPP ecosystem.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-5">
          {news.map((item, i) => (
            <Link key={i} href={item.href}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-400">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar size={12} /> {item.date}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.excerpt}</p>
                  </div>
                  <ArrowRight className="text-cyan-400 ml-4 flex-shrink-0" size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
