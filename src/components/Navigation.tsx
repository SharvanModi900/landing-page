

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpenIcon,
  ShieldCheckIcon,
  UsersIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  StarIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import Wallet from './wallet';

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
      { title: 'Architecture', desc: 'The 5-layer PoPP protocol', href: '/how-it-works#architecture', icon: AcademicCapIcon },
      { title: 'Validation', desc: 'How proof and verification work', href: '/how-it-works#validation', icon: ShieldCheckIcon },
      { title: 'Security', desc: 'Decentralized trust and safety', href: '/how-it-works#security', icon: StarIcon },
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
    label: 'Impact',
    submenu: [
      { title: 'Case Studies', desc: 'Real-world results and success stories', href: '/impact#cases', icon: ArrowTrendingUpIcon },
      { title: 'Community', desc: 'Join our global community', href: '/impact#community', icon: UserGroupIcon },
      { title: 'Feedback', desc: 'Share your thoughts and ideas', href: '/feedback', icon: StarIcon },
      { title: 'Contribute', desc: 'Help build and improve PoPP', href: '/contribute', icon: GlobeAltIcon },
      { title: 'Events', desc: 'Upcoming conferences and meetups', href: '/events', icon: ArrowTrendingUpIcon },
    ],
  },
  {
    label: 'Roadmap',
    submenu: [
      { title: '2024', desc: 'What’s next for PoPP this year', href: '/roadmap#2024', icon: LightBulbIcon },
      { title: 'Vision', desc: 'Our long-term goals and strategy', href: '/roadmap#vision', icon: AcademicCapIcon },
      { title: 'Support', desc: 'Get help and customer support', href: '/support', icon: ShieldCheckIcon },
    ],
  },
  {
    label: 'Resources',
    submenu: [
      { title: 'Whitepaper', desc: 'Read the official PoPP protocol whitepaper', href: '/whitepaper', icon: BookOpenIcon },
      { title: 'Documentation', desc: 'Technical and user guides', href: '/docs', icon: AcademicCapIcon },
      { title: 'API Reference', desc: 'Detailed API endpoints and usage', href: '/api', icon: GlobeAltIcon },
      { title: 'FAQ', desc: 'Frequently asked questions', href: '/faq', icon: LightBulbIcon },
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
    label: 'Knowledge Hub',
    submenu: [
      { title: 'Academia & Research', desc: 'Collaborations with universities and institutions', href: '/academia-and-research', icon: AcademicCapIcon },
      { title: 'Student Zone', desc: 'Student resources and project support', href: '/students', icon: UsersIcon },
      { title: 'Policy & Governance', desc: 'Frameworks for policymakers', href: '/policy', icon: ShieldCheckIcon },
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
    ],
  },
  {
    label: 'Validators',
    submenu: [
      { title: 'validators Docs', desc: 'Full technical documentation', href: '/developer-docs', icon: AcademicCapIcon },
      { title: 'validators exam', desc: 'PoPP software development kit', href: '/sdk', icon: ShieldCheckIcon },
      { title: 'calidators certification', desc: 'Command-line tools for developers', href: '/cli', icon: GlobeAltIcon },
      { title: 'validators smart contracts', desc: 'PoPP smart contract repository', href: '/smart-contracts', icon: BookOpenIcon },
      { title: 'validators tools', desc: 'Utilities and dev tools', href: '/tools', icon: LightBulbIcon },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
        <div className="font-bold text-2xl text-blue-700">PoPP</div>
        <div
          className="hidden md:flex items-center gap-8 h-full relative"
          onMouseEnter={handleMenuBarMouseEnter}
          onMouseLeave={handleMenuBarMouseLeave}
          ref={menuBarRef}
        >
          {mainNavLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 font-semibold text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              {item.label}
            </a>
          ))}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMenuEnter(0)}
          >
            <button className="px-4 py-2 font-semibold text-gray-800 hover:text-blue-600 focus:outline-none">
              More
            </button>
          </div>
          <button className="ml-6 px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow">
            Get Started
          </button>
          <div className="ml-4">
            <Wallet />
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
        >
          <div className="w-6 h-0.5 bg-blue-700 mb-1" />
          <div className="w-6 h-0.5 bg-blue-700 mb-1" />
          <div className="w-6 h-0.5 bg-blue-700" />
        </button>
      </div>

      {/* Improved Mega Menu */}
      {openIndex !== null && (
        <div
          className="hidden md:block fixed left-0 right-0 top-16 w-screen bg-white shadow-2xl border-t border-blue-100 z-50"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
          ref={dropdownRef}
        >
          <div className="max-w-7xl mx-auto px-8 py-6 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-y-auto max-h-[70vh]">
            {megaMenuSections.map((section) => (
              <div
                key={section.label}
                className="flex flex-col gap-3 p-3 rounded-lg hover:bg-blue-50 transition"
              >
                <div className="font-bold text-blue-700 text-lg border-b border-blue-100 pb-1">
                  {section.label}
                </div>
                <div className="space-y-3">
                  {section.submenu.map((sub) => (
                    <div key={sub.title} className="flex items-start gap-3">
                      <sub.icon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <Link
                          href={sub.href}
                          className="block font-medium text-blue-700 hover:underline"
                        >
                          {sub.title}
                        </Link>
                        <p className="text-gray-500 text-xs">{sub.desc}</p>
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
        <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {megaMenuSections.map((item) => (
              <div key={item.label}>
                <div className="font-bold text-blue-700 mb-1">{item.label}</div>
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.title}
                    href={sub.href}
                    className="block text-gray-700 hover:text-blue-600 pl-4 py-1 flex items-center gap-2"
                  >
                    <sub.icon className="w-5 h-5 text-blue-500" />
                    {sub.title}
                  </Link>
                ))}
              </div>
            ))}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 mt-2">
              Get Started
            </button>
            <div className="mt-2">
              <Wallet />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
