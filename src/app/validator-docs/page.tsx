'use client';

export default function ValidatorDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Validator Documentation
          </h1>
          <p className="text-xl text-gray-300">
            Complete guide to becoming and operating as a PoPP validator
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-blue-300">Getting Started</h2>
            <ol className="space-y-4 text-gray-300">
              <li><span className="font-bold text-white">1. Register:</span> Create a validator account and complete KYC verification</li>
              <li><span className="font-bold text-white">2. Stake Tokens:</span> Lock minimum 100 $POPPT as validator stake</li>
              <li><span className="font-bold text-white">3. Pass Exam:</span> Complete the validator qualification exam (80% passing score)</li>
              <li><span className="font-bold text-white">4. Start Validating:</span> Receive assignment notifications and vote on submissions</li>
            </ol>
          </section>

          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-blue-300">Validator Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-amber-900/30 to-amber-700/20 rounded-xl p-6 border border-amber-500/30">
                <h3 className="text-xl font-bold mb-2 text-amber-300">Tier 1: Community</h3>
                <p className="text-sm text-gray-300 mb-2">R-Score: 0-99</p>
                <p className="text-sm">Basic validations, local issues</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-700/20 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-2 text-purple-300">Tier 2: Expert</h3>
                <p className="text-sm text-gray-300 mb-2">R-Score: 100-499</p>
                <p className="text-sm">Regional issues, higher rewards</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-700/20 rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-bold mb-2 text-cyan-300">Tier 3: Senior</h3>
                <p className="text-sm text-gray-300 mb-2">R-Score: 500+</p>
                <p className="text-sm">National issues, max rewards</p>
              </div>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-blue-300">Slashing Conditions</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-xl">⚠</span>
                <div>
                  <span className="font-bold text-white">Incorrect Vote:</span> 5% stake slash (min 1 token) for voting against consensus
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-xl">⚠</span>
                <div>
                  <span className="font-bold text-white">Repeated Failures:</span> Auto-deactivation after 3 incorrect votes
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-xl">⚠</span>
                <div>
                  <span className="font-bold text-white">Inactivity:</span> R-Score decay (1 point per 7 days inactive)
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-blue-300">Rewards</h2>
            <div className="space-y-4 text-gray-300">
              <p><span className="font-bold text-white">Vote Reward:</span> +5 reputation points for participating</p>
              <p><span className="font-bold text-white">Correct Vote:</span> +1 reputation, token reward (10 $POPPT base)</p>
              <p><span className="font-bold text-white">Consensus Bonus:</span> Extra rewards for high-confidence votes</p>
              <p><span className="font-bold text-white">Tier Bonus:</span> Higher tiers earn 1.5x-2x multipliers</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
