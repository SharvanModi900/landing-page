// app/academia-research/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, University, BookOpen, FileDown, Users, Rocket, Globe2, CalendarDays, ArrowRight } from "lucide-react";

// -----------------------------
// Data (edit these to plug real content)
// -----------------------------
const collaborators = [
  {
    name: "IIT Delhi – Blockchain Governance Lab",
    blurb: "Researching decentralized governance, incentives, and validator economics.",
    logo: "/logos/iitd.svg",
  },
  {
    name: "MIT Media Lab – Decentralized Systems",
    blurb: "Exploring human–protocol interaction and resilient civic infrastructure.",
    logo: "/logos/mit.svg",
  },
  {
    name: "Oxford Internet Institute – Data Ethics",
    blurb: "Auditing privacy, consent, and ethical AI classification pipelines.",
    logo: "/logos/oxford.svg",
  },
  {
    name: "Independent Researchers – Crypto & Consensus",
    blurb: "Open collaboration on cryptography and PoPP consensus primitives.",
    logo: "/logos/independent.svg",
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
  "AI & LLMs for problem categorization",
  "Incentive models for verifiers/validators",
  "Privacy‑preserving proofs for sensitive issues",
  "Cross‑border governance in decentralized reporting",
];

const events = [
  {
    when: "June 2025",
    title: "PoPP Research Symposium",
    where: "Hybrid – Delhi / Virtual",
    href: "/events/symposium-2025",
  },
  {
    when: "Oct 2025",
    title: "Workshop: AI & Ethics in Problem Verification",
    where: "Online",
    href: "/events/ai-ethics-2025",
  },
  {
    when: "Dec 2025",
    title: "Call for Papers: Governance Models",
    where: "Global",
    href: "/cfp/governance-2025",
  },
];

// -----------------------------
// Small UI helpers
// -----------------------------
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function Section({
  id,
  title,
  icon,
  children,
  description,
}: {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl px-6 py-14">
      <motion.div  className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white/95">{title}</h2>
      </motion.div>
      {description && (
        <motion.p  className="-mt-6 mb-8 max-w-3xl text-white/70">
          {description}
        </motion.p>
      )}
      {children}
    </section>
  );
}

export default function AcademiaResearchPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(255,115,0,0.12),transparent),radial-gradient(1000px_500px_at_90%_0%,rgba(0,157,255,0.12),transparent)] from-[#0b0e11] to-[#14181d] text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="group inline-flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Rocket size={18} />
            </div>
            <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">PoPP</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/technology" className="text-sm text-white/70 hover:text-white">Technology</Link>
            <Link href="/academia-research" className="text-sm text-white">Academia & Research</Link>
            <Link href="/docs" className="text-sm text-white/70 hover:text-white">Docs</Link>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(60%_50%_at_50%_10%,black,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px]"></div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 py-20">
          <motion.div  className="col-span-12 md:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <GraduationCap size={14} /> Academia & Research
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Scientific backbone for decentralized problem‑solving
            </h1>
            <p className="mb-8 max-w-2xl text-white/70">
              PoPP collaborates with universities, labs, and independent researchers to validate
              protocol design, advance privacy and ethics, and publish peer‑reviewed work.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#join"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Join as Research Partner <ArrowRight size={16} />
              </Link>
              <Link
                href="#submit"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                Submit Your Paper
              </Link>
            </div>
          </motion.div>
          <motion.div  className="col-span-12 md:col-span-5">
            <div className="relative h-64 w-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-6 backdrop-blur">
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"></div>
              <div className="grid h-full w-full place-items-center">
                <Image src="" alt="PoPP Research" width={640} height={360} className="opacity-90" />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Collaborations */}
      <Section
        id="collaborations"
        title="Research Collaborations"
        icon={<University size={18} />}
        description="We co‑develop experiments, audits, and pilot programs with academic partners and independent researchers."
      >
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {collaborators.map((c, i) => (
            <motion.li
              key={c.name}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 ring-white/10 backdrop-blur hover:border-white/20"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <Image src={''} alt={c.name} fill className="object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white/90">{c.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{c.blurb}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* Publications */}
      <Section
        id="publications"
        title="Published Papers & Whitepapers"
        icon={<BookOpen size={18} />}
        description="Peer‑reviewed studies, technical reports, and whitepapers from the PoPP research community."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {publications.map((p) => (
            <div key={p.title} className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 ring-1 ring-white/10 backdrop-blur">
              <div>
                <p className="text-xs text-white/60">{p.tag} • {p.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-white/95">{p.title}</h3>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  <FileDown size={16} /> Download
                </Link>
                <Link
                  href={p.doi}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:opacity-90"
                >
                  View DOI
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ongoing Research */}
      <Section
        id="research"
        title="Ongoing Research Areas"
        icon={<Globe2 size={18} />}
        description="Open questions we are actively exploring with the community."
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {researchAreas.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-2xl bg-black/20 p-4">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white" />
                <span className="text-white/85">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Programs */}
      <Section
        id="programs"
        title="Academia & Student Engagement"
        icon={<Users size={18} />}
        description="Fellowships, student ambassadors, hackathons, and research challenges."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">PoPP Research Fellowship</h3>
            <p className="mt-2 text-white/70">Support for PhD & Master’s students working on protocol‑aligned topics.</p>
            <Link href="#apply" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Student Ambassador Program</h3>
            <p className="mt-2 text-white/70">Bring PoPP to your university with workshops and open research sprints.</p>
            <Link href="#ambassador" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">
              Become an Ambassador <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Hackathons & Challenges</h3>
            <p className="mt-2 text-white/70">Prototype AI classifiers, privacy proofs, and governance tooling for PoPP.</p>
            <Link href="#challenges" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">
              View Challenges <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* Events */}
      <Section id="events" title="Updates & Events" icon={<CalendarDays size={18} />}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {events.map((e) => (
            <div key={e.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60">{e.when} • {e.where}</p>
              <h3 className="mt-2 text-lg font-semibold text-white/95">{e.title}</h3>
              <Link href={e.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section id="join" className="mx-auto my-20 w-full max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 ring-1 ring-white/10">
          <div className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(60%_50%_at_80%_20%,black,transparent)]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px]"></div>
          </div>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            <div className="col-span-2">
              <h3 className="text-2xl font-semibold">Join the PoPP Research Network</h3>
              <p className="mt-2 max-w-2xl text-white/70">
                Partner with us to co‑author papers, validate modules, and shape the ethics & governance of decentralized problem verification.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/partners/apply" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90">
                Become a Partner <ArrowRight size={16} />
              </Link>
              <Link id="submit" href="/research/submit" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/10">
                Submit Your Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}
