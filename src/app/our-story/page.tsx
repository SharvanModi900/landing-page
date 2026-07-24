"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* HERO SECTION */}
        <section className="py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              From humble beginnings to making a global impact — discover the journey that shaped who we are today.
            </p>
            <Link
              href="/origin"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              Join Our Journey
            </Link>
          </motion.div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed text-sm">
                To empower communities and businesses worldwide through innovative solutions, integrity, and dedication.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed text-sm">
                We envision a future where technology seamlessly connects and enhances human experiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-8">
                {[
                  { year: "2018", title: "The Beginning", desc: "We started as a small team with big dreams." },
                  { year: "2020", title: "First Breakthrough", desc: "Our first product launch changed everything." },
                  { year: "2023", title: "Global Reach", desc: "We expanded globally, impacting thousands of lives." },
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#030712] z-10 mt-2" />
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <span className="text-sm font-semibold text-cyan-400">{event.year}</span>
                      <h3 className="text-lg font-bold text-white mt-1 mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM / CULTURE */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Culture</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Innovation", desc: "We constantly push boundaries to bring new ideas to life." },
                { title: "Collaboration", desc: "We believe in teamwork that amplifies our strengths." },
                { title: "Excellence", desc: "We strive for the highest quality in everything we do." },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Be Part of Our Next Chapter
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-6">
                We&apos;re just getting started — join us in shaping the future.
              </p>
              <Link
                href="/community"
                className="inline-block px-6 py-3 rounded-lg bg-white text-cyan-600 font-semibold hover:bg-white/90 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
