'use client';

import Link from 'next/link';
import { Mail, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer link sections — 9 groups for a symmetric 3×3 grid         */
/* ------------------------------------------------------------------ */
const footerSections = [
  {
    label: "Explore",
    links: [
      { title: "Our Story", href: "/our-story" },
      { title: "Mission", href: "/mission" },
      { title: "About Us", href: "/about-us" },
      { title: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    label: "Protocol",
    links: [
      { title: "How It Works", href: "/how-it-works" },
      { title: "Using PoPP", href: "/using-popp" },
      { title: "Tokenomics", href: "/tokenomics" },
      { title: "Staking", href: "/staking-mechanics" },
    ],
  },
  {
    label: "Products",
    links: [
      { title: "Problem Explorer", href: "/explorer" },
      { title: "Validator Panel", href: "/validator-panel" },
      { title: "DAO Dashboard", href: "/dao-dashboard" },
      { title: "Submit Problem", href: "/report" },
    ],
  },
  {
    label: "Validators",
    links: [
      { title: "Become a Validator", href: "/validators" },
      { title: "Validator Panel", href: "/validator-panel" },
      { title: "Smart Contracts", href: "/smart-contracts" },
      { title: "Best Practices", href: "/best-practices" },
    ],
  },
  {
    label: "Developers",
    links: [
      { title: "Documentation", href: "/docs" },
      { title: "API Reference", href: "/api-references" },
      { title: "SDK", href: "/sdk" },
      { title: "CLI", href: "/cli" },
      { title: "Sandbox", href: "/sandbox-or-testnet" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Whitepaper", href: "/whitepapers" },
      { title: "Blogs & News", href: "/blogs" },
      { title: "Learning Resources", href: "/learning-resources" },
      { title: "Example Workflows", href: "/example-workflows" },
    ],
  },
  {
    label: "Community",
    links: [
      { title: "Join Community", href: "/community" },
      { title: "Case Studies", href: "/case-studies" },
      { title: "Contribute", href: "/contribute" },
      { title: "Events", href: "/events" },
    ],
  },
  {
    label: "PoPP For",
    links: [
      { title: "Civic Activists & NGOs", href: "/civic-activists-and-ngos" },
      { title: "Government Agencies", href: "/government-agencies" },
      { title: "Media Organizations", href: "/media-organizations" },
      { title: "Academia & Research", href: "/academia-and-research" },
    ],
  },
  {
    label: "Legal",
    links: [
      { title: "Terms of Use", href: "/terms-of-use" },
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Cookie Policy", href: "/cookies" },
      { title: "Data Compliance", href: "/data-compliance" },
      { title: "Audit Reports", href: "/audit-reports" },
    ],
  },
];

// Generate deterministic particle positions using a simple hash function
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Generate deterministic particle properties
function getParticleProperties(index: number): { top: string; left: string; duration: string; delay: string } {
  // Create a unique seed for each particle
  const seed = `particle-${index}`;
  
  // Use hash to generate deterministic "random" values
  const hash = hashString(seed);
  
  // Generate values in predictable ranges
  const top = `${(hash % 100)}%`;
  const left = `${((hash * 31) % 100)}%`;
  const duration = `${4 + (hash % 6)}s`;
  const delay = `${(hash * 17) % 5}s`;
  
  return {
    top,
    left,
    duration,
    delay
  };
}

export default function Footer() {
  return (
    <>
      {/* CTA Section - Outside footer with its own background */}
      <div className="relative py-16 bg-black">
        <div className="relative max-w-7xl mx-auto px-6 md:px-16">
          {/* Background with gradient and glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-transparent to-green-600/5 rounded-3xl" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/15 rounded-full blur-3xl" />

          
          {/* Content */}
          <div className="relative flex flex-col md:flex-row items-center gap-10 p-8 md:p-12">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <img
                src="/logo.png"
                alt="PoPP"
                className="w-[400px] h-[400px] rounded-2xl object-contain shadow-2xl shadow-amber-500/10"
              />
            </div>

            {/* Right: Content */}
            <div className="flex-1 text-center md:text-left">
              {/* Tagline */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600/10 border border-amber-500/30 rounded-full text-xs font-medium text-amber-300 mb-4">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                PROOF OF PROBLEM PROTOCOL
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">
                Join the PoPP Movement
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto md:mx-0">
                Stay connected with the Proof of Problem Protocol. Get updates, insights, and exclusive community invitations.
              </p>

              {/* SEE IT. REPORT IT. VERIFY IT. PROVE IT. */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  SEE IT.
                </span>
                <span className="text-gray-400">|</span>
                <span className="flex items-center gap-1.5 text-green-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  REPORT IT.
                </span>
                <span className="text-gray-400">|</span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  VERIFY IT.
                </span>
                <span className="text-gray-400">|</span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  PROVE IT.
                </span>
              </div>

              {/* Newsletter Input */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start max-w-lg mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-xl bg-black/40 border border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500/60 text-sm w-full placeholder-gray-500 text-white"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition font-semibold whitespace-nowrap text-black">
                  Subscribe
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-3 mt-6">
                <a href="https://x.com/ShravanModi8" target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/40 hover:bg-amber-500/20 border border-amber-500/30 transition" title="X (Twitter)">
                  <Twitter className="w-5 h-5 text-amber-300" />
                </a>
                <a href="https://discord.gg/u6GqfJBsm" target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/40 hover:bg-amber-500/20 border border-amber-500/30 transition" title="Discord">
                  <DiscordIcon className="w-5 h-5 text-amber-300" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full bg-black/40 hover:bg-amber-500/20 border border-amber-500/30 transition" title="Instagram">
                  <Instagram className="w-5 h-5 text-amber-300" />
                </a>
                <a href="#" className="p-3 rounded-full bg-black/40 hover:bg-amber-500/20 border border-amber-500/30 transition" title="LinkedIn">
                  <Linkedin className="w-5 h-5 text-amber-300" />
                </a>
                <a href="https://github.com/SharvanModi900/landing-page" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-black/40 hover:bg-amber-500/20 border border-amber-500/30 transition" title="GitHub">
                  <Github className="w-5 h-5 text-amber-300" />
                </a>
                <a href="mailto:contact@popp.thharko.com" className="p-3 rounded-full bg-black/40 hover:bg-amber-500/20 border border-amber-500/30 transition" title="Email">
                  <Mail className="w-5 h-5 text-amber-300" />
                </a>
              </div>

              {/* App Download */}
              <div className="mt-6 flex justify-center md:justify-start">
                <a
                  href="/app/popp.apk"
                  className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/40 rounded-xl hover:border-green-500/60 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-300 flex-shrink-0" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.01 5.732 7.708-8.034zm3.196-1.832l2.386 1.361a1 1 0 010 1.728l-2.386 1.361-2.533-2.533 2.533-2.917zM5.791 3.252l10.01 5.732-2.302 2.302-7.708-8.034z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-300 leading-none">Download for</div>
                    <div className="text-sm font-semibold text-green-300 leading-tight">Android</div>
                  </div>
                  <span className="text-xs text-gray-400 border-l border-white/10 pl-3">Free · Open Source</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-[#010519] text-gray-300 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-0 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" style={{ willChange: 'opacity' }}></div>
        <div className="absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full bg-blue-500/20 blur-3xl animate-pulse-slower" style={{ willChange: 'opacity' }}></div>
      </div>

      {/* ✨ Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => {
          const { top, left, duration, delay } = getParticleProperties(i);
          return (
            <span
              key={i}
              className="absolute w-1 h-1 bg-white/70 rounded-full animate-float"
              style={{
                top,
                left,
                animationDuration: duration,
                animationDelay: delay,
                opacity: 0.6,
              }}
            />
          );
        })}
      </div>

      {/* Footer Links — symmetric 3×3 grid */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-12 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 border-t border-white/10 z-10">
        {footerSections.map((section) => (
          <div key={section.label}>
            <div className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {section.label}
            </div>
            <ul className="space-y-2.5">
              {section.links.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="relative text-sm text-gray-400 hover:text-white transition group"
                  >
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 absolute left-0 bottom-0 h-[1px] w-0 group-hover:w-full transition-all"></span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 py-6 z-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo-192.webp" alt="Proof of Problem Protocol PoPP logo" width={24} height={24} className="h-6 w-6 rounded object-cover" />
            <span className="text-sm font-bold text-white">PoPP</span>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Proof of Problem Protocol. All rights reserved.</p>
          <p className="text-xs text-gray-400">Built with 🔮 to reimagine problem-solving.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); opacity: 0.6; }
        }
        .animate-pulse-slow { animation: pulse-slow 6s infinite; }
        .animate-pulse-slower { animation: pulse-slower 10s infinite; }
        .animate-float { animation: float infinite ease-in-out; }
      `}</style>
    </footer>
    </>
  );
}
