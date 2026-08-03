"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ValidatorSection() {
  const validators = [
    {
      type: "Human Validators",
      requirements: "Must stake PoPP tokens, pass onboarding quiz, build reputation",
      benefits: "Higher rewards, governance voting rights, access to critical cases",
      icon: "👥",
      color: "#a855f7",
    },
    {
      type: "AI Validators",
      requirements: "Open-source or audit-verified, run in trusted enclaves",
      benefits: "Pattern detection, 24/7 availability, objective analysis",
      icon: "🤖",
      color: "#22d3ee",
    },
    {
      type: "IoT / Sensor Validators",
      requirements: "Registered devices with metadata and calibration data",
      benefits: "Real-world signals, objective measurements, continuous monitoring",
      icon: "📡",
      color: "#10b981",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Who Can <span className="text-green-400">Validate?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            PoPP allows any qualified participant to become a validator &mdash; as long as they earn it through stake, skill, or device registration.
          </p>
        </div>

        {/* Validator cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {validators.map((validator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{validator.icon}</span>
                <h3 className="text-xl font-bold text-white">{validator.type}</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Requirements</h4>
                  <p className="text-sm text-gray-400">{validator.requirements}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Benefits</h4>
                  <p className="text-sm text-gray-400">{validator.benefits}</p>
                </div>
              </div>

              <div
                className="mt-5 h-px w-full rounded-full"
                style={{ background: `linear-gradient(to right, ${validator.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/validators"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg font-semibold text-gray-300 transition-colors"
          >
            Become a Validator
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
