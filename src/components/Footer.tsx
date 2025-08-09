"use client";

import Link from "next/link";

const footerSections = [
  {
    label: "Origin",
    links: [
      { name: "Our Story", href: "/origin#story" },
      { name: "Mission", href: "/origin#mission" },
      { name: "Team", href: "/origin#team" },
    ],
  },
  {
    label: "How It Works",
    links: [
      { name: "Architecture", href: "/how-it-works#architecture" },
      { name: "Validation", href: "/how-it-works#validation" },
      { name: "Security", href: "/how-it-works#security" },
    ],
  },
  {
    label: "Using PoPP",
    links: [
      { name: "For Users", href: "/using-popp#users" },
      { name: "For Validators", href: "/using-popp#validators" },
      { name: "For Partners", href: "/using-popp#partners" },
    ],
  },
  {
    label: "Impact",
    links: [
      { name: "Case Studies", href: "/impact#cases" },
      { name: "Community", href: "/impact#community" },
    ],
  },
  {
    label: "Roadmap",
    links: [
      { name: "2024", href: "/roadmap#2024" },
      { name: "Vision", href: "/roadmap#vision" },
    ],
  },
  {
    label: "Resources",
    links: [
      { name: "Whitepaper", href: "/whitepaper" },
      { name: "Documentation", href: "/docs" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Main Links */}
        <div className="mb-8 md:mb-0">
          <div className="font-bold text-2xl text-blue-400 mb-4">PoPP</div>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="text-gray-200 hover:text-blue-400 font-semibold">Home</Link>
            <Link href="/about" className="text-gray-200 hover:text-blue-400 font-semibold">About</Link>
          </nav>
        </div>
        {/* Submenu Sections */}
        <div className="flex flex-wrap gap-8 flex-1 justify-between">
          {footerSections.map((section) => (
            <div key={section.label} className="min-w-[140px]">
              <div className="font-bold text-blue-300 mb-2">{section.label}</div>
              <ul className="flex flex-col gap-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-blue-300 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} PoPP. All rights reserved.
      </div>
    </footer>
  );
} 