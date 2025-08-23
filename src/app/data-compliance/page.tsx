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
    <div className="min-h-screen bg-slate-950 text-gray-100">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-slate-800">
        {/* soft grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        {/* glow */}
        <div className="absolute -top-24 -right-20 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-purple-500/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative">
          {/* left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs tracking-wide text-cyan-200">
              Compliance • GDPR • CCPA • ISO/27001-ready
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Data Compliance
              </span>
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl">
              How PoPP meets global privacy and security obligations—covering lawful bases,
              retention schedules, international transfers, subprocessors, DSAR handling,
              and breach response.
            </p>
            <p className="mt-6 text-sm text-gray-500">Last Updated: {lastUpdated}</p>
          </div>
          {/* right: inline SVG illustration */}
          <div className="relative flex justify-center md:justify-end">
            <div className="absolute -inset-12 -z-10 bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-purple-600/20 blur-3xl rounded-full" />
            <svg
              viewBox="0 0 420 420"
              className="w-72 h-72"
              aria-hidden="true"
            >
              {/* shield */}
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <path
                d="M210 40l120 48v92c0 92-60 152-120 168-60-16-120-76-120-168V88l120-48z"
                fill="url(#g1)"
                opacity="0.15"
              />
              <path
                d="M210 52l106 42v83c0 82-54 136-106 150-52-14-106-68-106-150V94l106-42z"
                stroke="url(#g1)"
                strokeWidth="2"
                fill="none"
              />
              {/* checklist */}
              <g transform="translate(120,130)" stroke="#86efac" strokeWidth="2" fill="none">
                <rect x="0" y="0" width="180" height="34" rx="6" className="opacity-40" />
                <path d="M12 17l10 10 20-22" />
              </g>
              <g transform="translate(120,180)" stroke="#7dd3fc" strokeWidth="2" fill="none">
                <rect x="0" y="0" width="180" height="34" rx="6" className="opacity-40" />
                <path d="M12 17l10 10 20-22" />
              </g>
              <g transform="translate(120,230)" stroke="#c4b5fd" strokeWidth="2" fill="none">
                <rect x="0" y="0" width="180" height="34" rx="6" className="opacity-40" />
                <path d="M12 17l10 10 20-22" />
              </g>
            </svg>
          </div>
        </div>
      </header>

      {/* BODY: sticky toc + content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 grid md:grid-cols-[280px_1fr] gap-10">
        {/* TOC */}
        <aside className="hidden md:block">
          <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">On this page</div>
            <nav className="space-y-2">
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="block rounded-md px-3 py-2 text-sm text-gray-300 hover:text-cyan-300 hover:bg-white/5"
                >
                  {t.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <section className="space-y-16">
          {/* 1 Overview */}
          <div id="overview" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">1. Overview</h2>
            <p className="mt-3 text-gray-300">
              PoPP (Proof-of-Problem Protocol) aligns with global privacy frameworks (GDPR, CCPA/CPRA,
              LGPD, PDPA) through privacy-by-design, minimal data collection, cryptographic integrity,
              and transparent governance. This page summarizes how we process data, under what legal
              bases, and which safeguards we maintain.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { k: 'Controller/Processor', v: 'Varies by product area' },
                { k: 'Lawful Bases', v: 'Consent, Contract, Legitimate Interests' },
                { k: 'DPIA', v: 'Conducted for high-risk modules' },
                { k: 'Data Exports', v: 'SCCs / recognized transfer tools' },
              ].map((i) => (
                <div key={i.k} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="text-xs text-gray-400">{i.k}</div>
                  <div className="text-sm font-medium text-gray-200">{i.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2 Lawful Bases */}
          <div id="lawful-bases" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">2. Lawful Bases (GDPR Art. 6)</h2>
            <div className="mt-4 space-y-4">
              <Details
                title="Consent (Art. 6(1)(a))"
                body="Used for optional features (e.g., newsletters, optional analytics). You may withdraw consent at any time in settings."
              />
              <Details
                title="Contract (Art. 6(1)(b))"
                body="When you create an account or submit a problem requiring processing to deliver core PoPP functionality."
              />
              <Details
                title="Legitimate Interests (Art. 6(1)(f))"
                body="Security, fraud prevention, and platform improvement balanced against your rights and expectations."
              />
              <Details
                title="Legal Obligation (Art. 6(1)(c))"
                body="Where we must retain or disclose data to comply with applicable law."
              />
            </div>
          </div>

          {/* 3 Regional mapping */}
          <div id="regional-mapping" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">3. Regional Mapping (GDPR ↔ CCPA/CPRA)</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
              <table className="min-w-[640px] w-full text-sm">
                <thead className="bg-slate-900/60 text-gray-300">
                  <tr>
                    <th className="text-left p-3">GDPR Concept</th>
                    <th className="text-left p-3">CCPA/CPRA Analogy</th>
                    <th className="text-left p-3">PoPP Alignment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ['Controller / Processor', 'Business / Service Provider', 'Role varies by module & contract'],
                    ['Data Subject Rights', 'Consumer Rights', 'DSAR portal & verified requests'],
                    ['DPIA', 'Risk Assessment', 'DPIA for high-risk features'],
                    ['DPO', 'No exact equivalent', 'Appointed contact for EU users'],
                    ['International Transfers', 'Cross-border disclosure', 'SCCs / transfer tools'],
                  ].map((row, i) => (
                    <tr key={i} className="text-gray-300">
                      {row.map((cell, j) => (
                        <td key={j} className="p-3">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 Retention */}
          <div id="retention" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">4. Data Retention & Deletion</h2>
            <p className="mt-3 text-gray-300">
              We retain personal data only as long as necessary for stated purposes or legal obligations.
              Anonymized/aggregated data may be retained for research and protocol integrity.
            </p>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {[
                ['Account Data', 'Active account + up to 24 months after closure'],
                ['Problem Submissions', 'Per legal need & integrity; pseudonymized where feasible'],
                ['Logs & Security Events', '90–365 days (region & risk dependent)'],
              ].map(([title, val]) => (
                <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="text-sm font-medium text-gray-200">{title}</div>
                  <div className="text-xs text-gray-400 mt-1">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Security */}
          <div id="security" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">5. Security Controls</h2>
            <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-300">
              {[
                'Encryption in transit (TLS) & at rest',
                'Key management and access controls',
                'Zero-trust & least-privilege principles',
                'Regular penetration testing',
                'Anomaly detection & audit logging',
                'Secure SDLC & code reviews',
              ].map((item) => (
                <li key={item} className="rounded-md bg-slate-900/50 border border-slate-800 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 6 DPA */}
          <div id="dpa" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">6. Data Processing Addendum (DPA)</h2>
            <p className="mt-3 text-gray-300">
              For enterprise and institutional use, we offer a DPA covering processor obligations,
              SCCs where applicable, and security commitments. Contact us to execute a signed copy.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/legal/popp-dpa.pdf"
                className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-400/15"
              >
                Download Sample DPA (PDF)
              </a>
              <a
                href="/contact?topic=dpa"
                className="rounded-lg border border-slate-700 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                Request Signed DPA
              </a>
            </div>
          </div>

          {/* 7 Transfers */}
          <div id="transfers" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">7. International Data Transfers</h2>
            <p className="mt-3 text-gray-300">
              Where data moves cross-border, we rely on recognized transfer mechanisms (e.g., SCCs)
              and implement supplementary measures (encryption, access restrictions, transparency).
            </p>
          </div>

          {/* 8 Subprocessors */}
          <div id="subprocessors" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">8. Subprocessors</h2>
            <p className="mt-3 text-gray-300">
              We maintain a list of subprocessors used to deliver PoPP services. Each is bound by contract
              to equivalent security and privacy standards.
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
              <table className="min-w-[560px] w-full text-sm">
                <thead className="bg-slate-900/60 text-gray-300">
                  <tr>
                    <th className="text-left p-3">Vendor</th>
                    <th className="text-left p-3">Purpose</th>
                    <th className="text-left p-3">Region</th>
                    <th className="text-left p-3">Data Categories</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ['Cloud Provider A', 'Compute/Storage', 'EU/US', 'Account metadata, logs'],
                    ['Analytics B', 'Product analytics (opt-in)', 'EU', 'Usage events (pseudonymized)'],
                    ['Email Service C', 'Transactional mail', 'EU', 'Email, notification content'],
                  ].map((row, i) => (
                    <tr key={i} className="text-gray-300">
                      {row.map((cell, j) => (
                        <td key={j} className="p-3">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-sm text-gray-400">
              Subscribe to updates: <a href="/legal/subprocessors" className="text-cyan-300 hover:underline">Subprocessors Change Log</a>
            </div>
          </div>

          {/* 9 DSAR */}
          <div id="dsar" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">9. Data Subject Requests (DSAR)</h2>
            <p className="mt-3 text-gray-300">
              You can request access, rectification, deletion, restriction, objection, or portability
              (where applicable). We verify identity and respond within statutory timelines.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/privacy/requests"
                className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-400/15"
              >
                Open DSAR Portal
              </a>
              <a
                href="/privacy/request-form.pdf"
                className="rounded-lg border border-slate-700 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                Download Request Form (PDF)
              </a>
            </div>
          </div>

          {/* 10 DPIA */}
          <div id="dpiA" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">10. DPIA & High-Risk Processing</h2>
            <p className="mt-3 text-gray-300">
              We conduct Data Protection Impact Assessments for features that may entail high risk
              (e.g., sensitive categories, large-scale processing, new technologies). Mitigations
              include data minimization, purpose limitation, and enhanced security controls.
            </p>
          </div>

          {/* 11 Breach */}
          <div id="breach" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">11. Breach Notification</h2>
            <p className="mt-3 text-gray-300">
              We notify authorities and affected users without undue delay when legally required,
              following a documented incident response plan and post-mortem process.
            </p>
          </div>

          {/* 12 Cookies */}
          <div id="cookies" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">12. Cookies & Tracking</h2>
            <p className="mt-3 text-gray-300">
              Essential cookies support core features (security/session). Optional analytics are consent-based.
              Manage preferences in the Cookie Settings panel.
            </p>
            <div className="mt-4">
              <a
                href="/cookies"
                className="rounded-lg border border-slate-700 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                Open Cookie Settings
              </a>
            </div>
          </div>

          {/* 13 Governance */}
          <div id="governance" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">13. Governance & Audits</h2>
            <p className="mt-3 text-gray-300">
              Compliance is overseen by a cross-functional committee. We maintain policies for access,
              incident response, vendor risk, and change management. Periodic audits and third-party
              assessments validate effectiveness.
            </p>
          </div>

          {/* 14 Contact */}
          <div id="contact" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-cyan-300">14. Contact & DPO</h2>
            <p className="mt-3 text-gray-300">
              For privacy questions, DSARs, or DPA execution:
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-xs text-gray-400">Email</div>
                <div className="text-sm font-medium text-gray-200">privacy@popp.org</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="text-xs text-gray-400">DPO (EU)</div>
                <div className="text-sm font-medium text-gray-200">dpo@popp.org</div>
              </div>
            </div>
          </div>

          {/* Bottom small print */}
          <div className="pt-6 text-xs text-gray-500">
            This summary is provided for convenience and does not replace contractual terms
            (e.g., DPA) or jurisdiction-specific notices.
          </div>
        </section>
      </main>

   
    </div>
  );
}

/** Simple disclosure component for tidy sections */
function Details({ title, body }: { title: string; body: string }) {
  return (
    <details className="group rounded-lg border border-slate-800 bg-slate-900/40 p-4">
      <summary className="cursor-pointer list-none select-none">
        <span className="text-sm font-medium text-gray-200 group-open:text-cyan-300">
          {title}
        </span>
      </summary>
      <p className="mt-3 text-sm text-gray-300">{body}</p>
    </details>
  );
}
