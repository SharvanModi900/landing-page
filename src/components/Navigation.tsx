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
import WalletDropdown from "./WalletDropdown";

const BACKEND_API = "https://popp.thharko.com";

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
      { title: "Proofer", desc: "Cryptographic proof generation", href: "/proofer", icon: ShieldCheckIcon },
      { title: "Escalations", desc: "Resolve escalated submissions", href: "/escalations", icon: ArrowUpRightIcon },
      { title: "Submit Problem", desc: "Report a real-world issue", href: "/report", icon: ArrowTrendingUpIcon },
    ],
  },
  {
    label: "Dashboard",
    submenu: [
      { title: "Wallet", desc: "Manage tokens and staking", href: "/wallet", icon: StarIcon },
      { title: "My Profile", desc: "Account settings & referrals", href: "/profile", icon: UsersIcon },
      { title: "Notifications", desc: "Alerts and updates", href: "/notifications", icon: NewspaperIcon },
      { title: "Leaderboard", desc: "Reputation rankings", href: "/leaderboard", icon: ArrowTrendingUpIcon },
      { title: "Resolutions", desc: "Rewards and resolution stats", href: "/resolutions", icon: ShieldCheckIcon },
    ],
  },
  {
    label: "Infrastructure",
    submenu: [
      { title: "Network Monitor", desc: "Infrastructure health & status", href: "/infrastructure", icon: BuildingLibraryIcon },
      { title: "Identity (DID)", desc: "Decentralized identity management", href: "/did", icon: GlobeAltIcon },
      { title: "Zones", desc: "Geographic zone management", href: "/zones", icon: GlobeAltIcon },
      { title: "IoT Sensors", desc: "Sensor network management", href: "/sensors", icon: BuildingLibraryIcon },
      { title: "Tokenomics", desc: "Live token dashboard & emissions", href: "/tokenomics", icon: ChartBarIcon },
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
      { title: "API Keys", desc: "Manage your API keys", href: "/api-keys", icon: ShieldCheckIcon },
      { title: "Webhooks", desc: "Event notification hooks", href: "/webhooks", icon: GlobeAltIcon },
    ],
  },
  {
    label: "Resources",
    submenu: [
      { title: "Whitepaper", desc: "Official protocol paper", href: "/whitepaper", icon: BookOpenIcon },
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
  { label: "How It Works", href: "/how-it-works" },
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
  const [sparkData, setSparkData] = useState<number[]>([]);
  const walletBtnJustClosed = useRef(false);
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

  /* fetch visitor sparkline for navbar */
  useEffect(() => {
    fetch(`${BACKEND_API}/api/visitors/analytics`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d: { hour: string; visitors: number }[]) => {
        if (Array.isArray(d)) setSparkData(d.map((x) => x.visitors));
      })
      .catch(() => {});
  }, []);

  /* open wallet modal when any page calls connect() without a wallet */
  useEffect(() => {
    const handler = () => setWalletModalOpen(true);
    window.addEventListener("popp-wallet-open-modal", handler);
    return () => window.removeEventListener("popp-wallet-open-modal", handler);
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
      {/* Main navbar row: Logo (col 1) + Banner/Nav (col 2) */}
      <div className="w-full max-w-7xl mx-auto px-5 py-2 flex items-start gap-4">
        {/* ---- Col 1: Logo ---- */}
        <Link href="/" className="flex-shrink-0 group">
          <img src="/logo.png" alt="PoPP" className="h-full w-full max-h-24 rounded-xl object-contain shadow-lg shadow-black/30 group-hover:shadow-cyan-500/10 transition-shadow" />
        </Link>

        {/* ---- Col 2: Banner strip + Nav row ---- */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          {/* Early Access Banner Strip */}
          <div className="bg-gradient-to-r from-violet-600/90 via-indigo-600/90 to-cyan-600/90 rounded-lg">
            <div className="px-4 py-1.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 border border-white/25 rounded-full text-[10px] font-bold text-white flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  BETA
                </span>
                <p className="text-[11px] text-white/90 truncate hidden sm:block">
                  Android app in <span className="text-white font-semibold">early testing</span> — join the waitlist
                </p>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc1uzrlQPc3q_DngaVOK2yzKKaLgtGMQNvCx5iZmgmcx-VAeA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 border border-white/20 rounded-md text-[10px] font-semibold text-white backdrop-blur-sm transition-all"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Join Waitlist
              </a>
            </div>
          </div>

          {/* Nav row */}
          <div className="flex items-center justify-between">
            {/* Nav links */}
            <div className="hidden md:flex items-center gap-0.5" ref={dropdownRef}>
              {mainNavLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={true}
                  className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* More trigger — click toggle */}
              <button
                onClick={toggleMega}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors ${
                  megaOpen ? "text-white bg-white/[0.08]" : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                More
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Right-side actions */}
            <div className="flex items-center gap-3 ml-4">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (walletModalOpen) {
                    walletBtnJustClosed.current = true;
                    setWalletModalOpen(false);
                    requestAnimationFrame(() => { walletBtnJustClosed.current = false; });
                  } else {
                    setWalletModalOpen(true);
                  }
                }}
                onMouseDown={(e) => { e.stopPropagation(); }}
                className={`group relative inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                  connected
                    ? "py-2 pl-2 pr-3.5 rounded-full bg-white/[0.06] border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.08]"
                    : "py-2.5 px-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {connected ? (
                  <>
                    {/* Address avatar */}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-[10px] font-bold text-white">
                      {address ? address.slice(2, 4).toUpperCase() : "?"}
                    </span>
                    {/* Green dot indicator */}
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#0b1120]" />
                    </span>
                    <span className="hidden lg:inline text-white/90">{shortAddr}</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    <span>Connect</span>
                  </>
                )}
              </button>

              {/* Wallet Dropdown */}
              {walletModalOpen && <WalletDropdown onClose={() => setWalletModalOpen(false)} />}
            </div>
          </div>
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
      {/*  Mega Menu (desktop) — anchored below navbar                 */}
      {/* ============================================================ */}
      <div
        ref={megaMenuRef}
        className={`hidden md:block absolute left-0 right-0 top-full z-40 transition-all duration-300 ease-out ${
          megaOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ visibility: megaOpen ? "visible" : "hidden" }}
      >
        <div className="bg-[#0a0f1e]/95 backdrop-blur-xl shadow-2xl shadow-black/40 rounded-b-2xl border border-white/[0.04] border-t-0">
          <div className="max-w-7xl mx-auto px-6 py-6 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6">
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
            <div className="pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => { setIsMobileMenuOpen(false); setWalletModalOpen(true); }}
                className={`w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  connected
                    ? "bg-white/[0.06] border border-white/[0.1] text-white"
                    : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/25"
                }`}
              >
                {connected ? (
                  <>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-[10px] font-bold text-white">
                      {address ? address.slice(2, 4).toUpperCase() : "?"}
                    </span>
                    <span>{shortAddr || "Connected"}</span>
                    <span className="ml-auto flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Wallet dropdown is now inline in the nav bar */}
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
