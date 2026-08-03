'use client';

import Link from 'next/link';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

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
    <footer className="relative bg-[#010519] text-gray-300 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-0 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full bg-blue-500/20 blur-3xl animate-pulse-slower"></div>
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

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-16 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Join the PoPP Movement
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Stay connected with the Proof of Problem Protocol. Get updates, insights, and exclusive community invitations.
          </p>

          {/* Newsletter Input */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-xl bg-white/5 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg hover:scale-105 transition font-semibold whitespace-nowrap">
              Subscribe
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-8">
            {[Twitter, Linkedin, Github, Mail].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 rounded-full bg-white/5 hover:bg-gradient-to-r from-blue-500 to-purple-600 transition"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* App Download */}
          <div className="mt-8 flex justify-center">
            <a
              href="/app/popp.apk"
              className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.08] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.01 5.732 7.708-8.034zm3.196-1.832l2.386 1.361a1 1 0 010 1.728l-2.386 1.361-2.533-2.533 2.533-2.917zM5.791 3.252l10.01 5.732-2.302 2.302-7.708-8.034z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-gray-400 leading-none">Download for</div>
                <div className="text-sm font-semibold text-white leading-tight">Android</div>
              </div>
              <span className="text-xs text-gray-500 border-l border-white/10 pl-3">Free · Open Source</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links — symmetric 3×3 grid */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-12 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 border-t border-white/10 z-10">
        {footerSections.map((section) => (
          <div key={section.label}>
            <h6 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {section.label}
            </h6>
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
      <div className="relative text-center text-xs text-gray-500 border-t border-white/10 py-6 z-10">
        <p>© {new Date().getFullYear()} PoPP. All rights reserved.</p>
        <p className="text-gray-400 mt-2">Built with 🔮 to reimagine problem-solving.</p>
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
  );
}
