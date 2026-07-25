"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpenIcon,
  LightBulbIcon,
  UsersIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  StarIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  NewspaperIcon,
  ScaleIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Wallet, ChevronDown, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Mega-menu data (unchanged)                                        */
/* ------------------------------------------------------------------ */
export const megaMenuSections = [
  {
    label: "Origin",
    submenu: [
      { title: "Our Story", desc: "How PoPP began", href: "/origin/story", icon: BookOpenIcon },
      { title: "Mission", desc: "Our core mission and values", href: "/origin/mission", icon: LightBulbIcon },
      { title: "Team", desc: "Meet the people behind PoPP", href: "/origin/team", icon: UsersIcon },
    ],
  },
  {
    label: "How It Works",
    submenu: [
      { title: "Architecture", desc: "The 5-layer PoPP protocol", href: "/how-it-works/architecture", icon: AcademicCapIcon },
      { title: "Validation", desc: "How proof and verification work", href: "/how-it-works/validation", icon: ShieldCheckIcon },
      { title: "Security", desc: "Decentralized trust and safety", href: "/security", icon: StarIcon },
    ],
  },
  {
    label: "Using PoPP",
    submenu: [
      { title: "For Users", desc: "Submit and track problems", href: "/using-popp#users", icon: UserGroupIcon },
      { title: "For Validators", desc: "Validate and earn rewards", href: "/using-popp#validators", icon: ChartBarIcon },
      { title: "For Partners", desc: "Integrate PoPP into your systems", href: "/using-popp#partners", icon: GlobeAltIcon },
    ],
  },
  {
    label: "Products",
    submenu: [
      { title: "Problem Explorer", desc: "Browse and search submitted problems", href: "/explorer", icon: BookOpenIcon },
      { title: "Truth NFT Viewer", desc: "View and verify truth NFTs", href: "/nft-viewer", icon: AcademicCapIcon },
      { title: "Validator Panel", desc: "Manage validations and rewards", href: "/validator-panel", icon: ChartBarIcon },
      { title: "Proposal & DAO Dashboard", desc: "Participate in governance", href: "/dao-dashboard", icon: GlobeAltIcon },
    ],
  },
  {
    label: "Roadmap",
    submenu: [
      { title: "Roadmap", desc: "What's next for PoPP this year", href: "/roadmap", icon: LightBulbIcon },
      { title: "Vision", desc: "Our long-term goals and strategy", href: "/vision", icon: AcademicCapIcon },
      { title: "Support", desc: "Get help and customer support", href: "/support", icon: ShieldCheckIcon },
    ],
  },
  {
    label: "Impact",
    submenu: [
      { title: "Case Studies", desc: "Real-world results and success stories", href: "/case-studies", icon: ArrowTrendingUpIcon },
      { title: "Community", desc: "Join our global community", href: "/community", icon: UserGroupIcon },
      { title: "Feedback", desc: "Share your thoughts and ideas", href: "/feedback", icon: StarIcon },
      { title: "Contribute", desc: "Help build and improve PoPP", href: "/contribute", icon: GlobeAltIcon },
      { title: "Events", desc: "Upcoming conferences and meetups", href: "/events", icon: ArrowTrendingUpIcon },
    ],
  },
  {
    label: "Resources",
    submenu: [
      { title: "Whitepaper", desc: "Read the official PoPP protocol whitepaper", href: "/whitepapers", icon: BookOpenIcon },
      { title: "API Reference", desc: "Detailed API endpoints and usage", href: "/api-references", icon: GlobeAltIcon },
      { title: "FAQ", desc: "Frequently asked questions", href: "/faqs", icon: LightBulbIcon },
      { title: "Blogs", desc: "Project updates and articles", href: "/blogs", icon: GlobeAltIcon },
      { title: "News", desc: "Latest developments and announcements", href: "/news", icon: GlobeAltIcon },
      { title: "Events", desc: "Workshops, webinars, and meetups", href: "/events", icon: LightBulbIcon },
    ],
  },
  {
    label: "Knowledge Hub",
    submenu: [
      { title: "Academia & Research", desc: "Collaborations with universities and institutions", href: "/academia-and-research", icon: AcademicCapIcon },
      { title: "Student Zone", desc: "Student resources and project support", href: "/students", icon: UsersIcon },
      { title: "Policy & Governance", desc: "Frameworks for policymakers", href: "/policy-and-governance", icon: ShieldCheckIcon },
      { title: "Public Datasets", desc: "Free and open datasets", href: "/datasets", icon: GlobeAltIcon },
      { title: "Learning Resources", desc: "Guides, videos, and documentation", href: "/learn", icon: BookOpenIcon },
    ],
  },
  {
    label: "Developer Hub",
    submenu: [
      { title: "Developer Docs", desc: "Full technical documentation", href: "/developer-docs", icon: AcademicCapIcon },
      { title: "SDK", desc: "PoPP software development kit", href: "/sdk", icon: ShieldCheckIcon },
      { title: "CLI", desc: "Command-line tools for developers", href: "/cli", icon: GlobeAltIcon },
      { title: "Smart Contracts", desc: "PoPP smart contract repository", href: "/smart-contracts", icon: BookOpenIcon },
      { title: "Tools", desc: "Utilities and dev tools", href: "/tools", icon: LightBulbIcon },
      { title: "Sandbox / Testnet", desc: "Try PoPP in a safe environment", href: "/sandbox-or-testnet", icon: GlobeAltIcon },
    ],
  },
  {
    label: "Validators",
    submenu: [
      { title: "Validators Docs", desc: "Full technical documentation", href: "/validator-docs", icon: AcademicCapIcon },
      { title: "Validator Exam", desc: "Certification and exams for validators", href: "/validator-exam", icon: ShieldCheckIcon },
      { title: "Validator Smart Contracts", desc: "Manage PoPP smart contracts", href: "/validator-smart-contracts", icon: BookOpenIcon },
      { title: "Validator Tools", desc: "Utilities and dashboard tools", href: "/validator-tools", icon: LightBulbIcon },
      { title: "Leaderboards", desc: "Top validators and contributor rankings", href: "/validator-leaderboards", icon: StarIcon },
    ],
  },
  {
    label: "Security & Audits",
    submenu: [
      { title: "Audit Reports", desc: "Independent security audits", href: "/audit-reports", icon: ShieldCheckIcon },
      { title: "Vulnerability Disclosures", desc: "Report potential issues", href: "/vulnerability-disclosures", icon: LightBulbIcon },
      { title: "Best Practices", desc: "Guidelines for secure usage", href: "/best-practices", icon: BookOpenIcon },
    ],
  },
  {
    label: "Token & Economics",
    submenu: [
      { title: "Tokenomics", desc: "PoPP token model and supply", href: "/tokenomics", icon: ChartBarIcon },
      { title: "Staking Mechanics", desc: "Earn rewards by staking", href: "/staking-mechanics", icon: StarIcon },
      { title: "Incentive Structures", desc: "How contributors earn value", href: "/incentive-structures", icon: GlobeAltIcon },
    ],
  },
  {
    label: "Tutorials & Learning",
    submenu: [
      { title: "Video Tutorials", desc: "Step-by-step guides", href: "/videos", icon: BookOpenIcon },
      { title: "Workshops", desc: "Hands-on learning events", href: "/workshops", icon: UsersIcon },
      { title: "Example Workflows", desc: "Practical PoPP scenarios", href: "/example-workflows", icon: LightBulbIcon },
    ],
  },
  {
    label: "Legal / Compliance",
    submenu: [
      { title: "Terms of Use", desc: "Official rules and conditions", href: "/terms-of-use", icon: BookOpenIcon },
      { title: "Privacy Policy", desc: "User data protection policies", href: "/privacy-policy", icon: ShieldCheckIcon },
      { title: "Data Compliance", desc: "Regulatory and compliance standards", href: "/data-compliance", icon: GlobeAltIcon },
    ],
  },
  {
    label: "PoPP For",
    submenu: [
      { title: "Civic Activists & NGOs", desc: "Document issues, build evidence trails, escalate problems", href: "/civic-activists-and-ngos", icon: UsersIcon },
      { title: "Government Agencies", desc: "Transparent issue tracking, public accountability, data-driven decisions", href: "/government-agencies", icon: BuildingLibraryIcon },
      { title: "Media Organizations", desc: "Verified stories, fact-checking, investigative leads", href: "/media-organizations", icon: NewspaperIcon },
      { title: "Legal Professionals", desc: "Evidence collection, case building, witness protection", href: "/legal-professionals", icon: ScaleIcon },
      { title: "Academic Researchers", desc: "Study civic engagement patterns and governance effectiveness", href: "/academic-researchers", icon: AcademicCapIcon },
    ],
  },
];

const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Submit", href: "/submit" },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function Navigation() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* prefetch all routes when mega menu opens */
  const prefetchRoutes = useCallback(() => {
    megaMenuSections.forEach((section) => {
      section.submenu.forEach((sub) => {
        router.prefetch(sub.href);
      });
    });
  }, [router]);

  /* scroll detection for bg change */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* toggle mega menu on click */
  const toggleMega = () => {
    setMegaOpen((prev) => {
      if (!prev) prefetchRoutes(); // prefetch when opening
      return !prev;
    });
  };

  /* close on outside click */
  useEffect(() => {
    if (!megaOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideNav = dropdownRef.current?.contains(target);
      const insidePanel = megaMenuRef.current?.contains(target);
      if (!insideNav && !insidePanel) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [megaOpen]);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* ---- Logo ---- */}
        <Link href="/" className="flex items-center group">
          <img src="/logo.png" alt="PoPP" className="h-20 w-auto object-contain" />
        </Link>

        {/* ---- Desktop nav ---- */}
        <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
          {mainNavLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              prefetch={true}
              className="px-3.5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* More trigger — click toggle */}
          <button
            onClick={toggleMega}
            className={`px-3.5 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors ${
              megaOpen ? "text-white bg-white/[0.08]" : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            More
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Right-side actions */}
          <div className="flex items-center gap-3 ml-4">
            <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors">
              <Wallet className="w-[18px] h-[18px]" />
            </button>
            <Link
              href="/submit"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* ---- Mobile hamburger ---- */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ============================================================ */}
      {/*  Mega Menu (desktop) — compact multi-column                  */}
      {/* ============================================================ */}
      {megaOpen && (
        <div className="hidden md:block fixed left-0 right-0 top-16 z-50" ref={megaMenuRef}>
          <div className="bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40">
            <div className="max-w-7xl mx-auto px-6 py-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-5">
                {megaMenuSections.map((section) => (
                  <div key={section.label} className="flex flex-col gap-1.5">
                    {/* Category header */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400/70 pb-1.5 mb-1 border-b border-white/[0.06]">
                      {section.label}
                    </div>
                    {/* Links — compact, no icons/descriptions */}
                    {section.submenu.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        prefetch={true}
                        onClick={() => setMegaOpen(false)}
                        onMouseEnter={() => router.prefetch(sub.href)}
                        className="text-sm text-gray-400 hover:text-white py-1 transition-colors truncate"
                        title={sub.desc}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  Mobile menu (full-screen overlay)                           */}
      {/* ============================================================ */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-[#030712]/98 backdrop-blur-xl overflow-y-auto">
          <div className="px-5 py-6 space-y-6">
            {/* Quick links */}
            <div className="flex gap-3">
              {mainNavLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/[0.05] border border-white/[0.08] rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mega menu sections */}
            {megaMenuSections.map((section) => (
              <MobileSection
                key={section.label}
                section={section}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            ))}

            {/* Bottom actions */}
            <div className="pt-4 border-t border-white/[0.06] flex gap-3">
              <Link
                href="/submit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center px-4 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              >
                Get Started
              </Link>
              <button className="px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-300">
                <Wallet className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Collapsible mobile section                                        */
/* ------------------------------------------------------------------ */
function MobileSection({
  section,
  onClose,
}: {
  section: (typeof megaMenuSections)[number];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.04]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-left"
      >
        <span className="text-sm font-semibold text-white">{section.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="pb-3 space-y-1">
          {section.submenu.map((sub) => (
            <Link
              key={sub.title}
              href={sub.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              <sub.icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-sm text-gray-300">{sub.title}</div>
                <div className="text-[11px] text-gray-500">{sub.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
