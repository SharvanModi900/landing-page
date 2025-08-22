// import { FaCheckCircle, FaLock, FaBolt, FaFileAlt, FaRocket, FaKey, FaCheck, FaBrain, FaHammer } from 'react-icons/fa';

// const stepIcons = {
//   spark: <FaRocket className="text-cyan-300 drop-shadow-neon" />,
//   truth: <FaBrain className="text-cyan-300 drop-shadow-neon" />,
//   forge: <FaHammer className="text-cyan-300 drop-shadow-neon" />,
//   aegger: <FaBolt className="text-yellow-400 drop-shadow-neon" />,
//   stamp: <FaFileAlt className="text-cyan-300 drop-shadow-neon" />,
//   messenger: <FaBolt className="text-cyan-300 drop-shadow-neon" />,
//   proof: <FaCheckCircle className="text-cyan-300 drop-shadow-neon" />,
//   vault: <FaLock className="text-cyan-300 drop-shadow-neon" />,
// };

// export default function StageProgressBar({ stages, current, completed }) {
//   return (
//     <div className="relative flex items-center justify-between w-full max-w-6xl mx-auto py-8 mb-12">
//       {/* Glassy/blurred background */}
//       <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-r from-cyan-900/60 via-blue-900/60 to-cyan-900/60 backdrop-blur-lg border border-cyan-400/30 shadow-[0_0_60px_10px_rgba(34,211,238,0.18)]" />
//       {stages.map((s, idx) => (
//         <div key={s.key} className="flex flex-col items-center relative z-10">
//           <div
//             className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center text-4xl font-bold border-4 transition-all duration-300
//               ${idx < current
//                 ? 'bg-[#101a2e]/80 border-cyan-400 shadow-[0_0_40px_12px_rgba(34,211,238,0.95)] animate-pulse'
//                 : idx === current
//                   ? 'bg-[#101a2e]/90 border-yellow-400 shadow-[0_0_40px_16px_rgba(251,191,36,0.85)] animate-glow'
//                   : 'bg-[#101a2e]/60 border-cyan-800 shadow-[0_0_16px_4px_rgba(34,211,238,0.2)]'}
//             `}
//           >
//             {stepIcons[s.key] || <FaCheck className="text-cyan-300 drop-shadow-neon" />} 
//             {/* Connector line */}
//             {idx !== stages.length - 1 && (
//               <span className={`absolute top-1/2 left-full w-32 h-2 -ml-4 ${idx < current ? 'bg-cyan-400 shadow-[0_0_32px_12px_rgba(34,211,238,0.95)] animate-glow' : idx === current ? 'bg-yellow-400 shadow-[0_0_32px_12px_rgba(251,191,36,0.85)] animate-glow' : 'bg-slate-700/50'} rounded-full transition-all duration-300`}></span>
//             )}
//           </div>
//           <div className="flex flex-col items-center mt-2 w-24">
//             <span className="text-base font-bold text-cyan-400 drop-shadow-neon leading-tight">
//               {s.label.includes('Problem') ? (
//                 <>
//                   <span className="text-white">{s.label.split('Problem')[0]}</span>
//                   <span className="text-cyan-400">Problem</span>
//                   <span className="text-white">{s.label.split('Problem')[1]}</span>
//                 </>
//               ) : s.label}
//             </span>
//             <span className="text-xs text-cyan-300 drop-shadow-neon leading-tight font-semibold">{s.subtitle}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// // Add this to your global CSS or Tailwind config for extra neon effect if needed:
// // .drop-shadow-neon { filter: drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 12px #22d3ee); }


import {
  FaCheckCircle,
  FaLock,
  FaBolt,
  FaFileAlt,
  FaRocket,
  FaKey,
  FaCheck,
  FaBrain,
  FaHammer
} from "react-icons/fa";

const stepIcons = {
  spark: <FaRocket className="text-cyan-300 drop-shadow-neon" />,
  truth: <FaBrain className="text-cyan-300 drop-shadow-neon" />,
  forge: <FaHammer className="text-cyan-300 drop-shadow-neon" />,
  aegger: <FaBolt className="text-yellow-400 drop-shadow-neon" />,
  stamp: <FaFileAlt className="text-cyan-300 drop-shadow-neon" />,
  messenger: <FaBolt className="text-cyan-300 drop-shadow-neon" />,
  proof: <FaCheckCircle className="text-cyan-300 drop-shadow-neon" />,
  vault: <FaLock className="text-cyan-300 drop-shadow-neon" />
};

export default function StageProgressBar({ stages, current }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 mb-12">
      {/* Glassy blurred background */}
      <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-r from-cyan-900/60 via-blue-900/60 to-cyan-900/60 backdrop-blur-lg border border-cyan-400/30 shadow-[0_0_60px_10px_rgba(34,211,238,0.18)]" />

      {/* Single continuous connector line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700/50 -translate-y-1/2 z-0 rounded-full" />

      {/* Glow overlay for completed steps */}
      <div
        className="absolute top-1/2 left-0 h-1 bg-cyan-400 shadow-[0_0_32px_12px_rgba(34,211,238,0.95)] -translate-y-1/2 z-0 rounded-full transition-all duration-300"
        style={{
          width: `${(current / (stages.length - 1)) * 100}%`
        }}
      />

      <div className="relative flex items-center justify-between z-10">
        {stages.map((s, idx) => {
          const isCompleted = idx < current;
          const isCurrent = idx === current;

          return (
            <div
              key={s.key}
              className="flex flex-col items-center relative z-10"
            >
              {/* Icon container */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold border-4 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-[#101a2e]/80 border-cyan-400 shadow-[0_0_40px_12px_rgba(34,211,238,0.95)]"
                      : isCurrent
                      ? "bg-[#101a2e]/90 border-yellow-400 animate-glow"
                      : "bg-[#101a2e]/60 border-cyan-800 shadow-[0_0_16px_4px_rgba(34,211,238,0.2)]"
                  }
                `}
              >
                {stepIcons[s.key] || (
                  <FaCheck className="text-cyan-300 drop-shadow-neon" />
                )}
              </div>

              {/* Labels without glow */}
              <div className="flex flex-col items-center mt-2 w-24 text-center">
                <span className="text-base font-bold text-cyan-400 leading-tight">
                  {s.label.includes("Problem") ? (
                    <>
                      <span className="text-white">
                        {s.label.split("Problem")[0]}
                      </span>
                      <span className="text-cyan-400">Problem</span>
                      <span className="text-white">
                        {s.label.split("Problem")[1]}
                      </span>
                    </>
                  ) : (
                    s.label
                  )}
                </span>
                {/* <span className="text-xs text-cyan-300 leading-tight font-semibold">
                  {s.subtitle}
                </span> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 
Add this in your global CSS if you want the icon glow to remain strong:
.drop-shadow-neon {
  filter: drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 12px #22d3ee);
}
*/
