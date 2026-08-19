"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Users, Globe } from "lucide-react";
import Link from "next/link";

export default function ValidatorsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* Hero Section */}
        <section className="relative py-12 px-4 sm:px-6 text-center">
          <motion.h1
            className="text-2xl sm:text-4xl md:text-6xl font-extrabold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PoPP Certified Validators
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Guardians of problem verification. Validators are the trusted elite who ensure that every real-world problem submitted to PoPP is legitimate, impactful, and worth escalating.
          </motion.p>

          {/* Animated Badge */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <div className="p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
          </motion.div>
        </section>

        {/* Why Become a Validator */}
        <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Why Validators Matter
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Award className="h-8 w-8 text-cyan-400" />,
                title: "Prestige & Recognition",
                desc: "Validators are recognized across the PoPP network as trusted authorities.",
              },
              {
                icon: <Users className="h-8 w-8 text-cyan-400" />,
                title: "Global Trust Network",
                desc: "Be part of a global circle of trusted professionals ensuring accuracy and fairness.",
              },
              {
                icon: <Globe className="h-8 w-8 text-cyan-400" />,
                title: "Shape the Future",
                desc: "Directly influence which problems get solved by the world's brightest minds.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                {item.icon}
                <h3 className="mt-3 font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Steps to Become a Validator */}
        <section className="py-10 px-4 sm:px-6 bg-white/[0.03] border-y border-white/[0.06]">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Path to Certification
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              "Pass the Validator Exam",
              "Verify Real Problems",
              "Maintain Accuracy Score",
              "Earn Global Validator Badge",
            ].map((step, i) => (
              <motion.div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <span className="text-cyan-400 text-2xl font-bold">
                  {i + 1}
                </span>
                <p className="mt-2 text-gray-400 text-sm">{step}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10 px-4 sm:px-6 text-center">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ready to Become a Validator?
            </span>
          </motion.h2>
          <Link href="/validators/exam">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Take the Exam
            </motion.button>
          </Link>
        </section>
      </div>
    </div>
  );
}
