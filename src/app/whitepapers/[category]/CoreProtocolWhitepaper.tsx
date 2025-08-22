"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Whitepaper {
  title: string;
  category: string;
  description: string;
  image?: string;
}

export default function WhitepaperCategoryPage({ category }: { category: string }) {
  const whitepapers: Whitepaper[] = [
    {
      title: "The Proof-of-Problem Protocol",
      category: "core-protocol",
      description: "A decentralized framework for verifying, validating, and escalating real-world problems.",
      image: "/popp-whitepapers.png",
    },
    {
      title: "Governance Model",
      category: "governance",
      description: "How PoPP ensures community-driven decision-making and consensus.",
      image: "/hero-illustration.png",
    },
    {
      title: "Validator Mechanism",
      category: "validators",
      description: "Incentive models and cryptographic guarantees for validators in PoPP.",
      image: "/popp-architecture.png",
    },
    {
  title: "Interactive PoPP Whitepaper",
  category: "core-protocol",
  description: "Layered, blockchain-based protocol that tokenizes real-world problems into action.",
  image: "/3d.png",
},

  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e11] to-[#14181d] text-white">
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="space-y-6">
          <Link
            href="/whitepapers"
            className="inline-flex items-center text-sm text-gray-400 hover:text-orange-500 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Whitepapers
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Explore the <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">{category}</span> Whitepapers
          </h1>

          <p className="text-gray-300 max-w-lg text-lg leading-relaxed">
            Discover in-depth whitepapers covering governance, validators, protocols, and innovative mechanisms shaping PoPP’s decentralized ecosystem.
          </p>

          <Link
            href="#whitepapers"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-medium transition shadow-lg"
          >
            Explore Whitepapers
          </Link>
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-80 lg:h-96 flex items-center justify-center"
        >
          {/* Abstract gradient background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse-slow"></div>

          {/* Illustration Card */}
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 bg-[#0b0e11] rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-gray-400">[Illustration Here]</span>
          </div>
        </motion.div>
      </section>

      {/* Whitepaper Cards */}
      <section id="whitepapers" className="max-w-6xl mx-auto px-6 mb-20">
      
        <div className="grid md:grid-cols-3 gap-6">
          {whitepapers.map((wp, i) => (
            <WhitepaperCard key={i} {...wp} />
          ))}
        </div>
      </section>

      {/* Future Work */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-4">Future Work</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Enhancements in governance and scalability.</li>
          <li>Community-driven innovation.</li>
          <li>Next-gen interoperability solutions.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-[#14181d] border border-orange-500/30 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between">
          <h3 className="text-lg font-medium mb-4 md:mb-0">
            Want to explore more whitepapers in <span className="text-orange-500 font-semibold">{category}</span>?
          </h3>
          <Link href="/whitepapers" className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-medium">
            Explore Whitepapers
          </Link>
        </div>
      </section>
    </div>
  );
}

/* Whitepaper Card with Hover Overlay Effect */
function WhitepaperCard({ title, description, image }: Whitepaper) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer border border-gray-800 hover:border-orange-500/50 shadow-lg transition"
    >
      {image && (
        <div className="h-64 w-full relative">
          <img src={image} alt={title} className="object-cover w-full h-full rounded-2xl" />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center rounded-2xl">
            <span className="text-white font-semibold text-lg text-center px-4">{title}</span>
          </div>
        </div>
      )}
      <div className="p-6 bg-[#0b0e11]">
        <p className="text-gray-400 text-sm">{description}</p>
      <Link
  href={`/whitepapers/core-protocol/${encodeURIComponent(title.replace(/\s+/g, "-").toLowerCase())}`}
  className="mt-4 inline-block text-orange-500 hover:underline text-sm font-medium"
>
  Read More
</Link>

      </div>
    </motion.div>
  );
}
