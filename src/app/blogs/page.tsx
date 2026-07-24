'use client';

import React from "react";
import Image from "next/image";

const blogs = [
  {
    title: "Why Decentralization Matters",
    author: "Alice",
    date: "2025-08-01",
    image: "https://cdn.yoursite.com/blogs/decentralization.png",
  },
  {
    title: "The Future of Proof Protocols",
    author: "Bob",
    date: "2025-08-10",
    image: "https://cdn.yoursite.com/blogs/future-proof.png",
  },
  {
    title: "Building Trust with Validators",
    author: "Charlie",
    date: "2025-08-18",
    image: "https://cdn.yoursite.com/blogs/validators-trust.png",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Blogs
          </span>
        </h1>
        <p className="text-gray-400 mb-8">
          Insights, thought pieces, and updates from the PoPP ecosystem.
        </p>

        {/* Blog Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 transition"
            >
              <div className="relative w-full h-40">
                <Image
                  src={''}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority={idx < 2}
                />
              </div>
              <div className="p-4">
                <h2 className="text-base font-semibold mb-1">{blog.title}</h2>
                <p className="text-gray-500 text-sm">By {blog.author}</p>
                <p className="text-gray-600 text-xs">{blog.date}</p>
                <button className="mt-2 text-cyan-400 text-sm font-medium hover:underline">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
