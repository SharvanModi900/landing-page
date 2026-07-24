"use client";

import { motion } from "framer-motion";
import { Users, Globe2, Sparkles } from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Continuum
            </span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-lg">
            PoPP is built by the community, for the community.  
            Our roadmap reflects collective growth — from early adopters  
            to a global movement of decentralized problem solvers.
          </p>
        </section>

        {/* Roadmap Cards */}
        <section className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6 text-cyan-400" />,
              title: "Phase 1 – Community Formation",
              desc: "Bring together early adopters, innovators, and builders to shape the PoPP ecosystem.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
              title: "Phase 2 – Collaborative Validation",
              desc: "Launch problem validation through collective participation, reputation, and transparency.",
            },
            {
              icon: <Globe2 className="w-6 h-6 text-cyan-400" />,
              title: "Phase 3 – Global Network",
              desc: "Scale to a worldwide decentralized community solving real-world problems together.",
            },
          ].map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="mb-3">{phase.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
              <p className="text-gray-400 text-sm">{phase.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Closing CTA */}
        <section className="bg-white/[0.03] border-y border-white/[0.06] py-12 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            Join the Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto mb-6"
          >
            The future of decentralized problem validation is built by people like you. 
            Be part of the collective force shaping tomorrow.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold"
          >
            Join Us
          </motion.button>
        </section>
      </div>
    </div>
  );
}
