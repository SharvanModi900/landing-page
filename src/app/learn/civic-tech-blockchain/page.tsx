import Link from "next/link";

export default function CivicTechBlockchainPage() {
  return (
    <article className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-medium text-blue-400 mb-6">Complete Guide</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Complete Guide to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Civic Tech and Blockchain</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
            How blockchain technology is transforming civic engagement, government transparency, and community-driven problem solving for the modern world.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
            <span>By PoPP Team</span><span>&middot;</span>
            <time dateTime="2025-06-01">June 2025</time><span>&middot;</span>
            <span>12 min read</span>
          </div>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Is Civic Tech?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Civic technology refers to digital tools and platforms that strengthen the relationship between citizens and government, enabling more transparent, participatory, and accountable governance. From open data portals to participatory budgeting platforms, civic tech empowers communities to engage with the systems that affect their daily lives.
            </p>
            <p className="text-gray-300 leading-relaxed">
              However, traditional civic tech faces fundamental challenges: centralized control, data manipulation risks, lack of trust in institutions, and limited incentive structures for participation. Blockchain technology addresses each of these limitations by introducing decentralization, immutability, transparency, and economic incentives.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Why Blockchain for Civic Engagement?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Blockchain provides four key properties that transform civic tech: <strong className="text-white">immutability</strong> (records cannot be altered or deleted), <strong className="text-white">transparency</strong> (all transactions are publicly auditable), <strong className="text-white">decentralization</strong> (no single point of control or failure), and <strong className="text-white">token incentives</strong> (economic rewards for participation).
            </p>
            <p className="text-gray-300 leading-relaxed">
              The <Link href="/how-it-works" className="text-cyan-400 hover:underline">Proof of Problem Protocol</Link> demonstrates these properties in action. Citizens report problems, validators verify them through consensus, and all records are permanently stored on the blockchain — creating a trustless system where problems cannot be silenced or manipulated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Key Applications of Blockchain in Civic Tech</h2>
            <div className="space-y-6">
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Transparent Problem Reporting</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Citizens report civic issues with cryptographic evidence. Every report is timestamped, geotagged, and immutably stored. See real examples in our <Link href="/case-studies" className="text-cyan-400 hover:underline">case studies</Link>.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Decentralized Governance (DAO)</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Token-weighted voting and on-chain proposals ensure community decisions are transparent and verifiable. The <Link href="/dao-dashboard" className="text-cyan-400 hover:underline">DAO Dashboard</Link> lets every participant have a voice.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Verifiable Evidence Chains</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  From photo evidence to IoT sensor data, every piece of information is cryptographically hashed and anchored on-chain. Learn more in the <Link href="/whitepaper" className="text-cyan-400 hover:underline">technical whitepaper</Link>.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Incentivized Participation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Token rewards motivate citizens to report problems, validators to verify them, and communities to participate in governance. Explore the <Link href="/tokenomics" className="text-cyan-400 hover:underline">token economics</Link>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">The Future of Civic Tech</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The convergence of blockchain, AI, and IoT is creating unprecedented opportunities for civic innovation. AI-powered evidence analysis, IoT sensor integration, and decentralized validation networks are building a future where every civic problem can be verified, tracked, and resolved transparently.
            </p>
            <p className="text-gray-300 leading-relaxed">
              PoPP&apos;s <Link href="/roadmap" className="text-cyan-400 hover:underline">roadmap</Link> outlines the vision: from local civic issue reporting to global governance infrastructure, connecting communities, governments, and researchers in a unified ecosystem of transparent problem solving.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Getting Involved</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Whether you&apos;re a citizen, developer, researcher, or government official, there are many ways to participate in the civic tech blockchain movement:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/report" className="text-cyan-400 hover:underline">Report a problem</Link> in your community</li>
              <li><Link href="/contribute" className="text-cyan-400 hover:underline">Contribute</Link> to the open-source codebase</li>
              <li><Link href="/academia-and-research" className="text-cyan-400 hover:underline">Partner for research</Link> on decentralized governance</li>
              <li><Link href="/community" className="text-cyan-400 hover:underline">Join the community</Link> on Discord and GitHub</li>
              <li>Attend <Link href="/events" className="text-cyan-400 hover:underline">events</Link> and <Link href="/workshops" className="text-cyan-400 hover:underline">workshops</Link> to learn more</li>
            </ul>
          </section>
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Explore Civic Tech with PoPP</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">Join the decentralized civic tech revolution.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/how-it-works" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white">Learn How It Works</Link>
            <Link href="/about-us" className="px-6 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg font-semibold text-gray-200">About PoPP</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
