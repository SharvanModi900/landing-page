"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Partner with{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                PoPP
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-lg">
              Join forces with the Proof-of-Problem Protocol and be part of a global revolution.
              Together, we solve real-world issues with blockchain-backed transparency.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition"
              >
                Become a Partner
              </Link>
              <Link
                href="/about-us"
                className="px-6 py-3 rounded-lg border border-white/15 bg-white/5 font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/patners.png"
              alt="Partnership"
              className="relative z-10 w-full max-w-md mx-auto"
            />
          </motion.div>
        </section>

        {/* Why Partner With Us */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
          >
            Why Partner With Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Global Reach", desc: "Expand your impact with a worldwide community." },
              { title: "Innovation", desc: "Be part of cutting-edge blockchain solutions." },
              { title: "Transparency", desc: "Work with trust and proof at the core." },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-cyan-400 mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Types of Partnerships */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Types of Partnerships
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {["Technology", "Community", "Enterprise", "Investors"].map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-white">{type} Partners</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Ready to Build the Future Together?
              </h2>
              <p className="text-gray-400 mb-8">
                Let&apos;s collaborate and redefine problem-solving at scale.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
