
"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
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
} from "@heroicons/react/24/outline"; // Update icons based on your project
import { Wallet } from 'lucide-react';


export const megaMenuSections = [
  {
    label: 'Origin',
    submenu: [
      { title: 'Our Story', desc: 'How PoPP began', href: '/origin/story', icon: BookOpenIcon },
      { title: 'Mission', desc: 'Our core mission and values', href: '/origin/mission', icon: LightBulbIcon },
      { title: 'Team', desc: 'Meet the people behind PoPP', href: '/origin/team', icon: UsersIcon },
    ],
  },
  {
    label: 'How It Works',
    submenu: [
      { title: 'Architecture', desc: 'The 5-layer PoPP protocol', href: '/how-it-works/architecture', icon: AcademicCapIcon },
      { title: 'Validation', desc: 'How proof and verification work', href: '/how-it-works/validation', icon: ShieldCheckIcon },
      { title: 'Security', desc: 'Decentralized trust and safety', href: '/security', icon: StarIcon },
    ],
  },
  {
    label: 'Using PoPP',
    submenu: [
      { title: 'For Users', desc: 'Submit and track problems', href: '/using-popp#users', icon: UserGroupIcon },
      { title: 'For Validators', desc: 'Validate and earn rewards', href: '/using-popp#validators', icon: ChartBarIcon },
      { title: 'For Partners', desc: 'Integrate PoPP into your systems', href: '/using-popp#partners', icon: GlobeAltIcon },
    ],
  },
   {
    label: 'Products',
    submenu: [
      { title: 'Problem Explorer', desc: 'Browse and search submitted problems', href: '/explorer', icon: BookOpenIcon },
      { title: 'Truth NFT Viewer', desc: 'View and verify truth NFTs', href: '/nft-viewer', icon: AcademicCapIcon },
      { title: 'Validator Panel', desc: 'Manage validations and rewards', href: '/validator-panel', icon: ChartBarIcon },
      { title: 'Proposal & DAO Dashboard', desc: 'Participate in governance', href: '/dao-dashboard', icon: GlobeAltIcon },
    ],
  },
  
  {
    label: 'Roadmap',
    submenu: [
      { title: 'Roadmap', desc: 'What’s next for PoPP this year', href: '/roadmap', icon: LightBulbIcon },
      { title: 'Vision', desc: 'Our long-term goals and strategy', href: '/vision', icon: AcademicCapIcon },
      { title: 'Support', desc: 'Get help and customer support', href: '/support', icon: ShieldCheckIcon },
    ],
  },
  {
    label: 'Impact',
    submenu: [
      { title: 'Case Studies', desc: 'Real-world results and success stories', href: '/case-studies', icon: ArrowTrendingUpIcon },
      { title: 'Community', desc: 'Join our global community', href: '/community', icon: UserGroupIcon },
      { title: 'Feedback', desc: 'Share your thoughts and ideas', href: '/feedback', icon: StarIcon },
      { title: 'Contribute', desc: 'Help build and improve PoPP', href: '/contribute', icon: GlobeAltIcon },
      { title: 'Events', desc: 'Upcoming conferences and meetups', href: '/events', icon: ArrowTrendingUpIcon },
    ],
  },
  {
    label: 'Resources',
    submenu: [
      { title: 'Whitepaper', desc: 'Read the official PoPP protocol whitepaper', href: '/whitepapers', icon: BookOpenIcon },
      { title: 'API Reference', desc: 'Detailed API endpoints and usage', href: '/api-references', icon: GlobeAltIcon },
      { title: 'FAQ', desc: 'Frequently asked questions', href: '/faqs', icon: LightBulbIcon },
      { title: 'Blogs', desc: 'Project updates and articles', href: '/blogs', icon: GlobeAltIcon },
      { title: 'News', desc: 'Latest developments and announcements', href: '/news', icon: GlobeAltIcon },
      { title: 'Events', desc: 'Workshops, webinars, and meetups', href: '/events', icon: LightBulbIcon },
    ],
  },
 
  {
    label: 'Knowledge Hub',
    submenu: [
      { title: 'Academia & Research', desc: 'Collaborations with universities and institutions', href: '/academia-and-research', icon: AcademicCapIcon },
      { title: 'Student Zone', desc: 'Student resources and project support', href: '/students', icon: UsersIcon },
      { title: 'Policy & Governance', desc: 'Frameworks for policymakers', href: '/policy-and-governance', icon: ShieldCheckIcon },
      { title: 'Public Datasets', desc: 'Free and open datasets', href: '/datasets', icon: GlobeAltIcon },
      { title: 'Learning Resources', desc: 'Guides, videos, and documentation', href: '/learn', icon: BookOpenIcon },
    ],
  },
  {
    label: 'Developer Hub',
    submenu: [
      { title: 'Developer Docs', desc: 'Full technical documentation', href: '/developer-docs', icon: AcademicCapIcon },
      { title: 'SDK', desc: 'PoPP software development kit', href: '/sdk', icon: ShieldCheckIcon },
      { title: 'CLI', desc: 'Command-line tools for developers', href: '/cli', icon: GlobeAltIcon },
      { title: 'Smart Contracts', desc: 'PoPP smart contract repository', href: '/smart-contracts', icon: BookOpenIcon },
      { title: 'Tools', desc: 'Utilities and dev tools', href: '/tools', icon: LightBulbIcon },
      { title: 'Sandbox / Testnet', desc: 'Try PoPP in a safe environment', href: '/sandbox-or-testnet', icon: GlobeAltIcon },
    ],
  },
  {
    label: 'Validators',
    submenu: [
      { title: 'Validators Docs', desc: 'Full technical documentation', href: '/validator-docs', icon: AcademicCapIcon },
      { title: 'Validator Exam', desc: 'Certification and exams for validators', href: '/validator-exam', icon: ShieldCheckIcon },
      { title: 'Validator Smart Contracts', desc: 'Manage PoPP smart contracts', href: '/validator-smart-contracts', icon: BookOpenIcon },
      { title: 'Validator Tools', desc: 'Utilities and dashboard tools', href: '/validator-tools', icon: LightBulbIcon },
      { title: 'Leaderboards', desc: 'Top validators and contributor rankings', href: '/validator-leaderboards', icon: StarIcon },
    ],
  },
  {
    label: 'Security & Audits',
    submenu: [
      { title: 'Audit Reports', desc: 'Independent security audits', href: '/audit-reports', icon: ShieldCheckIcon },
      { title: 'Vulnerability Disclosures', desc: 'Report potential issues', href: '/vulnerability-disclosures', icon: LightBulbIcon },
      { title: 'Best Practices', desc: 'Guidelines for secure usage', href: '/best-practices', icon: BookOpenIcon },
    ],
  },
  {
    label: 'Token & Economics',
    submenu: [
      { title: 'Tokenomics', desc: 'PoPP token model and supply', href: '/tokenomics', icon: ChartBarIcon },
      { title: 'Staking Mechanics', desc: 'Earn rewards by staking', href: '/staking-mechanics', icon: StarIcon },
      { title: 'Incentive Structures', desc: 'How contributors earn value', href: '/incentive-structures', icon: GlobeAltIcon },
    ],
  },
  {
    label: 'Tutorials & Learning',
    submenu: [
      { title: 'Video Tutorials', desc: 'Step-by-step guides', href: '/videos', icon: BookOpenIcon },
      { title: 'Workshops', desc: 'Hands-on learning events', href: '/workshops', icon: UsersIcon },
      { title: 'Example Workflows', desc: 'Practical PoPP scenarios', href: '/example-workflows', icon: LightBulbIcon },
    ],
  },
  {
    label: 'Legal / Compliance',
    submenu: [
      { title: 'Terms of Use', desc: 'Official rules and conditions', href: '/terms-of-use', icon: BookOpenIcon },
      { title: 'Privacy Policy', desc: 'User data protection policies', href: '/privacy-policy', icon: ShieldCheckIcon },
      { title: 'Data Compliance', desc: 'Regulatory and compliance standards', href: '/data-compliance', icon: GlobeAltIcon },
    ],
  },
  {
  label: 'PoPP For',
  submenu: [
    { 
      title: 'Civic Activists & NGOs', 
      desc: 'Document issues, build evidence trails, escalate problems', 
      href: 'civic-activists-and-ngos', 
      icon: UsersIcon 
    },
    { 
      title: 'Government Agencies', 
      desc: 'Transparent issue tracking, public accountability, data-driven decisions', 
      href: 'government-agencies', 
      icon: BuildingLibraryIcon 
    },
    { 
      title: 'Media Organizations', 
      desc: 'Verified stories, fact-checking, investigative leads', 
      href: 'media-organizations', 
      icon: NewspaperIcon 
    },
    { 
      title: 'Legal Professionals', 
      desc: 'Evidence collection, case building, witness protection', 
      href: 'legal-professionals', 
      icon: ScaleIcon 
    },
    { 
      title: 'Academic Researchers', 
      desc: 'Study civic engagement patterns and governance effectiveness', 
      href: 'academic-researchers', 
      icon: AcademicCapIcon 
    },
  ],
},

];


const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about-us' },
  { label: 'Submit Problem', href: '/submit' },
];

export default function Navigation() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMenuEnter = (idx: number) => {
    setOpenIndex(idx);
    setHovering(true);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };
  const handleMenuBarMouseEnter = () => {
    setHovering(true);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };
  const handleMenuBarMouseLeave = () => {
    setHovering(false);
    hoverTimeout.current = setTimeout(() => {
      if (!hovering) setOpenIndex(null);
    }, 100);
  };
  const handleDropdownMouseEnter = () => {
    setHovering(true);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };
  const handleDropdownMouseLeave = () => {
    setHovering(false);
    hoverTimeout.current = setTimeout(() => {
      if (!hovering) setOpenIndex(null);
    }, 100);
  };

  useEffect(() => {
    if (openIndex === null) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openIndex]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-indigo-900 backdrop-blur-lg shadow-xl border-b border-indigo-700/50">
      <div className="w-full max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PoPP
          </div>
          <div className="hidden md:block ml-3 px-2 py-1 bg-indigo-800/50 rounded-full text-xs text-indigo-200 font-medium">
            Protocol
          </div>
        </div>
        <div
          className="hidden md:flex items-center gap-1 h-full relative"
          onMouseEnter={handleMenuBarMouseEnter}
          onMouseLeave={handleMenuBarMouseLeave}
          ref={menuBarRef}
        >
          {mainNavLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 font-medium text-indigo-100 hover:text-white hover:bg-indigo-800/30 rounded-lg transition-all duration-200 focus:outline-none"
            >
              {item.label}
            </a>
          ))}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMenuEnter(0)}
          >
            <button className="px-4 py-2 font-medium text-indigo-100 hover:text-white hover:bg-indigo-800/30 rounded-lg transition-all duration-200 flex items-center gap-1 focus:outline-none">
              More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <button className="ml-4 px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30">
            Get Started
          </button>
          <div className="ml-4">
            <Wallet />
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-indigo-800/30 transition-colors"
        >
          <div className="w-6 h-0.5 bg-indigo-200 mb-1.5 rounded-full" />
          <div className="w-6 h-0.5 bg-indigo-200 mb-1.5 rounded-full" />
          <div className="w-6 h-0.5 bg-indigo-200 rounded-full" />
        </button>
      </div>

      {/* Improved Mega Menu */}
      {openIndex !== null && (
        <div
          className="hidden md:block fixed left-0 right-0 top-16 w-screen bg-gradient-to-b from-indigo-900/95 to-indigo-950/95 backdrop-blur-xl border-t border-indigo-700/30 shadow-2xl z-50"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          ref={dropdownRef}
        >
          <div className="max-w-7xl mx-auto px-6 py-6 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-y-auto max-h-[70vh]">
            {megaMenuSections.map((section) => (
              <div
                key={section.label}
                className="flex flex-col gap-3 p-4 rounded-xl hover:bg-indigo-800/20 transition-all duration-200 border border-indigo-700/20"
              >
                <div className="font-bold text-cyan-400 text-lg pb-2 border-b border-indigo-700/30">
                  {section.label}
                </div>
                <div className="space-y-3">
                  {section.submenu.map((sub) => (
                    <div key={sub.title} className="flex items-start gap-3 group">
                      <div className="mt-1 p-1.5 rounded-lg bg-indigo-800/40 group-hover:bg-cyan-500/20 transition-colors">
                        <sub.icon className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                      </div>
                      <div>
                       <Link
  href={sub.href}
  className="block font-medium text-indigo-100 hover:text-cyan-300 transition-colors"
  onClick={() => setOpenIndex(null)} // close menu on click
>
  {sub.title}
</Link>

                        <p className="text-indigo-300/70 text-xs mt-1">{sub.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-900 to-indigo-950 backdrop-blur-lg rounded-xl mt-2 p-4 shadow-xl border border-indigo-700/30 mx-4">
          <div className="flex flex-col space-y-4">
            {megaMenuSections.map((item) => (
              <div key={item.label}>
                <div className="font-bold text-cyan-400 mb-2 pb-1 border-b border-indigo-700/30">{item.label}</div>
                <div className="space-y-2">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className="block text-indigo-100 hover:text-cyan-300 pl-3 py-2 rounded-lg hover:bg-indigo-800/30 transition-colors flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="p-1.5 rounded-lg bg-indigo-800/40">
                        <sub.icon className="w-4 h-4 text-cyan-300" />
                      </div>
                      <div>
                        <div className="font-medium">{sub.title}</div>
                        <div className="text-indigo-300/70 text-xs">{sub.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all mt-2 shadow-lg">
              Get Started
            </button>
            <div className="mt-2 pt-3 border-t border-indigo-700/30">
              <Wallet />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
