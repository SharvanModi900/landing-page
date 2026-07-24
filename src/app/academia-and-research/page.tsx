"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, University, BookOpen, FileDown, Users, Globe2, CalendarDays, ArrowRight } from "lucide-react";

const collaborators = [
  {
    name: "IIT Delhi – Blockchain Governance Lab",
    blurb: "Researching decentralized governance, incentives, and validator economics.",
  },
  {
    name: "MIT Media Lab – Decentralized Systems",
    blurb: "Exploring human–protocol interaction and resilient civic infrastructure.",
  },
  {
    name: "Oxford Internet Institute – Data Ethics",
    blurb: "Auditing privacy, consent, and ethical AI classification pipelines.",
  },
  {
    name: "Independent Researchers – Crypto & Consensus",
    blurb: "Open collaboration on cryptography and PoPP consensus primitives.",
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

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
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
    <section id={id} className="mx-auto w-full max-w-7xl px-6 py-10">
      <motion.div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </motion.div>
      {description && (
        <motion.p className="-mt-4 mb-6 max-w-3xl text-sm text-gray-400">
          {description}
        </motion.p>
      )}
      {children}
    </section>
  );
}

export default function AcademiaResearchPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-16">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-2">
          <motion.div {...fadeUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
              <GraduationCap size={14} /> Academia & Research
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight tracking-tight">
              Scientific backbone for decentralized problem‑solving
            </h1>
            <p className="mb-6 max-w-2xl text-gray-400">
              PoPP collaborates with universities, labs, and independent researchers to validate
              protocol design, advance privacy and ethics, and publish peer‑reviewed work.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#join"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold transition hover:opacity-90"
              >
                Join as Research Partner <ArrowRight size={16} />
              </Link>
              <Link
                href="#submit"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-white/10"
              >
                Submit Your Paper
              </Link>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="flex items-center justify-center">
            <div className="relative h-56 w-full rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="grid h-full w-full place-items-center text-6xl opacity-30">
                🎓
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
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {collaborators.map((c, i) => (
            <motion.li
              key={c.name}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 shrink-0 rounded-xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center text-lg">
                  🏛️
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{c.name}</h3>
                  <p className="mt-1 text-xs text-gray-400">{c.blurb}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* Publications */}
      <div className="bg-white/[0.03] border-y border-white/[0.06]">
        <Section
          id="publications"
          title="Published Papers & Whitepapers"
          icon={<BookOpen size={18} />}
          description="Peer‑reviewed studies, technical reports, and whitepapers from the PoPP research community."
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {publications.map((p) => (
              <div key={p.title} className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-xs text-gray-400">{p.tag} • {p.year}</p>
                  <h3 className="mt-2 text-sm font-semibold">{p.title}</h3>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium hover:bg-white/10"
                  >
                    <FileDown size={14} /> Download
                  </Link>
                  <Link
                    href={p.doi}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-semibold"
                  >
                    View DOI
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Ongoing Research */}
      <Section
        id="research"
        title="Ongoing Research Areas"
        icon={<Globe2 size={18} />}
        description="Open questions we are actively exploring with the community."
      >
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {researchAreas.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                <span className="text-sm text-gray-300">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Programs */}
      <div className="bg-white/[0.03] border-y border-white/[0.06]">
        <Section
          id="programs"
          title="Academia & Student Engagement"
          icon={<Users size={18} />}
          description="Fellowships, student ambassadors, hackathons, and research challenges."
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold">PoPP Research Fellowship</h3>
              <p className="mt-2 text-xs text-gray-400">Support for PhD & Master's students working on protocol‑aligned topics.</p>
              <Link href="#apply" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                Apply Now <ArrowRight size={14} />
              </Link>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold">Student Ambassador Program</h3>
              <p className="mt-2 text-xs text-gray-400">Bring PoPP to your university with workshops and open research sprints.</p>
              <Link href="#ambassador" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                Become an Ambassador <ArrowRight size={14} />
              </Link>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold">Hackathons & Challenges</h3>
              <p className="mt-2 text-xs text-gray-400">Prototype AI classifiers, privacy proofs, and governance tooling for PoPP.</p>
              <Link href="#challenges" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                View Challenges <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Section>
      </div>

      {/* Events */}
      <Section id="events" title="Updates & Events" icon={<CalendarDays size={18} />}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {events.map((e) => (
            <div key={e.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-gray-400">{e.when} • {e.where}</p>
              <h3 className="mt-2 text-sm font-semibold">{e.title}</h3>
              <Link href={e.href} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section id="join" className="mx-auto my-10 w-full max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            <div className="col-span-2">
              <h3 className="text-xl font-semibold">Join the PoPP Research Network</h3>
              <p className="mt-2 max-w-2xl text-sm text-gray-400">
                Partner with us to co‑author papers, validate modules, and shape the ethics & governance of decentralized problem verification.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/partners/apply" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold">
                Become a Partner <ArrowRight size={16} />
              </Link>
              <Link id="submit" href="/research/submit" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-300 hover:bg-white/10">
                Submit Your Research
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
