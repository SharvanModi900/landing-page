'use client';
import React from 'react';
import { motion } from 'framer-motion';

function PoPPVisualizer() {
  return (
    <div className="relative w-[420px] h-[420px] flex items-center justify-center">
      <svg width="420" height="420" viewBox="0 0 420 420" className="w-full h-full">
        <defs>
          {/* Gradients for premium look */}
          <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7E22CE" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          
          <linearGradient id="problemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          
          <linearGradient id="proofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          
          <linearGradient id="validatorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          
          <linearGradient id="rewardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          
          <linearGradient id="dataFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          
          {/* Glow effects for premium feel */}
          <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feFlood floodColor="#A855F7" floodOpacity="0.6" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
            <feBlend in="SourceGraphic" in2="glow" mode="screen" />
          </filter>
          
          <filter id="problemGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
            <feFlood floodColor="#EF4444" floodOpacity="0.5" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
            <feBlend in="SourceGraphic" in2="glow" mode="screen" />
          </filter>
          
          <filter id="proofGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
            <feFlood floodColor="#3B82F6" floodOpacity="0.5" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
            <feBlend in="SourceGraphic" in2="glow" mode="screen" />
          </filter>
          
          <filter id="validatorGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
            <feFlood floodColor="#10B981" floodOpacity="0.5" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
            <feBlend in="SourceGraphic" in2="glow" mode="screen" />
          </filter>
          
          <filter id="rewardGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
            <feFlood floodColor="#F59E0B" floodOpacity="0.5" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
            <feBlend in="SourceGraphic" in2="glow" mode="screen" />
          </filter>
          
          {/* Drop shadow for depth */}
          <filter id="elementShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Background subtle grid pattern for premium feel */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Central Core - Hexagonal design for tech feel */}
        <motion.g
          animate={{ 
            scale: [1, 1.03, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <polygon 
            points="210,160 250,185 250,235 210,260 170,235 170,185" 
            fill="url(#coreGradient)" 
            filter="url(#coreGlow)" 
            style={{ filter: "url(#elementShadow)" }}
          />
          <text 
            x="210" 
            y="215" 
            textAnchor="middle" 
            fill="white" 
            fontSize="16" 
            fontWeight="bold" 
            fontFamily="sans-serif"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            PoPP
          </text>
        </motion.g>
        
        {/* Problem Submission - Document with warning icon */}
        <motion.g
          animate={{ 
            y: [0, -8, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <g filter="url(#elementShadow)">
            <rect x="70" y="70" width="40" height="50" rx="4" fill="url(#problemGradient)" filter="url(#problemGlow)" />
            <path d="M80 80 L100 80 M80 90 L100 90 M80 100 L90 100" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="90" cy="110" r="6" fill="#FECACA" />
            <text x="90" y="114" textAnchor="middle" fill="#DC2626" fontSize="10" fontWeight="bold" fontFamily="sans-serif">!</text>
          </g>
          <text 
            x="90" 
            y="135" 
            textAnchor="middle" 
            fill="#FECACA" 
            fontSize="11" 
            fontWeight="600" 
            fontFamily="sans-serif"
          >
            Problem
          </text>
        </motion.g>
        
        {/* Proof Generation - Shield with lock */}
        <motion.g
          animate={{ 
            y: [0, 8, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <g filter="url(#elementShadow)">
            <path 
              d="M310 70 L350 70 L350 100 Q350 110 330 120 Q310 110 310 100 Z" 
              fill="url(#proofGradient)" 
              filter="url(#proofGlow)" 
            />
            <rect x="325" y="85" width="10" height="8" rx="1" fill="#BFDBFE" />
            <circle cx="330" cy="83" r="1.5" fill="#BFDBFE" />
          </g>
          <text 
            x="330" 
            y="135" 
            textAnchor="middle" 
            fill="#BFDBFE" 
            fontSize="11" 
            fontWeight="600" 
            fontFamily="sans-serif"
          >
            Proof
          </text>
        </motion.g>
        
        {/* Validator Nodes - Multiple nodes in orbit */}
        {[...Array(5)].map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const x = 210 + Math.cos(angle) * 110;
          const y = 210 + Math.sin(angle) * 110;
          
          return (
            <motion.g
              key={i}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }}
            >
              <g filter="url(#elementShadow)">
                <circle cx={x} cy={y} r="16" fill="url(#validatorGradient)" filter="url(#validatorGlow)" />
                <path 
                  d={`M${x-6} ${y-2} L${x-2} ${y+4} L${x+6} ${y-4}`} 
                  stroke="white" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </g>
            </motion.g>
          );
        })}
        
        {/* Reward Distribution - Coins with upward arrows */}
        <motion.g
          animate={{ 
            y: [0, -8, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          <g filter="url(#elementShadow)">
            <circle cx="90" cy="310" r="12" fill="url(#rewardGradient)" filter="url(#rewardGlow)" />
            <circle cx="82" cy="305" r="8" fill="url(#rewardGradient)" filter="url(#rewardGlow)" opacity="0.8" />
            <circle cx="98" cy="305" r="8" fill="url(#rewardGradient)" filter="url(#rewardGlow)" opacity="0.8" />
            <path d="M85 305 L85 295 M85 295 L82 298 M85 295 L88 298" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <text 
            x="90" 
            y="340" 
            textAnchor="middle" 
            fill="#FDE68A" 
            fontSize="11" 
            fontWeight="600" 
            fontFamily="sans-serif"
          >
            Rewards
          </text>
        </motion.g>
        
        {/* Escalation Path - Arrow with upward direction */}
        <motion.g
          animate={{ 
            y: [0, 8, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
        >
          <g filter="url(#elementShadow)">
            <path 
              d="M330 300 L350 300 L340 285 Z" 
              fill="url(#rewardGradient)" 
              filter="url(#rewardGlow)" 
            />
            <rect x="335" y="300" width="10" height="15" fill="url(#rewardGradient)" filter="url(#rewardGlow)" />
          </g>
          <text 
            x="340" 
            y="340" 
            textAnchor="middle" 
            fill="#FDE68A" 
            fontSize="11" 
            fontWeight="600" 
            fontFamily="sans-serif"
          >
            Escalate
          </text>
        </motion.g>
        
        {/* Data Flow Connections - Curved paths with animated particles */}
        <motion.path 
          d="M110 95 Q210 60 310 95" 
          fill="none" 
          stroke="url(#dataFlowGradient)" 
          strokeWidth="2" 
          opacity="0.6"
        />
        <motion.path 
          d="M310 125 Q210 150 210 160" 
          fill="none" 
          stroke="url(#dataFlowGradient)" 
          strokeWidth="2" 
          opacity="0.6"
        />
        <motion.path 
          d="M210 260 Q210 280 310 310" 
          fill="none" 
          stroke="url(#dataFlowGradient)" 
          strokeWidth="2" 
          opacity="0.6"
        />
        <motion.path 
          d="M210 260 Q210 280 90 310" 
          fill="none" 
          stroke="url(#dataFlowGradient)" 
          strokeWidth="2" 
          opacity="0.6"
        />
        
        {/* Animated data particles */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx="210"
            cy="210"
            r="3"
            fill="#A78BFA"
            initial={{ 
              cx: 110,
              cy: 95
            }}
            animate={{ 
              cx: [110, 210, 310, 310, 210, 210, 210, 90],
              cy: [95, 60, 95, 125, 160, 260, 310, 310]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              delay: i * 2,
              ease: "linear"
            }}
          />
        ))}
      </svg>
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
