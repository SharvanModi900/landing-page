export default function SubmissionTimeline({ stages, completed }) {
    return (
      <div className="bg-[#0f172a] rounded-xl p-6 w-full shadow-md border border-white/10">
        <h4 className="text-cyan-300 text-lg mb-4">✅ Completed Steps</h4>
        <ul className="space-y-2 text-white">
          {completed.map((key, i) => (
            <li key={key} className="flex justify-between">
              <span>✔️ {stages.find((s) => s.key === key).label}</span>
              <span className="text-sm opacity-50">10:{14 + i * 2} PM</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  