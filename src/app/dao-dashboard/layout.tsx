import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "DAO Governance Dashboard",
  description:
    "Participate in PoPP's decentralized governance — view active proposals, vote on protocol changes, track DAO treasury, and shape the future of the Proof of Problem Protocol.",
  keywords: [
    "PoPP DAO",
    "governance dashboard",
    "on-chain voting",
    "DAO proposals",
    "decentralized governance",
    "community voting",
    "protocol governance",
  ],
  alternates: { canonical: "/dao-dashboard" },
  openGraph: {
    title: "DAO Governance Dashboard — PoPP",
    description:
      "Participate in PoPP governance — view proposals, vote on-chain, and shape the protocol's future.",
    url: "/dao-dashboard",
  },
  twitter: {
    title: "DAO Governance Dashboard — PoPP",
    description: "Participate in PoPP governance — vote on proposals and shape the protocol.",
  },
};

export default function DaoDashboardLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "DAO Dashboard" }]} />{children}</>;
}
