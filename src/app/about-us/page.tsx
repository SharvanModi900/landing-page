import React from "react";

export default function PoPPAboutMockup() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07080a] via-[#0b0f16] to-[#081018] text-gray-100 font-sans">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff7e3a] via-[#ff9a4f] to-[#ffd49a] drop-shadow-lg">
              Empowering Problem Solvers Worldwide
            </h1>
            <p className="mt-6 text-gray-300 max-w-2xl leading-relaxed text-lg">
              PoPP — the Proof-of-Problem Protocol — is a decentralized framework that verifies, validates, and escalates
              real-world problems with transparency and traceability. We connect communities, validators and partners to
              direct resources to what truly matters.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff7e3a] to-[#ff9a4f] font-semibold shadow-lg transform hover:-translate-y-0.5 transition">Learn Our Mission</button>
              <button className="px-6 py-3 rounded-lg border border-[#2b3945] bg-black/30 font-semibold hover:bg-white/5 transition">Explore Whitepaper</button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" /> Live Network
              </div>
              <div className="inline-flex items-center gap-2">• Active Validators: <strong className="text-white ml-2">3,217</strong></div>
              <div className="inline-flex items-center gap-2">• Verified Today: <strong className="text-white ml-2">327</strong></div>
            </div>
          </div>

          {/* Hologram globe mock */}
          <div className="w-full max-w-md flex-1">
            <div className="relative w-full aspect-[1/1] rounded-2xl bg-gradient-to-b from-white/3 to-transparent border border-white/5 p-6">
              <svg viewBox="0 0 240 240" className="w-full h-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#ff7e3a" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <g transform="translate(120,120)">
                  <circle r="68" fill="none" stroke="url(#g1)" strokeWidth="1.6" opacity="0.9" />
                  <g stroke="#ff7e3a" strokeWidth="1.2" opacity="0.85">
                    <path d="M-68 0a68 68 0 0 0 136 0" strokeLinecap="round" />
                    <path d="M0-68a68 68 0 0 1 0 136" strokeLinecap="round" transform="rotate(30)" />
                  </g>
                  {/* nodes */}
                  <circle cx="-20" cy="-50" r="3" fill="#ff7e3a" />
                  <circle cx="40" cy="-10" r="3" fill="#00e5ff" />
                  <circle cx="10" cy="50" r="3" fill="#ffd49a" />
                  <circle cx="-42" cy="18" r="3" fill="#ff7e3a" />
                  {/* connecting lines */}
                  <line x1="-20" y1="-50" x2="40" y2="-10" stroke="#ff7e3a" strokeOpacity="0.45" strokeWidth="0.8" />
                  <line x1="40" y1="-10" x2="10" y2="50" stroke="#00e5ff" strokeOpacity="0.35" strokeWidth="0.8" />
                </g>
              </svg>
              <div className="absolute bottom-4 left-4 text-xs text-gray-300">Network: 0.9s latency • PoPP Testnet</div>
            </div>
          </div>
        </div>

        {/* subtle animated telemetry bar */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#ff7e3a] to-transparent opacity-40 animate-[marquee_12s_linear_infinite]" style={{backgroundSize: '200% 100%'}} />
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Mission & Vision */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-b from-white/3 to-white/2 p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold text-[#ffb78a]">Our Mission</h3>
            <p className="mt-4 text-gray-300 leading-relaxed">To empower communities, organizations, and innovators with a transparent and decentralized way to verify problems — ensuring that attention and resources are directed where they truly matter.</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
              <li className="flex items-start gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-[#ff7e3a]" /> Decentralized verification</li>
              <li className="flex items-start gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-[#00e5ff]" /> Transparent records</li>
              <li className="flex items-start gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-[#ffd49a]" /> Community governance</li>
              <li className="flex items-start gap-3"><span className="w-2 h-2 mt-2 rounded-full bg-[#9df7ff]" /> Incentivized validators</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-black/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-[#8edfff]">Our Vision</h3>
            <p className="mt-4 text-gray-300 leading-relaxed">A world where decision-makers, communities and organizations rely on verified facts before deploying solutions — reducing waste, improving outcomes and building trust.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/3 text-center">
                <div className="text-sm text-gray-200">Accessibility</div>
              </div>
              <div className="p-3 rounded-lg bg-white/3 text-center">
                <div className="text-sm text-gray-200">Scalability</div>
              </div>
              <div className="p-3 rounded-lg bg-white/3 text-center">
                <div className="text-sm text-gray-200">Integrity</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">The PoPP Journey</h3>
          <div className="relative">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-8 min-w-[900px] items-center">
                {[
                  {year: '2024', title: 'Whitepaper Released'},
                  {year: '2025 Q1', title: 'Testnet Launched'},
                  {year: '2025 Q3', title: 'Validator Program'},
                  {year: '2026', title: 'Mainnet Pilot'},
                  {year: 'Future', title: 'Global Adoption'},
                ].map((m, i) => (
                  <div key={i} className="min-w-[220px] p-4 bg-gradient-to-b from-white/3 to-transparent rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#ffd49a] font-semibold">{m.year}</div>
                        <div className="text-white font-bold mt-2">{m.title}</div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff7e3a] to-[#00e5ff] flex items-center justify-center text-black font-bold">{i + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-6 right-6 top-1/2 border-t border-dashed border-white/10" />
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {title: 'Transparency', desc: 'Open and auditable records'},
              {title: 'Decentralization', desc: 'No single point of control'},
              {title: 'Collaboration', desc: 'Communities solve problems together'},
              {title: 'Security', desc: 'Data integrity by design'},
              {title: 'Impact', desc: 'Focus on outcomes and accountability'},
              {title: 'Innovation', desc: 'Continuous improvement'},
            ].map((v, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-white/3 to-transparent border border-white/5 hover:shadow-[0_10px_30px_rgba(255,126,58,0.06)] transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff7e3a] to-[#00e5ff] flex items-center justify-center text-black font-bold">{v.title[0]}</div>
                  <div>
                    <div className="font-semibold">{v.title}</div>
                    <div className="text-sm text-gray-300 mt-1">{v.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {name: 'Sharvan Modi', role: 'Founder & CEO'},
              {name: 'Asha Rao', role: 'Head of Research'},
              {name: 'Liam Chen', role: 'Protocol Lead'},
              {name: 'Maya Singh', role: 'Community Manager'},
            ].map((p, i) => (
              <div key={i} className="p-4 rounded-2xl bg-black/30 border border-white/5 hover:scale-[1.02] transform transition">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff7e3a] to-[#00e5ff] flex items-center justify-center text-black font-bold">{p.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                  <div>
                    <div className="font-semibold text-white">{p.name}</div>
                    <div className="text-sm text-gray-300">{p.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">Passionate about decentralization and building trust across communities. Loves coffee and late-night coding.</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl p-8 bg-gradient-to-br from-white/3 to-transparent border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Join the Mission</h3>
            <p className="text-gray-300 mt-2">Help us verify and solve the problems that matter. Become a validator or contribute to the ecosystem.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff7e3a] to-[#ff9a4f] font-semibold">Become a Validator</button>
            <button className="px-6 py-3 rounded-lg border border-white/10">Read Whitepaper</button>
          </div>
        </section>
      </main>

    
    </div>
  );
}

