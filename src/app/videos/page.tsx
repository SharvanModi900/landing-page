"use client";
import React from "react";
import { PlayCircle } from "lucide-react";

export default function VideosPage() {
  const categories = [
    {
      title: "Introduction to PoPP",
      desc: "Understand the foundations of Proof-of-Problem Protocol.",
      videos: [
        { title: "What is PoPP?", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { title: "Why PoPP Matters", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ],
    },
    {
      title: "Workshops & Tutorials",
      desc: "Hands-on guides and deep dives into how PoPP works.",
      videos: [
        { title: "Validator Workshop", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { title: "Proofer Training", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { title: "Building with PoPP SDK", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ],
    },
    {
      title: "Case Studies",
      desc: "See PoPP in action across real-world scenarios.",
      videos: [
        { title: "NGO Use Case", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { title: "Government Applications", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ],
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white min-h-screen">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
              PoPP Video Hub
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Explore tutorials, workshops, and real-world stories that bring the
              Proof-of-Problem Protocol to life.
            </p>
          </div>
          <div className="relative flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl absolute animate-pulse-slow"></div>
            <PlayCircle className="w-40 h-40 text-cyan-400 relative drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 space-y-24 pb-24">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {cat.title}
              </h2>
              <p className="text-gray-400 mt-2">{cat.desc}</p>
            </div>

            {/* Videos Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.videos.map((video, vIdx) => (
                <div
                  key={vIdx}
                  className="bg-[#0D1B2A] rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition group"
                >
                  <div className="relative aspect-video">
                    <iframe
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-cyan-400 transition">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
