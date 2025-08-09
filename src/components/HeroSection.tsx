// 'use client';
// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Html, Stars, OrbitControls, Line, RoundedBox } from '@react-three/drei';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';

// const LAYERS = [
//   { color: "#8e24aa", label: "Reputation & Rewards", icon: "📊" },
//   { color: "#2979ff", label: "Escalation", icon: "⚙️" },
//   { color: "#00c853", label: "Proof Generation", icon: "🔐" },
//   { color: "#ff9a3c", label: "Problem Submission", icon: "🗨️" },
//   { color: "#ff4c4c", label: "User Identity", icon: "👤" },
// ];

// // 🛠 Fixed typing: [number, number, number][]
// function roundedRectPoints(
//   width: number,
//   height: number,
//   radius: number,
//   segments: number,
//   face: 'left' | 'front' = 'left'
// ): [number, number, number][] {
//   const points: [number, number, number][] = [];
//   const w = width / 2 - radius;
//   const h = height / 2 - radius;
//   const seg = Math.max(segments, 2);

//   // Top-left arc
//   for (let i = 0; i <= seg; i++) {
//     const theta = Math.PI + (Math.PI / 2) * (i / seg);
//     points.push([
//       -w + radius * Math.cos(theta),
//       h + radius * Math.sin(theta),
//       0,
//     ]);
//   }

//   // Top-right arc
//   for (let i = 0; i <= seg; i++) {
//     const theta = (3 * Math.PI) / 2 + (Math.PI / 2) * (i / seg);
//     points.push([
//       w + radius * Math.cos(theta),
//       h + radius * Math.sin(theta),
//       0,
//     ]);
//   }

//   // Bottom-right arc
//   for (let i = 0; i <= seg; i++) {
//     const theta = 0 + (Math.PI / 2) * (i / seg);
//     points.push([
//       w + radius * Math.cos(theta),
//       -h + radius * Math.sin(theta),
//       0,
//     ]);
//   }

//   // Bottom-left arc
//   for (let i = 0; i <= seg; i++) {
//     const theta = Math.PI / 2 + (Math.PI / 2) * (i / seg);
//     points.push([
//       -w + radius * Math.cos(theta),
//       -h + radius * Math.sin(theta),
//       0,
//     ]);
//   }

//   // Reposition points based on face
//   if (face === 'left') {
//     return points.map(([z, y]) => [-0.6, y, z]);
//   } else if (face === 'front') {
//     return points.map(([x, y]) => [x, y, 0.6]);
//   }

//   return points;
// }

// const Layer = ({
//   color,
//   y,
//   label,
//   icon,
// }: {
//   color: string;
//   y: number;
//   label: string;
//   icon: string;
// }) => {
//   const width = 1.2;
//   const height = 0.3;
//   const radius = 0.08;
//   const segments = 8;

//   return (
//     <group position={[0, y, 0]}>
//       <RoundedBox args={[width, height, width]} radius={radius} smoothness={8}>
//         <meshPhysicalMaterial
//           color={color}
//           transparent
//           opacity={0.8}
//           metalness={0.95}
//           roughness={0.06}
//           transmission={1}
//           ior={3.2}
//           clearcoat={1}
//           clearcoatRoughness={0.03}
//           reflectivity={0.8}
//           emissive={color}
//           emissiveIntensity={0.7}
//         />
//       </RoundedBox>

//       <Line
//         points={roundedRectPoints(width, height, radius, segments, 'left')}
//         color={color}
//         lineWidth={2}
//       />
//       <Line
//         points={roundedRectPoints(width, height, radius, segments, 'front')}
//         color={color}
//         lineWidth={2}
//       />

//       <Html
//         position={[-0.61, 0, 0]}
//         rotation={[0, Math.PI / 2, 0]}
//         transform
//         occlude
//         distanceFactor={1.2}
//         style={{ pointerEvents: 'none' }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             fontWeight: 700,
//             color: '#fff',
//             fontSize: 14,
//             textShadow: `0 2px 16px ${color}cc, 0 0 8px #000a`,
//             userSelect: 'none',
//             gap: 8,
//             padding: '2px 8px',
//             borderRadius: 8,
//             background: 'rgba(0,0,0,0.15)',
//             boxShadow: `0 0 8px 2px ${color}44`,
//             transform: 'scaleX(-1)',
//           }}
//         >
//           <div
//             style={{
//               width: 24,
//               height: 24,
//               borderRadius: '50%',
//               background: color,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               boxShadow: `0 0 8px 2px ${color}88, 0 0 1px 1px #fff2`,
//               marginRight: 6,
//             }}
//           >
//             <span
//               style={{
//                 color: '#fff',
//                 fontSize: 14,
//                 filter: 'drop-shadow(0 0 2px #fff8)',
//               }}
//             >
//               {icon}
//             </span>
//           </div>
//           <span
//             style={{
//               fontWeight: 800,
//               fontSize: 14,
//               color: '#fff',
//               textShadow: `0 2px 8px ${color}cc, 0 0 4px #000a`,
//               letterSpacing: 0.2,
//               lineHeight: 1.1,
//             }}
//           >
//             {label}
//           </span>
//         </div>
//       </Html>
//     </group>
//   );
// };

// const StackGroup = () => (
//   <group rotation={[-0.05, 0.7, 0]}>
//     {LAYERS.map((layer, i) => (
//       <Layer
//         key={i}
//         color={layer.color}
//         y={0.6 - i * 0.4}
//         label={layer.label}
//         icon={layer.icon}
//       />
//     ))}
//   </group>
// );

// const HeroSection = () => (
//   <div className="w-full h-screen bg-black">
//     <Canvas camera={{ position: [0, 1.2, 3.5], fov: 45 }}>
//       <ambientLight intensity={1.1} />
//       <directionalLight position={[0, 5, 5]} intensity={2.5} />
//       <Stars radius={100} depth={30} count={5000} factor={4} fade />
//       <StackGroup />
//       <OrbitControls enableZoom={false} enablePan={false} />
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2.5} />
//       </EffectComposer>
//     </Canvas>
//   </div>
// );

// export default HeroSection;

// 'use client';
// import React from 'react';

// export default function HeroSection() {
//   return (
//     <section className="bg-[#010b1f] text-white min-h-screen flex flex-col justify-center font-sans">
//       <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

//         {/* Left Side */}
//         <div className="flex-1 space-y-6 max-w-xl">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 bg-[#ff9100] rounded-full flex items-center justify-center">
//               <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
//                 <path d="M12 2L15 8H9L12 2ZM2 12L8 15V9L2 12ZM12 22L9 16H15L12 22ZM22 12L16 9V15L22 12Z" />
//               </svg>
//             </div>
//             <span className="text-lg font-semibold">PoPP</span>
//           </div>

//           {/* Title */}
//           <h1 className="text-4xl lg:text-6xl font-extrabold leading-snug">
//             <span className="bg-gradient-to-r from-[#ff9100] to-[#00a651] bg-clip-text text-transparent">
//               Empowering
//             </span>{' '}
//             India
//           </h1>

//           {/* Subtitle */}
//           <p className="text-lg text-gray-300 max-w-md">
//             with the Proof of Problem Protocol
//             <br />
//             Record local issues, Verify truth on-chain,
//             <br />
//             Transform problems into actionable missions.
//           </p>

//           {/* Buttons */}
//           <div className="flex gap-4">
//             <button className="px-6 py-3 bg-gradient-to-r from-[#ff9100] to-[#ffc400] rounded-lg font-semibold shadow-lg hover:opacity-90 transition">
//               View Problems
//             </button>
//             <button className="px-6 py-3 border border-gray-500 hover:bg-gray-800 rounded-lg font-semibold">
//               Submit a Problem
//             </button>
//           </div>
//         </div>

//         {/* Right Side (Map) */}
//         <div className="flex-1 flex justify-center">
//           <img
//             src="./india.png"
//             alt="India Map"
//             className="w-[650px] mt-[100px] h-auto pt-4"
//           />
//         </div>
//       </div>

//       {/* Bottom Features */}
//       <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
//         {/* Jan Bhagidari */}
//         <div className="flex flex-col items-center text-center">
//           <svg className="text-[#ff9100] w-10 h-10 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <path d="M8 12h1v4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h1v4H8v4zM16 12h-1V8h1a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-1v-4h1v-4z"/>
//           </svg>
//           <h3 className="font-bold text-lg">Jan Bhagidari</h3>
//           <p className="text-gray-400 text-sm">People’s participation</p>
//         </div>

//         {/* On-Chain Satya */}
//         <div className="flex flex-col items-center text-center">
//           <svg className="text-[#ff9100] w-10 h-10 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <path d="M12 20h9"/>
//             <path d="M16 4l6 6"/>
//             <path d="M8 4h8v8H8z"/>
//             <path d="M4 16h4v4H4z"/>
//           </svg>
//           <h3 className="font-bold text-lg">On-Chain Satya</h3>
//           <p className="text-gray-400 text-sm">Truth On-chain</p>
//         </div>

//         {/* Vikas Rewards */}
//         <div className="flex flex-col items-center text-center">
//           <svg className="text-[#00a651] w-10 h-10 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"/>
//           </svg>
//           <h3 className="font-bold text-lg">Vikas Rewards</h3>
//           <p className="text-gray-400 text-sm">Development rewards</p>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';
import React from 'react';

export default function HeroSection() {
  const blocks = [
    { label: 'Reputation & Rewards', color: 'from-[#7A5FFF] to-[#C27CFF]', icon: '📊' },
    { label: 'Escalation', color: 'from-[#00C6FF] to-[#0072FF]', icon: '⚙️' },
    { label: 'Proof Generation', color: 'from-[#00D977] to-[#00A651]', icon: '🔒' },
    { label: 'Problem Submission', color: 'from-[#FF6A00] to-[#FFC400]', icon: '💬' },
    { label: 'Problem Submission', color: 'from-[#FF1E56] to-[#FF5F6D]', icon: '👤' },
  ];

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

    {/* Right Side */}
    <div className="flex-1 flex justify-center">
      <img
        src="./3d.png"
        alt="3D Stack"
        className="w-[650px] h-auto pt-4"
      />
    </div>
  </div>
</section>


  );
}
