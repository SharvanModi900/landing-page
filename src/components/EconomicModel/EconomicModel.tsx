//  "use client";

// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useMemo, useState } from "react";

// export default function EconomicModelCosmicScale() {
//   // Data (same semantics as your original)
//   const tokens = [
//     {
//       name: "PoPP Tokens",
//       purpose: "Staking, governance, validator rewards",
//       distribution: "Validators, contributors, ecosystem fund",
//       emoji: "🪙",
//     },
//     {
//       name: "PRS Credits",
//       purpose: "Reputation scoring, validator ranking",
//       distribution: "Earned through successful validations",
//       emoji: "⭐",
//     },
//     {
//       name: "Escalation Tokens",
//       purpose: "Priority processing, media amplification",
//       distribution: "Purchased or earned through community contribution",
//       emoji: "🚀",
//     },
//   ];

//   const incentives = [
//     { name: "Validator Rewards", desc: "Tokens for successful validations, penalties for false positives", emoji: "🏆" },
//     { name: "Reputation System", desc: "PRS credits build validator authority and influence", emoji: "📈" },
//     { name: "Escalation Funding", desc: "Community-funded amplification for critical issues", emoji: "📣" },
//     { name: "Governance Participation", desc: "Voting rights and proposal submission for active participants", emoji: "🗳️" },
//     { name: "Ecosystem Grants", desc: "Funding for developers, researchers, and community initiatives", emoji: "🎓" },
//   ];

//   // Hover-driven tilt logic
//   const [hoverLeft, setHoverLeft] = useState(false);
//   const [hoverRight, setHoverRight] = useState(false);
//   const beamControls = useAnimation();

//   const targetTilt = useMemo(() => {
//     if (hoverLeft && !hoverRight) return -6;   // lean to tokens
//     if (hoverRight && !hoverLeft) return 6;    // lean to incentives
//     return 0;                                  // balanced
//   }, [hoverLeft, hoverRight]);

//   useEffect(() => {
//     beamControls.start({
//       rotate: targetTilt,
//       transition: { type: "spring", stiffness: 120, damping: 14 },
//     });
//   }, [targetTilt, beamControls]);

//   // Gentle idle micro-motion when balanced
//   const idleWobble = {
//     rotate: [0, 0.6, -0.6, 0],
//     transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
//   };

//   const bob = {
//     y: [0, -6, 0, 6, 0],
//     transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
//   };

//   const float = {
//     y: [0, -3, 0, 3, 0],
//     transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
//   };

//   return (
//     <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
//       {/* Deep space glow */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-500/15 blur-[140px]" />
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-blue-500/10 blur-[120px]" />
//       </div>

//       {/* Heading */}
//       <div className="relative max-w-6xl mx-auto text-center mb-16">
//         <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
//           Economic <span className="text-purple-400">Model</span>
//         </h2>
//         <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//           Aligned incentives that reward truth, punish falsehood, and sustain the ecosystem
//         </p>
//       </div>

//       {/* Scale + content (desktop) */}
//       <div className="relative max-w-6xl mx-auto hidden lg:block">
//         <div className="relative h-[540px]">
//           {/* Column pedestal */}
//           <div className="absolute left-1/2 -translate-x-1/2 bottom-8 h-48 w-24 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.25)]" />
//           <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-4 w-56 rounded-b-2xl bg-white/10 border border-white/10" />

//           {/* Central PoPP medallion */}
//           <motion.div
//             className="absolute left-1/2 -translate-x-1/2 top-4 w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 text-white font-bold flex flex-col items-center justify-center shadow-2xl ring-1 ring-white/40"
//             animate={{ scale: [1, 1.06, 1] }}
//             transition={{ duration: 3.5, repeat: Infinity }}
//           >
//             <span className="text-lg">PoPP</span>
//             <span className="text-[10px] opacity-90">Economy</span>
//           </motion.div>

//           {/* Beam (tilting bar) */}
//           <motion.div
//             animate={beamControls}
//             {...(targetTilt === 0 ? { whileHover: idleWobble } : {})}
//             className="absolute left-1/2 -translate-x-1/2 top-28 w-[820px] h-2 rounded-full bg-white/15 border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.25)]"
//           >
//             {/* Beam cap gems */}
//             <div className="absolute -left-3 -top-[6px] w-4 h-4 rounded-full bg-blue-400/70 blur-[1px]" />
//             <div className="absolute -right-3 -top-[6px] w-4 h-4 rounded-full bg-purple-400/70 blur-[1px]" />
//           </motion.div>

//           {/* LEFT PAN - Tokens */}
//           <motion.div
//             onHoverStart={() => setHoverLeft(true)}
//             onHoverEnd={() => setHoverLeft(false)}
//             className="group absolute left-[calc(50%-360px)] top-[180px] w-[320px] h-[320px] rounded-full border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_60px_rgba(59,130,246,0.25)]"
//             animate={hoverLeft ? { y: -6 } : { y: 0 }}
//             transition={{ type: "spring", stiffness: 140, damping: 16 }}
//           >
//             {/* pan chain */}
//             <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-white/20" />
//             <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/50" />

//             <div className="absolute inset-3 rounded-full border border-white/10" />
//             <div className="absolute inset-0 grid place-items-center text-center px-6">
//               <div className="mb-2 text-sm uppercase tracking-wider text-blue-300/80">Token Economics</div>
//               <div className="text-[11px] text-gray-300/80">Staking • Governance • Rewards</div>
//             </div>

//             {/* tokens inside (soft bob) */}
//             <div className="absolute inset-0">
//               {tokens.map((t, i) => {
//                 const positions = [
//                   { x: 38, y: 110 },
//                   { x: 170, y: 70 },
//                   { x: 200, y: 185 },
//                 ];
//                 return (
//                   <motion.div
//                     key={t.name}
//                     className="absolute"
//                     style={{ left: positions[i].x, top: positions[i].y }}
//                     animate={bob}
//                   >
//                     <TokenChip token={t} />
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* RIGHT PAN - Incentives */}
//           <motion.div
//             onHoverStart={() => setHoverRight(true)}
//             onHoverEnd={() => setHoverRight(false)}
//             className="group absolute right-[calc(50%-360px)] top-[180px] w-[320px] h-[320px] rounded-full border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_60px_rgba(168,85,247,0.25)]"
//             animate={hoverRight ? { y: -6 } : { y: 0 }}
//             transition={{ type: "spring", stiffness: 140, damping: 16 }}
//           >
//             {/* pan chain */}
//             <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-white/20" />
//             <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/50" />

//             <div className="absolute inset-3 rounded-full border border-white/10" />
//             <div className="absolute inset-0 grid place-items-center text-center px-6">
//               <div className="mb-2 text-sm uppercase tracking-wider text-purple-300/80">Incentive Mechanisms</div>
//               <div className="text-[11px] text-gray-300/80">Balance • Accountability • Growth</div>
//             </div>

//             {/* incentives inside (soft float) */}
//             <div className="absolute inset-0">
//               {incentives.map((it, i) => {
//                 const positions = [
//                   { x: 38, y: 110 },
//                   { x: 190, y: 70 },
//                   { x: 210, y: 185 },
//                   { x: 110, y: 210 },
//                   { x: 120, y: 40 },
//                 ];
//                 return (
//                   <motion.div
//                     key={it.name}
//                     className="absolute"
//                     style={{ left: positions[i].x, top: positions[i].y }}
//                     animate={float}
//                   >
//                     <IncentiveOrb item={it} />
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </motion.div>
//         </div>

//         {/* Legend / caption */}
//         <div className="mt-10 text-center text-sm text-gray-300">
//           Hover each <span className="text-blue-300">pan</span> to tilt the scale. Hover items to reveal{" "}
//           <span className="text-purple-300">details</span>.
//         </div>
//       </div>

//       {/* Mobile/Tablet fallback: stacked but still “scale-like” */}
//       <div className="relative max-w-3xl mx-auto space-y-8 lg:hidden">
//         <div className="text-center text-white/90 font-semibold">PoPP Economy</div>
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//           <div className="text-blue-300/90 uppercase text-xs tracking-wider mb-3">Token Economics</div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             {tokens.map((t) => (
//               <TokenChip key={t.name} token={t} compact />
//             ))}
//           </div>
//         </div>
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//           <div className="text-purple-300/90 uppercase text-xs tracking-wider mb-3">Incentive Mechanisms</div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             {incentives.map((it) => (
//               <IncentiveOrb key={it.name} item={it} compact />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



// function TokenChip({
//   token,
//   compact = false,
// }: {
//   token: { name: string; purpose: string; distribution: string; emoji: string };
//   compact?: boolean;
// }) {
//   return (
//     <div className="group relative">
//       <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md px-3 py-2 shadow hover:shadow-blue-400/20 transition">
//         <div className="flex items-center gap-2">
//           <span className="text-base">{token.emoji}</span>
//           <span className="text-sm text-white/90">{token.name}</span>
//         </div>
//       </div>

//       {/* Tooltip */}
//       <div className={`pointer-events-none absolute left-1/2 -translate-x-1/2 mt-2 w-[260px] ${compact ? "hidden" : "group-hover:block"} hidden`}>
//         <div className="rounded-lg border border-white/15 bg-slate-900/90 p-3 shadow-xl">
//           <div className="text-[11px] text-gray-300">
//             <div className="mb-1">
//               <span className="text-blue-400">Purpose:</span> {token.purpose}
//             </div>
//             <div>
//               <span className="text-green-400">Distribution:</span> {token.distribution}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function IncentiveOrb({
//   item,
//   compact = false,
// }: {
//   item: { name: string; desc: string; emoji: string };
//   compact?: boolean;
// }) {
//   return (
//     <div className="group relative">
//       <div className="rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3 py-2 shadow hover:shadow-purple-400/20 transition">
//         <div className="flex items-center gap-2">
//           <span className="text-base">{item.emoji}</span>
//           <span className="text-[13px] text-white/90">{item.name}</span>
//         </div>
//       </div>

//       {/* Tooltip */}
//       <div className={`pointer-events-none absolute left-1/2 -translate-x-1/2 mt-2 w-[260px] ${compact ? "hidden" : "group-hover:block"} hidden`}>
//         <div className="rounded-lg border border-white/15 bg-slate-900/90 p-3 shadow-xl">
//           <div className="text-[11px] text-gray-300">{item.desc}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";

export default function IndustrialFoundryWheel() {
  const outputs = [
    { id: "validators", label: "Validator Rewards" },
    { id: "reputation", label: "Reputation System" },
    { id: "escalation", label: "Escalation Funding" },
    { id: "governance", label: "Governance Participation" },
    { id: "grants", label: "Ecosystem Grants" },
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-zinc-900 via-slate-900 to-zinc-950 overflow-hidden">
      {/* Ambient glows & particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 w-96 h-96 rounded-full bg-amber-700/6 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-sky-500/6 blur-3xl" />
      </div>

      {/* Heading */}
      <div className="relative max-w-6xl mx-auto text-center mb-12 z-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-3">
          Industrial <span className="text-amber-400">Foundry</span> Wheel
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          A heavy-duty mechanical engine — tokens are fed through pistons and molten conduits into a roaring core, producing incentive outputs.
        </p>
      </div>

      {/* Main scene */}
      <div className="relative max-w-7xl mx-auto bg-white/2 rounded-2xl border border-white/5 p-4">
        <div className="w-full aspect-[16/9]">
          <svg viewBox="0 0 1400 787" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* metal gradients */}
              <linearGradient id="metalA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c7c7c" />
                <stop offset="50%" stopColor="#cfcfcf" />
                <stop offset="100%" stopColor="#6b6b6b" />
              </linearGradient>
              <linearGradient id="metalB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b3b3b" />
                <stop offset="50%" stopColor="#9ca3af" />
                <stop offset="100%" stopColor="#202124" />
              </linearGradient>

              {/* molten pipe gradient */}
              <linearGradient id="molten" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,180,60,0)" />
                <stop offset="20%" stopColor="rgba(255,140,34,0.95)" />
                <stop offset="60%" stopColor="rgba(255,84,54,0.95)" />
                <stop offset="100%" stopColor="rgba(255,84,54,0)" />
              </linearGradient>

              {/* blue-energy gradient */}
              <linearGradient id="electric" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                <stop offset="25%" stopColor="rgba(34,211,238,0.95)" />
                <stop offset="75%" stopColor="rgba(99,102,241,0.95)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0)" />
              </linearGradient>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* thick pipe pattern (subtle) */}
              <pattern id="pipePattern" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#1f2937" />
                <path d="M0 0 L8 8 M8 0 L0 8" stroke="#111827" strokeWidth="0.5" opacity="0.06" />
              </pattern>
            </defs>

            {/* background faint grid */}
            <g opacity="0.06">
              {Array.from({ length: 35 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="787" stroke="#94a3b8" strokeWidth="1" />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 40} x2="1400" y2={i * 40} stroke="#94a3b8" strokeWidth="1" />
              ))}
            </g>

            {/* LEFT: feeders/pistons + mini-gears */}
            {/* Piston 1 */}
            <g transform="translate(120,220)">
              {/* piston body */}
              <rect x="0" y="0" width="160" height="140" rx="12" fill="url(#metalA)" stroke="#0b1220" strokeWidth="6" />
              {/* animated rod (pumps down/up) */}
              <rect className="piston-rod rod-1" x="46" y="18" width="68" height="22" rx="6" fill="#0f1724" />
              <rect className="piston-rod-head head-1" x="64" y="36" width="32" height="10" rx="3" fill="#fb923c" />
              {/* feeder label */}
              <text x="80" y="-14" textAnchor="middle" fontSize="13" fill="#ffd6a5" fontWeight="700">
                PoPP Tokens
              </text>

              {/* pipe that carries molten to core */}
              <g>
                <path
                  d="M160 70 C 250 80, 360 120, 450 160"
                  stroke="url(#molten)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                  className="molten-flow flow1"
                />
                <path
                  d="M160 70 C 250 80, 360 120, 450 160"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeOpacity="0.15"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* mini-gear */}
              <g transform="translate(20,100)" className="mini-gear spin-cw">
                <circle cx="0" cy="0" r="20" fill="url(#metalB)" stroke="#0b1220" strokeWidth="6" />
                {Array.from({ length: 10 }).map((_, i) => {
                  const a = (i / 10) * 2 * Math.PI;
                  const x = Math.cos(a) * 30;
                  const y = Math.sin(a) * 30;
                  return <rect key={i} x={x - 4} y={y - 6} width="8" height="12" rx="2" fill="#3f3f46" transform={`rotate(${(i / 10) * 360} ${x} ${y})`} />;
                })}
              </g>
            </g>

            {/* Piston 2 */}
            <g transform="translate(120,400)">
              <rect x="0" y="0" width="160" height="140" rx="12" fill="url(#metalA)" stroke="#0b1220" strokeWidth="6" />
              <rect className="piston-rod rod-2" x="46" y="18" width="68" height="22" rx="6" fill="#0f1724" />
              <rect className="piston-rod-head head-2" x="64" y="36" width="32" height="10" rx="3" fill="#84cc16" />
              <text x="80" y="-14" textAnchor="middle" fontSize="13" fill="#bbf7d0" fontWeight="700">
                PRS Credits
              </text>

              <g>
                <path
                  d="M160 70 C 260 110, 360 180, 470 230"
                  stroke="url(#molten)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                  className="molten-flow flow2"
                />
                <path d="M160 70 C 260 110, 360 180, 470 230" stroke="#000" strokeWidth="2" strokeOpacity="0.12" strokeLinecap="round" fill="none" />
              </g>

              <g transform="translate(30,100)" className="mini-gear spin-ccw">
                <circle cx="0" cy="0" r="18" fill="url(#metalB)" stroke="#0b1220" strokeWidth="5" />
                {Array.from({ length: 9 }).map((_, i) => {
                  const a = (i / 9) * 2 * Math.PI;
                  const x = Math.cos(a) * 28;
                  const y = Math.sin(a) * 28;
                  return <rect key={i} x={x - 3.5} y={y - 6} width="7" height="11" rx="2" fill="#3f3f46" transform={`rotate(${(i / 9) * 360} ${x} ${y})`} />;
                })}
              </g>
            </g>

            {/* Piston 3 */}
            <g transform="translate(40,540)">
              <rect x="0" y="0" width="200" height="140" rx="12" fill="url(#metalA)" stroke="#0b1220" strokeWidth="6" />
              <rect className="piston-rod rod-3" x="66" y="18" width="68" height="22" rx="6" fill="#0f1724" />
              <rect className="piston-rod-head head-3" x="84" y="36" width="32" height="10" rx="3" fill="#fb7185" />
              <text x="100" y="-14" textAnchor="middle" fontSize="13" fill="#fecaca" fontWeight="700">
                Escalation Tokens
              </text>

              <g>
                <path
                  d="M200 70 C 340 150, 420 220, 520 280"
                  stroke="url(#molten)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                  className="molten-flow flow3"
                />
                <path d="M200 70 C 340 150, 420 220, 520 280" stroke="#000" strokeWidth="2" strokeOpacity="0.12" strokeLinecap="round" fill="none" />
              </g>

              <g transform="translate(30,100)" className="mini-gear spin-cw-fast">
                <circle cx="0" cy="0" r="20" fill="url(#metalB)" stroke="#0b1220" strokeWidth="6" />
                {Array.from({ length: 11 }).map((_, i) => {
                  const a = (i / 11) * 2 * Math.PI;
                  const x = Math.cos(a) * 32;
                  const y = Math.sin(a) * 32;
                  return <rect key={i} x={x - 4} y={y - 6} width="8" height="12" rx="2" fill="#3f3f46" transform={`rotate(${(i / 11) * 360} ${x} ${y})`} />;
                })}
              </g>
            </g>

            {/* CORE: big heavy wheel (center-left region) */}
            <g transform="translate(560,350)">
              {/* outer rim */}
              <circle r="210" fill="url(#metalB)" stroke="#0b1220" strokeWidth="14" filter="url(#glow)" />
              {/* teeth */}
              {Array.from({ length: 28 }).map((_, i) => {
                const a = (i / 28) * Math.PI * 2;
                const x = Math.cos(a) * 238;
                const y = Math.sin(a) * 238;
                return <rect key={i} x={x - 10} y={y - 18} width="20" height="36" rx="5" fill="#3b3b3b" transform={`rotate(${(i / 28) * 360} ${x} ${y})`} />;
              })}

              {/* inner rim (rotating oppositely) */}
              <g className="core-rotate">
                <circle r="150" fill="url(#metalA)" stroke="#0b1220" strokeWidth="10" />
                {/* glowing inner ring */}
                <circle r="110" fill="url(#electric)" opacity="0.85" className="inner-glow" />
                {/* reactor heart */}
                <g className="reactor-heart">
                  <circle r="68" fill="#0b1220" stroke="#f59e0b" strokeWidth="4" />
                  <circle r="34" fill="#f97316" />
                  <circle r="10" fill="#fff3bf" />
                </g>
              </g>

              {/* core label */}
              <text x="0" y="-270" textAnchor="middle" fontSize="16" fill="#e2e8f0" fontWeight="800">
                ECONOMIC FOUNDRY CORE
              </text>
            </g>

            {/* conduits from core to right-side silos (molten + electric flows) */}
            <g>
              <path className="conduit conduit-a" d="M 740 350 C 840 320, 960 290, 1080 290" stroke="url(#molten)" strokeWidth="22" strokeLinecap="round" fill="none" />
              <path className="conduit conduit-b" d="M 760 400 C 880 400, 1020 400, 1160 400" stroke="url(#electric)" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path className="conduit conduit-c" d="M 740 430 C 850 470, 980 510, 1120 520" stroke="url(#molten)" strokeWidth="18" strokeLinecap="round" fill="none" />
              {/* animated "flow particles" (circles that move along path) */}
              <circle r="6" fill="#ffd27f">
                <animateMotion dur="3.6s" repeatCount="indefinite">
                  <mpath xlinkHref="#"/>{/* placeholder to ensure DOM compiles */}
                </animateMotion>
              </circle>
            </g>

            {/* RIGHT: thick silo ring with outputs */}
            <g transform="translate(1100,350)">
              <rect x="-170" y="-170" width="340" height="340" rx="36" fill="url(#metalB)" stroke="#0b1220" strokeWidth="8" filter="url(#glow)" />
              {/* silos */}
              {outputs.map((o, i) => {
                const angle = (-80 + i * (160 / (outputs.length - 1))) * (Math.PI / 180);
                const x = Math.cos(angle) * 120;
                const y = Math.sin(angle) * 120;
                const textX = Math.cos(angle) * 170;
                const textY = Math.sin(angle) * 170;
                const pulseDelay = i * 0.5;
                return (
                  <g key={o.id}>
                    <g transform={`translate(${x},${y})`}>
                      <rect x="-42" y="-28" width="84" height="56" rx="10" fill="#111827" stroke="#0ea5e9" strokeWidth="3" className="silo" style={{ animationDelay: `${pulseDelay}s` }} />
                      <circle cx="0" cy="-34" r="8" fill="#22d3ee" className="silo-indicator" style={{ animationDelay: `${pulseDelay}s` }} />
                    </g>
                    <text x={textX} y={textY} fill="#e6eef8" fontSize="13" textAnchor={Math.cos(angle) >= 0 ? "start" : "end"} alignmentBaseline="middle" style={{ fontWeight: 700 }}>
                      {o.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Scoped CSS for animations */}
      <style jsx>{`
        /* piston rods pump */
        .piston-rod {
          transform-origin: center;
          animation: pump 1.8s ease-in-out infinite;
        }
        .rod-1 { animation-delay: 0s; }
        .rod-2 { animation-delay: 0.25s; }
        .rod-3 { animation-delay: 0.55s; }
        @keyframes pump {
          0% { transform: translateY(0); }
          25% { transform: translateY(8px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        /* mini gear spins */
        .mini-gear { transform-box: fill-box; transform-origin: center; }
        .spin-cw { animation: spin 9s linear infinite; transform-box: fill-box; transform-origin: center; }
        .spin-ccw { animation: spin 12s linear infinite reverse; transform-box: fill-box; transform-origin: center; }
        .spin-cw-fast { animation: spin 6s linear infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* core heavy rotate */
        .core-rotate { transform-box: fill-box; transform-origin: center; animation: coreturn 28s linear infinite; }
        @keyframes coreturn { to { transform: rotate(-360deg); } }

        /* molten flow dash */
        .molten-flow {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: flowdash 3.2s linear infinite;
          filter: drop-shadow(0 0 10px rgba(255,130,54,0.55));
        }
        .flow1 { animation-delay: 0s; }
        .flow2 { animation-delay: 0.45s; }
        .flow3 { animation-delay: 0.95s; }

        @keyframes flowdash {
          to { stroke-dashoffset: 0; }
        }

        /* conduit pulses: add reverse subtle motion for variety */
        .conduit-a { stroke-dasharray: 12 14; stroke-dashoffset: 0; animation: dashA 2.4s linear infinite; filter: drop-shadow(0 0 12px rgba(255,140,34,0.55)); }
        .conduit-b { stroke-dasharray: 16 12; stroke-dashoffset: 0; animation: dashB 3s linear infinite; filter: drop-shadow(0 0 10px rgba(34,211,238,0.45)); }
        .conduit-c { stroke-dasharray: 14 10; stroke-dashoffset: 0; animation: dashC 2.6s linear infinite; filter: drop-shadow(0 0 10px rgba(255,84,54,0.45)); }

        @keyframes dashA { to { stroke-dashoffset: -120; } }
        @keyframes dashB { to { stroke-dashoffset: -200; } }
        @keyframes dashC { to { stroke-dashoffset: -160; } }

        /* core heart pulse + inner glow */
        .reactor-heart { transform-box: fill-box; transform-origin: center; animation: heartPulse 2.6s ease-in-out infinite; }
        @keyframes heartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .inner-glow { animation: glow 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes glow {
          0% { opacity: 0.75; filter: blur(0px); }
          50% { opacity: 1; filter: blur(6px); }
          100% { opacity: 0.75; filter: blur(0px); }
        }

        /* silos pulse when energized */
        .silo { animation: siloPulse 3.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .silo-indicator { animation: indicatorPulse 3.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes siloPulse {
          0% { transform: scale(1); opacity: 0.85; }
          45% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 0.85; }
        }
        @keyframes indicatorPulse {
          0% { transform: scale(1); opacity: 0.7; filter: blur(0px); }
          45% { transform: scale(1.35); opacity: 1; filter: blur(6px); }
          100% { transform: scale(1); opacity: 0.7; filter: blur(0px); }
        }

        /* small responsive tweaks */
        @media (max-width: 1024px) {
          section { padding: 2rem 1.25rem; }
        }
        @media (max-width: 640px) {
          .mini-gear { display: none; }
        }
      `}</style>
    </section>
  );
}
