"use client";
import Image from "next/image";

export default function SecuritySection() {
  return (
    <section className="bg-[#050B16] text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Illustration */}
        <div className="flex justify-center">
          <Image
            src="" // Place your provided image here
            alt="PoPP Security Protocol"
            width={500}
            height={500}
            className="drop-shadow-[0_0_40px_rgba(0,255,255,0.5)]"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Security at the Core of PoPP</h2>
          <p className="text-gray-300 mb-6">
            Your data, identity, and trust — protected by the Proof-of-Problem Protocol.
          </p>
          <button className="bg-[#0D1B2A] text-white px-6 py-3 rounded-lg hover:bg-[#112A46] transition">
            Read Security Whitepaper
          </button>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-[#0D1B2A] p-5 rounded-lg border border-cyan-500/30">
              <div className="flex items-center mb-2">
                <span className="text-cyan-400 mr-2">🔒</span>
                <h3 className="font-semibold">End-to-End Encryption</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Data encrypted both in transit and at rest.
              </p>
            </div>

            <div className="bg-[#0D1B2A] p-5 rounded-lg border border-cyan-500/30">
              <div className="flex items-center mb-2">
                <span className="text-cyan-400 mr-2">🛡️</span>
                <h3 className="font-semibold">Zero-Trust Architecture</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Always verify, never assume.
              </p>
            </div>

            <div className="bg-[#0D1B2A] p-5 rounded-lg border border-cyan-500/30">
              <div className="flex items-center mb-2">
                <span className="text-cyan-400 mr-2">📜</span>
                <h3 className="font-semibold">Blockchain Transparency</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Immutable and auditable.
              </p>
            </div>

            <div className="bg-[#0D1B2A] p-5 rounded-lg border border-cyan-500/30">
              <div className="flex items-center mb-2">
                <span className="text-cyan-400 mr-2">🤖</span>
                <h3 className="font-semibold">AI-Driven Threat Detection</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Proactive anomaly detection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
