'use client';
import React from 'react';
import { motion } from 'framer-motion';

function PoPPVisualizer() {
  return (
    <div className="relative w-[420px] h-[420px] flex items-center justify-center">
      {/* Core Crystal */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 shadow-[0_0_60px_rgba(255,200,100,0.8)]"
      />

      {/* Inflow Problems (red sparks) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-red-500 rounded-full shadow-lg"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: Math.cos((i / 6) * 2 * Math.PI) * 180,
            y: Math.sin((i / 6) * 2 * Math.PI) * 180
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.6
          }}
        />
      ))}

      {/* Outflow Rewards (gold sparks) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_12px_rgba(255,220,120,0.9)]"
          animate={{
            x: [0, Math.cos((i / 8) * 2 * Math.PI) * 200],
            y: [0, Math.sin((i / 8) * 2 * Math.PI) * 200],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}

      {/* Validator Orbit (cyan nodes) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[380px] h-[380px] border border-white/10 rounded-full"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_16px_rgba(0,255,255,0.6)]"
            style={{
              top: "50%", left: "50%",
              transform: `rotate(${i * 60}deg) translate(190px)`
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-[#011344] to-[#000623] text-white min-h-screen flex flex-col justify-center font-sans overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-16 lg:pt-0">

        {/* Left Side */}
        <div className="flex-1 space-y-6 max-w-xl">
          {/* Small Tag */}
          <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-sm inline-block text-gray-300">
            Open Protocol
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-snug">
            <span className="bg-gradient-to-r from-[#5DCBFF] via-[#C77DFF] to-[#FF884D] bg-clip-text text-transparent">
              Ignite the Truth Engine
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-md">
            with the Proof of Problem Protocol.  
            Turn complaints into trust—with cryptographic proof, AI,  
            and decentralized validation.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-[#A77CFF] via-[#FF7B72] to-[#FFB86B] rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform">
              Submit Problem
            </button>
            <button className="px-6 py-3 bg-white/5 border border-white/20 hover:bg-white/10 rounded-lg font-semibold text-gray-300">
              View Mission Demo
            </button>
          </div>
        </div>

        {/* Right Side - PoPP Visualizer */}
        <div className="flex-1 flex justify-center">
          <PoPPVisualizer />
        </div>
      </div>
    </section>
  );
}


// "use client";

// import React from "react";

// export default function HeroWithFoundry() {
//   return (
//     <section className="bg-gradient-to-b from-[#06112a] to-[#00040a] text-white min-h-screen flex items-center">
//       <div className="container mx-auto px-6 lg:px-12 py-20">
//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* LEFT: Content */}
//           <div className="flex-1 max-w-xl space-y-6 z-10">
//             <div className="inline-block px-4 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
//               Open Protocol
//             </div>

//             <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
//               <span className="bg-gradient-to-r from-[#5DCBFF] via-[#C77DFF] to-[#FF884D] bg-clip-text text-transparent">
//                 Proof of Problem Protocol
//               </span>
//             </h1>

//             <p className="text-lg text-gray-300">
//               Turn complaints into trust — submit problems, generate cryptographic proof,
//               validate with nodes, and distribute incentives. PoPP processes problems into
//               verifiable truth.
//             </p>

//             <div className="flex gap-4">
//               <button className="px-6 py-3 bg-gradient-to-r from-[#A77CFF] via-[#FF7B72] to-[#FFB86B] rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform">
//                 Submit Problem
//               </button>
//               <button className="px-6 py-3 bg-white/5 border border-white/20 hover:bg-white/10 rounded-lg font-semibold text-gray-300">
//                 View Mission Demo
//               </button>
//             </div>
//           </div>

//           {/* RIGHT: SVG Mechanical Foundry */}
//           <div className="flex-1 flex justify-center">
//             <FoundrySVG />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------
//    Foundry SVG: pure SVG + CSS
//    ------------------------------ */

// function FoundrySVG() {
//   return (
//     <div className="w-[560px] h-[420px]">
//       <svg viewBox="0 0 1120 840" className="w-full h-full">
//         <defs>
//           {/* metal gradients */}
//           <linearGradient id="metalA" x1="0" x2="1" y1="0" y2="1">
//             <stop offset="0%" stopColor="#6b6b6b" />
//             <stop offset="50%" stopColor="#bfbfbf" />
//             <stop offset="100%" stopColor="#4b4b4b" />
//           </linearGradient>
//           <linearGradient id="metalB" x1="0" x2="1" y1="0" y2="1">
//             <stop offset="0%" stopColor="#3b3b3b" />
//             <stop offset="50%" stopColor="#9ca3af" />
//             <stop offset="100%" stopColor="#1f2937" />
//           </linearGradient>
//           <linearGradient id="molten" x1="0" x2="1">
//             <stop offset="0%" stopColor="rgba(0,0,0,0)" />
//             <stop offset="30%" stopColor="#ffb86b" />
//             <stop offset="60%" stopColor="#ff7b3f" />
//             <stop offset="100%" stopColor="rgba(0,0,0,0)" />
//           </linearGradient>
//           <linearGradient id="proofGlow" x1="0" x2="1">
//             <stop offset="0%" stopColor="#22d3ee" />
//             <stop offset="100%" stopColor="#6366f1" />
//           </linearGradient>

//           <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur stdDeviation="6" result="blur" />
//             <feMerge>
//               <feMergeNode in="blur" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>

//           {/* tooth shape for reuse */}
//           <g id="tooth">
//             <rect x="-10" y="-36" rx="4" ry="4" width="20" height="36" fill="url(#metalB)" stroke="#0b1220" strokeWidth="2" />
//           </g>
//         </defs>

//         {/* background subtle grid */}
//         <g opacity="0.06">
//           {Array.from({ length: 20 }).map((_, i) => (
//             <line key={`v-${i}`} x1={i * 56} y1="0" x2={i * 56} y2="840" stroke="#94a3b8" strokeWidth="1" />
//           ))}
//           {Array.from({ length: 14 }).map((_, i) => (
//             <line key={`h-${i}`} x1="0" y1={i * 60} x2="1120" y2={i * 60} stroke="#94a3b8" strokeWidth="1" />
//           ))}
//         </g>

//         {/* left input pipe (problems) */}
//         <g transform="translate(60,260)">
//           {/* pipe body */}
//           <rect x="0" y="0" width="260" height="60" rx="14" fill="url(#metalA)" stroke="#0b1220" strokeWidth="3" />
//           <text x="20" y="38" fill="#ffe6d1" fontSize="14" fontWeight="700">Problem Input</text>

//           {/* inlet slot */}
//           <rect x="8" y="14" width="36" height="32" rx="6" fill="#2b2b2b" stroke="#111827" />
//           <text x="26" y="36" fill="#ffb3a3" textAnchor="middle" fontSize="14" fontWeight="800">⚠️</text>

//           {/* molten flow line (animated) */}
//           <path className="molten-flow" d="M260 30 C 360 30, 420 90, 480 130" stroke="url(#molten)" strokeWidth="18" strokeLinecap="round" fill="none" />
//         </g>

//         {/* LEFT: small gear A (meshes into core) */}
//         <g transform="translate(480,200)" className="gear-small gear-ccw">
//           {/* teeth (12) */}
//           {Array.from({ length: 12 }).map((_, i) => {
//             const angle = (i / 12) * 360;
//             return (
//               <use key={i} href="#tooth" transform={`rotate(${angle}) translate(0, -60)`} />
//             );
//           })}
//           <circle cx="0" cy="0" r="44" fill="url(#metalA)" stroke="#0b1220" strokeWidth="6" />
//           <circle cx="0" cy="0" r="22" fill="#0b1220" stroke="#1f2937" strokeWidth="4" />
//           <text x="0" y="6" textAnchor="middle" fill="#c7e7ff" fontSize="12" fontWeight="700">PRS</text>
//         </g>

//         {/* LEFT: small gear B */}
//         <g transform="translate(420,360)" className="gear-small gear-cw">
//           {Array.from({ length: 10 }).map((_, i) => {
//             const angle = (i / 10) * 360;
//             return <use key={i} href="#tooth" transform={`rotate(${angle}) translate(0, -52)`} />;
//           })}
//           <circle cx="0" cy="0" r="40" fill="url(#metalB)" stroke="#0b1220" strokeWidth="6" />
//           <circle cx="0" cy="0" r="20" fill="#0b1220" stroke="#1f2937" strokeWidth="3" />
//           <text x="0" y="6" textAnchor="middle" fill="#c1ffd9" fontSize="12" fontWeight="700">PoPP</text>
//         </g>

//         {/* LEFT: small gear C */}
//         <g transform="translate(560,380)" className="gear-small gear-ccw">
//           {Array.from({ length: 11 }).map((_, i) => {
//             const angle = (i / 11) * 360;
//             return <use key={i} href="#tooth" transform={`rotate(${angle}) translate(0, -56)`} />;
//           })}
//           <circle cx="0" cy="0" r="44" fill="url(#metalA)" stroke="#0b1220" strokeWidth="6" />
//           <circle cx="0" cy="0" r="22" fill="#0b1220" stroke="#1f2937" strokeWidth="4" />
//           <text x="0" y="6" textAnchor="middle" fill="#ffd6d6" fontSize="12" fontWeight="700">Esc</text>
//         </g>

//         {/* CENTRAL: main gear (big, processing chamber) */}
//         <g transform="translate(720,300)" className="gear-main">
//           {/* outer rim */}
//           <circle cx="0" cy="0" r="160" fill="url(#metalB)" stroke="#0b1220" strokeWidth="16" />
//           {/* teeth */}
//           {Array.from({ length: 28 }).map((_, i) => {
//             const angle = (i / 28) * 360;
//             return <rect key={i} x={-12} y={-190} width={24} height={48} rx={6} fill="#3b3b3b" transform={`rotate(${angle})`} />;
//           })}

//           {/* inner processing ring */}
//           <circle cx="0" cy="0" r="110" fill="url(#metalA)" stroke="#0b1220" strokeWidth="8" />

//           {/* proof chamber (core) with glow + pulse */}
//           <g className="proof-chamber">
//             <circle cx="0" cy="0" r="54" fill="url(#proofGlow)" filter="url(#softGlow)" />
//             <circle cx="0" cy="0" r="30" fill="#071127" stroke="#7dd3fc" strokeWidth="3" />
//             <text x="0" y="6" textAnchor="middle" fill="#e6f7ff" fontSize="14" fontWeight="800">PROOF</text>
//           </g>
//         </g>

//         {/* pipe connecting main gear to output (right side) */}
//         <g transform="translate(780,300)">
//           <path className="outflow" d="M 160 0 C 260 -40, 340 -80, 420 -60" stroke="url(#molten)" strokeWidth="18" strokeLinecap="round" fill="none" />
//           <path className="outflow-electric" d="M 160 10 C 260 10, 340 10, 420 10" stroke="url(#proofGlow)" strokeWidth="10" strokeLinecap="round" fill="none" />
//         </g>

//         {/* RIGHT: output silos */}
//         <g transform="translate(980,260)">
//           <rect x="-70" y="-100" width="160" height="200" rx="18" fill="url(#metalB)" stroke="#0b1220" strokeWidth="6" />
//           {/* output ports (5) */}
//           {["Validator\nRewards", "Reputation", "Escalation\nFunding", "Governance", "Grants"].map((label, i) => {
//             const y = -60 + i * 36;
//             return (
//               <g key={i}>
//                 <rect x="-46" y={y} width="92" height="28" rx="8" fill="#071127" stroke="#fbbf24" strokeWidth="3" className="silo" style={{ transformOrigin: "0 0" }} />
//                 <text x="60" y={y + 18} fill="#ffebb5" fontSize="12" textAnchor="start" alignmentBaseline="middle" fontWeight="700">
//                   {label}
//                 </text>
//                 <circle cx="-62" cy={y + 14} r="6" fill="#fbbf24" className="silo-light" />
//               </g>
//             );
//           })}
//         </g>
//       </svg>

//       {/* Scoped CSS - animations & polish */}
//       <style jsx>{`
//         /* Gears rotate: main gear cw, small gears ccw (meshed) */
//         .gear-main { transform-box: fill-box; transform-origin: 720px 300px; animation: main-rotate 14s linear infinite; }
//         .gear-small { transform-box: fill-box; transform-origin: 480px 200px; }
//         .gear-small:nth-of-type(1) { transform-origin: 480px 200px; animation: small-ccw 14s linear infinite; } /* PRS */
//         .gear-small:nth-of-type(2) { transform-origin: 420px 360px; animation: small-cw 14s linear infinite; }  /* PoPP */
//         .gear-small:nth-of-type(3) { transform-origin: 560px 380px; animation: small-ccw 14s linear infinite; } /* Esc */

//         @keyframes main-rotate { to { transform: rotate(360deg); } }
//         @keyframes small-ccw { to { transform: rotate(-360deg); } }
//         @keyframes small-cw { to { transform: rotate(360deg); } }

//         /* Molten flow dash */
//         .molten-flow { stroke-dasharray: 220; stroke-dashoffset: 220; animation: flow-anim 2.6s linear infinite; filter: drop-shadow(0 0 12px rgba(255,130,54,0.6)); }
//         @keyframes flow-anim { to { stroke-dashoffset: 0; } }

//         /* Proof chamber pulse */
//         .proof-chamber { transform-box: fill-box; transform-origin: 720px 300px; animation: proof-pulse 2.2s ease-in-out infinite; }
//         @keyframes proof-pulse {
//           0% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(34,211,238,0.6)); }
//           50% { transform: scale(1.08); filter: drop-shadow(0 0 18px rgba(34,211,238,0.95)); }
//           100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(34,211,238,0.6)); }
//         }

//         /* Outflow pipe animation */
//         .outflow { stroke-dasharray: 260; stroke-dashoffset: 260; animation: outflow-anim 3s linear infinite; filter: drop-shadow(0 0 12px rgba(255,180,80,0.5)); }
//         .outflow-electric { stroke-dasharray: 160; stroke-dashoffset: 160; animation: outflow-e 2.4s linear infinite; filter: drop-shadow(0 0 12px rgba(99,102,241,0.5)); }
//         @keyframes outflow-anim { to { stroke-dashoffset: 0; } }
//         @keyframes outflow-e { to { stroke-dashoffset: 0; } }

//         /* Silo pulsing lights */
//         .silo-light { animation: silo-beat 3s ease-in-out infinite; }
//         @keyframes silo-beat {
//           0% { transform: scale(1); opacity: 0.6; filter: drop-shadow(0 0 4px rgba(251,191,36,0.4)); }
//           50% { transform: scale(1.4); opacity: 1; filter: drop-shadow(0 0 12px rgba(251,191,36,0.9)); }
//           100% { transform: scale(1); opacity: 0.6; filter: drop-shadow(0 0 4px rgba(251,191,36,0.4)); }
//         }

//         /* Silos subtle rise (give life) */
//         .silo { animation: silo-shift 6s ease-in-out infinite; transform-origin: center; }
//         @keyframes silo-shift { 0% { transform: translateY(0); } 50% { transform: translateY(-3px); } 100% { transform: translateY(0); } }

//         /* responsive tweak */
//         @media (max-width: 1024px) {
//           .gear-main { animation-duration: 18s; }
//         }
//         @media (max-width: 640px) {
//           .gear-main { transform-origin: center; }
//         }
//       `}</style>
//     </div>
//   );
// }

// 'use client';
// import React from 'react';

// export default function HeroSection() {
//   const orbCount = 5; // number of moving problem files
//   const orbSpacing = 4; // seconds between each file
//   const totalDuration = orbCount * orbSpacing; // total animation loop duration

//   return (
//     <section className="relative bg-gradient-to-b from-[#011344] to-[#000623] text-white min-h-screen flex flex-col justify-center font-sans overflow-hidden">
//       <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-16 lg:pt-0">

//         {/* Left Side */}
//         <div className="flex-1 space-y-6 max-w-xl z-10">
//           <div className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-sm inline-block text-gray-300">
//             Proof of Problem Protocol
//           </div>

//           <h1 className="text-4xl lg:text-6xl font-extrabold leading-snug">
//             <span className="bg-gradient-to-r from-[#FF1E56] via-[#FFC400] via-[#00AEEF] to-[#00D977] bg-clip-text text-transparent">
//               Problems → Proof → Validator → Rewards
//             </span>
//           </h1>

//           <p className="text-lg text-gray-400 max-w-md">
//             Problems travel through PoPP’s truth engine gates, validated step by step until they transform into rewards.  
//             A living conveyor of accountability.
//           </p>
//         </div>

//         {/* Right Side: PoPP Process Flow */}
//         <div className="flex-1 relative">
//           <div className="process-line relative h-48 w-full flex items-center rounded-3xl overflow-hidden bg-[#0a0e23]">

//             {/* Problem Files */}
//             {Array.from({ length: orbCount }).map((_, i) => (
//               <div
//                 key={i}
//                 className="problem-file absolute top-1/2 -translate-y-1/2"
//                 style={{
//                   animationDelay: `${i * orbSpacing}s`,
//                   animationDuration: `${totalDuration}s`,
//                   left: `0%`,
//                 }}
//               >
//                 <div className="file-icon bg-gradient-to-br from-[#FF6A00] to-[#FFC400] shadow-lg">
//                   📄
//                 </div>
//               </div>
//             ))}

//             {/* Gates */}
//             {['Problem', 'Proof', 'Validator', 'Rewards'].map((label, idx) => (
//               <div
//                 key={idx}
//                 className={`gate gate${idx + 1}`}
//                 style={{ left: `${15 + idx * 25}%` }}
//               >
//                 <div className="label">{label}</div>
//                 <div className="gate-door left"></div>
//                 <div className="gate-door right"></div>
//               </div>
//             ))}

//           </div>
//         </div>
//       </div>

//       {/* Global Styles */}
//       <style jsx>{`
//         .process-line {
//           position: relative;
//         }

//         .problem-file {
//           width: 40px;
//           height: 40px;
//           animation-name: moveFile;
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//         }

//         .file-icon {
//           width: 100%;
//           height: 100%;
//           border-radius: 6px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 1.2rem;
//           box-shadow: 0 0 8px #ffb84d, 0 0 16px #ff6a00;
//         }

//         @keyframes moveFile {
//           0% { transform: translateX(0) translateY(-50%); }
//           100% { transform: translateX(95%) translateY(-50%); }
//         }

//         .gate {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           width: 80px;
//           height: 120px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .gate-door {
//           width: 45%;
//           height: 100%;
//           background: linear-gradient(to bottom, #0f1b2a, #00152f);
//           border: 2px solid #00f0ff;
//           border-radius: 4px;
//           box-shadow: 0 0 12px #00f0ff33;
//           animation: gateSlide ${orbSpacing}s infinite;
//         }

//         .gate-door.left { transform-origin: left center; }
//         .gate-door.right { transform-origin: right center; }

//         /* Gate delays synchronized with file movement */
//         .gate1 .gate-door { animation-delay: 0s; }
//         .gate2 .gate-door { animation-delay: 6s; }
//         .gate3 .gate-door { animation-delay: 12s; }
//         .gate4 .gate-door { animation-delay: 18s; }

//         @keyframes gateSlide {
//           0%, 20%, 60%, 100% { transform: translateX(0); }
//           30%, 50% { transform: translateX(-50%); }
//         }

//         .label {
//           position: absolute;
//           top: -36px;
//           left: 50%;
//           transform: translateX(-50%);
//           font-size: 0.9rem;
//           font-weight: 600;
//           color: #00f0ff;
//           text-shadow: 0 0 8px #00f0ff, 0 0 16px #0066ff;
//           white-space: nowrap;
//         }
//       `}</style>
//     </section>
//   );
// }
