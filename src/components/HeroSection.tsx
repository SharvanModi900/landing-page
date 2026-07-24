'use client';
import React from 'react';
import { motion } from 'framer-motion';

function PipelineTeaser() {
  const stages = [
    { label: 'Problem', color: '#ef4444', y: 40 },
    { label: 'Proof', color: '#a855f7', y: 120 },
    { label: 'Validate', color: '#10b981', y: 200 },
    { label: 'Reward', color: '#f59e0b', y: 280 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 320" className="w-full h-auto">
        <defs>
          <linearGradient id="pipeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="33%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="66%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Vertical pipeline line */}
        <motion.line
          x1="200" y1="40" x2="200" y2="280"
          stroke="url(#pipeGlow)"
          strokeWidth="3"
          strokeDasharray="8 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Animated particle flowing down */}
        <motion.circle
          r="5"
          fill="#22d3ee"
          filter="url(#nodeGlow)"
          animate={{ cy: [40, 120, 200, 280, 40] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          cx="200"
        />

        {/* Stage nodes */}
        {stages.map((stage, i) => (
          <motion.g
            key={stage.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.3, type: "spring", stiffness: 200 }}
          >
            {/* Outer ring */}
            <circle
              cx="200" cy={stage.y}
              r="28"
              fill="none"
              stroke={stage.color}
              strokeWidth="2"
              opacity="0.4"
            />
            {/* Inner filled circle */}
            <circle
              cx="200" cy={stage.y}
              r="18"
              fill={stage.color}
              opacity="0.9"
              filter="url(#nodeGlow)"
            />
            {/* Stage number */}
            <text
              x="200" y={stage.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {i + 1}
            </text>
            {/* Label */}
            <text
              x="250" y={stage.y + 5}
              fill="white"
              fontSize="14"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              {stage.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#030712] to-[#0a0f1e] text-white min-h-screen flex flex-col justify-center font-sans overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/5 blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-16 lg:pt-0 relative z-10">
        {/* Left Side */}
        <div className="flex-1 space-y-6 max-w-xl">
          <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-sm inline-block text-gray-400">
            Open Protocol &middot; Decentralized Trust
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold leading-snug">
            <span className="text-white">Every Problem</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Becomes Proof
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-md leading-relaxed">
            PoPP is the decentralized protocol that transforms real-world problems
            into cryptographically validated truths &mdash; proven, immutable, actionable.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-200"
            >
              Submit a Problem
            </a>
            <a
              href="#pipeline"
              className="px-6 py-3 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg font-semibold text-gray-300 transition-colors"
            >
              Watch the Pipeline
            </a>
          </div>
        </div>

        {/* Right Side - Pipeline Teaser */}
        <div className="flex-1 flex justify-center">
          <PipelineTeaser />
        </div>
      </div>
    </section>
  );
}
