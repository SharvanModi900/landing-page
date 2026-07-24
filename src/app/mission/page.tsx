"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Mission
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              To redefine innovation through relentless pursuit of excellence,
              harnessing technology to solve humanity&apos;s most complex challenges.
            </p>
            <div className="mt-8">
              <Link
                href="#learn-more"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Values Section */}
        <section id="learn-more" className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { title: "Innovation", desc: "We push boundaries, challenge norms, and constantly seek new ways to create value." },
              { title: "Integrity", desc: "Our actions are guided by strong ethics, transparency, and accountability." },
              { title: "Impact", desc: "Every step we take aims to positively impact people, communities, and the planet." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Driving the Future Forward
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
                We believe in empowering the world with tools, knowledge, and
                technology that inspire progress and transform lives. Our mission is
                not just a statement — it&apos;s a commitment to shaping a better
                tomorrow.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
