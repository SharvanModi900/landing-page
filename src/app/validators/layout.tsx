import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validators",
  description:
    "Become a PoPP validator — verify real-world problem reports, earn rewards, and secure the decentralized truth validation network. Learn requirements, staking, and how to join.",
  keywords: [
    "PoPP validators",
    "become a validator",
    "decentralized validation",
    "validator staking",
    "verify problems earn rewards",
    "network security validators",
  ],
  alternates: { canonical: "/validators" },
  openGraph: {
    title: "Validators — PoPP",
    description:
      "Become a PoPP validator — verify real-world problem reports, earn rewards, and secure the network.",
    url: "/validators",
  },
  twitter: {
    title: "Validators — PoPP",
    description: "Become a PoPP validator — verify problems, earn rewards, secure the network.",
  },
};

const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Blockchain Validator — PoPP Network",
  "description": "Become a PoPP validator: verify real-world problem reports, stake tokens, earn rewards, and secure the decentralized truth validation network.",
  "hiringOrganization": { "@type": "Organization", "name": "Proof of Problem Protocol", "sameAs": "https://pops.thharko.com" },
  "jobLocationType": "telecommute",
  "employmentType": "CONTRACTOR",
  "qualifications": "Stake SAT MUDRA tokens, maintain network uptime, verify problem reports with expert analysis."
};

export default function ValidatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validators" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }} />
      {children}
    </>
  );
}
