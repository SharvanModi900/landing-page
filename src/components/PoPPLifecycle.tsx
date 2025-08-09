"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PoPPLifecycle() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How <span className="text-blue-400">PoPP</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From complaint to action in 5 simple steps
          </p>
        </motion.div>

        {/* Lifecycle Flow */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Lifecycle Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                step: "1",
                title: "Submit Problem",
                desc: "Anyone can submit complaints through dApps, voice kiosks, or APIs",
                icon: "📝"
              },
              {
                step: "2", 
                title: "Validate Truth",
                desc: "Human + AI + IoT validators review and verify the complaint",
                icon: "🔎"
              },
              {
                step: "3",
                title: "Generate Proof", 
                desc: "Validated issues become immutable, tamper-proof ledger entries",
                icon: "🔐"
              },
              {
                step: "4",
                title: "Escalate Action",
                desc: "Smart contracts route issues to appropriate action tracks",
                icon: "⚙️"
              },
              {
                step: "5",
                title: "Reward Truth",
                desc: "Validators and whistleblowers earn reputation and tokens",
                icon: "📊"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Visual Flow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="space-y-6">
                {/* Flow visualization */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-xl mb-2">📝</div>
                    <div className="text-sm text-gray-300">Submit</div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-500 to-orange-500 mx-4"></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-xl mb-2">🔎</div>
                    <div className="text-sm text-gray-300">Validate</div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-orange-500 to-green-500 mx-4"></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-xl mb-2">🔐</div>
                    <div className="text-sm text-gray-300">Prove</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-xl mb-2">⚙️</div>
                    <div className="text-sm text-gray-300">Escalate</div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-purple-500 mx-4"></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-xl mb-2">📊</div>
                    <div className="text-sm text-gray-300">Reward</div>
                  </div>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                    <div className="text-xl font-bold text-blue-300">24hrs</div>
                    <div className="text-sm text-gray-300">First validation</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                    <div className="text-xl font-bold text-purple-300">∞</div>
                    <div className="text-sm text-gray-300">Scalable trust</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 