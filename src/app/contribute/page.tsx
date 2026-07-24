"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContributePage() {
  const contributionPaths = [
    { title: "Code", desc: "Browse issues, open PRs, and help improve features & performance.", cta: "View Issues", href: "#code" },
    { title: "Documentation", desc: "Improve guides, add examples, and make the docs crystal clear.", cta: "Edit Docs", href: "#docs" },
    { title: "Design", desc: "Help polish UI/UX, create illustrations, or refine our brand identity.", cta: "See Design Tasks", href: "#design" },
    { title: "Testing & QA", desc: "Write tests, run cross-platform checks, and help reproduce bugs.", cta: "Join QA", href: "#qa" },
    { title: "Community & Support", desc: "Moderate forums, help users, translate content, and organize events.", cta: "Join Community", href: "#community" },
    { title: "Funding & Partnerships", desc: "Sponsor work, support bounties, or help connect strategic partners.", cta: "Support Us", href: "#funding" },
  ];

  const starterSteps = [
    "Fork the repo and clone locally",
    "Read CONTRIBUTING.md & the Code of Conduct",
    "Pick an issue labeled good-first-issue or help-wanted",
    "Create a branch, implement, test, and open a PR",
    "Add clear descriptions, screenshots, and link related issues",
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16">
        {/* HERO */}
        <section className="py-16 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Contribute
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Help build and improve
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              We&apos;re a community-driven project. Your contributions — whether code,
              docs, design, testing, or support — move us forward. Pick a path
              below and get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#getting-started"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition"
              >
                Get Started
              </Link>
              <Link
                href="https://github.com/your-org/your-repo"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/[0.07] transition"
              >
                View Repo
              </Link>
            </div>
          </motion.div>
        </section>

        {/* CONTRIBUTION PATHS */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Ways to Contribute</h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">
              Choose what fits you best — every bit helps.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributionPaths.map((p, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{p.desc}</p>
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    {p.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* GETTING STARTED */}
        <section id="getting-started" className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
              <p className="text-gray-400 mb-6 text-sm">
                New contributors: follow these simple steps to make your first
                meaningful contribution.
              </p>

              <ol className="space-y-3">
                {starterSteps.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{s}</div>
                      {idx === 0 && <div className="text-xs text-gray-500 mt-0.5">git clone git@github.com:your-org/your-repo.git</div>}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex gap-3">
                <Link
                  href="https://github.com/your-org/your-repo/issues?q=is%3Aopen+is%3Aissue"
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/[0.07] transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  Browse issues
                </Link>
                <Link
                  href="/CONTRIBUTING.md"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition"
                >
                  Read contributing guide
                </Link>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Join the community</h3>
              <p className="text-sm text-gray-400 mb-4">
                Chat with contributors, find mentors, and coordinate efforts.
              </p>
              <div className="flex flex-col gap-3">
                <Link className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/[0.07] transition" href="https://discord.gg/your-invite" target="_blank" rel="noreferrer">
                  Join Discord
                </Link>
                <Link className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/[0.07] transition" href="https://matrix.org" target="_blank" rel="noreferrer">
                  Join Matrix
                </Link>
                <Link className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/[0.07] transition" href="https://forum.yoursite.com" target="_blank" rel="noreferrer">
                  Visit Forum
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* GUIDELINES & BADGES */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Contributor Covenant & Guidelines</h3>
              <p className="text-sm text-gray-400 mb-4">
                We welcome contributors of all backgrounds. Please observe our
                Code of Conduct and ensure changes are well-documented and tested.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Be respectful and inclusive</li>
                <li>• Write clear PR descriptions</li>
                <li>• Add tests for new features</li>
                <li>• Follow our style & lint rules</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Link href="/CODE_OF_CONDUCT" className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">Code of Conduct</Link>
                <Link href="/CONTRIBUTING.md" className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold">Contributing Guide</Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Recognition & Badges</h3>
              <p className="text-sm text-gray-400 mb-4">
                We celebrate contributions — maintainers, first-time PRs, community
                heroes, and top contributors receive badges and shoutouts.
              </p>
              <div className="flex gap-3 flex-wrap mt-4">
                {["First PR", "Top Reviewer", "Mentor", "Design Hero"].map((badge) => (
                  <div key={badge} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">{badge}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to contribute?</h3>
            <p className="text-gray-400 mb-6">Pick an area above and start by opening an issue or joining the discussion.</p>
            <div className="flex gap-3 justify-center">
              <Link href="https://github.com/your-org/your-repo" className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition">
                Go to GitHub
              </Link>
              <Link href="/support" className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/[0.07] transition">
                Contact the team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
