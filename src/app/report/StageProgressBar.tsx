import { FaCheck, FaRocket, FaBrain, FaFileAlt, FaBolt, FaCheckCircle } from "react-icons/fa";

const stepIcons: Record<string, React.ReactNode> = {
  spark: <FaRocket className="w-4 h-4" />,
  truth: <FaBrain className="w-4 h-4" />,
  stamp: <FaFileAlt className="w-4 h-4" />,
  messenger: <FaBolt className="w-4 h-4" />,
  proof: <FaCheckCircle className="w-4 h-4" />,
};

export default function StageProgressBar({
  stages,
  current,
}: {
  stages: any[];
  current: number;
}) {
  const total = stages.length;

  return (
    <div className="w-full py-4">
      <div className="flex items-start justify-between relative">
        {/* Connector lines — only between adjacent nodes */}
        {stages.map((_, idx) => {
          if (idx === total - 1) return null;
          const isSegmentComplete = idx < current;
          // Each segment spans from node idx to node idx+1
          // With justify-between, each node is at (idx / (total-1)) * 100%
          const leftPct = (idx / (total - 1)) * 100;
          const rightPct = ((idx + 1) / (total - 1)) * 100;

          return (
            <div
              key={`seg-${idx}`}
              className="absolute top-5 h-0.5 rounded-full transition-all duration-500"
              style={{
                left: `${leftPct}%`,
                width: `${rightPct - leftPct}%`,
                background: isSegmentComplete
                  ? "linear-gradient(to right, #06b6d4, #3b82f6)"
                  : "rgba(255,255,255,0.06)",
              }}
            />
          );
        })}

        {/* Step nodes */}
        {stages.map((stage, idx) => {
          const isCompleted = idx < current;
          const isCurrent = idx === current;

          return (
            <div key={stage.key} className="flex flex-col items-center relative z-10">
              {/* Circle node */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                    : isCurrent
                    ? "bg-amber-500/20 border-amber-400 text-amber-400 animate-pulse"
                    : "bg-[#0a0f1e] border-white/10 text-gray-600"
                }`}
              >
                {isCompleted ? (
                  <FaCheck className="w-4 h-4 text-white" />
                ) : (
                  stepIcons[stage.key] || <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Label */}
              <div className="mt-2 text-center w-16">
                <span
                  className={`text-xs font-medium leading-tight ${
                    isCompleted
                      ? "text-cyan-400"
                      : isCurrent
                      ? "text-amber-400"
                      : "text-gray-600"
                  }`}
                >
                  {stage.label}
                </span>
              </div>

              {/* Step number */}
              <span
                className={`text-[10px] mt-0.5 ${
                  isCompleted
                    ? "text-gray-500"
                    : isCurrent
                    ? "text-amber-400/60"
                    : "text-gray-700"
                }`}
              >
                Step {idx + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
