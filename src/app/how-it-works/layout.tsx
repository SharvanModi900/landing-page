import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how the Proof of Problem Protocol works — from reporting civic issues to community verification, AI analysis, and earning rewards. A complete guide to PoPP's decentralized problem-solving pipeline.",
  keywords: [
    "how PoPP works",
    "decentralized problem reporting",
    "civic data economy",
    "problem ticket workflow",
    "community verification",
    "AI evidence analysis",
    "earn rewards reporting problems",
  ],
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How It Works — PoPP",
    description:
      "From reporting a pothole to earning rewards — understand the full PoPP workflow: report, evidence, community vote, AI + human validation, and token rewards.",
    url: "/how-it-works",
  },
  twitter: {
    title: "How It Works — PoPP",
    description:
      "From reporting a pothole to earning rewards — understand the full PoPP workflow.",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How PoPP Works",
  "description": "From reporting a civic problem to earning rewards — the complete PoPP workflow.",
  "step": [
    { "@type": "HowToStep", "name": "Report", "text": "Find a problem and create a ticket with photos, videos, and location evidence." },
    { "@type": "HowToStep", "name": "Evidence", "text": "Submit photos, videos, and location data as cryptographic proof." },
    { "@type": "HowToStep", "name": "Community Vote", "text": "People within ~10km review the report and vote on its genuineness." },
    { "@type": "HowToStep", "name": "AI + Human Validation", "text": "AI analyzes evidence quality while human validators confirm the result." },
    { "@type": "HowToStep", "name": "Earn Rewards", "text": "Verified contributors receive SAT MUDRA tokens for their participation." }
  ]
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How It Works" }]} />
      {children}
    </>
  );
}
