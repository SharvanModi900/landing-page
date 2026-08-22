import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Learn",
  description: "Learn about the Proof of Problem Protocol — beginner-friendly guides, tutorials, and resources to understand decentralized problem validation, blockchain governance, and civic tech.",
  keywords: ["learn PoPP", "protocol education", "blockchain basics", "civic tech learning", "decentralized validation tutorial"],
  alternates: { canonical: "/learn" },
  openGraph: { title: "Learn — PoPP", description: "Beginner-friendly guides to understand decentralized problem validation and civic tech.", url: "/learn" },
  twitter: { title: "Learn — PoPP", description: "Learn about decentralized problem validation and civic tech." },
};

export default function LearnLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn" }]} />{children}</>; }
