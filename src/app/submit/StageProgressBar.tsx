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
  spark: <FaRocket className="text-cyan-400" />,
  truth: <FaBrain className="text-cyan-400" />,
  forge: <FaHammer className="text-cyan-400" />,
  aegger: <FaBolt className="text-amber-400" />,
  stamp: <FaFileAlt className="text-cyan-400" />,
  messenger: <FaBolt className="text-cyan-400" />,
  proof: <FaCheckCircle className="text-cyan-400" />,
  vault: <FaLock className="text-cyan-400" />
};

export default function StageProgressBar({ stages, current }: { stages: any[]; current: number }) {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-6 mb-8">
      {/* Background */}
      <div className="absolute inset-0 z-0 rounded-2xl bg-white/[0.02] border border-white/[0.06]" />

      {/* Single continuous connector line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0" />

      {/* Completed line overlay */}
      <div
        className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-cyan-500 to-blue-500 -translate-y-1/2 z-0 transition-all duration-300"
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
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-cyan-500/10 border-cyan-500/50"
                      : isCurrent
                      ? "bg-amber-500/10 border-amber-500/50"
                      : "bg-white/[0.03] border-white/10"
                  }
                `}
              >
                {stepIcons[s.key] || (
                  <FaCheck className="text-cyan-400" />
                )}
              </div>

              {/* Label */}
              <div className="flex flex-col items-center mt-2 w-20 text-center">
                <span className={`text-xs font-semibold leading-tight ${
                  isCurrent ? "text-amber-400" : isCompleted ? "text-cyan-400" : "text-gray-500"
                }`}>
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
