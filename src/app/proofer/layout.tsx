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

export default function ProoferLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Proofer" }]} />{children}</>;
}
