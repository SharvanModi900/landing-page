import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Infrastructure",
  description: "Explore PoPP's decentralized infrastructure — network nodes, validator topology, chain architecture, and the technical backbone powering truth validation at scale.",
  keywords: ["PoPP infrastructure", "network nodes", "decentralized network", "chain architecture", "validator topology"],
  alternates: { canonical: "/infrastructure" },
  openGraph: { title: "Infrastructure — PoPP", description: "Explore PoPP's decentralized network infrastructure and chain architecture.", url: "/infrastructure" },
  twitter: { title: "Infrastructure — PoPP", description: "Explore PoPP's decentralized network infrastructure." },
};

export default function InfrastructureLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Infrastructure" }]} />{children}</>; }
