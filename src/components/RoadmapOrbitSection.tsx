"use client";

import React, { useState } from "react";

const milestones = [
  {
    label: "Prototype",
    description: "Initial proof-of-concept and core protocol design.",
    icon: "🪐",
    color: "#fde68a",
    shape: "hex",
  },
  {
    label: "Testnet Launch",
    description: "Public testnet with validator onboarding.",
    icon: "🛰️",
    color: "#7dd3fc",
    shape: "circle",
  },
  {
    label: "Mainnet Release",
    description: "Production-ready protocol and open participation.",
    icon: "🌍",
    color: "#f472b6",
    shape: "hex",
  },
  {
    label: "Ecosystem Growth",
    description: "Integrations, partnerships, and community expansion.",
    icon: "☄️",
    color: "#34d399",
    shape: "circle",
  },
  {
    label: "Planetary Scale",
    description: "Global adoption and continuous innovation.",
    icon: "🌌",
    color: "#818cf8",
    shape: "hex",
  },
];

const tilePositions = [
  { left: "10%", top: "10%", z: 2 },
  { left: "55%", top: "5%", z: 3 },
  { left: "30%", top: "40%", z: 4 },
  { left: "70%", top: "50%", z: 2 },
  { left: "15%", top: "70%", z: 3 },
];

function HexTile({ children, color, expanded }: { children: React.ReactNode; color: string; expanded: boolean }) {
  return (
    <div
      className={`transition-all duration-300 shadow-xl flex items-center justify-center relative cursor-pointer ${expanded ? "scale-110 z-20" : "z-10"}`}
      style={{
        width: expanded ? 210 : 160,
        height: expanded ? 210 : 160,
        clipPath:
          "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
        background: color,
        boxShadow: expanded ? `0 0 32px 8px ${color}88` : `0 2px 16px 0 #0004`,
      }}
    >
      {children}
    </div>
  );
}

function CircleTile({ children, color, expanded }: { children: React.ReactNode; color: string; expanded: boolean }) {
  return (
    <div
      className={`transition-all duration-300 shadow-xl flex items-center justify-center rounded-full relative cursor-pointer ${expanded ? "scale-110 z-20" : "z-10"}`}
      style={{
        width: expanded ? 200 : 150,
        height: expanded ? 200 : 150,
        background: color,
        boxShadow: expanded ? `0 0 32px 8px ${color}88` : `0 2px 16px 0 #0004`,
      }}
    >
      {children}
    </div>
  );
}

const RoadmapOrbitSection: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section className="w-full flex flex-col items-center pt-32 pb-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-x-hidden min-h-[900px]">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white drop-shadow-lg z-30">
        Roadmap
      </h2>
      <p className="text-lg md:text-xl text-center text-gray-300 mb-12 max-w-2xl z-30">
        From prototype to planetary scale—building the future of truth validation.
      </p>
      <div className="relative w-full max-w-5xl h-[700px] mx-auto">
        {/* Mosaic Tiles */}
        {milestones.map((m, i) => {
          const pos = tilePositions[i];
          const isExpanded = expanded === i;
          const Tile = m.shape === "hex" ? HexTile : CircleTile;
          return (
            <div
              key={m.label}
              className="absolute"
              style={{ left: pos.left, top: pos.top, zIndex: pos.z }}
              onMouseEnter={() => setExpanded(i)}
              onMouseLeave={() => setExpanded(null)}
              onClick={() => setExpanded(isExpanded ? null : i)}
            >
              <Tile color={m.color} expanded={isExpanded}>
                <div className="flex flex-col items-center justify-center w-full h-full px-2 py-2">
                  <span className="text-4xl md:text-5xl mb-2 drop-shadow-lg">{m.icon}</span>
                  <span className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 drop-shadow-sm">{i + 1}</span>
                  <span className="text-lg md:text-xl font-bold text-gray-900 text-center mb-1 drop-shadow-sm">
                    {m.label}
                  </span>
                  {isExpanded && (
                    <span className="text-base md:text-lg text-gray-800 text-center mt-2 bg-white/70 rounded-lg px-2 py-1 shadow-lg">
                      {m.description}
                    </span>
                  )}
                </div>
              </Tile>
            </div>
          );
        })}
        {/* Decorative background dots */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() > 0.8 ? 8 : 4,
              height: Math.random() > 0.8 ? 8 : 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              zIndex: 1,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default RoadmapOrbitSection; 