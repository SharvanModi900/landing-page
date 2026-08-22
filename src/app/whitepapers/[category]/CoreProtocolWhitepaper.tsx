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
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <Link
            href="/whitepapers"
            className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Whitepapers
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Explore the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {category}
            </span>{" "}
            Whitepapers
          </h1>
          <p className="text-gray-400 max-w-lg">
            Discover in-depth whitepapers covering governance, validators, protocols, and innovative mechanisms shaping PoPP's decentralized ecosystem.
          </p>
        </section>

        {/* Whitepaper Cards */}
        <section className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-5">
            {whitepapers.map((wp, i) => (
              <WhitepaperCard key={i} {...wp} />
            ))}
          </div>
        </section>

        {/* Future Work */}
        <section className="max-w-5xl mx-auto px-6 py-8 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Future Work</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm">
            <li>Enhancements in governance and scalability.</li>
            <li>Community-driven innovation.</li>
            <li>Next-gen interoperability solutions.</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-base font-medium">
              Want to explore more whitepapers in{" "}
              <span className="text-cyan-400 font-semibold">{category}</span>?
            </h3>
            <Link href="/whitepapers" className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-sm shrink-0">
              Explore Whitepapers
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function WhitepaperCard({ title, description, image }: Whitepaper) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-cyan-500/30 transition bg-white/5"
    >
      {image && (
        <div className="h-40 w-full relative">
          <img src={image} alt={`${title} - PoPP whitepaper cover`} className="object-cover w-full h-full rounded-t-xl" loading="lazy" width={400} height={160} />
        </div>
      )}
      <div className="p-4">
        <p className="text-gray-400 text-sm mb-2">{description}</p>
        <Link
          href={`/whitepapers/core-protocol/${encodeURIComponent(title.replace(/\s+/g, "-").toLowerCase())}`}
          className="text-cyan-400 hover:underline text-xs font-medium"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
}
