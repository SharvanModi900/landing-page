import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "PoPP's mission is to build a world where problems cannot be silenced — cryptographically verified, transparently validated, and community-driven decentralized truth validation for everyone.",
  keywords: [
    "PoPP mission",
    "truth validation protocol",
    "decentralized truth",
    "problem verification mission",
    "civic transparency",
    "unsilenced problems",
  ],
  alternates: { canonical: "/mission" },
  openGraph: {
    title: "Our Mission — PoPP",
    description:
      "Building a world where problems cannot be silenced — cryptographically verified and transparently validated.",
    url: "/mission",
  },
  twitter: {
    title: "Our Mission — PoPP",
    description: "Building a world where problems cannot be silenced — verified, transparent, community-driven.",
  },
};

export default function MissionLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Mission" }]} />{children}</>;
}
