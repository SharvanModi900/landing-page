"use client";
import { usePathname } from "next/navigation";

const SEGMENT_LABELS: Record<string, string> = {
  "how-it-works": "How It Works",
  "about-us": "About Us",
  whitepaper: "Whitepaper",
  whitepapers: "Whitepapers",
  validators: "Validators",
  validator: "Validator",
  "validator-docs": "Validator Docs",
  "validator-exam": "Validator Exam",
  "validator-panel": "Validator Panel",
  "validator-tools": "Validator Tools",
  "validator-smart-contracts": "Smart Contracts",
  "validator-leaderboards": "Leaderboards",
  tokenomics: "Tokenomics",
  explorer: "Explorer",
  wallet: "Wallet",
  report: "Report",
  community: "Community",
  blogs: "Blog",
  "case-studies": "Case Studies",
  faqs: "FAQs",
  learn: "Learn",
  "learn/decentralized-problem-validation": "Decentralized Problem Validation",
  "learn/civic-tech-blockchain": "Civic Tech & Blockchain",
  "learn/earn-rewards-reporting": "Earn Rewards & Reporting",
  events: "Events",
  roadmap: "Roadmap",
  testimonials: "Testimonials",
  contribute: "Contribute",
  "developer-docs": "Developer Docs",
  sdk: "SDK",
  "api-references": "API References",
  "api-keys": "API Keys",
  webhooks: "Webhooks",
  "best-practices": "Best Practices",
  "learning-resources": "Learning Resources",
  "audit-reports": "Audit Reports",
  academia: "Academia",
  "academia-and-research": "Academia & Research",
  "academic-researchers": "Academic Researchers",
  students: "Students",
  researchers: "Researchers",
  "using-popp": "Using PoPP",
  "privacy-policy": "Privacy Policy",
  "terms-of-use": "Terms of Use",
  cookies: "Cookie Policy",
  support: "Support",
  vision: "Vision",
  news: "News",
  videos: "Videos",
  tools: "Tools",
  zones: "Zones",
  "ride-mode": "Ride Mode",
  "onboarding": "Onboarding",
  "sign-in": "Sign In",
  "wallet-setup": "Wallet Setup",
  governance: "Governance",
  reputation: "Reputation",
  ticket: "Ticket",
  "memory-chain": "Memory Chain",
  notifications: "Notifications",
  map: "Map",
  "vulnerability-disclosures": "Vulnerability Disclosures",
};

function label(slug: string): string {
  return SEGMENT_LABELS[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BreadcrumbSchema() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const items = [
    { name: "Home", url: "https://pops.thharko.com" },
    ...segments.map((seg, i) => {
      const path = "/" + segments.slice(0, i + 1).join("/");
      return {
        name: label(seg),
        url: `https://pops.thharko.com${path}`,
      };
    }),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
