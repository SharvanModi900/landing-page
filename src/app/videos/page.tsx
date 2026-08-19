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
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="pt-16">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  PoPP Video Hub
                </span>
              </h1>
              <p className="text-gray-400 text-lg mt-4">
                Explore tutorials, workshops, and real-world stories that bring the
                Proof-of-Problem Protocol to life.
              </p>
            </div>
            <div className="relative flex justify-center">
              <PlayCircle className="w-32 h-32 text-cyan-500/30" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 space-y-10">
          {categories.map((cat, idx) => (
            <div key={idx}>
              <div className="mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {cat.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{cat.desc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.videos.map((video, vIdx) => (
                  <div
                    key={vIdx}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
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
                    <div className="p-3">
                      <h3 className="font-semibold text-sm">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
