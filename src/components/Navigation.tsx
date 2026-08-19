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
  ChartBarIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { Wallet, ChevronDown, X } from "lucide-react";
import { useWallet } from "@/lib/wallet";
import WalletModal from "./WalletModal";

/* ------------------------------------------------------------------ */
/*  Mega-menu data — consolidated into 7 logical groups               */
/* ------------------------------------------------------------------ */

interface MegaItem {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MegaSection {
  label: string;
  submenu: MegaItem[];
}

export const megaMenuSections: MegaSection[] = [
  {
    label: "Explore",
    submenu: [
      { title: "Our Story", desc: "How PoPP began", href: "/our-story", icon: BookOpenIcon },
      { title: "Mission", desc: "Core mission and values", href: "/mission", icon: LightBulbIcon },
      { title: "About Us", desc: "Meet the team", href: "/about-us", icon: UsersIcon },
      { title: "Roadmap", desc: "What's next for PoPP", href: "/roadmap", icon: ArrowTrendingUpIcon },
      { title: "Case Studies", desc: "Real-world impact stories", href: "/case-studies", icon: StarIcon },
      { title: "Community", desc: "Join the global community", href: "/community", icon: UserGroupIcon },
    ],
  },
  {
    label: "Protocol",
    submenu: [
      { title: "How It Works", desc: "The 5-layer PoPP protocol", href: "/how-it-works", icon: AcademicCapIcon },
      { title: "Using PoPP", desc: "Guide for users, validators, partners", href: "/using-popp", icon: UserGroupIcon },
      { title: "Security", desc: "Decentralized trust and safety", href: "/security", icon: ShieldCheckIcon },
      { title: "Tokenomics", desc: "Token model and supply", href: "/tokenomics", icon: ChartBarIcon },
      { title: "Staking", desc: "Earn rewards by staking", href: "/staking-mechanics", icon: StarIcon },
    ],
  },
  {
    label: "Products",
    submenu: [
      { title: "Problem Explorer", desc: "Browse submitted problems", href: "/explorer", icon: BookOpenIcon },
      { title: "Validator Panel", desc: "Live dashboard and analytics", href: "/validator-panel", icon: ChartBarIcon },
      { title: "DAO Dashboard", desc: "Governance and proposals", href: "/dao-dashboard", icon: GlobeAltIcon },
      { title: "Wallet", desc: "Manage tokens and staking", href: "/wallet", icon: StarIcon },
      { title: "Notifications", desc: "Alerts and updates", href: "/notifications", icon: NewspaperIcon },
      { title: "Leaderboard", desc: "Reputation rankings", href: "/leaderboard", icon: ArrowTrendingUpIcon },
      { title: "Resolutions", desc: "Rewards and resolution stats", href: "/resolutions", icon: ShieldCheckIcon },
      { title: "Infrastructure", desc: "Network infrastructure monitor", href: "/infrastructure", icon: BuildingLibraryIcon },
{ title: "Escalations", desc: "Resolve escalated submissions", href: "/escalations", icon: ArrowUpRightIcon },
{ title: "Proofer", desc: "Cryptographic proof generation", href: "/proofer", icon: ShieldCheckIcon },
{ title: "Identity (DID)", desc: "Decentralized identity management", href: "/did", icon: GlobeAltIcon },
      { title: "Submit Problem", desc: "Report a real-world issue", href: "/report", icon: ArrowTrendingUpIcon },
    ],
  },
  {
    label: "Validators",
    submenu: [
      { title: "Become a Validator", desc: "Overview and requirements", href: "/validators", icon: AcademicCapIcon },
      { title: "Validator Panel", desc: "Live dashboard and rewards", href: "/validator-panel", icon: ChartBarIcon },
      { title: "Smart Contracts", desc: "Contract details and ABIs", href: "/smart-contracts", icon: BookOpenIcon },
      { title: "Best Practices", desc: "Guidelines for secure usage", href: "/best-practices", icon: ShieldCheckIcon },
    ],
  },
  {
    label: "Developers",
    submenu: [
      { title: "Documentation", desc: "Full technical docs", href: "/docs", icon: AcademicCapIcon },
      { title: "API Reference", desc: "REST API endpoints", href: "/api-references", icon: GlobeAltIcon },
      { title: "SDK", desc: "Software development kit", href: "/sdk", icon: ShieldCheckIcon },
      { title: "CLI", desc: "Command-line tools", href: "/cli", icon: GlobeAltIcon },
      { title: "Sandbox", desc: "Try PoPP in a safe env", href: "/sandbox-or-testnet", icon: LightBulbIcon },
    ],
  },
  {
    label: "Resources",
    submenu: [
      { title: "Whitepaper", desc: "Official protocol paper", href: "/whitepapers", icon: BookOpenIcon },
      { title: "Blogs & News", desc: "Updates and articles", href: "/blogs", icon: GlobeAltIcon },
      { title: "Learning Resources", desc: "Guides and videos", href: "/learning-resources", icon: BookOpenIcon },
      { title: "Example Workflows", desc: "Practical PoPP scenarios", href: "/example-workflows", icon: LightBulbIcon },
      { title: "Events", desc: "Conferences and meetups", href: "/events", icon: ArrowTrendingUpIcon },
    ],
  },
  {
    label: "PoPP For",
    submenu: [
      { title: "Civic Activists & NGOs", desc: "Document and escalate issues", href: "/civic-activists-and-ngos", icon: UsersIcon },
      { title: "Government Agencies", desc: "Transparent issue tracking", href: "/government-agencies", icon: BuildingLibraryIcon },
      { title: "Media Organizations", desc: "Verified stories and leads", href: "/media-organizations", icon: NewspaperIcon },
      { title: "Academia & Research", desc: "University collaborations", href: "/academia-and-research", icon: AcademicCapIcon },
    ],
  },
];

const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Report", href: "/report" },
  { label: "Validators", href: "/validators" },
  { label: "Explorer", href: "/explorer" },
  { label: "Docs", href: "/docs" },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function Navigation() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { connected, address } = useWallet();

  const shortAddr = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0a0e1a]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          : "bg-transparent"
      }`}
    >
      {/* Early Access Banner Strip */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border-b border-white/[0.06]">
        <div className="w-full max-w-7xl mx-auto px-5 py-1.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-[10px] font-semibold text-cyan-400 flex-shrink-0">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              BETA
            </span>
            <p className="text-xs text-gray-400 truncate hidden sm:block">
              Android app in <span className="text-gray-200 font-medium">testing</span> — join early access
            </p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc1uzrlQPc3q_DngaVOK2yzKKaLgtGMQNvCx5iZmgmcx-VAeA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md text-[11px] font-semibold text-white hover:shadow-md hover:shadow-cyan-500/20 transition-all"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Join Waitlist
          </a>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* ---- Logo ---- */}
        <Link href="/" className="flex items-center group">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PoPP
          </span>
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
            <button
              onClick={() => setWalletModalOpen(true)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                connected
                  ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Wallet className="w-[18px] h-[18px]" />
              {connected && shortAddr && (
                <span className="hidden lg:inline">{shortAddr}</span>
              )}
            </button>
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Report Problem
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
      {/*  Mega Menu (desktop) — animated slide-down                   */}
      {/* ============================================================ */}
      <div
        ref={megaMenuRef}
        className={`hidden md:block fixed left-0 right-0 top-16 z-50 transition-all duration-300 ease-out ${
          megaOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ visibility: megaOpen ? "visible" : "hidden" }}
      >
        <div className="bg-[#0a0f1e]/95 backdrop-blur-xl shadow-2xl shadow-black/40 rounded-b-2xl border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-6 py-6 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
              {megaMenuSections.map((section, sIdx) => (
                <div
                  key={section.label}
                  className="flex flex-col"
                  style={{
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    transitionDelay: megaOpen ? `${sIdx * 40}ms` : "0ms",
                    opacity: megaOpen ? 1 : 0,
                    transform: megaOpen ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-2 pb-2 mb-2 border-b border-white/[0.06]">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      {section.label}
                    </span>
                  </div>
                  {/* Links with icons and descriptions */}
                  <div className="flex flex-col gap-0.5">
                    {section.submenu.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        prefetch={true}
                        onClick={() => setMegaOpen(false)}
                        onMouseEnter={() => router.prefetch(sub.href)}
                        className="group flex items-start gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
                      >
                        <sub.icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-400 mt-0.5 flex-shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <div className="text-sm text-gray-300 group-hover:text-white transition-colors leading-tight">
                            {sub.title}
                          </div>
                          <div className="text-[11px] text-gray-500 leading-tight truncate">
                            {sub.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
            <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-3">
              <Link
                href="/report"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Report a Problem
              </Link>
              <button
                onClick={() => { setIsMobileMenuOpen(false); setWalletModalOpen(true); }}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  connected
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                    : "bg-white/[0.05] border-white/[0.08] text-gray-300"
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span className="text-sm">{connected ? (shortAddr || "Connected") : "Connect Wallet"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {walletModalOpen && <WalletModal onClose={() => setWalletModalOpen(false)} />}
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
