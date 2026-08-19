'use client';
import React, { useState } from 'react';

export default function DesignYourWorkflowPage() {
  const [hoverNode, setHoverNode] = useState<string | null>(null);

  const templates = [
    {
      title: 'Grassroots Activism',
      desc: 'From citizen report to public action with community validation.',
      accent: 'from-cyan-500/20 to-blue-600/20',
      badge: 'Popular',
    },
    {
      title: 'Government Escalation',
      desc: 'Verified issues routed to agencies with SLA & audit trail.',
      accent: 'from-amber-500/20 to-orange-600/20',
      badge: 'Gov Ready',
    },
    {
      title: 'Media Amplification',
      desc: 'Fact-checked stories delivered to media desks for reach.',
      accent: 'from-fuchsia-500/20 to-purple-600/20',
      badge: 'High Impact',
    },
    {
      title: 'Legal Case Workflow',
      desc: 'Evidence → validation → chain-of-custody → filing.',
      accent: 'from-emerald-500/20 to-teal-600/20',
      badge: 'Secure',
    },
    {
      title: 'Academic Research Review',
      desc: 'Open datasets → peer review → publication registry.',
      accent: 'from-sky-500/20 to-indigo-600/20',
      badge: 'Open Science',
    },
  ];

  const roleSteps = [
    { title: 'Choose Template', desc: 'Start with a best-practice PoPP template or a blank canvas.' },
    { title: 'Drag & Connect', desc: 'Add steps like Submission, Validation, Escalation, Resolution.' },
    { title: 'Assign Actors', desc: 'Define responsibilities: Citizens, Validators, Media, Agencies.' },
    { title: 'Set Rules', desc: 'Staking, quorum, evidence types, deadlines, rewards & slashing.' },
    { title: 'Simulate', desc: 'Run a dry-run to detect bottlenecks and token flow misconfig.' },
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-white pt-16 overflow-x-hidden">
      {/* ============= HERO (Split) ============= */}
      <section className="relative overflow-hidden">
        {/* subtle background grid lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.08]"
        />
        {/* gradient glows */}
        <div aria-hidden className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 py-12 md:grid-cols-2 md:py-16 lg:px-10">
          {/* Left: copy */}
          <div className="z-10 flex max-w-xl flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-300">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              Builder Preview
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight md:text-5xl">
              Design Your Own{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                PoPP Workflow
              </span>
            </h1>
            <p className="text-lg text-gray-300">
              Create, customize, and simulate end-to-end workflows that transform problems into provable actions.
              Define actors, rules, staking, evidence, and escalation paths—all with transparent audit trails.
            </p>
            <div className="mt-2 flex flex-wrap gap-4">
              <button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition">
                Start Designing
              </button>
              <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-gray-200 hover:bg-white/10 transition">
                View Templates
              </button>
              <button className="rounded-xl border border-white/15 bg-white/0 px-6 py-3 font-semibold text-gray-300 hover:bg-white/5 transition">
                See a Demo
              </button>
            </div>
            {/* quick bullet strip */}
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-300 md:max-w-md">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Staking & Quorum Rules
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                Evidence Requirements
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Escalation & SLA
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Reward & Slashing
              </li>
            </ul>
          </div>

          {/* Right: premium SVG “flow” illustration */}
          <div className="relative">
            <FlowIllustration hoverNode={hoverNode} setHoverNode={setHoverNode} />
          </div>
        </div>
      </section>

      {/* ============= HORIZONTAL PROCESS STEPS (non-centered) ============= */}
      <section className="border-t border-white/[0.06] bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 lg:px-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-100">How it works</h2>
          <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto pb-2">
            {roleSteps.map((s, i) => (
              <div
                key={s.title}
                className="snap-start rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm transition hover:bg-white/[0.06] min-w-[260px]"
              >
                <div className="mb-2 text-xs uppercase tracking-wide text-cyan-300/80">Step {i + 1}</div>
                <div className="text-lg font-semibold">{s.title}</div>
                <div className="mt-2 text-sm text-gray-300">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= READ-ONLY PREVIEW (interactive hover) ============= */}
      <section className="relative border-t border-white/[0.06] bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 py-12 md:grid-cols-2 lg:px-10">
          <div className="max-w-lg">
            <h3 className="text-2xl font-bold">Preview a workflow</h3>
            <p className="mt-3 text-gray-300">
              Hover nodes to inspect responsibilities and outputs. This read-only preview mirrors how your configured
              workflow will route problems across actors while enforcing rules.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
                <span><b>Problem → Validation:</b> evidence checked, quorum reached, stake bonded.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-400" />
                <span><b>Validation → Proof NFT:</b> on-chain proof minted, traceable & portable.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <span><b>Escalation:</b> media/agency receive attestations with SLA deadlines.</span>
              </li>
            </ul>
          </div>
          <PreviewDiagram setHoverNode={setHoverNode} />
        </div>
      </section>

      {/* ============= TEMPLATE LIBRARY (non-centered grid) ============= */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:px-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold">Templates library</h3>
              <p className="mt-2 max-w-2xl text-gray-300">Use a proven starting point and adapt to your jurisdiction, sector, and risk model.</p>
            </div>
            <button className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-200 hover:bg-white/10 transition">
              Browse All
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <div
                key={t.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.06]"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${t.accent}`} />
                <div className="relative">
                  <span className="mb-3 inline-block rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-gray-200">
                    {t.badge}
                  </span>
                  <h4 className="text-xl font-semibold">{t.title}</h4>
                  <p className="mt-2 text-gray-200/90">{t.desc}</p>
                  <div className="mt-5 flex gap-3">
                    <button className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold shadow-cyan-500/20 transition hover:scale-[1.02]">
                      Use Template
                    </button>
                    <button className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-200 transition hover:bg-white/10">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= ADVANCED FEATURES (split) ============= */}
      <section className="border-t border-white/[0.06] bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 py-12 md:grid-cols-2 lg:px-10">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold">Advanced capabilities</h3>
            <ul className="mt-6 space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-semibold">Token-aware logic</div>
                  <div className="text-sm text-gray-400">Stake bonding, reward splits, slashing thresholds, and credit scoring baked into steps.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-fuchsia-400" />
                <div>
                  <div className="font-semibold">Evidence types</div>
                  <div className="text-sm text-gray-400">Photos, sensor logs, signatures, geo-proofs, document hashes with retention policy.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
                <div>
                  <div className="font-semibold">Escalation & SLA</div>
                  <div className="text-sm text-gray-400">Automatic routing to media/agencies with deadlines, reminders, and breach flags.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-400" />
                <div>
                  <div className="font-semibold">Audit & export</div>
                  <div className="text-sm text-gray-400">Deterministic JSON specs, on-chain anchors, exportable proofs and dashboards.</div>
                </div>
              </li>
            </ul>
          </div>

          {/* abstract UI mock (SVG) */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <AbstractMock />
          </div>
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section className="relative border-t border-white/[0.06] bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 py-12 md:grid-cols-2 lg:px-10">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Turn ideas into provable workflows</h3>
            <p className="mt-3 max-w-xl text-gray-300">
              Build once, reuse everywhere. Share templates with your network, simulate outcomes, and publish transparent results.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-gray-100 transition">
              Start Designing
            </button>
            <button className="rounded-xl border border-white/25 bg-white/0 px-6 py-3 font-semibold text-white hover:bg-white/10 transition">
              Explore Templates
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================== COMPONENTS =================== */

function FlowIllustration({
  hoverNode,
  setHoverNode,
}: {
  hoverNode: string | null;
  setHoverNode: (k: string | null) => void;
}) {
  // a clean, premium SVG flow (Citizen → Validator → Proof → Media/Agency)
  const nodes = [
    { id: 'citizen', x: 50, y: 70, label: 'Citizen\nSubmission', color: '#22d3ee' },
    { id: 'validator', x: 230, y: 40, label: 'Validator\nQuorum', color: '#a78bfa' },
    { id: 'proof', x: 230, y: 140, label: 'Proof NFT\nMint', color: '#34d399' },
    { id: 'routes', x: 390, y: 90, label: 'Media / Agency\nEscalation', color: '#f59e0b' },
  ];

  const link = (x1: number, y1: number, x2: number, y2: number) =>
    `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;

  return (
    <div className="relative h-[320px] w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <svg viewBox="0 0 460 220" className="h-full w-full">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="lg3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* links */}
        <g strokeWidth={3.5} fill="none" className="opacity-80">
          <path d={link(90, 90, 260, 60)} stroke="url(#lg1)" markerEnd="url(#arrow)" />
          <path d={link(90, 90, 260, 150)} stroke="url(#lg2)" markerEnd="url(#arrow)" />
          <path d={link(260, 150, 420, 110)} stroke="url(#lg3)" markerEnd="url(#arrow)" />
        </g>

        {/* nodes */}
        {nodes.map((n) => (
          <g
            key={n.id}
            transform={`translate(${n.x}, ${n.y})`}
            onMouseEnter={() => setHoverNode(n.id)}
            onMouseLeave={() => setHoverNode(null)}
          >
            <rect
              x={-32}
              y={-20}
              width={160}
              height={58}
              rx={14}
              fill="#070a12"
              stroke={n.color}
              strokeOpacity={0.6}
              className="transition"
              filter={hoverNode === n.id ? 'url(#softGlow)' : undefined}
            />
            <rect
              x={-32}
              y={-20}
              width={160}
              height={58}
              rx={14}
              fill="url(#glowFill)"
              className="opacity-[0.08]"
            />
            <text
              x={48}
              y={9}
              textAnchor="middle"
              className="whitespace-pre text-[12px] font-semibold"
              fill="#e5e7eb"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PreviewDiagram({
  setHoverNode,
}: {
  setHoverNode: (k: string | null) => void;
}) {
  // mini “read-only” pipeline with packet dots
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <svg viewBox="0 0 560 220" className="h-full w-full">
        <defs>
          <linearGradient id="pipe" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* pipeline */}
        <path
          d="M40 110 H520"
          stroke="url(#pipe)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* stations */}
        {[
          { x: 80, label: 'Submission' },
          { x: 210, label: 'Validation' },
          { x: 340, label: 'Proof Mint' },
          { x: 470, label: 'Escalation' },
        ].map((s) => (
          <g key={s.x} transform={`translate(${s.x}, 110)`} onMouseEnter={() => setHoverNode(s.label)} onMouseLeave={() => setHoverNode(null)}>
            <circle r="18" fill="#0b1220" stroke="#94a3b8" strokeOpacity="0.4" />
            <text y="38" textAnchor="middle" fontSize="11" fill="#cbd5e1">{s.label}</text>
          </g>
        ))}

        {/* moving packets */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            r="6"
            fill="#22d3ee"
            className="animate-[packet_5s_linear_infinite]"
            style={{ animationDelay: `${i * 1.2}s` as any }}
          >
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M40 110 H520"
              keyPoints="0;1"
              keyTimes="0;1"
            />
          </circle>
        ))}
      </svg>

      {/* keyframes for fallback packet animation (non-SVG SMIL browsers) */}
      <style>{`
        @keyframes packet {
          from { transform: translateX(0); }
          to   { transform: translateX(480px); }
        }
      `}</style>
    </div>
  );
}

function AbstractMock() {
  return (
    <div className="relative">
      {/* faux top bar */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="text-xs text-gray-400">workflow.json (read-only)</div>
      </div>

      {/* faux blocks */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs uppercase text-gray-400">Actors</div>
          <ul className="mt-2 space-y-1 text-sm text-gray-200">
            <li>• Citizen (submit)</li>
            <li>• Validators (quorum ≥ 5)</li>
            <li>• Media Desk (amplify)</li>
            <li>• Agency (resolve)</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs uppercase text-gray-400">Rules</div>
          <ul className="mt-2 space-y-1 text-sm text-gray-200">
            <li>• Min stake: 50 PRS</li>
            <li>• Evidence: 2 photos + GPS</li>
            <li>• SLA: 72h escalation</li>
            <li>• Slashing: 10% on fraud</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:col-span-2">
          <div className="text-xs uppercase text-gray-400">Flow</div>
          <div className="mt-3 h-28 rounded-lg border border-white/10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10" />
        </div>
      </div>
    </div>
  );
}
