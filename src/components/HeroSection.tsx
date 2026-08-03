'use client';
import React from 'react';
import { motion } from 'framer-motion';

function PipelineTeaser() {
  const stages = [
    { label: 'Problem', color: '#ef4444', y: 50 },
    { label: 'Proof', color: '#a855f7', y: 130 },
    { label: 'Validate', color: '#10b981', y: 210 },
    { label: 'Reward', color: '#f59e0b', y: 290 },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <svg viewBox="0 0 300 340" className="w-full h-auto">
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

        {/* Vertical pipeline line — centered */}
        <motion.line
          x1="150" y1="50" x2="150" y2="290"
          stroke="url(#pipeGlow)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Animated particle flowing down */}
        <motion.circle
          r="4"
          fill="#22d3ee"
          filter="url(#nodeGlow)"
          animate={{ cy: [50, 130, 210, 290, 50] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          cx="150"
        />

        {/* Stage nodes — centered with labels alternating */}
        {stages.map((stage, i) => {
          const labelOnRight = i % 2 === 0;
          return (
            <motion.g
              key={stage.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.3, type: "spring", stiffness: 200 }}
            >
              {/* Outer ring */}
              <circle
                cx="150" cy={stage.y}
                r="24"
                fill="none"
                stroke={stage.color}
                strokeWidth="1.5"
                opacity="0.35"
              />
              {/* Inner filled circle */}
              <circle
                cx="150" cy={stage.y}
                r="15"
                fill={stage.color}
                opacity="0.9"
                filter="url(#nodeGlow)"
              />
              {/* Stage number */}
              <text
                x="150" y={stage.y + 4}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {i + 1}
              </text>
              {/* Label — alternating sides */}
              {labelOnRight ? (
                <text
                  x="190" y={stage.y + 4}
                  fill="white"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {stage.label}
                </text>
              ) : (
                <text
                  x="110" y={stage.y + 4}
                  fill="white"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  textAnchor="end"
                >
                  {stage.label}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#030712] to-[#0a0f1e] text-white min-h-screen flex flex-col justify-center font-sans overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-20 lg:pt-0 relative z-10">
        {/* Left Side — text content */}
        <div className="flex-1 max-w-lg space-y-5">
          <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 inline-block">
            Open Protocol &middot; Decentralized Trust
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
            <span className="text-white">Every Problem</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Becomes Proof
            </span>
          </h1>

          <p className="text-base lg:text-lg text-gray-400 max-w-md leading-relaxed">
            PoPP is the decentralized protocol that transforms real-world problems
            into cryptographically validated truths &mdash; proven, immutable, actionable.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/report"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-200 text-sm"
            >
              Submit a Problem
            </a>
            <a
              href="#pipeline"
              className="px-6 py-3 bg-white/5 border border-white/15 hover:bg-white/10 rounded-lg font-semibold text-gray-300 transition-colors text-sm"
            >
              Watch the Pipeline
            </a>
          </div>

          {/* App Download */}
          <div className="flex items-center gap-3">
            <a
              href="/app/popp.apk"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl hover:bg-white/[0.08] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-400" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.01 5.732 7.708-8.034zm3.196-1.832l2.386 1.361a1 1 0 010 1.728l-2.386 1.361-2.533-2.533 2.533-2.917zM5.791 3.252l10.01 5.732-2.302 2.302-7.708-8.034z" />
              </svg>
              <div>
                <div className="text-[10px] text-gray-400 leading-none">Download for</div>
                <div className="text-sm font-semibold text-white leading-tight">Android</div>
              </div>
            </a>
            <span className="text-xs text-gray-500">Free &middot; Open Source</span>
          </div>
        </div>

        {/* Right Side — Pipeline Teaser */}
        <div className="flex-1 flex justify-center items-center">
          <PipelineTeaser />
        </div>
      </div>
    </section>
  );
}
