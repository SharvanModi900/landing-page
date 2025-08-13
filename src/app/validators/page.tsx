"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Users, Globe } from "lucide-react";

export default function ValidatorsPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PoPP Certified Validators
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Guardians of problem verification. Validators are the trusted elite who ensure that every real-world problem submitted to PoPP is legitimate, impactful, and worth escalating.
        </motion.p>

        {/* Animated Badge */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <div className="p-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg shadow-orange-700/30">
            <ShieldCheck className="h-16 w-16 text-white" />
          </div>
        </motion.div>
      </section>

      {/* Why Become a Validator */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Why Validators Matter
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Award className="h-10 w-10 text-orange-400" />,
              title: "Prestige & Recognition",
              desc: "Validators are recognized across the PoPP network as trusted authorities.",
            },
            {
              icon: <Users className="h-10 w-10 text-orange-400" />,
              title: "Global Trust Network",
              desc: "Be part of a global circle of trusted professionals ensuring accuracy and fairness.",
            },
            {
              icon: <Globe className="h-10 w-10 text-orange-400" />,
              title: "Shape the Future",
              desc: "Directly influence which problems get solved by the world’s brightest minds.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700 hover:border-orange-400 transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              {item.icon}
              <h3 className="mt-4 font-semibold text-xl">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps to Become a Validator */}
      <section className="py-16 px-6 bg-slate-900/70 border-t border-slate-800">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Path to Certification
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            "Pass the Validator Exam",
            "Verify Real Problems",
            "Maintain Accuracy Score",
            "Earn Global Validator Badge",
          ].map((step, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 text-center hover:border-orange-400 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <span className="text-orange-400 text-3xl font-bold">
                {i + 1}
              </span>
              <p className="mt-4 text-gray-300">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Ready to Become a Validator?
        </motion.h2>
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full font-bold text-lg shadow-lg shadow-orange-700/30 hover:shadow-orange-500/50 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Take the Exam
        </motion.button>
      </section>
    </div>
  );
}
