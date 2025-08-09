import React from 'react';

export default function PoPPArchitectureSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full py-24 px-8 gap-12">
      {/* Left: SVG Illustration */}
      <div className="flex-1 flex items-center justify-center">
        <svg width="220" height="340" viewBox="0 0 220 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs md:max-w-sm">
          {/* 5 stacked layers */}
          {[0,1,2,3,4].map(i => (
            <rect
              key={i}
              x={20 + i*8}
              y={60 + i*48}
              width={180 - i*16}
              height={40}
              rx={12}
              fill={`url(#layerGradient${i})`}
              opacity={0.9 - i*0.13}
              stroke="#38bdf8"
              strokeWidth="2"
            />
          ))}
          {/* Gradients for layers */}
          <defs>
            <linearGradient id="layerGradient0" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="layerGradient1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="layerGradient2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="layerGradient3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="layerGradient4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Right: Content */}
      <div className="flex-1 flex flex-col items-start justify-center">
        <h2 className="text-4xl font-bold mb-4">PoPP Architecture</h2>
        <p className="text-lg mb-4">
          A 5-layer decentralized system that transforms problems into immutable truth. Each layer adds security, transparency, and validation, ensuring every issue is resolved with trust and clarity.
        </p>
        {/* Optional: List or highlights */}
        <ul className="list-disc pl-6 text-base text-blue-100 space-y-2">
          <li>Layered security and validation</li>
          <li>Transparent, auditable process</li>
          <li>Immutable, trusted outcomes</li>
        </ul>
      </div>
    </section>
  );
} 