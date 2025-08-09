export default function StageDetailCard({ stage, data }) {
    return (
      <div className="bg-[#101a2e] rounded-3xl p-10 w-[480px] min-h-[340px] shadow-2xl border-2 border-cyan-400/30 backdrop-blur-lg mx-auto flex flex-col justify-center items-start">
        <h3 className="text-cyan-400 text-xl font-semibold mb-4">{stage.label}</h3>
        {stage.key === 'stamp' && (
          <ul className="text-sm space-y-2 text-white">
            <li>✅ Blockchain ID: 0x98...123</li>
            <li>✅ Chain: Cosmos Hub</li>
            <li>✅ Finalization: 2025-07-29</li>
            <li>Status: <span className="text-green-400 font-semibold">Imprinted Successfully</span></li>
          </ul>
        )}
      </div>
    );
  }
  