'use client';
import React from 'react';
import { motion } from 'framer-motion';

function PipelineTeaser() {
  const stages = [
    { label: 'Problem', color: '#06b6d4', y: 50 },
    { label: 'Proof', color: '#3b82f6', y: 130 },
    { label: 'Validate', color: '#10b981', y: 210 },
    { label: 'Reward', color: '#f59e0b', y: 290 },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <svg viewBox="0 0 300 340" className="w-full h-auto">
        <defs>
          <linearGradient id="pipeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="33%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="66%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
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
    <section className="relative bg-gradient-to-b from-[#0a0e1a] via-[#0d1526] to-[#0a0f1a] text-white min-h-screen flex flex-col justify-center font-sans overflow-hidden">
      {/* Ambient glow orbs — radial gradients (composited, no blur) */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-20 lg:pt-0 relative z-10">
        {/* Left Side — text content */}
        <div className="flex-1 max-w-lg space-y-6">
          <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm text-cyan-300 inline-block">
            Open Protocol &middot; Decentralized Trust
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
            <span className="text-white">Every Problem</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Becomes Proof
            </span>
          </h1>

          <p className="text-base lg:text-lg text-gray-300 max-w-md leading-relaxed">
            PoPP is the decentralized protocol that transforms real-world problems
            into cryptographically validated truths &mdash; proven, immutable, actionable.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/report"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-200 text-sm"
            >
              Submit a Problem
            </a>
            <a
              href="#pipeline"
              className="px-6 py-3 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] rounded-lg font-semibold text-gray-200 transition-colors text-sm"
            >
              Watch the Pipeline
            </a>
          </div>

          {/* App Download */}
          <div className="flex items-center gap-3">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc1uzrlQPc3q_DignaVOK2yzKKaLgtGMQNvCx5iZmgmcx-VAeA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.07] transition-colors"
            >
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <div>
                <div className="text-[10px] text-gray-400 leading-none">Join</div>
                <div className="text-sm font-semibold text-white leading-tight">Early Access</div>
              </div>
            </a>
            <span className="text-xs text-gray-400">Free &middot; Open Source</span>
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
