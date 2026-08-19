"use client";

import { motion } from "framer-motion";
import { Users, Globe2, MessageCircle, Github, MessageSquare, BookOpen } from "lucide-react";
import Link from "next/link";

const channels = [
  {
    icon: <MessageCircle className="w-6 h-6 text-cyan-400" />,
    title: "Discord",
    desc: "Real-time chat with validators, developers, and the PoPP community.",
    cta: "Join Server",
    href: "https://discord.gg/u6GqfJBsm",
  },
  {
    icon: <Github className="w-6 h-6 text-blue-400" />,
    title: "GitHub — Website",
    desc: "Browse issues, contribute code, and help improve the PoPP website.",
    cta: "View Repo",
    href: "https://github.com/SharvanModi900/landing-page",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    title: "GitHub — Research",
    desc: "Explore the PoPP protocol research, whitepaper, chapters, and architectural documentation.",
    cta: "View Repo",
    href: "https://github.com/SharvanModi900/proof-of-problem-protocol",
  },
];

const waysToEngage = [
  {
    title: "Report Problems",
    desc: "Submit real-world issues with evidence. Earn reputation for verified submissions.",
  },
  {
    title: "Validate Proofs",
    desc: "Become a validator. Stake tokens, review evidence, and earn rewards for accurate validation.",
  },
  {
    title: "Build & Contribute",
    desc: "Improve the protocol — write code, design interfaces, or create documentation.",
  },
  {
    title: "Govern the Protocol",
    desc: "Propose changes, vote on governance proposals, and shape the future of PoPP.",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              <Users className="w-4 h-4 text-cyan-400" />
              Community
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Built by the Community,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                For the Community
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              PoPP is a decentralized protocol maintained by a global network of validators,
              developers, researchers, and civic advocates. Connect, contribute, and help
              shape the future of verifiable truth.
            </p>
          </motion.div>
        </section>

        {/* Channels */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((ch, i) => (
              <motion.div
                key={ch.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="mb-3">{ch.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{ch.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{ch.desc}</p>
                <Link
                  href={ch.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  {ch.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ways to Engage */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Ways to Engage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {waysToEngage.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-cyan-400 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join the Movement
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-6">
                The future of decentralized problem validation is built by people like you.
                Be part of the collective force shaping a transparent future.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contribute"
                  className="px-6 py-3 rounded-lg bg-white text-cyan-600 font-semibold hover:bg-white/90 transition-colors"
                >
                  Start Contributing
                </Link>
                <Link
                  href="/validators"
                  className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Become a Validator
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
