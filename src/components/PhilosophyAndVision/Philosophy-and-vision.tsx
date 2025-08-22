// "use client";

// import { motion } from "framer-motion";

// export default function PhilosophyVision() {
//   const pillars = [
//     { name: "Courage", desc: "Truth is dangerous. It takes courage to escalate it.", color: "from-red-400 to-red-600" },
//     { name: "Compassion", desc: "Problems are painful. The protocol must protect the weak.", color: "from-green-400 to-green-600" },
//     { name: "Humility", desc: "Validators can be wrong. The system must be self-healing.", color: "from-yellow-400 to-yellow-600" },
//     { name: "Duty", desc: "Memory is not optional. Remembering is a civic responsibility.", color: "from-blue-400 to-blue-600" }
//   ];

//   const memoryDesigns = [
//     { icon: "📜", text: "Plaintext scroll format for libraries" },
//     { icon: "🪵", text: "Woodcut and ceramic records" },
//     { icon: "🧬", text: "DNA data encoding" },
//     { icon: "🛰️", text: "Orbital memory satellites" }
//   ];

//   const cardVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

//   return (
//     <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-gray-950 to-slate-900 overflow-hidden">
//       {/* Background Grid Lines */}
//       <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none">
//         {Array.from({ length: 20 * 20 }).map((_, idx) => (
//           <div key={idx} className="border border-white/5"></div>
//         ))}
//       </div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Heading */}
//         <div className="text-center mb-16 relative z-10">
//           <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
//             Philosophy & <span className="text-blue-400">Vision</span>
//           </h2>
//           <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
//             PoPP is more than a protocol—it's a civilization-layer storytelling engine
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 relative z-10">
//           {/* Four Pillars */}
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-white mb-6">The Four Pillars</h3>
//             {pillars.map((pillar, idx) => (
//               <motion.div
//                 key={idx}
//                 initial="initial"
//                 whileInView="animate"
//                 viewport={{ once: true }}
//                 variants={cardVariants}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="flex items-start gap-4 group"
//               >
//                 {/* Gradient circle with pulse */}
//                 <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${pillar.color} flex-shrink-0 flex items-center justify-center relative`}>
//                   <div className="absolute inset-0 rounded-full bg-white/10 animate-ping-slow"></div>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-lg text-white mb-1">{pillar.name}</h4>
//                   <p className="text-gray-300 text-sm">{pillar.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Designing for 1,000 Years */}
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-white mb-6">Designing for 1,000 Years</h3>
//             <p className="text-gray-300 mb-6">
//               PoPP is not meant to be upgraded endlessly. It is meant to survive collapse, outlive obsolescence, and transmit truth across centuries.
//             </p>
//             <div className="grid grid-cols-2 gap-4">
//               {memoryDesigns.map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial="initial"
//                   whileInView="animate"
//                   viewport={{ once: true }}
//                   variants={cardVariants}
//                   transition={{ duration: 0.4, delay: idx * 0.1 }}
//                   className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:scale-105 transition-transform duration-300 shadow-lg"
//                 >
//                   <span className="text-2xl">{item.icon}</span>
//                   <span className="text-gray-300 text-sm">{item.text}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";

export default function PhilosophyVisionOrbital() {
  const pillars = [
    { name: "Courage", desc: "Truth is dangerous. It takes courage to escalate it.", color: "from-red-400 to-red-600" },
    { name: "Compassion", desc: "Problems are painful. The protocol must protect the weak.", color: "from-green-400 to-green-600" },
    { name: "Humility", desc: "Validators can be wrong. The system must be self-healing.", color: "from-yellow-400 to-yellow-600" },
    { name: "Duty", desc: "Memory is not optional. Remembering is a civic responsibility.", color: "from-blue-400 to-blue-600" }
  ];

  const memoryDesigns = [
    { icon: "📜", text: "Plaintext scrolls" },
    { icon: "🪵", text: "Woodcut archives" },
    { icon: "🧬", text: "DNA encoding" },
    { icon: "🛰️", text: "Orbital satellites" }
  ];

  return (
    <section className="relative py-32 px-6 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden">
      <div className="relative max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Philosophy & <span className="text-blue-400">Vision</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            PoPP is more than a protocol—it's a civilization-layer storytelling engine
          </p>
        </div>

        {/* Orbital Container */}
        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
          
          {/* Orbit Rings */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5" />

          {/* Central Core */}
          <motion.div 
            className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 flex flex-col items-center justify-center text-white font-bold shadow-xl relative z-10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <span className="text-lg">PoPP</span>
            <span className="text-[10px] text-white/80 font-normal">Civilization Layer</span>
          </motion.div>

          {/* Pillars orbiting */}
          {pillars.map((pillar, idx) => {
            const angle = (idx / pillars.length) * 360;
            return (
              <motion.div
                key={idx}
                className="absolute flex flex-col items-center w-40 text-center"
                style={{
                  transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`
                }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold shadow-lg relative`}>
                  <div className="absolute inset-0 rounded-full bg-white/10 animate-ping-slow"></div>
                </div>
                <h4 className="text-white font-semibold mt-2">{pillar.name}</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-[120px]">{pillar.desc}</p>
              </motion.div>
            );
          })}

          {/* Memory Modules orbiting further out */}
          {memoryDesigns.map((item, idx) => {
            const angle = (idx / memoryDesigns.length) * 360;
            return (
              <motion.div
                key={idx}
                className="absolute flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg"
                style={{
                  transform: `rotate(${angle}deg) translate(220px) rotate(-${angle}deg)`
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-gray-200 text-sm">{item.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
