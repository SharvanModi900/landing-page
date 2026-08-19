'use client';
import React from 'react';

export default function DataCompliancePage() {
  const lastUpdated = 'August 2025';

  const toc = [
    { id: 'overview', title: '1. Overview' },
    { id: 'lawful-bases', title: '2. Lawful Bases (GDPR Art. 6)' },
    { id: 'regional-mapping', title: '3. Regional Mapping (GDPR ↔ CCPA/CPRA)' },
    { id: 'retention', title: '4. Data Retention & Deletion' },
    { id: 'security', title: '5. Security Controls' },
    { id: 'dpa', title: '6. Data Processing Addendum (DPA)' },
    { id: 'transfers', title: '7. International Data Transfers' },
    { id: 'subprocessors', title: '8. Subprocessors' },
    { id: 'dsar', title: '9. Data Subject Requests (DSAR)' },
    { id: 'dpiA', title: '10. DPIA & High-Risk Processing' },
    { id: 'breach', title: '11. Breach Notification' },
    { id: 'cookies', title: '12. Cookies & Tracking' },
    { id: 'governance', title: '13. Governance & Audits' },
    { id: 'contact', title: '14. Contact & DPO' },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <div className="">
        {/* HERO */}
        <header className="relative border-b border-white/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs tracking-wide text-cyan-200">
                Compliance • GDPR • CCPA • ISO/27001-ready
              </div>
              <h1 className="mt-4 text-2xl sm:text-4xl md:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Data Compliance
                </span>
              </h1>
              <p className="mt-3 text-gray-400 max-w-xl">
                How PoPP meets global privacy and security obligations—covering lawful bases,
                retention schedules, international transfers, subprocessors, DSAR handling,
                and breach response.
              </p>
              <p className="mt-4 text-sm text-gray-500">Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </header>

        {/* BODY: sticky toc + content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* TOC */}
          <aside className="hidden md:block">
            <div className="sticky top-24 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">On this page</div>
              <nav className="space-y-1">
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="block rounded-md px-2 py-1.5 text-xs text-gray-400 hover:text-cyan-400 hover:bg-white/5"
                  >
                    {t.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* CONTENT */}
          <section className="space-y-8">
            <div id="overview" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">1. Overview</h2>
              <p className="mt-2 text-gray-400 text-sm">
                PoPP (Proof-of-Problem Protocol) aligns with global privacy frameworks (GDPR, CCPA/CPRA,
                LGPD, PDPA) through privacy-by-design, minimal data collection, cryptographic integrity,
                and transparent governance.
              </p>
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { k: 'Controller/Processor', v: 'Varies by product area' },
                  { k: 'Lawful Bases', v: 'Consent, Contract, Legitimate Interests' },
                  { k: 'DPIA', v: 'Conducted for high-risk modules' },
                  { k: 'Data Exports', v: 'SCCs / recognized transfer tools' },
                ].map((i) => (
                  <div key={i.k} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-xs text-gray-400">{i.k}</div>
                    <div className="text-xs font-medium text-gray-200">{i.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div id="lawful-bases" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">2. Lawful Bases (GDPR Art. 6)</h2>
              <div className="mt-3 space-y-2">
                <Details title="Consent (Art. 6(1)(a))" body="Used for optional features (e.g., newsletters, optional analytics). You may withdraw consent at any time in settings." />
                <Details title="Contract (Art. 6(1)(b))" body="When you create an account or submit a problem requiring processing to deliver core PoPP functionality." />
                <Details title="Legitimate Interests (Art. 6(1)(f))" body="Security, fraud prevention, and platform improvement balanced against your rights and expectations." />
                <Details title="Legal Obligation (Art. 6(1)(c))" body="Where we must retain or disclose data to comply with applicable law." />
              </div>
            </div>

            <div id="regional-mapping" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">3. Regional Mapping (GDPR ↔ CCPA/CPRA)</h2>
              <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-[640px] w-full text-sm">
                  <thead className="bg-white/5 text-gray-300">
                    <tr>
                      <th className="text-left p-2">GDPR Concept</th>
                      <th className="text-left p-2">CCPA/CPRA Analogy</th>
                      <th className="text-left p-2">PoPP Alignment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {[
                      ['Controller / Processor', 'Business / Service Provider', 'Role varies by module & contract'],
                      ['Data Subject Rights', 'Consumer Rights', 'DSAR portal & verified requests'],
                      ['DPIA', 'Risk Assessment', 'DPIA for high-risk features'],
                      ['DPO', 'No exact equivalent', 'Appointed contact for EU users'],
                      ['International Transfers', 'Cross-border disclosure', 'SCCs / transfer tools'],
                    ].map((row, i) => (
                      <tr key={i} className="text-gray-400">
                        {row.map((cell, j) => (
                          <td key={j} className="p-2">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="retention" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">4. Data Retention & Deletion</h2>
              <p className="mt-2 text-gray-400 text-sm">
                We retain personal data only as long as necessary for stated purposes or legal obligations.
                Anonymized/aggregated data may be retained for research and protocol integrity.
              </p>
              <div className="mt-4 grid md:grid-cols-3 gap-3">
                {[
                  ['Account Data', 'Active account + up to 24 months after closure'],
                  ['Problem Submissions', 'Per legal need & integrity; pseudonymized where feasible'],
                  ['Logs & Security Events', '90–365 days (region & risk dependent)'],
                ].map(([title, val]) => (
                  <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-medium text-gray-200">{title}</div>
                    <div className="text-xs text-gray-400 mt-1">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div id="security" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">5. Security Controls</h2>
              <ul className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-gray-400 text-sm">
                {[
                  'Encryption in transit (TLS) & at rest',
                  'Key management and access controls',
                  'Zero-trust & least-privilege principles',
                  'Regular penetration testing',
                  'Anomaly detection & audit logging',
                  'Secure SDLC & code reviews',
                ].map((item) => (
                  <li key={item} className="rounded-md bg-white/5 border border-white/10 px-2 py-1.5 text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="dpa" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">6. Data Processing Addendum (DPA)</h2>
              <p className="mt-2 text-gray-400 text-sm">
                For enterprise and institutional use, we offer a DPA covering processor obligations,
                SCCs where applicable, and security commitments. Contact us to execute a signed copy.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="/legal/popp-dpa.pdf" className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-200 hover:bg-cyan-400/15">
                  Download Sample DPA (PDF)
                </a>
                <a href="/contact?topic=dpa" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
                  Request Signed DPA
                </a>
              </div>
            </div>

            <div id="transfers" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">7. International Data Transfers</h2>
              <p className="mt-2 text-gray-400 text-sm">
                Where data moves cross-border, we rely on recognized transfer mechanisms (e.g., SCCs)
                and implement supplementary measures (encryption, access restrictions, transparency).
              </p>
            </div>

            <div id="subprocessors" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">8. Subprocessors</h2>
              <p className="mt-2 text-gray-400 text-sm">
                We maintain a list of subprocessors used to deliver PoPP services. Each is bound by contract
                to equivalent security and privacy standards.
              </p>
              <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-[560px] w-full text-sm">
                  <thead className="bg-white/5 text-gray-300">
                    <tr>
                      <th className="text-left p-2">Vendor</th>
                      <th className="text-left p-2">Purpose</th>
                      <th className="text-left p-2">Region</th>
                      <th className="text-left p-2">Data Categories</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {[
                      ['Cloud Provider A', 'Compute/Storage', 'EU/US', 'Account metadata, logs'],
                      ['Analytics B', 'Product analytics (opt-in)', 'EU', 'Usage events (pseudonymized)'],
                      ['Email Service C', 'Transactional mail', 'EU', 'Email, notification content'],
                    ].map((row, i) => (
                      <tr key={i} className="text-gray-400">
                        {row.map((cell, j) => (
                          <td key={j} className="p-2">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Subscribe to updates: <a href="/legal/subprocessors" className="text-cyan-400 hover:underline">Subprocessors Change Log</a>
              </div>
            </div>

            <div id="dsar" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">9. Data Subject Requests (DSAR)</h2>
              <p className="mt-2 text-gray-400 text-sm">
                You can request access, rectification, deletion, restriction, objection, or portability
                (where applicable). We verify identity and respond within statutory timelines.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="/privacy/requests" className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-200 hover:bg-cyan-400/15">
                  Open DSAR Portal
                </a>
                <a href="/privacy/request-form.pdf" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
                  Download Request Form (PDF)
                </a>
              </div>
            </div>

            <div id="dpiA" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">10. DPIA & High-Risk Processing</h2>
              <p className="mt-2 text-gray-400 text-sm">
                We conduct Data Protection Impact Assessments for features that may entail high risk
                (e.g., sensitive categories, large-scale processing, new technologies).
              </p>
            </div>

            <div id="breach" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">11. Breach Notification</h2>
              <p className="mt-2 text-gray-400 text-sm">
                We notify authorities and affected users without undue delay when legally required,
                following a documented incident response plan and post-mortem process.
              </p>
            </div>

            <div id="cookies" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">12. Cookies & Tracking</h2>
              <p className="mt-2 text-gray-400 text-sm">
                Essential cookies support core features (security/session). Optional analytics are consent-based.
                Manage preferences in the Cookie Settings panel.
              </p>
              <div className="mt-3">
                <a href="/cookies" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
                  Open Cookie Settings
                </a>
              </div>
            </div>

            <div id="governance" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">13. Governance & Audits</h2>
              <p className="mt-2 text-gray-400 text-sm">
                Compliance is overseen by a cross-functional committee. We maintain policies for access,
                incident response, vendor risk, and change management.
              </p>
            </div>

            <div id="contact" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-cyan-400">14. Contact & DPO</h2>
              <p className="mt-2 text-gray-400 text-sm">
                For privacy questions, DSARs, or DPA execution:
              </p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-gray-400">Email</div>
                  <div className="text-sm font-medium text-gray-200">privacy@popp.org</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-gray-400">DPO (EU)</div>
                  <div className="text-sm font-medium text-gray-200">dpo@popp.org</div>
                </div>
              </div>
            </div>

            <div className="pt-4 text-xs text-gray-500">
              This summary is provided for convenience and does not replace contractual terms
              (e.g., DPA) or jurisdiction-specific notices.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Details({ title, body }: { title: string; body: string }) {
  return (
    <details className="group rounded-lg border border-white/10 bg-white/5 p-3">
      <summary className="cursor-pointer list-none select-none">
        <span className="text-xs font-medium text-gray-200 group-open:text-cyan-400">
          {title}
        </span>
      </summary>
      <p className="mt-2 text-xs text-gray-400">{body}</p>
    </details>
  );
}
