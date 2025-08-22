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
    <div className="min-h-screen bg-[#0b0e11] text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Blogs</h1>
        <p className="text-gray-400 mb-8">
          Insights, thought pieces, and updates from the PoPP ecosystem.
        </p>

        {/* Blog Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-[#14181d] rounded-xl overflow-hidden border border-transparent hover:border-orange-500 transition"
            >
              {/* CDN Image */}
              <div className="relative w-full h-48">
                <Image
                  src={''}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority={idx < 2} // lazy-load except first 2
                />
              </div>

              {/* Blog Content */}
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-400 text-sm mb-1">By {blog.author}</p>
                <p className="text-gray-500 text-xs">{blog.date}</p>
                <button className="mt-3 text-orange-500 text-sm font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
