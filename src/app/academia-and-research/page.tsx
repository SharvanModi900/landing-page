"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  FileDown,
  Users,
  Globe2,
  CalendarDays,
  ArrowRight,
  Award,
  FlaskConical,
  Microscope,
  Shield,
  Brain,
  Scale,
  ExternalLink,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const collaborators = [
  {
    name: "IIT Delhi – Blockchain Governance Lab",
    blurb: "Researching decentralized governance, incentives, and validator economics.",
    focus: "Governance",
  },
  {
    name: "MIT Media Lab – Decentralized Systems",
    blurb: "Exploring human–protocol interaction and resilient civic infrastructure.",
    focus: "Civic Tech",
  },
  {
    name: "Oxford Internet Institute – Data Ethics",
    blurb: "Auditing privacy, consent, and ethical AI classification pipelines.",
    focus: "Ethics & Privacy",
  },
  {
    name: "Independent Researchers – Crypto & Consensus",
    blurb: "Open collaboration on cryptography and PoPP consensus primitives.",
    focus: "Cryptography",
  },
];

const publications = [
  {
    title: "The Proof‑of‑Problem Protocol (PoPP): A Decentralized Framework",
    tag: "Core Protocol Whitepaper",
    year: "2025",
    href: "/whitepapers/popp-core.pdf",
    doi: "https://doi.org/xx.xxxx/popp.2025.core",
  },
  {
    title: "AI‑Driven Problem Classification in Decentralized Systems",
    tag: "Research Paper",
    year: "2024",
    href: "/whitepapers/popp-ai-classification.pdf",
    doi: "https://doi.org/xx.xxxx/popp.2024.ai",
  },
  {
    title: "Data Privacy in Open Problem Submissions",
    tag: "Technical Report",
    year: "2024",
    href: "/whitepapers/popp-privacy.pdf",
    doi: "https://doi.org/xx.xxxx/popp.2024.privacy",
  },
  {
    title: "Case Study: Verifying Environmental Issues Using PoPP",
    tag: "Case Study",
    year: "2025",
    href: "/whitepapers/popp-environment-case.pdf",
    doi: "https://doi.org/xx.xxxx/popp.2025.env",
  },
];

const researchAreas = [
  { icon: <Brain size={16} />, title: "AI & LLMs", desc: "Problem categorization, severity scoring, and duplicate detection" },
  { icon: <Award size={16} />, title: "Incentive Models", desc: "Token economics for verifiers, validators, and submitters" },
  { icon: <Shield size={16} />, title: "Privacy‑Preserving Proofs", desc: "Zero-knowledge proofs for sensitive issue reporting" },
  { icon: <Scale size={16} />, title: "Cross‑Border Governance", desc: "Jurisdictionless dispute resolution and escalation paths" },
];

const events = [
  {
    when: "June 2025",
    title: "PoPP Research Symposium",
    where: "Hybrid – Delhi / Virtual",
    href: "/events/symposium-2025",
    type: "Symposium",
  },
  {
    when: "Oct 2025",
    title: "Workshop: AI & Ethics in Problem Verification",
    where: "Online",
    href: "/events/ai-ethics-2025",
    type: "Workshop",
  },
  {
    when: "Dec 2025",
    title: "Call for Papers: Governance Models",
    where: "Global",
    href: "/cfp/governance-2025",
    type: "CFP",
  },
];

const stats = [
  { value: "4+", label: "Research Partners" },
  { value: "12", label: "Published Papers" },
  { value: "8", label: "Active Research Areas" },
  { value: "50+", label: "Student Fellows" },
];

const programs = [
  {
    icon: <FlaskConical size={18} />,
    title: "PoPP Research Fellowship",
    desc: "Support for PhD & Master's students working on protocol‑aligned topics. Grants up to $10,000.",
    cta: "Apply Now",
    href: "/academia-and-research/fellowship",
  },
  {
    icon: <Users size={18} />,
    title: "Student Ambassador Program",
    desc: "Bring PoPP to your university with workshops, hackathons, and open research sprints.",
    cta: "Become an Ambassador",
    href: "/academia-and-research/ambassador",
  },
  {
    icon: <Microscope size={18} />,
    title: "Hackathons & Challenges",
    desc: "Prototype AI classifiers, privacy proofs, and governance tooling for PoPP.",
    cta: "View Challenges",
    href: "/academia-and-research/hackathons",
  },
];

// ─── Student Zone ────────────────────────────────────────────────────────────

const studentPrograms = [
  { title: "Workshops & Bootcamps", desc: "Hands-on technical and non-technical sessions to sharpen your skills." },
  { title: "Innovation Labs", desc: "A creative space where students collaborate on projects and explore ideas." },
  { title: "Hackathons & Competitions", desc: "Participate in hackathons to showcase your talent and solve real-world problems." },
  { title: "Career Support", desc: "Guidance, internships, and placement opportunities tailored to students." },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AcademiaResearchPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 py-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
              <GraduationCap size={14} className="text-cyan-400" /> Academia & Research
            </div>
            <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              Scientific backbone for decentralized problem‑solving
            </h1>
            <p className="mb-6 max-w-2xl text-gray-400">
              PoPP collaborates with universities, labs, and independent researchers to validate
              protocol design, advance privacy and ethics, and publish peer‑reviewed work.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#join"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold transition hover:opacity-90">
                Join as Research Partner <ArrowRight size={16} />
              </Link>
              <Link href="#submit"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-white/10">
                Submit Your Paper
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center">
            <div className="grid grid-cols-2 gap-3 w-full">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ─── Research Collaborations ─────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Globe2 size={18} className="text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold">Research Collaborations</h2>
        </motion.div>
        <p className="-mt-4 mb-6 max-w-3xl text-sm text-gray-400">
          We co‑develop experiments, audits, and pilot programs with academic partners and independent researchers.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {collaborators.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] transition">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 ring-1 ring-white/10 flex items-center justify-center">
                  <Globe2 size={18} className="text-cyan-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{c.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400">{c.focus}</span>
                  </div>
                  <p className="text-xs text-gray-400">{c.blurb}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Publications ──────────────────────────────────────────────── */}
      <div className="bg-white/[0.03] border-y border-white/[0.06]">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <BookOpen size={18} className="text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold">Published Papers & Whitepapers</h2>
          </motion.div>
          <p className="-mt-4 mb-6 max-w-3xl text-sm text-gray-400">
            Peer‑reviewed studies, technical reports, and whitepapers from the PoPP research community.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {publications.map((p) => (
              <div key={p.title} className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] transition">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-[10px] font-semibold text-cyan-400">{p.tag}</span>
                    <span className="text-[10px] text-gray-500">{p.year}</span>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug">{p.title}</h3>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={p.href}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium hover:bg-white/10 transition">
                    <FileDown size={12} /> PDF
                  </Link>
                  <Link href={p.doi}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-semibold">
                    <ExternalLink size={12} /> DOI
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── Ongoing Research Areas ────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <FlaskConical size={18} className="text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold">Ongoing Research Areas</h2>
        </motion.div>
        <p className="-mt-4 mb-6 max-w-3xl text-sm text-gray-400">
          Open questions we are actively exploring with the community.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {researchAreas.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
              <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 ring-1 ring-white/10 flex items-center justify-center text-cyan-400">
                {r.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">{r.title}</h3>
                <p className="text-xs text-gray-400">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Programs ──────────────────────────────────────────────────── */}
      <div className="bg-white/[0.03] border-y border-white/[0.06]">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Users size={18} className="text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold">Academia & Student Engagement</h2>
          </motion.div>
          <p className="-mt-4 mb-6 max-w-3xl text-sm text-gray-400">
            Fellowships, student ambassadors, hackathons, and research challenges.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {programs.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 ring-1 ring-white/10 flex items-center justify-center text-cyan-400">
                    {p.icon}
                  </div>
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                </div>
                <p className="text-xs text-gray-400 flex-1">{p.desc}</p>
                <Link href={p.href} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition">
                  {p.cta} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── Events ────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <CalendarDays size={18} className="text-cyan-400" />
          </div>
          <h2 className="text-xl font-semibold">Updates & Events</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {events.map((e, i) => (
            <motion.div key={e.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-[10px] font-semibold text-cyan-400">{e.type}</span>
                <span className="text-[10px] text-gray-500">{e.when}</span>
              </div>
              <h3 className="text-sm font-semibold mb-1">{e.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{e.where}</p>
              <Link href={e.href} className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition">
                Learn more <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Student Zone ──────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Users size={18} className="text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold">Student Zone</h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studentPrograms.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section id="join" className="mx-auto my-10 w-full max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-cyan-600/10 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            <div className="col-span-2">
              <h3 className="text-xl font-semibold">Join the PoPP Research Network</h3>
              <p className="mt-2 max-w-2xl text-sm text-gray-400">
                Partner with us to co‑author papers, validate modules, and shape the ethics & governance of decentralized problem verification.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/partners/apply"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold">
                Become a Partner <ArrowRight size={16} />
              </Link>
              <Link id="submit" href="/research/submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-300 hover:bg-white/10 transition">
                Submit Your Research
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
