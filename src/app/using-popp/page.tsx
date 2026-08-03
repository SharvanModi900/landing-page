'use client';

import Link from 'next/link';
import { UserGroupIcon, ChartBarIcon, GlobeAltIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function UsingPoppPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-16">
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Using <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">PoPP</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Discover how different participants can leverage the Proof-of-Problem Protocol
        </p>
      </section>

      {/* For Users Section */}
      <section id="users" className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <UserGroupIcon className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold">For Users</h2>
        </div>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Submit real-world problems, track their verification journey, and earn rewards when your submissions are validated by the network.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">Submit Problems</h3>
            <p className="text-gray-400 text-sm">
              Document and submit real-world problems with evidence. Each submission creates a verifiable record on the blockchain.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-400 text-sm">
              Monitor your submissions through the verification pipeline. See when problems are validated and minted as Truth NFTs.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p className="text-gray-400 text-sm">
              Receive token rewards when your problem submissions are validated by the network and added to the protocol.
            </p>
          </div>
        </div>
        <Link
          href="/report"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
        >
          Submit a Problem <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-white/10"></div>
      </div>

      {/* For Validators Section */}
      <section id="validators" className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <ChartBarIcon className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold">For Validators</h2>
        </div>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Stake tokens, validate problem submissions, and earn rewards for maintaining the integrity of the PoPP network.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">Stake & Participate</h3>
            <p className="text-gray-400 text-sm">
              Stake your tokens to become a validator. Your stake secures the network and determines your validation power.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">Validate Problems</h3>
            <p className="text-gray-400 text-sm">
              Review problem submissions, verify evidence, and vote on whether problems meet the protocol's validation criteria.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p className="text-gray-400 text-sm">
              Earn validation rewards for correct votes. Consistent accuracy increases your reputation and future earnings.
            </p>
          </div>
        </div>
        <Link
          href="/validators"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
        >
          Become a Validator <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="border-t border-white/10"></div>
      </div>

      {/* For Partners Section */}
      <section id="partners" className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <GlobeAltIcon className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold">For Partners</h2>
        </div>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Integrate PoPP's verification infrastructure into your platforms, dApps, or data pipelines to leverage truth-verified problem data.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">API Integration</h3>
            <p className="text-gray-400 text-sm">
              Access verified problem data through our REST API and WebSocket endpoints. Build applications on top of truth-verified data.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">SDK & Tools</h3>
            <p className="text-gray-400 text-sm">
              Use our SDKs and developer tools to integrate PoPP's verification pipeline into your existing systems and workflows.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">Enterprise Solutions</h3>
            <p className="text-gray-400 text-sm">
              Partner with us for custom integrations, dedicated infrastructure, and enterprise-grade support for your organization.
            </p>
          </div>
        </div>
        <Link
          href="/patners"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
        >
          Become a Partner <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-10 mt-10">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-5 max-w-2xl mx-auto">
            Join the PoPP network and contribute to a world where problems are verified, valued, and solved.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/docs"
              className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition"
            >
              Read Documentation
            </Link>
            <Link
              href="/community"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
