// pages/contribute.tsx
import React from "react";

export default function ContributePage() {
  const contributionPaths = [
    {
      title: "Code",
      desc: "Browse issues, open PRs, and help improve features & performance.",
      cta: "View Issues",
      href: "#code",
      accent: "from-blue-500 to-purple-500",
    },
    {
      title: "Documentation",
      desc: "Improve guides, add examples, and make the docs crystal clear.",
      cta: "Edit Docs",
      href: "#docs",
      accent: "from-green-400 to-teal-400",
    },
    {
      title: "Design",
      desc: "Help polish UI/UX, create illustrations, or refine our brand identity.",
      cta: "See Design Tasks",
      href: "#design",
      accent: "from-pink-400 to-purple-400",
    },
    {
      title: "Testing & QA",
      desc: "Write tests, run cross-platform checks, and help reproduce bugs.",
      cta: "Join QA",
      href: "#qa",
      accent: "from-yellow-400 to-orange-400",
    },
    {
      title: "Community & Support",
      desc: "Moderate forums, help users, translate content, and organize events.",
      cta: "Join Community",
      href: "#community",
      accent: "from-indigo-400 to-blue-400",
    },
    {
      title: "Funding & Partnerships",
      desc: "Sponsor work, support bounties, or help connect strategic partners.",
      cta: "Support Us",
      href: "#funding",
      accent: "from-rose-400 to-red-400",
    },
  ];

  const starterSteps = [
    "Fork the repo and clone locally",
    "Read CONTRIBUTING.md & the Code of Conduct",
    "Pick an issue labeled good-first-issue or help-wanted",
    "Create a branch, implement, test, and open a PR",
    "Add clear descriptions, screenshots, and link related issues",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          {/* Decorative shapes (keeps hero premium without an image file) */}
          <div className="absolute top-[-8rem] left-[-12rem] w-[40rem] h-[40rem] bg-gradient-to-r from-purple-700/30 to-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-6rem] right-[-10rem] w-[36rem] h-[36rem] bg-gradient-to-r from-indigo-700/20 to-pink-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Contribute
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              — Help build and improve
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            We’re a community-driven project. Your contributions — whether code,
            docs, design, testing, or support — move us forward. Pick a path
            below and get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#getting-started"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-semibold shadow-lg hover:scale-105 transition"
            >
              Get Started
            </a>
            <a
              href="https://github.com/your-org/your-repo"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-100 hover:bg-white/7 transition"
            >
              View Repo
            </a>
          </div>
        </div>
      </section>

      {/* CONTRIBUTION PATHS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Ways to Contribute</h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
          Choose what fits you best — every bit helps. Below are typical
          contribution channels we maintain.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributionPaths.map((p, i) => (
            <article
              key={i}
              className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br ${p.accent} text-white font-bold mb-4`}>
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{p.desc}</p>
              <a
                href={p.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
              >
                <span className="px-3 py-2 rounded-full bg-white/6 border border-white/8 text-xs">
                  {p.cta}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-80">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* GETTING STARTED / QUICK STEPS */}
      <section id="getting-started" className="bg-gradient-to-b from-slate-800 to-slate-900 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
            <p className="text-gray-300 mb-6">
              New contributors: follow these simple steps to make your first
              meaningful contribution.
            </p>

            <ol className="space-y-3 text-gray-200">
              {starterSteps.map((s, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{s}</div>
                    {idx === 0 && <div className="text-xs text-gray-400">git clone git@github.com:your-org/your-repo.git</div>}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex gap-3">
              <a
                href="https://github.com/your-org/your-repo/issues?q=is%3Aopen+is%3Aissue"
                className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/7 transition"
                target="_blank"
                rel="noreferrer"
              >
                Browse issues
              </a>
              <a
                href="/CONTRIBUTING.md"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold hover:scale-105 transition"
              >
                Read contributing guide
              </a>
            </div>
          </div>

          {/* Invite / Social */}
          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Join the community</h3>
            <p className="text-gray-300 mb-4">
              Chat with contributors, find mentors, and coordinate efforts.
            </p>
            <div className="flex flex-col gap-3">
              <a className="px-4 py-2 rounded-md bg-white/6 border border-white/8" href="https://discord.gg/your-invite" target="_blank" rel="noreferrer">
                Join Discord
              </a>
              <a className="px-4 py-2 rounded-md bg-white/6 border border-white/8" href="https://matrix.org" target="_blank" rel="noreferrer">
                Join Matrix
              </a>
              <a className="px-4 py-2 rounded-md bg-white/6 border border-white/8" href="https://forum.yoursite.com" target="_blank" rel="noreferrer">
                Visit Forum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTRIBUTOR GUIDELINES & BADGES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-3">Contributor Covenant & Guidelines</h3>
            <p className="text-gray-300 mb-4">
              We welcome contributors of all backgrounds. Please observe our
              Code of Conduct and ensure changes are well-documented and tested.
            </p>
            <ul className="text-gray-200 space-y-2">
              <li>• Be respectful and inclusive</li>
              <li>• Write clear PR descriptions</li>
              <li>• Add tests for new features</li>
              <li>• Follow our style & lint rules</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="/CODE_OF_CONDUCT.md" className="px-4 py-2 rounded-full bg-white/5 border border-white/10">Code of Conduct</a>
              <a href="/CONTRIBUTING.md" className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">Contributing Guide</a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">Recognition & Badges</h3>
            <p className="text-gray-300 mb-4">
              We celebrate contributions — maintainers, first-time PRs, community
              heroes, and top contributors receive badges and shoutouts.
            </p>

            <div className="flex gap-3 flex-wrap mt-4">
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">First PR</div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">Top Reviewer</div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">Mentor</div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">Design Hero</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 px-6 bg-gradient-to-r from-purple-600/20 via-blue-600/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to contribute?</h3>
          <p className="text-gray-300 mb-6">Pick an area above and start by opening an issue or joining the discussion.</p>
          <div className="flex gap-3 justify-center">
            <a href="https://github.com/your-org/your-repo" className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-semibold shadow-lg">
              Go to GitHub
            </a>
            <a href="/contact" className="px-6 py-3 rounded-full bg-white/5 border border-white/10">
              Contact the team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
