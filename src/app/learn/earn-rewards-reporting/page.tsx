import Link from "next/link";

export default function EarnRewardsReportingPage() {
  return (
    <article className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400 mb-6">Earning Guide</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            How to Earn Rewards{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Reporting Civic Problems</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
            Turn your civic observations into crypto rewards. Learn how to report problems, provide cryptographic evidence, get verified, and earn SAT MUDRA tokens with the PoPP protocol.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
            <span>By PoPP Team</span><span>&middot;</span>
            <time dateTime="2025-06-01">June 2025</time><span>&middot;</span>
            <span>10 min read</span>
          </div>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Overview: Earn Crypto for Civic Reporting</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Proof of Problem Protocol (PoPP) rewards citizens for reporting real-world problems with verifiable evidence. Unlike traditional bounty programs, PoPP uses blockchain verification and community consensus to ensure fair, transparent reward distribution. Every verified problem report earns SAT MUDRA tokens.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The <Link href="/tokenomics" className="text-cyan-400 hover:underline">token economics</Link> are designed to create a sustainable civic data economy where reporters, validators, and community participants all benefit from contributing to transparent problem resolution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Step 1: Identify a Civic Problem</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Look for real-world problems in your community that need attention. Common examples include:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>Potholes, broken roads, and infrastructure hazards</li>
              <li>Water contamination and environmental pollution</li>
              <li>Bribery requests and corruption in government offices</li>
              <li>Broken streetlights, public safety issues</li>
              <li>Illegal construction or zoning violations</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              The key is to identify genuine problems that you can document with evidence. Browse the <Link href="/explorer" className="text-cyan-400 hover:underline">Problem Explorer</Link> to see examples of verified problems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Step 2: Collect Cryptographic Evidence</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Strong evidence is crucial for getting your report verified. Collect multiple types of evidence:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-1">Photo Evidence</h3>
                <p className="text-xs text-gray-400">Take clear, geotagged photos from multiple angles. Include landmarks for context.</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-1">Video Recording</h3>
                <p className="text-xs text-gray-400">Record a short video showing the problem in context. Narrate what you observe.</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-1">Location Data</h3>
                <p className="text-xs text-gray-400">Enable GPS on your device. Precise coordinates help validators verify the location.</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-1">Sensor Data</h3>
                <p className="text-xs text-gray-400">If available, include IoT sensor readings for environmental problems.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Step 3: Submit Your Report</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Use the <Link href="/report" className="text-cyan-400 hover:underline">PoPP Report interface</Link> to submit your problem. The submission process follows a 5-stage pipeline:
            </p>
            <ol className="space-y-3 text-gray-300">
              <li><strong className="text-white">Create Ticket:</strong> Fill in problem details, upload evidence, and set the location.</li>
              <li><strong className="text-white">Evidence Submission:</strong> Your evidence is cryptographically hashed and anchored on-chain.</li>
              <li><strong className="text-white">Community Review:</strong> Nearby citizens review and vote on your report&apos;s genuineness.</li>
              <li><strong className="text-white">Validator Verification:</strong> Certified validators confirm the problem with expert analysis.</li>
              <li><strong className="text-white">Reward Distribution:</strong> Once verified, SAT MUDRA tokens are distributed to all participants.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Step 4: Set Up Your Wallet</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To receive rewards, you need a <Link href="/wallet" className="text-cyan-400 hover:underline">PoPP Wallet</Link>. The wallet stores your SAT MUDRA tokens, tracks your reputation score, and enables participation in governance. Setting up takes just a few minutes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Your wallet also tracks your contribution history, which builds your reputation over time. Higher reputation unlocks access to higher-tier rewards and validator opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Understanding Reward Tiers</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Rewards vary based on problem severity, evidence quality, and validation speed:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <div className="text-2xl">🟢</div>
                <div>
                  <h3 className="text-sm font-bold text-white">Standard Reports</h3>
                  <p className="text-xs text-gray-400">Minor infrastructure issues — basic reward amount</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <div className="text-2xl">🟡</div>
                <div>
                  <h3 className="text-sm font-bold text-white">High-Impact Reports</h3>
                  <p className="text-xs text-gray-400">Environmental hazards, safety risks — elevated rewards</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                <div className="text-2xl">🔴</div>
                <div>
                  <h3 className="text-sm font-bold text-white">Critical Reports</h3>
                  <p className="text-xs text-gray-400">Corruption, public health crises — maximum rewards + escalation</p>
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mt-4">
              Learn more about the reward calculation in the <Link href="/staking-mechanics" className="text-cyan-400 hover:underline">Staking Mechanics</Link> documentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Beyond Reporting: Additional Ways to Earn</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Reporting is just the beginning. You can earn more by participating in the ecosystem:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li><strong className="text-white">Become a Validator:</strong> <Link href="/validators" className="text-cyan-400 hover:underline">Stake tokens</Link> and verify problems for higher rewards</li>
              <li><strong className="text-white">Community Voting:</strong> Vote on problem reports in your area for small rewards</li>
              <li><strong className="text-white">Governance Participation:</strong> Vote on <Link href="/dao-dashboard" className="text-cyan-400 hover:underline">DAO proposals</Link> and earn governance rewards</li>
              <li><strong className="text-white">Provide Proof:</strong> As a <Link href="/proofer" className="text-cyan-400 hover:underline">Proofer</Link>, submit cryptographic proof to strengthen evidence chains</li>
            </ul>
          </section>
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Start Earning Today</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">Report your first civic problem and earn SAT MUDRA tokens.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/report" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white">Report a Problem</Link>
            <Link href="/tokenomics" className="px-6 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg font-semibold text-gray-200">View Tokenomics</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
