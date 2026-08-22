import Link from "next/link";

export default function DecentralizedProblemValidationPage() {
  return (
    <article className="min-h-screen bg-[#030712] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-medium text-cyan-400 mb-6">
            Ultimate Guide
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            The Ultimate Guide to{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Decentralized Problem Validation
            </span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
            How blockchain technology and community consensus are revolutionizing the way we verify, report, and resolve real-world civic problems — without relying on centralized authorities.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
            <span>By PoPP Team</span>
            <span>&middot;</span>
            <time dateTime="2025-06-01">June 2025</time>
            <span>&middot;</span>
            <span>15 min read</span>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 mb-12">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">Table of Contents</h2>
          <ol className="space-y-2 text-sm text-cyan-400">
            <li><Link href="#what-is" className="hover:text-cyan-300">1. What Is Decentralized Problem Validation?</Link></li>
            <li><Link href="#how-it-works" className="hover:text-cyan-300">2. How the Validation Process Works</Link></li>
            <li><Link href="#evidence" className="hover:text-cyan-300">3. Cryptographic Evidence &amp; Proof</Link></li>
            <li><Link href="#validators" className="hover:text-cyan-300">4. The Role of Validators</Link></li>
            <li><Link href="#consensus" className="hover:text-cyan-300">5. Community Consensus Mechanism</Link></li>
            <li><Link href="#rewards" className="hover:text-cyan-300">6. Economic Incentives &amp; Rewards</Link></li>
            <li><Link href="#use-cases" className="hover:text-cyan-300">7. Real-World Use Cases</Link></li>
            <li><Link href="#getting-started" className="hover:text-cyan-300">8. Getting Started with PoPP</Link></li>
          </ol>
        </nav>

        <div className="prose prose-invert prose-cyan max-w-none space-y-12">
          {/* Section 1 */}
          <section id="what-is">
            <h2 className="text-2xl font-bold text-white mb-4">What Is Decentralized Problem Validation?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Decentralized problem validation is a process of verifying real-world issues — from potholes and water contamination to corruption and infrastructure hazards — using blockchain technology, cryptographic evidence, and community consensus instead of centralized authorities.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Traditional problem reporting relies on government agencies, centralized platforms, or media organizations to verify and act on civic issues. These systems are often slow, opaque, and vulnerable to manipulation or censorship. Decentralized validation removes these single points of failure by distributing the verification process across a network of independent validators.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The <Link href="/how-it-works" className="text-cyan-400 hover:underline">Proof of Problem Protocol (PoPP)</Link> is the leading implementation of this approach. It transforms everyday civic complaints into cryptographically verified, immutable records that cannot be silenced or manipulated.
            </p>
          </section>

          {/* Section 2 */}
          <section id="how-it-works">
            <h2 className="text-2xl font-bold text-white mb-4">How the Validation Process Works</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The PoPP validation pipeline follows a structured, multi-stage process designed to ensure accuracy, fairness, and transparency at every step:
            </p>
            <ol className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">1</span>
                <div>
                  <strong className="text-white">Problem Reporting:</strong> A citizen identifies a real-world problem and submits a report through the <Link href="/report" className="text-cyan-400 hover:underline">PoPP Report interface</Link>. The submission includes photos, videos, GPS coordinates, and a detailed description.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">2</span>
                <div>
                  <strong className="text-white">Evidence Collection:</strong> The reporter uploads cryptographic evidence — geotagged photos, video recordings, IoT sensor data, and audio recordings. Each piece of evidence is hashed and timestamped on the blockchain.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">3</span>
                <div>
                  <strong className="text-white">Community Vote:</strong> People within approximately 10km of the reported problem review the evidence and vote on its genuineness. This proximity-based validation ensures that only people with direct knowledge of the area can verify the problem.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">4</span>
                <div>
                  <strong className="text-white">AI + Human Validation:</strong> AI algorithms analyze evidence quality, checking for manipulation, consistency, and completeness. Simultaneously, certified <Link href="/validators" className="text-cyan-400 hover:underline">human validators</Link> review the report and confirm the findings.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">5</span>
                <div>
                  <strong className="text-white">Rewards Distribution:</strong> Once verified, all participants — reporters, validators, and community voters — receive SAT MUDRA token rewards. The problem record becomes immutable on the blockchain.
                </div>
              </li>
            </ol>
          </section>

          {/* Section 3 */}
          <section id="evidence">
            <h2 className="text-2xl font-bold text-white mb-4">Cryptographic Evidence &amp; Proof</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              At the heart of decentralized problem validation is cryptographic evidence. Unlike traditional reporting where photos can be faked and documents can be altered, PoPP uses multiple layers of cryptographic proof to ensure evidence integrity:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li><strong className="text-white">SHA-256 Hashing:</strong> Every piece of evidence is hashed using SHA-256 before being stored. Any tampering with the original file changes the hash, making manipulation immediately detectable.</li>
              <li><strong className="text-white">GPS Timestamping:</strong> Location data is embedded in the evidence metadata and cross-referenced with satellite data to verify the problem&apos;s location.</li>
              <li><strong className="text-white">Blockchain Anchoring:</strong> Evidence hashes are anchored on the Cosmos SDK blockchain, creating an immutable audit trail that cannot be altered or deleted.</li>
              <li><strong className="text-white">Multi-Modal Corroboration:</strong> The system cross-references photos, videos, audio, and sensor data to detect inconsistencies and verify the problem&apos;s existence from multiple angles.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Learn more about the technical architecture in our <Link href="/whitepaper" className="text-cyan-400 hover:underline">technical whitepaper</Link>.
            </p>
          </section>

          {/* Section 4 */}
          <section id="validators">
            <h2 className="text-2xl font-bold text-white mb-4">The Role of Validators</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Validators are the backbone of the PoPP network. These are individuals who stake SAT MUDRA tokens, pass a <Link href="/validators/exam" className="text-cyan-400 hover:underline">certification exam</Link>, and commit to honestly reviewing problem reports. Validators earn rewards for accurate validations and face penalties (slashing) for dishonest behavior.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The validator system is designed to be Sybil-resistant through reputation and stake-based gating. Higher reputation scores unlock access to higher-tier validations with greater rewards. This creates a meritocratic system where the most accurate and active validators earn the most.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Validators operate pseudonymously using <Link href="/did" className="text-cyan-400 hover:underline">Decentralized Identifiers (DIDs)</Link>, protecting their privacy while maintaining accountability through their on-chain reputation.
            </p>
          </section>

          {/* Section 5 */}
          <section id="consensus">
            <h2 className="text-2xl font-bold text-white mb-4">Community Consensus Mechanism</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              PoPP uses a multi-layered consensus mechanism that combines community voting with expert validation:
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              First, community members within the problem&apos;s vicinity cast votes on the report&apos;s genuineness. If more than 60% of voters confirm the problem, it moves to the next stage. If consensus is low, the report enters cross-verification with additional validator rounds (maximum 3 rounds).
            </p>
            <p className="text-gray-300 leading-relaxed">
              This approach prevents both false positives (fake problems being validated) and false negatives (real problems being dismissed). The combination of community knowledge and expert validation creates a robust verification system that is resistant to manipulation and collusion.
            </p>
          </section>

          {/* Section 6 */}
          <section id="rewards">
            <h2 className="text-2xl font-bold text-white mb-4">Economic Incentives &amp; Rewards</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The PoPP token economy is designed to align incentives across all participants. Reporters earn tokens when their problems are verified. Validators earn tokens for accurate validations. Community voters earn small rewards for participation. All rewards come from the protocol&apos;s emission schedule and transaction fees.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The <Link href="/tokenomics" className="text-cyan-400 hover:underline">tokenomics model</Link> ensures long-term sustainability through a balanced emission curve, staking requirements, and deflationary mechanisms like token burning for slashed validators.
            </p>
          </section>

          {/* Section 7 */}
          <section id="use-cases">
            <h2 className="text-2xl font-bold text-white mb-4">Real-World Use Cases</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Decentralized problem validation has transformative potential across multiple domains:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li><strong className="text-white">Civic Infrastructure:</strong> Report and verify potholes, broken streetlights, water contamination, and other infrastructure issues. See our <Link href="/case-studies" className="text-cyan-400 hover:underline">case studies</Link> for real examples.</li>
              <li><strong className="text-white">Anti-Corruption:</strong> Document bribery, embezzlement, and governance failures with immutable evidence that cannot be suppressed.</li>
              <li><strong className="text-white">Environmental Monitoring:</strong> Track pollution, illegal dumping, and environmental hazards with IoT sensor integration through <Link href="/sensors" className="text-cyan-400 hover:underline">PoPP Sensors</Link>.</li>
              <li><strong className="text-white">Legal Evidence:</strong> Create court-admissible records of problems with cryptographic chain of custody, useful for <Link href="/legal-professionals" className="text-cyan-400 hover:underline">legal professionals</Link>.</li>
              <li><strong className="text-white">Research &amp; Data:</strong> Generate open, anonymized datasets for researchers studying civic issues and urban development through <Link href="/academia-and-research" className="text-cyan-400 hover:underline">academic partnerships</Link>.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="getting-started">
            <h2 className="text-2xl font-bold text-white mb-4">Getting Started with PoPP</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Ready to participate in decentralized problem validation? Here&apos;s how to get started:
            </p>
            <ol className="space-y-3 text-gray-300">
              <li>1. <Link href="/report" className="text-cyan-400 hover:underline">Report your first problem</Link> — document a civic issue with photos and location data.</li>
              <li>2. <Link href="/wallet" className="text-cyan-400 hover:underline">Set up your wallet</Link> — receive SAT MUDRA tokens for your contributions.</li>
              <li>3. <Link href="/validators" className="text-cyan-400 hover:underline">Become a validator</Link> — stake tokens and start verifying problems for rewards.</li>
              <li>4. <Link href="/dao-dashboard" className="text-cyan-400 hover:underline">Participate in governance</Link> — vote on proposals and shape the protocol&apos;s future.</li>
              <li>5. Explore the <Link href="/explorer" className="text-cyan-400 hover:underline">Problem Explorer</Link> — browse verified problems and see the network in action.</li>
            </ol>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Start Validating Problems Today</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Join the decentralized movement for transparent, verifiable civic problem reporting.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/report" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white">
              Report a Problem
            </Link>
            <Link href="/how-it-works" className="px-6 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg font-semibold text-gray-200">
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
