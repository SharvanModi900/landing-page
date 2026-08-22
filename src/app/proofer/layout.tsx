import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Proofer",
  description:
    "Learn about the PoPP Proofer role — submit cryptographic proof for reported problems, strengthen evidence chains, and earn rewards for validating real-world issues on the protocol.",
  keywords: [
    "PoPP proofer",
    "problem proof submission",
    "cryptographic evidence",
    "evidence validation",
    "proof submission rewards",
  ],
  alternates: { canonical: "/proofer" },
  openGraph: {
    title: "Proofer — PoPP",
    description:
      "Submit cryptographic proof for reported problems and earn rewards for validating real-world issues.",
    url: "/proofer",
  },
  twitter: {
    title: "Proofer — PoPP",
    description: "Submit cryptographic proof and earn rewards for validating real-world issues.",
  },
};

const prooferJsonLd = {"@context":"https://schema.org","@type":"SoftwareApplication","name":"PoPP Proofer - Problem Validation Tool","url":"https://pops.thharko.com/proofer","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"},"applicationCategory":"DeveloperApplication","operatingSystem":"Web"};

export default function ProoferLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Proofer" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(prooferJsonLd) }} />{children}</>;
}
