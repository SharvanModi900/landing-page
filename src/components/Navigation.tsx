

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
// import {
//   BookOpenIcon,
//   ShieldCheckIcon,
//   UsersIcon,
//   AcademicCapIcon,
//   ChartBarIcon,
//   UserGroupIcon,
//   LightBulbIcon,
//   StarIcon,
//   GlobeAltIcon,
//   ArrowTrendingUpIcon,
// } from '@heroicons/react/24/outline';
import Wallet from './wallet';

// export const megaMenuSections = [
//   {
//     label: 'Origin',
//     submenu: [
//       { title: 'Our Story', desc: 'How PoPP began', href: '/origin/story', icon: BookOpenIcon },
//       { title: 'Mission', desc: 'Our core mission and values', href: '/origin/mission', icon: LightBulbIcon },
//       { title: 'Team', desc: 'Meet the people behind PoPP', href: '/origin/team', icon: UsersIcon },
//     ],
//   },
//   {
//     label: 'How It Works',
//     submenu: [
//       { title: 'Architecture', desc: 'The 5-layer PoPP protocol', href: '/how-it-works#architecture', icon: AcademicCapIcon },
//       { title: 'Validation', desc: 'How proof and verification work', href: '/how-it-works#validation', icon: ShieldCheckIcon },
//       { title: 'Security', desc: 'Decentralized trust and safety', href: '/how-it-works#security', icon: StarIcon },
//     ],
//   },
//   {
//     label: 'Using PoPP',
//     submenu: [
//       { title: 'For Users', desc: 'Submit and track problems', href: '/using-popp#users', icon: UserGroupIcon },
//       { title: 'For Validators', desc: 'Validate and earn rewards', href: '/using-popp#validators', icon: ChartBarIcon },
//       { title: 'For Partners', desc: 'Integrate PoPP into your systems', href: '/using-popp#partners', icon: GlobeAltIcon },
//     ],
//   },
//   {
//     label: 'Impact',
//     submenu: [
//       { title: 'Case Studies', desc: 'Real-world results and success stories', href: '/case-studies', icon: ArrowTrendingUpIcon },
//       { title: 'Community', desc: 'Join our global community', href: '/community', icon: UserGroupIcon },
//       { title: 'Feedback', desc: 'Share your thoughts and ideas', href: '/feedback', icon: StarIcon },
//       { title: 'Contribute', desc: 'Help build and improve PoPP', href: '/contribute', icon: GlobeAltIcon },
//       { title: 'Events', desc: 'Upcoming conferences and meetups', href: '/events', icon: ArrowTrendingUpIcon },
//     ],
//   },
//   {
//     label: 'Roadmap',
//     submenu: [
//       { title: 'roadmap', desc: 'What’s next for PoPP this year', href: '/roadmap', icon: LightBulbIcon },
//       { title: 'Vision', desc: 'Our long-term goals and strategy', href: '/vision', icon: AcademicCapIcon },
//       { title: 'Support', desc: 'Get help and customer support', href: '/support', icon: ShieldCheckIcon },
//     ],
//   },
//   {
//     label: 'Resources',
//     submenu: [
//       { title: 'Whitepaper', desc: 'Read the official PoPP protocol whitepaper', href: '/whitepapers', icon: BookOpenIcon },
//       { title: 'Documentation', desc: 'Technical and user guides', href: '/docs', icon: AcademicCapIcon },
//       { title: 'API Reference', desc: 'Detailed API endpoints and usage', href: '/api', icon: GlobeAltIcon },
//       { title: 'FAQ', desc: 'Frequently asked questions', href: '/faqs', icon: LightBulbIcon },
//        { title: 'Blogs', desc: 'Detailed API endpoints and usage', href: '/blogs', icon: GlobeAltIcon },
//       { title: 'Events', desc: 'Frequently asked questions', href: '/events', icon: LightBulbIcon },
//        { title: 'News', desc: 'Detailed API endpoints and usage', href: '/news', icon: GlobeAltIcon },
      
//     ],
//   },
//   {
//     label: 'Products',
//     submenu: [
//       { title: 'Problem Explorer', desc: 'Browse and search submitted problems', href: '/explorer', icon: BookOpenIcon },
//       { title: 'Truth NFT Viewer', desc: 'View and verify truth NFTs', href: '/nft-viewer', icon: AcademicCapIcon },
//       { title: 'Validator Panel', desc: 'Manage validations and rewards', href: '/validator-panel', icon: ChartBarIcon },
//       { title: 'Proposal & DAO Dashboard', desc: 'Participate in governance', href: '/dao-dashboard', icon: GlobeAltIcon },
//     ],
//   },
//   {
//     label: 'Knowledge Hub',
//     submenu: [
//       { title: 'Academia & Research', desc: 'Collaborations with universities and institutions', href: '/academia-and-research', icon: AcademicCapIcon },
//       { title: 'Student Zone', desc: 'Student resources and project support', href: '/students', icon: UsersIcon },
//       { title: 'Policy & Governance', desc: 'Frameworks for policymakers', href: '/policy-and-governance', icon: ShieldCheckIcon },
//       { title: 'Public Datasets', desc: 'Free and open datasets', href: '/datasets', icon: GlobeAltIcon },
//       { title: 'Learning Resources', desc: 'Guides, videos, and documentation', href: '/learn', icon: BookOpenIcon },
//     ],
//   },
//   {
//     label: 'Developer Hub',
//     submenu: [
//       { title: 'Developer Docs', desc: 'Full technical documentation', href: '/developer-docs', icon: AcademicCapIcon },
//       { title: 'SDK', desc: 'PoPP software development kit', href: '/sdk', icon: ShieldCheckIcon },
//       { title: 'CLI', desc: 'Command-line tools for developers', href: '/cli', icon: GlobeAltIcon },
//       { title: 'Smart Contracts', desc: 'PoPP smart contract repository', href: '/smart-contracts', icon: BookOpenIcon },
//       { title: 'Tools', desc: 'Utilities and dev tools', href: '/tools', icon: LightBulbIcon },
//     ],
//   },
//   {
//     label: 'Validators',
//     submenu: [
//       { title: 'validators Docs', desc: 'Full technical documentation', href: '/developer-docs', icon: AcademicCapIcon },
//       { title: 'validators exam', desc: 'PoPP software development kit', href: '/sdk', icon: ShieldCheckIcon },
//       { title: 'calidators certification', desc: 'Command-line tools for developers', href: '/cli', icon: GlobeAltIcon },
//       { title: 'validators smart contracts', desc: 'PoPP smart contract repository', href: '/smart-contracts', icon: BookOpenIcon },
//       { title: 'validators tools', desc: 'Utilities and dev tools', href: '/tools', icon: LightBulbIcon },
//     ],
//   },
// ];
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

// export const megaMenuSections = [
//   {
//     label: "Origin",
//     submenu: [
//       { title: "Our Story", desc: "How PoPP began", href: "/origin/story", icon: BookOpenIcon },
//       { title: "Mission", desc: "Our core mission and values", href: "/origin/mission", icon: LightBulbIcon },
//       { title: "Team", desc: "Meet the people behind PoPP", href: "/origin/team", icon: UsersIcon },
//     ],
//   },
//   {
//     label: "How It Works",
//     submenu: [
//       { title: "Architecture", desc: "The 5-layer PoPP protocol", href: "/how-it-works#architecture", icon: AcademicCapIcon },
//       { title: "Validation", desc: "How proof and verification work", href: "/how-it-works#validation", icon: ShieldCheckIcon },
//       { title: "Security", desc: "Decentralized trust and safety", href: "/how-it-works#security", icon: StarIcon },
//       { title: "Audits & Compliance", desc: "Third-party audits and protocol security", href: "/how-it-works#audits", icon: ShieldCheckIcon },
//     ],
//   },
//   {
//     label: "Using PoPP",
//     submenu: [
//       { title: "For Users", desc: "Submit and track problems", href: "/using-popp#users", icon: UserGroupIcon },
//       { title: "For Validators", desc: "Validate and earn rewards", href: "/using-popp#validators", icon: ChartBarIcon },
//       { title: "For Partners", desc: "Integrate PoPP into your systems", href: "/using-popp#partners", icon: GlobeAltIcon },
//       { title: "Tutorials / Quickstart", desc: "Step-by-step guides to get started", href: "/using-popp#tutorials", icon: LightBulbIcon },
//     ],
//   },
//   {
//     label: "Governance",
//     submenu: [
//       { title: "DAO Overview", desc: "How PoPP governance works", href: "/governance/overview", icon: GlobeAltIcon },
//       { title: "Proposals", desc: "Submit and vote on proposals", href: "/governance/proposals", icon: LightBulbIcon },
//       { title: "Voting Guide", desc: "Understand voting mechanics and eligibility", href: "/governance/voting", icon: AcademicCapIcon },
//       { title: "DAO Guidelines", desc: "Rules and frameworks for governance", href: "/governance/guidelines", icon: ShieldCheckIcon },
//     ],
//   },
//   {
//     label: "Impact",
//     submenu: [
//       { title: "Case Studies", desc: "Real-world results and success stories", href: "/case-studies", icon: ArrowTrendingUpIcon },
//       { title: "Community", desc: "Join our global community", href: "/community", icon: UserGroupIcon },
//       { title: "Feedback", desc: "Share your thoughts and ideas", href: "/feedback", icon: StarIcon },
//       { title: "Contribute", desc: "Help build and improve PoPP", href: "/contribute", icon: GlobeAltIcon },
//       { title: "Events", desc: "Upcoming conferences and meetups", href: "/events", icon: ArrowTrendingUpIcon },
//     ],
//   },
//   {
//     label: "Roadmap",
//     submenu: [
//       { title: "Roadmap", desc: "What’s next for PoPP this year", href: "/roadmap", icon: LightBulbIcon },
//       { title: "Vision", desc: "Our long-term goals and strategy", href: "/vision", icon: AcademicCapIcon },
//       { title: "Support", desc: "Get help and customer support", href: "/support", icon: ShieldCheckIcon },
//     ],
//   },
//   {
//     label: "Resources",
//     submenu: [
//       { title: "Whitepaper", desc: "Read the official PoPP protocol whitepaper", href: "/whitepapers", icon: BookOpenIcon },
//       { title: "Documentation", desc: "Technical and user guides", href: "/docs", icon: AcademicCapIcon },
//       { title: "API Reference", desc: "Detailed API endpoints and usage", href: "/api", icon: GlobeAltIcon },
//       { title: "FAQ", desc: "Frequently asked questions", href: "/faqs", icon: LightBulbIcon },
//       { title: "Blogs", desc: "Project updates and insights", href: "/blogs", icon: GlobeAltIcon },
//       { title: "Events", desc: "PoPP events and meetups", href: "/events", icon: LightBulbIcon },
//       { title: "News", desc: "Latest news and announcements", href: "/news", icon: GlobeAltIcon },
//     ],
//   },
//   {
//     label: "Products",
//     submenu: [
//       { title: "Problem Explorer", desc: "Browse and search submitted problems", href: "/explorer", icon: BookOpenIcon },
//       { title: "Truth NFT Viewer", desc: "View and verify truth NFTs", href: "/nft-viewer", icon: AcademicCapIcon },
//       { title: "Validator Panel", desc: "Manage validations and rewards", href: "/validator-panel", icon: ChartBarIcon },
//       { title: "Proposal & DAO Dashboard", desc: "Participate in governance", href: "/dao-dashboard", icon: GlobeAltIcon },
//     ],
//   },
//   {
//     label: "Knowledge Hub",
//     submenu: [
//       { title: "Academia & Research", desc: "Collaborations with universities and institutions", href: "/academia-and-research", icon: AcademicCapIcon },
//       { title: "Student Zone", desc: "Student resources and project support", href: "/students", icon: UsersIcon },
//       { title: "Policy & Governance", desc: "Frameworks for policymakers", href: "/policy-and-governance", icon: ShieldCheckIcon },
//       { title: "Public Datasets", desc: "Free and open datasets", href: "/datasets", icon: GlobeAltIcon },
//       { title: "Learning Resources", desc: "Guides, videos, and documentation", href: "/learn", icon: BookOpenIcon },
//     ],
//   },
//   {
//     label: "Developer Hub",
//     submenu: [
//       { title: "Developer Docs", desc: "Full technical documentation", href: "/developer-docs", icon: AcademicCapIcon },
//       { title: "SDK", desc: "PoPP software development kit", href: "/sdk", icon: ShieldCheckIcon },
//       { title: "CLI", desc: "Command-line tools for developers", href: "/cli", icon: GlobeAltIcon },
//       { title: "Smart Contracts", desc: "PoPP smart contract repository", href: "/smart-contracts", icon: BookOpenIcon },
//       { title: "Tools", desc: "Utilities and dev tools", href: "/tools", icon: LightBulbIcon },
//       { title: "Tutorials / Quickstart", desc: "Step-by-step setup and guides", href: "/developer-docs/tutorials", icon: LightBulbIcon },
//     ],
//   },
//   {
//     label: "Validators",
//     submenu: [
//       { title: "Validators Docs", desc: "Full technical documentation", href: "/validators/docs", icon: AcademicCapIcon },
//       { title: "Validators Exam", desc: "Certification exam for validators", href: "/validators/exam", icon: ShieldCheckIcon },
//       { title: "Validators Certification", desc: "Official validator accreditation", href: "/validators/certification", icon: GlobeAltIcon },
//       { title: "Validators Smart Contracts", desc: "Smart contracts for validation processes", href: "/validators/smart-contracts", icon: BookOpenIcon },
//       { title: "Validators Tools", desc: "Utilities and dev tools for validators", href: "/validators/tools", icon: LightBulbIcon },
//     ],
//   },{
//   label: "Legal / Compliance",
//   submenu: [
//     { 
//       title: "Terms of Use", 
//       desc: "Official rules and conditions for using PoPP", 
//       href: "/legal/terms-of-use", 
//       icon: BookOpenIcon 
//     },
//     { 
//       title: "Privacy Policy", 
//       desc: "How user data is collected, used, and protected", 
//       href: "/legal/privacy-policy", 
//       icon: ShieldCheckIcon 
//     },
//     { 
//       title: "Data Compliance", 
//       desc: "Information on regulatory and compliance standards", 
//       href: "/legal/data-compliance", 
//       icon: GlobeAltIcon 
//     },
//   ],
// },

// ];


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
      { title: 'Case Studies', desc: 'Real-world results and success stories', href: '/case-studies', icon: ArrowTrendingUpIcon },
      { title: 'Community', desc: 'Join our global community', href: '/community', icon: UserGroupIcon },
      { title: 'Feedback', desc: 'Share your thoughts and ideas', href: '/feedback', icon: StarIcon },
      { title: 'Contribute', desc: 'Help build and improve PoPP', href: '/contribute', icon: GlobeAltIcon },
      { title: 'Events', desc: 'Upcoming conferences and meetups', href: '/events', icon: ArrowTrendingUpIcon },
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
    label: 'Resources',
    submenu: [
      { title: 'Whitepaper', desc: 'Read the official PoPP protocol whitepaper', href: '/whitepapers', icon: BookOpenIcon },
      { title: 'Documentation', desc: 'Technical and user guides', href: '/docs', icon: AcademicCapIcon },
      { title: 'API Reference', desc: 'Detailed API endpoints and usage', href: '/api', icon: GlobeAltIcon },
      { title: 'FAQ', desc: 'Frequently asked questions', href: '/faqs', icon: LightBulbIcon },
      { title: 'Blogs', desc: 'Project updates and articles', href: '/blogs', icon: GlobeAltIcon },
      { title: 'News', desc: 'Latest developments and announcements', href: '/news', icon: GlobeAltIcon },
      { title: 'Events', desc: 'Workshops, webinars, and meetups', href: '/events', icon: LightBulbIcon },
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
      { title: 'Sandbox / Testnet', desc: 'Try PoPP in a safe environment', href: '/sandbox', icon: GlobeAltIcon },
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
      { title: 'Audit Reports', desc: 'Independent security audits', href: '/security/audits', icon: ShieldCheckIcon },
      { title: 'Vulnerability Disclosures', desc: 'Report potential issues', href: '/security/vulnerabilities', icon: LightBulbIcon },
      { title: 'Best Practices', desc: 'Guidelines for secure usage', href: '/security/best-practices', icon: BookOpenIcon },
    ],
  },
  {
    label: 'Token & Economics',
    submenu: [
      { title: 'Tokenomics', desc: 'PoPP token model and supply', href: '/tokenomics', icon: ChartBarIcon },
      { title: 'Staking Mechanics', desc: 'Earn rewards by staking', href: '/staking', icon: StarIcon },
      { title: 'Incentive Structures', desc: 'How contributors earn value', href: '/incentives', icon: GlobeAltIcon },
    ],
  },
  {
    label: 'Tutorials & Learning',
    submenu: [
      { title: 'Video Tutorials', desc: 'Step-by-step guides', href: '/tutorials/videos', icon: BookOpenIcon },
      { title: 'Workshops', desc: 'Hands-on learning events', href: '/tutorials/workshops', icon: UsersIcon },
      { title: 'Example Workflows', desc: 'Practical PoPP scenarios', href: '/tutorials/workflows', icon: LightBulbIcon },
    ],
  },
  {
    label: 'Legal / Compliance',
    submenu: [
      { title: 'Terms of Use', desc: 'Official rules and conditions', href: '/legal/terms-of-use', icon: BookOpenIcon },
      { title: 'Privacy Policy', desc: 'User data protection policies', href: '/legal/privacy-policy', icon: ShieldCheckIcon },
      { title: 'Data Compliance', desc: 'Regulatory and compliance standards', href: '/legal/data-compliance', icon: GlobeAltIcon },
    ],
  },
  {
  label: 'PoPP For',
  submenu: [
    { 
      title: 'Civic Activists & NGOs', 
      desc: 'Document issues, build evidence trails, escalate problems', 
      href: '/popp-for/civic', 
      icon: UsersIcon 
    },
    { 
      title: 'Government Agencies', 
      desc: 'Transparent issue tracking, public accountability, data-driven decisions', 
      href: '/popp-for/government', 
      icon: BuildingLibraryIcon 
    },
    { 
      title: 'Media Organizations', 
      desc: 'Verified stories, fact-checking, investigative leads', 
      href: '/popp-for/media', 
      icon: NewspaperIcon 
    },
    { 
      title: 'Legal Professionals', 
      desc: 'Evidence collection, case building, witness protection', 
      href: '/popp-for/legal', 
      icon: ScaleIcon 
    },
    { 
      title: 'Academic Researchers', 
      desc: 'Study civic engagement patterns and governance effectiveness', 
      href: '/popp-for/academia', 
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
  onClick={() => setOpenIndex(null)} // close menu on click
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
